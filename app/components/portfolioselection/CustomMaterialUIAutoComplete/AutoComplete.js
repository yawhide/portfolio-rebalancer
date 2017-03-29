

Object.defineProperty(exports, '__esModule', {
  value: true
});

const _extends2 = require('babel-runtime/helpers/extends');

const _extends3 = _interopRequireDefault(_extends2);

const _typeof2 = require('babel-runtime/helpers/typeof');

const _typeof3 = _interopRequireDefault(_typeof2);

const _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

const _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

const _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

const _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

const _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

const _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

const _createClass2 = require('babel-runtime/helpers/createClass');

const _createClass3 = _interopRequireDefault(_createClass2);

const _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

const _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

const _inherits2 = require('babel-runtime/helpers/inherits');

const _inherits3 = _interopRequireDefault(_inherits2);

const _simpleAssign = require('simple-assign');

const _simpleAssign2 = _interopRequireDefault(_simpleAssign);

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

const _reactDom = require('react-dom');

const _reactDom2 = _interopRequireDefault(_reactDom);

const _keycode = require('keycode');

const _keycode2 = _interopRequireDefault(_keycode);

const _TextField = require('material-ui/TextField');

const _TextField2 = _interopRequireDefault(_TextField);

const _Menu = require('material-ui/Menu');

const _Menu2 = _interopRequireDefault(_Menu);

const _MenuItem = require('material-ui/MenuItem');

const _MenuItem2 = _interopRequireDefault(_MenuItem);

const _Divider = require('material-ui/Divider');

const _Divider2 = _interopRequireDefault(_Divider);

const _Popover = require('material-ui/Popover/Popover');

const _Popover2 = _interopRequireDefault(_Popover);

const _propTypes = require('react');

const _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function getStyles(props, context, state) {
  const anchorEl = state.anchorEl;
  const fullWidth = props.fullWidth;


  const styles = {
    root: {
      display: 'inline-block',
      position: 'relative',
      width: fullWidth ? '100%' : 256
    },
    menu: {
      width: '100%'
    },
    list: {
      display: 'block',
      width: fullWidth ? '100%' : 256
    },
    innerDiv: {
      overflow: 'hidden'
    }
  };

  if (anchorEl && fullWidth) {
    styles.popover = {
      width: anchorEl.clientWidth
    };
  }

  return styles;
}

