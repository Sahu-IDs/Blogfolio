import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState({
        name: sessionStorage.getItem('name') || '',
        username: sessionStorage.getItem('username') || '',
        role: sessionStorage.getItem('role') || 'user',
        _id: (sessionStorage.getItem('_id') && sessionStorage.getItem('_id') !== 'undefined')
            ? sessionStorage.getItem('_id')
            : (localStorage.getItem('_id') && localStorage.getItem('_id') !== 'undefined') ? localStorage.getItem('_id') : ''
    });
    const [themeMode, setThemeMode] = useState('light');

    return (
        <DataContext.Provider value={{ account, setAccount, themeMode, setThemeMode }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;