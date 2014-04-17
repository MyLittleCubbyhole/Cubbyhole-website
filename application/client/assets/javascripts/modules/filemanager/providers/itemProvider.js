angular.module('FileManager').
	provider('ItemProvider', function(){

		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null
		};

		this.$get = function() {

			var Item = function(options) {

				this.options = angular.extend(_default, options);
				this.name = this.options.name;
				this.path = this.options.path;
				this.category = this.options.category;
				this.icon = this.options.icon;
				this.scope = this.options.scope;
				this._node = null;
				this.node = this.options.node;

				options && this.init();
			};

			Item.prototype.init = function() { throw 'init method must be overrided'; };
			Item.prototype.move = function() { throw 'move method must be overrided'; };
			Item.prototype.open = function() { throw 'open method must be overrided'; };
			Item.prototype.rename = function() { throw 'rename method must be overrided'; };
			Item.prototype.remove = function() { throw 'remove method must be overrided'; };
			Item.prototype.preview = function() { throw 'preview method must be overrided'; };

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