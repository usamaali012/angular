# Connecting Angular to Database:
	- You do NOT connect angular to a database directly.
	- Means you do NOT enter your database credentials into your Angular app. This would be highly insecure as everyone can read your angular code. 
	- Since its a Front-End JavaScript application, everyone can read/inspect it.
	- So you definitely do NOT want to store database credentials.

	- So, to connect to a database, you send HTTP Requests and receive HTTP responses to and from a server.
	- A server in the end is defined as an API, and when you hit the URL/endpoint of API you get data mostly in JSON format.
	- API in the end is almost like a normal website but when you visit its URLs, you do NOT get back HTML, you get data in JSOM format
	- You do NOT use ANgular for creating such APIs, you use server side languages. (NodeJS, PHP etc.)
	- And then on that server you can have code which interact with database to store and fetch data.

# Anatomy of HTTP Request:
	- The most important part about a request is the URL (API endpoint) you are sending the request to --------------   yourdomain.com/posts/1
	- When communicating with a restFul API, its not just about the URL but also Http verb you're using. ------------ GET, POST, FETCH, DELETE, UPDATE etc.
	- This defines which kind of request you want to send to that endpoint.
	- Store new data --- POST
	- Fetch data ------- GET
	- Replace existing data  ------ PATCH, PUT, UPDATE
	- It also depends on the API you are workig with, which endpoints and which verbs for this endpoints are available.
	- You also send some additional metadata, (Headers of a request) (Optional)
	- For some Http verbs, you can also add a body to your request (Request bosy). That is the core data that is attached to a request. ---- POST, PATCH, PUT

# Firebase setup.
	- Firebase console -> Get Started -> Add project 
	- (After Creating Project) -> Realtime database -> Create Database (in Test Mode)
 
	- Firebase is just not a database. it is a complete backend solution.

# HTTP POST request:
	- In app.module.ts add "HttpClientModule" in the imports.

	import { HttpClientModule } from '@angular/common/http';

	- This woll unlock the HTTP client which Angular offers in your whole project
	- And now we can send http requests to a server.

	- Inject HTTP client in the component constructor   ------   constructor(private http: HttpClient) ----- import { HttpClient } from '@angular/common/http'

	- Now we want to send POST request tot firebase. the 'http' we injected will hold all the http methods/verbs. so for post --- this.http.post()
	
	- As an argument to post, initially we can pass 2 parameters (required), 
	- 'endpoint of the API, the URL you want to send your request to'    --- You can find that URL in the firebase Database that you created.
	- And the request body.

	- The URL from Firebase is not the entire URL
	- For a custom API, you would have clearly defined endpoints (/posts, /users) to which we have to send our request to.
	- For Firebase, its different, you have a starting point URL which you can copy from firebase.
	- And then you can add your own segments after that URL, and that segment will get replicated as foldres in the database.

	- It looks like we are directly communicating with database. But thats not true.
	- We are still communicating with a REST API provided by Fireabse, and Firebase translates your path (URL) you are sending it to, to folder structure in your database.

	- You never communicate directly with a database from inside your angular app.

	- Now lets say we want to have folder named "posts" in our database --- so we will add "/posts.json" at the end of our URL
	- adding ".json" is just a firebase requirement.
	- https://angular-practice-project-55ce2-default-rtdb.firebaseio.com/posts.json'

	- This will send a post request to firebase.

	- We normally send JSON data when communicating with RESTFul API. This will happen here as well
	- Angular 'Httpclient' will take our JavaScript object and converts it to JSON to send to the API.

	this.http.post('https://angular-practice-project-55ce2-default-rtdb.firebaseio.com/posts.json', postData)
	- Above post request will NOT work although it has all the things you need to send a POST request.
	- Angular heavily use observables and HTTP request are also managed by observables because they are a perfect scenario or a use case for observables.
	- We can subscribe to them to get informed about the reaponse and to handle errors and so on.
	- And so if we are NOT subscribing to the HTTP request we are sending (to the observable that wraps our HTTP request) then Angular will think that no one is interested in the response of this HTTP request and therefore will not send any HTTP request.

	- So the "post" method here will return an observable and we need to subscribe to it.
	- It does NOT return response or anything else but returns an observable.
	- So to get HTTP response we will need to subscribe to it. And it will return us the whole HTTP response.

	- Now in 'network' tab of developer tools, we see 2 "post" requests to our endpoint.
	- For "post" reuqest, the browser always send 2 requests ,
	- First is of type "OPTIONS" to check if the post request to the said URL is allowed or not.
	- And if allowed, it will send the 2nd request "POST" to that said URL.

# HTTP GET Request:
	- It is same as "post" request but now we do NOT need to send any request body along with the URL in the "get" request.
	- Because "get" request has no request body.
	- In the folder that we created in firebase, the Firebase stores our data inside a cryptic key. (A built-in feature of Firebase.)

	- But we still need to subscribe to our request here too. No Subscription, No Requests.
	- And this subscription will get us our HTTP response which will hold the data that we want from our request.

	this.http.get('https://angular-practice-project-55ce2-default-rtdb.firebaseio.com/posts.json').subscribe(
		posts => {
			console.log(posts); 
			}
		)

# Transforming Response Data:
	- We can transform data inside the subscribe method.
	- Bit it is  a good practice to use observable operators because it simply allows us to write cleaner code.
	- So before "subscribe" method call "pipe()" method to trnasform data first.
	- pipe() is a method which allows you to funnel your data through multiple operators before they reach subscribe method.
	- Here we need 'map()' operator.
	- The map() operator allows us get some data and return new data which is also an observable so that we can still subscribe to it.

	this.http.get('https://angular-practice-project-55ce2-default-rtdb.firebaseio.com/posts.json')
		.pipe(
			map(responseData => {
				const postsArray = [];
				for (const key in responseData) {
					if (responseData.hasOwnProperty(key)) {
						postsArray.push({ ...responseData[key], id: key });
					}	
				}
				return postsArray;
			})
		)
		.subscribe(
			posts => {
				console.log(posts); 
			}
		)


# Types with HTTP CLient:
	- Right now thw data we receive from a "get" request is of type "any" in typeScript code.
	- Because the data we pushed to the "postsArray" is unknown to the code. Because it does NOT know the format of our response data.
	- To tell which type of data we will get can be done in two ways.

	1 - Assign the type to the data we are getting using : sign.
	- If you do NOT know what key you will be receiving inside an object you can use a placeholder [].
	- Also create an interface for the data you will be receiving. It is convenient.

	responseData : {[key: string]: Post}   ------------------ [key: string] -- Placeholder for key -- we do not know the name for this key.
	const postsArray: Post[]

	map((responseData : {[key: string]: Post}) => {
				const postsArray: Post[] = [];


	2 - You use <> notation with the Http method. And inside <> you define the type you will get from the said request. You store the type inside <> which this method will return as a response body. 
	- An elegant way for assigning the type with Httpclient.
	
	get<{[key: string]: Post}>
	post<{ name: string }>


# Loading Indicator:
	- 