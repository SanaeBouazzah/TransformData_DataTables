import "@fontsource/roboto-condensed";
import "@fontsource/roboto-condensed/400.css"; 
import "@fontsource/roboto-condensed/400-italic.css"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import './styles/app.css';
import './styles/style.css';
import 'toastr/build/toastr.css';
import './images/agenda.jpg';
import './images/earth.jpg';

const $ = require('jquery');

import Routing from './js/fos-routing/router';
import routes from '../public/js/fos_js_routes.json';
const routing = Routing.setRoutingData(routes);
global.Routing = Routing
global.$ = global.jQuery = $;

import toastr from 'toastr';

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

global.toastr = toastr
const swal = require('sweetalert2');
const swalWithBootstrapButtons = swal.mixin({
    customClass: {
        confirmButton: 'btn btn-white btn-xs sySweetStyle',
        cancelButton: 'btn btn-warning btn-xs sySweetStyle'
    },
    buttonsStyling: false
})

global.Swal = swal;
global.swalWithBootstrapButtons = swalWithBootstrapButtons;


import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
