const fs = require('fs');
const path = require('path');

const pages = [
  { dir: 'allied-services', name: 'Allied Services' },
  { dir: 'audit-and-offerings', name: 'Audit & Offerings' },
  { dir: 'sustainability-services', name: 'Sustainability Services' },
  { dir: 'technical-services', name: 'Technical Services' },
  { dir: 'transition-services', name: 'Transition Services' }
];

pages.forEach(page => {
  const filePath = path.join(__dirname, 'src', 'app', 'services', page.dir, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the Hard FM image alt
    content = content.replace(/alt="Hard FM Overview"/g, `alt="${page.name} Overview"`);
    
    // We'll leave src as "/HardFm.jpg" for now unless there are other images available, 
    // but the alt tag will be updated.
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Fixed image alts.');
