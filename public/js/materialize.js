$(document).ready(function() {
    console.log('ready!');

    $("a.main").click(function() {
        console.log('clicked!');
        $(this).addClass('animated fadeOutUp');
    });


});
