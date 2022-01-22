// GGJ 2022
// Main.js
// Main Menu
import Phaser from 'phaser';
import Button from '../../Components/Core/Button';


class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        this.load.audio('bg_music', ['assets/audio/Scanglobe_Trench.mp3', 'assets/audio/Scanglobe_Trench.ogg']);
    }

    create() {
        const { width, height } = this.sys.game.canvas;

        this.music = this.sound.add('bg_music');
        this.music.play();

        this.add.text(width / 2, height / 3, 'Name', { fill: 'white', fontFamily: 'GameFont', fontSize: '40px' }).setOrigin(0.5, 0.5);

        this.buttons = { 
            start: new Button({ scene: this, x: width / 2, y: height / 2 }, 'Spiel starten', true),
            manual: new Button({ scene: this, x: width / 2, y: (height / 2) + 70 }, 'Anleitung anzeigen'),
            settings: new Button({ scene: this, x: width / 2, y: (height / 2) + 140 }, 'Einstellungen'),
        };
        this.activeButton = 'start';

        this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.key_UP_isPressed = false;
        this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.key_DOWN_isPressed = false;
        this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if(this.key_UP.isDown && this.key_UP_isPressed === false) {
            this.key_UP_isPressed = true;
            this.setActiveButton('UP');
        } else if(this.key_DOWN.isDown && this.key_DOWN_isPressed === false) {
            this.key_DOWN_isPressed = true;
            this.setActiveButton('DOWN');
        } else if(this.key_UP.isUp && this.key_UP_isPressed === true) {
            this.key_UP_isPressed = false;
        } else if(this.key_DOWN.isUp && this.key_DOWN_isPressed === true) {
            this.key_DOWN_isPressed = false;
        } else if(this.key_ENTER.isDown) {
            if(this.buttons.start.getActive()){
                this.scene.start("Room1");
            }
            if(this.buttons.manual.getActive()){
                this.scene.start("SplashScreenGGJ");
            }
            if(this.buttons.settings.getActive()){
                this.scene.start("SplashScreenGGJ");
            }
        }
    }

    setActiveButton(direction) {
        if(direction === 'DOWN') {
            if(this.activeButton === 'start') {
                this.buttons.start.toggleActive();
                this.buttons.manual.toggleActive();
                this.activeButton = 'manual';
            } else if(this.activeButton === 'manual') {
                this.buttons.manual.toggleActive();
                this.buttons.settings.toggleActive();
                this.activeButton = 'settings';
            } else if(this.activeButton === 'settings') {
                this.buttons.start.toggleActive();
                this.buttons.settings.toggleActive();
                this.activeButton = 'start';
            }
        } else if(direction === 'UP') {
            if(this.activeButton === 'start') {
                this.buttons.start.toggleActive();
                this.buttons.settings.toggleActive();
                this.activeButton = 'settings';
            } else if(this.activeButton === 'manual') {
                this.buttons.manual.toggleActive();
                this.buttons.start.toggleActive();
                this.activeButton = 'start';
            } else if(this.activeButton === 'settings') {
                this.buttons.settings.toggleActive();
                this.buttons.manual.toggleActive();
                this.activeButton = 'manual';
            }
        }
    }
}


export default Menu;