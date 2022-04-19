# Routes:
	- app.module is a good place to define our routes/ to inform angular about the routes our application will have. Because here we configure our app.
	
	- import { Routes, RouterModule } from '@angular/router';
	
	- Definig Routes:
	- const appRoutes: Routes = [ 
		{ path: '', component: HomeComponent },
		{ path: 'users', component: UsersComponent },
		{ path: 'servers', component: UsersComponent }
	];

	- path will be written in URL 
	- And upon hitting that URL what should appear --- >> for that we are giving different components for each different path.
	- So you should configure your components to look like a page.
	- Also add this array 'appRoutes' in your imports array in app.module file.

	- imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)]
	- RouterModule has special method 'forRoot' which allows us to register some routes for our main application.

	- Now angular needs to know where to display these routes.
	- Add "<router-outlet></router-outlet>" selector where you need to render these routes.
	- "router-outlet" is a built-in directive not a component. Directives can also have slectors.
	- THis will simply marks the place in our document where we want the angular router to load the component of currently selected route.


# Navigation:
	- Right Now, every time we go to a different page our app reloads and then renders page.
	- This is not a desired behavior.
	- Because it means it restarts our appon every navigation.

	- SO , instead of using "href" attribute of .html use "routerLink" attribute given by angular.
	- It allows us to construct more complex paths very easily.
	- Now, our app still navigates to other pages but it does NOT reload every time like it used to.
	- Better user experience, Does NOT resstart our app, much fatser
	- "routerLink" catches the clock on the element, prevents the default which would be to send a request and instead analyzes what (the path) we passed to the "routerLink" directive, and then checks if it finds a fitting route in our configuration which would be our "appRoutes" array.


# Navigation Paths:
	- "routerLink" can also be used as property binding.
	- Using "/" before the path in "routerLink" will be considered as absolute path. If you do NOT use "/", it would be considered as relative path.
	- With a relative path, it always appends the path you specify in the "routerLink" to the end of your current path.
	- Current path depends on what component you are currently on.
	- So in "app-root" we can use this without "/" because here current path is already a root path. Because we are in "root" component. But in some other component you should be careful about routing.
	- You can specify "routerLink" same as you specify paths for importing functions/classes. 
	- e.g., you can use "./", "../", "../../" etc. Navigate around like a folder directory.
	- ./ ===>>> same as relative path.
	- ../ ===>>> go up one level (component) and then add this to current path.


# Styling Active Router Links:
	- To add a CSS class to the element if some route is active we can use "routerLinkActive" attribute directive to the element and pass it a CSS class.
	- The good thing about this directive is you can also give it to a wrapping element which has the element in which route is defined.
	- "routerLinkActive" analyzes the currently loaded path and then checks which links lead to a route which uses this path.
	- And then it marks that element active and add that CSS class.
	- If you have an active class for a parent route and an active class for child route, then if the child route only is active, it will also show its parent class active.
	- Because, parent route path is also a part of child route path. 
	- TO avoid that, use another directive (a special configuration) as property binding where you used "routerLinkActive":
	- [routerLinkActiveOptions]="{exact: true}"
	- This will basically tell angular only add this "routerLinkActive" CSS class if it matches the exact path as given. Not only if its a part of a path.


# Navigating Programmatically:
	- Triggering the navigation, using the typescript code.
	- We'll execute a method on click.
	- In that method, we need to get access to our router because we need to tell it to naviagte somewhere else,
	- "We can inject routers."  ------->>>>>>  private router: Router
	- use "naviagte" method of "Router" class. and pass it an array of paths of routes where you wan to naviagate.
	- this.router.navigate(['/servers']);
	- We passed an absolute path. And it also does NOT reload our page like "routerLink"



# Relative path in Programmatic Navigation:
	- In previous example, we used an absolute path.
	- The navigate method, by default, uses absolute path whether you use "/" or not. You have to give it an additional detail about current "route" to make it a relative path.
	- You can find your current path using an object of class "ActivatedRoute"
	- We will give current route as an additional argument to navigate method and pass an object which specifies a path to which relative we want our path to naviagate to.
	
	- this.reouter.navigate(['servers'], {relativeTo: this.route})


# Parameters of Routes:
	- Dynamic Segment in our path, parameter to our route.
	- Dynamically loading User on the basis of id in path of route
	
	- { path: 'user/:id ', component: UserComponent }
	- ":" with id tells angular that this is a dynamic part of the path.
	- After ":", add parameter name which you will be able to retrieve inside the loaded component by that name you specify here.
	- Now as instead of ":id" you can pass "anything" and the component will be loaded. And that "anything" will be interpreted as "id".


