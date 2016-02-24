var showGallery = function () {
    $.getJSON('/templates/json/gallery.json', function (data) {
        $('.loading-icon').hide();
        var galleryImages = data;
        var linksContainer = $('.gallery-container.gallerypage');

        for (var i = 0; i < galleryImages.length; i++) {
            $('<a/>')
                .append($('<img>')
                .prop('src', '/templates/dist/img/gallery/thumbnails/' + galleryImages[i].thumbnail_image))
                .prop('alt', galleryImages[i].thumbnail_image)
                .addClass('gallery-item')
                .prop('href', '#lightbox')
                .attr('data-toggle', 'modal')
                .attr('data-slide-to', i)
                .appendTo(linksContainer);

            // Set images
            if (i == 0) {
                $('.carousel-indicators.gallerypage')
                    .append($('<li/>').attr({'data-target': '#lightbox', 'data-slide-to': i}).addClass('active'));

                $('.carousel-inner.gallerypage')
                    .append(
                    $('<div/>').addClass('item active').append(
                        $('<img>')
                            .prop('src', '/templates/dist/img/gallery/' + galleryImages[i].original_image)
                            .prop('alt', galleryImages[i].thumbnail_image)
                    ).append(
                        $('<div/>').addClass('carousel-caption').append(galleryImages[i].caption)
                    )
                );
            } else {
                $('.carousel-indicators.gallerypage')
                    .append($('<li/>').attr({'data-target': '#lightbox', 'data-slide-to': i}));

                $('.carousel-inner.gallerypage')
                    .append($('<div/>').addClass('item').append(
                        $('<img>')
                            .prop('src', '/templates/dist/img/gallery/' + galleryImages[i].original_image)
                            .prop('alt', galleryImages[i].thumbnail_image)
                    ).append(
                        $('<div/>').addClass('carousel-caption').append(galleryImages[i].caption)
                    )
                );
            }
        }
        window.isGalleryOpen = true;
    })
        .fail(function () {
            alert('Gallery error');
        });
};