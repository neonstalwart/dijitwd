define([], function () {

	// TODO: implement startup, destroyRecursive, destroy, destroyDescendants, get, set,
	// getChildren, getParent
	function RemoteWidget(domNode) {
		if (domNode == null) {
			throw new Error('A RemoteWidget needs a domNode');
		}

		return Object.create(null, {
			domNode: { value: domNode }
		});
	}

	return RemoteWidget;
});
