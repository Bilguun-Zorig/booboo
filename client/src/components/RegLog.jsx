import React from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const RegLog = ({ updateUser }) => {
    return (
        <div>
            {/* row offset-1 */}
            <div className="d-flex justify-content-evenly">
                <RegisterForm onRegister={updateUser} />
                <LoginForm onLogin={updateUser} isCompact={true} />
            </div>
        </div>
    )
}

export default RegLog