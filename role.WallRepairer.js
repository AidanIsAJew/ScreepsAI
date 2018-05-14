/*
This script will make the repairer type creeps--or any creep acting as a repairer(see role.builder.js)--
harvest energy then repair the weakest structure. If there is no structure to repair then it will assume the
duties of an upgrader(see role.upgrader.js).
 */

var functionHarvestSource = require('function.harvestSource');
var roleUpgrader = require('role.upgrader');
var config = require('config');

module.exports = {
    run: function (creep) {

        // find the structures that needs repair
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax && object.structureType == STRUCTURE_WALL
        });
        // sort the structures by lowest hit points
        targets.sort((a,b) => a.hits - b.hits);

        var hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
        if(hostiles.length > 0) {
            creep.say('OMG!😨', true);
            creep.moveTo(Game.spawns[config.spawn]);
        }
        else {
            // if the creep is repairing and has no energy set working to false
            if (creep.memory.working == true && creep.carry.energy == 0) {
                creep.memory.working = false;
            }
            // if the creep is repairing and is full of energy set working to true
            else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = true;
            }

            // if the creep is supposed to be repairing then make em'
            if (creep.memory.working == true) {
                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                        creep.say('✔🝙');
                    }
                }
                // if there is nothing else to repair, become a upgrader
                else {
                    roleUpgrader.run(creep);
                }
            }
            // if the creep is not repairing then they are harvesting energy
            else {
                creep.say('❌🝙');
                functionHarvestSource.run(creep);
            }
        }
    }
};