angular.module('Annyang').
    factory('ConfigFactory', function() {

        return {

            'open_folder_like': 'open like *term',
            'open_folder': 'open (folder) *term',
            'open_folder_alternative': 'go into (folder) *term',
            'open_parent_folder': 'go back',
            'open_parent_folder_alternative': 'previous',

            'download_file_like': 'download like *term',
            'download_file': 'download (folder) (file) *term',

            'preview_item_like': 'preview like *term',
            'preview_item': 'preview (folder) (file) *term',

            'select_file_like': 'select like *term',
            'select_all': 'select all',
            'select_file': 'select (folder) (file) *term',

            'unselect_file_like': 'unselect like *term',
            'unselect_all': 'unselect all',
            'unselect_file': 'unselect (folder) (file) *term',

            'create_folder': 'create (folder) *term',

            'delete_item': 'delete (folder) (file) *term',

            'rename_item_like': 'rename like *term to *term',
            'rename_item': 'rename (folder) (file) *term to *term',

            'copy': 'copy',
            'paste': 'paste',

            'refresh': 'refresh',

            'harlem_shake_full': '*term please say goodbye',
            'harlem_shake_full_alternative': '*term please say goodbye',
            'harlem_shake_first' : '*term say goodbye',
            'harlem_shake_first_alternative' : '*term say goodbye'


            /*'open_folder_like': 'ouvrir un dossier qui contient *term',
            'open_folder_like_alternative': 'ouvrir un dossier contenant *term',
            'open_folder': 'ouvrir (le) (dossier) *term',
            'open_parent_folder': 'ouvrir le dossier parent',
            'open_parent_folder_alternative': 'précédent',
            'open_parent_folder_alternative2': 'revenir en arrière',
            'open_parent_folder_alternative3': 'retour',


            'download_file_like': 'télécharger un (dossier) (fichier) qui contient *term',
            'download_file_like_alternative': 'télécharger un (dossier) (fichier) contenant *term',
            'download_file_like_alternative2': 'téléchargé un (dossier) (fichier) qui contient *term',
            'download_file_like_alternative3': 'téléchargé un (dossier) (fichier) contenant *term',
            'download_file_like_alternative4': 'téléchargez un (dossier) (fichier) qui contient *term',
            'download_file_like_alternative5': 'téléchargez un (dossier) (fichier) contenant *term',
            'download_file': 'télécharger (le) (dossier) (fichier) *term',
            'download_file_alternative': 'téléchargé (le) (dossier) (fichier) *term',
            'download_file_alternative2': 'téléchargez (le) (dossier) (fichier) *term',


            'preview_item_like': 'prévisualiser un (dossier) (fichier) qui contient *term',
            'preview_item_like_alternative': 'prévisualiser un (dossier) (fichier) contenant *term',
            'preview_item_like_alternative2': 'prévisualisé un (dossier) (fichier) qui contient *term',
            'preview_item_like_alternative3': 'prévisualisé un (dossier) (fichier) contenant *term',
            'preview_item_like_alternative4': 'prévisualisez un (dossier) (fichier) qui contient *term',
            'preview_item_like_alternative5': 'prévisualisez un (dossier) (fichier) contenant *term',
            'preview_item': 'prévisualiser (le) (dossier) (fichier) *term',
            'preview_item_alternative': 'prévisualisé (le) (dossier) (fichier) *term',
            'preview_item_alternative2': 'prévisualisez (le) (dossier) (fichier) *term',
            'preview_item_alternative3': 'aperçu *term',


            'select_file_like': 'sélectionner un dossier qui contient *term',
            'select_file_like_alternative': 'sélectionner un fichier qui contient *term',
            'select_file_like_alternative2': 'sélectionner un dossier contenant *term',
            'select_file_like_alternative3': 'sélectionner un fichier contenant *term',
            'select_file_like_alternative4': 'sélectionné un dossier  qui contient *term',
            'select_file_like_alternative5': 'sélectionné un fichier qui contient *term',
            'select_file_like_alternative6': 'sélectionné un dossier contenant *term',
            'select_file_like_alternative7': 'sélectionné un fichier contenant *term',
            'select_file_like_alternative8': 'sélectionnez un dossier qui contient *term',
            'select_file_like_alternative9': 'sélectionnez un fichier qui contient *term',
            'select_file_like_alternative10': 'sélectionnez un dossier contenant *term',
            'select_file_like_alternative11': 'sélectionnez un fichier contenant *term',

            'select_files_like': 'sélectionner les dossier(s) qui contiennent *term',
            'select_files_like_alternative': 'sélectionner les fichier(s) qui contiennent *term',
            'select_files_like_alternative2': 'sélectionner les dossier(s) contenant *term',
            'select_files_like_alternative3': 'sélectionner les fichier(s) contenant *term',
            'select_files_like_alternative4': 'sélectionné les dossier(s) qui contiennent *term',
            'select_files_like_alternative5': 'sélectionné les fichier(s) qui contiennent *term',
            'select_files_like_alternative6': 'sélectionné les dossier(s) contenant *term',
            'select_files_like_alternative7': 'sélectionné les fichier(s) contenant *term',
            'select_files_like_alternative8': 'sélectionnez les dossier(s) qui contiennent *term',
            'select_files_like_alternative9': 'sélectionnez les fichier(s) qui contiennent *term',
            'select_files_like_alternative10': 'sélectionnez les dossier(s) contenant *term',
            'select_files_like_alternative11': 'sélectionnez les fichier(s) contenant *term',

            'select_file': 'sélectionner (le) (dossier) (fichier) *term',
            'select_file_alternative': 'sélectionné (le) (dossier) (fichier) *term',
            'select_file_alternative2': 'sélectionnez (le) (dossier) (fichier) *term',

            'unselect_file_like': 'désélectionner un dossier qui contient *term',
            'unselect_file_like_alternative': 'désélectionner un fichier qui contient *term',
            'unselect_file_like_alternative2': 'désélectionner un dossier contenant *term',
            'unselect_file_like_alternative3': 'désélectionner un fichier contenant *term',
            'unselect_file_like_alternative4': 'désélectionné un dossier qui contient *term',
            'unselect_file_like_alternative5': 'désélectionné un fichier qui contient *term',
            'unselect_file_like_alternative6': 'désélectionné un dossier contenant *term',
            'unselect_file_like_alternative7': 'désélectionné un fichier contenant *term',
            'unselect_file_like_alternative8': 'désélectionnez un dossier qui contient *term',
            'unselect_file_like_alternative9': 'désélectionnez un fichier qui contient *term',
            'unselect_file_like_alternative10': 'désélectionnez un dossier contenant *term',
            'unselect_file_like_alternative11': 'désélectionnez un fichier contenant *term',

            'unselect_files_like': 'désélectionner les dossier(s) qui contiennent *term',
            'unselect_files_like_alternative': 'désélectionner les fichier(s) qui contiennent *term',
            'unselect_files_like_alternative2': 'désélectionner les dossier(s) contenant *term',
            'unselect_files_like_alternative3': 'désélectionner les fichier(s) contenant *term',
            'unselect_files_like_alternative4': 'désélectionné les dossier(s) qui contiennent *term',
            'unselect_files_like_alternative5': 'désélectionné les fichier(s) qui contiennent *term',
            'unselect_files_like_alternative6': 'désélectionné les dossier(s) contenant *term',
            'unselect_files_like_alternative7': 'désélectionné les fichier(s) contenant *term',
            'unselect_files_like_alternative8': 'désélectionnez les dossier(s) qui contiennent *term',
            'unselect_files_like_alternative9': 'désélectionnez les fichier(s) qui contiennent *term',
            'unselect_files_like_alternative10': 'désélectionnez les dossier(s) contenant *term',
            'unselect_files_like_alternative11': 'désélectionnez les fichier(s) contenant *term',

            'unselect_file': 'désélectionner (le) (dossier) (fichier) *term',
            'unselect_file_alternative': 'désélectionné (le) (dossier) (fichier) *term',
            'unselect_file_alternative2': 'désélectionnez (le) (dossier) (fichier) *term',


            'create_folder': 'créer (le) (un) (dossier) *term',
            'create_folder_alternative': 'creer (le) (un) (dossier) *term',
            'create_folder_alternative2': 'cree (le) (un) (dossier) *term',
            'create_folder_alternative3': 'créez (le) (un) (dossier) *term',


            'delete_item': 'supprimer (le) (dossier) (fichier) *term',
            'delete_item_alternative': 'supprimé (le) (dossier) (fichier) *term',
            'delete_item_alternative2': 'supprimez (le) (dossier) (fichier) *term',


            'rename_item_like': 'renommer un (dossier) (fichier) qui contient *term en *term',
            'rename_item_like_alternative': 'renommer un (dossier) (fichier) contenant *term en *term',
            'rename_item_like_alternative2': 'éditer un (dossier) (fichier) qui contient *term en *term',
            'rename_item_like_alternative3': 'éditer un (dossier) (fichier) contenant *term en *term',
            'rename_item_like_alternative4': 'édité un (dossier) (fichier) qui contient *term en *term',
            'rename_item_like_alternative5': 'édité un (dossier) (fichier) contenant *term en *term',
            'rename_item_like_alternative6': 'éditez un (dossier) (fichier) qui contient *term en *term',
            'rename_item_like_alternative7': 'éditez un (dossier) (fichier) contenant *term en *term',
            'rename_item': 'renommer (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative': 'éditer (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative2': 'édité (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative3': 'éditez (le) (dossier) (fichier) *term en *term',

            'refresh': 'rafraîchir'*/
        }
    });