'use strict';

// Показываем блок .setup, убрав у него класс .hidden
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// массивы имен и фамилий
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

// массивы цветов для мантии и для глаз персонажа
var COLORS_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var COLORS_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

// Объявляем функцию генерации случайных данных (одну для всех случаев)
var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Создаем массив игроков из 4 объектов со случайными параметрами
var TOTAL_PLAYERS = 4;
var players = [];
var createPlayers = function (names, surnames, colorsCoat, colorsEyes, totalPlayers) {
  for (var i = 0; i < totalPlayers; i++) {
    players.push(
        {
          name: getRandomArrayElement(names) + ' ' + getRandomArrayElement(surnames),
          coatColor: getRandomArrayElement(colorsCoat),
          eyesColor: getRandomArrayElement(colorsEyes)
        }
    );
  }
  return players;
};

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

createPlayers(NAMES, SURNAMES, COLORS_COAT, COLORS_EYES, TOTAL_PLAYERS);

var fragment = document.createDocumentFragment();
for (var i = 0; i < players.length; i++) {
  fragment.appendChild(renderWizard(players[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
