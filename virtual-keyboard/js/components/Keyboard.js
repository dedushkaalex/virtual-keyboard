import KeyLayout from './KeyLayout.js';
import Storage from './Storage.js';

export default class Keyboard {
  constructor() {
    this.storage = new Storage();
    this.language = Storage.getStorage('language');
    this.arrayKeys = this.storage.objLng[this.language];
    this.properties = {
      isCapsLock: false,
      isShift: false,
      isTab: false,
      audioStandartKey: new Audio('./assets/audio/key.wav'),
      isPlayed: false,
    };
    this.functionalsKey = ['Backspace', 'Tab', 'Space', 'Enter', 'CapsLock',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ShiftLeft', 'ShiftRight',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'Delete'];
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.virtualKeys = null;
    this.virtualKeyboard = null;
    this.textarea = document.querySelector('.textarea');
  }

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
    this.virtualKeyboard = document.querySelector('.keyboard');
    this.handleVirtualMouseDown();
  }

  handleKeyDown(e) {
    if (!this.properties.isPlayed) {
      const startPlayPromise = this.properties.audioStandartKey.play();
      if (startPlayPromise !== undefined) {
        startPlayPromise
          .then(() => {
            // Start whatever you need to do only after playback
            // has begun.
          })
          .catch(() => {
          });
      }
      this.properties.isPlayed = true;
    }
    const keyCode = e.code;
    const virtualKey = Array.from(this.virtualKeys).find((key) => key.dataset.keyCode === keyCode);
    if (virtualKey) {
      if (!this.functionalsKey.includes(virtualKey.dataset.keyCode)) {
        if (!(e.ctrlKey && virtualKey.dataset.keyCode === 'KeyV')
          && !(e.ctrlKey && virtualKey.dataset.keyCode === 'KeyA')
          && !(e.ctrlKey && virtualKey.dataset.keyCode === 'KeyC')
          && !(e.ctrlKey && virtualKey.dataset.keyCode === 'KeyX')) {
          e.preventDefault();
          Keyboard.$getCurrentPositionCaret(
            this.textarea,
            virtualKey.firstElementChild.textContent,
          );
        }
      } else {
        virtualKey.classList.add('active');
      }
      virtualKey.classList.add('active');
      this.textarea.focus();
      if (keyCode === 'CapsLock' && !e.repeat) {
        this.$toggleCapsLock();
        this.$toggleCapsLockText(this.virtualKeys);
      } else if (e.shiftKey && (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight')) {
        this.properties.isShift = true;
        this.$toggleShiftText(this.virtualKeys);
      } else if (keyCode === 'Tab') {
        e.preventDefault();
        this.textarea.value += '    ';
      } else if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
        e.preventDefault();
      } else if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
        e.preventDefault();
      }
    }
    this.$changeLanguage(e);
  }

  handleKeyUp(e) {
    const keyCode = e.code;
    const virtualKey = Array.from(this.virtualKeys).find((key) => key.dataset.keyCode === keyCode);
    if (virtualKey) {
      virtualKey.classList.remove('active');
      this.properties.isPlayed = false;
      if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
        this.properties.isShift = false;
        this.$toggleShiftText(this.virtualKeys);
      }
    }
  }

  handleVirtualMouseDown() {
    this.virtualKeyboard.addEventListener('mousedown', (e) => {
      const key = e.target.closest('.key');
      if (key) {
        switch (key.dataset.keyCode) {
          case 'Backspace':
            key.classList.add('active');
            Keyboard.$removeTextBackSpace(this.textarea);
            this.textarea.focus();
            break;
          case 'Tab':
            key.classList.add('active');
            this.textarea.value += '    ';
            this.textarea.focus();
            break;
          case 'Space':
            key.classList.add('active');
            Keyboard.$getCurrentPositionCaret(this.textarea, ' ');
            this.textarea.focus();
            break;
          case 'CapsLock':
            this.$toggleCapsLock();
            key.classList.add('active');
            this.$toggleCapsLockText(this.virtualKeys);
            this.textarea.focus();
            break;
          case 'Enter':
            key.classList.add('active');
            Keyboard.$getCurrentPositionCaret(this.textarea, '\n');
            this.textarea.focus();
            break;
          case 'ArrowLeft':
            Keyboard.$movePositionCaretByArrowButtons(this.textarea, 'ArrowLeft');
            break;
          case 'ArrowRight':
            Keyboard.$movePositionCaretByArrowButtons(this.textarea, 'ArrowRight');
            break;
          case 'ArrowUp':
            Keyboard.$movePositionCaretByArrowButtons(this.textarea, 'ArrowUp');
            break;
          case 'ArrowDown':
            Keyboard.$movePositionCaretByArrowButtons(this.textarea, 'ArrowDown');
            break;
          case 'Delete':
            Keyboard.$removeTextDelete(this.textarea);
            break;
          case 'ShiftLeft':
            this.properties.isShift = true;
            this.$toggleShiftText(this.virtualKeys);
            key.classList.add('active');
            break;
          case 'ShiftRight':
            this.properties.isShift = true;
            this.$toggleShiftText(this.virtualKeys);
            key.classList.add('active');
            break;
          case 'ControlLeft':
            break;
          case 'AltLeft':
            break;
          case 'MetaLeft':
            break;
          default:
            key.classList.add('active');
            Keyboard.$getCurrentPositionCaret(this.textarea, key.textContent);
            break;
        }
      }
    });
    this.virtualKeyboard.addEventListener('mouseup', (e) => {
      this.textarea.focus();
      const key = e.target.closest('.key');
      if (key && (key.dataset.keyCode === 'ShiftLeft' || key.dataset.keyCode === 'ShiftRight')) {
        this.properties.isShift = false;
        this.$toggleShiftText(this.virtualKeys);
      }
    });
  }

  $changeLanguage(e) {
    if (e.ctrlKey && e.altKey && !e.repeat) {
      if (localStorage.getItem('language') === 'en') {
        Storage.setStorage('language', 'ru');
      } else {
        Storage.setStorage('language', 'en');
      }
      this.arrayKeys = this.storage.objLng[localStorage.getItem('language')];
      this.virtualKeyboard.remove();
      this.render();
      this.$toggleCapsLockText(this.virtualKeys);
    }
    return localStorage.getItem('language');
  }

  $toggleCapsLock() {
    this.properties.isCapsLock = !this.properties.isCapsLock;
  }

  $toggleCapsLockText(keysSelector) {
    keysSelector.forEach((key) => {
      const elem = key;
      if (this.properties.isCapsLock) {
        elem.firstElementChild.textContent = key.firstElementChild.textContent.toUpperCase();
      } else {
        elem.firstElementChild.textContent = key.firstElementChild.textContent.toLowerCase();
      }
    });
  }

  $toggleShiftText(keysSelector) {
    keysSelector.forEach((key) => {
      const elem = key;
      if (this.properties.isShift) {
        elem.firstElementChild.textContent = key.firstElementChild.textContent.toUpperCase();
      } else {
        elem.firstElementChild.textContent = key.firstElementChild.textContent.toLowerCase();
      }
    });
  }

  static $removeTextBackSpace(textareaSelector) {
    const currentPosCaret = textareaSelector.selectionStart;
    const endCaret = currentPosCaret;
    if (endCaret >= 1) {
      textareaSelector.setRangeText('', endCaret - 1, currentPosCaret, 'end');
    }
  }

  static $removeTextDelete(textareaSelector) {
    const currentPosCaret = textareaSelector.selectionStart;
    const endCaret = currentPosCaret;
    textareaSelector.setRangeText('', endCaret, currentPosCaret + 1, 'end');
  }

  static $getCurrentPositionCaret(textareaSelector, value) {
    const currentPosCaret = textareaSelector.selectionStart;
    const endCaret = currentPosCaret;
    textareaSelector.setRangeText(`${value}`, currentPosCaret, endCaret, 'end');
  }

  static $movePositionCaretByArrowButtons(textareaSelector, keyCode) {
    const textarea = textareaSelector;
    if (keyCode === 'ArrowLeft') {
      textarea.selectionStart -= 1;
      textarea.selectionEnd = textarea.selectionStart;
    } else if (keyCode === 'ArrowRight') {
      textarea.selectionStart += 1;
      textarea.selectionEnd = textarea.selectionStart;
    } else if (keyCode === 'ArrowUp') {
      // 104 - количество текста, которое может влезть в строку
      const absRow = Math.abs(textarea.selectionStart - 104);
      textarea.selectionStart = absRow;
      textarea.selectionEnd = textarea.selectionStart;
    } else if (keyCode === 'ArrowDown') {
      const absRow = Math.abs(textarea.selectionStart + 104);
      textarea.selectionStart = absRow;
      textarea.selectionEnd = textarea.selectionStart;
    }
  }
}
