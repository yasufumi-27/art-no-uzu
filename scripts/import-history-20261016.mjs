import fs from 'node:fs/promises';
import sharp from 'sharp';
await fs.mkdir('public/images/history',{recursive:true});
for(const year of [2019,2020,2021,2023]) await sharp(`../素材/受領_20261016/history/${year}.jpg`).rotate().resize({width:1000,height:700,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toFile(`public/images/history/${year}.webp`);
