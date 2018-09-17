'use strict';

// КОНСТАНТЫ: имена, фамилии, цвета, кол-во игроков
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COLORS_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var COLORS_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var COLORS_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var TOTAL_PLAYERS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// переменные
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var players = [];
var fragment = document.createDocumentFragment();
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var inputCoatColor = document.querySelector('input[name="coat-color"]');
var inputEyesColor = document.querySelector('input[name="eyes-color"]');
var inputFireballColor = document.querySelector('input[name="fireball-color"]');

// функции
// Объявляем функцию генерации случайных данных (одну для всех случаев)
var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// функция, возвращающая объект "игрок" с данными
var createObjectPlayer = function () {
  return {
    name: getRandomArrayElement(NAMES) + ' ' + getRandomArrayElement(SURNAMES),
    coatColor: getRandomArrayElement(COLORS_COAT),
    eyesColor: getRandomArrayElement(COLORS_EYES)
  };
};

// Создаем массив игроков со случайными параметрами и добавляем элементы на страницу
var createPlayers = function () {
  for (var i = 0; i < TOTAL_PLAYERS; i++) {
    players.push(createObjectPlayer());
  }
  return players;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// функции для открытия и закрытия окна настроек игрока
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetupWindow();
  }
};

var openSetupWindow = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeSetupWindow = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var setWizardCoatColor = function () {
  var colorCoat = getRandomArrayElement(COLORS_COAT);
  wizardCoat.style.fill = colorCoat;
  inputCoatColor.value = colorCoat;
};
var setWizardEyesColor = function () {
  var colorEyes = getRandomArrayElement(COLORS_EYES);
  wizardEyes.style.fill = colorEyes;
  inputEyesColor.value = colorEyes;
};
var setWizardFireballColor = function () {
  var colorFireball = getRandomArrayElement(COLORS_FIREBALL);
  wizardFireball.style.backgroundColor = colorFireball;
  inputFireballColor.value = colorFireball;
};

// "навешиваем" события
setupOpen.addEventListener('click', openSetupWindow);
setupClose.addEventListener('click', closeSetupWindow);
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});

wizardCoat.addEventListener('click', setWizardCoatColor);
wizardEyes.addEventListener('click', setWizardEyesColor);
wizardFireball.addEventListener('click', setWizardFireballColor);

// Показываем блоки .setup и .setup-similar, убирая класс .hidden
// userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Создаем похожих игроков
createPlayers();
for (var i = 0; i < players.length; i++) {
  fragment.appendChild(renderWizard(players[i]));
}
similarListElement.appendChild(fragment);
