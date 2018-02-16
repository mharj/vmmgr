require('chai').should();
const VMManager = require('../src/');

describe('Dummy implementation', function() {
	describe('new', function() {
		it('asd', function(done) {
			new VMManager('dummy://');
			done();
		});
		it('list vms', function(done) {
			let wmm = new VMManager('dummy://');
			wmm.listHosts()
				.then( (hosts) => {
					hosts.should.be.an('array');
					done();
				});
		});
	});
});