# Fetching Route Parameter:
	- To get access to currently loaded route, use an object of class "ActivatedRoute"
	- this object is a Javascript object with a holds lot of metadata about the currently loaded route.
	- The "ActivatedRoute" object we injected will give us access to the "id" passed in the URL.
	- Accessing parameters of URL:

	-  this.route.snapshot.params['id']            ----->>> this.route == an object of "ActivatedRoute" class.


# Fetching Route Parameter Reactively:
	- <a [routerLink]="['/users', 10, 'Anna ']"></a>         ------>>>>> "/users/10/Anna"
	- Above routerLink will construct a route "/users/10/Anna".
	- If we stay on user-component and call this route (on the same component to the smae component), the route will update but the information on the page will NOT change.
	- Right now, user-component is using router link information to render its page.
	- But staying on the same page, when we update the route, the URL gets updated, but the page content does NOT update.
	- This is because, Angular, by default, does NOT reconstruct the page on which it is on.
	- We are already on the component which should get loaded. So, Angular does NOT instantiate this component. It will only cost us performance.
	- Before, We loaded our data using "snapshot" method on the "ActivatedRoute". This is good for the first initialization of page. It does NOT work if we change the route from the same component.
# Observable: (Third party package, not angular's default)
	- Allows you to easily work with asynchronous tasks.
	- Now, we are dealing with such asynchronous task. Because the parameter of our currently loaded route might change sometime in the future but we do NOT when and if and how long will it take.
	- So we cannot block our code and wait for it to happen because it might never happen.
	- So, an Observable is an easy way to subscribe to some event which might happen in the future and then some code when and if it happens without having to wait for it now.
	- "params" an observable that "ActivatedRoute" has which can be used for this task.
	- "subscribe()" a method of "params", can take three functions as parameters.
	- First function will be fired whenever new data is sent through observable, i.e., whenever the parameter changes

	- this.route.params.subscribe (
      	(params: Params) => {
        	this.user.id = params['id'];
        	this.user.name = params['name'];
      	}
    )

    - We will get updated "params" as an argument to our function whenever router path changes.
    - Now here the subscription will set up but the function will not execute unless the parameters in our URL changes.

    - If you know, your component will NOT be recreated from within the same component, then you do NOT need to use this approach.



# Route Observables:
	- The subscription that we have created stays in the memory even when the component is destroyed.
	- Because subscroption is not tied to our components.
	- Next time you come back to this component (where "subscribe()" method is used), you might encounter some bug due to the last subscription that stayed in the memory.
	- So you should "unsubscribe()" before destroying the component.

	- Now, This case is only for when you create your own observables. Not the default ones that we have used. The default ones are deleted by angular itself.
	- Angular, cleans up the subscription you set up in the component whenever the component is destroyed in the background.
	
	- this.paramsSubscription = this.route.params.subscribe   (
      	(params: Params) => {
        	this.user.id = params['id'];
        	this.user.name = params['name'];
      	}
    )

    - ngOnDestroy() {
    	this.paramsSubscription.unsubscribe()
  	}

# Passing Query Parameters and Fragments:
	- Query Parameters ----->>> "?mode=editing"  ---->> Separated by question mark
	- Fragments -->> #fragment
	- Want to add a Query Parameters and Fragments in your URL.
	- First define, the "routerLink" in the element, 
	- For query paramter, add another property "queryParams" as property binding an give it an .js object. And in that object, give the query parameter name and its value.
	- For more than one query paramter give more key-value pairs. And in URL separate them using "&" 
	- For fragment, add another property in the same element "fragement" and pass it the name of your fragment.

	- <a
        [routerLink]="['/servers', 5, 'edit']"
        [queryParams]="{allowEdit: '1'}"
        fragment="loading">
      </a>

    - Adding it programmatically:

    - this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});


# Retreiving Query Parameters and Fragments:   
	- Use an object (route) of class "ActivatedRoute" to retrieve them.
	
	- this.route.snapshot.queryParams
	- this.route.snapshot.fragment

	- This might bring same problem as we have encountered before. --->> this is only updated at the time this component is created.
	- So, if there is a chance of changing your query parameter and fragment from the page you are currently on, you should not use this approach. Because it will NOT be reactive.
	- It will allow you to react to any changes that happens after this component has been loaded.
	- You should use this following approach of subscription as we have used before:
	
	- this.route.queryParams.subscribe();
    - this.route.fragment.subscribe();


# Practice:
	- Loading component using both a parent component and route can cause an error.
	- You might load your component using your route url parameters, in that case loading it using a parent might give an error and vice versa.

	- If we parse a parameter from a URL, it will always be a string, so id will be a string that we access. This might give an error too if we are using this id in our code.
	- So make sure to convert it to "number" firsrt.
	- For that, simply add a "+" sign at the start of the line where you are accessing the id.



