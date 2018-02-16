class DummyVMManager {
	listHosts() {
		return Promise.resolve([{name: 'test'}]);
	}
}

module.exports = DummyVMManager;
