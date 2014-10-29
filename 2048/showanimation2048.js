function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css({
        'background-color': getNumberBackgroundColor(randNumber),
        'color': getNumberColor(randNumber)
    }).text(randNumber);

    numberCell.animate({
        'width': '100px',
        'height': '100px',
        'top': getPostTop(i, j),
        'left': getPostLeft(i, j)
    },100);
}
