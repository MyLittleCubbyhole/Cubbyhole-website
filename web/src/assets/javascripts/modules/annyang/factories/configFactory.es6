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
        };
    });