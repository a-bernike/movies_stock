import React, {useEffect, useState} from 'react';
import './Detail.scss';
import {useParams, useHistory} from 'react-router-dom';
import {getMovieDetail} from 'services/Movies';
import {imageOnError, validateImage} from 'helpers/asset';
import InfoTile from './InfoTile';

const Detail = props => {
    const [data, setData] = useState();
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            if (params && params.id) {
                const res = await getMovieDetail(params.id)
                if (res && res.Response === 'True') {
                    setData(res);
                }
                else {
                    history.push('/');
                }
            }
        }
        fetchData()
    }, []);
    
    return (
        <div className="detail">
            {data &&
                <div className="detail__content">
                    <section>
                        <img
                            className="detail__thumbnail"
                            src={validateImage(data.Poster)}
                            onError={imageOnError}
                        />
                        <h2>{data.Title}</h2>
                        <h3>{data.Plot}</h3>
                    </section>
                    <section>
                        <InfoTile title="Year"><p>{data.Year}</p></InfoTile>
                        <InfoTile title="Released"><p>{data.Released}</p></InfoTile>
                        <InfoTile title="DVD"><p>{data.DVD}</p></InfoTile>
                        <InfoTile title="Runtime"><p>{data.Runtime}</p></InfoTile>
                        <InfoTile title="Country"><p>{data.Country}</p></InfoTile>
                        <InfoTile title="Language"><p>{data.Language}</p></InfoTile>
                        <InfoTile title="Genre"><p>{data.Genre}</p></InfoTile>
                        <InfoTile title="Website"><p>{data.Website}</p></InfoTile>
                    </section>
                    <section>
                        <InfoTile title="Director"><p>{data.Director}</p></InfoTile>
                        <InfoTile title="Actors"><p>{data.Actors}</p></InfoTile>
                        <InfoTile title="Writer"><p>{data.Writer}</p></InfoTile>
                        <InfoTile title="Production"><p>{data.Production}</p></InfoTile>
                        <InfoTile title="Awards"><p>{data.Awards}</p></InfoTile>
                        <InfoTile title="BoxOffice"><p>{data.BoxOffice}</p></InfoTile>
                        <InfoTile title="Metascore"><p>{data.Metascore}</p></InfoTile>
                        <InfoTile title="Rated"><p>{data.Rated}</p></InfoTile>
                        <InfoTile title="imdbRating"><p>{data.imdbRating}</p></InfoTile>
                        <InfoTile title="imdbVotes"><p>{data.imdbVotes}</p></InfoTile>
                        <InfoTile title="Ratings">
                            <ul>
                                {data.Ratings.map((rating, idx) => {
                                    return (
                                        <li key={idx}>{rating.Source}: {rating.Value}</li>
                                    )
                                })}
                            </ul>    
                        </InfoTile>
                    </section>
                </div>
            }
        </div>
    )
}

export default Detail;