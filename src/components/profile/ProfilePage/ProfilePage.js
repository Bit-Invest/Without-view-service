import * as React from 'react';
import { Page } from '@components/common/Page';
import { ProfileHead } from '@components/profile/ProfileHead';
import { Chart } from '@profile/Chart';
import { ChartFeedBack } from '@profile/ChartFeedBack';
import { ListProducts } from '@profile/ListProducts';
import { PopUpManager } from '@common/PopUpManager';
import { PopUpNewProduct } from '@common/PopUps/PopUpNewProduct';

export const ProfilePage = props => {
  return (
    <Page isLoaded={props.isLoaded}>
      <ProfileHead />
      <Chart />
      <ChartFeedBack />
      <ListProducts onClickAddProduct={props.onClickAddProduct} />
      <PopUpManager
        isShowed={props.isShowedPopUpNewProduct}
        onClickClose={props.onClosePopUp}
      >
        <PopUpNewProduct />
      </PopUpManager>
    </Page>
  );
};
