
export default class ReportBase {	
    constructor(title) {
    	this.title = title;
    }

    get isEmpty() {
    	return !((this.title && this.title.length > 0) === true);
    }
}
