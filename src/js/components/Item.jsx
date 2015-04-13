const React = require('react');

let Item = React.createClass({
  getDefaultProps() {
    return {
      title: ''
    };
  },

  render() {
    return (
      <li>{this.props.title}</li>
    );
  }
});

module.exports = Item;
