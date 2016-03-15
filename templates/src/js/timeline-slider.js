/*
 Timeline Slider v0.1,
 By Insu Mun, www.gotenzing.com
 Available for use under the MIT License
 */

// Possible options
var tmax_options = {
    delay: 0,
    paused: false,
    onComplete: function () {
        console.log('animation is complete');
    },
    onCompleteScope: function () {
        console.log('animation scope is complete');
    },
    tweens: [],
    stagger: 0,
    align: 'normal',
    useFrames: false,
    onStart: function () {
        console.log('on start called');
    },
    onStartScope: function () {
        console.log('on start scope called');
    },
    onUpdate: function () {
        console.log('on update called');
    },
    onUpdateScope: function () {
        console.log('on update scope called');
    },
    onRepeat: function () {
        console.log('on repeat called');
    },
    onRepeatScope: function () {
        console.log('on repeat scope called');
    },
    onReverseComplete: function () {
        console.log('on reverse complete');
    },
    onReverseCompleteScope: function () {
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

;(function ($, window, document, undefined) {
    'use strict';

    $.fn.timeLineSlider = function (options) {
        options = $.extend(
            {
                defaultMove: 'left-right',
                duration: 3,
                autoStart: false,
                infinityLoop: true
            },
            options
        );

        var tmaxOptions = {
            delay: 0,
            paused: !options.autoStart,
            repeat: options.infinityLoop ? -1 : 1,
            repeatDelay: 0
        };

        var $this = $(this);
        var _this = this;

        var easeValue = Circ.easeInOut;

        // Default movement is Left to Right
        // Left to Right
        // Right to Left
        // Up to Down
        // Down to Up
        // Fade
        // Zoom
        // Rotate

        $this.each(
            function () {
                var $imageContainers = $(this).find('.image-container');
                var tl = new TimelineMax(tmaxOptions);

                $imageContainers.each(
                    function (index, value) {
                        var $imageItem = $(value).find('.image-item');
                        var movement = $imageItem.attr('data-move');

                        if(movement == undefined) {
                            movement = options.defaultMove;
                        }

                        if (index == 0) {
                            tl.to(value, 0, {"alpha": 1});
                        } else {
                            tl.to(value, 2, {"alpha": 1, "ease": easeValue}, '-=2.5');
                        }

                        tl.to(value, options.duration, {"left": 0, "ease": easeValue});

                        switch (movement) {
                            case 'right-left':
                                tl.to(value, 2, {"left": "-5%", "alpha": 0, "ease": easeValue});
                                break;
                            case 'up-down':
                                tl.to(value, 2, {"top": "5%", "alpha": 0, "ease": easeValue});
                                break;
                            case 'down-up':
                                tl.to(value, 2, {"top": "-5%", "alpha": 0, "ease": easeValue});
                                break;
                            case 'fade':
                                tl.to(value, 2, {"alpha": 0, "ease": easeValue});
                                break;
                            case 'zoom':
                                tl.to(value, 2, {"scale": 1.2, "alpha": 0, "ease": easeValue});
                                break;
                            case 'rotate':
                                tl.to(
                                    value, 2, {
                                        "rotation": -180,
                                        transformOrigin: "50% 100%",
                                        "alpha": 0,
                                        "ease": easeValue
                                    }
                                );
                                break;
                            default:
                                tl.to(value, 2, {"left": "5%", "alpha": 0, "ease": easeValue}, '-=1');
                        }
                    }
                );

                $this.find('.pause-button').on(
                    'click', function () {
                        var _this = this;
                        $(_this).toggleClass('playing');
                        tl.paused(!tl.paused());
                        _this.innerHTML = tl.paused() ? "play" : "pause";
                    }
                );

                _this.timeLineSlider = tl;
            }
        );

        return _this;

    };
})(jQuery, window, document);

$(document).ready(
    function () {
        var ts = $('.imageVideo').timeLineSlider(
            {
                defaultMove: 'left-right'
            }
        );
    }
);



