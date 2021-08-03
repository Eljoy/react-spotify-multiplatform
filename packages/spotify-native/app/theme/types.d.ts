export type Theme = {
  colors: {
    background: string;
    text: {
      title: string;
      subtitle: string;
      body: string;
      caption: string;
      button: string;
    };
    buttons: {
      primary: string;
      secondary: string;
    };
  };
  fontFamily: string;
};
