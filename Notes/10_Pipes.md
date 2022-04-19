# Pipes:
	- A feature which basically allows you to transfrom output in your template. 
	- Different types of pipes for different outputs.
	- Transforming Values
	- Example: Change the output lettercase only when outputting it and not for whole.
	{{ username | uppercase }}


# Using Pipes:
	- Pipes are only responsible for transforming the outputs.
	- So the right place to use pipes are templates (.html) file.
	- There are built-in pipes and you can make your own too
	- To apply a pipe use "|" between output and pipe.
	
	{{ server.instanceType | uppercase }}

	- So, without changing the property itself, (in property the status is still lowercase) we changed the way users can view it simply by adding a pipe.
	- built-in pipes in this lecture are : "uppercase" & "date"

# Parametrizing Pipes (Configuring Pipe)
	- The layout in which our date is displayed, might not be the layout we require. (THE FORMAT OF THE DATE)
	- To parameterize the pipe, you first pass a colon and then define the parameter.
	- "date" pipe expects to receive a string parameter.  'fullDate' -- camelCase
	- Here we have multiple options.
	- You can pass parameters to the pipe by simply adding a colon and then the parameter.
	- If you would have multiple parameters, you simply separate them with additional colons and then the additional parameters.
	- "date" pipe doesn't take an additional parameters.


# Learn about Pipes:
	- https://angular.io/api?query=pipe
	- This is a great place to learn about pipes and have a better understanding of them

# Chaining Multiple Pipes:
	- We can combine pipes in Angular.
	- To make a date formatted according to our choice and also make it uppercase.
	- The order here is important, First change the format of date and then make it uppercase.
	- Pipe will be applied to the result of previous output, which comes before it "|"
	- It is important to watch the order.
	- You shoud apply the pipes in order you want to transform your output.

	{{ server.started | date: 'fullDate' | uppercase }}

# Custom Pipe:
	- Sometimes you need functionality which is NOT built-in, in that case you need to create your own pipe.
	- Create a file and give it a descriptive name, according to your pipe you are creating.
	- Create a class which implements "PipeTransform" class.
	- And in this class, apply a method "transform". If you don't, you will receive an error.
	- We want to short the text when we output it and not show the whole text.
	- "transform" always returns something out.
	- Also add a directive above the class.

	@Pipe({ name: 'shorten' })

	- 'shorten' name will be used to use this pipe.
	- Add this pipe to the "declarations" array in the "app.module.ts" file.

	@Pipe({ name: 'shorten'})
	export class ShortenPipe implements PipeTransform {
    	transform(value: any) {
        	if (value.length > 20) {
            	return value.substr(0, 10) + '...';
        	} 
        	return value;   
    	}
	}

	- Add "@Pipe" decorator, make sure to implement "PipeTransform" interface and isnide class apply "transform" method.
	- And then add this in the "declarations" array in the "app.module.ts" file.
	- Usage:

	{{ server.name | shorten }}

# Parameterizing Custom Pipe:
	- let the user define the character limit to shorten the text.

	transform(value: any,  limit: number) {
        if (value.length > limit) {
            return value.substr(0, limit) + '...  ';
        } 
        return value;   
    }

    - Usage:
    
    {{ server.name | shorten: 15 }}

    - You can pass multiple arguments to have mutliple parameters.
    - Here if you do NOT pass a parameter, the pipe will not be applied.
    - You will need to handle that while defining your pipe.


# Creating a Filter Pipe:
	- Creating a pipe using cli.

	ng generate pipe [pipe_name/file_name]
	ng g p [pipe_name/file_name]

	- In this case, we will apply the pipe to "ngFor" loop.
	- Pipes transform our output and "ngFor" is also part of our output.
	- Create the logic for your pipe.

	transform(value: any, filterSting: string, propName: string): any {
		if (value.length === 0 || filterSting === '') {
			return value;
		}
		// value will be an array of objects
		const resultArray = []
		for (const item of value) {
			if (item[propName] === filterSting) {   //
				resultArray.push(item);
			}
		}
		return resultArray;  
	}

	- Usage:

	- *ngFor="let server of servers | filter : filteredStatus: 'status'"

	- Now only the server with status = filteredStatus will be displayed.


# Pure and Impure Pipe:
	- We have filtered our output using our built-in pipe "filter", if we are in filtered mode and add a new server/object it will not be added to the our dispaly while in filtered mode.
	- This is because, pipe does NOT recaluculate its arrays once its been applied. (The array is the value that the pipe is getting)
	- This is the default Angular bahaviour. 
	- And if our array gets updated meaning the filter is reapplied everytime the array is updated, "it costs a lot of resources".
	- We can force this behaviour by adding another key-value pair inside @Pipe() decorator while defining the pipe.

	@Pipe({
		name: 'filter',
		pure: false
	})

	- Beware of the efficiency it will cost. High Performance Cost.
	- Setting "pure: false" reapply the pipe everytime any change happens on the page.
	- This wll be an impure pipe forcing update on every data change.

# Async Pipe:
	- It helps us with handling asynchronous data.
	- The data which returned after some time from the server or HTTP request takes some time to load and this is where this filter can be useful.
	- For example we will use Promise which will take 2 seconds to resolve. and will set "appStatus" to stable after 2 seconds.

	appStatus = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('stable');
		}, 2000);  
	});

	- Now if we output "appStatus", it will show us [object Promise] on the display. which is correct.
	- But after 2 seconds this is no longer an object it becomes string.
	- But Angular does NOT know it because Angular does NOT watch our object and does NOT see if its value changes.
	- But using async pipe, it will not show [object Promise] anymore, it will wait for its value to resolve to something and then it will dispaly its value.
	- "async" pipe will also work with observables./

	App Status: {{ appStatus | async  }}