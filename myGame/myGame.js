/*
 * File: MyGame.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */

"use strict"; // Operate in Strict mode such that variables must be declared before used!

// loaded sprite sheets must be 2^x by 2^y
// 1024x512, 128x64, 2x4, 4x16, 64x256

function MyGame() {
    // this.kMinionSprite = "assets/minion_sprite.png";
    // this.kPlatformTexture = "assets/platform.png";
    // this.kWallTexture = "assets/wall.png";
    // this.kDyePackTexture = "assets/dye_pack.png";
    // this.kParticleTexture = "assets/particle.png";
    this.kPrompt = "Game Text!";

    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;

    // sprite objects
    this.jellySpriteSheet = "assets/jelly.png";
    this.mJelly = null;

    this.mCollidedObj = null;
    // this.mAllPlatforms = new GameObjectSet();
    // this.mAllMinions = new GameObjectSet();
    // this.mAllDyePacks = new GameObjectSet();
    // this.mAllParticles = new ParticleGameObjectSet();
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function() {
    gEngine.Textures.loadTexture(this.jellySpriteSheet);
};

MyGame.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.jellySpriteSheet);
};

MyGame.prototype.initialize = function() {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 56.25), // position of the camera
        200, // width of camera
        [0, 0, 1280, 720] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.2, 0.7, 0.7, 1]);
    // sets the background to gray

    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.mJelly = new SpriteRenderable(this.jellySpriteSheet);
    this.mJelly.setColor([1, 0, 0, 0.2]); // tints red
    this.mJelly.getXform().setPosition(10, 30);
    this.mJelly.getXform().setSize(4, 4);
    this.mJelly.setElementPixelPositions(0, 32, 0, 32);

    // the important objects
    //this.mHero = new Hero(this.kMinionSprite, 20, 30);

    this.mMsg = new FontRenderable(this.kPrompt);
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(10, 25);
    this.mMsg.setTextHeight(3);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function() {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mJelly.draw(this.mCamera);
    // this.mAllMinions.draw(this.mCamera);
    // this.mAllDyePacks.draw(this.mCamera);
    // this.mHero.draw(this.mCamera);
    // this.mAllParticles.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function() {
    this.mCamera.update(); // to ensure proper interpolated movement effects

    // left click check
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        if (this.mCamera.isMouseInViewport()) {
            this.kPrompt = "Mouse Click!";
        }
    }

    // key button check
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.kPrompt = "W pressed!";
    }

    // physics simulation
    //this._physicsSimulation();

    this.mMsg.setText(this.kPrompt);
};

// MyGame.prototype.createParticle = function(atX, atY) {
//     var life = 30 + Math.random() * 200;
//     var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
//     p.getRenderable().setColor([1, 0, 0, 1]);

//     // size of the particle
//     var r = 3.5 + Math.random() * 2.5;
//     p.getXform().setSize(r, r);

//     // final color
//     var fr = 3.5 + Math.random();
//     var fg = 0.4 + 0.1 * Math.random();
//     var fb = 0.3 + 0.1 * Math.random();
//     p.setFinalColor([fr, fg, fb, 0.6]);

//     // velocity on the particle
//     var fx = 10 * Math.random() - 20 * Math.random();
//     var fy = 10 * Math.random();
//     p.getPhysicsComponent().setVelocity([fx, fy]);

//     // size delta
//     p.setSizeDelta(0.98);

//     return p;
// };
