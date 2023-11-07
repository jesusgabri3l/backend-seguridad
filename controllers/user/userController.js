import { firestore } from '../../index.js';
import { collection, getDocs, query, where, addDoc} from "firebase/firestore"; 
import { userRegex, loginRegex } from './userValidation.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const COLLECTION_NAME = 'users';

const getAllUsers = async (req, res) => {
    const querySnapshot = await getDocs(collection(firestore, COLLECTION_NAME));
    const arr = []
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    return { users : arr}
}

const createUser = async (userRequest) => {
    const { error } = userRegex.validate(userRequest);
    if(error) return {
            message: 'Something went wrong 👎🏽',
            error: error.details[0].message
    }

    const userQuery = query(collection(firestore, COLLECTION_NAME), where('username', '==', userRequest.username))
    const querySnapshot = await getDocs(userQuery);
    if(!querySnapshot.empty) return { error : 'Este nombre de usuario existe'};

    const passwordEncrypted = crypto.createHash('sha1').update(userRequest.password).digest('hex');

    const docRef = await addDoc(collection(firestore, COLLECTION_NAME), 
    {...userRequest, password: passwordEncrypted});
    return { message: 'Successfully added', user : docRef.id}
}

const loginUser = async (credentials) => {
    const { error } = loginRegex.validate(credentials)
    if (error) return {
        message: 'Something went wrong 👎🏽',
        error: error.details[0].message
    }

    const userQuery = query(collection(firestore, COLLECTION_NAME), where('username', '==', credentials.username))
    const userSnapShot = await getDocs(userQuery);
    if(userSnapShot.empty) return { error : 'Este nombre de usuario no existe!'};

    const userDoc = userSnapShot.docs[0];
    const userData = userDoc.data();

    if (userData.password === credentials.password) {
        const token = jwt.sign({
            id: userDoc.id,
            name: userData.name,
            lastName: userData.lastName,
            username: userData.username,
        }, process.env.SECRET_TOKEN);

        return {message : 'Bienvenido', token}
    }
    else return {error: 'Contraseña incorrecta'}
}

export { getAllUsers, createUser, loginUser }