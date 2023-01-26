class HarvestAction implements TaskAction {
    requirements = [
        new CreepCanWork(),
        new 
    ];

    action: (creep: Creep) => boolean;

}
