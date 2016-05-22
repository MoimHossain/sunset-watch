
class Report {
	

    static reset() {
    	Report._reports = [];
    }

    static report() {
    	return 'Alles goed';
    }
}

Report._reports = [];

export default Report;
