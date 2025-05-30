 const validator =require("validator")
const validateSignUpData=(data)=>{
    const {firstName,lastName, emailId, password}=data
if (!firstName || !lastName){
    throw new Error ("Name is required")
}else if (!validator.isEmail(emailId)){
    throw new Error ("Email is not vaild")
}else if (!validator.isStrongPassword(password)){
    throw new Error ("Please Enter Strong Password")
}

}

module.exports=validateSignUpData