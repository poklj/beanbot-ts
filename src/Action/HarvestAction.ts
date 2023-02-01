class HarvestAction implements TaskAction {
    source!:Source;
    requirements = [
        new CreepCanWork(),
        new CreepCanHold(),
        new CreepIsNear(this.source.pos, 1)

    ];

    action(creep: Creep) {
        if(creep.harvest(this.source)
            return true;
    };

}
