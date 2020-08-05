const windmill = extendContent(SolarGenerator, "windmill", {
drawLayer: function(tile){
Draw.rect(Core.atlas.find(this.name+"-rotator"), tile.drawx(), tile.drawy(), Time.time());
}});
windmill.layer = Layer.turret;