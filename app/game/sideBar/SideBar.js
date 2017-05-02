// import React from 'react';
// import { postal } from 'shattered-game/global';
// import styles from './sideBar.scss';
// import SpellBook from './SpellBook';
//
// const availableScreens = {
//   SpellBook
// };
//
// export default class SideBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       child: null,
//     };
//
//   }
//
//   componentDidMount() {
//     postal.subscribe({
//       topic: 'ui.sideBar.display',
//       callback: (componentName) =>{
//         this.setState({ child: availableScreens[componentName] })
//       }
//     });
//   }
//
//   render() {
//     return (
//       <div className={styles.sideBar}>
//         { this.state.child ? <this.state.child /> : false }
//       </div>
//     );
//   }
//
// }
