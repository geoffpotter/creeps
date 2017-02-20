/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('app');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    /** @var {StructureSpawn} spawn **/
    spawn: Game.spawns["Home1"],
    roles: {
        "harvester": require("role.harvester"),
        "builder": require("role.builder"),
        "upgrader": require("role.upgrader"),
        //"miner": require("role.miner"),
        "miner2": require("role.miner2"),
        "transporter": require("role.transporter"),
    },
    roleMins: {
        "harvester": 6,
        "builder" : 2,
        "upgrader": 7,
        "miner2": 2,
        "transporter" : 0,
    },
    assignCreeps: function() {
        
        //init counts
        var roleCounts = {};
        for (var roleName in this.roleMins) {
            roleCounts[roleName] = 0;
        }
        var _this = this;
        var getNextRole = function() {
            for(var roleName in roleCounts) {
                //if we've made less than the min for this role, return it
                if (_this.countCreeps(roleName) < _this.roleMins[roleName] && _this.roles[creep.memory.role].balance === true) {
                    return roleName;
                }
            }
            return false;
        }
        
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (this.roles[creep.memory.role].balance !== true) {
                continue;
            }
            var role = getNextRole();
            //console.log( "--" + role + " " + this.countCreeps(role) + " " +  this.roleMins[role])
            if (role && this.countCreeps(role) < this.roleMins[role]) {
                
                console.log("assigning " + name + " to " + role);
                creep.memory.role = role;
                roleCounts[role]++;
            }
            
        }
        console.log("-------after assign-------");
        for(var role in this.roles) {
            console.log(role + " " + this.countCreeps(role) + " target:" + this.roleMins[role]);
        }
    },
    totalNeededManagedCreeps: function() {
        var total = 0;
        for(var role in this.roleMins) {
            var r = this.roles[role];
            if (r.balance) {
                total += 0 + this.roleMins[role];
            }
        }
        return total;
    },
    getManagedCreepCount: function() {
        var managedCreeps = 0
        for (var name in Game.creeps) {
            var creepsRole = this.roles[Game.creeps[name].memory.role];
            if (creepsRole.balance === true) {
               managedCreeps++;
            }
        }
        return managedCreeps;
    },
    spawnCreeps: function() {
        if (this.totalNeededManagedCreeps() <= this.getManagedCreepCount()) {
            this.assignCreeps();
        }
        console.log("------before spawn-------");
        for(var name in Game.creeps) {
            console.log(name + " " + Game.creeps[name].memory.role + " " + Game.creeps[name].memory.working);
        }
        for(var role in this.roles) {
            console.log(role + " " + this.countCreeps(role) + " target:" + this.roleMins[role]);
        }
        if (this.spawn.memory.delay > 0) {
            this.spawn.memory.delay--;
            return;
        }

        //for each role, see if our count is below the min
        for (var roleName in this.roles) {
            var role = this.roles[roleName];
            var roleCount = this.countCreeps(roleName);
            //console.log(roleName + " " + roleCount + " " + this.roleMins[roleName]);
            if (roleCount < this.roleMins[roleName]) {
                // var canSpawn = this.spawn.canCreateCreep(role.parts);
                // if (canSpawn == ERR_BUSY) {
                //     console.log("Spawn busy");
                //     return;
                // } else if (canSpawn == ERR_NOT_ENOUGH_ENERGY) {
                //     console.log("Not enough energy to spawn " + roleName + " " + role.parts);
                //     this.spawn.memory.delay = 5;
                //     return;
                // } else {
                    //if so, spawn one
                    console.log("creating " + roleName);
                    console.log(role.parts);
                    var res = this.spawn.createCreep(role.parts, undefined, {role:roleName});
                    console.log(res);
                    return;
                // }
                
            }
        }
        
        
    },
    
    countCreeps: function(role) {
        var count = 0;
        for(var creepName in Game.creeps) {
            var creep = Game.creeps[creepName];
            if (creep.memory.role == role) {
                count++;
            }
        }
        return count;
    }
};