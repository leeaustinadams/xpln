$(document).ready(function() {
    var curStep = 0, 
    steps = [],
    highlight = function(selector) {
        $(selector).fadeOut().fadeIn().fadeOut().fadeIn();
    };

//    $('.explain').popover({trigger: 'manual', html: true, container: 'body', placement: 'auto top'});

//    $('.explain').each(function(index, elm) {
//        steps.push($(elm));
//    });


    $('.explanation').each(function(index, elm) {
        var selector = $(elm).attr('data-content-for'),
        explain = $(selector);
//        explain.attr('data-content', elm.innerHTML);
        explain.attr('data-step', $(elm).attr('data-step'));
        explain.popover({trigger: 'manual', html: true, container: 'body', placement: 'auto top', content: elm.innerHTML});
        steps.push(explain);
    });

    steps.sort(function(a, b) { 
        return parseInt($(a).attr('data-step')) > parseInt($(b).attr('data-step')); 
    });

    $('#tutorial-hide-btn').hide();
    $('#tutorial-back-btn').css('visibility', 'hidden');
    $('#tutorial-fwd-btn').css('visibility', 'hidden');

    $('#tutorial-fwd-btn').click(function() {
        var elm = steps[curStep];
        if(curStep < steps.length - 1) {
            elm.popover('hide');
            curStep = curStep + 1;
            elm = steps[curStep];
            elm.popover('show');
            $('#tutorial-back-btn').css('visibility', 'visible');
        } 
        if(curStep == steps.length - 1) {
            $('#tutorial-fwd-btn').css('visibility', 'hidden');
        }
    });

    $('#tutorial-back-btn').click(function() {
        var elm = steps[curStep];
        if(curStep > 0) {
            elm.popover('hide');
            curStep = curStep - 1;
            elm = steps[curStep];
            elm.popover('show');
            $('#tutorial-fwd-btn').css('visibility', 'visible');
        }
        if(curStep == 0) {
            $('#tutorial-back-btn').css('visibility', 'hidden');
            //elm.popover('hide');
        }
    });

    $('#tutorial-show-btn').click(function() {
        var elm;

        if(curStep != 0) {
            elm = steps[curStep]
            elm.popover('hide');
        }

        curStep = 0;
        elm = steps[curStep];
        elm.popover('show');

        $('#tutorial-fwd-btn').css('visibility', 'visible');
        $('#tutorial-show-btn').hide();
        $('#tutorial-hide-btn').show();
    });

    $('#tutorial-hide-btn').click(function() {
        $('#tutorial-show-btn').show();
        $('#tutorial-hide-btn').hide();
        $('#tutorial-fwd-btn').css('visibility', 'hidden');
        $('#tutorial-back-btn').css('visibility', 'hidden');
        steps[curStep].popover('hide');
    });

    $('.highlight-btn').each(function(index, elm) {
        var selector = $(elm).attr('data-selector');
        $(elm).click(function() {
            highlight(selector);
        });
    });
});
