var path = require('path');
var nwDir = path.dirname(process.execPath);

var mongodExePath = nwDir.substring(0, nwDir.indexOf("webapp")) + "webapp\\mongodb\\mongod.exe";
var mongodDataPath = nwDir.substring(0, nwDir.indexOf("webapp")) + "webapp\\mongodb\\mongodata\\data";

var exec = require('child_process').exec;
var cmd = mongodExePath + ' --dbpath "'+ mongodDataPath +'"';

exec(cmd,function (error, stdout, stderr) {
  if (error !== null) {
    console.log('exec error: ' + error);
}});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mymongodb');
var Schema = mongoose.Schema;

var MongooseStorage = function(modelName, schemaDefine) {
	console.log("just once time");
	
	this.schema = new Schema(schemaDefine);
	
	
	this.save = function(data, callback){
		var Model = mongoose.model(modelName, this.schema);
		var model = new Model(data);
		model.save(function(err){
			callback(err);
		});
	}
	
	this.find = function(condition, callback) {
		var Model = mongoose.model(modelName, this.schema);
		Model.find(condition, function(err,docs){
			callback(docs);
		});
	}
	
	this.delete = function(condition,callback) {
		var Model = mongoose.model(modelName, this.schema);
		Model.remove(condition, function(err){
			callback(err);
		});
	}
	
}
