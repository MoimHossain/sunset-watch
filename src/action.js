
class Action {	
    constructor(scene, title, fn) {    	
    	this.scene = scene;
    	this.title = title;
    	this.fn = fn.bind(scene.feature.impl);
    }

    get Fn() {
    	return this.fn;
    }
}

export default Action;
