/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var worker = require("role.worker");


var builder = function() {
    this.useContainers = true;
    //this.collectFromSpawn = true;
    this.useFullestSource = true;
    this.work = function(creep) {
        var site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(site) {
                creep.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.build(site);
            }
    };
    this.parts = [MOVE, CARRY, WORK, WORK];
}
builder.prototype = worker;
var creep = new builder();

module.exports = creep;