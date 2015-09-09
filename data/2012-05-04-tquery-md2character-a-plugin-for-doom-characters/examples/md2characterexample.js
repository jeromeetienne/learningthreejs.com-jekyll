// # MD2Character
// This is annoted source of the examples for ```tQuery.MD2Character``` plugin.
// The live demo can be found [here](../)
 
// ## The 3D World

// First we initialize the world in 3D.
// With ```tQuery.createWorld()```, we create a ```tQuery.World```.
// With ```.boilerplate()```, we setup a boilerplate on this world. A boilerplate is
// a fast way to get you started on the right foot. It is the [learningthreejs
// boilerplate for three.js](http://learningthreejs.com/blog/2011/12/20/boilerplate-for-three-js/)
// With ```.start()```, we start the rendering loop. So from now on, the world scene
// gonna be rendered periodically, typically 60time per seconds.
var world	= tQuery.createWorld().boilerplate().start();

// Change the background color. This confusing line ensure the background of the
// 3D scene will be rendered as ```0x000000``` color, aka black. We set a black
// background to give an impression of night.
world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha() );

// ## The Lights 

// Here we setup the lights of our scene. This is important as it determine how
// your scene looks. We add a ambient light and 2 directional lights.
// The ambient light is a dark grey, to simulate the lack of light during the night.
// We setup a directional light in front colored redish.... This is like a setting sun.
// In the opposite direction, we put another direction light, bluish. This is like
// the moon. Well this was my rational :)
tQuery.createAmbientLight().addTo(world).color(0x444444);
tQuery.createDirectionalLight().addTo(world).position(-1,1,1).color(0xFF88BB).intensity(3);
tQuery.createDirectionalLight().addTo(world).position( 1,1,-1).color(0x4444FF).intensity(2);


// ## The fog

// We had a fog to the scene.
// For that, we use ```tquery.world.createfog.js``` plugins.
// It allows to create the 2 types of fog from three.js
// : [fogexp2](https://github.com/mrdoob/three.js/blob/master/src/scenes/FogExp2.js)
// and
// [fog](https://github.com/mrdoob/three.js/blob/master/src/scenes/Fog.js).
// ```density``` is the density of the fog. 0.01 is very light, 0.9 is almost opaque.
// In general, fogs are a nice visual trick. It is rather cheap to compute
// and limits the depth of what you see.
// It is a nice trick to hide the "end of the world" :)
world.addFogExp2({density : 0.1});

// # The Columns

// ### initialize a material

// We will apply it to all the columns. It is [lambert lighting](http://en.wikipedia.org/wiki/Lambertian_reflectance)
// the ```ambient``` is the color which gonna be combined with be combined with the ambient
// light we initialized on top. ```color``` will be combined with the
// directional lights. and ```map``` gives the texture to use.
var material	= new THREE.MeshLambertMaterial({
	ambient	: 0xFFFFFF,
	color	: 0xFFAAAA,
	map	: THREE.ImageUtils.loadTexture('images/water.jpg')
});

// ### Build 15 Columns

// loop over each column
for(var i = 0; i < 15; i++ ){
	// Create the cylinder. We pass some parameters to the contructor to setup
	// the size we see fit, and we add the material we want to apply on the
	// cylinder. Then we use ```.addTo()``` to add our object to
	// our ```tQuery.World```.
	var column	= tQuery.createCylinder(0.2,0.2,2, material).addTo(world);
	// Change the position of the column. We translate the column to build
	// a kind of alley. Thus the character will be able to run inside it :)
	column.translateX(i%2 ? +1 : -1).translateY(1).translateZ(15/2 + -1*i);
}

// # The Ground

// We create a large checkerboard with ```tquery.checkerboard.js``` plugin.
// We scale the checkerboard to 100 per 100 units in the 3D world. Thus it is
// quite large and disappears into the fog. It gives the cheap impression of
// an infinite checkerboard.
tQuery.createCheckerboard({
	segmentsW	: 100,	// number of segment in width
	segmentsH	: 100	// number of segment in Height
}).addTo(world).scaleBy(100);

// # The Character 

// We use ```tQuery.RatamahattaMD2Character``` plugin. Its inherits from
// ```tQuery.MD2Character``` plugin. All the configuration for this particular
// character ```ratamahatta``` is already done for you.
// We attach it to tQuery world.
// Additionnaly we use ```.hookKeyboard()``` which bind arrow key to character moving.
// This function is part of
// [keyboard plugins for ratamahatta](../../tquery.md2character.ratamahatta.keyboard.js)
var character	= new tQuery.RatamahattaMD2Character().attach(world).hookKeyboard();

// Here we show an example of binding the "loaded" event.
// It is notified once the whole characters data are loaded (texture, mesh for animations of
// body and weapons). It just display the name of the available animations.
character.bind("loaded", function(){
	console.log("list animmation", Object.keys(character._meshBody.geometry.animations))
});

// We setup the user camera controls.
// It will determine how the user camera will move in the world scene.
// We use ```tQuery.MD2Character.CameraControls``` plugin made specially
// for this case. With it, the camera will follow the MD2 character looking
// at it from above.
world.setCameraControls(new tQuery.MD2Character.CameraControls(character));

// ## Change the Skin by Keyboard

// hook a function in the rendering loop. This function will be executed everytime
// the scene is rendered. Within this function, we will use ```tQuery.Keyboard```
// plugins to test the keyboard. if the key ```s``` is pressed, then use ```character.setSkin()```
// to change the skin of the character
world.loop().hook(function(){
	var keyboard	= tQuery.keyboard();	// get keyboard instance
	if( keyboard.pressed("s") ){		// if the key 's' is pressed, change the skin
		character.setSkin(Math.floor(Math.random()*5));
	}
});
