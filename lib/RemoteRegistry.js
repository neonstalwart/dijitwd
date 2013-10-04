define([
	'./RemoteWidget'
], function (RemoteWidget) {

	var registry = {
			byId: function (id) {
				return this.remote.executeAsync(function (id, resolve) {
					require(['dijit/registry'], function (registry) {
						var widget = registry.byId(id);

						resolve(widget ? widget.domNode : undefined);
					});
				}, [ id ]).then(function (domNode) {
					if (domNode != null) {
						return new RemoteWidget(domNode);
					}
					return domNode;
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

		// TODO: keep a cache of domNode -> RemoteWidget if possible

		return Object.create(registry, {
			remote: { value: remote }
		});
	};
});
