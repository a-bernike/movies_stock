import { render } from '@testing-library/react';
import Header from './index';
import { assetUrl } from 'helpers/asset';

describe('renders Header component', () => {
    it('test render Header', () => {
        const {container} = render(<Header />);
        expect(container.firstChild).toHaveClass("header");
        expect(container.getElementsByTagName("a")[0]).toHaveAttribute("href", "/");
        expect(container.getElementsByTagName("img")[0]).toHaveAttribute("alt", "logo");
        expect(container.getElementsByTagName("img")[0]).toHaveAttribute("src", assetUrl('/logo-white.png'));
    });
});