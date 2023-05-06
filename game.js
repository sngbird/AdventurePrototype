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
        let window = this.add.rectangle(this.w*.3, this.w* .25, 200,300, 'ff0000', 0);
        this.setMouseOver(window,"It's a beautiful day outside.");
        
        let cat = this.add.rectangle(this.w * .3,this.w *.39,150,175, '#ff0000', 0);
        this.setMouseOver(cat,"*Purr*");

        let bed =  this.add.rectangle(this.w*.5, this.w* .45, 200,700, 'ff0000',0);
        this.setMouseOver(bed,"It's too early for a nap.");
        bed.setRotation(1.1);

        let dresser =  this.add.rectangle(this.w*.37, this.w* .3, 125,500, 'ff0000',0);
        this.setMouseOver(dresser,"Your cltohes are in here, but you're already dressed");


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
                this.createPortal(this.w * .48,this.w*.3,"What's that???","spookypath");
                
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
        let stick;
        let beehive;
        let firstEntry = false;
    }
    preload() {
        this.load.image('spookytrail', "assets/backgrounds/forest_path.png");
        this.load.image('Walking Stick', "assets/objects/walkingstick.png");
        this.load.image('Bee Hive', "assets/objects/beehive.png");
    }
    onEnter() {
        let background = this.add.image(this.cameras.main.width/2.75, this.cameras.main.height/2, 'spookytrail');
        background.setScale(.5);
        if (!this.firstEntry){
            this.entryMessage("You are pulled through the portal into the woods. Its colder than your room, and as your eyes adjust you realize that it is night here. Where could this place be? \nThere are no visible street lights, but the moon lluminates the path in front of you.", 2 * this.s);
            this.firstEntry = true;
        }
        if(!this.hasItem("A Cool Walking Stick")){
            this.stick = this.physics.add.image(this.w * .18, this.w*.5, 'Walking Stick');
            this.stick.setScale(.25);
            this.stick.setRotation(.75);
            this.setDragable(this.stick, "That's a cool walking stick!");
            this.beehive = this.physics.add.sprite(this.w * .4, this.w *.2, 'Bee Hive');
            this.beehive.setScale(.25);
            this.setMouseOver(this.beehive,"A beehive! I bet I could get honey from there if I can knock it down with something...");
        }

        let witchesPath = this.add.rectangle(this.w*.34, this.w* .32, 150,150, '0xeb344c', 0);
        this.setZoneOver(witchesPath,"Smoke rises from a house in the distance.","witcheshut");

        let hiddenPath = this.add.rectangle(this.w*.6, this.w* .38, 125,125, '0xeb344c', 0);
        this.setZoneOver(hiddenPath,"Some animal tracks seem to lead off in this direction…","murkypond");

        //Details
        let owl = this.add.rectangle(this.w*.15, this.w* .1, 125,125, '0xeb344c', 0);
        this.setMouseOver(owl,"Your eyes are drawn to the darkness here… A pair of large eyes watch you back. *Hoot*");

        let moonlight = this.add.rectangle(this.w*.35, this.w* .05, 300,150, '0xeb344c', 0);
        this.setMouseOver(moonlight,"The moon must be directly above you based on the light on the road… but why does the canopy look so dark?");


        let scarypath = this.add.rectangle(this.w*.4, this.w* .35, 75,125, '0xeb344c', 0);
        this.setMouseOver(scarypath,"For some reason, the moonlight doesn\’t light the path going in this direction. It\'s really foreboding, maybe it\'s best stay where it\’s well lit")

        let spookyplants = this.add.rectangle(this.w*.17, this.w* .3, 175,150, '0xeb344c', 0);
        this.setMouseOver(spookyplants,"The plants seem to blend together at night...");

    }
    update(){
        if(this.physics.world.collide(this.stick,this.beehive,)){
            this.stick.destroy();
            this.tweens.add({
                targets: this.beehive,
                y: `-=${2 * this.s}`,
                alpha: { from: 1, to: 0 },
                duration: 500,
                onComplete: () => {
                    this.beehive.destroy();
                }
            })
            this.showMessage("You smack the beehive with the walking stick, it falls to the ground revealing sticky honey. Oddly there are no bees.")
            this.gainItem("A Cool Walking Stick");
            this.gainItem("Honey");
        }  
        
    }
}

