import React from 'react';
import { Link } from "react-router-dom";
import utils from '@cdx/utils/';

import HeadProfitHistory from './headHistory/';

//styles
import './style.scss';

const statusStringKeys = {
  'true': 'VALID',
  'false': 'ERROR',
  'wait': 'WAITING',
};

const moreUrl = {
  'marketproduct': (productId) => `/marketproduct/${productId}`,
  'myproduct': (productId) => `/myproduct/${productId}`,
};

class ActiveForm extends React.Component {
  constructor() {
    super();

    this.state = {
      showingProfitInterval: 'all',
    };
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
      'marketproduct': 'more',
      'myproduct': 'manage',
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
                    <div>Rating</div>
                    <div className="curValue">{ratingValueShow}</div>
                  </div>,
                  <div className="score">
                    <div className={`filled ${styleRating}`} style={{width: `${percentRating}%`}}></div>
                  </div>
                ] : (
                  <div>Rating processing..</div>
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
                  {point:'week', value:weekLastProfit},
                  {point:'month', value:monthLastProfit},
                  {point:'all', value:allLastProfit},
                ]).map(curTimeProfit => (
                  <div 
                    className={`item ${curTimeProfit.value > 0 ? 'positive' : 'badpositive'} ${curTimeProfit.point === this.state.showingProfitInterval ? 'active' : ''}`} 
                    onClick={() => this.setState({showingProfitInterval: curTimeProfit.point})}
                  > 
                    {curTimeProfit.point.toUpperCase()}: {curTimeProfit.value}%
                  </div>
                ))}
              </div>
            ) : null}
            <div className="infoContent">
              <div className="item">Followers: {followers}</div>
              <Link className="moreClick" to={moreUrl[typelist](productId)}>{textLinkButton}</Link>
            </div>
          </div>
        </div>
        {this.props.place === 'profile' && (
          <div className="settings">
            <div className="iconHover"></div>
            <div className="menu">
              <div className="item" onClick={this.props.data.methods.setIndexEditing}>Change options</div>
              <div className="item" onClick={async () => {
                let isRemoved = prompt('Enter product name if you are really going to delete it.', '');
                if (isRemoved !== name) return false;

                await this.props.data.methods.remove({
                  productId,
                });

                await this.props.data.methods.reload();
              }}>Remove</div>
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
              <input onChange={this.setValueInputs.bind(this, 'description')} value={this.state.description} name='description' placeholder='description' />
              <input onChange={this.setValueInputs.bind(this, 'name')} value={this.state.name} name='name' placeholder='name' />
              <select onChange={(event)=>this.setState({baseAsset:event.target.value})}>
                <option value={'BTC'} selected={this.state.baseAsset==='BTC'}>BTC</option> 
                <option value={'USD'} selected={this.state.baseAsset==='USD'}>USD</option>      
              </select>
            </div>
            <div className='onTopSigns'>
              <div className='item save' onClick={this.sendRequest}>Save</div>
              <div className="item" onClick={this.props.data.methods.clearIndexEditing}>Cancel</div>
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
      description: '',
      name: '',
      baseAsset: 'BTC',
      typeId: 0,
      keyId: '',
    };
  }

  setValueInputs(property, event) {
    this.setState({
      [property]: event.target.value,
    });
  }

  sendRequest = async () => {
    await this.props.data.methods.add({
      ...this.state,
    });

    await this.props.data.methods.toggleAdding();
    await this.props.data.methods.reload();
  }

  renderSelectKeys = () =>
    <select onChange={(event)=>this.setState({keyId:event.target.value})}>
      <option value={''} >Select exchange account</option>
      {
        this.props.data.keys.map((curKeys, index) => 
          <option key={index} value={curKeys.keyId} onChange={(e)=>console.log(e)}>{curKeys.name}</option>      
        )
      }
    </select>

  render() {
    if (!this.props.data.keys.length) {
      return(
        <div className='smallProductAdd'>
          <div className='mainBlock'>
            You have no spare exchange accounts, please create a new account to create a product, and generate an API key for it.
          </div>
        </div>
      );
    }

    return(
      <div className='smallProductAdd'>
        <div className='mainBlock'>
          <div className='items inputs'>
            {this.renderSelectKeys()}
            <input onChange={this.setValueInputs.bind(this, 'description')} value={this.state.description} name='description' placeholder='description' />
            <input onChange={this.setValueInputs.bind(this, 'name')} value={this.state.name} name='name' placeholder='name' />
            <select onChange={(event)=>this.setState({baseAsset:event.target.value})}>
              <option value={'BTC'}>BTC</option> 
              <option value={'USD'}>USD</option>      
            </select>
            <select onChange={(event)=>this.setState({typeId:event.target.value})}>
              <option value={0}>Public</option> 
              <option value={1}>Private</option>      
            </select>
          </div>
          <div className='onTopSigns'>
            <div className='item save' onClick={this.sendRequest}>Add</div>
            <div className="item" onClick={this.props.data.methods.toggleAdding}>Cancel</div>
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
    tsStatusKeys={typeof props.data.valid !== 'undefined' ? statusStringKeys[props.data.valid.toString()] : ''}
  />
};

export default SmallProduct;
