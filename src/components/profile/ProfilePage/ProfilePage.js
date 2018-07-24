import * as React from 'react';
import { Page } from '@components/common/Page';
import { ProfileHead } from '@components/profile/ProfileHead';
import { ListProducts } from '@profile/ListProducts';
import { ProfileChart } from '@profile/ProfileChart';
import { Products } from '@profile/Products';
import { Investor } from '@profile/Investor';
import { Apis } from '@profile/Apis';

const ROOT_CLASS = 'profile-page';

export const ProfilePage = props => {
  console.log(props);
  const renderInvestors = () => {
    let result = null;
    if (props.user.personalInfo && props.user.personalInfo.role === 'trader') {
      result = (
        <div className={`${ROOT_CLASS}__investors`}>
          <div className={`${ROOT_CLASS}__investors-title`}>
            YOUR INVESTORS
          </div>
          <div className={`${ROOT_CLASS}__investors-list`}>
            {props.investors.map((investor, index) =>
              <div className={`${ROOT_CLASS}__investor`}>
                <Investor {...investor} />
              </div>
            )}
          </div>
        </div>
      );
    }
    return result;
  }

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
          <Products
            role={props.user.personalInfo ? props.user.personalInfo.role : ''}
            products={props.products}
          />
        </div>
        {renderInvestors()}
        <div className={`${ROOT_CLASS}__apis`}>
          <Apis
            keys={[
              {
                stock: 'binance',
                baseAmount: 18.7,
                baseCurrency: 'BTC',
                secondAmount: 182,
                secondCurrency: 'USD',
                status: 'valid'
              }
            ]}
          />
        </div>
      </div>
    </Page>
  );
};
