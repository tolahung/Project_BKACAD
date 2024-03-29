import db from "../models/index"
import bcrypt from 'bcryptjs';


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password']
                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `wrong password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Pls try other email!`
            }

            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserPassword = () => {
    return new Promise((resolve, reject) => {
        try {

        } catch {

        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if(userId === 'ALL'){
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where : {id : userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
}