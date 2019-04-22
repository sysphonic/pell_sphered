(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.pell = {})));
}(this, (function (exports) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultParagraphSeparatorString = 'defaultParagraphSeparator';
var formatBlock = 'formatBlock';
var addEventListener = function addEventListener(parent, type, listener) {
  return parent.addEventListener(type, listener);
};
var appendChild = function appendChild(parent, child) {
  return parent.appendChild(child);
};
var createElement = function createElement(tag) {
  return document.createElement(tag);
};
var queryCommandState = function queryCommandState(command) {
  return document.queryCommandState(command);
};
var queryCommandValue = function queryCommandValue(command) {
  return document.queryCommandValue(command);
};

var exec = function exec(command) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var ret = document.execCommand(command, false, value);
  if (_pellContent) {
    _pellContent.oninput({target:_pellContent});  // for Edge
  }
  return ret;
};

var defaultActions = {
  bold: {
    icon: '<b>B</b>',
    title: t("action.bold"),
    state: function state() {
      return queryCommandState('bold');
    },
    result: function result() {
      return exec('bold');
    }
  },
  italic: {
    icon: '<i>I</i>',
    title: t("action.italic"),
    state: function state() {
      return queryCommandState('italic');
    },
    result: function result() {
      return exec('italic');
    }
  },
  underline: {
    icon: '<u>U</u>',
    title: t("action.underline"),
    state: function state() {
      return queryCommandState('underline');
    },
    result: function result() {
      return exec('underline');
    }
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: t("action.strike_through"),
    state: function state() {
      return queryCommandState('strikeThrough');
    },
    result: function result() {
      return exec('strikeThrough');
    }
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: t("action.heading1"),
    result: function result() {
      return exec(formatBlock, '<h1>');
    }
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: t("action.heading2"),
    result: function result() {
      return exec(formatBlock, '<h2>');
    }
  },
  paragraph: {
    icon: '&#182;',
    title: t("action.paragraph"),
    result: function result() {
      return exec(formatBlock, '<p>');
    }
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: t("action.quote"),
    result: function result() {
      return exec(formatBlock, '<blockquote>');
    }
  },
  olist: {
    icon: '&#35;',
    title: t("action.ordered_list"),
    result: function result() {
      return exec('insertOrderedList');
    }
  },
  ulist: {
    icon: '&#8226;',
    title: t("action.unordered_list"),
    result: function result() {
      return exec('insertUnorderedList');
    }
  },
  code: {
    icon: '&lt;/&gt;',
    title: t("action.code"),
    result: function result() {
      return exec(formatBlock, '<pre>');
    }
  },
  line: {
    icon: '&#8213;',
    title: t("action.horz_line"),
    result: function result() {
      return exec('insertHorizontalRule');
    }
  },
  link: {
    icon: '&#128279;',
    title: t("action.link"),
    result: function result() {
      var thetisBox = new ThetisBox;
      thetisBox.show("CENTER", "340,+158", "INPUT", "onPellEditLinkOkClicked("+thetisBox.id+");", t("msg.enter_link_url"), null);
    }
  },
  image: {
    icon: '&#128247;',
    title: t("action.image"),
    result: function result() {
      var thetisBox = new ThetisBox;
      thetisBox.show("CENTER", "340,+158", "INPUT", "onPellEditImageOkClicked("+thetisBox.id+");", t("msg.enter_image_url"), null);
    }
  },
  forecolor: {
    icon: '<span id="pell_forecolor"><img src="./nessie/img/icons/text_color.png" /><input type="hidden" id="pell_forecolor_val" /></span>',
    title: t("action.forecolor"),
    result: function result() {
      showPellPalette("pell_forecolor");
    }
  },
  bgcolor: {
    icon: '<span id="pell_bgcolor"><img src="./nessie/img/icons/bgcolor.png" /><input type="hidden" id="pell_bgcolor_val" /></span>',
    title: t("action.bgcolor"),
    result: function result() {
      showPellPalette("pell_bgcolor");
    }
  }
};

var defaultClasses = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content',
  selected: 'pell-button-selected'
};

