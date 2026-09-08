const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function extractText(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const allText = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    allText.push(`--- PAGE ${i} ---`);
    allText.push(strings.join(' '));
  }
  return allText.join('\n');
}

async function main() {
  for (const f of ['ProArch-Website.pdf', 'ProArch-Site-Map.pdf']) {
    console.log(`\n${'='.repeat(60)}\n${f}\n${'='.repeat(60)}`);
    try {
      console.log(await extractText(f));
    } catch(e) {
      console.error('Error:', e.message);
    }
  }
}
main();
