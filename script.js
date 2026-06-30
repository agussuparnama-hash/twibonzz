const c=document.getElementById('canvas'),x=c.getContext('2d');
const frame=new Image();frame.src='frame.png';
let img=null,scale=1,off={x:540,y:380},drag=false,last={x:0,y:0};
const nama=document.getElementById('nama');
document.getElementById('zoom').oninput=e=>{scale=+e.target.value;draw();}
document.getElementById('foto').onchange=e=>{
 const f=e.target.files[0];if(!f)return;
 const r=new FileReader();
 r.onload=a=>{img=new Image();img.onload=draw;img.src=a.target.result;}
 r.readAsDataURL(f);
};
nama.oninput=draw;
c.onmousedown=e=>{drag=true;last={x:e.offsetX,y:e.offsetY};}
window.onmouseup=()=>drag=false;
c.onmousemove=e=>{
 if(!drag)return;
 off.x+=(e.offsetX-last.x)*1080/c.clientWidth;
 off.y+=(e.offsetY-last.y)*1080/c.clientWidth;
 last={x:e.offsetX,y:e.offsetY};
 draw();
}
function draw(){
 x.clearRect(0,0,1080,1080);
 x.fillStyle='#fff';x.fillRect(0,0,1080,1080);
 if(img){
  x.save();
  x.beginPath();x.arc(540,360,350,0,Math.PI*2);x.clip();
  let w=img.width*scale,h=img.height*scale;
  let f=Math.max(700/w,700/h);w*=f;h*=f;
  x.drawImage(img,off.x-w/2,off.y-h/2,w,h);
  x.restore();
 }
 if(frame.complete)x.drawImage(frame,0,0,1080,1080);
 x.font='72px Luckiest Guy';
 x.textAlign='center';
 x.lineWidth=10;
 x.strokeStyle='white';
 x.fillStyle='#0057b8';
 x.strokeText(nama.value||'NAMA PESERTA',540,910);
 x.fillText(nama.value||'NAMA PESERTA',540,910);
}
frame.onload=draw;
function download(){
 draw();
 let a=document.createElement('a');
 a.href=c.toDataURL();
 a.download='twibbon.png';
 a.click();
}
