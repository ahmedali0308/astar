var gridboxes = document.getElementsByClassName('gridbox');
const gridcontainer = document.getElementById('maingrid').children[0];
var _mousedown = false;

// GRID SIZE
const gridX = 30;
const gridY = 10;

function toggleBox(b){
    const val = b.classList.contains('clicked') ? "0%" : "100%";
    b.style.width = val;
    b.style.height = val;
    b.classList.toggle('clicked');
    b.classList.add('locked');
}

function toggleBoxFromArray(i,j){
    var b = null;
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
    toggleBoxFromArray(Math.round(convertRange(i,[0,gridX-1],[0,gridY-1])),i);
}