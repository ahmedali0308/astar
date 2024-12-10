function getNeighbors(node){
    var neighbors = new Array();

    for (var x = -1; x<=1; x++){
        for (var y = -1; y<=1; y++){
            if (x == 0 & y == 0) continue;
            var checkX = node.position.x + x;
            var checkY = node.position.y + y;
            if (checkX >= 0 && checkX < gridX && checkY >= 0 && checkY < gridY){
                neighbors.push(grid[checkX][checkY]);
            }
        }
    }
    return neighbors;
}

function findPath(startNode,targetNode,draw=false){
    var openSet = new Array();
    var closedSet = new Set();
    openSet.push(startNode);

    
    var failSafe = 0;

    while (openSet.length > 0 && failSafe < 1000){
        failSafe++;
        var currentNode = openSet[0];
        var currentNodeIndex = 0;
        for (var i = 1; i<openSet.length; i++){
            if (openSet[i].fCost < currentNode.fCost || openSet[i].fCost == currentNode.fCost && openSet[i].hCost < currentNode.hCost){
                currentNode = openSet[i];
                currentNodeIndex = i;
            }
        }
        openSet.splice(currentNodeIndex,1);
        closedSet.add(currentNode);

        if (currentNode == targetNode){
            return retracePath(startNode,targetNode,draw);
        }

        for(let neighbor of getNeighbors(currentNode)){
            if (!neighbor.walkable || closedSet.has(neighbor)) continue;
            var newMovementCostToNeighbor = currentNode.gCost + getDistance(currentNode,neighbor);
            if (newMovementCostToNeighbor < neighbor.gCost || !openSet.includes(neighbor)){
                neighbor.gCost = newMovementCostToNeighbor;
                neighbor.hCost = getDistance(neighbor,targetNode);
                neighbor.parent = currentNode;
                if (!openSet.includes(neighbor)) openSet.push(neighbor);
            }
        };
    }
}

function retracePath(startNode, endNode,draw=false){
    var path = new Array();
    var currentNode = endNode;
    while (currentNode != startNode){
        path.push(currentNode);
        currentNode = currentNode.parent;
    }
    path.reverse();
    return path;
}

async function findPathVis(startNode,targetNode){
    _drawing = true;
    var openSet = new Array();
    var closedSet = new Set();
    openSet.push(startNode);

    
    var failSafe = 0;

    while (openSet.length > 0 && failSafe < 1000){
        if (!_drawing) return;
        failSafe++;
        var currentNode = openSet[0];
        var currentNodeIndex = 0;
        for (var i = 1; i<openSet.length; i++){
            if (openSet[i].fCost < currentNode.fCost || openSet[i].fCost == currentNode.fCost && openSet[i].hCost < currentNode.hCost){
                currentNode = openSet[i];
                currentNodeIndex = i;
            }
        }
        openSet.splice(currentNodeIndex,1);
        closedSet.add(currentNode);

        if (currentNode == targetNode){
            return retracePathVis(startNode,targetNode);
        }

        for(let neighbor of getNeighbors(currentNode)){
            if (!neighbor.walkable || closedSet.has(neighbor)) continue;
            var newMovementCostToNeighbor = currentNode.gCost + getDistance(currentNode,neighbor);
            if (newMovementCostToNeighbor < neighbor.gCost || !openSet.includes(neighbor)){
                neighbor.gCost = newMovementCostToNeighbor;
                neighbor.hCost = getDistance(neighbor,targetNode);
                neighbor.parent = currentNode;
                if (!openSet.includes(neighbor)) openSet.push(neighbor);
            }
        };

        // DRAW OPEN SET AND CLOSED SET
        for(let node of openSet){
            if (node == startNode || node == endNode) continue;
            node.element.children[0].classList.add("pathvis");
            node.element.children[0].style.backgroundColor = "yellow";
            node.element.children[0].style.width = "100%";
            node.element.children[0].style.height = "100%";
        }

        for(let node of closedSet){
            if (node == startNode || node == endNode) continue;
            node.element.children[0].classList.add("pathvis");
            node.element.children[0].style.backgroundColor = "pink";
            node.element.children[0].style.width = "100%";
            node.element.children[0].style.height = "100%";
        }
        await sleep(100);
    }
}

async function retracePathVis(startNode, endNode){
    _drawing = false;
    var path = new Array();
    var currentNode = endNode;
    while (currentNode != startNode){
        path.push(currentNode);
        currentNode = currentNode.parent;
    }
    path.reverse();

    for(let node of path){
        if (node == startNode || node == endNode) continue;
        await sleep(100);
        node.element.children[0].classList.add("path");
        node.element.children[0].style.backgroundColor = "blue";
        node.element.children[0].style.width = "100%";
        node.element.children[0].style.height = "100%";
    }

    return path;
}

function getDistance(nodeA,nodeB){
    const dstX = Math.abs(nodeA.position.x - nodeB.position.x);
    const dstY = Math.abs(nodeA.position.y - nodeB.position.y);
    if (dstX > dstY){
        return 14*dstY+10*(dstX-dstY);
    }
    return 14*dstX+10*(dstY-dstX);
}