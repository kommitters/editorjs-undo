/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Undo"] = factory();
	else
		root["Undo"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Undo)\n/* harmony export */ });\n/* harmony import */ var vanilla_caret_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vanilla-caret-js */ \"./node_modules/vanilla-caret-js/index.js\");\n/* harmony import */ var vanilla_caret_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vanilla_caret_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observer */ \"./src/observer.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\n\n/**\n * Undo/Redo feature for Editor.js.\n *\n * @typedef {Object} Undo\n * @description Feature's initialization class.\n * @property {Object} editor — Editor.js instance object.\n * @property {Number} maxLength - Max amount of changes recorded by the history stack.\n * @property {Function} onUpdate - Callback called when the user performs an undo or redo action.\n * @property {Boolean} shouldSaveHistory - Defines if the plugin should save the change in the stack\n * @property {Object} initialItem - Initial data object.\n */\n\nvar Undo = /*#__PURE__*/function () {\n  /**\n   * @param options — Plugin custom options.\n   */\n  function Undo(_ref) {\n    var _this = this;\n\n    var editor = _ref.editor,\n        _ref$config = _ref.config,\n        config = _ref$config === void 0 ? {} : _ref$config,\n        onUpdate = _ref.onUpdate,\n        maxLength = _ref.maxLength;\n\n    _classCallCheck(this, Undo);\n\n    var defaultOptions = {\n      maxLength: 30,\n      onUpdate: function onUpdate() {},\n      config: {\n        debounceTimer: 200,\n        shortcuts: {\n          undo: \"CMD+Z\",\n          redo: \"CMD+Y\"\n        }\n      }\n    };\n    var blocks = editor.blocks,\n        caret = editor.caret;\n    var configuration = editor.configuration;\n    var holder = configuration.holder;\n    var defaultShortcuts = defaultOptions.config.shortcuts;\n    var _config$shortcuts = config.shortcuts,\n        shortcuts = _config$shortcuts === void 0 ? defaultShortcuts : _config$shortcuts;\n    var defaultDebounceTimer = defaultOptions.config.debounceTimer;\n    var _config$debounceTimer = config.debounceTimer,\n        debounceTimer = _config$debounceTimer === void 0 ? defaultDebounceTimer : _config$debounceTimer;\n    this.holder = typeof holder === \"string\" ? document.getElementById(holder) : holder;\n    this.editor = editor;\n    this.blocks = blocks;\n    this.caret = caret;\n    this.shouldSaveHistory = true;\n    this.readOnly = configuration.readOnly;\n    this.maxLength = maxLength || defaultOptions.maxLength;\n    this.onUpdate = onUpdate || defaultOptions.onUpdate;\n    this.config = {\n      debounceTimer: debounceTimer,\n      shortcuts: shortcuts\n    };\n    var observer = new _observer__WEBPACK_IMPORTED_MODULE_1__[\"default\"](function () {\n      return _this.registerChange();\n    }, this.holder, this.config.debounceTimer);\n    observer.setMutationObserver();\n    this.setEventListeners();\n    this.initialItem = null;\n    this.clear();\n  }\n  /**\n   * Notify core that read-only mode is suppoorted\n   *\n   * @returns {boolean}\n   */\n\n\n  _createClass(Undo, [{\n    key: \"truncate\",\n    value:\n    /**\n     * Truncates the history stack when it excedes the limit of changes.\n     *\n     * @param {Object} stack  Changes history stack.\n     * @param {Number} stack  Limit of changes recorded by the history stack.\n     */\n    function truncate(stack, limit) {\n      while (stack.length > limit) {\n        stack.shift();\n      }\n    }\n    /**\n     * Initializes the stack when the user provides initial data.\n     *\n     * @param {Object} initialItem  Initial data provided by the user.\n     */\n\n  }, {\n    key: \"initialize\",\n    value: function initialize(initialItem) {\n      var initialData = \"blocks\" in initialItem ? initialItem.blocks : initialItem;\n      var initialIndex = initialData.length - 1;\n      var firstElement = {\n        index: initialIndex,\n        state: initialData\n      };\n      this.stack[0] = firstElement;\n      this.initialItem = firstElement;\n    }\n    /**\n     * Clears the history stack.\n     */\n\n  }, {\n    key: \"clear\",\n    value: function clear() {\n      this.stack = this.initialItem ? [this.initialItem] : [{\n        index: 0,\n        state: [{\n          type: \"paragraph\",\n          data: {\n            text: \"\"\n          }\n        }]\n      }];\n      this.position = 0;\n      this.onUpdate();\n    }\n    /**\n     * returns true if readOnly was toggled to true\n     * @returns {Node} Indirectly shows if readOnly was set to true or false\n     */\n\n  }, {\n    key: \"setReadOnly\",\n    value: function setReadOnly() {\n      var toolbox = document.querySelector(\".ce-toolbox\");\n      this.readOnly = !toolbox;\n    }\n    /**\n     * Registers the data returned by API's save method into the history stack.\n     */\n\n  }, {\n    key: \"registerChange\",\n    value: function registerChange() {\n      var _this2 = this;\n\n      this.setReadOnly();\n\n      if (!this.readOnly) {\n        if (this.editor && this.editor.save && this.shouldSaveHistory) {\n          this.editor.save().then(function (savedData) {\n            if (_this2.editorDidUpdate(savedData.blocks)) _this2.save(savedData.blocks);\n          });\n        }\n\n        this.shouldSaveHistory = true;\n      }\n    }\n    /**\n     * Checks if the saved data has to be added to the history stack.\n     *\n     * @param {Object} newData  New data to be saved in the history stack.\n     * @returns {Boolean}\n     */\n\n  }, {\n    key: \"editorDidUpdate\",\n    value: function editorDidUpdate(newData) {\n      var state = this.stack[this.position].state;\n      if (!newData.length) return false;\n      if (newData.length !== state.length) return true;\n      return JSON.stringify(state) !== JSON.stringify(newData);\n    }\n    /**\n     * Adds the saved data in the history stack and updates current position.\n     */\n\n  }, {\n    key: \"save\",\n    value: function save(state) {\n      if (this.position >= this.maxLength) {\n        this.truncate(this.stack, this.maxLength);\n      }\n\n      this.position = Math.min(this.position, this.stack.length - 1);\n      this.stack = this.stack.slice(0, this.position + 1);\n      var index = this.blocks.getCurrentBlockIndex();\n      var blockCount = this.blocks.getBlocksCount();\n      var indexInState = index;\n      if (!state[index]) indexInState -= blockCount - state.length;\n      var caretIndex = state[indexInState].type === \"paragraph\" || state[indexInState].type === \"header\" ? this.getCaretIndex(index) : null;\n      this.stack.push({\n        index: indexInState,\n        state: state,\n        caretIndex: caretIndex\n      });\n      this.position += 1;\n      this.onUpdate();\n    }\n    /**\n     * get the caret position.\n     * @param {Number} index is the block index\n     * @returns The caret position\n     */\n\n  }, {\n    key: \"getCaretIndex\",\n    value: function getCaretIndex(index) {\n      var blocks = document.getElementsByClassName(\"ce-block__content\");\n      var caretBlock = new (vanilla_caret_js__WEBPACK_IMPORTED_MODULE_0___default())(blocks[index].firstChild);\n      return caretBlock.getPos();\n    }\n    /**\n     * insert a block deleted previously\n     * @param {Array} state is the current state according to this.position.\n     * @param {Array} compState is the state to compare and know the deleted block.\n     * @param {Number} index is the block index in state.\n     */\n\n  }, {\n    key: \"insertDeletedBlock\",\n    value: function insertDeletedBlock(state, compState, index) {\n      for (var i = 0; i < state.length; i += 1) {\n        if (!compState[i] || state[i].id !== compState[i].id) {\n          this.blocks.insert(state[i].type, state[i].data, {}, i, true);\n          this.caret.setToBlock(index, \"end\");\n          break;\n        }\n      }\n    }\n    /**\n     * return true if a block was dropped previously\n     * @param {Array} state is the current state according to this.position.\n     * @param {Array} compState is the state to compare and know the dropped block.\n     * @returns {Boolean} true if the block was dropped\n     */\n\n  }, {\n    key: \"blockWasDropped\",\n    value: function blockWasDropped(state, compState) {\n      if (state.length === compState.length) {\n        return state.some(function (block, i) {\n          return block.id !== compState[i].id;\n        });\n      }\n\n      return false;\n    }\n    /**\n     * return true if the block has to be deleted becuase it was skipped previously.\n     * @param {Number} index is the block index in state.\n     * @param {Number} compIndex is the index to compare and know if the block was inserted previously\n     * @param {Array} state is the current state according to this.position.\n     * @param {Array} compState is the stato to compare if there was a deleted block.\n     * @returns {Boolean} true if a block was inserted previously.\n     */\n\n  }, {\n    key: \"blockWasSkipped\",\n    value: function blockWasSkipped(index, compIndex, state, compState) {\n      return index < compIndex && state.length !== compState.length;\n    }\n    /**\n     * return true if the content in a block without the focus was modified.\n     * @param {Number} index is the block index in state.\n     * @param {Number} compIndex is the index to compare and know if the block was inserted previously\n     * @returns true if the content in a block without the focus was modified.\n     */\n\n  }, {\n    key: \"contentChangedInNoFocusBlock\",\n    value: function contentChangedInNoFocusBlock(index, compIndex) {\n      return index !== compIndex;\n    }\n    /**\n     * returns true if a block was deleted previously.\n     * @param {Array} state is the current state according to this.position.\n     * @param {Array} compState is the state to compare and know if a block was deleted.\n     * @returns {Boolean} true if a block was deleted previously.\n     */\n\n  }, {\n    key: \"blockWasDeleted\",\n    value: function blockWasDeleted(state, compState) {\n      return state.length > compState.length;\n    }\n    /**\n     * Decreases the current position and update the respective block in the editor.\n     */\n\n  }, {\n    key: \"undo\",\n    value: function undo() {\n      var _this3 = this;\n\n      if (this.canUndo() && this.position >= 0) {\n        this.position -= 1;\n        this.shouldSaveHistory = false;\n        var index = this.stack[this.position].index;\n        var _this$stack$this$posi = this.stack[this.position],\n            state = _this$stack$this$posi.state,\n            caretIndex = _this$stack$this$posi.caretIndex;\n        var _this$stack$this$posi2 = this.stack[this.position],\n            nextIndex = _this$stack$this$posi2.index,\n            nextState = _this$stack$this$posi2.state;\n        this.onUpdate();\n        var blockCount = this.blocks.getBlocksCount();\n\n        if (!state[index]) {\n          index -= 1;\n          this.stack[this.position].index = index;\n        }\n\n        if (this.blockWasDeleted(state, nextState)) {\n          this.insertDeletedBlock(state, nextState, index);\n        } else if (this.blockWasSkipped(index, nextIndex, state, nextState)) {\n          this.blocks[\"delete\"]();\n          this.caret.setToBlock(index, \"end\");\n        } else if (blockCount > state.length) {\n          this.blocks.render({\n            blocks: state\n          }).then(function () {\n            return _this3.setCaretIndex(index, caretIndex);\n          });\n        } else if (this.blockWasDropped(state, nextState)) {\n          this.blocks.render({\n            blocks: state\n          }).then(function () {\n            return _this3.caret.setToBlock(index, \"end\");\n          });\n        } else if (this.contentChangedInNoFocusBlock(index, nextIndex)) {\n          var _this$blocks$getBlock = this.blocks.getBlockByIndex(nextIndex),\n              id = _this$blocks$getBlock.id;\n\n          this.blocks.update(id, state[nextIndex].data);\n          this.setCaretIndex(index, caretIndex);\n        }\n\n        var block = this.blocks.getBlockByIndex(index);\n\n        if (block) {\n          this.blocks.update(block.id, state[index].data);\n          this.setCaretIndex(index, caretIndex);\n        }\n      }\n    }\n    /**\n     * Set the caret position.\n     * @param {Number} index is the block index\n     * @param {Number} caretIndex is the caret position\n     * @param {Array} state is the current state according to this.position.\n     */\n\n  }, {\n    key: \"setCaretIndex\",\n    value: function setCaretIndex(index, caretIndex) {\n      if (caretIndex && caretIndex !== -1) {\n        var blocks = document.getElementsByClassName(\"ce-block__content\");\n        var caretBlock = new (vanilla_caret_js__WEBPACK_IMPORTED_MODULE_0___default())(blocks[index].firstChild);\n        caretBlock.setPos(caretIndex);\n      } else {\n        this.caret.setToBlock(index, \"end\");\n      }\n    }\n    /**\n     * Increases the current position and update the respective block in the editor.\n     */\n\n  }, {\n    key: \"redo\",\n    value: function redo() {\n      var _this4 = this;\n\n      if (this.canRedo()) {\n        this.position += 1;\n        this.shouldSaveHistory = false;\n        var _this$stack$this$posi3 = this.stack[this.position],\n            index = _this$stack$this$posi3.index,\n            state = _this$stack$this$posi3.state,\n            caretIndex = _this$stack$this$posi3.caretIndex;\n        var _this$stack = this.stack[this.position - 1],\n            prevIndex = _this$stack.index,\n            prevState = _this$stack.state;\n\n        if (this.blockWasDeleted(prevState, state)) {\n          this.blocks[\"delete\"]();\n          this.caret.setToBlock(index, \"end\");\n        } else if (this.blockWasSkipped(prevIndex, index, state, prevState)) {\n          if (prevState.length + 1 < state.length) {\n            for (var i = prevState.length - 1; i < state.length; i += 1) {\n              this.blocks.insert(state[i].type, state[i].data, {}, i, true);\n            }\n          } else {\n            this.blocks.insert(state[index].type, state[index].data, {}, index, true);\n          }\n\n          this.caret.setToBlock(index, \"end\");\n        } else if (this.blockWasDropped(state, prevState) && this.position !== 1) {\n          this.blocks.render({\n            blocks: state\n          }).then(function () {\n            return _this4.caret.setToBlock(index, \"end\");\n          });\n        }\n\n        this.onUpdate();\n        var block = this.blocks.getBlockByIndex(index);\n\n        if (block) {\n          this.blocks.update(block.id, state[index].data);\n          this.setCaretIndex(index, caretIndex);\n        }\n      }\n    }\n    /**\n     * Checks if the history stack can perform an undo action.\n     *\n     * @returns {Boolean}\n     */\n\n  }, {\n    key: \"canUndo\",\n    value: function canUndo() {\n      return !this.readOnly && this.position > 0;\n    }\n    /**\n     * Checks if the history stack can perform a redo action.\n     *\n     * @returns {Boolean}\n     */\n\n  }, {\n    key: \"canRedo\",\n    value: function canRedo() {\n      return !this.readOnly && this.position < this.count();\n    }\n    /**\n     * Returns the number of changes recorded in the history stack.\n     *\n     * @returns {Number}\n     */\n\n  }, {\n    key: \"count\",\n    value: function count() {\n      return this.stack.length - 1; // -1 because of initial item\n    }\n    /**\n     * Parses the keys passed in the shortcut property to accept CMD,ALT and SHIFT\n     *\n     * @param {Array} keys are the keys passed in shortcuts in config\n     * @returns {Array}\n     */\n\n  }, {\n    key: \"parseKeys\",\n    value: function parseKeys(keys) {\n      var specialKeys = {\n        CMD: /(Mac)/i.test(navigator.platform) ? \"metaKey\" : \"ctrlKey\",\n        ALT: \"altKey\",\n        SHIFT: \"shiftKey\"\n      };\n      var parsedKeys = keys.slice(0, -1).map(function (key) {\n        return specialKeys[key];\n      });\n      var letterKey = parsedKeys.includes(\"shiftKey\") && keys.length === 2 ? keys[keys.length - 1].toUpperCase() : keys[keys.length - 1].toLowerCase();\n      parsedKeys.push(letterKey);\n      return parsedKeys;\n    }\n    /**\n     * Sets events listeners to allow keyboard actions support\n     */\n\n  }, {\n    key: \"setEventListeners\",\n    value: function setEventListeners() {\n      var _this5 = this;\n\n      var holder = this.holder;\n      var shortcuts = this.config.shortcuts;\n      var undo = shortcuts.undo,\n          redo = shortcuts.redo;\n      var keysUndo = undo.replace(/ /g, \"\").split(\"+\");\n      var keysRedo = redo.replace(/ /g, \"\").split(\"+\");\n      var keysUndoParsed = this.parseKeys(keysUndo);\n      var keysRedoParsed = this.parseKeys(keysRedo);\n\n      var twoKeysPressed = function twoKeysPressed(e, keys) {\n        return keys.length === 2 && e[keys[0]] && e.key === keys[1];\n      };\n\n      var threeKeysPressed = function threeKeysPressed(e, keys) {\n        return keys.length === 3 && e[keys[0]] && e[keys[1]] && e.key === keys[2];\n      };\n\n      var pressedKeys = function pressedKeys(e, keys, compKeys) {\n        if (twoKeysPressed(e, keys) && !threeKeysPressed(e, compKeys)) {\n          return true;\n        }\n\n        if (threeKeysPressed(e, keys)) {\n          return true;\n        }\n\n        return false;\n      };\n\n      var handleUndo = function handleUndo(e) {\n        if (pressedKeys(e, keysUndoParsed, keysRedoParsed)) {\n          e.preventDefault();\n\n          _this5.undo();\n        }\n      };\n\n      var handleRedo = function handleRedo(e) {\n        if (pressedKeys(e, keysRedoParsed, keysUndoParsed)) {\n          e.preventDefault();\n\n          _this5.redo();\n        }\n      };\n\n      var handleDestroy = function handleDestroy() {\n        holder.removeEventListener(\"keydown\", handleUndo);\n        holder.removeEventListener(\"keydown\", handleRedo);\n      };\n\n      holder.addEventListener(\"keydown\", handleUndo);\n      holder.addEventListener(\"keydown\", handleRedo);\n      holder.addEventListener(\"destroy\", handleDestroy);\n    }\n  }], [{\n    key: \"isReadOnlySupported\",\n    get: function get() {\n      return true;\n    }\n  }]);\n\n  return Undo;\n}();\n\n\n\n//# sourceURL=webpack://Undo/./src/index.js?");

