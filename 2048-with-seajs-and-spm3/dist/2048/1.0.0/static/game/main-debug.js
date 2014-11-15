define("2048/1.0.0/static/game/main-debug", [], function(require, exports, module) {
  var support = require("2048/1.0.0/static/game/support-debug");
  var animation = require("2048/1.0.0/static/game/showanimation-debug");
  var board = new Array();
  var score = 0;
  var hasConflicted = new Array();
  var startx = 0;
  var starty = 0;
  var endx = 0;
  var endy = 0;
  $(function() {
    prepareForMobile();
    newgame();
  });

  function prepareForMobile() {
    if (support.documentWidth > 500) {
      support.gridContainerWidth = 500;
      support.cellSpace = 20;
      support.cellSideLength = 100;
    }
    $('#grid-container').css({
      'width': support.gridContainerWidth - 2 * support.cellSpace,
      'height': support.gridContainerWidth - 2 * support.cellSpace,
      'padding': support.cellSpace,
      'border-radius': 0.02 * support.gridContainerWidth
    });
    $('.grid-cell').css({
      'width': support.cellSideLength,
      'height': support.cellSideLength,
      'border': 0.02 * support.cellSideLength
    });
  }

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
        gridCell.css('top', support.getPostTop(i, j));
        gridCell.css('left', support.getPostLeft(i, j));
      }
    }
    for (var i = 0; i < 4; i++) {
      board[i] = new Array();
      hasConflicted[i] = new Array();
      for (var j = 0; j < 4; j++) {
        board[i][j] = 0;
        hasConflicted[i][j] = false;
      }
    }
    updateBoardView();
    score = 0;
    animation.updateScore(score);
  }

  function updateBoardView() {
    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
        var theNumberCell = $('#number-cell-' + i + '-' + j);
        if (board[i][j] === 0) {
          theNumberCell.css({
            'width': '0px',
            'height': '0px',
            'top': support.getPostTop(i, j) + support.cellSideLength / 2,
            'left': support.getPostLeft(i, j) + support.cellSideLength / 2
          });
        } else {
          theNumberCell.css({
            'width': support.cellSideLength,
            'height': support.cellSideLength,
            'top': support.getPostTop(i, j),
            'left': support.getPostLeft(i, j),
            'background-color': support.getNumberBackgroundColor(board[i][j]),
            'color': support.getNumberColor(board[i][j])
          }).text(board[i][j]);
          if (board[i][j] === 512) {
            theNumberCell.css('font-size', '40px');
          }
          if (board[i][j] >= 1000) {
            theNumberCell.css('font-size', '30px');
          }
        }
        hasConflicted[i][j] = false;
      }
    }
    $('.number-cell').css('line-height', support.cellSideLength + 'px');
    $('.number-cell').css('font-size', 0.6 * support.cellSideLength + 'px');
  }

  function generateOneNumber() {
    if (support.nospace(board)) {
      return false;
    }
    // 随机位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var times = 0
    while (times < 50) {
      if (board[randx][randy] === 0) {
        break;
      }
      randx = parseInt(Math.floor(Math.random() * 4));
      randy = parseInt(Math.floor(Math.random() * 4));
      times++;
    }
    if (times === 50) {
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          if (board[i][j] === 0) {
            randx = i;
            randy = j;
          }
        }
      }
    }
    // 随机数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    // 显示数字
    board[randx][randy] = randNumber;
    animation.showNumberWithAnimation(randx, randy, randNumber);
    return true;
  }
  $(document).keydown(function(event) {
    switch (event.keyCode) {
      case 37:
        event.preventDefault();
        if (moveLeft()) {
          setTimeout(generateOneNumber, 210);
          setTimeout(isgameover, 300);
        }
        break;
      case 38:
        event.preventDefault();
        if (moveUp()) {
          setTimeout(generateOneNumber, 210);
          setTimeout(isgameover, 300);
        }
        break;
      case 39:
        event.preventDefault();
        if (moveRight()) {
          setTimeout(generateOneNumber, 210);
          setTimeout(isgameover, 300);
        }
        break;
      case 40:
        event.preventDefault();
        if (moveDown()) {
          setTimeout(generateOneNumber, 210);
          setTimeout(isgameover, 300);
        }
        break;
      default:
        break;
    }
  });
  document.addEventListener('touchstart', function(event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
  });
  document.addEventListener('touchmove', function(event) {
    event.preventDefault();
  });
  document.addEventListener('touchend', function(event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    var deltax = endx - startx;
    var deltay = endy - starty;
    if (Math.abs(deltax) < 0.3 * support.documentWidth && Math.abs(deltay) < 0.3 * support.documentWidth) {
      return;
    }
    if (Math.abs(deltax) > Math.abs(deltay)) {
      if (deltax > 0) {
        if (moveRight()) {
          setTimeout(generateOneNumber, 210);
          setTimeout(isgameover, 300);
        }
      } else {
        if (moveLeft()) {
          setTimeout(generateOneNumber, 210);
          setTimeout(isgameover, 300);
        }
      }
    } else {
      if (deltay > 0) {
        if (moveDown()) {
          setTimeout(generateOneNumber, 210);
          setTimeout(isgameover, 300);
        }
      } else {
        if (moveUp()) {
          setTimeout(generateOneNumber, 210);
          setTimeout(isgameover, 300);
        }
      }
    }
  });

  function moveLeft() {
    if (!support.canMoveLeft(board)) {
      return false;
    }
    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        if (board[i][j] !== 0) {
          for (var k = 0; k < j; k++) {
            if (board[i][k] === 0 && support.noBlockHorizontal(i, k, j, board)) {
              animation.showMoveAnimation(i, j, i, k);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              continue;
            } else if (board[i][k] === board[i][j] && support.noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
              animation.showMoveAnimation(i, j, i, k);
              board[i][k] += board[i][j];
              board[i][j] = 0;
              score += board[i][k];
              animation.updateScore(score);
              hasConflicted[i][k] = true;
              continue;
            }
          }
        }
      }
    }
    setTimeout(updateBoardView, 200);
    return true;
  }

  function moveUp() {
    if (!support.canMoveUp(board)) {
      return false;
    }
    for (var j = 0; j < 4; j++) {
      for (var i = 1; i < 4; i++) {
        if (board[i][j] !== 0) {
          for (var k = 0; k < i; k++) {
            if (board[k][j] === 0 && support.noBlockVertical(j, k, i, board)) {
              animation.showMoveAnimation(i, j, k, j);
              board[k][j] = board[i][j];
              board[i][j] = 0;
              continue;
            } else if (board[k][j] === board[i][j] && support.noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
              animation.showMoveAnimation(i, j, k, j);
              board[k][j] += board[i][j];
              board[i][j] = 0;
              score += board[k][j];
              hasConflicted[k][j] = true;
              animation.updateScore(score);
              continue;
            }
          }
        }
      }
    }
    setTimeout(updateBoardView, 200);
    return true;
  }

  function moveRight() {
    if (!support.canMoveRight(board)) {
      return false;
    }
    for (var i = 0; i < 4; i++) {
      for (var j = 2; j >= 0; j--) {
        if (board[i][j] !== 0) {
          for (var k = 3; j < k; k--) {
            if (board[i][k] === 0 && support.noBlockHorizontal(i, j, k, board)) {
              animation.showMoveAnimation(i, j, i, k);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              continue;
            } else if (board[i][k] === board[i][j] && support.noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
              animation.showMoveAnimation(i, j, i, k);
              board[i][k] += board[i][j];
              board[i][j] = 0;
              score += board[i][k];
              animation.updateScore(score);
              hasConflicted[i][k] = true;
              continue;
            }
          }
        }
      }
    }
    setTimeout(updateBoardView, 200);
    return true;
  }

  function moveDown() {
    if (!support.canMoveDown(board)) {
      return false;
    }
    for (var j = 0; j < 4; j++) {
      for (var i = 2; i >= 0; i--) {
        if (board[i][j] !== 0) {
          for (var k = 3; i < k; k--) {
            if (board[k][j] === 0 && support.noBlockVertical(j, i, k, board)) {
              animation.showMoveAnimation(i, j, k, j);
              board[k][j] = board[i][j];
              board[i][j] = 0;
              continue;
            } else if (board[k][j] === board[i][j] && support.noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
              animation.showMoveAnimation(i, j, k, j);
              board[k][j] += board[i][j];
              board[i][j] = 0;
              score += board[k][j];
              hasConflicted[k][j] = true;
              animation.updateScore(score);
              continue;
            }
          }
        }
      }
    }
    setTimeout(updateBoardView, 200);
    return true;
  }

  function isgameover() {
    if (support.nospace(board) && support.nomove(board)) {
      gameover();
    }
  }

  function gameover() {
    alert('gameover');
  }
});
define("2048/1.0.0/static/game/support-debug", [], function(require, exports, module) {
  var documentWidth = window.screen.availWidth;
  var gridContainerWidth = 0.92 * documentWidth;
  var cellSideLength = 0.18 * documentWidth;
  var cellSpace = 0.04 * documentWidth;
  exports.documentWidth = documentWidth;
  exports.gridContainerWidth = gridContainerWidth;
  exports.cellSideLength = cellSideLength;
  exports.cellSpace = cellSpace;
  exports.getPostTop = function(i, j) {
    return exports.cellSpace + i * (exports.cellSpace + exports.cellSideLength);
  };
  exports.getPostLeft = function(i, j) {
    return exports.cellSpace + j * (exports.cellSpace + exports.cellSideLength);
  };
  exports.getNumberBackgroundColor = function(number) {
    switch (number) {
      case 2:
        return "#eee4da";
        break;
      case 4:
        return "#ede0c8";
        break;
      case 8:
        return "#f2b179";
        break;
      case 16:
        return "#f59563";
        break;
      case 32:
        return "#f67c5f";
        break;
      case 64:
        return "#f65e3b";
        break;
      case 128:
        return "#edcf72";
        break;
      case 256:
        return "#edcc61";
        break;
      case 512:
        return "#9c0";
        break;
      case 1024:
        return "#33b5e5";
        break;
      case 2048:
        return "#09c";
        break;
      case 4096:
        return "#a6c";
        break;
      case 8192:
        return "#93c";
        break;
    }
    return 'black';
  };
  exports.getNumberColor = function(number) {
    if (number <= 4) {
      return '#776e65';
    }
    return 'white';
  };
  exports.nospace = function(board) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          return false
        }
      }
    }
    return true;
  };
  exports.canMoveLeft = function(board) {
    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        if (board[i][j] !== 0) {
          if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
            return true;
          }
        }
      }
    }
    return false;
  };
  exports.canMoveUp = function(board) {
    for (var j = 0; j < 4; j++) {
      for (var i = 1; i < 4; i++) {
        if (board[i][j] !== 0) {
          if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) {
            return true;
          }
        }
      }
    }
    return false;
  };
  exports.canMoveRight = function(board) {
    for (var i = 0; i < 4; i++) {
      for (var j = 2; j >= 0; j--) {
        if (board[i][j] !== 0) {
          if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) {
            return true;
          }
        }
      }
    }
    return false;
  };
  exports.canMoveDown = function(board) {
    for (var j = 0; j < 4; j++) {
      for (var i = 2; i >= 0; i--) {
        if (board[i][j] !== 0) {
          if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
            return true;
          }
        }
      }
    }
  };
  exports.noBlockHorizontal = function(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
      if (board[row][i] !== 0) {
        return false;
      }
    }
    return true;
  };
  exports.noBlockVertical = function(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++) {
      if (board[i][col] !== 0) {
        return false;
      }
    }
    return true;
  };
  exports.nomove = function(board) {
    if (canMoveUp(board) || canMoveRight(board) || canMoveDown(board) || canMoveLeft(board)) {
      return false;
    }
    return true;
  };
});
define("2048/1.0.0/static/game/showanimation-debug", [], function(require, exports, module) {
  var support = require("2048/1.0.0/static/game/support-debug")
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
});