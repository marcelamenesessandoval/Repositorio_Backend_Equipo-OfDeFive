
import Express from 'express';
import { queryAllUsuarios , crearUsuario, editarUsuario, eliminarUsuario } from '../../controllers/usuarios/controller.js';


const rutasUsuario = Express.Router();


const genericCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send("Error consultando los usuarios");
    } else {
        res.json(result);
    }
};



rutasUsuario.route('/usuarios').get((req, res) => {
    console.log("alguien hizo get en la ruta /usuarios");
    queryAllUsuarios(genericCallback(res));
});


rutasUsuario.route('/usuarios').post((req, res) => {
    crearUsuario(req.body, genericCallback(res));
});


rutasUsuario.route('/usuarios/:id').patch((req, res) => {
    editarUsuario(req.params.id, req.body, genericCallback(res));
});


rutasUsuario.route('/usuarios/:id').delete((req, res) => {
    eliminarUsuario(req.params.id, genericCallback(res))
});

export default rutasUsuario;
