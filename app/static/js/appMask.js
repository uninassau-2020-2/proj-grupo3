/** Mask Phone *******************************************************/
$(document).on('keydown', '[data-mask-phone]', function (el) {
    var digit = el.key.replace(/\D/g, '');
    var value = $(this).val().replace(/\D/g, '');
    var size = value.concat(digit).length;
    $(this).mask((size <= 10) ? '(00)0000-0000' : '(00)00000-0000');
});
/** END Mask Phone ***************************************************/