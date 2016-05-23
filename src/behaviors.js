
import Runtime from './runtime';
import Report from './report';

export default class Behaviors {
	static RaiseError(lines) {
		var message = (lines || []).join('\n');
		//throw message;
		console.log(message);		
	}
	
	static run(onCompleted) {		
		
		Runtime.runListAsync(
			Behaviors._allFeatures, 
			Runtime.runFeature, 
			(reports) => {
				onCompleted(new Report(reports));
			});
	}
}

Behaviors._allFeatures = (Behaviors._allFeatures || []);