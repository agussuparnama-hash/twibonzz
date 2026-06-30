const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
const frame=new Image();
frame.src='frame.png';
let photo=null;
let zoom=1,posX=540,posY=390;
const nama=document.getElementById('nama');
document.getElementById('zoom').oninput=e=>{zoom=+e.target.value;draw();}
document.getElementById('foto').onchange=e=>{
 const f=e.target.files[0];
 if(!f)return;
 const r=new FileReader();
 r.onload=ev=>{
   photo=new Image();
   photo.onload=draw;
   photo.src=ev.target.result;
 };
 r.readAsDataURL(f);
};
nama.oninput=draw;
let drag=false,last={x:0,y:0};
canvas.onmousedown=e=>{drag=true;last={x:e.offsetX,y:e.offsetY};}
window.onmouseup=()=>drag=false;
canvas.onmousemove=e=>{
 if(!drag)return;
 const s=canvas.width/canvas.clientWidth;
 posX+=(e.offsetX-last.x)*s;
 posY+=(e.offsetY-last.y)*s;
 last={x:e.offsetX,y:e.offsetY};
 draw();
};
frame.onload=draw;
function draw(){
 ctx.clearRect(0,0,1080,1080);
 if(photo){
   ctx.save();
   ctx.beginPath();
   ctx.arc(540,390,290,0,Math.PI*2);
   ctx.clip();
   const sc=Math.max(600/photo.width,600/photo.height)*zoom;
   const w=photo.width*sc,h=photo.height*sc;
   ctx.drawImage(photo,posX-w/2,posY-h/2,w,h);
   ctx.restore();
 }
 if(frame.complete)ctx.drawImage(frame,0,0,1080,1080);
 let text=(nama.value||'NAMA PESERTA').toUpperCase();
 let size=56;
 do{
   ctx.font=size+'px Luckiest Guy';
   if(ctx.measureText(text).width<760)break;
   size--;
 }while(size>28);
 ctx.textAlign='center';
 ctx.lineWidth=8;
 ctx.strokeStyle='white';
 ctx.fillStyle='#0048B5';
 ctx.strokeText(text,540,95);
 ctx.fillText(text,540,95);
}
function downloadTwibbon(){
 draw();
 const a=document.createElement('a');
 a.download='twibbon.png';
 a.href=canvas.toDataURL('image/png');
 a.click();
}
