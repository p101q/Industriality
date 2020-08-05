const surgeReactorMeltdownFlak = extend(MissileBulletType, {});

surgeReactorMeltdownFlak.speed = 2;
surgeReactorMeltdownFlak.damage = 99999;
surgeReactorMeltdownFlak.bulletWidth = 10;
surgeReactorMeltdownFlak.bulletHeight = 10;
surgeReactorMeltdownFlak.bulletShrink = 1;
surgeReactorMeltdownFlak.lifetime = 360;
surgeReactorMeltdownFlak.hitEffect = Fx.hitMeltdown;
surgeReactorMeltdownFlak.despawnEffect = Fx.hitMeltdown;
surgeReactorMeltdownFlak.hitSize = 5;
surgeReactorMeltdownFlak.lightining = 35;
surgeReactorMeltdownFlak.lightningLength = 100;
surgeReactorMeltdownFlak.pierce = true;
surgeReactorMeltdownFlak.homingPower= 0;
surgeReactorMeltdownFlak.homingRange= 0;
surgeReactorMeltdownFlak.bulletSprite = "bullet";
surgeReactorMeltdownFlak.frontColor = Color.valueOf("#439300");
surgeReactorMeltdownFlak.backColor = Color.valueOf("#64aa2b");
surgeReactorMeltdownFlak.trailColor = Color.valueOf("#439400");



const surgeReactorMeltdownBlast = extend(BasicBulletType, {});

surgeReactorMeltdownBlast.speed = 5;
//this does 800 damage per 5 ticks btw.
surgeReactorMeltdownBlast.damage = 99999;
surgeReactorMeltdownBlast.drawSize = 50;
surgeReactorMeltdownBlast.lifetime = 60;
surgeReactorMeltdownBlast.hitEffect = Fx.hitMeltdown;
surgeReactorMeltdownBlast.despawnEffect = Fx.nuclearShockwave;
surgeReactorMeltdownBlast.hitSize = 10;
surgeReactorMeltdownBlast.lightining = 3;
surgeReactorMeltdownBlast.lightningLength = 35;
surgeReactorMeltdownBlast.pierce = true;
surgeReactorMeltdownBlast.frontColor = Color.valueOf("#439300");
surgeReactorMeltdownBlast.backColor = Color.valueOf("#64aa2b");
surgeReactorMeltdownBlast.trailColor = Color.valueOf("#439300");




//this is REMAKE of anuke scatter-silo script
//and this is make with support of Mindustry MODMAKERS group in VK
//create a simple shockwave effect
const siloLaunchEffect = newEffect(20, e => {
    Draw.color(Color.white, Color.gray, e.fin()); //color goes from white to light gray
    Lines.stroke(e.fout() * 3); //line thickness goes from 3 to 0
    Lines.circle(e.x, e.y, e.fin() * 60);
    Lines.circle(e.x, e.y, e.fin() * 85);
    Lines.circle(e.x, e.y, e.fin() * 110); //draw a circle whose radius goes from 0 to 100
});

//create bullet
const bul = extend(FlakBulletType, {});

bul.speed = 7;
bul.damage = 45;
bul.bulletWidth = 6;
bul.bulletHeight = 16;
bul.status = StatusEffects.freezing;
bul.hitEffect = Fx.plasticExplosion;
bul.explodeRange = 45;
bul.splashDamage = 15;
bul.splashDamageRadius = 55;
bul.hitSize = 7;
bul.knockback = 32;
bul.statusDuration = 350;
bul.collides = true;
bul.collidesTeam = true;
bul.lifetime = 9999;

//create bullet for sound of explosion
const expl = extend(FlakBulletType, {});

expl.speed = 2;
expl.damage = 45;
expl.bulletWidth = 7;
expl.bulletHeight = 20;
expl.status = StatusEffects.burning;
expl.hitSound = Sounds.fire;
expl.hitEffect = Fx.plasticExplosion;
expl.explodeRange = 45;
expl.splashDamage = 15;
expl.splashDamageRadius = 55;
expl.hitSize = 14;
expl.knockback = 60;
expl.statusDuration = 1000;
expl.collides = true;
expl.collidesTeam = true;
expl.frontColor = Color.valueOf("ff4f00");
expl.backColor = Color.valueOf("ff3500");
expl.lifetime = 9999;

//create liquid bullets for spilling on tiles
const pipiska = extend(LiquidBulletType, {
despawned(b){
Puddle.deposit(Vars.world.tileWorld(b.x,b.y), Liquids.slag, 70);
}
});

pipiska.speed = 1;
pipiska.damage = 1000;
pipiska.bulletWidth = 1;
pipiska.bulletHeight = 1;
pipiska.status = StatusEffects.burning;
pipiska.liquid = Liquids.slag;
pipiska.knockback = 60;
pipiska.statusDuration = 1000;
pipiska.lifetime = 9999;

//create the block type
const silo = extendContent(Block, "pizdavsemu", {
    //override the method to build configuration
    buildConfiguration(tile, table){
        table.addImageButton(Icon.commandRally, Styles.clearTransi, run(() => {
            //configure the tile to signal that it has been pressed (this sync on client to server)
            tile.configure(0)
        })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid()))
    },

    //override configure event
    configured(tile, value){
        //make sure this silo has the items it needs to fire
        if(tile.entity.cons.valid()){
            //make this effect occur at the tile location
            Effects.effect(siloLaunchEffect, tile);

            //detonate
            tile.entity.health = 0;

            //spills liquid
            Puddle.deposit(tile, Vars.content.getByName(ContentType.liquid, "slag"), 100);

			//do something
            for(var i = 0; i < 100; i++) {
                Calls.createBullet(pipiska, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.4, 1.2), Mathf.random(0.3, 1.2))
            };

            //create 70 bullets at this tile's location with random rotation and velocity/lifetime
            for(var i = 0; i < 2000; i++) {
                Calls.createBullet(bul, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.4, 1.2), Mathf.random(0.3, 1.2))
            };

            //create 10 bullets at this tile's location with random rotation for sound of explosion
            for(var v = 0; v < 2000; v++) {
                Calls.createBullet(expl, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.2, 1.2), Mathf.random(0.1, 1.2))
            };


            for(var i = 0; i < 100; i++){
            	Calls.createBullet(surgeReactorMeltdownFlak, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 1.0));
			}
			for(var lilpip = 0; lilpip < 1000; lilpip++){
			surgeReactorMeltdownBlast.lightningLength = 200;
			Calls.createBullet(surgeReactorMeltdownBlast, Team.derelict, tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.15, 1.0), Mathf.random(0.2, 1.0));
			}


            //triggering consumption makes it use up the items it requires
            tile.entity.cons.trigger()
        }
    }
});

