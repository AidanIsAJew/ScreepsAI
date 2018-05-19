module.exports = {
    run: function (creep) {
        // pickup dropped energy
        var dropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: { resourceType: RESOURCE_ENERGY}
        });
        if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
            creep.moveTo(dropped);
        }
        // Harvest source
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
};