import "@fontsource/roboto-condensed";
import "@fontsource/roboto-condensed/400.css"; 
import "@fontsource/roboto-condensed/400-italic.css"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap';
import './styles/app.css';
import './styles/style.css';
import './images/agenda.jpg';

import Routing from './js/fos-routing/router';
import routes from '../public/js/fos_js_routes.json';

const routing = Routing.setRoutingData(routes);
global.Routing = Routing

const $ = require('jquery');
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';


global.$ = global.jQuery = $;
global.toastr = toastr;
global.Routing = Routing;
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};



import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
