import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const agregarTarea = async (req, res) => {
   const { project } = req.body;

   const existeProyecto = await Proyecto.findById(project);

   if (!existeProyecto) {
      const error = new Error('El proyecto no existe');
      return res.status(404).json({ msg: error.message });
   }

   if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('No tienes los permisos para añadir tareas');
      return res.status(403).json({ msg: error.message });
   }

   try {
      const tareaAlmacenada = await Tarea.create(req.body);
      // Store the id in the project
      existeProyecto.tasks.push(tareaAlmacenada._id)
      await existeProyecto.save();
      res.json(tareaAlmacenada)
   } catch (error) {
      console.log(error);
   }
}

const obtenerTarea = async (req, res) => {
   const { id } = req.params;
   const tarea = await Tarea.findById(id).populate("project"); // populate agrega una nueva key al object

   if (!tarea) {
      const error = new Error('Tarea no encontrada');
      return res.status(401).json({ msg: error.message });
   }

   // Determinar si la tarea es el mismo que el creador la haya creado
   if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no permitida');
      return res.status(403).json({ msg: error.message });
   }

   res.json(tarea);
}
const actualizarTarea = async (req, res) => {
   const { id } = req.params;
   const tarea = await Tarea.findById(id).populate("project"); // populate agrega una nueva key al object

   if (!tarea) {
      const error = new Error('Tarea no encontrada');
      return res.status(401).json({ msg: error.message });
   }

   // Determinar si la tarea es el mismo que el creador la haya creado
   if (tarea.project.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no permitida');
      return res.status(403).json({ msg: error.message });
   }

   tarea.name = req.body.name || tarea.name;
   tarea.description = req.body.description || tarea.description;
   tarea.priority = req.body.priority || tarea.priority;
   tarea.deliverDate = req.body.deliverDate || tarea.deliverDate;

   try {
      const tareaAlmacenada = await tarea.save();
      res.json(tareaAlmacenada);
   } catch (error) {
      console.log(error)
   }

}
const eliminarTarea = async (req, res) => {
   const { id } = req.params;
   const tarea = await Tarea.findById(id).populate("project"); // populate agrega una nueva key al object

   if (!tarea) {
      const error = new Error('Tarea no encontrada');
      return res.status(401).json({ msg: error.message });
   }

   // Determinar si la tarea es el mismo que el creador la haya creado
   if (tarea.project.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('Acción no permitida');
      return res.status(403).json({ msg: error.message });
   }

   try {
      const proyecto = await Proyecto.findById(tarea.project)
      proyecto.tasks.pull(tarea._id);
      await Promise.allSettled([
         await proyecto.save(),
      ]);
      await tarea.deleteOne()
      res.json({ msg: 'La tarea se eliminó' });
   } catch (error) {
      console.log(error)
   }
}

const cambiarEstado = async (req, res) => {
   const { id } = req.params;
   const tarea = await Tarea.findById(id).populate("project"); // populate agrega una nueva key al object

   if (!tarea) {
      const error = new Error('Tarea no encontrada');
      return res.status(401).json({ msg: error.message });
   }

   // Determinar si la tarea es el mismo que el creador la haya creado
   if (tarea.project.creador.toString() !== req.usuario._id.toString() && !tarea.project.colaboradores.some(colaborador => colaborador._id.toString() === req.usuario._id.toString())) {
      const error = new Error('Acción no permitida');
      return res.status(403).json({ msg: error.message });
   }

   tarea.status = !tarea.status;
   tarea.completed = req.usuario._id;
   await tarea.save();

   const tareaAlmacenada = await Tarea.findById(id)
      .populate("project")
      .populate("completed");

   res.json(tareaAlmacenada);
}

export {
   agregarTarea,
   obtenerTarea,
   actualizarTarea,
   eliminarTarea,
   cambiarEstado
}