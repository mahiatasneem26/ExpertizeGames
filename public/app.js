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
	ReadFromDatabase();

	console.log("sup dude!")
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
	firebase.database().ref('Thriller/Game of Thrones/Set One/Questions').on('value',function(snapshot){
		console.log(snapshot.val()["Questions"]);
		var QuestionDictionary = snapshot.val()["Questions"];
		var table = document.getElementById("QuestionsTable");

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
	var question = document.getElementById("question").value;
	var answer = document.getElementById("question").value;
	var newQuestionKey = firebase.database().ref().child('Created Quiz/Questions').push().key;
	var newQuestionVal = firebase.database().ref().child('Created Quiz/Questions').push().key;
	firebase.database().ref('Created Quiz/Questions' + newQuestionKey).set(question);
	firebase.database().ref('Created Quiz/Questions' + newQuestionVal).set(answer);
}

function GetQuiz(genre){
	console.log(genre);
	//var userID = firebase.auth().currentUser.uid;
	var database = firebase.database();
	firebase.database().ref('users').on('value',function(snapshot){
		console.log(snapshot.val());
		var table = document.getElementById("listOfQuizzes");
		//var row = table.insertRow(0);
		//var cell = row.insertCell(0);
		//cell.innerHTML = "ARROW QUIZ!"
		var i = 0;
		for(var key in snapshot.val()){
			console.log(key);
			/*if(QuestionDictionary.hasOwnProperty(key)){
				var row = table.insertRow(i);
				var cell = row.insertCell();
				cell.innerHTML = QuestionDictionary[key];*/
			}
			i++;
		});
}
