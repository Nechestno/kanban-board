const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma-client");


const auth = async (req, res,next) => {
    try{
        let token = req.headers.authorization?.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

       req.user = await prisma.user.findUnique({
           where: {
               id: decodedToken.id,
           }
       });

        next();
    }
    catch(err){
        res.status(401).send({message:"Нет доступа"});
    }
}

module.exports = {
    auth
};