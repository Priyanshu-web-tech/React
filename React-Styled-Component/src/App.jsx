import React from "react";
import StyledButton, {
  AnimatedLogo,
  DarkButton,
  FancyButton,
  SubmitButton,
} from "./components/Button/Button";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import LOGO from "./assets/react.svg";

const theme = {
  dark: {
    primary: "#000",
    text: "#fff",
  },
  light: {
    primary: "#fff",
    text: "#000",
  },

  fontFamily: "Segoe UI",
};

const GlobalStyle = createGlobalStyle`
button{
  font-family: ${(props) => props.theme.fontFamily};
}
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <StyledButton type="submit">Click me</StyledButton>
        <div>
          <br />
        </div>
        <StyledButton variant="outline">Click me</StyledButton>

        <div>
          <br />
        </div>

        <FancyButton as="a">Click me</FancyButton>

        <div>
          <br />
        </div>

        <SubmitButton>Click me</SubmitButton>

        <div>
          <br />
        </div>

        <AnimatedLogo src={LOGO} />

        <div>
          <br />
        </div>

        <DarkButton>Click Me</DarkButton>
      </div>
    </ThemeProvider>
  );
};

export default App;
