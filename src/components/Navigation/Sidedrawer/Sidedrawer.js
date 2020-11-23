import React from 'react'
import classes from './Sidedrawer.module.css'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary'

const Sidedrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Closed];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    )
}

export default Sidedrawer
