'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import NodeHeader from './header';

class TreeNode extends React.Component {
    constructor(props){
        super(props);

        this.style = Object.assign({}, {
            base: {},
            link: {},
            activeLink: {},
            toggle: {},
            header: {},
            subtree: {},
            loading: {}
        }, this.props.style);

        this.onToggle = this.onToggle.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        let onClick = this.props.onClick;
        if(onClick){ onClick(this.props.node); }
    }
    onToggle(){
        let toggled = !this.props.node.toggled;
        let onToggle = this.props.onToggle;
        if(onToggle){ onToggle(this.props.node, toggled); }
    }
    decorators(){
        // Merge Any Node Based Decorators Into The Pack
        const props = this.props;
        let nodeDecorators = props.node.decorators || {};
        return Object.assign({}, props.decorators, nodeDecorators);
    }
    render(){
        const decorators = this.decorators();
        const cssClasses = 'treebeard-treenode ' + (this.props.node.toggled ? 'open' : 'closed');
        return (
            <li style={this.style.base} ref="topLevel" className={cssClasses}>
                {this.renderHeader(decorators)}
                {this.renderDrawer(decorators)}
            </li>
        );
    }
    renderDrawer(decorators){
        const toggled = this.props.node.toggled;
        if (toggled) {
            return this.renderChildren(decorators);
        }
    }
    renderHeader(decorators){
        return (
            <NodeHeader
                decorators={decorators}
                style={this.style.header}
                node={Object.assign({}, this.props.node)}
                onClick={this.onClick}
                onToggle={this.onToggle}
            />
        );
    }
    renderChildren(decorators){
        if(this.props.node.loading){ return this.renderLoading(decorators); }
        return (
            <ul style={this.style.subtree} ref="subtree" className="treebeard-drawer">
                {(this.props.node.children || []).map( (child, index) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        key={child.id || index}
                        node={child}
                        decorators={this.props.decorators}
                        style={this.style}
                    />
                )}
            </ul>
        );
    }
    renderLoading(decorators){
        return (
            <ul style={this.style.subtree} className="treebeard-loading-container">
                <li>
                    <decorators.Loading style={this.style.loading}/>
                </li>
            </ul>
        );
    }
    _eventBubbles(){
        return {
            onClick: this.props.onClick,
            onToggle: this.props.onToggle
        };
    }
}

TreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    onToggle: PropTypes.func,
    onClick: PropTypes.func
};

export default TreeNode;
