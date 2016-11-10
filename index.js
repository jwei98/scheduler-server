
// set up firebase database
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://scheduler-prototype.firebaseio.com/"
});

var database = admin.database();


// writes a user's userId, name, and email to Firebase
function writeUserData(userId, name, email) {
	database.ref('users/' + userId).set({
    	username: name,
    	email: email,
  	});
}
writeUserData("bbaker","Ben Baker", "ben.baker@duke.edu")



// reads all user data and prints it in console (currently it won't return anything for somre reason)
var usersRef = database.ref("users");
function readUserData() {
	// Attach an asynchronous callback to read the data at our posts reference
	usersRef.on("value", function(snapshot) {
		data = snapshot.val();
		console.log(data);
	  	return(data);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
}
usersData = readUserData(); // this doesn't actually return anything, for some reason.



// http server code (just for visual verification... not relevant to actual data processing)
var http = require("http");
// this is a request handler. When HTTP request hits server, runs this function
http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end("Check console for users data");
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');
