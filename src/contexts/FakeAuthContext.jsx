import { createContext, useReducer, useContext } from "react";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
  }
};
const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth is used outside AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
