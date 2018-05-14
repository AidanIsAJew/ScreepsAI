/*
This script will make the harvesting type creeps harvest energy from the nearest source. Then will make
the creep, now full of energy, will try to transfer it to the closest structure.
 */

var functionHarvestSource = require('function.harvestSource');
var config = require('config');

module.exports = {
    run: function (creep) {
        var hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
        if(hostiles.length > 0) {
            creep.say('OMG!😨', true);
            creep.moveTo(Game.spawns[config.spawn]);
        }
        else {
            // if the creep is transferring energy and has no energy set working to false
            if (creep.memory.working == true && creep.carry.energy == 0) {
                creep.memory.working = false;
            }
            // if the creep is gathering and is full of energy set working to true
            else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = true;
            }
            // if the creep is supposed to be transferring energy then make em'
            if (creep.memory.working == true) {
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => s.energy < s.energyCapacity
                });
                if (structure != undefined) {
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                        creep.say('✔⛏');
                    }
                }
            }
            // if the creep is not upgrading then they are harvesting energy
            else {
                creep.say('❌⛏');
                functionHarvestSource.run(creep);
            }
        }
    }
};