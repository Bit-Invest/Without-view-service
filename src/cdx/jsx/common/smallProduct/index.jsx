import React from 'react';
import { Link } from "react-router-dom";
import utils from '@cdx/utils/';
import { phrases } from '@cdx/utils/common';

import Calendar from 'react-calendar';

import HeadProfitHistory from './headHistory/';

//styles
import './style.scss';

const moreUrl = {
  'marketproduct': (productId) => `/marketproduct/${productId}`,
  'myproduct': (productId) => `/myproduct/${productId}`,
};

class ActiveForm extends React.Component {
  constructor() {
    super();

    this.state = {
      showingProfitInterval: 'week',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({showingProfitInterval: 'all'});
    }, 100);
  }

  render() {
    const {
      trader: {
        firstName,
        lastName,
      },
      rating,
      rating: {
        value: ratingValue,
        baseIncomeHistory,
      },
      name,
      baseAsset,
      followers,
      stock,
      typelist,
      productId,
    } = this.props.data;

    const percentRating = utils.common.getPercentFromValueRating(Math.abs(ratingValue));
    const ratingValueShow = utils.common.getRatingValueShow(ratingValue);
    const styleRating = ratingValue && (
      ratingValue > 0 ? 'positive' : 'sadness'
    );

    let productProccesing = false;

    if (typeof baseIncomeHistory !== 'object' || baseIncomeHistory.length === 0) {
      productProccesing = true;
    }

    const {
      historyIncome,
      weekIncome,
      monthIncome
    } = utils.profile.getIncomeForSmallProduct(rating);

    const showingProfit = ({
      'all': historyIncome,
      'week': weekIncome,
      'month': monthIncome,
    })[this.state.showingProfitInterval];

    const weekLastProfit = (weekIncome[weekIncome.length - 1] || {value:0}).value.toFixed(2);
    const monthLastProfit = (monthIncome[monthIncome.length - 1] || {value:0}).value.toFixed(2);
    const allLastProfit = (historyIncome[historyIncome.length - 1] || {value:0}).value.toFixed(2);

    const textLinkButton = ({
      'marketproduct': phrases['small-product']['#8'],
      'myproduct': phrases['small-product']['#9'],
    })[typelist];

    return(
      <div className="smallProduct" key={this.props.index}>
        <div className="mainBlock">
          <div className="curHead">
            <div className="avatar">
              <div className="initials">{utils.common.getInitials(firstName, lastName)}</div>
            </div>
            <div className="rightInfo">
              <div className="curWrap">
                <div className="item nameTrader">{`${firstName} ${lastName}`}</div>
                <div className="item nameProduct">{`${name}`}</div>
              </div>
            </div>
            <div className="righRatingBlock">
              {
                !productProccesing ? [
                  <div className="curTitle">
                    <div>{phrases['small-product']['#1']}</div>
                    <div className="curValue">{ratingValueShow}</div>
                  </div>,
                  <div className="score">
                    <div className={`filled ${styleRating}`} style={{width: `${percentRating}%`}}></div>
                  </div>
                ] : (
                  <div>{phrases['small-product']['#2']}</div>
                )
              }
            </div>
          </div>
          <div className="historyInfo">
            <div className="infoExchange">
              <div className="exchangeName">{stock}</div>
              <div className="baseAsset">{baseAsset}</div>
            </div>
            <div className="historyBlock">
              <HeadProfitHistory
                income={showingProfit}
              />
            </div>
            {historyIncome.length ? (
              <div className="selectShowingTime">
                {([
                  {point:'week', value:weekLastProfit, text: phrases['small-product']['#3']},
                  {point:'month', value:monthLastProfit, text: phrases['small-product']['#4']},
                  {point:'all', value:allLastProfit, text: phrases['small-product']['#5']},
                ]).map(curTimeProfit => (
                  <div
                    className={`item ${curTimeProfit.value > 0 ? 'positive' : 'badpositive'} ${curTimeProfit.point === this.state.showingProfitInterval ? 'active' : ''}`}
                    onClick={() => this.setState({showingProfitInterval: curTimeProfit.point})}
                  >
                    {curTimeProfit.text.toUpperCase()}: {curTimeProfit.value}%
                  </div>
                ))}
              </div>
            ) : null}
            <div className="infoContent">
              <div className="item">{phrases['small-product']['#6']} {followers}</div>
              <Link className="moreClick" to={moreUrl[typelist](productId)}>{textLinkButton}</Link>
            </div>
          </div>
        </div>
        {this.props.place === 'profile' && (
          <div className="settings">
            <div className="iconHover"></div>
            <div className="menu">
              <div className="item" onClick={this.props.data.methods.setIndexEditing}>{phrases['small-product']['#10']}</div>
              <div className="item" onClick={async () => {
                let isRemoved = prompt(phrases['small-product']['#7'], '');
                if (isRemoved !== name) return false;

                await this.props.data.methods.remove({
                  productId,
                });

                await this.props.data.methods.reload();
              }}>{phrases['small-product']['#10_1']}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

class EditingForm extends React.Component {
  constructor() {
    super();

    this.state = {
      description: '',
      name: '',
      baseAsset: '',
    };
  }

  componentWillMount() {
    const {
      data: {
        description,
        name,
        baseAsset,
      },
    } = this.props;

    this.setState({
      description,
      name,
      baseAsset,
    });
  }

  setValueInputs(property, event) {
    this.setState({
      [property]: event.target.value,
    });
  }

  sendRequest = async () => {
    const { data: { productId } } = this.props;

    await this.props.data.methods.edit({
      ...this.state,
      productId,
    });

    await this.props.data.methods.clearIndexEditing();
    await this.props.data.methods.reload();
  }

  render() {
    return [
      <div className="parentEditingSmallProduct">
        <ActiveForm {...this.props} />
        <div className='smallProductEdit'>
          <div className='mainBlock'>
            <div className='items inputs'>
              <input onChange={this.setValueInputs.bind(this, 'description')} value={this.state.description} name='description' placeholder={phrases['small-product']['#11']} />
              <input onChange={this.setValueInputs.bind(this, 'name')} value={this.state.name} name='name' placeholder={phrases['small-product']['#12']} />
              <select onChange={(event)=>this.setState({baseAsset:event.target.value})}>
                <option value={'BTC'} selected={this.state.baseAsset==='BTC'}>BTC</option>
                <option value={'USD'} selected={this.state.baseAsset==='USD'}>USD</option>
              </select>
            </div>
            <div className='onTopSigns'>
              <div className='item save' onClick={this.sendRequest}>{phrases['small-product']['#13']}</div>
              <div className="item" onClick={this.props.data.methods.clearIndexEditing}>{phrases['small-product']['#14']}</div>
            </div>
          </div>
        </div>
      </div>
    ];
  }
};

class AddingForm extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {
        description: '',
        name: '',
        baseAsset: 'BTC',
        typeId: 0,
        keyId: '',
      },
      showCalendar: false,
      startingTimestamp: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 90)),
    };
  }

  onChangeDate = date => {
    this.setState({ startingTimestamp: date });
  }

  setValueInputs(property, event) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [property]: event.target.value,
      },
    });
  }

  sendRequest = async () => {
    await this.props.data.methods.add({
      ...this.state.data,
      startingTimestamp: new Date(this.state.startingTimestamp).getTime(),
    });

    await this.props.data.methods.toggleAdding();
    await this.props.data.methods.reload();
  }

  renderSelectKeys = () =>
    <select 
      onChange={this.setValueInputs.bind(this, 'keyId')}
    >
      <option value={''}>{phrases['small-product']['#15']}</option>
      {
        this.props.data.keys.map((curKeys, index) =>
          <option key={index} value={curKeys.keyId}>{curKeys.name}</option>
        )
      }
    </select>

  render() {
    if (!this.props.data.keys.length) {
      return(
        <div className='smallProductAdd'>
          <div className='mainBlock'>{phrases['small-product']['#16']}</div>
        </div>
      );
    }

    return(
      <div className='smallProductAdd'>
        <div className='mainBlock'>
          <div className='items inputs'>
            {this.renderSelectKeys()}
            <input onChange={this.setValueInputs.bind(this, 'description')} value={this.state.data.description} name='description' placeholder={phrases['small-product']['#17']} />
            <input onChange={this.setValueInputs.bind(this, 'name')} value={this.state.data.name} name='name' placeholder={phrases['small-product']['#18']} />
            <select onChange={this.setValueInputs.bind(this, 'baseAsset')}>
              <option value={'BTC'}>BTC</option>
              <option value={'USD'}>USD</option>
              <option value={'BTC'}>BNB</option>
              <option value={'USD'}>ETH</option>
            </select>
            <select onChange={this.setValueInputs.bind(this, 'typeId')}>
              <option value={0}>{phrases['small-product']['#21']}</option>
              <option value={1}>{phrases['small-product']['#22']}</option>
            </select>
            <div className="startDateTitle">
              Your product will be rated from {this.state.startingTimestamp.toISOString().substr(0, 10)}
              <div className="clickChangeStartDate" onClick={() => this.setState({ showCalendar: !this.state.showCalendar })}>
                { !this.state.showCalendar ? 'Click here for change' : 'Save' }
              </div>
            </div>
            <div 
              className="startDateCalendar"
              style={{ display: this.state.showCalendar ? 'flex' : 'none' }}
            >
              <Calendar
                onChange={this.onChangeDate}
                value={this.state.data.date}
                locale="en-EN"
              />
            </div>
          </div>
          <div className='onTopSigns'>
            <div className='item save' onClick={this.sendRequest}>{phrases['small-product']['#19']}</div>
            <div className="item" onClick={this.props.data.methods.toggleAdding}>{phrases['small-product']['#20']}</div>
          </div>
        </div>
      </div>
    )
  }
};

const SmallProduct = (props) => {
  const TsForm = ({
    'ACTIVE': ActiveForm,
    'EDITING': EditingForm,
    'ADDING': AddingForm,
  })[props.data.status];

  return <TsForm
    {...props}
  />
};

export default SmallProduct;
