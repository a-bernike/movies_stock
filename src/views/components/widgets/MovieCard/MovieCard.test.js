import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieCard from './index';

describe('renders MovieCard component', () => {
    it('test render MovieCard', () => {
        const {container} = render(<MovieCard />);
        expect(container.textContent).toBe("");
    });
    it('test render MovieCard with some props', () => {
        const props = {
            data: {
                Title: "Movie ABC",
                Poster: "/movie-abc.jpg",
                imdbID: 1
            },
            clickImage: jest.fn()
        }
        const {container} = render(<Router><MovieCard {...props} /></Router>);
        expect(container.firstChild).toHaveClass("movie-card");
        expect(container.getElementsByTagName("img")[0]).toHaveAttribute("alt", "Movie ABC");
        expect(container.getElementsByTagName("img")[0]).toHaveAttribute("src", "/movie-abc.jpg");
        expect(container.getElementsByTagName("a")[0]).toHaveAttribute("href", "/movie/1");
        expect(container.getElementsByTagName("button")[0].textContent).toBe("Read More");

        userEvent.click(container.getElementsByTagName("img")[0]);
        expect(props.clickImage).toHaveBeenCalledTimes(1);
    });
});