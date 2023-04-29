export default class KeyButton {
  constructor(symbol, keyCode) {
    this.symbol = symbol;
    this.keyCode = keyCode;
    this.isPressed = false;
    this.audioStandartKey = new Audio('./assets/audio/key.wav');
    this.element = this.createKey();
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

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

  handleMouseLeave() {
    this.isPressed = false;
    this.element.classList.remove('active');
  }
}
