import express from 'express';
import test from './test.js';

const app = express();

console.log('desdes index js');

app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 4000');
});
