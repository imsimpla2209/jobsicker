import { useEffect, useState } from 'react'
import SearchBox from 'src/Components/SharedComponents/SearchBox'
import NavLargScreen from '../NavLargScreen'
import NavSmallScreen from '../NavSmallScreen'
import HeaderSearchSm from './../../SharedComponents/HeaderSearchSm/HeaderSearchSm'
import Logo from './../../SharedComponents/Logo/Logo'
import './Header.css'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const [showSearchIcon, setShowSearchIcon] = useState(true)
  const { t } = useTranslation(['main'])
  useEffect(() => {}, [showSearch, showSearchIcon])

  const toggleSearchForm = () => {
    showSearch ? setShowSearch(false) : setShowSearch(true)
  }
  const hideSearchIcon = () => {
    showSearchIcon ? setShowSearchIcon(false) : setShowSearchIcon(true)
  }

  return (
    <header className="nav-bg-cn">
      {/* Header in large screen */}
      <div id="nav-lg-id" className="ms-5 me-5 d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between">
          <Link to={'/'} style={{ textAlign: 'end' }}>
            <Logo />
            <p style={{ color: 'grey', fontWeight: 600, marginBottom: 0 }}>{t('For Clients')}</p>
          </Link>
          <SearchBox />
        </div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent py-0 mx-4">
          <NavLargScreen />
        </nav>
      </div>

      {/* Header in Small screen */}

      <div id="nav-sm-id" className="container d-flex justify-content-between align-items-center">
        {showSearch ? (
          <div className="w-100">
            <HeaderSearchSm bg={showSearch} />
          </div>
        ) : (
          <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent py-0">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={hideSearchIcon}
              >
                {showSearchIcon ? (
                  <span className="navbar-toggler-icon"></span>
                ) : (
                  <span>
                    <i className="fas fa-times text-white"></i>
                  </span>
                )}
              </button>
            </nav>
            <Logo />
          </>
        )}
        <button id="search-btn-res-id" className="btn d-lg-none shadow-none" onClick={toggleSearchForm}>
          {showSearchIcon &&
            (showSearch ? <i className="fas fa-times text-white"></i> : <i className="fa fa-search text-white"></i>)}
        </button>
      </div>
      <div className="container">
        <NavSmallScreen />
      </div>
    </header>
  )
}
