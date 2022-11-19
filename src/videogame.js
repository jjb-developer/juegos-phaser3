import { SceneGame } from './lib/sceneGame.js'
import { ScenePrueba } from './lib/scenePrueba.js'

var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    parent: 'game',
    backgroundColor: '#051a24',
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false,
        }
    },
    scene: [SceneGame,ScenePrueba]
};

var game = new Phaser.Game(config);

/*
var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    parent: 'game',
    backgroundColor: '#2a2a2a',
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: true,
        }
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function init(){
    this.scale = false
    this.coin = 0
    this.salud = 100
}
function preload ()
{
    // Produccion
    //this.load.image('coin', './coin.png')
    //this.load.image('shooter', './player_shooter.png')
    //this.load.spritesheet('ninja', './villanos.png', { frameWidth: 48, frameHeight: 48})

    // Desarrollo
    this.load.image('coin', './src/assets/coin.png')
    this.load.image('shooter', './src/assets/player_shooter.png')
    this.load.spritesheet('ninja', './src/assets/villanos.png', { frameWidth: 48, frameHeight: 48})
}

function create ()
{
    this.anims.create({
        key:'caminarRight',
        frames: this.anims.generateFrameNumbers('ninja',{ frames: [30,31,32]}),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key:'caminarLeft',
        frames: this.anims.generateFrameNumbers('ninja',{ frames: [18,19,20]}),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key:'caminarDown',
        frames: this.anims.generateFrameNumbers('ninja',{ frames: [6,7,8]}),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key:'caminarUp',
        frames: this.anims.generateFrameNumbers('ninja',{ frames: [42,43,44]}),
        frameRate: 8,
        repeat: -1
    })

    this.anims.create({
        key:'detenido',
        frames: this.anims.generateFrameNumbers('ninja',{ frames: [6]}),
        frameRate: 1,
        repeat: 0
    })

    this.lifeText = this.add.text(15,15,'LIFE',{ font:'12px lato'})
    this.life = this.add.rectangle(45,19,100,5,0x00ff00).setOrigin(0)
    this.add.image(425,14,'coin').setScale(0.18).setOrigin(0)
    this.coinText = this.add.text(445,13,'0', { font: '16px lato', fontStyle: '700'})
    let star = '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38';

    this.shooter = this.add.image(50,400,'shooter')
    this.physics.add.existing(this.shooter,false)
    this.shooter.body.setCircle(14,14,17)
    this.shooter.body.debugShowBody = false
    //this.shooter.body.setVelocityX(+75)

    this.ninja = this.add.sprite(200,20,'ninja').setOrigin(0).setScale(0.75)
    this.physics.add.existing(this.ninja,false)
    this.ninja.body.setCollideWorldBounds(true)
    this.ninja.body.debugShowBody = false
    this.ninja.body.setCircle(20,4,2)

    this.player = this.add.rectangle(72,72,32,32,0x0369a1,0.3);
    this.player.setStrokeStyle(2, 0x0369a1);
    this.physics.add.existing(this.player)
    this.player.body.setCollideWorldBounds(true)
    this.player.body.setMass(10)
    this.player.body.bounce = { x:1,y:1 }

    this.villano = this.add.rectangle(400,400,32,32,0xe71d36,0.3);
    this.villano.setStrokeStyle(2,0xe71d36)
    this.physics.add.existing(this.villano)
    this.villano.body.setCollideWorldBounds(true)

    this.muro = this.add.rectangle(0,135,224,32,0x18181b).setOrigin(0)
    this.muro.setStrokeStyle(2,0x101010)
    this.physics.add.existing(this.muro)
    this.muro.body.immovable = true
    this.muro.body.debugShowBody = false

    this.star = this.add.polygon(240,240,star,0x00ff00,0.3).setScale(0.2)
    this.star.setStrokeStyle(2,0x00ff00)
    this.physics.add.existing(this.star)
    this.star.body.setCollideWorldBounds(true)
    this.star.body.bounce = { x:1,y:1 }


    this.triangulo = this.add.triangle(200,400,0,40,40,40,20,0,0x00ffff,0.3)
    this.triangulo.setStrokeStyle(2,0x00ffff)
    this.physics.add.existing(this.triangulo)

    this.circulo = this.add.circle(350,350,20,0xffffff,0.3)
    this.circulo.setStrokeStyle(2,0xffffff,0.7)
    this.physics.add.existing(this.circulo)
    this.circulo.body.immovable = true
    this.circulo.body.debugShowBody = true
    this.circulo.body.isCircle = true

    this.coins = this.add.circle(Phaser.Math.Between(0,480),480,4,0xffff00,0.9)
    this.coins.setStrokeStyle(2,0xffff00,0.5)
    this.physics.add.existing(this.coins,false)
    this.coins.body.setVelocityY(-200)
    this.coins.body.debugShowBody = false
    this.coins.body.debugShowVelocity = false

    this.bomb = this.add.circle(Phaser.Math.Between(0,480),480,1,0xff0000,0.8)
    this.bomb.setStrokeStyle(12,0xff0000,0.2)
    this.physics.add.existing(this.bomb,false)
    this.bomb.body.setVelocityY(-200)
    this.bomb.body.debugShowBody = false
    this.bomb.body.debugShowVelocity = false

    this.physics.add.collider(this.ninja,this.villano,colliderNinjaVillano,null,this)
    this.physics.add.collider(this.ninja,this.coins,colliderNinjaCoins,null,this)
    this.physics.add.collider(this.ninja,this.bomb,colliderNinjaBomb,null,this)
    this.physics.add.collider(this.ninja,this.muro)
    this.physics.add.collider(this.ninja,this.star)
    this.physics.add.collider(this.ninja,this.player)
    this.physics.add.collider(this.ninja,this.circulo)
    this.physics.add.collider(this.muro,this.star)
    this.physics.add.collider(this.star,this.triangulo)

    this.cursor = this.input.keyboard.createCursorKeys()

    this.tweens.add({
        targets: this.circulo,
        alpha: 0,
        duration: 7000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    })

    this.tweens.add({
        targets: this.coins,
        alpha: 0,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    })

    //console.log(this.life)
    //console.log(this.circulo)
    //console.log(this.cursor)
}

function update(time,delta)
{
    this.villano.body.velocity.y = -25
    this.ninja.setScale(this.scale ? 0.5:1)
    limite(this.coins)
    cristonita(this.bomb)
    if(this.life.width < 50){
        this.life.setFillStyle(0xffff00)
    }
    if(this.life.width < 25){
        this.life.setFillStyle(0xff0000)
    }
    if(this.life.width < 1){
        this.scene.pause()
    }

    if(this.cursor.right.isDown){
        this.ninja.body.velocity.x = +105
        this.ninja.anims.play('caminarRight',true)
    }
    else if(this.cursor.left.isDown){
        this.ninja.body.velocity.x = -105
        this.ninja.anims.play('caminarLeft',true)
    }
    else if(this.cursor.up.isDown){
        this.ninja.body.velocity.y = -105
        this.ninja.anims.play('caminarUp',true)
    }
    else if(this.cursor.down.isDown){
        this.ninja.body.velocity.y = +105
        this.ninja.anims.play('caminarDown',true)
    }
    else{
        this.ninja.body.velocity.x = 0
        this.ninja.body.velocity.y = 0
        this.ninja.anims.play('detenido',true)
    }
    if(this.cursor.space.isDown){
        this.scale = !this.scale
    }
}

function colliderNinjaVillano(){
    console.log('Collision entre personajes!.')
    this.villano.body.destroy()
    this.villano.visible = false
}

function colliderNinjaCoins(){
    this.coin++
    this.coinText.setText(this.coin)
    this.coins.body.position.x = Phaser.Math.Between(0,480)
    this.coins.body.position.y = 480
    this.coins.body.setVelocityY(-200)
}

function colliderNinjaBomb(){
    this.salud -= 20
    this.life.setSize(this.salud,5)
    this.bomb.body.position.x = Phaser.Math.Between(0,480)
    this.bomb.body.position.y = 480
    this.bomb.body.setVelocityY(-200)
}

function limite(personaje){
    if(personaje.body.y < 0 || personaje.body.x < 0 || personaje.body.x > 480){
        personaje.body.position.x = Phaser.Math.Between(0,480)
        personaje.body.position.y = 480
        personaje.body.setVelocity(Phaser.Math.Between(-50,-50),Phaser.Math.Between(-50,-200))
    } 
}

function cristonita(personaje){
    if(personaje.body.y < 0 || personaje.body.x < 0 || personaje.body.x > 480){
        personaje.body.position.x = Phaser.Math.Between(0,480)
        personaje.body.position.y = 480
        personaje.body.setVelocity(Phaser.Math.Between(-50,-50),Phaser.Math.Between(-50,-200))
    } 
}
*/
/*
var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    parent: 'game',
    backgroundColor: '#18181b',
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: { y: 4 },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

function init(){}
function preload(){}
function create(){
    console.log(this.matter.world)
    this.matter.world.setBounds().disableGravity();
    console.log('funcionando')
    let arrow = '40 0 40 20 100 20 100 80 40 80 40 100 0 50';
    let chevron = '100 0 75 50 100 100 25 100 0 50 25 0';
    let star = '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38';

    var poly = this.add.polygon(400,300,arrow,0x0000ff,0.2);
    this.matter.add.gameObject(poly, { shape: { type: 'fromVerts', verts: arrow, flagInternal: true } });

    this.box = this.add.rectangle(50,100,32,32,0x0000ff,0.2);
    this.matter.add.gameObject(this.box);

    this.circle = this.add.circle(300,100,24,0x0000ff,0.2);
    this.matter.add.gameObject(this.circle, { shape: { type:'circle', radius:24 }});


    this.cursor = this.input.keyboard.createCursorKeys()
    //console.log(this.box)

    poly.setVelocity(6, 3);
    poly.setAngularVelocity(0.01);
    poly.setBounce(1);
    poly.setFriction(0, 0, 0);

}

function update(time,delta){
    if(this.cursor.right.isDown){
        this.box.setVelocityX(+2.5)
    } else if (this.cursor.left.isDown){
        this.box.setVelocityX(-2.5)
    } else if (this.cursor.up.isDown){
        this.box.setVelocityY(-2.5)
    } else if (this.cursor.down.isDown){
        this.box.setVelocityY(+2.5)
    } else {
        this.box.setVelocity(0,0)
    }
}
*/

