var da = Object.defineProperty;
var ga = (t, e, r) => e in t ? da(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var X = (t, e, r) => ga(t, typeof e != "symbol" ? e + "" : e, r);
var Le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ma(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Sa(t) {
  if (Object.prototype.hasOwnProperty.call(t, "__esModule")) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function o() {
      return this instanceof o ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(o) {
    var n = Object.getOwnPropertyDescriptor(t, o);
    Object.defineProperty(r, o, n.get ? n : {
      enumerable: !0,
      get: function() {
        return t[o];
      }
    });
  }), r;
}
var er, rn;
function Ho() {
  if (rn) return er;
  rn = 1;
  var t = Object.prototype.toString;
  return er = function(r) {
    var o = t.call(r), n = o === "[object Arguments]";
    return n || (n = o !== "[object Array]" && r !== null && typeof r == "object" && typeof r.length == "number" && r.length >= 0 && t.call(r.callee) === "[object Function]"), n;
  }, er;
}
var rr, tn;
function ba() {
  if (tn) return rr;
  tn = 1;
  var t;
  if (!Object.keys) {
    var e = Object.prototype.hasOwnProperty, r = Object.prototype.toString, o = Ho(), n = Object.prototype.propertyIsEnumerable, i = !n.call({ toString: null }, "toString"), u = n.call(function() {
    }, "prototype"), a = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ], f = function(y) {
      var g = y.constructor;
      return g && g.prototype === y;
    }, c = {
      $applicationCache: !0,
      $console: !0,
      $external: !0,
      $frame: !0,
      $frameElement: !0,
      $frames: !0,
      $innerHeight: !0,
      $innerWidth: !0,
      $onmozfullscreenchange: !0,
      $onmozfullscreenerror: !0,
      $outerHeight: !0,
      $outerWidth: !0,
      $pageXOffset: !0,
      $pageYOffset: !0,
      $parent: !0,
      $scrollLeft: !0,
      $scrollTop: !0,
      $scrollX: !0,
      $scrollY: !0,
      $self: !0,
      $webkitIndexedDB: !0,
      $webkitStorageInfo: !0,
      $window: !0
    }, v = function() {
      if (typeof window > "u")
        return !1;
      for (var y in window)
        try {
          if (!c["$" + y] && e.call(window, y) && window[y] !== null && typeof window[y] == "object")
            try {
              f(window[y]);
            } catch {
              return !0;
            }
        } catch {
          return !0;
        }
      return !1;
    }(), p = function(y) {
      if (typeof window > "u" || !v)
        return f(y);
      try {
        return f(y);
      } catch {
        return !1;
      }
    };
    t = function(g) {
      var S = g !== null && typeof g == "object", R = r.call(g) === "[object Function]", d = o(g), O = S && r.call(g) === "[object String]", w = [];
      if (!S && !R && !d)
        throw new TypeError("Object.keys called on a non-object");
      var b = u && R;
      if (O && g.length > 0 && !e.call(g, 0))
        for (var T = 0; T < g.length; ++T)
          w.push(String(T));
      if (d && g.length > 0)
        for (var Z = 0; Z < g.length; ++Z)
          w.push(String(Z));
      else
        for (var G in g)
          !(b && G === "prototype") && e.call(g, G) && w.push(String(G));
      if (i)
        for (var D = p(g), k = 0; k < a.length; ++k)
          !(D && a[k] === "constructor") && e.call(g, a[k]) && w.push(a[k]);
      return w;
    };
  }
  return rr = t, rr;
}
var tr, nn;
function kt() {
  if (nn) return tr;
  nn = 1;
  var t = Array.prototype.slice, e = Ho(), r = Object.keys, o = r ? function(u) {
    return r(u);
  } : ba(), n = Object.keys;
  return o.shim = function() {
    if (Object.keys) {
      var u = function() {
        var a = Object.keys(arguments);
        return a && a.length === arguments.length;
      }(1, 2);
      u || (Object.keys = function(f) {
        return e(f) ? n(t.call(f)) : n(f);
      });
    } else
      Object.keys = o;
    return Object.keys || o;
  }, tr = o, tr;
}
var nr, on;
function Ue() {
  if (on) return nr;
  on = 1;
  var t = Object.defineProperty || !1;
  if (t)
    try {
      t({}, "a", { value: 1 });
    } catch {
      t = !1;
    }
  return nr = t, nr;
}
var or, an;
function Dt() {
  return an || (an = 1, or = SyntaxError), or;
}
var ar, un;
function ne() {
  return un || (un = 1, ar = TypeError), ar;
}
var ir, fn;
function Oa() {
  return fn || (fn = 1, ir = Object.getOwnPropertyDescriptor), ir;
}
var ur, sn;
function Ae() {
  if (sn) return ur;
  sn = 1;
  var t = /* @__PURE__ */ Oa();
  if (t)
    try {
      t([], "length");
    } catch {
      t = null;
    }
  return ur = t, ur;
}
var fr, ln;
function _t() {
  if (ln) return fr;
  ln = 1;
  var t = /* @__PURE__ */ Ue(), e = /* @__PURE__ */ Dt(), r = /* @__PURE__ */ ne(), o = /* @__PURE__ */ Ae();
  return fr = function(i, u, a) {
    if (!i || typeof i != "object" && typeof i != "function")
      throw new r("`obj` must be an object or a function`");
    if (typeof u != "string" && typeof u != "symbol")
      throw new r("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new r("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new r("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new r("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new r("`loose`, if provided, must be a boolean");
    var f = arguments.length > 3 ? arguments[3] : null, c = arguments.length > 4 ? arguments[4] : null, v = arguments.length > 5 ? arguments[5] : null, p = arguments.length > 6 ? arguments[6] : !1, y = !!o && o(i, u);
    if (t)
      t(i, u, {
        configurable: v === null && y ? y.configurable : !v,
        enumerable: f === null && y ? y.enumerable : !f,
        value: a,
        writable: c === null && y ? y.writable : !c
      });
    else if (p || !f && !c && !v)
      i[u] = a;
    else
      throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, fr;
}
var sr, cn;
function Ft() {
  if (cn) return sr;
  cn = 1;
  var t = /* @__PURE__ */ Ue(), e = function() {
    return !!t;
  };
  return e.hasArrayLengthDefineBug = function() {
    if (!t)
      return null;
    try {
      return t([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, sr = e, sr;
}
var lr, pn;
function we() {
  if (pn) return lr;
  pn = 1;
  var t = kt(), e = typeof Symbol == "function" && typeof Symbol("foo") == "symbol", r = Object.prototype.toString, o = Array.prototype.concat, n = /* @__PURE__ */ _t(), i = function(c) {
    return typeof c == "function" && r.call(c) === "[object Function]";
  }, u = /* @__PURE__ */ Ft()(), a = function(c, v, p, y) {
    if (v in c) {
      if (y === !0) {
        if (c[v] === p)
          return;
      } else if (!i(y) || !y())
        return;
    }
    u ? n(c, v, p, !0) : n(c, v, p);
  }, f = function(c, v) {
    var p = arguments.length > 2 ? arguments[2] : {}, y = t(v);
    e && (y = o.call(y, Object.getOwnPropertySymbols(v)));
    for (var g = 0; g < y.length; g += 1)
      a(c, y[g], v[y[g]], p[y[g]]);
  };
  return f.supportsDescriptors = !!u, lr = f, lr;
}
var cr = { exports: {} }, pr, yn;
function Nt() {
  return yn || (yn = 1, pr = Object), pr;
}
var yr, vn;
function Go() {
  return vn || (vn = 1, yr = Error), yr;
}
var vr, hn;
function Aa() {
  return hn || (hn = 1, vr = EvalError), vr;
}
var hr, dn;
function wa() {
  return dn || (dn = 1, hr = RangeError), hr;
}
var dr, gn;
function Pa() {
  return gn || (gn = 1, dr = ReferenceError), dr;
}
var gr, mn;
function Ia() {
  return mn || (mn = 1, gr = URIError), gr;
}
var mr, Sn;
function qa() {
  return Sn || (Sn = 1, mr = Math.abs), mr;
}
var Sr, bn;
function Ra() {
  return bn || (bn = 1, Sr = Math.floor), Sr;
}
var br, On;
function Ea() {
  return On || (On = 1, br = Math.max), br;
}
var Or, An;
function $a() {
  return An || (An = 1, Or = Math.min), Or;
}
var Ar, wn;
function Ba() {
  return wn || (wn = 1, Ar = Math.pow), Ar;
}
var wr, Pn;
function xa() {
  return Pn || (Pn = 1, wr = Math.round), wr;
}
var Pr, In;
function Ma() {
  return In || (In = 1, Pr = Number.isNaN || function(e) {
    return e !== e;
  }), Pr;
}
var Ir, qn;
function Ta() {
  if (qn) return Ir;
  qn = 1;
  var t = /* @__PURE__ */ Ma();
  return Ir = function(r) {
    return t(r) || r === 0 ? r : r < 0 ? -1 : 1;
  }, Ir;
}
var qr, Rn;
function He() {
  return Rn || (Rn = 1, qr = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, r = Symbol("test"), o = Object(r);
    if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(o) !== "[object Symbol]")
      return !1;
    var n = 42;
    e[r] = n;
    for (var i in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var u = Object.getOwnPropertySymbols(e);
    if (u.length !== 1 || u[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var a = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, r)
      );
      if (a.value !== n || a.enumerable !== !0)
        return !1;
    }
    return !0;
  }), qr;
}
var Rr, En;
function Wt() {
  if (En) return Rr;
  En = 1;
  var t = typeof Symbol < "u" && Symbol, e = He();
  return Rr = function() {
    return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Rr;
}
var Er, $n;
function Ko() {
  return $n || ($n = 1, Er = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Er;
}
var $r, Bn;
function zo() {
  if (Bn) return $r;
  Bn = 1;
  var t = /* @__PURE__ */ Nt();
  return $r = t.getPrototypeOf || null, $r;
}
var Br, xn;
function Ca() {
  if (xn) return Br;
  xn = 1;
  var t = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, r = Math.max, o = "[object Function]", n = function(f, c) {
    for (var v = [], p = 0; p < f.length; p += 1)
      v[p] = f[p];
    for (var y = 0; y < c.length; y += 1)
      v[y + f.length] = c[y];
    return v;
  }, i = function(f, c) {
    for (var v = [], p = c, y = 0; p < f.length; p += 1, y += 1)
      v[y] = f[p];
    return v;
  }, u = function(a, f) {
    for (var c = "", v = 0; v < a.length; v += 1)
      c += a[v], v + 1 < a.length && (c += f);
    return c;
  };
  return Br = function(f) {
    var c = this;
    if (typeof c != "function" || e.apply(c) !== o)
      throw new TypeError(t + c);
    for (var v = i(arguments, 1), p, y = function() {
      if (this instanceof p) {
        var O = c.apply(
          this,
          n(v, arguments)
        );
        return Object(O) === O ? O : this;
      }
      return c.apply(
        f,
        n(v, arguments)
      );
    }, g = r(0, c.length - v.length), S = [], R = 0; R < g; R++)
      S[R] = "$" + R;
    if (p = Function("binder", "return function (" + u(S, ",") + "){ return binder.apply(this,arguments); }")(y), c.prototype) {
      var d = function() {
      };
      d.prototype = c.prototype, p.prototype = new d(), d.prototype = null;
    }
    return p;
  }, Br;
}
var xr, Mn;
function Ce() {
  if (Mn) return xr;
  Mn = 1;
  var t = Ca();
  return xr = Function.prototype.bind || t, xr;
}
var Mr, Tn;
function Lt() {
  return Tn || (Tn = 1, Mr = Function.prototype.call), Mr;
}
var Tr, Cn;
function Ut() {
  return Cn || (Cn = 1, Tr = Function.prototype.apply), Tr;
}
var Cr, jn;
function ja() {
  return jn || (jn = 1, Cr = typeof Reflect < "u" && Reflect && Reflect.apply), Cr;
}
var jr, kn;
function Vo() {
  if (kn) return jr;
  kn = 1;
  var t = Ce(), e = Ut(), r = Lt(), o = ja();
  return jr = o || t.call(r, e), jr;
}
var kr, Dn;
function Ht() {
  if (Dn) return kr;
  Dn = 1;
  var t = Ce(), e = /* @__PURE__ */ ne(), r = Lt(), o = Vo();
  return kr = function(i) {
    if (i.length < 1 || typeof i[0] != "function")
      throw new e("a function is required");
    return o(t, r, i);
  }, kr;
}
var Dr, _n;
function ka() {
  if (_n) return Dr;
  _n = 1;
  var t = Ht(), e = /* @__PURE__ */ Ae(), r;
  try {
    r = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (u) {
    if (!u || typeof u != "object" || !("code" in u) || u.code !== "ERR_PROTO_ACCESS")
      throw u;
  }
  var o = !!r && e && e(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), n = Object, i = n.getPrototypeOf;
  return Dr = o && typeof o.get == "function" ? t([o.get]) : typeof i == "function" ? (
    /** @type {import('./get')} */
    function(a) {
      return i(a == null ? a : n(a));
    }
  ) : !1, Dr;
}
var _r, Fn;
function Jo() {
  if (Fn) return _r;
  Fn = 1;
  var t = Ko(), e = zo(), r = /* @__PURE__ */ ka();
  return _r = t ? function(n) {
    return t(n);
  } : e ? function(n) {
    if (!n || typeof n != "object" && typeof n != "function")
      throw new TypeError("getProto: not an object");
    return e(n);
  } : r ? function(n) {
    return r(n);
  } : null, _r;
}
var Fr, Nn;
function Gt() {
  if (Nn) return Fr;
  Nn = 1;
  var t = Function.prototype.call, e = Object.prototype.hasOwnProperty, r = Ce();
  return Fr = r.call(t, e), Fr;
}
var Nr, Wn;
function ye() {
  if (Wn) return Nr;
  Wn = 1;
  var t, e = /* @__PURE__ */ Nt(), r = /* @__PURE__ */ Go(), o = /* @__PURE__ */ Aa(), n = /* @__PURE__ */ wa(), i = /* @__PURE__ */ Pa(), u = /* @__PURE__ */ Dt(), a = /* @__PURE__ */ ne(), f = /* @__PURE__ */ Ia(), c = /* @__PURE__ */ qa(), v = /* @__PURE__ */ Ra(), p = /* @__PURE__ */ Ea(), y = /* @__PURE__ */ $a(), g = /* @__PURE__ */ Ba(), S = /* @__PURE__ */ xa(), R = /* @__PURE__ */ Ta(), d = Function, O = function(C) {
    try {
      return d('"use strict"; return (' + C + ").constructor;")();
    } catch {
    }
  }, w = /* @__PURE__ */ Ae(), b = /* @__PURE__ */ Ue(), T = function() {
    throw new a();
  }, Z = w ? function() {
    try {
      return arguments.callee, T;
    } catch {
      try {
        return w(arguments, "callee").get;
      } catch {
        return T;
      }
    }
  }() : T, G = Wt()(), D = Jo(), k = zo(), I = Ko(), _ = Ut(), U = Lt(), N = {}, H = typeof Uint8Array > "u" || !D ? t : D(Uint8Array), V = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? t : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? t : ArrayBuffer,
    "%ArrayIteratorPrototype%": G && D ? D([][Symbol.iterator]()) : t,
    "%AsyncFromSyncIteratorPrototype%": t,
    "%AsyncFunction%": N,
    "%AsyncGenerator%": N,
    "%AsyncGeneratorFunction%": N,
    "%AsyncIteratorPrototype%": N,
    "%Atomics%": typeof Atomics > "u" ? t : Atomics,
    "%BigInt%": typeof BigInt > "u" ? t : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? t : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? t : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? t : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": r,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": o,
    "%Float32Array%": typeof Float32Array > "u" ? t : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? t : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? t : FinalizationRegistry,
    "%Function%": d,
    "%GeneratorFunction%": N,
    "%Int8Array%": typeof Int8Array > "u" ? t : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? t : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? t : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": G && D ? D(D([][Symbol.iterator]())) : t,
    "%JSON%": typeof JSON == "object" ? JSON : t,
    "%Map%": typeof Map > "u" ? t : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !G || !D ? t : D((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": e,
    "%Object.getOwnPropertyDescriptor%": w,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? t : Promise,
    "%Proxy%": typeof Proxy > "u" ? t : Proxy,
    "%RangeError%": n,
    "%ReferenceError%": i,
    "%Reflect%": typeof Reflect > "u" ? t : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? t : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !G || !D ? t : D((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? t : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": G && D ? D(""[Symbol.iterator]()) : t,
    "%Symbol%": G ? Symbol : t,
    "%SyntaxError%": u,
    "%ThrowTypeError%": Z,
    "%TypedArray%": H,
    "%TypeError%": a,
    "%Uint8Array%": typeof Uint8Array > "u" ? t : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? t : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? t : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? t : Uint32Array,
    "%URIError%": f,
    "%WeakMap%": typeof WeakMap > "u" ? t : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? t : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? t : WeakSet,
    "%Function.prototype.call%": U,
    "%Function.prototype.apply%": _,
    "%Object.defineProperty%": b,
    "%Object.getPrototypeOf%": k,
    "%Math.abs%": c,
    "%Math.floor%": v,
    "%Math.max%": p,
    "%Math.min%": y,
    "%Math.pow%": g,
    "%Math.round%": S,
    "%Math.sign%": R,
    "%Reflect.getPrototypeOf%": I
  };
  if (D)
    try {
      null.error;
    } catch (C) {
      var K = D(D(C));
      V["%Error.prototype%"] = K;
    }
  var Ie = function C(P) {
    var q;
    if (P === "%AsyncFunction%")
      q = O("async function () {}");
    else if (P === "%GeneratorFunction%")
      q = O("function* () {}");
    else if (P === "%AsyncGeneratorFunction%")
      q = O("async function* () {}");
    else if (P === "%AsyncGenerator%") {
      var A = C("%AsyncGeneratorFunction%");
      A && (q = A.prototype);
    } else if (P === "%AsyncIteratorPrototype%") {
      var E = C("%AsyncGenerator%");
      E && D && (q = D(E.prototype));
    }
    return V[P] = q, q;
  }, me = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, oe = Ce(), z = /* @__PURE__ */ Gt(), Se = oe.call(U, Array.prototype.concat), qe = oe.call(_, Array.prototype.splice), be = oe.call(U, String.prototype.replace), ve = oe.call(U, String.prototype.slice), h = oe.call(U, RegExp.prototype.exec), m = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, M = /\\(\\)?/g, $ = function(P) {
    var q = ve(P, 0, 1), A = ve(P, -1);
    if (q === "%" && A !== "%")
      throw new u("invalid intrinsic syntax, expected closing `%`");
    if (A === "%" && q !== "%")
      throw new u("invalid intrinsic syntax, expected opening `%`");
    var E = [];
    return be(P, m, function(J, Y, F, Q) {
      E[E.length] = F ? be(Q, M, "$1") : Y || J;
    }), E;
  }, B = function(P, q) {
    var A = P, E;
    if (z(me, A) && (E = me[A], A = "%" + E[0] + "%"), z(V, A)) {
      var J = V[A];
      if (J === N && (J = Ie(A)), typeof J > "u" && !q)
        throw new a("intrinsic " + P + " exists, but is not available. Please file an issue!");
      return {
        alias: E,
        name: A,
        value: J
      };
    }
    throw new u("intrinsic " + P + " does not exist!");
  };
  return Nr = function(P, q) {
    if (typeof P != "string" || P.length === 0)
      throw new a("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof q != "boolean")
      throw new a('"allowMissing" argument must be a boolean');
    if (h(/^%?[^%]*%?$/, P) === null)
      throw new u("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var A = $(P), E = A.length > 0 ? A[0] : "", J = B("%" + E + "%", q), Y = J.name, F = J.value, Q = !1, he = J.alias;
    he && (E = he[0], qe(A, Se([0, 1], he)));
    for (var ie = 1, ue = !0; ie < A.length; ie += 1) {
      var re = A[ie], fe = ve(re, 0, 1), se = ve(re, -1);
      if ((fe === '"' || fe === "'" || fe === "`" || se === '"' || se === "'" || se === "`") && fe !== se)
        throw new u("property names with quotes must have matching quotes");
      if ((re === "constructor" || !ue) && (Q = !0), E += "." + re, Y = "%" + E + "%", z(V, Y))
        F = V[Y];
      else if (F != null) {
        if (!(re in F)) {
          if (!q)
            throw new a("base intrinsic for " + P + " exists, but the property is not available.");
          return;
        }
        if (w && ie + 1 >= A.length) {
          var le = w(F, re);
          ue = !!le, ue && "get" in le && !("originalValue" in le.get) ? F = le.get : F = F[re];
        } else
          ue = z(F, re), F = F[re];
        ue && !Q && (V[Y] = F);
      }
    }
    return F;
  }, Nr;
}
var Wr, Ln;
function Da() {
  if (Ln) return Wr;
  Ln = 1;
  var t = /* @__PURE__ */ ye(), e = /* @__PURE__ */ _t(), r = /* @__PURE__ */ Ft()(), o = /* @__PURE__ */ Ae(), n = /* @__PURE__ */ ne(), i = t("%Math.floor%");
  return Wr = function(a, f) {
    if (typeof a != "function")
      throw new n("`fn` is not a function");
    if (typeof f != "number" || f < 0 || f > 4294967295 || i(f) !== f)
      throw new n("`length` must be a positive 32-bit integer");
    var c = arguments.length > 2 && !!arguments[2], v = !0, p = !0;
    if ("length" in a && o) {
      var y = o(a, "length");
      y && !y.configurable && (v = !1), y && !y.writable && (p = !1);
    }
    return (v || p || !c) && (r ? e(
      /** @type {Parameters<define>[0]} */
      a,
      "length",
      f,
      !0,
      !0
    ) : e(
      /** @type {Parameters<define>[0]} */
      a,
      "length",
      f
    )), a;
  }, Wr;
}
var Lr, Un;
function _a() {
  if (Un) return Lr;
  Un = 1;
  var t = Ce(), e = Ut(), r = Vo();
  return Lr = function() {
    return r(t, e, arguments);
  }, Lr;
}
var Hn;
function Be() {
  return Hn || (Hn = 1, function(t) {
    var e = /* @__PURE__ */ Da(), r = /* @__PURE__ */ Ue(), o = Ht(), n = _a();
    t.exports = function(u) {
      var a = o(arguments), f = u.length - (arguments.length - 1);
      return e(
        a,
        1 + (f > 0 ? f : 0),
        !0
      );
    }, r ? r(t.exports, "apply", { value: n }) : t.exports.apply = n;
  }(cr)), cr.exports;
}
var Ur, Gn;
function ee() {
  if (Gn) return Ur;
  Gn = 1;
  var t = /* @__PURE__ */ ye(), e = Ht(), r = e([t("%String.prototype.indexOf%")]);
  return Ur = function(n, i) {
    var u = (
      /** @type {Parameters<typeof callBindBasic>[0][0]} */
      t(n, !!i)
    );
    return typeof u == "function" && r(n, ".prototype.") > -1 ? e([u]) : u;
  }, Ur;
}
var Hr, Kn;
function Yo() {
  if (Kn) return Hr;
  Kn = 1;
  var t = kt(), e = He()(), r = /* @__PURE__ */ ee(), o = /* @__PURE__ */ Nt(), n = r("Array.prototype.push"), i = r("Object.prototype.propertyIsEnumerable"), u = e ? o.getOwnPropertySymbols : null;
  return Hr = function(f, c) {
    if (f == null)
      throw new TypeError("target must be an object");
    var v = o(f);
    if (arguments.length === 1)
      return v;
    for (var p = 1; p < arguments.length; ++p) {
      var y = o(arguments[p]), g = t(y), S = e && (o.getOwnPropertySymbols || u);
      if (S)
        for (var R = S(y), d = 0; d < R.length; ++d) {
          var O = R[d];
          i(y, O) && n(g, O);
        }
      for (var w = 0; w < g.length; ++w) {
        var b = g[w];
        if (i(y, b)) {
          var T = y[b];
          v[b] = T;
        }
      }
    }
    return v;
  }, Hr;
}
var Gr, zn;
function Xo() {
  if (zn) return Gr;
  zn = 1;
  var t = Yo(), e = function() {
    if (!Object.assign)
      return !1;
    for (var o = "abcdefghijklmnopqrst", n = o.split(""), i = {}, u = 0; u < n.length; ++u)
      i[n[u]] = n[u];
    var a = Object.assign({}, i), f = "";
    for (var c in a)
      f += c;
    return o !== f;
  }, r = function() {
    if (!Object.assign || !Object.preventExtensions)
      return !1;
    var o = Object.preventExtensions({ 1: 2 });
    try {
      Object.assign(o, "xy");
    } catch {
      return o[1] === "y";
    }
    return !1;
  };
  return Gr = function() {
    return !Object.assign || e() || r() ? t : Object.assign;
  }, Gr;
}
var Kr, Vn;
function Fa() {
  if (Vn) return Kr;
  Vn = 1;
  var t = we(), e = Xo();
  return Kr = function() {
    var o = e();
    return t(
      Object,
      { assign: o },
      { assign: function() {
        return Object.assign !== o;
      } }
    ), o;
  }, Kr;
}
var zr, Jn;
function Na() {
  if (Jn) return zr;
  Jn = 1;
  var t = we(), e = Be(), r = Yo(), o = Xo(), n = Fa(), i = e.apply(o()), u = function(f, c) {
    return i(Object, arguments);
  };
  return t(u, {
    getPolyfill: o,
    implementation: r,
    shim: n
  }), zr = u, zr;
}
var Vr, Yn;
function Zo() {
  if (Yn) return Vr;
  Yn = 1;
  var t = /* @__PURE__ */ ye(), e = Be(), r = e(t("String.prototype.indexOf"));
  return Vr = function(n, i) {
    var u = t(n, !!i);
    return typeof u == "function" && r(n, ".prototype.") > -1 ? e(u) : u;
  }, Vr;
}
var Jr, Xn;
function Wa() {
  if (Xn) return Jr;
  Xn = 1;
  var t = function() {
    return typeof (function() {
    }).name == "string";
  }, e = Object.getOwnPropertyDescriptor;
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  t.functionsHaveConfigurableNames = function() {
    if (!t() || !e)
      return !1;
    var n = e(function() {
    }, "name");
    return !!n && !!n.configurable;
  };
  var r = Function.prototype.bind;
  return t.boundFunctionsHaveNames = function() {
    return t() && typeof r == "function" && (function() {
    }).bind().name !== "";
  }, Jr = t, Jr;
}
var Yr, Zn;
function La() {
  if (Zn) return Yr;
  Zn = 1;
  var t = /* @__PURE__ */ _t(), e = /* @__PURE__ */ Ft()(), r = Wa().functionsHaveConfigurableNames(), o = /* @__PURE__ */ ne();
  return Yr = function(i, u) {
    if (typeof i != "function")
      throw new o("`fn` is not a function");
    var a = arguments.length > 2 && !!arguments[2];
    return (!a || r) && (e ? t(
      /** @type {Parameters<define>[0]} */
      i,
      "name",
      u,
      !0,
      !0
    ) : t(
      /** @type {Parameters<define>[0]} */
      i,
      "name",
      u
    )), i;
  }, Yr;
}
var Xr, Qn;
function Qo() {
  if (Qn) return Xr;
  Qn = 1;
  var t = La(), e = /* @__PURE__ */ ne(), r = Object;
  return Xr = t(function() {
    if (this == null || this !== r(this))
      throw new e("RegExp.prototype.flags getter called on non-object");
    var n = "";
    return this.hasIndices && (n += "d"), this.global && (n += "g"), this.ignoreCase && (n += "i"), this.multiline && (n += "m"), this.dotAll && (n += "s"), this.unicode && (n += "u"), this.unicodeSets && (n += "v"), this.sticky && (n += "y"), n;
  }, "get flags", !0), Xr;
}
var Zr, eo;
function ea() {
  if (eo) return Zr;
  eo = 1;
  var t = Qo(), e = we().supportsDescriptors, r = Object.getOwnPropertyDescriptor;
  return Zr = function() {
    if (e && /a/mig.flags === "gim") {
      var n = r(RegExp.prototype, "flags");
      if (n && typeof n.get == "function" && "dotAll" in RegExp.prototype && "hasIndices" in RegExp.prototype) {
        var i = "", u = {};
        if (Object.defineProperty(u, "hasIndices", {
          get: function() {
            i += "d";
          }
        }), Object.defineProperty(u, "sticky", {
          get: function() {
            i += "y";
          }
        }), n.get.call(u), i === "dy")
          return n.get;
      }
    }
    return t;
  }, Zr;
}
var Qr, ro;
function Ua() {
  if (ro) return Qr;
  ro = 1;
  var t = we().supportsDescriptors, e = ea(), r = /* @__PURE__ */ Ae(), o = Object.defineProperty, n = /* @__PURE__ */ Go(), i = Jo(), u = /a/;
  return Qr = function() {
    if (!t || !i)
      throw new n("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
    var f = e(), c = i(u), v = r(c, "flags");
    return (!v || v.get !== f) && o(c, "flags", {
      configurable: !0,
      enumerable: !1,
      get: f
    }), f;
  }, Qr;
}
var et, to;
function Ha() {
  if (to) return et;
  to = 1;
  var t = we(), e = Be(), r = Qo(), o = ea(), n = Ua(), i = e(o());
  return t(i, {
    getPolyfill: o,
    implementation: r,
    shim: n
  }), et = i, et;
}
var Te = { exports: {} }, rt, no;
function Pe() {
  if (no) return rt;
  no = 1;
  var t = He();
  return rt = function() {
    return t() && !!Symbol.toStringTag;
  }, rt;
}
var tt, oo;
function ra() {
  if (oo) return tt;
  oo = 1;
  var t = Pe()(), e = /* @__PURE__ */ ee(), r = e("Object.prototype.toString"), o = function(a) {
    return t && a && typeof a == "object" && Symbol.toStringTag in a ? !1 : r(a) === "[object Arguments]";
  }, n = function(a) {
    return o(a) ? !0 : a !== null && typeof a == "object" && "length" in a && typeof a.length == "number" && a.length >= 0 && r(a) !== "[object Array]" && "callee" in a && r(a.callee) === "[object Function]";
  }, i = function() {
    return o(arguments);
  }();
  return o.isLegacyArguments = n, tt = i ? o : n, tt;
}
const Ga = {}, Ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ga
}, Symbol.toStringTag, { value: "Module" })), za = /* @__PURE__ */ Sa(Ka);
var nt, ao;
function Ge() {
  if (ao) return nt;
  ao = 1;
  var t = typeof Map == "function" && Map.prototype, e = Object.getOwnPropertyDescriptor && t ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, r = t && e && typeof e.get == "function" ? e.get : null, o = t && Map.prototype.forEach, n = typeof Set == "function" && Set.prototype, i = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, u = n && i && typeof i.get == "function" ? i.get : null, a = n && Set.prototype.forEach, f = typeof WeakMap == "function" && WeakMap.prototype, c = f ? WeakMap.prototype.has : null, v = typeof WeakSet == "function" && WeakSet.prototype, p = v ? WeakSet.prototype.has : null, y = typeof WeakRef == "function" && WeakRef.prototype, g = y ? WeakRef.prototype.deref : null, S = Boolean.prototype.valueOf, R = Object.prototype.toString, d = Function.prototype.toString, O = String.prototype.match, w = String.prototype.slice, b = String.prototype.replace, T = String.prototype.toUpperCase, Z = String.prototype.toLowerCase, G = RegExp.prototype.test, D = Array.prototype.concat, k = Array.prototype.join, I = Array.prototype.slice, _ = Math.floor, U = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, N = Object.getOwnPropertySymbols, H = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, V = typeof Symbol == "function" && typeof Symbol.iterator == "object", K = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === V || !0) ? Symbol.toStringTag : null, Ie = Object.prototype.propertyIsEnumerable, me = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(s) {
    return s.__proto__;
  } : null);
  function oe(s, l) {
    if (s === 1 / 0 || s === -1 / 0 || s !== s || s && s > -1e3 && s < 1e3 || G.call(/e/, l))
      return l;
    var j = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof s == "number") {
      var W = s < 0 ? -_(-s) : _(s);
      if (W !== s) {
        var L = String(W), x = w.call(l, L.length + 1);
        return b.call(L, j, "$&_") + "." + b.call(b.call(x, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return b.call(l, j, "$&_");
  }
  var z = za, Se = z.custom, qe = E(Se) ? Se : null, be = {
    __proto__: null,
    double: '"',
    single: "'"
  }, ve = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
  };
  nt = function s(l, j, W, L) {
    var x = j || {};
    if (F(x, "quoteStyle") && !F(be, x.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (F(x, "maxStringLength") && (typeof x.maxStringLength == "number" ? x.maxStringLength < 0 && x.maxStringLength !== 1 / 0 : x.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var de = F(x, "customInspect") ? x.customInspect : !0;
    if (typeof de != "boolean" && de !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (F(x, "indent") && x.indent !== null && x.indent !== "	" && !(parseInt(x.indent, 10) === x.indent && x.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (F(x, "numericSeparator") && typeof x.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var Oe = x.numericSeparator;
    if (typeof l > "u")
      return "undefined";
    if (l === null)
      return "null";
    if (typeof l == "boolean")
      return l ? "true" : "false";
    if (typeof l == "string")
      return ce(l, x);
    if (typeof l == "number") {
      if (l === 0)
        return 1 / 0 / l > 0 ? "0" : "-0";
      var te = String(l);
      return Oe ? oe(l, te) : te;
    }
    if (typeof l == "bigint") {
      var ge = String(l) + "n";
      return Oe ? oe(l, ge) : ge;
    }
    var ze = typeof x.depth > "u" ? 5 : x.depth;
    if (typeof W > "u" && (W = 0), W >= ze && ze > 0 && typeof l == "object")
      return M(l) ? "[Array]" : "[Object]";
    var Ee = ya(x, W);
    if (typeof L > "u")
      L = [];
    else if (ie(L, l) >= 0)
      return "[Circular]";
    function ae($e, _e, ha) {
      if (_e && (L = I.call(L), L.push(_e)), ha) {
        var en = {
          depth: x.depth
        };
        return F(x, "quoteStyle") && (en.quoteStyle = x.quoteStyle), s($e, en, W + 1, L);
      }
      return s($e, x, W + 1, L);
    }
    if (typeof l == "function" && !B(l)) {
      var zt = he(l), Vt = ke(l, ae);
      return "[Function" + (zt ? ": " + zt : " (anonymous)") + "]" + (Vt.length > 0 ? " { " + k.call(Vt, ", ") + " }" : "");
    }
    if (E(l)) {
      var Jt = V ? b.call(String(l), /^(Symbol\(.*\))_[^)]*$/, "$1") : H.call(l);
      return typeof l == "object" && !V ? pe(Jt) : Jt;
    }
    if (je(l)) {
      for (var Me = "<" + Z.call(String(l.nodeName)), Ve = l.attributes || [], De = 0; De < Ve.length; De++)
        Me += " " + Ve[De].name + "=" + h(m(Ve[De].value), "double", x);
      return Me += ">", l.childNodes && l.childNodes.length && (Me += "..."), Me += "</" + Z.call(String(l.nodeName)) + ">", Me;
    }
    if (M(l)) {
      if (l.length === 0)
        return "[]";
      var Je = ke(l, ae);
      return Ee && !pa(Je) ? "[" + Ke(Je, Ee) + "]" : "[ " + k.call(Je, ", ") + " ]";
    }
    if (C(l)) {
      var Ye = ke(l, ae);
      return !("cause" in Error.prototype) && "cause" in l && !Ie.call(l, "cause") ? "{ [" + String(l) + "] " + k.call(D.call("[cause]: " + ae(l.cause), Ye), ", ") + " }" : Ye.length === 0 ? "[" + String(l) + "]" : "{ [" + String(l) + "] " + k.call(Ye, ", ") + " }";
    }
    if (typeof l == "object" && de) {
      if (qe && typeof l[qe] == "function" && z)
        return z(l, { depth: ze - W });
      if (de !== "symbol" && typeof l.inspect == "function")
        return l.inspect();
    }
    if (ue(l)) {
      var Yt = [];
      return o && o.call(l, function($e, _e) {
        Yt.push(ae(_e, l, !0) + " => " + ae($e, l));
      }), Kt("Map", r.call(l), Yt, Ee);
    }
    if (se(l)) {
      var Xt = [];
      return a && a.call(l, function($e) {
        Xt.push(ae($e, l));
      }), Kt("Set", u.call(l), Xt, Ee);
    }
    if (re(l))
      return Re("WeakMap");
    if (le(l))
      return Re("WeakSet");
    if (fe(l))
      return Re("WeakRef");
    if (q(l))
      return pe(ae(Number(l)));
    if (J(l))
      return pe(ae(U.call(l)));
    if (A(l))
      return pe(S.call(l));
    if (P(l))
      return pe(ae(String(l)));
    if (typeof window < "u" && l === window)
      return "{ [object Window] }";
    if (typeof globalThis < "u" && l === globalThis || typeof Le < "u" && l === Le)
      return "{ [object globalThis] }";
    if (!$(l) && !B(l)) {
      var Xe = ke(l, ae), Zt = me ? me(l) === Object.prototype : l instanceof Object || l.constructor === Object, Ze = l instanceof Object ? "" : "null prototype", Qt = !Zt && K && Object(l) === l && K in l ? w.call(Q(l), 8, -1) : Ze ? "Object" : "", va = Zt || typeof l.constructor != "function" ? "" : l.constructor.name ? l.constructor.name + " " : "", Qe = va + (Qt || Ze ? "[" + k.call(D.call([], Qt || [], Ze || []), ": ") + "] " : "");
      return Xe.length === 0 ? Qe + "{}" : Ee ? Qe + "{" + Ke(Xe, Ee) + "}" : Qe + "{ " + k.call(Xe, ", ") + " }";
    }
    return String(l);
  };
  function h(s, l, j) {
    var W = j.quoteStyle || l, L = be[W];
    return L + s + L;
  }
  function m(s) {
    return b.call(String(s), /"/g, "&quot;");
  }
  function M(s) {
    return Q(s) === "[object Array]" && (!K || !(typeof s == "object" && K in s));
  }
  function $(s) {
    return Q(s) === "[object Date]" && (!K || !(typeof s == "object" && K in s));
  }
  function B(s) {
    return Q(s) === "[object RegExp]" && (!K || !(typeof s == "object" && K in s));
  }
  function C(s) {
    return Q(s) === "[object Error]" && (!K || !(typeof s == "object" && K in s));
  }
  function P(s) {
    return Q(s) === "[object String]" && (!K || !(typeof s == "object" && K in s));
  }
  function q(s) {
    return Q(s) === "[object Number]" && (!K || !(typeof s == "object" && K in s));
  }
  function A(s) {
    return Q(s) === "[object Boolean]" && (!K || !(typeof s == "object" && K in s));
  }
  function E(s) {
    if (V)
      return s && typeof s == "object" && s instanceof Symbol;
    if (typeof s == "symbol")
      return !0;
    if (!s || typeof s != "object" || !H)
      return !1;
    try {
      return H.call(s), !0;
    } catch {
    }
    return !1;
  }
  function J(s) {
    if (!s || typeof s != "object" || !U)
      return !1;
    try {
      return U.call(s), !0;
    } catch {
    }
    return !1;
  }
  var Y = Object.prototype.hasOwnProperty || function(s) {
    return s in this;
  };
  function F(s, l) {
    return Y.call(s, l);
  }
  function Q(s) {
    return R.call(s);
  }
  function he(s) {
    if (s.name)
      return s.name;
    var l = O.call(d.call(s), /^function\s*([\w$]+)/);
    return l ? l[1] : null;
  }
  function ie(s, l) {
    if (s.indexOf)
      return s.indexOf(l);
    for (var j = 0, W = s.length; j < W; j++)
      if (s[j] === l)
        return j;
    return -1;
  }
  function ue(s) {
    if (!r || !s || typeof s != "object")
      return !1;
    try {
      r.call(s);
      try {
        u.call(s);
      } catch {
        return !0;
      }
      return s instanceof Map;
    } catch {
    }
    return !1;
  }
  function re(s) {
    if (!c || !s || typeof s != "object")
      return !1;
    try {
      c.call(s, c);
      try {
        p.call(s, p);
      } catch {
        return !0;
      }
      return s instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  function fe(s) {
    if (!g || !s || typeof s != "object")
      return !1;
    try {
      return g.call(s), !0;
    } catch {
    }
    return !1;
  }
  function se(s) {
    if (!u || !s || typeof s != "object")
      return !1;
    try {
      u.call(s);
      try {
        r.call(s);
      } catch {
        return !0;
      }
      return s instanceof Set;
    } catch {
    }
    return !1;
  }
  function le(s) {
    if (!p || !s || typeof s != "object")
      return !1;
    try {
      p.call(s, p);
      try {
        c.call(s, c);
      } catch {
        return !0;
      }
      return s instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  function je(s) {
    return !s || typeof s != "object" ? !1 : typeof HTMLElement < "u" && s instanceof HTMLElement ? !0 : typeof s.nodeName == "string" && typeof s.getAttribute == "function";
  }
  function ce(s, l) {
    if (s.length > l.maxStringLength) {
      var j = s.length - l.maxStringLength, W = "... " + j + " more character" + (j > 1 ? "s" : "");
      return ce(w.call(s, 0, l.maxStringLength), l) + W;
    }
    var L = ve[l.quoteStyle || "single"];
    L.lastIndex = 0;
    var x = b.call(b.call(s, L, "\\$1"), /[\x00-\x1f]/g, xe);
    return h(x, "single", l);
  }
  function xe(s) {
    var l = s.charCodeAt(0), j = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[l];
    return j ? "\\" + j : "\\x" + (l < 16 ? "0" : "") + T.call(l.toString(16));
  }
  function pe(s) {
    return "Object(" + s + ")";
  }
  function Re(s) {
    return s + " { ? }";
  }
  function Kt(s, l, j, W) {
    var L = W ? Ke(j, W) : k.call(j, ", ");
    return s + " (" + l + ") {" + L + "}";
  }
  function pa(s) {
    for (var l = 0; l < s.length; l++)
      if (ie(s[l], `
`) >= 0)
        return !1;
    return !0;
  }
  function ya(s, l) {
    var j;
    if (s.indent === "	")
      j = "	";
    else if (typeof s.indent == "number" && s.indent > 0)
      j = k.call(Array(s.indent + 1), " ");
    else
      return null;
    return {
      base: j,
      prev: k.call(Array(l + 1), j)
    };
  }
  function Ke(s, l) {
    if (s.length === 0)
      return "";
    var j = `
` + l.prev + l.base;
    return j + k.call(s, "," + j) + `
` + l.prev;
  }
  function ke(s, l) {
    var j = M(s), W = [];
    if (j) {
      W.length = s.length;
      for (var L = 0; L < s.length; L++)
        W[L] = F(s, L) ? l(s[L], s) : "";
    }
    var x = typeof N == "function" ? N(s) : [], de;
    if (V) {
      de = {};
      for (var Oe = 0; Oe < x.length; Oe++)
        de["$" + x[Oe]] = x[Oe];
    }
    for (var te in s)
      F(s, te) && (j && String(Number(te)) === te && te < s.length || V && de["$" + te] instanceof Symbol || (G.call(/[^\w$]/, te) ? W.push(l(te, s) + ": " + l(s[te], s)) : W.push(te + ": " + l(s[te], s))));
    if (typeof N == "function")
      for (var ge = 0; ge < x.length; ge++)
        Ie.call(s, x[ge]) && W.push("[" + l(x[ge]) + "]: " + l(s[x[ge]], s));
    return W;
  }
  return nt;
}
var ot, io;
function Va() {
  if (io) return ot;
  io = 1;
  var t = /* @__PURE__ */ Ge(), e = /* @__PURE__ */ ne(), r = function(a, f, c) {
    for (var v = a, p; (p = v.next) != null; v = p)
      if (p.key === f)
        return v.next = p.next, c || (p.next = /** @type {NonNullable<typeof list.next>} */
        a.next, a.next = p), p;
  }, o = function(a, f) {
    if (a) {
      var c = r(a, f);
      return c && c.value;
    }
  }, n = function(a, f, c) {
    var v = r(a, f);
    v ? v.value = c : a.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key: f,
      next: a.next,
      value: c
    };
  }, i = function(a, f) {
    return a ? !!r(a, f) : !1;
  }, u = function(a, f) {
    if (a)
      return r(a, f, !0);
  };
  return ot = function() {
    var f, c = {
      assert: function(v) {
        if (!c.has(v))
          throw new e("Side channel does not contain " + t(v));
      },
      delete: function(v) {
        var p = f && f.next, y = u(f, v);
        return y && p && p === y && (f = void 0), !!y;
      },
      get: function(v) {
        return o(f, v);
      },
      has: function(v) {
        return i(f, v);
      },
      set: function(v, p) {
        f || (f = {
          next: void 0
        }), n(
          /** @type {NonNullable<typeof $o>} */
          f,
          v,
          p
        );
      }
    };
    return c;
  }, ot;
}
var at, uo;
function ta() {
  if (uo) return at;
  uo = 1;
  var t = /* @__PURE__ */ ye(), e = /* @__PURE__ */ ee(), r = /* @__PURE__ */ Ge(), o = /* @__PURE__ */ ne(), n = t("%Map%", !0), i = e("Map.prototype.get", !0), u = e("Map.prototype.set", !0), a = e("Map.prototype.has", !0), f = e("Map.prototype.delete", !0), c = e("Map.prototype.size", !0);
  return at = !!n && /** @type {Exclude<import('.'), false>} */
  function() {
    var p, y = {
      assert: function(g) {
        if (!y.has(g))
          throw new o("Side channel does not contain " + r(g));
      },
      delete: function(g) {
        if (p) {
          var S = f(p, g);
          return c(p) === 0 && (p = void 0), S;
        }
        return !1;
      },
      get: function(g) {
        if (p)
          return i(p, g);
      },
      has: function(g) {
        return p ? a(p, g) : !1;
      },
      set: function(g, S) {
        p || (p = new n()), u(p, g, S);
      }
    };
    return y;
  }, at;
}
var it, fo;
function Ja() {
  if (fo) return it;
  fo = 1;
  var t = /* @__PURE__ */ ye(), e = /* @__PURE__ */ ee(), r = /* @__PURE__ */ Ge(), o = ta(), n = /* @__PURE__ */ ne(), i = t("%WeakMap%", !0), u = e("WeakMap.prototype.get", !0), a = e("WeakMap.prototype.set", !0), f = e("WeakMap.prototype.has", !0), c = e("WeakMap.prototype.delete", !0);
  return it = i ? (
    /** @type {Exclude<import('.'), false>} */
    function() {
      var p, y, g = {
        assert: function(S) {
          if (!g.has(S))
            throw new n("Side channel does not contain " + r(S));
        },
        delete: function(S) {
          if (i && S && (typeof S == "object" || typeof S == "function")) {
            if (p)
              return c(p, S);
          } else if (o && y)
            return y.delete(S);
          return !1;
        },
        get: function(S) {
          return i && S && (typeof S == "object" || typeof S == "function") && p ? u(p, S) : y && y.get(S);
        },
        has: function(S) {
          return i && S && (typeof S == "object" || typeof S == "function") && p ? f(p, S) : !!y && y.has(S);
        },
        set: function(S, R) {
          i && S && (typeof S == "object" || typeof S == "function") ? (p || (p = new i()), a(p, S, R)) : o && (y || (y = o()), y.set(S, R));
        }
      };
      return g;
    }
  ) : o, it;
}
var ut, so;
function na() {
  if (so) return ut;
  so = 1;
  var t = /* @__PURE__ */ ne(), e = /* @__PURE__ */ Ge(), r = Va(), o = ta(), n = Ja(), i = n || o || r;
  return ut = function() {
    var a, f = {
      assert: function(c) {
        if (!f.has(c))
          throw new t("Side channel does not contain " + e(c));
      },
      delete: function(c) {
        return !!a && a.delete(c);
      },
      get: function(c) {
        return a && a.get(c);
      },
      has: function(c) {
        return !!a && a.has(c);
      },
      set: function(c, v) {
        a || (a = i()), a.set(c, v);
      }
    };
    return f;
  }, ut;
}
var ft, lo;
function Ya() {
  if (lo) return ft;
  lo = 1;
  var t = /* @__PURE__ */ Gt(), e = na()(), r = /* @__PURE__ */ ne(), o = {
    assert: function(n, i) {
      if (!n || typeof n != "object" && typeof n != "function")
        throw new r("`O` is not an object");
      if (typeof i != "string")
        throw new r("`slot` must be a string");
      if (e.assert(n), !o.has(n, i))
        throw new r("`" + i + "` is not present on `O`");
    },
    get: function(n, i) {
      if (!n || typeof n != "object" && typeof n != "function")
        throw new r("`O` is not an object");
      if (typeof i != "string")
        throw new r("`slot` must be a string");
      var u = e.get(n);
      return u && u[
        /** @type {SaltedInternalSlot} */
        "$" + i
      ];
    },
    has: function(n, i) {
      if (!n || typeof n != "object" && typeof n != "function")
        throw new r("`O` is not an object");
      if (typeof i != "string")
        throw new r("`slot` must be a string");
      var u = e.get(n);
      return !!u && t(
        u,
        /** @type {SaltedInternalSlot} */
        "$" + i
      );
    },
    set: function(n, i, u) {
      if (!n || typeof n != "object" && typeof n != "function")
        throw new r("`O` is not an object");
      if (typeof i != "string")
        throw new r("`slot` must be a string");
      var a = e.get(n);
      a || (a = {}, e.set(n, a)), a[
        /** @type {SaltedInternalSlot} */
        "$" + i
      ] = u;
    }
  };
  return Object.freeze && Object.freeze(o), ft = o, ft;
}
var st, co;
function Xa() {
  if (co) return st;
  co = 1;
  var t = Ya(), e = /* @__PURE__ */ Dt(), r = typeof StopIteration == "object" ? StopIteration : null;
  return st = function(n) {
    if (!r)
      throw new e("this environment lacks StopIteration");
    t.set(n, "[[Done]]", !1);
    var i = {
      next: (
        /** @type {() => IteratorResult<T>} */
        function() {
          var a = (
            /** @type {typeof origIterator} */
            t.get(this, "[[Iterator]]")
          ), f = !!t.get(a, "[[Done]]");
          try {
            return {
              done: f,
              // eslint-disable-next-line no-extra-parens
              value: f ? void 0 : (
                /** @type {T} */
                a.next()
              )
            };
          } catch (c) {
            if (t.set(a, "[[Done]]", !0), c !== r)
              throw c;
            return {
              done: !0,
              value: void 0
            };
          }
        }
      )
    };
    return t.set(i, "[[Iterator]]", n), i;
  }, st;
}
var lt, po;
function oa() {
  if (po) return lt;
  po = 1;
  var t = {}.toString;
  return lt = Array.isArray || function(e) {
    return t.call(e) == "[object Array]";
  }, lt;
}
var ct, yo;
function aa() {
  if (yo) return ct;
  yo = 1;
  var t = /* @__PURE__ */ ee(), e = t("String.prototype.valueOf"), r = function(a) {
    try {
      return e(a), !0;
    } catch {
      return !1;
    }
  }, o = t("Object.prototype.toString"), n = "[object String]", i = Pe()();
  return ct = function(a) {
    return typeof a == "string" ? !0 : !a || typeof a != "object" ? !1 : i ? r(a) : o(a) === n;
  }, ct;
}
var pt, vo;
function ia() {
  if (vo) return pt;
  vo = 1;
  var t = typeof Map == "function" && Map.prototype ? Map : null, e = typeof Set == "function" && Set.prototype ? Set : null, r;
  t || (r = function(u) {
    return !1;
  });
  var o = t ? Map.prototype.has : null, n = e ? Set.prototype.has : null;
  return !r && !o && (r = function(u) {
    return !1;
  }), pt = r || function(u) {
    if (!u || typeof u != "object")
      return !1;
    try {
      if (o.call(u), n)
        try {
          n.call(u);
        } catch {
          return !0;
        }
      return u instanceof t;
    } catch {
    }
    return !1;
  }, pt;
}
var yt, ho;
function ua() {
  if (ho) return yt;
  ho = 1;
  var t = typeof Map == "function" && Map.prototype ? Map : null, e = typeof Set == "function" && Set.prototype ? Set : null, r;
  e || (r = function(u) {
    return !1;
  });
  var o = t ? Map.prototype.has : null, n = e ? Set.prototype.has : null;
  return !r && !n && (r = function(u) {
    return !1;
  }), yt = r || function(u) {
    if (!u || typeof u != "object")
      return !1;
    try {
      if (n.call(u), o)
        try {
          o.call(u);
        } catch {
          return !0;
        }
      return u instanceof e;
    } catch {
    }
    return !1;
  }, yt;
}
var go;
function Za() {
  if (go) return Te.exports;
  go = 1;
  var t = /* @__PURE__ */ ra(), e = /* @__PURE__ */ Xa();
  if (Wt()() || He()()) {
    var r = Symbol.iterator;
    Te.exports = function(I) {
      if (I != null && typeof I[r] < "u")
        return I[r]();
      if (t(I))
        return Array.prototype[r].call(I);
    };
  } else {
    var o = oa(), n = aa(), i = /* @__PURE__ */ ye(), u = i("%Map%", !0), a = i("%Set%", !0), f = Zo(), c = f("Array.prototype.push"), v = f("String.prototype.charCodeAt"), p = f("String.prototype.slice"), y = function(I, _) {
      var U = I.length;
      if (_ + 1 >= U)
        return _ + 1;
      var N = v(I, _);
      if (N < 55296 || N > 56319)
        return _ + 1;
      var H = v(I, _ + 1);
      return H < 56320 || H > 57343 ? _ + 1 : _ + 2;
    }, g = function(I) {
      var _ = 0;
      return {
        next: function() {
          var N = _ >= I.length, H;
          return N || (H = I[_], _ += 1), {
            done: N,
            value: H
          };
        }
      };
    }, S = function(I, _) {
      if (o(I) || t(I))
        return g(I);
      if (n(I)) {
        var U = 0;
        return {
          next: function() {
            var H = y(I, U), V = p(I, U, H);
            return U = H, {
              done: H > I.length,
              value: V
            };
          }
        };
      }
      if (_ && typeof I["_es6-shim iterator_"] < "u")
        return I["_es6-shim iterator_"]();
    };
    if (!u && !a)
      Te.exports = function(I) {
        if (I != null)
          return S(I, !0);
      };
    else {
      var R = /* @__PURE__ */ ia(), d = /* @__PURE__ */ ua(), O = f("Map.prototype.forEach", !0), w = f("Set.prototype.forEach", !0);
      if (typeof process > "u" || !process.versions || !process.versions.node)
        var b = f("Map.prototype.iterator", !0), T = f("Set.prototype.iterator", !0);
      var Z = f("Map.prototype.@@iterator", !0) || f("Map.prototype._es6-shim iterator_", !0), G = f("Set.prototype.@@iterator", !0) || f("Set.prototype._es6-shim iterator_", !0), D = function(I) {
        if (R(I)) {
          if (b)
            return e(b(I));
          if (Z)
            return Z(I);
          if (O) {
            var _ = [];
            return O(I, function(N, H) {
              c(_, [H, N]);
            }), g(_);
          }
        }
        if (d(I)) {
          if (T)
            return e(T(I));
          if (G)
            return G(I);
          if (w) {
            var U = [];
            return w(I, function(N) {
              c(U, N);
            }), g(U);
          }
        }
      };
      Te.exports = function(I) {
        return D(I) || S(I);
      };
    }
  }
  return Te.exports;
}
var vt, mo;
function fa() {
  if (mo) return vt;
  mo = 1;
  var t = function(e) {
    return e !== e;
  };
  return vt = function(r, o) {
    return r === 0 && o === 0 ? 1 / r === 1 / o : !!(r === o || t(r) && t(o));
  }, vt;
}
var ht, So;
function sa() {
  if (So) return ht;
  So = 1;
  var t = fa();
  return ht = function() {
    return typeof Object.is == "function" ? Object.is : t;
  }, ht;
}
var dt, bo;
function Qa() {
  if (bo) return dt;
  bo = 1;
  var t = sa(), e = we();
  return dt = function() {
    var o = t();
    return e(Object, { is: o }, {
      is: function() {
        return Object.is !== o;
      }
    }), o;
  }, dt;
}
var gt, Oo;
function ei() {
  if (Oo) return gt;
  Oo = 1;
  var t = we(), e = Be(), r = fa(), o = sa(), n = Qa(), i = e(o(), Object);
  return t(i, {
    getPolyfill: o,
    implementation: r,
    shim: n
  }), gt = i, gt;
}
var mt, Ao;
function la() {
  if (Ao) return mt;
  Ao = 1;
  var t = Be(), e = /* @__PURE__ */ ee(), r = /* @__PURE__ */ ye(), o = r("%ArrayBuffer%", !0), n = e("ArrayBuffer.prototype.byteLength", !0), i = e("Object.prototype.toString"), u = !!o && !n && new o(0).slice, a = !!u && t(u);
  return mt = n || a ? function(c) {
    if (!c || typeof c != "object")
      return !1;
    try {
      return n ? n(c) : a(c, 0), !0;
    } catch {
      return !1;
    }
  } : o ? function(c) {
    return i(c) === "[object ArrayBuffer]";
  } : function(c) {
    return !1;
  }, mt;
}
var St, wo;
function ri() {
  if (wo) return St;
  wo = 1;
  var t = /* @__PURE__ */ ee(), e = t("Date.prototype.getDay"), r = function(a) {
    try {
      return e(a), !0;
    } catch {
      return !1;
    }
  }, o = t("Object.prototype.toString"), n = "[object Date]", i = Pe()();
  return St = function(a) {
    return typeof a != "object" || a === null ? !1 : i ? r(a) : o(a) === n;
  }, St;
}
var bt, Po;
function ca() {
  if (Po) return bt;
  Po = 1;
  var t = /* @__PURE__ */ ee(), e = Pe()(), r = /* @__PURE__ */ Gt(), o = /* @__PURE__ */ Ae(), n;
  if (e) {
    var i = t("RegExp.prototype.exec"), u = {}, a = function() {
      throw u;
    }, f = {
      toString: a,
      valueOf: a
    };
    typeof Symbol.toPrimitive == "symbol" && (f[Symbol.toPrimitive] = a), n = function(y) {
      if (!y || typeof y != "object")
        return !1;
      var g = (
        /** @type {NonNullable<typeof gOPD>} */
        o(
          /** @type {{ lastIndex?: unknown }} */
          y,
          "lastIndex"
        )
      ), S = g && r(g, "value");
      if (!S)
        return !1;
      try {
        i(
          y,
          /** @type {string} */
          /** @type {unknown} */
          f
        );
      } catch (R) {
        return R === u;
      }
    };
  } else {
    var c = t("Object.prototype.toString"), v = "[object RegExp]";
    n = function(y) {
      return !y || typeof y != "object" && typeof y != "function" ? !1 : c(y) === v;
    };
  }
  return bt = n, bt;
}
var Ot, Io;
function ti() {
  if (Io) return Ot;
  Io = 1;
  var t = /* @__PURE__ */ ee(), e = t("SharedArrayBuffer.prototype.byteLength", !0);
  return Ot = e ? function(o) {
    if (!o || typeof o != "object")
      return !1;
    try {
      return e(o), !0;
    } catch {
      return !1;
    }
  } : function(o) {
    return !1;
  }, Ot;
}
var At, qo;
function ni() {
  if (qo) return At;
  qo = 1;
  var t = /* @__PURE__ */ ee(), e = t("Number.prototype.toString"), r = function(a) {
    try {
      return e(a), !0;
    } catch {
      return !1;
    }
  }, o = t("Object.prototype.toString"), n = "[object Number]", i = Pe()();
  return At = function(a) {
    return typeof a == "number" ? !0 : !a || typeof a != "object" ? !1 : i ? r(a) : o(a) === n;
  }, At;
}
var wt, Ro;
function oi() {
  if (Ro) return wt;
  Ro = 1;
  var t = /* @__PURE__ */ ee(), e = t("Boolean.prototype.toString"), r = t("Object.prototype.toString"), o = function(a) {
    try {
      return e(a), !0;
    } catch {
      return !1;
    }
  }, n = "[object Boolean]", i = Pe()();
  return wt = function(a) {
    return typeof a == "boolean" ? !0 : a === null || typeof a != "object" ? !1 : i && Symbol.toStringTag in a ? o(a) : r(a) === n;
  }, wt;
}
var Fe = { exports: {} }, Pt, Eo;
function ai() {
  if (Eo) return Pt;
  Eo = 1;
  var t = /* @__PURE__ */ ee(), e = ca(), r = t("RegExp.prototype.exec"), o = /* @__PURE__ */ ne();
  return Pt = function(i) {
    if (!e(i))
      throw new o("`regex` must be a RegExp");
    return function(a) {
      return r(i, a) !== null;
    };
  }, Pt;
}
var $o;
function ii() {
  if ($o) return Fe.exports;
  $o = 1;
  var t = /* @__PURE__ */ ee(), e = t("Object.prototype.toString"), r = Wt()(), o = /* @__PURE__ */ ai();
  if (r) {
    var n = t("Symbol.prototype.toString"), i = o(/^Symbol\(.*\)$/), u = function(f) {
      return typeof f.valueOf() != "symbol" ? !1 : i(n(f));
    };
    Fe.exports = function(f) {
      if (typeof f == "symbol")
        return !0;
      if (!f || typeof f != "object" || e(f) !== "[object Symbol]")
        return !1;
      try {
        return u(f);
      } catch {
        return !1;
      }
    };
  } else
    Fe.exports = function(f) {
      return !1;
    };
  return Fe.exports;
}
var Ne = { exports: {} }, It, Bo;
function ui() {
  if (Bo) return It;
  Bo = 1;
  var t = typeof BigInt < "u" && BigInt;
  return It = function() {
    return typeof t == "function" && typeof BigInt == "function" && typeof t(42) == "bigint" && typeof BigInt(42) == "bigint";
  }, It;
}
var xo;
function fi() {
  if (xo) return Ne.exports;
  xo = 1;
  var t = ui()();
  if (t) {
    var e = BigInt.prototype.valueOf, r = function(n) {
      try {
        return e.call(n), !0;
      } catch {
      }
      return !1;
    };
    Ne.exports = function(n) {
      return n === null || typeof n > "u" || typeof n == "boolean" || typeof n == "string" || typeof n == "number" || typeof n == "symbol" || typeof n == "function" ? !1 : typeof n == "bigint" ? !0 : r(n);
    };
  } else
    Ne.exports = function(n) {
      return !1;
    };
  return Ne.exports;
}
var qt, Mo;
function si() {
  if (Mo) return qt;
  Mo = 1;
  var t = aa(), e = ni(), r = oi(), o = ii(), n = fi();
  return qt = function(u) {
    if (u == null || typeof u != "object" && typeof u != "function")
      return null;
    if (t(u))
      return "String";
    if (e(u))
      return "Number";
    if (r(u))
      return "Boolean";
    if (o(u))
      return "Symbol";
    if (n(u))
      return "BigInt";
  }, qt;
}
var Rt, To;
function li() {
  if (To) return Rt;
  To = 1;
  var t = typeof WeakMap == "function" && WeakMap.prototype ? WeakMap : null, e = typeof WeakSet == "function" && WeakSet.prototype ? WeakSet : null, r;
  t || (r = function(u) {
    return !1;
  });
  var o = t ? t.prototype.has : null, n = e ? e.prototype.has : null;
  return !r && !o && (r = function(u) {
    return !1;
  }), Rt = r || function(u) {
    if (!u || typeof u != "object")
      return !1;
    try {
      if (o.call(u, o), n)
        try {
          n.call(u, n);
        } catch {
          return !0;
        }
      return u instanceof t;
    } catch {
    }
    return !1;
  }, Rt;
}
var We = { exports: {} }, Co;
function ci() {
  if (Co) return We.exports;
  Co = 1;
  var t = /* @__PURE__ */ ye(), e = /* @__PURE__ */ ee(), r = t("%WeakSet%", !0), o = e("WeakSet.prototype.has", !0);
  if (o) {
    var n = e("WeakMap.prototype.has", !0);
    We.exports = function(u) {
      if (!u || typeof u != "object")
        return !1;
      try {
        if (o(u, o), n)
          try {
            n(u, n);
          } catch {
            return !0;
          }
        return u instanceof r;
      } catch {
      }
      return !1;
    };
  } else
    We.exports = function(u) {
      return !1;
    };
  return We.exports;
}
var Et, jo;
function pi() {
  if (jo) return Et;
  jo = 1;
  var t = /* @__PURE__ */ ia(), e = /* @__PURE__ */ ua(), r = li(), o = /* @__PURE__ */ ci();
  return Et = function(i) {
    if (i && typeof i == "object") {
      if (t(i))
        return "Map";
      if (e(i))
        return "Set";
      if (r(i))
        return "WeakMap";
      if (o(i))
        return "WeakSet";
    }
    return !1;
  }, Et;
}
var $t, ko;
function yi() {
  if (ko) return $t;
  ko = 1;
  var t = Function.prototype.toString, e = typeof Reflect == "object" && Reflect !== null && Reflect.apply, r, o;
  if (typeof e == "function" && typeof Object.defineProperty == "function")
    try {
      r = Object.defineProperty({}, "length", {
        get: function() {
          throw o;
        }
      }), o = {}, e(function() {
        throw 42;
      }, null, r);
    } catch (w) {
      w !== o && (e = null);
    }
  else
    e = null;
  var n = /^\s*class\b/, i = function(b) {
    try {
      var T = t.call(b);
      return n.test(T);
    } catch {
      return !1;
    }
  }, u = function(b) {
    try {
      return i(b) ? !1 : (t.call(b), !0);
    } catch {
      return !1;
    }
  }, a = Object.prototype.toString, f = "[object Object]", c = "[object Function]", v = "[object GeneratorFunction]", p = "[object HTMLAllCollection]", y = "[object HTML document.all class]", g = "[object HTMLCollection]", S = typeof Symbol == "function" && !!Symbol.toStringTag, R = !(0 in [,]), d = function() {
    return !1;
  };
  if (typeof document == "object") {
    var O = document.all;
    a.call(O) === a.call(document.all) && (d = function(b) {
      if ((R || !b) && (typeof b > "u" || typeof b == "object"))
        try {
          var T = a.call(b);
          return (T === p || T === y || T === g || T === f) && b("") == null;
        } catch {
        }
      return !1;
    });
  }
  return $t = e ? function(b) {
    if (d(b))
      return !0;
    if (!b || typeof b != "function" && typeof b != "object")
      return !1;
    try {
      e(b, null, r);
    } catch (T) {
      if (T !== o)
        return !1;
    }
    return !i(b) && u(b);
  } : function(b) {
    if (d(b))
      return !0;
    if (!b || typeof b != "function" && typeof b != "object")
      return !1;
    if (S)
      return u(b);
    if (i(b))
      return !1;
    var T = a.call(b);
    return T !== c && T !== v && !/^\[object HTML/.test(T) ? !1 : u(b);
  }, $t;
}
var Bt, Do;
function vi() {
  if (Do) return Bt;
  Do = 1;
  var t = yi(), e = Object.prototype.toString, r = Object.prototype.hasOwnProperty, o = function(f, c, v) {
    for (var p = 0, y = f.length; p < y; p++)
      r.call(f, p) && (v == null ? c(f[p], p, f) : c.call(v, f[p], p, f));
  }, n = function(f, c, v) {
    for (var p = 0, y = f.length; p < y; p++)
      v == null ? c(f.charAt(p), p, f) : c.call(v, f.charAt(p), p, f);
  }, i = function(f, c, v) {
    for (var p in f)
      r.call(f, p) && (v == null ? c(f[p], p, f) : c.call(v, f[p], p, f));
  }, u = function(f, c, v) {
    if (!t(c))
      throw new TypeError("iterator must be a function");
    var p;
    arguments.length >= 3 && (p = v), e.call(f) === "[object Array]" ? o(f, c, p) : typeof f == "string" ? n(f, c, p) : i(f, c, p);
  };
  return Bt = u, Bt;
}
var xt, _o;
function hi() {
  return _o || (_o = 1, xt = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ]), xt;
}
var Mt, Fo;
function di() {
  if (Fo) return Mt;
  Fo = 1;
  var t = /* @__PURE__ */ hi(), e = typeof globalThis > "u" ? Le : globalThis;
  return Mt = function() {
    for (var o = [], n = 0; n < t.length; n++)
      typeof e[t[n]] == "function" && (o[o.length] = t[n]);
    return o;
  }, Mt;
}
var Tt, No;
function gi() {
  if (No) return Tt;
  No = 1;
  var t = vi(), e = /* @__PURE__ */ di(), r = Be(), o = /* @__PURE__ */ ee(), n = /* @__PURE__ */ Ae(), i = o("Object.prototype.toString"), u = Pe()(), a = typeof globalThis > "u" ? Le : globalThis, f = e(), c = o("String.prototype.slice"), v = Object.getPrototypeOf, p = o("Array.prototype.indexOf", !0) || function(d, O) {
    for (var w = 0; w < d.length; w += 1)
      if (d[w] === O)
        return w;
    return -1;
  }, y = { __proto__: null };
  u && n && v ? t(f, function(R) {
    var d = new a[R]();
    if (Symbol.toStringTag in d) {
      var O = v(d), w = n(O, Symbol.toStringTag);
      if (!w) {
        var b = v(O);
        w = n(b, Symbol.toStringTag);
      }
      y["$" + R] = r(w.get);
    }
  }) : t(f, function(R) {
    var d = new a[R](), O = d.slice || d.set;
    O && (y["$" + R] = r(O));
  });
  var g = function(d) {
    var O = !1;
    return t(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      y,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(w, b) {
        if (!O)
          try {
            "$" + w(d) === b && (O = c(b, 1));
          } catch {
          }
      }
    ), O;
  }, S = function(d) {
    var O = !1;
    return t(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      y,
      /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
      function(w, b) {
        if (!O)
          try {
            w(d), O = c(b, 1);
          } catch {
          }
      }
    ), O;
  };
  return Tt = function(d) {
    if (!d || typeof d != "object")
      return !1;
    if (!u) {
      var O = c(i(d), 8, -1);
      return p(f, O) > -1 ? O : O !== "Object" ? !1 : S(d);
    }
    return n ? g(d) : null;
  }, Tt;
}
var Ct, Wo;
function mi() {
  if (Wo) return Ct;
  Wo = 1;
  var t = /* @__PURE__ */ ee(), e = t("ArrayBuffer.prototype.byteLength", !0), r = /* @__PURE__ */ la();
  return Ct = function(n) {
    return r(n) ? e ? e(n) : n.byteLength : NaN;
  }, Ct;
}
var jt, Lo;
function Si() {
  if (Lo) return jt;
  Lo = 1;
  var t = Na(), e = Zo(), r = Ha(), o = /* @__PURE__ */ ye(), n = Za(), i = na(), u = ei(), a = /* @__PURE__ */ ra(), f = oa(), c = /* @__PURE__ */ la(), v = /* @__PURE__ */ ri(), p = ca(), y = /* @__PURE__ */ ti(), g = kt(), S = si(), R = /* @__PURE__ */ pi(), d = /* @__PURE__ */ gi(), O = /* @__PURE__ */ mi(), w = e("SharedArrayBuffer.prototype.byteLength", !0), b = e("Date.prototype.getTime"), T = Object.getPrototypeOf, Z = e("Object.prototype.toString"), G = o("%Set%", !0), D = e("Map.prototype.has", !0), k = e("Map.prototype.get", !0), I = e("Map.prototype.size", !0), _ = e("Set.prototype.add", !0), U = e("Set.prototype.delete", !0), N = e("Set.prototype.has", !0), H = e("Set.prototype.size", !0);
  function V(h, m, M, $) {
    for (var B = n(h), C; (C = B.next()) && !C.done; )
      if (z(m, C.value, M, $))
        return U(h, C.value), !0;
    return !1;
  }
  function K(h) {
    if (typeof h > "u")
      return null;
    if (typeof h != "object")
      return typeof h == "symbol" ? !1 : typeof h == "string" || typeof h == "number" ? +h == +h : !0;
  }
  function Ie(h, m, M, $, B, C) {
    var P = K(M);
    if (P != null)
      return P;
    var q = k(m, P), A = t({}, B, { strict: !1 });
    return typeof q > "u" && !D(m, P) || !z($, q, A, C) ? !1 : !D(h, P) && z($, q, A, C);
  }
  function me(h, m, M) {
    var $ = K(M);
    return $ ?? (N(m, $) && !N(h, $));
  }
  function oe(h, m, M, $, B, C) {
    for (var P = n(h), q, A; (q = P.next()) && !q.done; )
      if (A = q.value, // eslint-disable-next-line no-use-before-define
      z(M, A, B, C) && z($, k(m, A), B, C))
        return U(h, A), !0;
    return !1;
  }
  function z(h, m, M, $) {
    var B = M || {};
    if (B.strict ? u(h, m) : h === m)
      return !0;
    var C = S(h), P = S(m);
    if (C !== P)
      return !1;
    if (!h || !m || typeof h != "object" && typeof m != "object")
      return B.strict ? u(h, m) : h == m;
    var q = $.has(h), A = $.has(m), E;
    if (q && A) {
      if ($.get(h) === $.get(m))
        return !0;
    } else
      E = {};
    return q || $.set(h, E), A || $.set(m, E), ve(h, m, B, $);
  }
  function Se(h) {
    return !h || typeof h != "object" || typeof h.length != "number" || typeof h.copy != "function" || typeof h.slice != "function" || h.length > 0 && typeof h[0] != "number" ? !1 : !!(h.constructor && h.constructor.isBuffer && h.constructor.isBuffer(h));
  }
  function qe(h, m, M, $) {
    if (H(h) !== H(m))
      return !1;
    for (var B = n(h), C = n(m), P, q, A; (P = B.next()) && !P.done; )
      if (P.value && typeof P.value == "object")
        A || (A = new G()), _(A, P.value);
      else if (!N(m, P.value)) {
        if (M.strict || !me(h, m, P.value))
          return !1;
        A || (A = new G()), _(A, P.value);
      }
    if (A) {
      for (; (q = C.next()) && !q.done; )
        if (q.value && typeof q.value == "object") {
          if (!V(A, q.value, M.strict, $))
            return !1;
        } else if (!M.strict && !N(h, q.value) && !V(A, q.value, M.strict, $))
          return !1;
      return H(A) === 0;
    }
    return !0;
  }
  function be(h, m, M, $) {
    if (I(h) !== I(m))
      return !1;
    for (var B = n(h), C = n(m), P, q, A, E, J, Y; (P = B.next()) && !P.done; )
      if (E = P.value[0], J = P.value[1], E && typeof E == "object")
        A || (A = new G()), _(A, E);
      else if (Y = k(m, E), typeof Y > "u" && !D(m, E) || !z(J, Y, M, $)) {
        if (M.strict || !Ie(h, m, E, J, M, $))
          return !1;
        A || (A = new G()), _(A, E);
      }
    if (A) {
      for (; (q = C.next()) && !q.done; )
        if (E = q.value[0], Y = q.value[1], E && typeof E == "object") {
          if (!oe(A, h, E, Y, M, $))
            return !1;
        } else if (!M.strict && (!h.has(E) || !z(k(h, E), Y, M, $)) && !oe(A, h, E, Y, t({}, M, { strict: !1 }), $))
          return !1;
      return H(A) === 0;
    }
    return !0;
  }
  function ve(h, m, M, $) {
    var B, C;
    if (typeof h != typeof m || h == null || m == null || Z(h) !== Z(m) || a(h) !== a(m))
      return !1;
    var P = f(h), q = f(m);
    if (P !== q)
      return !1;
    var A = h instanceof Error, E = m instanceof Error;
    if (A !== E || (A || E) && (h.name !== m.name || h.message !== m.message))
      return !1;
    var J = p(h), Y = p(m);
    if (J !== Y || (J || Y) && (h.source !== m.source || r(h) !== r(m)))
      return !1;
    var F = v(h), Q = v(m);
    if (F !== Q || (F || Q) && b(h) !== b(m) || M.strict && T && T(h) !== T(m))
      return !1;
    var he = d(h), ie = d(m);
    if (he !== ie)
      return !1;
    if (he || ie) {
      if (h.length !== m.length)
        return !1;
      for (B = 0; B < h.length; B++)
        if (h[B] !== m[B])
          return !1;
      return !0;
    }
    var ue = Se(h), re = Se(m);
    if (ue !== re)
      return !1;
    if (ue || re) {
      if (h.length !== m.length)
        return !1;
      for (B = 0; B < h.length; B++)
        if (h[B] !== m[B])
          return !1;
      return !0;
    }
    var fe = c(h), se = c(m);
    if (fe !== se)
      return !1;
    if (fe || se)
      return O(h) !== O(m) ? !1 : typeof Uint8Array == "function" && z(new Uint8Array(h), new Uint8Array(m), M, $);
    var le = y(h), je = y(m);
    if (le !== je)
      return !1;
    if (le || je)
      return w(h) !== w(m) ? !1 : typeof Uint8Array == "function" && z(new Uint8Array(h), new Uint8Array(m), M, $);
    if (typeof h != typeof m)
      return !1;
    var ce = g(h), xe = g(m);
    if (ce.length !== xe.length)
      return !1;
    for (ce.sort(), xe.sort(), B = ce.length - 1; B >= 0; B--)
      if (ce[B] != xe[B])
        return !1;
    for (B = ce.length - 1; B >= 0; B--)
      if (C = ce[B], !z(h[C], m[C], M, $))
        return !1;
    var pe = R(h), Re = R(m);
    return pe !== Re ? !1 : pe === "Set" || Re === "Set" ? qe(h, m, M, $) : pe === "Map" ? be(h, m, M, $) : !0;
  }
  return jt = function(m, M, $) {
    return z(m, M, $, i());
  }, jt;
}
var bi = Si();
const Oi = /* @__PURE__ */ ma(bi);
class Uo {
  /**
   * get/set caret position
   * @param {HTMLColletion} target
   */
  constructor(e) {
    this.target = e, this.isContentEditable = e && e.contentEditable;
  }
  /**
   * get caret position
   * @returns {number} : -1 if elememnt is not in focus
   */
  getPos() {
    if (document.activeElement !== this.target)
      return -1;
    if (this.isContentEditable === "true") {
      this.target.focus();
      let e = document.getSelection().getRangeAt(0), r = e.cloneRange();
      return r.selectNodeContents(this.target), r.setEnd(e.endContainer, e.endOffset), r.toString().length;
    }
    return this.target.selectionStart;
  }
  /**
   * set caret position
   * @param {number} position - caret position
   */
  setPos(e) {
    if (this.isContentEditable === "true") {
      if (e >= 0) {
        var r = window.getSelection(), o = this.createRange(this.target, {
          count: e
        });
        o && (o.collapse(!1), r.removeAllRanges(), r.addRange(o));
      }
    } else
      this.target.setSelectionRange(e, e);
  }
  createRange(e, r, o) {
    if (o || (o = document.createRange(), o.selectNode(e), o.setStart(e, 0)), r.count === 0)
      o.setEnd(e, r.count);
    else if (e && r.count > 0)
      if (e.nodeType === Node.TEXT_NODE)
        e.textContent.length < r.count ? r.count -= e.textContent.length : (o.setEnd(e, r.count), r.count = 0);
      else
        for (var n = 0; n < e.childNodes.length && (o = this.createRange(e.childNodes[n], r, o), r.count !== 0); n++)
          ;
    return o;
  }
}
class Ai {
  /**
   * Creates a new instance of the Observer object.
   * @param {Function} registerChange - Function that register a change in the history stack.
   * @param {String} holder - Editor.js holder id.
   * @param {Number} debounceTimer Delay time for the debouncer.
   */
  constructor(e, r, o) {
    X(this, "debounceTimer");
    X(this, "holder");
    X(this, "mutationDebouncer");
    X(this, "observer");
    this.holder = r, this.observer = null, this.debounceTimer = o, this.mutationDebouncer = this.debounce(() => {
      e();
    }, this.debounceTimer);
  }
  /**
   * Sets a mutation observer to catch every change in the editor.
   */
  setMutationObserver() {
    const e = {
      childList: !0,
      attributes: !0,
      subtree: !0,
      characterData: !0,
      characterDataOldValue: !0
    }, r = this.holder.querySelector(".codex-editor__redactor");
    this.observer = new MutationObserver((o) => {
      this.mutationHandler(o);
    }), this.observer.observe(r, e);
  }
  /**
   * Handles the mutations and checks if a new mutation has been produced.
   * @param {Object} mutationList The registered mutations
   */
  mutationHandler(e) {
    let r = !1;
    e.forEach((o) => {
      switch (o.type) {
        case "childList":
          o.target === this.holder ? this.onDestroy() : r = !0;
          break;
        case "characterData":
          r = !0;
          break;
        case "attributes":
          o.target instanceof Element && !o.target.classList.contains("ce-block") && !o.target.classList.contains("tc-toolbox") && (r = !0);
          break;
      }
    }), r && this.mutationDebouncer();
  }
  /**
   * Delays invoking a function until after wait millis have elapsed.
   * @param {Function} callback The function to be delayed.
   * @param {Number} wait The deplay time in millis.
   */
  debounce(e, r) {
    let o;
    return (...n) => {
      const i = this;
      window.clearTimeout(o), o = window.setTimeout(() => e.apply(i, n), r);
    };
  }
  onDestroy() {
    const e = new CustomEvent("destroy");
    document.dispatchEvent(e), this.observer != null && this.observer.disconnect();
  }
}
class Pi {
  /**
   * @param options — Plugin custom options.
   */
  constructor({
    editor: e,
    config: r = {},
    onUpdate: o = () => {
    },
    maxLength: n
  }) {
    X(this, "blocks");
    X(this, "caret");
    X(this, "config");
    X(this, "defaultBlock");
    X(this, "editor");
    X(this, "holder");
    X(this, "initialItem");
    X(this, "maxLength");
    X(this, "onUpdate");
    X(this, "position", 0);
    X(this, "readOnly");
    X(this, "shouldSaveHistory");
    X(this, "stack", []);
    const i = {
      maxLength: 30,
      onUpdate() {
      },
      config: {
        debounceTimer: 200,
        shortcuts: {
          undo: ["CMD+Z"],
          redo: ["CMD+Y", "CMD+SHIFT+Z"]
        }
      }
    }, u = e, { blocks: a, caret: f } = u, { configuration: c } = u, { holder: v, defaultBlock: p } = c, y = i.config.shortcuts, { shortcuts: g } = r, S = { ...y, ...g }, R = Array.isArray(S.undo) ? S.undo : [S.undo], d = Array.isArray(S.redo) ? S.redo : [S.redo], O = i.config.debounceTimer, { debounceTimer: w = O } = r;
    this.holder = typeof v == "string" ? document.getElementById(v) : v, this.editor = u, this.defaultBlock = p, this.blocks = a, this.caret = f, this.shouldSaveHistory = !0, this.readOnly = c.readOnly, this.maxLength = n || i.maxLength, this.onUpdate = o || i.onUpdate, this.config = { debounceTimer: w, shortcuts: { undo: R, redo: d } }, this.holder && new Ai(
      () => this.registerChange(),
      this.holder,
      this.config.debounceTimer
    ).setMutationObserver(), this.setEventListeners(), this.initialItem = null, this.clear();
  }
  /**
   * Notify core that read-only mode is suppoorted
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Truncates the history stack when it excedes the limit of changes.
   *
   * @param {Object} stack  Changes history stack.
   * @param {Number} stack  Limit of changes recorded by the history stack.
   */
  truncate(e, r) {
    for (; e.length > r; )
      e.shift();
  }
  /**
   * Initializes the stack when the user provides initial data.
   *
   * @param {Object} initialItem  Initial data provided by the user.
   */
  initialize(e) {
    const r = "blocks" in e ? e.blocks : e, n = { index: r.length - 1, state: r };
    this.stack[0] = n, this.initialItem = n;
  }
  /**
   * Clears the history stack.
   */
  clear() {
    this.stack = this.initialItem ? [this.initialItem] : [
      {
        index: 0,
        state: [{ type: this.defaultBlock, data: {} }]
      }
    ], this.position = 0, this.onUpdate();
  }
  /**
   * Returns true if readOnly was toggled to true
   * @returns {Node} Indirectly shows if readOnly was set to true or false
   */
  setReadOnly() {
    var r;
    const e = (r = this.holder) == null ? void 0 : r.querySelector(".ce-toolbox");
    this.readOnly = !e;
  }
  /**
   * Registers the data returned by API's save method into the history stack.
   */
  registerChange() {
    this.setReadOnly(), this.readOnly || (this.editor && this.editor.save && this.shouldSaveHistory && this.editor.save().then((e) => {
      this.editorDidUpdate(e.blocks) && this.save(e.blocks);
    }), this.shouldSaveHistory = !0);
  }
  /**
   * Checks if the saved data has to be added to the history stack.
   *
   * @param {Object} newData  New data to be saved in the history stack.
   * @returns {Boolean}
   */
  editorDidUpdate(e) {
    const { state: r } = this.stack[this.position];
    return e.length ? e.length !== r.length ? !0 : JSON.stringify(r) !== JSON.stringify(e) : !1;
  }
  /**
   * Adds the saved data in the history stack and updates current position.
   */
  save(e) {
    this.position >= this.maxLength && this.truncate(this.stack, this.maxLength), this.position = Math.min(this.position, this.stack.length - 1), this.stack = this.stack.slice(0, this.position + 1);
    const r = this.blocks.getCurrentBlockIndex(), o = this.blocks.getBlocksCount();
    let n = r;
    e[r] || (n -= o - e.length);
    const i = e[n] && (e[n].type === "paragraph" || e[n].type === "header") ? this.getCaretIndex(r) : null;
    this.stack.push({ index: n, state: e, caretIndex: i }), this.position += 1, this.onUpdate();
  }
  /**
   * Gets the caret position.
   * @param {Number} index is the block index
   * @returns The caret position
   */
  getCaretIndex(e) {
    var o;
    const r = (o = this.holder) == null ? void 0 : o.getElementsByClassName("ce-block__content");
    return r ? new Uo(r[e].firstChild).getPos() : null;
  }
  /**
   * Decreases the current position and update the respective block in the editor.
   */
  async undo() {
    if (this.canUndo()) {
      const { state: e } = this.stack[this.position];
      this.position -= 1, this.shouldSaveHistory = !1;
      const { caretIndex: r, index: o, state: n } = this.stack[this.position];
      await this.switchState(n, e), this.onUpdate(), this.blocks.getBlockByIndex(o) && (r ? this.setCaretIndex(o, r) : this.caret.setToBlock(o, "end"));
    }
  }
  /**
   * Sets the caret position.
   * @param {Number} index is the block index
   * @param {Number} caretIndex is the caret position
   * @param {Array} state is the current state according to this.position.
   */
  setCaretIndex(e, r) {
    var n;
    const o = (n = this.holder) == null ? void 0 : n.getElementsByClassName("ce-block__content");
    if (r && r !== -1 && o) {
      const i = new Uo(o[e].firstChild);
      setTimeout(() => i.setPos(r), 50);
    } else
      this.caret.setToBlock(e, "end");
  }
  /**
   * Inserts new block
   * @param {Array} state is the current state according to this.position.
   * @param {Number} index is the block index
   */
  insertBlock(e, r) {
    this.blocks.insert(e[r].type, e[r].data, {}, r, !0);
  }
  /**
   * Updates the passed block or render the state when the content was copied.
   * @param {Array} state is the current state according to this.position.
   * @param {Number} index is the block index.
   */
  async updateModifiedBlock(e, r) {
    const o = e[r];
    return o.id && this.editor.blocks.getById(o.id) ? this.blocks.update(o.id, o.data, o.tunes) : this.blocks.render({ blocks: e });
  }
  /**
   * Increases the current position and update the respective block in the editor.
   */
  async redo() {
    if (this.canRedo()) {
      this.position += 1, this.shouldSaveHistory = !1;
      const { caretIndex: e, index: r, state: o } = this.stack[this.position], { state: n } = this.stack[this.position - 1];
      await this.switchState(o, n), this.onUpdate(), this.blocks.getBlockByIndex(r) && (e ? this.setCaretIndex(r, e) : this.caret.setToBlock(r, "end"));
    }
  }
  async switchState(e, r) {
    r.reduce(
      (n, i, u) => e.find((a) => a.id === i.id) ? n : [...n, u],
      []
    ).sort((n, i) => i - n).forEach((n) => this.blocks.delete(n)), e.reduce((n, i, u) => r.find((a) => a.id === i.id) ? n : [...n, u], []).forEach((n) => this.insertBlock(e, n));
    const o = e.reduce((n, i, u) => {
      const a = r.findIndex((f) => f.id === i.id);
      return a > -1 && !Oi(i, r[a]) ? [...n, u] : n;
    }, []);
    await Promise.all(
      o.map(async (n) => await this.updateModifiedBlock(e, n))
    );
  }
  /**
   * Checks if the history stack can perform an undo action.
   *
   * @returns {Boolean}
   */
  canUndo() {
    return !this.readOnly && this.position > 0;
  }
  /**
   * Checks if the history stack can perform a redo action.
   *
   * @returns {Boolean}
   */
  canRedo() {
    return !this.readOnly && this.position < this.count();
  }
  /**
   * Returns the number of changes recorded in the history stack.
   *
   * @returns {Number}
   */
  count() {
    return this.stack.length - 1;
  }
  /**
   * Parses the keys passed in the shortcut property to accept CMD,ALT and SHIFT
   *
   * @param {Array} keys are the keys passed in shortcuts in config
   * @returns {Array}
   */
  parseKeys(e) {
    const r = {
      CMD: /(Mac)/i.test(navigator.platform) ? "metaKey" : "ctrlKey",
      ALT: "altKey",
      SHIFT: "shiftKey"
    }, o = e.slice(0, -1).map((i) => r[i]), n = o.includes("shiftKey") && e.length === 2 ? e[e.length - 1].toUpperCase() : e[e.length - 1].toLowerCase();
    return o.push(n), o;
  }
  /**
   * Sets events listeners to allow keyboard actions support
   */
  setEventListeners() {
    const { holder: e } = this, { shortcuts: r } = this.config, { redo: o, undo: n } = r, i = n.map(
      (d) => d.replace(/ /g, "").split("+")
    ), u = o.map(
      (d) => d.replace(/ /g, "").split("+")
    ), a = i.map((d) => this.parseKeys(d)), f = u.map((d) => this.parseKeys(d)), c = (d, O) => O.length === 2 && d[O[0]] && d.key.toLowerCase() === O[1], v = (d, O) => O.length === 3 && d[O[0]] && d[O[1]] && d.key.toLowerCase() === O[2], p = (d, O) => O.reduce(
      (w, b) => w || c(d, b),
      !1
    ), y = (d, O) => O.reduce(
      (w, b) => w || v(d, b),
      !1
    ), g = (d, O, w) => !!(p(d, O) && !y(d, w) || y(d, O)), S = (d) => {
      g(d, a, f) && (d.preventDefault(), this.undo());
    }, R = (d) => {
      g(d, f, a) && (d.preventDefault(), this.redo());
    };
    if (e) {
      const d = () => {
        e.removeEventListener("keydown", S), e.removeEventListener("keydown", R);
      };
      e.addEventListener("keydown", S), e.addEventListener("keydown", R), e.addEventListener("destroy", d);
    }
  }
}
export {
  Pi as default
};
