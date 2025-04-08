export const THEME_REQUEST = 'THEME_REQUEST';
export const LANGUAGE_REQUEST = 'LANGUAGE_REQUEST';

export const changeThemeAction  = (color) => {
  return {
          type: THEME_REQUEST,
          color
      }
};
