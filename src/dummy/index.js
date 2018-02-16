const VirtualMachine = require('../virtualmachine');

class DummyVMManager {
	listHosts() {
		let vm = new VirtualMachine();
		vm.name = 'test';
		vm.type = 'dummy';
		vm.powerOn = () => {
			return new Promise( (resolve, reject)=> {
				setTimeout(resolve, 1000);
			});
		};
		vm.powerOff = () => {
			return new Promise( (resolve, reject)=> {
				setTimeout(resolve, 1000);
			});
		};
		return Promise.resolve([vm]);
	}
}

module.exports = DummyVMManager;
