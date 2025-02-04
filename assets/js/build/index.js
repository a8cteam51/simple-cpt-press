/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/src/press-meta-fields.js":
/*!********************************************!*\
  !*** ./assets/js/src/press-meta-fields.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_6__);

/**
 * WordPress dependencies
 */







const PressMetaFields = () => {
  // Create refs to keep track of the locks and the tracking state.
  const locksTrackRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    'press-invalid-outlet': false,
    'press-invalid-url': false
  });
  const isTrackingRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);

  // Lock or unlock the post's saving.
  const trackLock = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((lockIt, handle) => {
    // Keep track of our locks.
    const lockMessages = {
      'press-invalid-outlet': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Press Release Details: The Press Outlet must be filled.', 'cpt-press'),
      'press-invalid-url': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Press Release Details: The URL is invalid (All URL must start with http:// or https://)', 'cpt-press')
    };
    if (lockIt) {
      if (!locksTrackRef.current[handle]) {
        locksTrackRef.current = {
          ...locksTrackRef.current,
          [handle]: true
        };
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/editor').lockPostSaving(handle);
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/notices').createNotice('notice', lockMessages[handle], {
          id: handle,
          isDismissible: false
        });
      }
    } else if (locksTrackRef.current[handle]) {
      locksTrackRef.current = {
        ...locksTrackRef.current,
        [handle]: false
      };
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/editor').unlockPostSaving(handle);
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/notices').removeNotice(handle);
    }
  }, []);

  // Get the current post-type.
  const coreEditor = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/editor');
  const isPress = 'press' === coreEditor.getCurrentPostType();
  const isAutoDraft = 'auto-draft' === coreEditor.getEditedPostAttribute('status');

  // Check if the post is new (not published) to show the initial notice.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isPress && isAutoDraft) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)('core/notices').createNotice('notice', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('A Press item requires a title, a cover image, an outlet. Author and Press Type are optional. The content is optional if you set a permalink and viceversa.', 'cpt-press'), {
        id: 'press-initial-notice',
        isDismissible: true
      });
    }
  }, [isPress, isAutoDraft]);

  // Get the metadata for the current press.
  const [meta, setMeta] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityProp)('postType', 'press', 'meta');

  // Check if the meta-fields are valid.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Avoid this check if the post is auto-draft and it's not a press post.
    if (isAutoDraft || !isPress) {
      return;
    }

    // Check if the press outlet is valid.
    trackLock(0 === meta._press_outlet.length, 'press-invalid-outlet');

    // Check if the press permalink is valid.
    const pressPermalink = meta._press_permalink;
    const hasError = 0 < pressPermalink.length && !(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_6__.isURL)(pressPermalink);
    trackLock(hasError, 'press-invalid-url');
  }, [isPress, isAutoDraft, meta, trackLock]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isPress && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__.PluginDocumentSettingPanel, {
    name: "press-meta-fields",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Press Release Details', 'cpt-press')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Press outlet', 'cpt-press'),
    type: "text",
    onChange: value => setMeta({
      ...meta,
      _press_outlet: value
    }),
    value: meta._press_outlet,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The name of the press source (web site, magazine, newspaper, etc).', 'cpt-press')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Press Author (Optional)', 'cpt-press'),
    type: "text",
    onChange: value => setMeta({
      ...meta,
      _press_author: value
    }),
    value: meta._press_author,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The name of the person who actually wrote the press publication.', 'cpt-press')
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Press Link (Optional)', 'cpt-press'),
    type: "url",
    onChange: value => setMeta({
      ...meta,
      _press_permalink: value
    }),
    value: meta._press_permalink,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The URL that links to the press release. If provided, any link to this press article will redirect to that URL.', 'cpt-press')
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PressMetaFields);

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["editor"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

module.exports = window["wp"]["url"];

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./assets/js/src/index.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _press_meta_fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./press-meta-fields */ "./assets/js/src/press-meta-fields.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */

(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('press-meta-fields', {
  render: _press_meta_fields__WEBPACK_IMPORTED_MODULE_1__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map