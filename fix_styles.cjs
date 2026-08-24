const fs = require('fs');
let c = fs.readFileSync('src/components/AdminPanel.jsx', 'utf8');

const targetClass = 'w-full p-2 border border-gray-400 dark:border-gray-600 rounded bg-white dark:bg-zinc-800 text-black dark:text-white';

c = c.replace(/className="p-2 border rounded text-black"/g, `className="${targetClass}"`);
c = c.replace(/className="p-2 border rounded"/g, `className="${targetClass}"`);
c = c.replace(/className="p-2 border rounded h-24"/g, `className="${targetClass} h-24"`);
c = c.replace(/className="p-2 border rounded h-20"/g, `className="${targetClass} h-20"`);
c = c.replace(/className="w-full p-2 border rounded text-black"/g, `className="${targetClass}"`);

fs.writeFileSync('src/components/AdminPanel.jsx', c);
console.log('Fixed styles');
