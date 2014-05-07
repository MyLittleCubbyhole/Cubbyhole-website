angular.module('FileManager').
	provider('ItemProvider', function(){

		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null,
			lastUpdate: null,
			size: '',
			owner: '',
			ownerId: '',
			shared: false,
			editMode: false,
			newItem: false,
			_id: -1
		};

		this.$get = function() {

			var Item = function(options) {

				this.options = {};
				_.extend(this.options, _default, options);
				this.name = this.options.name;
				this.path = this.options.path;
				this.category = this.options.category;
				this.icon = this.options.icon;
				this.scope = this.options.scope;
				this._node = null;
				this.node = this.options.node;
				this.lastUpdate = this.options.lastUpdate;
				this.size = this.options.size;
				this.owner = this.options.owner;
				this.ownerId = this.options.ownerId;
				this.shared = typeof this.options.shared !== 'undefined' && this.options.shared === true;
				this.editMode = typeof this.options.editMode !== 'undefined' && this.options.editMode === true;
				this.newItem = typeof this.options.newItem !== 'undefined' && this.options.newItem === true;
				this._id = this.options._id || -1;
				
				options && this.init();
			};

			Item.prototype.init = function() { throw 'init method must be overrided'; };
			Item.prototype.download = function() { throw 'download method must be overrided'; };
			Item.prototype.getPath = function() { throw 'getPath method must be overrided'; };
			Item.prototype.getFullPath = function() { throw 'getFullPath method must be overrided'; };

			Object.defineProperties(Item.prototype, {
				'node' : {
					get : function() {
						return this._node;
					},
					set : function(node) {
						this._node = angular.element(node);
					}
				}
			});

			return Item;
		};
	})