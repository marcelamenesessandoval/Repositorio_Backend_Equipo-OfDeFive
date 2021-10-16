
import { getDB } from '../../db/db.js';
import mongodb from 'mongodb';
const { ObjectId } = mongodb;

const queryAllVentas = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('venta')
        .find({})
        .limit(50)
        .toArray(callback);
};


const crearVenta = async (datosVenta, callback) => {
    if (
        Object.keys(datosVenta).includes('idVenta') &&
        Object.keys(datosVenta).includes('valorTotal') &&
        Object.keys(datosVenta).includes('producto') &&
        Object.keys(datosVenta).includes('cantidad') &&
        Object.keys(datosVenta).includes('precioUnitarioProduct')&&
        Object.keys(datosVenta).includes('fechaVenta')&&
        Object.keys(datosVenta).includes('nombreCliente') &&
        Object.keys(datosVenta).includes('vendedor')&&
        Object.keys(datosVenta).includes('docIdentidadVendedor') 
    
        ) {
        const baseDeDatos = getDB();
        await baseDeDatos.collection('venta').insertOne(datosVenta, callback); 
    } 
};


const editarVenta = async (id, edicion, callback) => {
    const filtroVenta = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('venta')
        .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};


const eliminarVenta = async(id, callback) => {
    const filtroVenta = { _id: new ObjectId(id)};
    const baseDeDatos = getDB();
    await baseDeDatos.collection('venta').deleteOne(filtroVenta, callback);
};


export { queryAllVentas, crearVenta, editarVenta, eliminarVenta };