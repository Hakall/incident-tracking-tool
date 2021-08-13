const causesColors: { [key: string]: string } = {
  Fraicheur: "hsl(83, 70%, 50%)",
  Sable: "hsl(63, 70%, 50%)",
  Poids: "hsl(279, 70%, 50%)",
  "Non vidé": "hsl(109, 70%, 50%)",
  Découpe: "hsl(338, 70%, 50%)",
  Diversité: "hsl(82, 70%, 50%)",
  Vers: "hsl(145, 70%, 50%)",
  Mortalité: "hsl(245, 70%, 50%)",
  Manque: "hsl(45, 70%, 50%)",
};

const getCauseColor = (cause: string): string => causesColors[cause];

export { causesColors, getCauseColor };
