# Attribute and Structural Directive:
	- Attribute Directives are called Attribute because they sit on the element like Attributes.
	- Structural Directive also do the same but they also change the structure of DOM  around the element. By this overall view container or overall DOM is affected.
	- With Attribute Directives you never destroy an element from the DOM, you only change properties of that element. e.g., background-color --->> only affecting the elements they sit on.  

	- By Default, you cannot have more than one Structural Directive on one element. 

	- [ngClass]="{}"       --------->>>> [ngClass]="{odd: odd % 2 !== 0}"     ---> First odd is CSS style class.
	- Square brackets here indicate we are binding to some property on our ngClass directive.

	- [ngStyle]="{}"       --------->>>> [ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"    ---> backgroundColor is style name.


# Creating a Basic Attribute Directive:
	- A directive which changes background color of an element. 
	- Create a new .ts file in a new folder
	- create an export class of in .ts file.
	- Use a decorator '@Directive' and pass it an object to configure it just like a component.
	- Give it a unique selector. Use Camel Case.
	- And to make it Attribute style and use it as attribute in an element not as an element itself or element tag wrap it in square brackets.
	- You wil  use it as attribute in any element WITHOUT square brackets.

	- selector: "[appBasicHighlight]",

	- In directives, we can inject the element the directive will sit on (or will be used) here in this class
	- We can take the element name as an argument in this class. 
	- Angular will do it for us, you will not have to give any argument to it.

	- import { Directive, ElementRef, OnInit } from "@angular/core";
	@Directive({
	    selector: "[appBasicHighlight]",
	})
	export class BasicHighlightDirective implements OnInit {
	    constructor(private elementRef: ElementRef) {
	    }
	    ngOnInit() {
	        this.elementRef.nativeElement.style.backgroundColor = "green";
	    }
	}

	- Add this directive to your declarations of module.ts file in app folder.
	- Now you can use it in your.html file.

	- <p appBasicHighlight>Style me with Basic Directive</p>

	- Well it is NOT a good practice to directly access element like this.

	- ng generate directive [directive_name]
	- ng g d [directive_name

	- Better way is to inject another thing in this class which is called "renderer" which is of type 'Renderer2'
	- renderer object has many properties. One of which is setStyle.

	- this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue')

	- as an argument this takes element, style name and and style value.
	- Renderer is a better way to access the element. Why ?
	- Because, Angular is not limited to running in the browser only. It also works with 'servive workers' (?) --- These are environments where you might not have access to the DOM. 
	- Now before we tried to change the DOM by directly accessing the element in 'appBasicHighlight'  --- You might get an error in some circumstances.
	- So, using renderer to access the DOM rather than directly accessing element is always the better approach.


# "@HostListener()":
	- To listen to events happening in DOM.
	- Used with method to react to any event happening in DOM.
	- e.g., Giving color to element only when a mouse hover it.
	- DOM sends event for every move happening in DOM. Simply Grab your desired event listen to it using @HostListener() and react to it as you desire.
	- e.g., 'mouseeenter', 'mouseleave' etc.
	- You can also listen to custom events.


# @HostBinding():
	- Another even easier way to access the properties of element directly.
	- Can be used with attributes.
	- @HostBinding() takes property name as an argument as string. For sub-properties of a property use dot notation. e.g., 'style.backgroundColor' (Camel Case is Important here, Because we are accessding DOM property which does NOT know dash.)
	- We can pass a string defining to which property of the hosting element we want to bind.
	- On the element this directive sits, please access the style property (almost every element has this property) and then subProperty background-color.
	- A great way of working with the element inside of a directive, you can bind to any property of the element you are sitting on.


# Binding to Directive Properties:
	- Custom property binding and Custom Event Binding also works in Directives.
	- We want to set the color value dynamically. 
	- We want to change the color depending on some other parameters in our app.
	- Right now, color is hard-coded. We'll use Custom Event Binding. '@Input()'
	
	- <p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'">Style me with Better Directive</p>

	- Here we have two extra directives-like looking things, which actually is just property binding.
	- Beacuse before, we have used directives with property binding.
	- How does Angular know to bind to a property of element or to a property of directive. (It figures it out)
	- It simply checks our own directives before it reaches the native properties of elements.

	- So, We can bind to propeties of our own directives by simply placing them on the same element, enclosed in square brackets.

	- for ngClass (built-in directive), directive itself is enclosed in square brackets.

	- you can provide an alias and set this equal to your directive selector name in which that @Input is available.

	- @Input('appBetterHighlight') highlightColor: string = 'blue';
	- Now in that case, you will do:

	- <p [appBetterHighlight]="'red'" [defaultColor]="'yellow'" >Style me with Better Directive</p>

	- Now you do NOT need to separately attach the directive name as an attribute. Because we are having the same style of the directives itself.
	- This is only an option that you can use such an alias.
	- By default, directive name is not enclosed in squre brackets that only happens if you want to bind a property ehich has the same name or alias
	like your directive selector.

	- Right now we are passing property binding like this:
	- [highlightColor]="'red'"

	- We can also use:
	- highlightColor="red"

	- You can add property binding without square brackets in a special case where you need to pass a string. With squre brackets you need to use quotation marks 2 times, double and single
	- Without squre brackets you need to use only one double quotation marks.
	- Use it carefully.


# Structural Directive:
	- Star ? Important for angular to know its a Structural Directive. 
	- Its just a nicer way for us to use them.
	- Behind the scenes, they will transform into something else because there is no star Angular syntax when using directive.
	- Behind the scenes, angular transforms it to propertybinding.

	- Writing following block without "*", and having same results.
	
	<div *ngIf="onlyOdd">
			<li class="list-group-item" 
				*ngFor="let odd of oddNumbers;"
				[ngStyle]="{backgroundColor: odd % 2 !== 0 ? 'yellow' : 'transparent'}" 
				[ngClass]="{odd: odd % 2 !== 0}"> 
					{{ odd }} 
			</li>
	</div>

	- "ng-template" an element tag provided by Angular
	- ng-template is an element which itself is not rendered but ehich allows us to define a template in the endfor Angular to use once, once it determines that this element needs to be rendered because some condition is true.

	<ng-template [ngIf]="!onlyOdd">
		<div>
			<li class="list-group-item" 
				*ngFor="let even of evenNumbers;"
				[ngStyle]="{backgroundColor: even % 2 !== 0 ? 'yellow' : 'transparent'}"
				[ngClass]="{odd: even % 2 !== 0}"> 
					{{ even }} 
			/li>
		</div>
	</ng-template>

	- Now above is the form to which angular transforms an angular "*" Structural Directive to, so we do NOT need to use the *, rather we use property binding here. 
	- That is the real content behind the scene to which a structural directive with "*" gets transformed to.


# Building Structural Directive:
	- Directive opposite to If ===>> unless.
	- Will render element if the condition is false.
	- "set" keyword turns its (property) accessor to a method.
	
	- @Input() set unless(condition: boolean) {}

	- unless is still a property, its just the setter of property which is a method which gets executed whenever the property changes.
	- Property will change from outside as we are using @Input() method.
	- "unless", therefore, needs to receive the condition as an input which will change.
	- Keep in mind, our UnlessDirective at the end will sit on an "ng-template" component because that is what it gets transformed to by Angular if we use the star. "*"

	- We can get access to the template, and also need to get access to the place in the document where we want to render it. 
	- Above both can be injected.
	- template injection: private templateRef: TemplateRef<any>           -------->>> (Just like ElementRef)
	- ViewContainer injection :  private vcRef: ViewContainerRef          -------->>> (where to render in a template)	

	- Just like ElementRef gave us the access to the element the directive was on, TemplateRef does the same and gave us the access to template 
	- template is what and ViewContainer is where.
	- These 2 marks the place where we placed the directive in the document.

	- Now on a condition we will add the element which is like creating the element.
	- """this.vcRef.createEmbeddedView(this.templateRef);"""

	- Now if you do NOT want to create the element.
	- """this.vcRef.clear();"""
	- For using this directive on usual element use "*", otherwise use "ng-template" for using it like property binding.

	- ERROR::
	- Can't bind to 'appUnless' since it isn't a known property of 'div'.

	- Use the same name for your directive selector and the accessor of set which is right now "unless".
	- Change it to appUnless

	- Angular transform our "*" format into databinding format. And here we were using "appUnless" he directive selector which when gets transformed to databinding format does NOT find any propeerty to bind with as it is "appUnless"
	- and the "@Input()" we have defined is "unless" 
	- Therefore it gives an error.

	- We should use same name for both directive selector and the property we are binding to.


# ngSwitch:
	- To show different things/elements on different conditions.
	- [ngSwitch]="value"
	- *ngSwitchCase="5"         Here 5 will be the value from ngSwitch
	- *ngSwitchCase="10"
	- *ngSwitchCase="100"
	- *ngSwitchDefault