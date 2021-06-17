import { darken, lighten, SimplePaletteColorOptions } from "@material-ui/core";

interface Color extends SimplePaletteColorOptions {
  dark: string;
  light: string;
}
const color = (main: string, dark?: string, light?: string): Color => {
  dark = dark || darken(main, 0.2);
  light = light || lighten(main, 0.2);
  return { main, dark, light };
};

const colors: Record<string, Color> = {
  yellow: color("#FFDD00"),
  green: color("#00B16C", "#007A4B", "#70CEAA"),
  red: color("#B34242", "#953737", "#C05454"),
  white: color("#ffffff", "#E0E0E0", "#ffffff"),
  black: color("#000000", "#000000", "#2C2C2C"),
  grey: color("#777777", "#666666", "#888888"),
  slate: color("#2C323F", "#1D2228", "#414852"),

  cut: color("#FF3B38"),
  fill: color("#37A1FD"),
};

export default colors;
