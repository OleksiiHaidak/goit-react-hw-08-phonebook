import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import css from "Layout/Layout.module.css";
import { selectAuthenticated, selectUserData } from "redux/auth/auth.selectors";
import { logOutThunk } from "redux/auth/auth.reducer";

const Layout = ({ children }) => {

    const dispatch = useDispatch();

    const authenticated = useSelector(selectAuthenticated);
    const userData = useSelector(selectUserData);

    const onLogOut = () => {
        dispatch(logOutThunk());
     };
    return (
        <div>
            <header className={css.header}>
                {authenticated ?
                <>
                    <NavLink className={`${css.headerLink} ${css.noHover}`} to="/contacts">Contacts</NavLink>
                        <div className={css.userName}>
                            <span className={css.titleName}>{userData.name}</span>
                            <p className={css.titleName}>{userData.email}</p>
                            <button onClick={onLogOut} className={`${css.headerLink} ${css.logOutBtn}`}>Log Out</button>
                        </div>
                </> 
                : 
                <>
                <NavLink className={({ isActive }) => `${css.headerLink} ${isActive ? css.active : ''}`} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => `${css.headerLink} ${isActive ? css.active : ''}`} to="/login">Login</NavLink>
                <NavLink className={({ isActive }) => `${css.headerLink} ${isActive ? css.active : ''}`} to="/register">Register</NavLink>
                </>}
            </header>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;