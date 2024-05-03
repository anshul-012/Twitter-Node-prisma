import jwt from "jsonwebtoken"

const generateJwtToken = async(id:any, email:string,username:string)=>{
   return  await jwt.sign({
        id:id,
        email:email,
        username:username
    },process.env.JWT_SECRET!,{ expiresIn:"20d"})
}

const verifyJWT = async(token:string)=> {
    const user = await jwt.verify(token, process.env.JWT_SECRET!);
    return user;
}


export {
    generateJwtToken,
    verifyJWT
}