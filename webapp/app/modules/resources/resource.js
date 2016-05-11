var Resource = function(){
	this.storage = undefined;
}

Resource.prototype.save = function(data) {
	this.storage.save(data);
}

Resource.prototype.find = function(condition) {
	return this.storage.find(condition);
}