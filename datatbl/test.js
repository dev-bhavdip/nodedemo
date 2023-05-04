var jsdom = require("jsdom").jsdom;
global.$ = require('jquery/dist/jquery')(jsdom().createWindow());

$(document).ready(function() {
    $('#example').DataTable();
} );