define([], function () {

	var registry = {
			byId: function (id) {
				// TODO: this depends on https://github.com/theintern/intern/issues/92
				this.remote.executeAsync(function (id, resolve) {
					require(['dijit/registry'], function (registry) {
						var widget = registry.byId(id);

						resolve(widget ? widget.domNode : undefined);
					});
				}, [ id ]).then(function (domNode) {
					// TODO: implement and return a RemoteWidget
					console.log('RemoteWidget', domNode);
				});
			},

			byNode: function (node) {
				throw new Error('Not Impelmented');
			},

			findWidgets: function (root, skipNode) {
				throw new Error('Not Impelmented');
			},

			getEnclosingWidget: function (node) {
				throw new Error('Not Impelmented');
			}
		};

	return function RemoteRegistry(remote) {
		if (!remote) {
			throw new Error('RemoteRegistry requires a remote');
		}

		return Object.create(registry, {
			remote: { value: remote }
		});
	};
});