const AutoComplete = (function(_Component) {
  (0, _inherits3.default)(AutoComplete, _Component);

  function AutoComplete() {
    let _ref;

    let _temp,
      _this,
      _ret;

    (0, _classCallCheck3.default)(this, AutoComplete);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutoComplete.__proto__ || (0, _getPrototypeOf2.default)(AutoComplete)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        anchorEl: null,
        focusTextField: true,
        open: false,
        searchText: undefined
      }, _this.handleRequestClose = function() {
        // Only take into account the Popover clickAway when we are
        // not focusing the TextField.
        if (!_this.state.focusTextField) {
          _this.close();
        }
      }, _this.handleMouseDown = function(event) {
        // Keep the TextField focused
        event.preventDefault();
      }, _this.handleItemTouchTap = function(event, child) {
        if (child.props.isGroup) {
          _this.state.focusTextField = false;
          event.preventDefault();
          return;
        }
        const dataSource = _this.props.dataSource;

        const index = parseInt(child.key, 10);
        const chosenRequest = dataSource[index];
        const searchText = '';

        _this.setState({
          searchText
        }, () => {
          _this.props.onUpdateInput(searchText, _this.props.dataSource, {
            source: 'touchTap'
          });
          _this.timerTouchTapCloseId = setTimeout(() => {
            _this.timerTouchTapCloseId = null;
            _this.close();
            _this.props.onNewRequest(chosenRequest, index);
          }, _this.props.menuCloseDelay);
        });
      }, _this.chosenRequestText = function(chosenRequest) {
        if (typeof chosenRequest === 'string') {
          return chosenRequest;
        } else {
          return chosenRequest[_this.props.dataSourceConfig.text];
        }
      }, _this.handleEscKeyDown = function() {
        _this.close();
      }, _this.handleKeyDown = function(event) {
        if (_this.props.onKeyDown) _this.props.onKeyDown(event);

        switch ((0, _keycode2.default)(event)) {
          case 'enter':
            _this.close();
            var searchText = _this.state.searchText;
            if (searchText !== '') {
              _this.props.onNewRequest(searchText, -1);
            }
            break;

          case 'esc':
            _this.close();
            break;

          case 'down':
            event.preventDefault();
            _this.setState({
              open: true,
              focusTextField: false,
              anchorEl: _reactDom2.default.findDOMNode(_this.refs.searchTextField)
            });
            break;

          default:
            break;
        }
      }, _this.handleChange = function(event) {
        const searchText = event.target.value;

        // Make sure that we have a new searchText.
        // Fix an issue with a Cordova Webview
        if (searchText === _this.state.searchText) {
          return;
        }

        _this.setState({
          searchText,
          open: true,
          anchorEl: _reactDom2.default.findDOMNode(_this.refs.searchTextField)
        }, () => {
          _this.props.onUpdateInput(searchText, _this.props.dataSource, {
            source: 'change'
          });
        });
      }, _this.handleBlur = function(event) {
        if (_this.state.focusTextField && _this.timerTouchTapCloseId === null) {
          _this.timerBlurClose = setTimeout(() => {
            _this.close();
          }, 0);
        }

        if (_this.props.onBlur) {
          _this.props.onBlur(event);
        }
      }, _this.handleFocus = function(event) {
        if (!_this.state.open && _this.props.openOnFocus) {
          _this.setState({
            open: true,
            anchorEl: _reactDom2.default.findDOMNode(_this.refs.searchTextField)
          });
        }

        _this.setState({
          focusTextField: true
        });

        if (_this.props.onFocus) {
          _this.props.onFocus(event);
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AutoComplete, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.requestsList = [];
      this.setState({
        open: this.props.open,
        searchText: this.props.searchText
      });
      this.timerTouchTapCloseId = null;
    }
  },
  {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleFocus();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.searchText !== nextProps.searchText) {
        this.setState({
          searchText: nextProps.searchText
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timerTouchTapCloseId);
      clearTimeout(this.timerBlurClose);
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({
        open: false,
        anchorEl: null
      });

      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.refs.searchTextField.blur();
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.searchTextField.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      const _this2 = this;

      let _props = this.props,
        anchorOrigin = _props.anchorOrigin,
        animated = _props.animated,
        animation = _props.animation,
        dataSource = _props.dataSource,
        dataSourceConfig = _props.dataSourceConfig,
        disableFocusRipple = _props.disableFocusRipple,
        errorStyle = _props.errorStyle,
        floatingLabelText = _props.floatingLabelText,
        filter = _props.filter,
        fullWidth = _props.fullWidth,
        style = _props.style,
        hintText = _props.hintText,
        maxSearchResults = _props.maxSearchResults,
        menuCloseDelay = _props.menuCloseDelay,
        textFieldStyle = _props.textFieldStyle,
        menuStyle = _props.menuStyle,
        menuProps = _props.menuProps,
        listStyle = _props.listStyle,
        targetOrigin = _props.targetOrigin,
        onClose = _props.onClose,
        onNewRequest = _props.onNewRequest,
        onUpdateInput = _props.onUpdateInput,
        openOnFocus = _props.openOnFocus,
        popoverProps = _props.popoverProps,
        searchTextProp = _props.searchText,
        other = (0, _objectWithoutProperties3.default)(_props, ['anchorOrigin', 'animated', 'animation', 'dataSource', 'dataSourceConfig', 'disableFocusRipple', 'errorStyle', 'floatingLabelText', 'filter', 'fullWidth', 'style', 'hintText', 'maxSearchResults', 'menuCloseDelay', 'textFieldStyle', 'menuStyle', 'menuProps', 'listStyle', 'targetOrigin', 'onClose', 'onNewRequest', 'onUpdateInput', 'openOnFocus', 'popoverProps', 'searchText']);

      let _ref2 = popoverProps || {},
        popoverStyle = _ref2.style,
        popoverOther = (0, _objectWithoutProperties3.default)(_ref2, ['style']);

      let _state = this.state,
        open = _state.open,
        anchorEl = _state.anchorEl,
        searchText = _state.searchText,
        focusTextField = _state.focusTextField;
      const prepareStyles = this.context.muiTheme.prepareStyles;

      const styles = getStyles(this.props, this.context, this.state);

      const requestsList = [];

      dataSource.every((item, index) => {
        switch (
        typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) {
          case 'string':
            if (filter(searchText, item, item)) {
              requestsList.push({
                text: item,
                value: _react2.default.createElement(_MenuItem2.default, {
                  innerDivStyle: styles.innerDiv,
                  value: item,
                  primaryText: item,
                  disableFocusRipple,
                  key: index
                })
              });
            }
            break;

          case 'object':
            if (item && typeof item[_this2.props.dataSourceConfig.text] === 'string') {
              const itemText = item[_this2.props.dataSourceConfig.text];
              if (!_this2.props.filter(searchText, itemText, item)) break;

              const itemValue = item[_this2.props.dataSourceConfig.value];
              if (itemValue.type && (itemValue.type.muiName === _MenuItem2.default.muiName || itemValue.type.muiName === _Divider2.default.muiName)) {
                requestsList.push({
                  text: itemText,
                  value: _react2.default.cloneElement(itemValue, {
                    key: index,
                    disableFocusRipple
                  })
                });
              } else {
                requestsList.push({
                  text: itemText,
                  value: _react2.default.createElement(_MenuItem2.default, {
                    innerDivStyle: styles.innerDiv,
                    primaryText: itemText,
                    disableFocusRipple,
                    key: index
                  })
                });
              }
            }
            break;

          default:
        // Do nothing
        }

        return !(maxSearchResults && maxSearchResults > 0 && requestsList.length === maxSearchResults);
      });

      this.requestsList = requestsList;

      const menu = open && requestsList.length > 0 && _react2.default.createElement(
        _Menu2.default,
        (0, _extends3.default)({}, menuProps, {
          ref: 'menu',
          autoWidth: false,
          disableAutoFocus: focusTextField,
          onEscKeyDown: this.handleEscKeyDown,
          initiallyKeyboardFocused: true,
          onItemTouchTap: this.handleItemTouchTap,
          onMouseDown: this.handleMouseDown,
          style: (0, _simpleAssign2.default)(styles.menu, menuStyle),
          listStyle: (0, _simpleAssign2.default)(styles.list, listStyle)
        }),
        requestsList.map((i) => {
          return i.value;
        })
      );

      return _react2.default.createElement(
        'div',
        {
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
        },
        _react2.default.createElement(_TextField2.default, (0, _extends3.default)({}, other, {
          ref: 'searchTextField',
          autoComplete: 'off',
          value: searchText,
          onChange: this.handleChange,
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onKeyDown: this.handleKeyDown,
          floatingLabelText,
          hintText,
          fullWidth,
          multiLine: false,
          errorStyle,
          style: textFieldStyle
        })),
        _react2.default.createElement(
          _Popover2.default,
          (0, _extends3.default)({
            style: (0, _simpleAssign2.default)({}, styles.popover, popoverStyle),
            canAutoPosition: false,
            anchorOrigin,
            targetOrigin,
            open,
            anchorEl,
            useLayerForClickAway: false,
            onRequestClose: this.handleRequestClose,
            animated,
            animation
          }, popoverOther),
          menu
        )
      );
    }
  }]);
  return AutoComplete;
}(_react.Component));

