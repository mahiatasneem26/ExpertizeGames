var provider = new firebase.auth.GoogleAuthProvider();
function loginFunction(){
	console.log(provider);
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  console.log(user);
	  console.log("is currently logged in");
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
	//ReadFromDatabase(); <-- causing problems and so cannot implement just yet
	
	console.log("sup dude!")
}
function ReadFromDatabase(){
	var userID = firebase.auth().currentUser.uid;
	var database = firebase.database();
	firebase.database().ref('users').once('value').then(function(snapshot){
		console.log(snapshot.val());
		});
}
