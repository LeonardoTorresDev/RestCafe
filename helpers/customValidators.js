const checkPassword=password=>{
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)){
        throw new Error(
            `${password} has to contain at least one digit, one lower case, one upper case
            or has to be at least eight characters long`
        );
    }
    else{
        return true;
    }
}

module.exports={
    checkPassword
};