import React from 'react'
import { adminMenu, userMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, message } from 'antd';
import "../styles/LayoutStyle.css";
import { useSelector } from 'react-redux';
const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    //useLocation ni madad thi aapn ne current URL made 
    //have location.pathname karva thi aapn ne current URL madse means je page khulyu hase
    //enu URL return karse 
    const navigate = useNavigate();
    //Logout Function
    const handleLogout = () => {
        localStorage.clear();
        message.success('Logout Successfully');
        navigate("/login");
    }

    const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fa-solid fa-house",
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: "fa-solid fa-list",
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: "fa-solid fa-user",
        },
    ];

    //rendering menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo"><h6>Doc App</h6><hr></hr></div>
                        {/* map che te SidebarMenu upar lagadyu che means SidebarMenu na darek element mate 
  callback function je .map pachi lakhyu che te execute thase */}
                        <div className="menu">{SidebarMenu.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <>
                                    {/* //niche ni line no matlab evo k jo isActive true hase to className ma 
            active add thai jase ane menu-item to rehse j etle eni css to lagse j */}
                                    <div className={`menu-item ${isActive && "active"}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            );
                        })}
                            <div className={`menu-item`} onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link to="/login">Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">

                            <div className="header-content" style={{ cursor: "pointer" }}>
                                <Badge count={user && user.notification.length} onClick={() => { navigate('/notification') }}>
                                    <i class="fa-solid fa-bell"></i>
                                </Badge>
                                <Link to="/profile">{user?.name}</Link>
                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
