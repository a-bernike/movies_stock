import {constDashboard} from '../constant/dashboard';

const initialState = {
    movies: [],
    selectedMovie: null
};

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case constDashboard.SET_MOVIES:
            return {
                ...state,
                movies: action.value
            };
        case constDashboard.SET_SELECTED_MOVIE:
            return {
                ...state,
                selectedMovie: action.value
            };
        default:
            return state;
    }
};
  
  export default dashboard;  