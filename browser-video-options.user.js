// ==UserScript==
// @name           Browser Video Options
// @description    Customize in-browser audio/video playback
// @author         Karl Piper
// @homepage       https://greasyfork.org/en/users/8252
// @namespace      https://greasyfork.org/en/users/8252
// @include        /^(https?|file)[\.:]\/{2,4}.*\.(3g2|3gp|3gpp|aac|amr|avi|flac|flv|m4a|m4p|m4v|mka|mkv|mov|mp2|mp3|mp4|mpe|mpeg|mpg|mpv|mts|oga|ogg|ogm|ogv|opus|wav|weba|webm|wmv)((\?|&).*)?$/
// @noframes
// @grant          none
// @require        https://code.jquery.com/jquery-3.4.0.min.js
// @require        https://raw.githubusercontent.com/KarlPiper/browser-video-options/master/keyby.js
// @require        https://raw.githubusercontent.com/KarlPiper/browser-video-options/master/screenfull.js
// @icon           https://raw.githubusercontent.com/KarlPiper/browser-video-options/master/icon.png
// @version        7.0
// ==/UserScript==

//don't forget to allow your script manager to run in incognito and local files

/*═════════════════╦═══════════════════════════════════╦════════════╗
║      Options     ║            Description            ║   Values   ║
╠══════════════════╬═══════════════════════════════════╬════════════╣
║ loop             ║ Replay after ending               ║ true/false ║
║ autoplay         ║ Automatically start playing       ║ true/false ║
║ muted            ║ Mute sound (overrides volume)     ║ true/false ║
║ controls         ║ Show video controls bar           ║ true/false ║
║ noPip            ║ Hide picture-in-picture control   ║ true/false ║
║ noDownload       ║ Hide download control control     ║ true/false ║
║ noRemotePlayback ║ Hide remote playback control      ║ true/false ║
║ noFullscreen     ║ Hide fullscreen control           ║ true/false ║
║ width            ║ Video width; optional             ║ CSS units  ║
║ height           ║ Video height; optional            ║ CSS units  ║
║ poster           ║ Placeholder image; optional       ║ URL        ║
║ volume           ║ Default volume level              ║ 0.0 - 1.0  ║
║ speed            ║ Default volume level              ║ 0.0 - 1.0  ║
╠══════════════════╬═══════════════════════════════════╬════════════╣
║ audioLoop        ║ Replay after ending               ║ true/false ║
║ audioAutoplay    ║ Automatically start playing       ║ true/false ║
║ audioMuted       ║ Mute sound (overrides volume)     ║ true/false ║
║ audioControls    ║ Show audio controls bar           ║ true/false ║
║ audioVolume      ║ Default volume level              ║ 0.0 - 1.0  ║
╠══════════════════╬═══════════════════════════════════╬════════════╣
║ showSettings     ║ Logs all settings, for debugging  ║ true/false ║
║ customCss        ║ Custom CSS applied; optional      ║ CSS rules  ║
╚══════════════════╩═══════════════════════════════════╩═══════════*/
//video files
var loop = true;
var autoplay = true;
var muted = false;
var controls = true;
var noPip = true;
var noDownload = true;
var noRemotePlayback = true;
var noFullscreen = true;
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
var showSettings = false;
var customCss = ``;
/*═════════════════════════════════════════════════════════════════*/

$(function(){
	//global vars
	var vid = $('video');
	var src = vid.find('source');

	//detect MIME type
	try {
		if (src.attr('type').split('/')[0] === 'video') {
			videoFile();
		} else if (src.attr('type').split('/')[0] === 'audio') {
			audioFile();
		}
	}
	catch(err) {
		console.log('Couldn\'t detect MIME type!');
		console.log(err);
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
		if (!audioVolume) vid.prop('volume', 1);
		//apply attributes to <video>
		if (audioMuted) $('video')[0].muted = true;
		$('video').attr({'loop':audioLoop, 'autoplay':audioAutoplay, 'controls':audioControls,}).prop('volume', audioVolume);
	}

	function videoFile() {
	var videoDimensions = 'width:'+width+'; height:'+height;
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
		//apply attributes to video
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

	function changeSpeed(n) {
		var currentRate = $('video').prop('playbackRate');
		var changeRate = currentRate + n;
		if (changeRate <= 0) {
			return false;
		} else {
			$('video').prop('playbackRate', changeRate);
		}
	}

	//custom keybindings
	keyby.on('down', function() {//volume
		changeVol(-10);
	}).on('up', function() {
		changeVol(10);
	}).on('[', function() {//playback rate
		changeSpeed(-.25);
	}).on(']', function() {
		changeSpeed(.25);
	}).on('=', function() {
		$('video').prop('playbackRate', 1.0);
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
	if (customCss) $('<style id="browser-video-options-css">'+customCss+'</style>').appendTo('body');
});