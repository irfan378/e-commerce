import React from 'react'
import "./Footer.css"
import styles from "../../../App.css"

const Footer = () => {
    return (
        <footer className='my-10 p-2 bg-black text-white'>
            <div className="leftFooter">
                <h4>Ecommerce</h4>
                <p>High quality and fast delivery is our priority</p>
                <p>Copyrights 2022 &copy; Irfan Farooq</p>
            </div>

            <div className="bg-black">
                <h4>Follow us</h4>
                <a href="http://instagram.com">Instagram</a>
                <a href="http://facebook.com">Facebook</a>
                <a href="http://twitter.com">Twitter</a>
            </div>
        </footer>
    )
}

export default Footer