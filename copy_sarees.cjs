const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\99a90ff1-734a-4ea9-9dc3-7ba01e5658cd';
const destDir = 'C:\\Users\\ASUS\\Desktop\\Shree A\\public';

const mappings = {
  'red_zari_saree_1784734703223.png': 'red_zari_saree.png',
  'blue_pink_saree_1784734719966.png': 'blue_pink_saree.png',
  'green_net_saree_1784734735390.png': 'green_net_saree.png',
  'yellow_bridal_saree_1784734751559.png': 'yellow_bridal_saree.png',
  'orange_anarkali_kurti_1784736058178.png': 'orange_anarkali_kurti.png',
  'green_bandhani_kurti_1784736076854.png': 'green_bandhani_kurti.png',
  'black_butterfly_kurti_1784736098588.png': 'black_butterfly_kurti.png',
  'blue_lace_kurti_1784736119149.png': 'blue_lace_kurti.png',
  'indigo_kurti_1784736143224.png': 'indigo_kurti.png',
  'pink_bandhani_dupatta_1784777250904.png': 'pink_bandhani_dupatta.png',
  'patola_silk_dupatta_1784777330321.png': 'patola_silk_dupatta.png',
  'phulkari_dupatta_1784777377227.png': 'phulkari_dupatta.png',
  'yellow_patola_dupatta_1784777481098.png': 'yellow_patola_dupatta.png',
  'kalamkari_dupatta_1784777506496.png': 'kalamkari_dupatta.png',
  'blue_cargo_jeans_1784778800020.png': 'blue_cargo_jeans.png',
  'light_skinny_jeans_1784778820876.png': 'light_skinny_jeans.png',
  'dark_wide_jeans_1784778842126.png': 'dark_wide_jeans.png',
  'ring_seam_jeans_1784778864202.png': 'ring_seam_jeans.png',
  'brown_cargo_jeans_1784778883284.png': 'brown_cargo_jeans.png',
  'orange_smile_tshirt_1784779369935.png': 'orange_smile_tshirt.png',
  'brown_hearts_tshirt_1784779418631.png': 'brown_hearts_tshirt.png',
  'gothic_anime_tshirt_1784779446549.png': 'gothic_anime_tshirt.png',
  'media__1784779227016.png': 'crow_y2k_tshirt.png',
  'media__1784779254713.png': 'cross_wings_tshirt.png',
  'media__1784786622969.jpg': 'hero_bg.jpg'
};

console.log('--- COPYING GENERATED SAREE, KURTI, DUPATTA, JEANS & TSHIRT IMAGES ---');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log('Created public directory');
  }

  for (const [srcName, destName] of Object.entries(mappings)) {
    const srcPath = path.join(srcDir, srcName);
    const destPath = path.join(destDir, destName);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcName} -> ${destName}`);
    } else {
      console.error(`Source not found: ${srcPath}`);
    }
  }
  
  console.log('Copy operation completed.');
} catch (err) {
  console.error('Error copying files:', err.message);
}
