/**
 *
 * TrackComponent
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const TrackCardContainer = styled(Card)`
  && {
    margin: 20px 0;
    display: flex;
    width: ${props => props.maxwidth}px;
    flex-direction: column;
    border-radius: 16px;
    background-color: red;
  }
`;

export function TrackComponent({ artistId, collectionName, artistName, artworkUrl100, trackName, songId, maxwidth }) {
  return (
    <TrackCardContainer data-testid="track-component">
      <Image src={artworkUrl100} width="80%" preview="false" height="250px" />
      <Title> {artistName} </Title>
      <Title> {collectionName} </Title>
    </TrackCardContainer>
  );
}

TrackComponent.propTypes = {};

export default memo(TrackComponent);

TrackComponent.propTypes = {
  artistId: PropTypes.number,
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  trackName: PropTypes.string,
  maxwidth: PropTypes.number,
  songId: PropTypes.number,
  artworkUrl100: PropTypes.string
};

// artistId artistName trackName collectionName previewUrl artworkUrl30 artworkUrl60 artworkUrl100

{
  /* <CustomContainer data-testid="track-component">
<If condition={!isEmpty(artistId)} otherwise={<T data-testid="name-unavailable" id="repo_name_unavailable" />}>
  <T data-testid="name" id={'trackcomponent'} values={{ artistName: artistName }} />
</If>
<If
  condition={!isEmpty(artistId)}
  otherwise={<T data-testid="fullName-unavailable" id="repo_full_name_unavailable" />}
>
  <T data-testid="fullName" id="repository_full_name" values={{ fullName: artistName }} />
</If>
<If condition={trackName} otherwise={<T data-testid="stargazers-unavaiable" id="repo_stars_unavailable" />}>
  <T data-testid="stargazers" id="repository_stars" values={{ trackName: trackName }} />
</If>
</CustomContainer> */
}
