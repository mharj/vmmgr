const VirtualMachine = require('../virtualmachine');
const Shell = require('node-powershell');
const TYPE = 'Hyper-V';
const STATES = {
	// TODO: map with general VM states here
	'2': 'RUNNING',
};

function getVmInfo(options) {
	const {hostname} = options;
	return new Promise((resolve, reject) => {
		let statusPs = new Shell({
			executionPolicy: 'Bypass',
			noProfile: true,
			debugMsg: false,
		});
		statusPs.addCommand('Get-VM -Name ' + hostname + ' | ConvertTo-Json');
		statusPs
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

class HyperVMManager {
	listHosts() {
		return new Promise((resolve, reject) => {
			let vmList = [];
			let ps = new Shell({
				executionPolicy: 'Bypass',
				noProfile: true,
				debugMsg: false,
			});
			ps.addCommand('Get-WmiObject -Class Msvm_ComputerSystem -Namespace "root\\virtualization\\v2" | ConvertTo-Json');
			ps
				.invoke()
				.then((output) => {
					try {
						let obj = JSON.parse(output);
						obj.forEach((vmiVM) => {
							if (vmiVM.Caption === 'Virtual Machine') {
								console.log(vmiVM);
								let vm = new VirtualMachine(vmiVM.Id); // TODO: get VMId with "Get-VM"
								vm.name = vmiVM.ElementName;
								vm.type = TYPE;
								vm.host = vmiVM.__SERVER;
								vm.powerOn = () => {
									return new Promise((resolve, reject) => {
										let powerOnPs = new Shell({
											executionPolicy: 'Bypass',
											noProfile: true,
											debugMsg: false,
										});
										powerOnPs.addCommand('Start-VM -Name ' + vmiVM.ElementName);
										powerOnPs
											.invoke()
											.then((output) => {
												resolve();
											})
											.catch((err) => {
												ps.dispose();
												reject(err);
											});
									});
								};
								vm.powerOff = () => {
									return new Promise((resolve, reject) => {
										let powerOffPs = new Shell({
											executionPolicy: 'Bypass',
											noProfile: true,
											debugMsg: false,
										});
										powerOffPs.addCommand('Stop-VM -Name ' + vmiVM.ElementName);
										powerOffPs
											.invoke()
											.then((output) => {
												resolve();
											})
											.catch((err) => {
												ps.dispose();
												reject(err);
											});
									});
								};
								vm.getStatus = () => {
									return getVmInfo({hostname: vmiVM.ElementName}).then((info) => {
										return info.State;
									});
								};
								vmList.push(vm);
							}
						});
						resolve(vmList);
						//	console.log(vmList);
					} catch (err) {
						throw err;
					}
				})
				.catch((err) => {
					ps.dispose();
					reject(err);
				});
		});
	}
}

module.exports = HyperVMManager;
module.exports.TYPE = TYPE;
