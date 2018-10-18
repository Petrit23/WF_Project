/* GET log in page */
const login = function (req, res) {
    res.render('login', {title: 'Log In'});
};


module.exports = {
    login
};