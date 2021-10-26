
import { getDB } from '../../db/db.js';
import mongodb from 'mongodb';
const { ObjectId } = mongodb;

const queryAllProducts = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('producto')
        .find({})
        .limit(50)
        .toArray(callback);
};


const crearProducto = async (datosProducto, callback, index) => {
    if (
        Object.keys(datosProducto).includes('idProduct') &&
        Object.keys(datosProducto).includes('producto', index) &&
        Object.keys(datosProducto).includes('descripcion') &&
        Object.keys(datosProducto).includes('valorUnitario') &&
        Object.keys(datosProducto).includes('estado')
    ) {
        const baseDeDatos = getDB();
        //implementar código para crear producto en la base de dat
        await baseDeDatos.collection('producto').insertOne(datosProducto, callback); 
    } else {
        return "errror"
    }
};


const editarProducto = async (id, edicion, callback) => {
    const filtroProducto = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('producto')
        .findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback);
};


const eliminarProducto = async(id, callback) => {
    const filtroProducto = { _id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').deleteOne(filtroProducto, callback);
};


export { queryAllProducts, crearProducto, editarProducto, eliminarProducto };