---
layout: post
title: "Scary Monster For Your Next FPS Game in Three.js With threex.md2character"
date: 2014-05-06 20:19
comments: true
categories: [threexaday, threex, game, extension, three.js]
published: true
---

<a href='http://jeromeetienne.github.io/threex.md2character/examples/select.html' target='_blank'><img class="right" src="https://raw.githubusercontent.com/jeromeetienne/threex.md2character/master/examples/images/screenshot-threex-md2character-512x512.jpg" width="250" height="250"></a>
This is post is part of the ['one threex a day' challenge](/blog/2014/04/22/one-threex-a-day-gets-your-game-on-its-way-a-challenge/). 
This challenge is to publish every day one game extension for three.js!
One per day, every day and that for 2month!
In this post, we gonna talk about 
[threex.md2character](http://www.threejsgames.com/extensions/#threex.md2character).
threex.md2character is a 
[three.js game extension](http://www.threejsgames.com/extensions/)
which provides a model of a monster. 
His name is 'ratmahatta' and is from quake era.
It is animated, can hold a weapon, skin may be changed. Pretty sweet.
you got **12 weapons to choose from**, **5 different skins** and **16 distinct animations**. Pretty complete!
It is easy to include in your game, maybe in a cave or a dungeon :)
It is from 
[webgl_morphtargets_md2.html three.js example](http://threejs.org/examples/webgl_morphtargets_md2.html). 
The model is make by
[Brian Collins](http://planetquake.gamespy.com/View.php?view=Quake2.Detail&id=368) and converted by
[@oosmoxiecode](https://twitter.com/#!/oosmoxiecode)'s 
[MD2 converter](http://oos.moxiecode.com/blog/2012/01/md2-to-json-converter/).

<a href='http://jeromeetienne.github.io/threex.md2character/examples/select.html' target='_blank'><input type="button" value='Try Threex.md2character Demo Now' /></a>

To see the [other posts about one threex a day](/blog/categories/threexaday/) and forget our moto!
**"A THREEx extension a day, gets your game on its way!"**

<!-- more -->

<iframe width="420" height="315" src="//www.youtube.com/embed/zOqxsorcyQk" frameborder="0" allowfullscreen></iframe>

Show Don't Tell
===============
* [examples/select.html](http://jeromeetienne.github.io/threex.md2character/examples/select.html)
\[[view source](https://github.com/jeromeetienne/threex.md2character/blob/master/examples/select.html)\] :
It shows all the possibilities for the skins, the weapons and the animations.
* [examples/ratmahattaplayer.html](http://jeromeetienne.github.io/threex.md2character/examples/ratmahattaplayer.html)
\[[view source](https://github.com/jeromeetienne/threex.md2character/blob/master/examples/ratmahattaplayer.html)\] :
It shows how to controls the mesh as if it was a player in a game with input
in the keyboard wasd or arrows keys.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.md2character.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.md2character
```

How To Use It
=============

## threex.md2characterratmahatta.js

You typically create a ratamahatta like this

```
var ratamahatta = new THREEx.MD2CharacterRatmahatta()
scene.add(ratamahatta.character.object3d)
```

Don't forget to update it when you render with ```ratamahatta.update(delta)```.Internally, it create a character and a controls. You can use them directly.
* ```ratamahatta.character``` instance of ```THREEx.MD2Character```
* ```ratamahatta.controls``` instance of ```THREEx.MD2CharacterControls```

It has simple functions to set the skin, weapon and animations.

* ```ratamahatta.skinNames``` is the names of available skins. It has 5 different skins ```["ratamahatta", "ctf_b", "ctf_r", "dead", "gearwhore"]```
* ```ratamahatta.setSkinName(skinName)``` set the skin based on its name
* ```ratamahatta.weaponsNames``` is the names of available weapons. It has 12 animation ```["none", "weapon", "w_bfg", "w_blaster", "w_chaingun", "w_glauncher", "w_hyperblaster", "w_machinegun", "w_railgun", "w_rlauncher", "w_shotgun", "w_sshotgun"]``` 
* ```ratamahatta.setWeaponName(weaponName)``` set the weapon based on its name
* ```ratamahatta.animationNames``` is the names of available animation. It has 16 animations ```["stand", "run", "attack", "pain", "jump", "flip", "salute", "taunt", "wave", "point", "crstand", "crwalk", "crattack", "crpain", "crdeath", "death"]``` 
* ```ratamahatta.setAnimationName(animationName)``` set the animation based on its name


## threex.md2charactercontrols.js

First you create controls for your character like this

```
var controls    = new THREEx.MD2CharacterControls(character.object3d)
```

Dont forget to update it when you render with ```controls.update(delta, now)```. The character is controlled by ```controls.inputs``` properties. You just have to set them to fit your need.

* ```control.inputs.right``` is true if the character must go right
* ```control.inputs.left``` is true if the character must go left
* ```control.inputs.up``` is true if the character must go forward
* ```control.inputs.down``` is true if the character must go backward


## threex.md2character.js

It provide the base to play with the model.
It is a modified version of 
[MD2Character.js](https://github.com/mrdoob/three.js/blob/master/examples/js/MD2Character.js)
from this [webgl_morphtargets_md2.html three.js example](http://threejs.org/examples/webgl_morphtargets_md2.html). 

First you create it. 
```
var character   = new THREEx.MD2Character()
```

Dont forget to update it at every frame with a ```character.update(delta)```

* ```character.object3d``` is the THREE.Object3D container
* ```character.setWireframe(boolean)``` set the model in wireframe.
* ```character.setWeapon(weaponIndex)``` add a weapon in the character hand. ```weaponIndex``` is between 0 and 11. if -1, it removes the weapon.
* ```character.setSkin(skinIndex)``` set the skin of the character. ```skinIndex``` is between 0 and 4
* ```character.setAnimation(animationName)``` set the animation for the character. The name is one of ```["stand", "run", "attack", "pain", "jump", "flip", "salute", "taunt", "wave", "point", "crstand", "crwalk", "crattack", "crpain", "crdeath", "death"]```.
* ```character.setPlaybackRate(rate)``` set the playback rate of the animation.
* ```character.load(config)``` loads the characters
  * ```character.addEventListener('loaded', function(){})``` to be notified when the model is loaded
  * ```character.isLoaded()``` is true if the model is loaded, false otherwise


