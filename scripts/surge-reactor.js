//this is NOT the complete definition for this block! see content/blocks/surge-reactor.hjson for the stats and other properties.
//this is the copy of a script from Diamond-ore mod. Sorry, z0mbiesrock.
const surgeReactorMeltdownFlak = extend(MissileBulletType, {});

surgeReactorMeltdownFlak.speed = 8;
//this does 800 damage per 5 ticks btw.
surgeReactorMeltdownFlak.damage = 675;
surgeReactorMeltdownFlak.bulletWidth = 16;
surgeReactorMeltdownFlak.bulletHeight = 200;
surgeReactorMeltdownFlak.bulletShrink = 1;
surgeReactorMeltdownFlak.lifetime = 60;
surgeReactorMeltdownFlak.hitEffect = Fx.hitMeltdown;
surgeReactorMeltdownFlak.despawnEffect = Fx.hitMeltdown;
surgeReactorMeltdownFlak.hitSize = 5;
surgeReactorMeltdownFlak.lightining = 5;
surgeReactorMeltdownFlak.lightningLength = 25;
surgeReactorMeltdownFlak.pierce = true;
surgeReactorMeltdownFlak.homingPower= 0;
surgeReactorMeltdownFlak.homingRange= 0;
surgeReactorMeltdownFlak.bulletSprite = "bullet";
surgeReactorMeltdownFlak.frontColor = Color.valueOf("#439300");
surgeReactorMeltdownFlak.backColor = Color.valueOf("#64aa2b");
surgeReactorMeltdownFlak.trailColor = Color.valueOf("#439400");

//create a simple shockwave effect
const surgeReactorMeltdownBlast = extend(BasicBulletType, {});

surgeReactorMeltdownBlast.speed = 0.001;
//this does 800 damage per 5 ticks btw.
surgeReactorMeltdownBlast.damage = 2000;
surgeReactorMeltdownBlast.drawSize = 480;
surgeReactorMeltdownBlast.lifetime = 1;
surgeReactorMeltdownBlast.hitEffect = Fx.hitMeltdown;
surgeReactorMeltdownBlast.despawnEffect = Fx.nuclearShockwave;
surgeReactorMeltdownBlast.hitSize = 5;
surgeReactorMeltdownBlast.lightining = 5;
surgeReactorMeltdownBlast.lightningLength = 25;
surgeReactorMeltdownBlast.pierce = true;
/* surgeReactorMeltdownBlast.fragVelocityMin = 0.25;
surgeReactorMeltdownBlast.fragVelocityMax = 2.55;
surgeReactorMeltdownBlast.fragBullets = 40;
surgeReactorMeltdownBlast.fragBullet = surgeReactorMeltdownFlak; */
surgeReactorMeltdownBlast.frontColor = Color.valueOf("#439300");
surgeReactorMeltdownBlast.backColor = Color.valueOf("#64aa2b");
surgeReactorMeltdownBlast.trailColor = Color.valueOf("#439300");

const SurgeReactor = extendContent(NuclearReactor, "surge-reactor", {
	
    //OVERRIDE
	/* draw: function(tile){
		

        Draw.color(tile.entity.coolColor, tile.entity.hotColor, tile.entity.heat);
        Fill.rect(tile.drawx(), tile.drawy(), size * tilesize, size * tilesize);

        Draw.color(tile.entity.liquids.current().color);
        Draw.alpha(tile.entity.liquids.currentAmount() / liquidCapacity);
        Draw.rect(topRegion, tile.drawx(), tile.drawy());
		
		if(tile.entity.heat > tile.entity.flashThreshold){
            flash = 1 + ((tile.entity.heat - tile.entity.flashThreshold) / (1 - tile.entity.flashThreshold)) * 5.4;
            tile.entity.flash += flash * Time.delta();
            Draw.color(Color.red, Color.yellow, Mathf.absin(tile.entity.flash, 9, 1));
            Draw.alpha(0.6);
            Draw.rect(lightsRegion, tile.drawx(), tile.drawy());
        }
		Draw.alpha(tile.tile.entity.items.total() / tile.tile.entity.itemCapacity);
		Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());

        Draw.reset();
	}, */
	
    //OVERRIDE
	onDestroyed: function(tile){
		Blocks.thoriumReactor.onDestroyed(tile);
        for(var i = 0; i < 45; i++){
            Calls.createBullet(surgeReactorMeltdownFlak, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 1.0));
		}
		surgeReactorMeltdownBlast.lightningLength = 65;
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
		surgeReactorMeltdownBlast.lightningLength = 75;
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
		surgeReactorMeltdownBlast.lightningLength = 85;
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
		surgeReactorMeltdownBlast.lightningLength = 95;
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
		surgeReactorMeltdownBlast.lightningLength = 105;
        Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0));
		surgeReactorMeltdownBlast.lightningLength = 115;
	},
})