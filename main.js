/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = require("app")

module.exports.loop = function () {
    console.log("----------------------tick--------------------");
    app.spawnCreeps();
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //console.log(creep.memory.role);
        var role = app.roles[creep.memory.role];
        role.run(creep);
        
    }
}