

import Behaviors from './behaviors';
import Feature from './feature';
import StepDefinitions from './step';
import DOM from './dom/dom';

var BDD = {
		Behaviors: Behaviors,
		Feature: Feature,
		StepDefinitions: StepDefinitions,
		DOM: DOM
	};

if(window && window.document) {
	window.BDD = BDD;
}

export default "MOIMSUNSET";
