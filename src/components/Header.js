import React, { useContext, useState, useCallback } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import Authentication from "../context/AuthenticationContext";

import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Avatar, Dropdown, DropdownItem, WindmillContext } from '@windmill/react-ui'
import { useHistory } from 'react-router-dom'

function Header() {
  const history = useHistory();

  const { mode, toggleMode } = useContext(WindmillContext)
  const authenticationContext = useContext(Authentication);
  const { toggleSidebar } = useContext(SidebarContext)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)


  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const handleLogOut = useCallback(() => {
    authenticationContext.logOut();
    history.push("/");
  }, [authenticationContext, history]);

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={() => {
            console.log("chamou")
            toggleSidebar()
          }}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">

        </div>
        <ul className="flex items-end flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex-center">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src="data:image/png;base64,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"
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem onClick={handleLogOut}>
                <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Sair</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
