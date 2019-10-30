/*!
 * screenfull
 * v5.0.0 - 2019-09-09
 * (c) Sindre Sorhus; MIT License
 */
! function () {
  "use strict";
  var u = "undefined" != typeof window && void 0 !== window.document ? window.document : {},
    e = "undefined" != typeof module && module.exports,
    t = function () {
      for (var e, n = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], l = 0, r = n.length, t = {}; l < r; l++)
        if ((e = n[l]) && e[1] in u) {
          for (l = 0; l < e.length; l++) t[n[0][l]] = e[l];
          return t
        } return !1
    }(),
    r = {
      change: t.fullscreenchange,
      error: t.fullscreenerror
    },
    n = {
      request: function (r) {
        return new Promise(function (e, n) {
          var l = function () {
            this.off("change", l), e()
          }.bind(this);
          this.on("change", l), r = r || u.documentElement, Promise.resolve(r[t.requestFullscreen]()).catch(n)
        }.bind(this))
      },
      exit: function () {
        return new Promise(function (e, n) {
          if (this.isFullscreen) {
            var l = function () {
              this.off("change", l), e()
            }.bind(this);
            this.on("change", l), Promise.resolve(u[t.exitFullscreen]()).catch(n)
          } else e()
        }.bind(this))
      },
      toggle: function (e) {
        return this.isFullscreen ? this.exit() : this.request(e)
      },
      onchange: function (e) {
        this.on("change", e)
      },
      onerror: function (e) {
        this.on("error", e)
      },
      on: function (e, n) {
        var l = r[e];
        l && u.addEventListener(l, n, !1)
      },
      off: function (e, n) {
        var l = r[e];
        l && u.removeEventListener(l, n, !1)
      },
      raw: t
    };
  t ? (Object.defineProperties(n, {
    isFullscreen: {
      get: function () {
        return Boolean(u[t.fullscreenElement])
      }
    },
    element: {
      enumerable: !0,
      get: function () {
        return u[t.fullscreenElement]
      }
    },
    isEnabled: {
      enumerable: !0,
      get: function () {
        return Boolean(u[t.fullscreenEnabled])
      }
    }
  }), e ? module.exports = n : window.screenfull = n) : e ? module.exports = {
    isEnabled: !1
  } : window.screenfull = {
    isEnabled: !1
  }
}();