define([
	'./RemoteWidget'
], function (RemoteWidget) {

	function createRemoteWidget(domNode) {
		if (domNode != null) {
			return new RemoteWidget(domNode);
		}
		return domNode;
	}

	var registry = {
			byId: function (id) {
				return this.remote.executeAsync(function (id, send) {
					require(['dijit/registry'], function (registry) {
						var widget = registry.byId(id);

						send(widget ? widget.domNode : undefined);
					});
				}, [ id ]).then(createRemoteWidget);
			},

			byNode: function (node) {
				// TODO: centralize this by augmenting wd/element.prototype somewhere else
				// XXX: allow nodes to be serialized https://github.com/admc/wd/pull/185
				if (!node.toJSON) {
					node.__proto__.toJSON = function () {
						return {
							ELEMENT: this.value
						};
					};
				}

				return this.remote.executeAsync(function (node, send) {
					require(['dijit/registry'], function (registry) {
						var widget = registry.byNode(node);

						send(widget ? widget.domNode : undefined);
					});
				}, [ node ]).then(createRemoteWidget);
			},

			findWidgets: function (root, skipNode) {
				return this.remote.executeAsync(function (root, skipNode, send) {
					require(['dijit/registry'], function (registry) {
						var widgets = registry.findWidgets(root, skipNode),
							output = [];

						while (widgets.length) {
							output.push(widgets.shift().domNode);
						}

						send(output);
					});
				}, [ root, skipNode ]).then(function (nodes) {
					return nodes.map(createRemoteWidget);
				});
			},

			getEnclosingWidget: function (node) {
				return this.remote.executeAsync(function (node, send) {
					require(['dijit/registry'], function (registry) {
						var widget = registry.getEnclosingWidget(node);

						send(widget ? widget.domNode : undefined);
					});
				}, [ node ]).then(createRemoteWidget);
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
