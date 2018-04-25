import React from 'react';
import './ProfileHead.css';

const ROOT_CLASS = 'profile-head';

export const ProfileHead = props => {
  return (
    <div className={ROOT_CLASS}>
      <div>
        <div className={`${ROOT_CLASS}__profile-head`}>
          <div className="icon-user-border">
            <IconUser />
          </div>
        </div>
        <div>
          <UserName />
          <div>
            <div>Investor /</div>
            <div>Rating:</div>
          </div>
          <div>
            <div />
            <div>KYC Approved</div>
          </div>
          <div />
        </div>
      </div>
      <div>
        <div>
          <div>Share and Get a Bonus</div>
          <div />
        </div>
        <div>
          <Button />
          <Button />
        </div>
      </div>
    </div>
  );
};
