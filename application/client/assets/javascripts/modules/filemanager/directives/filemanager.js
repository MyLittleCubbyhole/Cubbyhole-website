var filemanager = angular.module('Filemanager').
    directive('filemanager', ['$location', '$route', 'extension', 'UserService', 'baseUrl', 'Restangular', function($location, $route, extension, UserService, baseUrl, Restangular) {
        return {
            scope: true,
            restrict: 'E',
            templateUrl: 'templates/filemanager',
            replace: true,
            require: 'filemanager',
            controller: function($scope) {
                var $local = $scope._filemanager = {};

                var self = this;
                var isUnselectPossible = true;
                var download = Restangular.one('download').one(UserService.id);
                var browse = Restangular.one('browse').one(UserService.id + '/');

                var filenamePattern = /^[a-zA-Z0-9!@$%^&()_+\-=\[\]{}'",;.\s]*$/;

                var newFolderJSON = null;
                var renameJSON = null;
                var fileToRename = null;

                $local.orderExpr = ['-type', 'name'];

                $local.fileSelected = null;

                $local.showModal = false;

                $local.unselectAll = function() {
                    isUnselectPossible ? $local.fileSelected = null : isUnselectPossible = true;

                    $local.showModal = false;

                    var newFolder = document.getElementById('newFolder');
                    if(newFolder) {
                        var input = newFolder.firstChild;
                        if(input.value !== undefined) {
                            if(input.value.length !== 0) {
                                createNewFolder(input.value);
                            } else {
                                deleteNewFolderFromDom();
                            }
                        }
                    }

                    var renameItem = document.getElementById('renameItem');
                    if(renameItem) {
                        var input = renameItem.firstChild;
                        if(input.value !== undefined) {
                            if(input.value.length !== 0) {
                                doRename(fileToRename, input.value);
                            } else {
                                modifyRenameItemFromDom(false);
                            }
                        }
                    }
                };
                $local.selectItem = function(file) {
                    if(file.id != "newFolder") {
                        $local.fileSelected = file;
                    }
                };
                $local.isSelected = function(file) {
                    return $local.fileSelected === file;
                };
                $local.isSomethingSelected = function() {
                    return $local.fileSelected;
                };
                $local.isFolderSelected = function() {
                    return $local.fileSelected && $local.fileSelected.type == "folder";
                };

                $local.isChildFolder = function() {
                    return $local.path;
                };

                $local.openItem = function(file) {
                    if(file !== null) {

                        var path = "";
                        if($local.path !== undefined && $local.path !== "") {
                            path = $local.path + "/";
                        }

                        path += file.name;

                        if(file.type == "folder") {
                            $location.path('/browse').search('path=' + path);
                        } else {
                            $local.showModal = true;
                            $local.file = file;
                            extension.detect($local);
                            $local.resourceUrl = baseUrl + 'download/' + UserService.id + '/' + path;
                        }

                    }
                };

                $local.orderBy = function(attribute) {
                    if($local.orderExpr[1] == attribute) {
                        if(attribute.charAt(0) == "-")
                            $local.orderExpr[1] = attribute.substring(1);
                        else
                            $local.orderExpr[1] = "-" + attribute;
                    } else
                        $local.orderExpr[1] = attribute;

                    if($local.orderExpr[1].indexOf("name") != -1)
                        $local.orderExpr[0] = "-type";
                    else
                        $local.orderExpr[0] = "";
                };

                $local.goBack = function() {
                    var path = "";
                    if($local.path !== undefined && $local.path.indexOf("/") != -1) {
                        path = $local.path;
                        path = path.substring(0, path.lastIndexOf("/"));
                    }

                    $location.path('/browse').search('path=' + path);
                };

                $local.refresh = function() {
                    $route.reload();
                };

                $local.download = function() {
                    $local.clickFile(null);
                };

                $local.clickFile = function(file) {
                    isUnselectPossible = false;

                    var fileClicked = null;
                    file ? fileClicked = file : fileClicked = $local.fileSelected;

                    if(fileClicked !== null && fileClicked.id != "renameItem") {

                        var path = "";
                        if($local.path !== undefined && $local.path !== "") {
                            path = $local.path + "/";
                        }

                        path += fileClicked.name;

                        if(fileClicked.type != "folder") {
                            var hiddenElement = document.createElement('a');
                            hiddenElement.href = baseUrl + 'download/' + UserService.id + '/' + path;
                            hiddenElement.download = fileClicked.name;
                            hiddenElement.click();
                        } else {
                            $location.path('/browse').search('path=' + path);
                        }
                    }
                };

                $local.rename = function() {
                    if(document.getElementById('renameItem') === null) {

                        fileToRename = $local.fileSelected;

                        if(fileToRename !== null) {
                            renameJSON = {id:"renameItem",name:fileToRename.name,type:fileToRename.type};

                            var index = $local.files.indexOf(fileToRename);
                            $local.files.splice(index, 1);
                            $local.files.push(renameJSON);

                            var interval = window.setInterval(function(){
                                var renameItem = $('#renameItem');
                                if(renameItem) {
                                    window.clearInterval(interval);
                                    renameItem.html("<input type=\"text\" class=\"edit-item\" value=\""+fileToRename.name+"\">");
                                    renameItem.children().focus();
                                    renameItem.children().keyup(function(event){
                                        if(event.keyCode == 13){
                                            doRename(fileToRename, renameItem.children().val());
                                        }
                                    });
                                }
                            },50);
                        }
                    }
                };

                var doRename = function(item, newName) {
                    if(newName.match(filenamePattern)) {

                        var path = "";
                        if($local.path !== undefined && $local.path !== "") {
                            path = $local.path + "/";
                        }

                        path += item.name;

                        browse.one(path).customPUT({name:newName}).then(function(content) {
                            if(content.information !== null && content.information.indexOf('error') == -1) {
                                var renamedItem = {id:item.id,name:newName,type:item.type,content:[],sharing:[]};
                                $local.files.push(renamedItem);
                                modifyRenameItemFromDom(true);
                            } else {
                                if(content.information.indexOf("exist") != -1) {
                                    window.alert("This file already exists.");
                                } else {
                                    console.error(content);
                                }
                                modifyRenameItemFromDom(false);
                            }
                        }, function(error) {
                            console.error(error);
                        });
                    } else {
                        window.alert("This name is invalid.");
                    }
                };

                var modifyRenameItemFromDom = function(doDelete) {
                    var index = $local.files.indexOf(renameJSON);
                    $local.files.splice(index, 1);
                    if(!doDelete) {
                        $local.files.push(fileToRename);
                    }
                    fileToRename = null;
                };

                $local.remove = function() {
                    var fileToDelete = $local.fileSelected;

                    if(fileToDelete !== null) {

                        var path = "";
                        if($local.path !== undefined) {
                            path = $local.path + "/";
                        }

                        path += fileToDelete.name;

                        if(window.confirm("Do you really want to delete this " + fileToDelete.type + " ?")) {
                            browse.one(path).remove().then(function(content) {
                                if(content.information !== null && content.information.indexOf('error') == -1) {
                                    var index = $local.files.indexOf(fileToDelete);
                                    $local.files.splice(index, 1);
                                } else {
                                    console.error(content);
                                }
                            }, function(error) {
                                console.error(error);
                            });
                        }
                    }
                };

                $local.newFolder = function() {
                    if(document.getElementById('newFolder') === null) {
                        $local.orderExpr[0] = "-type";
                        $local.orderExpr[1] = "name";

                        newFolderJSON = {"id":"newFolder","name":"","type":"folder"};

                        $local.files.push(newFolderJSON);

                        var interval = window.setInterval(function(){
                            var newFolder = $('#newFolder');
                            if(newFolder) {
                                window.clearInterval(interval);
                                newFolder.html("<input type=\"text\" class=\"edit-item\">");
                                newFolder.children().focus();
                                newFolder.children().keyup(function(event){
                                    if(event.keyCode == 13){
                                        createNewFolder(newFolder.children().val());
                                    }
                                });
                            }
                        },50);
                    }
                };

                var createNewFolder = function(folderName) {
                    if(folderName.match(filenamePattern)) {

                        var folderUrl = browse;
                        if($local.path !== undefined && $local.path !== "") {
                            var path = $local.path + "/";
                            folderUrl = folderUrl.one(path);
                        }

                        folderUrl.post("", {name:folderName}).then(function(content) {
                            if(content.information !== null && content.information.indexOf('error') == -1) {
                                var folder = {name:folderName,type:"folder",content:[],sharing:[]};
                                $local.files.push(folder);
                            } else {
                                if(content.information.indexOf("exist") != -1) {
                                    window.alert("This folder already exists.");
                                } else {
                                    console.error(content);
                                }
                            }
                            deleteNewFolderFromDom();
                        }, function(error) {
                            console.error(error);
                        });
                    } else {
                        window.alert("Folder name is invalid.");
                    }
                };

                var deleteNewFolderFromDom = function() {
                    var index = $local.files.indexOf(newFolderJSON);
                    $local.files.splice(index, 1);
                };
            },
            link: function($scope, $node, attributes, self) {
                var $local = $scope._filemanager;

                $local.path = $scope.fileController.path;
                $local.files = [];

                $scope.$watch('fileController.files', function(files) {
                    $local.files = files;
                });
            }
        };
    }]);