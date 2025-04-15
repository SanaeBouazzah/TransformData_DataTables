import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap';
import './styles/app.css';
import './styles/style.css';
import './images/agenda.jpg';

import Routing from './js/fos-routing/router';
import routes from '../public/js/fos_js_routes.json';

const routing = Routing.setRoutingData(routes);
global.Routing = Routing

const $ = require('jquery');
const toastr = require('toastr');


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

