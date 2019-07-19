import React from 'react';
import utils from '@cdx/utils/';

//images
import BinanceLogo from '@assets/images/iconBinance.png';

import './style.scss'

const statusStringKeys = {
  'true': 'VALID',
  'false': 'ERROR',
  'wait': 'WAITING',
};

const ActiveForm = (props) => {
  const baseAsset = props.data.history.baseAsset;
  const balance = utils.profile.getBalanceHistory(props.data.history.balance, baseAsset, 'balance');
  const { productName: followProductName } = props.data.history.usedFollowing || {productName: false};
  const { name: usedProductName } = props.data.history.usedProduct || {name: false};
  const positiveFollowing = true; //test
  // const income = utils.profile.getValueHistory(props.data.history.income, baseAsset, 'income');

  return(
    <div className='smallKeys'>
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
          <div className={`item status ${props.tsStatusKeys}`}>{props.tsStatusKeys}</div>
        </div>
        <div className="blockItem history">
          <div className="item balance">{`${balance.available} (${balance.hold}) ${baseAsset}`}</div>
          <div className={`item usedFollowing ${positiveFollowing && 'positiveFollowing'}`}>
            {followProductName ? ([
              <div className="spanItem">Follow</div>,
              <div className="spanItem usedProductName">{followProductName}</div>
            ]) : usedProductName ? ([
              <div className="spanItem">Create</div>,
              <div className="spanItem usedProductName">{usedProductName}</div>
            ]) : null}
          </div>
        </div>
      </div>
      <div className="settings">
        <div className="iconHover"></div>
        <div className="menu">
          <div className="item" onClick={props.data.methods.setIndexEditing}>Change keys or name</div>
          <div className="item" onClick={async () => {
            await props.data.methods.remove({
              keyId: props.data.keyId,
            });

            await props.data.methods.reload();
          }}>Remove</div>
        </div>
      </div>
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

  return <TsForm 
    data={props.data}
    tsStatusKeys={typeof props.data.valid !== 'undefined' ? statusStringKeys[props.data.valid.toString()] : ''}
  />
}

export default SmallKeys