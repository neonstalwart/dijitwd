define([
	'intern!object',
	'intern/chai!assert',
	'../../lib/RemoteRegistry'
], function (test, assert, RemoteRegistry) {

	var registry,
		TEST_URL = 'http://download.dojotoolkit.org/release-1.9.1/dojo-release-1.9.1/dijit/tests/test_Dialog.html';

	return test({
		name: 'RemoteRegistry',

		setup: function () {
			registry = new RemoteRegistry(this.remote);
		},

		// TODO: turn this into an object to test various conditions byId should handle
		//	* no widget with provided id - should return undefined
		//	* widget found - should return a RemoteWidget
		byId: function () {
			return this.remote.get(TEST_URL).then(function () {
				return registry.byId('dialog1');
			}).then(function (dialog1) {
				assert('domNode' in dialog1, 'registry.byId should return RemoteWidget');
			});
		},

		byNode: function () {
			return this.remote.get(TEST_URL)
				.elementByCssSelector('[widgetid=dialog1]').then(function (node) {
					return registry.byNode(node);
				}).then(function (dialog1) {
					assert('domNode' in dialog1, 'registry.byNode should return RemoteWidget');
				});
		},

		findWidgets: function () {
			assert(false, 'Test Not Implemented');
		},

		getEnclosingWidget: function () {
			assert(false, 'Test Not Implemented');
		}
	});
});
