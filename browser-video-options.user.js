// ==UserScript==
// @name           Browser Video Options
// @description    Customize in-browser audio/video playback
// @author         Karl Piper
// @homepage       https://greasyfork.org/en/users/8252
// @namespace      https://greasyfork.org/en/users/8252
// @include        /^(https?|file)[\.:]\/{2,3}.*\.(3g2|3gp|3gpp|aac|avi|flac|flv|m4a|m4p|m4v|mka|mkv|mov|mp2|mp3|mp4|mpe|mpeg|mpg|mpv|mts|oga|ogg|ogm|ogv|opus|wav|weba|webm|wmv)$/
// @grant          none
// @require        https://code.jquery.com/jquery-3.4.0.min.js
// @icon           https://i.imgur.com/CxT2VtA.png
// @version        4.0
// ==/UserScript==

/*═════════════════╦═══════════════════════════════════╦════════════╗
║      Options     ║            Description            ║   Value    ║
╠══════════════════╬═══════════════════════════════════╬════════════╣
║ loop             ║ Replay after ending               ║ true/false ║
║ autoplay         ║ Automatically start playing       ║ true/false ║
║ muted            ║ Mute sound (overrides volume)     ║ true/false ║
║ controls         ║ Show video controls bar           ║ true/false ║
║ noPip            ║ Hide picture-in-picture control   ║ true/false ║
║ noDownload       ║ Hide download control control     ║ true/false ║
║ noRemotePlayback ║ Hide remote playback control      ║ true/false ║
║ noFullscreen     ║ Hide fullscreen control           ║ true/false ║
║ width            ║ Video width, optional             ║ CSS units  ║
║ height           ║ Video height, optional            ║ CSS units  ║
║ poster           ║ Placeholder image, optional       ║ URL        ║
║ volume           ║ Default volume level              ║ 0.0 - 1.0  ║
╠══════════════════╬═══════════════════════════════════╬════════════╣
║ audioLoop        ║ Replay after ending               ║ true/false ║
║ audioAutoplay    ║ Automatically start playing       ║ true/false ║
║ audioMuted       ║ Mute sound (overrides volume)     ║ true/false ║
║ audioControls    ║ Show audio controls bar           ║ true/false ║
║ audioVolume      ║ Default volume level              ║ 0.0 - 1.0  ║
╠══════════════════╬═══════════════════════════════════╬════════════╣
║ showSettings     ║ Logs all settings, for debugging  ║ true/false ║
║ customCss        ║ Styles applied to page, optional  ║ CSS        ║
╚══════════════════╩═══════════════════════════════════╩═══════════*/
//video files
var loop = true;
var autoplay = true;
var muted = false;
var controls = true;
var noPip = false;
var noDownload = true;
var noRemotePlayback = true;
var noFullscreen = false;
var width = '100%';
var height = 'auto';
var poster = '';
var volume = '0.5';
//audio files
var audioLoop = true;
var audioAutoplay = true;
var audioMuted = false;
var audioControls = true;
var audioVolume = '1.0';
//other
var showSettings = true;
var customCss = ``;
/*═════════════════════════════════════════════════════════════════*/

/*!
 * Keyby v0.0.1
 * Copyright (c) 2016 Petros G. Sideris
 * Licensed under the MIT license
 */
(function(root, factory) {
	var define;
	if (typeof define === 'function' && define.amd)	define([], factory);
	else if (typeof exports === 'object') module.exports = factory();
	else root.keyby = factory();
} (this, function() {
	var self = this;
	this.map = {
		8: 'backspace',
		9: 'tab',
		13: 'enter',
		16: 'shift',
		17: 'ctrl',
		18: 'alt',
		20: 'capslock',
		27: 'esc',
		32: 'space',
		33: 'pageup',
		34: 'pagedown',
		35: 'end',
		36: 'home',
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		45: 'ins',
		46: 'del',

		48: '0',
		49: '1',
		50: '2',
		51: '3',
		52: '4',
		53: '5',
		54: '6',
		55: '7',
		56: '8',
		57: '9',

		65: 'a',
		66: 'b',
		67: 'c',
		68: 'd',
		69: 'e',
		70: 'f',
		71: 'g',
		72: 'h',
		73: 'i',
		74: 'j',
		75: 'k',
		76: 'l',
		77: 'm',
		78: 'n',
		79: 'o',
		80: 'p',
		81: 'q',
		82: 'r',
		83: 's',
		84: 't',
		85: 'u',
		86: 'v',
		87: 'w',
		88: 'x',
		89: 'y',
		90: 'z',

		106: '*',
		107: '+',
		109: '-',
		110: '.',
		111 : '/',
		186: ';',
		187: '=',
		188: ',',
		189: '-',
		190: '.',
		191: '/',
		192: '`',
		219: '[',
		220: '\\',
		221: ']',
		222: '\''
	};
	var keyby = {version: '0.0.1'};
	var keycall = {};
	keyby.on = function(key, callback){
		key += '';
		key = key.toLowerCase();
		keycall[key] = callback;
		return this;
	};
	window.addEventListener('keyup', function(e){
		e.preventDefault();
		for(var key in keycall)
			if(key == self.map[e.which])
				keycall[key]()
	});
	return keyby;
}));
/*!
 * screenfull
 * v5.0.0 - 2019-09-09
 * (c) Sindre Sorhus; MIT License
 */
