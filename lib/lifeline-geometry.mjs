const AGES=[21,30,40,50,60,70,80,90,100];
const YEARS=79, STEP=.02;
// Stretch the connecting distance, while keeping the artist's local bends
// proportional in both the narrow mobile band and the desktop gutter.
export function buildArtistLine(art,mode,size,length){
 if(!art?.points?.length||art.anchors?.length!==9)return null;
 const input=art.points,ys=input.map(p=>p[1]*3/16),middle=(Math.min(...ys)+Math.max(...ys))/2;
 const scale=Math.min(mode==='band'?500:2400,(size*.72)/Math.max(.02,Math.max(...ys)-Math.min(...ys)));
 const pad=mode==='band'?16:4,endRoom=mode==='band'?30:44,span=Math.max(1,length-pad*2-endRoom),pts=[];
 for(let t=0;t<=YEARS+1e-9;t+=STEP){
  const age=21+t;let k=7;for(let n=0;n<8;n++)if(age<=AGES[n+1]){k=n;break;}
  const f=(age-AGES[k])/(AGES[k+1]-AGES[k]),a=art.anchors[k],b=art.anchors[k+1],at=a+(b-a)*f,j=Math.min(input.length-2,Math.floor(at)),u=at-j;
  const x=input[j][0]+(input[j+1][0]-input[j][0])*u,y=(input[j][1]+(input[j+1][1]-input[j][1])*u)*3/16;
  let baseline=input[a][0]+(input[b][0]-input[a][0])*f,progress=t/YEARS;
  // Imported SVG loops keep their proportions: only the connecting stretches
  // grow with the page. Each control is [point index, age progress, source x].
  if(art.backbone?.length){
   const controls=art.backbone;let n=0;
   while(n<controls.length-2&&at>controls[n+1][0])n++;
   const left=controls[n],right=controls[n+1],u=Math.max(0,Math.min(1,(at-left[0])/(right[0]-left[0])));
   progress=left[1]+(right[1]-left[1])*u;
   baseline=left[2]+(right[2]-left[2])*u;
  }
  const along=pad+progress*span+(x-baseline)*scale,across=size/2+(mode==='gutter'?-1:1)*(y-middle)*scale;
  pts.push(mode==='band'?[along,across]:[across,along]);
 }
 // A returning spiral can briefly pass its start/end along the main axis.
 // Keep the whole stroke inside the reserved strip so it cannot expand the page.
 const axis=mode==='band'?0:1,along=pts.map(p=>p[axis]),lo=Math.min(...along),hi=Math.max(...along);
 for(const p of pts)p[axis]=pad+(p[axis]-lo)/Math.max(1e-6,hi-lo)*span;
 let d='';const ends=[];for(let i=0;i<pts.length;i++){d+=`${i?'L':'M'}${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;ends.push(d.length);}
 const milestones=AGES.slice(1).map(age=>pts[Math.min(pts.length-1,Math.round((age-21)/STEP))]);
 return {d,ends,pts,pad,span,milestones,artist:true};
}
