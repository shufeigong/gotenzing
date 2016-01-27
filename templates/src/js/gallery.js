$(function () {
    'use strict';

    // Load demo images from flickr to test
    // It feels like using actual ajax call?!
    $.ajax({
        url: 'https://api.flickr.com/services/rest/',
        data: {
            format: 'json',
            method: 'flickr.interestingness.getList',
            api_key: '7617adae70159d09ba78cfec73c13be3' // jshint ignore:line
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
    }).done(function (result) {
        // Hide loading icon
        $('.loading-icon').hide();

        var linksContainer = $('#gallery-container');

        for(var i = 0; i < 30; i++) {
            $('<a/>')
                .append($('<img>').prop('src', 'http://placehold.it/119x119'))
                .addClass('gallery-item')
                .prop('href', '#lightbox')
                .attr('data-toggle', 'modal')
                .attr('data-slide-to', i)
                .appendTo(linksContainer);

            $('.carousel-indicators.gallerypage')
                .append($('<li/>').attr({'data-target': '#lightbox', 'data-slide-to': i}));

            // Set images
            if(i == 0) {
                $('.carousel-inner.gallerypage')
                    .append(
                    $('<div/>').addClass('item active').append(
                        $('<img>').prop('src', 'http://placehold.it/938x538')
                    ).append(
                        $('<div/>').addClass('carousel-caption').append('(75 words) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nibh tellus, gravida eu porttitor sed, dictum ac urna. Fusce ex massa, congue id massa vel, dapibus aliquet nulla. Curabitur condimentum nisi at quam vestibulum, sed tempus lacus tempor. Mauris fringilla nec purus at semper. Maecenas vel nibh vitae risus imperdiet varius. Ut porta nisl sit amet ex consequat ultrices. Sed venenatis enim eu eros blandit blandit. Nunc gravida blandit lorem in congue. Pellentesque nec commodo.')
                    )
                );
            } else {
                $('.carousel-inner.gallerypage')
                    .append($('<div/>').addClass('item').append(
                        $('<img>').prop('src', 'http://placehold.it/938x538')
                    ).append(
                        $('<div/>').addClass('carousel-caption').append('(75 words) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nibh tellus, gravida eu porttitor sed, dictum ac urna. Fusce ex massa, congue id massa vel, dapibus aliquet nulla. Curabitur condimentum nisi at quam vestibulum, sed tempus lacus tempor. Mauris fringilla nec purus at semper. Maecenas vel nibh vitae risus imperdiet varius. Ut porta nisl sit amet ex consequat ultrices. Sed venenatis enim eu eros blandit blandit. Nunc gravida blandit lorem in congue. Pellentesque nec commodo.')
                    )
                );
            }
        }
    });
});