/*
var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    parent: 'game',
    backgroundColor: '#18181b',
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            //gravity: { y: 300 },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

function init(){}
function preload(){}
function create(){
    this.matter.world.setBounds().disableGravity();
    console.log('funcionando')
    let arrow = '40 0 40 20 100 20 100 80 40 80 40 100 0 50';
    let chevron = '100 0 75 50 100 100 25 100 0 50 25 0';
    let star = '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38';

    var poly = this.add.polygon(400, 300, arrow, 0x0000ff, 0.2);

    this.matter.add.gameObject(poly, { shape: { type: 'fromVerts', verts: arrow, flagInternal: true } });

    console.log(this.matter)

    poly.setVelocity(6, 3);
    poly.setAngularVelocity(0.01);
    poly.setBounce(1);
    poly.setFriction(0, 0, 0);

    var poly = this.add.polygon(400, 100, chevron, 0xff0000, 0.2);

    this.matter.add.gameObject(poly, { shape: { type: 'fromVerts', verts: chevron, flagInternal: true } });

    poly.setVelocity(6, 3);
    poly.setAngularVelocity(0.01);
    poly.setBounce(1);
    poly.setFriction(0, 0, 0);

    var poly = this.add.polygon(50, 40, star, 0x00ff00, 0.2);

    this.matter.add.gameObject(poly, { shape: { type: 'fromVerts', verts: star, flagInternal: true } });

    poly.setVelocity(4, -2);
    poly.setBounce(1);
    poly.setFriction(0, 0, 0);
    poly.setFrictionAir(0.005);
}

function update(){}
*/
/*
var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    parent: 'game',
    backgroundColor: '#18181b',
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: true,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function init(){
    this.scale = false
}
function preload ()
{}

function create ()
{
    let star = '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38';

    this.player = this.add.rectangle(72,72,32,32,0x0369a1,0.3);
    this.player.setStrokeStyle(2, 0x0369a1);
    this.physics.add.existing(this.player)
    this.player.body.setCollideWorldBounds(true)
    this.player.body.setMass(10)
    this.player.body.bounce = { x:1,y:1 }

    this.villano = this.add.rectangle(400,400,32,32,0xe71d36,0.3);
    this.villano.setStrokeStyle(2,0xe71d36)
    this.physics.add.existing(this.villano)
    this.villano.body.setCollideWorldBounds(true)

    this.muro = this.add.rectangle(0,135,224,32,0x2a2a2a).setOrigin(0)
    this.physics.add.existing(this.muro)
    this.muro.body.immovable = true
    this.muro.body.debugShowBody = false

    this.star = this.add.polygon(240,240,star,0x00ff00,0.3)
    this.star.setStrokeStyle(2,0x00ff00)
    this.physics.add.existing(this.star)
    this.star.body.setCollideWorldBounds(true)
    this.star.body.bounce = { x:1,y:1 }


    this.triangulo = this.add.triangle(200,400,0,40,40,40,20,0,0x00ffff,0.3)
    this.triangulo.setStrokeStyle(2,0x00ffff)
    this.physics.add.existing(this.triangulo)

    this.circulo = this.add.circle(350,350,20,0xffffff,0.3)
    this.circulo.setStrokeStyle(2,0xffffff,0.7)
    this.physics.add.existing(this.circulo)
    this.circulo.body.immovable = true
    this.circulo.body.debugShowBody = true
    this.circulo.body.isCircle = true

    this.physics.add.collider(this.player,this.villano,colliderPlayerVillano,null,this)
    this.physics.add.collider(this.player,this.muro)
    this.physics.add.collider(this.player,this.star)
    this.physics.add.collider(this.muro,this.star)
    this.physics.add.collider(this.player,this.circulo)
    this.physics.add.collider(this.star,this.triangulo)

    this.cursor = this.input.keyboard.createCursorKeys()

    this.tweens.add({
        targets: this.circulo,
        alpha: 0,
        duration: 7000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    })

    console.log(this.circulo)
    //console.log(this.cursor)
}

function update(time,delta)
{
    this.villano.body.velocity.y = -25
    this.player.setScale(this.scale ? 0.5:1)

    if(this.cursor.right.isDown){
        this.player.body.velocity.x = +125
    }
    else if(this.cursor.left.isDown){
        this.player.body.velocity.x = -125
    }
    else if(this.cursor.up.isDown){
        this.player.body.velocity.y = -125
    }
    else if(this.cursor.down.isDown){
        this.player.body.velocity.y = +125
    }
    else{
        this.player.body.velocity.x = 0
        this.player.body.velocity.y = 0
    }
    if(this.cursor.space.isDown){
        this.scale = !this.scale
    }
}

function colliderPlayerVillano(){
    console.log('Collision entre personajes!.')
    this.villano.body.destroy()
    this.villano.visible = false
}
*/