const nullReducer = (state) => typeof state === 'undefined' ? null : state;

/**
 * Creates a higher-order reducer which map actions before passing to a reducer
 * Specify a list of action types to whitelist actions for mapping.
 *
 * mapAction(
 *   actionMapper: (action: Object) => newAction: Object,
 *   actionTypes: ?Array<string>
 * ): (reducer) => reducer
 */
const mapAction = (actionMapper, actionTypes = null) => {
  const actionTypesDict = actionTypes && actionTypes.reduce(
    (dict, actionType) => ({ ...dict, [actionType]: true }), {}
  );

  return (reducer = nullReducer) => (state, action) => {
    if (actionTypes && !actionTypesDict[action.type]) {
      return reducer(state, action);
    }

    return reducer(state, actionMapper(action));
  };
}

export default mapAction;
