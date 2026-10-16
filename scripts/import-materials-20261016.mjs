// One-time import from the locally retained client originals (not run during builds).
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const manifest=JSON.parse(await fs.readFile('../素材/受領_20261016/asset-manifest.json','utf8'));
for(const {source,stem} of manifest){
 const target=`public/images/${stem}`;
 await fs.mkdir(path.dirname(target),{recursive:true});
 await sharp(source).rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).webp({quality:88}).toFile(target+'.webp');
 if(stem.startsWith('works/')) await sharp(source).rotate().resize({width:640,height:640,fit:'inside',withoutEnlargement:true}).webp({quality:82}).toFile(target+'-thumb.webp');
}
console.log(`Imported ${manifest.length} client images`);
