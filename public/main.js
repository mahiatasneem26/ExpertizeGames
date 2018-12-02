
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyD5EVnTBnMKyu-9qHBhBfGxDyZLTIbkQm4",
    authDomain: "expertize-games.firebaseapp.com",
    databaseURL: "https://expertize-games.firebaseio.com",
    projectId: "expertize-games",
    storageBucket: "expertize-games.appspot.com",
    messagingSenderId: "839552852802"
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
function loginFunction(){
	console.log(provider);
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  console.log(user);
	  console.log("is logged in");
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
}

function ReadFromDatabase(){
 	var userID = firebase.auth().currentUser.uid;
 	var database = firebase.database();
 	firebase.database().ref('users').once('value').then(function(snapshot){
 		console.log(snapshot.val());
 		});
 }

function GetChallenge(){
 	//var userID = firebase.auth().currentUser.uid;
 	var database = firebase.database();
 	firebase.database().ref('Game of Thrones').on('value',function(snapshot){
 		console.log(snapshot.val()["Questions"]);
 		var QuestionDictionary = snapshot.val()["Questions"];
 		var table = document.getElementById("QuestionsTable");
 		//var row = table.insertRow(0);
 		//var cell = row.insertCell(0);
 		//cell.innerHTML = "ARROW QUIZ!"
 		var i = 0;
 		for(var key in QuestionDictionary){
 			if(QuestionDictionary.hasOwnProperty(key)){
 				var row = table.insertRow(i);
 				var cell = row.insertCell();
 				cell.innerHTML = QuestionDictionary[key];
 			}
 			i++;
 		}
 		});
 }

 function NewQuestion(){
 	var newQuestionKey = firebase.database().ref().child('Arrow Quiz 1/Questions').push().key;
 	firebase.database().ref('Arrow Quiz 1/Questions/' + newQuestionKey).set("Olicity");
 }

 
