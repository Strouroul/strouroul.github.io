if (!window.vismeSupportWidget) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://dashboard.visme.co/help-popup-v2/assets/index.565c71c6.js';
    s.type = 'module';
    s.crossOrigin = true;
    document.body.appendChild(s);

    function show() {
        window.postMessage('support-widget:open', '*');
    }

    function playVideo(id, autoplay) {
        window.postMessage({
            action: 'support-widget:video-player',
            video: id,
            autoplay: !!autoplay,
        }, '*');
    }

    function hide() {
        window.postMessage('support-widget:close', '*');
    }

    function toggle() {
        window.postMessage('support-widget:toggle', '*');
    }

    function trace(type, payload) {
        if (!payload || typeof payload !== 'object') payload = {};
        window.postMessage({action: 'support-widget:trace', type, payload});
    }

    function search(keyword) {
        window.postMessage({
            action: 'support-widget:search',
            keyword,
        }, '*');
    }

    var options = {};

    function setup(mode, opts) {
        if (typeof opts == 'object') {
            for (var i in opts) {
                if (opts.hasOwnProperty(i)) {
                    options[i] = opts[i];
                }
            }
        }

        var node = document.querySelector('visme-help-popup');
        if (!node) {
            console.warn('[help-popup] widget element not found');
            return;
        }

        if (options.isHidden || mode == '-') {
            node.setAttribute("hidden", "1");
        } else {
            node.setAttribute("hidden", null);
        }

        if (mode && mode != '') {
            node.setAttribute("area", mode);
        }
    }

    window.vismeSupportWidget = {
        show,
        hide,
        toggle,
        setup,
        search,
        trace,
        playVideo,
    };
}
