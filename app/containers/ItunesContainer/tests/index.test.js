/*
 ** Tests for ItunesContainer
 */
import React from 'react';
import { renderProvider } from '@app/utils/testUtils';
import ItunesContainer from '../index';

describe('ItunesContainer Tests', () => {
  it('should render and match to the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
