import React, { createContext } from 'react';

//allow us to save values, functions etc. and make them available across components
const UserContext = createContext();

export default UserContext;


// import React, { createContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [loggedInUser, setLoggedInUser] = useState(() => {
//         try {
//             // Attempt to get a stored user from localStorage
//             const item = window.localStorage.getItem('loggedInUser');
//             return item ? JSON.parse(item) : {};
//         } catch (error) {
//             console.error(error);
//             return {};
//         }
//     });

//     const saveLoggedInUser = (user) => {
//         setLoggedInUser(user);
//         localStorage.setItem('loggedInUser', JSON.stringify(user));
//     };

//     const handleLogout = () => {
//         setLoggedInUser({});
//         localStorage.removeItem('loggedInUser');
//         // Logout call to backend to clear HTTP-only cookie will be handled in the Nav component
//     };

//     return (
//         <UserContext.Provider value={{ loggedInUser, saveLoggedInUser, handleLogout }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export default UserContext;
