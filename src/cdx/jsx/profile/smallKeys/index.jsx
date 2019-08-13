import React from 'react';
import { Link } from "react-router-dom";
import utils from '@cdx/utils/';
import { phrases } from '@cdx/utils/common';

import Help from '@cdx/jsx/common/help/';

//images
import BinanceLogo from '@assets/images/iconBinance.png';

import './style.scss'

const statusStringKeys = {
  'VALID-KEY': [phrases['small-keys']['#1'], 'VALID'],
  'INVALID-KEY': [phrases['small-keys']['#2'], 'ERROR'],
  'KEY-IS-NOT-PROCESSED-YET': [phrases['small-keys']['#3'], 'WAITING'],
  'INVALID-KEY-(NO-DEPOSITS)': [phrases['small-keys']['#4'], 'VALID_NO_DEPO'],
  'VALID-KEY-(NO-DEPOSITS)': [phrases['small-keys']['#4'], 'VALID_NO_DEPO'],
};

const ActiveForm = (props) => {
  const marketplace = props.data.marketplace;
  const baseAsset = props.data.history.baseAsset;
  const balance = utils.profile.getBalanceHistory(props.data.history.balance, baseAsset, 'balance');
  const { productName: followProductName, productId: clickProductId, moderation: followModeration } = props.data.history.usedFollowing || {productName: false};
  const { name: usedProductName, productId: clickUsedProductId } = props.data.history.usedProduct || {name: false};
  const positiveFollowing = true; //test
  // const income = utils.profile.getValueHistory(props.data.history.income, baseAsset, 'income');

  const followProductPage = marketplace ? 'myproduct' : 'marketproduct';
  const markText = marketplace ? 'E' : 'IN';

  return(
    <div className={`smallKeys ${props.tsStatusKeys[1]}`}>
      <div className={`mark marketplace-${marketplace||false}`}>{markText}</div>
      <div className='mainBlock'>
        <div className="blockItem stock">
          {
            ({
              'binance': <img src={BinanceLogo} alt="binance" className="iconLogo" />
            })[props.data.stock]
          }
        </div>
        <div className="blockItem infoData">
          <div className="item name">{props.data.name}</div>
          <Help description={phrases['small-keys']['#24']}>
            <div className={`item status ${props.tsStatusKeys[1]}`}>
              {props.tsStatusKeys[0]}
            </div>
          </Help>
        </div>
        <div className="blockItem history">
          {
            !marketplace ? (
              props.tsStatusKeys[1] === 'VALID_NO_DEPO' ? (
                <div className="item balance">{phrases['small-keys']['#5']}</div>
              ) : props.tsStatusKeys[1] === 'ERROR' ? (
                <div className="item balance">{phrases['small-keys']['#6']}</div>
              ) : (
                !balance ? (
                  <div className="item balance">{phrases['small-keys']['#7']}</div> 
                ) : (
                  <Help description={phrases['small-keys']['#25']}>
                    <div className="item balance">{`${balance.available} (${balance.hold}) ${baseAsset}`}</div> 
                  </Help>
                )
              )
            ) : null
          }
          <Help description={phrases['small-keys']['#26']}>
            <div className={`item usedFollowing ${positiveFollowing && 'positiveFollowing'}`}>
              {followProductName && followModeration === 'approved' ? ([
                <div className="spanItem approved">{phrases['small-keys']['#8']}</div>,
                <Link to={`/${followProductPage}/${clickProductId}`} className="spanItem usedProductName">{followProductName}</Link>
              ]) : usedProductName ? ([
                <div className="spanItem">{phrases['small-keys']['#9']}</div>,
                <Link to={`/myproduct/${clickUsedProductId}`} className="spanItem usedProductName">{usedProductName}</Link>
              ]) : followProductName && followModeration === 'rejected' ? ([
                <div className="spanItem rejected">{phrases['small-keys']['#10']}</div>,
                <Link to={`/${followProductPage}/${clickProductId}`} className="spanItem usedProductName">{followProductName}</Link>
              ]) : followProductName && followModeration === 'wait' ? ([
                <div className="spanItem wait">{phrases['small-keys']['#11']}</div>,
                <Link to={`/${followProductPage}/${clickProductId}`} className="spanItem usedProductName">{followProductName}</Link>
              ]) : null}
            </div>
          </Help>
        </div>
      </div>
      {!marketplace && (
        <div className="settings">
          <div className="iconHover"></div>
          <div className="menu">
            <div className="item edit" onClick={props.data.methods.setIndexEditing}>{phrases['small-keys']['#13_1']}</div>
            <div className="item remove" onClick={async () => {
              let isRemoved = prompt(phrases['small-keys']['#12'], '');
              if (isRemoved !== props.data.name) return false;

              await props.data.methods.remove({
                keyId: props.data.keyId,
              });

              await props.data.methods.reload();
            }}>{phrases['small-keys']['#13']}</div>
          </div>
        </div>
      )}
    </div>
  );
};

