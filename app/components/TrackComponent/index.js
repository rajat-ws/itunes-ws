/**
 *
 * TrackComponent
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { colors } from '@app/themes/index';
import If from '@components/If';
import { Card, Image, Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

const TrackCardContainer = styled(Card)`
  && {
    border-radius: 0.5rem;
    width: ${props => (props.width ? props.width : '25rem')};
    border: none;
    background-color: ${colors.secondary};
    text-align: center;
`;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlayTrackBtn = styled(Button)`
  && {
    background-color: ${colors.btnBackground};
    border: none;
    color: ${colors.btnText};
    border-radius: 0.5rem;
    width: 100%;
  }
`;

export function TrackComponent({ collectionName, artistName, imgUrl, trackName }) {
  return (
    <TrackCardContainer data-testid="track-component">
      <If condition={!isEmpty(imgUrl)} otherwise={<Image>No image available</Image>}>
        <Image src={imgUrl} width="80%" height="250px" />
      </If>

      <StyledDescription>
        <If condition={!isEmpty(artistName)} otherwise={<Title>No artist name available</Title>}>
          <Title style={{ fontSize: 18 }} italic={true}>
            {artistName}
          </Title>
        </If>

        <If condition={!isEmpty(collectionName)} otherwise={<Paragraph>No collection name available</Paragraph>}>
          <Paragraph> {collectionName} </Paragraph>
        </If>

        <If condition={!isEmpty(trackName)} otherwise={<Paragraph>No track name available</Paragraph>}>
          <Paragraph> Track name: {trackName} </Paragraph>
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
  imgUrl: PropTypes.string
};
