var gridboxes = document.getElementsByClassName('gridbox');
const gridcontainer = document.getElementById('maingrid').children[0];
var _mousedown = false;

// GRID SIZE
const gridX = 30;
const gridY = 10;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleBox(b){
    const val = b.classList.contains('clicked') ? "0%" : "100%";
    b.style.width = val;
    b.style.height = val;
    b.classList.toggle('clicked');
    b.classList.add('locked');
}

async function toggleBoxFromArray(i,j){
    var b = null;
    await sleep(50);
    try {
        b = gridcontainer.children[i].children[j].children[0];
    } catch (error){
        console.log("There was an Error trying to toggle Box["+i+"]["+j+"]: "+error);
    }
    if (b) toggleBox(b);
}

function setupGrid(){
    Array.from(gridboxes).forEach(gridbox => {
        const gridcontent = gridbox.children[0];
        gridbox.addEventListener("mousedown",function(){
            _mousedown = true;
            unlockGrid();
            if (gridcontent.classList.contains('locked')) return;
            toggleBox(gridcontent);
        })
        gridbox.addEventListener("mousemove",function(){
            if (gridcontent.classList.contains('locked')) return;
            if (_mousedown) toggleBox(gridcontent);
        })
        gridbox.addEventListener("touchmove",function(){
            if (gridcontent.classList.contains('locked')) return;
            toggleBox(gridcontent);
        })
    });
}

function generateGrid(x,y){
    // y times gridx
    // in y: x times gridbox->gridcontent
    x = Math.min(30,x);

    for (var i=0; i<y; i++){
        var gridRow = document.createElement("div");
        gridRow.classList.add("gridx");
        for (var j=0; j<x; j++){
            var gridbox = document.createElement("button");
            var gridcontent = document.createElement("div");
            gridbox.classList.add("gridbox");
            gridbox.setAttribute("type","button");
            gridcontent.classList.add("gridcontent");
            gridbox.append(gridcontent);
            gridRow.append(gridbox);
            gridbox.style.order = j;
        }
        gridcontainer.append(gridRow);
        gridRow.style.order = i;
    }

    setupGrid();
}

function lockGrid(){
    Array.from(gridboxes).forEach(a => {
        const b = a.children[0];
        if (!b.classList.contains('locked')) {
            b.classList.add('locked');
        };
    });
}

function unlockGrid(){
    Array.from(gridboxes).forEach(a => {
        const b = a.children[0];
        if (b.classList.contains('locked')) {
            b.classList.remove('locked');
        };
    });
}

document.body.addEventListener("mouseup",function(){
    _mousedown = false;
});

generateGrid(gridX,gridY);

function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}
for (var i = 0; i < gridX; i++){  
    await toggleBoxFromArray(Math.round(convertRange(i,[0,gridX-1],[0,gridY-1])),i);
}

async function test(i){
    for (var j = 0; j < gridX; j++){  
        await toggleBoxFromArray(i,j);
    }
}
for (var i = 1; i < gridY; i++){  
    test(i);
}
await test(0);
for (var i = 0; i < gridY; i++){  
    test(i);
}

// import { Node } from './node.js';

// const canvas = document.getElementById("can");
// const ctx = canvas.getContext("2d");
// var canvasPos = canvas.getBoundingClientRect();

// const canvasSize = [canvas.width,canvas.height];

// var prevx = 0;
// var prevy = 0;

// var _mousedown = false;
// var _mousebutton = 0;

// ctx.lineWidth = 2;

// function drawLine(x1,y1,x2,y2){
//     ctx.translate(0.5, 0.5);
//     ctx.beginPath();
//     ctx.moveTo(x1,y1);
//     ctx.lineTo(x2,y2);
//     ctx.stroke();
//     ctx.translate(-0.5, -0.5);
// }

// function clearLine(x,y,sizeX,sizeY){
//     ctx.clearRect(x-sizeX/2,y-sizeY/2, sizeX,sizeY);
// }

// function convertRange( value, r1, r2 ) { 
//     return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
// }

