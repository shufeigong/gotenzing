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
                        $('<div/>').addClass('carousel-caption').append('')
                    )
                );
            } else {
                $('.carousel-inner.gallerypage')
                    .append($('<div/>').addClass('item').append(
                        $('<img>').prop('src', 'http://placehold.it/938x538')
                    ).append(
                        $('<div/>').addClass('carousel-caption').append('')
                    )
                );
            }
        }
    });
});


