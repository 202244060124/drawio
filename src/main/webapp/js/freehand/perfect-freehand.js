(() = > {
    "use strict";
    var t = {};
    function e(t, e, n, r = (t) = > t)
    {
        return t * r(0.5 - e * (0.5 - n));
    }
    function n(t, e)
    {
        return [ t[0] + e[0], t[1] + e[1] ];
    }
    function r(t, e)
    {
        return [ t[0] - e[0], t[1] - e[1] ];
    }
    function i(t, e)
    {
        return [ t[0] * e, t[1] * e ];
    }
    function u(t)
    {
        return [ t[1], -t[0] ];
    }
    function o(t, e)
    {
        return t[0] * e[0] + t[1] * e[1];
    }
    function l(t, e)
    {
        return t[0] === e[0] && t[1] === e[1];
    }
    function s(t, e)
    {
        return (function(t) { return t[0] * t[0] + t[1] * t[1]; })(r(t, e));
    }
    function c(t)
    {
        return (function(t, e) { return [ t[0] / e, t[1] / e ]; })(t, (function(t) { return Math.hypot(t[0], t[1]); })(t));
    }
    function h(t, e)
    {
        return Math.hypot(t[1] - e[1], t[0] - e[0]);
    }
    function f(t, e, n)
    {
        let r = Math.sin(n), i = Math.cos(n), u = t[0] - e[0], o = t[1] - e[1], l = u * r + o * i;
        return [ u * i - o * r + e[0], l + e[1] ];
    }
    function p(t, e, u)
    {
        return n(t, i(r(e, t), u));
    }
    function a(t, e, r)
    {
        return n(t, i(e, r));
    }
    t.g = (function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")();
        } catch (t) {
            if ("object" == typeof window)
                return window;
        }
    })();
    var{min : g, PI : v} = Math, d = v + 1e-4;
    function M(t, v = {})
    {
        return (function(t, l = {}) {
            let{
                size : h = 16,
                smoothing : v = 0.5,
                thinning : M = 0.5,
                simulatePressure : m = !0,
                easing : y = (t) = > t,
                start : w = {},
                end : P = {},
                last : F = !1,
            } = l,
            {cap : b = !0, easing : x = (t) = > t * (2 - t)} = w, {cap : L = !0, easing : j = (t) = > --t* t* t + 1} = P;
            if (0 === t.length || h <= 0)
                return [];
            let S,
                k = t[t.length - 1].runningLength,
                z = !1 === w.taper ? 0 : !0 === w.taper ? Math.max(h, k) : w.taper,
                A = !1 === P.taper ? 0 : !0 === P.taper ? Math.max(h, k) : P.taper,
                T = Math.pow(h * v, 2),
                I = [],
                Q = [],
                Z = t.slice(0, 10).reduce((t, e) => {
                    let n = e.pressure;
                    if (m) {
                        let r = g(1, e.distance / h),
                            i = g(1, 1 - r);
                        n = g(1, t + 0.275 * r * (i - t));
                    }
                    return (t + n) / 2;
                }, t[0].pressure),
                q = e(h, M, t[t.length - 1].pressure, y),
                B = t[0].vector,
                C = t[0].point,
                D = C,
                E = C,
                G = D;
            for (let l = 0; l < t.length; l++) {
                let{pressure : c} = t[l], {point : a, vector : v, distance : w, runningLength : P} = t[l];
                if (l < t.length - 1 && k - P < 3)
                    continue;
                if (M) {
                    if (m) {
                        let t = g(1, w / h), e = g(1, 1 - t);
                        c = g(1, Z + 0.275 * t * (e - Z));
                    }
                    q = e(h, M, c, y);
                } else
                    q = h / 2;
                void 0 === S && (S = q);
                let F = P < z ? x(P / z) : 1, b = k - P < A ? j((k - P) / A) : 1;
                if (((q = Math.max(0.01, q * Math.min(F, b))), l === t.length - 1)) {
                    let t = i(u(v), q);
                    I.push(r(a, t)), Q.push(n(a, t));
                    continue;
                }
                let L = t[l + 1].vector, H = o(v, L);
                if (H < 0) {
                    let t = i(u(B), q);
                    for (let e = 1 / 13, i = 0; i <= 1; i += e)
                        (E = f(r(a, t), a, d * i)), I.push(E), (G = f(n(a, t), a, d * -i)), Q.push(G);
                    (C = E), (D = G);
                    continue;
                }
                let J = i(u(p(L, v, H)), q);
                (E = r(a, J)), (l <= 1 || s(C, E) > T) && (I.push(E), (C = E)), (G = n(a, J)),
                    (l <= 1 || s(D, G) > T) && (Q.push(G), (D = G)), (Z = c), (B = v);
            }
            let H = t[0].point.slice(0, 2), J = t.length > 1 ? t[t.length - 1].point.slice(0, 2) : n(t[0].point, [ 1, 1 ]), K = [], N = [];
            if (1 === t.length) {
                if ((!z && !A) || F) {
                    let t = a(H, c(u(r(H, J))), -(S || q)), e = [];
                    for (let n = 1 / 13, r = n; r <= 1; r += n)
                        e.push(f(t, H, 2 * d * r));
                    return e;
                }
            } else {
                if (!(z || (A&& 1 === t.length)))
                    if (b)
                        for (let t = 1 / 13, e = t; e <= 1; e += t) {
                            let t = f(Q[0], H, d * e);
                            K.push(t);
                        }
                    else {
                        let t = r(I[0], Q[0]), e = i(t, 0.5), u = i(t, 0.51);
                        K.push(r(H, e), r(H, u), n(H, u), n(H, e));
                    }
                let e = u((function(t) { return [ -t[0], -t[1] ]; })(t[t.length - 1].vector));
                if (A || (z&& 1 === t.length))
                    N.push(J);
                else if (L) {
                    let t = a(J, e, q);
                    for (let e = 1 / 29, n = e; n < 1; n += e)
                        N.push(f(t, J, 3 * d * n));
                } else
                    N.push(n(J, i(e, q)), n(J, i(e, 0.99 * q)), r(J, i(e, 0.99 * q)), r(J, i(e, q)));
            }
            return I.concat(N, Q.reverse(), K);
        })((function(t, e = {}) {
               var i;
               let{streamline : u = 0.5, size : o = 16, last : s = !1} = e;
               if (0 === t.length)
                   return [];
               let f = 0.15 + 0.85 * (1 - u), a = Array.isArray(t[0]) ? t : t.map(({x : t, y : e, pressure : n = 0.5}) = > [ t, e, n ]);
               if (2 === a.length) {
                   let t = a[1];
                   a = a.slice(0, -1);
                   for (let e = 1; e < 5; e++)
                       a.push(p(a[0], t, e / 4));
               }
               1 === a.length && (a = [... a, [... n(a[0], [ 1, 1 ]), ... a[0].slice(2) ] ]);
               let g =
                       [
                           {
                               point : [ a[0][0], a[0][1] ],
                               pressure : a[0][2] >= 0 ? a[0][2] : 0.25,
                               vector : [ 1, 1 ],
                               distance : 0,
                               runningLength : 0,
                           },
                       ],
                   v = !1, d = 0, M = g[0], m = a.length - 1;
               for (let t = 1; t < a.length; t++) {
                   let e = s&& t === m ? a[t].slice(0, 2) : p(M.point, a[t], f);
                   if (l(M.point, e))
                       continue;
                   let n = h(e, M.point);
                   if (((d += n), t < m && !v)) {
                       if (d < o)
                           continue;
                       v = !0;
                   }
                   (M = {
                       point : e,
                       pressure : a[t][2] >= 0 ? a[t][2] : 0.5,
                       vector : c(r(M.point, e)),
                       distance : n,
                       runningLength : d,
                   }),
                       g.push(M);
               }
               return (g[0].vector = (null == (i = g[1]) ? void 0 : i.vector) || [ 0, 0 ]), g;
           })(t, v),
           v);
    }
    (t.g.PerfectFreehand = {}), (PerfectFreehand.getStroke = function(t, e) { return M(t, e); }),
        (PerfectFreehand.getSvgPathFromStroke = function(t, e) {
            let n = M(t, e);
            const r = n.reduce(
                (t, [e, n], r, i) => {
                    const [u, o] = i[(r + 1) % i.length];
                    return t.push(e, n, (e + u) / 2, (n + o) / 2), t;
                },
                ["M", ...n[0], "Q"]
            );
            return r.push("Z"), r.join(" ");
        });
})();
