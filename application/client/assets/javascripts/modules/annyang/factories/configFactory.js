angular.module('Annyang').
    factory('ConfigFactory', function() {

        return {
            'open_item': 'ouvrir (le) (dossier) *term',
            'open_parent_item': 'ouvrir le dossier parent',
            'open_parent_item_alternative': 'précédent',
            'open_parent_item_alternative2': 'revenir en arrière',

            'download_file': 'télécharger (le) (dossier) (fichier) *term',
            'download_file_alternative': 'téléchargé (le) (dossier) (fichier) *term',
            'download_file_alternative2': 'téléchargez (le) (dossier) (fichier) *term',

            'create_folder': 'créer (le) (un) (dossier) *term',
            'create_folder_alternative': 'creer (le) (un) (dossier) *term',
            'create_folder_alternative2': 'cree (le) (un) (dossier) *term',
            'create_folder_alternative3': 'créez (le) (un) (dossier) *term',
            'delete_item': 'supprimer (le) (dossier) (fichier) *term',
            'rename_item': 'renommer (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative': 'éditer (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative2': 'édité (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative3': 'éditez (le) (dossier) (fichier) *term en *term',

            'refresh': 'rafraîchir'
        }
    });