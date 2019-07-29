import React from 'react';
import { Link } from "react-router-dom";
import utils from '@cdx/utils/';

//images
import BinanceLogo from '@assets/images/iconBinance.png';

import './style.scss'

const statusStringKeys = {
  'VALID-KEY': ['VALID', 'VALID'],
  'INVALID-KEY': ['ERROR', 'ERROR'],
  'KEY-IS-NOT-PROCESSED-YET': ['WAITING', 'WAITING'],
  'INVALID-KEY-(NO-DEPOSITS)': ['VALID (NO DATA)', 'VALID_NO_DEPO'],
};

const ActiveForm = (props) => {
  const marketplace = props.data.marketplace;
  const baseAsset = props.data.history.baseAsset;
  const balance = utils.profile.getBalanceHistory(props.data.history.balance, baseAsset, 'balance');
  const { productName: followProductName, productId: clickProductId, moderation: followModeration } = props.data.history.usedFollowing || {productName: false};
  const { name: usedProductName } = props.data.history.usedProduct || {name: false};
  const positiveFollowing = true; //test
  // const income = utils.profile.getValueHistory(props.data.history.income, baseAsset, 'income');

  const followProductPage = marketplace ? 'myproduct' : 'marketproduct';

  return(
    <div className={`smallKeys ${props.tsStatusKeys[1]}`}>
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
          <div className={`item status ${props.tsStatusKeys[1]}`}>{props.tsStatusKeys[0]}</div>
        </div>
        <div className="blockItem history">
          <div className="item balance">{
            marketplace ? null :
              props.tsStatusKeys[1] === 'VALID_NO_DEPO' ? (
                'NO TRADE HISTORY'
              ) : props.tsStatusKeys[1] === 'ERROR' ? (
                'INVALID KEY'
              ) : (
                !balance ? 'Balances processing..' : `${balance.available} (${balance.hold}) ${baseAsset}`
              )
          }</div>
          <div className={`item usedFollowing ${positiveFollowing && 'positiveFollowing'}`}>
            {followProductName && followModeration === 'approved' ? ([
              <div className="spanItem approved">Following</div>,
              <Link to={`/${followProductPage}/${clickProductId}`} className="spanItem usedProductName">{followProductName}</Link>
            ]) : usedProductName ? ([
              <div className="spanItem">Create</div>,
              <div className="spanItem usedProductName">{usedProductName}</div>
            ]) : followProductName && followModeration === 'rejected' ? ([
              <div className="spanItem rejected">Rejected by</div>,
              <Link to={`/${followProductPage}/${clickProductId}`} className="spanItem usedProductName">{followProductName}</Link>
            ]) : followProductName && followModeration === 'wait' ? ([
              <div className="spanItem wait">Waiting by</div>,
              <Link to={`/${followProductPage}/${clickProductId}`} className="spanItem usedProductName">{followProductName}</Link>
            ]) : null}
          </div>
        </div>
      </div>
      {!marketplace && (
        <div className="settings">
          <div className="iconHover"></div>
          <div className="menu">
            <div className="item edit" onClick={props.data.methods.setIndexEditing}>Edit</div>
            <div className="item remove" onClick={async () => {
              let isRemoved = prompt('Enter account name if you are really going to delete it.', '');
              if (isRemoved !== props.data.name) return false;

              await props.data.methods.remove({
                keyId: props.data.keyId,
              });

              await props.data.methods.reload();
            }}>Remove</div>
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
      name: '',
      apiKey: '',
      secretKey: '',
    };
  }

  componentWillMount() {
    this.setState({
      name: this.props.data.name,
    })
  }

  setValueInputs(property, event) {
    this.setState({
      [property]: event.target.value,
    });
  }

  sendRequest = async () => {
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
            <div className='items inputs'>
              <input onChange={this.setValueInputs.bind(this, 'name')} value={this.state.name} name='Name' placeholder='Name' />
              <input onChange={this.setValueInputs.bind(this, 'apiKey')} value={this.state.apiKey} name='Api key' placeholder='Api key' />
              <input onChange={this.setValueInputs.bind(this, 'secretKey')} value={this.state.secretKey} name='Secret key' placeholder='Secret key' />
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
      name: '',
      apiKey: '',
      secretKey: '',
      stock: 'Binance',
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
      groupName: this.props.data.groupName,
    });

    await this.props.data.methods.toggleAdding();
    await this.props.data.methods.reload();
  }

  render() {
    return(
      <div className='smallKeysAdd'>
        <div className='mainBlock'>
          <div className='items inputs'>
            <input value={`Exchange: ${this.state.stock}`} name='stock' placeholder='Stock' />
            <input onChange={this.setValueInputs.bind(this, 'name')} value={this.state.name} name='Name' placeholder='Name' />
            <input onChange={this.setValueInputs.bind(this, 'apiKey')} value={this.state.apiKey} name='Api key' placeholder='Api key' />
            <input onChange={this.setValueInputs.bind(this, 'secretKey')} value={this.state.secretKey} name='Secret key' placeholder='Secret key' />
          </div>
          <div className='onTopSigns'>
            <div className='item save' onClick={this.sendRequest}>Add</div>
            <div className="item cancel" onClick={this.props.data.methods.toggleAdding}>Cancel</div>
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

  let tsStatusKeys = null;

  if (props.data.status !== 'ADDING') {
    let commentStr = props.data.comment.toString().toUpperCase();
    commentStr = commentStr.split(' ');
    commentStr = commentStr.join('-');
    tsStatusKeys = statusStringKeys[commentStr] || null;
  }

  return <TsForm 
    data={props.data}
    tsStatusKeys={tsStatusKeys}
  />
}

export default SmallKeys