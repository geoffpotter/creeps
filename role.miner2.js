/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var worker = require("role.worker");


var miner2 = function() {
    this.balance = false;
    this.work = function(creep) {
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: function(structure) {
                 //structure.structureType == STRUCTURE_CONTAINER && console.log(structure + structure.store[RESOURCE_ENERGY] + " " + (creep.carryCapacity * 2));
                 //console.log(structure + " " + (structure.structureType == STRUCTURE_CONTAINER ) && structure.store[RESOURCE_ENERGY] > (creep.carryCapacity *2));
            return (structure.structureType == STRUCTURE_CONTAINER);
            }});
        // var container = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_CONTAINER);
        //     }
        // })[0];
        //console.log(source);
        if(container) {
            if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    };
    this.parts = [MOVE, CARRY, WORK, WORK, WORK];
};
miner2.prototype = worker;
var creep = new miner2();

module.exports = creep;