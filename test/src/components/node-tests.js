/*  eslint no-unused-expressions:0  */

'use strict';

const sinon = require('sinon');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const TreeNode = require('../../../src/components/node').default;
const factory = require('../utils/factory');

const defaults = {
    style: {},
    node: { chilren: [] },
    decorators: factory.createDecorators()
};

describe('node component', () => {
    it('should not have any internal state', () => {
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}/>
        );
        global.should.not.exist(treeNode.state);
    });

    it('should invert the toggle state on toggle', (done) => {
        const node = { toggled: true };
        const onToggle = function(toggledNode, toggled){
            toggled.should.equal(!toggledNode.toggled);
            done();
        };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                node={node}
                onToggle={onToggle}
            />
        );
        treeNode.onToggle();
    });

    it('should call the onToggle callback once if it is registered on toggle', () => {
        const onToggle = sinon.spy();
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                onToggle={onToggle}
            />
        );
        treeNode.onToggle();
        onToggle.should.be.called.once;
    });

    it('should not throw an exception if a callback is not registered on click', () => {
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}/>
        );
        (() => { treeNode.onClick(); }).should.not.throw(Error);
    });

    it('should use the node decorators if defined', () => {
        const ContainerDecorator = React.createClass({ render: () => <div/> });
        const nodeDecorators = {
            Container: ContainerDecorator
        };
        const node = { decorators: nodeDecorators, children: [] };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                node={node}
            />
        );
        TestUtils.findRenderedComponentWithType(treeNode, ContainerDecorator).should.exist;
    });

    it('should fallback to the prop decorators if the node decorators are not defined', () => {
        const ContainerDecorator = React.createClass({ render: () => <div/> });
        const decorators = {
            Container: ContainerDecorator
        };
        const node = { children: [] };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode
                {...defaults}
                decorators={decorators}
                node={node}
            />
        );
        TestUtils.findRenderedComponentWithType(treeNode, ContainerDecorator).should.exist;
    });

    it('should render a list item at the top level', () => {
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}/>
        );
        const topLevel = treeNode.refs.topLevel;
        topLevel.tagName.toLowerCase().should.equal('li');
    });

    it('should render the NodeHeader component', () => {
        const NodeHeader = require('../../../src/components/header').default;
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}/>
        );
        TestUtils.findRenderedComponentWithType(treeNode, NodeHeader).should.exist;
    });

    it('should render the subtree if toggled', () => {
        const node = { toggled: true };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults} node={node}/>
        );
        treeNode.refs.subtree.should.exist;
    });

    it('should not render the children if not toggled', () => {
        const node = { toggled: false };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults} node={node}/>
        );
        global.should.not.exist(treeNode.refs.subtree);
    });

    it('should wrap the children in a list', () => {
        const node = { toggled: true };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
            />
        );
        const subtree = treeNode.refs.subtree;
        subtree.tagName.toLowerCase().should.equal('ul');
    });

    it('should render a TreeNode component for each child', () => {
        const node = {
            toggled: true,
            children: [ {node: {}}, {node: {}}, {node: {}} ]
        };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
            />
        );
        // Find All TreeNodes (+ Top Level TreeNode)
        const nodes = TestUtils.scryRenderedComponentsWithType(treeNode, TreeNode);
        nodes.length.should.equal(node.children.length + 1);
    });

    it('should render the loading decorator if the node is loading and toggled', () => {
        const node = { toggled: true, loading: true };
        const LoadingDecorator = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ loading: LoadingDecorator });
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
                decorators={decorators}
            />
        );
        const loading = TestUtils.findRenderedComponentWithType(treeNode, LoadingDecorator);
        loading.should.exist;
    });

    it('should not render the loading decorator if the node is not loading but toggled', () => {
        const node = { toggled: true, loading: false };
        const LoadingDecorator = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ loading: LoadingDecorator });
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
                decorators={decorators}
            />
        );
        const loading = TestUtils.scryRenderedComponentsWithType(treeNode, LoadingDecorator);
        loading.should.be.empty;
    });

    it('should not render the children if the node is Loading', () => {
        const node = { toggled: true, loading: true };
        const treeNode = TestUtils.renderIntoDocument(
            <TreeNode {...defaults}
                node={node}
            />
        );
        global.should.not.exist(treeNode.refs.subtree);
    });
});
