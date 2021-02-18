import React, { Component } from 'react';
// import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect, props) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                redirect: false,
                isMounted: false
            };
    }
    componentDidMount() {
        this.setState({isMounted: true});
        fetch('/checkToken')
            .then(res => {
                if (res.status === 200) {
                    this.setState({ loading: false });
                } else {
                    // const error = new Error(res.error);
                    // throw error;
                    // console.info(`component protected: `, error);
                }
            })
            .catch(err => {
                console.info(`component protected: `, err);
                this.setState({ loading: false, redirect: true });
        });
    }
    render() {
        const { loading, redirect } = this.state;
        if (loading) {
            return null;
        }
        if (redirect) {
            return <Redirect to="/login" />;
        }
        return <ComponentToProtect props={ props } {...this.props} />;
    }
    }
}



// function withAuth (ComponentToProtect) {
//     const [loading, setLoading] = useState(true);
//     const [redirect, setRedirect] = useState(false);

//     useEffect(() => {
//         fetch('/checkToken')
//         .then(res => {
//             if (res.status === 200) {
//                 setLoading(false);
//             } else {
//                 const error = new Error(res.error);
//                 throw error;
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             setLoading(false);
//             setRedirect(true);
//         });
//     }, [])

//     if (loading) {
//         return null;
//     }
//     if (redirect) {
//         return <Redirect to="/login" />;
//     }
//         return <ComponentToProtect { ...props } />;
// };

// export default withAuth;