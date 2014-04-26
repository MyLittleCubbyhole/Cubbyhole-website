angular.module('Annyang').
    factory('ConfigFactory', function() {

        return {
            'open_item': 'ouvrir (le) (dossier) *term',
            'create_folder': 'créer (le) (un) (dossier) *term',
            'delete_item': 'supprimer (le) (dossier) (fichier) *term',
            'refresh': 'rafraîchir',
            'rename_item': 'renommer *term en *term'
        }
    });