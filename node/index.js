var express = require('express');
var fs = require('fs');
var path = require('path');
var PythonShell = require('python-shell');
var app = express();
//var spawn = require('child_process').spawn

//var runnable = spawn('python', ['JSON-fetch.py']);

PythonShell.run('JSON-fetch.py', function(err){
	if(err){
		console.log(err)
	}else{
		console.log("Running python-script");
	}
});

//app.use(app.router);
app.use(express.static(path.join(__dirname, 'html')));
app.use("/scripts", express.static(__dirname + '/html/js'));

//Filepath for JSON to be served.
var bussFilePath = path.join(__dirname, 'JSON/parsittudata.json');
var testFilePath = path.join(__dirname, '/html/client.html');

//Returns all busses in JSON format.
app.get('/bussit', function(req, res){
	var readable = fs.createReadStream(bussFilePath);
	readable.pipe(res);
});

// gives the test index page that can be used to test the features
app.get('/test', function(req, res){

	res.sendFile(testFilePath);
	//var hessu = fs.createReadStream(testFilePath);
	//hessu.pipe(res);
});

app.listen(process.env.PORT || 3000);
