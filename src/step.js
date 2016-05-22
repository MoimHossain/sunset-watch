
class StepDefinitions {
	
    constructor() {
    	
    }

    wait(milsec, callback) {
    	setTimeout(callback, milsec);
    }
}

export default StepDefinitions;
