'use strict';

// Possible options

var tmax_options = {
    delay: 0,
    paused: false,
    onComplete: function() {
        console.log('animation is complete');
    },
    onCompleteScope: function() {
        console.log('animation scope is complete');
    },
    tweens: [],
    stagger: 0,
    align: 'normal',
    useFrames: false,
    onStart: function() {
        console.log('on start called');
    },
    onStartScope: function() {
        console.log('on start scope called');
    },
    onUpdate: function() {
        console.log('on update called');
    },
    onUpdateScope: function() {
        console.log('on update scope called');
    },
    onRepeat: function() {
        console.log('on repeat called');
    },
    onRepeatScope: function() {
        console.log('on repeat scope called');
    },
    onReverseComplete: function() {
        console.log('on reverse complete');
    },
    onReverseCompleteScope: function() {
        console.log('on reverse complete scope called');
    },
    autoRemoveChildren: false,
    smoothChildTiming: false,
    repeat: -1,
    repeatDelay: 0,
    yoyo: false,
    onCompleteParams: [],
    onReverseCompleteParams: [],
    onStartParams: [],
    onUpdateParams: [],
    onRepeatParams: []
};


/**
 * Timeline Slider
 * @param options
 */

$.fn.timeLineSlider = function(options) {
    var defaultOptions = {
        delay: 0,
        paused: false,
        repeat: -1,
        repeatDelay: 0
    };

    var imageVideos = $(this);

    var duration = 3;
    var easeValue = Circ.easeInOut;

    // Default movement is Left to Right
    // Left to Right
    // Right to Left
    // Up to Down
    // Down to Up
    // Fade
    // Zoom
    // Rotate

    _(imageVideos).forEach(function(video, index) {
        var imageContainers = $(video).find('.image-container');
        var imageVideoTimeLine = new TimelineMax(defaultOptions);

        _(imageContainers).forEach(function(value, index) {
            var elem = $(value).find('.image-video-item');
            var movement = elem.attr('data-move');

            if(index == 0) {
                imageVideoTimeLine.set(value, {"alpha": 1});
            }

            imageVideoTimeLine.to(value, 2, {"alpha": 1, "ease": easeValue}, '-=2.5');
            imageVideoTimeLine.to(value, duration, {"left": 0, "ease": easeValue});

            switch(movement) {
                case 'right-left':
                    imageVideoTimeLine.to(value, 2, {"left": "-5%", "alpha": 0, "ease": easeValue});
                    break;
                case 'up-down':
                    imageVideoTimeLine.to(value, 2, {"top": "5%", "alpha": 0, "ease": easeValue});
                    break;
                case 'down-up':
                    imageVideoTimeLine.to(value, 2, {"top": "-5%", "alpha": 0, "ease": easeValue});
                    break;
                case 'fade':
                    imageVideoTimeLine.to(value, 2, {"alpha": 0, "ease": easeValue});
                    break;
                case 'zoom':
                    imageVideoTimeLine.to(value, 2, {"scale": 1.2, "alpha": 0, "ease": easeValue});
                    break;
                case 'rotate':
                    imageVideoTimeLine.to(value, 2, {"rotation": -180, transformOrigin:"50% 100%", "alpha": 0, "ease": easeValue});
                    break;
                default:
                    imageVideoTimeLine.to(value, 2, {"left": "5%", "alpha": 0, "ease": easeValue}, '-=1');
            }
        });

        $(video).find('.pause-button').on('click', function() {
            var _this = this;
            $(_this).toggleClass('playing');
            imageVideoTimeLine.paused(!imageVideoTimeLine.paused());
            _this.innerHTML = imageVideoTimeLine.paused() ? "play" : "pause";
        });

        //$(video).closest('.page-content').find('.sub-close-icon').bind('click',function() {
        //    $(video).find('.pause-button').removeClass('playing');
        //    imageVideoTimeLine.paused(!imageVideoTimeLine.paused());
        //});
    });
};


$(document).ready(function() {
    $('.imageVideo').timeLineSlider();
});



