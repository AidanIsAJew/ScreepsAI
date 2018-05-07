var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {

    // clear memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    // run role's script if correct role
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role  == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    // set min. number of harvesters
    var minumNumberOfHarvesters = 4;
    // set min. number of upgraders
    var minumNumberOfUpgraders = 4;
    // set min. number of builders
    var minumNumberOfBuilders = 3;
    // set min. number of repairers
    var minumNumberOfRepairers = 2;

    // get number of harvesters
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    // get number of upgraders
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    // get number of builders
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    // get number of repairers
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

    // print numbers of harvesters
    console.log('Harvesters:' + numberOfHarvesters);
    // print number of upgraders
    console.log('Upgraders:' + numberOfUpgraders);
    // print number of builders
    console.log('Builders:' + numberOfBuilders);
    // print number of repairers
    console.log('Repairers:' + numberOfRepairers);

    // compare number of harvesters to min.
    if (numberOfHarvesters < minumNumberOfHarvesters) {
        // spawn harvester and store it in var name
        var name = Game.spawns.spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined,
            {role: 'harvester', working: false});
        // if spawned, print name of new harvester
        if (!(name < 0)) console.log("Spawned new harvester creep: " + name);
    }
    // compare the number of upgraders to min.
    else if (numberOfUpgraders < minumNumberOfUpgraders) {
        // spawn upgrader and store it in var name
        var name = Game.spawns.spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined,
            {role: 'upgrader', working: false});
        // if spawned, print name of new upgrader
        if (!(name < 0)) console.log("Spawned new upgrader creep: " + name);
    }
    // compare the number of builders to the min.
    else if (numberOfBuilders < minumNumberOfBuilders) {
        // spawn builder and store it in var name
        var name = Game.spawns.spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined,
            {role: 'builder', working: false});
        // if spawned, print name of new builder
        if (!(name < 0)) console.log("Spawned new builder creep: " + name);
    }
    // compare the number of repairers to the min.
   else if (numberOfRepairers < minumNumberOfRepairers) {
        // spawn repairer and store it in var name
            var name = Game.spawns.spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined,
                {role: 'repairer', working: false});
        // if spawned, print name of new repairer
        if (!(name < 0)) console.log("Spawned new repairer: " + name);
    }
};