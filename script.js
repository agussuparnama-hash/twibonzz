const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const frame=new Image();
frame.src="frame.png";
const nama=document.getElementById("nama");
const zoom=document.getElementById("zoom");
let foto=null;
let z=1;

// disesuaikan dengan frame
const FOTO={
 x:540,
 y:370,
 radius:330,
 base:700
};

let px=FOTO.x;
let py=FOTO.y;

frame.onload=draw;

document.getElementById("foto").onchange=e=>{
 const f=e.target.files[0];
 if(!f)return;
 const r=new FileReader();
 r.onload=ev=>{
   foto=new Image();
   foto.onload=()=>{
      px=FOTO.x;
      py=FOTO.y;
      draw();
   };
   foto.src=ev.target.result;
 };
 r.readAsDataURL(f);
};

nama.oninput=draw;
zoom.oninput=e=>{z=+e.target.value;draw();}

let drag=false,last={x:0,y:0};
canvas.onmousedown=e=>{drag=true;last={x:e.offsetX,y:e.offsetY};};
window.onmouseup=()=>drag=false;
canvas.onmousemove=e=>{
 if(!drag)return;
 const s=canvas.width/canvas.clientWidth;
 px+=(e.offsetX-last.x)*s;
 py+=(e.offsetY-last.y)*s;
 last={x:e.offsetX,y:e.offsetY};
 draw();
};

function draw(){
 ctx.clearRect(0,0,1080,1080);

 if(foto){
   ctx.save();
   ctx.beginPath();
   ctx.arc(FOTO.x,FOTO.y,FOTO.radius,0,Math.PI*2);
   ctx.closePath();
   ctx.clip();

   let sc=Math.max(FOTO.base/foto.width,FOTO.base/foto.height)*z;
   let w=foto.width*sc;
   let h=foto.height*sc;
   ctx.drawImage(foto,px-w/2,py-h/2,w,h);
   ctx.restore();
 }

 ctx.drawImage(frame,0,0,1080,1080);

 let text=(nama.value||"NAMA PESERTA").toUpperCase();
 let size=56;
 do{
   ctx.font=size+"px Luckiest Guy";
   if(ctx.measureText(text).width<760)break;
   size--;
 }while(size>26);

 ctx.textAlign="center";
 ctx.lineWidth=10;
 ctx.strokeStyle="#ffffff";
 ctx.fillStyle="#004ea8";
 ctx.strokeText(text,540,95);
 ctx.fillText(text,540,95);
}

function downloadPNG(){
 draw();
 let a=document.createElement("a");
 a.href=canvas.toDataURL("image/png");
 a.download="Twibbon_MPLS.png";
 a.click();
}
