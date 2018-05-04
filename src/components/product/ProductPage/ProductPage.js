import React from 'react';
import { ProfileHead } from '@components/profile/ProfileHead';
import { Chart } from '@profile/Chart';
import { Page } from '@common/Page';

const ROOT_CLASS = 'product-page';

export const ProductPage = props => {
  return (
    <Page isLoaded={props.isLoaded}>
      <div className={ROOT_CLASS}>
        <ProfileHead />
        <div className={`${ROOT_CLASS}__head-info`}>
          <div>
            <div className={`${ROOT_CLASS}__strategy-name`}>Strategy Name Long</div>
            <div className={`${ROOT_CLASS}__strategy-date`}>Trade 04.02.2018</div>
          </div>
          <div>
            <div className={`${ROOT_CLASS}__currency`}>BTC / USD</div>
            <div className={`${ROOT_CLASS}__exchange`}>Binance</div>
          </div>
        </div>
          <Chart />
        <div className={`${ROOT_CLASS}__description-block`}>
          <div className={`${ROOT_CLASS}__tittle`}>
            Strategy
          </div>
          <div className={`${ROOT_CLASS}__description`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum  Read more...
          </div>
        </div>
      </div>
    </Page>
  );
};
