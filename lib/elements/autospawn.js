'use strict';

var _ = require('lodash');
var inherits = require('inherits');

module.exports = AutoSpawn;

/**
 * @exports threearena/elements/autospawn
 * 
 * @constructor
 */
function AutoSpawn (options) {

  this.options = _.merge({

    entity: null,
    entityOptions: {},

    delay: 1000,

    path: null,
    towards: null,

    tweenOptions: {
      speed: 6
    },

    groupOf: 1,

    eachInterval: 800,
    eachGroupInterval: 30 * 1000,

  }, options);

  THREE.Object3D.apply(this);
}

inherits(AutoSpawn, THREE.Object3D);

//////////////////

AutoSpawn.prototype.on = AutoSpawn.prototype.addEventListener;

AutoSpawn.prototype.emit = function (event, data) {
  data.type = event;
  this.dispatchEvent(data);
};

//////////////////

AutoSpawn.prototype.setPath = function(path) {
  this.options.path = path;
};


AutoSpawn.prototype.start = function() {
  if (! this.parent instanceof THREE.Scene) {
    throw 'A pool must be added to a scene before start';
  } else {
    setTimeout(_.bind(function(){
      this.spanwGroup();
    }, this), this.options.delay);
  }
};

AutoSpawn.prototype.spanwGroup = function() {

  var spawn = _.bind(function(){
    this.spanwOne();
  }, this);

  for (var i = 0; i < this.options.groupOf; i++) {
    setTimeout(spawn, this.options.eachInterval * i);
  }

  // register next group
  setTimeout(_.bind(function(){
    this.spanwGroup();
  }, this), this.options.eachGroupInterval);
};

AutoSpawn.prototype.spanwOne = function() {

  var self = this;

  var character = new this.options.entity({
    onLoad: function(){
      character.position.copy(self.position);
      self.emit('spawnedone', character);
    }
  });
};
