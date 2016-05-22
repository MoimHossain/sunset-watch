
import Feature from './feature';
import StepReport from './reports/stepReport';
import SceneReport from './reports/sceneReport';
import FeatureReport from './reports/featureReport';

import Report from './report';

export default class Runtime {
	static runFeature(feature, onCompleted) {
		if(!feature) {
			onCompleted(FeatureReport.empty());
			return;
		}
		Runtime.runListAsync(
			feature.scenes, 
			Runtime.runScene, (sceneReports) => {
				onCompleted(new FeatureReport(feature.title, sceneReports));
			});
	}

	static runScene(scene, onCompleted) {
		if(!scene) {
			onCompleted(SceneReport.empty());
			return;			
		}

		Runtime.runListAsync(
			scene.actions,
			Runtime.runAction, (stepReports) => {
				onCompleted(new SceneReport(scene.title, stepReports));
			});
	}

	// TODO: if an action failed inside, a timeout should keep the runtime executing forward
	static runAction(action, onCompleted) {		
		let fn = (action && action.Fn) ? action.Fn : null;
		if(!fn) {
			onCompleted(StepReport.empty());
			return;			
		}
		try {
			//console.log('# Run: ' + action.title);
			fn((result) => {			
				onCompleted(new StepReport(action.title, (result !== false)));
			});
		} catch (error) {
			onCompleted(new StepReport(action.title, (false), error));
		}

	}

	static runListAsync(list, runFn, onCompleted) {		
		let index = 0;
		let reports = [];		
		var count = list.length;

		if(count <= 0) {
			onCompleted(reports);
			return;
		}		
		let loop = () => {
			runFn(
				list[index], (report) => {
					if(report && !report.isEmpty) {
						reports.push(report);
					}					
					if(index >= count) {
						onCompleted(reports);
					} else {
						++index;
						loop();
					}
				});
		};
		loop();
	}	
}