const causesColors: { [key: string]: string } = {
  Fraicheur: "#659DBD",
  Sable: "#FBEEC1",
  Poids: "#BC986A",
  "Non vidé": "#DAAD86",
  Découpe: "#FF1A75",
  Diversité: "#3c4f7d",
  Vers: "#8D8741",
  Mortalité: "#8EE4AF",
  Manque: "#5D5c61",
  Inversion: "#bc80bd",
};

const getCauseColor = (cause: string): string => causesColors[cause];

export { causesColors, getCauseColor };
