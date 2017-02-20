/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
    parts: [MOVE, CARRY, WORK, WORK, WORK, WORK],
	
	/** @param {Creep} creep **/
    run: function(creep) {
        //STRUCTURE_CONTAINER
        var container = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        })[0];
        
        if(container) {
            
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                console.log('moving: '+container);
                creep.memory.container = container;
                var res = creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                //console.log(res);
                //console.log(creep.name + " " + "Can't reach source!!!");
            }
        } else {
            console.log(creep.name + " can't find a container");
        }
    }
        
    
    
};