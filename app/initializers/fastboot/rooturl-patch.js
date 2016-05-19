import Ember from 'ember';

const { get, assert } = Ember;

export default {
  name: 'rooturl-patch',
  initialize() {
    const proto = Ember.NoneLocation.proto();

    assert('ember-fastboot-rooturl-patch is no longer needed, remove from package.json', !proto.hasOwnProperty('rootURL'));

    Ember.NoneLocation.reopen({
      rootURL: '/',

      /**
        Returns the current path without `rootURL`.
        @private
        @method getURL
        @return {String} path
      */
      getURL() {
        let path = get(this, 'path');
        let rootURL = get(this, 'rootURL');

        // remove trailing slashes if they exists
        rootURL = rootURL.replace(/\/$/, '');

        // remove rootURL from url
        return path.replace(rootURL, '');
      },

      /**
        Given a URL, formats it to be placed into the page as part
        of an element's `href` attribute.
        This is used, for example, when using the {{action}} helper
        to generate a URL based on an event.
        @private
        @method formatURL
        @param url {String}
        @return {String} url
      */
      formatURL(url) {
        let rootURL = get(this, 'rootURL');

        if (url !== '') {
          // remove trailing slashes if they exists
          rootURL = rootURL.replace(/\/$/, '');
        }

        return rootURL + url;
      }
    });
  }
};
