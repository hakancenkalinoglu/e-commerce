import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';

const SellerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header with user info and logout */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '25px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div>
            <h1 style={{
              margin: '0 0 10px 0',
              fontSize: '28px',
              fontWeight: '600',
              color: '#2c3e50'
            }}>
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p style={{
              margin: '0',
              color: '#7f8c8d',
              fontSize: '14px'
            }}>
              {user?.email} • <span style={{
                color: '#28a745',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>{user?.role}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '12px 24px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(220, 53, 69, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c82333';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#dc3545';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{ marginBottom: '25px' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '12px 28px',
              marginRight: '10px',
              backgroundColor: activeTab === 'products' ? '#007bff' : 'white',
              color: activeTab === 'products' ? 'white' : '#495057',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'products' ? '0 2px 4px rgba(0, 123, 255, 0.3)' : 'none'
            }}
          >
            📦 My Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '12px 28px',
              backgroundColor: activeTab === 'orders' ? '#007bff' : 'white',
              color: activeTab === 'orders' ? 'white' : '#495057',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'orders' ? '0 2px 4px rgba(0, 123, 255, 0.3)' : 'none'
            }}
          >
            🛒 My Orders
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'products' && (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '20px'
            }}>
              My Products
            </h2>
            <div style={{
              border: '1px solid #e9ecef',
              padding: '35px',
              borderRadius: '12px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '15px'
              }}>
                📦
              </div>
              <p style={{
                fontSize: '16px',
                color: '#6c757d',
                marginBottom: '25px'
              }}>
                You haven't added any products yet. Start by adding your first product!
              </p>
              <button style={{
                padding: '12px 28px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#218838';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#28a745';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                ➕ Add New Product
              </button>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '20px'
            }}>
              My Orders
            </h2>
            <div style={{
              border: '1px solid #e9ecef',
              padding: '35px',
              borderRadius: '12px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '15px'
              }}>
                🛒
              </div>
              <p style={{
                fontSize: '16px',
                color: '#6c757d'
              }}>
                No orders yet. Orders will appear here once customers start purchasing your products.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
