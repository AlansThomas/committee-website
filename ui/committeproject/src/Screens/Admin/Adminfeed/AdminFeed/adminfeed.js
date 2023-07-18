import React from 'react';
import adminFeedCss from './Adminfeed.module.css';
import AdminPost from '../AdminPost/Adminpost'

const adminFeed = () => {
  return (
    <div className={adminFeedCss.feedWidth} data-testid="admin-post">
    <AdminPost/>
    </div>
  )
}
export default adminFeed