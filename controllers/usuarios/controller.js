
import { getDB } from '../../db/db.js';
import mongodb from 'mongodb';
const { ObjectId } = mongodb;

const queryAllUsuarios = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuario')
        .find({})
        .limit(50)
        .toArray(callback);
};


const crearUsuario = async (datosUsuario, callback) => {
    if (
        Object.keys(datosUsuario).includes('idUsuario') &&
        Object.keys(datosUsuario).includes('nombreUsuario') &&
        Object.keys(datosUsuario).includes('rol')  &&
        Object.keys(datosUsuario).includes('estadoUsuario') 

        ) {
        const baseDeDatos = getDB();
        await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback); 
    } 
};


const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuario')
        .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};


const eliminarUsuario = async(id, callback) => {
    const filtroUsuario = { _id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
};


export { queryAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario };