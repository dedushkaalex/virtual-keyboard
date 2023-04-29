import KeyButton from './KeyButton.js';

export default class KeyLayout {
  constructor(keyObj) {
    this.arrayKeys = keyObj;
  }

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
