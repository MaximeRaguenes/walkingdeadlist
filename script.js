let config = {
    apiKey: "AIzaSyBmChdSFVxSmZOcbMijr4lZVR3Zkz2xCsg",
    authDomain: "walkingdeadquest-6ce31.firebaseapp.com",
    databaseURL: "https://walkingdeadquest-6ce31.firebaseio.com",
    projectId: "walkingdeadquest-6ce31",
    storageBucket: "walkingdeadquest-6ce31.appspot.com",
    messagingSenderId: "33925436540"
};
firebase.initializeApp(config);

let database = firebase.database().ref();
let id;

function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // All datas
            // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const uid = user.uid;
            id = user.uid;
            const phoneNumber = user.phoneNumber;
            const providerData = user.providerData;


            // retour de l'utilisateur après authentification
            user.getIdToken().then((accessToken) => {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    phoneNumber: phoneNumber,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, '  ');
            });

        } else {

            // Gestion de la deconnexion
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
        }
    }, (error) => { // gestion de erreur de connexion
        console.error(error);
    });
}
initApp();

const uiConfig = {
    signInSuccessUrl: 'http://localhost:5500/index2.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'http://localhost:5500/cgu' // conditions générales d'utilisation
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


database.on("value", function (snapshot) {
    let list = document.getElementById('listPerso');
    list.innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
        let key = childSnapshot.key;
        let perso = childSnapshot.val();
        if (id == perso.id || perso.id == null) {
            let listPerso = document.createElement("li");
            listPerso.textContent = perso.name;
            list.appendChild(listPerso);
        }


    });
});

document.getElementById('addPerso').onclick = function addPerso(name) {
    let input = document.getElementById("getPerso");
    if (!input.value || input.value == "") {
        return;
    }
    let list = firebase.database().ref();
    let newItem = list.push();
    newItem.set({
        name: input.value,
        id: id
    });
}