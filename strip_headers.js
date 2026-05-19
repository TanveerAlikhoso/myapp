const fs = require('fs');
const path = require('path');

const stitchDir = path.join(process.cwd(), 'apps/web/public/stitch');
const files = fs.readdirSync(stitchDir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(path.join(stitchDir, f), 'utf8');
  content = content.replace(/<header[\s\S]*?<\/header>/gi, '');
  fs.writeFileSync(path.join(stitchDir, f), content);
});

console.log('Removed headers from ' + files.length + ' files');
