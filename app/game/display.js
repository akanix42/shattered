import ROT from 'rot-js';
const options = {
  width: 40,
  height: 40,
  fontSize: 18,
  forceSquareRatio: true,
  fontFamily: 'dejavu_sans_monobook'
};

const display = new ROT.Display(options);

export default display;

export {createDisplay};

function createDisplay(additionalOptions = {}) {
  return new ROT.Display({...options, ...additionalOptions});
}
