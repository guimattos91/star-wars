import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
#root{
  min-height: 100vh;
}

main{
  min-height: 76vh;
}

p{
  margin: 0;
}
`
