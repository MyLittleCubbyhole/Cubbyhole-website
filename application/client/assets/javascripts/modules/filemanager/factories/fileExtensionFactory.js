angular.module('FileManager').
	factory('FileExtensionFactory', function() {
		
		/**
		 * mutualisation de service
		 * les parametres de context sont placés dans le premier appel
		 * on peut ainsi attaquer un scope annexe a partir d'un appel local
		 * 
		 * ex: fileExtension($scope, {local: $local, controller: self}).maMethode('parameters', {une config})
		 * 
		 * @param  {$scope} scope   angular scope
		 * @param  {object} context [OPTIONAL] specification du context - peut contenir refs vers $local, $node et controller
		 */
		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};

			prototype.getExtension = function(filename) {
            	return (/(?:\.([^.]+))?$/).exec(filename)[1].toLowerCase();
			}

			prototype.detection = function (file){

				file.icon = "icon-file-css";

				if(file.type == "folder") {
					file.icon = "icon-folder";
					file.category = "folder";
				}
				else {
					
					var extension = prototype.getExtension(file.name);

					switch(extension) {
						// ARCHIVES
						case "zip": case "zipx": case "rar": case "7z": case "apk":
						case "cab": case "sfx": case "ar": case "tar": case "bz2":
						case "tgz": case "jar":
							file.icon = "icon-file-zip";
							file.category = "archive";
						break;
						// IMAGES
						case "jpg": case "jpeg": case "tif": case "bmp": case "gif":
						case "png": case "svg": case "psd": case "ai": case "ico":
							file.icon = "icon-image";
							file.category = "image";
						break;
						// AUDIO
						case "mp3":  case "wav": case "m3u": case "m4a": case "mid": case "mpa":
						case "wma": case "flac": case "aif": case "aifc": case "aiff":
						case "aac": case "swa": case "mid": case "cda":
							file.icon = "icon-music";
							file.category = "audio";
						break;
						// VIDEOS
						case "wmv": case "avi": case "mpg": case "mpeg": case "mov":
						case "3gp": case "dat": case "flv": case "m4v": case "mp4":
						case "ogg": case "mkv": case "vob": case "divx": case "xvid":
							file.icon = "icon-film";
							file.category = "video";
						break;
						// CODE
						case "js": case "html": case "htm": case "xhtml": case "css":
						case "jsp": case "php": case "java": case "xml": case "json":
						case "c": case "cpp": case "h": case "hpp": case "cs":
						case "xaml": case "py": case "asm": case "asp": case "aspx":
						case "lua": case "pl": case "ps1": case "rb": case "vbs":
						case "lisp": case "vb": case "txt":
							file.icon = "icon-file-xml";
							file.category = "text";
						break;
						// DISKS
						case "iso": case "dmg": case "img": case "cdi": case "c2d":
							file.icon = "icon-file";
							file.category = "disk image";
						break;
						// EXE
						case "exe": case "bat": case "sh":
							file.icon = "icon-cog2";
							file.category = "executable";
						break;
						// DOCS
						case "pdf":
							file.icon = "icon-file-pdf";
							file.category = "pdf";
						break;
						case "doc": case "docx": case "docm": case "dot": case "dotx":
						case "odt": case "ott":
							file.icon = "icon-file-word";
							file.category = "text";
						break;
						case "pps": case "ppt": case "pptx": case "odp": case "otp":
							file.icon = "icon-file-powerpoint";
							file.category = "presentation";
						break;
						case "xls": case "xlsx": case "csv": case "ods": case "ots":
							file.icon = "icon-file-excel";
							file.category = "calculation";
						break;
						default:
							file.icon = "icon-file";
							file.category = "file";
						break;
					}


				}
			};

			return prototype;
			
		};
	});