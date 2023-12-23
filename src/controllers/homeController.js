
import db from '../models/index';
class HomeController {
    async getHomePage(req, res) {
        try {
            let data = await db.User.findAll(); // Ten User là từ models/user
            return res.render('homepages',{
                data:data
            });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new HomeController();