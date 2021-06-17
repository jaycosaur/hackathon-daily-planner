import { createMuiTheme } from "@material-ui/core";
import typography from "./typography";
import colors from "./palette";
import { Overrides } from "@material-ui/core/styles/overrides";

const overrides: Overrides = {
  MuiButton: {
    containedSecondary: {
      borderRadius: 100,
    },
  },
};

export const lightTheme = createMuiTheme({
  palette: {
    primary: colors.slate,
    secondary: colors.yellow,
    contrastThreshold: 8,
    text: {
      secondary: "#0000008A",
    },
    background: {
      default: colors.white.dark,
    },
  },
  typography,
  overrides,
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: colors.slate,
    secondary: colors.yellow,
    // contrastThreshold: 7,
    background: {
      default: colors.black.main,
      paper: colors.slate.light,
    },
  },
  typography,
  overrides,
});