AutoComplete.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  animated: true,
  dataSourceConfig: {
    text: 'text',
    value: 'value'
  },
  disableFocusRipple: true,
  filter: function filter(searchText, key) {
    return searchText !== '' && key.indexOf(searchText) !== -1;
  },
  fullWidth: false,
  open: false,
  openOnFocus: false,
  onUpdateInput: function onUpdateInput() {},
  onNewRequest: function onNewRequest() {},
  searchText: '',
  menuCloseDelay: 300,
  targetOrigin: {
    vertical: 'top',
    horizontal: 'left'
  }
};
AutoComplete.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
process.env.NODE_ENV !== 'production' ? AutoComplete.propTypes = {
  /**
   * Location of the anchor for the auto complete.
   */
  anchorOrigin: _propTypes2.default.origin,
  /**
   * If true, the auto complete is animated as it is toggled.
   */
  animated: _react.PropTypes.bool,
  /**
   * Override the default animation component used.
   */
  animation: _react.PropTypes.func,
  /**
   * Array of strings or nodes used to populate the list.
   */
  dataSource: _react.PropTypes.array.isRequired,
  /**
   * Config for objects list dataSource.
   *
   * @typedef {Object} dataSourceConfig
   *
   * @property {string} text `dataSource` element key used to find a string to be matched for search
   * and shown as a `TextField` input value after choosing the result.
   * @property {string} value `dataSource` element key used to find a string to be shown in search results.
   */
  dataSourceConfig: _react.PropTypes.object,
  /**
   * Disables focus ripple when true.
   */
  disableFocusRipple: _react.PropTypes.bool,
  /**
   * Override style prop for error.
   */
  errorStyle: _react.PropTypes.object,
  /**
   * The error content to display.
   */
  errorText: _react.PropTypes.node,
  /**
   * Callback function used to filter the auto complete.
   *
   * @param {string} searchText The text to search for within `dataSource`.
   * @param {string} key `dataSource` element, or `text` property on that element if it's not a string.
   * @returns {boolean} `true` indicates the auto complete list will include `key` when the input is `searchText`.
   */
  filter: _react.PropTypes.func,
  /**
   * The content to use for adding floating label element.
   */
  floatingLabelText: _react.PropTypes.node,
  /**
   * If true, the field receives the property `width: 100%`.
   */
  fullWidth: _react.PropTypes.bool,
  /**
   * The hint content to display.
   */
  hintText: _react.PropTypes.node,
  /**
   * Override style for list.
   */
  listStyle: _react.PropTypes.object,
  /**
   * The max number of search results to be shown.
   * By default it shows all the items which matches filter.
   */
  maxSearchResults: _react.PropTypes.number,
  /**
   * Delay for closing time of the menu.
   */
  menuCloseDelay: _react.PropTypes.number,
  /**
   * Props to be passed to menu.
   */
  menuProps: _react.PropTypes.object,
  /**
   * Override style for menu.
   */
  menuStyle: _react.PropTypes.object,
  /** @ignore */
  onBlur: _react.PropTypes.func,
  /**
   * Callback function fired when the menu is closed.
   */
  onClose: _react.PropTypes.func,
  /** @ignore */
  onFocus: _react.PropTypes.func,
  /** @ignore */
  onKeyDown: _react.PropTypes.func,
  /**
   * Callback function that is fired when a list item is selected, or enter is pressed in the `TextField`.
   *
   * @param {string} chosenRequest Either the `TextField` input value, if enter is pressed in the `TextField`,
   * or the text value of the corresponding list item that was selected.
   * @param {number} index The index in `dataSource` of the list item selected, or `-1` if enter is pressed in the
   * `TextField`.
   */
  onNewRequest: _react.PropTypes.func,
  /**
   * Callback function that is fired when the user updates the `TextField`.
   *
   * @param {string} searchText The auto-complete's `searchText` value.
   * @param {array} dataSource The auto-complete's `dataSource` array.
   * @param {object} params Additional information linked the update.
   */
  onUpdateInput: _react.PropTypes.func,
  /**
   * Auto complete menu is open if true.
   */
  open: _react.PropTypes.bool,
  /**
   * If true, the list item is showed when a focus event triggers.
   */
  openOnFocus: _react.PropTypes.bool,
  /**
   * Props to be passed to popover.
   */
  popoverProps: _react.PropTypes.object,
  /**
   * Text being input to auto complete.
   */
  searchText: _react.PropTypes.string,
  /**
   * Override the inline-styles of the root element.
   */
  style: _react.PropTypes.object,
  /**
   * Origin for location of target.
   */
  targetOrigin: _propTypes2.default.origin,
  /**
   * Override the inline-styles of AutoComplete's TextField element.
   */
  textFieldStyle: _react.PropTypes.object
} : void 0;