var init = function init(settings) {
  var actions = settings.actions ? settings.actions.map(function (action) {
    if (typeof action === 'string') return defaultActions[action];else if (defaultActions[action.name]) return _extends({}, defaultActions[action.name], action);
    return action;
  }) : Object.keys(defaultActions).map(function (action) {
    return defaultActions[action];
  });

  var classes = _extends({}, defaultClasses, settings.classes);

  var defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div';

  var actionbar = createElement('div');
  actionbar.className = classes.actionbar;
  appendChild(settings.element, actionbar);

  var content = settings.element.content = createElement('div');
  content.contentEditable = true;
  content.className = classes.content;
  content.oninput = function (_ref) {
    if (_pellContent && (_pellContent.innerHTML == _pellLastHtml)) {
      return;
    }
    var firstChild = _ref.target.firstChild;

    if (firstChild && firstChild.nodeType === 3) exec(formatBlock, '<' + defaultParagraphSeparator + '>');else if (content.innerHTML === '<br>') content.innerHTML = '';
    settings.onChange(content.innerHTML);
    _pellLastHtml = content.innerHTML;
  };
  content.onkeydown = function (event) {
    if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
      setTimeout(function () {
        return exec(formatBlock, '<' + defaultParagraphSeparator + '>');
      }, 0);
    }
  };
  appendChild(settings.element, content);

  actions.forEach(function (action) {
    var button = createElement('button');
    button.className = classes.button;
    button.innerHTML = action.icon;
    button.title = action.title;
    button.setAttribute('type', 'button');
    button.onclick = function () {
      setPellSelection(content);
      return action.result() && content.focus();
    };

    if (action.state) {
      var handler = function handler() {
        return button.classList[action.state() ? 'add' : 'remove'](classes.selected);
      };
      addEventListener(content, 'keyup', handler);
      addEventListener(content, 'mouseup', handler);
      addEventListener(button, 'click', handler);
    }

    appendChild(actionbar, button);
  });

  if (settings.styleWithCSS) exec('styleWithCSS');
  exec(defaultParagraphSeparatorString, defaultParagraphSeparator);

  return settings.element;
};

var pell = { exec: exec, init: init };

exports.exec = exec;
exports.init = init;
exports['default'] = pell;

Object.defineProperty(exports, '__esModule', { value: true });

})));

var NESSIE_RELATIVE_URL_ROOT = "../nessie";
var REQ_PARAM_DEBUG = "";

var _pellContent = null;
var _pellSelection = null;
var _pellSpanClass = null;
var _pellSpanStyle = null;
var _pellLastHtml = null;

var setPellSelection = function(content)
{
  if (arguments.length <= 0) {
    _pellContent = null;
    _pellSelection = null;
  } else {
    _pellContent = content;
    _pellSelection = getTextSelection(content);
  }
}

var onPellEditLinkOkClicked = function(thetisBoxId)
{
  doPellAction("createLink", thetisBoxId);
}

var onPellEditImageOkClicked = function(thetisBoxId)
{
  doPellAction("insertImage", thetisBoxId);
}

var doPellAction = function(action, thetisBoxId)
{
  if (_pellContent) {
    _pellContent.focus();
    restoreTextSelection(_pellContent, _pellSelection);

    var url = _z("thetisBoxEdit-"+thetisBoxId).value;
    if (url) {
      pell.exec(action, url);
    }
  }
  ThetisBox.remove(thetisBoxId);
}

var showPellPalette = function(tag)
{
  ThetisPalette.setCaptions(
      [t("btn.close"), t("btn.clear")]
    );
  ThetisPalette.setButtons(
      {
        clear: NESSIE_RELATIVE_URL_ROOT+"/img/icons/erase.png"
      }
    );

  var thetisPalette = new ThetisPalette(tag, tag+"_val", null);
  thetisPalette.show_clear = true;

  thetisPalette.setFunc(
              function() {
                onPellPaletteSelected(tag, thetisPalette.getInputElem().value);
              }
            );
  thetisPalette.show();
}

var onPellPaletteSelected = function(tag, colorVal)
{
  switch (tag) {
    case "pell_forecolor":
      pell.exec("foreColor", colorVal);
      break;
    case "pell_bgcolor":
      pell.exec("backColor", colorVal);
      break;
  }
}

