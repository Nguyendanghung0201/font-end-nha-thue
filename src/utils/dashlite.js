import Vue from 'vue'
import jquery from 'jquery'
window.$ = jquery

$(document).on('click','.dropdown-menu', function(e) {
    e.stopPropagation()
});

