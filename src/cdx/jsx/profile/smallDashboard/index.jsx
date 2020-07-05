import React from 'react';
import { Link } from 'react-router-dom';
import Contexts from '@modules/contexts';
import mixins from '@cdx/mixins/';
import utils from '@cdx/utils/';
import { phrases } from '@cdx/utils/common';

import Help from '@cdx/jsx/common/help/';

import {
  notPassed
} from '@cdx/utils/common';

import IncomeKeys from './incomesKeys/';

import './style.scss'

const Consumer = Contexts.ProfileContext.Consumer;

const localLinks = {
  'apiImport': 'https://desk.zoho.eu/portal/cindx/kb/articles/adding-your-api-key-and-secret-key-to-the-cindx-platform',
  'subscribeStraregy': 'https://desk.zoho.eu/portal/cindx/kb/articles/how-to-invest-in-a-trading-product-on-the-cindx-platform',
  'createProduct': 'https://desk.zoho.eu/portal/cindx/kb/articles/trader-s-guide-how-to-create-and-monetize-an-investment-product-on-the-cindx-platform',
  'knowledge': 'https://desk.zoho.eu/portal/cindx/kb/cindx',
  'telegramChat': 'https://t.me/CINDXTest',
};

const localLinkJsx = (hrefTag, text) => {
  const link = localLinks[hrefTag];

  if (link) return <a href={link} target="__blank">{text}</a>;

  return <Link to={`/${hrefTag}`}>{text}</Link>
}

const renderHelloBlock = (skillData, skillUser, userInfo) => (  
  !notPassed(skillData[0]) ? (
    <div className='desc welcome'>
      <div className='text'>
        <div>{phrases['small-dashboard']['#30']}{(userInfo || {firstName: 'none'}).firstName}.</div>
        <div>{phrases['small-dashboard']['#31']}</div>
        <ol>
          <li>{phrases['small-dashboard']['#32']}{localLinkJsx('apiImport', phrases['small-dashboard']['#33'])}</li>
          <li>{localLinkJsx('subscribeStraregy', phrases['small-dashboard']['#34'])}{phrases['small-dashboard']['#35']}{localLinkJsx('marketplace', phrases['small-dashboard']['#36'])}{phrases['small-dashboard']['#37']}{localLinkJsx('createProduct', phrases['small-dashboard']['#38'])}</li>
          <li>{phrases['small-dashboard']['#39']}</li>
        </ol>
        <div className="colorGreen">{phrases['small-dashboard']['#40']}{localLinkJsx('knowledge', phrases['small-dashboard']['#41'])}{phrases['small-dashboard']['#42']}</div>
        <div className="colorGreen">{phrases['small-dashboard']['#43']}{localLinkJsx('telegramChat', phrases['small-dashboard']['#44'])}</div>
      </div>
    </div>
  ) : (!notPassed(skillData[1] && !notPassed(2))) ? (
    <div className='desc'>
      <div className='emoji twoStep'></div>
      <div className='text'>
        <div>{phrases['small-dashboard']['#3']}</div>
        <div>{phrases['small-dashboard']['#4']}</div>
      </div>
    </div>
  ) : (
    <div className='desc'>
      <div className='emoji'></div>
      <div className='text'>{phrases['small-dashboard']['#5']}</div>
    </div>
  )
);

class RenderDashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedAccount: 'ALL',
      selectedCourDay: 100000,
      selectedType: 'BALANCE',
      selectedMode: 'ABSOLUTE',
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
            <Help description={phrases['small-dashboard']['#25']}>
              <div className="curSmallTitle">{phrases['small-dashboard']['#9_1']}</div>
            </Help>
            <select onChange={(event)=>this.setState({selectedAccount:event.target.value})}>
              <option value="ALL">{phrases['small-dashboard']['#6']}</option>
              {swapedKeys.map((curKeys, index) => 
                <option key={index} value={curKeys.keyId}>
                  {curKeys.name} {curKeys.marketplace ? phrases['small-dashboard']['#7'] : phrases['small-dashboard']['#8']}
                </option>      
              )}
            </select>
          </div>
          <div className="item">
            <Help description={phrases['small-dashboard']['#26']}>
              <div className="curSmallTitle">{phrases['small-dashboard']['#9']}</div>
            </Help>
            <select onChange={(event)=>this.setState({selectedMode:event.target.value})}>
              <option value="PERCENT" selected={this.state.selectedMode === "PERCENT"}>%</option>
              <option value="ABSOLUTE" selected={this.state.selectedMode === "ABSOLUTE"}>{phrases['small-dashboard']['#10']}</option>
            </select>
          </div>
          <div className="item">
            <Help description={phrases['small-dashboard']['#27']}>
              <div className="curSmallTitle">Type:</div>
            </Help>
            <select onChange={(event)=>this.setState({selectedType:event.target.value})}>
              <option value="INCOME" selected={this.state.selectedType === "INCOME"}>{phrases['small-dashboard']['#11']}</option>
              <option value="BALANCE" selected={this.state.selectedType === "BALANCE"}>{phrases['small-dashboard']['#12']}</option>
            </select>
          </div>
          <div className="item">
            <Help description={phrases['small-dashboard']['#28']}>
              <div className="curSmallTitle">{phrases['small-dashboard']['#13']}</div>
            </Help>
            <select onChange={(event)=>this.setState({selectedCourDay:event.target.value})}>
              {[{
                cour: 3,
                name: phrases['small-dashboard']['#14']
              },{
                cour: 7,
                name: phrases['small-dashboard']['#15']
              },{
                cour: 30,
                name: phrases['small-dashboard']['#16']
              },{
                cour: 365,
                name: phrases['small-dashboard']['#17']
              },{
                cour: 100000,
                name: phrases['small-dashboard']['#18']
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
            <Help description={phrases['small-dashboard']['#29']}>
              <div className="curSmallTitle">{phrases['small-dashboard']['#19']}</div>
            </Help>
            <select onChange={(event)=> actions.setBaseAsset(event.target.value)}>
              {['USD'].map(curBaseAsset =>
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
      <div className="incomeParentOverflow">
        <div className="incomeParent">
          <IncomeKeys 
            income={incomesArr}
            valueSuffix={`${({PERCENT:`% in ${baseAsset}`,ABSOLUTE:baseAsset})[selectedMode]}`}
          />
        </div>
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
        PERCENT: `${phrases['small-dashboard']['#20']} ${baseAsset}, %:`,
        ABSOLUTE: `${phrases['small-dashboard']['#21']} ${baseAsset}:`,
      },
      BALANCE: {
        PERCENT: `${phrases['small-dashboard']['#22']} ${baseAsset}, %:`,
        ABSOLUTE: `${phrases['small-dashboard']['#23']} ${baseAsset}:`,
      },
    })[selectedType][selectedMode];

    return(
      <div className="dashboard">
        <div className="curTitle">{phrases['small-dashboard']['#24']}</div>
        {this.renderHead()}
        <div className="curSmallTitle">{titleChart}</div>
        {this.renderChartIncome()}
      </div>
    );
  }
};

const ContentBoxRender = (props) => {
  const { userInfo, keys, myProducts, myFollowings } = props.reduxState;
  const connectedProducts = utils.profile.getConnectedProducts({myFollowings});
  const skillData = [keys, myProducts, connectedProducts];
  const skillDataNoLoaded = mixins.common.dataNoLoaded(skillData);

  if (skillDataNoLoaded[1]) return skillDataNoLoaded[1];

  const skillUser = skillData.reduce((res, curData) => res + notPassed(curData), 0);

  if (skillUser > 0) return <RenderDashboard {...props} />;
  
  return renderHelloBlock(skillData, skillUser, userInfo);
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