/***/ }),

/***/ "./src/observer.js":
/*!*************************!*\
  !*** ./src/observer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Observer)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n/**\n * @typedef {Object} Observer\n * @description Custom MutationObserver to detect changes in the editor.\n * @property {String} holder — Editor.js holder id.\n * @property {Object} observer - MutationObserver object that detects changes in the editor.\n * @property {Number} debounceTimer - Delay time for the debouncer.\n * @property {Function} mutationDebouncer - Debouncer to delay the changes registration.\n */\nvar Observer = /*#__PURE__*/function () {\n  /**\n   * Creates a new instance of the Observer object.\n   * @param {Function} registerChange - Function that register a change in the history stack.\n   * @param {String} holder - Editor.js holder id.\n   * @param {Number} debounceTimer Delay time for the debouncer.\n   */\n  function Observer(registerChange, holder, debounceTimer) {\n    _classCallCheck(this, Observer);\n\n    this.holder = holder;\n    this.observer = null;\n    this.debounceTimer = debounceTimer;\n    this.mutationDebouncer = this.debounce(function () {\n      registerChange();\n    }, this.debounceTimer);\n  }\n  /**\n   * Sets a mutation observer to catch every change in the editor.\n   */\n\n\n  _createClass(Observer, [{\n    key: \"setMutationObserver\",\n    value: function setMutationObserver() {\n      var _this = this;\n\n      var observerOptions = {\n        childList: true,\n        attributes: true,\n        subtree: true,\n        characterData: true,\n        characterDataOldValue: true\n      };\n      var target = this.holder.querySelector('.codex-editor__redactor');\n      this.observer = new MutationObserver(function (mutationList) {\n        _this.mutationHandler(mutationList);\n      });\n      this.observer.observe(target, observerOptions);\n    }\n    /**\n     * Handles the mutations and checks if a new mutation has been produced.\n     * @param {Object} mutationList The registered mutations\n     */\n\n  }, {\n    key: \"mutationHandler\",\n    value: function mutationHandler(mutationList) {\n      var _this2 = this;\n\n      var contentMutated = false;\n      mutationList.forEach(function (mutation) {\n        switch (mutation.type) {\n          case 'childList':\n            if (mutation.target === _this2.holder) {\n              _this2.onDestroy();\n            } else {\n              contentMutated = true;\n            }\n\n            break;\n\n          case 'characterData':\n            contentMutated = true;\n            break;\n\n          case 'attributes':\n            if (!mutation.target.classList.contains('ce-block') && !mutation.target.classList.contains('tc-toolbox')) {\n              contentMutated = true;\n            }\n\n            break;\n\n          default:\n            break;\n        }\n      });\n      if (contentMutated) this.mutationDebouncer();\n    }\n    /**\n     * Delays invoking a function until after wait millis have elapsed.\n     * @param {Function} callback The function to be delayed.\n     * @param {Number} wait The deplay time in millis.\n     */\n\n  }, {\n    key: \"debounce\",\n    value: function debounce(callback, wait) {\n      var _this3 = this;\n\n      var timeout;\n      return function () {\n        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n          args[_key] = arguments[_key];\n        }\n\n        var context = _this3;\n        clearTimeout(timeout);\n        timeout = setTimeout(function () {\n          return callback.apply(context, args);\n        }, wait);\n      };\n    }\n  }, {\n    key: \"onDestroy\",\n    value: function onDestroy() {\n      var destroyEvent = new CustomEvent('destroy');\n      document.dispatchEvent(destroyEvent);\n      this.observer.disconnect();\n    }\n  }]);\n\n  return Observer;\n}();\n\n\n\n//# sourceURL=webpack://Undo/./src/observer.js?");

/***/ }),

/***/ "./node_modules/vanilla-caret-js/dist/VanillaCaret.js":
/*!************************************************************!*\
  !*** ./node_modules/vanilla-caret-js/dist/VanillaCaret.js ***!
  \************************************************************/
/***/ (function(module, exports) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (module) {\n  'use strict';\n\n  function _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n      throw new TypeError(\"Cannot call a class as a function\");\n    }\n  }\n\n  var _createClass = function () {\n    function defineProperties(target, props) {\n      for (var i = 0; i < props.length; i++) {\n        var descriptor = props[i];\n        descriptor.enumerable = descriptor.enumerable || false;\n        descriptor.configurable = true;\n        if (\"value\" in descriptor) descriptor.writable = true;\n        Object.defineProperty(target, descriptor.key, descriptor);\n      }\n    }\n\n    return function (Constructor, protoProps, staticProps) {\n      if (protoProps) defineProperties(Constructor.prototype, protoProps);\n      if (staticProps) defineProperties(Constructor, staticProps);\n      return Constructor;\n    };\n  }();\n\n  var VanillaCaret = function () {\n    function VanillaCaret(target) {\n      _classCallCheck(this, VanillaCaret);\n\n      this.target = target;\n      this.isContentEditable = target && target.contentEditable;\n    }\n\n    _createClass(VanillaCaret, [{\n      key: 'getPos',\n      value: function getPos() {\n        if (document.activeElement !== this.target) {\n          return -1;\n        }\n        if (this.isContentEditable) {\n          this.target.focus();\n          var _range = document.getSelection().getRangeAt(0);\n          var range = _range.cloneRange();\n          range.selectNodeContents(this.target);\n          range.setEnd(_range.endContainer, _range.endOffset);\n          return range.toString().length;\n        }\n\n        return this.target.selectionStart;\n      }\n    }, {\n      key: 'setPos',\n      value: function setPos(position) {\n        if (this.isContentEditable) {\n          if (position >= 0) {\n            var selection = window.getSelection();\n            var range = this.createRange(this.target, {\n              count: position\n            });\n            if (range) {\n              range.collapse(false);\n              selection.removeAllRanges();\n              selection.addRange(range);\n            }\n          }\n        } else {\n          this.target.setSelectionRange(position, position);\n        }\n      }\n    }, {\n      key: 'createRange',\n      value: function createRange(node, chars, range) {\n        if (!range) {\n          range = document.createRange();\n          range.selectNode(node);\n          range.setStart(node, 0);\n        }\n        if (chars.count === 0) {\n          range.setEnd(node, chars.count);\n        } else if (node && chars.count > 0) {\n          if (node.nodeType === Node.TEXT_NODE) {\n            if (node.textContent.length < chars.count) {\n              chars.count -= node.textContent.length;\n            } else {\n              range.setEnd(node, chars.count);\n              chars.count = 0;\n            }\n          } else {\n            for (var lp = 0; lp < node.childNodes.length; lp++) {\n              range = this.createRange(node.childNodes[lp], chars, range);\n              if (chars.count === 0) {\n                break;\n              }\n            }\n          }\n        }\n        return range;\n      }\n    }]);\n\n    return VanillaCaret;\n  }();\n\n  module.exports = VanillaCaret;\n});\n\n//# sourceURL=webpack://Undo/./node_modules/vanilla-caret-js/dist/VanillaCaret.js?");

/***/ }),

/***/ "./node_modules/vanilla-caret-js/index.js":
/*!************************************************!*\
  !*** ./node_modules/vanilla-caret-js/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./dist/VanillaCaret */ \"./node_modules/vanilla-caret-js/dist/VanillaCaret.js\")\n\n//# sourceURL=webpack://Undo/./node_modules/vanilla-caret-js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});