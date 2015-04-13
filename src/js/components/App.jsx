const React = require('react');
const MediaStore = require('../stores/MediaStore');
const ActionCreator = require('../actions/MediaActionCreator');
const Media = require('./Media.jsx');

let App = React.createClass({

  getInitialState() {
    var data = MediaStore.getAll();
    return {
      media: data,
      current: data.current
    }
  },

  _onChange() {
    var data = MediaStore.getAll();
    this.setState({
      media: data,
      current: data.current
    });
  },

  componentDidMount() {
    MediaStore.addChangeListener(this._onChange);
    ActionCreator.updateMedia();
  },

  componentWillUnmount() {
    MediaStore.removeChangeListener(this._onChange);
  },

  render() {
    console.log(this.state.media);
    return (
      <div id="fanart-container">
        <Media list={this.state.media.movies}
            current={this.state.current} />

        <Media list={this.state.media.music}
            current={this.state.current} />

        <Media list={this.state.media.tv}
            current={this.state.current} />
      </div>
    );
  }

});

module.exports = App;
