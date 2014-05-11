angular.module('Account').
	controller('TimelineController', ['$scope', 'UserFactory', function($scope, UserFactory){
		var $local = $scope.Timeline = {};

		UserFactory($scope).historic(function(data) {
			var witness = true;
			for(var i = 0; i<data.length; i++) {
				data[i].date = new Date(data[i].date);
				data[i].message = data[i].owner;
				data[i].message += data[i].owner == 'You' ? ' have ' : ' has ';
				witness = true;
				switch(data[i].action) {
					case 'delete': 
						data[i].message += 'deleted ';
					break;
					case 'create':
						data[i].message += data[i].itemType == 'folder' ? 'created ' : 'uploaded ';
					break;
					case 'share':
						data[i].message += 'shared "/'+ data[i].fullPath.split('/').pop() + '" to ';
					break;
					case 'unshare':
						data[i].message += 'stoped the sharing of "/'+ data[i].fullPath.split('/').pop() + '" ';
						witness = false;
					break;
					case 'rename':
						data[i].message += 'renamed "/'+ data[i].fullPath.split('/').pop() + '" to ';
					break;
				}
				if(witness)
					data[i].message += '"'+ data[i].name +'"';
			}
			$local.events = data;
		});

		$scope.toString = function() {
			return 'Timeline';
		}
	}])