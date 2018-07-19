import * as React from 'react';
import { Page } from '@components/common/Page';
import { ProfileHead } from '@components/profile/ProfileHead';
import { ListProducts } from '@profile/ListProducts';
import { ProfileChart } from '@profile/ProfileChart';

const ROOT_CLASS = 'profile-page';

export const ProfilePage = props => {
  return (
    <Page isLoaded={props.isLoaded}>
      <div className={ROOT_CLASS}>
        <ProfileHead
          personalInfo={props.user.personalInfo ? props.user.personalInfo : {}}
          push={props.push}
          logOut={props.userLogOut}
        />
        <div className={`${ROOT_CLASS}__chart-wrap`}>
          <ProfileChart />
        </div>
        <div className={`${ROOT_CLASS}__products`}>
        </div>
      </div>
    </Page>
  );
};
