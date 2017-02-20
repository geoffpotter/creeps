/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.worker');
 * mod.thing == 'a thing'; // true
 */

var worker = function() {

    
    this.run = function(creep) {
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.container = undefined;
            creep.memory.source = undefined;
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('🚧 Work! ' );
        }
        if(creep.memory.working) {
            this.work(creep);
        } else {
            var container = this.getEnergyContainer(creep);
            var source = this.getEnergySource(creep);
            
            
//console.log( creep.name + creep.memory.working + " " + container);
            
            if (this.useContainers && container) {
                    if (container.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
            } else {
                
                
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    source = creep.pos.findClosestByPath(FIND_SOURCES);
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        };
            
            
            
        
        
    }
    this.work = function() {};
};
worker.prototype = require("base.role");

module.exports = new worker();