export default function createReducer (initialState, actionHandlers) {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type]
    if (!reduceFn) return state
    // Looks it is similat to Object.assign
    return { ...state, ...reduceFn(state, action) }
  }
}
