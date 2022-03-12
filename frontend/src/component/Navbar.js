import {React, useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

import {isAuth, signout} from '../auth/authAPICalls';

const NavbarTop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [reload, setReload] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {}, [reload])

    return (

        <div className="nav-container mt-4">
            <Navbar light expand="md sticky-top nav-color">
                <NavbarBrand className="ml-sm-5 nav-link">
                    <Link to="/" style={{ textDecoration:'none', color: 'black'}} className="h1">Corp-Farm</Link>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>

                    {isAuth() && isAuth().user.role === 0 && (
                        <Nav className="h4 pt-3" navbar>
                            <NavItem className="nav-link">
                                <Link to={`/farmer/dashboard/${isAuth().user._id}`} style={{ textDecoration:'none', color: 'black'}}>Dashboard</Link>
                            </NavItem>
                        </Nav>
                    )}

                    {isAuth() && isAuth().user.role === 1 && (
                        <Nav className="h4 pt-3" navbar>
                            <NavItem className="nav-link">
                                <Link to={`/corporate/dashboard/${isAuth().user._id}`} style={{ textDecoration:'none', color: 'black'}}>Dashboard</Link>
                            </NavItem>
                        </Nav>
                    )}


                    {!isAuth() && (
                        <Nav className="ml-auto h4" navbar>
                            <NavItem className="nav-link">
                                <Link to="/signin" style={{ textDecoration:'none', color: 'black'}}>SignIn</Link>
                            </NavItem>
                            <NavItem className="nav-link">
                                <Link to="/signup" style={{ textDecoration:'none', color: 'black'}}>SignUp</Link>
                            </NavItem>
                        </Nav>
                    )}


                    {isAuth() && (
                        <Nav className="ml-auto h4" navbar>
                            <NavItem className="nav-link text-warning"

                                >
                                <Link to="/" onClick={() => {
                                    setReload(!reload);
                                    signout()}}>  Signout</Link>
                            </NavItem>
                        </Nav>
                    )}

                </Collapse>
            </Navbar>
        </div>

    );
}

export default NavbarTop;
