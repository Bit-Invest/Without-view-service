import * as React from 'react';
import { Utils } from '@common/Utils';
import { User } from '@common/User';
import { Unit } from '@common/Unit';
import { StockAreaChart } from '@common/StockAreaChart';

const ROOT_CLASS = 'product-page';

export const PopUpProductPage = props => {
  const card = props.productsManager.filter(el => el.id === props.id)
  const week = card[0].statesTrader !== undefined ? card[0].statesTrader.week : 0
  const month = card[0].statesTrader !== undefined ? card[0].statesTrader.month : 0
  const raiting = card[0].raitingTrader !== undefined ? card[0].raitingTrader.raiting : 0
  const comment = card[0].raitingTrader !== undefined ? card[0].raitingTrader.comment : 0

  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__block-exchange`}>
        <div className={`${ROOT_CLASS}__exchange`}>{props.stockName}</div>
        <div className={`${ROOT_CLASS}__currencyPair`}>BTC</div>
      </div>
      <div className={`${ROOT_CLASS}__chart`}>
        <StockAreaChart
          width={681}
          height={384}
          type="hybrid"
          zoom={false}
          data={props.history}
          stockProps={{
            stroke: "#494a4e",
            tickStroke: "rgba(255, 255, 255, 0.2)"
          }}
          axes
        />
      </div>
      <div className={`${ROOT_CLASS}__result-block`}>
        <div className={`${ROOT_CLASS}__result`}>
          <Unit title="week" count={week} size="market"/>
        </div>
        <div className={`${ROOT_CLASS}__result`}>
          <Unit title="month" count={month} size="market"/>
        </div>
        <div className={`${ROOT_CLASS}__stock-exchange`}>{ card[0].stockName }</div>
      </div>
      <div className={`${ROOT_CLASS}__description-block`}>
        <div className={`${ROOT_CLASS}__description`}>
          {props.info}
        </div>
      </div>
      <div className={`${ROOT_CLASS}__position-container`}>
        <div className={`${ROOT_CLASS}__position-block`}>
          <span>Horizon</span>{' '}
          <span>{ card[0].horizon }</span>
        </div>
        <div className={`${ROOT_CLASS}__position-block`}>
          <span>Fees{' '}</span>
          <span>{ card[0].fees }</span>
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
            positionID={props.positionID}
            imageSrc={`${props.name.toUpperCase()}_${props.surname.toUpperCase()}`}
            raiting={raiting}
            comment={comment}
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
    props.personalInfo.role === 'trader' || props.isNeedHide || !props.hasKey;
}
