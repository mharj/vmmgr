class VirtualMachine {
	constructor(id) {
		this.id = id;
		this.name = null;
		this.location = null;
		this.type = null;
	}
	powerOn() {
		return Promise.reject('not implemented');
	}
	powerOff() {
		return Promise.reject('not implemented');
	}
}

module.exports = VirtualMachine;
