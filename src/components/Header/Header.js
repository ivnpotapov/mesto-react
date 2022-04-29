import React, { Component } from 'react'
import headerLogo from '../../images/header__logo.svg'

class Header extends Component {
  render() {
    return (
      <header className='header'>
        <img src={headerLogo} alt='логотип Место' className='header__logo' />
      </header>
    )
  }
}

export default Header
