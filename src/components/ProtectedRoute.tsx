import { Route, Redirect } from "react-router";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, path, isAuthenticated }) => {

  return (
    <Route path={path} render={() => isAuthenticated ? <Component /> : <Redirect to="/login" />} />
  );
};

export default ProtectedRoute;