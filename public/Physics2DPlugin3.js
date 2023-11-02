!(function (n, e) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? e(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], e)
    : e(((n = n || self).window = n.window || {}))
})(this, e => {
  'use strict'

  function j() {
    return r || (typeof window !== 'undefined' && (r = window.gsap) && r.registerPlugin && r)
  }

  function k(n) {
    return Math.round(1e4 * n) / 1e4
  }

  function n() {
    return String.fromCharCode.apply(null, arguments)
  }

  function s(n) {
    ;(r = n || j()),
      d ||
        ((a = r.utils.getUnit),
        (u = r.core.getStyleSaver),
        (y = r.core.reverting || function () {}),
        (d = 1))
  }

  function t(n, e, t, i, s) {
    const o = n._gsap
    const r = o.get(n, e)
    ;(this.p = e),
      (this.set = o.set(n, e)),
      (this.s = this.val = Number.parseFloat(r)),
      (this.u = a(r) || 0),
      (this.vel = t || 0),
      (this.v = this.vel / s),
      i || i === 0 ? ((this.acc = i), (this.a = this.acc / (s * s))) : (this.acc = this.a = 0)
  }

  let r
  let d
  let a
  let u
  let y
  const v = Math.PI / 180
  const c = 'Physics2DPlugin'
  const l = n(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109)
  const p = n(103, 115, 97, 112, 46, 99, 111, 109)
  const f = /^(?:\d{1,3}\.){3}\d{1,3}:?\d*$/
  const i =
    ((function (e) {
      const t = typeof window !== 'undefined'
      const i =
        (t ? window.location.href : '').indexOf(n(102, 105, 108, 101, 58, 47, 47)) === 0 ||
        e.includes(n(108, 111, 99, 97, 108, 104, 111, 115, 116)) ||
        f.test(e)
      const s = [
        l,
        p,
        n(99, 111, 100, 101, 112, 101, 110, 46, 105, 111),
        n(99, 111, 100, 101, 112, 101, 110, 46, 112, 108, 117, 109, 98, 105, 110, 103),
        n(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118),
        n(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112),
        n(99, 111, 100, 101, 112, 101, 110, 46, 119, 101, 98, 115, 105, 116, 101),
        n(112, 101, 110, 115, 46, 99, 108, 111, 117, 100),
        n(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109),
        n(99, 100, 112, 110, 46, 105, 111),
        n(112, 101, 110, 115, 46, 105, 111),
        n(103, 97, 110, 110, 111, 110, 46, 116, 118),
        n(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116),
        n(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116),
        n(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107),
        n(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116),
        n(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109),
        n(112, 108, 110, 107, 114, 46, 99, 111),
        n(104, 111, 116, 106, 97, 114, 46, 99, 111, 109),
        n(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109),
        n(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103),
        n(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111),
        n(99, 115, 98, 46, 97, 112, 112),
        n(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109),
        n(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 105, 111),
        n(99, 111, 100, 105, 101, 114, 46, 105, 111),
        n(109, 111, 116, 105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109),
        n(115, 116, 97, 99, 107, 111, 118, 101, 114, 102, 108, 111, 119, 46, 99, 111, 109),
        n(115, 116, 97, 99, 107, 101, 120, 99, 104, 97, 110, 103, 101, 46, 99, 111, 109),
        n(115, 116, 117, 100, 105, 111, 102, 114, 101, 105, 103, 104, 116, 46, 99, 111, 109),
        n(119, 101, 98, 99, 111, 110, 116, 97, 105, 110, 101, 114, 46, 105, 111),
        n(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116),
        'comrade-tea.github.io',
        'responsive-tictactoe.netlify.app',
      ]
      let o = s.length

      console.log('----', s)
      for (
        setTimeout(function checkWarn() {
          if (t) {
            if (document.readyState === 'loading' || document.readyState === 'interactive') {
              document.addEventListener('readystatechange', checkWarn)
            } else {
              document.removeEventListener('readystatechange', checkWarn)
              const e = typeof r === 'object' ? r : t && window.gsap
              t &&
                window.console &&
                !window._gsapWarned &&
                typeof e === 'object' &&
                !1 !== e.config().trialWarn &&
                (console.log(
                  n(37, 99, 87, 97, 114, 110, 105, 110, 103),
                  n(
                    102,
                    111,
                    110,
                    116,
                    45,
                    115,
                    105,
                    122,
                    101,
                    58,
                    51,
                    48,
                    112,
                    120,
                    59,
                    99,
                    111,
                    108,
                    111,
                    114,
                    58,
                    114,
                    101,
                    100,
                    59
                  )
                ),
                console.log(
                  n(
                    65,
                    32,
                    116,
                    114,
                    105,
                    97,
                    108,
                    32,
                    118,
                    101,
                    114,
                    115,
                    105,
                    111,
                    110,
                    32,
                    111,
                    102,
                    32
                  ) +
                    c +
                    n(
                      32,
                      105,
                      115,
                      32,
                      108,
                      111,
                      97,
                      100,
                      101,
                      100,
                      32,
                      116,
                      104,
                      97,
                      116,
                      32,
                      111,
                      110,
                      108,
                      121,
                      32,
                      119,
                      111,
                      114,
                      107,
                      115,
                      32,
                      108,
                      111,
                      99,
                      97,
                      108,
                      108,
                      121,
                      32,
                      97,
                      110,
                      100,
                      32,
                      111,
                      110,
                      32,
                      100,
                      111,
                      109,
                      97,
                      105,
                      110,
                      115,
                      32,
                      108,
                      105,
                      107,
                      101,
                      32,
                      99,
                      111,
                      100,
                      101,
                      112,
                      101,
                      110,
                      46,
                      105,
                      111,
                      32,
                      97,
                      110,
                      100,
                      32,
                      99,
                      111,
                      100,
                      101,
                      115,
                      97,
                      110,
                      100,
                      98,
                      111,
                      120,
                      46,
                      105,
                      111,
                      46,
                      32,
                      42,
                      42,
                      42,
                      32,
                      68,
                      79,
                      32,
                      78,
                      79,
                      84,
                      32,
                      68,
                      69,
                      80,
                      76,
                      79,
                      89,
                      32,
                      84,
                      72,
                      73,
                      83,
                      32,
                      70,
                      73,
                      76,
                      69,
                      32,
                      42,
                      42,
                      42,
                      32,
                      76,
                      111,
                      97,
                      100,
                      105,
                      110,
                      103,
                      32,
                      105,
                      116,
                      32,
                      111,
                      110,
                      32,
                      97,
                      110,
                      32,
                      117,
                      110,
                      97,
                      117,
                      116,
                      104,
                      111,
                      114,
                      105,
                      122,
                      101,
                      100,
                      32,
                      115,
                      105,
                      116,
                      101,
                      32,
                      118,
                      105,
                      111,
                      108,
                      97,
                      116,
                      101,
                      115,
                      32,
                      116,
                      104,
                      101,
                      32,
                      108,
                      105,
                      99,
                      101,
                      110,
                      115,
                      101,
                      32,
                      97,
                      110,
                      100,
                      32,
                      119,
                      105,
                      108,
                      108,
                      32,
                      99,
                      97,
                      117,
                      115,
                      101,
                      32,
                      97,
                      32,
                      114,
                      101,
                      100,
                      105,
                      114,
                      101,
                      99,
                      116,
                      46,
                      32,
                      80,
                      108,
                      101,
                      97,
                      115,
                      101,
                      32,
                      106,
                      111,
                      105,
                      110,
                      32,
                      67,
                      108,
                      117,
                      98,
                      32,
                      71,
                      114,
                      101,
                      101,
                      110,
                      83,
                      111,
                      99,
                      107,
                      32,
                      116,
                      111,
                      32,
                      103,
                      101,
                      116,
                      32,
                      102,
                      117,
                      108,
                      108,
                      32,
                      97,
                      99,
                      99,
                      101,
                      115,
                      115,
                      32,
                      116,
                      111,
                      32,
                      116,
                      104,
                      101,
                      32,
                      98,
                      111,
                      110,
                      117,
                      115,
                      32,
                      112,
                      108,
                      117,
                      103,
                      105,
                      110,
                      115,
                      32,
                      116,
                      104,
                      97,
                      116,
                      32,
                      98,
                      111,
                      111,
                      115,
                      116,
                      32,
                      121,
                      111,
                      117,
                      114,
                      32,
                      97,
                      110,
                      105,
                      109,
                      97,
                      116,
                      105,
                      111,
                      110,
                      32,
                      115,
                      117,
                      112,
                      101,
                      114,
                      112,
                      111,
                      119,
                      101,
                      114,
                      115,
                      46,
                      32,
                      68,
                      105,
                      115,
                      97,
                      98,
                      108,
                      101,
                      32,
                      116,
                      104,
                      105,
                      115,
                      32,
                      119,
                      97,
                      114,
                      110,
                      105,
                      110,
                      103,
                      32,
                      119,
                      105,
                      116,
                      104,
                      32,
                      103,
                      115,
                      97,
                      112,
                      46,
                      99,
                      111,
                      110,
                      102,
                      105,
                      103,
                      40,
                      123,
                      116,
                      114,
                      105,
                      97,
                      108,
                      87,
                      97,
                      114,
                      110,
                      58,
                      32,
                      102,
                      97,
                      108,
                      115,
                      101,
                      125,
                      41,
                      59
                    )
                ),
                console.log(
                  n(
                    37,
                    99,
                    71,
                    101,
                    116,
                    32,
                    117,
                    110,
                    114,
                    101,
                    115,
                    116,
                    114,
                    105,
                    99,
                    116,
                    101,
                    100,
                    32,
                    102,
                    105,
                    108,
                    101,
                    115,
                    32,
                    97,
                    116,
                    32,
                    104,
                    116,
                    116,
                    112,
                    115,
                    58,
                    47,
                    47,
                    103,
                    114,
                    101,
                    101,
                    110,
                    115,
                    111,
                    99,
                    107,
                    46,
                    99,
                    111,
                    109,
                    47,
                    99,
                    108,
                    117,
                    98
                  ),
                  n(
                    102,
                    111,
                    110,
                    116,
                    45,
                    115,
                    105,
                    122,
                    101,
                    58,
                    49,
                    54,
                    112,
                    120,
                    59,
                    99,
                    111,
                    108,
                    111,
                    114,
                    58,
                    35,
                    52,
                    101,
                    57,
                    56,
                    49,
                    53
                  )
                ),
                (window._gsapWarned = 1))
            }
          }
        }, 50);
        --o > -1;

      ) {
        if (e.includes(s[o])) {
          return
        }
      }
      i ||
        setTimeout(() => {
          t &&
            (window.location.href = `${
              n(104, 116, 116, 112, 115, 58, 47, 47) +
              l +
              n(
                47,
                114,
                101,
                113,
                117,
                105,
                114,
                101,
                115,
                45,
                109,
                101,
                109,
                98,
                101,
                114,
                115,
                104,
                105,
                112,
                47
              )
            }?plugin=${c}&source=trial`)
        }, 4e3)
    })(typeof window === 'undefined' ? '' : window.location.host),
    {
      version: '3.12.3',
      name: 'physics2D',
      register: s,
      init: function init(n, e, i) {
        d || s()
        const o = this
        let r = Number(e.angle) || 0
        const a = Number(e.velocity) || 0
        let c = Number(e.acceleration) || 0
        const l = e.xProp || 'x'
        const p = e.yProp || 'y'
        let f = e.accelerationAngle || e.accelerationAngle === 0 ? Number(e.accelerationAngle) : r
        ;(o.styles = u && u(n, e.xProp && e.xProp !== 'x' ? `${e.xProp},${e.yProp}` : 'transform')),
          (o.target = n),
          (o.tween = i),
          (o.step = 0),
          (o.sps = 30),
          e.gravity && ((c = Number(e.gravity)), (f = 90)),
          (r *= v),
          (f *= v),
          (o.fr = 1 - (Number(e.friction) || 0)),
          o._props.push(l, p),
          (o.xp = new t(n, l, Math.cos(r) * a, Math.cos(f) * c, o.sps)),
          (o.yp = new t(n, p, Math.sin(r) * a, Math.sin(f) * c, o.sps)),
          (o.skipX = o.skipY = 0)
      },
      render: function render(n, e) {
        let t
        let i
        let s
        let o
        let r
        let a
        const c = e.xp
        const l = e.yp
        const p = e.tween
        const f = e.target
        const d = e.step
        const u = e.sps
        const v = e.fr
        const h = e.skipX
        const g = e.skipY
        let w = p._from ? p._dur - p._time : p._time
        if (p._time || !y()) {
          if (v === 1) {
            ;(s = w * w * 0.5), (t = c.s + c.vel * w + c.acc * s), (i = l.s + l.vel * w + l.acc * s)
          } else {
            for (
              o = a = (0 | (w *= u)) - d,
                a < 0 &&
                  ((c.v = c.vel / u),
                  (l.v = l.vel / u),
                  (c.val = c.s),
                  (l.val = l.s),
                  (o = a = (e.step = 0) | w)),
                r = (w % 1) * v;
              a--;

            ) {
              ;(c.v += c.a), (l.v += l.a), (c.v *= v), (l.v *= v), (c.val += c.v), (l.val += l.v)
            }
            ;(t = c.val + c.v * r), (i = l.val + l.v * r), (e.step += o)
          }
          h || c.set(f, c.p, k(t) + c.u), g || l.set(f, l.p, k(i) + l.u)
        } else {
          e.styles.revert()
        }
      },
      kill: function kill(n) {
        this.xp.p === n && (this.skipX = 1), this.yp.p === n && (this.skipY = 1)
      },
    })
  j() && r.registerPlugin(i), (e.Physics2DPlugin = i), (e.default = i)
  if (typeof window === 'undefined' || window !== e) {
    Object.defineProperty(e, '__esModule', { value: !0 })
  } else {
    delete e.default
  }
})
