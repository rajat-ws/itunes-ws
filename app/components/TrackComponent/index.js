/**
 *
 * TrackComponent
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { colors, fonts } from '@app/themes/index';
import styled from 'styled-components';
import { Card, Image, Typography, Button } from 'antd';
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
    color: ${colors.text};
    border-radius: 0.5rem;
    width: 100%;

    &:hover {
      background-color: ${colors.primaryLight};
      color: ${colors.text};
    }
  }
`;

export function TrackComponent({ collectionName, artistName, imageUrl, trackName }) {
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

      <PlayTrackBtn>Play</PlayTrackBtn>
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
  imageUrl: PropTypes.string
};
