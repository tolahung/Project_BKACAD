
import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.passWord);
            await db.User.create({
                email: data.STRING,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1'?true:false,
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



module.exports = {
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword
};