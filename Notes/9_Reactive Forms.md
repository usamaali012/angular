- Template Driven Form : Angular Infers the Form Object from the DOM
- Reactive Form: Form is created programmatically in TypeScript and synchronized with the DOM

# Reactive Form:	
	- In .ts code create a variable of type "FormGroup" imported from '@angular/forms'
	- '@angular/forms' contains a lot of classes.
	- 'ngForm' actually wraps a 'FormGroup' in the end.
	- Because, in Angular, a form is just a group of controls. That is what 'FormGroup' holds.
	- Now, this gives us a property with which we can work and which will hold our form at the end.
	- To connect, our programmatically created form to our HTML code, you need to import "ReactiveFormsModule" from '@angular/forms' in module.ts file.
	- "FormsModule" is required for the Template Driven Approach only.
	- "ReactiveFormsModule" containsall the tools we need to build our form on our own and then connect it to HTML code.

	signupForm: FormGroup;


# Creating a Form using ts Code:
	- If you want to initialize a form inside a lifecycle hook, make sure to use a lifecycle hook which is called before the template is rendered.
	- e.g., ngOnInit

	this.signupForm = new FormGroup(
			{
				'username': new FormControl(null),
				'email':new FormControl(null),
				'gender': new FormControl('Male')
			}
		)

	- "new FormGroup" will create the new form and in it, an object will be passed which will contain the inputs of our form in the form of key-value pair.
	- To create a new input/control in the form we will use "new FormControl" as our input is of type "FormControl".
	- The "FormControl" can take multiple aguments,
	- 1st argument will be the initial state, initial value of our input. (Default Value)
	- 2nd argument = Single validator or an array of validator.


# Syncing our .ts form to HTML:
	- we somehow need to synchronize our HTML inputs to our .ts form.
	- First, you still have to have all the HTML code like you had before in template-driven approach
	- Now in "forms" element, pass a directive "formGroup" and set it equal to the value of the form you created in .ts file. (Use property binding)
	- Now to synchronize our inputs, in each input element pass a directive "formControlName" and set it equal to the name of the key you have in your .ts form.


# Submitting Form:
	- In the template-driven approach, we used "ngSubmit" directive in the form element to Submit our form.
	- We will do the same here because we still want to react to the default submit event fired by javascript.
	- The difference would be that we will now not access the form using local references like we used before.
	- Because we have created our form in .ts file and we have already access to it in .ts file.

# Validation:
	- Now that we are not configuring our form in the template, we are synchronizing ot with thw directive "formControlName", and "formGroup"
	- So, the validation in .html will NOT work.
	- We need to add validation in .ts file for reactive forms.
	- "FormControl" takes one more than one argument.
	- Validation will be added where we defined "new FormControl" and pass a 2nd argument which can be an array of validators or just a single validator.

	'username': new FormControl(null, Validators.required)
	'email':new FormControl(null, [Validators.required, Validators.email])


# Getting Access to Controls:
	- Now to tell user if the data is invalid, we will use a different approach.
	- There is a method called ".get()" which will let you access the form controls. You need to pass the key of your form-control as an argument to this method.
	- And here you can access if the control is touched/valid or not.
	- get() method allows us to access our controls easily.

	signupForm.get('email').valid 
	signupForm.get('username').touched

	<span class="help-block" ngIf="!signupForm.get('email').valid && signupForm.get('email').touched">Please Enter a Valid Email!</span>

	- CSS classes are still addded in reactive approach and you can modify your controls/inputs as you did before and can apply any CSS style.

	input.ng-invalid.ng-touched {
		border: 1px solid red;
	}


# Grouping Controls:
	- You can specify a path instead of name of the controls in the get() method, because it is possible to have nested controls.
	- How?
	- We can create a new "form" using "FormGroup" inside a "FormGroup". ANd that way it will be a nested form/FormGroup.
	- "FormGroup" is not only there to create overall form, you can still have "FormGroup" inside "FormGroup"

	this.signupForm = new FormGroup(
		{
			'userData': new FormGroup(
				{
					'username': new FormControl(null, Validators.required),
					'email':new FormControl(null, [Validators.required, Validators.email]),
				}
			),
			'gender': new FormControl('male')
		}
	)


	- You also need to set your html code according to the form created.
	- For a nested "FormGroup", create a "div" and inside it add all the controls you have in your nested "FormGroup".
	- And to this "div" pass a directive "formGroupName" and set it equal to the nested "FormGroup" name/key.

	- And in the get() method pass path to your control as they are nested.

	get('userData.username')         ---------- !signupForm.get('userData.username').valid  
	get('userData.email') --------------------- signupForm.get('userData.email').valid


# Arrays of FormControl:
	- "new FormArray" that can hold multiple "FormControl"
	- You can add "FormControls" to this array upon some event. SO you will need to access to form array and add a form control in it. like:

	(<FormArray>this.signupForm.get('hobbies')).push(control);

	- Make a "div" which will hold all the controls of the "FormArray" and pass it a directive "formArrayName" and set it equal to the name/key where you have defined "new FormArray"
	
	<div formArrayName="hobbies">
		<h4>Your Hobbies</h4>
		<button class="btn btn-default" type="button" (click)="onAddHobby()">Add Hobby</button>
		<div class="form-group" *ngFor="let hobbyControl of getControls(); let i = index">
			<input type="text" class="form-control" [formControlName]="i">
		</div>
	</div>

	onAddHobby() {
		const control = new FormControl(null, Validators.required);
		return (<FormArray>this.signupForm.get('hobbies')).push(control);  
	}

	getControls() {
		return (<FormArray>this.signupForm.get('hobbies')).controls;               --- To access each control in "FormArray"
	}


