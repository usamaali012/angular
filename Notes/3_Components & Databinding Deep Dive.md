# Property and Event Binding
	- Using Property and Event Binding we can also pass data between components
	- We can emit our own events from our components. Which can then be used in another component to react accordingly.

# Binding to custom properties:

	- by default, all properties of components are only accessible inside the component only, NOT from outside.

	- If you want to allow, parent component (where child component will be implemented) to be able to bind to a property in child component, you need to add a decorator with that property in child class.

	- decorator are not only available for class/ functions only, it is available for properties/attrubutes too.  

# @Input():
	- '@Input()'   -->> with this in place with the property, we are successfully exposing this property to the outside of components.
	- We need to execute it with (), because this is a function at the end
	- receiving something from outside the component
	- passing/receiving something to inside the component

# alias (Input):
	- Want to expose a different name to the outside of component as you use in inside component, define that different name in paranthese of @Input()
	- @Input('srvElement') 



# Binding to custom events:
	- EventEmitter<>() ---> ALlows us to emit our own custom events. Use with parantheses to call the constructor of the EventEmitter.
	- <> here you describe the type of data you want to emit
	- call the method "emit()" of the object of the EventEmitter to emit data 
	- passing/sending something to outside the component
# @Output()
	- Enables other components to listen to your own custom events which could be created using "EventEmitter"
# alias (Ouput):
	- Want to expose a different name to the outside of component as you use in inside component for the event you create, define that different name in paranthese of @Output()
	- @Output('bpCreated')


# View Encapsulation:
	- CSS does NOT really care in which CSS file you define a rule, it simply is applied to whole document normally.
	- Each component's CSS file should only applied to its own component --->> this behaviour is enforced by angular. Npt the default behaviour by browser.
	- How?
	- Angular applies an automatically created unique attribute to all the elements in each component (different for each component)
	
	- SHADOW DOM ??

	- To override this behavior, and apply Style from one CSS file to whole document, add this attribute in @Component decorator.
	- encapsulation: ViewEncapsulation.None
	- This does NOT add automatically created unique attribute to all the elements in the component where it is applied(Not sure about it)
	- We are disabling view encapsulation


# Local Reference:
	- A local reference is placed on any HTML element, you add it with #, and name of your choice
	- This reference will hold a reference to its element, whole HTML element with all its properties.
	- Local references can be used anywhere in your .html template only, not in .ts file
	- we pass it to .ts file using an argument of the method that is being used in .html file.
	- gives us the whole element with all its properties, and we can access anything related to that element using it.
	- Remember everu element has different properties. Not every element has same properties.

	- Can be used instead of two way databinding. (In some case)


# ViewChild():
	- Lets you access any element of .html in .ts file directlly and return ElementRef type data.
	- Create a local reference (#serverContentInput) in .html file in any element. Now in .ts file:
	
	- @ViewChild('serverContentInput') serverContentInput: ElementRef   --> passed the Local Reference name here to ViewChild
	
	- 'serverContentInput' in quotes is the reference name that we hace defined in the element in .html
	- serverContentInput will have the whole element.
	- To access the properties of this element use:
	- serverContentInput.nativeElement
	- Now this will include all the properties related to that element.
	- In yhis way you will access the data, before calling he method an previously in Local Reference.

	- You can also access the DOM using this ViewChild

	- this.serverContentInput.nativeElement.value = "Something"

	- DO NOT access DOM like this.


# Content of Component:
	- When you place something between opening and closing tags of a component in a parent class, Angular will not render or reads it.
	- Its a default behaviour.
	- To avoid this, you can use a special directive (that looks like a component) used like an element's tag 'ng-content'.
	- Use it  in the child component where you want tp place that content 
	- the content which is in between opening and closing tags of this component in a parent class.
	- This data in parent .html will be projected in child.html template


# Component Lifecycle:
	- Methods that can be called during the lifecycle of a component.. ngOnInit, ngOnChange.
	- ngOnInint (a lifecycle hook) runs after the constructor.
	- Angular supports couple of lifecycle hooks.
	- Angular gives us a chance to hook into these phases and do something using methods it gives for lifecycle.
	
	- ngDoCheck  --> Runs whenerve a change is detected in DOM.
	- Change Detection is simply is a system that determines whether something changed inside the component. (On every event too)

	- ngOnInit is called everytime a new object of component is initiated.
	- write the methods name after the class definition after the keyword 'implements'  (A good practice)
	- ngOnChanges the only hook that receives arguments.
	- ngOnChanges is called before ngOnInit.
	- ngOnDestroy is called when we remove or delete anyrhing from the template/DOM  


# ng-content access where it is projected:
	- Use '@ContentChild' instead of '@ViewChild'

