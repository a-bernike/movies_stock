import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './List.scss';
import {getMovies} from 'services/Movies';
import {imageOnError, validateImage} from 'helpers/asset';
import {MovieCard, Modal, TextInput, Loader} from 'views/components/widgets';
import {setMovies, setSelectedMovie} from 'stores/action/dashboard';
import Empty from './Empty';

const List = props => {
    const dispatch = useDispatch();
    const { movies, selectedMovie } = useSelector(state => state.dashboard);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(0);
    const [displayModal, setDisplayModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            setDisplayModal(false);
            setPage(0);
        }
    }, []);

    useEffect(() => {
        if (page > 0) fetchData(page === 1);

        return () => window.removeEventListener('scroll', scrollEvent);
    }, [page]);

    const scrollEvent = () => {
        if ((window.innerHeight + window.scrollY + 350) >= document.body.offsetHeight) {
            if (!loading) setPage(page + 1)
        }
    }
    
    const fetchData = async (resetData = false) => {
        setLoading(true);
        const res = await getMovies(page, keyword);
        setLoading(false);
        if (res && res.Response === 'True') {
            const filteredTempList = res.Search.filter(item => {
                if (movies.find(movie => movie.imdbID === item.imdbID)) {
                    return false
                }
                else {
                    return item
                }
            })
            const newList = resetData ? res.Search : movies.concat(filteredTempList)
            dispatch(setMovies(newList));
            setTimeout(() => {
                window.addEventListener('scroll', scrollEvent);
            }, 300)
        }
        else {
            if (page <= 1) dispatch(setMovies([]));
        }
    };

    const clickImage = (movie) => {
        dispatch(setSelectedMovie(movie));
        setDisplayModal(true);
    }

    return (
        <div className="home-list">
            <div className="home-list__header">
                <h2>Movies</h2>
                <TextInput
                    value={keyword}
                    placeholder="Search movie(s)"
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            // dispatch(setMovies([]));
                            if (page === 1) {
                                setPage(0);
                                setTimeout(() => {
                                    setPage(1);
                                }, 500)
                            }
                            else {
                                setPage(1);
                            }
                        }
                    }}
                />
            </div>
            {(movies && movies.length > 0) ?
                <div className="home-list__scroller">
                    {movies.map(movie => {
                        return <MovieCard
                            key={movie.imdbID}
                            data={movie}
                            clickImage={() => clickImage(movie)}
                        />
                    })}
                </div>
                : <>{loading ? null : <Empty />}</>
            }
            {loading && <Loader fullscreen={false} />}
            {(displayModal && selectedMovie) &&
                <Modal
                    title={selectedMovie ? selectedMovie.Title : ""}
                    close={() => {
                        setDisplayModal(false)
                        dispatch(setSelectedMovie(null))
                    }}
                >
                    <img alt="poster" src={validateImage(selectedMovie.Poster)} onError={imageOnError} />
                </Modal>
            }
        </div>
    )
}

export default List;