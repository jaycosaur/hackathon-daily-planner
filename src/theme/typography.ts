import { TypographyOptions } from "@material-ui/core/styles/createTypography";

import "@fontsource/nunito-sans/400.css"; // Regular
import "@fontsource/nunito-sans/400-italic.css"; // Italic
import "@fontsource/nunito-sans/700.css"; // Bold

const typography: TypographyOptions = {
  fontFamily: ['"Nunito Sans"', '"Helvetica Neue"', "Arial"].join(","),
  h1: {
    // Page title
    fontSize: "1.625rem", // 26px
    fontWeight: "bold",
  },
  h2: {
    // Widget title
    fontSize: "1.5rem", // 24px
    fontWeight: "bold",
  },
  h3: {
    // Filter view headline
    // Filter Section
    // Tooltip title
    fontSize: "1.0625rem", // 17px
    fontWeight: "bold",
  },
  h4: {
    // Tooltip text
    fontSize: "1.0625rem", // 17px
    fontWeight: "normal",
  },
  h5: {
    // Filter item title
    fontSize: "1rem", // 16px
    fontWeight: "bold",
  },
  h6: {
    // Filter item text
    fontSize: "1rem", // 16px
    fontWeight: "normal",
  },
  subtitle1: {
    fontSize: "0.9375rem", // 15px
    fontWeight: "bold",
  },
  subtitle2: {
    fontSize: "0.876rem", // 14px
    fontWeight: "bold",
  },
  body1: {
    fontSize: "0.9375rem", // 15px
    fontWeight: "normal",
    textTransform: "initial",
  },
  body2: {
    fontSize: "0.876rem", // 14px
    fontWeight: "normal",
    textTransform: "initial",
  },
  button: {
    // CTA
    fontSize: "1rem", // 16px
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  caption: {
    fontSize: "0.8125rem", // 13px
    textTransform: "initial",
  },
  overline: {
    // fontSize: '1rem', // 16px
  },
};

export default typography;
