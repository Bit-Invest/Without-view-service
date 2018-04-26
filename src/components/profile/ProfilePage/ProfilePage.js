import * as React from 'react';
import { Page } from '@components/common/Page';
import { ProfileHead } from '@components/profile/ProfileHead/ProfileHead';

export const ProfilePage = props => {
  return (
    <Page>
      PROFILE PAGE! Welcome home, bro
      <ProfileHead />
    </Page>
  );
};
