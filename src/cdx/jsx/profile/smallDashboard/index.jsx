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
)

class RenderDashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedAccount: 'ALL',
      selectedCourDay: 3,
    };
  }

  renderHead = () => {
    const {
      reduxState: {
        keys,
        dashboard: {
          baseAsset,
        },
      },
      actions,
    } = this.props;

    return(
      <div className="head">
        <div className="accounts">
          <div className="item">
            <div className="curTitle">Select account:</div>
            <select onChange={(event)=>this.setState({selectedAccount:event.target.value})}>
              <option value="ALL">All accounts</option>
              {keys.map((curKeys, index) => 
                <option key={index} value={curKeys.keyId}>{curKeys.name}</option>      
              )}
            </select>
          </div>
          <div className="item">
            <div className="curTitle">Select time showing:</div>
            <select onChange={(event)=>this.setState({selectedCourDay:event.target.value})}>
              {[{
                cour: 3,
                name: 'Three days'
              },{
                cour: 7,
                name: 'Week'
              },{
                cour: 30,
                name: 'Mount'
              },{
                cour: 365,
                name: 'Year'
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
            <div className="curTitle">Select base asset:</div>
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
        incomeKeys,
        dashboard: {
          baseAsset,
        },
      },
    } = this.props;
    const { selectedAccount, selectedCourDay } = this.state;
    const { incomes: incomesArr } = utils.profile.getSelectedIncomes(keys, incomeKeys, selectedAccount, selectedCourDay, baseAsset);

    return(
      <div className="incomeParent">
        <IncomeKeys 
          income={incomesArr}
        />
      </div>
    );
  }

  render() {
    const {
      reduxState: {
        incomeKeys,
        keys,
      },
    } = this.props;
    const skillDataNoLoaded = mixins.common.dataNoLoaded([incomeKeys, keys]);

    if (skillDataNoLoaded[1]) return skillDataNoLoaded[1];

    return(
      <div className="dashboard">
        <div className="curTitle">Basic information about your accounts</div>
        {this.renderHead()}
        <div className="curSmallTitle">Your profite:</div>
        {this.renderChartIncome()}
      </div>
    );
  }
}


const ContentBoxRender = (props) => {
  const { keys, myProducts } = props.reduxState;
  const skillData = [keys, myProducts];
  const skillDataNoLoaded = mixins.common.dataNoLoaded(skillData);

  if (skillDataNoLoaded[1]) return skillDataNoLoaded[1];

  const skillUser = skillData.reduce((res, curData) => res + notPassed(curData), 0);

  if (skillUser > 1) return <RenderDashboard {...props} />;
  
  return renderHelloBlock(skillData, skillUser);
}

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
)

export default SmallDashboard