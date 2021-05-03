import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './index';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'stores';

const dummyMovies = {"Search":[{"Title":"Batman Begins","Year":"2005","imdbID":"tt0372784","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Batman v Superman: Dawn of Justice","Year":"2016","imdbID":"tt2975590","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Batman","Year":"1989","imdbID":"tt0096895","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"},{"Title":"Batman Returns","Year":"1992","imdbID":"tt0103776","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"},{"Title":"Batman Forever","Year":"1995","imdbID":"tt0112462","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"},{"Title":"Batman & Robin","Year":"1997","imdbID":"tt0118688","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"},{"Title":"The Lego Batman Movie","Year":"2017","imdbID":"tt4116284","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"},{"Title":"Batman: The Animated Series","Year":"1992–1995","imdbID":"tt0103359","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"},{"Title":"Batman: Under the Red Hood","Year":"2010","imdbID":"tt1569923","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"Batman: The Dark Knight Returns, Part 1","Year":"2012","imdbID":"tt2313197","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg"}],"totalResults":"425","Response":"True"}
jest.mock('services/Movies', () => ({
    getMovies: () => dummyMovies
}));

describe('renders Home component', () => {

    it('test render Home', () => {
        const {container} = render(<Provider store={store}><Home /></Provider>);
        expect(container.firstChild).toHaveClass("home");
        expect(container.firstChild.firstChild).toHaveClass("home__content");
        expect(container.getElementsByClassName("home-list")).toHaveLength(1);
        expect(container.getElementsByClassName("home-list__header")).toHaveLength(1);
        expect(container.getElementsByTagName("h2")[0].textContent).toBe("Movies");
        expect(container.getElementsByClassName("text-input")[0]).toHaveAttribute("type", "text");
        expect(container.getElementsByClassName("text-input")[0]).toHaveAttribute("placeholder", "Search movie(s)");
        expect(container.getElementsByClassName("text-input")[0]).toHaveAttribute("value", "");
        expect(container.getElementsByClassName("home-list__scroller")).toHaveLength(0);
        expect(container.getElementsByClassName("home-list__empty")[0].textContent).toBe("No movie(s) yet");
        expect(container.getElementsByClassName("modal")).toHaveLength(0);
    });

    it('test change text input value', () => {
        const {container} = render(<Provider store={store}><Home /></Provider>);
        const textInput = container.getElementsByClassName("text-input")[0];
        expect(textInput).toHaveAttribute("type", "text");
        expect(textInput).toHaveAttribute("placeholder", "Search movie(s)");
        expect(textInput).toHaveAttribute("value", "");
        
        fireEvent.change(textInput, {
            target: {value: "batman"}
        });
        expect(textInput).toHaveAttribute("value", "batman");
    });

    it('test render movie cards', async () => {
        const {container} = render(<Provider store={store}>
            <Router><Home /></Router>
        </Provider>);
        const textInput = container.getElementsByClassName("text-input")[0];
        fireEvent.change(textInput, {
            target: {value: "batman"}
        });
        fireEvent.keyUp(textInput, { key: "Enter", code: 13, charCode: 13 })
        
        expect(await container.getElementsByClassName("home-list__scroller")).toHaveLength(1);
        expect(container.getElementsByClassName("home-list__empty")).toHaveLength(0);
        const movieCards = container.getElementsByClassName("movie-card");
        expect(movieCards).toHaveLength(dummyMovies.Search.length);
        dummyMovies.Search.map((movie, idx) => {
            expect(movieCards[idx].firstChild).toHaveAttribute("src", movie.Poster);
            expect(movieCards[idx].getElementsByTagName("a")[0]).toHaveAttribute("href", `/movie/${movie.imdbID}`);
        })
    });

    it('test click on movie card image', async () => {
        const {container} = render(<Provider store={store}>
            <Router><Home /></Router>
        </Provider>);
        const textInput = container.getElementsByClassName("text-input")[0];
        fireEvent.change(textInput, {
            target: {value: "batman"}
        });
        fireEvent.keyUp(textInput, { key: "Enter", code: 13, charCode: 13 })
        
        expect(await container.getElementsByClassName("home-list__scroller")).toHaveLength(1);
        expect(container.getElementsByClassName("home-list__empty")).toHaveLength(0);
        const movieCards = container.getElementsByClassName("movie-card");
        expect(movieCards).toHaveLength(dummyMovies.Search.length);

        userEvent.click(movieCards[0].firstChild);
        const modal = container.getElementsByClassName("modal")
        expect(modal).toHaveLength(1);
        expect(modal[0].getElementsByTagName("h2")[0].textContent).toBe(dummyMovies.Search[0].Title);
        expect(modal[0].getElementsByTagName("img")[0]).toHaveAttribute("alt", "poster");
        expect(modal[0].getElementsByTagName("img")[0]).toHaveAttribute("src", dummyMovies.Search[0].Poster);

        const closeBtn = modal[0].getElementsByClassName("button")[0];
        userEvent.click(closeBtn)
        expect(container.getElementsByClassName("modal")).toHaveLength(0);
    });
});