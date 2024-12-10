export class Node {
    constructor(position, walkable,element){
        this.position = {x: position[0], y: position[1]};
        this.walkable = walkable;
        this.element = element;
    }
}