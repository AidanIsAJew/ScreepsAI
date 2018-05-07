var roleRepaierer = require('role.repairer');
module.exports = {
    run: function (creep) {

        // find the construction sites in a room
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        // sort the construction sites based on which is the lowest hp
        targets.sort((a,b) => a.hits - b.hits);

        // if the creep is building and has no energy set working to false
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        // if the creep is building and is full of energy set working to true
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        // if the creep is supposed to be building then make em'
        if (creep.memory.working == true) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
            // if there is nothing else to build become a repairer
            else {
                roleRepaierer.run(creep);
            }
        }
        // if the creep is not repairing then they are harvesting energy
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};