# Child (Nested) Route:
	- { path: 'servers', component: ServersComponent, 
		children: [
    		{ path: ':id', component: ServerComponent },
    		{ path: ':id/edit', component: EditServerComponent }
    		]
    	}

    - Above is a way to define child routes. 
    - In child route, you will NOT give absolute path but the relatice path to your parent path.
    - Secondly, these child routes now, will NOT load in the "router-outlet" selector that we have in our "app.component.html" because it only loads parent routes.
    - For these child routes to be loaded we have to add "router-outlet" selector in the parent component of these child routes.



# Preserving Query Parameters (Route):
	
	- this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});

	- Add a new parameter "queryParamsHandling" and set it to "preserve" to preseve the last loaded query paramters.
	- this could also be set to "merge", to merge our old query parameter with new ones which we might add here.
	- Default behaviour is to simply drop all the query parameters.
	- Super usful to make sure you don't lose the information you had before.



# Redirecting and WildCard Routes:
	- First, You can define a route that will be used for all the paths that are not correct or not defined in our routes.
	- Then we can redirect all wrong paths to that path that is for wrong paths.

	- { path: 'not-found', component: PageNotFoundComponent }   ---->>> A route for all wrong paths.

	-  { path: '**', redirectTo: '/not-found' }    --------->>>> "**" is a wild card which tells angular to select all paths other than those which are defined in this app. Which are unknows to this app.
	- Make sure to add this redirect path at the end of all routes. This is super important.
	- Because this will include only those paths which are defined before it. As routes are parsed in order.



# Outsourcing the Route Configuration:
	- Typically if you have more than 2 routes, you should NOT add it directly in the app module. Instead add a new file.
	- "app-routing.module.ts"

	- @NgModule({
    	imports: [
        	RouterModule.forRoot(appRoutes)
    	],
    	exports: [RouterModule ] 
	  })
	  export class AppRoutingModule {}

	- Above we are configuring a separate file for setting up all the routes.
	- Here in NgModule, you do NOT need to add declarations as everyting is defined in "app.module.ts" file.
	- In imports we are defining all our routes that we have set up.
	- But we want "app-routing.module.ts" to simply outsource our routes.
	- For that, we'll use "exports".
	- In "exports", we tell Angular, If we are adding/importing this module to some other module, what should be accessible from this module to other module.


# Guards:
	- Route Guards: Basically a functionality, logic, code which is executed before a route is loaded or once you want to leave the route.
	- Giving some functionality or component access based on certain conditions (Only if the user is logged in)
