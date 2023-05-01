import Keyboard from './components/Keyboard.js';

document.body.insertAdjacentHTML('beforeend', `
<div class= "help" >
  <ul class="help__list">
    <li class="help__item">КЛАВИАТУРА ВЫПОЛНЕНА НА СИСТЕМЕ <strong>WINDOWS</strong></li>
    <li class="help__item">Переключение раскладки по клавишам <strong>ctrl + alt</strong> ( левые клавиши )</li>
    <li class="help__item">Смена языка сохраняется после перезагрузки страницы</li>
  </ul>
  </ div>
`);
const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.placeholder = 'Enter a message...';
document.body.prepend(textarea);

const keyboard = new Keyboard();
keyboard.render();
