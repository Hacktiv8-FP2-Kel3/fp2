import { createStitches } from "@stitches/react";

const stitches = createStitches({
  theme: {
    colors: {
      primary0: "#000000",
      primary1: "#150050",
      primary2: "#3F0071",
      primary3: "#FB2576",
      primary4: "#2F80ED",

      white0: "#FFFFFF",
      white1: "#DEDEDE",

      gray1: "#333333",
      gray2: "#828282",
      gray3: "#BDBDBD",
      gray4: "#E0E0E0",
      gray5: "#F2F2F2",

      buttonPrimary: "#2F80ED",
      buttonSecondary: "#FFFFFF",
      buttonWarning: "#FB4E4E",
    },
    fontWeights: {
      regular: 400,
      semiBold: 600,
      bold: 700,
    },
    fontSizes: {
      body1: "24px",
      body2: "22px",
      body3: "20px",
      body4: "18px",
      body5: "16px",
    },
  },
});

export const { css, styled, globalCss, theme } = stitches;
