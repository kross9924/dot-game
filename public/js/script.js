!(function (e) {
	var t = {};
	function i(r) {
		if (t[r]) return t[r].exports;
		var n = (t[r] = { i: r, l: !1, exports: {} });
		return e[r].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
	}
	(i.m = e),
		(i.c = t),
		(i.d = function (e, t, r) {
			i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
		}),
		(i.r = function (e) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(e, "__esModule", { value: !0 });
		}),
		(i.t = function (e, t) {
			if ((1 & t && (e = i(e)), 8 & t)) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var r = Object.create(null);
			if (
				(i.r(r),
				Object.defineProperty(r, "default", { enumerable: !0, value: e }),
				2 & t && "string" != typeof e)
			)
				for (var n in e)
					i.d(
						r,
						n,
						function (t) {
							return e[t];
						}.bind(null, n)
					);
			return r;
		}),
		(i.n = function (e) {
			var t =
				e && e.__esModule
					? function () {
							return e.default;
					  }
					: function () {
							return e;
					  };
			return i.d(t, "a", t), t;
		}),
		(i.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(i.p = ""),
		i((i.s = 0));
})([
	function (e, t, i) {
		"use strict";
		i.r(t);
		var r = function () {
				return (r =
					Object.assign ||
					function (e) {
						for (var t, i = 1, r = arguments.length; i < r; i++)
							for (var n in (t = arguments[i]))
								Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
						return e;
					}).apply(this, arguments);
			},
			n = function () {
				for (var e = 0, t = 0, i = arguments.length; t < i; t++)
					e += arguments[t].length;
				var r = Array(e),
					n = 0;
				for (t = 0; t < i; t++)
					for (var s = arguments[t], h = 0, o = s.length; h < o; h++, n++)
						r[n] = s[h];
				return r;
			},
			s = "p",
			h = "c",
			o = function (e) {
				return e.reduce(function (t, i, r) {
					var o = i.reduce(function (t, i, o) {
						return n(
							t,
							(function (e, t, i) {
								var r = e[i][t];
								return [s, h, "trbl"].includes(r)
									? []
									: ["t", "r", "b", "l"]
											.filter(function (e) {
												return !r.includes(e);
											})
											.map(function (e) {
												return { x: t, y: i, move: e };
											});
							})(e, o, r)
						);
					}, []);
					return n(t, o);
				}, []);
			},
			l = function (e, t, i) {
				var r = e.map(function (e) {
					return n(e);
				});
				switch (((r[t.y][t.x] += t.move), t.move)) {
					case "t":
						0 !== t.y && (r[t.y - 1][t.x] += "b");
						break;
					case "r":
						t.x !== e[t.y].length - 1 && (r[t.y][t.x + 1] += "l");
						break;
					case "b":
						t.y !== e.length - 1 && (r[t.y + 1][t.x] += "t");
						break;
					case "l":
						0 !== t.x && (r[t.y][t.x - 1] += "r");
				}
				var s = !1;
				return (
					(r = r.map(function (e) {
						return e.map(function (e) {
							return 4 === e.length && (s = !0), 4 === e.length ? i : e;
						});
					})),
					{ markedSquare: s, newState: r }
				);
			},
			u = function (e) {
				return e.reduce(function (e, t) {
					return (
						e +
						t.reduce(function (e, t) {
							return (
								e +
								(function (e) {
									return e === h ? 1 : e === s ? -1 : 0;
								})(t)
							);
						}, 0)
					);
				}, 0);
			},
			a = function (e) {
				return 0 === o(e).length;
			},
			c = function (e, t, i) {
				if (0 === t.length) return [];
				var r = (function (e, t) {
					return t.filter(function (t) {
						return 3 === e[t.y][t.x].length;
					});
				})(e, t);
				return r.length > 0
					? r
					: (function (e, t, i) {
							if (i > 70) {
								var r = t.filter(function (t) {
									return e[t.y][t.x].length < 2;
								});
								return r.length > 0 ? [r[0]] : [];
							}
							return [];
					  })(e, t, i);
			},
			d = 0,
			f = 1e3,
			g = function (e, t, i) {
				if (((d += 1), t < f && (f = t), 0 === t || a(e.currentState)))
					return u(e.currentState);
				var r = i ? [-1e6, Math.max] : [1e6, Math.min],
					n = r[0],
					v = r[1],
					p = !i;
				return e.moves.reduce(function (r, n) {
					var u = i ? h : s,
						a = l(e.currentState, n, u),
						d = a.newState,
						f = a.markedSquare,
						m = o(d),
						b = c(d, m, t);
					b.length > 0 && (m = b), f && (p = i);
					var w = g({ currentState: d, moves: m }, t - 1, p);
					return v(r, w);
				}, n);
			};
		console.log("min Depth", f);
		var v = { x: 0, y: 0, move: "l", score: -1e6 },
			p = function () {
				for (var e = 0, t = 0, i = arguments.length; t < i; t++)
					e += arguments[t].length;
				var r = Array(e),
					n = 0;
				for (t = 0; t < i; t++)
					for (var s = arguments[t], h = 0, o = s.length; h < o; h++, n++)
						r[n] = s[h];
				return r;
			},
			m = 0,
			b = 1,
			w = 2,
			y = 3,
			S = document.getElementById("myCanvas");
		var x,
			k,
			M,
			R,
			T,
			P,
			B,
			L = S.getBoundingClientRect(),
			j = S.getContext("2d");
		function O(e, t) {
			(j.fillStyle = "sienna"),
				j.beginPath(),
				j.arc(e, t, 8.25, 0, 2 * Math.PI),
				j.fill();
		}
		function C(e, t, i, r, n) {
			(j.strokeStyle = n),
				j.beginPath(),
				j.moveTo(e, t),
				j.lineTo(i, r),
				j.stroke();
		}
		function q(e, t, i, r, n) {
			(j.fillStyle = r),
				(j.font = n + "px dejavu sans mono"),
				j.fillText(e, t, i);
		}
		function _(e, t) {
			return e
				? t
					? "lightsteelblue"
					: "royalblue"
				: t
				? "lightpink"
				: "crimson";
		}
		function A(e) {
			return 99 * (e + 1);
		}
		function F(e) {
			return 154 + 99 * e;
		}
		function D(e, t) {
			var i = [],
				r = M[e][t];
			return (
				r.sideLeft.selected ||
					((0 == t || M[e][t - 1].numSelected < 2) && i.push(b)),
				r.sideRight.selected ||
					((t == M[0].length - 1 || M[e][t + 1].numSelected < 2) && i.push(w)),
				r.sideTop.selected ||
					((0 == e || M[e - 1][t].numSelected < 2) && i.push(y)),
				r.sideBot.selected ||
					((e == M.length - 1 || M[e + 1][t].numSelected < 2) && i.push(m)),
				i
			);
		}
		function E(e, t) {
			for (var i = 0, r = M; i < r.length; i++)
				for (var n = 0, s = (c = r[i]); n < s.length; n++) {
					s[n].highlight = null;
				}
			var h = M.length,
				o = M[0].length;
			x = [];
			e: for (var l = 0; l < h; l++)
				for (var u = 0; u < o; u++)
					if (M[l][u].contains(e, t)) {
						var a = M[l][u].highlightSide(e, t);
						null != a && x.push({ row: l, col: u });
						var c = l,
							d = u,
							f = void 0,
							g = !0;
						a == b && u > 0
							? ((d = u - 1), (f = w))
							: a == w && u < o - 1
							? ((d = u + 1), (f = b))
							: a == y && l > 0
							? ((c = l - 1), (f = m))
							: a == m && l < h - 1
							? ((c = l + 1), (f = y))
							: (g = !1),
							g && ((M[c][d].highlight = f), x.push({ row: c, col: d }));
						break e;
					}
		}
		function I() {
			(x = []), (k = Math.random() >= 0.5), (R = 0), (T = 0), (B = 0), (M = []);
			for (var e = 0; e < 3; e++) {
				M[e] = [];
				for (var t = 0; t < 3; t++) M[e][t] = new N(A(t), F(e), 99, 99);
			}
		}
		function W() {
			if (null != x && 0 != x.length) {
				for (var e = !1, t = 0, i = x; t < i.length; t++) {
					var r = i[t];
					M[r.row][r.col].selectSide() && (e = !0);
				}
				(x = []), e ? T + R == 9 && (B = Math.ceil(60)) : (k = !k);
			}
		}
		function N(e, t, i, r) {
			(this.w = i),
				(this.h = r),
				(this.bot = t + r),
				(this.left = e),
				(this.right = e + i),
				(this.top = t),
				(this.highlight = null),
				(this.numSelected = 0),
				(this.owner = null),
				(this.sideBot = { owner: null, selected: !1 }),
				(this.sideLeft = { owner: null, selected: !1 }),
				(this.sideRight = { owner: null, selected: !1 }),
				(this.sideTop = { owner: null, selected: !1 }),
				(this.contains = function (e, t) {
					return (
						e >= this.left && e < this.right && t >= this.top && t < this.bot
					);
				}),
				(this.drawFill = function () {
					var e, t;
					null != this.owner &&
						((j.fillStyle = _(this.owner, !0)),
						j.fillRect(
							this.left + 8.25,
							this.top + 8.25,
							this.w - 16.5,
							this.h - 16.5
						),
						q(
							((e = this.owner),
							(t = !0),
							e ? (t ? "Play" : "Player") : t ? "Comp" : "Computer"),
							this.left + this.w / 2,
							this.top + this.h / 2,
							_(this.owner, !1),
							33
						));
				}),
				(this.drawSide = function (e, t) {
					switch (e) {
						case m:
							C(this.left, this.bot, this.right, this.bot, t);
							break;
						case b:
							C(this.left, this.top, this.left, this.bot, t);
							break;
						case w:
							C(this.right, this.top, this.right, this.bot, t);
							break;
						case y:
							C(this.left, this.top, this.right, this.top, t);
					}
				}),
				(this.drawSides = function () {
					null != this.highlight && this.drawSide(this.highlight, _(k, !0)),
						this.sideBot.selected &&
							this.drawSide(m, _(this.sideBot.owner, !1)),
						this.sideLeft.selected &&
							this.drawSide(b, _(this.sideLeft.owner, !1)),
						this.sideRight.selected &&
							this.drawSide(w, _(this.sideRight.owner, !1)),
						this.sideTop.selected &&
							this.drawSide(y, _(this.sideTop.owner, !1));
				}),
				(this.getFreeSideCoords = function (e) {
					var t = { x: this.left + this.w / 2, y: this.bot - 1 },
						i = { x: this.left, y: this.top + this.h / 2 },
						r = { x: this.right - 1, y: this.top + this.h / 2 },
						n = { x: this.left + this.w / 2, y: this.top },
						s = null;
					switch (e) {
						case m:
							s = t;
							break;
						case b:
							s = i;
							break;
						case w:
							s = r;
							break;
						case y:
							s = n;
					}
					if (null != s) return s;
					var h = [];
					return (
						this.sideBot.selected || h.push(t),
						this.sideLeft.selected || h.push(i),
						this.sideRight.selected || h.push(r),
						this.sideTop.selected || h.push(n),
						h[Math.floor(Math.random() * h.length)]
					);
				}),
				(this.highlightSide = function (e, t) {
					var i = this.bot - t,
						r = e - this.left,
						n = this.right - e,
						s = t - this.top,
						h = Math.min(i, r, n, s);
					return (
						h != i || this.sideBot.selected
							? h != r || this.sideLeft.selected
								? h != n || this.sideRight.selected
									? h != s || this.sideTop.selected || (this.highlight = y)
									: (this.highlight = w)
								: (this.highlight = b)
							: (this.highlight = m),
						this.highlight
					);
				}),
				(this.selectSide = function () {
					if (null != this.highlight) {
						switch (this.highlight) {
							case m:
								(this.sideBot.owner = k), (this.sideBot.selected = !0);
								break;
							case b:
								(this.sideLeft.owner = k), (this.sideLeft.selected = !0);
								break;
							case w:
								(this.sideRight.owner = k), (this.sideRight.selected = !0);
								break;
							case y:
								(this.sideTop.owner = k), (this.sideTop.selected = !0);
						}
						return (
							(this.highlight = null),
							this.numSelected++,
							4 == this.numSelected && ((this.owner = k), k ? T++ : R++, !0)
						);
					}
				});
		}
		(j.lineWidth = 8.25),
			(j.textAlign = "center"),
			(j.textBaseline = "middle"),
			I(),
			S.addEventListener("mousemove", function (e) {
				if (!k || B > 0) return;
				var t = e.clientX - L.left,
					i = e.clientY - L.top;
				E(t, i);
			}),
			S.addEventListener("click", function (e) {
				if (!k || B > 0) return;
				W();
			}),
			setInterval(function () {
				(j.fillStyle = "cornsilk"),
					(j.strokeStyle = "wheat"),
					j.fillRect(0, 0, 495, 550),
					j.strokeRect(4.125, 4.125, 486.75, 541.75),
					(function () {
						for (var e = 0, t = M; e < t.length; e++)
							for (var i = t[e], r = 0, n = i; r < n.length; r++) {
								var s = n[r];
								s.drawSides(), s.drawFill();
							}
					})(),
					(function () {
						for (var e = 0; e < 4; e++)
							for (var t = 0; t < 4; t++) O(A(t), F(e));
					})(),
					(function () {
						var e = k ? "lightpink" : "crimson",
							t = k ? "royalblue" : "lightsteelblue";
						if (
							(q("Player", 123.75, 38.5, t, 154 / 6),
							q("" + T, 123.75, 154 * 0.6, t, (154 / 6) * 2),
							q("Computer", 371.25, 38.5, e, 154 / 6),
							q("" + R, 371.25, 154 * 0.6, e, (154 / 6) * 2),
							B > 0)
						) {
							if ((B--, R == T)) q("DRAW!", 247.5, 154 * 0.6, "black", 154 / 6);
							else {
								var i = T > R,
									r = i ? "royalblue" : "crimson";
								q(i ? "Player" : "Computer", 247.5, 77, r, 154 / 6),
									q("WINS!", 247.5, 107.8, r, 154 / 6);
							}
							0 == B && I();
						}
					})(),
					(function () {
						if (k || B > 0) return;
						if (P > 0) return void (0 == --P && W());
						var e = [];
						(e[0] = []), (e[1] = []), (e[2] = []);
						for (var t = 0; t < M.length; t++)
							for (var i = 0; i < M[0].length; i++)
								switch (M[t][i].numSelected) {
									case 3:
										break;
									case 0:
									case 1:
										var n = D(t, i),
											s = n.length > 0 ? 1 : 2;
										e[s].push({ square: M[t][i], sides: n });
										break;
									case 2:
										e[2].push({ square: M[t][i], sides: [] });
								}
						var h = [];
						for (t = 0; t < M.length; t++) {
							h[t] = [];
							for (i = 0; i < M[0].length; i++) {
								var l = M[t][i],
									u = "";
								l.sideTop.selected && (u += "t"),
									l.sideRight.selected && (u += "r"),
									l.sideBot.selected && (u += "b"),
									l.sideLeft.selected && (u += "l"),
									null !== l.owner && (u = l.owner ? "p" : "c"),
									(h[t] = p(h[t], [u]));
							}
						}
						console.log(h);
						var a,
							c =
								((x = h),
								(R = o(x).map(function (e) {
									var t = g({ currentState: x, moves: [e] }, 100, !0);
									return r(r({}, e), { score: t });
								})),
								console.log("minDepth", f),
								console.log("count", d),
								(d = 0),
								(f = 1e3),
								R.reduce(function (e, t) {
									return e.score > t.score ? e : t;
								}, v)),
							S = { t: y, r: w, b: m, l: b };
						var x, R;
						e[0].push({ square: M[c.y][c.x], sides: [S[c.move]] }),
							console.log(c),
							e[0].length > 0
								? (a = e[0][Math.floor(Math.random() * e[0].length)])
								: e[1].length > 0
								? (a = e[1][Math.floor(Math.random() * e[1].length)])
								: e[2].length > 0 &&
								  (a = e[2][Math.floor(Math.random() * e[2].length)]);
						var T = null;
						a.sides.length > 0 &&
							(T = a.sides[Math.floor(Math.random() * a.sides.length)]);
						var L = a.square.getFreeSideCoords(T);
						E(L.x, L.y), (P = Math.ceil(15));
					})();
			}, 1e3 / 30);
	},
]);
