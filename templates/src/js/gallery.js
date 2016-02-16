$(function () {
    'use strict';

    // Load demo images from flickr to test
    // It feels like using actual ajax call?!
    //$.ajax({
    //    url: 'https://api.flickr.com/services/rest/',
    //    data: {
    //        format: 'json',
    //        method: 'flickr.interestingness.getList',
    //        api_key: '7617adae70159d09ba78cfec73c13be3' // jshint ignore:line
    //    },
    //    dataType: 'jsonp',
    //    jsonp: 'jsoncallback'
    //}).done(function (result) {
    //    // Hide loading icon
    //    $('.loading-icon').hide();
    //
    //
    //});

    var galleryImages = [
        {
            original_image: "ARW_Billboard2_1407x875.jpg",
            thumbnail_image: "ARW_Billboard2_119x119.jpg",
            caption: ""
        },
        {
            original_image: "ARW_Billboard_1407x875.jpg",
            thumbnail_image: "ARW_Billboard_119x119.jpg",
            caption: ""
        },
        {
            original_image: "ARW_Web_1407x875.jpg",
            thumbnail_image: "ARW_Web_119x119.jpg",
            caption: ""
        },
        {
            original_image: "BRI_Banner_1407x875.jpg",
            thumbnail_image: "BRI_Banner_119x119.jpg",
            caption: ""
        },
        {
            original_image: "BRI_Catalogue_1407x875.jpg",
            thumbnail_image: "BRI_Catalogue_119x119.jpg",
            caption: ""
        },
        {
            original_image: "BRI_Centre_1407x875.jpg",
            thumbnail_image: "BRI_Centre_119x119.jpg",
            caption: ""
        },
        {
            original_image: "Bruce_2015_Ktown_BlBrd_1407x875.jpg",
            thumbnail_image: "Bruce_2015_Ktown_BlBrd_119x119.jpg",
            caption: ""
        },
        {
            original_image: "Bruce_2015_MasterToolKit_1407x875.jpg",
            thumbnail_image: "Bruce_2015_MasterToolKit_119X119.jpg",
            caption: ""
        },
        {
            original_image: "Bruce_Website_1407x875.jpg",
            thumbnail_image: "Bruce_Website_119x119.jpg",
            caption: ""
        },
        {
            original_image: "CCO_Web_1407x875.jpg",
            thumbnail_image: "CCO_Web_119x119.jpg",
            caption: ""
        },
        {
            original_image: "CEN_Woman_in_Burka_1407x875.jpg",
            thumbnail_image: "CEN_Woman_in_Burka_119x119.jpg",
            caption: ""
        },
        {
            original_image: "CERV_Best_Image_1407x875.jpg",
            thumbnail_image: "CERV_Best_Image_119x119.jpg",
            caption: ""
        },
        {
            original_image: "citi_2014_Website_1407x875.jpg",
            thumbnail_image: "citi_2014_Website_119x119.jpg",
            caption: ""
        },
        {
            original_image: "CLRNT_ClarityMag_1407x875.jpg",
            thumbnail_image: "CLRNT_ClarityMag_119x119.jpg",
            caption: ""
        },
        {
            original_image: "CMHA_FB_1407x875.jpg",
            thumbnail_image: "CMHA_FB_119x119.jpg",
            caption: ""
        },
        {
            original_image: "CSI_2008_HandleMe_PrintAd_1407x875.jpg",
            thumbnail_image: "CSI_2008_HandleMe_PrintAd_119x119.jpg",
            caption: ""
        },
        {
            original_image: "CWL_2014fall_Video_1407x875.jpg",
            thumbnail_image: "CWL_2014fall_Video_119x119.jpg",
            caption: ""
        },
        {
            original_image: "CWL_2014spring_Logo_1407x875.jpg",
            thumbnail_image: "CWL_2014spring_Logo_119x119.jpg",
            caption: ""
        },
        {
            original_image: "CWL_2014spring_Website_1407x875.jpg",
            thumbnail_image: "CWL_2014spring_Website_119x119.jpg",
            caption: ""
        },
        //{
        //    original_image: "CWL_2015spring_Ad_1407x875.jpg",
        //    thumbnail_image: "CWL_2015spring_Ad_119x119.jpg",
        //    caption: ""
        //},
        {
            original_image: "Evergreen_PrintAds_1407x875.jpg",
            thumbnail_image: "Evergreen_PrintAds_119x119.jpg",
            caption: ""
        },
        {
            original_image: "EY_2016spring_Wesite_1407x875.jpg",
            thumbnail_image: "EY_2016spring_Wesite_119x119.jpg",
            caption: ""
        },
        {
            original_image: "HHS_2011_Brochure_Cover_1407x875.jpg",
            thumbnail_image: "HHS_2011_Brochure_Cover_119x119.jpg",
            caption: ""
        },
        {
            original_image: "HHS_2011_Brochure_Spread_1407x875.jpg",
            thumbnail_image: "HHS_2011_Brochure_Spread_119x119.jpg",
            caption: ""
        },
        {
            original_image: "Huntsville_Billboard_Antiques_1407x875.jpg",
            thumbnail_image: "Huntsville_Billboard_Antiques_119x119.jpg",
            caption: ""
        },
        //{
        //    original_image: "Huntsville_Billboard_Toque_1407x875.jpg",
        //    thumbnail_image: "Huntsville_Billboard_Toque_119x119.jpg",
        //    caption: ""
        //},
        {
            original_image: "LFP_ChangeisGood_MorrisAd_1407x875.jpg",
            thumbnail_image: "LFP_ChangeisGood_MorrisAd_119x119.jpg",
            caption: ""
        },
        {
            original_image: "Libro_2012_Website_1407x875.jpg",
            thumbnail_image: "Libro_2012_Website_119X119.jpg",
            caption: ""
        },
        {
            original_image: "Libro_2013_BeYou_Ad_1407x875.jpg",
            thumbnail_image: "Libro_2013_BeYou_Ad_119X119.jpg",
            caption: ""
        },
        {
            original_image: "Libro_2015_TV_1407x875.jpg",
            thumbnail_image: "Libro_2015_TV_119X119.jpg",
            caption: ""
        },
        {
            original_image: "LRN_Poster_1407x875.jpg",
            thumbnail_image: "LRN_Poster_119x119.jpg",
            caption: ""
        },
        {
            original_image: "MERC_Poster_1407x875.jpg",
            thumbnail_image: "MERC_Poster_119x119.jpg",
            caption: ""
        },
        {
            original_image: "Millionnaire_Sardines_Poster_1407x875.jpg",
            thumbnail_image: "Millionnaire_Sardines_Poster_119X119.jpg",
            caption: ""
        },
        {
            original_image: "MISS_EDO_Ads_1407x875.jpg",
            thumbnail_image: "MISS_EDO_Ads_119x119.jpg",
            caption: ""
        },
        {
            original_image: "MISS_EDO_Web_1407x875.jpg",
            thumbnail_image: "MISS_EDO_Web_119x119.jpg",
            caption: ""
        },
        {
            original_image: "MSF_Dispatches_1407x875.jpg",
            thumbnail_image: "MSF_Dispatches_119x119.jpg",
            caption: ""
        },
        {
            original_image: "NClean_Orange_PrintAd_1407x875.jpg",
            thumbnail_image: "NClean_Orange_PrintAd_119x119.jpg",
            caption: ""
        },
        {
            original_image: "NClean_Pregnant_PrintAd_1407x875.jpg",
            thumbnail_image: "NClean_Pregnant_PrintAd_119x119.jpg",
            caption: ""
        },
        //{
        //    original_image: "NCU_PS_Postcard_1407x875.jpg",
        //    thumbnail_image: "NCU_PS_Postcard_119x119.jpg",
        //    caption: ""
        //},
        {
            original_image: "NCU_PS_WebsiteNing_1407x875.jpg",
            thumbnail_image: "NCU_PS_WebsiteNing_119x119.jpg",
            caption: ""
        },
        {
            original_image: "OSL_Video_1407x875.jpg",
            thumbnail_image: "OSL_Video_119x119.jpg",
            caption: ""
        },
        {
            original_image: "RA_Posters_1407x875.jpg",
            thumbnail_image: "RA_Posters_119x119.jpg",
            caption: ""
        },
        {
            original_image: "RCB_2010_DE_Can1407x875.jpg",
            thumbnail_image: "RCB_2010_DE_Can119X119.jpg",
            caption: ""
        },
        {
            original_image: "RCB_2010_DE_Poster_1407x875.jpg",
            thumbnail_image: "RCB_2010_DE_Poster_119X119.jpg",
            caption: ""
        },
        {
            original_image: "RCB_2010_IronSpke_Can_1407x875.jpg",
            thumbnail_image: "RCB_2010_IronSpke_Can_119x119.jpg",
            caption: ""
        },
        {
            original_image: "RUS_Screaming_Kid_1407x875.jpg",
            thumbnail_image: "RUS_Screaming_Kid_119x119.jpg",
            caption: ""
        },
        {
            original_image: "SJH_IOH_Poster_1407x875.jpg",
            thumbnail_image: "SJH_IOH_Poster_119x119.jpg",
            caption: ""
        },
        {
            original_image: "SJH_W5_Ad_1407x875.jpg",
            thumbnail_image: "SJH_W5_Ad_119x119.jpg",
            caption: ""
        },
        {
            original_image: "SJH_W5_Brochure_1407x875.jpg",
            thumbnail_image: "SJH_W5_Brochure_119x119.jpg",
            caption: ""
        },
        {
            original_image: "SJH_W5_tv_1407x875.jpg",
            thumbnail_image: "SJH_W5_tv_119x119.jpg",
            caption: ""
        },
        {
            original_image: "SJH_W5_Web_1407x875.jpg",
            thumbnail_image: "SJH_W5_Web_119x119.jpg",
            caption: ""
        },
        {
            original_image: "SOAP_Man_Poster_1407x875.jpg",
            thumbnail_image: "SOAP_Man_Poster_119x119.jpg",
            caption: ""
        },
        {
            original_image: "STT_Video_1407x875.jpg",
            thumbnail_image: "STT_Video_119x119.jpg",
            caption: ""
        },
        {
            original_image: "TIC_Ad_1407x875.jpg",
            thumbnail_image: "TIC_Ad_119x119.jpg",
            caption: ""
        },
        {
            original_image: "WF_Transit_1407x875.jpg",
            thumbnail_image: "WF_Transit_119X119.jpg",
            caption: ""
        }
    ];

    $('.loading-icon').hide();
    var linksContainer = $('.gallery-container.gallerypage');

    for (var i = 0; i < galleryImages.length; i++) {
        $('<a/>')
            .append($('<img>').prop('src', '/templates/dist/img/gallery/thumbnails/' + galleryImages[i].thumbnail_image))
            .addClass('gallery-item')
            .prop('href', '#lightbox')
            .attr('data-toggle', 'modal')
            .attr('data-slide-to', i)
            .appendTo(linksContainer);

        $('.carousel-indicators.gallerypage')
            .append($('<li/>').attr({'data-target': '#lightbox', 'data-slide-to': i}));

        // Set images
        if (i == 0) {
            $('.carousel-inner.gallerypage')
                .append(
                $('<div/>').addClass('item active').append(
                    $('<img>').prop('src', '/templates/dist/img/gallery/' + galleryImages[i].original_image)
                ).append(
                    $('<div/>').addClass('carousel-caption').append(galleryImages[i].caption)
                )
            );
        } else {
            $('.carousel-inner.gallerypage')
                .append($('<div/>').addClass('item').append(
                    $('<img>').prop('src', '/templates/dist/img/gallery/' + galleryImages[i].original_image)
                ).append(
                    $('<div/>').addClass('carousel-caption').append(galleryImages[i].caption)
                )
            );
        }
    }
});