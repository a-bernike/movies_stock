import { render } from '@testing-library/react';
import Detail from './index';

const dummyMovieDetail = {"Title":"In Medias Res","Year":"2011","Rated":"N/A","Released":"N/A","Runtime":"90 min","Genre":"Thriller","Director":"Joe Perry","Writer":"Joe Perry","Actors":"Keith Stahle, Craig Leibowitz, Melanie Cruz, Mark Edward Lewis","Plot":"On a desolate beach, under a clement sky - Satan shares his poem with God.","Language":"English","Country":"USA","Awards":"N/A","Poster":"https://m.media-amazon.com/images/M/MV5BMjA5NDA3OTI5OF5BMl5BanBnXkFtZTcwMTYyNjEwNg@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.1/10"}],"Metascore":"N/A","imdbRating":"8.1","imdbVotes":"11","imdbID":"tt1954538","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: 1
    })
}));

jest.mock('services/Movies', () => ({
    getMovieDetail: () => (dummyMovieDetail)
}));

describe('renders Detail component', () => {
    it('test render Detail', async () => {
        const {container} = await render(<Detail />);
        expect(container.firstChild).toHaveClass("detail");
        expect(container.getElementsByTagName("section")).toHaveLength(3);
        expect(container.getElementsByClassName("detail__thumbnail")[0]).toHaveAttribute('src', dummyMovieDetail.Poster);
        expect(container.getElementsByTagName("h2")[0].textContent).toBe(dummyMovieDetail.Title);
        expect(container.getElementsByTagName("h3")[0].textContent).toBe(dummyMovieDetail.Plot);
        expect(container.getElementsByClassName("detail-info-tile")).toHaveLength(19);
        expect(container.getElementsByClassName("detail-info-tile")[0].textContent).toBe(`Year ${dummyMovieDetail.Year}`);
        expect(container.getElementsByClassName("detail-info-tile")[1].textContent).toBe(`Released ${dummyMovieDetail.Released}`);
        expect(container.getElementsByClassName("detail-info-tile")[2].textContent).toBe(`DVD ${dummyMovieDetail.DVD}`);
        expect(container.getElementsByClassName("detail-info-tile")[3].textContent).toBe(`Runtime ${dummyMovieDetail.Runtime}`);
        expect(container.getElementsByClassName("detail-info-tile")[4].textContent).toBe(`Country ${dummyMovieDetail.Country}`);
        expect(container.getElementsByClassName("detail-info-tile")[5].textContent).toBe(`Language ${dummyMovieDetail.Language}`);
        expect(container.getElementsByClassName("detail-info-tile")[6].textContent).toBe(`Genre ${dummyMovieDetail.Genre}`);
        expect(container.getElementsByClassName("detail-info-tile")[7].textContent).toBe(`Website ${dummyMovieDetail.Website}`);
        expect(container.getElementsByClassName("detail-info-tile")[8].textContent).toBe(`Director ${dummyMovieDetail.Director}`);
        expect(container.getElementsByClassName("detail-info-tile")[9].textContent).toBe(`Actors ${dummyMovieDetail.Actors}`);
        expect(container.getElementsByClassName("detail-info-tile")[10].textContent).toBe(`Writer ${dummyMovieDetail.Writer}`);
        expect(container.getElementsByClassName("detail-info-tile")[11].textContent).toBe(`Production ${dummyMovieDetail.Production}`);
        expect(container.getElementsByClassName("detail-info-tile")[12].textContent).toBe(`Awards ${dummyMovieDetail.Awards}`);
        expect(container.getElementsByClassName("detail-info-tile")[13].textContent).toBe(`BoxOffice ${dummyMovieDetail.BoxOffice}`);
        expect(container.getElementsByClassName("detail-info-tile")[14].textContent).toBe(`Metascore ${dummyMovieDetail.Metascore}`);
        expect(container.getElementsByClassName("detail-info-tile")[15].textContent).toBe(`Rated ${dummyMovieDetail.Rated}`);
        expect(container.getElementsByClassName("detail-info-tile")[16].textContent).toBe(`imdbRating ${dummyMovieDetail.imdbRating}`);
        expect(container.getElementsByClassName("detail-info-tile")[17].textContent).toBe(`imdbVotes ${dummyMovieDetail.imdbVotes}`);
        expect(container.getElementsByClassName("detail-info-tile")[18].textContent).toBe(`Ratings Internet Movie Database: 8.1/10`);
    });
});