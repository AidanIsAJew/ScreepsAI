/*
This script will make the upgrader type creeps--or any creep acting as an upgrader(see role.repairer.js)--
harvest energy then transfer it to the room controller.
 */
module.exports = {
    run: function (creep) {

        // if the creep is upgrading and has no energy set working to false
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        // if the creep is gathering and is full of energy set working to true
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        // if the creep is supposed to be upgrading then make em'
        if (creep.memory.working == true) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
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