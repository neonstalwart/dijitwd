define([
	'intern!object',
	'intern/chai!assert',
	'../../lib/RemoteRegistry'
], function (test, assert, RemoteRegistry) {

	var registry,
		DIALOG_TEST_URL = 'http://download.dojotoolkit.org/release-1.9.1/dojo-release-1.9.1/dijit/tests/test_Dialog.html';

	return test({
		name: 'RemoteRegistry',

		setup: function () {
			registry = new RemoteRegistry(this.remote);
		},

		// TODO: turn this into an object to test various conditions byId should handle
		//	* no widget with provided id - should return undefined
		//	* widget found - should return a RemoteWidget
		byId: function () {
			return this.remote.get(DIALOG_TEST_URL).then(function () {
				return registry.byId('foo');
			}); // TODO: assertions
		},

		byNode: function () {
			assert(false, 'Test Not Implemented');
		},

		findWidgets: function () {
			assert(false, 'Test Not Implemented');
		},

		getEnclosingWidget: function () {
			assert(false, 'Test Not Implemented');
		}
	});
});
