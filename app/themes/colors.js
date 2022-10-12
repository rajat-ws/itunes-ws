/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#fcedda';
const primaryDark = '#674747';
const text = '#fff';
const secondary = '#1C6758';
const background = '#256D85';
const success = '#28a745';
const error = '#dc3545';
const gotoStories = '#1890ff';
const primaryLight = '#5F6F94';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  primaryDark,
  primaryLight,
  secondary,
  success,
  background,
  error,
  gotoStories,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
module.exports = colors;
