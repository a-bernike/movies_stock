import {assetUrl, validateImage} from '../asset';

const defaultImg = '/no-img.jpg';

describe('testing asset helper functions', () => {
    it('test fn assetUrl', () => {
        expect(assetUrl("")).toBe(`${process.env.REACT_APP_ASSET_HOST}`);
        expect(assetUrl("/image.jpg")).toBe(`${process.env.REACT_APP_ASSET_HOST}/image.jpg`);
    });
    it('test fn validateImage', () => {
        expect(validateImage("")).toBe(`${process.env.REACT_APP_ASSET_HOST}${defaultImg}`);
        expect(validateImage("/image.jpg")).toBe(`/image.jpg`);
        expect(validateImage("N/A")).toBe(`${process.env.REACT_APP_ASSET_HOST}${defaultImg}`);
    });
});