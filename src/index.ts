import ShoppableAds  from './ShoppableAds';
(function(global) {
    global.ShoppableAds = function(config) {
        return new ShoppableAds(config);
    }
})(<any> window);