import React, { Component } from 'react'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div >
                <header style={{alignItems: 'center'}}>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div style={{margin:'0 auto'}}><a className="navbar-brand">
                            CGD Coffee Machine Ticketing Module
                        </a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header