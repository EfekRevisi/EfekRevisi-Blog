import React, { Component } from 'react';
import Link from 'next/link';

class Header extends Component {
    render() {
        return (
            <div>
                <Link href="/">
                    <a>Home Page</a>
                </Link>
                <Link href="/about">
                    <a>About Page</a>
                </Link>
            </div>
        );
    }
}

export default Header;
