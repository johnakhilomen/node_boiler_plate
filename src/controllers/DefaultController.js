class DefaultController 
{
    defaultPage = (req, res) => {
        res.render('index.html');
    }
}
module.exports = new DefaultController();
