const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".controls__color");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");
const reset = document.querySelector("#jsSet");

// Reset
const VIEW_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = VIEW_COLOR;
ctx.fillStyle = VIEW_COLOR;
ctx.lineWidth = 2.5;



let painting = false;
let filling = false;

function startPainting() {
    painting = true
}
function stopPainting() {
    painting = false
}

function mouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function canvasFill() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}


if(canvas) {
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", canvasFill);
    // 우클릭 방지
    canvas.addEventListener("contextmenu", (e)=> {
        e.preventDefault();
    });
}

// 컬러변경
colors.forEach(() => {
    this.addEventListener("click", (e)=>{
        const color = e.target.style.backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    })
});

// 브러쉬 크기 조절
if (range) {
    range.addEventListener("input", (e)=>{
        const size = e.target.value;
        ctx.lineWidth = size;
    })
}

// Fill or Paint
if(mode) {
    mode.addEventListener("click", ()=>{
        if (filling == true) {
            mode.innerText = "Fill";
            filling = false
        } else {
            mode.innerText = "Paint";
            filling = true
        }
    })
}

// Save
if (save) {
    save.addEventListener("click", ()=> {
        const url = canvas.toDataURL();
        const a = document.createElement("a");
        a.href = url;
        a.download = "PaintJS[Good]";
        a.click();
    })
}

// Reset
if (reset) {
    reset.addEventListener("click", ()=> {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.beginPath();
    })
}