
const url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:3000/api/auth'
        : 'https://pilot-43.herokuapp.com/api/auth';


let user   = null;
let socket = null;

let txtUid = document.querySelector('#txtUid');
let txtMessage  = document.querySelector('#txtMessage');
let navUsers     = document.querySelector('#navUsers');
let navMessages  = document.querySelector('#navMessages');
let btnExit     = document.querySelector('#btnExit');

btnExit.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location = "index.html";
});

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

    //send token on extraheaders via handshake
    socket = io({
        'extraHeaders': {
            'authorization': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        //console.log("Sockets online");
    });

    socket.on('disconnect', () => {
        //console.log("Sockets offline");
    });

    socket.on('receive-message', ( payload ) => {
        console.log(payload)
    });

    //get users from back-end and add an html for each one
    socket.on('active-users', printUsers);

    socket.on('private-message', () => {
        //to-do
    });

}

const printUsers= ( users = []) => {

    let usersHtml = '';

    users.forEach( ({ name, uid, img }) => {

        usersHtml += `        
            <div class="row mb-3">
                <div class="col-2">
                    <img src=${img} alt="image" class="thumbnail mb-2"/>  
                </div>
                <div class="col ms-2">
                    <h5>${ name }</h5>  
                    <span class="fs-6 text-muted">${ uid }</span>
                </div>            
            </div>
        `;

    });

    navUsers.innerHTML = usersHtml;

}

txtMessage.addEventListener('keyup', ({ keyCode }) => {
    
    const message = txtMessage.value;
    const uid     = txtUid.value;

    if( keyCode !== 13 ){ return; }
    if( message.length === 0 ){ return; }

    socket.emit('send-message', { message, uid });

    txtMessage.value = '';

});

const main = async () => {
    await validateJWT();
}

main();