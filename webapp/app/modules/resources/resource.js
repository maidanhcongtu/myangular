var Resource = function(){
	this.storage = undefined;
}

Resource.prototype.save = function(data, callback) {
	this.storage.save(data, callback);
}

Resource.prototype.find = function(condition, callback) {
	this.storage.find(condition, callback);
}

Resource.prototype.deleteAll = function(callback) {
	this.storage.delete({},callback);
}

Resource.prototype.findAll = function(callback) {
	this.storage.find({},callback);
}