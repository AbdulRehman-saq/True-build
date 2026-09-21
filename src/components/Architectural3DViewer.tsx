'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Box, Layers, Eye, Compass, RotateCcw, Play, Pause, Sparkles, Sun, Moon, Info } from 'lucide-react';

export type ViewerMode = 'render' | 'blueprint' | 'exploded' | 'structural';
export type LightingPreset = 'daylight' | 'sunset' | 'night';

interface Hotspot {
  id: string;
  title: string;
  category: string;
  description: string;
  pos: [number, number, number];
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'pe-stamp',
    title: 'PE Structural Load Path',
    category: 'Structural Engineering',
    description: 'Lateral wind & seismic moment connections calculated and stamped for city permit approval.',
    pos: [1.8, 3.2, 1.8],
  },
  {
    id: 'curtain-wall',
    title: 'High-Performance Glazing',
    category: 'Architectural Spec',
    description: 'Low-E insulated curtain wall system with thermal break aluminum mullions meeting IECC 2021.',
    pos: [-1.9, 2.1, 1.6],
  },
  {
    id: 'mep-chase',
    title: 'MEP Integration Core',
    category: 'Mechanical & Plumbing',
    description: 'Clash-detected vertical utility chase aligning mechanical, electrical, and plumbing risers.',
    pos: [0, 4.4, 0],
  },
  {
    id: 'foundation-slab',
    title: 'Post-Tensioned Foundation',
    category: 'Civil & Foundation',
    description: 'Engineered grade beams and continuous slab with geotechnical soil bearing verification.',
    pos: [0, 0.3, -1.8],
  },
];

interface Architectural3DViewerProps {
  className?: string;
  initialMode?: ViewerMode;
  showControls?: boolean;
  compact?: boolean;
  onOpenModal?: () => void;
}

