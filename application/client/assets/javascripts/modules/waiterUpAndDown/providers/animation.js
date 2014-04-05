angular.module('WaiterUpAndDown').
	provider('Animation', function() {

	var Animation = function(options){ this.init(options); };
	Animation.prototype.init = function(options) {
		options = options || {};
		this.sprite_val;
		this.source_val;
		this.play 		= false;
		this.ready 		= false;
		this.nbFrame 	= 0;
		this.speed 		= options.speed || 100
		this.context 	= options.context || null;
		this.sprite 	= options.sprite || { frames: [], size: { width: 0, height: 0 }, projection: { width: 0, height: 0 } };
		this.source 	= options.src || '';
		this.resetFrame = options.frame || 0
		this.frame 		= this.resetFrame;
		this.onload 	= options.onload;
		this.timer 		= null;
	};

	Animation.prototype.start = function() {
		if(!this.ready || this.play)
			return true;
		window.clearTimeout(this.timer);
		this.play = true;
		this.loop();
	};

	Animation.prototype.stop = function(callback) {
		if(!this.ready || !this.play)
			return true;
		this.play = false;
		this.reset();
		callback && callback();
	};

	Animation.prototype.reset = function() {
		this.frame = this.resetFrame;
		this.draw();
	}

	Animation.prototype.loopUntil = function(cooldown, tic, end) {
		var self = this;
		this.frame == this.resetFrame && tic && tic();
		self.draw();
		if( self.play && --cooldown >= 0 )
			this.timer = window.setTimeout(function() { self.ready && self.loopUntil.call(self, cooldown, tic, end); }, self.speed);
		else
			end && end.call(self);
	}

	Animation.prototype.do = function(nbIterations, tic) {
		this.play = true;
		nbIterations = nbIterations +1 || 1;
		window.clearTimeout(this.timer);
		this.loopUntil(this.nbFrame * nbIterations, tic, function() { this.stop(); });
	}

	Animation.prototype.loop = function() {
		var self = this;
		self.draw();
		if(self.play)
			this.timer = window.setTimeout(function() { self.play && self.ready && self.loop(self); }, self.speed);
	};

	Animation.prototype.draw = function() {
		if(!this.ready)
			return false;
		this.context.clearRect(
			0,0,
			this.sprite.size.width,
			this.sprite.size.height
		);
		this.context.drawImage(
			this.source, 
			this.sprite.frames[this.frame].x, 
			this.sprite.frames[this.frame].y, 
			this.sprite.size.width, 
			this.sprite.size.height, 
			0,0,
			this.sprite.projection.width, 
			this.sprite.projection.height
		);
		if(++this.frame > this.nbFrame)
			this.frame = 0;
	};

	Object.defineProperties(Animation.prototype, {
		"sprite": {
			get: function() { return this.sprite_val },
			set: function(value) {
				value.projection.width 	= value.projection && value.projection.width == 0 ? value.size.width : value.projection.width;
				value.projection.height = value.projection && value.projection.height == 0 ? value.size.height : value.projection.height;
				this.nbFrame 	= value.frames.length - 1;
				this.sprite_val = value;
			}
		},
		"source": {
			get: function() { return this.source_val },
			set: function(value) {
				var self = this;
				self.ready = false;
				self.source_val = new Image();
				self.source_val.src = value;
				self.source_val.onload = function() { 
					if(self.context)
						self.ready = true;
					self.onload && self.onload(self);
				} 
			}
		}
	});

    this.$get = function () { return Animation; };
})