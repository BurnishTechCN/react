import 'bootstrap-notify';
import $ from 'jquery';

export default function sAlert(message, type = 'success') {
  const isError = type === 'error';
  const icon = isError ? 'fa fa-exclamation-circle' : 'fa fa-check';
  $.notify({
    message,
    icon,
  }, {
    type: isError ? 'danger' : type,
    delay: 800,
    placement: {
      align: window.screen.width <= 480 ? 'center' : 'right',
    },
    timer: 1000,
  });
}
