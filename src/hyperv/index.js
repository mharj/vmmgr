const VirtualMachine = require('../virtualmachine');
const Shell = require('node-powershell');
const TYPE = 'Hyper-V';
const STATES = {
	// TODO: map with general VM states here
	'2': 'RUNNING',
};

function psJsonWrapper(cmd, options) {
	if (!options) {
		options = [];
	}
	return new Promise((resolve, reject) => {
		let ps = new Shell({
			executionPolicy: 'Bypass',
			noProfile: true,
			debugMsg: false,
		});
		ps.addCommand(`${cmd} | ConvertTo-Json`, options);
		ps
			.invoke()
			.then((output) => {
				resolve(JSON.parse(output));
			})
			.catch((err) => {
				ps.dispose();
				reject(err);
			});
	});
}

function powerOffVM(options) {
	const {hostname} = options;
	return psJsonWrapper('Stop-VM -Name ' + hostname);
}

function powerOnVM(options) {
	const {hostname} = options;
	return psJsonWrapper('Start-VM -Name ' + hostname);
}

function getVmInfo(options) {
	const {hostname} = options;
	return psJsonWrapper('Get-VM -Name ' + hostname);
}

function getVmList(options) {
	return psJsonWrapper('Get-WmiObject -Class Msvm_ComputerSystem -Namespace "root\\virtualization\\v2"').then((vmList) =>
		vmList.filter((e) => e.Caption === 'Virtual Machine'),
	);
}

class HyperVMManager {
	listHosts() {
		return new Promise((resolve, reject) => {
			let promises = []; // TODO
			getVmList().then((vmBases) => {
				vmBases.forEach( async (vmiVM) => { 
					let vmInfo = await getVmInfo({hostname: vmiVM.ElementName});
					let vm = new VirtualMachine(vmInfo.Id); // TODO: get VMId with "Get-VM"
					vm.name = vmiVM.ElementName;
					vm.type = TYPE;
					vm.host = vmiVM.__SERVER;
					vm.powerOn = () => {
						return powerOnVM({hostname: vmiVM.ElementName});
					};
					vm.powerOff = () => {
						return powerOffVM({hostname: vmiVM.ElementName});
					};
					vm.getStatus = () => {
						return getVmInfo({hostname: vmiVM.ElementName}).then((info) => {
							return info.State;
						});
					};
					vmList.push(vm);
				});
			});
			console.log(vmList)
			resolve(vmList);
		});
	}
}

module.exports = HyperVMManager;
module.exports.TYPE = TYPE;
