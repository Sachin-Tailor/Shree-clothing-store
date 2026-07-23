const fs = require('fs');
const path = require('path');

const srcImage = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\9e02a24b-3af4-4287-8336-e74d81843bdb\\hero_saree_final_1784732828441.png';
const destDir = 'C:\\Users\\ASUS\\Desktop\\Shree A\\public';
const destImage = path.join(destDir, 'hero_saree.png');

console.log('--- COPYING GENERATED RED SAREE IMAGE ---');
console.log('Source exists:', fs.existsSync(srcImage));

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log('Created public directory');
  }

  if (fs.existsSync(srcImage)) {
    fs.copyFileSync(srcImage, destImage);
    console.log('Successfully copied image to:', destImage);
  } else {
    console.error('Source image not found at:', srcImage);
  }
} catch (err) {
  console.error('Error during copy:', err.message);
}
