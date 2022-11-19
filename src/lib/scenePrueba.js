let pandemia;
let bullet;
let player;
let angle;
let cursor;

export class ScenePrueba extends Phaser.Scene {
   constructor(){
      super({key:'pruebas'})
   }
   init(){}
   preload(){
      this.load.image('player','./src/assets/shooter.png')
      this.load.image('virus','./src/assets/virus.png')
      this.load.image('punto','./src/assets/punto.png')
   }
   create(){
      this.player = this.physics.add.image(240,400,'player')
      this.pandemia = this.physics.add.group({
         key: 'virus',
         repeat: 3,
         setScale: {x:0.75,y:0.75},
         setXY: {x:90,y:100,stepX:100}
      })

      this.bullets = this.physics.add.group({
         runChildUpdate: true
      })

      this.physics.add.collider(this.bullets,this.pandemia,this.colisionBulletsPandemia,null,this)

      this.cursor = this.input.keyboard.createCursorKeys()
      this.input.on('pointerdown',this.shoot,this)
   }
   update(time,delta){
      if(this.bullets.getLength()>0){
         this.bullets.children.iterate((child)=>{
            if(child){
               child.setVelocityY(-100)
               if(child.y < 0){
                  child.destroy()
               }
            }
         })
      }

      if(this.cursor.right.isDown){
         this.player.setVelocityX(delta*+25)
      }
      else if(this.cursor.left.isDown){
         this.player.setVelocityX(delta*-25)

      } else {
         this.player.setVelocityX(0)
      }
   }
   shoot(){
      console.log(this.bullets.getLength())
      this.bullet = this.physics.add.image(this.player.x,this.player.y,'punto').setScale(0.4)
      this.bullets.add(this.bullet)
   }
   colisionBulletsPandemia(bullet,pandemia){
      bullet.destroy()
      pandemia.destroy()
   }
}