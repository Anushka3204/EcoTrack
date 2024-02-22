const firebaseConfig = {
    apiKey: "AIzaSyAaNsw5tjQlwBuz3WS_fJ4_JWA0sZYNC-k",
    authDomain: "eco-track-93cd3.firebaseapp.com",
    databaseURL: "https://eco-track-93cd3-default-rtdb.firebaseio.com",
    projectId: "eco-track-93cd3",
    storageBucket: "eco-track-93cd3.appspot.com",
    messagingSenderId: "173608097623",
    appId: "1:173608097623:web:e2ba5102693e9ec84d5012"
  };

  firebase.initializeApp(firebaseConfig);

var EcotrackDB = firebase.database().ref("Eco-track");

document.getElementById("Contact Us").addEventListener("submit",submitForm);

function submitForm(e){
    e.preventDefault();

    var name = getElementVal("name");
    var email = getElementVal("email");
    var phone = getElementVal("phone");
    var message = getElementVal("message");

    // console.log(name,email,phone,message);
    
    saveMessages(name,email,phone,message);

    //enable alert

    document.querySelector(".alert").style.display="block";

    //remove alert 
    setTimeout(() => {
        document.querySelector(".alert").style.display="block";
    }, 3000);


    //reset form
    
    document.getElementById("contact-form").reset();



}


const saveMessages = (name,email,phone,message)=>{
var newEcotrack = EcotrackDB.push();

newEcotrack.set({
    name : name,
    email : email,
    phone:phone,
    message:message,

})
};



const getElementVal = (id) => {
    return document.getElementById(id).value;
};


