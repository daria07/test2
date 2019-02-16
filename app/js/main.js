document.addEventListener('DOMContentLoaded', function() {
	var elements = document.getElementsByClassName("to-select");
	
	for (var i = 0; i < elements.length; i++) {
	  	elements[i].addEventListener("click", function() {
	  		if (this.classList.contains('cat')) {
	  			var elem = this;
	  		} else {
	  			var elem = this.parentNode.previousElementSibling;	  			
	  		}
	  		if (!this.classList.contains('disabled')) {
	    		elem.classList.toggle("selected");
	    		elem.classList.remove('hover');
	    	}
	  	})
	}
	var items = document.getElementsByClassName("cat");
	for (var i = 0; i < items.length; i++) {		
		items[i].addEventListener('mouseleave', function() { 
    		if (this.classList.contains('selected')) {
    			this.classList.add('hover');
    		}
	  	})
	}



});