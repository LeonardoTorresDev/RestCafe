
const verificationTemplate=(user,token)=>{
    const html=`
        <h1>Hello, ${user.name}</h1>
        <p>
            Thanks to join our cafe here, but you still need
            to auth your email, paste this token on verifcation.
        </p>
        <h2>Verification Token</h2>
        <p>${token}</p>
        <small>Token valid for one hour</small>
        <small>AB SOFTWARE 2020</small>
    `;
    return html;
}

module.exports={verificationTemplate};