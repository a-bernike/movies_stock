import React from 'react';
import './MovieCard.scss';
import {Link} from 'react-router-dom';
import {imageOnError, validateImage} from 'helpers/asset';
import {Button} from 'views/components/widgets';

const MovieCard = props => {
    const {data, clickImage, ...rest} = props;

    if (!data) return null;
    return (
        <div className="movie-card" {...rest}>
            <img
                alt={data.Title}
                src={validateImage(data.Poster)}
                onError={imageOnError}
                onClick={clickImage}
            />
            <div className="movie-card__info">
                <Link to={`/movie/${data.imdbID}`}>
                    <Button title="Read More" />
                </Link>
            </div>
        </div>
    )
}

export default MovieCard;