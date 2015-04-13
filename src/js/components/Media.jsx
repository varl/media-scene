const React = require('react');
const Item = require('./Item.jsx');

let Media = React.createClass({
  getDefaultProps() {
    return {
      list: [],
      current: {}
    };
  },

  componentDidMount() {
  },

  render() {
    return (
      <ul>
        {this.props.list.map(item =>
            <Item title={item} />
            )}
      </ul>
    );
  }
});

module.exports = Media;
