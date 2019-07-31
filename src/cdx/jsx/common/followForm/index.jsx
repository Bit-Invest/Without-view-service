import React from 'react';
import utils from '@cdx/utils/';
import mixins from '@cdx/mixins/';
import { phrases } from '@cdx/utils/common';

import './style.scss';

class ListFollowKeysComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedFollowKeyId: false,
    };
  }

  renderListKeys = (keys) => { 
    return !this.props.noselect ? (
      <select onChange={(event)=>this.setState({selectedFollowKeyId:event.target.value})} value={this.state.selectedFollowKeyId}>
        <option value={false}>{phrases['follow-form']['#1']}</option>
        {keys.map((curKeys, index) => 
          <option value={curKeys.keyId} key={index}>{curKeys.name}</option>
        )}
      </select>
    ) : (
      <ul className="listCanceled">
        {keys.map((curKeys, index) => 
          <li value={curKeys.keyId} key={index}>{curKeys.name}</li>
        )}
      </ul>
    )
  }

  sendFollowing = async () => {
    const { selectedFollowKeyId } = this.state;
    const { methodFollow, productId, keys } = this.props;
    const tsKeys = keys.find(curKeys => 
      curKeys.keyId === selectedFollowKeyId
    );
    let followingId = 0;

    if (tsKeys.tsFollowing) {
      followingId = tsKeys.tsFollowing.followingId;
    }

    if (!selectedFollowKeyId) return false;

    methodFollow({
      selfKeyId: selectedFollowKeyId,
      productId,
      followingId,
    });
  }

  render() {
    const { atopClass, title, keys, buttonText } = this.props;

    if (!keys.length) {
      return null;
    }

    return(
      <div className={`listItem ${atopClass}`}>
        <div className="curTitle">{title}</div>
        {this.renderListKeys(keys)}
        {buttonText && (
          <div className="btnSend" onClick={this.sendFollowing.bind(this)}>{buttonText}</div>
        )}
      </div>
    );
  }
};

class FollowForm extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedFollowKeyId: false,
    };
  }

  renderFollowForm = () => {
    const { reduxState, methods, page } = this.props;
    const { keys, myFollowings } = reduxState;
    const keysNoLoaded = mixins.common.dataNoLoaded([keys, myFollowings]);

    if (keysNoLoaded[1]) return keysNoLoaded[1];

    const { productId } = reduxState.infoMarketProduct;
    const { 
      keysFreeForFollow,
      keysRejectedFollowThisProduct,
      keysRejectedFollow,
      keysForUnfollowThisProduct,
      keysWaitFromThisProduct,
    } = utils.marketproduct.getInfoKeysFollow({
      reduxState,
      productId,
    });
    
    return(
      <div className="followForm">
        <div className="typesKeys">
          <ListFollowKeysComponent 
            keys={keysFreeForFollow}
            title={phrases['follow-form']['#2']}
            atopClass="freeFollow"
            methodFollow={methods.sendFollow}
            productId={productId}
            buttonText={phrases['follow-form']['#3']}
          />
          <ListFollowKeysComponent 
            keys={keysRejectedFollow}
            title={phrases['follow-form']['#4']}
            atopClass="rejectedFollow"
            methodFollow={methods.sendFollow}
            productId={productId}
            buttonText={phrases['follow-form']['#5']}
          />
          <ListFollowKeysComponent 
            keys={keysRejectedFollowThisProduct}
            title={phrases['follow-form']['#6']}
            atopClass="rejectedFollowThisProduct"
            methodFollow={methods.reapplyFollowing}
            productId={productId}
            buttonText={phrases['follow-form']['#7']}
          />
          <ListFollowKeysComponent 
            keys={keysForUnfollowThisProduct}
            title={phrases['follow-form']['#8']}
            atopClass="unfollowThisProduct"
            methodFollow={methods.sendUnFollow}
            productId={productId}
            buttonText={phrases['follow-form']['#9']}
          />
          <ListFollowKeysComponent 
            keys={keysWaitFromThisProduct}
            title={phrases['follow-form']['#10']}
            atopClass="waitThisProduct"
            methodFollow={methods.sendFollow}
            productId={productId}
            noselect={true}
          />
        </div>
      </div>
    );
  }

  render() {
    return this.renderFollowForm();
  }
};

export default FollowForm;
