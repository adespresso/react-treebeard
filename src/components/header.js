'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';

class NodeHeader extends React.Component {
    constructor(props){
        super(props);

        this.style = Object.assign({}, {
            base: {},
            connector: {},
            title: {}
        }, this.props.style);
    }
    shouldComponentUpdate(nextProps){
        const props = this.props;
        const nextPropKeys = Object.keys(nextProps);
        for(let i = 0; i < nextPropKeys.length; i++){
            const key = nextPropKeys[i];
            const isEqual = shallowEqual(props[key], nextProps[key]);
            if(!isEqual){ return true; }
        }
        return false;
    }
    render(){
        const {style, decorators} = this.props;
        const terminal = !this.props.node.children;
        const active = this.props.node.active;
        const container = [style.link, active ? style.activeLink : null];
        const headerStyles = Object.assign({ container }, this.style);
        return (
            <decorators.Container
                style={headerStyles}
                decorators={decorators}
                terminal={terminal}
                onClick={this.props.onClick}
                onToggle={this.props.onToggle}
                node={this.props.node}
            />
        );
    }
}

NodeHeader.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onToggle: PropTypes.func
};

export default NodeHeader;