AutoComplete.levenshteinDistance = function(searchText, key) {
  const current = [];
  let prev = void 0;
  let value = void 0;

  for (let i = 0; i <= key.length; i++) {
    for (let j = 0; j <= searchText.length; j++) {
      if (i && j) {
        if (searchText.charAt(j - 1) === key.charAt(i - 1))
          value = prev; else
          value = Math.min(current[j], current[j - 1], prev) + 1;
      } else {
        value = i + j;
      }
      prev = current[j];
      current[j] = value;
    }
  }
  return current.pop();
};

AutoComplete.noFilter = function() {
  return true;
};

AutoComplete.defaultFilter = AutoComplete.caseSensitiveFilter = function(searchText, key) {
  return searchText !== '' && key.indexOf(searchText) !== -1;
};

AutoComplete.caseInsensitiveFilter = function(searchText, key) {
  return key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
};

AutoComplete.levenshteinDistanceFilter = function(distanceLessThan) {
  if (distanceLessThan === undefined) {
    return AutoComplete.levenshteinDistance;
  } else if (typeof distanceLessThan !== 'number') {
    throw 'Error: AutoComplete.levenshteinDistanceFilter is a filter generator, not a filter!';
  }

  return function(s, k) {
    return AutoComplete.levenshteinDistance(s, k) < distanceLessThan;
  };
};

AutoComplete.fuzzyFilter = function(searchText, key) {
  const compareString = key.toLowerCase();
  searchText = searchText.toLowerCase();

  let searchTextIndex = 0;
  for (let index = 0; index < key.length; index++) {
    if (compareString[index] === searchText[searchTextIndex]) {
      searchTextIndex += 1;
    }
  }

  return searchTextIndex === searchText.length;
};

AutoComplete.Item = _MenuItem2.default;
AutoComplete.Divider = _Divider2.default;

exports.default = AutoComplete;
