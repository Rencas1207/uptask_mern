import Proyecto from "../models/Proyecto.js";
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req, res) => {
   const proyectos = await Proyecto.find().where('creador').equals(req.usuario).select('-tasks');

   res.json(proyectos);
}

const nuevoProyecto = async (req, res) => {
   const proyecto = new Proyecto(req.body);
   proyecto.creador = req.usuario._id

   try {
      const proyectoAlmacenado = await proyecto.save();
      res.json(proyectoAlmacenado);
   } catch (error) {
      console.log(error);
   }
}

const obtenerProyecto = async (req, res) => {
   const { id } = req.params;

   const proyecto = await Proyecto.findById(id).populate('tasks').populate("colaboradores", "nombre email");

   if (!proyecto) {
      const error = new Error('No encontrado');
      return res.status(404).json({ msg: error.message });
   }

   if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({ msg: error.message });
   }

   // Obtener las tareas  del proyecto
   // const tareas = await Tarea.find().where('proyecto').equals(proyecto._id);
   res.json(proyecto);
}

const editarProyecto = async (req, res) => {
   const { id } = req.params;

   const proyecto = await Proyecto.findById(id);

   if (!proyecto) {
      const error = new Error('No encontrado');
      return res.status(404).json({ msg: error.message });
   }

   if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({ msg: error.message });
   }

   proyecto.name = req.body.name || proyecto.name;
   proyecto.description = req.body.description || proyecto.description;
   proyecto.deliverDate = req.body.deliverDate || proyecto.deliverDate;
   proyecto.client = req.body.client || proyecto.client;

   try {
      const proyectoAlmacenado = await proyecto.save();
      res.json(proyectoAlmacenado);
   } catch (error) {
      console.log(error);
   }
}

const eliminarProyecto = async (req, res) => {
   const { id } = req.params;

   const proyecto = await Proyecto.findById(id);

   if (!proyecto) {
      const error = new Error('No encontrado');
      return res.status(404).json({ msg: error.message });
   }

   if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({ msg: error.message });
   }

   try {
      await proyecto.deleteOne();
      res.json({ msg: 'Proyecto eliminado' });
   } catch (error) {
      console.log(error);
   }
}

const buscarColaborador = async (req, res) => {
   const { email } = req.body;
   const usuario = await Usuario.findOne({ email }).select('-confirmado -createdAt -password -token -updatedAt -__v')

   if (!usuario) {
      const error = new Error('Usuario no encontrado');
      return res.status(404).json({ msg: error.message })
   }

   res.json(usuario)
}

const agregarColaborador = async (req, res) => {
   const proyecto = await Proyecto.findById(req.params.id);
   if (!proyecto) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).json({ msg: error.message })
   }

   if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(404).json({ msg: error.message })
   }

   const { email } = req.body;
   const usuario = await Usuario.findOne({ email }).select('-confirmado -createdAt -password -token -updatedAt -__v')

   if (!usuario) {
      const error = new Error('Usuario no encontrado');
      return res.status(404).json({ msg: error.message })
   }

   // the collaborator is not the project admin
   if (proyecto.creador.toString() === usuario._id.toString()) {
      const error = new Error('El creador del proyecto no puede ser colaborador');
      return res.status(404).json({ msg: error.message })
   }

   // check that the collaborator is not already added to the project
   if (proyecto.colaboradores.includes(usuario._id)) {
      const error = new Error('El usuario ya pertenece al proyecto')
      return res.status(404).json({ msg: error.message })
   }

   // OK
   proyecto.colaboradores.push(usuario._id);
   await proyecto.save();
   res.json({ msg: 'Colaborador agregado correctamente' })
}

const eliminarColaborador = async (req, res) => {
   const proyecto = await Proyecto.findById(req.params.id);
   if (!proyecto) {
      const error = new Error('Proyecto no encontrado');
      return res.status(404).json({ msg: error.message })
   }

   if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(404).json({ msg: error.message })
   }

   // OK
   proyecto.colaboradores.pull(req.body.id);
   await proyecto.save();
   res.json({ msg: 'Colaborador eliminado correctamente' })
}

export {
   obtenerProyectos,
   nuevoProyecto,
   obtenerProyecto,
   editarProyecto,
   eliminarProyecto,
   agregarColaborador,
   eliminarColaborador,
   buscarColaborador
}