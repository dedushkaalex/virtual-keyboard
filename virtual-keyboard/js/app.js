import Keyboard from './components/Keyboard.js';

const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.placeholder = 'Enter a message...';
document.body.prepend(textarea);

const keyboard = new Keyboard();
keyboard.render();
