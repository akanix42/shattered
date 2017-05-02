export default new Promise((resolve, reject) => {
  WebFont.load({
    // google: {
    //   families: ['Nova Square', 'Nova Mono']
    // },
    custom: {
      families: ['dejavu_sans_monobook'],
      urls: ['fonts/DejaVuSansMono.css']
    },
    active(){
      resolve();
    }
  });
});
