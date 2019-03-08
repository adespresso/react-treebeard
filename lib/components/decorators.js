'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

var Loading = function Loading(props) {
    return React.createElement(
        'div',
        { style: props.style, className: 'treebeard-loading' },
        'loading...'
    );
};

Loading.propTypes = {
    style: PropTypes.object.isRequired
};

var Toggle = function Toggle(props) {
    var style = Object.assign({}, {
        base: {},
        wrapper: {},
        arrow: {},
        height: 14,
        width: 14
    }, props.style);

    var height = style.height;
    var width = style.width;
    var midHeight = height * 0.5;
    var points = '0,0 0,' + height + ' ' + width + ',' + midHeight;
    return React.createElement(
        'div',
        { style: style.base, className: 'treebeard-toggle', onClick: props.onClick },
        React.createElement(
            'div',
            { style: style.wrapper },
            React.createElement(
                'svg',
                { height: height, width: width },
                React.createElement('polygon', {
                    points: points,
                    style: style.arrow
                })
            )
        )
    );
};

Toggle.propTypes = {
    node: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

var Header = function Header(props) {
    var style = props.style;
    var classes = ['treebeard-header'];
    if (props.node.active) {
        classes.push('treebeard-active');
    }
    return React.createElement(
        'div',
        { style: style.base, className: classes.join(' '), onClick: props.onClick },
        React.createElement(
            'div',
            { style: style.title },
            props.node.name
        )
    );
};

Header.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

var Container = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container(props) {
        _classCallCheck(this, Container);

        return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));
    }

    _createClass(Container, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                style = _props.style,
                decorators = _props.decorators,
                terminal = _props.terminal,
                onClick = _props.onClick,
                node = _props.node;


            style = Object.assign({}, {
                container: {},
                header: {}
            }, style);

            return React.createElement(
                'div',
                {
                    ref: 'clickable',
                    className: 'treebeard-container',
                    style: style.container },
                !terminal ? this.renderToggleDecorator() : null,
                React.createElement(decorators.Header, {
                    node: node,
                    style: style.header,
                    onClick: onClick
                })
            );
        }
    }, {
        key: 'renderToggleDecorator',
        value: function renderToggleDecorator() {
            var _props2 = this.props,
                style = _props2.style,
                decorators = _props2.decorators;

            return React.createElement(decorators.Toggle, { style: style.toggle || {}, onClick: this.props.onToggle, node: this.props.node });
        }
    }]);

    return Container;
}(React.Component);

Container.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    node: PropTypes.object.isRequired
};

export default {
    Loading: Loading,
    Toggle: Toggle,
    Header: Header,
    Container: Radium(Container)
};