var showGallery = function () {
  $.getJSON(
    '/templates/json/gallery.json', function (data) {
      $('.loading-icon').hide();
      var galleryImages = data;
      var $linksContainer = $('.gallery-container.gallerypage');

      for (var i = 0; i < galleryImages.length; i++) {
        if (galleryImages[i].isVideo) {
          $('<a/>')
            .append('<span class="video-play-icon"></span>')
            .append(
              $('<img>')
                .prop('src', '/templates/dist/img/gallery/thumbnails/' + galleryImages[i].thumbnail_image)
            )
            .prop('alt', galleryImages[i].thumbnail_image)
            .prop('width', 119)
            .prop('height', 119)
            .addClass('gallery-item')
            .prop('href', '#lightbox')
            .attr('data-toggle', 'modal')
            .attr('data-slide-to', i)
            .appendTo($linksContainer);

        } else {
          $('<a/>')
            .append(
              $('<img>')
                .prop('src', '/templates/dist/img/gallery/thumbnails/' + galleryImages[i].thumbnail_image)
            )
            .prop('alt', galleryImages[i].thumbnail_image)
            .prop('width', 119)
            .prop('height', 119)
            .addClass('gallery-item')
            .prop('href', '#lightbox')
            .attr('data-toggle', 'modal')
            .attr('data-slide-to', i)
            .appendTo($linksContainer);

        }

        // Set images
        if (i == 0) {
          $('.carousel-indicators.gallerypage')
            .append($('<li/>').attr({ 'data-target': '#lightbox', 'data-slide-to': i }).addClass('active'));

          $('.carousel-inner.gallerypage')
            .append(
              $('<div/>').addClass('item active').append(
                $('<img>')
                  .addClass('lazy')
                  .attr('data-src', '/templates/dist/img/gallery/' + galleryImages[i].original_image)
                  .prop('alt', galleryImages[i].thumbnail_image)
                  .prop('width', 1407)
                  .prop('height', 875)
              ).append(
                $('<div/>').addClass('carousel-caption').append(galleryImages[i].caption)
              )
            );
        } else {
          $('.carousel-indicators.gallerypage')
            .append($('<li/>').attr({ 'data-target': '#lightbox', 'data-slide-to': i }));

          if (galleryImages[i].isVideo) {
            $('.carousel-inner.gallerypage')
              .append(
                $('<div/>').addClass('item')
                  .append(
                    $('<div/>')
                      .append(
                        $('<iframe/>')
                          .addClass('lazy iframe')
                          .attr('data-src', galleryImages[i].videoSrc)
                          .prop('frameborder', 0)
                          .attr('webkitallowfullscreen', '')
                          .attr('mozallowfullscreen', '')
                          .attr('allowfullscreen', '')
                      ).addClass('videoWrapper')
                  ).append(
                  $('<div/>').addClass('carousel-caption').append(galleryImages[i].caption)
                )
              );
          } else {
            $('.carousel-inner.gallerypage')
              .append(
                $('<div/>').addClass('item').append(
                  $('<img>')
                    .addClass('lazy')
                    .attr('data-src', '/templates/dist/img/gallery/' + galleryImages[i].original_image)
                    .prop('alt', galleryImages[i].thumbnail_image)
                    .prop('width', 1407)
                    .prop('height', 875)
                ).append(
                  $('<div/>').addClass('carousel-caption').append(galleryImages[i].caption)
                )
              );
          }

        }
      }

      /**
       * Gallery item hover
       */

      $('.gallery-item').hover(
        function () {
          TweenLite.to(
            $(this), 0.1, {
              scale: 1.1
            }
          );
        }, function () {

          TweenLite.to(
            $(this), 0.1, {
              scale: 1
            }
          );
        }
      );

      window.isGalleryOpen = true;
    }
    )
    .fail(
      function () {
        console.log('Gallery error');
      }
    );
};
