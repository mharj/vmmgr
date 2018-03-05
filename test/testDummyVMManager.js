require('chai').should();
const VMManager = require('../src/');

describe('Dummy implementation', function() {
	describe('new', function() {
		it('create VMManager', function(done) {
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
		it('try start/stop vm', function(done) {
			this.timeout(5000);
			let wmm = new VMManager('dummy://');
			wmm.listHosts()
				.then( (hosts) => {
					hosts.should.be.an('array');
					hosts[0].name.should.be.an('string');
					hosts[0].powerOn()
						.then( () => hosts[0].powerOff() )
						.then( () => done() );
				});
		});
	});
});
