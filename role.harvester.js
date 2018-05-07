/*
This script will make the harvesting type creeps harvest energy from the nearest source. Then will make
the creep, now full of energy, will try to transfer it to "spawn1".
 */

module.exports = {
    run: function (creep) {

        // if the creep is transferring energy and has no energy set working to false
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        // if the creep is gathering and is full of energy set working to true
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        // if the creep is supposed to be transferring then make em'
        if (creep.memory.working == true) {
            if (creep.transfer(Game.spawns.spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.spawn1);
            }
        }
        // if the creep is not upgrading then they are harvesting energy
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};