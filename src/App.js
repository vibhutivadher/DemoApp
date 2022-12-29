import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Auth from "./Component/Auth"
import Dashboard from "./Component/Dashboard"

function App() {
  let isLoggedIn = localStorage.getItem('isLoggedIn');
  const PrivateRoute = ({ children }) => {
    if (isLoggedIn == "false") {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter >
  )
}

export default App