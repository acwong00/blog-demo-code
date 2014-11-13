function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css({
        'background-color': getNumberBackgroundColor(randNumber),
        'color': getNumberColor(randNumber)
    }).text(randNumber);

    numberCell.animate({
        'width': cellSideLength,
        'height': cellSideLength,
        'top': getPostTop(i, j),
        'left': getPostLeft(i, j)
    },100);
}

function showMoveAnimation(fromx,fromy,tox,toy) {
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        'top': getPostTop(tox,toy),
        'left': getPostLeft(tox,toy)
    }, 200);
}

function updateScore (score) {
    $('#score').text(score);
}
