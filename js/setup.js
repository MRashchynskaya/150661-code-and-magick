'use strict';

// КОНСТАНТЫ: имена, фамилии, цвета, кол-во игроков
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COLORS_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var COLORS_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var TOTAL_PLAYERS = 4;

// переменные
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var players = [];

// Показываем блоки .setup и .setup-similar, убирая класс .hidden
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// функции
// Объявляем функцию генерации случайных данных (одну для всех случаев)
var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// функция, возвращающая объект "игрок" с данными
var createObjectPlayer = function () {
  var objectPlayer = {
    name: getRandomArrayElement(NAMES) + ' ' + getRandomArrayElement(SURNAMES),
    coatColor: getRandomArrayElement(COLORS_COAT),
    eyesColor: getRandomArrayElement(COLORS_EYES)
  };
  return objectPlayer;
};

// Создаем массив игроков со случайными параметрами и добавляем элементы на страницу
var createPlayers = function () {
  for (var i = 0; i < TOTAL_PLAYERS; i++) {
    players.push(createObjectPlayer());
  }
  return players;
};

createPlayers();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < players.length; i++) {
  fragment.appendChild(renderWizard(players[i]));
}

similarListElement.appendChild(fragment);
