'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var barHeight = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 240, 30);
  ctx.fillText('Список результатов:', 225, 50);
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

var getColor = function () {
  var val = (Math.round(Math.random() * 10)) / 10;
  if (val === 0) {
    val = 0.1;
  }
  return 'rgba(0, 0, 255, ' + val + ')';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)'); // тень
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); // облако

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getColor();
    }
    ctx.fillRect(CLOUD_X + GAP * 4 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + 100 + barHeight - ((barHeight * times[i]) / maxTime) - (16 + GAP), BAR_WIDTH, (barHeight * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP * 4 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 4);
  }
};
