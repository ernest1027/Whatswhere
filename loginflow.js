var loginBtnHtml = `<img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />Sign in with Google`;
var logoutBtnHtml = `<img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />Logout`;

function signInGoogle() {
  if (!firebase.auth().currentUser) {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/plus.login");
    firebase.auth().signInWithRedirect(provider);
  }
}

function signOut() {
  return firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function (user) {
  let googleLoginBtn = document.getElementById("google-login-button");
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
    googleLoginBtn.innerHTML = logoutBtnHtml;
    googleLoginBtn.removeEventListener("click", signInGoogle);
    googleLoginBtn.addEventListener("click", signOut);
    var itemCount = firebase.database().ref("users/" + user.uid + "/itemCount");
    itemCount.on("value", function (snapshot) {
      if (snapshot.val() == null) {
        firebase
          .database()
          .ref("users/" + user.uid +"/itemCount")
          .set({
            itemCount: 0,
          });
      }
    });
  } else {
    // User is signed out.
    googleLoginBtn.innerHTML = loginBtnHtml;
    googleLoginBtn.removeEventListener("click", signOut);
    googleLoginBtn.addEventListener("click", signInGoogle);
    // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
    // document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
    // document.getElementById('quickstart-account-details').textContent = 'null';
    // document.getElementById('quickstart-oauthtoken').textContent = 'null';
  }
  //document.getElementById('quickstart-sign-in').disabled = false;
});

