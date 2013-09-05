/*
        1. resolve Tag
        2. replace tag
        3. add class
        4. replace CustomAttr
        5. restoreAttr
*/

function resolveTag(srcTagName) {
        switch(srcTagName.toLowerCase()) {
                case 'stackpanel':
                        replaceTag(srcTagName, 'ul').addClass(srcTagName).replaceCustomAttr().childrenWrap('li').replaceChildrenCustomAttr();
                        //return replaceTag(srcTagName, 'ul').addClass(srcTagName).replaceCustomAttr().restoreAttr().childrenWrap('li');
        }
}

jQuery.fn.replaceChildrenCustomAttr = function () {
        $(this).children().each(function () {
                $(this).replaceChildrenCustomAttr();
        });
        $(this).each(function() {
                $(this).replaceCustomAttr();
        });
}


function replaceTag(srcTagName, destTagName) {
        var newTag = null;
        $(srcTagName).replaceWith(function(){
                newTag = $("<"+destTagName+" />", {html: $(this).html(), data : $(this).data()});
                newTag.attr($(this).allAttr());
                return newTag;
        });
        return newTag;
}

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
                        default:
                                $(this).addClass(key + "-" + $(this).data()[key]);
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