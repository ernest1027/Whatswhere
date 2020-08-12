function signIn() {
    
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    }
}

function signOut() {
    return firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        // document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        document.getElementById('login-button').textContent = 'Logout';
        document.getElementById("login-button").removeEventListener("click", signIn);
        document.getElementById("login-button").addEventListener("click", signOut);

    } else {
        // User is signed out.
        document.getElementById('login-button').textContent = 'Login';
        document.getElementById("login-button").addEventListener("click", signIn);
        // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        // document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
        // document.getElementById('quickstart-account-details').textContent = 'null';
        // document.getElementById('quickstart-oauthtoken').textContent = 'null';
    }
    //document.getElementById('quickstart-sign-in').disabled = false;
});

console.log("???");
//document.getElementById("login-button").addEventListener("click", signIn);