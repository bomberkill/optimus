import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  primaryColor: 'dark',
  colors: {
    red: [
      '#EF1D1E',
      '#FF6F61', // Rouge orangé
      '#F8BBD0', //Rouge clair
      '#C81010', //Rouge foncé
      '#E63D3D', // Rouge moyen
      '#F8BBD0',
      '#B71C1C',
      '#880E4F',
      '#DC143C',
      '#FF6347',
    ],
    blue: [
      '#758ADD',
      '#03A9F4',
      '#00BCD4',
      // '#009688',
      '#7558db',
      '#4CAF50',
      '#8BC34A',
      '#C0CA33',
      '#FFEB3B',
      '#FFC107',
      '#FF9800',
    ],
    gray: [
      '#F5F3F3',
      '#f3f3f3',
      '#D6D6D6',
      '#C2C2C2',
      '#BDBDBD',
      '#9E9E9E',
      '#757575',
      // '#616161',
      '#424242',
      '#212121',
      '#2a2a2a',
    ],
    white: [
      '#ffffff',
      '#fbfbfb',
      '#eeeeee',
      '#e0e0e0',
      '#d6d6d6',
      '#fafafa',
      '#f5f5f5',
      '#f0f0f0',
      '#d9d9d9',
      '#000000',
    ],
    yellow: [
      '#efc618',
      '#fbfbfb',
      '#eeeeee',
      '#e0e0e0',
      '#d6d6d6',
      '#fafafa',
      '#f5f5f5',
      '#f0f0f0',
      '#ebebeb',
      '#eaeaea',
    ],
    violet: [
      '#E6E6FA', // Lavande
      '#C8A2C8', // Lilas
      '#9966CC', // Améthyste
      '#DDA0DD', // Prune
      '#DA70D6', // Orchidée
      '#FF00FF', // Fuchsia
      '#FF00FF', // Magenta
      '#800080', // Pourpre
      '#EE82EE', // Violet
      '#4B0082', // Indigo
    ],
    pink: [
      '#FFB6C1', // Rose clair
      '#FF69B4', // Rose vif
      '#FF1493', // Rose intense
      '#DB7093', // Violet pâle
      '#C71585', // Violet moyen
      '#D02090', // Violet-rouge
      '#DA70D6', // Orchidée
      '#EE82EE', // Violet
      '#FF00FF', // Fuchsia
      '#f5848e',
    ],
    green: [
      '#198754',
      '#00FF00',
      '#228B22',
      '#808000',
      '#2E8B57',
      '#98FF98',
      '#00FF7F',
      '#006400',
      '#98FB98',
      '#ADFF2F',
    ],
  },

  fontSizes: {
    xs: rem(10),
    sm: rem(14),
    md: rem(18),
    lg: rem(36),
    xl: rem(48),
  },

  lineHeights: {
    xs: '1',
    sm: '1.25',
    md: '1.45',
    lg: '1.5',
    xl: '1.75',
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  spacing: {
    xs: rem(4),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(48),
  },

  fontFamily: 'Cabin, sans-serif',

  headings: {
    fontFamily: 'Cabin, sans-serif',
    fontWeight: '400',
    sizes: {
      h1: {
        fontWeight: '700',
        fontSize: rem(50),
        lineHeight: '1.4',
      },
      h2: {
        fontSize: rem(30),
      },
      h3: {
        fontSize: rem(24),
      },
      h4: {
        fontSize: rem(18),
      },
      h5: {
        fontSize: rem(16),
      },
      h6: {
        fontSize: rem(14),
      },
    },
  },
});
