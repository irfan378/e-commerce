import React from 'react'
import { ReactNavbar } from "overlay-navbar";
import logo from "../../Images/pngwing.com.png";

const Header = () => {
    return (<ReactNavbar
        burgerColor="#eb4034"
        burgerColorHover="#a62d24"
        logo={logo}
        logoWidth="20vmax"
        navColor1="#00FFFF"
        logoHoverSize="10px"
        logoHoverColor="#eb4034"
        link1Text="Home"
        link2Text="Product"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="/product"
        link3Url="/contact"
        link4Url="/about"
        link1Size="1.3vmax"
        link1Color="rgba(35,35,35,0.8)"
        nav1justifyContent="flex-end"
        nav2JustifyContent="flex-end"
        nav3JustifyContent="flex-start"
        link1ColorHover="#eb4034"
        link2ColorHover="#eb4034"
        link3ColorHover="#eb4034"
        link4ColorHover="#eb4034"
        link1Margin="1vmax"
        profileIconColor="rgba(35,35,35,0.8)"
        searchIconColor="rgba(35,35,35,0.8)"
        cartIconColor="rgba(35,35,35,0.8)"
        profileIconColorHover="#eb4034"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        cartIconMargin="1vmax"
    />)
};

export default Header