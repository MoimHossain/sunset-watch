
import Scene from './scene';
import Behaviors from './behaviors';

class Feature {	

    constructor(title, impl) {
    	this.title = title;
    	this.impl = impl;
    	this.scenarios = [];
    }

    Scenario(title) {
    	var scene = new Scene(this, title);
    	this.scenarios.push(scene);
    	return scene;
    }

    get scenes() {
        return this.scenarios;
    }
}

export default function (title, impl) {
	let feature = new Feature(title, impl);
	Behaviors._allFeatures.push(feature);
	return feature;
};
