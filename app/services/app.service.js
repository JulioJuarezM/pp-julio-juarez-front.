import myModule from '../app.module.js';

export default myModule.service('MyService',function(){
	this.add = function(a,b){
		return a + b;
	}
});
