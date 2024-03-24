import bcrypt from "bcrypt";

const checkPassword = (incryptedpassword:string, password:string) => {
    return bcrypt.compareSync(password,incryptedpassword);
};

const incryptPassword = (password:string) => {
    return bcrypt.hashSync(password, 10);
};


export{
    checkPassword,
    incryptPassword
}