'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SMALL_GAP = 10;
var BIG_GAP = 40;
var BAR_WIDTH = 40;
var barHeight = 150;
var BAR_GAP = 50;
var TEXT_WIN_X = 240;
var TEXT_WIN_Y = 30;
var TEXT_RESULT_X = 225;
var TEXT_RESULT_Y = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', TEXT_WIN_X, TEXT_WIN_Y);
  ctx.fillText('Список результатов:', TEXT_RESULT_X, TEXT_RESULT_Y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getColor = function (player) {
  var color;
  if (player === 'Вы') {
    color = 'rgba(255, 0, 0, 1)';
  } else {
    var val = (Math.round(Math.random() * 10)) / 10;
    if (val === 0) {
      val = 0.1;
    }
    color = 'rgba(0, 0, 255, ' + val + ')';
  }
  return color;
};

var renderBar = function (ctx, player, times, maxTime, playerIndex) {
  ctx.fillStyle = getColor(player);
  ctx.fillRect(CLOUD_X + BIG_GAP + (BAR_GAP + BAR_WIDTH) * playerIndex, CLOUD_Y + 100 + barHeight - ((barHeight * times[playerIndex]) / maxTime) - (16 + SMALL_GAP), BAR_WIDTH, (barHeight * times[playerIndex]) / maxTime);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SMALL_GAP, CLOUD_Y + SMALL_GAP, 'rgba(0, 0, 0, 0.3)'); // тень
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); // облако
  renderText(ctx); // текст в облаке
  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    renderBar(ctx, players[i], times, maxTime, i);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + BIG_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - BIG_GAP);
  }
};
