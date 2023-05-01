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
      isCtrl: false,
      isAlt: false,
    };
    this.functionalsKey = ['Backspace', 'Tab', 'Space', 'Enter', 'CapsLock',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ShiftLeft', 'ShiftRight',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'Delete'];
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.virtualKeys = null;
    this.virtualKeyboard = null;
    this.textarea = document.querySelector('.textarea');
    document.body.classList.add(this.language);
  }

  render() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    document.body.prepend(keyboard);
    const row1 = new KeyLayout(this.arrayKeys.slice(0, 14)).renderRow(1);
    const row2 = new KeyLayout(this.arrayKeys.slice(14, 29)).renderRow(2);
    const row3 = new KeyLayout(this.arrayKeys.slice(29, 42)).renderRow(3);
    const row4 = new KeyLayout(this.arrayKeys.slice(42, 55)).renderRow(4);
    const row5 = new KeyLayout(this.arrayKeys.slice(55, 64)).renderRow(5);
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
          this.$hotkeyShiftButtons(e);
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
        this.properties.isAlt = true;
        e.preventDefault();
      } else if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
        this.properties.isCtrl = true;
        e.preventDefault();
      }
    }
    if ((e.ctrlKey && e.altKey && !e.repeat)) {
      this.$changeLanguage();
    }
  }

  handleKeyUp(e) {
    const keyCode = e.code;
    const virtualKey = Array.from(this.virtualKeys).find((key) => key.dataset.keyCode === keyCode);
    if (virtualKey) {
      virtualKey.classList.remove('active');
      this.properties.audioStandartKey.pause();
      this.properties.audioStandartKey.currentTime = 0;
      this.properties.isPlayed = false;
      this.properties.isCtrl = false;
      this.properties.isAlt = false;
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
            if (this.properties.isAlt) {
              this.$changeLanguage();
            }
            break;
          case 'AltLeft':
            if (this.properties.isCtrl) {
              this.$changeLanguage();
            }
            break;
          case 'AltRight':
            if (this.properties.isCtrl) {
              this.$changeLanguage();
            }
            break;
          case 'MetaLeft':
            break;
          default:
            key.classList.add('active');
            if (this.properties.isShift && key.firstElementChild.dataset.subName) {
              Keyboard.$getCurrentPositionCaret(
                this.textarea,
                key.firstElementChild.dataset.subName,
              );
            } else {
              Keyboard.$getCurrentPositionCaret(
                this.textarea,
                key.textContent,
              );
            }
            break;
        }
      }
    });
    this.virtualKeyboard.addEventListener('mouseup', (e) => {
      this.textarea.focus();
      const key = e.target.closest('.key');
      this.properties.isCtrl = false;
      this.properties.isAlt = false;
      if (key && (key.dataset.keyCode === 'ShiftLeft' || key.dataset.keyCode === 'ShiftRight')) {
        this.properties.isShift = false;
        this.$toggleShiftText(this.virtualKeys);
      }
      this.properties.audioStandartKey.pause();
      this.properties.audioStandartKey.currentTime = 0;
    });
  }

  $changeLanguage() {
    if (localStorage.getItem('language') === 'en') {
      document.body.classList.add('ru');
      document.body.classList.remove('en');
      Storage.setStorage('language', 'ru');
    } else {
      document.body.classList.add('en');
      document.body.classList.remove('ru');
      Storage.setStorage('language', 'en');
    }
    this.arrayKeys = this.storage.objLng[localStorage.getItem('language')];
    this.virtualKeyboard.remove();
    this.render();
    this.$toggleCapsLockText(this.virtualKeys);

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

  $hotkeyShiftButtons(e) {
    const keyCode = e.code;
    const virtualKey = Array.from(this.virtualKeys).find((key) => key.dataset.keyCode === keyCode);
    if (!this.functionalsKey.includes(e.code) && e.shiftKey
      && virtualKey.firstElementChild.dataset.subName) {
      Keyboard.$getCurrentPositionCaret(
        this.textarea,
        virtualKey.firstElementChild.dataset.subName,
      );
    } else {
      Keyboard.$getCurrentPositionCaret(
        this.textarea,
        virtualKey.firstElementChild.textContent,
      );
    }
  }

  static $removeTextBackSpace(textareaSelector) {
    const currentPosCaret = textareaSelector.selectionStart;
    const endCaret = currentPosCaret;

    if (textareaSelector.selectionStart !== textareaSelector.selectionEnd) {
      textareaSelector.setRangeText('', textareaSelector.selectionStart, textareaSelector.selectionEnd, 'end');
    } else if (endCaret >= 1) {
      textareaSelector.setRangeText('', endCaret - 1, currentPosCaret, 'end');
    }
  }

  static $removeTextDelete(textareaSelector) {
    const currentPosCaret = textareaSelector.selectionStart;
    const endCaret = currentPosCaret;
    if (textareaSelector.selectionStart !== textareaSelector.selectionEnd) {
      textareaSelector.setRangeText('', textareaSelector.selectionStart, textareaSelector.selectionEnd, 'end');
    } else {
      textareaSelector.setRangeText('', endCaret, currentPosCaret + 1, 'end');
    }
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
      // // 0.63 - это приблизительное соотношение ширины символа к его высоте.
      const currentPosition = textarea.selectionStart;
      const currentLineStart = textarea.value.lastIndexOf('\n', currentPosition - 1) + 1;
      const currentColumn = currentPosition - currentLineStart;
      const previousLineStart = textarea.value.lastIndexOf('\n', currentLineStart - 2) + 1;
      const previousLineEnd = currentLineStart - 1;
      const previousLineLength = previousLineEnd - previousLineStart;
      const previousColumn = Math.min(currentColumn, previousLineLength);
      const newPosition = previousLineStart + previousColumn;
      textarea.setSelectionRange(newPosition, newPosition);
    } else if (keyCode === 'ArrowDown') {
      const currentPosition = textarea.selectionStart;
      const currentLineStart = textarea.value.lastIndexOf('\n', currentPosition - 1) + 1;
      const currentLineEnd = textarea.value.indexOf('\n', currentPosition) !== -1 ? textarea.value.indexOf('\n', currentPosition) : textarea.value.length;
      const currentColumn = currentPosition - currentLineStart;
      const nextLineStart = currentLineEnd + 1;
      const nextLineEnd = textarea.value.indexOf('\n', currentLineEnd + 1) !== -1 ? textarea.value.indexOf('\n', currentLineEnd + 1) : textarea.value.length;
      const nextLineLength = nextLineEnd - nextLineStart;
      const nextColumn = Math.min(currentColumn, nextLineLength);
      const newPosition = nextLineStart + nextColumn;
      textarea.setSelectionRange(newPosition, newPosition);
    }
  }
}
