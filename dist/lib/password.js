import bcrypt from "bcrypt";
const checkPassword = (incryptedpassword, password) => {
    return bcrypt.compareSync(password, incryptedpassword);
};
const incryptPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};
export { checkPassword, incryptPassword };
