import { createContext, useContext, useState } from 'react';

const StateContext = createContext({
  user: null,
  token: null,
  userRole: null,
  attendanceId: null,
  notifications: [],
  setUser: () => {},
  setToken: () => {},
  setUserRole: () => {},
  setAttendanceId: () => {},
  setNotifications: () => {}
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [userRole, setUserRole] = useState([]);
  const [attendanceId, setAttendanceId] = useState();
  const [notifications, setNotifications] = useState([]);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  return (
    <StateContext.Provider value={{
      user,
      token,
      userRole,
      attendanceId,
      notifications,
      setUser,
      setToken,
      setUserRole,
      setAttendanceId,
      setNotifications
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
