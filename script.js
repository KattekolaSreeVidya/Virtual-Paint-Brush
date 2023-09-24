const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const colorPicker = document.getElementById('colorPicker');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

let isDrawing = false;
let currentColor = colorPicker.value;

function setColor(e) {
    currentColor = e.target.value;
}

colorPicker.addEventListener('input', setColor);

function startPosition(e) {
    isDrawing = true;
    draw(e);
}

function endPosition() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
}

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function saveDrawing() {
    const canvasDataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = canvasDataUrl;
    a.download = 'my_drawing.png';
    a.click();
}

saveButton.addEventListener('click', saveDrawing);
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