class EditingForm extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {
        name: '',
        apiKey: '',
        secretKey: '',
      },
      errorUseForm: '',
    };
  }

  componentWillMount() {
    this.setState({
      data: {
        name: this.props.data.name,
        apiKey: '',
        secretKey: '',
      },
    })
  }

  setValueInputs(property, event) {
    this.setState({
      errorUseForm: '',
      data: { 
        ...this.state.data,
        [property]: event.target.value,
      },
    });
  }

  sendRequest = async () => {
    const isError = Object.entries(this.state.data)
      .some(([prop, curValue]) => !curValue);

    console.log(Object.entries(this.state.data), isError);

    if (isError) {
      return this.setState({
        errorUseForm: 'Fill in all the fields correctly',
      });
    }

    await this.props.data.methods.edit({
      ...this.state,
      keyId: this.props.data.keyId,
    });

    await this.props.data.methods.clearIndexEditing();
    await this.props.data.methods.reload();
  }

  render() {
    return [
      <div className="parentEditingSmallKeys">
        <ActiveForm {...this.props} />
        <div className='smallKeysEdit'>
          <div className='mainBlock'>
            <div className='errorUseForm'>{this.state.errorUseForm}</div>
            <div className='items inputs'>
              <input onChange={this.setValueInputs.bind(this, 'name')} value={this.state.data.name} name='Name' placeholder={phrases['small-keys']['#14']} />
              <input onChange={this.setValueInputs.bind(this, 'apiKey')} value={this.state.data.apiKey} name='Api key' placeholder={phrases['small-keys']['#15']} />
              <input onChange={this.setValueInputs.bind(this, 'secretKey')} value={this.state.data.secretKey} name='Secret key' placeholder={phrases['small-keys']['#16']} />
            </div>
            <div className='onTopSigns'>
              <div className='item save' onClick={this.sendRequest}>{phrases['small-keys']['#17']}</div>
              <div className="item" onClick={this.props.data.methods.clearIndexEditing}>{phrases['small-keys']['#18']}</div>
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
        name: '',
        apiKey: '',
        secretKey: '',
        stock: 'Binance',
      },
      errorUseForm: '',
    };
  }

  setValueInputs(property, event) {
    this.setState({
      errorUseForm: '',
      data: {
        ...this.state.data,
        [property]: event.target.value,
      }
    });
  }

  sendRequest = async () => {
    const isError = Object.entries(this.state.data)
      .some(([prop, curValue]) => !curValue);

    if (isError) {
      return this.setState({
        errorUseForm: 'Fill in all the fields correctly',
      });
    }

    await this.props.data.methods.add({
      ...this.state,
      groupName: this.props.data.groupName,
    });

    await this.props.data.methods.toggleAdding();
    await this.props.data.methods.reload();
  }

  render() {
    return(
      <div className='smallKeysAdd'>
        <div className='mainBlock'>
          <div className='errorUseForm'>{this.state.errorUseForm}</div>
          <div className='items inputs'>
            <input value={`Exchange: ${this.state.data.stock}`} name='stock' placeholder='Stock' />
            <input onChange={this.setValueInputs.bind(this, 'name')} value={this.state.data.name} name='Name' placeholder={phrases['small-keys']['#19']} />
            <input onChange={this.setValueInputs.bind(this, 'apiKey')} value={this.state.data.apiKey} name='Api key' placeholder={phrases['small-keys']['#20']} />
            <input onChange={this.setValueInputs.bind(this, 'secretKey')} value={this.state.data.secretKey} name='Secret key' placeholder={phrases['small-keys']['#21']} />
          </div>
          <div className='onTopSigns'>
            <div className='item save' onClick={this.sendRequest}>{phrases['small-keys']['#22']}</div>
            <div className="item cancel" onClick={this.props.data.methods.toggleAdding}>{phrases['small-keys']['#23']}</div>
          </div>
        </div>
      </div>
    )
  }
};

const SmallKeys = (props) => {
  const TsForm = ({
    'ACTIVE': ActiveForm,
    'EDITING': EditingForm,
    'ADDING': AddingForm,
  })[props.data.status];

  const defaultKey = 'INVALID-KEY';
  let tsStatusKeys = statusStringKeys[props.data.valid ? 'VALID-KEY' : 'INVALID-KEY'] || statusStringKeys[defaultKey];

  if (props.data.comment && props.data.status !== 'ADDING') {
    let commentStr = props.data.comment.toString().toUpperCase();
    commentStr = commentStr.split(' ');
    commentStr = commentStr.join('-');
    tsStatusKeys = statusStringKeys[commentStr] || statusStringKeys[defaultKey];
  }

  return <TsForm 
    data={props.data}
    tsStatusKeys={tsStatusKeys}
  />
}

export default SmallKeys