# canActivate: (Guard)
	- Protecting Routes.
	- canActivate a feature which allows us to run some code at a point of time defined by us.
	- Create a new service.. "auth-guard.service.ts". 
	- Its called "auth-guard" because the feature is called guards. It guards certain actions like navigating to, around or away from it.
	- Create a new service class which implements "CanActivate" interface and define a method "canActivate()" in the class.
	- "CanActivate" interface forces you to have a method "canActivate()". 
	- This method takes two arguments: 
	- (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
	- Angular itself will execute this method before a route is loaded, so angular itself will give us these arguments.
	- We just need to handle this data.

	- canActivate(
		route: ActivatedRouteSnapshot, 
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {	}

	- canActivate() can run both synchronously returning boolean and asynchronously returning observable or promise if takes time to execute.
	- To use it, go to you routes, and add another property to the route which you want to protect.
	- "canActivate: [AuthGuard]"
	- In the array, you pass all the guards you want to apply to your route. It automatically gets applied to all the child routes.
	- Watch video#146



# Only Protecting Child Routes:
	- Use another gurad for that. "CanActivateChild" Interface.
	- This inteface will force us to implement a method "canActivateChild()" which is similar to "canActivate()"
	- Now, go to routes where you have defined all the routes, and in the parent route add another property.
	- "canActivateChild: [AuthGuard]"
	- In the array, you pass all the guards you want to apply to your route. It automatically gets applied to all its child routes.
	- Keep "canActivate: [AuthGuard]", if you want your guard to apply to your parent route too.
	- If you only want to protect child routes than only use "canActivateChild" only.
	- "canActivate" and "canActivateChild" both these property will apply to parent route only.


# Controlling Navigation with canDeactivate:
	- Before we learn to control access to go to a route.
	- Now we will work on access to go away from a route.
	- This is a connvinience method fot keeping the user from accidentally navigating away.
	- Create a new service in "edit-server" named "can-deactivate-guard.service.ts" 
	- In that service create an Interface
# Interface:
	- An interface is simply a contract which can be imported by some other class which forces that class to provide some logic.
	- The interface we are defining will require one thing from the component that implements/imports it:
	- "canDeactivate" method.

	- Now make a Service Class.  "CanDeactivateGuard"
	- This class will implement an interface "CanDeactivate" which will wrap our own interface "CanComponentDeactivate"

	- export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {}

	- Now our interface "CanComponentDeactivate" will force the class to implement a method "canDeactivate()".
	- This whole setup is to make sure that later we can easily connect a component to our "CanDeactivateGuard" class.
	- This "canDeactivate()" method will be called by the Angular router once we try to leave the route. 
	- In the class, the "canDeactivate" method takes some argument.

	- canDeactivate(component: CanComponentDeactivate, 
                    currentRoute: ActivatedRouteSnapshot, 
                    currentState: RouterStateSnapshot, 
                    nextState?: RouterStateSnapshot
                    ): Observable<boolean> | Promise<boolean> | boolean 
    { 
        return component.canDeactivate();
    }

    - "component" : Now wahtever component will implement this service, that will be of type "CanComponentDeactivate"
    - Meaning that component needs to have interface "CanComponentDeactivate"
    - Meaning that component needs to have a method called "canDeactivate".
    - Other arguments will be given by Angular route, when we try to move away from that route.
    - In here, we are calling "canDeactivate()" method of the component we are currently on. Where this class is implemented.

    - Now to whichever you want to apply this guard, add the followin property:
    - "canDeactivate: [CanDeactivateGuard]"
    - In the array, you pass all the guards you want to apply to your route. It automatically gets applied to all the child routes.

    - Now implement this method ti whuchever component you need and create a method "canDeactivate" in that component which will hold the logic for not going away from the route.



# Passing Static Data to Route:
	- To get static data once a router is loaded.
	- Some of our routes depend on data they receive, either statically each time tehy are loaded or they will resolve dynamically.
	- We can pass static data while defining a route to the component using "data" property.
	- "data" property allows us to pass an object and in this object we can define any key value pair, any properties you want.

	- { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} } 

	- We can reuse this component for different routes and pass a different msg for each different route.
	- To access this message we need to get access to our route using "ActivatedRoute" object.
	- Now, we can access it using its object: 

	- this.route.snapshot.data['message'];


# Dynamic data with resolveGuard:
	- "resolver" is also a service like "canActivate" and "canDeactivate" which will allows us to run some code before a route is rendered.
	- Difference is "resolver" will NOT decide whether this route should be rendered or not, whether the component shuld be loaded or not, --->> the resolver will always render the component in the end.
	- But it will do some pre-loading. fetch some data.
	- Use this if you want to load your data before actually dispalying/rendering the route.

	- Add a service file, create new class which implements "Resolve<>" interface and define tha data you will get from this resolver.
	- And Resolve interface forces you to add resolve method.

	- export class ServerResolver implements Resolve<{id: number, name: string, status: string}> {}

	- resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {}

	- Observable and Promise for asynchronous data (HTTP Request) and Server for synchronous data.
	- "ActivatedRouteSnapshot" -->> Unlike component itself, this is executed each time, we do NOT need to set an observable (subscribe()) here.

	- Now, This will load our data in advance.
	- in routing module, go to your route where you want to implement this service and another property (resolve) in that route.
	- "resolve" takes an object which will have a key-value pair. You can define your key name as you like.
	- In this object, we map all the resolver.
	- This is different from other guards, there we used arrays.

	- { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} }
	- Now the "server" will hold the data this ServerResolver returns.
	- We can access this data by:

	- this.route.data.subscribe(
      	(data: Data) => {
        	this.server = data['server'];
      	}
    )


# Location Strategies:	
	- Our routes works fine on our local setup.
	- When we deploy our website on a server, and hit a URL '/servers', in the web it is always parsed and handled by the server first. The serve which host our application. So, it will look this route in the server hosting this app not the abgular app.
	- And on that server, it will NOT that URL and will return 404 error.
	- Our development server has one special configuration which need to be enabled in Deployment server too.
	- That configuration is, when we hit a URL and it returns 404 error as it does NOT find that URL in that server -->> then instead of sowing 404 error you should show the index.html file from our angular app (the file responsible for starting and containing the angular app).

	- Alternative method:
	- In "app-routing.module.ts" file, where we registered our route -->> [RouterModule.forRoot(appRoutes)]
	- add another property as an object 'useHash'  -->> RouterModule.forRoot(appRoutes, {useHash: true})
	- This will configure the set up of our routes.
	- This will add an "hash" (#) between the server name (domain name) and our routes.
	- This "#" will inform server to only care about the part in URL before this "#".
	- And all the part thereafter will be ignored by the web server.
	- And the part after the "#" can now be parsed by client (our Angular app)

	- You should try to enable first approach,  not this one. (This does NOT look nicer)

# NOTE:
	- While using Observables, itis necessary to clean up subscription.
	- But we do NOT need to do that for built-in observables.
	- But, when you use your own observables, observables you created, then you will need to clean up the subscription.


