

//Following jonwinsley's methodology cause this seems like a good idea https://www.jonwinsley.com/screeps/2020/09/21/screeps-task-management/

/**
 *  An action a Creep can fulfil with it's requirements.
 *
 * */
interface TaskRequest {
    task: TaskAction;
    status: "PENDING"|"INPROCESS"|"COMPLETE";
}

/**
 * The action that one wishes a creep to take
 * requirements: Task requirements to complete.
 * action: executes the action
 *  */
interface TaskAction {
    requirements: TaskPrerequisite[];
    action: (creep: Creep) => boolean; // False = action Not complete, True = action Complete
    cost:(creep:Creep) => number;
}

interface TaskPrerequisite {
    meets: (creep: Creep) => boolean; //
    toMeet: (creep: Creep) => TaskAction[]; // a list of actions a creep needs to take to meet a prerequesite for the action.
}

class CreepCanWork implements TaskPrerequisite {
    meets(creep: Creep) {
        return creep.getActiveBodyparts(WORK) > 0;
    }
    toMeet() {
        return [];
    };
}

class CreepCanMove implements TaskPrerequisite {
    meets(creep: Creep) {
        return creep.getActiveBodyparts(MOVE) > 0;
    }
    toMeet(creep: Creep){
        return [];
    }
}

class CreepCanHold implements TaskPrerequisite {
    meets(creep: Creep) {
        return creep.store.getFreeCapacity() > 0;
    }
    toMeet(creep: Creep) {

        var container:AnyStructure[] = creep.room.find(FIND_STRUCTURES).filter((structure:AnyStructure) => structure.structureType == STRUCTURE_CONTAINER);

        return [
            new DepositAction(container[0], RESOURCE_ENERGY)
        ]
    }
}

class CreepIsNear implements TaskPrerequisite {
    pos: RoomPosition;
    distance: Number;
    constructor(position:RoomPosition, distanceTo:Number) {
        this.pos = position;
        this.distance = distanceTo;
    }
    meets(creep: Creep) {
        return creep.pos.getRangeTo(this.pos) > this.distance;
    }
    toMeet(){
        return [
            new MoveAction(this.pos)
        ]
    }
}

class CreepHasEnergy implements TaskPrerequisite {
    meets(creep: Creep) {
        return creep.store.energy > 0;
    }
    toMeet(creep: Creep) {
        if(creep.store.getCapacity() == 0) {
            return []; // cannot Actively get energy due to not having a way to carry any more.
        }
        return creep.room.find(FIND_STRUCTURES).filter((structure:AnyStructure) => {
            return structure.structureType == STRUCTURE_CONTAINER;

        }).map((structure:AnyStructure) => new WithdrawAction(structure, RESOURCE_ENERGY));
    }
}

