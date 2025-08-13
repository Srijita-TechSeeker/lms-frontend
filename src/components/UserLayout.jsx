// 📁 src/components/UserLayout.jsx
import React from 'react';
import UserSidebar from './UserSidebar';

function UserLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <UserSidebar />
      <div style={{ marginLeft: '220px', width: '100%', padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}

export default UserLayout;
