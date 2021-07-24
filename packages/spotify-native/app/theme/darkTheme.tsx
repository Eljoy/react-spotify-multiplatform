import {Colors} from './Colors';
import {Theme} from './types';

const DarkTheme: Theme = {
  colors: {
    text: {
      title: Colors.White,
      body: Colors.White,
      caption: Colors.Grey,
      button: Colors.White,
    },
    primary: Colors.Green,
    secondary: Colors.Green,
    background: Colors.Black100,
  },
  fontFamily: 'roboto',
} as const;

export default DarkTheme;
