import * as React from 'react';
import { Chart } from '@profile/Chart';
import { IconUser } from '@components/profile/IconUser/IconUser';
import { UserName } from '@components/profile/UserName/UserName';
import { Rating } from '@components/marketplace/Rating/Rating';
import { Line } from 'react-chartjs-2';
import { Utils } from '@common/Utils';

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
          <div className={`${ROOT_CLASS}__result-data`}>Week </div>
          <div className={`${ROOT_CLASS}__color-result`}> +32%</div>
        </div>
        <div className={`${ROOT_CLASS}__result`}>
          <div className={`${ROOT_CLASS}__result-data`}>Month </div>
          <div className={`${ROOT_CLASS}__color-result`}> +15%</div>
        </div>
        <div className={`${ROOT_CLASS}__stock-exchange`}>BiNANCE</div>
        <div className={`${ROOT_CLASS}__saved-block`}>
          <div className={`${ROOT_CLASS}__saved`}>SAVE</div>
          <div className={`${ROOT_CLASS}__saved-icon`}></div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__description-block`}>
        <div className={`${ROOT_CLASS}__description`}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum  Read more...
        </div>
      </div>
      <div className={`${ROOT_CLASS}__position-container`}>
        <div className={`${ROOT_CLASS}__position-block`}>
          <div>Horizon</div>
          <div>LONG</div>
        </div>
        <div className={`${ROOT_CLASS}__position-block`}>
          <div>Fees</div>
          <div>10%</div>
        </div>
        <div className={`${ROOT_CLASS}__position-block`}>
          <div>Investors</div>
          <div>167</div>
        </div>
      </div>
      <div className={`${ROOT_CLASS}__footer-block`}>
        <div className={`${ROOT_CLASS}__user-block`}>
          <IconUser />
          <div>
            <div className={`${ROOT_CLASS}__user-name-block`}>
              <UserName
                name={props.name}
                surname={`${props.surname[0]}.`}
                theme='MarketPlaceName'
              />
            </div>
            <div className={`${ROOT_CLASS}__rating-block`}>
              <Rating rating={5}/>
            </div>
          </div>
        </div>
        <button
          className={buildButtonClass(props)}
          onClick={props.onClickConnect}
        >
          Connect Now
        </button>
      </div>
    </div>
  )
}

const buildButtonClass = (props) => {
  const buttonClass = `${ROOT_CLASS}__footer-button`;
  return `${buttonClass} ${isNeedHide(props) ? buttonClass + '_hide' : ''}`
}

const isNeedHide = (props) => {
  return !props.personalInfo ||
    props.personalInfo.role === 'trader' || props.isNeedHide;
}
