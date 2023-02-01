class WithdrawAction implements TaskAction {
    destContainer!: AnyStructure;
    resourceType: ResourceConstant;
    constructor(container: AnyStructure, resource: ResourceConstant) {
        this.destContainer = container;
        this.resourceType = resource;
    }
    cost(creep: Creep){
        return 0;
    }

    requirements = [
        new CreepIsNear(this.destContainer.pos, 1)
    ];


    action(creep: Creep) {
        creep.withdraw(this.destContainer, this.resourceType)
        return true; // Just return true, nothing we can do if the withdraw fails.
    }


}
