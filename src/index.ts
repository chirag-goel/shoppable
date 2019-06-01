import ShoppableAds  from './ShoppableAds';
(function(global) {
    (function addGlobalStyle() {
        var style = <any>document.createElement('style');
        var head = document.head || document.getElementsByTagName('head')[0];
        style.type = 'text/css';
        var css = '@keyframes shadow-ads-pulse{0%{box-shadow:0 0 0 0 rgba(255,255,255,.7)}100%{box-shadow:0 0 0 15px transparent}}';
        if (style.styleSheet){
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    })();
    global.ShoppableAds = function(config) {
        return new ShoppableAds(config);
    }
})(<any> window);