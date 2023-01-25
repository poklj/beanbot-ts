class BuildAction implements TaskAction {

    site!: ConstructionSite;
    constructor(buildSite: ConstructionSite) {
        this.site = buildSite;
    }

    requirements = [
        new CreepCanWork(),
        new CreepHasEnergy(),
        new CreepIsNear(this.site.pos, 3)
    ];

    action (creep: Creep){
        if(creep.build(this.site) !== OK) {
            return true; //Unable to build, end task
        }
        return false; //Task not complete.
    }

}
