import KeyButton from './KeyButton.js';

export default class KeyLayout {
  constructor(keyObj) {
    this.arrayKeys = keyObj;
  }

  renderRow(index) {
    const keyboardRow = document.createElement('div');
    keyboardRow.className = `keyboard__row row-${index}`;
    const keyboardList = document.createElement('div');
    keyboardList.className = 'keyboard__list';
    keyboardRow.append(keyboardList);
    this.arrayKeys
      .map((objKey) => keyboardList.append(new KeyButton(
        objKey.name,
        objKey.code,
        objKey.subname,
      ).element));
    return keyboardRow;
  }
}
