class DepositAction implements TaskAction {
    dest!:AnyStructure
    resType:ResourceConstant
    constructor(destination:AnyStructure, resType:ResourceConstant) {
        this.dest = destination
        this.resType = resType
    }
    requirements = [
        new CreepIsNear(this.dest.pos, 1),
        new CreepHasEnergy()

    ];
    action(creep: Creep) {
        if(creep.transfer(this.dest, this.resType) === OK) {
            return true;
        }
        return true;

    };

}
