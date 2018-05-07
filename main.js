var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

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
    }

    // set min. number of harvesters
    var minumNumberOfHarvesters = 4;

    // get number of harvesters
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');

    // print numbers of harvesters
    console.log('Harvesters:' + numberOfHarvesters);

    // set min. number of upgraders
    var minumNumberOfUpgraders = 4;

    // get number of upgraders
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

    // print number of upgraders
    console.log('Upgraders:' + numberOfUpgraders);

    // compare number of harvesters to min.
    if (numberOfHarvesters < minumNumberOfHarvesters) {
        // spawn harvester and store it in var name
        var name = Game.spawns.spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined,
            {role: 'harvester', working: false});
        // if spawned, print name of new harvester
        if (!(name < 0)) console.log("Spawned new harvester creep: " + name);
    }
    else if (numberOfUpgraders < minumNumberOfUpgraders) {
        // spawn upgrader and store it in var name
        var name = Game.spawns.spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined,
            {role: 'upgrader', working: false});
        // if spawned, print name of new upgrader
        if (!(name < 0)) console.log("Spawned new upgrader creep: " + name);
    }
};