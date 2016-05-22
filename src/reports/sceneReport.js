
import ReportBase from './reportBase';

export default class SceneReport extends ReportBase {	
    constructor(title, stepReports) {
    	super(title);
    	this.stepReports = stepReports;
    }
    
    static empty() {
    	return new SceneReport();
    }    
}
