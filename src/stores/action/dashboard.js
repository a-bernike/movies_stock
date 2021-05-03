import {constDashboard} from '../constant/dashboard';

export const setMovies = (value) => {
    return {type: constDashboard.SET_MOVIES, value }
}
export const setSelectedMovie = (value) => {
    return {type: constDashboard.SET_SELECTED_MOVIE, value }
}