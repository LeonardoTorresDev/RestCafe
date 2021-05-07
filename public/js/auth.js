const form = document.querySelector('form');
const url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:3000/api/auth/'
        : 'https://pilot-43.herokuapp.com/api/auth/';

form.addEventListener('submit', event => {

    event.preventDefault();
    
    let formData = {};
    for ( let element of form.elements) {
        if ( element.name ){ formData[element.name] = element.value }
    }

    console.log(formData)
    
    fetch( url+"login", {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: {'Content-Type': 'application/json'}
    })
    .then( resp => resp.json() )
    .then( authResponse )
    .catch( console.log );

})


function onSignIn (googleUser){

    //var profile = googleUser.getBasicProfile();
    var idToken = googleUser.getAuthResponse().id_token;
    const data  = {idToken};
    
    fetch( url+"google", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data )
    })
    .then( resp => resp.json() )
    .then( authResponse )
    .catch( console.log );

}

const signOut = () =>{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token');
}

const authResponse = ({msg,token}) =>{
    if(msg){ 
        alert("Authentication error: "+msg); 
    }
    if(token){
        localStorage.setItem('token', `Bearer ${token}`);
    } 
}