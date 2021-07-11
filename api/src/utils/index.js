const capitalize = word => {
    return word.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
};

module.exports = {
    capitalize
}
