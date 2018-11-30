function TestGetChallenge() {
	firebase.database().ref('Arrow Quiz 1').on('value',function(snapshot){
		console.log(snapshot.val()["Questions"]);
		var TestDictionary = snapshot.val()["Questions"];
		var TestTable = document.getElementById("QuestionsTable");
		for(var key in TestDictionary){
			if(TestDictionary.hasOwnProperty(key)){
				var TestRow = TestTable.insertRow(i);
				var TestCell = row.insertCell();
				cell.innerHTML = TestDictionary[key];
			}
			i++;
			if var TestTable = NULL{
				console.log("Test failed. No Questions Exist")
			}
			if var TestTable != NULL{
			console.log("Eureka!! We have Questions!!!")
			}
		}
}