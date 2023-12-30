
import db from '../models/index';
import CRUDService from '../services/CRUDService';


class HomeController {
    async getHomePage(req, res) {
        try {
            let data = await db.User.findAll(); // Ten User là từ models/user
            return res.render('homepages', {
                data: data
            });
        } catch (e) {
            console.log(e);
        }
    }

    //[GET] /crud
    getCRUD(req, res) {
        res.render('crud');
    }


    //[POST] /post-crud
    async postCRUD(req, res) {
        let mess = await CRUDService.createNewUser(req.body);
        console.log(mess);
        // res.send('post crud from server');
        res.redirect('/get-crud');
    }


    //[GET] /get-crud
    async displayGetCRUD(req, res) {
        let data = await CRUDService.getAllUser();
        res.render('displayCRUD', {
            dataTable: data
        });
    }


    //[GET] /edit-crud
    async getEditCRUD(req, res) {
        // console.log(req.query.id);
        // res.send('hello from edit');
        let userId = req.query.id;  //id la tham so minh truyen vao trong file displayCRUD
        if (userId) {
            let userData = await CRUDService.getUserInforById(userId);
            res.render('editCRUD.ejs', {
                user: userData
            })
        } else {
            return res.send('users not found');
        }
    }

    //[PUT] /put/crud
    async putCRUD(req, res) {
        let data = req.body;
        await CRUDService.updateUserData(data);
        res.redirect('/get-crud');
        // console.log(data);
    }



    //[DELETE] /delete-crud
    async deleteCRUD(req, res) {
        let id = req.query.id;
        if (id) {
            await CRUDService.deleteUserById(id);
            res.redirect('/get-crud');
        } else {
            return res.send('user not found');
        }

    }
}


module.exports = new HomeController(); 