# browser-video-options
![logo image](https://i.imgur.com/CxT2VtA.png)

## About
 + Customize in-browser audio/video playback. View on [Greasyfork](https://greasyfork.org/en/scripts/34563-browser-video-options).
 
 ## To Do
 + Make FF/GM compatible (source of `<video>` is invisible?)

## Works with
+ Local files (file:///example/video.webm)
+ Hosted files (example.com/video.webm)
+ Common filetypes (3g2, 3gp, 3gpp, aac, avi, flac, flv, m4a, m4p, m4v, mka, mkv, mov, mp2, mp3, mp4, mpe, mpeg, mpg, mpv, mts, oga, ogg, ogm, ogv, opus, wav, weba, webm, wmv)
  + Leave feedback if any are missing

## Settings
    ╔══════════════════╦═══════════════════════════════════╦════════════╗
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
    ╚══════════════════╩═══════════════════════════════════╩════════════╝
