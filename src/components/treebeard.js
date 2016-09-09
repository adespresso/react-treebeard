'use strict';

import React from 'react';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';

class TreeBeard extends React.Component {
    constructor(props){
        super(props);

        this.style = Object.assign({}, this.props.style);
        if (Object.getOwnPropertyNames(this.style).length === 0) {
            this.style.tree = {
                base: {},
                node: {}
            };
        }

    }
    render(){
        let data = this.props.data;
        // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
        if(!Array.isArray(data)){ data = [data]; }
        return (
            <ul style={this.style.tree.base} ref="treeBase" className="treebeard-treebeard">
                {data.map((node, index) =>
                    <TreeNode
                        key={node.id || index}
                        node={node}
                        onClick={this.props.onClick}
                        onToggle={this.props.onToggle}
                        decorators={this.props.decorators}
                        style={this.style.tree.node}
                    />
                )}
            </ul>
        );
    }
}

TreeBeard.propTypes = {
    style: React.PropTypes.object.isRequired,
    data: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
    onClick: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    decorators: React.PropTypes.object
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    decorators: defaultDecorators
};

export default TreeBeard;
