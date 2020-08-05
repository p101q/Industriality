//thx to Andrey Stepanenko for the basis for scripts
const mt = extendContent(GenericSmelter, "mt", {
	drawLayer: function(tile){
		if(tile.entity.warmup > 0.33){
			Draw.color(Color.valueOf("#00BFFF"), tile.entity.warmup);
			Draw.rect(Core.atlas.find("turrets-plasma-rotator"), tile.drawx(), tile.drawy(), Time.time()*2);
		}
		if(tile.entity.warmup > 0.66){
			Draw.color(Color.valueOf("#00BFFF"), tile.entity.warmup);
			Draw.rect(Core.atlas.find("turrets-plasma-rotator2"), tile.drawx(), tile.drawy(), -Time.time()*0.75);
		}
	Draw.color();
}});
mt.layer = Layer.turret;