export function Architectural3DViewer({
  className = '',
  initialMode = 'render',
  showControls = true,
  compact = false,
  onOpenModal,
}: Architectural3DViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // UI State
  const [mode, setMode] = useState<ViewerMode>(initialMode);
  const [lighting, setLighting] = useState<LightingPreset>('daylight');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const floorGroupsRef = useRef<THREE.Group[]>([]);
  const structuralElementsRef = useRef<THREE.Mesh[]>([]);
  const glassElementsRef = useRef<THREE.Mesh[]>([]);
  const slabElementsRef = useRef<THREE.Mesh[]>([]);
  const wireframeLinesRef = useRef<THREE.LineSegments[]>([]);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);

  // Interaction References
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const sphericalRef = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 12,
    theta: Math.PI / 4,
    phi: Math.PI / 3,
  });
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.5, 0));
  const autoRotateSpeedRef = useRef<number>(0.003);

  // Update Camera Position based on Spherical Coordinates
  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = sphericalRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(targetLookAtRef.current);
  }, []);

  // Update Visual Mode Materials and Displacements
  const applyMode = useCallback((targetMode: ViewerMode) => {
    // 1. Exploded BIM view offsets
    floorGroupsRef.current.forEach((group, index) => {
      let targetY = 0;
      if (targetMode === 'exploded') {
        targetY = index * 1.35; // Expand levels upwards
      }
      // Animate smoothly
      const startY = group.position.y;
      const duration = 500;
      const startTime = performance.now();
      function animateY(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        group.position.y = startY + (targetY - startY) * ease;
        if (progress < 1) requestAnimationFrame(animateY);
      }
      requestAnimationFrame(animateY);
    });

    // 2. Blueprint Wireframe lines visibility
    const isBlueprint = targetMode === 'blueprint';
    wireframeLinesRef.current.forEach((line) => {
      line.visible = isBlueprint;
    });

    // 3. Update material styles
    if (targetMode === 'blueprint') {
      // Dark blueprint CAD aesthetic
      if (sceneRef.current) sceneRef.current.background = new THREE.Color(0x0c1322);
      if (gridHelperRef.current) {
        (gridHelperRef.current.material as THREE.LineBasicMaterial).color.set(0x0284c7);
      }
      glassElementsRef.current.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.set(0x0369a1);
        mat.opacity = 0.25;
        mat.wireframe = true;
      });
      slabElementsRef.current.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.set(0x0f172a);
        mat.wireframe = false;
      });
      structuralElementsRef.current.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.set(0x38bdf8);
        mat.roughness = 0.2;
      });
    } else if (targetMode === 'structural') {
      // Highlight structural PE columns and beams in vibrant gold
      if (sceneRef.current) sceneRef.current.background = new THREE.Color(0x181824);
      if (gridHelperRef.current) {
        (gridHelperRef.current.material as THREE.LineBasicMaterial).color.set(0x475569);
      }
      glassElementsRef.current.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = 0.08;
        mat.wireframe = false;
      });
      slabElementsRef.current.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.set(0x334155);
        mat.opacity = 0.5;
        mat.transparent = true;
        mat.wireframe = false;
      });
      structuralElementsRef.current.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.set(0xd97706); // Engineering Gold
        mat.roughness = 0.3;
        mat.metalness = 0.8;
      });
    } else {
      // Realistic render mode (or exploded with realistic materials)
      if (sceneRef.current) sceneRef.current.background = new THREE.Color(0xf8fafc);
      if (gridHelperRef.current) {
        (gridHelperRef.current.material as THREE.LineBasicMaterial).color.set(0xcbd5e1);
      }
      glassElementsRef.current.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.set(0x93c5fd);
        mat.opacity = 0.45;
        mat.transparent = true;
        mat.roughness = 0.1;
        mat.metalness = 0.9;
        mat.wireframe = false;
      });
      slabElementsRef.current.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.set(0xe2e8f0);
        mat.transparent = false;
        mat.opacity = 1;
        mat.roughness = 0.7;
        mat.metalness = 0.1;
        mat.wireframe = false;
      });
      structuralElementsRef.current.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.set(0x334155); // Dark Architectural Bronze Steel
        mat.roughness = 0.4;
        mat.metalness = 0.6;
      });
    }
  }, []);

  // Update Lighting Presets
  const applyLighting = useCallback((preset: LightingPreset) => {
    if (!dirLightRef.current || !hemiLightRef.current) return;

    if (preset === 'daylight') {
      dirLightRef.current.color.set(0xfffbeb);
      dirLightRef.current.intensity = 1.8;
      dirLightRef.current.position.set(8, 14, 8);
      hemiLightRef.current.color.set(0xffffff);
      hemiLightRef.current.groundColor.set(0xe2e8f0);
      hemiLightRef.current.intensity = 0.9;
    } else if (preset === 'sunset') {
      dirLightRef.current.color.set(0xfb923c); // Warm amber golden hour
      dirLightRef.current.intensity = 2.4;
      dirLightRef.current.position.set(12, 6, 6);
      hemiLightRef.current.color.set(0xfed7aa);
      hemiLightRef.current.groundColor.set(0x7c2d12);
      hemiLightRef.current.intensity = 0.7;
    } else {
      // Night / Technical Blueprint
      dirLightRef.current.color.set(0x38bdf8);
      dirLightRef.current.intensity = 1.2;
      dirLightRef.current.position.set(-6, 12, -6);
      hemiLightRef.current.color.set(0x0f172a);
      hemiLightRef.current.groundColor.set(0x0284c7);
      hemiLightRef.current.intensity = 0.5;
    }
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    cameraRef.current = camera;
    updateCameraPosition();

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 4. Grid Ground Helper
    const grid = new THREE.GridHelper(18, 18, 0xb8860b, 0xcbd5e1);
    grid.position.y = 0;
    scene.add(grid);
    gridHelperRef.current = grid;

    // 5. Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.9);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.8);
    dirLight.position.set(8, 14, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    const ambientPoint = new THREE.PointLight(0xfef08a, 1.5, 10);
    ambientPoint.position.set(0, 3.5, 0);
    scene.add(ambientPoint);

    // 6. BUILD ARCHITECTURAL 3D MODEL
    const floorGroups: THREE.Group[] = [];
    const structuralElements: THREE.Mesh[] = [];
    const glassElements: THREE.Mesh[] = [];
    const slabElements: THREE.Mesh[] = [];
    const wireframeLines: THREE.LineSegments[] = [];

    // Helper: Add wireframe outlines for blueprint mode
    function createEdges(mesh: THREE.Mesh, colorHex = 0x38bdf8) {
      const edges = new THREE.EdgesGeometry(mesh.geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: colorHex, linewidth: 1.5 })
      );
      line.position.copy(mesh.position);
      line.rotation.copy(mesh.rotation);
      line.visible = false;
      wireframeLines.push(line);
      mesh.parent?.add(line);
    }

    // Material Defaults
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.6,
      metalness: 0.1,
    });
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.6,
    });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.9,
    });
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.8,
    });

    const floorCount = 4;
    const floorHeight = 1.35;
    const buildingWidth = 4.2;
    const buildingDepth = 3.6;

    for (let f = 0; f < floorCount; f++) {
      const floorGroup = new THREE.Group();
      floorGroup.position.y = f * floorHeight;

      // A. Concrete Floor Slab
      const slabGeo = new THREE.BoxGeometry(
        f === 0 ? buildingWidth + 0.4 : buildingWidth,
        0.18,
        f === 0 ? buildingDepth + 0.4 : buildingDepth
      );
      const slabMesh = new THREE.Mesh(slabGeo, slabMat.clone());
      slabMesh.position.y = 0.09;
      slabMesh.receiveShadow = true;
      slabMesh.castShadow = true;
      floorGroup.add(slabMesh);
      slabElements.push(slabMesh);
      createEdges(slabMesh, 0x0284c7);

      // B. Structural Steel Columns (PE Certified Framing)
      const columnPositions = [
        [-buildingWidth / 2 + 0.3, -buildingDepth / 2 + 0.3],
        [buildingWidth / 2 - 0.3, -buildingDepth / 2 + 0.3],
        [-buildingWidth / 2 + 0.3, buildingDepth / 2 - 0.3],
        [buildingWidth / 2 - 0.3, buildingDepth / 2 - 0.3],
        [0, -buildingDepth / 2 + 0.3],
        [0, buildingDepth / 2 - 0.3],
      ];

      columnPositions.forEach(([cx, cz]) => {
        const colGeo = new THREE.BoxGeometry(0.16, floorHeight - 0.18, 0.16);
        const colMesh = new THREE.Mesh(colGeo, columnMat.clone());
        colMesh.position.set(cx, (floorHeight - 0.18) / 2 + 0.18, cz);
        colMesh.castShadow = true;
        floorGroup.add(colMesh);
        structuralElements.push(colMesh);
        createEdges(colMesh, 0xf59e0b);
      });

      // C. Central Concrete Shear Core / Utility Shaft
      const coreGeo = new THREE.BoxGeometry(1.2, floorHeight - 0.18, 1.0);
      const coreMesh = new THREE.Mesh(coreGeo, coreMat.clone());
      coreMesh.position.set(0, (floorHeight - 0.18) / 2 + 0.18, 0);
      floorGroup.add(coreMesh);
      slabElements.push(coreMesh);
      createEdges(coreMesh, 0x0284c7);

      // D. Exterior Glass Curtain Walls
      const glassWallFront = new THREE.BoxGeometry(buildingWidth - 0.3, floorHeight - 0.22, 0.05);
      const glassMeshFront = new THREE.Mesh(glassWallFront, glassMat.clone());
      glassMeshFront.position.set(0, (floorHeight - 0.18) / 2 + 0.18, buildingDepth / 2 - 0.1);
      floorGroup.add(glassMeshFront);
      glassElements.push(glassMeshFront);

      const glassWallBack = new THREE.BoxGeometry(buildingWidth - 0.3, floorHeight - 0.22, 0.05);
      const glassMeshBack = new THREE.Mesh(glassWallBack, glassMat.clone());
      glassMeshBack.position.set(0, (floorHeight - 0.18) / 2 + 0.18, -buildingDepth / 2 + 0.1);
      floorGroup.add(glassMeshBack);
      glassElements.push(glassMeshBack);

      // E. Balcony Terrace on 2nd and 3rd floors
      if (f === 1 || f === 2) {
        const balconyGeo = new THREE.BoxGeometry(1.6, 0.14, 0.8);
        const balconyMesh = new THREE.Mesh(balconyGeo, slabMat.clone());
        balconyMesh.position.set(buildingWidth / 2 + 0.4, 0.07, 0.4);
        floorGroup.add(balconyMesh);
        slabElements.push(balconyMesh);
        createEdges(balconyMesh, 0x38bdf8);

        // Balcony Glass Railing
        const railingGeo = new THREE.BoxGeometry(1.6, 0.45, 0.04);
        const railingMesh = new THREE.Mesh(railingGeo, glassMat.clone());
        railingMesh.position.set(buildingWidth / 2 + 0.4, 0.35, 0.8);
        floorGroup.add(railingMesh);
        glassElements.push(railingMesh);
      }

      scene.add(floorGroup);
      floorGroups.push(floorGroup);
    }

    // F. Rooftop Penthouse & Pergola Canopy
    const rooftopGroup = new THREE.Group();
    rooftopGroup.position.y = floorCount * floorHeight;

    const roofSlabGeo = new THREE.BoxGeometry(buildingWidth, 0.2, buildingDepth);
    const roofSlab = new THREE.Mesh(roofSlabGeo, slabMat.clone());
    roofSlab.position.y = 0.1;
    rooftopGroup.add(roofSlab);
    slabElements.push(roofSlab);
    createEdges(roofSlab, 0x0284c7);

    // Pergola Canopy Beams
    for (let b = -1.5; b <= 1.5; b += 0.5) {
      const beamGeo = new THREE.BoxGeometry(0.08, 0.12, buildingDepth - 0.6);
      const beamMesh = new THREE.Mesh(beamGeo, columnMat.clone());
      beamMesh.position.set(b, 0.9, 0);
      rooftopGroup.add(beamMesh);
      structuralElements.push(beamMesh);
      createEdges(beamMesh, 0xf59e0b);
    }

    // HVAC Mechanical Penthouse Box
    const hvacGeo = new THREE.BoxGeometry(1.4, 0.65, 1.2);
    const hvacMesh = new THREE.Mesh(
      hvacGeo,
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.3 })
    );
    hvacMesh.position.set(-1.0, 0.45, -0.6);
    rooftopGroup.add(hvacMesh);
    structuralElements.push(hvacMesh);
    createEdges(hvacMesh, 0x38bdf8);

    scene.add(rooftopGroup);
    floorGroups.push(rooftopGroup);

    floorGroupsRef.current = floorGroups;
    structuralElementsRef.current = structuralElements;
    glassElementsRef.current = glassElements;
    slabElementsRef.current = slabElements;
    wireframeLinesRef.current = wireframeLines;

    // Apply initial mode and lighting
    applyMode(initialMode);
    applyLighting('daylight');
    setIsLoaded(true);

    // 7. Mouse and Touch Interaction Handlers
    const dom = renderer.domElement;

    function onPointerDown(e: MouseEvent | TouchEvent) {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePositionRef.current = { x: clientX, y: clientY };
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePositionRef.current.x;
      const deltaY = clientY - previousMousePositionRef.current.y;

      sphericalRef.current.theta -= deltaX * 0.008;
      sphericalRef.current.phi = Math.max(
        0.2,
        Math.min(Math.PI / 2 - 0.05, sphericalRef.current.phi - deltaY * 0.008)
      );

      previousMousePositionRef.current = { x: clientX, y: clientY };
      updateCameraPosition();
    }

    function onPointerUp() {
      isDraggingRef.current = false;
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      sphericalRef.current.radius = Math.max(
        6,
        Math.min(22, sphericalRef.current.radius + e.deltaY * 0.015)
      );
      updateCameraPosition();
    }

    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    dom.addEventListener('wheel', onWheel, { passive: false });

    // 8. Resize Handler
    function handleResize() {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 450;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    }
    window.addEventListener('resize', handleResize);

    // 9. Animation Render Loop
    let animationFrameId: number;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-orbit when enabled and not user dragging
      if (isAutoRotating && !isDraggingRef.current) {
        sphericalRef.current.theta += autoRotateSpeedRef.current;
        updateCameraPosition();
      }

      renderer.render(scene, camera);
    }
    animate();

    // 10. Clean-up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
      renderer.dispose();
      scene.clear();
    };
  }, [applyLighting, applyMode, initialMode, isAutoRotating, updateCameraPosition]);

  // Handle Mode Change
  function handleModeSelect(newMode: ViewerMode) {
    setMode(newMode);
    applyMode(newMode);
  }

  // Handle Lighting Change
  function handleLightingSelect(preset: LightingPreset) {
    setLighting(preset);
    applyLighting(preset);
  }

  // Reset Camera View
  function handleResetView() {
    sphericalRef.current = {
      radius: 12,
      theta: Math.PI / 4,
      phi: Math.PI / 3,
    };
    updateCameraPosition();
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden select-none border border-[var(--border)] bg-slate-900 shadow-2xl ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[380px] sm:h-[480px] cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Top Header Controls Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2 pointer-events-auto bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-white shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-mono font-semibold tracking-wider uppercase">
            3D BIM Engine v4.2
          </span>
          <span className="text-[10px] text-amber-400 font-mono hidden sm:inline">
            · Real-Time WebGL
          </span>
        </div>

        {/* Action icons: Reset / Auto-rotate / Fullscreen */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            title={isAutoRotating ? 'Pause rotation' : 'Resume rotation'}
            className="p-2 rounded-lg bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleResetView}
            title="Reset Camera View"
            className="p-2 rounded-lg bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {onOpenModal && (
            <button
              onClick={onOpenModal}
              title="Expand 3D Model Explorer"
              className="px-2.5 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-1 font-mono"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Explore Full BIM</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating 3D Hotspot Badges overlay */}
      {isLoaded && (
        <div className="absolute top-16 left-3 z-20 space-y-1.5 pointer-events-none hidden sm:block">
          <div className="text-[10px] font-mono text-white/70 uppercase tracking-widest pl-1">
            Engineering Layers
          </div>
          {HOTSPOTS.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
              className={`pointer-events-auto block text-left px-2.5 py-1 rounded-lg border backdrop-blur-md text-[11px] font-mono transition-all ${
                activeHotspot?.id === spot.id
                  ? 'bg-amber-500 text-black border-amber-300 shadow-md font-bold'
                  : 'bg-black/60 text-white/90 border-white/15 hover:bg-black/80 hover:border-amber-400/50'
              }`}
            >
              • {spot.title}
            </button>
          ))}
        </div>
      )}

      {/* Hotspot Info Popup */}
      {activeHotspot && (
        <div className="absolute bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30 bg-slate-950/95 backdrop-blur-xl border border-amber-500/40 p-4 rounded-2xl text-white shadow-2xl animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
              {activeHotspot.category}
            </span>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-white/60 hover:text-white text-xs font-mono px-1.5 py-0.5 rounded hover:bg-white/10"
            >
              ✕
            </button>
          </div>
          <h5 className="font-bold text-sm text-white mb-1">{activeHotspot.title}</h5>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{activeHotspot.description}</p>
        </div>
      )}

      {/* Bottom Mode Switcher Bar */}
      {showControls && (
        <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 right-2.5 sm:left-3 sm:right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Main Visual Modes */}
          <div className="flex items-center gap-1 pointer-events-auto bg-black/85 backdrop-blur-xl p-1 rounded-xl border border-white/15 shadow-xl overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => handleModeSelect('render')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-medium transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer ${
                mode === 'render'
                  ? 'bg-white text-slate-900 font-bold shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>3D Render</span>
            </button>
            <button
              onClick={() => handleModeSelect('blueprint')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-medium transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer ${
                mode === 'blueprint'
                  ? 'bg-sky-500 text-white font-bold shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Box className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Blueprint</span>
            </button>
            <button
              onClick={() => handleModeSelect('exploded')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-medium transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer ${
                mode === 'exploded'
                  ? 'bg-purple-500 text-white font-bold shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Exploded</span>
            </button>
            <button
              onClick={() => handleModeSelect('structural')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-medium transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer ${
                mode === 'structural'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>PE Framing</span>
            </button>
          </div>

          {/* Lighting Presets */}
          <div className="hidden sm:flex items-center gap-1 pointer-events-auto bg-black/80 backdrop-blur-xl p-1 rounded-xl border border-white/15 shadow-xl">
            <button
              onClick={() => handleLightingSelect('daylight')}
              title="Daylight illumination"
              className={`p-1.5 rounded-lg text-xs font-mono transition-all ${
                lighting === 'daylight' ? 'bg-amber-400 text-black' : 'text-white/70 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleLightingSelect('sunset')}
              title="Golden Hour Sunset"
              className={`p-1.5 rounded-lg text-xs font-mono transition-all ${
                lighting === 'sunset' ? 'bg-orange-500 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleLightingSelect('night')}
              title="Technical Blueprint Night"
              className={`p-1.5 rounded-lg text-xs font-mono transition-all ${
                lighting === 'night' ? 'bg-sky-500 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Mouse Interaction Hint */}
      <div className="absolute bottom-16 right-4 pointer-events-none hidden md:block">
        <span className="text-[10px] font-mono text-white/50 bg-black/50 px-2.5 py-1 rounded-md backdrop-blur border border-white/10">
          🖱 Drag to rotate 360° · Scroll to zoom
        </span>
      </div>
    </div>
  );
}
