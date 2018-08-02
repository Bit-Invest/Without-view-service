import * as React from 'react';
import { Chart } from '@profile/Chart';
import { IconUser } from '@components/profile/IconUser/IconUser';
import { UserName } from '@components/profile/UserName/UserName';
import { Rating } from '@components/marketplace/Rating/Rating';
import { Line } from 'react-chartjs-2';
import { Utils } from '@common/Utils';
import { User } from '@common/User';
import { Unit } from '@common/Unit';

const ROOT_CLASS = 'product-page';

export const PopUpProductPage = props => {
  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__block-exchange`}>
        <div className={`${ROOT_CLASS}__exchange`}>{props.nameStor}</div>
        <div className={`${ROOT_CLASS}__currencyPair`}>BTC/ETH</div>
      </div>
      <div className={`${ROOT_CLASS}__chart`}>
        <Line
          height={384}
          width={681}
          data={{
            labels: ['1 July', '2 July', '3 July', '4 July', '5 July'],
            datasets: [{
              data: [
                {x: 10, y: Utils.randomInt(0, 100)},
                {x: 20, y: Utils.randomInt(0, 100)},
                {x: 30, y: Utils.randomInt(0, 100)},
                {x: 40, y: Utils.randomInt(0, 100)},
                {x: 50, y: Utils.randomInt(0, 100)}
              ],
              backgroundColor: 'rgba(133, 96, 253, 0.4)',
              borderColor: '#8560fd',
              pointRadius: 1,
              borderWidth: 1
            }],

          }}
          options={{
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true,
                position: 'bottom'
              }],
              yAxes: [{
                display: true,
                position: 'right'
              }]
            }
          }}
        />
      </div>
      <div className={`${ROOT_CLASS}__result-block`}>
        <div className={`${ROOT_CLASS}__result`}>
          <Unit title="week" count="32" size="market"/>
        </div>
        <div className={`${ROOT_CLASS}__result`}>
          <Unit title="month" count="-15" size="market"/>
        </div>
        <div className={`${ROOT_CLASS}__stock-exchange`}>BINANCE</div>
      </div>
      <div className={`${ROOT_CLASS}__description-block`}>
        <div className={`${ROOT_CLASS}__description`}>
          {props.info}
        </div>
      </div>
      <div className={`${ROOT_CLASS}__position-container`}>
        <div className={`${ROOT_CLASS}__position-block`}>
          <span>Horizon</span>{' '}
          <span>LONG</span>
        </div>
        <div className={`${ROOT_CLASS}__position-block`}>
          <span>Fees{' '}</span>
          <span>10%</span>
        </div>
        <div className={`${ROOT_CLASS}__position-block`}>
          <span>Investors{' '}</span>
          <span>{props.followersCount}</span>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__footer-block`}>
        <div className={`${ROOT_CLASS}__user-block`}>
          <User
            name={props.name}
            surname={`${props.surname[0]}.`}
            theme="small"
          />
        </div>
        <button
          className={buildButtonClass(props)}
          onClick={props.onClickConnect}
        >
          Connect Now
        </button>
        <button
          className={buildDisconnectClass(props)}
          onClick={props.onClickDisconnect}
        >
          Disconnect
        </button>
      </div>
    </div>
  )
}

const buildDisconnectClass = (props) => {
  const buttonClass = `${ROOT_CLASS}__disconnect-button`;
  return `${buttonClass} ${isNeedHideDisc(props) ? buttonClass + '_hide' : ''}`;
}

const isNeedHideDisc = (props) => {
  return !props.personalInfo ||
    props.personalInfo.role === 'trader' || props.isNeedHideDisc;
}

const buildButtonClass = (props) => {
  const buttonClass = `${ROOT_CLASS}__footer-button`;
  return `${buttonClass} ${isNeedHide(props) ? buttonClass + '_hide' : ''}`;
}

const isNeedHide = (props) => {
  return !props.personalInfo ||
    props.personalInfo.role === 'trader' || props.isNeedHide;
}

// {/*<IconUser />
// <div>
//   <div className={`${ROOT_CLASS}__user-name-block`}>
//     <UserName
//       name={props.name}
//       surname={`${props.surname[0]}.`}
//       theme='MarketPlaceName'
//     />
//   </div>
//   <div className={`${ROOT_CLASS}__rating-block`}>
//     <Rating rating={5}/>
//   </div>
// </div>*/}
