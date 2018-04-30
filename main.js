var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    // clear memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }

    var minumNumberOfHarvesters = 4;
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    console.log('Harvesters:' + numberOfHarvesters);
    var minumNumberOfUpgraders = 4;
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    console.log('Upgraders:' + numberOfUpgraders);

    if (numberOfHarvesters < minumNumberOfHarvesters) {
        var name = Game.spawns.spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined,
            {role: 'harvester', working: false});
        if (!(name < 0)) console.log("Spawned new harvester creep: " + name);
    }
    else if (numberOfUpgraders < minumNumberOfUpgraders) {
        var name = Game.spawns.spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined,
            {role: 'upgrader', working: false});
        if (!(name < 0)) console.log("Spawned new upgrader creep: " + name);
    }
};