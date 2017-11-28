/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.error = (req, res) => {
  res.render('error', {
    url: req.originalUrl
  })
}
