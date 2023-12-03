/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */

import { fakeClientState } from 'Store/fake-state'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import img from '../../../assets/img/icon-user.svg'
import LanguageList from '../../SharedComponents/LanguageBtn/LanguageList'
import { logout } from 'src/api/auth-apis'
import toast from 'react-hot-toast'
import { useSubscription } from 'src/libs/global-state-hook'
import { userStore } from 'src/Store/user.store'
import { useSocket } from 'src/socket.io'
import { getNotifies } from 'src/api/message-api'
import { ESocketEvent } from 'src/utils/enum'
import { MailFilled, BellFilled } from '@ant-design/icons'
import { Badge, Dropdown, Divider, Space, MenuProps } from 'antd'
import React from 'react'
import { pickName, timeAgo } from 'src/utils/helperFuncs'
import notiIcon from '../../../assets/img/notifyicon.png'

export default function NavLargScreen() {
  const { t, i18n } = useTranslation(['main'])
  const navigate = useNavigate()
  const user = useSubscription(userStore).state
  const [notifies, setNotifies] = useState([])
  const [unSeen, setUnSeen] = useState([])
  const [unSeenMSG, setUnSeenMSG] = useState(0)
  const { appSocket } = useSocket()
  const lang = i18n.language

  const handleLogout = () => {
    logout()
      .then(res => {
        console.log(res)
        navigate('/login')
        window.location.reload()
        localStorage.removeItem('userType')
        localStorage.removeItem('expiredIn')
        toast.success('Bye', {
          icon: '👋',
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  useEffect(() => {
    getNotifies(user?.id || user?._id).then(res => {
      setNotifies(res.data.results)
      setUnSeen(res.data.results?.filter(n => !n?.seen) || [])
    })
  }, [])

  useEffect(() => {
    // App socket
    appSocket.on(ESocketEvent.SENDNOTIFY, data => {
      console.log('Get Notify:', data)
      if (data?.to === (user?.id || user?._id)) {
        setNotifies(prev => [{ ...data, createdAt: new Date() }, ...prev])
        setUnSeen(prev => [...prev, data])
      }
    })

    // The listeners must be removed in the cleanup step, in order to prevent multiple event registrations
    return () => {
      appSocket.off(ESocketEvent.SENDNOTIFY)
    }
  }, [notifies, unSeen])

  const items = useMemo(() => {
    return notifies?.slice(0, 5)?.map((s, ix) => {
      return {
        label: (
          <div className="row" style={{ width: 400 }}>
            <img className="col-2" height={36} width={36} src={s.image || notiIcon} alt="sss" />
            <Link
              className="col-7 text-wrap text-truncate"
              style={{ color: s?.seen ? 'black' : '#6600cc' }}
              to={s?.path || '#'}
            >
              {pickName(s?.content, lang)}
            </Link>
            <p className="col-3">{timeAgo(s?.createdAt, t)}</p>
          </div>
        ),
        key: ix,
      }
    }) as MenuProps['items']
  }, [notifies])

  const onSeenNotify = e => {
    if (e) {
      setUnSeen([])
    }
  }

  return (
    <div className="navbar-expand" id="navbarNav-id">
      <ul className="navbar-nav align-items-center">
        <li className="nav-item hov-cn">
          <NavLink className="nav-link" to="/home">
            {t('Jobs')}
          </NavLink>
          <ul className="dropdown-menu text-break" style={{ marginTop: '-8px' }}>
            <div className="nav-dd-cn"></div>
            <li>
              <Link className="dropdown-item" to="/home">
                {t('My Jobs')}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item text-break" to="/all-job-posts">
                {t('All Jobs')}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/all-contracts">
                {t('Contracts')}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/post-job">
                {t('Post a job')}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/invitations">
                {t('Invitations')}
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item hov-cn ms-3">
          <NavLink className="nav-link" to="/freelancer">
            {t('Freelancer')}
          </NavLink>
          <ul className="dropdown-menu" style={{ marginTop: '-8px' }}>
            <div className="nav-dd-cn"></div>
            <li>
              <Link className="dropdown-item" to="/freelancer">
                {t('All freelancers')}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/saved-freelancer">
                {t('Favourite freelancers')}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/freelancer/my-hires">
                {t('My Hires')}
              </Link>
            </li>
            {/* <li>
              <Link className="dropdown-item" to="/freelancer/saved-freelancer">
                {t('Saved Freelancer')}
              </Link>
            </li> */}
          </ul>
        </li>
        <li className="nav-item hov-cn">
          <NavLink className="nav-link" to="/transaction-history">
            {t('Reports')}
          </NavLink>
          <ul
            id="reports-dd-id"
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
            style={{ marginTop: '-8px' }}
          >
            <div className="nav-dd-cn"></div>
            <li className="fw-bold py-1 ms-3">{t('FINANCIALS')}</li>
            <li>
              <a className="dropdown-item ps-3" href="#">
                {t('Transactions')}
              </a>
            </li>
            <li className="border-top-cn fw-bold py-1 ms-3">
              {t('MORE REPORTS')}
              <div>
                <div className="text-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 130" width="80" height="80" role="img">
                    <g fill="#e0e0e0">
                      <path d="M103.5 96.6H90.9l4.4 28h12.6zM41.5 96.6h12.6l-4.4 28H37.1z"></path>
                    </g>
                    <path
                      d="M140.8 91.1H4.2c-.6 0-1-.4-1-1V6.4c0-.6.4-1 1-1h136.6c.6 0 1 .4 1 1v83.7c0 .5-.4 1-1 1z"
                      fill="#1d4354"
                      className="report-board"
                    ></path>
                    <path
                      d="M32 67.3c-.2 0-.5-.1-.6-.3-.4-.4-.4-.9 0-1.3l27.5-28.5c.3-.3.8-.4 1.1-.1l25.5 15.5 23.2-23.2c.4-.4.9-.4 1.3 0s.4.9 0 1.3L86.3 54.4c-.3.3-.8.4-1.1.1L59.6 39.1l-27 28c-.1.1-.4.2-.6.2z"
                      fill="#fff"
                    ></path>
                    <circle cx="109.4" cy="30.1" fill="#6600cc" r="5.6"></circle>
                    <circle cx="84.6" cy="52.6" fill="#6600cc" r="5.6"></circle>
                    <circle cx="59.8" cy="38.6" fill="#6600cc" r="5.6"></circle>
                    <circle cx="32" cy="66.4" fill="#6600cc" r="5.6"></circle>
                    <path
                      d="M143.5 98.4H1.5c-.6 0-1-.4-1-1V85.5c0-.6.4-11-1h142c.6 0 1 .4 1 1v11.9c0 .6-.4 1-1 1z"
                      fill="#6600cc"
                    ></path>
                  </svg>
                </div>
                <p className="fw-normal p-3">
                  {t(
                    'Access premium reports such as hourly timesheets, team budgets, weekly summaries and more when you upgrade.'
                  )}
                </p>
                <a href="#" style={{ color: '#6600cc' }} className="d-block text-center mb-3">
                  {t('Learn More')}
                </a>
              </div>
            </li>
          </ul>
        </li>
        <li className="nav-item ms-5 me-3">
          <Badge
            count={unSeenMSG || 0}
            color={"purple"}
            status="processing">
            <NavLink className=""
              onClick={() => setUnSeenMSG(0)}
              style={{ padding: '10px 10px', borderRadius: 100, background: "#f5f0fa" }} to="/messages">
              <MailFilled style={{ fontSize: 18, }} />
            </NavLink>
          </Badge>
        </li>
        <li className="nav-item pe-2">
          <Badge
            count={unSeen?.length || 0}
            color={"purple"}
            status="processing">
            <Dropdown
              menu={{ items }}
              trigger={['click']}
              overlayStyle={{
                overflowY: 'auto',
                maxHeight: '100vh',
              }}
              onOpenChange={e => onSeenNotify(e)}
              arrow={{ pointAtCenter: true }}
              dropdownRender={(menu) => (
                <div style={{
                  
                  padding: 18,
                  height: '70%',
                  borderRadius: 10,
                  background: "white",
                  marginLeft: 24,
                  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                }}>
                  <h3>{t("Notification")}</h3>
                  {React.cloneElement(menu as React.ReactElement, { style: { boxShadow: 'none' } })}
                  <Divider style={{ margin: 0 }} />
                  <Space style={{ padding: 8 }}>
                    <Link to="/notifications" className="nav-link" type="primary">{t("View all")}</Link>
                  </Space>
                </div>
              )}
            >
              <NavLink to="/notifications" style={{ padding: 10, borderRadius: 100, background: "#f5f0fa" }} onClick={e => { e.preventDefault(); e.stopPropagation() }} className="">
                <BellFilled style={{ fontSize: 18 }} />
              </NavLink>
            </Dropdown>
          </Badge>
        </li>
        <li className="nav-item border-start border-secondary ps-2">
          <a className="nav-link" href="#">
            <i className="fas fa-user-plus fs-5"></i>
          </a>
        </li>
        <li className="me-3">
          <LanguageList />
        </li>
        <li className="dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              style={{ height: '50px', width: '50px' }}
              className="rounded-circle bg-white"
              src={user.avatar ? user.avatar : img}
              alt=""
            />
          </a>
          <ul id="acc-id" className="dropdown-menu p-2" aria-labelledby="navbarDropdownMenuLink">
            <div className="nav-dd-acc-cn"></div>
            <li className="px-4 py-3">
              <div id="acc-btns-id" className="btn-group w-100" role="group" aria-label="Basic example">
                <button type="button" className="btn">
                  {t('Online')}
                </button>
                <span style={{ padding: '0 1px' }}></span>
                <button type="button" className="btn">
                  {t('Invisible')}
                </button>
              </div>
            </li>
            <li>
              <NavLink className="dropdown-item px-4" to="/find-work">
                <div className="d-flex align-items-center">
                  <span style={{ marginLeft: '-5px' }}>
                    <img
                      style={{ height: '30px', width: '30px' }}
                      className="rounded-circle bg-white"
                      src={user.avatar ? user.avatar : img}
                      alt=""
                    />
                  </span>
                  <div className="acc-cn ms-2">
                    <p>{user?.name}</p>
                    <p>{t('Client')}</p>
                  </div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item px-4 mb-1" to="/home">
                <div className="d-flex align-items-center">
                  <span style={{ marginLeft: '-5px' }}>
                    <i className="fa fa-user-circle fs-3"></i>
                  </span>
                  <div className="acc-cn ms-2">
                    <p>{t('Name')}</p>
                    <p>{t('Freelancer')}</p>
                  </div>
                </div>
              </NavLink>
            </li>
            <li>
              <a className="dropdown-item px-4" href="#">
                <span>
                  <i className="fa fa-cog"></i>
                </span>
                <span className="ps-2">{t('Settings')}</span>
              </a>
            </li>
            <li
              style={{
                cursor: 'pointer',
              }}
              onClick={handleLogout}
            >
              {/* <a className="dropdown-item px-4" href="#"> */}
              <span>
                <i className="fas fa-sign-out-alt"></i>
              </span>
              <span className="ps-2">{t('Log Out')}</span>
              {/* </a> */}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
