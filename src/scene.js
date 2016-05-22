
import Action from './action';
import Behaviors from './behaviors';

class Scene {	
    constructor(feature, title) {
    	this.feature = feature;
    	this.title = title;
    	this._actions = [];
    }

    get actions() {
        return this._actions;
    }

    _findAction(title) {    	
    	var scope = this;
    	var scenes = this.feature.impl.getStepDefinitions();
    	var foundAction = null;
    	scenes.forEach(scene => {
    		if(scene.title === scene.title) {
    			scene.steps.forEach(step => {
    				if(step.title === title) {
    					foundAction = step.fn;
    				}
    			})
    		}
    	});
    	return foundAction;
    }

    _addAction(title, action) {
    	action = action || this._findAction(title);

    	if(!action) {
    		Behaviors.RaiseError([
    			'Step definition not found!',
    			'Feature: ' + this.feature.title,
    			'Scenario: ' + this.title,
    			'Step: ' + title
    			]);
    	}    	
    	this._actions.push(new Action(this, title, action));
    }

    Given(title, action) {
    	this._addAction(title, action);
    	return this;
    }

    When(title, action) {
    	this._addAction(title, action);
    	return this;
    }

    Then(title, action) {
    	this._addAction(title, action);
    	return this;
    }        

    And(title, action) {
    	this._addAction(title, action);
    	return this;
    }

    End() {
        return this.feature;
    }
}

export default Scene;
