import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema({
   name: {
      type: String,
      trim: true,
      require: true
   },
   description: {
      type: String,
      trim: true,
      required: true
   },
   deliverDate: {
      type: Date,
      default: Date.now()
   },
   client: {
      type: String,
      trim: true,
      required: true,
   },
   creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
   },
   colaboradores: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Usuario'
      }
   ],
},
   {
      timestamps: true
   }
);

const Proyecto = mongoose.model('Proyecto', proyectosSchema);
export default Proyecto;