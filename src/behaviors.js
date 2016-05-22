
import Runtime from './runtime';
import Report from './report';

export default class Behaviors {
	static _allFeatures = [];

	static RaiseError(lines) {
		var message = (lines || []).join('\n');
		//throw message;
		console.log(message);		
	}

	static run(onCompleted) {
		Report.reset();
		Runtime.runListAsync(
			Behaviors._allFeatures, 
			Runtime.runFeature, 
			(reports) => {
				onCompleted(reports);
			});
	}
}