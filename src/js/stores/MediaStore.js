const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');
const q = require('q-xhr')(window.XMLHttpRequest, require('q'))

function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

// data storage
let _data = {
  media: {
    movies: [],
    music: [],
    tv: []
  }
};

// add private functions to modify data
function setMedia(media) {
  _data = media;
}

// Facebook style store creation.
let MediaStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getAll() {
    return _data;
  },

  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.MEDIA_UPDATE:
        // NOTE: if this action needs to wait on another store:
        // AppDispatcher.waitFor([OtherStore.dispatchToken]);
        // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
        console.log('Event called properly');
        q.xhr.get('//localhost:7070/')
            .done(function (resp) {
              setMedia(resp.data);
              MediaStore.emitChange();
            });
        break;

      // add more cases for other actionTypes...
    }
  })

});

module.exports = MediaStore;
