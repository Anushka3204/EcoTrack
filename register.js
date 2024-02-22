// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxyFrR2oL3_7bFzVbaRJRJwtxFRD7P-WE",
  authDomain: "ecotrack-register.firebaseapp.com",
  databaseURL: "https://ecotrack-register-default-rtdb.firebaseio.com",
  projectId: "ecotrack-register",
  storageBucket: "ecotrack-register.appspot.com",
  messagingSenderId: "95583531493",
  appId: "1:95583531493:web:dcc8e20755e548f2bd3f0c",
  measurementId: "G-D130L1QJDX"
};

firebase.initializeApp(firebaseConfig);

var EcotrackregisterDB = firebase.database().ref("ecotrack-register");

document.getElementById("register").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var dob = getElementVal("dob");
  var email = getElementVal("email");
  var contact = getElementVal("contact");
  var username = getElementVal("username");
  var password = getElementVal("password");
  var confirm = getElementVal("confirm");

  saveUser(name, dob, email, contact, username, password, confirm);

  // Display alert
  document.querySelector(".alert").style.display = "block";

  // Hide alert after 3 seconds
  setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Reset form
  document.getElementById("register").reset();
}

function saveUser(name, dob, email, contact, username, password, confirm) {
  var newEcotrack = EcotrackregisterDB.push();

  newEcotrack.set({
      name: name,
      dob: dob,
      email: email,
      contact: contact,
      username: username,
      password: password,
      confirm: confirm,
  });
}

function getElementVal(id) {
  return document.getElementById(id).value;
}
