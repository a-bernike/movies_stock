import ApiRequest from '../request';

export const getMovies = async (page = 1, keyword) => {
    let result = {};
    const requestPage = page >= 1 ? `&page=${page}` : '';
    const requestKeyword = `&s=${keyword}`;

    await ApiRequest.get(`${process.env.REACT_APP_API_URL}?apikey=${process.env.REACT_APP_API_KEY}${requestKeyword}${requestPage}`).then(res => {
        result = res
    }).catch(err => {
        result = null;
    });
    return result;
}

export const getMovieDetail = async (id) => {
    let result = {};
    await ApiRequest.get(`${process.env.REACT_APP_API_URL}?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`).then(res => {
        result = res
    }).catch(err => {
        result = null;
    });
    return result;
}