// function getPixelAtMousePosition(e){
//     canvasPos = canvas.getBoundingClientRect();
//     var x = convertRange(
//         e.clientX - Math.floor(canvasPos.left), 
//         [0,canvasPos.right-canvasPos.left], 
//         [0,canvasSize[0]]
//     );
//     var y = convertRange(
//         e.clientY - Math.floor(canvasPos.top), 
//         [0,canvasPos.bottom-canvasPos.top], 
//         [0,canvasSize[1]]
//     );
//     return [x,y];
// }

// function isWallAtPixel(pixel,size = 1){
//     if (size == 1){
//         var p = ctx.getImageData(pixel[0], pixel[1], 1, 1).data;
//         return (p[3] == 0) ? false : true;
//     }
//     var p1 = ctx.getImageData(pixel[0]-size, pixel[1]-size, 1, 1).data; // BOTTOM LEFT
//     var p2 = ctx.getImageData(pixel[0]-size, pixel[1]+size, 1, 1).data; // TOP LEFT
//     var p3 = ctx.getImageData(pixel[0]+size, pixel[1]-size, 1, 1).data; // BOTTOM RIGHT
//     var p4 = ctx.getImageData(pixel[0]+size, pixel[1]+size, 1, 1).data; // TOP RIGHT
//     if (p1[3]!=0 || p2[3]!=0 || p3[3]!=0 || p4[3]!=0) return true;
//     return false;
// }

// document.body.addEventListener("mouseup",function(e){ _mousedown = false; });
// canvas.addEventListener("mousedown",function(e){
//     const pixelAtMousePosition = getPixelAtMousePosition(e);
//     prevx = pixelAtMousePosition[0];
//     prevy = pixelAtMousePosition[1];
//     _mousedown = true;
//     _mousebutton = e.button;
// });

// canvas.addEventListener("mousemove",function(e){
//     if (!_mousedown) return;
//     const pixelAtMousePosition = getPixelAtMousePosition(e);
//     const x = pixelAtMousePosition[0];
//     const y = pixelAtMousePosition[1];
//     if (_mousebutton == 0) drawLine(prevx,prevy,x,y);
//     else clearLine(x,y,20,20);
//     prevx = x;
//     prevy = y;
// });

// // HERE BEGINS THE A* ALGORITHM

// var nodeRadius = 1;
// var grid = new Array(gridSizeX);
// var gridWorldSize = {x: canvas.offsetWidth, y: canvas.offsetHeight};
// var gridSizeX, gridSizeY, nodeDiameter;

// var nodeIndex = 0;

// // TEST FUNCTION
// function drawNode(node){
//     if (!node) return;
//     var nodeDiv = document.createElement('div');
//     nodeDiv.style.height = nodeDiameter+"px";
//     nodeDiv.style.width = nodeDiameter+"px";
//     nodeDiv.style.backgroundColor = 'gray';
//     nodeDiv.style.position = 'absolute';
//     nodeDiv.style.left = node.position.x+"px";
//     nodeDiv.style.top = node.position.y+"px";
//     nodeDiv.id = getNodeId(node);
//     document.querySelector('#candiv').append(nodeDiv);
// }

// function undrawNode(node){
//     var nodeDiv = document.getElementById(getNodeId(node));
//     if (nodeDiv) nodeDiv.remove();
// }

// function getNodeId(node){
//     return Math.round(node.position.x+node.position.y);
// }

// function Start(){
//     nodeDiameter = nodeRadius * 2;
//     gridSizeX = Math.round(gridWorldSize.x/nodeDiameter);
//     gridSizeY = Math.round(gridWorldSize.y/nodeDiameter);
//     CreateGrid();
// };

// function CreateGrid(){
//     var worldBottomLeft = [canvasPos.left,canvasPos.top];

//     for (var x = 0; x < gridSizeX; x++){
//         grid[x] = new Array(gridSizeY);
//         for (var y = 0; y < gridSizeY; y++){
//             const worldPoint = [worldBottomLeft[0]+(x*nodeDiameter + nodeRadius),worldBottomLeft[1]+(y*nodeDiameter + nodeRadius)]
//             const walkable = !isWallAtPixel(worldPoint,nodeRadius);
//             grid[x][y] = new Node(worldPoint, walkable);
//             //drawNode(grid[x][y]);
//         }
//     }
// }

// Start();
// console.log(grid);