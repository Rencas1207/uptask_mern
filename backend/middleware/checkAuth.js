const checkAuth = (req, res, next) => {
   console.log('desde checkout js');
   next();
}

export default checkAuth;