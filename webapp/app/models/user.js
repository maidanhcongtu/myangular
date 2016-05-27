var User = function() {
	this.id = 0;
	this.username = "";
	this.password = "";
	this.birthDate = new Date().getTime();	
}

var UserSchemaDefine = {
	id : Number,
	username : String,
	password : String,
	birthDate : Number	
}