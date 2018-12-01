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
	firebase.database().ref('Arrow Quiz 1').on('value',function(snapshot){
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

function GetQuiz(genre){

	/* Krista: You can use URL parameters to pass a variable to the webpage.
	Add a query parameter like so: localhost:5000/ChallengeScreen.html?genre=comedy
	And you can access the variable in your javascript with the code below:
	 */
	var urlParams = new URLSearchParams(location.search);
	console.log("urlParams.get(\"genre\"):", urlParams.get("genre"));
	/* Append the query parameter in your links from Categories.html
	If you use query parameters, you don't need a parameter in this method.
	You can use this same technique for the individual challenge page as well.
	See: https://www.codexworld.com/how-to/get-query-string-from-url-javascript/ */

	var database = firebase.database();
	firebase.database().ref('challenge/' + genre).on('value',function(snapshot){

		console.log("snapshot.val():", snapshot.val());

		var listOfQuizzes = document.getElementById("listOfQuizzes");

		for(var key in snapshot.val()){
			console.log("key:", key); // key is the title of your quiz
			console.log("quiz attributes", snapshot.val()[key]); // This obj contains the quiz's attributes

			// Here you'll want to create an HTML element (for instance a div)
			// and populate according to the respective quiz.
			// Then append the element to the listOfQuizzes element.
			// See: https://www.w3schools.com/jsref/met_document_createelement.asp

			}
		});
}
