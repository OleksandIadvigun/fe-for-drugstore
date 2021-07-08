import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	withRouter,
    Redirect
} from 'react-router-dom';
import {authRotes, publicRoutes} from "../routes";
import Shop from "../pages/Shop";
import {SHOP_ROUTE} from "../utils/constants";
import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

import '../index.css'

 const AppRouter = observer( () => {
	const {user} = useContext(Context)
  return (
    <Switch>
		{user.isAuth && authRotes.map(({path, Component},index) =>

		<Route key={path} path={path} component={Component} exact={true}/>
		)}
		{ publicRoutes.map(({path, Component}, index) =>
			<Route key={path} path={path} component={Component} exact={true}/>
		)}
		<Redirect to={SHOP_ROUTE}/>
    </Switch>
  );
})
export default AppRouter
