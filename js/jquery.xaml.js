/*
        1. resolve Tag
        2. replace tag
        3. add class
        4. replace CustomAttr
        5. restoreAttr
*/


jQuery.fn.xaml = function () {
	$(this).each(function () {
		resolveTag($(this));
	});
};


function resolveTag(target) {
	target.children().each(function () {
		resolveTag($(this));
	});

	var tagName = target[0].tagName.toLowerCase();
	target.each( function() {
		switch(tagName) {
			case 'stackpanel':			
				$(this).replaceTag('ul').addClass(tagName).replaceCustomAttr().childrenWrap('li').replaceChildrenCustomAttr();
				break;
				//return replaceTag(srcTagName, 'ul').addClass(srcTagName).replaceCustomAttr().restoreAttr().childrenWrap('li');
			case 'grid':
				var table = $(this).replaceTag('table').addClass(tagName).replaceCustomAttr();
				//table.children("grid\\.rowdefinitions").remove();
				//table.children("grid\\.columndefinitions").remove();

				/*
				for(var r = 0; r < trs.length; r++) {
					for(var c = 0; c < tds.length; c++) {
						trs[r].append(tds[c]);
					}
					table.append("<tr>test</tr>");
				}
				*/


				break;
			case 'grid.rowdefinitions':
				$(this).replaceTag('table');
				break;
			case 'rowdefinition':
				$(this).replaceTag('tr');
				break;
			case 'grid.columndefinitions':
				$(this).replaceTag('table');
				break;
			case 'columndefinition':
				$(this).replaceTag('td');
				break;
		}
	});
}


/*
	1. grid => table
	2. rowdefinitions => tr
	3. columndefinitions => td
	4. child-element => (row,column) append

*/


jQuery.fn.replaceChildrenCustomAttr = function () {
	$(this).children().each(function () {
			$(this).replaceChildrenCustomAttr();
	});
	$(this).each(function() {
			$(this).replaceCustomAttr();
	});
};


jQuery.fn.replaceTag = function (destTagName) {
	var newTag = null;
	$(this).replaceWith(function(){
		newTag = $("<"+destTagName+" />", {html: $(this).html(), data : $(this).data()});
		newTag.attr($(this).allAttr());
		return newTag;
	});
	return newTag;
};

/*
jQuery.fn.restoreAttr = function() {
        $(this).attr($(this).allAttr());	
        return $(this);
};
*/

jQuery.fn.allAttr = function() {
	var arr = new Object();
	for(var i = 0; i <  this[0].attributes.length; i++) {
		// skip custom attributes
		//if(this[0].attributes[i].nodeName.indexOf('data-') == 0) { continue; }
		arr[this[0].attributes[i].nodeName] = this[0].attributes[i].nodeValue;
	}
	return arr;
};


jQuery.fn.replaceCustomAttr = function () {
	for(var key in $(this).data()) {
		switch(key.toLowerCase()) {
			case 'background':
				$(this).css("background-color", $(this).data()[key]);
				break;
			case 'width':
				$(this).css("width", $(this).data()[key]);
				break;
			case 'height':
				$(this).css("height", $(this).data()[key]);
				break;
			case 'horizontalalignment':
				$(this).parent().css("text-align", $(this).data()[key].toLowerCase());
				break;
			case 'verticalalignment':
				var value = $(this).data()[key].toLowerCase();
				value = (value == 'center' ? "middle" : value);
				$(this).css("vertical-align", value);
				break;
			default:
				$(this).addClass(key + "-" + $(this).data()[key].toLowerCase());
		}
		$(this).removeAttr('data-' + key);
	}
	return this;
};



jQuery.fn.childrenWrap = function (wrapTagName) {
	return $(this).children().each( function () {
		return $(this).wrap("<"+wrapTagName+" />");
	});
	return newTag;
};