# Custom Validators:
	forbiddenUsernames = ['Chris', 'Anna']

	- Validator : Our username should not be ib "forbiddenUsernames" array

	forbiddenNames(control: FormControl): {[s: string]: boolean}  {
		if (this.forbiddenUsernames.indexOf(control.value) !== -1) {  //if the value is in the array
			return {'nameIsForbidden': true}
	}

		return null
	}

	- A validaotor in the end is just a function which get executed by Angular automatically when it checks the validity of the FormControl and it checks the validity whenever you change that control.

	- Validaor receives an argument which is the control in which it is applied to.
	- Validaor also need to return something -- which should be a javascript object (Its syntax is strange) -------- {[s: string]: boolean}
	- Here we are telling that it will return a key which will be string and its value will be boolean.
	- In the counter case we are not returning {'nameIsForbidden': false}
	- IMPORTANT: If validation is successful, you have to pass nothing or null.
	- We should NOT pass this object '{'nameIsForbidden': false}'
	- This is how it works and this is how we tell Angular that this is valid.

	- Apply this validator:

	this.forbiddenNames.bind(this)

	- "forbiddenNames" now will be called by the Angular. This is not being called by the our class. 
	- When the Angular calls this function, at that time, "this" will not be referring to our class here. So therefore, we need to bind this (javascript method) to make sure "this" referes to what we want it to refer to.


# Using Error Codes:
	- When we created our validator we created an error which was the object '{'nameIsForbidden': true}'
	- In the object representation of the form, we get this error in "errors" object of that particular control/input field.
	- Outputting Differenr messsages on the basis of our error messages:

	<span 
		class="help-block" 
		*ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched" >
		<span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">This Name is Invalid</span>
		<span *ngIf="signupForm.get('userData.username').errors['required']">This Field is Required!</span>	   
	</span>

	- Video 211


# Custom Async Validator:
	- The invalidity of a field is usually checked by a server, meaning our filed is valid/invalid is answered by server response.
	- And that is a asynchronous process.
	- So we need an asynchronous validators which are able to wait for a response before returning true/false.

	forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
		const promise = new Promise<any>((resolve, reject) => {
			setTimeout(() => {
				if (control.value === 'usamaalichi@gmail.com') {
					resolve({'emailIsForbidden': true})
				}
				else
				{ 
					resolve(null)
				}
			}, 1500)
		})
		return promise
	}


	- Applying Async Validator:
	- You do NOT apply asynchronous validator as the 2nd argument of the new control rather it will be a third argument.
	- third argument of "new FormControl" will be a single or an aaray of async validaotor.

	this.forbiddenEmails.bind(this)

	- Inspect the "control/input" where this aynsc validator is applied.
	- You will see the following classes attached to that in;ut:

	class=form-control ng-untouched ng-pristine ng-invalid                ----------- when input is invalid
	class=form-control ng-untouched ng-pristine ng-pending                ----------- while waiting for the respons/in our case waiting for our timeout(1500)
	class-form-control ng-untouched ng-pristine ng-valis                  ----------- when input is valid


# Status/Value Changes:
	- Observables using which we can listen to or access the values or status of the forms. "statusChange()" & "valueChange()"
	- As these are observables, we will have t subscribe() to it.
	- These observables are available for the whole form as well as individual controls.
	- "valueChange" is fired when we change something about the form. same for "statusChange"

	- Two nice Observables/Hooks we can listen/subscribe to if you really want to closely watch what happens in your form or on an individual control and want to react to that.


# Setting and Patching Values:
	- Similar as describes in Template-Driven Forms.
	- As we have the access to the form we can set its values from the code. 
	- On a button click following line will execute and set all the values of the form

		this.signupForm.setValue({
			'userData': {
				'username': 'Max',
				'email': 'max@test.com'
			},
			'gender': 'male',
			'hobbies': []
		});

    - But this method has a downside, as we have to set all the values of the form and secondly, if some values are added before this method, upon execution of this method all the previous values will be overridden by these values.
    - This method is for setting all the values of all the controls with one command. 
    - setValue() command ----> Where you pass an exaact copy of that form value as a .js object and overwrite the value of each control 
    
    - So the better approach would be to use "patchValue()" method
    - Here, you can set values of you own choices programmatically and it will NOT affect any other values and does NOT require all the values set as "setValue()" method.

	this.signupForm.patchValue({
		'userData': {
			'username': 'Anas',
		},
	});		

    - the patch method is not available on the signupForm object, it is available on the 'form' object of 'signupForm'
    - Here you pass js object too, where you only pass specific controls.

    - setValue()  ------- To set your whole form.
    - patchValue() ------ To overwrite part of the form

    - RESET FORM:

    this.signupForm.reset()

	- This will reset the form, meaning Not only empty all the inputs (which we can do this with setValye() too.) but also it will reset the state of the form (like the valid, touched state)

	- We can also pass the "setValue()" method to "reset()" method, to set our form to certain values.
	- We can also pass an object to reset() to reset specific values.