!function(){"use strict";var u="undefined"!=typeof window&&void 0!==window.document?window.document:{},e="undefined"!=typeof module&&module.exports,t=function(){for(var e,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],l=0,r=n.length,t={};l<r;l++)if((e=n[l])&&e[1]in u){for(l=0;l<e.length;l++)t[n[0][l]]=e[l];return t}return!1}(),r={change:t.fullscreenchange,error:t.fullscreenerror},n={request:function(r){return new Promise(function(e,n){var l=function(){this.off("change",l),e()}.bind(this);this.on("change",l),r=r||u.documentElement,Promise.resolve(r[t.requestFullscreen]()).catch(n)}.bind(this))},exit:function(){return new Promise(function(e,n){if(this.isFullscreen){var l=function(){this.off("change",l),e()}.bind(this);this.on("change",l),Promise.resolve(u[t.exitFullscreen]()).catch(n)}else e()}.bind(this))},toggle:function(e){return this.isFullscreen?this.exit():this.request(e)},onchange:function(e){this.on("change",e)},onerror:function(e){this.on("error",e)},on:function(e,n){var l=r[e];l&&u.addEventListener(l,n,!1)},off:function(e,n){var l=r[e];l&&u.removeEventListener(l,n,!1)},raw:t};t?(Object.defineProperties(n,{isFullscreen:{get:function(){return Boolean(u[t.fullscreenElement])}},element:{enumerable:!0,get:function(){return u[t.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){return Boolean(u[t.fullscreenEnabled])}}}),e?module.exports=n:window.screenfull=n):e?module.exports={isEnabled:!1}:window.screenfull={isEnabled:!1}}();

$(function(){
	//global vars
	var vid = $('video');
	var src = vid.find('source');

	//detect MIME type
	if (src.attr('type').split('/')[0] === 'video') {
		videoFile();
	} else if (src.attr('type').split('/')[0] === 'audio') {
		audioFile();
	}

	//start with blank video element
	function replaceVideo() {
		vid.replaceWith(function () {
			return $('<video>').append($(this).contents());
		});
	}

	function audioFile() {
		replaceVideo()
		//handle unset variables
		if (!audioVolume) $('video').prop('volume', 1);
		//apply attributes to <video>
		if (audioMuted) $('video')[0].muted = true;
		$('video').attr({'loop':audioLoop, 'autoplay':audioAutoplay, 'controls':audioControls,}).prop('volume', audioVolume);
	}

	function videoFile() {
		replaceVideo()
		//set controlslist
		var controlslist = '';
		if (noRemotePlayback) {noRemotePlayback = 'noRemotePlayback'} else {noRemotePlayback = null}
		if (noDownload) {noDownload = 'nodownload'} else {noDownload = null}
		if (noFullscreen) {noFullscreen = 'noFullscreen'} else {noFullscreen = null}
		$.each([noDownload, noRemotePlayback, noFullscreen], function(i, v) {
			if (v) {
				if (controlslist.length) controlslist += ' ';
				controlslist += v.toLowerCase();
			}
		});
		//handle unset variables
		if (!customCss) customCss = null;
		if (!width) width = null;
		if (!height) height = null;
		if (!poster) poster = null;
		if (!controlslist) controlslist = null;
		if (noPip) var disablepictureinpicture = true;
		//apply attributes to <video>
		if (muted) $('video')[0].muted = true;
		$('video').attr({disablepictureinpicture, controls, controlslist, autoplay, loop, width, height, poster}).prop('volume', volume);
	}

	function changeVol(n) {
		var currentVol = $('video').prop('volume') * 100;
		var changeVol = ((currentVol+n)/100).toFixed(2);
		if (changeVol > 1 || changeVol < 0) {
			return false;
		} else {
			$('video').prop('volume', changeVol);
		}
	}

	//custom keybindings
	keyby.on('down', function(){
		changeVol(-10);
	}).on('up', function () {
		changeVol(10);
	}).on('m', function() {
		if ($('video')[0].muted === true) {
			$('video')[0].muted = false;
		} else {
			$('video')[0].muted = true;
		}
	}).on('f', function() {
		screenfull.toggle($('video')[0]);
	});

	//show debug info
	if (showSettings) console.log('╔═══════════════════════════════════╗\n║ Browser Video Options: Debug Info ║\n╚═══════════════════════════════════╝\n║ loop'+' = '+loop+'\n║ autoplay'+' = '+autoplay+'\n║ muted'+' = '+muted+'\n║ controls'+' = '+controls+'\n║ noPip'+' = '+noPip+'\n║ noDownload'+' = '+noDownload+'\n║ noRemotePlayback'+' = '+noRemotePlayback+'\n║ noFullscreen'+' = '+noFullscreen+'\n║ width'+' = '+width+'\n║ height'+' = '+height+'\n║ poster'+' = '+poster+'\n║ volume'+' = '+volume+'\n║ audioLoop'+' = '+audioLoop+'\n║ audioAutoplay'+' = '+audioAutoplay+'\n║ audioMuted'+' = '+audioMuted+'\n║ audioControls'+' = '+audioControls+'\n║ audioVolume'+' = '+audioVolume+'\n║ showSettings'+' = '+showSettings+'\n║ customCss'+' = '+customCss)
	//apply custom css
	if (customCss) $('<style id="browser-video-options-css">'+customCss+'</style>').appendTo('head');
});
