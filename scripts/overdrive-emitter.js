const overem = extendContent(OverdriveProjector, "overdrive-emitter", {
drawLayer: function(tile){
Draw.rect(Core.atlas.find(this.name+"-arrow1"), tile.drawx(), tile.drawy(), Time.time()*2);
Draw.rect(Core.atlas.find(this.name+"-arrow2"), tile.drawx(), tile.drawy(), Time.time()*0.25);
}});
overem.layer = Layer.turret;