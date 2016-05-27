var Datastore = require('nedb');
var db = new Datastore("app/db/nedb.json");

db.loadDatabase();

var NedbStorage = function(table) {
	
	this.save = function(data){
		db.insert(data);
	}
	
	this.find = function(condition) {
		db.find(condition,function(err, docs){
			return docs;
		});
	}
	
}
