


// Source: development/src/_app-start.js


    const _main               = document.getElementById('main');
    const _anchor_link        = document.getElementsByClassName('anchor-link');
    const _section            = document.getElementsByClassName('section');


// Source: development/src/_polyfill.js




if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}






// Source: development/src/_scroll-navigation.js


var _anchorlinkArray = Array.from(_anchor_link);

_anchorlinkArray.forEach(function(element) {

    element.addEventListener('click', function(event) {

        event.preventDefault();

        var _href = element.href.substring(element.href.indexOf('#'));

        TweenMax.to(window, 1, {
            scrollTo: { y: _href, autoKill: false, offsetY: 70 }, ease: Power3.easeInOut,
            onComplete: function() {
            }
        });

    })

})


/*

Create ul element for side page dots with this markup:s

<ul id="vertical-breadcrumb">
  <li></li>
  ...
</ul>

*/

var _sectionArray = Array.from(_section);
var _v_breadcrumb = document.createElement('ul');
_v_breadcrumb.id = 'vertical-breadcrumb'
_main.appendChild(_v_breadcrumb);

if (_sectionArray.length>1) {

_sectionArray.forEach(function(element) {
// for (var i = 0, len = _sectionArray.length; i < len; i++) {
    var _dot = document.createElement('li');
    _v_breadcrumb.appendChild(_dot);
});
// }

var _dot = _v_breadcrumb.querySelectorAll('li');

inView.threshold(0.25);
inView.offset(100);
inView('.section')
    .on('enter', el => {
        _dot[_sectionArray.indexOf(el)].classList.add('isActive');
       el.classList.add('isActive');
    })
    .on('exit', el => {
        _dot[_sectionArray.indexOf(el)].classList.remove('isActive');
        el.classList.remove('isActive');
    })


}



// Source: development/src/_app-end.js


