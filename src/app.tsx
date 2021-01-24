import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { RouterConfig } from './navigation'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#DE4B4B',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
      contrastText: '#fff'
    },
    secondary: {
      // light: will be calculated from palette.secondary.main,
      main: '#F7F7F7'
      // dark: will be calculated from palette.secondary.main,
    },
    background: {
      default: '#F7F7F7'
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
})

console.log('theme :>> ', theme)

const App: React.FC = () => (
  <>
    <div>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <RouterConfig />
          </BrowserRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    </div>
  </>
)

export default App
