import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import "@fontsource/inter";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#FAFAFA", "#191919")(props),
      color: mode("#37352F", "#FEF6E5")(props),
    },
  }),
};

const components = {
  Button: {
    variants: {
      "new-tab-action": {
        textTransform: "uppercase",
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: "0.19em",
        borderWidth: 1,
        marginBottom: "none",
        marginTop: "none",
        padding: "0px 30px",
      },
    },
  },
  Heading: {
    variants: {
      "section-title": {
        textDecoration: "none",
        fontSize: 28,
        textDecorationColor: "#525252",
        textDecorationThickness: 2,
        textUnderlineOffset: 5,
        marginTop: 3,
        marginBottom: 2,
        letterSpacing: "-0.05em",
      },
      pronouns: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: "0.19em",
        lineHeight: "25px",
        fontSize: 12,
        textTransform: "uppercase",
      },
    },
  },
  Link: {
    baseStyle: (props) => ({
      color: mode("blue.600", "red.300")(props), // TODO: Change link colors here
      textUnderlinOffset: 3,
    }),
  },
};

const fonts = {
  heading: "Inter",
  body: "Inter",
};

const colors = {
  glassTeal: "#88CCCA",
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  cssVarPrefix: "mb",
};

const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts,
});

export default theme;
