/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var worker = require("role.worker");


var upgrader = function() {
    this.useContainers = true;
    this.work = function(creep) {
        var site = creep.room.controller;
        
        if(site) {
            if(creep.upgradeController(site) == ERR_NOT_IN_RANGE) {
                creep.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    };
    
    this.parts = [MOVE, CARRY, WORK, WORK];
}
upgrader.prototype = worker;
var creep = new upgrader();

module.exports = creep;