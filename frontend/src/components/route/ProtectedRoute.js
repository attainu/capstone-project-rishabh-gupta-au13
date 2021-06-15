import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'


const ProtectedRoute = ({component:component,...rest}) => {
    
    const {isAuthenticated,loading,user}=useSelector(state=>state.auth )

    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return<Redirect to='/login'/>
                        }
                        return <component {...props}/>
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute