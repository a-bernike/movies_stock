import { render } from '@testing-library/react';
import Loader from './index';
import {assetUrl} from 'helpers/asset';

describe('renders Loader component', () => {
    it('test render Loader', () => {
        const {container} = render(<Loader />);
        expect(container.firstChild).toHaveClass("loader fullscreen");
        expect(container.firstChild.firstChild).toHaveAttribute("src", assetUrl('/cinema.svg'));
    });
    it('test render Loader with fullscreen props set to false', () => {
        const props = {
            fullscreen: false
        }
        const {container} = render(<Loader {...props} />);
        expect(container.firstChild).toHaveClass("loader");
        expect(container.firstChild.firstChild).toHaveAttribute("src", assetUrl('/cinema.svg'));
    });
});