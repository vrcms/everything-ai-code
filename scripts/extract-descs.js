// extract-descs.js — Extract all descriptions for batch translation
const fs = require('fs');
const data = JSON.parse(fs.readFileSync(__dirname + '/skills_data.json', 'utf8'));

// Output format: one JSON object per line for batch processing
const output = data.map(s => ({
  dir: s.dir,
  desc: s.desc || ''
}));

fs.writeFileSync(__dirname + '/descs-to-translate.json', JSON.stringify(output, null, 2), 'utf8');
console.log('Extracted', output.length, 'descriptions to descs-to-translate.json');
