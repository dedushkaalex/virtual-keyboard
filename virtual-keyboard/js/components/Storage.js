export default class Storage {
  constructor() {
    this.isEnglish = true;
    this.objLng = {
      en: [
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
      ],
      ru: [
        { code: 'Backquote', name: 'ё' }, { code: 'Digit1', name: '1' }, { code: 'Digit2', name: '2' },
        { code: 'Digit3', name: '3' }, { code: 'Digit4', name: '4' }, { code: 'Digit5', name: '5' },
        { code: 'Digit6', name: '6' }, { code: 'Digit7', name: '7' }, { code: 'Digit8', name: '8' },
        { code: 'Digit9', name: '9' }, { code: 'Digit0', name: '0' }, { code: 'Minus', name: '-' },
        { code: 'Equal', name: '=' }, { code: 'Backspace', name: 'backspace' }, // 14

        { code: 'Tab', name: 'tab' }, { code: 'KeyQ', name: 'й' }, { code: 'KeyW', name: 'ц' },
        { code: 'KeyE', name: 'у' }, { code: 'KeyR', name: 'к' }, { code: 'KeyT', name: 'е' },
        { code: 'KeyY', name: 'н' }, { code: 'KeyU', name: 'г' }, { code: 'KeyI', name: 'ш' },
        { code: 'KeyO', name: 'щ' }, { code: 'KeyP', name: 'з' }, { code: 'BracketLeft', name: 'х' },
        { code: 'BracketRight', name: 'ъ' }, { code: 'Backslash', name: '\\' },
        { code: 'Delete', name: 'del' }, // 14

        { code: 'CapsLock', name: 'caps' }, { code: 'KeyA', name: 'ф' }, { code: 'KeyS', name: 'ы' },
        { code: 'KeyD', name: 'в' }, { code: 'KeyF', name: 'а' }, { code: 'KeyG', name: 'п' },
        { code: 'KeyH', name: 'р' }, { code: 'KeyJ', name: 'о' }, { code: 'KeyK', name: 'л' },
        { code: 'KeyL', name: 'д' }, { code: 'Semicolon', name: 'ж' }, { code: 'Quote', name: 'э' },
        { code: 'Enter', name: 'enter' }, // 13

        { code: 'ShiftLeft', name: 'shift' }, { code: 'KeyZ', name: 'я' }, { code: 'KeyX', name: 'ч' },
        { code: 'KeyC', name: 'с' }, { code: 'KeyV', name: 'м' }, { code: 'KeyB', name: 'и' },
        { code: 'KeyN', name: 'т' }, { code: 'KeyM', name: 'ь' }, { code: 'Comma', name: 'б' },
        { code: 'Period', name: 'ю' }, { code: 'Slash', name: '.' }, { code: 'ArrowUp', name: '▲' },
        { code: 'ShiftRight', name: 'shift' }, // 12

        { code: 'ControlLeft', name: 'ctrl' }, { code: 'MetaLeft', name: 'win' }, { code: 'AltLeft', name: 'alt' },
        { code: 'Space', name: 'space' }, { code: 'AltRight', name: 'alt' },
        { code: 'ArrowLeft', name: '◄' }, { code: 'ArrowDown', name: '▼' }, { code: 'ArrowRight', name: '►' }, // 8
      ],
    };
  }

  static setStorage(key, value) {
    return localStorage.setItem(key, value);
  }

  static getStorage(key) {
    if (!localStorage.getItem(key)) {
      Storage.setStorage('language', 'en');
    }
    return localStorage.getItem(key);
  }
}
