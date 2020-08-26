import React from "react";
import "./App.css";
import NavBar from "./features/navbar/NavBar";
import AuthProvider from "./providers/AuthProvider";
import { AuthRoute, ProtectedRoute, AdminRoute } from "./util/auth_routes";
import SignUp from "./features/auth/SignUp";
import Login from "./features/auth/Login";
import { Route } from "react-router-dom";
import Student from "./features/views/Student";
import Admin from "./features/views/Admin";
import JobPage from "./features/jobs/JobPage";
import ErrorBoundaries from "./features/ErrorBoundaries/ErrorBoundaries";
import ClientRefresh from "./ClientRefresh";
import SocketProvider from "./providers/SocketProvider";

function App() {
  return (
    <div className="App">
      <ErrorBoundaries>
        <SocketProvider>
          <AuthProvider>
            <NavBar />
            <ClientRefresh />
            <ErrorBoundaries>
              <Route exact path="/">
                <Student />
              </Route>
              <AuthRoute path="/signup">
                <SignUp />
              </AuthRoute>
              <AuthRoute path="/login">
                <Login />
              </AuthRoute>
              <AdminRoute path="/admin">
                <Admin />
              </AdminRoute>
              <ProtectedRoute path="/jobtracker">
                <JobPage />
              </ProtectedRoute>
            </ErrorBoundaries>
          </AuthProvider>
        </SocketProvider>
      </ErrorBoundaries>
    </div>
  );
}

export default App;
