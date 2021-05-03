import React from 'react';
import './Home.scss';
import List from './List';

const Home = props => {
    return (
        <div className="home">
            <div className="home__content">
                <List />
            </div>
        </div>
    )
}

export default Home;