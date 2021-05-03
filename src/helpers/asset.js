const defaultImg = '/no-img.jpg';

export const assetUrl = (path) => {
    return `${process.env.REACT_APP_ASSET_HOST}${path}`;
}

export const imageOnError = (e) => {
    e.src = assetUrl(defaultImg);
    e.onerror = null;
    return true;
}

export const validateImage = (img) => {
    if (!img || img === 'N/A') return assetUrl(defaultImg);
    return img
}