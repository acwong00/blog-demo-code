var board = new Array();
var score = 0;

$(function() {
    newgame();
});

function newgame() {
    // 初始化
    init();
    // 随机生成两个数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + '-' + j);
            // getPostTop & getPostLeft in support2048.js
            gridCell.css('top', getPostTop(i,j));
            gridCell.css('left',getPostLeft(i,j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    updateBoardView();
}

function updateBoardView() {
    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j +'"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] === 0) {
                theNumberCell.css({
                    'width': '0px',
                    'height': '0px',
                    'top': getPostTop(i, j) + 50,
                    'left': getPostLeft(i, j) + 50
                });
            } else {
                theNumberCell.css({
                    'width': '100px',
                    'height': '100px',
                    'top': getPostTop(i, j),
                    'left': getPostLeft(i, j),
                    'background-color': getNumberBackgroundColor(board[i][j]),
                    'color': getNumberColor(board[i][j])
                }).test(board[i][j]);
            }
        }
    }
}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }

    // 随机位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    while(true) {
        if (board[randx][randy] === 0) {
            break;
        }
    }
    // 随机数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    // 显示数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
}
