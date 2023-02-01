class MoveAction implements TaskAction{

    destination: RoomPosition;
    distance: number;
    constructor(dest:RoomPosition, RangeTo?:number) {
        this.destination = dest;
        if(RangeTo) {
            this.distance = RangeTo;
        } else {
            this.distance = 1;
        }
    }

    requirements = [
        new CreepCanMove()
    ];

    action(creep: Creep) {
        var actionResult = creep.moveTo(this.destination);

        if(actionResult == ERR_NO_PATH ||
            actionResult == ERR_NOT_OWNER ||
            actionResult == ERR_NO_BODYPART ||
            actionResult == ERR_INVALID_TARGET) return true; //Unrecoverable error.

        return creep.pos.inRangeTo(this.destination, this.distance);
    }

    //The cost to move a creep towards the actions destination.
    cost(creep: Creep):number{
        return creep.pos.getRangeTo(this.destination);
    }
}

