import jwt from "jsonwebtoken";
const generateJwtToken = async (id, email, username) => {
    return await jwt.sign({
        id: id,
        email: email,
        username: username
    }, process.env.JWT_SECRET, { expiresIn: "20d" });
};
const verifyJWT = async (token) => {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    return user;
};
export { generateJwtToken, verifyJWT };
