var low = require('lowdb')
var storage = require('lowdb/file-sync');
var db = low('app/db/lowdb.json', { storage });

var LowDbStorage = function(table) {
	
	this.save = function(data){
		db(table).push(data);
	}
	
	this.find = function(condition) {
		return db(table).find(condition);
	}
	
}
