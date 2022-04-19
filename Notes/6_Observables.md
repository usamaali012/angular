# Observables:
	- An observable basically can be thought of as a data source.
	- In our Angular Project, an observable is basically just an object imported from third-party package "RxJs".
	- Observable, in Angular, is implemented in a way that it follows the observable pattern.
	- We have an "observable" and an "observer". In between these two we have a timeline.
	- On that timeline we can have multiple events or data packages emitted by observable. (depending on the data source of that observable)
	
	- Observable could emit data:
	- because you trigger it to do so.
	- could be connected to a button, whenever that button is clicked, an event is emitted.
	- Or it is connected to a HTTP request, so when the response returns, the response is emitted as a data package.
	
	- Other part is "observer" --->> This actually is our code, like the "subscribe()" function we saw earlier.

	- You have 3 ways of handling data packages. "Handle Data", "Handle Error", "Handle Completion"  (3 types of data packages we can receive)
	- Now in these hooks, events we receive our code is executed.
	- Now you will determine what should happen if you receive a data package, or what should happen if you receive an error what should happen when observable eventually completes.
	- An Observable does NOT have to complete. (Its Optional)
	- You use an observable to handle asynchronous task. when you do NOT know how long will they take.
	- You do NOT want to wait for these events, do NOT want to wait for completion of HTTP request (because that would block your prorgram), so to handle such asynchronous tasks we use observables.



	
# Observables:
	- Observable are constrcuts to which you subscribe to be informed about changes in data, because observable are stream of data, and whenever new data oiece is emitted our subscription will know about it.
	
	- "params" is an observable in "ActivateRoute" which has the subscribe method.
	- Its a stream of route parameters and that stream gives us a new route parameter whenever we go to a new page/a parameter in URL changes.
	- We get that new parameters and do our desired task with it.


# Building our own observable:
	- Observable are a feature that is not baked into .js or .ts. Instead the are added by a package name "RxJs". You can see it in "package.json" file.
	- TypeScript knows "params" is an observable, therefore we do NOT need to import anything.
	- But if you want to create a new observable, we need to import certain features from 'rxjs' package.
	- 'RxJs' gives us different ways of creating new observables.
	- Easiest way is "interval" method.

	- import { interval } from 'rxjs';
	- call "interval" and pass in a number (a bit like setInterval) where you pass x number in miliseconds that will fire an event every x miliseconds.
	- This interval gives us an observable and therefore we can subscribe to it.
	- The interval will return a number after x miliseconds that we give to it. We can catch that number inside "subscribe()" function.
	- pass a functio inside "subscribe()" and pass that number as an argument tp that function.
	- This is not building an observable from scratch. We are taking a built-in function that gives us an observable. Here we do NOT fuly control the emitted values.	
	- Here, we are getting an incremental number every x miliseconds.

	- interval(1000).subscribe((count) => {
      	  console.log(count); 
      }) 

    - Here we are logging that incremental number to the console. (When we are on that component where this observable is created)
    - But when we navigate away from this component, this observable keep emitting values.
    - Observables do NOT necessarily stop emitting values just because you are NOT interesting in them anymore.
    - There are observables that will emit a value once and they are done, like an HTTP request where you get back a response.
    - But there are other observables that keep on emitting values.
    - To stop them and to stop memory leaks, you should unsubscribe to any observablein which value you are NOT interested in anymore.
    - As when you move away from the component where observable is emitting values, and it is keep emitting values even though you are away from it, when you get back to that same component again, it will start another observable and the old one will keep on going too.
    - If that keeps on happening, it will cost a lot more memory and you can quickly run out of resources. And you slow down your app (VERY BAD)
    - And also you introduce a memory leak because your memory gets occupied a lot more by data you do NOT even need.
    - To avoid that, store your subscriptions in a variable of type "Subscription" imported from "rxjs"
    
    - private firstObsSubscription: Subscription;

    - and when you "subscribe()" store that subscription in that variable

    -   ngOnInit() {
    		this.firstObsSubscription = interval(1000).subscribe((count) => {
      			console.log(count); 
    		})
    	}

    - Now you need to clean that subscription whenever you go away from your component. To do that implement onDestroy in your component.

    - 	ngOnDestroy() {
    		this.firstObsSubscription.unsubscribe();
    	}

    - That is how you clear your subscription and prevent memory leakd from happening.

    - For the Observables provided by Angular (like params), Unsubscription is done by Angular itself.
    - All these Angular observables are managed by Angular and therefore you do NOT need to "unsubscribe()" them manually as we need to do it for custom observables.


# Custom Observable:
	- To create a new observable import "Observable" from "RxJs"
	- Observable.create() will create a new observable. create takes a function as an argument. this function will get an argument automatically, RxJs will pass that argument for us.
	- That's argument is called "observer"
	- The "observer" in the end is a part that is interested in being informed about new data, about observables, or abouut observables being completed.
	- Our job is to tell the observer about new data, about observables, or abouut observables being completed.
	
	- Now observer has methods like "next()". We can call "next()" here to emit a value.
	- "error()" is another method that this obsever has. Used to throw an error.
	- "complete()" another function to let the observer know that you are done.

	- Create Observable:

	- 	const customIntervalObservable = Observable.create((observer) => {
      		let count = 0;
      		setInterval(() => {
        		observer.next(count);
        		count++;
      		} , 1000);
    	})

    - Subscribe To it:

    - 	this.customObsSubscription = customIntervalObservable.subscribe((data) => {
      		console.log(data);
    	})

    - Do NOT forget to unsubscribe in ngOnDestroy()

    - 	ngOnDestroy() {
    		this.customObsSubscription.unsubscribe();
    	}


