
import ReportBase from './reportBase';

export default class FeatureReport extends ReportBase {	
    constructor(title, sceneReports) {
    	super(title);
    	this.sceneReports = sceneReports;
    }

    static empty() {
    	return new FeatureReport();
    }
}
