export const colors = {
  primary: '#F83758',
  dark: '#000000',
  light: '#FFFFFF',

  pagination: '#C4C4C4',
  icon: '#626262',
  star: '#EDB310',
  disabled: '#DEDBDB',
  search: '#BBBBBB',
  active: '#EB3030',
  border: '#C8C8C8',
  error: '#C82424',

  background: {
    primary: '#FD6E87',
    secondary: '#4392F9',
    icon: '#F2F2F2',
    input: '#F3F3F3',
  },

  text: {
    primary: '#000000',
    reversal: '#FFFFFF',
    helper: '#A8A8A9',
    placeholder: '#676767',
    category: '#21003D',
    review: '#222222',
    describe: '#575757',
    reviewNumber: '#A4A9B3',
  },
};

export const colorTheme = {
  light: {
    default: colors.text.primary,
    primary: colors.primary,
    title: colors.text.primary,
    helper: colors.text.helper,
    placeholder: colors.text.placeholder,
    category: colors.text.category,
    review: colors.text.review,
    describe: colors.text.describe,
    reviewNumber: colors.text.reviewNumber,
  },

  dark: {
    default: colors.light,
    primary: colors.light,
    title: colors.light,
    helper: colors.light,
    placeholder: colors.light,
    category: colors.light,
    review: colors.light,
    describe: colors.light,
    reviewNumber: colors.light,
  },
};
