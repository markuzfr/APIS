import React, { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      window.location.href = '/';
      
    }
  }, []);

  return (
    <div>XDDDDDDDD</div>
  );
};

export default Dashboard;
