(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Undo"] = factory();
	else
		root["Undo"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/dist/bytesToUuid.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/bytesToUuid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\n\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n\n  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');\n}\n\nvar _default = bytesToUuid;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://Undo/./node_modules/uuid/dist/bytesToUuid.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/rng-browser.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/rng-browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = rng;\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation. Also,\n// find the complete implementation of crypto (msCrypto) on IE11.\nvar getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);\nvar rnds8 = new Uint8Array(16); // eslint-disable-line no-undef\n\nfunction rng() {\n  if (!getRandomValues) {\n    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n  }\n\n  return getRandomValues(rnds8);\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://Undo/./node_modules/uuid/dist/rng-browser.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/v4.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/dist/v4.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/rng-browser.js\"));\n\nvar _bytesToUuid = _interopRequireDefault(__webpack_require__(/*! ./bytesToUuid.js */ \"./node_modules/uuid/dist/bytesToUuid.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof options == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n\n  options = options || {};\n\n  var rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || (0, _bytesToUuid.default)(rnds);\n}\n\nvar _default = v4;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://Undo/./node_modules/uuid/dist/v4.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Undo; });\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer */ \"./src/observer.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n/**\n * Undo/Redo feature for Editor.js.\n *\n * @typedef {Object} Undo\n * @description Feature's initialization class.\n * @property {Object} editor — Editor.js instance object.\n * @property {Number} maxLength - Max amount of changes recorded by the history stack.\n * @property {Function} onUpdate - Callback called when the user performs an undo or redo action.\n * @property {Boolean} shouldSaveHistory - Defines if the plugin should save the change in the stack\n * @property {Object} initialItem - Initial data object.\n */\n\nvar Undo = /*#__PURE__*/function () {\n  /**\n   * @param options — Plugin custom options.\n   */\n  function Undo(options) {\n    var _this = this;\n\n    _classCallCheck(this, Undo);\n\n    var defaultOptions = {\n      maxLength: 30,\n      onUpdate: function onUpdate() {}\n    };\n    this.editor = options.editor;\n    this.shouldSaveHistory = true;\n    this.maxLength = options.maxLength ? options.maxLength : defaultOptions.maxLength;\n    this.onUpdate = options.onUpdate ? options.onUpdate : defaultOptions.onUpdate;\n    var observer = new _observer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](function () {\n      return _this.registerChange();\n    }, this.editor.configuration.holder);\n    observer.setMutationObserver();\n    this.setEventListeners();\n    this.initialItem = null;\n    this.clear();\n  }\n  /**\n   * Truncates the history stack when it excedes the limit of changes.\n   *\n   * @param {Object} stack  Changes history stack.\n   * @param {Number} stack  Limit of changes recorded by the history stack.\n   */\n\n\n  _createClass(Undo, [{\n    key: \"truncate\",\n    value: function truncate(stack, limit) {\n      while (stack.length > limit) {\n        stack.shift();\n      }\n    }\n    /**\n     * Initializes the stack when the user provides initial data.\n     *\n     * @param {Object} initialItem  Initial data provided by the user.\n     */\n\n  }, {\n    key: \"initialize\",\n    value: function initialize(initialItem) {\n      var initialData = 'blocks' in initialItem ? initialItem.blocks : initialItem;\n      var initialIndex = initialData.length - 1;\n      var firstElement = {\n        index: initialIndex,\n        state: initialData\n      };\n      this.stack[0] = firstElement;\n      this.initialItem = firstElement;\n    }\n    /**\n     * Clears the history stack.\n     */\n\n  }, {\n    key: \"clear\",\n    value: function clear() {\n      this.stack = this.initialItem ? [this.initialItem] : [{\n        index: 0,\n        state: []\n      }];\n      this.position = 0;\n      this.onUpdate();\n    }\n    /**\n     * Registers the data returned by API's save method into the history stack.\n     */\n\n  }, {\n    key: \"registerChange\",\n    value: function registerChange() {\n      var _this2 = this;\n\n      if (this.editor && this.editor.save && this.shouldSaveHistory) {\n        this.editor.save().then(function (savedData) {\n          if (_this2.editorDidUpdate(savedData.blocks)) _this2.save(savedData.blocks);\n        });\n      }\n\n      this.shouldSaveHistory = true;\n    }\n    /**\n     * Checks if the saved data has to be added to the history stack.\n     *\n     * @param {Object} newData  New data to be saved in the history stack.\n     * @returns {Boolean}\n     */\n\n  }, {\n    key: \"editorDidUpdate\",\n    value: function editorDidUpdate(newData) {\n      var state = this.stack[this.position].state;\n      if (newData.length !== state.length) return true;\n      return JSON.stringify(state) !== JSON.stringify(newData);\n    }\n    /**\n     * Adds the saved data in the history stack and updates current position.\n     */\n\n  }, {\n    key: \"save\",\n    value: function save(state) {\n      if (this.position >= this.maxLength) {\n        this.truncate(this.stack, this.maxLength);\n      }\n\n      this.position = Math.min(this.position, this.stack.length - 1);\n      this.stack = this.stack.slice(0, this.position + 1);\n      var index = this.editor.blocks.getCurrentBlockIndex();\n      this.stack.push({\n        index: index,\n        state: state\n      });\n      this.position += 1;\n      this.onUpdate();\n    }\n    /**\n     * Decreases the current position and renders the data in the editor.\n     */\n\n  }, {\n    key: \"undo\",\n    value: function undo() {\n      var _this3 = this;\n\n      if (this.canUndo()) {\n        this.shouldSaveHistory = false;\n        var _this$stack$this$posi = this.stack[this.position -= 1],\n            index = _this$stack$this$posi.index,\n            state = _this$stack$this$posi.state;\n        this.onUpdate();\n        this.editor.blocks.render({\n          blocks: state\n        }).then(function () {\n          return _this3.editor.caret.setToBlock(index, 'end');\n        });\n      }\n    }\n    /**\n     * Increases the current position and renders the data in the editor.\n     */\n\n  }, {\n    key: \"redo\",\n    value: function redo() {\n      var _this4 = this;\n\n      if (this.canRedo()) {\n        this.shouldSaveHistory = false;\n        var _this$stack$this$posi2 = this.stack[this.position += 1],\n            index = _this$stack$this$posi2.index,\n            state = _this$stack$this$posi2.state;\n        this.onUpdate();\n        this.editor.blocks.render({\n          blocks: state\n        }).then(function () {\n          return _this4.editor.caret.setToBlock(index, 'end');\n        });\n      }\n    }\n    /**\n     * Checks if the history stack can perform an undo action.\n     *\n     * @returns {Boolean}\n     */\n\n  }, {\n    key: \"canUndo\",\n    value: function canUndo() {\n      return this.position > 0;\n    }\n    /**\n     * Checks if the history stack can perform a redo action.\n     *\n     * @returns {Boolean}\n     */\n\n  }, {\n    key: \"canRedo\",\n    value: function canRedo() {\n      return this.position < this.count();\n    }\n    /**\n     * Returns the number of changes recorded in the history stack.\n     *\n     * @returns {Number}\n     */\n\n  }, {\n    key: \"count\",\n    value: function count() {\n      return this.stack.length - 1; // -1 because of initial item\n    }\n    /**\n     * Sets events listeners to allow keyboard actions support.\n     */\n\n  }, {\n    key: \"setEventListeners\",\n    value: function setEventListeners() {\n      var _this5 = this;\n\n      var buttonKey = /(Mac)/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';\n\n      var handleUndo = function handleUndo(e) {\n        if (e[buttonKey] && e.key === 'z') {\n          e.preventDefault();\n\n          _this5.undo();\n        }\n      };\n\n      var handleRedo = function handleRedo(e) {\n        if (e[buttonKey] && e.key === 'y') {\n          e.preventDefault();\n\n          _this5.redo();\n        }\n      };\n\n      var handleDestroy = function handleDestroy() {\n        document.removeEventListener('keydown', handleUndo);\n        document.removeEventListener('keydown', handleRedo);\n      };\n\n      document.addEventListener('keydown', handleUndo);\n      document.addEventListener('keydown', handleRedo);\n      document.addEventListener('destroy', handleDestroy);\n    }\n  }]);\n\n  return Undo;\n}();\n\n\n\n//# sourceURL=webpack://Undo/./src/index.js?");

/***/ }),

/***/ "./src/observer.js":
/*!*************************!*\
  !*** ./src/observer.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Observer; });\n/* harmony import */ var uuid_dist_v4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid/dist/v4 */ \"./node_modules/uuid/dist/v4.js\");\n/* harmony import */ var uuid_dist_v4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid_dist_v4__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* Add an uuid as it will be easier to track changes */\n\n/* For IE or other compat? */\n\n(function () {\n  if (typeof window.CustomEvent === \"function\") return false;\n\n  function CustomEvent(event, params) {\n    params = params || {\n      bubbles: false,\n      cancelable: false,\n      detail: undefined\n    };\n    var evt = document.createEvent('CustomEvent');\n    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);\n    return evt;\n  }\n\n  CustomEvent.prototype = window.Event.prototype;\n  window.CustomEvent = CustomEvent;\n})();\n/**\n * @typedef {Object} Observer\n * @description Custom MutationObserver to detect changes in the editor.\n * @property {String} holder — Editor.js holder id.\n * @property {Object} observer - MutationObserver object that detects changes in the editor.\n * @property {Number} debounceTimer - Delay time for the debouncer.\n * @property {Function} mutationDebouncer - Debouncer to delay the changes registration.\n */\n\n\nvar Observer = /*#__PURE__*/function () {\n  /**\n   * Creates a new instance of the Observer object.\n   * @param {Function} registerChange - Function that register a change in the history stack.\n   * @param {String} holder - Editor.js holder id.\n   */\n  function Observer(registerChange, holder) {\n    _classCallCheck(this, Observer);\n\n    this.holder = holder;\n    this.observer = null;\n    this.debounceTimer = 200;\n    this.mutationDebouncer = this.debounce(function () {\n      registerChange();\n    }, this.debounceTimer);\n  }\n  /**\n   * Sets a mutation observer to catch every change in the editor.\n   */\n\n\n  _createClass(Observer, [{\n    key: \"setMutationObserver\",\n    value: function setMutationObserver() {\n      var _this = this;\n\n      var observerOptions = {\n        childList: true,\n        attributes: true,\n        subtree: true,\n        characterData: true,\n        characterDataOldValue: true\n      };\n      var target = typeof this.holder === 'string' ? document.querySelector(\"#\".concat(this.holder)) : this.holder;\n      this.observer = new MutationObserver(function (mutationList) {\n        _this.mutationHandler(mutationList);\n      });\n      this.observer.observe(target, observerOptions);\n    }\n    /**\n     * Handles the mutations and checks if a new mutation has been produced.\n     * @param {Object} mutationList The registered mutations\n     */\n\n  }, {\n    key: \"mutationHandler\",\n    value: function mutationHandler(mutationList) {\n      var _this2 = this;\n\n      var contentMutated = false; // from editor.js\n\n      var Block = {\n        CSS: {\n          wrapper: 'ce-block',\n          wrapperStretched: 'ce-block--stretched',\n          content: 'ce-block__content',\n          focused: 'ce-block--focused',\n          selected: 'ce-block--selected',\n          dropTarget: 'ce-block--drop-target'\n        }\n      };\n\n      function checkChangeType(mutation) {\n        var isBlockElement = function isBlockElement(el) {\n          return el instanceof Element ? el.classList.contains(Block.CSS.wrapper) : false;\n        };\n\n        if (!!Array.from(mutation.removedNodes).find(isBlockElement)) return 'remove';\n        if (!!Array.from(mutation.addedNodes).find(isBlockElement)) return 'add';\n        return 'update';\n      }\n\n      var changed = new Set();\n      mutationList.forEach(function (mutation) {\n        var target = mutation.target; //as Element\n\n        var blockSelector = '.' + Block.CSS.wrapper;\n        /**\n         * findChangedBlockElement\n         * \n         * @param {MutationRecord} mutation\n         * @param {String} changeType - add or remove or update\n         * @return HTMLElement|null\n         **/\n\n        function findChangedBlockElement(mutation, changeType) {\n          var _el$parentElement;\n\n          if (changeType === 'add') {\n            return Array.from(mutation.addedNodes).find(function (n) {\n              return n.classList.contains(Block.CSS.wrapper);\n            }); //as HTMLElement\n          }\n\n          if (changeType === 'remove') {\n            return Array.from(mutation.removedNodes).find(function (n) {\n              return n.classList.contains(Block.CSS.wrapper);\n            }); //as HTMLElement\n          }\n\n          var el = mutation.target;\n          if (el instanceof Text) return (_el$parentElement = el.parentElement) === null || _el$parentElement === void 0 ? void 0 : _el$parentElement.closest(blockSelector);\n          if (el instanceof Element) return el.querySelector(blockSelector) || el.closest(blockSelector);\n          return null;\n        }\n\n        var totalBlocksMutated = false;\n        var contentBlockMutated = false;\n\n        switch (mutation.type) {\n          case 'childList':\n            if (mutation.target.id === _this2.holder) {\n              _this2.onDestroy();\n            } else {\n              contentMutated = true;\n            }\n\n            totalBlocksMutated = true;\n            break;\n\n          case 'characterData':\n            contentBlockMutated = true;\n            contentMutated = true;\n            break;\n\n          case 'attributes':\n            if (!mutation.target.classList.contains('ce-block')) {\n              contentMutated = true;\n            }\n\n            break;\n\n          default:\n            break;\n        }\n\n        if (totalBlocksMutated || contentBlockMutated) {\n          var changeType = checkChangeType(mutation);\n          var mutType = mutation.type;\n\n          switch (mutation.type) {\n            case 'childList': //when block is added, removed\n\n            case 'characterData':\n              //when block is updated\n              var blockElement = findChangedBlockElement(mutation, changeType);\n\n              if (blockElement) {\n                var blockId = blockElement.dataset.blockId || uuid_dist_v4__WEBPACK_IMPORTED_MODULE_0___default()();\n                if (!blockElement.dataset.blockId) blockElement.setAttribute('data-block-id', blockId);\n                changed.add({\n                  blockId: blockId,\n                  mutType: mutType,\n                  changeType: changeType,\n                  blockElement: blockElement\n                });\n              }\n\n              break;\n\n            case 'attributes':\n              /**\n              * Changes on Element.ce-block usually is functional\n              */\n              if (!target.classList.contains(Block.CSS.wrapper)) {\n                var _blockElement = findChangedBlockElement(mutation, changeType);\n\n                if (_blockElement) {\n                  var _blockId = _blockElement.dataset.blockId || uuid_dist_v4__WEBPACK_IMPORTED_MODULE_0___default()();\n\n                  if (!_blockElement.dataset.blockId) _blockElement.setAttribute('data-block-id', _blockId);\n                  changed.add({\n                    blockId: _blockId,\n                    mutType: mutType,\n                    changeType: changeType,\n                    blockElement: _blockElement\n                  });\n                }\n\n                break;\n              }\n\n          }\n        }\n      });\n\n      if (contentMutated) {\n        if (changed.size > 0) {\n          //this.onBlockChange(changed);\n          var event = new CustomEvent(\"changeBlocks\", {\n            cancelable: true,\n            // without that flag preventDefault doesn't work\n            detail: {\n              changed: changed\n            }\n          }); //console.log('Blockschanged',changed);\n\n          document.dispatchEvent(event);\n        }\n\n        this.mutationDebouncer();\n      }\n    }\n    /**\n     * Delays invoking a function until after wait millis have elapsed.\n     * @param {Function} callback The function to be delayed.\n     * @param {Number} wait The deplay time in millis.\n     */\n\n  }, {\n    key: \"debounce\",\n    value: function debounce(callback, wait) {\n      var _this3 = this;\n\n      var timeout;\n      return function () {\n        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n          args[_key] = arguments[_key];\n        }\n\n        var context = _this3;\n        clearTimeout(timeout);\n        timeout = setTimeout(function () {\n          return callback.apply(context, args);\n        }, wait);\n      };\n    }\n  }, {\n    key: \"onDestroy\",\n    value: function onDestroy() {\n      var destroyEvent = new CustomEvent('destroy');\n      document.dispatchEvent(destroyEvent);\n      this.observer.disconnect();\n    }\n  }]);\n\n  return Observer;\n}();\n\n\n\n//# sourceURL=webpack://Undo/./src/observer.js?");

/***/ })

/******/ })["default"];
});