
arena = new Arena({
  container: document.getElementById('game-container'),

  showRoutes: true
});

arena.setTerrain('/gamedata/maps/castle/castle.obj', {

  agentMaxClimb: 6.0,

  boundingBox: {
    min: { x:-100, y:-100, z:-200 },
    max: { x: 200, y: 100, z: 200 },
  },

  side: THREE.DoubleSide,
  shading: THREE.FlatShading,

  map: THREE.ImageUtils.loadTexture('/gamedata/maps/castle/final_castle_texture.png'),
  bumpMap: THREE.ImageUtils.loadTexture('/gamedata/maps/castle/final_castle_texture_bump.png'),
  bumpScale: 0.05,
});

arena.addCharacter(function(done){
  new Arena.Characters.Ogro({
    onLoad: function(){
      var character = this;
      character.learnSpell(Arena.Spells.FireBullet);
      character.position.z += 5;
      done(character);
    }
  });
});

arena.init(function(arena){
  arena.start();
});