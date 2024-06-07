import React, { useEffect } from 'react';
import { Link,useLocation, } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { fetchContent }  from '../../features/homeSlice';


export default function Header() {
  const location = useLocation();
  // Check if the current pathname is the home page
  const isHomePage = location.pathname === '/';
  const pathname = location.pathname;
  const firstElement = pathname.split('/')[1];

  const searchParams = new URLSearchParams(location.search);
  const gktab = searchParams.get('gktab');
  const dispatch = useDispatch();
  const status = useSelector(state => state.home.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContent());
    }
  }, [status, dispatch]);

  return (
      <header className="header-section home">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <Link className={`giifinance-logo ${isHomePage ? 'hidden' : ''}`} to="/"><img src="/images/GII-Logo44.png" alt="Logo"/></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="main_nav">
                <ul className="navbar-nav">
                  <li className={`nav-item ${pathname === '/' ? 'active' : ''}`}><Link className="nav-link" to="/">Home</Link></li>
                  <li className={`nav-item dropdown ${firstElement === 'product' ? 'active' : ''}`}><Link className="nav-link" to="/overview" data-bs-toggle="dropdown">Products</Link>
                    <ul className="dropdown-menu">
                      <li className={`${pathname === '/product/overview' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/product/overview">Overview</Link></li>
                      <li className={`${pathname === '/product/buyer-product' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/product/buyer-product">Buyer Products</Link></li>
                      <li className={`${pathname === '/product/supplier-products' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/product/supplier-products">Supplier Products</Link></li>
                      <li className={`${pathname === '/product/custom-finance' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/product/custom-finance">Custom Finance</Link></li>
                    </ul>
                  </li>
                  <li className={`nav-item dropdown ${firstElement === 'benefits' ? 'active' : ''}`}><Link className="nav-link" to="/benefits?gktab=1" data-bs-toggle="dropdown">Benefits</Link>
                    <ul className="dropdown-menu">
                      <li className={`${pathname+'?gktab='+gktab === '/benefits?gktab=1' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/benefits?gktab=1">Buyer</Link></li>
                      <li className={`${pathname+'?gktab='+gktab === '/benefits?gktab=2' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/benefits?gktab=2">Supplier</Link></li>
                      <li className={`${pathname+'?gktab='+gktab === '/benefits?gktab=3' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/benefits?gktab=3">Funder</Link></li>
                      <li className={`${pathname+'?gktab='+gktab === '/benefits?gktab=4' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/benefits?gktab=4">Introducer</Link></li>
                    </ul>
                  </li>
                  <li className={`nav-item dropdown ${firstElement === 'about' ? 'active' : ''}`}>
                    <Link className="nav-link" to="/about?gktab=1" data-bs-toggle="dropdown">About</Link>
                    <ul className="dropdown-menu">
                      <li className={`${pathname+'?gktab='+gktab === '/about?gktab=1' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/about?gktab=1">What We Provide</Link></li>
                      <li className={`${pathname+'?gktab='+gktab === '/about?gktab=2' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/about?gktab=2">Why Gii</Link></li>
                      <li className={`${pathname+'?gktab='+gktab === '/about?gktab=3' ? 'activesubmenu' : ''}`}><Link className="dropdown-item" to="/about?gktab=3">How We Work</Link></li>
                    </ul>
                  </li>
                  <li className={`nav-item ${pathname === '/register' ? 'active' : ''}`}><Link className="nav-link" to="/register">Register</Link></li>
                  <li className={`nav-item ${pathname === '/sign-in' ? 'active' : ''}`}><Link className="nav-link" to="/sign-in">Sign in</Link></li>
                </ul>  
              </div> {/* navbar-collapse.// */}
            </div> {/* container-fluid.// */}
          </nav>
        </div>
      </header>
  )
}
