/**
 *
 * TrackComponent
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image, Typography, Button } from 'antd';
import { isEmpty } from 'lodash';
import { colors, fonts } from '@app/themes/index';
import If from '@components/If';

const { Title, Paragraph } = Typography;

const TrackCardContainer = styled(Card)`
  && {
    border-radius: 0.5rem;
    width: ${props => (props.width ? props.width : '25rem')};
    border: 1px solid ${colors.secondary};
    text-align: center;
`;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Title)`
  && {
    ${fonts.size.xRegular}
  }
`;

const StyledSpan = styled.span`
  && {
    color: ${colors.background};
    ${fonts.weights.bold}
    ${fonts.size.big}
  }
`;

const PlayTrackBtn = styled(Button)`
  && {
    background-color: ${colors.background};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    width: 100%;

    &:hover {
      background-color: ${colors.primaryLight};
      color: ${colors.text};
    }
  }
`;

const ButtonLabel = styled.span`
  && {
    color: ${colors.text};
    ${fonts.weights.bold}
    ${fonts.size.big}
  }
`;

export function TrackComponent({ collectionName, artistName, imageUrl, trackName, trackUrl, handlePauseTrackWrapper }) {
  const [playTrack, setPlayTrack] = useState(false);
  const trackRef = useRef(null);

  const handlePlayPauseBtn = e => {
    e.preventDefault();
    setPlayTrack(!playTrack);

    if (trackRef.current?.paused) {
      trackRef.current.play();
    } else {
      trackRef.current.pause();
    }
    handlePauseTrackWrapper(trackRef);
  };

  return (
    <TrackCardContainer data-testid="track-component">
      <If condition={!isEmpty(imageUrl)} otherwise={<Image>No image available</Image>}>
        <Image src={imageUrl} width="80%" />
      </If>

      <StyledDescription>
        <If condition={!isEmpty(artistName)} otherwise={<StyledTitle>No artist name available</StyledTitle>}>
          <StyledTitle italic={true}> {artistName} </StyledTitle>
        </If>

        <If condition={!isEmpty(collectionName)} otherwise={<Paragraph>No collection name available</Paragraph>}>
          <Paragraph> {collectionName} </Paragraph>
        </If>

        <If condition={!isEmpty(trackName)} otherwise={<Paragraph>No track name available</Paragraph>}>
          <Paragraph>
            <StyledSpan> Track name: </StyledSpan> {trackName}
          </Paragraph>
        </If>
      </StyledDescription>

      <PlayTrackBtn onClick={e => handlePlayPauseBtn(e)}>
        <If
          condition={!trackRef.current?.paused && trackRef.current?.src}
          otherwise={<ButtonLabel> Play </ButtonLabel>}
        >
          <ButtonLabel> Pause </ButtonLabel>
        </If>
      </PlayTrackBtn>
      <audio src={trackUrl} ref={trackRef} />
    </TrackCardContainer>
  );
}

export default memo(TrackComponent);

TrackComponent.propTypes = {
  artistId: PropTypes.number,
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  trackName: PropTypes.string,
  maxWidth: PropTypes.number,
  songId: PropTypes.number,
  imageUrl: PropTypes.string,
  trackUrl: PropTypes.string,
  handlePauseTrackWrapper: PropTypes.func
};
