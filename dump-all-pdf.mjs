import { readFileSync, writeFileSync } from 'fs';
import { getDocument } from 'pdfjs-dist/build/pdf.mjs';

async function main() {
  const data = new Uint8Array(readFileSync('ProArch-Website.pdf'));
  const doc = await getDocument({ data, useSystemFonts: true }).promise;
  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const txt = await page.getTextContent();
    fullText += `\n--- PAGE ${i} ---\n` + txt.items.map(x => x.str).join(' ');
  }
  writeFileSync('pdf-full-text.txt', fullText, 'utf8');
  console.log(`Saved ${doc.numPages} pages to pdf-full-text.txt`);
}

main().catch(console.error);
