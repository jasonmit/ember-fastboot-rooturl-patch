import Ember from 'ember';

const { get, run, RSVP } = Ember;

export default {
  name: 'visit-patch',
  initialize(instance) {
    instance.reopen({
      visit(url) {
        this.setupRouter();

        let router = get(this, 'router');

        let handleResolve = () => {
          return new RSVP.Promise((resolve) => {
            run.next(null, resolve, this);
          });
        };

        let handleReject = (error) => {
          if (error.error) {
            throw error.error;
          } else if (error.name === 'TransitionAborted' && router.router.activeTransition) {
            return router.router.activeTransition.then(handleResolve, handleReject);
          } else if (error.name === 'TransitionAborted') {
            throw new Error(error.message);
          } else {
            throw error;
          }
        };

        let location = get(router, 'location');
        location.setURL(url);

        return router.handleURL(location.getURL()).then(handleResolve, handleReject);
      }
    });
  }
};