# Errors & Completion:
	- ERROR:
	
	- const customIntervalObservable = Observable.create((observer) => {
      	let count = 0;
      	setInterval(() => {
        	observer.next(count);
        	if (count > 3) {
          		observer.error(new Error('Count is greater than 3!'));   
        	}
        	count++;
      	} , 1000);
    })

    - IF count foes greater than 3, the obervable will throw an error wiyh our error meassage.
    - And the observable will now stop emitting values.
    - Whenever an observable throws an error , it will NOT emit any other values. It is DONE.
    - In that case you do NOT even need to unsubscribe if it will throw an error.

    - ERROR HANDLING:
    - Now in subscribe, we will also get a 2nd argument (First argument that we pass to a function inside subscribe() is data emotted by observable)
    - The 2nd argument will be the error thrown by observable.
    - Here you can do your Error Handling easily.
    - 	this.customObsSubscription = customIntervalObservable.subscribe(
	    	(data) => {
	      		console.log(data);
	    	}, 
	    	(error) => {
	      		alert(error.message);
	    	})

	- Observable Completion:
	- Throwing an error actually cancels the observable and lets it die. But completing is something different.
	- Completing can be a normal process in an observable.
	- Our interval, by default, will NOT complete. But a HTTP request WILL complete, it completes wherever a response by server is there.
	- When you call "complete()", It will stop.
	- Whenever an observable is complete, it completely is done. No values will be emitted thereafter.

	const customIntervalObservable = Observable.create((observer) => {
		let count = 0;
		setInterval(() => {
			observer.next(count);
			if (count === 2) {
				observer.complete();
			}		
			if (count > 3) {
				observer.error(new Error('Count is greater than 3!'));   
			}
			count++;
		} , 1000);
	})

	- You can add a 3rd argument to your "subscribe()" method to handle this completion. And pass Completion Hnadler functions.
	- THis function will not any get any arguments, as "complete()" does NOT emot any values.
	- No need to unsubscribe(), if your observable gets complete.
	
	this.customObsSubscription = customIntervalObservable.subscribe(
		(data) => {
			console.log(data);
		}, 
		(error) => {
			alert(error.message);
		},
		() => {
			console.log('Observable is completed!');
		}
	);

	- IMPORTANT:
	- Observable getting cancelled due to an error and Observable getting completed are both different things.
	- An error cancles the observable. It does NOT complete it.
	- And if an error condition reaches before completion condition, error handling will be done and in that case observable will never complete.


# Observable Operators:
	- Operators are the magic feature of the RxJs library, and they are the things that turn an observable into a construct.
	- An  observer get data from observable through "subscribe()" method.
	- Sometimes, we do NOT need the raw data, you might want to transform it or filter out certain data points (You can do that in function in subscription)
	- But there is more elegant way.
	- You can set up an operator in between observer and observable. Meaning the data will first go through an operator, do something to the data (tons of built-in operators	) and then you send it to observer (subscribe() to the data sent by operator)
	- It would be nice to deal with your data rather than doing it in subscribe() if you have more complex operations to perfrom.
	- You can use your operator on an observable by a calling a method "pipe()" on that observable. Every Observable has a pipe method
	- You can import mutiple operators from "Rxjs"     ------>>> import { map } from 'rxjs/operators';   "map()" an operator.
	- We simply call "map()" inside of "pipe()" method. And map() takes a function as an argument. And that function also takes an argument and that will be the data emitted by our obervable.
	- And in map(), we have to return new/modified data that will later be used in subscribe().
	- Now you will subscribe to the data given by that operator, Not to the data given by the observable directly. i.e., you will NOT use the observable directly, first you apply operator to it then subscribe to it.
	- This all is only useful if you are dealing with complex data and you want to transform that data before using it in a component.
	- In pipe() method, we can add more than one operator as a different argument to pipe().
	- pipe() takes unlimited amount of arguments. Each argument will be an operator (e.g, map()) imported from rxjs/operators.
	
	this.customObsSubscription = customIntervalObservable.pipe(
		filter(
			(data: number) => {
				return data > 0;
			}
		),
		map(
			(data: number) => {
			return 'Round: ' + (data + 1);
			}
		)
	).subscribe(
		(data) => {
			console.log(data);
		}, 
		(error) => {
			alert(error.message);
		},
		() => {
			console.log('Observable is completed!');
		}
	);



# Subjects:
	- Subject is something we import from "RxJs". Can be used instead of EventEmitter.
	- Subject is special kind of obervable.
	- We can subscribe to an observable, but they are rather passive. You have to wrap your callback inside observable.
	- Subject is different (You can subscribe() to it though), but it this rather active.
	- Because we can actively call "next()" on it from outside of it.
	- Before we could only call "next()" from inside the observable (while creating it).
	- Therefore, this can be used as an eventEmitter. For things that needs to be actively triggered by us in the application.
	- Using Subject() instead of EventEmitter is recommended. Because they are more efficient.
	- And using Subject(), you can use all types of operators on it, because Subject() in the end is an observable.

	- IMPORTANT:
	- Just as with your own Observables, you should "unsubscribe()" to your "Subject()" whenever you do NOT need them.
	- Subject() as a replacement to EventEmitter():
	- You can you replace them if you are only using them as cross-component EventEmitter. 
	- You do NOT use "Subject" intead of "EventEmitter" when you are using "@Output()"
	- For the eventsemitted by "@Output()", you still need to use "EventEmitter"
	- You only use "Subject" to communicate across components, through "Services", where you need to "subscribe()" at the end.