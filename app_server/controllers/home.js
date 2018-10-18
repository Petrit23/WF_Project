/* GET 'home' page */
const home = function (req, res) {
    res.render('index', {title: 'Home'});
};

module.exports = {
    home
};
