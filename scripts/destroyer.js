const chto = extendContent(UnitType, "destroyer",{});

	chto.create(prov(() => extend(GroundUnit,{
		/*
		readSave(stream,version){
		this.super$readSave(stream,version)
		hp = stream.readFloat();
		this.health = hp
		},
		writeSave(stream){
		this.writeSave(stream,false)
		stream.writeFloat(this.health);
		}
		*/
	})));

dbulmini = extend(FlakBulletType, {});

	dbulmini.damage = 365;
	dbulmini.speed = 4;
	dbulmini.bulletSprite = "turrets-sphere-bullet";
	dbulmini.bulletWidth = 30;
	dbulmini.bulletHeight = 30;
	dbulmini.status = StatusEffects.freezing;
	dbulmini.hitEffect = Fx.fireSmoke;
	dbulmini.splashDamage = 75;
	dbulmini.splashDamageRadius = 75;
	dbulmini.hitSize = 15;
	dbulmini.knockback = 55;
	dbulmini.statusDuration = 180;

dbul = extend(FlakBulletType, {
	despawned(b){
		for(var i = 0; i < 8; i++) {
			Call.createBullet(dbulmini, b.getTeam(), b.x, b.y, Mathf.random(360), Mathf.random(0.4, 1.2), Mathf.random(0.3, 1.2));
		}
	},
	hit(b,x,y){
		//print(x+y+b)
		Effects.effect(this.hitEffect, b.x, b.y, b.rot());
		Damage.damage(b.getTeam(), b.x, b.y, this.splashDamageRadius, this.splashDamage * b.damageMultiplier());
		this.despawned(b)
	}
});

	dbul.damage = 875;
	dbul.speed = 8;
	dbul.bulletSprite = "turrets-sphere-bullet";
	dbul.bulletWidth = 60;
	dbul.bulletHeight = 60;
	dbul.status = StatusEffects.freezing;
	dbul.hitEffect = Fx.fireSmoke;
	dbul.splashDamage = 125;
	dbul.splashDamageRadius = 100;
	dbul.hitSize = 30;
	dbul.knockback = 215;
	dbul.statusDuration = 540;

dweapon = extend(Weapon,{});

	dweapon.name = "turrets-destroyer-weapon";
	dweapon.length = 50;
	dweapon.shootSound = Sounds.corexplode;
	dweapon.reload = 60;
	dweapon.range = 240;
	dweapon.width = -40;
	dweapon.recoil = 8;
	dweapon.inaccuracy = 5;
	dweapon.ejectEffect = Fx.reactorsmoke;
	dweapon.ammoUseEffect = Fx.shellEjectBig;
	dweapon.bullet = dbul;

chto.weapon = dweapon