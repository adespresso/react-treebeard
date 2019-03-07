'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';

var TreeBeard = function (_React$Component) {
    _inherits(TreeBeard, _React$Component);

    function TreeBeard(props) {
        _classCallCheck(this, TreeBeard);

        var _this = _possibleConstructorReturn(this, (TreeBeard.__proto__ || Object.getPrototypeOf(TreeBeard)).call(this, props));

        _this.style = Object.assign({}, _this.props.style);
        if (Object.getOwnPropertyNames(_this.style).length === 0) {
            _this.style.tree = {
                base: {},
                node: {}
            };
        }

        return _this;
    }

    _createClass(TreeBeard, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var data = this.props.data;
            // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
            if (!Array.isArray(data)) {
                data = [data];
            }
            return React.createElement(
                'ul',
                { style: this.style.tree.base, ref: 'treeBase', className: 'treebeard-treebeard' },
                data.map(function (node, index) {
                    return React.createElement(TreeNode, {
                        key: node.id || index,
                        node: node,
                        onClick: _this2.props.onClick,
                        onToggle: _this2.props.onToggle,
                        decorators: _this2.props.decorators,
                        style: _this2.style.tree.node
                    });
                })
            );
        }
    }]);

    return TreeBeard;
}(React.Component);

TreeBeard.propTypes = {
    style: PropTypes.object.isRequired,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    onClick: PropTypes.func,
    onToggle: PropTypes.func,
    decorators: PropTypes.object
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    decorators: defaultDecorators
};

export default TreeBeard;