/**
 *
 * TrackComponent
 *
 */

import React, { memo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image, Typography } from 'antd';
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

const PlayTrackBtn = styled.button`
  && {
    background-color: ${colors.background};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    width: 100%;
    cursor: pointer;

    &:hover {
      background-color: ${colors.primaryLight};
      color: ${colors.text};
    }
  }
`;

const ShowDetailsBtn = styled.button`
  && {
    background-color: ${colors.primaryDark};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    width: 100%;
    cursor: pointer;

    &:hover {
      background-color: ${colors.primaryLight};
      color: ${colors.text};
    }
  }
`;

const ButtonWrapper = styled.div`
  && {
    display: flex;
    gap: 1rem;
  }
`;

const ButtonLabel = styled.span`
  && {
    color: ${colors.text};
    ${fonts.weights.bold}
    ${fonts.size.big}
  }
`;

export function TrackComponent({
  trackUrl,
  collectionName,
  isShowDetailsBtn,
  artistName,
  imageUrl,
  trackName,
  trackId,
  country,
  primaryGenreName,
  kind,
  wrapperType,
  trackTimeMillis,
  handlePauseTrackWrapper
}) {
  const [isTrackPlaying, setIsTrackPlaying] = useState(false);
  const audioRef = useRef(null);
  const history = useHistory();

  const handlePlayPauseBtn = e => {
    e.preventDefault();

    const isTrackPaused = audioRef.current?.paused;

    if (isTrackPaused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsTrackPlaying(!isTrackPlaying);
    handlePauseTrackWrapper(audioRef);
  };

  const handleTrackDetailsRoute = trackId => {
    history.push(`/tracks/${trackId}`);
  };

  return (
    <TrackCardContainer data-testid="track-component">
      <If condition={!isEmpty(imageUrl)} otherwise={<Image>No image available</Image>}>
        <Image src={imageUrl} width="80%" />
      </If>

      <StyledDescription>
        <If condition={!isEmpty(artistName)} otherwise={<StyledTitle>No artist name available</StyledTitle>}>
          <StyledTitle>
            <StyledSpan> Artist name: </StyledSpan> {artistName}
          </StyledTitle>
        </If>

        <If condition={!isEmpty(collectionName)} otherwise={<Paragraph>No collection name available</Paragraph>}>
          <Paragraph>
            <StyledSpan> Collection name: </StyledSpan> {collectionName}
          </Paragraph>
        </If>

        <If condition={!isEmpty(trackName)} otherwise={<Paragraph>No track name available</Paragraph>}>
          <Paragraph>
            <StyledSpan> Track name: </StyledSpan> {trackName}
          </Paragraph>
        </If>

        <If condition={!isEmpty(country)}>
          <Paragraph>
            <StyledSpan> Country: </StyledSpan> {country}
          </Paragraph>
        </If>
        <If condition={!isEmpty(kind)}>
          <Paragraph>
            <StyledSpan> Kind: </StyledSpan> {kind}
          </Paragraph>
        </If>
        <If condition={!isEmpty(primaryGenreName)}>
          <Paragraph>
            <StyledSpan> Genre: </StyledSpan> {primaryGenreName}
          </Paragraph>
        </If>
        <If condition={!isEmpty(wrapperType)}>
          <Paragraph>
            <StyledSpan> Wrapper Type: </StyledSpan> {wrapperType}
          </Paragraph>
        </If>

        {trackTimeMillis && (
          <Paragraph>
            <StyledSpan> Duration: </StyledSpan> {Math.floor(trackTimeMillis / 60000)}:
            {Math.floor(trackTimeMillis / 1000) % 60}s
          </Paragraph>
        )}
      </StyledDescription>

      <ButtonWrapper>
        <If condition={isShowDetailsBtn}>
          <ShowDetailsBtn onClick={() => handleTrackDetailsRoute(trackId)}>
            <ButtonLabel> Show Details </ButtonLabel>
          </ShowDetailsBtn>
        </If>

        <PlayTrackBtn onClick={handlePlayPauseBtn}>
          <If
            condition={!audioRef.current?.paused && audioRef.current?.src}
            otherwise={<ButtonLabel> Play </ButtonLabel>}
          >
            <ButtonLabel> Pause </ButtonLabel>
          </If>
        </PlayTrackBtn>
      </ButtonWrapper>
      <audio src={trackUrl} ref={audioRef} data-testid="trackAudio" />
    </TrackCardContainer>
  );
}

export default memo(TrackComponent);

TrackComponent.propTypes = {
  artistId: PropTypes.number,
  trackTimeMillis: PropTypes.number,
  trackId: PropTypes.number,
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  trackName: PropTypes.string,
  maxWidth: PropTypes.number,
  songId: PropTypes.number,
  imageUrl: PropTypes.string,
  wrapperType: PropTypes.string,
  primaryGenreName: PropTypes.string,
  kind: PropTypes.string,
  country: PropTypes.string,
  trackUrl: PropTypes.string,
  isShowDetailsBtn: PropTypes.bool,
  handlePauseTrackWrapper: PropTypes.func
};
