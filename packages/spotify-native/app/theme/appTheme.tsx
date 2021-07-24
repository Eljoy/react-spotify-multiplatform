import React, {ProviderProps} from 'react';
import DarkTheme from './darkTheme';
import {Theme} from './types';

const AppThemeContext = React.createContext(DarkTheme);
const useAppTheme = () => React.useContext(AppThemeContext);

interface AppThemeProviderProps extends Omit<ProviderProps<Theme>, 'value'> {
  value?: Theme;
}

const AppThemeProvider = ({
  value = DarkTheme,
  ...props
}: AppThemeProviderProps) => (
  <AppThemeContext.Provider value={value} {...props} />
);

export {AppThemeProvider, useAppTheme};
