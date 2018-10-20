/* GET sign up page */
const signup = function (req, res) {
    res.render('signup', {title: 'Sign Up'});
};

module.exports = {
    signup
};