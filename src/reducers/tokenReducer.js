const INITIAL_STATE = {
    token: '',
  };
  
  const tokenReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        return{
            token: action.token,
        };
      default:
        return state
    }
  };
  
  export default tokenReducer;