(function ($) {
    'use strict';

    // Tilføjer plugin til fn så det kan bruges normalt
    $.fn.tabsPlugin = function (options) {

        // Options
        // Sætter default options, hvis der ikke sendes noget med
        let defaultOptions = {
            setup: {
                aktivTab: 1,
                showVisuel: 1,
                bgColor: null // Hvis ikke null ændres taben bg til denne farve
            }
            ,
            animation: {
                type: 'slide',
                outTime: 600,
                inTime: 400
            }
        };

        let opts = $.extend(true, {}, defaultOptions, options);

        // Går gennem alle elementer der matcher selector = idx=index, el=element
        return this.each(function (idx, el) {
            let thisElement = $(el);

            if (opts.setup.showVisuel === 1) {
                thisElement.addClass("tabsVisuel");
            }

            let hash = location.hash;
            let elementToShow;
            if(hash !== '' && thisElement.children(".tabsContent").children(hash).length) {
                elementToShow = hash;
            } else {
                elementToShow = "#"+thisElement.find(".content div:nth-of-type("+opts.setup.aktivTab+")").attr("id");
            }

            thisElement.children(".tabsContent").children(elementToShow).show();

            let tabsBg;
            if(opts.setup.bgColor != null) {
                let tabedElement = thisElement.find('a[href="'+elementToShow+'"]');
                tabsBg = tabedElement.css('background-color');
                tabedElement.css('background-color', opts.setup.bgColor);
            }

            $(window).on('hashchange', function () {
                let hash = location.hash;
                if(hash != null && thisElement.children(".tabsContent").children(hash).length) {
                    if(thisElement.children(".tabsContent").children(hash).index() === 0) {
                        thisElement.children(".tabsContent").slideUp(opts.animation.outTime);
                        setTimeout(function() {
                                thisElement.children(".tabsContent").children("div").hide();
                                thisElement.children(".tabsContent").children(hash).show();
                                thisElement.children(".tabsContent").slideDown(opts.animation.inTime)
                            }
                            , opts.animation.outTime);
                    } else if (thisElement.children(".tabsContent").children(hash).index() === 1) {
                        thisElement.children(".tabsContent").hide(opts.animation.outTime);
                        setTimeout(function(){
                            thisElement.children(".tabsContent").children("div").hide();
                            thisElement.children(".tabsContent").children(hash).show();
                            thisElement.children(".tabsContent").show(opts.animation.inTime)
                        }, opts.animation.outTime);
                    } else if (thisElement.children(".tabsContent").children(hash).index() === 2) {
                        thisElement.children(".tabsContent").fadeOut(opts.animation.outTime);
                        setTimeout(function(){
                            thisElement.children(".tabsContent").children("div").hide();
                            thisElement.children(".tabsContent").children(hash).show();
                            thisElement.children(".tabsContent").fadeIn(opts.animation.inTime)
                        }, opts.animation.outTime);
                    } else {
                        thisElement.children(".tabsContent").children("div").hide(0);
                        thisElement.children(".tabsContent").children(hash).show(0);
                    }
                    if(opts.setup.bgColor != null) {
                        thisElement.find("a").css('background-color', tabsBg);
                        thisElement.find('a[href="'+hash+'"]').css('background-color', opts.setup.bgColor);
                    }
                }
            });
        });
    };

})(jQuery);