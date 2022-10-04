/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#fcedda';
const text = '#fff';
const secondary = '#1C6758';
const background = '#1C6758';
const success = '#28a745';
const error = '#dc3545';
const gotoStories = '#1890ff';
const primaryLight = '#3D8361';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
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
