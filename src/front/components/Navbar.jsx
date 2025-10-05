import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalHelpers } from "../hooks/useGlobalHelpers";
import { useGlobalButtons } from "../hooks/useGlobalButtons.jsx";
import { getUserStore } from "../services/api_store";



export const Navbar = () => {
  const { store } = useGlobalReducer();
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [storeId, setStoreId] = useState(null);
  const [loadingStoreId, setLoadingStoreId] = useState(false);
  const navigate = useNavigate();
  const { logoutUser } = useGlobalHelpers();
  const hostname = window.location.hostname;

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const getStoreIdForUser = async () => {
    if (store?.role === 'Store' && store?.token && !storeId && !loadingStoreId) {
      setLoadingStoreId(true);
      try {
        const storeData = await getUserStore(store.token);
        if (storeData.ok && storeData.data && storeData.data.length > 0) {
          const userStoreId = storeData.data[0].id;
          setStoreId(storeData?.data[0]?.is_active ? userStoreId : null);
        } else setStoreId(null);
      } catch (error) {
        setStoreId(null);
      } finally { setLoadingStoreId(false); }
    }
  };

  useEffect(() => { getStoreIdForUser(); }, [store?.role, store?.token]);
  useEffect(() => { if (!store?.token) setStoreId(null); setShowProfile(false); }, [store?.token]);


  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#00aeef', borderBottom: '2px solid #33bef2' }}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="fa-solid fa-basket-shopping me-2" style={{ fontSize: '1.4rem', color: '#004466' }}></i>
          <span className="fw-bold" style={{ color: '#004466', fontSize: '1.3rem' }}>Order Management</span>
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          style={{ color: '#004466', boxShadow: 'none' }}
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
            <li className="nav-item">
              <Link
                to="/orders"
                className="nav-link px-3 py-2 rounded"
                style={{ color: '#004466', fontWeight: '500', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.target.style.backgroundColor = '#33bef2'; e.target.style.color = '#004466'; }}
                onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#004466'; }}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-solid fa-basket-shopping"></i> Ordenes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/users"
                className="nav-link px-3 py-2 rounded"
                style={{ color: '#004466', fontWeight: '500', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.target.style.backgroundColor = '#33bef2'; e.target.style.color = '#004466'; }}
                onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#004466'; }}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-solid fa-users"></i> Users
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};
