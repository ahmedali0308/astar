class Node {
    constructor(position, walkable,element){
        this.position = {x: position[0], y: position[1]};
        this.walkable = walkable;
        this.element = element;
        this.hCost = 0;
        this.gCost = 0;
        this.parent;
    }
    get fCost(){
        return this.hCost + this.gCost;
    }
}