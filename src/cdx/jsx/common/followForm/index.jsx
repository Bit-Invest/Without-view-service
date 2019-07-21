import React from 'react';
import utils from '@cdx/utils/';
import mixins from '@cdx/mixins/';

import './style.scss';

class ListFollowKeysComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedFollowKeyId: false,
    };
  }

  renderListKeys = (keys) => (
    <select onChange={(event)=>this.setState({selectedFollowKeyId:event.target.value})} value={this.state.selectedFollowKeyId}>
      <option value={false}>No selected</option>
      {keys.map((curKeys, index) => 
        <option value={curKeys.keyId} key={index}>{curKeys.name}</option>
      )}
    </select>
  );

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
        {
          buttonText && (
            <div className="btnSend" onClick={this.sendFollowing.bind(this)}>{buttonText}</div>
          )
        }
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

    console.log({
      keysFreeForFollow,
      keysRejectedFollowThisProduct,
      keysRejectedFollow,
      keysForUnfollowThisProduct,
      keysWaitFromThisProduct,
    });
    
    return(
      <div className="followForm">
        <div className="typesKeys">
          <ListFollowKeysComponent 
            keys={keysFreeForFollow}
            title="Completely free accounts, you can connect!"
            atopClass="freeFollow"
            methodFollow={methods.sendFollow}
            productId={productId}
            buttonText="Start following"
          />
          <ListFollowKeysComponent 
            keys={keysRejectedFollow}
            title="Your applications for these accounts have been canceled, so you can select this manager."
            atopClass="rejectedFollow"
            methodFollow={methods.sendFollow}
            productId={productId}
            buttonText="Start following"
          />
          <ListFollowKeysComponent 
            keys={keysRejectedFollowThisProduct}
            title="This manager has canceled your application, you can re-send the application."
            atopClass="rejectedFollowThisProduct"
            methodFollow={methods.reapplyFollowing}
            productId={productId}
            buttonText="Re-send following"
          />
          <ListFollowKeysComponent 
            keys={keysForUnfollowThisProduct}
            title="Want to unsubscribe from this product?"
            atopClass="unfollowThisProduct"
            methodFollow={methods.sendUnFollow}
            productId={productId}
            buttonText="Stop following"
          />
          <ListFollowKeysComponent 
            keys={keysWaitFromThisProduct}
            title="Your applications are processed for these accounts by this manager."
            atopClass="waitThisProduct"
            methodFollow={methods.sendFollow}
            productId={productId}
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
