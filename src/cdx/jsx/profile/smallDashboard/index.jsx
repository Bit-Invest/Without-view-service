import React from 'react';
import Contexts from '@modules/contexts';
import mixins from '@cdx/mixins/';
import utils from '@cdx/utils/'

import {
  notPassed
} from '@cdx/utils/common';

import IncomeKeys from './incomesKeys/';

import './style.scss'

const Consumer = Contexts.ProfileContext.Consumer

const renderHelloBlock = (skillData, skillUser) => (  
  !notPassed(skillData[0]) ? (
    <div className='desc'>
      <div className='emoji welcome'></div>
      <div className='text'>
        <div>We welcome you.</div>
        <div>Please add your account from the exchange.</div>
      </div>
    </div>
  ) : (!notPassed(skillData[1] && !notPassed(2))) ? (
    <div className='desc'>
      <div className='emoji twoStep'></div>
      <div className='text'>
        <div>Thank you for adding your account.</div>
        <div>Now you can create a product or connect to one of the managers.</div>
      </div>
    </div>
  ) : (
    <div className='desc'>
      <div className='emoji'></div>
      <div className='text'>Error</div>
    </div>
  )
);

class RenderDashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedAccount: 'ALL',
      selectedCourDay: 7,
      selectedType: 'INCOME',
      selectedMode: 'PERCENT',
    };
  }

  renderHead = () => {
    const {
      reduxState: {
        keys,
        myFollowers,
        dashboard: {
          baseAsset,
        },
      },
      actions,
    } = this.props;

    const marketKeys = utils.profile.getMarketplaceInvestors({keys,myFollowers});
    const swapedKeys = [...keys, ...marketKeys];

    return(
      <div className="head">
        <div className="accounts">
          <div className="item">
            <div className="curSmallTitle">Select account:</div>
            <select onChange={(event)=>this.setState({selectedAccount:event.target.value})}>
              <option value="ALL">All accounts</option>
              {swapedKeys.map((curKeys, index) => 
                <option key={index} value={curKeys.keyId}>
                  {curKeys.name} {curKeys.marketplace ? '(marketplace)' : '(personally)'}
                </option>      
              )}
            </select>
          </div>
          <div className="item">
            <div className="curSmallTitle">Display Mode:</div>
            <select onChange={(event)=>this.setState({selectedMode:event.target.value})}>
              <option value="PERCENT" selected={this.state.selectedMode === "PERCENT"}>%</option>
              <option value="ABSOLUTE" selected={this.state.selectedMode === "ABSOLUTE"}>Absolute Values</option>
            </select>
          </div>
          <div className="item">
            <div className="curSmallTitle">Type:</div>
            <select onChange={(event)=>this.setState({selectedType:event.target.value})}>
              <option value="INCOME" selected={this.state.selectedType === "INCOME"}>PROFIT</option>
              <option value="BALANCE" selected={this.state.selectedType === "BALANCE"}>BALANCE</option>
            </select>
          </div>
          <div className="item">
            <div className="curSmallTitle">Displayed period:</div>
            <select onChange={(event)=>this.setState({selectedCourDay:event.target.value})}>
              {[{
                cour: 3,
                name: 'Three days'
              },{
                cour: 7,
                name: 'Week'
              },{
                cour: 30,
                name: 'Month'
              },{
                cour: 365,
                name: 'Year'
              },{
                cour: 100000,
                name: 'ALL'
              }].map((curTime, index) => 
                <option 
                  key={index} 
                  value={curTime.cour}
                  selected={curTime.cour === this.state.selectedCourDay}
                >{curTime.name}</option>      
              )}
            </select>
          </div>
          <div className="item">
            <div className="curSmallTitle">Select base asset:</div>
            <select onChange={(event)=> actions.setBaseAsset(event.target.value)}>
              {['BTC', 'USD'].map(curBaseAsset =>
                <option 
                  value={curBaseAsset}
                  selected={curBaseAsset === baseAsset}
                >{curBaseAsset}</option>
              )}
            </select>
          </div>
        </div>
      </div>
    );
  }

  renderChartIncome() {
    const {
      reduxState: {
        keys,
        myFollowers,
        incomeKeys,
        dashboard: {
          baseAsset,
        },
      },
    } = this.props;
    const { selectedAccount, selectedCourDay, selectedMode, selectedType } = this.state;
    const marketKeys = utils.profile.getMarketplaceInvestors({keys,myFollowers});
    const swapedKeys = [...keys, ...marketKeys];
    const { incomes: incomesArr } = utils.profile.getSelectedIncomes(
      swapedKeys, 
      incomeKeys,
      selectedAccount,
      selectedCourDay,
      baseAsset,
      selectedMode,
      selectedType,
    );

    return(
      <div className="incomeParent">
        <IncomeKeys 
          income={incomesArr}
          valueSuffix={`${({PERCENT:`% in ${baseAsset}`,ABSOLUTE:baseAsset})[selectedMode]}`}
        />
      </div>
    );
  }

  render() {
    const {
      reduxState: {
        incomeKeys,
        keys,
        dashboard: {
          baseAsset,
        },
      },
    } = this.props;
    const skillDataNoLoaded = mixins.common.dataNoLoaded([incomeKeys, keys]);

    if (skillDataNoLoaded[1]) return skillDataNoLoaded[1];

    const { selectedMode, selectedType } = this.state;
    const titleChart = ({
      INCOME: {
        PERCENT: `Account profit in ${baseAsset}, %:`,
        ABSOLUTE: `Account profit in ${baseAsset}:`,
      },
      BALANCE: {
        PERCENT: `Account history balances in ${baseAsset}, %:`,
        ABSOLUTE: `Account history balances in ${baseAsset}:`,
      },
    })[selectedType][selectedMode];

    return(
      <div className="dashboard">
        <div className="curTitle">Accounts Overview</div>
        {this.renderHead()}
        <div className="curSmallTitle">{titleChart}</div>
        {this.renderChartIncome()}
      </div>
    );
  }
};

const ContentBoxRender = (props) => {
  const { keys, myProducts, myFollowings } = props.reduxState;
  const connectedProducts = utils.profile.getConnectedProducts({myFollowings});
  const skillData = [keys, myProducts, connectedProducts];
  const skillDataNoLoaded = mixins.common.dataNoLoaded(skillData);

  if (skillDataNoLoaded[1]) return skillDataNoLoaded[1];

  const skillUser = skillData.reduce((res, curData) => res + notPassed(curData), 0);

  if (skillUser > 1) return <RenderDashboard {...props} />;
  
  return renderHelloBlock(skillData, skillUser);
};

const SmallDashboard = (props) => (
  <Consumer>
    {({actions}) => (
      <div className='smallDashboard'>
        <div className='contentBox'>
          <ContentBoxRender reduxState={props.reduxState} actions={actions} />
        </div>
      </div>
    )}
  </Consumer>
);

export default SmallDashboard;
