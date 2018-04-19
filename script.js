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

database.on("value", function (snapshot) {
    let list = document.getElementById('listPerso');
    list.innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
        let key = childSnapshot.key;
        let perso = childSnapshot.val();

        let listPerso = document.createElement("li");
        listPerso.textContent = perso.name;
        list.appendChild(listPerso);

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
    });
}