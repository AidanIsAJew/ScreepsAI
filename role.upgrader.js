/*
This script will make the upgrader type creeps--or any creep acting as an upgrader(see role.repairer.js)--
harvest energy then transfer it to the room controller.
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
                    creep.say('✔👆🅰️');
                }
            }
            // if the creep is not upgrading then they are harvesting energy
            else {
                creep.say('❌👆🅰');
                functionHarvestSource.run(creep);
            }
        }
    }
};