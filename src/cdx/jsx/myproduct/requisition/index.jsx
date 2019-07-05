import React from 'react';

const RejectRequisition = (props) => {
  const {
    reduxState: {
      followerDetails: { firstName, lastName },
      moderation,
    },
  } = props;

  const investorName = `${firstName} ${lastName}`;

  return(
    <div className="requisitionComponent rejected">
      <div className="text">{`You canceled an application from ${investorName}, moderation: ${moderation}.`}</div>
    </div>
  );
};

const WaitRequisition = (props) => {
  const {
    reduxState: {
      followerDetails: { firstName, lastName },
      moderation,
    },
  } = props;

  const investorName = `${firstName} ${lastName}`;
  
  return(
    <div className="requisitionComponent wait">
      <div className="text">{`Requisition from ${investorName}, moderation: ${moderation}.`}</div>
      
      <div className="btn approve" onClick={props.methods.sendApproveFollowing.bind(this, {
        followingId: props.reduxState._id,
      })}>Approve requisition</div>

      <div className="btn reject" onClick={props.methods.sendRejectFollowing.bind(this, {
        followingId: props.reduxState._id,
      })}>Reject requisition</div>
    </div>
  );
};

export default (props) => {
  const { status } = props;
  const StatusBlock = {
    'wait': WaitRequisition,
    'reject': RejectRequisition,
  }[status];

  return <StatusBlock {...props} />
};