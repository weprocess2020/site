(function() {
    function getClosest ( elem, selector ) {
        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function(s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {}
                    return i > -1;
                };
        }
        // Get closest match
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( elem.matches( selector ) ) return elem;
        }
        return null;
    };

    window.track = function track(name, value, success) {
        var params = 'name=' + encodeUrl(name);
        if (value !== undefined) params += '&value=' + encodeUrl(value);

        var code = window.location.pathname.split('/').pop();
        if (!/^[a-z0-9]{4,}$/i.test(code)) {
            console.info('Tracking disabled on this URL. Parameters: ' + params);
            if (success !== undefined) return success();
        } else {
            return XHRPost('logics/commons/tracker/' + code, params, success);
        }
    };
    function encodeUrl(value) {
        return encodeURIComponent(value).replace(/%20/g,'+')
    }
    function XHRPost(url, params, success, undefined) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (success !== undefined) {
            xhr.onload = success;
        }
        xhr.send(params);
        return xhr;
    }
    function trackEventListener(event){
        target = event.target
        if (!target.hasAttribute('data-track-name')){
            target = getClosest(target, "a[data-track-name]")
        }
        var callback = event.defaultPrevented ? function() {} : function() { window.location.assign(target.href); };
        event.preventDefault();
        track(target.dataset.trackName, target.dataset.trackValue, callback);
    }

    document.addEventListener('click', function(event) {
        if (!event.target.hasAttribute('data-track-name') && !getClosest(event.target, "a[data-track-name]")){
            return;
        }
        trackEventListener(event)
    },false);
}());
