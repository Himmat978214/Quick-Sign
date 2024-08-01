const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontSize = document.getElementById("fontSize");
const myCanvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retriveButton = document.getElementById("retriveButton");

const ctx = myCanvas.getContext('2d');

colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
  //  ctx.fillStyle = e.target.value;
})

myCanvas.addEventListener('mousedown',(e)=>{
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})

myCanvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beingPath();
        ctx.moveTo(lastX,lastY)
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;

    }
});

// myCanvas.addEventListener('mouseup',()=>{
//     isDrawing = false;
// })

myCanvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return; // Stop the function if not drawing
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
});
myCanvas.addEventListener('mouseup', () => isDrawing = false);
myCanvas.addEventListener('mouseout', () => isDrawing = false);

canvasColor.addEventListener('change', (e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500)
})

fontSize.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;
})

clearButton.addEventListener('click',(e)=>{
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
})

saveButton.addEventListener('click',()=>{
    localStorage.setItem('canvasContents' , myCanvas.toDataURL());

    let link = document.createElement('a');

    link.download = 'my-canvas.png';
    link.href = myCanvas.toDataURL();
    link.click();
})

retriveButton.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvasContents');

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drwaImage(img,0,0)
    }
})
