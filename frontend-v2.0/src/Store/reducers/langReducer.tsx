const intialVal = JSON.parse(localStorage.getItem('lang')) || 'en'

export const langReducer = (state = intialVal, action) => {
  switch (action.type) {
    case 'LANG':
      return action.payload
    default:
      return state
  }
}
