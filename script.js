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
 radius:380,
 base:800
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
 // =============================
// NAMA PESERTA
// =============================

let text = (nama.value || "NAMA PESERTA").toUpperCase();

// Ukuran awal lebih kecil
let size = 42;

// Mengecil otomatis jika nama panjang
do{

    ctx.font = "bold " + size + "px Poppins";

    if(ctx.measureText(text).width < 620){

        break;

    }

    size--;

}while(size > 24);

// Posisi tulisan
const namaX = 540;
const namaY = 255;

// Efek tulisan
ctx.textAlign = "center";
ctx.textBaseline = "middle";

ctx.lineWidth = 7;
ctx.strokeStyle = "#FFFFFF";

ctx.fillStyle = "#004EA8";

ctx.shadowColor = "rgba(0,0,0,0.25)";
ctx.shadowBlur = 8;
ctx.shadowOffsetY = 2;

ctx.strokeText(text, namaX, namaY);
ctx.fillText(text, namaX, namaY);

ctx.shadowBlur = 0;
ctx.shadowOffsetY = 0;
}

function downloadPNG(){
 draw();
 let a=document.createElement("a");
 a.href=canvas.toDataURL("image/png");
 a.download="Twibbon_MPLS.png";
 a.click();
}
