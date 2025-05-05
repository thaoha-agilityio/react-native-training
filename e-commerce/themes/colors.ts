export const colors = {
  primary: '#F83758',
  dark: '#000000',
  light: '#FFFFFF',

  pagination: '#17223B',
  icon: '#626262',
  star: '#EDB310',
  disabled: '#DEDBDB',
  search: '#BBBBBB',
  active: '#EB3030',

  background: {
    primary: '#FD6E87',
    secondary: '#4392F9',
    icon: '#F2F2F2',
  },

  text: {
    primary: '#000000',
    reversal: '#FFFFFF',
    helper: '#A8A8A9',
    placeholder: '#676767',
    category: '#21003D',
    review: '#222222',
    describe: '#575757',
  },
};

export const colorTheme = {
  light: {
    primary: colors.primary,
    title: colors.text.primary,
    helper: colors.text.helper,
    placeholder: colors.text.placeholder,
    category: colors.text.category,
    review: colors.text.review,
    describe: colors.text.describe,
  },

  dark: {
    primary: colors.light,
    title: colors.light,
    helper: colors.light,
    placeholder: colors.light,
    category: colors.light,
    review: colors.light,
    describe: colors.light,
  },
};
