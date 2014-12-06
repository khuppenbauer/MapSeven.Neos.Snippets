$(document).foundation();
$(document).ready(function ($) {
    $('.reveal-modal').insertAfter('#data-reveal');
    var filter = $.cookie('toggle-filter');
    var sorting = $.cookie('toggle-sorting');
    if (filter == 'true') {
        $('.toggle-filter').toggle();
        $('div[data-toggle="filter"] i').toggleClass('fa-caret-right fa-caret-down', 'switch');
    }
    if (sorting == 'true') {
        $('.toggle-sorting').toggle();
        $('div[data-toggle="sorting"] i').toggleClass('fa-caret-right fa-caret-down', 'switch');
    }
    $('#loginFlashMessage').foundation('reveal', 'open', '');

});
$('a.section').click(function(e) {
    e.preventDefault();
    $('div.section').toggle();
});

$('div[data-toggle]').click(function(e){
    e.preventDefault();
    var attributes = $(this).data();
    $.each(attributes, function(k,v) {
        $('.' + k + '-' + v).toggle();
        $('div[data-toggle="'+ v + '"] i').toggleClass('fa-caret-right fa-caret-down', 'switch');
        $.cookie(k + '-' + v, $('.' + k + '-' + v).is(':visible'));
    });
});