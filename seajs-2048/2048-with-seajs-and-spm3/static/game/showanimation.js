
    var support = require('./support')

    exports.showNumberWithAnimation = function(i, j, randNumber) {
        var numberCell = $('#number-cell-' + i + '-' + j);
        numberCell.css({
            'background-color': support.getNumberBackgroundColor(randNumber),
            'color': support.getNumberColor(randNumber)
        }).text(randNumber);

        numberCell.animate({
            'width': support.cellSideLength,
            'height': support.cellSideLength,
            'top': support.getPostTop(i, j),
            'left': support.getPostLeft(i, j)
        }, 100);
    };

    exports.showMoveAnimation = function(fromx, fromy, tox, toy) {
        var numberCell = $('#number-cell-' + fromx + '-' + fromy);
        numberCell.animate({
            'top': support.getPostTop(tox, toy),
            'left': support.getPostLeft(tox, toy)
        }, 200);
    };

    exports.updateScore = function(score) {
        $('#score').text(score);
    }

