import mongoose from "mongoose";

const tareaSchema = mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: true
   },
   description: {
      type: String,
      trim: true,
      required: true
   },
   status: {
      type: Boolean,
      default: false,
   },
   deliverDate: {
      type: Date,
      required: true,
      default: Date.now()
   },
   priority: {
      type: String,
      required: true,
      enum: ['Baja', 'Media', 'Alta']
   },
   project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proyecto"
   },
   completed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      default: null
   }
}, {
   timestamps: true
})

const Tarea = mongoose.model('Tarea', tareaSchema);
export default Tarea