export const fadeVariants = {
  visible: {
    opacity: 1,
    display: 'block',
  },
  hidden: {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  },
};
