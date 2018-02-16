
const url = require('url');

class VMManager {
	constructor(urlString, options) {
		let p = url.parse(urlString);
		let VMM = require('./'+p.protocol.replace(/:$/, ''));
		this.vmm = new VMM(options);
	}
	listHosts() {
		return this.vmm.listHosts();
	}
}

module.exports = VMManager;
