class Bedroom extends AdventureScene {
    constructor() {
        super("bedroom", "Your Bedroom");
    }
    preload(){
        this.load.image('bedroom', "assets/backgrounds/catbedroom.png");
        this.load.image('portal', "assets/objects/portal1.png");
        this.load.image('Empty Bottle', "assets/objects/emptybottleasset.png");
    }
    onEnter() {
        let background = this.add.image(this.cameras.main.width/2.75, this.cameras.main.height/2, 'bedroom');
        let window = this.add.rectangle(this.w*.3, this.w* .25, 200,300, 'ff0000', 0)
        .setInteractive()
        .on('pointerover', () => this.showMessage("It's a beautiful day outside."));
        
        let portal = this.add.sprite(this.w * .48,this.w*.3,'portal');
        portal.setScale(.15);
        portal.setAlpha(0);
        this.tweens.add({
            targets: portal,
            rotation: 360,
            duration: 3000,
            repeat: -1,
        })
        
        let cat = this.add.rectangle(this.w * .3,this.w *.39,150,175, '#ff0000', 0)
        .setInteractive()
        .on('pointerover', () => this.showMessage("*Purr*"));

        let bed =  this.add.rectangle(this.w*.5, this.w* .45, 200,700, 'ff0000',0)
        .setInteractive()
        .on('pointerover', () => this.showMessage("It's too early for a nap."));
        bed.setRotation(1.1);

        let dresser =  this.add.rectangle(this.w*.37, this.w* .3, 125,500, 'ff0000',0)
        .setInteractive()
        .on('pointerover', () => this.showMessage("Your clothes are in here, but you're already dressed."));


        let bottle = this.add.sprite(this.w *.19, this.w *.35, 'Empty Bottle')
        .setInteractive()
        .on('pointerover', () => this.showMessage("An empty bottle, maybe you should recycle it"))
        .on('pointerdown', () => { this.showMessage("You pick up the empty bottle.");
        this.gainItem('Empty Bottle');
        this.tweens.add({
            targets: bottle,
            y: `-=${2 * this.s}`,
            alpha: { from: 1, to: 0 },
            duration: 500,
            onComplete: () => {
                bottle.destroy();
                this.tweens.add({
                    targets: portal,
                    alpha: { from: 0, to: 1},
                    duration: 2000,
                })
                portal.setInteractive()
                .on('pointerover', () => this.showMessage("What the heck is this???"))
                .on('pointerdown', () => {this.showMessage("WhoosH");
                this.gotoScene('spookypath')})
            }
        
        })});
        bottle.setScale(.125);
        
        let fairy = this.add.rectangle(this.w * .3, this.w * .425, 50,50, 'ff000', 0)
        .setInteractive()
        .on('pointerover', () => this.showMessage("Your cat seems to have brought a \"present\", maybe you can put it outside with something."))
        .on('pointerdown', () => { 
            if (this.hasItem('Empty Bottle') == 1) {
            this.loseItem('Empty Bottle');
            this.gainItem('Fairy in a Bottle');
            this.showMessage("NOOOOO. I CAN'T BELIEVE YOU CAUGHT ME");
            fairy.destroy();
            }});
        
            

    }
}

class SpookyPath extends AdventureScene {
    constructor() {
        super("spookypath", "Forest Path");
    }
    preload() {
        this.load.image('spookytrail', "assets/backgrounds/forest_path.png");
        this.load.image('Walking Stick', "assets/objects/walkingstick.png");
        this.load.image('Bee Hive', "assets/objects/beehive.png");
    }
    onEnter() {
        let background = this.add.image(this.cameras.main.width/2.75, this.cameras.main.height/2, 'spookytrail');
        background.setScale(.5);
        this.entryMessage("You are pulled through the portal into the woods. Its colder than your room, and as your eyes adjust you realize that it is night here. Where could this place be? \nThere are no visible street lights, but the moon lluminates the path in front of you.", 2 * this.s);
        
        let stick = this.add.sprite(this.w * .18, this.w*.5, 'Walking Stick');
        stick.setScale(.25);
        stick.setRotation(.75);
        console.log(stick.texture.key);
        this.setDragable(stick, "That's a cool walking stick!");

        let beehive = this.add.sprite(this.w * .4, this.w *.2, 'Bee Hive');
        beehive.setScale(.25)
        // this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage("You've got no other choice, really.");
        //     })
        //     .on('pointerdown', () => {
        //         this.gotoScene('demo1');
        //     });

        // let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage('*giggles*');
        //         this.tweens.add({
        //             targets: finish,
        //             x: this.s + (this.h - 2 * this.s) * Math.random(),
        //             y: this.s + (this.h - 2 * this.s) * Math.random(),
        //             ease: 'Sine.inOut',
        //             duration: 500
        //         });
        //     })
        //     .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('logo'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class Logo extends Phaser.Scene{
    constructor(){
        super('logo')
    }
    preload(){
        this.load.image('catLogo', "assets/catsnugglelogo.png")
        this.load.image('LogoType', "assets/catsnugstudio.png")
        this.load.audio('catPurr', "assets/purr_10.mp3")
    }
    create(){     
      
        let purring = this.sound.add('catPurr');
        purring.play();
        this.cameras.main.fadeIn(5000,0,0,0);
        let logoBG = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'catLogo')
        logoBG.setScale(.5).setScrollFactor(0)
        let logoType = this.add.image(this.cameras.main.width /2, (this.cameras.main.height / 2)+250, 'LogoType');
        logoType.setScale(.35);
        this.time.delayedCall(5000, () => {
            this.cameras.main.fadeOut(5000,0,0,0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {this.scene.start('title')})
        })

    }
}
class Title extends Phaser.Scene {
    constructor() {
        super('title')
    }
    preload(){
        this.load.image('spookytrail', "assets/backgrounds/forest_path.png");
        loadFont("witchkin", "assets/witchkin.ttf");
    }
    create() {
        let background = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'spookytrail');
        this.cameras.main.fadeIn(5000,0,0,0);
        let clickStart = this.add.text((this.cameras.main.width/2)-250, (this.cameras.main.height/2)+100, "Click To Begin",{fontFamily: 'witchkin',
        fontSize: '48px',
        color: '#52f298'});
        clickStart.preFX.addShadow(0, 0, 0.006, 2, 0x155933, 10);
        let titleText = this.add.text((this.cameras.main.width/2)-400, (this.cameras.main.height/2)-400, "Spooky Woods",{fontFamily: 'witchkin',
        fontSize: '96px',
        color: '#52f298'});
        titleText.preFX.addShadow(5,-5, .006, 2, 0x155933, 10);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('bedroom'));
        });
        
        
    }
}

function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    //scene: [Logo, Intro, Demo1, Demo2, Outro],
    scene: [SpookyPath],

    title: "Adventure Game",
});

