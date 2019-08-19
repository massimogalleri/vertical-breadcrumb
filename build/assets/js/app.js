"use strict";

var _main = document.getElementById('main');

var _anchor_link = document.getElementsByClassName('anchor-link');

var _section = document.getElementsByClassName('section');

if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;

    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };

    var toInteger = function toInteger(value) {
      var number = Number(value);

      if (isNaN(number)) {
        return 0;
      }

      if (number === 0 || !isFinite(number)) {
        return number;
      }

      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };

    var maxSafeInteger = Math.pow(2, 53) - 1;

    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    return function from(arrayLike) {
      var C = this;
      var items = Object(arrayLike);

      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;

      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      var len = toLength(items.length);
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
      var k = 0;
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

      A.length = len;
      return A;
    };
  }();
}

var _anchorlinkArray = Array.from(_anchor_link);

_anchorlinkArray.forEach(function (element) {
  element.addEventListener('click', function (event) {
    event.preventDefault();

    var _href = element.href.substring(element.href.indexOf('#'));

    TweenMax.to(window, 1, {
      scrollTo: {
        y: _href,
        autoKill: false,
        offsetY: 70
      },
      ease: Power3.easeInOut,
      onComplete: function onComplete() {}
    });
  });
});

var _sectionArray = Array.from(_section);

var _v_breadcrumb = document.createElement('ul');

_v_breadcrumb.id = 'vertical-breadcrumb';

_main.appendChild(_v_breadcrumb);

if (_sectionArray.length > 1) {
  _sectionArray.forEach(function (element) {
    var _dot = document.createElement('li');

    _v_breadcrumb.appendChild(_dot);
  });

  var _dot = _v_breadcrumb.querySelectorAll('li');

  inView.threshold(0.25);
  inView.offset(100);
  inView('.section').on('enter', function (el) {
    _dot[_sectionArray.indexOf(el)].classList.add('isActive');

    el.classList.add('isActive');
  }).on('exit', function (el) {
    _dot[_sectionArray.indexOf(el)].classList.remove('isActive');

    el.classList.remove('isActive');
  });
}
