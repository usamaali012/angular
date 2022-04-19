# FORMS:
	- Forms on HTML page.
	- Form is something that you can simply submit to the server.
	- But first we need to handle the form using Anguular, And if then we want to submit to the server, then we will do it using Angular's HTTP service.
	
	- Angular does the following:
	- Get/Retrieve values that the user enter in our form, 
	- Check if form is valid, Check if the user entered valid information.
	- conditionally change the way form is displayed.
	- You will need a JavaScript Object representation of your form where you will have key-value pairs.
	- Key = Name of Input
	- Value = The value that the user entered.
	- This object might have some metadata about the validity of form (True/False)
	- Angular Offer 2 approches for handling forms.
# 1 - Template Driven Forms:
	- Here you simply setup you form in your template, in your HTML code,
	-  and Angular will automatically infer:
	- the structure of our form, 
	- which control our form has, 
	- which inputs our form has
	- This will make it easy to get stated quickly.
# 2 - Reactive Forms:
	- More Complex approach
	- You define the structure of the form programmatically in your TypeScripe code.
	- We also setup the HTML code, and then we manually connect them
	- Gives us greater control over our form


# Template Driven Forms:
	- Write html for forms and add NO actions to it.
	- Make sure to import "FormsModule" in "app.module.ts"
	- "FormsModule" is necessary for Template-driven forms.
	- Now with "FormsModule" imported and html code written, now Angular will create a form for you.
	- It creates a JavaScript object representation of the form, when it detects the "form" element in the code.
	- We can think of "form" element as kind of some Angular Directive, which then creates such a JavaScript representation of the form for you.
	- But Angular still does NOT know which elements (from inside the forms elemnt) you want to get your input from. Which key-value pair should be added to that javascript object.
	- It does NOT do it automatically as sometimes we do NOT need all the data from our form. All the inputs from our form.
	- So to get data from our forms and add it in JavaScript object representation, we have to add twoo attributes in that input element.
	i)  ngModel           ---->>> To grab the value from input
	ii) name="something"   ---->>> This will become the key of that value in js object representation.

	- The values we need from our form are called "controls" of that from.


# Submitting and Usingthr Forms:
	- We will trigger a method "onSubmit()" when user clicks on "Submit" button.
	- But the "Submit" button also has some other functionality assosiated wit it.
	- Button is of type "submit" so if we click it, the default behaviour of HTML will be triggered.
	- If we have a button inside a "form" element, this button will submit the form, and send request normally and other than that, it will also trigger JavaScript event, the "Submit" event.
	- Angular takes advantage of that js event. And give us a directive (ngSubmit) we can place on "form" element. 
	- "ngSubmit" gives us one event we can listen to.
	- And this event will be fired whenever the form is submitted.
	- And So, instead of calling "onSubmit()" on the button, we will call it at this event trigger.
	- We will use "ngSubmit" as we use (click) listener.
	- Now to get access to the JavaScript representation of the form that is submitted by user:
	- Create a localreference on the form "#f"
	- Set your localreference equal to "ngForm"
	- By doing this, we will expose all the data that a form gets. And it will tell Angular to give us access to this form. 
	- Pass that localreference in your onSubmit(f) function as an argument. In forms element where you call it.
	- Now get that local reference where you define this function. This incoming input will be of type "NgForm", So define your function like this.
	
	- onSubmit(form: NgForm) {}
	- Now this "form" will contain that whole form for us in js object form. That object will have a key "value" which will contain all our key-value pairs of our inputs.


# State of Form:
	- The javascript object representation contains a lot of information about the form which explains the state of form.
	- The object allows us to really understand the state of our form.
	- "controls" -- Here we can see what control we registered on our control. (The input values where we applied an attribute "ngModel"). Each control is of type FormControl
	- "dirty"   ---->> will be true/false depending on whether you entered something in the form or not.
	- "toucehed"---->> will be true/false depending on whether you touched/clicked something in the form or not.
	- "disabled"---->> will be true/false depending on form is disabled or not.
	- "invalid" ---->> will be true/false depending on our data is valid or not. 
	- "valid"   ---->> will be true/false depending on our data is valid or not. 
	- And Many Many more.


# Accessing the form with "@ViewChild()"  - Another Approach
	- Create a localreference on the form "#f"
	- Set your localreference equal to "ngForm"          ---- Just like before.
	- But now instead of passing this localrefernce directly as an argument to "onSubmit" method -- we will access it using "@#ViewChild" in the .ts file.

	- @ViewChild('f') signupForm: NgForm;                  ----> As an argument to ViewChild we pass the name of localreference

	- Here 'signupForm' will hold our whole form's js object representation.
	- This gives us access to very same form without passing it to "onSubmit()" method.
	- This is expecially useful for the case if we need to access the form not just the time we you are submitting but also earlier. Might help us in validating the inputs user is passing.


