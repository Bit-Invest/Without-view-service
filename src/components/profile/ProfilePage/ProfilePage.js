import * as React from 'react';
import { Page } from '@components/common/Page';
import { ProfileHead } from '@components/profile/ProfileHead';
import { ListProducts } from '@profile/ListProducts';

export const ProfilePage = props => {
  return (
    <Page>
      <ProfileHead />
      <ListProducts />
    </Page>
  );
};
