/*
* Feather V0.0.6 Alpha
* Copyright 2016, Kabir Shah
* http://kingpixil.github.io/Feather/
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

/*globals Node:true, NodeList:true*/
$ = (function (document, window, $) {
  var node = Node.prototype,
      nodeList = NodeList.prototype,
      forEach = 'forEach',
      trigger = 'trigger',
      each = [][forEach],
      thing = document.createElement('i');

  nodeList[forEach] = each;
  window.on = node.on = function (event, fn) {
    this.addEventListener(event, fn, false);
    return this;
  };

  nodeList.on = function (event, fn) {
    this[forEach](function (el) {
      el.on(event, fn);
    });
    return this;
  };

  window[trigger] = node[trigger] = function (type, data) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
  };

  nodeList[trigger] = function (event) {
    this[forEach](function (el) {
      el[trigger](event);
    });
    return this;
  };

  $ = function (s) {
    var r = document.querySelectorAll(s || '☺'),
        length = r.length;

    return length == 1 ? r[0] : r;
  };

  $.on = node.on.bind(thing);
  $[trigger] = node[trigger].bind(thing);

  return $;
})(document, this);
(function () {
	// add indexOf to Array prototype for IE<8
	// this isn't failsafe, but it works on our behalf
	Array.prototype.CSSClassIndexOf = Array.prototype.indexOf || function (item) {
		var length = this.length;
		for (var i = 0; i<length; i++)
			if (this[i]===item) return i;
		return -1;
	};
	// check if classList interface is available (@see https://developer.mozilla.org/en-US/docs/Web/API/element.classList)
	var cl = ("classList" in document.createElement("a"));
	// actual Element prototype manipulation
	var p = Element.prototype;
	if(cl) {
		if(!p.hasClass)
			p.hasClass = function(c) {
				var e = Array.prototype.slice.call(this.classList);
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(!this.classList.contains(c[i]))
						return false;
				return true;
			};
		if(!p.addClass)
			p.addClass = function(c) {
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(!this.hasClass(c[i]))
						this.classList.add(c[i]);
				return this;
			};
		if(!p.removeClass)
			p.removeClass = function(c) {
				var e = this.className.split(' ');
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(this.hasClass(c[i]))
						this.classList.remove(c[i]);
				return this;
			};
		if(!p.toggleClass)
			p.toggleClass = function(c) {
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					this.classList.toggle(c[i]);
				return this;
			};
	} else {
		if(!p.hasClass)
			p.hasClass = function(c) {
				var e = this.className.split(' ');
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(e.CSSClassIndexOf(c[i])===-1)
						return false;
				return true;
			};
		if(!p.addClass)
			p.addClass = function(c) {
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(!this.hasClass(c[i]))
						this.className = this.className!==''?(this.className+' '+c[i]):c[i];
				return this;
			};
		if(!p.removeClass)
			p.removeClass = function(c) {
				var e = this.className.split(' ');
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if(this.hasClass(c[i]))
						e.splice(e.CSSClassIndexOf(c[i]), 1);
				this.className = e.join(' ');
				return this;
			};
		if(!p.toggleClass)
			p.toggleClass = function(c) {
				c = c.split(' ');
				for(var i=0; i<c.length; i++)
					if (this.hasClass(c[i]))
						this.removeClass(c[i]);
					else
						this.addClass(c[i]);
				return this;
			};
	}
	var pl = NodeList.prototype;
	if (!pl.hasClass)
		pl.hasClass = function (c, all) {
			if (all===undefined) all = true;
			for (var i=this.length-1; i>=0; --i) {
				var hc = this[i].hasClass(c);
				if (all && !hc) return false;
				if (!all && hc) return true;
			}
			return true;
		};
	if (!pl.addClass)
		pl.addClass = function (c) {
			for (var i=0; i<this.length; ++i)
				this[i].addClass(c);
		};
	if (!pl.removeClass)
		pl.removeClass = function (c) {
			for (var i=0; i<this.length; ++i)
				this[i].removeClass(c);
		};
	if (!pl.toggleClass)
		pl.toggleClass = function (c) {
			for (var i=0; i<this.length; ++i)
				this[i].toggleClass(c);
		};
})();
