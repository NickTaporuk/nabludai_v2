(function() {
  $('.toggle').click(function() {
    var state;
    state = $(this).find('.signin').css('display');
    if (state === 'none') {
      $('.signin').css({
        'display': 'block'
      });
      $('i.login').css({
        'display': 'none'
      });
    } else {
      $('.signin').css({
        'display': 'none'
      });
      $('.login').css({
        'display': 'block'
      });
    }
    $('.form').animate({
      height: "toggle",
      'padding-top': 'toggle',
      'padding-bottom': 'toggle',
      opacity: "toggle"
    }, "slow");
    return false;
  });

}).call(this);
