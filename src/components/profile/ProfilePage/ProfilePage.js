import * as React from 'react';
import { Page } from '@components/common/Page';
import { ProfileHead } from '@components/profile/ProfileHead';
import { ProfileChart } from '@profile/ProfileChart';
import { Products } from '@profile/Products';
import { Investor } from '@profile/Investor';
import { Apis } from '@profile/Apis';

const ROOT_CLASS = 'profile-page';

export const ProfilePage = props => {
  const isNeedInvestors = () => {
    return props.user.personalInfo &&
      props.user.personalInfo.role === 'trader' &&
      props.investors &&
      props.investors.length > 0;
  }
  const renderInvestors = () => {
    let result = null;
    if (isNeedInvestors()) {
      result = (
        <div className={`${ROOT_CLASS}__investors`}>
          <div className={`${ROOT_CLASS}__investors-title`}>
            YOUR INVESTORS
          </div>
          <div className={`${ROOT_CLASS}__investors-list`}>
            {props.investors.map((investor, index) =>
              <div className={`${ROOT_CLASS}__investor`} key={index}>
                <Investor {...investor} />
              </div>
            )}
          </div>
        </div>
      );
    }
    return result;
  }

  const renderProducts = () => {
    return props.products && props.products.length > 0 ?
      (
        <Products
          role={props.user.personalInfo ? props.user.personalInfo.role : ''}
          products={props.products}
        />
      ) : null;
  }

  const renderChart = () => {
    return props.products && props.products.length ?
      (
        <ProfileChart products={props.products} />
      ) : null;
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
          {renderChart()}
        </div>
        <div className={`${ROOT_CLASS}__products`}>
          {renderProducts()}
        </div>
        {renderInvestors()}
        <div className={`${ROOT_CLASS}__apis`}>
          <Apis
            keys={props.keys}
          />
        </div>
      </div>
    </Page>
  );
};
