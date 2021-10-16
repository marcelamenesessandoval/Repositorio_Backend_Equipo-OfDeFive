import Express from "express";
import dotenv from 'dotenv';
import mongodb from 'mongodb';
const { MongoClient, ObjectId } = mongodb;
import Cors from 'cors';

dotenv.config({path:'./.env'});

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let baseDeDatos; 

const app = Express();

app.use(Express.json());


app.use(Cors());

app.get("/productos", (req, res) => {
    console.log("alguien hizo get en la ruta /productos");
    baseDeDatos.collection('producto').find({}).limit(50).toArray((err, result) => {
        if(err){
            res.status(500).send("Error consultando los productos")
        }
        else{
            res.json(result);
        }
    });
});



app.post("/productos/nuevo", (req, res) => {
    console.log(req);
    const datosProducto = req.body;
    console.log("Llaves", Object.keys(datosProducto));
    try {
        if (
            Object.keys(datosProducto).includes('idProduct') &&
            Object.keys(datosProducto).includes('producto') &&
            Object.keys(datosProducto).includes('descripcion') &&
            Object.keys(datosProducto).includes('valorUnitario') &&
            Object.keys(datosProducto).includes('estado')
        ) {
            //implementar código para crear producto en la base de dat
            baseDeDatos.collection('producto').insertOne(datosProducto, (err, result)=>{
                if(err){
                    console.error(err);
                    res.sendStatus(500);
                }else{
                    console.log(result);
                    res.sendStatus(200);
                }
            });

        } else {
            res.sendStatus(500);
        }
    }
    catch {
        res.sendStatus(500);
    }
});


app.patch("/productos/editar", (req, res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtroProducto = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    baseDeDatos
    .collection('producto')
    .findOneAndUpdate(filtroProducto,operacion,{ upsert: true, returnOriginal: true}, (err, result)=>{
        if(err){
            console.error("Error actualizando el producto: ", err);
            res.sendStatus(500);
        }else{
            console.log("Producto actualizado con éxito");
            res.sendStatus(200);
        }

    })
});


app.delete("/productos/eliminar", (req, res)=>{
    const filtroProducto = {_id: new ObjectId(req.body.id)};
    baseDeDatos.collection('producto').deleteOne(filtroProducto,(err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    });
});


const main = () => {
    client.connect((err, db)=>{
        if(err){
            console.error("Error conectando a la base");
        }
        baseDeDatos = db.db('gestionventas');
        console.log('conexión exitosa');
        return app.listen(process.env.PORT, () => {
            console.log('escuchando puerto ${process.env.PORT}');
        });
    });
};


main();


