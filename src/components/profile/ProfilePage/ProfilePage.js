import * as React from 'react';
import { Page } from '@components/common/Page';
import { ProfileHead } from '@components/profile/ProfileHead';
import { Chart } from '@profile/Chart';
import { ChartFeedBack } from '@profile/ChartFeedBack';
import { ListProducts } from '@profile/ListProducts';

export const ProfilePage = props => {
  return (
    <Page isLoaded={props.isLoaded}>
      <ProfileHead />
      <Chart />
      <ChartFeedBack />
      <ListProducts />
    </Page>
  );
};
