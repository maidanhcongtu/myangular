var UserResource = function(){
	//this.storage = new LowDbStorage("users");
	//this.storage = new NedbStorage("users");

	this.storage = new MongooseStorage("users",UserSchemaDefine);
}
inheritFrom(UserResource, Resource);