# Adding Validation to check User Input:
	- As we are woorking with template driven forms, we have to add the validation in the html file.
	- So in the input elements, we need to add these validators.
	- "required"   --->> Add this validator to input field to make this input required. HTML built-in validaotr.
	- "email"      --->> Angular validator (Actually a directive) to make sure the entered value is a valid email. 
	- Now if you put invalid data in your form, js object representation will show "invalid" as true and "valid" as false.
	- Also if you inspect the html code in Elements tab, you will see ANgular adds/removes (on the basis of the state of our form) different classes (ng-dirty, ng-touched, ng-valid) in the element where validation is applied (required and email attributes)



# Using the Form State:
	- Angular tracks the each control of the form. Whether its valid/invalid. COnditinally also adds CSS classes.
	- We can use those states and CSS classes to modify our forms.
	- Disable the button if data is invalid. The button should be disables if the enetered data in fornmis invalid.

	<button class="btn btn-primary" type="submit" [disabled]="!f.valid">Submit</button>

	- Now the CSS classes also get added, so we can use that too. Input which has ng-invalid and ng-touched class should have red border.

	input.ng-invalid.ng-touched {
		border: 1px solid red;
	}


# Accessing Values entered in form:
	- Add a localreference in the input element whose value you want access and set this equal to "ngModel"
	- Just like the "form" directive which is added by angular itself when it detects a "form" element -->> "ngModel" also exposes additional information about the controls it create for us.
	- Now, if we access this localrefernce, we will have all the information (javascript object representation data) just like we had for our overall "form" 

	<input type="email" id="email" class="form-control" ngModel name="email" required email #email="ngModel">
    <span class="help-block" *ngIf="!email.valid && email.touched">Please enter a valid email!</span>



# Setting Default Values:
	- Uptil now "ngModel" directive is added in elements to retrieve the values from the form. We used it without event/data binding.
	- But we can also use it to set default values using property-binding approach. (One-way Binding)
	- REMEMBER: THIS IS NOT TWO WAY BINDING

	- <select id="secret" class="form-control" [ngModel]="defaultQuestion" name="secret">


# Two-way binding in forms:
	- Right-now we only get values from our form after the submit button is entered.
	- But sometimes, we need to access these values to instatntly react to any changes. TO check something/ or simply repeat what user entered.
	- Right now, we only get access to the values only when we submit the form and get object representation of our form. (As we are not using two-way binding)
	- We have 'ngModel' without any binding and one-way binding (in last lecture)
	- And for the above reasons, we can simply use two-way binding. ------[(ngModel)]="answer"--------- To get instant access to what the user entered.
	- You will still get this value in object representation of your form and that value will be the one you had when you press "Submit" button.
	- So, two way binding is still possible.
# Three forms of ngModel:
	- No Biniding (ngModel) --------------------------------- To just tell angular that this input is a control.
	- One-way Binding ([ngModel]="defaultQuestion") --------- To give the control(input) a default value
	- Two-way Binding ([(ngModel)]="answer") ---------------- To instantly get access to the user entered value (Before the form is even submitted.)


# Grouping Form Control:
	- To have one or more input field values as a group in our object representation, first we will contain those inputs inside one element/div.
	- Then on that div we will add a directive 'ngModelGroup' an set it equal to a name which will later hold these inputs values in the object.
	- This will be the key-name which will hold input values.
	- before we get access to a single element (email) by placing a localreference and setting it equal to 'ngModel'
	- Now if you want to get access to the whole group-elements values, set a localreference equal to 'ngModelGroup' in a div which holds all the inputs whose values you want to access.


# Radio Buttons:
	genders = ['Male', 'Female']                      ------> .ts      (following is .html)

	 <div class="radio" *ngFor="let gender of genders">
          <label>
            <input type="radio" name="gender" ngModel [value]="gender" required> {{ gender }}
          </label>
    </div>

    - This will give us radio buttons and to access its values we have applied 'ngModel' directive on it.


# Setting and Patching Form Values:
	- We have access to our whole form in 'signupForm' object which we got using '@ViewChild()'.
	- Now if we have the access to the form we can set its values from the code. 
	- On a button click following line will execute and set all the values of the form

	this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: '',
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'Male'
    })

    - But this methid has a downside, as we have to set all the values of the form and secondly, if some values are added before this method, upon execution of this method all the previous values will be overridden by these values.
    - This method is for setting all the values of all the controls with one command. 
    - setValue() command ----> Where you pass an exaact copy of that form value as a .js object and ovverwrite the value of each control 
    
    - So the better approach would be to use "patchValue()" method
    - Here, you can set values of you own choices programmatically and it will NOT affect any other values and does NOT require all the values set as "setValue()" method.

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })

    - the patch method is not available on the signupForm object, it is available on the 'form' object of 'signupForm'
    - Here you pass js object too, where you only pass specific controls.

    - setValue()  ------- To set your whole form.
    - patchValue() ------ To overwrite part of the form


# Using Form Data:
	- Watch Video


# Reset Form:
	this.signupForm.reset()

	- This will reset the form, meaning Not only empty all the inputs (which we can do this with setValye() too.) but also it will reset the state of the form (like the valid, touched state)

	- We can also pass the "setValue()" method to "reset()" method, to set our form to certain values.










# pattern validator
	- Takes regex
	- pattern="^[1-9]+[0-9]*$"
	- Validators.pattern(/^[1-9]+[0-9]*$/)    --- In brackets between //. Write your expression.

