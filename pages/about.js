import React, { Component } from 'react';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import Header from '@/component/header.component';

class about extends Component {
    static async getInitialProps({ _, query }) {
        let { items } = query;
        return { items };
    }

    render() {
        const { items } = this.props;

        return (
            <div>
                <Header />
                <p>About Next.JSSS</p>
                {items.map((x) => (
                    <div key={x.newsID}>
                        {x.newsID} - {x.title}
                    </div>
                ))}
            </div>
        );
    }
}

export default withRouter(about);
