require('prototype.spawn') ();
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const roleWallRepairer = require('role.WallRepairer');
const config = require('config');

module.exports.loop = function () {

    // clear memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
            delete Memory.creeps[name];
        }
    }

    // run role's script if correct role
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role  === 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role === 'repairer') {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role === 'wallrepairer')  {
            roleWallRepairer.run(creep);
        }
    }
    
    var towers = Game.rooms.W8N3.find(FIND_STRUCTURES, {
        filter: (c) => c.structureType === STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target !== undefined) {
            tower.attack(target);
        }
    }

    // set min. number of harvesters
    var minumNumberOfHarvesters = config.harvester;
    // set min. number of upgraders
    var minumNumberOfUpgraders = config.upgrader;
    // set min. number of builders
    var minumNumberOfBuilders = config.builder;
    // set min. number of repairers
    var minumNumberOfRepairers = config.repairer;
    // set min. number of wall repairers
    var minumNumberOfWallRepairers = config.wallrepairer;

    // get number of harvesters
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester');
    // get number of upgraders
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader');
    // get number of builders
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role === 'builder');
    // get number of repairers
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role === 'repairer');
    // get number of wall repairers
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role === 'wallrepairer');

    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

    // compare number of harvesters to min.
    if (numberOfHarvesters < minumNumberOfHarvesters) {
        // spawn harvester and store it in var name
        var name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');

        if (name === ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters === 0) {
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
        // if spawned, print name of new harvester
        if (!(name < 0)) {
            console.log("Spawned new harvester creep: " + name);
            numberOfHarvesters++;
            console.log("Total harvesters:" + numberOfHarvesters + "/" + minumNumberOfHarvesters);
        }
    }
    // compare the number of upgraders to min.
    else if (numberOfUpgraders < minumNumberOfUpgraders) {
        // spawn upgrader and store it in var name
        var name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
        // if spawned, print name of new upgrader
        if (!(name < 0)) {
            console.log("Spawned new upgrader creep: " + name);
            numberOfUpgraders++;
            console.log("Total upgraders:" + numberOfUpgraders + "/" + minumNumberOfUpgraders);
        }
    }
    // compare the number of builders to the min.
    else if (numberOfBuilders < minumNumberOfBuilders) {
        // spawn builder and store it in var name
        var name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
        // if spawned, print name of new builder
        if (!(name < 0)) {
            console.log("Spawned new builder creep: " + name);
            numberOfBuilders++;
            console.log("Total builders:" + numberOfBuilders + "/" + minumNumberOfBuilders);
        }
    }
    // compare the number of repairers to the min.
   else if (numberOfRepairers < minumNumberOfRepairers) {
        // spawn repairer and store it in var name
            var name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
        // if spawned, print name of new repairer
        if (!(name < 0)) {
            console.log("Spawned new repairer creep: " + name );
            numberOfRepairers++;
            console.log("Total repairers:" + numberOfRepairers + "/" + minumNumberOfRepairers);
        }
    }
    // compare the number of wall repairers to the min.
    else if (numberOfWallRepairers < minumNumberOfWallRepairers) {
        // spawn wall repairer and store it in var name
        var name = Game.spawns.Spawn1.createCustomCreep(energy, 'wallrepairer');
        // if spawned, print name of new wall repairer
        if (!(name < 0)) {
            console.log("Spawned new wall repairer creep: " + name );
            numberOfWallRepairers++;
            console.log("Total wall repairers:" + numberOfWallRepairers + "/" + minumNumberOfWallRepairers);
        }
    }
};