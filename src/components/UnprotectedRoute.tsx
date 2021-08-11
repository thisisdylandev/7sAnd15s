import { Route, Redirect } from "react-router";

interface UnprotectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
  isAuthenticated: boolean;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({ component: Component, path, isAuthenticated }) => {

  return (
    <Route path={path} render={() => isAuthenticated ? <Redirect to="/team" /> : <Component />} />
  );
};

export default UnprotectedRoute;