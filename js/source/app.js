/*
* A reusable component that can be used to draw the n number of progress bars and variable controls
* Used the partial template in the HTML to draw the progress bar
* This template can further be called by using the ajax in case of larger application
*/
var prgrsBarReuse = Ractive.extend({
	template: '#main',
	append: true,
	partials: { barPrgPartial: 'barPrgPartial' },
	onrender: function () {
		
	},
	// Get the selected Bar value according to the passed index
	fetchPBarValue: function(selItem) {
		//console.log(this);
		var barData = this.get('pBarConfig');
		return barData[selItem].value;		
	},
	//Simple logic to update the value of selected progress bar according to the selected control
	controlPBarValues: function (event){
		
		var selectedItem = this.get('selectedItem');
		var key = "pBarConfig["+selectedItem+"].value";
		var existingValue = this.fetchPBarValue(selectedItem);		
	
		var finalValue = Number(existingValue) + Number(event.context);
		if(finalValue < 0){
			finalValue = 0;
		}
		this.set(key,finalValue);
		
	},
	//Set of functions to exposed that can be used in the template
	oninit: function ()
	{
		/*this.observe( 'selectedItem', function ( index ) {
			// Change `this.set()` to `this.animate()`
			//this.setSelectedItemIndex( index );
			//console.log(this)
			this.set()
		});	*/
		
		this.on({
		  updatePBarValues: function ( event ) {
			this.controlPBarValues( event );
		  }
		});		
	}
});
//Call the reusable progress bar component
var ractive = new prgrsBarReuse({
	template: '#main',
	el: 'body',
	data: {
		//set of config data to draw the progress bar
		pBarConfig: [ 
			 {name: "#Progress1", value: 25}, 
			 {name: "#Progress2", value: 50},
			 {name: "#Progress3", value: 75}
		], 
		pBarOptions: [ '-25', '-10', '+10', '+25'], //Set of controls to update the progress bar
		selectedItem: 0
	}
});