
class Report {
	static _reports = [];

    static reset() {
    	Report._reports = [];
    }

    static report() {
    	return 'Alles goed';
    }
}

export default Report;
