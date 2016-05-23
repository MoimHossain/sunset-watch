
class Report {
	

    showHtml(dom) {
    	var reports = this._core;
		var htmls = [];
		var passedStyle = 'style="color: #0000FF;"';
		var failedStyle = 'style="color: #FF0000;"';
		var passedCount = 0, failedCount = 0;
		for(var x = 0; x < report.length; ++ x) {
			var scenesHtmls = [];
			for(var y=0; y < report[x].sceneReports.length; ++y) {
				var stepReportHtmls = [];
				for(var z=0; z < report[x].sceneReports[y].stepReports.length; ++z) {
					var step = report[x].sceneReports[y].stepReports[z];
					stepReportHtmls.push('<li ' + (step.success === true ? passedStyle : failedStyle) + '>' + (step.success === true ? ' ' : 'X') + step.title + '</li>');
					step.success === true ? ++passedCount : ++failedCount;
				}				
				scenesHtmls.push('<p style="padding-left:20px;"> - Scenario: ' + report[x].sceneReports[y].title + '</p>');
				scenesHtmls.push('<ul>' + stepReportHtmls.join('') + '</ul>');
			}
			htmls.push('<p><strong> # Feature: ' + report[x].title + '</strong>' + '<p>' + scenesHtmls.join('') + '</p>' + '</p>');			
		}
		htmls.push('<p>Total ' + (passedCount + failedCount) + ' step(s) executed, ' + passedCount + ' passed, and ' + failedCount + ' failed.</p>')
		$(dom || document.body)
			.append('<div style="overflow-y: scroll; width: 600px; height: 90%; position: absolute;top: 20px;left: 20px;border: 1px solid black;padding: 5px;z-index: 999999;background-color: #E0E0F8;">' + htmls.join('') + '</div>');    	
    }

    costructor(obj) {
    	this._core = obj;
    }
}


export default Report;
