import React, { useState } from 'react';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    return (
        <div>
            {!loggedIn ? (
                <Login onLogin={() => setLoggedIn(true)} />
            ) : (
                <>
                    <AddEmployee onAdded={() => window.location.reload()} />
                    <EmployeeList />
                </>
            )}
        </div>
    );
}

export default App;
