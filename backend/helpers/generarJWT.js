import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
   return jwt.sign(
      {
         nombre: id
      },
      process.env.JWT_SECRET,
      {
         expiresIn: "30d"
      }
   ) // generar un jwt
};

export default generarJWT;