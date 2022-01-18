!(function (e, o) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = o())
    : "function" == typeof define && define.amd
    ? define([], o)
    : "object" == typeof exports
    ? (exports.Toggle = o())
    : (e.Toggle = o());
})(self, function () {
  return (e = {}), console.log("editorjs-toggle-block"), e.default;
  var e;
});
