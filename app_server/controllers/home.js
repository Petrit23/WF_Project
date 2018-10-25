/* GET 'home' page */
const home = function (req, res) {
    res.render('home', {title: 'Home'});
};

module.exports = {
    home
};
