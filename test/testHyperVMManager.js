require('chai').should();
const VMManager = require('../src/');
const {TYPE} = require('../src/hyperv');

describe('Hyper-V implementation', function() {
	describe('new', function() {
		it('create VMManager', function(done) {
			new VMManager('hyperv://');
			done();
		});
		it('list vms', function(done) {
			let wmm = new VMManager('hyperv://');
			wmm
				.listHosts()
				.then((hosts) => {
					hosts.should.be.an('array');
					done();
				})
				.catch((err) => {
					done(err);
				});
		});
		it('try get vm status', function(done) {
			this.timeout(60000);
			let wmm = new VMManager('hyperv://');
			wmm
				.listHosts()
				.then((hosts) => {
					hosts[0].getStatus().then((status) => {
						done();
					});
					console.log(hosts);
				})
				.catch((err) => {
					done(err);
				});
		});
		it.skip('try stop/start vm', function(done) {
			this.timeout(60000);
			let wmm = new VMManager('hyperv://');
			wmm
				.listHosts()
				.then((hosts) => {
					hosts.should.be.an('array');
					hosts[0].name.should.be.an('string');
					hosts[0].type.should.be.an('string').and.equal(TYPE);
					hosts[0]
						.powerOff()
						.then(() => hosts[0].powerOn())
						.then(() => done());
				})
				.catch((err) => {
					done(err);
				});
		});
	});
});
