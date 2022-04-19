# Services:
	- A Service is just another piece in your angular app, another class you can add which acts as a central repository, somewhere where you can centeralize your code. and store some data.
	- Using Services, you can avoid code duplication.

	- A service is just a normal TypeScript Class, No decorator needed.
	- Whatever task is repetetive, create a class for it and then use it like service.
	- You do NOT create instance of this wherever you need it and you use it.
	- Instead Angular provides an even easier method for using services.

# Using Services:  (Angular Dependency Injector)
	- A dependency is something on which a class of ours will depend on.
	- Our classes will depend on services they use.
	- "Dependency Injector" simply injects this dependency, injects an instance of our Service class into our component automatically.
	- All we need to do is we need to inform Angular that we require such an instance.
	- How to do ??

	- Add a Constructor to your class where you will use this service, and as an argument to your constructor give a private (optional) variable and give its Data Type by the name of your service class after importing service class in your component file.

	- How does Angular know to create an instance of this by just giving it as an argument in a constructor?
	- Same as Angular Creates instance of all your components and Directives class without you actually instantiating them.
	- We are telling Angular that we need this argument, Angular will recognize this, and will try to give us that argument. And we have told Angular that we need argument of that particular class.

	- One last step to, we need to provide a service to our class where we need it. 
	- Provide simply means we tell Angular how to create it.
	- How to add provider?
	- In the "@Component" argument where you specify "selector", also give "providers" key and as a value give an array of services you are going to need.


# Data Service:
	- Typical use case for service is to store and manage data.

	- Angular Dependency Injector is actually a Hierarchical Injector.
	- Means if we provide a Service in some place of or app, on one component, the Angular framework knows how to create an instance of that service for this component, AND MOST IMPORTANTLY for all its child component too.
	- All the child components will receive the same instance of the service

	- So, if we provide a sevice, in the app module (AppModule,  app.module.ts), (in the providers array), then the instance of that same service class will be available in our whole app. In all components, Directives, Services.

	- If we provide it in AppComponent it will be availble for all the components but not for all services and directives, as all services and directive might not be in children component, they can be one level above it

	-  We can inject Services into Services.

# Instance of Service:
	- If in providers array of all components, we provide the same service --->> It will create the new instance of the service for each component separately.
	- But if we create one instance in the parent component by providing it in providers array, now we can use this same instanse in all its child component (now in providers array of chid component we will NOT write service name, just in the constructor), if we want to use the same instance, otherwise you can create new instance for each component if required.

	- Providing service class name in the providers array of any component, tells angular to create a new instance of that service for that component.


# @Injectable()
	- Injecting Service into Service
	- Highest possible level is not the AppComponent but the AppModule.
	- If you want to inject a service into a service, you need to add "@Injectable()" decorator at top of every service class.

	- EventEmitter Wraps an observable. 
	- "subscribe()" is an observable method. (Will learn later)

	- subscribe()   ?????

	- Spread Operator(...) ==>> Lets you turn an array of elements into list of elements.