var $y = Object.defineProperty;
var Ry = (r, e, t) => e in r ? $y(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var Sr = (r, e, t) => Ry(r, typeof e != "symbol" ? e + "" : e, t);
var ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Fy(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function By(r) {
  if (r.__esModule) return r;
  var e = r.default;
  if (typeof e == "function") {
    var t = function a() {
      return this instanceof a ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(a) {
    var n = Object.getOwnPropertyDescriptor(r, a);
    Object.defineProperty(t, a, n.get ? n : {
      enumerable: !0,
      get: function() {
        return r[a];
      }
    });
  }), t;
}
var je, bo;
function ay() {
  if (bo) return je;
  bo = 1;
  var r = Object.prototype.toString;
  return je = function(t) {
    var a = r.call(t), n = a === "[object Arguments]";
    return n || (n = a !== "[object Array]" && t !== null && typeof t == "object" && typeof t.length == "number" && t.length >= 0 && r.call(t.callee) === "[object Function]"), n;
  }, je;
}
var Me, Po;
function Uy() {
  if (Po) return Me;
  Po = 1;
  var r;
  if (!Object.keys) {
    var e = Object.prototype.hasOwnProperty, t = Object.prototype.toString, a = ay(), n = Object.prototype.propertyIsEnumerable, i = !n.call({ toString: null }, "toString"), o = n.call(function() {
    }, "prototype"), y = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ], f = function(E) {
      var $ = E.constructor;
      return $ && $.prototype === E;
    }, g = {
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
    }, h = function() {
      if (typeof window > "u")
        return !1;
      for (var E in window)
        try {
          if (!g["$" + E] && e.call(window, E) && window[E] !== null && typeof window[E] == "object")
            try {
              f(window[E]);
            } catch {
              return !0;
            }
        } catch {
          return !0;
        }
      return !1;
    }(), v = function(E) {
      if (typeof window > "u" || !h)
        return f(E);
      try {
        return f(E);
      } catch {
        return !1;
      }
    };
    r = function($) {
      var j = $ !== null && typeof $ == "object", I = t.call($) === "[object Function]", b = a($), U = j && t.call($) === "[object String]", A = [];
      if (!j && !I && !b)
        throw new TypeError("Object.keys called on a non-object");
      var F = o && I;
      if (U && $.length > 0 && !e.call($, 0))
        for (var z = 0; z < $.length; ++z)
          A.push(String(z));
      if (b && $.length > 0)
        for (var K = 0; K < $.length; ++K)
          A.push(String(K));
      else
        for (var D in $)
          !(F && D === "prototype") && e.call($, D) && A.push(String(D));
      if (i)
        for (var O = v($), Q = 0; Q < y.length; ++Q)
          !(O && y[Q] === "constructor") && e.call($, y[Q]) && A.push(y[Q]);
      return A;
    };
  }
  return Me = r, Me;
}
var _e, Oo;
function vo() {
  if (Oo) return _e;
  Oo = 1;
  var r = Array.prototype.slice, e = ay(), t = Object.keys, a = t ? function(o) {
    return t(o);
  } : Uy(), n = Object.keys;
  return a.shim = function() {
    if (Object.keys) {
      var o = function() {
        var y = Object.keys(arguments);
        return y && y.length === arguments.length;
      }(1, 2);
      o || (Object.keys = function(f) {
        return e(f) ? n(r.call(f)) : n(f);
      });
    } else
      Object.keys = a;
    return Object.keys || a;
  }, _e = a, _e;
}
var De, Io;
function Rr() {
  return Io || (Io = 1, De = Error), De;
}
var Ne, Eo;
function jr() {
  return Eo || (Eo = 1, Ne = EvalError), Ne;
}
var Te, wo;
function Mr() {
  return wo || (wo = 1, Te = RangeError), Te;
}
var ke, $o;
function _r() {
  return $o || ($o = 1, ke = ReferenceError), ke;
}
var Ce, Ro;
function Er() {
  return Ro || (Ro = 1, Ce = SyntaxError), Ce;
}
var Ge, Fo;
function gr() {
  return Fo || (Fo = 1, Ge = TypeError), Ge;
}
var We, Bo;
function Dr() {
  return Bo || (Bo = 1, We = URIError), We;
}
var Le, Uo;
function go() {
  return Uo || (Uo = 1, Le = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), a = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
      return !1;
    var n = 42;
    e[t] = n;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var i = Object.getOwnPropertySymbols(e);
    if (i.length !== 1 || i[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var o = Object.getOwnPropertyDescriptor(e, t);
      if (o.value !== n || o.enumerable !== !0)
        return !1;
    }
    return !0;
  }), Le;
}
var He, qo;
function ho() {
  if (qo) return He;
  qo = 1;
  var r = typeof Symbol < "u" && Symbol, e = go();
  return He = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, He;
}
var Ve, xo;
function Be() {
  if (xo) return Ve;
  xo = 1;
  var r = {
    __proto__: null,
    foo: {}
  }, e = Object;
  return Ve = function() {
    return { __proto__: r }.foo === r.foo && !(r instanceof e);
  }, Ve;
}
var Je, jo;
function qy() {
  if (jo) return Je;
  jo = 1;
  var r = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, t = Math.max, a = "[object Function]", n = function(f, g) {
    for (var h = [], v = 0; v < f.length; v += 1)
      h[v] = f[v];
    for (var E = 0; E < g.length; E += 1)
      h[E + f.length] = g[E];
    return h;
  }, i = function(f, g) {
    for (var h = [], v = g, E = 0; v < f.length; v += 1, E += 1)
      h[E] = f[v];
    return h;
  }, o = function(y, f) {
    for (var g = "", h = 0; h < y.length; h += 1)
      g += y[h], h + 1 < y.length && (g += f);
    return g;
  };
  return Je = function(f) {
    var g = this;
    if (typeof g != "function" || e.apply(g) !== a)
      throw new TypeError(r + g);
    for (var h = i(arguments, 1), v, E = function() {
      if (this instanceof v) {
        var U = g.apply(
          this,
          n(h, arguments)
        );
        return Object(U) === U ? U : this;
      }
      return g.apply(
        f,
        n(h, arguments)
      );
    }, $ = t(0, g.length - h.length), j = [], I = 0; I < $; I++)
      j[I] = "$" + I;
    if (v = Function("binder", "return function (" + o(j, ",") + "){ return binder.apply(this,arguments); }")(E), g.prototype) {
      var b = function() {
      };
      b.prototype = g.prototype, v.prototype = new b(), b.prototype = null;
    }
    return v;
  }, Je;
}
var ze, Mo;
function Or() {
  if (Mo) return ze;
  Mo = 1;
  var r = qy();
  return ze = Function.prototype.bind || r, ze;
}
var Ke, _o;
function Fr() {
  if (_o) return Ke;
  _o = 1;
  var r = Function.prototype.call, e = Object.prototype.hasOwnProperty, t = Or();
  return Ke = t.call(r, e), Ke;
}
var Ye, Do;
function Vr() {
  if (Do) return Ye;
  Do = 1;
  var r, e = /* @__PURE__ */ Rr(), t = /* @__PURE__ */ jr(), a = /* @__PURE__ */ Mr(), n = /* @__PURE__ */ _r(), i = /* @__PURE__ */ Er(), o = /* @__PURE__ */ gr(), y = /* @__PURE__ */ Dr(), f = Function, g = function(N) {
    try {
      return f('"use strict"; return (' + N + ").constructor;")();
    } catch {
    }
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch {
      h = null;
    }
  var v = function() {
    throw new o();
  }, E = h ? function() {
    try {
      return arguments.callee, v;
    } catch {
      try {
        return h(arguments, "callee").get;
      } catch {
        return v;
      }
    }
  }() : v, $ = ho()(), j = /* @__PURE__ */ Be()(), I = Object.getPrototypeOf || (j ? function(N) {
    return N.__proto__;
  } : null), b = {}, U = typeof Uint8Array > "u" || !I ? r : I(Uint8Array), A = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": $ && I ? I([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": b,
    "%AsyncGenerator%": b,
    "%AsyncGeneratorFunction%": b,
    "%AsyncIteratorPrototype%": b,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": t,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": f,
    "%GeneratorFunction%": b,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": $ && I ? I(I([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !$ || !I ? r : I((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": a,
    "%ReferenceError%": n,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !$ || !I ? r : I((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": $ && I ? I(""[Symbol.iterator]()) : r,
    "%Symbol%": $ ? Symbol : r,
    "%SyntaxError%": i,
    "%ThrowTypeError%": E,
    "%TypedArray%": U,
    "%TypeError%": o,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": y,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet
  };
  if (I)
    try {
      null.error;
    } catch (N) {
      var F = I(I(N));
      A["%Error.prototype%"] = F;
    }
  var z = function N(P) {
    var R;
    if (P === "%AsyncFunction%")
      R = g("async function () {}");
    else if (P === "%GeneratorFunction%")
      R = g("function* () {}");
    else if (P === "%AsyncGeneratorFunction%")
      R = g("async function* () {}");
    else if (P === "%AsyncGenerator%") {
      var q = N("%AsyncGeneratorFunction%");
      q && (R = q.prototype);
    } else if (P === "%AsyncIteratorPrototype%") {
      var M = N("%AsyncGenerator%");
      M && I && (R = I(M.prototype));
    }
    return A[P] = R, R;
  }, K = {
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
  }, D = Or(), O = /* @__PURE__ */ Fr(), Q = D.call(Function.call, Array.prototype.concat), Y = D.call(Function.apply, Array.prototype.splice), er = D.call(Function.call, String.prototype.replace), G = D.call(Function.call, String.prototype.slice), H = D.call(Function.call, RegExp.prototype.exec), or = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, V = /\\(\\)?/g, nr = function(P) {
    var R = G(P, 0, 1), q = G(P, -1);
    if (R === "%" && q !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    if (q === "%" && R !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var M = [];
    return er(P, or, function(J, X, u, x) {
      M[M.length] = u ? er(x, V, "$1") : X || J;
    }), M;
  }, dr = function(P, R) {
    var q = P, M;
    if (O(K, q) && (M = K[q], q = "%" + M[0] + "%"), O(A, q)) {
      var J = A[q];
      if (J === b && (J = z(q)), typeof J > "u" && !R)
        throw new o("intrinsic " + P + " exists, but is not available. Please file an issue!");
      return {
        alias: M,
        name: q,
        value: J
      };
    }
    throw new i("intrinsic " + P + " does not exist!");
  };
  return Ye = function(P, R) {
    if (typeof P != "string" || P.length === 0)
      throw new o("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof R != "boolean")
      throw new o('"allowMissing" argument must be a boolean');
    if (H(/^%?[^%]*%?$/, P) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var q = nr(P), M = q.length > 0 ? q[0] : "", J = dr("%" + M + "%", R), X = J.name, u = J.value, x = !1, L = J.alias;
    L && (M = L[0], Y(q, Q([0, 1], L)));
    for (var k = 1, C = !0; k < q.length; k += 1) {
      var w = q[k], s = G(w, 0, 1), S = G(w, -1);
      if ((s === '"' || s === "'" || s === "`" || S === '"' || S === "'" || S === "`") && s !== S)
        throw new i("property names with quotes must have matching quotes");
      if ((w === "constructor" || !C) && (x = !0), M += "." + w, X = "%" + M + "%", O(A, X))
        u = A[X];
      else if (u != null) {
        if (!(w in u)) {
          if (!R)
            throw new o("base intrinsic for " + P + " exists, but the property is not available.");
          return;
        }
        if (h && k + 1 >= q.length) {
          var l = h(u, w);
          C = !!l, C && "get" in l && !("originalValue" in l.get) ? u = l.get : u = u[w];
        } else
          C = O(u, w), u = u[w];
        C && !x && (A[X] = u);
      }
    }
    return u;
  }, Ye;
}
var Xe, No;
function Ue() {
  if (No) return Xe;
  No = 1;
  var r = /* @__PURE__ */ Vr(), e = r("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return Xe = e, Xe;
}
var Qe, To;
function iy() {
  if (To) return Qe;
  To = 1;
  var r = /* @__PURE__ */ Vr(), e = r("%Object.getOwnPropertyDescriptor%", !0);
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  return Qe = e, Qe;
}
var Ze, ko;
function mo() {
  if (ko) return Ze;
  ko = 1;
  var r = /* @__PURE__ */ Ue(), e = /* @__PURE__ */ Er(), t = /* @__PURE__ */ gr(), a = /* @__PURE__ */ iy();
  return Ze = function(i, o, y) {
    if (!i || typeof i != "object" && typeof i != "function")
      throw new t("`obj` must be an object or a function`");
    if (typeof o != "string" && typeof o != "symbol")
      throw new t("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new t("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new t("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new t("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new t("`loose`, if provided, must be a boolean");
    var f = arguments.length > 3 ? arguments[3] : null, g = arguments.length > 4 ? arguments[4] : null, h = arguments.length > 5 ? arguments[5] : null, v = arguments.length > 6 ? arguments[6] : !1, E = !!a && a(i, o);
    if (r)
      r(i, o, {
        configurable: h === null && E ? E.configurable : !h,
        enumerable: f === null && E ? E.enumerable : !f,
        value: y,
        writable: g === null && E ? E.writable : !g
      });
    else if (v || !f && !g && !h)
      i[o] = y;
    else
      throw new e("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, Ze;
}
var rt, Co;
function So() {
  if (Co) return rt;
  Co = 1;
  var r = /* @__PURE__ */ Ue(), e = function() {
    return !!r;
  };
  return e.hasArrayLengthDefineBug = function() {
    if (!r)
      return null;
    try {
      return r([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, rt = e, rt;
}
var et, Go;
function Jr() {
  if (Go) return et;
  Go = 1;
  var r = vo(), e = typeof Symbol == "function" && typeof Symbol("foo") == "symbol", t = Object.prototype.toString, a = Array.prototype.concat, n = /* @__PURE__ */ mo(), i = function(g) {
    return typeof g == "function" && t.call(g) === "[object Function]";
  }, o = /* @__PURE__ */ So()(), y = function(g, h, v, E) {
    if (h in g) {
      if (E === !0) {
        if (g[h] === v)
          return;
      } else if (!i(E) || !E())
        return;
    }
    o ? n(g, h, v, !0) : n(g, h, v);
  }, f = function(g, h) {
    var v = arguments.length > 2 ? arguments[2] : {}, E = r(h);
    e && (E = a.call(E, Object.getOwnPropertySymbols(h)));
    for (var $ = 0; $ < E.length; $ += 1)
      y(g, E[$], h[E[$]], v[E[$]]);
  };
  return f.supportsDescriptors = !!o, et = f, et;
}
var tt = { exports: {} }, nt, Wo;
function he() {
  if (Wo) return nt;
  Wo = 1;
  var r = /* @__PURE__ */ Vr(), e = /* @__PURE__ */ mo(), t = /* @__PURE__ */ So()(), a = /* @__PURE__ */ iy(), n = /* @__PURE__ */ gr(), i = r("%Math.floor%");
  return nt = function(y, f) {
    if (typeof y != "function")
      throw new n("`fn` is not a function");
    if (typeof f != "number" || f < 0 || f > 4294967295 || i(f) !== f)
      throw new n("`length` must be a positive 32-bit integer");
    var g = arguments.length > 2 && !!arguments[2], h = !0, v = !0;
    if ("length" in y && a) {
      var E = a(y, "length");
      E && !E.configurable && (h = !1), E && !E.writable && (v = !1);
    }
    return (h || v || !g) && (t ? e(
      /** @type {Parameters<define>[0]} */
      y,
      "length",
      f,
      !0,
      !0
    ) : e(
      /** @type {Parameters<define>[0]} */
      y,
      "length",
      f
    )), y;
  }, nt;
}
var ot, Lo;
function xy() {
  return Lo || (Lo = 1, ot = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), a = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
      return !1;
    var n = 42;
    e[t] = n;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var i = Object.getOwnPropertySymbols(e);
    if (i.length !== 1 || i[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var o = Object.getOwnPropertyDescriptor(e, t);
      if (o.value !== n || o.enumerable !== !0)
        return !1;
    }
    return !0;
  }), ot;
}
var at, Ho;
function jy() {
  if (Ho) return at;
  Ho = 1;
  var r = typeof Symbol < "u" && Symbol, e = xy();
  return at = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, at;
}
var it, Vo;
function My() {
  if (Vo) return it;
  Vo = 1;
  var r, e = /* @__PURE__ */ Rr(), t = /* @__PURE__ */ jr(), a = /* @__PURE__ */ Mr(), n = /* @__PURE__ */ _r(), i = /* @__PURE__ */ Er(), o = /* @__PURE__ */ gr(), y = /* @__PURE__ */ Dr(), f = Function, g = function(N) {
    try {
      return f('"use strict"; return (' + N + ").constructor;")();
    } catch {
    }
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch {
      h = null;
    }
  var v = function() {
    throw new o();
  }, E = h ? function() {
    try {
      return arguments.callee, v;
    } catch {
      try {
        return h(arguments, "callee").get;
      } catch {
        return v;
      }
    }
  }() : v, $ = jy()(), j = /* @__PURE__ */ Be()(), I = Object.getPrototypeOf || (j ? function(N) {
    return N.__proto__;
  } : null), b = {}, U = typeof Uint8Array > "u" || !I ? r : I(Uint8Array), A = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": $ && I ? I([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": b,
    "%AsyncGenerator%": b,
    "%AsyncGeneratorFunction%": b,
    "%AsyncIteratorPrototype%": b,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": t,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": f,
    "%GeneratorFunction%": b,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": $ && I ? I(I([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !$ || !I ? r : I((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": a,
    "%ReferenceError%": n,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !$ || !I ? r : I((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": $ && I ? I(""[Symbol.iterator]()) : r,
    "%Symbol%": $ ? Symbol : r,
    "%SyntaxError%": i,
    "%ThrowTypeError%": E,
    "%TypedArray%": U,
    "%TypeError%": o,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": y,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet
  };
  if (I)
    try {
      null.error;
    } catch (N) {
      var F = I(I(N));
      A["%Error.prototype%"] = F;
    }
  var z = function N(P) {
    var R;
    if (P === "%AsyncFunction%")
      R = g("async function () {}");
    else if (P === "%GeneratorFunction%")
      R = g("function* () {}");
    else if (P === "%AsyncGeneratorFunction%")
      R = g("async function* () {}");
    else if (P === "%AsyncGenerator%") {
      var q = N("%AsyncGeneratorFunction%");
      q && (R = q.prototype);
    } else if (P === "%AsyncIteratorPrototype%") {
      var M = N("%AsyncGenerator%");
      M && I && (R = I(M.prototype));
    }
    return A[P] = R, R;
  }, K = {
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
  }, D = Or(), O = /* @__PURE__ */ Fr(), Q = D.call(Function.call, Array.prototype.concat), Y = D.call(Function.apply, Array.prototype.splice), er = D.call(Function.call, String.prototype.replace), G = D.call(Function.call, String.prototype.slice), H = D.call(Function.call, RegExp.prototype.exec), or = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, V = /\\(\\)?/g, nr = function(P) {
    var R = G(P, 0, 1), q = G(P, -1);
    if (R === "%" && q !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    if (q === "%" && R !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var M = [];
    return er(P, or, function(J, X, u, x) {
      M[M.length] = u ? er(x, V, "$1") : X || J;
    }), M;
  }, dr = function(P, R) {
    var q = P, M;
    if (O(K, q) && (M = K[q], q = "%" + M[0] + "%"), O(A, q)) {
      var J = A[q];
      if (J === b && (J = z(q)), typeof J > "u" && !R)
        throw new o("intrinsic " + P + " exists, but is not available. Please file an issue!");
      return {
        alias: M,
        name: q,
        value: J
      };
    }
    throw new i("intrinsic " + P + " does not exist!");
  };
  return it = function(P, R) {
    if (typeof P != "string" || P.length === 0)
      throw new o("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof R != "boolean")
      throw new o('"allowMissing" argument must be a boolean');
    if (H(/^%?[^%]*%?$/, P) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var q = nr(P), M = q.length > 0 ? q[0] : "", J = dr("%" + M + "%", R), X = J.name, u = J.value, x = !1, L = J.alias;
    L && (M = L[0], Y(q, Q([0, 1], L)));
    for (var k = 1, C = !0; k < q.length; k += 1) {
      var w = q[k], s = G(w, 0, 1), S = G(w, -1);
      if ((s === '"' || s === "'" || s === "`" || S === '"' || S === "'" || S === "`") && s !== S)
        throw new i("property names with quotes must have matching quotes");
      if ((w === "constructor" || !C) && (x = !0), M += "." + w, X = "%" + M + "%", O(A, X))
        u = A[X];
      else if (u != null) {
        if (!(w in u)) {
          if (!R)
            throw new o("base intrinsic for " + P + " exists, but the property is not available.");
          return;
        }
        if (h && k + 1 >= q.length) {
          var l = h(u, w);
          C = !!l, C && "get" in l && !("originalValue" in l.get) ? u = l.get : u = u[w];
        } else
          C = O(u, w), u = u[w];
        C && !x && (A[X] = u);
      }
    }
    return u;
  }, it;
}
var yt, Jo;
function _y() {
  if (Jo) return yt;
  Jo = 1;
  var r = /* @__PURE__ */ My(), e = r("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return yt = e, yt;
}
var ft, zo;
function zr() {
  return zo || (zo = 1, ft = Function.prototype.call), ft;
}
var pt, Ko;
function Kr() {
  return Ko || (Ko = 1, pt = Function.prototype.apply), pt;
}
var ut, Yo;
function Dy() {
  return Yo || (Yo = 1, ut = typeof Reflect < "u" && Reflect && Reflect.apply), ut;
}
var st, Xo;
function yy() {
  if (Xo) return st;
  Xo = 1;
  var r = Or(), e = Kr(), t = zr(), a = Dy();
  return st = a || r.call(t, e), st;
}
var lt, Qo;
function ye() {
  if (Qo) return lt;
  Qo = 1;
  var r = Or(), e = /* @__PURE__ */ gr(), t = zr(), a = yy();
  return lt = function(i) {
    if (i.length < 1 || typeof i[0] != "function")
      throw new e("a function is required");
    return a(r, t, i);
  }, lt;
}
var ct, Zo;
function qe() {
  if (Zo) return ct;
  Zo = 1;
  var r = Or(), e = Kr(), t = yy();
  return ct = function() {
    return t(r, e, arguments);
  }, ct;
}
var ra;
function Ny() {
  return ra || (ra = 1, function(r) {
    var e = /* @__PURE__ */ he(), t = /* @__PURE__ */ _y(), a = ye(), n = qe();
    r.exports = function(o) {
      var y = a(arguments), f = o.length - (arguments.length - 1);
      return e(
        y,
        1 + (f > 0 ? f : 0),
        !0
      );
    }, t ? t(r.exports, "apply", { value: n }) : r.exports.apply = n;
  }(tt)), tt.exports;
}
var vt, ea;
function fy() {
  return ea || (ea = 1, vt = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), a = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
      return !1;
    var n = 42;
    e[t] = n;
    for (var i in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var y = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, t)
      );
      if (y.value !== n || y.enumerable !== !0)
        return !1;
    }
    return !0;
  }), vt;
}
var dt, ta;
function Yr() {
  return ta || (ta = 1, dt = Object), dt;
}
var gt, na;
function me() {
  return na || (na = 1, gt = Math.abs), gt;
}
var ht, oa;
function Se() {
  return oa || (oa = 1, ht = Math.floor), ht;
}
var mt, aa;
function Ae() {
  return aa || (aa = 1, mt = Math.max), mt;
}
var St, ia;
function be() {
  return ia || (ia = 1, St = Math.min), St;
}
var At, ya;
function Pe() {
  return ya || (ya = 1, At = Math.pow), At;
}
var bt, fa;
function Oe() {
  return fa || (fa = 1, bt = Math.round), bt;
}
var Pt, pa;
function Ty() {
  return pa || (pa = 1, Pt = Number.isNaN || function(e) {
    return e !== e;
  }), Pt;
}
var Ot, ua;
function Ie() {
  if (ua) return Ot;
  ua = 1;
  var r = /* @__PURE__ */ Ty();
  return Ot = function(t) {
    return r(t) || t === 0 ? t : t < 0 ? -1 : 1;
  }, Ot;
}
var It, sa;
function ky() {
  return sa || (sa = 1, It = Object.getOwnPropertyDescriptor), It;
}
var Et, la;
function Cy() {
  if (la) return Et;
  la = 1;
  var r = /* @__PURE__ */ ky();
  if (r)
    try {
      r([], "length");
    } catch {
      r = null;
    }
  return Et = r, Et;
}
var wt, ca;
function Gy() {
  if (ca) return wt;
  ca = 1;
  var r = Object.defineProperty || !1;
  if (r)
    try {
      r({}, "a", { value: 1 });
    } catch {
      r = !1;
    }
  return wt = r, wt;
}
var $t, va;
function Wy() {
  return va || (va = 1, $t = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), a = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
      return !1;
    var n = 42;
    e[t] = n;
    for (var i in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var y = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, t)
      );
      if (y.value !== n || y.enumerable !== !0)
        return !1;
    }
    return !0;
  }), $t;
}
var Rt, da;
function Ly() {
  if (da) return Rt;
  da = 1;
  var r = typeof Symbol < "u" && Symbol, e = Wy();
  return Rt = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Rt;
}
var Ft, ga;
function fe() {
  return ga || (ga = 1, Ft = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Ft;
}
var Bt, ha;
function pe() {
  if (ha) return Bt;
  ha = 1;
  var r = /* @__PURE__ */ Yr();
  return Bt = r.getPrototypeOf || null, Bt;
}
var Ut, ma;
function Hy() {
  return ma || (ma = 1, Ut = Object.getOwnPropertyDescriptor), Ut;
}
var qt, Sa;
function Vy() {
  if (Sa) return qt;
  Sa = 1;
  var r = /* @__PURE__ */ Hy();
  if (r)
    try {
      r([], "length");
    } catch {
      r = null;
    }
  return qt = r, qt;
}
var xt, Aa;
function Jy() {
  if (Aa) return xt;
  Aa = 1;
  var r = ye(), e = /* @__PURE__ */ Vy(), t;
  try {
    t = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (o) {
    if (!o || typeof o != "object" || !("code" in o) || o.code !== "ERR_PROTO_ACCESS")
      throw o;
  }
  var a = !!t && e && e(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), n = Object, i = n.getPrototypeOf;
  return xt = a && typeof a.get == "function" ? r([a.get]) : typeof i == "function" ? (
    /** @type {import('./get')} */
    function(y) {
      return i(y == null ? y : n(y));
    }
  ) : !1, xt;
}
var jt, ba;
function ue() {
  if (ba) return jt;
  ba = 1;
  var r = fe(), e = pe(), t = /* @__PURE__ */ Jy();
  return jt = r ? function(n) {
    return r(n);
  } : e ? function(n) {
    if (!n || typeof n != "object" && typeof n != "function")
      throw new TypeError("getProto: not an object");
    return e(n);
  } : t ? function(n) {
    return t(n);
  } : null, jt;
}
var Mt, Pa;
function zy() {
  if (Pa) return Mt;
  Pa = 1;
  var r, e = /* @__PURE__ */ Yr(), t = /* @__PURE__ */ Rr(), a = /* @__PURE__ */ jr(), n = /* @__PURE__ */ Mr(), i = /* @__PURE__ */ _r(), o = /* @__PURE__ */ Er(), y = /* @__PURE__ */ gr(), f = /* @__PURE__ */ Dr(), g = /* @__PURE__ */ me(), h = /* @__PURE__ */ Se(), v = /* @__PURE__ */ Ae(), E = /* @__PURE__ */ be(), $ = /* @__PURE__ */ Pe(), j = /* @__PURE__ */ Oe(), I = /* @__PURE__ */ Ie(), b = Function, U = function(w) {
    try {
      return b('"use strict"; return (' + w + ").constructor;")();
    } catch {
    }
  }, A = /* @__PURE__ */ Cy(), F = /* @__PURE__ */ Gy(), z = function() {
    throw new y();
  }, K = A ? function() {
    try {
      return arguments.callee, z;
    } catch {
      try {
        return A(arguments, "callee").get;
      } catch {
        return z;
      }
    }
  }() : z, D = Ly()(), O = ue(), Q = pe(), Y = fe(), er = Kr(), G = zr(), H = {}, or = typeof Uint8Array > "u" || !O ? r : O(Uint8Array), V = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": D && O ? O([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": H,
    "%AsyncGenerator%": H,
    "%AsyncGeneratorFunction%": H,
    "%AsyncIteratorPrototype%": H,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": t,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": a,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": b,
    "%GeneratorFunction%": H,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": D && O ? O(O([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !D || !O ? r : O((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": e,
    "%Object.getOwnPropertyDescriptor%": A,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": n,
    "%ReferenceError%": i,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !D || !O ? r : O((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": D && O ? O(""[Symbol.iterator]()) : r,
    "%Symbol%": D ? Symbol : r,
    "%SyntaxError%": o,
    "%ThrowTypeError%": K,
    "%TypedArray%": or,
    "%TypeError%": y,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": f,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
    "%Function.prototype.call%": G,
    "%Function.prototype.apply%": er,
    "%Object.defineProperty%": F,
    "%Object.getPrototypeOf%": Q,
    "%Math.abs%": g,
    "%Math.floor%": h,
    "%Math.max%": v,
    "%Math.min%": E,
    "%Math.pow%": $,
    "%Math.round%": j,
    "%Math.sign%": I,
    "%Reflect.getPrototypeOf%": Y
  };
  if (O)
    try {
      null.error;
    } catch (w) {
      var nr = O(O(w));
      V["%Error.prototype%"] = nr;
    }
  var dr = function w(s) {
    var S;
    if (s === "%AsyncFunction%")
      S = U("async function () {}");
    else if (s === "%GeneratorFunction%")
      S = U("function* () {}");
    else if (s === "%AsyncGeneratorFunction%")
      S = U("async function* () {}");
    else if (s === "%AsyncGenerator%") {
      var l = w("%AsyncGeneratorFunction%");
      l && (S = l.prototype);
    } else if (s === "%AsyncIteratorPrototype%") {
      var B = w("%AsyncGenerator%");
      B && O && (S = O(B.prototype));
    }
    return V[s] = S, S;
  }, N = {
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
  }, P = Or(), R = /* @__PURE__ */ Fr(), q = P.call(G, Array.prototype.concat), M = P.call(er, Array.prototype.splice), J = P.call(G, String.prototype.replace), X = P.call(G, String.prototype.slice), u = P.call(G, RegExp.prototype.exec), x = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, L = /\\(\\)?/g, k = function(s) {
    var S = X(s, 0, 1), l = X(s, -1);
    if (S === "%" && l !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (l === "%" && S !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var B = [];
    return J(s, x, function(T, Z, _, ar) {
      B[B.length] = _ ? J(ar, L, "$1") : Z || T;
    }), B;
  }, C = function(s, S) {
    var l = s, B;
    if (R(N, l) && (B = N[l], l = "%" + B[0] + "%"), R(V, l)) {
      var T = V[l];
      if (T === H && (T = dr(l)), typeof T > "u" && !S)
        throw new y("intrinsic " + s + " exists, but is not available. Please file an issue!");
      return {
        alias: B,
        name: l,
        value: T
      };
    }
    throw new o("intrinsic " + s + " does not exist!");
  };
  return Mt = function(s, S) {
    if (typeof s != "string" || s.length === 0)
      throw new y("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof S != "boolean")
      throw new y('"allowMissing" argument must be a boolean');
    if (u(/^%?[^%]*%?$/, s) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var l = k(s), B = l.length > 0 ? l[0] : "", T = C("%" + B + "%", S), Z = T.name, _ = T.value, ar = !1, pr = T.alias;
    pr && (B = pr[0], M(l, q([0, 1], pr)));
    for (var lr = 1, ir = !0; lr < l.length; lr += 1) {
      var rr = l[lr], cr = X(rr, 0, 1), vr = X(rr, -1);
      if ((cr === '"' || cr === "'" || cr === "`" || vr === '"' || vr === "'" || vr === "`") && cr !== vr)
        throw new o("property names with quotes must have matching quotes");
      if ((rr === "constructor" || !ir) && (ar = !0), B += "." + rr, Z = "%" + B + "%", R(V, Z))
        _ = V[Z];
      else if (_ != null) {
        if (!(rr in _)) {
          if (!S)
            throw new y("base intrinsic for " + s + " exists, but the property is not available.");
          return;
        }
        if (A && lr + 1 >= l.length) {
          var sr = A(_, rr);
          ir = !!sr, ir && "get" in sr && !("originalValue" in sr.get) ? _ = sr.get : _ = _[rr];
        } else
          ir = R(_, rr), _ = _[rr];
        ir && !ar && (V[Z] = _);
      }
    }
    return _;
  }, Mt;
}
var _t, Oa;
function Nr() {
  if (Oa) return _t;
  Oa = 1;
  var r = /* @__PURE__ */ zy(), e = ye(), t = e([r("%String.prototype.indexOf%")]);
  return _t = function(n, i) {
    var o = (
      /** @type {Parameters<typeof callBindBasic>[0][0]} */
      r(n, !!i)
    );
    return typeof o == "function" && t(n, ".prototype.") > -1 ? e([o]) : o;
  }, _t;
}
var Dt, Ia;
function py() {
  if (Ia) return Dt;
  Ia = 1;
  var r = vo(), e = fy()(), t = /* @__PURE__ */ Nr(), a = /* @__PURE__ */ Yr(), n = t("Array.prototype.push"), i = t("Object.prototype.propertyIsEnumerable"), o = e ? a.getOwnPropertySymbols : null;
  return Dt = function(f, g) {
    if (f == null)
      throw new TypeError("target must be an object");
    var h = a(f);
    if (arguments.length === 1)
      return h;
    for (var v = 1; v < arguments.length; ++v) {
      var E = a(arguments[v]), $ = r(E), j = e && (a.getOwnPropertySymbols || o);
      if (j)
        for (var I = j(E), b = 0; b < I.length; ++b) {
          var U = I[b];
          i(E, U) && n($, U);
        }
      for (var A = 0; A < $.length; ++A) {
        var F = $[A];
        if (i(E, F)) {
          var z = E[F];
          h[F] = z;
        }
      }
    }
    return h;
  }, Dt;
}
var Nt, Ea;
function uy() {
  if (Ea) return Nt;
  Ea = 1;
  var r = py(), e = function() {
    if (!Object.assign)
      return !1;
    for (var a = "abcdefghijklmnopqrst", n = a.split(""), i = {}, o = 0; o < n.length; ++o)
      i[n[o]] = n[o];
    var y = Object.assign({}, i), f = "";
    for (var g in y)
      f += g;
    return a !== f;
  }, t = function() {
    if (!Object.assign || !Object.preventExtensions)
      return !1;
    var a = Object.preventExtensions({ 1: 2 });
    try {
      Object.assign(a, "xy");
    } catch {
      return a[1] === "y";
    }
    return !1;
  };
  return Nt = function() {
    return !Object.assign || e() || t() ? r : Object.assign;
  }, Nt;
}
var Tt, wa;
function Ky() {
  if (wa) return Tt;
  wa = 1;
  var r = Jr(), e = uy();
  return Tt = function() {
    var a = e();
    return r(
      Object,
      { assign: a },
      { assign: function() {
        return Object.assign !== a;
      } }
    ), a;
  }, Tt;
}
var kt, $a;
function Yy() {
  if ($a) return kt;
  $a = 1;
  var r = Jr(), e = Ny(), t = py(), a = uy(), n = Ky(), i = e.apply(a()), o = function(f, g) {
    return i(Object, arguments);
  };
  return r(o, {
    getPolyfill: a,
    implementation: t,
    shim: n
  }), kt = o, kt;
}
var Ct = { exports: {} }, Ra;
function sy() {
  return Ra || (Ra = 1, function(r) {
    var e = Or(), t = /* @__PURE__ */ Vr(), a = /* @__PURE__ */ he(), n = /* @__PURE__ */ gr(), i = t("%Function.prototype.apply%"), o = t("%Function.prototype.call%"), y = t("%Reflect.apply%", !0) || e.call(o, i), f = /* @__PURE__ */ Ue(), g = t("%Math.max%");
    r.exports = function(E) {
      if (typeof E != "function")
        throw new n("a function is required");
      var $ = y(e, o, arguments);
      return a(
        $,
        1 + g(0, E.length - (arguments.length - 1)),
        !0
      );
    };
    var h = function() {
      return y(e, i, arguments);
    };
    f ? f(r.exports, "apply", { value: h }) : r.exports.apply = h;
  }(Ct)), Ct.exports;
}
var Gt, Fa;
function se() {
  if (Fa) return Gt;
  Fa = 1;
  var r = /* @__PURE__ */ Vr(), e = sy(), t = e(r("String.prototype.indexOf"));
  return Gt = function(n, i) {
    var o = r(n, !!i);
    return typeof o == "function" && t(n, ".prototype.") > -1 ? e(o) : o;
  }, Gt;
}
var Wt = { exports: {} }, Ba;
function Xy() {
  return Ba || (Ba = 1, function(r) {
    var e = /* @__PURE__ */ he(), t = /* @__PURE__ */ Ue(), a = ye(), n = qe();
    r.exports = function(o) {
      var y = a(arguments), f = o.length - (arguments.length - 1);
      return e(
        y,
        1 + (f > 0 ? f : 0),
        !0
      );
    }, t ? t(r.exports, "apply", { value: n }) : r.exports.apply = n;
  }(Wt)), Wt.exports;
}
var Lt, Ua;
function Qy() {
  if (Ua) return Lt;
  Ua = 1;
  var r = function() {
    return typeof (function() {
    }).name == "string";
  }, e = Object.getOwnPropertyDescriptor;
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  r.functionsHaveConfigurableNames = function() {
    if (!r() || !e)
      return !1;
    var n = e(function() {
    }, "name");
    return !!n && !!n.configurable;
  };
  var t = Function.prototype.bind;
  return r.boundFunctionsHaveNames = function() {
    return r() && typeof t == "function" && (function() {
    }).bind().name !== "";
  }, Lt = r, Lt;
}
var Ht, qa;
function Zy() {
  if (qa) return Ht;
  qa = 1;
  var r = /* @__PURE__ */ mo(), e = /* @__PURE__ */ So()(), t = Qy().functionsHaveConfigurableNames(), a = /* @__PURE__ */ gr();
  return Ht = function(i, o) {
    if (typeof i != "function")
      throw new a("`fn` is not a function");
    var y = arguments.length > 2 && !!arguments[2];
    return (!y || t) && (e ? r(
      /** @type {Parameters<define>[0]} */
      i,
      "name",
      o,
      !0,
      !0
    ) : r(
      /** @type {Parameters<define>[0]} */
      i,
      "name",
      o
    )), i;
  }, Ht;
}
var Vt, xa;
function ly() {
  if (xa) return Vt;
  xa = 1;
  var r = Zy(), e = /* @__PURE__ */ gr(), t = Object;
  return Vt = r(function() {
    if (this == null || this !== t(this))
      throw new e("RegExp.prototype.flags getter called on non-object");
    var n = "";
    return this.hasIndices && (n += "d"), this.global && (n += "g"), this.ignoreCase && (n += "i"), this.multiline && (n += "m"), this.dotAll && (n += "s"), this.unicode && (n += "u"), this.unicodeSets && (n += "v"), this.sticky && (n += "y"), n;
  }, "get flags", !0), Vt;
}
var Jt, ja;
function cy() {
  if (ja) return Jt;
  ja = 1;
  var r = ly(), e = Jr().supportsDescriptors, t = Object.getOwnPropertyDescriptor;
  return Jt = function() {
    if (e && /a/mig.flags === "gim") {
      var n = t(RegExp.prototype, "flags");
      if (n && typeof n.get == "function" && "dotAll" in RegExp.prototype && "hasIndices" in RegExp.prototype) {
        var i = "", o = {};
        if (Object.defineProperty(o, "hasIndices", {
          get: function() {
            i += "d";
          }
        }), Object.defineProperty(o, "sticky", {
          get: function() {
            i += "y";
          }
        }), n.get.call(o), i === "dy")
          return n.get;
      }
    }
    return r;
  }, Jt;
}
var zt, Ma;
function rf() {
  return Ma || (Ma = 1, zt = Object.getOwnPropertyDescriptor), zt;
}
var Kt, _a;
function ef() {
  if (_a) return Kt;
  _a = 1;
  var r = /* @__PURE__ */ rf();
  if (r)
    try {
      r([], "length");
    } catch {
      r = null;
    }
  return Kt = r, Kt;
}
var Yt, Da;
function tf() {
  if (Da) return Yt;
  Da = 1;
  var r = Jr().supportsDescriptors, e = cy(), t = /* @__PURE__ */ ef(), a = Object.defineProperty, n = /* @__PURE__ */ Rr(), i = ue(), o = /a/;
  return Yt = function() {
    if (!r || !i)
      throw new n("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
    var f = e(), g = i(o), h = t(g, "flags");
    return (!h || h.get !== f) && a(g, "flags", {
      configurable: !0,
      enumerable: !1,
      get: f
    }), f;
  }, Yt;
}
var Xt, Na;
function nf() {
  if (Na) return Xt;
  Na = 1;
  var r = Jr(), e = Xy(), t = ly(), a = cy(), n = tf(), i = e(a());
  return r(i, {
    getPolyfill: a,
    implementation: t,
    shim: n
  }), Xt = i, Xt;
}
var Qt, Ta;
function of() {
  return Ta || (Ta = 1, Qt = Object.getOwnPropertyDescriptor), Qt;
}
var Zt, ka;
function vy() {
  if (ka) return Zt;
  ka = 1;
  var r = /* @__PURE__ */ of();
  if (r)
    try {
      r([], "length");
    } catch {
      r = null;
    }
  return Zt = r, Zt;
}
var rn, Ca;
function af() {
  if (Ca) return rn;
  Ca = 1;
  var r = Object.defineProperty || !1;
  if (r)
    try {
      r({}, "a", { value: 1 });
    } catch {
      r = !1;
    }
  return rn = r, rn;
}
var en, Ga;
function yf() {
  if (Ga) return en;
  Ga = 1;
  var r = typeof Symbol < "u" && Symbol, e = fy();
  return en = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, en;
}
var tn, Wa;
function dy() {
  if (Wa) return tn;
  Wa = 1;
  var r, e = /* @__PURE__ */ Yr(), t = /* @__PURE__ */ Rr(), a = /* @__PURE__ */ jr(), n = /* @__PURE__ */ Mr(), i = /* @__PURE__ */ _r(), o = /* @__PURE__ */ Er(), y = /* @__PURE__ */ gr(), f = /* @__PURE__ */ Dr(), g = /* @__PURE__ */ me(), h = /* @__PURE__ */ Se(), v = /* @__PURE__ */ Ae(), E = /* @__PURE__ */ be(), $ = /* @__PURE__ */ Pe(), j = /* @__PURE__ */ Oe(), I = /* @__PURE__ */ Ie(), b = Function, U = function(w) {
    try {
      return b('"use strict"; return (' + w + ").constructor;")();
    } catch {
    }
  }, A = /* @__PURE__ */ vy(), F = /* @__PURE__ */ af(), z = function() {
    throw new y();
  }, K = A ? function() {
    try {
      return arguments.callee, z;
    } catch {
      try {
        return A(arguments, "callee").get;
      } catch {
        return z;
      }
    }
  }() : z, D = yf()(), O = ue(), Q = pe(), Y = fe(), er = Kr(), G = zr(), H = {}, or = typeof Uint8Array > "u" || !O ? r : O(Uint8Array), V = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": D && O ? O([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": H,
    "%AsyncGenerator%": H,
    "%AsyncGeneratorFunction%": H,
    "%AsyncIteratorPrototype%": H,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": t,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": a,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": b,
    "%GeneratorFunction%": H,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": D && O ? O(O([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !D || !O ? r : O((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": e,
    "%Object.getOwnPropertyDescriptor%": A,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": n,
    "%ReferenceError%": i,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !D || !O ? r : O((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": D && O ? O(""[Symbol.iterator]()) : r,
    "%Symbol%": D ? Symbol : r,
    "%SyntaxError%": o,
    "%ThrowTypeError%": K,
    "%TypedArray%": or,
    "%TypeError%": y,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": f,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
    "%Function.prototype.call%": G,
    "%Function.prototype.apply%": er,
    "%Object.defineProperty%": F,
    "%Object.getPrototypeOf%": Q,
    "%Math.abs%": g,
    "%Math.floor%": h,
    "%Math.max%": v,
    "%Math.min%": E,
    "%Math.pow%": $,
    "%Math.round%": j,
    "%Math.sign%": I,
    "%Reflect.getPrototypeOf%": Y
  };
  if (O)
    try {
      null.error;
    } catch (w) {
      var nr = O(O(w));
      V["%Error.prototype%"] = nr;
    }
  var dr = function w(s) {
    var S;
    if (s === "%AsyncFunction%")
      S = U("async function () {}");
    else if (s === "%GeneratorFunction%")
      S = U("function* () {}");
    else if (s === "%AsyncGeneratorFunction%")
      S = U("async function* () {}");
    else if (s === "%AsyncGenerator%") {
      var l = w("%AsyncGeneratorFunction%");
      l && (S = l.prototype);
    } else if (s === "%AsyncIteratorPrototype%") {
      var B = w("%AsyncGenerator%");
      B && O && (S = O(B.prototype));
    }
    return V[s] = S, S;
  }, N = {
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
  }, P = Or(), R = /* @__PURE__ */ Fr(), q = P.call(G, Array.prototype.concat), M = P.call(er, Array.prototype.splice), J = P.call(G, String.prototype.replace), X = P.call(G, String.prototype.slice), u = P.call(G, RegExp.prototype.exec), x = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, L = /\\(\\)?/g, k = function(s) {
    var S = X(s, 0, 1), l = X(s, -1);
    if (S === "%" && l !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (l === "%" && S !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var B = [];
    return J(s, x, function(T, Z, _, ar) {
      B[B.length] = _ ? J(ar, L, "$1") : Z || T;
    }), B;
  }, C = function(s, S) {
    var l = s, B;
    if (R(N, l) && (B = N[l], l = "%" + B[0] + "%"), R(V, l)) {
      var T = V[l];
      if (T === H && (T = dr(l)), typeof T > "u" && !S)
        throw new y("intrinsic " + s + " exists, but is not available. Please file an issue!");
      return {
        alias: B,
        name: l,
        value: T
      };
    }
    throw new o("intrinsic " + s + " does not exist!");
  };
  return tn = function(s, S) {
    if (typeof s != "string" || s.length === 0)
      throw new y("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof S != "boolean")
      throw new y('"allowMissing" argument must be a boolean');
    if (u(/^%?[^%]*%?$/, s) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var l = k(s), B = l.length > 0 ? l[0] : "", T = C("%" + B + "%", S), Z = T.name, _ = T.value, ar = !1, pr = T.alias;
    pr && (B = pr[0], M(l, q([0, 1], pr)));
    for (var lr = 1, ir = !0; lr < l.length; lr += 1) {
      var rr = l[lr], cr = X(rr, 0, 1), vr = X(rr, -1);
      if ((cr === '"' || cr === "'" || cr === "`" || vr === '"' || vr === "'" || vr === "`") && cr !== vr)
        throw new o("property names with quotes must have matching quotes");
      if ((rr === "constructor" || !ir) && (ar = !0), B += "." + rr, Z = "%" + B + "%", R(V, Z))
        _ = V[Z];
      else if (_ != null) {
        if (!(rr in _)) {
          if (!S)
            throw new y("base intrinsic for " + s + " exists, but the property is not available.");
          return;
        }
        if (A && lr + 1 >= l.length) {
          var sr = A(_, rr);
          ir = !!sr, ir && "get" in sr && !("originalValue" in sr.get) ? _ = sr.get : _ = _[rr];
        } else
          ir = R(_, rr), _ = _[rr];
        ir && !ar && (V[Z] = _);
      }
    }
    return _;
  }, tn;
}
var de = { exports: {} }, nn, La;
function Xr() {
  if (La) return nn;
  La = 1;
  var r = go();
  return nn = function() {
    return r() && !!Symbol.toStringTag;
  }, nn;
}
var on, Ha;
function gy() {
  if (Ha) return on;
  Ha = 1;
  var r = Xr()(), e = /* @__PURE__ */ Nr(), t = e("Object.prototype.toString"), a = function(y) {
    return r && y && typeof y == "object" && Symbol.toStringTag in y ? !1 : t(y) === "[object Arguments]";
  }, n = function(y) {
    return a(y) ? !0 : y !== null && typeof y == "object" && "length" in y && typeof y.length == "number" && y.length >= 0 && t(y) !== "[object Array]" && "callee" in y && t(y.callee) === "[object Function]";
  }, i = function() {
    return a(arguments);
  }();
  return a.isLegacyArguments = n, on = i ? a : n, on;
}
const ff = {}, pf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ff
}, Symbol.toStringTag, { value: "Module" })), hy = /* @__PURE__ */ By(pf);
var an, Va;
function xe() {
  if (Va) return an;
  Va = 1;
  var r = typeof Map == "function" && Map.prototype, e = Object.getOwnPropertyDescriptor && r ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, t = r && e && typeof e.get == "function" ? e.get : null, a = r && Map.prototype.forEach, n = typeof Set == "function" && Set.prototype, i = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, o = n && i && typeof i.get == "function" ? i.get : null, y = n && Set.prototype.forEach, f = typeof WeakMap == "function" && WeakMap.prototype, g = f ? WeakMap.prototype.has : null, h = typeof WeakSet == "function" && WeakSet.prototype, v = h ? WeakSet.prototype.has : null, E = typeof WeakRef == "function" && WeakRef.prototype, $ = E ? WeakRef.prototype.deref : null, j = Boolean.prototype.valueOf, I = Object.prototype.toString, b = Function.prototype.toString, U = String.prototype.match, A = String.prototype.slice, F = String.prototype.replace, z = String.prototype.toUpperCase, K = String.prototype.toLowerCase, D = RegExp.prototype.test, O = Array.prototype.concat, Q = Array.prototype.join, Y = Array.prototype.slice, er = Math.floor, G = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, H = Object.getOwnPropertySymbols, or = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, V = typeof Symbol == "function" && typeof Symbol.iterator == "object", nr = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === V || !0) ? Symbol.toStringTag : null, dr = Object.prototype.propertyIsEnumerable, N = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(p) {
    return p.__proto__;
  } : null);
  function P(p, c) {
    if (p === 1 / 0 || p === -1 / 0 || p !== p || p && p > -1e3 && p < 1e3 || D.call(/e/, c))
      return c;
    var W = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof p == "number") {
      var fr = p < 0 ? -er(-p) : er(p);
      if (fr !== p) {
        var ur = String(fr), tr = A.call(c, ur.length + 1);
        return F.call(ur, W, "$&_") + "." + F.call(F.call(tr, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return F.call(c, W, "$&_");
  }
  var R = hy, q = R.custom, M = T(q) ? q : null, J = {
    __proto__: null,
    double: '"',
    single: "'"
  }, X = {
    __proto__: null,
    double: /(["\\])/g,
    single: /(['\\])/g
  };
  an = function p(c, W, fr, ur) {
    var tr = W || {};
    if (ar(tr, "quoteStyle") && !ar(J, tr.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (ar(tr, "maxStringLength") && (typeof tr.maxStringLength == "number" ? tr.maxStringLength < 0 && tr.maxStringLength !== 1 / 0 : tr.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var Ar = ar(tr, "customInspect") ? tr.customInspect : !0;
    if (typeof Ar != "boolean" && Ar !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (ar(tr, "indent") && tr.indent !== null && tr.indent !== "	" && !(parseInt(tr.indent, 10) === tr.indent && tr.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (ar(tr, "numericSeparator") && typeof tr.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var Ir = tr.numericSeparator;
    if (typeof c > "u")
      return "undefined";
    if (c === null)
      return "null";
    if (typeof c == "boolean")
      return c ? "true" : "false";
    if (typeof c == "string")
      return wr(c, tr);
    if (typeof c == "number") {
      if (c === 0)
        return 1 / 0 / c > 0 ? "0" : "-0";
      var hr = String(c);
      return Ir ? P(c, hr) : hr;
    }
    if (typeof c == "bigint") {
      var mr = String(c) + "n";
      return Ir ? P(c, mr) : mr;
    }
    var ee = typeof tr.depth > "u" ? 5 : tr.depth;
    if (typeof fr > "u" && (fr = 0), fr >= ee && ee > 0 && typeof c == "object")
      return k(c) ? "[Array]" : "[Object]";
    var Br = d(tr, fr);
    if (typeof ur > "u")
      ur = [];
    else if (ir(ur, c) >= 0)
      return "[Circular]";
    function Pr(xr, we, wy) {
      if (we && (ur = Y.call(ur), ur.push(we)), wy) {
        var Ao = {
          depth: tr.depth
        };
        return ar(tr, "quoteStyle") && (Ao.quoteStyle = tr.quoteStyle), p(xr, Ao, fr + 1, ur);
      }
      return p(xr, tr, fr + 1, ur);
    }
    if (typeof c == "function" && !w(c)) {
      var kr = lr(c), te = yr(c, Pr);
      return "[Function" + (kr ? ": " + kr : " (anonymous)") + "]" + (te.length > 0 ? " { " + Q.call(te, ", ") + " }" : "");
    }
    if (T(c)) {
      var Cr = V ? F.call(String(c), /^(Symbol\(.*\))_[^)]*$/, "$1") : or.call(c);
      return typeof c == "object" && !V ? $r(Cr) : Cr;
    }
    if (br(c)) {
      for (var Ur = "<" + K.call(String(c.nodeName)), Gr = c.attributes || [], Wr = 0; Wr < Gr.length; Wr++)
        Ur += " " + Gr[Wr].name + "=" + u(x(Gr[Wr].value), "double", tr);
      return Ur += ">", c.childNodes && c.childNodes.length && (Ur += "..."), Ur += "</" + K.call(String(c.nodeName)) + ">", Ur;
    }
    if (k(c)) {
      if (c.length === 0)
        return "[]";
      var ne = yr(c, Pr);
      return Br && !re(ne) ? "[" + m(ne, Br) + "]" : "[ " + Q.call(ne, ", ") + " ]";
    }
    if (s(c)) {
      var Lr = yr(c, Pr);
      return !("cause" in Error.prototype) && "cause" in c && !dr.call(c, "cause") ? "{ [" + String(c) + "] " + Q.call(O.call("[cause]: " + Pr(c.cause), Lr), ", ") + " }" : Lr.length === 0 ? "[" + String(c) + "]" : "{ [" + String(c) + "] " + Q.call(Lr, ", ") + " }";
    }
    if (typeof c == "object" && Ar) {
      if (M && typeof c[M] == "function" && R)
        return R(c, { depth: ee - fr });
      if (Ar !== "symbol" && typeof c.inspect == "function")
        return c.inspect();
    }
    if (rr(c)) {
      var ce = [];
      return a && a.call(c, function(xr, we) {
        ce.push(Pr(we, c, !0) + " => " + Pr(xr, c));
      }), Zr("Map", t.call(c), ce, Br);
    }
    if (sr(c)) {
      var oe = [];
      return y && y.call(c, function(xr) {
        oe.push(Pr(xr, c));
      }), Zr("Set", o.call(c), oe, Br);
    }
    if (cr(c))
      return le("WeakMap");
    if (Qr(c))
      return le("WeakSet");
    if (vr(c))
      return le("WeakRef");
    if (l(c))
      return $r(Pr(Number(c)));
    if (Z(c))
      return $r(Pr(G.call(c)));
    if (B(c))
      return $r(j.call(c));
    if (S(c))
      return $r(Pr(String(c)));
    if (typeof window < "u" && c === window)
      return "{ [object Window] }";
    if (typeof globalThis < "u" && c === globalThis || typeof ge < "u" && c === ge)
      return "{ [object globalThis] }";
    if (!C(c) && !w(c)) {
      var ae = yr(c, Pr), Ee = N ? N(c) === Object.prototype : c instanceof Object || c.constructor === Object, Hr = c instanceof Object ? "" : "null prototype", qr = !Ee && nr && Object(c) === c && nr in c ? A.call(pr(c), 8, -1) : Hr ? "Object" : "", ie = Ee || typeof c.constructor != "function" ? "" : c.constructor.name ? c.constructor.name + " " : "", ve = ie + (qr || Hr ? "[" + Q.call(O.call([], qr || [], Hr || []), ": ") + "] " : "");
      return ae.length === 0 ? ve + "{}" : Br ? ve + "{" + m(ae, Br) + "}" : ve + "{ " + Q.call(ae, ", ") + " }";
    }
    return String(c);
  };
  function u(p, c, W) {
    var fr = W.quoteStyle || c, ur = J[fr];
    return ur + p + ur;
  }
  function x(p) {
    return F.call(String(p), /"/g, "&quot;");
  }
  function L(p) {
    return !nr || !(typeof p == "object" && (nr in p || typeof p[nr] < "u"));
  }
  function k(p) {
    return pr(p) === "[object Array]" && L(p);
  }
  function C(p) {
    return pr(p) === "[object Date]" && L(p);
  }
  function w(p) {
    return pr(p) === "[object RegExp]" && L(p);
  }
  function s(p) {
    return pr(p) === "[object Error]" && L(p);
  }
  function S(p) {
    return pr(p) === "[object String]" && L(p);
  }
  function l(p) {
    return pr(p) === "[object Number]" && L(p);
  }
  function B(p) {
    return pr(p) === "[object Boolean]" && L(p);
  }
  function T(p) {
    if (V)
      return p && typeof p == "object" && p instanceof Symbol;
    if (typeof p == "symbol")
      return !0;
    if (!p || typeof p != "object" || !or)
      return !1;
    try {
      return or.call(p), !0;
    } catch {
    }
    return !1;
  }
  function Z(p) {
    if (!p || typeof p != "object" || !G)
      return !1;
    try {
      return G.call(p), !0;
    } catch {
    }
    return !1;
  }
  var _ = Object.prototype.hasOwnProperty || function(p) {
    return p in this;
  };
  function ar(p, c) {
    return _.call(p, c);
  }
  function pr(p) {
    return I.call(p);
  }
  function lr(p) {
    if (p.name)
      return p.name;
    var c = U.call(b.call(p), /^function\s*([\w$]+)/);
    return c ? c[1] : null;
  }
  function ir(p, c) {
    if (p.indexOf)
      return p.indexOf(c);
    for (var W = 0, fr = p.length; W < fr; W++)
      if (p[W] === c)
        return W;
    return -1;
  }
  function rr(p) {
    if (!t || !p || typeof p != "object")
      return !1;
    try {
      t.call(p);
      try {
        o.call(p);
      } catch {
        return !0;
      }
      return p instanceof Map;
    } catch {
    }
    return !1;
  }
  function cr(p) {
    if (!g || !p || typeof p != "object")
      return !1;
    try {
      g.call(p, g);
      try {
        v.call(p, v);
      } catch {
        return !0;
      }
      return p instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  function vr(p) {
    if (!$ || !p || typeof p != "object")
      return !1;
    try {
      return $.call(p), !0;
    } catch {
    }
    return !1;
  }
  function sr(p) {
    if (!o || !p || typeof p != "object")
      return !1;
    try {
      o.call(p);
      try {
        t.call(p);
      } catch {
        return !0;
      }
      return p instanceof Set;
    } catch {
    }
    return !1;
  }
  function Qr(p) {
    if (!v || !p || typeof p != "object")
      return !1;
    try {
      v.call(p, v);
      try {
        g.call(p, g);
      } catch {
        return !0;
      }
      return p instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  function br(p) {
    return !p || typeof p != "object" ? !1 : typeof HTMLElement < "u" && p instanceof HTMLElement ? !0 : typeof p.nodeName == "string" && typeof p.getAttribute == "function";
  }
  function wr(p, c) {
    if (p.length > c.maxStringLength) {
      var W = p.length - c.maxStringLength, fr = "... " + W + " more character" + (W > 1 ? "s" : "");
      return wr(A.call(p, 0, c.maxStringLength), c) + fr;
    }
    var ur = X[c.quoteStyle || "single"];
    ur.lastIndex = 0;
    var tr = F.call(F.call(p, ur, "\\$1"), /[\x00-\x1f]/g, Tr);
    return u(tr, "single", c);
  }
  function Tr(p) {
    var c = p.charCodeAt(0), W = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[c];
    return W ? "\\" + W : "\\x" + (c < 16 ? "0" : "") + z.call(c.toString(16));
  }
  function $r(p) {
    return "Object(" + p + ")";
  }
  function le(p) {
    return p + " { ? }";
  }
  function Zr(p, c, W, fr) {
    var ur = fr ? m(W, fr) : Q.call(W, ", ");
    return p + " (" + c + ") {" + ur + "}";
  }
  function re(p) {
    for (var c = 0; c < p.length; c++)
      if (ir(p[c], `
`) >= 0)
        return !1;
    return !0;
  }
  function d(p, c) {
    var W;
    if (p.indent === "	")
      W = "	";
    else if (typeof p.indent == "number" && p.indent > 0)
      W = Q.call(Array(p.indent + 1), " ");
    else
      return null;
    return {
      base: W,
      prev: Q.call(Array(c + 1), W)
    };
  }
  function m(p, c) {
    if (p.length === 0)
      return "";
    var W = `
` + c.prev + c.base;
    return W + Q.call(p, "," + W) + `
` + c.prev;
  }
  function yr(p, c) {
    var W = k(p), fr = [];
    if (W) {
      fr.length = p.length;
      for (var ur = 0; ur < p.length; ur++)
        fr[ur] = ar(p, ur) ? c(p[ur], p) : "";
    }
    var tr = typeof H == "function" ? H(p) : [], Ar;
    if (V) {
      Ar = {};
      for (var Ir = 0; Ir < tr.length; Ir++)
        Ar["$" + tr[Ir]] = tr[Ir];
    }
    for (var hr in p)
      ar(p, hr) && (W && String(Number(hr)) === hr && hr < p.length || V && Ar["$" + hr] instanceof Symbol || (D.call(/[^\w$]/, hr) ? fr.push(c(hr, p) + ": " + c(p[hr], p)) : fr.push(hr + ": " + c(p[hr], p))));
    if (typeof H == "function")
      for (var mr = 0; mr < tr.length; mr++)
        dr.call(p, tr[mr]) && fr.push("[" + c(tr[mr]) + "]: " + c(p[tr[mr]], p));
    return fr;
  }
  return an;
}
var yn, Ja;
function uf() {
  if (Ja) return yn;
  Ja = 1;
  var r = /* @__PURE__ */ xe(), e = /* @__PURE__ */ gr(), t = function(y, f, g) {
    for (var h = y, v; (v = h.next) != null; h = v)
      if (v.key === f)
        return h.next = v.next, g || (v.next = /** @type {NonNullable<typeof list.next>} */
        y.next, y.next = v), v;
  }, a = function(y, f) {
    if (y) {
      var g = t(y, f);
      return g && g.value;
    }
  }, n = function(y, f, g) {
    var h = t(y, f);
    h ? h.value = g : y.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key: f,
      next: y.next,
      value: g
    };
  }, i = function(y, f) {
    return y ? !!t(y, f) : !1;
  }, o = function(y, f) {
    if (y)
      return t(y, f, !0);
  };
  return yn = function() {
    var f, g = {
      assert: function(h) {
        if (!g.has(h))
          throw new e("Side channel does not contain " + r(h));
      },
      delete: function(h) {
        var v = f && f.next, E = o(f, h);
        return E && v && v === E && (f = void 0), !!E;
      },
      get: function(h) {
        return a(f, h);
      },
      has: function(h) {
        return i(f, h);
      },
      set: function(h, v) {
        f || (f = {
          next: void 0
        }), n(
          /** @type {NonNullable<typeof $o>} */
          f,
          h,
          v
        );
      }
    };
    return g;
  }, yn;
}
var fn, za;
function sf() {
  return za || (za = 1, fn = Object.getOwnPropertyDescriptor), fn;
}
var pn, Ka;
function lf() {
  if (Ka) return pn;
  Ka = 1;
  var r = /* @__PURE__ */ sf();
  if (r)
    try {
      r([], "length");
    } catch {
      r = null;
    }
  return pn = r, pn;
}
var un, Ya;
function cf() {
  if (Ya) return un;
  Ya = 1;
  var r = Object.defineProperty || !1;
  if (r)
    try {
      r({}, "a", { value: 1 });
    } catch {
      r = !1;
    }
  return un = r, un;
}
var sn, Xa;
function vf() {
  return Xa || (Xa = 1, sn = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), a = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
      return !1;
    var n = 42;
    e[t] = n;
    for (var i in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var y = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, t)
      );
      if (y.value !== n || y.enumerable !== !0)
        return !1;
    }
    return !0;
  }), sn;
}
var ln, Qa;
function df() {
  if (Qa) return ln;
  Qa = 1;
  var r = typeof Symbol < "u" && Symbol, e = vf();
  return ln = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, ln;
}
var cn, Za;
function gf() {
  if (Za) return cn;
  Za = 1;
  var r, e = /* @__PURE__ */ Yr(), t = /* @__PURE__ */ Rr(), a = /* @__PURE__ */ jr(), n = /* @__PURE__ */ Mr(), i = /* @__PURE__ */ _r(), o = /* @__PURE__ */ Er(), y = /* @__PURE__ */ gr(), f = /* @__PURE__ */ Dr(), g = /* @__PURE__ */ me(), h = /* @__PURE__ */ Se(), v = /* @__PURE__ */ Ae(), E = /* @__PURE__ */ be(), $ = /* @__PURE__ */ Pe(), j = /* @__PURE__ */ Oe(), I = /* @__PURE__ */ Ie(), b = Function, U = function(w) {
    try {
      return b('"use strict"; return (' + w + ").constructor;")();
    } catch {
    }
  }, A = /* @__PURE__ */ lf(), F = /* @__PURE__ */ cf(), z = function() {
    throw new y();
  }, K = A ? function() {
    try {
      return arguments.callee, z;
    } catch {
      try {
        return A(arguments, "callee").get;
      } catch {
        return z;
      }
    }
  }() : z, D = df()(), O = ue(), Q = pe(), Y = fe(), er = Kr(), G = zr(), H = {}, or = typeof Uint8Array > "u" || !O ? r : O(Uint8Array), V = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": D && O ? O([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": H,
    "%AsyncGenerator%": H,
    "%AsyncGeneratorFunction%": H,
    "%AsyncIteratorPrototype%": H,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": t,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": a,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": b,
    "%GeneratorFunction%": H,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": D && O ? O(O([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !D || !O ? r : O((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": e,
    "%Object.getOwnPropertyDescriptor%": A,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": n,
    "%ReferenceError%": i,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !D || !O ? r : O((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": D && O ? O(""[Symbol.iterator]()) : r,
    "%Symbol%": D ? Symbol : r,
    "%SyntaxError%": o,
    "%ThrowTypeError%": K,
    "%TypedArray%": or,
    "%TypeError%": y,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": f,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
    "%Function.prototype.call%": G,
    "%Function.prototype.apply%": er,
    "%Object.defineProperty%": F,
    "%Object.getPrototypeOf%": Q,
    "%Math.abs%": g,
    "%Math.floor%": h,
    "%Math.max%": v,
    "%Math.min%": E,
    "%Math.pow%": $,
    "%Math.round%": j,
    "%Math.sign%": I,
    "%Reflect.getPrototypeOf%": Y
  };
  if (O)
    try {
      null.error;
    } catch (w) {
      var nr = O(O(w));
      V["%Error.prototype%"] = nr;
    }
  var dr = function w(s) {
    var S;
    if (s === "%AsyncFunction%")
      S = U("async function () {}");
    else if (s === "%GeneratorFunction%")
      S = U("function* () {}");
    else if (s === "%AsyncGeneratorFunction%")
      S = U("async function* () {}");
    else if (s === "%AsyncGenerator%") {
      var l = w("%AsyncGeneratorFunction%");
      l && (S = l.prototype);
    } else if (s === "%AsyncIteratorPrototype%") {
      var B = w("%AsyncGenerator%");
      B && O && (S = O(B.prototype));
    }
    return V[s] = S, S;
  }, N = {
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
  }, P = Or(), R = /* @__PURE__ */ Fr(), q = P.call(G, Array.prototype.concat), M = P.call(er, Array.prototype.splice), J = P.call(G, String.prototype.replace), X = P.call(G, String.prototype.slice), u = P.call(G, RegExp.prototype.exec), x = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, L = /\\(\\)?/g, k = function(s) {
    var S = X(s, 0, 1), l = X(s, -1);
    if (S === "%" && l !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (l === "%" && S !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var B = [];
    return J(s, x, function(T, Z, _, ar) {
      B[B.length] = _ ? J(ar, L, "$1") : Z || T;
    }), B;
  }, C = function(s, S) {
    var l = s, B;
    if (R(N, l) && (B = N[l], l = "%" + B[0] + "%"), R(V, l)) {
      var T = V[l];
      if (T === H && (T = dr(l)), typeof T > "u" && !S)
        throw new y("intrinsic " + s + " exists, but is not available. Please file an issue!");
      return {
        alias: B,
        name: l,
        value: T
      };
    }
    throw new o("intrinsic " + s + " does not exist!");
  };
  return cn = function(s, S) {
    if (typeof s != "string" || s.length === 0)
      throw new y("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof S != "boolean")
      throw new y('"allowMissing" argument must be a boolean');
    if (u(/^%?[^%]*%?$/, s) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var l = k(s), B = l.length > 0 ? l[0] : "", T = C("%" + B + "%", S), Z = T.name, _ = T.value, ar = !1, pr = T.alias;
    pr && (B = pr[0], M(l, q([0, 1], pr)));
    for (var lr = 1, ir = !0; lr < l.length; lr += 1) {
      var rr = l[lr], cr = X(rr, 0, 1), vr = X(rr, -1);
      if ((cr === '"' || cr === "'" || cr === "`" || vr === '"' || vr === "'" || vr === "`") && cr !== vr)
        throw new o("property names with quotes must have matching quotes");
      if ((rr === "constructor" || !ir) && (ar = !0), B += "." + rr, Z = "%" + B + "%", R(V, Z))
        _ = V[Z];
      else if (_ != null) {
        if (!(rr in _)) {
          if (!S)
            throw new y("base intrinsic for " + s + " exists, but the property is not available.");
          return;
        }
        if (A && lr + 1 >= l.length) {
          var sr = A(_, rr);
          ir = !!sr, ir && "get" in sr && !("originalValue" in sr.get) ? _ = sr.get : _ = _[rr];
        } else
          ir = R(_, rr), _ = _[rr];
        ir && !ar && (V[Z] = _);
      }
    }
    return _;
  }, cn;
}
var vn, ri;
function my() {
  if (ri) return vn;
  ri = 1;
  var r = /* @__PURE__ */ gf(), e = /* @__PURE__ */ Nr(), t = /* @__PURE__ */ xe(), a = /* @__PURE__ */ gr(), n = r("%Map%", !0), i = e("Map.prototype.get", !0), o = e("Map.prototype.set", !0), y = e("Map.prototype.has", !0), f = e("Map.prototype.delete", !0), g = e("Map.prototype.size", !0);
  return vn = !!n && /** @type {Exclude<import('.'), false>} */
  function() {
    var v, E = {
      assert: function($) {
        if (!E.has($))
          throw new a("Side channel does not contain " + t($));
      },
      delete: function($) {
        if (v) {
          var j = f(v, $);
          return g(v) === 0 && (v = void 0), j;
        }
        return !1;
      },
      get: function($) {
        if (v)
          return i(v, $);
      },
      has: function($) {
        return v ? y(v, $) : !1;
      },
      set: function($, j) {
        v || (v = new n()), o(v, $, j);
      }
    };
    return E;
  }, vn;
}
var dn, ei;
function hf() {
  return ei || (ei = 1, dn = Object.getOwnPropertyDescriptor), dn;
}
var gn, ti;
function mf() {
  if (ti) return gn;
  ti = 1;
  var r = /* @__PURE__ */ hf();
  if (r)
    try {
      r([], "length");
    } catch {
      r = null;
    }
  return gn = r, gn;
}
var hn, ni;
function Sf() {
  if (ni) return hn;
  ni = 1;
  var r = Object.defineProperty || !1;
  if (r)
    try {
      r({}, "a", { value: 1 });
    } catch {
      r = !1;
    }
  return hn = r, hn;
}
var mn, oi;
function Af() {
  return oi || (oi = 1, mn = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), a = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
      return !1;
    var n = 42;
    e[t] = n;
    for (var i in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var y = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, t)
      );
      if (y.value !== n || y.enumerable !== !0)
        return !1;
    }
    return !0;
  }), mn;
}
var Sn, ai;
function bf() {
  if (ai) return Sn;
  ai = 1;
  var r = typeof Symbol < "u" && Symbol, e = Af();
  return Sn = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Sn;
}
var An, ii;
function Pf() {
  if (ii) return An;
  ii = 1;
  var r, e = /* @__PURE__ */ Yr(), t = /* @__PURE__ */ Rr(), a = /* @__PURE__ */ jr(), n = /* @__PURE__ */ Mr(), i = /* @__PURE__ */ _r(), o = /* @__PURE__ */ Er(), y = /* @__PURE__ */ gr(), f = /* @__PURE__ */ Dr(), g = /* @__PURE__ */ me(), h = /* @__PURE__ */ Se(), v = /* @__PURE__ */ Ae(), E = /* @__PURE__ */ be(), $ = /* @__PURE__ */ Pe(), j = /* @__PURE__ */ Oe(), I = /* @__PURE__ */ Ie(), b = Function, U = function(w) {
    try {
      return b('"use strict"; return (' + w + ").constructor;")();
    } catch {
    }
  }, A = /* @__PURE__ */ mf(), F = /* @__PURE__ */ Sf(), z = function() {
    throw new y();
  }, K = A ? function() {
    try {
      return arguments.callee, z;
    } catch {
      try {
        return A(arguments, "callee").get;
      } catch {
        return z;
      }
    }
  }() : z, D = bf()(), O = ue(), Q = pe(), Y = fe(), er = Kr(), G = zr(), H = {}, or = typeof Uint8Array > "u" || !O ? r : O(Uint8Array), V = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": D && O ? O([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": H,
    "%AsyncGenerator%": H,
    "%AsyncGeneratorFunction%": H,
    "%AsyncIteratorPrototype%": H,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": t,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": a,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": b,
    "%GeneratorFunction%": H,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": D && O ? O(O([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !D || !O ? r : O((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": e,
    "%Object.getOwnPropertyDescriptor%": A,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": n,
    "%ReferenceError%": i,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !D || !O ? r : O((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": D && O ? O(""[Symbol.iterator]()) : r,
    "%Symbol%": D ? Symbol : r,
    "%SyntaxError%": o,
    "%ThrowTypeError%": K,
    "%TypedArray%": or,
    "%TypeError%": y,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": f,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
    "%Function.prototype.call%": G,
    "%Function.prototype.apply%": er,
    "%Object.defineProperty%": F,
    "%Object.getPrototypeOf%": Q,
    "%Math.abs%": g,
    "%Math.floor%": h,
    "%Math.max%": v,
    "%Math.min%": E,
    "%Math.pow%": $,
    "%Math.round%": j,
    "%Math.sign%": I,
    "%Reflect.getPrototypeOf%": Y
  };
  if (O)
    try {
      null.error;
    } catch (w) {
      var nr = O(O(w));
      V["%Error.prototype%"] = nr;
    }
  var dr = function w(s) {
    var S;
    if (s === "%AsyncFunction%")
      S = U("async function () {}");
    else if (s === "%GeneratorFunction%")
      S = U("function* () {}");
    else if (s === "%AsyncGeneratorFunction%")
      S = U("async function* () {}");
    else if (s === "%AsyncGenerator%") {
      var l = w("%AsyncGeneratorFunction%");
      l && (S = l.prototype);
    } else if (s === "%AsyncIteratorPrototype%") {
      var B = w("%AsyncGenerator%");
      B && O && (S = O(B.prototype));
    }
    return V[s] = S, S;
  }, N = {
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
  }, P = Or(), R = /* @__PURE__ */ Fr(), q = P.call(G, Array.prototype.concat), M = P.call(er, Array.prototype.splice), J = P.call(G, String.prototype.replace), X = P.call(G, String.prototype.slice), u = P.call(G, RegExp.prototype.exec), x = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, L = /\\(\\)?/g, k = function(s) {
    var S = X(s, 0, 1), l = X(s, -1);
    if (S === "%" && l !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (l === "%" && S !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var B = [];
    return J(s, x, function(T, Z, _, ar) {
      B[B.length] = _ ? J(ar, L, "$1") : Z || T;
    }), B;
  }, C = function(s, S) {
    var l = s, B;
    if (R(N, l) && (B = N[l], l = "%" + B[0] + "%"), R(V, l)) {
      var T = V[l];
      if (T === H && (T = dr(l)), typeof T > "u" && !S)
        throw new y("intrinsic " + s + " exists, but is not available. Please file an issue!");
      return {
        alias: B,
        name: l,
        value: T
      };
    }
    throw new o("intrinsic " + s + " does not exist!");
  };
  return An = function(s, S) {
    if (typeof s != "string" || s.length === 0)
      throw new y("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof S != "boolean")
      throw new y('"allowMissing" argument must be a boolean');
    if (u(/^%?[^%]*%?$/, s) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var l = k(s), B = l.length > 0 ? l[0] : "", T = C("%" + B + "%", S), Z = T.name, _ = T.value, ar = !1, pr = T.alias;
    pr && (B = pr[0], M(l, q([0, 1], pr)));
    for (var lr = 1, ir = !0; lr < l.length; lr += 1) {
      var rr = l[lr], cr = X(rr, 0, 1), vr = X(rr, -1);
      if ((cr === '"' || cr === "'" || cr === "`" || vr === '"' || vr === "'" || vr === "`") && cr !== vr)
        throw new o("property names with quotes must have matching quotes");
      if ((rr === "constructor" || !ir) && (ar = !0), B += "." + rr, Z = "%" + B + "%", R(V, Z))
        _ = V[Z];
      else if (_ != null) {
        if (!(rr in _)) {
          if (!S)
            throw new y("base intrinsic for " + s + " exists, but the property is not available.");
          return;
        }
        if (A && lr + 1 >= l.length) {
          var sr = A(_, rr);
          ir = !!sr, ir && "get" in sr && !("originalValue" in sr.get) ? _ = sr.get : _ = _[rr];
        } else
          ir = R(_, rr), _ = _[rr];
        ir && !ar && (V[Z] = _);
      }
    }
    return _;
  }, An;
}
var bn, yi;
function Of() {
  if (yi) return bn;
  yi = 1;
  var r = /* @__PURE__ */ Pf(), e = /* @__PURE__ */ Nr(), t = /* @__PURE__ */ xe(), a = my(), n = /* @__PURE__ */ gr(), i = r("%WeakMap%", !0), o = e("WeakMap.prototype.get", !0), y = e("WeakMap.prototype.set", !0), f = e("WeakMap.prototype.has", !0), g = e("WeakMap.prototype.delete", !0);
  return bn = i ? (
    /** @type {Exclude<import('.'), false>} */
    function() {
      var v, E, $ = {
        assert: function(j) {
          if (!$.has(j))
            throw new n("Side channel does not contain " + t(j));
        },
        delete: function(j) {
          if (i && j && (typeof j == "object" || typeof j == "function")) {
            if (v)
              return g(v, j);
          } else if (a && E)
            return E.delete(j);
          return !1;
        },
        get: function(j) {
          return i && j && (typeof j == "object" || typeof j == "function") && v ? o(v, j) : E && E.get(j);
        },
        has: function(j) {
          return i && j && (typeof j == "object" || typeof j == "function") && v ? f(v, j) : !!E && E.has(j);
        },
        set: function(j, I) {
          i && j && (typeof j == "object" || typeof j == "function") ? (v || (v = new i()), y(v, j, I)) : a && (E || (E = a()), E.set(j, I));
        }
      };
      return $;
    }
  ) : a, bn;
}
var Pn, fi;
function If() {
  if (fi) return Pn;
  fi = 1;
  var r = /* @__PURE__ */ gr(), e = /* @__PURE__ */ xe(), t = uf(), a = my(), n = Of(), i = n || a || t;
  return Pn = function() {
    var y, f = {
      assert: function(g) {
        if (!f.has(g))
          throw new r("Side channel does not contain " + e(g));
      },
      delete: function(g) {
        return !!y && y.delete(g);
      },
      get: function(g) {
        return y && y.get(g);
      },
      has: function(g) {
        return !!y && y.has(g);
      },
      set: function(g, h) {
        y || (y = i()), y.set(g, h);
      }
    };
    return f;
  }, Pn;
}
var On, pi;
function Ef() {
  if (pi) return On;
  pi = 1;
  var r = /* @__PURE__ */ Fr(), e = If()(), t = /* @__PURE__ */ gr(), a = {
    assert: function(n, i) {
      if (!n || typeof n != "object" && typeof n != "function")
        throw new t("`O` is not an object");
      if (typeof i != "string")
        throw new t("`slot` must be a string");
      if (e.assert(n), !a.has(n, i))
        throw new t("`" + i + "` is not present on `O`");
    },
    get: function(n, i) {
      if (!n || typeof n != "object" && typeof n != "function")
        throw new t("`O` is not an object");
      if (typeof i != "string")
        throw new t("`slot` must be a string");
      var o = e.get(n);
      return o && o[
        /** @type {SaltedInternalSlot} */
        "$" + i
      ];
    },
    has: function(n, i) {
      if (!n || typeof n != "object" && typeof n != "function")
        throw new t("`O` is not an object");
      if (typeof i != "string")
        throw new t("`slot` must be a string");
      var o = e.get(n);
      return !!o && r(
        o,
        /** @type {SaltedInternalSlot} */
        "$" + i
      );
    },
    set: function(n, i, o) {
      if (!n || typeof n != "object" && typeof n != "function")
        throw new t("`O` is not an object");
      if (typeof i != "string")
        throw new t("`slot` must be a string");
      var y = e.get(n);
      y || (y = {}, e.set(n, y)), y[
        /** @type {SaltedInternalSlot} */
        "$" + i
      ] = o;
    }
  };
  return Object.freeze && Object.freeze(a), On = a, On;
}
var In, ui;
function wf() {
  if (ui) return In;
  ui = 1;
  var r = Ef(), e = /* @__PURE__ */ Er(), t = typeof StopIteration == "object" ? StopIteration : null;
  return In = function(n) {
    if (!t)
      throw new e("this environment lacks StopIteration");
    r.set(n, "[[Done]]", !1);
    var i = {
      next: (
        /** @type {() => IteratorResult<T>} */
        function() {
          var y = (
            /** @type {typeof origIterator} */
            r.get(this, "[[Iterator]]")
          ), f = !!r.get(y, "[[Done]]");
          try {
            return {
              done: f,
              // eslint-disable-next-line no-extra-parens
              value: f ? void 0 : (
                /** @type {T} */
                y.next()
              )
            };
          } catch (g) {
            if (r.set(y, "[[Done]]", !0), g !== t)
              throw g;
            return {
              done: !0,
              value: void 0
            };
          }
        }
      )
    };
    return r.set(i, "[[Iterator]]", n), i;
  }, In;
}
var En, si;
function Sy() {
  if (si) return En;
  si = 1;
  var r = {}.toString;
  return En = Array.isArray || function(e) {
    return r.call(e) == "[object Array]";
  }, En;
}
var wn, li;
function Ay() {
  if (li) return wn;
  li = 1;
  var r = String.prototype.valueOf, e = function(o) {
    try {
      return r.call(o), !0;
    } catch {
      return !1;
    }
  }, t = Object.prototype.toString, a = "[object String]", n = Xr()();
  return wn = function(o) {
    return typeof o == "string" ? !0 : typeof o != "object" ? !1 : n ? e(o) : t.call(o) === a;
  }, wn;
}
var $n, ci;
function by() {
  if (ci) return $n;
  ci = 1;
  var r = typeof Map == "function" && Map.prototype ? Map : null, e = typeof Set == "function" && Set.prototype ? Set : null, t;
  r || (t = function(o) {
    return !1;
  });
  var a = r ? Map.prototype.has : null, n = e ? Set.prototype.has : null;
  return !t && !a && (t = function(o) {
    return !1;
  }), $n = t || function(o) {
    if (!o || typeof o != "object")
      return !1;
    try {
      if (a.call(o), n)
        try {
          n.call(o);
        } catch {
          return !0;
        }
      return o instanceof r;
    } catch {
    }
    return !1;
  }, $n;
}
var Rn, vi;
function Py() {
  if (vi) return Rn;
  vi = 1;
  var r = typeof Map == "function" && Map.prototype ? Map : null, e = typeof Set == "function" && Set.prototype ? Set : null, t;
  e || (t = function(o) {
    return !1;
  });
  var a = r ? Map.prototype.has : null, n = e ? Set.prototype.has : null;
  return !t && !n && (t = function(o) {
    return !1;
  }), Rn = t || function(o) {
    if (!o || typeof o != "object")
      return !1;
    try {
      if (n.call(o), a)
        try {
          a.call(o);
        } catch {
          return !0;
        }
      return o instanceof e;
    } catch {
    }
    return !1;
  }, Rn;
}
var di;
function $f() {
  if (di) return de.exports;
  di = 1;
  var r = /* @__PURE__ */ gy(), e = /* @__PURE__ */ wf();
  if (ho()() || go()()) {
    var t = Symbol.iterator;
    de.exports = function(Y) {
      if (Y != null && typeof Y[t] < "u")
        return Y[t]();
      if (r(Y))
        return Array.prototype[t].call(Y);
    };
  } else {
    var a = Sy(), n = Ay(), i = /* @__PURE__ */ Vr(), o = i("%Map%", !0), y = i("%Set%", !0), f = se(), g = f("Array.prototype.push"), h = f("String.prototype.charCodeAt"), v = f("String.prototype.slice"), E = function(Y, er) {
      var G = Y.length;
      if (er + 1 >= G)
        return er + 1;
      var H = h(Y, er);
      if (H < 55296 || H > 56319)
        return er + 1;
      var or = h(Y, er + 1);
      return or < 56320 || or > 57343 ? er + 1 : er + 2;
    }, $ = function(Y) {
      var er = 0;
      return {
        next: function() {
          var H = er >= Y.length, or;
          return H || (or = Y[er], er += 1), {
            done: H,
            value: or
          };
        }
      };
    }, j = function(Y, er) {
      if (a(Y) || r(Y))
        return $(Y);
      if (n(Y)) {
        var G = 0;
        return {
          next: function() {
            var or = E(Y, G), V = v(Y, G, or);
            return G = or, {
              done: or > Y.length,
              value: V
            };
          }
        };
      }
      if (er && typeof Y["_es6-shim iterator_"] < "u")
        return Y["_es6-shim iterator_"]();
    };
    if (!o && !y)
      de.exports = function(Y) {
        if (Y != null)
          return j(Y, !0);
      };
    else {
      var I = /* @__PURE__ */ by(), b = /* @__PURE__ */ Py(), U = f("Map.prototype.forEach", !0), A = f("Set.prototype.forEach", !0);
      if (typeof process > "u" || !process.versions || !process.versions.node)
        var F = f("Map.prototype.iterator", !0), z = f("Set.prototype.iterator", !0);
      var K = f("Map.prototype.@@iterator", !0) || f("Map.prototype._es6-shim iterator_", !0), D = f("Set.prototype.@@iterator", !0) || f("Set.prototype._es6-shim iterator_", !0), O = function(Y) {
        if (I(Y)) {
          if (F)
            return e(F(Y));
          if (K)
            return K(Y);
          if (U) {
            var er = [];
            return U(Y, function(H, or) {
              g(er, [or, H]);
            }), $(er);
          }
        }
        if (b(Y)) {
          if (z)
            return e(z(Y));
          if (D)
            return D(Y);
          if (A) {
            var G = [];
            return A(Y, function(H) {
              g(G, H);
            }), $(G);
          }
        }
      };
      de.exports = function(Y) {
        return O(Y) || j(Y);
      };
    }
  }
  return de.exports;
}
var Fn, gi;
function Rf() {
  if (gi) return Fn;
  gi = 1;
  var r = typeof Map == "function" && Map.prototype, e = Object.getOwnPropertyDescriptor && r ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, t = r && e && typeof e.get == "function" ? e.get : null, a = r && Map.prototype.forEach, n = typeof Set == "function" && Set.prototype, i = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, o = n && i && typeof i.get == "function" ? i.get : null, y = n && Set.prototype.forEach, f = typeof WeakMap == "function" && WeakMap.prototype, g = f ? WeakMap.prototype.has : null, h = typeof WeakSet == "function" && WeakSet.prototype, v = h ? WeakSet.prototype.has : null, E = typeof WeakRef == "function" && WeakRef.prototype, $ = E ? WeakRef.prototype.deref : null, j = Boolean.prototype.valueOf, I = Object.prototype.toString, b = Function.prototype.toString, U = String.prototype.match, A = String.prototype.slice, F = String.prototype.replace, z = String.prototype.toUpperCase, K = String.prototype.toLowerCase, D = RegExp.prototype.test, O = Array.prototype.concat, Q = Array.prototype.join, Y = Array.prototype.slice, er = Math.floor, G = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, H = Object.getOwnPropertySymbols, or = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, V = typeof Symbol == "function" && typeof Symbol.iterator == "object", nr = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === V || !0) ? Symbol.toStringTag : null, dr = Object.prototype.propertyIsEnumerable, N = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(d) {
    return d.__proto__;
  } : null);
  function P(d, m) {
    if (d === 1 / 0 || d === -1 / 0 || d !== d || d && d > -1e3 && d < 1e3 || D.call(/e/, m))
      return m;
    var yr = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof d == "number") {
      var p = d < 0 ? -er(-d) : er(d);
      if (p !== d) {
        var c = String(p), W = A.call(m, c.length + 1);
        return F.call(c, yr, "$&_") + "." + F.call(F.call(W, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return F.call(m, yr, "$&_");
  }
  var R = hy, q = R.custom, M = S(q) ? q : null;
  Fn = function d(m, yr, p, c) {
    var W = yr || {};
    if (T(W, "quoteStyle") && W.quoteStyle !== "single" && W.quoteStyle !== "double")
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (T(W, "maxStringLength") && (typeof W.maxStringLength == "number" ? W.maxStringLength < 0 && W.maxStringLength !== 1 / 0 : W.maxStringLength !== null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var fr = T(W, "customInspect") ? W.customInspect : !0;
    if (typeof fr != "boolean" && fr !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (T(W, "indent") && W.indent !== null && W.indent !== "	" && !(parseInt(W.indent, 10) === W.indent && W.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (T(W, "numericSeparator") && typeof W.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var ur = W.numericSeparator;
    if (typeof m > "u")
      return "undefined";
    if (m === null)
      return "null";
    if (typeof m == "boolean")
      return m ? "true" : "false";
    if (typeof m == "string")
      return sr(m, W);
    if (typeof m == "number") {
      if (m === 0)
        return 1 / 0 / m > 0 ? "0" : "-0";
      var tr = String(m);
      return ur ? P(m, tr) : tr;
    }
    if (typeof m == "bigint") {
      var Ar = String(m) + "n";
      return ur ? P(m, Ar) : Ar;
    }
    var Ir = typeof W.depth > "u" ? 5 : W.depth;
    if (typeof p > "u" && (p = 0), p >= Ir && Ir > 0 && typeof m == "object")
      return u(m) ? "[Array]" : "[Object]";
    var hr = le(W, p);
    if (typeof c > "u")
      c = [];
    else if (ar(c, m) >= 0)
      return "[Circular]";
    function mr(qr, ie, ve) {
      if (ie && (c = Y.call(c), c.push(ie)), ve) {
        var xr = {
          depth: W.depth
        };
        return T(W, "quoteStyle") && (xr.quoteStyle = W.quoteStyle), d(qr, xr, p + 1, c);
      }
      return d(qr, W, p + 1, c);
    }
    if (typeof m == "function" && !L(m)) {
      var ee = _(m), Br = re(m, mr);
      return "[Function" + (ee ? ": " + ee : " (anonymous)") + "]" + (Br.length > 0 ? " { " + Q.call(Br, ", ") + " }" : "");
    }
    if (S(m)) {
      var Pr = V ? F.call(String(m), /^(Symbol\(.*\))_[^)]*$/, "$1") : or.call(m);
      return typeof m == "object" && !V ? br(Pr) : Pr;
    }
    if (vr(m)) {
      for (var kr = "<" + K.call(String(m.nodeName)), te = m.attributes || [], Cr = 0; Cr < te.length; Cr++)
        kr += " " + te[Cr].name + "=" + J(X(te[Cr].value), "double", W);
      return kr += ">", m.childNodes && m.childNodes.length && (kr += "..."), kr += "</" + K.call(String(m.nodeName)) + ">", kr;
    }
    if (u(m)) {
      if (m.length === 0)
        return "[]";
      var Ur = re(m, mr);
      return hr && !$r(Ur) ? "[" + Zr(Ur, hr) + "]" : "[ " + Q.call(Ur, ", ") + " ]";
    }
    if (k(m)) {
      var Gr = re(m, mr);
      return !("cause" in Error.prototype) && "cause" in m && !dr.call(m, "cause") ? "{ [" + String(m) + "] " + Q.call(O.call("[cause]: " + mr(m.cause), Gr), ", ") + " }" : Gr.length === 0 ? "[" + String(m) + "]" : "{ [" + String(m) + "] " + Q.call(Gr, ", ") + " }";
    }
    if (typeof m == "object" && fr) {
      if (M && typeof m[M] == "function" && R)
        return R(m, { depth: Ir - p });
      if (fr !== "symbol" && typeof m.inspect == "function")
        return m.inspect();
    }
    if (pr(m)) {
      var Wr = [];
      return a && a.call(m, function(qr, ie) {
        Wr.push(mr(ie, m, !0) + " => " + mr(qr, m));
      }), Tr("Map", t.call(m), Wr, hr);
    }
    if (rr(m)) {
      var ne = [];
      return y && y.call(m, function(qr) {
        ne.push(mr(qr, m));
      }), Tr("Set", o.call(m), ne, hr);
    }
    if (lr(m))
      return wr("WeakMap");
    if (cr(m))
      return wr("WeakSet");
    if (ir(m))
      return wr("WeakRef");
    if (w(m))
      return br(mr(Number(m)));
    if (l(m))
      return br(mr(G.call(m)));
    if (s(m))
      return br(j.call(m));
    if (C(m))
      return br(mr(String(m)));
    if (typeof window < "u" && m === window)
      return "{ [object Window] }";
    if (m === ge)
      return "{ [object globalThis] }";
    if (!x(m) && !L(m)) {
      var Lr = re(m, mr), ce = N ? N(m) === Object.prototype : m instanceof Object || m.constructor === Object, oe = m instanceof Object ? "" : "null prototype", ae = !ce && nr && Object(m) === m && nr in m ? A.call(Z(m), 8, -1) : oe ? "Object" : "", Ee = ce || typeof m.constructor != "function" ? "" : m.constructor.name ? m.constructor.name + " " : "", Hr = Ee + (ae || oe ? "[" + Q.call(O.call([], ae || [], oe || []), ": ") + "] " : "");
      return Lr.length === 0 ? Hr + "{}" : hr ? Hr + "{" + Zr(Lr, hr) + "}" : Hr + "{ " + Q.call(Lr, ", ") + " }";
    }
    return String(m);
  };
  function J(d, m, yr) {
    var p = (yr.quoteStyle || m) === "double" ? '"' : "'";
    return p + d + p;
  }
  function X(d) {
    return F.call(String(d), /"/g, "&quot;");
  }
  function u(d) {
    return Z(d) === "[object Array]" && (!nr || !(typeof d == "object" && nr in d));
  }
  function x(d) {
    return Z(d) === "[object Date]" && (!nr || !(typeof d == "object" && nr in d));
  }
  function L(d) {
    return Z(d) === "[object RegExp]" && (!nr || !(typeof d == "object" && nr in d));
  }
  function k(d) {
    return Z(d) === "[object Error]" && (!nr || !(typeof d == "object" && nr in d));
  }
  function C(d) {
    return Z(d) === "[object String]" && (!nr || !(typeof d == "object" && nr in d));
  }
  function w(d) {
    return Z(d) === "[object Number]" && (!nr || !(typeof d == "object" && nr in d));
  }
  function s(d) {
    return Z(d) === "[object Boolean]" && (!nr || !(typeof d == "object" && nr in d));
  }
  function S(d) {
    if (V)
      return d && typeof d == "object" && d instanceof Symbol;
    if (typeof d == "symbol")
      return !0;
    if (!d || typeof d != "object" || !or)
      return !1;
    try {
      return or.call(d), !0;
    } catch {
    }
    return !1;
  }
  function l(d) {
    if (!d || typeof d != "object" || !G)
      return !1;
    try {
      return G.call(d), !0;
    } catch {
    }
    return !1;
  }
  var B = Object.prototype.hasOwnProperty || function(d) {
    return d in this;
  };
  function T(d, m) {
    return B.call(d, m);
  }
  function Z(d) {
    return I.call(d);
  }
  function _(d) {
    if (d.name)
      return d.name;
    var m = U.call(b.call(d), /^function\s*([\w$]+)/);
    return m ? m[1] : null;
  }
  function ar(d, m) {
    if (d.indexOf)
      return d.indexOf(m);
    for (var yr = 0, p = d.length; yr < p; yr++)
      if (d[yr] === m)
        return yr;
    return -1;
  }
  function pr(d) {
    if (!t || !d || typeof d != "object")
      return !1;
    try {
      t.call(d);
      try {
        o.call(d);
      } catch {
        return !0;
      }
      return d instanceof Map;
    } catch {
    }
    return !1;
  }
  function lr(d) {
    if (!g || !d || typeof d != "object")
      return !1;
    try {
      g.call(d, g);
      try {
        v.call(d, v);
      } catch {
        return !0;
      }
      return d instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  function ir(d) {
    if (!$ || !d || typeof d != "object")
      return !1;
    try {
      return $.call(d), !0;
    } catch {
    }
    return !1;
  }
  function rr(d) {
    if (!o || !d || typeof d != "object")
      return !1;
    try {
      o.call(d);
      try {
        t.call(d);
      } catch {
        return !0;
      }
      return d instanceof Set;
    } catch {
    }
    return !1;
  }
  function cr(d) {
    if (!v || !d || typeof d != "object")
      return !1;
    try {
      v.call(d, v);
      try {
        g.call(d, g);
      } catch {
        return !0;
      }
      return d instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  function vr(d) {
    return !d || typeof d != "object" ? !1 : typeof HTMLElement < "u" && d instanceof HTMLElement ? !0 : typeof d.nodeName == "string" && typeof d.getAttribute == "function";
  }
  function sr(d, m) {
    if (d.length > m.maxStringLength) {
      var yr = d.length - m.maxStringLength, p = "... " + yr + " more character" + (yr > 1 ? "s" : "");
      return sr(A.call(d, 0, m.maxStringLength), m) + p;
    }
    var c = F.call(F.call(d, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Qr);
    return J(c, "single", m);
  }
  function Qr(d) {
    var m = d.charCodeAt(0), yr = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[m];
    return yr ? "\\" + yr : "\\x" + (m < 16 ? "0" : "") + z.call(m.toString(16));
  }
  function br(d) {
    return "Object(" + d + ")";
  }
  function wr(d) {
    return d + " { ? }";
  }
  function Tr(d, m, yr, p) {
    var c = p ? Zr(yr, p) : Q.call(yr, ", ");
    return d + " (" + m + ") {" + c + "}";
  }
  function $r(d) {
    for (var m = 0; m < d.length; m++)
      if (ar(d[m], `
`) >= 0)
        return !1;
    return !0;
  }
  function le(d, m) {
    var yr;
    if (d.indent === "	")
      yr = "	";
    else if (typeof d.indent == "number" && d.indent > 0)
      yr = Q.call(Array(d.indent + 1), " ");
    else
      return null;
    return {
      base: yr,
      prev: Q.call(Array(m + 1), yr)
    };
  }
  function Zr(d, m) {
    if (d.length === 0)
      return "";
    var yr = `
` + m.prev + m.base;
    return yr + Q.call(d, "," + yr) + `
` + m.prev;
  }
  function re(d, m) {
    var yr = u(d), p = [];
    if (yr) {
      p.length = d.length;
      for (var c = 0; c < d.length; c++)
        p[c] = T(d, c) ? m(d[c], d) : "";
    }
    var W = typeof H == "function" ? H(d) : [], fr;
    if (V) {
      fr = {};
      for (var ur = 0; ur < W.length; ur++)
        fr["$" + W[ur]] = W[ur];
    }
    for (var tr in d)
      T(d, tr) && (yr && String(Number(tr)) === tr && tr < d.length || V && fr["$" + tr] instanceof Symbol || (D.call(/[^\w$]/, tr) ? p.push(m(tr, d) + ": " + m(d[tr], d)) : p.push(tr + ": " + m(d[tr], d))));
    if (typeof H == "function")
      for (var Ar = 0; Ar < W.length; Ar++)
        dr.call(d, W[Ar]) && p.push("[" + m(W[Ar]) + "]: " + m(d[W[Ar]], d));
    return p;
  }
  return Fn;
}
var Bn, hi;
function Ff() {
  if (hi) return Bn;
  hi = 1;
  var r = /* @__PURE__ */ Vr(), e = se(), t = /* @__PURE__ */ Rf(), a = /* @__PURE__ */ gr(), n = r("%WeakMap%", !0), i = r("%Map%", !0), o = e("WeakMap.prototype.get", !0), y = e("WeakMap.prototype.set", !0), f = e("WeakMap.prototype.has", !0), g = e("Map.prototype.get", !0), h = e("Map.prototype.set", !0), v = e("Map.prototype.has", !0), E = function(b, U) {
    for (var A = b, F; (F = A.next) !== null; A = F)
      if (F.key === U)
        return A.next = F.next, F.next = /** @type {NonNullable<typeof list.next>} */
        b.next, b.next = F, F;
  }, $ = function(b, U) {
    var A = E(b, U);
    return A && A.value;
  }, j = function(b, U, A) {
    var F = E(b, U);
    F ? F.value = A : b.next = /** @type {import('.').ListNode<typeof value>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key: U,
      next: b.next,
      value: A
    };
  }, I = function(b, U) {
    return !!E(b, U);
  };
  return Bn = function() {
    var U, A, F, z = {
      assert: function(K) {
        if (!z.has(K))
          throw new a("Side channel does not contain " + t(K));
      },
      get: function(K) {
        if (n && K && (typeof K == "object" || typeof K == "function")) {
          if (U)
            return o(U, K);
        } else if (i) {
          if (A)
            return g(A, K);
        } else if (F)
          return $(F, K);
      },
      has: function(K) {
        if (n && K && (typeof K == "object" || typeof K == "function")) {
          if (U)
            return f(U, K);
        } else if (i) {
          if (A)
            return v(A, K);
        } else if (F)
          return I(F, K);
        return !1;
      },
      set: function(K, D) {
        n && K && (typeof K == "object" || typeof K == "function") ? (U || (U = new n()), y(U, K, D)) : i ? (A || (A = new i()), h(A, K, D)) : (F || (F = { key: {}, next: null }), j(F, K, D));
      }
    };
    return z;
  }, Bn;
}
var Un, mi;
function Oy() {
  if (mi) return Un;
  mi = 1;
  var r = function(e) {
    return e !== e;
  };
  return Un = function(t, a) {
    return t === 0 && a === 0 ? 1 / t === 1 / a : !!(t === a || r(t) && r(a));
  }, Un;
}
var qn, Si;
function Iy() {
  if (Si) return qn;
  Si = 1;
  var r = Oy();
  return qn = function() {
    return typeof Object.is == "function" ? Object.is : r;
  }, qn;
}
var xn, Ai;
function Bf() {
  if (Ai) return xn;
  Ai = 1;
  var r = Iy(), e = Jr();
  return xn = function() {
    var a = r();
    return e(Object, { is: a }, {
      is: function() {
        return Object.is !== a;
      }
    }), a;
  }, xn;
}
var jn, bi;
function Uf() {
  if (bi) return jn;
  bi = 1;
  var r = Jr(), e = sy(), t = Oy(), a = Iy(), n = Bf(), i = e(a(), Object);
  return r(i, {
    getPolyfill: a,
    implementation: t,
    shim: n
  }), jn = i, jn;
}
var Mn = { exports: {} }, _n, Pi;
function qf() {
  return Pi || (Pi = 1, _n = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), a = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
      return !1;
    var n = 42;
    e[t] = n;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var i = Object.getOwnPropertySymbols(e);
    if (i.length !== 1 || i[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var o = Object.getOwnPropertyDescriptor(e, t);
      if (o.value !== n || o.enumerable !== !0)
        return !1;
    }
    return !0;
  }), _n;
}
var Dn, Oi;
function xf() {
  if (Oi) return Dn;
  Oi = 1;
  var r = typeof Symbol < "u" && Symbol, e = qf();
  return Dn = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Dn;
}
var Nn, Ii;
function jf() {
  if (Ii) return Nn;
  Ii = 1;
  var r, e = /* @__PURE__ */ Rr(), t = /* @__PURE__ */ jr(), a = /* @__PURE__ */ Mr(), n = /* @__PURE__ */ _r(), i = /* @__PURE__ */ Er(), o = /* @__PURE__ */ gr(), y = /* @__PURE__ */ Dr(), f = Function, g = function(N) {
    try {
      return f('"use strict"; return (' + N + ").constructor;")();
    } catch {
    }
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch {
      h = null;
    }
  var v = function() {
    throw new o();
  }, E = h ? function() {
    try {
      return arguments.callee, v;
    } catch {
      try {
        return h(arguments, "callee").get;
      } catch {
        return v;
      }
    }
  }() : v, $ = xf()(), j = /* @__PURE__ */ Be()(), I = Object.getPrototypeOf || (j ? function(N) {
    return N.__proto__;
  } : null), b = {}, U = typeof Uint8Array > "u" || !I ? r : I(Uint8Array), A = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": $ && I ? I([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": b,
    "%AsyncGenerator%": b,
    "%AsyncGeneratorFunction%": b,
    "%AsyncIteratorPrototype%": b,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": t,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": f,
    "%GeneratorFunction%": b,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": $ && I ? I(I([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !$ || !I ? r : I((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": a,
    "%ReferenceError%": n,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !$ || !I ? r : I((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": $ && I ? I(""[Symbol.iterator]()) : r,
    "%Symbol%": $ ? Symbol : r,
    "%SyntaxError%": i,
    "%ThrowTypeError%": E,
    "%TypedArray%": U,
    "%TypeError%": o,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": y,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet
  };
  if (I)
    try {
      null.error;
    } catch (N) {
      var F = I(I(N));
      A["%Error.prototype%"] = F;
    }
  var z = function N(P) {
    var R;
    if (P === "%AsyncFunction%")
      R = g("async function () {}");
    else if (P === "%GeneratorFunction%")
      R = g("function* () {}");
    else if (P === "%AsyncGeneratorFunction%")
      R = g("async function* () {}");
    else if (P === "%AsyncGenerator%") {
      var q = N("%AsyncGeneratorFunction%");
      q && (R = q.prototype);
    } else if (P === "%AsyncIteratorPrototype%") {
      var M = N("%AsyncGenerator%");
      M && I && (R = I(M.prototype));
    }
    return A[P] = R, R;
  }, K = {
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
  }, D = Or(), O = /* @__PURE__ */ Fr(), Q = D.call(Function.call, Array.prototype.concat), Y = D.call(Function.apply, Array.prototype.splice), er = D.call(Function.call, String.prototype.replace), G = D.call(Function.call, String.prototype.slice), H = D.call(Function.call, RegExp.prototype.exec), or = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, V = /\\(\\)?/g, nr = function(P) {
    var R = G(P, 0, 1), q = G(P, -1);
    if (R === "%" && q !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    if (q === "%" && R !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var M = [];
    return er(P, or, function(J, X, u, x) {
      M[M.length] = u ? er(x, V, "$1") : X || J;
    }), M;
  }, dr = function(P, R) {
    var q = P, M;
    if (O(K, q) && (M = K[q], q = "%" + M[0] + "%"), O(A, q)) {
      var J = A[q];
      if (J === b && (J = z(q)), typeof J > "u" && !R)
        throw new o("intrinsic " + P + " exists, but is not available. Please file an issue!");
      return {
        alias: M,
        name: q,
        value: J
      };
    }
    throw new i("intrinsic " + P + " does not exist!");
  };
  return Nn = function(P, R) {
    if (typeof P != "string" || P.length === 0)
      throw new o("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof R != "boolean")
      throw new o('"allowMissing" argument must be a boolean');
    if (H(/^%?[^%]*%?$/, P) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var q = nr(P), M = q.length > 0 ? q[0] : "", J = dr("%" + M + "%", R), X = J.name, u = J.value, x = !1, L = J.alias;
    L && (M = L[0], Y(q, Q([0, 1], L)));
    for (var k = 1, C = !0; k < q.length; k += 1) {
      var w = q[k], s = G(w, 0, 1), S = G(w, -1);
      if ((s === '"' || s === "'" || s === "`" || S === '"' || S === "'" || S === "`") && s !== S)
        throw new i("property names with quotes must have matching quotes");
      if ((w === "constructor" || !C) && (x = !0), M += "." + w, X = "%" + M + "%", O(A, X))
        u = A[X];
      else if (u != null) {
        if (!(w in u)) {
          if (!R)
            throw new o("base intrinsic for " + P + " exists, but the property is not available.");
          return;
        }
        if (h && k + 1 >= q.length) {
          var l = h(u, w);
          C = !!l, C && "get" in l && !("originalValue" in l.get) ? u = l.get : u = u[w];
        } else
          C = O(u, w), u = u[w];
        C && !x && (A[X] = u);
      }
    }
    return u;
  }, Nn;
}
var Tn, Ei;
function Mf() {
  if (Ei) return Tn;
  Ei = 1;
  var r = /* @__PURE__ */ jf(), e = r("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return Tn = e, Tn;
}
var wi;
function _f() {
  return wi || (wi = 1, function(r) {
    var e = /* @__PURE__ */ he(), t = /* @__PURE__ */ Mf(), a = ye(), n = qe();
    r.exports = function(o) {
      var y = a(arguments), f = o.length - (arguments.length - 1);
      return e(
        y,
        1 + (f > 0 ? f : 0),
        !0
      );
    }, t ? t(r.exports, "apply", { value: n }) : r.exports.apply = n;
  }(Mn)), Mn.exports;
}
var kn, $i;
function Ey() {
  if ($i) return kn;
  $i = 1;
  var r = _f(), e = /* @__PURE__ */ Nr(), t = /* @__PURE__ */ dy(), a = t("%ArrayBuffer%", !0), n = e("ArrayBuffer.prototype.byteLength", !0), i = e("Object.prototype.toString"), o = !!a && !n && new a(0).slice, y = !!o && r(o);
  return kn = n || y ? function(g) {
    if (!g || typeof g != "object")
      return !1;
    try {
      return n ? n(g) : y(g, 0), !0;
    } catch {
      return !1;
    }
  } : a ? function(g) {
    return i(g) === "[object ArrayBuffer]";
  } : function(g) {
    return !1;
  }, kn;
}
var Cn, Ri;
function Df() {
  if (Ri) return Cn;
  Ri = 1;
  var r = /* @__PURE__ */ Nr(), e = r("Date.prototype.getDay"), t = function(y) {
    try {
      return e(y), !0;
    } catch {
      return !1;
    }
  }, a = r("Object.prototype.toString"), n = "[object Date]", i = Xr()();
  return Cn = function(y) {
    return typeof y != "object" || y === null ? !1 : i ? t(y) : a(y) === n;
  }, Cn;
}
var Gn, Fi;
function Nf() {
  if (Fi) return Gn;
  Fi = 1;
  var r = se(), e = Xr()(), t, a, n, i;
  if (e) {
    t = r("Object.prototype.hasOwnProperty"), a = r("RegExp.prototype.exec"), n = {};
    var o = function() {
      throw n;
    };
    i = {
      toString: o,
      valueOf: o
    }, typeof Symbol.toPrimitive == "symbol" && (i[Symbol.toPrimitive] = o);
  }
  var y = r("Object.prototype.toString"), f = Object.getOwnPropertyDescriptor, g = "[object RegExp]";
  return Gn = e ? function(v) {
    if (!v || typeof v != "object")
      return !1;
    var E = f(v, "lastIndex"), $ = E && t(E, "value");
    if (!$)
      return !1;
    try {
      a(v, i);
    } catch (j) {
      return j === n;
    }
  } : function(v) {
    return !v || typeof v != "object" && typeof v != "function" ? !1 : y(v) === g;
  }, Gn;
}
var Wn, Bi;
function Tf() {
  if (Bi) return Wn;
  Bi = 1;
  var r = se(), e = r("SharedArrayBuffer.prototype.byteLength", !0);
  return Wn = e ? function(a) {
    if (!a || typeof a != "object")
      return !1;
    try {
      return e(a), !0;
    } catch {
      return !1;
    }
  } : function(a) {
    return !1;
  }, Wn;
}
var Ln, Ui;
function kf() {
  if (Ui) return Ln;
  Ui = 1;
  var r = Number.prototype.toString, e = function(o) {
    try {
      return r.call(o), !0;
    } catch {
      return !1;
    }
  }, t = Object.prototype.toString, a = "[object Number]", n = Xr()();
  return Ln = function(o) {
    return typeof o == "number" ? !0 : typeof o != "object" ? !1 : n ? e(o) : t.call(o) === a;
  }, Ln;
}
var Hn, qi;
function Cf() {
  if (qi) return Hn;
  qi = 1;
  var r = se(), e = r("Boolean.prototype.toString"), t = r("Object.prototype.toString"), a = function(y) {
    try {
      return e(y), !0;
    } catch {
      return !1;
    }
  }, n = "[object Boolean]", i = Xr()();
  return Hn = function(y) {
    return typeof y == "boolean" ? !0 : y === null || typeof y != "object" ? !1 : i && Symbol.toStringTag in y ? a(y) : t(y) === n;
  }, Hn;
}
var $e = { exports: {} }, xi;
function Gf() {
  if (xi) return $e.exports;
  xi = 1;
  var r = Object.prototype.toString, e = ho()();
  if (e) {
    var t = Symbol.prototype.toString, a = /^Symbol\(.*\)$/, n = function(o) {
      return typeof o.valueOf() != "symbol" ? !1 : a.test(t.call(o));
    };
    $e.exports = function(o) {
      if (typeof o == "symbol")
        return !0;
      if (r.call(o) !== "[object Symbol]")
        return !1;
      try {
        return n(o);
      } catch {
        return !1;
      }
    };
  } else
    $e.exports = function(o) {
      return !1;
    };
  return $e.exports;
}
var Re = { exports: {} }, Vn, ji;
function Wf() {
  if (ji) return Vn;
  ji = 1;
  var r = typeof BigInt < "u" && BigInt;
  return Vn = function() {
    return typeof r == "function" && typeof BigInt == "function" && typeof r(42) == "bigint" && typeof BigInt(42) == "bigint";
  }, Vn;
}
var Mi;
function Lf() {
  if (Mi) return Re.exports;
  Mi = 1;
  var r = Wf()();
  if (r) {
    var e = BigInt.prototype.valueOf, t = function(n) {
      try {
        return e.call(n), !0;
      } catch {
      }
      return !1;
    };
    Re.exports = function(n) {
      return n === null || typeof n > "u" || typeof n == "boolean" || typeof n == "string" || typeof n == "number" || typeof n == "symbol" || typeof n == "function" ? !1 : typeof n == "bigint" ? !0 : t(n);
    };
  } else
    Re.exports = function(n) {
      return !1;
    };
  return Re.exports;
}
var Jn, _i;
function Hf() {
  if (_i) return Jn;
  _i = 1;
  var r = Ay(), e = kf(), t = Cf(), a = Gf(), n = Lf();
  return Jn = function(o) {
    if (o == null || typeof o != "object" && typeof o != "function")
      return null;
    if (r(o))
      return "String";
    if (e(o))
      return "Number";
    if (t(o))
      return "Boolean";
    if (a(o))
      return "Symbol";
    if (n(o))
      return "BigInt";
  }, Jn;
}
var zn, Di;
function Vf() {
  if (Di) return zn;
  Di = 1;
  var r = typeof WeakMap == "function" && WeakMap.prototype ? WeakMap : null, e = typeof WeakSet == "function" && WeakSet.prototype ? WeakSet : null, t;
  r || (t = function(o) {
    return !1;
  });
  var a = r ? r.prototype.has : null, n = e ? e.prototype.has : null;
  return !t && !a && (t = function(o) {
    return !1;
  }), zn = t || function(o) {
    if (!o || typeof o != "object")
      return !1;
    try {
      if (a.call(o, a), n)
        try {
          n.call(o, n);
        } catch {
          return !0;
        }
      return o instanceof r;
    } catch {
    }
    return !1;
  }, zn;
}
var Fe = { exports: {} }, Kn, Ni;
function Jf() {
  return Ni || (Ni = 1, Kn = Object.getOwnPropertyDescriptor), Kn;
}
var Yn, Ti;
function zf() {
  if (Ti) return Yn;
  Ti = 1;
  var r = /* @__PURE__ */ Jf();
  if (r)
    try {
      r([], "length");
    } catch {
      r = null;
    }
  return Yn = r, Yn;
}
var Xn, ki;
function Kf() {
  if (ki) return Xn;
  ki = 1;
  var r = Object.defineProperty || !1;
  if (r)
    try {
      r({}, "a", { value: 1 });
    } catch {
      r = !1;
    }
  return Xn = r, Xn;
}
var Qn, Ci;
function Yf() {
  return Ci || (Ci = 1, Qn = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), a = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
      return !1;
    var n = 42;
    e[t] = n;
    for (var i in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(e);
    if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var y = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, t)
      );
      if (y.value !== n || y.enumerable !== !0)
        return !1;
    }
    return !0;
  }), Qn;
}
var Zn, Gi;
function Xf() {
  if (Gi) return Zn;
  Gi = 1;
  var r = typeof Symbol < "u" && Symbol, e = Yf();
  return Zn = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Zn;
}
var ro, Wi;
function Qf() {
  if (Wi) return ro;
  Wi = 1;
  var r, e = /* @__PURE__ */ Yr(), t = /* @__PURE__ */ Rr(), a = /* @__PURE__ */ jr(), n = /* @__PURE__ */ Mr(), i = /* @__PURE__ */ _r(), o = /* @__PURE__ */ Er(), y = /* @__PURE__ */ gr(), f = /* @__PURE__ */ Dr(), g = /* @__PURE__ */ me(), h = /* @__PURE__ */ Se(), v = /* @__PURE__ */ Ae(), E = /* @__PURE__ */ be(), $ = /* @__PURE__ */ Pe(), j = /* @__PURE__ */ Oe(), I = /* @__PURE__ */ Ie(), b = Function, U = function(w) {
    try {
      return b('"use strict"; return (' + w + ").constructor;")();
    } catch {
    }
  }, A = /* @__PURE__ */ zf(), F = /* @__PURE__ */ Kf(), z = function() {
    throw new y();
  }, K = A ? function() {
    try {
      return arguments.callee, z;
    } catch {
      try {
        return A(arguments, "callee").get;
      } catch {
        return z;
      }
    }
  }() : z, D = Xf()(), O = ue(), Q = pe(), Y = fe(), er = Kr(), G = zr(), H = {}, or = typeof Uint8Array > "u" || !O ? r : O(Uint8Array), V = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": D && O ? O([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": H,
    "%AsyncGenerator%": H,
    "%AsyncGeneratorFunction%": H,
    "%AsyncIteratorPrototype%": H,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": t,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": a,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": b,
    "%GeneratorFunction%": H,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": D && O ? O(O([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !D || !O ? r : O((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": e,
    "%Object.getOwnPropertyDescriptor%": A,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": n,
    "%ReferenceError%": i,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !D || !O ? r : O((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": D && O ? O(""[Symbol.iterator]()) : r,
    "%Symbol%": D ? Symbol : r,
    "%SyntaxError%": o,
    "%ThrowTypeError%": K,
    "%TypedArray%": or,
    "%TypeError%": y,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": f,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
    "%Function.prototype.call%": G,
    "%Function.prototype.apply%": er,
    "%Object.defineProperty%": F,
    "%Object.getPrototypeOf%": Q,
    "%Math.abs%": g,
    "%Math.floor%": h,
    "%Math.max%": v,
    "%Math.min%": E,
    "%Math.pow%": $,
    "%Math.round%": j,
    "%Math.sign%": I,
    "%Reflect.getPrototypeOf%": Y
  };
  if (O)
    try {
      null.error;
    } catch (w) {
      var nr = O(O(w));
      V["%Error.prototype%"] = nr;
    }
  var dr = function w(s) {
    var S;
    if (s === "%AsyncFunction%")
      S = U("async function () {}");
    else if (s === "%GeneratorFunction%")
      S = U("function* () {}");
    else if (s === "%AsyncGeneratorFunction%")
      S = U("async function* () {}");
    else if (s === "%AsyncGenerator%") {
      var l = w("%AsyncGeneratorFunction%");
      l && (S = l.prototype);
    } else if (s === "%AsyncIteratorPrototype%") {
      var B = w("%AsyncGenerator%");
      B && O && (S = O(B.prototype));
    }
    return V[s] = S, S;
  }, N = {
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
  }, P = Or(), R = /* @__PURE__ */ Fr(), q = P.call(G, Array.prototype.concat), M = P.call(er, Array.prototype.splice), J = P.call(G, String.prototype.replace), X = P.call(G, String.prototype.slice), u = P.call(G, RegExp.prototype.exec), x = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, L = /\\(\\)?/g, k = function(s) {
    var S = X(s, 0, 1), l = X(s, -1);
    if (S === "%" && l !== "%")
      throw new o("invalid intrinsic syntax, expected closing `%`");
    if (l === "%" && S !== "%")
      throw new o("invalid intrinsic syntax, expected opening `%`");
    var B = [];
    return J(s, x, function(T, Z, _, ar) {
      B[B.length] = _ ? J(ar, L, "$1") : Z || T;
    }), B;
  }, C = function(s, S) {
    var l = s, B;
    if (R(N, l) && (B = N[l], l = "%" + B[0] + "%"), R(V, l)) {
      var T = V[l];
      if (T === H && (T = dr(l)), typeof T > "u" && !S)
        throw new y("intrinsic " + s + " exists, but is not available. Please file an issue!");
      return {
        alias: B,
        name: l,
        value: T
      };
    }
    throw new o("intrinsic " + s + " does not exist!");
  };
  return ro = function(s, S) {
    if (typeof s != "string" || s.length === 0)
      throw new y("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof S != "boolean")
      throw new y('"allowMissing" argument must be a boolean');
    if (u(/^%?[^%]*%?$/, s) === null)
      throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var l = k(s), B = l.length > 0 ? l[0] : "", T = C("%" + B + "%", S), Z = T.name, _ = T.value, ar = !1, pr = T.alias;
    pr && (B = pr[0], M(l, q([0, 1], pr)));
    for (var lr = 1, ir = !0; lr < l.length; lr += 1) {
      var rr = l[lr], cr = X(rr, 0, 1), vr = X(rr, -1);
      if ((cr === '"' || cr === "'" || cr === "`" || vr === '"' || vr === "'" || vr === "`") && cr !== vr)
        throw new o("property names with quotes must have matching quotes");
      if ((rr === "constructor" || !ir) && (ar = !0), B += "." + rr, Z = "%" + B + "%", R(V, Z))
        _ = V[Z];
      else if (_ != null) {
        if (!(rr in _)) {
          if (!S)
            throw new y("base intrinsic for " + s + " exists, but the property is not available.");
          return;
        }
        if (A && lr + 1 >= l.length) {
          var sr = A(_, rr);
          ir = !!sr, ir && "get" in sr && !("originalValue" in sr.get) ? _ = sr.get : _ = _[rr];
        } else
          ir = R(_, rr), _ = _[rr];
        ir && !ar && (V[Z] = _);
      }
    }
    return _;
  }, ro;
}
var Li;
function Zf() {
  if (Li) return Fe.exports;
  Li = 1;
  var r = /* @__PURE__ */ Qf(), e = /* @__PURE__ */ Nr(), t = r("%WeakSet%", !0), a = e("WeakSet.prototype.has", !0);
  if (a) {
    var n = e("WeakMap.prototype.has", !0);
    Fe.exports = function(o) {
      if (!o || typeof o != "object")
        return !1;
      try {
        if (a(o, a), n)
          try {
            n(o, n);
          } catch {
            return !0;
          }
        return o instanceof t;
      } catch {
      }
      return !1;
    };
  } else
    Fe.exports = function(o) {
      return !1;
    };
  return Fe.exports;
}
var eo, Hi;
function rp() {
  if (Hi) return eo;
  Hi = 1;
  var r = /* @__PURE__ */ by(), e = /* @__PURE__ */ Py(), t = Vf(), a = /* @__PURE__ */ Zf();
  return eo = function(i) {
    if (i && typeof i == "object") {
      if (r(i))
        return "Map";
      if (e(i))
        return "Set";
      if (t(i))
        return "WeakMap";
      if (a(i))
        return "WeakSet";
    }
    return !1;
  }, eo;
}
var to, Vi;
function ep() {
  if (Vi) return to;
  Vi = 1;
  var r = Function.prototype.toString, e = typeof Reflect == "object" && Reflect !== null && Reflect.apply, t, a;
  if (typeof e == "function" && typeof Object.defineProperty == "function")
    try {
      t = Object.defineProperty({}, "length", {
        get: function() {
          throw a;
        }
      }), a = {}, e(function() {
        throw 42;
      }, null, t);
    } catch (A) {
      A !== a && (e = null);
    }
  else
    e = null;
  var n = /^\s*class\b/, i = function(F) {
    try {
      var z = r.call(F);
      return n.test(z);
    } catch {
      return !1;
    }
  }, o = function(F) {
    try {
      return i(F) ? !1 : (r.call(F), !0);
    } catch {
      return !1;
    }
  }, y = Object.prototype.toString, f = "[object Object]", g = "[object Function]", h = "[object GeneratorFunction]", v = "[object HTMLAllCollection]", E = "[object HTML document.all class]", $ = "[object HTMLCollection]", j = typeof Symbol == "function" && !!Symbol.toStringTag, I = !(0 in [,]), b = function() {
    return !1;
  };
  if (typeof document == "object") {
    var U = document.all;
    y.call(U) === y.call(document.all) && (b = function(F) {
      if ((I || !F) && (typeof F > "u" || typeof F == "object"))
        try {
          var z = y.call(F);
          return (z === v || z === E || z === $ || z === f) && F("") == null;
        } catch {
        }
      return !1;
    });
  }
  return to = e ? function(F) {
    if (b(F))
      return !0;
    if (!F || typeof F != "function" && typeof F != "object")
      return !1;
    try {
      e(F, null, t);
    } catch (z) {
      if (z !== a)
        return !1;
    }
    return !i(F) && o(F);
  } : function(F) {
    if (b(F))
      return !0;
    if (!F || typeof F != "function" && typeof F != "object")
      return !1;
    if (j)
      return o(F);
    if (i(F))
      return !1;
    var z = y.call(F);
    return z !== g && z !== h && !/^\[object HTML/.test(z) ? !1 : o(F);
  }, to;
}
var no, Ji;
function tp() {
  if (Ji) return no;
  Ji = 1;
  var r = ep(), e = Object.prototype.toString, t = Object.prototype.hasOwnProperty, a = function(f, g, h) {
    for (var v = 0, E = f.length; v < E; v++)
      t.call(f, v) && (h == null ? g(f[v], v, f) : g.call(h, f[v], v, f));
  }, n = function(f, g, h) {
    for (var v = 0, E = f.length; v < E; v++)
      h == null ? g(f.charAt(v), v, f) : g.call(h, f.charAt(v), v, f);
  }, i = function(f, g, h) {
    for (var v in f)
      t.call(f, v) && (h == null ? g(f[v], v, f) : g.call(h, f[v], v, f));
  }, o = function(f, g, h) {
    if (!r(g))
      throw new TypeError("iterator must be a function");
    var v;
    arguments.length >= 3 && (v = h), e.call(f) === "[object Array]" ? a(f, g, v) : typeof f == "string" ? n(f, g, v) : i(f, g, v);
  };
  return no = o, no;
}
var oo, zi;
function np() {
  return zi || (zi = 1, oo = [
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
  ]), oo;
}
var ao, Ki;
function op() {
  if (Ki) return ao;
  Ki = 1;
  var r = /* @__PURE__ */ np(), e = typeof globalThis > "u" ? ge : globalThis;
  return ao = function() {
    for (var a = [], n = 0; n < r.length; n++)
      typeof e[r[n]] == "function" && (a[a.length] = r[n]);
    return a;
  }, ao;
}
var io = { exports: {} }, yo, Yi;
function ap() {
  return Yi || (Yi = 1, yo = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), a = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
      return !1;
    var n = 42;
    e[t] = n;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var i = Object.getOwnPropertySymbols(e);
    if (i.length !== 1 || i[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var o = Object.getOwnPropertyDescriptor(e, t);
      if (o.value !== n || o.enumerable !== !0)
        return !1;
    }
    return !0;
  }), yo;
}
var fo, Xi;
function ip() {
  if (Xi) return fo;
  Xi = 1;
  var r = typeof Symbol < "u" && Symbol, e = ap();
  return fo = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, fo;
}
var po, Qi;
function yp() {
  if (Qi) return po;
  Qi = 1;
  var r, e = /* @__PURE__ */ Rr(), t = /* @__PURE__ */ jr(), a = /* @__PURE__ */ Mr(), n = /* @__PURE__ */ _r(), i = /* @__PURE__ */ Er(), o = /* @__PURE__ */ gr(), y = /* @__PURE__ */ Dr(), f = Function, g = function(N) {
    try {
      return f('"use strict"; return (' + N + ").constructor;")();
    } catch {
    }
  }, h = Object.getOwnPropertyDescriptor;
  if (h)
    try {
      h({}, "");
    } catch {
      h = null;
    }
  var v = function() {
    throw new o();
  }, E = h ? function() {
    try {
      return arguments.callee, v;
    } catch {
      try {
        return h(arguments, "callee").get;
      } catch {
        return v;
      }
    }
  }() : v, $ = ip()(), j = /* @__PURE__ */ Be()(), I = Object.getPrototypeOf || (j ? function(N) {
    return N.__proto__;
  } : null), b = {}, U = typeof Uint8Array > "u" || !I ? r : I(Uint8Array), A = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? r : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
    "%ArrayIteratorPrototype%": $ && I ? I([][Symbol.iterator]()) : r,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": b,
    "%AsyncGenerator%": b,
    "%AsyncGeneratorFunction%": b,
    "%AsyncIteratorPrototype%": b,
    "%Atomics%": typeof Atomics > "u" ? r : Atomics,
    "%BigInt%": typeof BigInt > "u" ? r : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? r : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? r : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? r : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": e,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": t,
    "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
    "%Function%": f,
    "%GeneratorFunction%": b,
    "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": $ && I ? I(I([][Symbol.iterator]())) : r,
    "%JSON%": typeof JSON == "object" ? JSON : r,
    "%Map%": typeof Map > "u" ? r : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !$ || !I ? r : I((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? r : Promise,
    "%Proxy%": typeof Proxy > "u" ? r : Proxy,
    "%RangeError%": a,
    "%ReferenceError%": n,
    "%Reflect%": typeof Reflect > "u" ? r : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? r : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !$ || !I ? r : I((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": $ && I ? I(""[Symbol.iterator]()) : r,
    "%Symbol%": $ ? Symbol : r,
    "%SyntaxError%": i,
    "%ThrowTypeError%": E,
    "%TypedArray%": U,
    "%TypeError%": o,
    "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
    "%URIError%": y,
    "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet
  };
  if (I)
    try {
      null.error;
    } catch (N) {
      var F = I(I(N));
      A["%Error.prototype%"] = F;
    }
  var z = function N(P) {
    var R;
    if (P === "%AsyncFunction%")
      R = g("async function () {}");
    else if (P === "%GeneratorFunction%")
      R = g("function* () {}");
    else if (P === "%AsyncGeneratorFunction%")
      R = g("async function* () {}");
    else if (P === "%AsyncGenerator%") {
      var q = N("%AsyncGeneratorFunction%");
      q && (R = q.prototype);
    } else if (P === "%AsyncIteratorPrototype%") {
      var M = N("%AsyncGenerator%");
      M && I && (R = I(M.prototype));
    }
    return A[P] = R, R;
  }, K = {
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
  }, D = Or(), O = /* @__PURE__ */ Fr(), Q = D.call(Function.call, Array.prototype.concat), Y = D.call(Function.apply, Array.prototype.splice), er = D.call(Function.call, String.prototype.replace), G = D.call(Function.call, String.prototype.slice), H = D.call(Function.call, RegExp.prototype.exec), or = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, V = /\\(\\)?/g, nr = function(P) {
    var R = G(P, 0, 1), q = G(P, -1);
    if (R === "%" && q !== "%")
      throw new i("invalid intrinsic syntax, expected closing `%`");
    if (q === "%" && R !== "%")
      throw new i("invalid intrinsic syntax, expected opening `%`");
    var M = [];
    return er(P, or, function(J, X, u, x) {
      M[M.length] = u ? er(x, V, "$1") : X || J;
    }), M;
  }, dr = function(P, R) {
    var q = P, M;
    if (O(K, q) && (M = K[q], q = "%" + M[0] + "%"), O(A, q)) {
      var J = A[q];
      if (J === b && (J = z(q)), typeof J > "u" && !R)
        throw new o("intrinsic " + P + " exists, but is not available. Please file an issue!");
      return {
        alias: M,
        name: q,
        value: J
      };
    }
    throw new i("intrinsic " + P + " does not exist!");
  };
  return po = function(P, R) {
    if (typeof P != "string" || P.length === 0)
      throw new o("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof R != "boolean")
      throw new o('"allowMissing" argument must be a boolean');
    if (H(/^%?[^%]*%?$/, P) === null)
      throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var q = nr(P), M = q.length > 0 ? q[0] : "", J = dr("%" + M + "%", R), X = J.name, u = J.value, x = !1, L = J.alias;
    L && (M = L[0], Y(q, Q([0, 1], L)));
    for (var k = 1, C = !0; k < q.length; k += 1) {
      var w = q[k], s = G(w, 0, 1), S = G(w, -1);
      if ((s === '"' || s === "'" || s === "`" || S === '"' || S === "'" || S === "`") && s !== S)
        throw new i("property names with quotes must have matching quotes");
      if ((w === "constructor" || !C) && (x = !0), M += "." + w, X = "%" + M + "%", O(A, X))
        u = A[X];
      else if (u != null) {
        if (!(w in u)) {
          if (!R)
            throw new o("base intrinsic for " + P + " exists, but the property is not available.");
          return;
        }
        if (h && k + 1 >= q.length) {
          var l = h(u, w);
          C = !!l, C && "get" in l && !("originalValue" in l.get) ? u = l.get : u = u[w];
        } else
          C = O(u, w), u = u[w];
        C && !x && (A[X] = u);
      }
    }
    return u;
  }, po;
}
var uo, Zi;
function fp() {
  if (Zi) return uo;
  Zi = 1;
  var r = /* @__PURE__ */ yp(), e = r("%Object.defineProperty%", !0) || !1;
  if (e)
    try {
      e({}, "a", { value: 1 });
    } catch {
      e = !1;
    }
  return uo = e, uo;
}
var ry;
function pp() {
  return ry || (ry = 1, function(r) {
    var e = /* @__PURE__ */ he(), t = /* @__PURE__ */ fp(), a = ye(), n = qe();
    r.exports = function(o) {
      var y = a(arguments), f = o.length - (arguments.length - 1);
      return e(
        y,
        1 + (f > 0 ? f : 0),
        !0
      );
    }, t ? t(r.exports, "apply", { value: n }) : r.exports.apply = n;
  }(io)), io.exports;
}
var so, ey;
function up() {
  if (ey) return so;
  ey = 1;
  var r = tp(), e = /* @__PURE__ */ op(), t = pp(), a = /* @__PURE__ */ Nr(), n = /* @__PURE__ */ vy(), i = a("Object.prototype.toString"), o = Xr()(), y = typeof globalThis > "u" ? ge : globalThis, f = e(), g = a("String.prototype.slice"), h = Object.getPrototypeOf, v = a("Array.prototype.indexOf", !0) || function(b, U) {
    for (var A = 0; A < b.length; A += 1)
      if (b[A] === U)
        return A;
    return -1;
  }, E = { __proto__: null };
  o && n && h ? r(f, function(I) {
    var b = new y[I]();
    if (Symbol.toStringTag in b) {
      var U = h(b), A = n(U, Symbol.toStringTag);
      if (!A) {
        var F = h(U);
        A = n(F, Symbol.toStringTag);
      }
      E["$" + I] = t(A.get);
    }
  }) : r(f, function(I) {
    var b = new y[I](), U = b.slice || b.set;
    U && (E["$" + I] = t(U));
  });
  var $ = function(b) {
    var U = !1;
    return r(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      E,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(A, F) {
        if (!U)
          try {
            "$" + A(b) === F && (U = g(F, 1));
          } catch {
          }
      }
    ), U;
  }, j = function(b) {
    var U = !1;
    return r(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      E,
      /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
      function(A, F) {
        if (!U)
          try {
            A(b), U = g(F, 1);
          } catch {
          }
      }
    ), U;
  };
  return so = function(b) {
    if (!b || typeof b != "object")
      return !1;
    if (!o) {
      var U = g(i(b), 8, -1);
      return v(f, U) > -1 ? U : U !== "Object" ? !1 : j(b);
    }
    return n ? $(b) : null;
  }, so;
}
var lo, ty;
function sp() {
  if (ty) return lo;
  ty = 1;
  var r = /* @__PURE__ */ Nr(), e = r("ArrayBuffer.prototype.byteLength", !0), t = /* @__PURE__ */ Ey();
  return lo = function(n) {
    return t(n) ? e ? e(n) : n.byteLength : NaN;
  }, lo;
}
var co, ny;
function lp() {
  if (ny) return co;
  ny = 1;
  var r = Yy(), e = se(), t = nf(), a = /* @__PURE__ */ dy(), n = $f(), i = Ff(), o = Uf(), y = /* @__PURE__ */ gy(), f = Sy(), g = /* @__PURE__ */ Ey(), h = /* @__PURE__ */ Df(), v = Nf(), E = /* @__PURE__ */ Tf(), $ = vo(), j = Hf(), I = /* @__PURE__ */ rp(), b = /* @__PURE__ */ up(), U = /* @__PURE__ */ sp(), A = e("SharedArrayBuffer.prototype.byteLength", !0), F = e("Date.prototype.getTime"), z = Object.getPrototypeOf, K = e("Object.prototype.toString"), D = a("%Set%", !0), O = e("Map.prototype.has", !0), Q = e("Map.prototype.get", !0), Y = e("Map.prototype.size", !0), er = e("Set.prototype.add", !0), G = e("Set.prototype.delete", !0), H = e("Set.prototype.has", !0), or = e("Set.prototype.size", !0);
  function V(u, x, L, k) {
    for (var C = n(u), w; (w = C.next()) && !w.done; )
      if (R(x, w.value, L, k))
        return G(u, w.value), !0;
    return !1;
  }
  function nr(u) {
    if (typeof u > "u")
      return null;
    if (typeof u != "object")
      return typeof u == "symbol" ? !1 : typeof u == "string" || typeof u == "number" ? +u == +u : !0;
  }
  function dr(u, x, L, k, C, w) {
    var s = nr(L);
    if (s != null)
      return s;
    var S = Q(x, s), l = r({}, C, { strict: !1 });
    return typeof S > "u" && !O(x, s) || !R(k, S, l, w) ? !1 : !O(u, s) && R(k, S, l, w);
  }
  function N(u, x, L) {
    var k = nr(L);
    return k ?? (H(x, k) && !H(u, k));
  }
  function P(u, x, L, k, C, w) {
    for (var s = n(u), S, l; (S = s.next()) && !S.done; )
      if (l = S.value, // eslint-disable-next-line no-use-before-define
      R(L, l, C, w) && R(k, Q(x, l), C, w))
        return G(u, l), !0;
    return !1;
  }
  function R(u, x, L, k) {
    var C = L || {};
    if (C.strict ? o(u, x) : u === x)
      return !0;
    var w = j(u), s = j(x);
    if (w !== s)
      return !1;
    if (!u || !x || typeof u != "object" && typeof x != "object")
      return C.strict ? o(u, x) : u == x;
    var S = k.has(u), l = k.has(x), B;
    if (S && l) {
      if (k.get(u) === k.get(x))
        return !0;
    } else
      B = {};
    return S || k.set(u, B), l || k.set(x, B), X(u, x, C, k);
  }
  function q(u) {
    return !u || typeof u != "object" || typeof u.length != "number" || typeof u.copy != "function" || typeof u.slice != "function" || u.length > 0 && typeof u[0] != "number" ? !1 : !!(u.constructor && u.constructor.isBuffer && u.constructor.isBuffer(u));
  }
  function M(u, x, L, k) {
    if (or(u) !== or(x))
      return !1;
    for (var C = n(u), w = n(x), s, S, l; (s = C.next()) && !s.done; )
      if (s.value && typeof s.value == "object")
        l || (l = new D()), er(l, s.value);
      else if (!H(x, s.value)) {
        if (L.strict || !N(u, x, s.value))
          return !1;
        l || (l = new D()), er(l, s.value);
      }
    if (l) {
      for (; (S = w.next()) && !S.done; )
        if (S.value && typeof S.value == "object") {
          if (!V(l, S.value, L.strict, k))
            return !1;
        } else if (!L.strict && !H(u, S.value) && !V(l, S.value, L.strict, k))
          return !1;
      return or(l) === 0;
    }
    return !0;
  }
  function J(u, x, L, k) {
    if (Y(u) !== Y(x))
      return !1;
    for (var C = n(u), w = n(x), s, S, l, B, T, Z; (s = C.next()) && !s.done; )
      if (B = s.value[0], T = s.value[1], B && typeof B == "object")
        l || (l = new D()), er(l, B);
      else if (Z = Q(x, B), typeof Z > "u" && !O(x, B) || !R(T, Z, L, k)) {
        if (L.strict || !dr(u, x, B, T, L, k))
          return !1;
        l || (l = new D()), er(l, B);
      }
    if (l) {
      for (; (S = w.next()) && !S.done; )
        if (B = S.value[0], Z = S.value[1], B && typeof B == "object") {
          if (!P(l, u, B, Z, L, k))
            return !1;
        } else if (!L.strict && (!u.has(B) || !R(Q(u, B), Z, L, k)) && !P(l, u, B, Z, r({}, L, { strict: !1 }), k))
          return !1;
      return or(l) === 0;
    }
    return !0;
  }
  function X(u, x, L, k) {
    var C, w;
    if (typeof u != typeof x || u == null || x == null || K(u) !== K(x) || y(u) !== y(x))
      return !1;
    var s = f(u), S = f(x);
    if (s !== S)
      return !1;
    var l = u instanceof Error, B = x instanceof Error;
    if (l !== B || (l || B) && (u.name !== x.name || u.message !== x.message))
      return !1;
    var T = v(u), Z = v(x);
    if (T !== Z || (T || Z) && (u.source !== x.source || t(u) !== t(x)))
      return !1;
    var _ = h(u), ar = h(x);
    if (_ !== ar || (_ || ar) && F(u) !== F(x) || L.strict && z && z(u) !== z(x))
      return !1;
    var pr = b(u), lr = b(x);
    if (pr !== lr)
      return !1;
    if (pr || lr) {
      if (u.length !== x.length)
        return !1;
      for (C = 0; C < u.length; C++)
        if (u[C] !== x[C])
          return !1;
      return !0;
    }
    var ir = q(u), rr = q(x);
    if (ir !== rr)
      return !1;
    if (ir || rr) {
      if (u.length !== x.length)
        return !1;
      for (C = 0; C < u.length; C++)
        if (u[C] !== x[C])
          return !1;
      return !0;
    }
    var cr = g(u), vr = g(x);
    if (cr !== vr)
      return !1;
    if (cr || vr)
      return U(u) !== U(x) ? !1 : typeof Uint8Array == "function" && R(new Uint8Array(u), new Uint8Array(x), L, k);
    var sr = E(u), Qr = E(x);
    if (sr !== Qr)
      return !1;
    if (sr || Qr)
      return A(u) !== A(x) ? !1 : typeof Uint8Array == "function" && R(new Uint8Array(u), new Uint8Array(x), L, k);
    if (typeof u != typeof x)
      return !1;
    var br = $(u), wr = $(x);
    if (br.length !== wr.length)
      return !1;
    for (br.sort(), wr.sort(), C = br.length - 1; C >= 0; C--)
      if (br[C] != wr[C])
        return !1;
    for (C = br.length - 1; C >= 0; C--)
      if (w = br[C], !R(u[w], x[w], L, k))
        return !1;
    var Tr = I(u), $r = I(x);
    return Tr !== $r ? !1 : Tr === "Set" || $r === "Set" ? M(u, x, L, k) : Tr === "Map" ? J(u, x, L, k) : !0;
  }
  return co = function(x, L, k) {
    return R(x, L, k, i());
  }, co;
}
var cp = lp();
const vp = /* @__PURE__ */ Fy(cp);
class oy {
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
      let e = document.getSelection().getRangeAt(0), t = e.cloneRange();
      return t.selectNodeContents(this.target), t.setEnd(e.endContainer, e.endOffset), t.toString().length;
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
        var t = window.getSelection(), a = this.createRange(this.target, {
          count: e
        });
        a && (a.collapse(!1), t.removeAllRanges(), t.addRange(a));
      }
    } else
      this.target.setSelectionRange(e, e);
  }
  createRange(e, t, a) {
    if (a || (a = document.createRange(), a.selectNode(e), a.setStart(e, 0)), t.count === 0)
      a.setEnd(e, t.count);
    else if (e && t.count > 0)
      if (e.nodeType === Node.TEXT_NODE)
        e.textContent.length < t.count ? t.count -= e.textContent.length : (a.setEnd(e, t.count), t.count = 0);
      else
        for (var n = 0; n < e.childNodes.length && (a = this.createRange(e.childNodes[n], t, a), t.count !== 0); n++)
          ;
    return a;
  }
}
class dp {
  /**
   * Creates a new instance of the Observer object.
   * @param {Function} registerChange - Function that register a change in the history stack.
   * @param {String} holder - Editor.js holder id.
   * @param {Number} debounceTimer Delay time for the debouncer.
   */
  constructor(e, t, a) {
    Sr(this, "debounceTimer");
    Sr(this, "holder");
    Sr(this, "mutationDebouncer");
    Sr(this, "observer");
    this.holder = t, this.observer = null, this.debounceTimer = a, this.mutationDebouncer = this.debounce(() => {
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
    }, t = this.holder.querySelector(".codex-editor__redactor");
    this.observer = new MutationObserver((a) => {
      this.mutationHandler(a);
    }), this.observer.observe(t, e);
  }
  /**
   * Handles the mutations and checks if a new mutation has been produced.
   * @param {Object} mutationList The registered mutations
   */
  mutationHandler(e) {
    let t = !1;
    e.forEach((a) => {
      switch (a.type) {
        case "childList":
          a.target === this.holder ? this.onDestroy() : t = !0;
          break;
        case "characterData":
          t = !0;
          break;
        case "attributes":
          a.target instanceof Element && !a.target.classList.contains("ce-block") && !a.target.classList.contains("tc-toolbox") && (t = !0);
          break;
      }
    }), t && this.mutationDebouncer();
  }
  /**
   * Delays invoking a function until after wait millis have elapsed.
   * @param {Function} callback The function to be delayed.
   * @param {Number} wait The deplay time in millis.
   */
  debounce(e, t) {
    let a;
    return (...n) => {
      const i = this;
      window.clearTimeout(a), a = window.setTimeout(() => e.apply(i, n), t);
    };
  }
  onDestroy() {
    const e = new CustomEvent("destroy");
    document.dispatchEvent(e), this.observer != null && this.observer.disconnect();
  }
}
class hp {
  /**
   * @param options — Plugin custom options.
   */
  constructor({ editor: e, config: t = {}, onUpdate: a, maxLength: n }) {
    Sr(this, "blocks");
    Sr(this, "caret");
    Sr(this, "config");
    Sr(this, "defaultBlock");
    Sr(this, "editor");
    Sr(this, "holder");
    Sr(this, "initialItem");
    Sr(this, "maxLength");
    Sr(this, "onUpdate");
    Sr(this, "position", 0);
    Sr(this, "readOnly");
    Sr(this, "shouldSaveHistory");
    Sr(this, "stack", []);
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
    }, o = e, { blocks: y, caret: f } = o, { configuration: g } = o, { holder: h, defaultBlock: v } = g, E = i.config.shortcuts, { shortcuts: $ } = t, j = { ...E, ...$ }, I = Array.isArray(j.undo) ? j.undo : [j.undo], b = Array.isArray(j.redo) ? j.redo : [j.redo], U = i.config.debounceTimer, { debounceTimer: A = U } = t;
    this.holder = typeof h == "string" ? document.getElementById(h) : h, this.editor = o, this.defaultBlock = v, this.blocks = y, this.caret = f, this.shouldSaveHistory = !0, this.readOnly = g.readOnly, this.maxLength = n || i.maxLength, this.onUpdate = a || i.onUpdate, this.config = { debounceTimer: A, shortcuts: { undo: I, redo: b } }, this.holder && new dp(
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
  truncate(e, t) {
    for (; e.length > t; )
      e.shift();
  }
  /**
   * Initializes the stack when the user provides initial data.
   *
   * @param {Object} initialItem  Initial data provided by the user.
   */
  initialize(e) {
    const t = "blocks" in e ? e.blocks : e, n = { index: t.length - 1, state: t };
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
    var t;
    const e = (t = this.holder) == null ? void 0 : t.querySelector(".ce-toolbox");
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
    const { state: t } = this.stack[this.position];
    return e.length ? e.length !== t.length ? !0 : JSON.stringify(t) !== JSON.stringify(e) : !1;
  }
  /**
   * Adds the saved data in the history stack and updates current position.
   */
  save(e) {
    this.position >= this.maxLength && this.truncate(this.stack, this.maxLength), this.position = Math.min(this.position, this.stack.length - 1), this.stack = this.stack.slice(0, this.position + 1);
    const t = this.blocks.getCurrentBlockIndex(), a = this.blocks.getBlocksCount();
    let n = t;
    e[t] || (n -= a - e.length);
    const i = e[n] && (e[n].type === "paragraph" || e[n].type === "header") ? this.getCaretIndex(t) : null;
    this.stack.push({ index: n, state: e, caretIndex: i }), this.position += 1, this.onUpdate();
  }
  /**
   * Gets the caret position.
   * @param {Number} index is the block index
   * @returns The caret position
   */
  getCaretIndex(e) {
    var a;
    const t = (a = this.holder) == null ? void 0 : a.getElementsByClassName("ce-block__content");
    return t ? new oy(t[e].firstChild).getPos() : null;
  }
  /**
   * Decreases the current position and update the respective block in the editor.
   */
  async undo() {
    if (this.canUndo()) {
      const { state: e } = this.stack[this.position];
      this.position -= 1, this.shouldSaveHistory = !1;
      const { caretIndex: t, index: a, state: n } = this.stack[this.position];
      await this.switchState(n, e), this.onUpdate(), this.blocks.getBlockByIndex(a) && (t ? this.setCaretIndex(a, t) : this.caret.setToBlock(a, "end"));
    }
  }
  /**
   * Sets the caret position.
   * @param {Number} index is the block index
   * @param {Number} caretIndex is the caret position
   * @param {Array} state is the current state according to this.position.
   */
  setCaretIndex(e, t) {
    var n;
    const a = (n = this.holder) == null ? void 0 : n.getElementsByClassName("ce-block__content");
    if (t && t !== -1 && a) {
      const i = new oy(a[e].firstChild);
      setTimeout(() => i.setPos(t), 50);
    } else
      this.caret.setToBlock(e, "end");
  }
  /**
   * Inserts new block
   * @param {Array} state is the current state according to this.position.
   * @param {Number} index is the block index
   */
  insertBlock(e, t) {
    this.blocks.insert(e[t].type, e[t].data, {}, t, !0);
  }
  /**
   * Updates the passed block or render the state when the content was copied.
   * @param {Array} state is the current state according to this.position.
   * @param {Number} index is the block index.
   */
  async updateModifiedBlock(e, t) {
    const a = e[t];
    return a.id && this.editor.blocks.getById(a.id) ? this.blocks.update(a.id, a.data) : this.blocks.render({ blocks: e });
  }
  /**
   * Increases the current position and update the respective block in the editor.
   */
  async redo() {
    if (this.canRedo()) {
      this.position += 1, this.shouldSaveHistory = !1;
      const { caretIndex: e, index: t, state: a } = this.stack[this.position], { state: n } = this.stack[this.position - 1];
      await this.switchState(a, n), this.onUpdate(), this.blocks.getBlockByIndex(t) && (e ? this.setCaretIndex(t, e) : this.caret.setToBlock(t, "end"));
    }
  }
  async switchState(e, t) {
    t.reduce(
      (n, i, o) => e.find((y) => y.id === i.id) ? n : [...n, o],
      []
    ).sort((n, i) => i - n).forEach((n) => this.blocks.delete(n)), e.reduce(
      (n, i, o) => t.find((y) => y.id === i.id) ? n : [...n, o],
      []
    ).forEach((n) => this.insertBlock(e, n));
    const a = e.reduce((n, i, o) => {
      const y = t.findIndex((f) => f.id === i.id);
      return y > -1 && !vp(i, t[y]) ? [...n, o] : n;
    }, []);
    await Promise.all(
      a.map(async (n) => await this.updateModifiedBlock(e, n))
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
    const t = {
      CMD: /(Mac)/i.test(navigator.platform) ? "metaKey" : "ctrlKey",
      ALT: "altKey",
      SHIFT: "shiftKey"
    }, a = e.slice(0, -1).map((i) => t[i]), n = a.includes("shiftKey") && e.length === 2 ? e[e.length - 1].toUpperCase() : e[e.length - 1].toLowerCase();
    return a.push(n), a;
  }
  /**
   * Sets events listeners to allow keyboard actions support
   */
  setEventListeners() {
    const { holder: e } = this, { shortcuts: t } = this.config, { redo: a, undo: n } = t, i = n.map(
      (b) => b.replace(/ /g, "").split("+")
    ), o = a.map(
      (b) => b.replace(/ /g, "").split("+")
    ), y = i.map((b) => this.parseKeys(b)), f = o.map((b) => this.parseKeys(b)), g = (b, U) => U.length === 2 && b[U[0]] && b.key.toLowerCase() === U[1], h = (b, U) => U.length === 3 && b[U[0]] && b[U[1]] && b.key.toLowerCase() === U[2], v = (b, U) => U.reduce(
      (A, F) => A || g(b, F),
      !1
    ), E = (b, U) => U.reduce(
      (A, F) => A || h(b, F),
      !1
    ), $ = (b, U, A) => !!(v(b, U) && !E(b, A) || E(b, U)), j = (b) => {
      $(b, y, f) && (b.preventDefault(), this.undo());
    }, I = (b) => {
      $(b, f, y) && (b.preventDefault(), this.redo());
    };
    if (e) {
      const b = () => {
        e.removeEventListener("keydown", j), e.removeEventListener("keydown", I);
      };
      e.addEventListener("keydown", j), e.addEventListener("keydown", I), e.addEventListener("destroy", b);
    }
  }
}
export {
  hp as default
};
