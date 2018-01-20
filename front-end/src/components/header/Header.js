import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Container, Menu } from 'semantic-ui-react'

class Header extends Component {
    onLogoutClick = event => {
        event.preventDefault();
        this.props.handleLogout();
        this.props.history.replace('/login');
    };

    render() {
        const pathname = this.props.history.location.pathname;

        const isHomePage = pathname === '/nearby-shops' || pathname === '/';
        const isProfilePage = pathname === '/preferred-shops';
        const isLoginPage = pathname === '/login';

        return (
            <Menu pointing secondary={false} fixed={'top'} inverted>
                <Container>
                    <Link to='/nearby-shops' className={isHomePage ? 'item active' : 'item'}>Nearby Shops</Link>
                    <Link to='/preferred-shops' className={isProfilePage ? 'item active' : 'item'}>My preferred Shops</Link>
                    <Menu.Menu position='right'>
                        {
                            this.props.isAuthenticated
                                ? <Menu.Item className='item' onClick={this.onLogoutClick}>Logout</Menu.Item>
                                : <Link to='/login' className={isLoginPage ? 'item active' : 'item'}>Login</Link>
                        }
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.any,
    handleLogout: PropTypes.func.isRequired
};

export default withRouter(Header);
