
import ReportBase from './reportBase';

export default class StepReport extends ReportBase {	
    constructor(title, success, error) {
    	super(title);
    	this.success = success;
    	this.error = error;
    }

    static empty() {
    	return new StepReport();
    }    
}

