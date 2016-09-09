/*  eslint no-unused-expressions:0  */

'use strict';

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Header = require('../../../src/components/header').default;
const factory = require('../utils/factory');

const ContainerType = React.createClass({ render: () => <div/> });

const defaults = {
    style: {},
    node: { children: [] },
    decorators: factory.createDecorators({ container: ContainerType })
};

describe('header component', () => {
    it('should render the container decorator', () => {
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}/>
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);
        container.should.exist;
    });

    it('should update the component if a prop changes', () => {
        const node = { toggled: false };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
            />
        );
        const nextProps = { node: { toggled: !node.toggled } };
        header.shouldComponentUpdate(nextProps).should.be.true;
    });

    it('should not update the component if no props change', () => {
        const node = { toggled: false };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
            />
        );
        const nextProps = Object.assign({}, defaults, { node: { toggled: node.toggled } });
        header.shouldComponentUpdate(nextProps).should.be.false;
    });

    it('should pass a true terminal prop to the container when there are no children in the node', () => {
        const node = { name: 'terminal-node' };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
            />
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);
        container.props.terminal.should.be.true;
    });

    it('should pass a false terminal prop to the container when there are children in the node', () => {
        const node = { children: [{ name: 'child-node'}] };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
            />
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);
        container.props.terminal.should.be.false;
    });

    it('should pass in the high-level link style to the container', () => {
        const style = { link: { backgroundColor: 'black' } };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                style={style}
            />
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);
        container.props.style.container[0].should.equal(style.link);
    });

    it('should pass the active link style prop to the container when the node is active', () => {
        const node = { active: true };
        const style = { activeLink: { color: 'red' } };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
                style={style}
            />
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);
        container.props.style.container[1].should.equal(style.activeLink);
    });

    it('should not pass the active link style prop to the container when the node is inactive', () => {
        const node = { active: false };
        const style = { activeLink: { color: 'red' } };
        const header = TestUtils.renderIntoDocument(
            <Header {...defaults}
                node={node}
                style={style}
            />
        );
        const container = TestUtils.findRenderedComponentWithType(header, ContainerType);
        global.should.not.exist(container.props.style.container[1]);
    });

});
