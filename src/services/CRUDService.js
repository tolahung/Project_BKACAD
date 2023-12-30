
import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.passWord);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                // image: data.STRING,
                // positionId: data.STRING,
            })

            resolve('oke succeed')
        } catch (e) {
            reject(e);
        }
    })

    // console.log('data from service');
    // console.log(data);
    // console.log(hashPasswordFromBcrypt);
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findAll({
                raw: true,
            });
            resolve(user)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })

  
}

let updateUserData = (data) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve();
            }else{
                resolve();
            }
        }catch(e){
            reject(e);
        }
    })
}

let deleteUserById = (userId)=>{
    return new Promise (async(resolve,reject)=>{
        try{
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){
                await user.destroy()
            }else{
                resolve()
            }
        }catch(e){
            reject(e)
        }
    })

    
}

module.exports = {
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    getAllUser: getAllUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
};