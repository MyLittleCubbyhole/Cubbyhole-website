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
						data[i].icon = 'icon-times';
						data[i].message += 'deleted "'+ data[i].name +'"';
					break;
					case 'create':
						data[i].icon = 'icon-cloud-upload';
						data[i].message += (data[i].itemType == 'folder' ? 'created ' : 'uploaded ') + '"'+ data[i].name +'" in ' + data[i].fullPath.substring(1,data[i].fullPath.lastIndexOf('/')) + '/' ;
					break;
					case 'share':
						data[i].icon = 'icon-link';
						data[i].message += 'shared "/'+ data[i].fullPath.split('/').pop() + '" with ';
						if(data[i].targetOwner == 'You' && data[i].name != 'Public' && data[i].name == '')
							data[i].message +=  'you';
						else
							data[i].message += '"'+ data[i].name +'"';
					break;
					case 'unshare':
						data[i].icon = 'icon-link';
						data[i].message += 'stoped the sharing of "/'+ data[i].fullPath.split('/').pop() + '" with you ';
					break;
					case 'rename':
						data[i].icon = 'icon-pencil';
						data[i].message += 'renamed "'+ data[i].fullPath.split('/').pop() + '" to "'+ data[i].name +'"';
					break;
					case 'move':
						data[i].icon = 'icon-chevron-right';
						data[i].message += 'moved "'+ data[i].name + '" in '+ data[i].fullPath;
					break;
				}
			}
			$local.events = data;
		});

		$scope.toString = function() {
			return 'Timeline';
		}
	}])