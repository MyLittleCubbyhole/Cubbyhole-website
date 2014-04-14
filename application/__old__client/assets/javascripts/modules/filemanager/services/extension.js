angular.module('Filemanager').
    service('extension', function(){
        this.detect = function ($scope){

            $scope.iconClass = "icon-file-css";

            if($scope.file.type == "folder") {
                $scope.iconClass = "icon-folder";
                $scope.file.category = "folder";
            } else {
                var ext = this.getExtension($scope.file.name);

                switch(ext) {
                    // ARCHIVES
                    case "zip": case "zipx": case "rar": case "7z": case "apk":
                    case "cab": case "sfx": case "ar": case "tar": case "bz2":
                    case "tgz": case "jar":
                        $scope.iconClass = "icon-file-zip";
                        $scope.file.category = "archive";
                    break;
                    // IMAGES
                    case "jpg": case "jpeg": case "tif": case "bmp": case "gif":
                    case "png": case "svg": case "psd": case "ai": case "ico":
                        $scope.iconClass = "icon-image";
                        $scope.file.category = "image";
                    break;
                    // AUDIO
                    case "mp3":  case "wav": case "m3u": case "m4a": case "mid": case "mpa":
                    case "wma": case "flac": case "aif": case "aifc": case "aiff":
                    case "aac": case "swa": case "mid": case "cda":
                        $scope.iconClass = "icon-music";
                        $scope.file.category = "audio";
                    break;
                    // VIDEOS
                    case "wmv": case "avi": case "mpg": case "mpeg": case "mov":
                    case "3gp": case "dat": case "flv": case "m4v": case "mp4":
                    case "ogg": case "mkv": case "vob": case "divx": case "xvid":
                        $scope.iconClass = "icon-film";
                        $scope.file.category = "video";
                    break;
                    // CODE
                    case "js": case "html": case "htm": case "xhtml": case "css":
                    case "jsp": case "php": case "java": case "xml": case "json":
                    case "c": case "cpp": case "h": case "hpp": case "cs":
                    case "xaml": case "py": case "asm": case "asp": case "aspx":
                    case "lua": case "pl": case "ps1": case "rb": case "vbs":
                    case "lisp": case "vb": case "txt":
                        $scope.iconClass = "icon-file-xml";
                        $scope.file.category = "text";
                    break;
                    // DISKS
                    case "iso": case "dmg": case "img": case "cdi": case "c2d":
                        $scope.iconClass = "icon-file";
                        $scope.file.category = "disk image";
                    break;
                    // EXE
                    case "exe": case "bat": case "sh":
                        $scope.iconClass = "icon-cog2";
                        $scope.file.category = "executable";
                    break;
                    // DOCS
                    case "pdf":
                        $scope.iconClass = "icon-file-pdf";
                        $scope.file.category = "pdf";
                    break;
                    case "doc": case "docx": case "docm": case "dot": case "dotx":
                    case "odt": case "ott":
                        $scope.iconClass = "icon-file-word";
                        $scope.file.category = "text";
                    break;
                    case "pps": case "ppt": case "pptx": case "odp": case "otp":
                        $scope.iconClass = "icon-file-powerpoint";
                        $scope.file.category = "presentation";
                    break;
                    case "xls": case "xlsx": case "csv": case "ods": case "ots":
                        $scope.iconClass = "icon-file-excel";
                        $scope.file.category = "calculation";
                    break;

                    default:
                        $scope.iconClass = "icon-file";
                        $scope.file.category = "file";
                    break;
                }
            }
        };

        this.getExtension = function(fileName) {
            return (/(?:\.([^.]+))?$/).exec(fileName)[1].toLowerCase();
        };
    });