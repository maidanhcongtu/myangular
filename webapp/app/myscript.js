var inheritFrom = function(childClass, parentClass) {
	childClass.prototype = Object.create(parentClass.prototype);
}