class MurkyPond extends AdventureScene {
    constructor() {
        super("murkypond", "A Murky Pond");
        let firstEntry = false;
    }
    preload() {
        this.load.image('murkypond', "assets/backgrounds/murkypond.png");
        loadFont("witchkin", "assets/witchkin.ttf");
        this.load.image('Echinacea', "assets/objects/echinacea.png");
        
    }
    onEnter() {
        let background = this.add.image(this.cameras.main.width/2.75, this.cameras.main.height/2, 'murkypond');
        background.setScale(.5);
        if(!this.firstEntry){
            this.entryMessage("You walk along the hidden trail in the dark, the moonlight breaking through the trees to illuminate your path with diffuse light. The air is cool but pleasant and after a few minutes of listening to the sound of insects and frogs you come upon a murky pond.",2 * this.s);
            this.firstEntry = true;
        }
        let pondwater = this.add.rectangle(this.w*.45, this.w* .38, 250,250, '0xeb344c', 0);
        this.setMouseOver(pondwater,"Pond water, you could collect it with an Empty Bottle");
        if (this.hasItem("Empty Bottle")){
            pondwater.on('pointerdown', () => {this.gainItem("Pond Water");
        this.loseItem("Empty Bottle")})
        }
        let echinaceaStalk = this.add.sprite(this.w *.4, this.w*.25, 'Echinacea');
        echinaceaStalk.setScale(.1);
        this.setCollectable(echinaceaStalk,"A bunch of Echinacea");

        let goBack = this.add.text(this.w * .65,this.w *.5, "Go Back");
        goBack.setStyle({ fontFace: "witchkin", fontSize: "36px", color: '#52f298'})
        
        this.setZoneOver(goBack, "Walk back up the path", "spookypath");
    }
}

class WitchesHut extends AdventureScene{
    constructor() {
        super("witcheshut", "Witches Hut");
        let cauldron;
        let firstEntry = false;
    }
    preload(){
        this.load.image('witcheshut', "assets/backgrounds/witcheshut.png");
        this.load.image('cauldron', "assets/objects/cauldron.png");
        this.load.image('Tea Leaves', "assets/objects/tealeavesasset.png");
        this.load.image('portal', "assets/objects/portal1.png");
    }
    onEnter(){
        let background = this.add.image(this.cameras.main.width/2.75, this.cameras.main.height/2, 'witcheshut');
        if(!this.firstEntry){
            this.entryMessage("You enter the living room of a small house. A woman whose features you can\’t seem to fully grasp greets you as you enter, “You must be the one my familiar sent to help me, I\’m a bit too sick to gather the ingredients I need you see.” She sounds congested.\n “Please bring Pond Water, Tea Leaves, Honey, and Echinacea. I\’ll be able to make a healing potion with them. In exchange I\’ll help you get home, and I\’ll grant you one wish.\"",2 * this.s);
            this.firstEntry = true;
        }
        if (this.hasItem("Fairy in a Bottle")){
            this.showMessage("You brought back my familiar! Thank you, you have no idea how much trouble they can cause...");
            this.loseItem('Fairy in a Bottle');
            this.gainItem('Incantation Scroll');
            this.gainItem('Empty Bottle');
        }
        this.cauldron = this.add.image(this.w*.25,this.w*.4, 'cauldron');
        this.cauldron.setScale(.3);
        this.setMouseOver(this.cauldron, "You need: Tea Leaves, Echinacea, Honey, and Pond Water");
        
        if(!this.hasItem("Tea Leaves")){
        let tealeaves = this.add.sprite(this.w *.4, this.w*.185, 'Tea Leaves');
        tealeaves.setScale(.1);
        this.setCollectable(tealeaves, "Drying tea leaves");
        }

        let goBack = this.add.text(this.w * .65,this.w *.5, "Go Back");
        goBack.setStyle({ fontFace: "witchkin", fontSize: "36px", color: '#52f298'})
        this.setZoneOver(goBack, "Walk back up the path", "spookypath");
        

    }
    update(){
        if(this.hasItem("Pond Water") && this.hasItem("Tea Leaves") && this.hasItem("Honey") && this.hasItem("Echinacea")){
            this.cauldron.setInteractive()
            .on('pointerdown', () => {
                this.loseItem("Pond Water");
                this.loseItem("Tea Leaves");
                this.loseItem("Honey");
                this.loseItem("Echinacea");
                let portal = this.add.sprite(this.w * .47, this.w*.375,'portal');
                portal.setAlpha(0);
                portal.setScale(.15);
                this.createPortal(this.w* .47, this.w * .375, "Where does this one go?", "cemetary");
            })
        }
    }
}

