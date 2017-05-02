// import React from 'react';
// import { postal } from 'shattered-game/global';
// import styles from './SpellBook';
//
// export default class SpellBook extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       spells: [
//       ],
//     };
//
//     postal.subscribe({
//       topic: 'ui.spells.list',
//       callback: (spells)=> this.setState({ spells })
//     });
//
//     postal.publish({
//       topic: 'game.query.spells'
//     });
//   }
//
//   render() {
//     return (
//       <div>
//         <h1 className={styles.header}>Spells</h1>
//         <ul>
//           {this.state.spells.map(function (spell, index) {
//             return <li key={index}>{spell.name}</li>;
//           })}
//         </ul>
//       </div>
//     );
//   }
//
// }
