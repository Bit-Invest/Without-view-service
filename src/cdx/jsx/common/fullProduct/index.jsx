import React from 'react';
import moment from 'moment';
import utils from '@cdx/utils/';
import mixins from '@cdx/mixins/';

//images
import BinanceLogo from '@assets/images/iconBinance.png';

//jsx
import IncomeBlock from './incomeBlock/';
import RatingChart from './ratingChart/';

//styles
import './style.scss';

class FullProduct extends React.Component {
  render() {
    const {
      infoMarketProduct: {
        trader: {
          firstName,
          lastName,
        },
        rating,
        rating: {
          value: ratingValue,
          incomeAverage,
          maxDrawdown,
          maxRecoveryTimeShare,
          nTicks,
          volatilityState,
          baseIncomeHistory,
        },
        name,
        since,
        baseAsset,
        description,
        followers,
        stock,
      },
    } = this.props.reduxState;

    let productProccesing = false;

    if (typeof baseIncomeHistory !== 'object' || baseIncomeHistory.length === 0) {
      productProccesing = true;
    }

    const percentRating = utils.common.getPercentFromValueRating(Math.abs(ratingValue));
    const ratingValueShow = utils.common.getRatingValueShow(ratingValue);
    const styleRating = ratingValue && (
      ratingValue > 0 ? 'positive' : 'sadness'
    );

    let volatilitySqr = () => {
      const correctedN = Math.max(1, nTicks - 2);
      return (
        volatilityState.sqrSum
        - (volatilityState.linSum ** 2) / correctedN
      ) / correctedN;
    };

    const income = baseIncomeHistory && baseIncomeHistory.length && baseIncomeHistory[baseIncomeHistory.length-1].value / baseIncomeHistory[0].value - 1;
    const ratingValues = baseIncomeHistory && baseIncomeHistory.length && {
      "Volatility": (volatilitySqr() * 10).toFixed(2),
      "IncomeAverage": (incomeAverage < 0 ? 0 : incomeAverage).toFixed(2),
      "MaxDrawdown": (maxDrawdown * 100).toFixed(2),
      "DmaxDD": (maxRecoveryTimeShare * 100).toFixed(2),
      "Income": (income < 0 ? 0 : income).toFixed(2),
    };

    const sinceProduct = moment.utc(since).toISOString().slice(0, 10);

    const { historyIncome } = utils.profile.getIncomeForSmallProduct(rating);

    return(
      <div className="fullProduct">
        <div className="mainBlock">
          <div className="curHead">
            <div className="avatar">
              <div className="initials">{utils.common.getInitials(firstName, lastName)}</div>
            </div>
            <div className="rightInfo">
              <div className="curWrap">
                <div className="nameTrader">{`${firstName} ${lastName}`}</div>
                <div className="rating">
                  {
                    !productProccesing ? [
                      <div className="curTitle">Rating {ratingValueShow}: </div>,
                      <div className="score">
                        <div className={`filled ${styleRating}`} style={{width: `${percentRating}%`}}></div>
                      </div>
                    ] : (
                      <div>Rating processing..</div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="historyInfo">
            <div className="infoExchange">
              <div className="exchangeName">{stock}</div>
              <div className="baseAsset">{baseAsset}</div>
            </div>
            <div className="historyBlock">
              <IncomeBlock 
                income={historyIncome}
              />
            </div>
            <div className="infoContent">
              <div className="item">
                <div className="property">Product name: </div>
                <div className="value">{name}</div>
              </div>
              <div className="item">
                <div className="property">Number of investors: </div>
                <div className="value">{followers}</div>
              </div>
              <div className="item">
                <div className="property">Created on: </div>
                <div className="value">{sinceProduct}</div>
              </div>
              <div className="item">
                <div className="property">Product description: </div>
                <div className="value">{description}</div>
              </div>
            </div>
            {
              !productProccesing && (
                <div className="ratingInfo">
                  <div className="ratingValuesChart">
                    <RatingChart ratingValues={ratingValues} />
                  </div>
                  <div className="ratingValuesText">
                    <div className="item">
                      <div className="property">Volatility: </div>
                      <div className="value">{ratingValues['Volatility']}</div>
                    </div>
                    <div className="item">
                      <div className="property">IncomeAverage: </div>
                      <div className="value">{ratingValues['IncomeAverage']}</div>
                    </div>
                    <div className="item">
                      <div className="property">MaxDrawdown: </div>
                      <div className="value">{ratingValues['MaxDrawdown']}%</div>
                    </div>
                    <div className="item">
                      <div className="property">DmaxDD: </div>
                      <div className="value">{ratingValues['DmaxDD']}%</div>
                    </div>
                    <div className="item">
                      <div className="property">Income: </div>
                      <div className="value">{ratingValues['Income']}%</div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
};

export default FullProduct;
