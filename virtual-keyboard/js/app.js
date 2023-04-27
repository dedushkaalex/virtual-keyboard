class KeyButton {
  constructor(symbol, keyCode) {
    this.symbol = symbol;
    this.keyCode = keyCode;
    this.isPressed = false;
    this.audioStandartKey = new Audio('./assets/audio/key.wav');
    this.element = this.createKey();
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  createKey() {
    const keyElement = document.createElement('span');
    keyElement.classList.add('key');
    keyElement.dataset.keyCode = this.keyCode;
    if (this.keyCode === 'Backspace') keyElement.classList.add('key-backspace');
    if (this.keyCode === 'Tab') keyElement.classList.add('key-tab');
    if (this.keyCode === 'CapsLock') keyElement.classList.add('key-caps');
    if (this.keyCode === 'ShiftLeft' || this.keyCode === 'ShiftRight') keyElement.classList.add('key-shift');
    if (this.keyCode === 'Enter') keyElement.classList.add('key-enter');
    if (this.keyCode === 'ControlLeft') keyElement.classList.add('key-ctrl');
    if (this.keyCode === 'MetaLeft') keyElement.classList.add('key-win');
    if (this.keyCode === 'AltLeft' || this.keyCode === 'AltRight') keyElement.classList.add('key-alt');
    if (this.keyCode === 'Space') keyElement.classList.add('key-space');
    if (this.keyCode === 'Delete') keyElement.classList.add('key-del');
    keyElement.insertAdjacentHTML('beforeend', `<i>${this.symbol}</i>`);
    return keyElement;
  }

  handleMouseDown() {
    this.isPressed = true;
    this.element.classList.add('active');
    this.audioStandartKey.play();
  }

  handleMouseUp() {
    this.isPressed = false;
    this.element.classList.remove('active');
  }
}

class KeyLayout {
  constructor(keyObj) {
    this.arrayKeys = keyObj;
  }

  // eslint-disable-next-line class-methods-use-this
  renderRow() {
    const keyboardRow = document.createElement('div');
    keyboardRow.className = 'keyboard__row';
    const keyboardList = document.createElement('div');
    keyboardList.className = 'keyboard__list';
    keyboardRow.append(keyboardList);
    this.arrayKeys
      .map((objKey) => keyboardList.append(new KeyButton(objKey.name, objKey.code).element));
    return keyboardRow;
  }
}
class Keyboard {
  constructor(keyObj) {
    this.arrayKeys = keyObj;
    this.properties = {
      isCapsLock: false,
      isShift: false,
      isTab: false,
      audioStandartKey: new Audio('./assets/audio/key.wav'),
      language: null,
    };
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.virtualKeys = null;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    document.body.prepend(keyboard);
    const row1 = new KeyLayout(this.arrayKeys.slice(0, 14)).renderRow();
    const row2 = new KeyLayout(this.arrayKeys.slice(14, 29)).renderRow();
    const row3 = new KeyLayout(this.arrayKeys.slice(29, 42)).renderRow();
    const row4 = new KeyLayout(this.arrayKeys.slice(42, 55)).renderRow();
    const row5 = new KeyLayout(this.arrayKeys.slice(55, 64)).renderRow();
    keyboard.append(row1);
    keyboard.append(row2);
    keyboard.append(row3);
    keyboard.append(row4);
    keyboard.append(row5);
    this.virtualKeys = document.querySelectorAll('.key');
  }

  handleKeyDown(e) {
    this.properties.audioStandartKey.play();
    const keyCode = e.code;
    const virtualKey = Array.from(this.virtualKeys).find((key) => key.dataset.keyCode === keyCode);
    if (virtualKey) {
      virtualKey.classList.add('active');
    }
  }

  handleKeyUp(e) {
    const keyCode = e.code;
    const virtualKey = Array.from(this.virtualKeys).find((key) => key.dataset.keyCode === keyCode);
    if (virtualKey) {
      virtualKey.classList.remove('active');
    }
  }
}

const keyObj = [
  { code: 'Backquote', name: '`' }, { code: 'Digit1', name: '1' }, { code: 'Digit2', name: '2' },
  { code: 'Digit3', name: '3' }, { code: 'Digit4', name: '4' }, { code: 'Digit5', name: '5' },
  { code: 'Digit6', name: '6' }, { code: 'Digit7', name: '7' }, { code: 'Digit8', name: '8' },
  { code: 'Digit9', name: '9' }, { code: 'Digit0', name: '0' }, { code: 'Minus', name: '-' },
  { code: 'Equal', name: '=' }, { code: 'Backspace', name: 'backspace' }, // 14

  { code: 'Tab', name: 'tab' }, { code: 'KeyQ', name: 'q' }, { code: 'KeyW', name: 'w' },
  { code: 'KeyE', name: 'e' }, { code: 'KeyR', name: 'r' }, { code: 'KeyT', name: 't' },
  { code: 'KeyY', name: 'y' }, { code: 'KeyU', name: 'u' }, { code: 'KeyI', name: 'i' },
  { code: 'KeyO', name: 'o' }, { code: 'KeyP', name: 'p' }, { code: 'BracketLeft', name: '[' },
  { code: 'BracketRight', name: ']' }, { code: 'Backslash', name: '\\' },
  { code: 'Delete', name: 'del' }, // 14

  { code: 'CapsLock', name: 'caps' }, { code: 'KeyA', name: 'a' }, { code: 'KeyS', name: 's' },
  { code: 'KeyD', name: 'd' }, { code: 'KeyF', name: 'f' }, { code: 'KeyG', name: 'g' },
  { code: 'KeyH', name: 'h' }, { code: 'KeyJ', name: 'j' }, { code: 'KeyK', name: 'k' },
  { code: 'KeyL', name: 'l' }, { code: 'Semicolon', name: ';' }, { code: 'Quote', name: '\'' },
  { code: 'Enter', name: 'enter' }, // 13

  { code: 'ShiftLeft', name: 'shift' }, { code: 'KeyZ', name: 'z' }, { code: 'KeyX', name: 'x' },
  { code: 'KeyC', name: 'c' }, { code: 'KeyV', name: 'v' }, { code: 'KeyB', name: 'b' },
  { code: 'KeyN', name: 'n' }, { code: 'KeyM', name: 'm' }, { code: 'Comma', name: ',' },
  { code: 'Period', name: '.' }, { code: 'Slash', name: '/' }, { code: 'ArrowUp', name: '▲' },
  { code: 'ShiftRight', name: 'shift' }, // 12

  { code: 'ControlLeft', name: 'ctrl' }, { code: 'MetaLeft', name: 'win' }, { code: 'AltLeft', name: 'alt' },
  { code: 'Space', name: 'space' }, { code: 'AltRight', name: 'alt' },
  { code: 'ArrowLeft', name: '◄' }, { code: 'ArrowDown', name: '▼' }, { code: 'ArrowRight', name: '►' }, // 8
];

const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.placeholder = 'Enter a message...';
document.body.prepend(textarea);
const keyboard = new Keyboard(keyObj);
keyboard.render();
