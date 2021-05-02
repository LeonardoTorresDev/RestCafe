
const url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:3000/api/auth'
        : 'https://pilot-43.herokuapp.com/api/auth';


let user   = null;
let socket = null;

const validateJWT = async() => {

    const token = localStorage.getItem('token') || '';
    if(!token){
        window.location = 'index.html';
        throw new Error(' No token on server ');
    }

    const resp = await fetch( url, {
        headers: {'Authorization': token}
    })
    .catch(
        console.error
    );

    const {user: userDB, token: tokenDB} = await resp.json();
    localStorage.setItem('token', `Bearer ${tokenDB}`);
    user = userDB;

    document.title = "RestCafe | "+user.name;

    await connectSocket();

}

const connectSocket = async() => {

    io({
        'extraHeaders': {
            'authorization': localStorage.getItem('token')
        }
    });

}

const main = async () => {
    await validateJWT();
}

main();