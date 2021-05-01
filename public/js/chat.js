
const url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:3000/api/auth'
        : 'https://pilot-43.herokuapp.com/api/auth';


let user   = null;
let socket = null;

const validateJWT = async() => {

    const token = localStorage.getItem('token') || '';
    if(token.length < 10){
        window.location = 'index.html';
        throw new Error(' No token on server ');
    }

    const resp = await fetch( url, {
        headers: {'Authorization': token}
    });

    const {user: userDB, token: tokenDB} = await resp.json();

    localStorage.setItem('token', `Bearer ${tokenDB}`);
    user = userDB;
    console.log(user);

}

const main = async () => {
    await validateJWT();
}

main();