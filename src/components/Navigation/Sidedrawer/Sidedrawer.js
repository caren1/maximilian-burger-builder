import React from 'react'
import classes from './Sidedrawer.module.css'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const Sidedrawer = (props) => {
    
    

    return (
        <div className={classes.Sidedrawer}>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
}

export default Sidedrawer
