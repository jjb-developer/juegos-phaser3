import { mapa } from './mapa.js'
export class SceneGame extends Phaser.Scene {
    constructor(){
        super({key:'game'})
    }
    init()
    {
        this.angle = 0
        this.stamina = 20
        this.speed = 125
        this.mapGame = mapa
    }
    preload()
    {
        this.load.image('player','./src/assets/shooter.png')
        this.load.image('box','./src/assets/box.png')
        this.load.image('virus','./src/assets/virus.png')
        this.load.image('punto','./src/assets/punto.png')
        this.load.audio('laser','./src/sounds/laser.mp3')
        this.load.audio('explosion','./src/sounds/explosion_medium.mp3')
        this.load.audio('hit','./src/sounds/hit1.mp3')
    }
    create()
    {
        this.physics.world.setBounds(0,0,1200,1200)
        this.cameras.main.setBounds(0,0,1200,1200)
        this.laser = this.sound.add('laser')
        this.explosion = this.sound.add('explosion')
        this.hit = this.sound.add('hit')

// ----- Grupo - bloques como paredes ----->
        this.grupoBoxs = this.physics.add.staticGroup()
        for(let i=0;i<this.mapGame.length;i++){
            for(let j=0;j<this.mapGame[i].length;j++){
                if(this.mapGame[i][j]===0){
                    this.grupoBoxs.create(j*30,i*30,'box')
                }
            }
        }

// ----- Grupo - virus ----->
        this.pandemia = this.physics.add.group()
        for(let i=0;i<10;i++){
            let virus = this.physics.add.image(Phaser.Math.Between(50,1150),Phaser.Math.Between(50,1150),'virus').setScale(0.7).setCircle(13,3,3)
            this.pandemia.add(virus)
        }

// ----- player ----->
        this.player = this.add.image(600,600,'player')
        this.physics.add.existing(this.player,false)
        this.player.body.setCircle(15,18,15)
        this.player.body.setCollideWorldBounds(true)
        this.player.setData('.bullet.',true)

// ----- mira del player ----->
        this.reticle = this.add.circle(this.player.body.position.x,this.player.body.position.y,3)
        this.reticle.setStrokeStyle(2,0xffffff)
        this.physics.add.existing(this.reticle,false)

// ----- Grupo Bullet ----->
        this.bullets = this.add.group()
        // {defaultKey: 'punto', maxSize: 5, key: 'punto',repeat: 10,setXY: {x:400,y:400},runChildUpdate: true}

// ----- Colisiones ----->
        this.physics.add.collider(this.player,this.grupoBoxs)
        this.physics.add.collider(this.pandemia,this.player,colisionVirusPlayer,null,this)
        this.physics.add.collider(this.pandemia,this.grupoBoxs)
        this.physics.add.collider(this.bullets,this.pandemia,colisionBulletVirus,null,this)
        this.physics.add.collider(this.bullets,this.grupoBoxs,colisionBulletBox,null,this)

// ----- Textos ----->
        this.textVirus = this.add.text(this.player.x+220,this.player.y-226,'VIRUS: '+this.pandemia.getLength(),{font:'12px lato'}).setOrigin(1,0)
        this.textVida = this.add.text(this.player.x-220,this.player.y-226,'VIDA: '+this.stamina,{font:'12px lato'})
        this.rectaLife = this.add.rectangle(this.player.x-220,this.player.y-210,120,7,0x00ff00).setOrigin(0)
        this.rectaVirus = this.add.rectangle(this.player.x+220,this.player.y-210,120,7,0xff0000).setOrigin(1,0)

        //Bloqueamos al hacer click el mouse para solo el juego, ESC para cancelar el bloqueo.
        this.input.on('pointerdown',()=>{
            this.input.mouse.requestPointerLock()
            if(this.input.mouse.locked){
                this.laser.play()
                let bullet = this.physics.add.image(this.player.x,this.player.y,'punto').setScale(0.4).setAngle(this.angle)
                this.bullets.add(bullet)
            }
        }, this)

        //Movimiento con el puntero del mouse.
        this.input.on('pointermove',(pointer)=>{
            if(this.input.mouse.locked){
                this.reticle.x += pointer.movementX
                this.reticle.y += pointer.movementY
            }
        },this)

        this.cameras.main.startFollow(this.player)
        this.cursor = this.input.keyboard.createCursorKeys()
    }
    update()
    {
        this.angle = Phaser.Math.Angle.Between(this.reticle.x, this.reticle.y, this.player.x, this.player.y)
        this.player.rotation = this.angle - Math.PI / 2

        if(this.input.mouse.locked && this.pandemia.getLength()>0){
            this.pandemia.children.iterate((child)=>{
                child.setGravityX(Phaser.Math.Between(-100,100))
                child.setGravityY(300)
                child.setBounce(1)
            })
        }
        if(this.input.mouse.locked && this.bullets.getLength()>0){
            this.bullets.children.iterate((child)=>{
                if(child){
                    let x,y;
                    x = Math.cos(child.angle)
                    y = Math.sin(child.angle)
                    child.setVelocity(-x*570,-y*570)
                }
            })
        }
        if(this.input.mouse.locked){
            if(this.cursor.right.isDown){
                this.player.body.velocity.x = +this.speed
                moveText(this.player,this.textVirus,this.rectaVirus,+220)
                moveText(this.player,this.textVida,this.rectaLife,-220)
            }
            else if(this.cursor.left.isDown){
                this.player.body.velocity.x = -this.speed
                moveText(this.player,this.textVirus,this.rectaVirus,+220)
                moveText(this.player,this.textVida,this.rectaLife,-220)
            }
            else if(this.cursor.down.isDown){
                this.player.body.velocity.y = +this.speed
                moveText(this.player,this.textVirus,this.rectaVirus,+220)
                moveText(this.player,this.textVida,this.rectaLife,-220)
            }
            else if(this.cursor.up.isDown){
                this.player.body.velocity.y = -this.speed
                moveText(this.player,this.textVirus,this.rectaVirus,+220)
                moveText(this.player,this.textVida,this.rectaLife,-220)
            }
            else {
                this.player.body.velocity.x = 0
                this.player.body.velocity.y = 0
            }
        }
    }
}

// ----- Funciones para Colisiones ----->
function moveText(base,text,recta,moveX){
    text.x = base.x+moveX
    text.y = base.y-226
    recta.x = base.x+moveX
    recta.y = base.y-210
}

function colisionBulletBox(bullet,box){
    this.explosion.play()
    bullet.destroy()
}

function colisionVirusPlayer(player,virus){
    this.stamina--
    this.rectaLife.width -= 6
    this.textVida.setText('vida: '+this.stamina)
    //player.setTint(0xff0000)
}
function colisionBulletVirus(bullet,pandemia){
    this.hit.play()
    this.rectaVirus.width -= 10
    this.rectaVirus.setOrigin(1,0)
    bullet.destroy()
    pandemia.destroy()
    this.textVirus.setText('virus: '+this.pandemia.getLength())
}