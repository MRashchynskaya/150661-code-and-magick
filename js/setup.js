'use strict';

// Показываем блок .setup, убрав у него класс .hidden
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// массивы имен и фамилий
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

// массивы цветов для мантии и для глаз персонажа
var colorsCoat = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var colorsEyes = ['black', 'red', 'blue', 'yellow', 'green'];

// Объявляем функцию генерации случайных данных (одну для всех случаев)
var randomize = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Создаем массив из 4 объектов со случайными параметрами

var players = [
  {
    name: randomize(names) + ' ' + randomize(surnames),
    coatColor: randomize(colorsCoat),
    eyesColor: randomize(colorsEyes)
  },
  {
    name: randomize(names) + ' ' + randomize(surnames),
    coatColor: randomize(colorsCoat),
    eyesColor: randomize(colorsEyes)
  },
  {
    name: randomize(names) + ' ' + randomize(surnames),
    coatColor: randomize(colorsCoat),
    eyesColor: randomize(colorsEyes)
  },
  {
    name: randomize(names) + ' ' + randomize(surnames),
    coatColor: randomize(colorsCoat),
    eyesColor: randomize(colorsEyes)
  }
];

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

var fragment = document.createDocumentFragment();
for (var i = 0; i < players.length; i++) {
  fragment.appendChild(renderWizard(players[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
