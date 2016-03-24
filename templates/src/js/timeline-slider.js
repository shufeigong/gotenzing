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
                defaultEffect: '',
                duration: 6,
                autoStart: false,
                infinityLoop: true
            },
            options
        );


        var childTl = [];

        var easeValue = Sine.easeInOut;

        function setProgress(timeline, progressBar) {
            TweenMax.set(progressBar, {scaleX: timeline.progress(), transformOrigin: "0px 0px"});
        }

        //==================================
        // Type of panning effect used.

        // 'zoom-in'
        // 'zoom-out'

        // 'zoom-in-up'
        // 'zoom-in-down'
        // 'zoom-in-left'
        // 'zoom-in-right'

        // 'zoom-out-up'
        // 'zoom-out-down'
        // 'zoom-out-left'
        // 'zoom-out-right'

        // 'pan-up'
        // 'pan-down'
        // 'pan-left'
        // 'pan-right'

        $(this).each(
            function (index, value) {
                var $this = $(this);
                var _this = this;

                var progressBar = $(this).find('.progressBar');
                var pauseButton = $(this).find('.pause-button');

                var tmaxOptions = {
                    delay: 0,
                    paused: !options.autoStart,
                    repeat: options.infinityLoop ? -1 : 1,
                    repeatDelay: 0,
                    onUpdateParams: ["{self}",progressBar],
                    onStartParams: [pauseButton],
                    onPauseParams: [pauseButton],
                    onUpdate: setProgress,
                    onStart: function(pauseButton) {
                        $(pauseButton).addClass('playing');
                    },
                    onPause: function(pauseButton) {
                        $(pauseButton).removeClass('playing');
                    }
                };

                _this.videos = [];

                var $imageContainers = $(this).find('.image-container');
                var tl = new TimelineMax(tmaxOptions);
                childTl.push(tl);

                var $video;

                //$imageContainers.each(
                //    function (index, value) {
                //        var isVideo = $(value).find('iframe').length > 0;
                //        if(isVideo) {
                //            var iframe = $(value).find('iframe').get(0);
                //            var startTime = $(value).find('iframe').attr('data-start');
                //
                //            $video = $f(iframe);
                //            $video.addEvent(
                //                'ready', function () {
                //                    $video.api('setVolume', 0);
                //                    $video.api('setColor', '#f7a800');
                //                    $video.api('seekTo', startTime);
                //                    $video.api("play");
                //                    $video.api("pause");
                //                }
                //            );
                //
                //
                //            // Need to create function to detect video included
                //            if($this.hasClass('vimeo-video')) {
                //                var videoItem = {
                //                    index: index,
                //                    videoObj: $video
                //                };
                //
                //                _this.videos.push(videoItem);
                //            }
                //
                //
                //        }
                //    });

                $imageContainers.each(
                    function (index, value) {
                        var $imageItem = $(value).find('.image-item, video');
                        var effect = $imageItem.attr('data-effect');

                        if(effect == undefined) {
                            effect = options.defaultMove;
                        }

                        //var isVideo = $(value).find('video').length > 0;
                        var isVideo = $(value).find('iframe').length > 0;

                        //var startTime = $(value).find('video').attr('data-start');

                        if(isVideo) {
                            //$video = $(value).find('video')[0];
                            //$video.currentTime = startTime;

                            //tl.to(value, 2, {onStart: function() {
                                //var startTime = $(value).find('iframe').attr('data-start');

                                //$video = $(value).find('video')[0];
                                //$video.play();

                                //var iframe = $(value).find('iframe').get(0);

                            //}});

                            tl.to(value, 6, {onStart: function() {
                                var iframe = $(value).find('iframe').get(0);
                                var startTime = $(value).find('iframe').attr('data-start');

                                $video = $f(iframe);
                                $video.addEvent(
                                    'ready', function () {
                                        $video.api('setVolume', 0);
                                        $video.api('setColor', '#f7a800');
                                        $video.api('seekTo', startTime);
                                        //$video.api("play");
                                    }
                                );


                            }});
                            tl.to(value, 2, {"autoAlpha": 1}, '-=7');

                        } else {
                            tl.to(value, 1, {"autoAlpha": 1}, index == 0 ? '' : '-=2');
                        }

                        switch (effect) {
                            case 'zoom-out':
                                tl.fromTo($imageItem, options.duration, {"scale": 1.8, "ease": easeValue},{"scale": 1.1, "ease": easeValue}, 'effect' + index);
                                break;
                            case 'zoom-in':
                                tl.to($imageItem, options.duration, {"scale": "1.4", "ease": easeValue}, 'effect' + index);
                                break;
                            case 'zoom-in-up':
                                tl.to($imageItem, options.duration, {"scale": 1.4, "ease": easeValue}, 'effect' + index);
                                tl.to($imageItem, options.duration, {"y": "+15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/3);
                                break;
                            case 'zoom-in-down':
                                tl.to($imageItem, options.duration, {"scale": 1.4, "ease": easeValue}, 'effect' + index);
                                tl.to($imageItem, options.duration, {"y": "-15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/3);
                                break;
                            case 'zoom-in-left':
                                tl.to($imageItem, options.duration, {"scale": 1.4, "ease": easeValue}, 'effect' + index);
                                tl.to($imageItem, options.duration, {"x": "+15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/3);
                                break;
                            case 'zoom-in-right':
                                tl.to($imageItem, options.duration, {"scale": 1.4, "ease": easeValue}, 'effect' + index);
                                tl.to($imageItem, options.duration, {"x": "-15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/3);
                                break;
                            case 'zoom-out-up':
                                tl.fromTo($imageItem, options.duration, {"scale": 1.8, "ease": easeValue}, {"scale": 1.3, "ease": easeValue}, 'effect' + index);
                                tl.to($imageItem, options.duration, {"y": "+15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/3);
                                break;
                            case 'zoom-out-down':
                                tl.fromTo($imageItem, options.duration, {"scale": 1.8, "ease": easeValue}, {"scale": 1.3, "ease": easeValue}, 'effect' + index);
                                tl.to($imageItem, options.duration, {"y": "-15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/3);
                                break;
                            case 'zoom-out-left':
                                tl.fromTo($imageItem, options.duration, {"scale": 1.8, "ease": easeValue}, {"scale": 1.3, "ease": easeValue}, 'effect' + index);
                                tl.to($imageItem, options.duration, {"x": "+15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/3);
                                break;
                            case 'zoom-out-right':
                                tl.fromTo($imageItem, options.duration, {"scale": 1.8, "ease": easeValue}, {"scale": 1.3, "ease": easeValue}, 'effect' + index);
                                tl.to($imageItem, options.duration, {"x": "-15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/3);
                                break;
                            case 'pan-up':
                                tl.to($imageItem, options.duration, {"y": "+15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/4);
                                break;
                            case 'pan-down':
                                tl.to($imageItem, options.duration, {"y": "-15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/4);
                                break;
                            case 'pan-left':
                                tl.to($imageItem, options.duration, {"x": "+15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/4);
                                break;
                            case 'pan-right':
                                tl.to($imageItem, options.duration, {"x": "-15%", "ease": easeValue}, 'effect' + index + '+=' + options.duration/4);
                                break;
                            default:
                                tl.to($imageItem, options.duration, {"left": 0},'effect' + index);
                        }

                        tl.to(value, 0, {"autoAlpha": 0, onComplete: function() {
                            if(isVideo) {
                                $video.api("pause");
                            }
                        }});
                    }
                );

                if(options.autoStart) {
                    $this.find('.pause-button').addClass('playing');
                }

                $this.find('.pause-button').on(
                    'click', function () {
                        var _this = this;
                        $(_this).toggleClass('playing');
                        tl.paused(!tl.paused());
                        _this.innerHTML = tl.paused() ? "play" : "pause";

                        // play & pause video
                        if($video) {
                            if(tl.paused()) {
                                //$video.pause();
                                $video.api("pause");


                            } else {
                                //$video.play();
                                $video.api("play");

                            }
                        }
                    }
                );

                _this.timeLineSlider = tl;
            }
        );
    };
})(jQuery, window, document);

$(document).ready(
    function () {
        $('.imageVideo').timeLineSlider(
            {
                autoStart: false
            }
        );
    }
);



