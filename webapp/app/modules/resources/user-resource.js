var UserResource = function(){
	this.storage = new LowDbStorage("users");
}
inheritFrom(UserResource, Resource);

