'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import NodeHeader from './header';

var TreeNode = function (_React$Component) {
    _inherits(TreeNode, _React$Component);

    function TreeNode(props) {
        _classCallCheck(this, TreeNode);

        var _this = _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call(this, props));

        _this.style = Object.assign({}, {
            base: {},
            link: {},
            activeLink: {},
            toggle: {},
            header: {},
            subtree: {},
            loading: {}
        }, _this.props.style);

        _this.onToggle = _this.onToggle.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(TreeNode, [{
        key: 'onClick',
        value: function onClick() {
            var onClick = this.props.onClick;
            if (onClick) {
                onClick(this.props.node);
            }
        }
    }, {
        key: 'onToggle',
        value: function onToggle() {
            var toggled = !this.props.node.toggled;
            var onToggle = this.props.onToggle;
            if (onToggle) {
                onToggle(this.props.node, toggled);
            }
        }
    }, {
        key: 'decorators',
        value: function decorators() {
            // Merge Any Node Based Decorators Into The Pack
            var props = this.props;
            var nodeDecorators = props.node.decorators || {};
            return Object.assign({}, props.decorators, nodeDecorators);
        }
    }, {
        key: 'render',
        value: function render() {
            var decorators = this.decorators();
            var cssClasses = 'treebeard-treenode ' + (this.props.node.toggled ? 'open' : 'closed');
            return React.createElement(
                'li',
                { style: this.style.base, ref: 'topLevel', className: cssClasses },
                this.renderHeader(decorators),
                this.renderDrawer(decorators)
            );
        }
    }, {
        key: 'renderDrawer',
        value: function renderDrawer(decorators) {
            var toggled = this.props.node.toggled;
            if (toggled) {
                return this.renderChildren(decorators);
            }
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader(decorators) {
            return React.createElement(NodeHeader, {
                decorators: decorators,
                style: this.style.header,
                node: Object.assign({}, this.props.node),
                onClick: this.onClick,
                onToggle: this.onToggle
            });
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(decorators) {
            var _this2 = this;

            if (this.props.node.loading) {
                return this.renderLoading(decorators);
            }
            return React.createElement(
                'ul',
                { style: this.style.subtree, ref: 'subtree', className: 'treebeard-drawer' },
                (this.props.node.children || []).map(function (child, index) {
                    return React.createElement(TreeNode, _extends({}, _this2._eventBubbles(), {
                        key: child.id || index,
                        node: child,
                        decorators: _this2.props.decorators,
                        style: _this2.style
                    }));
                })
            );
        }
    }, {
        key: 'renderLoading',
        value: function renderLoading(decorators) {
            return React.createElement(
                'ul',
                { style: this.style.subtree, className: 'treebeard-loading-container' },
                React.createElement(
                    'li',
                    null,
                    React.createElement(decorators.Loading, { style: this.style.loading })
                )
            );
        }
    }, {
        key: '_eventBubbles',
        value: function _eventBubbles() {
            return {
                onClick: this.props.onClick,
                onToggle: this.props.onToggle
            };
        }
    }]);

    return TreeNode;
}(React.Component);

TreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    onToggle: PropTypes.func,
    onClick: PropTypes.func
};

export default TreeNode;