export const checkValidDat=(email,passward,name) =>{
const isEmailValid =/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email);
const isPasswardValid =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(passward);
const isNameValidate=/^[a-zA-Z ]{2,40}$/.test(name);

if(!isEmailValid) return "Email is not Valid"
if(!isPasswardValid) return "Passward is Not valid"
if(!isNameValidate) return "First Name not valid"
return null;
}