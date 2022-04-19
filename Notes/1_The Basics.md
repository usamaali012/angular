# Create Project:
	- ng new project_name

# Creating Component Using CLI
	- ng generate component [component-name]      ---OR
	- ng g c [component-name]
	- ng g c [component-name] --skip-tests true
	- ng g c [folder-name]/[component-name]
 
# Constructor:
	- A method of class which get executed at the time an object of this class is created.

# Square Brackets:
	- Square brackets indicate Angular that we are using "Property Binding" --> that we want to dynamically bind some property.  
 
# $event():
	- Reserved Variable name
	- Used in event binding
	- It is simply the data emitted by the event it is in.
	- click and input are event names and they emit data when they happen. 
	- Reserved Keyword which gives us access to event data.

# Directives:
	- Instructions in the DOM
	- Components are directives with a templates
	- Typically we add directive using attribute selector
	- selector of directive can be configured like selector of component.
	
	- ngIf a structural directive	(changes the structure or our DOM) (either adss element ot does NOT)
	- *ngIf="serverCreated" ---> takes either true or false ---> for ngIf this has to be any expression returning true or false.
	- * in the start is really just there to tell this is a structural directive.

	- ng-template (a local reference): a component that directive shipping with angular which is used to mark places in the DOM. 

	- Attribute Directive: Unlike Structural Directive, Attribute directives don't add or remove elements. They only change the element they were placed on.  (without a star)

	- ngStyle allows us to assign a style dynamically.
	- ngStyle expects to get a javascript object.
	- we can also use property-binding for directives. "[ngStyle]={}" 	
	
	- ngClass allows us to add/remove CSS classes.  ---> only adds a CSS class if a certain condition is true.
	- [ngClass]={CSSclassName= ConditionToApplyThisClass}
	- This class should be attached when

	- ngFor: Structural Directive (changes the structure or our DOM)
	- *ngFor="let server of servers"           (servers is an array)

	- Communication between components???
	- Meaning Transfering data from one component to another???