class Cemetary extends AdventureScene{
    constructor(){
        super("cemetary", "A Cemetary");
        let candle1;
        let candle2;
        let candle3;
        let socket1;
        let socket2;
        let socket3;
        let socketgroup;
    }
    preload(){
        this.load.image('cemetary', "assets/backgrounds/cemetary.png");
        this.load.image('candle', "assets/objects/candle.png");
        this.load.image('socket', "assets/objects/socket.png");
        this.load.image('portal', "assets/objects/portal1.png");



    }
    onEnter(){
        let background = this.add.image(this.cameras.main.width/2.75, this.cameras.main.height/2, 'cemetary');
        background.setScale(.5);
        if(this.hasItem('Incantation Scroll')){
            this.entryMessage("As you step through the fire, the witch says, \“You just need to complete the ritual to get home. Place the candles on the 3 points of the tallest tombstone, and read the incantation.\”",  2 * this.s)
        }
        else{
            this.entryMessage("As you step through the fire, the witch says, \“You just need to complete the ritual to get home. Place the candles on the 3 points of the tallest tombstone, and read the incantation.\”",  2 * this.s)
        }
        //Candles and Sockets
        this.candle1 = this.physics.add.sprite(this.w * .24, this.w* .35, 'candle');
        this.candle1.setScale(.1);
        this.setDragable(this.candle1);

        this.candle2 = this.physics.add.sprite(this.w * .485, this.w* .33, 'candle');
        this.candle2.setScale(.1);
        this.setDragable(this.candle2);

        this.candle3 = this.physics.add.sprite(this.w * .42, this.w* .41, 'candle'); 
        this.candle3.setScale(.1);
        this.setDragable(this.candle3);
        
        this.socket1 = this.physics.add.image(this.w* .41, this.w * .25, 'socket');
        this.socket1.setAlpha(.5);
        this.socket1.setScale(.15)
        this.socket2 = this.physics.add.image(this.w*.46, this.w* .25, 'socket');
        this.socket2.setAlpha(.5);
        this.socket2.setScale(.15)
        this.socket3 = this.physics.add.image(this.w* .435, this.w * .225, 'socket');
        this.socket3.setAlpha(.5);
        this.socket3.setScale(.15);




        
    }
    update(){
        if(this.physics.world.collide(this.socket1, this.candle1) && (this.physics.world.collide(this.socket2, this.candle2)) && (this.physics.world.collide(this.socket3, this.candle3))){
             if(this.hasItem('Incantation Scroll')){
                this.createPortal(this.w * .435, this.w * .29, "Here goes nothing...", "goodend");
                }
             else{
                this.createPortal(this.w * .435, this.w * .29, "Here goes nothing...", "normalend");
                 }
 
        }
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
class GoodEnd extends Phaser.Scene{
    constructor(){
        super('goodend')
    }
    preload(){
        this.load.image('bedroom', "assets/backgrounds/catbedroom.png");
        loadFont("witchkin", "assets/witchkin.ttf");

    }
    create(){
        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        let background = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'bedroom');
        let entryBox = this.add.text(this.cameras.main.width/5, this.cameras.main.height/8)
         .setStyle({ fontFamily: 'witchkin',fontSize: `${2 * this.s}px`, color: '#52f298' })
         .setWordWrapWidth(1200);
        entryBox.setText("You step out of the portal into your room, much the way you left it before. You hear in the back of your mind \“Don\’t forget, I promised you a wish. The next time your heart truly desires something, it\’s yours.\” Today was weird, but at least you got a wish out of it…");
        entryBox.setStyle({ fontSize: `48px` });
        entryBox.preFX.addShadow(.5,-.5, .006, 2, 0x000000, 10);

        this.input.on('pointerdown', () => { 
            this.tweens.add({
                targets: this.entryBox,
                alpha: { from: 1, to: 0 },
                easing: 'Quintic.in',
                duration: 4 * this.transitionDuration,
                onComplete: () => {
                        this.cameras.main.fade(1000, 0,0,0);
                        this.time.delayedCall(1000, () => this.scene.start('credits'));
                    }
            })
        })
    }
}


class NormalEnd extends Phaser.Scene{
    constructor(){
        super('normalend')
    }
    preload(){
        this.load.image('bedroom', "assets/backgrounds/catbedroom.png");
    }
    create(){
        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        let entryBox = this.add.text(this.cameras.main.width/5, this.cameras.main.height/8)
        .setStyle({ fontFamily: 'witchkin',fontSize: `${2 * this.s}px`, color: '#52f298' })
        .setWordWrapWidth(this.cameras.main.width *.66);
       entryBox.setText("You step out of the portal to find your room is a completely trashed and your cat is missing.\nYou find yourself wishing for your cat to come home, and then you hear in your head, \“Your wish is my command! Your cat chased my familiar back to my house. I\’ll clean up the mess my familiar made because your wish was so easy. So we're square, yeah?\” \nYour cat comes tumbling out of a portal, looking freaked out but fine. What a weird day.");
       entryBox.setStyle({ fontSize: `48px` });
       entryBox.preFX.addShadow(.5,-.5, .006, 2, 0x000000, 10);

       this.input.on('pointerdown', () => { 
           this.tweens.add({
               targets: this.entryBox,
               alpha: { from: 1, to: 0 },
               easing: 'Quintic.in',
               duration: 4 * this.transitionDuration,
               onComplete: () => {
                       this.cameras.main.fade(1000, 0,0,0);
                       this.time.delayedCall(1000, () => this.scene.start('credits'));
                   }
           })
       })
    }
}

class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }
    create() {
        this.cameras.main.setBackgroundColor('#444');
        let entryBox = this.add.text(this.cameras.main.width/5, this.cameras.main.height/8)
        .setStyle({ fontFamily: 'witchkin',fontSize: `${2 * this.s}px`, color: '#52f298' })
        .setWordWrapWidth(this.cameras.main.width *.66);
       entryBox.setText("That's the game!\n \nA simple adventure game by Lumina Kinsinger-Dang\n based on a simple adventure game engine by:\n Adam Smith: https://github.com/rndmcnlly\n \nAll assets created using Midjourney and some very mild Krita editing.\n \nClick to return to the title.");
       entryBox.setStyle({ fontSize: `48px` });
       entryBox.preFX.addShadow(.5,-.5, .006, 2, 0x000000, 10);

       this.input.on('pointerdown', () => { 
           this.tweens.add({
               targets: this.entryBox,
               alpha: { from: 1, to: 0 },
               easing: 'Quintic.in',
               duration: 4 * this.transitionDuration,
               onComplete: () => {
                       this.cameras.main.fade(1000, 0,0,0);
                       this.time.delayedCall(1000, () => this.scene.start('title'));
                   }
           })
       })
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
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {this.scene.start('bedroom')})
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
            this.time.delayedCall(1000, () => this.scene.start('logo'));
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
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [SpookyPath],
    //scene: [Title, Logo, Bedroom, SpookyPath, MurkyPond, WitchesHut, Cemetary, NormalEnd, GoodEnd, Credits],

    title: "Spooky Woods",
});
