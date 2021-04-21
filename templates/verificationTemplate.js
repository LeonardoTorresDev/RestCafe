const {generateJWT}=require('../helpers/helpers');

const verificationTemplate=async(user)=>{
    const token=await generateJWT(user._id,process.env.VERIFY_KEY,process.env.VERIFY_EXPIRATION_DATE);
    const year=new Date().getFullYear();
    return `
        <h1>Hello, ${user.name}</h1><hr/>
        <p>
            Thanks to join our cafe, but you still need
            to verify your email to use our services. 
            Use this token on the following link
            to verify your account. Have a great day!
        </p>
        <h2>Verification Token</h2>
        <p>${token}</p>
        <small>Token valid for one hour</small><br/>
        <small>AB SOFTWARE &copy;${year}</small>
    `;
}

module.exports={verificationTemplate};