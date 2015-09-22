#!/usr/bin/env node

// print process.argv
// process.argv.forEach(function(val, index, array) {
//   console.log(index + ': ' + val);
// });
// 
// console.dir(process)
// process.exit(1)
 // var myArgs     = process.argv;

// var filenames = ['_posts.orig/2011-09-14-lets-make-a-3D-game-map-editor.markdown'];

var filenames	= process.argv.slice(2)
filenames.forEach(function(filename){
	var basename	= require('path').parse(filename).base
	var newFilename	= require('path').join('_posts', basename)
	
	// console.log('Converting ', basename)
	
	var content = require('fs').readFileSync(filename, 'utf8')

	content = processFileImg(content)
	content = processFileQuote(content)

	require('fs').writeFileSync(newFilename, content, 'utf8')

	// console.log('newContent', content)
	
	
	// console.log('filename', filename)
	// console.log('newFilename', newFilename)
	// var content = require('fs').readFileSync(filename, 'utf8')
	
	
})

//////////////////////////////////////////////////////////////////////////////////
//		Comments
//////////////////////////////////////////////////////////////////////////////////

/**
 * convert {% blockquote/codeblock } 
 * 
 * @param {String} content - the content to convert
 * @return {String} - the converted string
 */
function processFileQuote(content){
	var srcLines = content.split(/\n/)
	var dstLines = srcLines.map(function(srcLine){
		var matches = srcLine.match(/^{\% (blockquote|endblockquote|codeblock|endcodeblock)/)
		if( matches === null )	return srcLine

		// console.log('matches', matches)
		return '```'
	})
	return dstLines.join('\n')
}

/**
 * convert {% img } 
 * 
 * @param {String} content - the content to convert
 * @return {String} - the converted string
 */
function processFileImg(content){
	var srcLines = content.split(/\n/)
	var dstLines = srcLines.map(function(srcLine){
		// var matches = srcLine.match(/^{\% img (right|left)\s+([^ ]*) .* \%}/)
		var matches = srcLine.match(/^{\% img\s*(right|left)?\s+([^ ]*).*\%}/)
		// var matches = srcLine.match(/^{\% img/)
		if( matches === null )	return srcLine

		var floatDirection = matches[1]
		var path = matches[2]
		
		// <img src='/data/dat_gui_simple_ui_for_demos/datgui_integrated.png'>
		var dstLine = '<img src=\'' + path + "\'";
		if( floatDirection ){
			dstLine	+= ' style=\'float:'+floatDirection+';\''
		}
		dstLine += ' >'

		// console.log('matches', matches)
		return dstLine
	})
	return dstLines.join('\n')
}
