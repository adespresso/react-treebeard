'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

const Loading = (props) => {
    return (
        <div style={props.style} className="treebeard-loading">
            loading...
        </div>
    );
};

Loading.propTypes = {
    style: PropTypes.object.isRequired
};

const Toggle = (props) => {
    const style = Object.assign({}, {
        base: {},
        wrapper: {},
        arrow: {},
        height: 14,
        width: 14
    }, props.style);

    const height = style.height;
    const width = style.width;
    let midHeight = height * 0.5;
    let points = `0,0 0,${height} ${width},${midHeight}`;
    return (
        <div style={style.base} className="treebeard-toggle" onClick={props.onClick}>
            <div style={style.wrapper}>
                <svg height={height} width={width}>
                    <polygon
                        points={points}
                        style={style.arrow}
                    />
                </svg>
            </div>
        </div>
    );
};

Toggle.propTypes = {
    node: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

const Header = (props) => {
    const style = props.style;
    let classes = ['treebeard-header'];
    if (props.node.active) {
        classes.push('treebeard-active');
    }
    return (
        <div style={style.base} className={classes.join(' ')} onClick={props.onClick}>
            <div style={style.title}>
                {props.node.name}
            </div>
        </div>
    );
};

Header.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

class Container extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let {style, decorators, terminal, onClick, node} = this.props;

        style = Object.assign({}, {
            container: {},
            header: {}
        }, style);

        return (
            <div
                ref="clickable"
                className="treebeard-container"
                style={style.container}>
                { !terminal ? this.renderToggleDecorator() : null }
                <decorators.Header
                    node={node}
                    style={style.header}
                    onClick={onClick}
                />
            </div>
        );
    }
    renderToggleDecorator(){
        const {style, decorators} = this.props;
        return (<decorators.Toggle style={style.toggle || {}} onClick={this.props.onToggle} node={this.props.node} />);
    }
}

Container.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    node: PropTypes.object.isRequired
};

export default {
    Loading,
    Toggle,
    Header,
    Container: Radium(Container),
};
