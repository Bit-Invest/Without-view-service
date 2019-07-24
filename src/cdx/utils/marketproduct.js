export const getInfoKeysFollow = ({ reduxState: state, productId, atopFilter }) => {
  const keys = typeof state.keys === 'object' && state.keys;
  const myProducts = typeof state.myProducts === 'object' && state.myProducts;
  const myFollowings = typeof state.myFollowings === 'object' && state.myFollowings;

  const myFollowingsSorted = (myFollowings || [])
    .sort((curFollowing1, curFollowing2) => curFollowing2.createdAt - curFollowing1.createdAt)
    .reduce((res, curObj, arr) => {
      if (res.find(curObj2 => 
        (curObj2.follower.keyId || 0) === curObj.follower.keyId
      )) return res;
      
      res.push(curObj);

      return res;
    }, []);

  const freeKeys = (keys || [])
    .filter(curKeys => curKeys.valid);

  const keysFreeFromProduct = (freeKeys || [])
    .filter(curKeys => 
      !(myProducts || []).some(curProduct => curProduct.keyId === curKeys.keyId)
    );

  const keysFreeForFollow = keysFreeFromProduct
    .filter(curKeys => 
      !(myFollowingsSorted || []).some(curFollowing => curFollowing.follower.keyId === curKeys.keyId)
    );

  const keysRejectedFollow = keysFreeFromProduct
    .filter(curKeys => 
      (myFollowingsSorted || []).some(curFollowing => 
        curFollowing.follower.keyId === curKeys.keyId && curFollowing.moderation === 'rejected' && curFollowing.productId !== productId
      )
    );

  const keysRejectedFollowThisProduct = keysFreeFromProduct
    .filter(curKeys => 
      (myFollowingsSorted || []).some(curFollowing => 
        curFollowing.follower.keyId === curKeys.keyId && curFollowing.moderation === 'rejected' && curFollowing.productId === productId
      )
    )
    .map(curKeys => {
      const tsFollowing = (myFollowingsSorted || []).find(curFollowing => 
        curFollowing.follower.keyId === curKeys.keyId && curFollowing.moderation === 'rejected' && curFollowing.productId === productId
      );
      
      return {
        ...curKeys,
        tsFollowing,
      };
    });

  const keysForUnfollowThisProduct = keysFreeFromProduct
    .filter(curKeys => 
      (myFollowings || []).some(curFollowing => 
        curFollowing.follower.keyId === curKeys.keyId && curFollowing.moderation === 'approved' && curFollowing.productId === productId
      )
    );

  const keysWaitFromThisProduct = keysFreeFromProduct
    .filter(curKeys => 
      (myFollowings || []).some(curFollowing => 
        curFollowing.follower.keyId === curKeys.keyId && curFollowing.moderation === 'wait' && curFollowing.productId === productId
      )
    );

  return {
    keysFreeFromProduct,
    keysFreeForFollow,
    keysRejectedFollow,
    keysRejectedFollowThisProduct,
    keysForUnfollowThisProduct,
    keysWaitFromThisProduct,
  };
};

export default ({
  getInfoKeysFollow,
});
