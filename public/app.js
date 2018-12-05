var Gprovider = new firebase.auth.GoogleAuthProvider();

function loginFunction(){
	console.log(Gprovider);
	firebase.auth().signInWithPopup(Gprovider).then(function(result) {
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

var fbProvider = new firebase.auth.FacebookAuthProvider();

function fbLogin(){
	firebase.auth().signInWithPopup(fbProvider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
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

var response = {
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}

// FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });


var twitterProvider = new firebase.auth.TwitterAuthProvider();

function twitterLogin(){
	firebase.auth().signInWithPopup(twitterProvider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
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
function GetChallenges(){
	var quizBoxDiv = document.getElementById("quizBox")
	var boxDiv = document.createElement("div")
	var database = firebase.database();

	var urlParams = new URLSearchParams(location.search);
	console.log("urlParams.get(\"name\"):", urlParams.get("name"));
	console.log("urlParams.get(\"genre\"):", urlParams.get("genre"));
	ref = 'Challenges/' + urlParams.get("genre") + '/' +urlParams.get("name")

	var pageTitle = document.getElementById("pageTitle")
	pageTitle.innerHTML = urlParams.get("name")

	firebase.database().ref(ref).on('value',function(snapshot){
		console.log(snapshot.val());
		for(var key in snapshot.val()){

			var a = document.createElement('a');
			var linkText = document.createTextNode(key);
			a.title = key;
			a.href = "QuizPage.html" + "?" + "genre=" + urlParams.get("genre") + "&" + "name=" + urlParams.get("name") + "&" + "set=" + key;
			a.appendChild(linkText);

			var boxDiv = document.createElement("div")
			boxDiv.className = "box"

			boxDiv.appendChild(a);

			quizBoxDiv.appendChild(boxDiv)
		}
		});

}
function GetQuestions(){
	//var userID = firebase.auth().currentUser.uid;
	console.log("on getQuestions clicked")
	var database = firebase.database();
	var urlParams = new URLSearchParams(location.search);
	console.log("urlParams.get(\"name\"):", urlParams.get("name"));
	console.log("urlParams.get(\"genre\"):", urlParams.get("genre"));
	console.log("urlParams.get(\"set\"):", urlParams.get("set"));
	ref = 'Challenges/' + urlParams.get("genre") + '/' +urlParams.get("name") + '/' + urlParams.get("set")
	console.log(ref)


	firebase.database().ref(ref).on('value',function(snapshot){
		console.log(snapshot.val());
		var QuestionDictionary = snapshot.val()["Questions"];
		var AnswersDictionary = snapshot.val()["Answers"];
		var HintsDictionary = snapshot.val()["Hints"];
		var table = document.getElementById("QuestionsTable");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		// cell.innerHTML = "ARROW QUIZ!"
		for(var QuestionID in QuestionDictionary){
			if(QuestionDictionary.hasOwnProperty(QuestionID)){
				var row = table.insertRow(-1);
				var cell = row.insertCell();
				cell.innerHTML = QuestionDictionary[QuestionID];
				}
				cell.className = "quizQuestionText";
				var Hint = table.insertRow(-1);
				var HintVal= Hint.insertCell();
				HintVal.innerHTML = "<button onclick=\"ShowHint('"+QuestionID+"')\">Show Hint</button><div style=\"display:none\" id=\""+QuestionID+"\">"+HintsDictionary[QuestionID]+"</div>"

				for (var answer in AnswersDictionary[QuestionID]){
					if (answer!="CA"){
						console.log("Answer", AnswersDictionary[QuestionID][answer]);
						var row = table.insertRow(-1);
						var cell = row.insertCell();
						cell.innerHTML = "<input type=\"radio\" name="+QuestionID+" value="+answer+">" + AnswersDictionary[QuestionID][answer];
					}
				}
		}
		});
}

function ShowHint(DivID) {
    var x = document.getElementById(DivID);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function GetAnswers(){
	//var userID = firebase.auth().currentUser.uid;
	console.log("on getAnswers clicked")
	var database = firebase.database();
	var urlParams = new URLSearchParams(location.search);
	console.log("urlParams.get(\"name\"):", urlParams.get("name"));
	console.log("urlParams.get(\"genre\"):", urlParams.get("genre"));
	console.log("urlParams.get(\"set\"):", urlParams.get("set"));
	ref = 'Challenges/' + urlParams.get("genre") + '/' +urlParams.get("name") + '/' + urlParams.get("set")
	console.log(ref)
	firebase.database().ref(ref).on('value',function(snapshot){

		console.log(snapshot.val());
		var AnswerDictionary = snapshot.val()["Answers"];
		var table = document.getElementById("AnswersTable");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		// cell.innerHTML = "ARROW QUIZ!"
		var i = 0;
		for(var key in AnswerDictionary){
			if(AnswerDictionary.hasOwnProperty(key)){
				var row = table.insertRow(i);
				var cell = row.insertCell();
				cell.innerHTML = AnswerDictionary[key]['CA'];
			}
			i++;
		}
		});
}

function GetScore(){
	var database = firebase.database();
	var urlParams = new URLSearchParams(location.search);
	ref = 'Challenges/' + urlParams.get("genre") + '/' +urlParams.get("name") + '/' + urlParams.get("set")
	console.log(ref)
	firebase.database().ref(ref).on('value',function(snapshot){
		var SAnswerDictionary = snapshot.val()["Answers"];
		var table = document.getElementById("AnswersTable");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		var score = 0;
		for(var key in SAnswerDictionary){
			if(SAnswerDictionary.hasOwnProperty(key)){
				var row = table.insertRow(-1);
				var cell = row.insertCell();
				selected=document.querySelector('input[name='+key+']:checked').value;
				if (selected==SAnswerDictionary[key]['CA']){
					score++;
				}
			}
		}
		cell.innerHTML = "Your final score is: "+score*20+"%!";
		});
}

function GetHints(){
	//var userID = firebase.auth().currentUser.uid;
	console.log("on getHints clicked")
	var database = firebase.database();
	var urlParams = new URLSearchParams(location.search);
	console.log("urlParams.get(\"name\"):", urlParams.get("name"));
	console.log("urlParams.get(\"genre\"):", urlParams.get("genre"));
	console.log("urlParams.get(\"set\"):", urlParams.get("set"));
	ref = 'Challenges/' + urlParams.get("genre") + '/' +urlParams.get("name") + '/' + urlParams.get("set")
	console.log(ref)
	firebase.database().ref(ref).on('value',function(snapshot){

		console.log(snapshot.val());
		var HintsDictionary = snapshot.val()["Hints"];
		var table = document.getElementById("HintsTable");
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		// cell.innerHTML = "ARROW QUIZ!"
		var i = 0;
		for(var key in HintsDictionary){
			if(HintsDictionary.hasOwnProperty(key)){
				var row = table.insertRow(i);
				var cell = row.insertCell();
				cell.innerHTML = HintsDictionary[key];
			}
			i++;
		}
		});
}

function NewQuestion(){
	var database = firebase.database();

	var genreInput = document.getElementById("genreInput")
	var nameInput = document.getElementById("nameInput")
	var hintInput = document.getElementById("hintInput")

	ref = "Challenges/" + genreInput.value + "/" + nameInput.value + "/" + setInput.value
	console.log(ref)
	console.log(genreInput)

	var quesInput = document.getElementById("questionInput")
	var answerInput = document.getElementById("answerInput")
	var hintInput = document.getElementById("hintInput")

	var newEntry = {Question: quesInput.value, Answer: answerInput.value, Hint: hintInput.value}

	console.log(quesInput.value)

	database.ref(ref).set(newEntry)
	location.reload();
}

function AddDiv(){
	var newEntry = document.getElementById("newEntry")
	var linebreak = document.createElement("br");

	var newDiv = document.createElement('div');
	newDiv.className = "newDiv"

	var quesDiv = document.createElement('div')
	var quesLabel = document.createTextNode("Question");
	var quesInput = document.createElement("INPUT");
	linebreak = document.createElement("br");
	quesInput.id="questionInput"
	quesInput.className = "form-control"
	quesInput.className = "col-lg-8"
	quesInput.setAttribute("type", "text");
	quesDiv.appendChild(quesLabel)
	quesDiv.appendChild(linebreak)
	quesDiv.appendChild(quesInput)


	var ansDiv = document.createElement('div')
	var ansLabel = document.createTextNode("Answer");
	var ansInput = document.createElement("INPUT");
	linebreak = document.createElement("br");
	ansInput.id="answerInput"
	ansInput.className = "form-control"
	ansInput.className = "col-lg-8"
	ansInput.setAttribute("type", "text");
	ansDiv.appendChild(ansLabel)
	ansDiv.appendChild(linebreak)
	ansDiv.appendChild(linebreak)
	ansDiv.appendChild(ansInput)


	var hintDiv = document.createElement('div')
	var hintLabel = document.createTextNode("Hint");
	var hintInput = document.createElement("INPUT");
	linebreak = document.createElement("br");
	hintInput.id="hintInput"
	hintInput.className = "form-control"
	hintInput.className = "col-lg-8"
	hintInput.setAttribute("type", "text");
	hintDiv.appendChild(hintLabel)
	hintDiv.appendChild(linebreak)
	hintDiv.appendChild(hintInput)

	newDiv.appendChild(quesDiv);
	newDiv.appendChild(ansDiv);
	newDiv.appendChild(hintDiv);

	newEntry.appendChild(newDiv);
}

// function GetQuiz(genre){
// 	console.log(genre);
// 	//var userID = firebase.auth().currentUser.uid;
// 	var database = firebase.database();
// 	firebase.database().ref('users').on('value',function(snapshot){
// 		console.log(snapshot.val());
// 		var table = document.getElementById("listOfQuizzes");
// 		//var row = table.insertRow(0);
// 		//var cell = row.insertCell(0);
// 		//cell.innerHTML = "ARROW QUIZ!"
// 		var i = 0;
// 		for(var key in snapshot.val()){
// 			console.log(key);
// 			/*if(QuestionDictionary.hasOwnProperty(key)){
// 				var row = table.insertRow(i);
// 				var cell = row.insertCell();
// 				cell.innerHTML = QuestionDictionary[key];*/
// 			}
// 			i++;
// 		});
// }

function TakeChallenge(){
	/*var userID = firebase.auth().currentUser.uid;
	var database = firebase.database();
	firebase.database().ref('users').once('value').then(function(snapshot){
		console.log(snapshot.val());
		});*/
		var urlParams = new URLSearchParams(location.search); console.log("urlParams.get(\"genre\"):", urlParams.get("genre"));
		console.log("urlParams.get(\"tvshow\"):", urlParams.get("tvshow"));
		console.log("urlParams.get(\"set\"):", urlParams.get("set"));
		var database = firebase.database();
	firebase.database().ref('Challenges').on('value',function(snapshot){
		var webUrl = snapshot.val()[urlParams.get("genre")][urlParams.get("tvshow")][urlParams.get("set")]
		console.log(webUrl);
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
