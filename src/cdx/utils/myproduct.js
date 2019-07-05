export const getRequisitionsProduct = ({productId, myFollowers}) => {
	const curMyFollowers = typeof myFollowers === 'object' && myFollowers;
	const curFollower = curMyFollowers && curMyFollowers.find(curFollower => 
		curFollower.product.productId === productId
	);
	const curFollowings = curFollower && curFollower.followings;

	const waitFollowings = curFollowings && curFollowings.length &&	
		curFollowings.filter(curFollowing =>
			curFollowing.moderation === 'wait'
		);

	const rejectFollowings = curFollowings && curFollowings.length &&	
		curFollowings.filter(curFollowing =>
			curFollowing.moderation === 'rejected'
		);

	const approvedFollowings = curFollowings && curFollowings.length &&	
		curFollowings.filter(curFollowing =>
			curFollowing.moderation === 'approved'
		);

	return {
		waitFollowings: waitFollowings || [],
		rejectFollowings: rejectFollowings || [],
		approvedFollowings: approvedFollowings || [],
	};
};

export const getFollowingsNamedMyKeys = (keys, followings) => {
	return followings.map(curFollowing => {
			const findedKeys = keys.find(curKeys => 
				curKeys.keyId === curFollowing.follower
			);

			if (findedKeys) 
				return ({
					...curFollowing,
					nameFollower: findedKeys.name,
					isMyKeys: true,
				}) 
			else 
				return ({
					...curFollowing,
					nameFollower: `${curFollowing.followerDetails.firstName} ${curFollowing.followerDetails.lastName}`,
				});
		}
	);
};

export default ({
	getRequisitionsProduct,
	getFollowingsNamedMyKeys,
});
