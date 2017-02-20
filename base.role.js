/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('base.role');
 * mod.thing == 'a thing'; // true
 */



var baseRole = function() {
    this.balance = true;
    this.useContainers = false;
    this.collectFromSpawn = false;
    this.useFullestSource = false;
    this.workName = "not set";
    
    this.getEnergyContainer = function(creep) {
        var container;
        if (!(creep.memory.searchDelay > 0) || creep.memory.container == undefined) {
            //STRUCTURE_CONTAINER
            container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: function(structure) {
                var useableType = structure.structureType == STRUCTURE_CONTAINER || this.collectFromSpawn && (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION)
                return (useableType && (structure.store[RESOURCE_ENERGY] > creep.carryCapacity * 2));
            }});
            if (container) {
                creep.memory.container = container.id;
            }
        } else {
            creep.memory.searchDelay--;
            container = Game.getObjectById(creep.memory.container);
        }
        return container;
    };
    this.getEnergySource = function(creep) {
        if (!(creep.memory.searchDelay > 0) || creep.memory.container == undefined) {
            var notEmptyFilter = function(source) {
                return source.energy > 0;
            };
            if (this.useFullestSource) {
                var sources = creep.room.find(FIND_SOURCES, {filter:notEmptyFilter});
                var source;
                var maxEnergy = 0;
                for(var s in sources) {
                    var so = sources[s];
                    maxEnergy = Math.max(so.energy, maxEnergy);
                }
                for(var s in sources) {
                    var so = sources[s];
                    if (so.energy == maxEnergy) {
                        source = so;
                        break;
                    }
                }
                console.log(source.id);
                
            }
            if (source == undefined) {
                //console.log("using closest source");
                source = creep.pos.findClosestByPath(FIND_SOURCES);
            }
            if (!source) {
                console.log(creep.name + " can't find source");
            } else {
                creep.memory.source = source.id;
                // = 10;
            }
            
            
            return source;
        } else {
            creep.memory.searchDelay--;
            return Game.getObjectById(creep.memory.source);
        }
    };
};

module.exports = new baseRole();