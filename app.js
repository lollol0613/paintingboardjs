const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
//const paint = document.getElementById("jsPaint");
const remove = document.getElementById("jsRemove");
const save = document.getElementById("jsSave");
const date = new Date();
const time = date.getTime();

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
   const x = event.offsetX;
   const y = event.offsetY;

   if(!painting) {
       ctx.beginPath();
       ctx.moveTo(x, y);
   } else {
       ctx.lineTo(x, y);
       ctx.stroke();
   }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if(filling === true) {
        filling = false;
        mode.className = "fas fa-fill-drip";
    } else {
        filling = true;
        mode.className = "fas fa-paint-brush";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
}

function handleRemoveClick() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        //filling = false;
}

function handleContextMenu(event) {
    event.preventDefault();
}

function saveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "pb_export_" + time;
    link.click();
}
/*
function handleFillClick(event) {
    if(filling !== true) {
        filling = true;
    } else {
        filling = false;
    }
}
function handlePaintClick(event) {
    if(filling === true) {
        filling = false;
    } else {
        filling = true;
    }
}

function fillCanvas(){
    if(filling) {
        ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
    }
}
*/
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(color).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}
/*
if(fill) {
    fill.addEventListener("click", handleFillClick);
    stopPainting();
}
if(paint) {
    paint.addEventListener("click", handlePaintClick);
}
*/
if(mode) {
    mode.addEventListener("click", handleModeClick);
}
if(remove) {
    remove.addEventListener("click", handleRemoveClick);
}
if(save) {
    save.addEventListener("click", saveClick);
}