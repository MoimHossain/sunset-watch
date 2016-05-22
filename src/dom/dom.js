
import $ from 'jquery';
import events from './events';

class DomEl {

	static Selectors = {
		id: 'ID',
		'css' : 'CSS'
	};

	static defaults = {
		timeout: 2000
	};

	constructor(selector, selectorType) {
		this.selector = selector;
		this.selectorType = selectorType;

		this.createFluentFuncs();
	}

	click(next) {
		let el = this.__getDomEl();
		if(el) {
			el.click();
		}
		next((el != null));
	}

	sendKeys(keys, next) {
		let el = this.__getDomEl();
		if(el) {
			el.value = ''; // clean existing values
			$(el).autotype(keys, {delay: 1});
			el.dispatchEvent(new Event('input', { bubbles: true }));
		}
		next((el != null));		
	}

	createFluentFuncs() {
		var scope = this;
		scope.to = {
			be: {
				present: function (onCompleted, timeout) {					
					DomEl.__runTimeBoundTask(()=> {
						return scope.__getDomEl() != null;
					}, timeout, function(success) {
						onCompleted(success === true ? scope : null);
					});
				}
			}
		};
	}

	__getDomEl() {
		if(this.selectorType = DomEl.Selectors.id) {
			return document.getElementById(this.selector);
		} else if(this.selectorType = DomEl.Selectors.css) {
			// not implemented yet
		} else {
			return document.getElementById(this.selector)
		}
	}

	static keydown(k) {
	    var oEvent = document.createEvent('KeyboardEvent');

	    // Chromium Hack
	    Object.defineProperty(oEvent, 'keyCode', {
	                get : function() {
	                    return this.keyCodeVal;
	                }
	    });     
	    Object.defineProperty(oEvent, 'which', {
	                get : function() {
	                    return this.keyCodeVal;
	                }
	    });     

	    if (oEvent.initKeyboardEvent) {
	        oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
	    } else {
	        oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
	    }

	    oEvent.keyCodeVal = k;

	    if (oEvent.keyCode !== k) {
	        alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
	    }

	    document.dispatchEvent(oEvent);		
	}

	static __runTimeBoundTask(runFn, timeout, onCompleted) {
		var counter = 0, frequency = 50;
		timeout = (timeout || DomEl.defaults.timeout);
		
		var timeFunc = setInterval(function() {
			counter += frequency;
			if(runFn() === true) {
				clearInterval(timeFunc);
				onCompleted(true);
			} else {
				if(counter >= timeout) {
					clearInterval(timeFunc);
					onCompleted(false);
				}
			}
		}, frequency);
	}
}

export default class DOM {

	static by = {
		id(did) {
			return new DomEl(did, DomEl.Selectors.id);
		}
	};
}