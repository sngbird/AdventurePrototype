class AdventureScene extends Phaser.Scene {

    init(data) {
        this.inventory = data.inventory || [];
    }

    constructor(key, name) {
        super(key);
        this.name = name;
    }
    preload(){
        loadFont("witchkin", "assets/witchkin.ttf");
        this.load.image('portal', "assets/objects/portal1.png");

    }
    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0);
        this.add.text(this.w * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);
        
        this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.33)
            .setStyle({ fontSize: `${2 * this.s}px`, color: '#eea' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        

        this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(0);

        this.inventoryTexts = [];
        this.updateInventory();

        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();

    }

    showMessage(message) {
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 6 * this.transitionDuration
        });
    }

    entryMessage(message, size){
        let entryBox = this.add.text(this.w* .01 + this.s, this.h * 0.05)
         .setStyle({ fontFamily: 'witchkin',fontSize: `${2 * this.s}px`, color: '#52f298' })
         .setWordWrapWidth(this.w * 0.75 - 2 * this.s)
        entryBox.setText(message);
        entryBox.setStyle({ fontSize: `${size}px` });
        this.input.on('pointerdown', () => { 
            this.tweens.add({
                targets: entryBox,
                alpha: { from: 1, to: 0 },
                easing: 'Quintic.in',
                duration: 2000,
                onComplete: () => {
                    entryBox.setText('');
                    //entryBox.destroy();
                    //extra;
                }
            })
        })
        
            
        
    }

    updateInventory() {
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        this.inventoryTexts = [];
        let h = this.h * 0.66 + 3 * this.s;
        this.inventory.forEach((e, i) => {
            let text = this.add.text(this.w * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1.5 * this.s}px` })
                .setWordWrapWidth(this.w * 0.75 + 4 * this.s);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    gainItem(item) {
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.inventory.push(item);
        this.updateInventory();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    loseItem(item) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x, to: text.x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory = this.inventory.filter((e) => e != item);
            this.updateInventory();
        });
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }

    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
    setMouseOver(object, mouseOverMsg){
        object.setInteractive()
        .on('pointerover', () => this.showMessage(mouseOverMsg));
    }
    setZoneOver(object, mouseOverMsg, newZone){
        object.setInteractive()
        .on('pointerover', () => this.showMessage(mouseOverMsg))
        .on('pointerdown', () => this.gotoScene(newZone));
    }

    setCollectable(object, mouseOverMsg,){
        object.setInteractive()
        .on('pointerover', () => this.showMessage(mouseOverMsg))
        .on('pointerdown', () => { this.showMessage("You pick up the "+object.texture.key);
        this.gainItem(object.texture.key);
        this.tweens.add({
            targets: object,
            y: `-=${2 * this.s}`,
            alpha: { from: 1, to: 0 },
            duration: 500,
            onComplete: () => {
                object.destroy();
            }
        })
    })
    }
    setDragable(object, mouseOverMsg){
        object.setInteractive({ draggable: true});
        object.on('pointerover', () => this.showMessage(mouseOverMsg))
        .on('drag', (pointer, dragX, dragY) => object.setPosition(dragX, dragY));
    }
    createPortal(x,y,msg,newScene){
        let portal = this.add.sprite(x,y,'portal');
        portal.setAlpha(0);
        portal.setScale(.15);
        this.tweens.add({
            targets: portal,
            rotation: 360,
            duration: 3000,
            repeat: -1,
        })
        this.tweens.add({
            targets: portal,
            alpha: { from: 0, to: 1},
            duration: 2000,
        })
        this.setZoneOver(portal, msg, newScene);
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