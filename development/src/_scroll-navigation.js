
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
