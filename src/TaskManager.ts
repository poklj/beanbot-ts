class TaskManager {

    taskInQueue:TaskRequest[] = []; //Queue of TaskRequests


    taskQueue:Map<CreepState, TaskRequest> = new Map();

    unAssignedCreeps:CreepState[] = [];
    creepStates: {[key: string]:CreepState} = {};


    constructor(){
        //TODO: Store The task queues in memory so we can restart and keep state. then add the creeps to the holding pit.

        //Get all creeps and ensure they're in our CreepState list.
        //TODO: Load this in from Memory
        for (const creep in Game.creeps) {
            if(!this.creepStates[creep]) {
                this.creepStates[creep] = new CreepState(Game.creeps[creep]);
            }
        }

        //Shunt all creeps from the creepstates into the Unassigned pool.
        //TODO: load this from memory and then do a OuterJoin between Creepstates and taskqueue to ensure everyone is
        for(var creep in this.creepStates) {
            this.unAssignedCreeps.push(this.creepStates[creep]);
        }
    }

    createTask(request:TaskRequest) {
        request.status = "PENDING";
        this.taskInQueue.push(request);
    }


    //find the creep that is able to acomplish this with the least amount of cost.
    assignCreep(taskRequest:TaskRequest){
        let actionSet = new Set();



        for(var creep in this.unAssignedCreeps) {
            let TotalCost:number = 0;

            for(var req in taskRequest.task.requirements) { //for every requirement
                var requirements = taskRequest.task.requirements[req].toMeet(this.unAssignedCreeps[creep].objCreep)
                for(var i in requirements) {

                }
        }
    }

    proc(){
        if(this.taskInQueue.length > 0) {

        }
    }
}
