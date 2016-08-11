import 'babel-polyfill';

import mapAction from 'index';

const spies = {
  reducer: jasmine.createSpy('reducer')
};

const teardown = () => {
  for (const name in spies) {
    spies[name].calls.reset();
  }
};

const should = {
  callReducer: (params) => expect(spies.reducer).toHaveBeenCalledWith(...params)
};

const identity = (value) => value;

describe('mapAction', () => {
  afterEach(teardown);

  const ACTION = 'ACTION';
  const actionMapper = (action) => ({
    ...action,
    meta: {
      ...action.meta || {},
      mapped: true
    }
  });

  it('maps action before passing to reducer', () => {
    mapAction(actionMapper)(spies.reducer)(null, { type: ACTION });

    should.callReducer([
      null,
      {
        type: ACTION,
        meta: { mapped: true }
      }
    ]);
  });

  it('ignores unspecified action types', () => {
    mapAction(actionMapper, [])(spies.reducer)(null, { type: ACTION });

    should.callReducer([null, { type: ACTION }]);
  });

  it('handles specified action types', () => {
    mapAction(actionMapper, [ACTION])(spies.reducer)(null, { type: ACTION });

    should.callReducer([
      null,
      {
        type: ACTION,
        meta: { mapped: true }
      }
    ]);
  });
});
