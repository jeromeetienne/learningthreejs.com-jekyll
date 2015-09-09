requirejs.config({
	map	: {
		"*"	: {
			'tquery.playerinput'	: 'plugins/playerinput/tquery.playerinput.keyboard',
		}
	},
	shim	: {
		'plugins/playerinput/tquery.playerinput.keyboard'	: [
			'tquery.keyboard',
			'plugins/playerinput/tquery.playerinput',
			'plugins/playerinput/tquery.playerinput.viewer',
			// not really needed, just to chain the load
			'plugins/playerinput/tquery.playerinput.virtualjoystick',
			'plugins/playerinput/tquery.playerinput.deviceorientation',
			'plugins/playerinput/tquery.playerinput.leaphandposition',
		],
		'plugins/playerinput/tquery.playerinput.virtualjoystick': [
			'tquery.virtualjoystick',
			'plugins/playerinput/tquery.playerinput'
		],
		'plugins/playerinput/tquery.playerinput.deviceorientation': [
			'tquery.deviceorientation',
			'plugins/playerinput/tquery.playerinput'
		],
		'plugins/playerinput/tquery.playerinput.leaphandposition': [
			'tquery.leap',
			'plugins/playerinput/tquery.playerinput'
		]
	}
});
