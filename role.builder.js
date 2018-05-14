/*
This script will make the builder type creeps harvest energy then repair the weakest structure.
If there is no structure to repair then it will assume the duties of a repairer(see role.repairer.js).
 */

var roleRepairer = require('role.repairer');
var functionHarvestSource = require('function.harvestSource');
var config = require('config');

module.exports = {
    run: function (creep) {

        // find the construction sites in a room
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        // sort the construction sites based on which is the highest hp
         targets.sort((a,b) => b.hits - a.hits);

        var hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
        if(hostiles.length > 0) {
            creep.say('OMG!😨', true);
            creep.moveTo(Game.spawns[config.spawn]);
        }
        else {
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
                    creep.say('✔🔨');
                }
                // if there is nothing else to build become a repairer
                else {
                    roleRepairer.run(creep);
                }
            }
            // if the creep is not repairing then they are harvesting energy
            else {
                creep.say('❌🔨');
                functionHarvestSource.run(creep);
            }
        }
    }
};