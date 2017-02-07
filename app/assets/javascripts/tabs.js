$(document).ready(function () {
  // Put your JavaScript behavior here
  $('.tabs li:nth-child(1)').click(function(event){
    $('.tabs li').css({'border': '0'});
    $('.tabs li:nth-child(1)').css({'border': '1px solid #ccc', 'border-bottom': '1px solid white', 'border-top-left-radius': '4px', "border-top-right-radius": "4px", 'margin-bottom': '-1px', 'height': '31px', 'padding': '9px 14px' });
    $('.tab-content:visible').hide();
    $('#integrity:hidden').show();
  });
  $('.tabs li:nth-child(2)').click(function(event){
    $('.tabs li').css({'border': '0'});
    $('.tabs li:nth-child(2)').css({'border': '1px solid #ccc', 'border-bottom': '1px solid white', 'border-top-left-radius': '4px', "border-top-right-radius": "4px", 'margin-bottom': '-1px', 'height': '31px', 'padding': '9px 14px' });
    $('.tab-content:visible').hide();
    $('#kindness:hidden').show();
  });
  $('.tabs li:nth-child(3)').click(function(event){
    $('.tabs li').css({'border': '0'});
    $('.tabs li:nth-child(3)').css({'border': '1px solid #ccc', 'border-bottom': '1px solid white', 'border-top-left-radius': '4px', "border-top-right-radius": "4px", 'margin-bottom': '-1px', 'height': '31px', 'padding': '9px 14px' });
    $('.tab-content:visible').hide();
    $('#whole_self:hidden').show();
  });
});
