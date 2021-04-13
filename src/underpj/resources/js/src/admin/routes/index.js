import adminUsersRoutes from './usersRouter';
import { Switch, Route } from 'react-router-dom';

const setRoute = (routes) => {
    var result = null;

    if(routes.length > 0){
        result = routes.map((route,index)=>{
            return(
                <Route key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}>

                </Route>
            )
        });
    }
    return <Switch>{result}</Switch>
}

const routes = [
    ...adminUsersRoutes
];

export default setRoute(routes)
