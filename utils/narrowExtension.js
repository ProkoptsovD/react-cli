const narrowExtension = (ext) => {
    if(typeof ext !== 'string') throw new Error('Parameter should be a string');

    const isJsx = ext.toLowerCase() === 'jsx' || ext.toLowerCase() === 'tsx';

    if(isJsx) return ext.replace('x', '');

    return ext;
}

module.exports = {
    narrowExtension
}