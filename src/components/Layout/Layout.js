import React from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer'

import classes from './Layout.module.css'

const Layout = (props) => {
    return (
        <Auxiliary>
        <Toolbar />
        <SideDrawer />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
        </Auxiliary>
    )
}

export default Layout
