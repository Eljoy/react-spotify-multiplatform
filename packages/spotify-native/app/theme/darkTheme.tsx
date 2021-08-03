import {Colors} from './Colors';
import {Theme} from './types';

const Primary = '#1CBFB5';

const DarkTheme: Theme = {
  colors: {
    text: {
      title: Colors.White,
      subtitle: Colors.White,
      body: Colors.White,
      caption: Colors.Grey,
      button: Colors.White,
    },
    buttons: {
      primary: Primary,
      secondary: Colors.Transparent,
    },
    background: Colors.Black100,
  },
  fontFamily: 'roboto',
} as const;

export default DarkTheme;
