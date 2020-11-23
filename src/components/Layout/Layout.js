import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer'

import classes from './Layout.module.css'

class Layout extends Component  {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <div>Toolbar, SideDrawer, Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default Layout
