
import db from '../models/index';
import CRUDService from '../services/CRUDService';


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

    //[GET] /crud
    getCRUD(req,res){
        res.render('crud');
    }


    //[POST] /post-crud
    async postCRUD(req,res){
        let mess = await CRUDService.createNewUser(req.body);
        console.log(mess);
        // res.send('post crud from server');
        res.redirect('/get-crud');
    }


    //[GET] /get-crud
    async displayGetCRUD(req,res){
        let data = await CRUDService.getAllUser();
        console.log(data);
        res.render('displayCRUD',{
            dataTable: data
        });
    }
}

module.exports = new HomeController(); 