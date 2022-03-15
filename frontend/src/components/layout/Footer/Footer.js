import React from 'react'
import "./Footer.css"

const Footer = () => {
    return (
        <footer id='footer'>
            <div className="midfooter">
                <h2>Ecommerce</h2>
                <p>High quality and fast delivery is our priority</p>
                <p>Copyrights 2022 &copy; Irfan Farooq</p>
            </div>

            <div className="rightfooter">
                <h4>Follow us</h4>
                <a href="http://instagram.com">Instagram</a>
                <a href="http://facebook.com">Facebook</a>
                <a href="http://twitter.com">Twitter</a>
            </div>
        </footer>
    )
}

export default Footer