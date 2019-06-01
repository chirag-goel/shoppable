
import AdsIcon from './adsIcon';

type ShoppableAdsConfigType = {
    type: {
        mediaType: string,
        category?: string,
        cbConfig?: any,
    };
    data: Array<{
        product_id: string;
        product_details: any;
        timestamp: number;
        productId: string;
        topPx: number;
        leftPx: number;
    }>;
    selector?: string;
    enablePause?: boolean;
}

class ShoppableAds {
    type: {
        mediaType: string,
        category?: string,
        cbConfig?: any,
    };
    data: Array<{
        id: string;
        content: any;
        timestamp: number;
        productId: string;
        positionPx: {
            top: number;
            left: number;
        }
    }>;
    selector: string;
    enablePause?: boolean;
    player?: any;
    interval?: any;
    AdsIconIns?: any;

    constructor(config: ShoppableAdsConfigType) {
        console.log(config);

        this.type = {
            mediaType: config.type.mediaType,
            category: config.type.category,
            cbConfig: config.type.cbConfig,
        };
        this.player = null;
        this.selector = config.selector;
        this.interval = null;
        this.enablePause = config.enablePause;
        this.AdsIconIns = new AdsIcon({ selector: this.selector});
        this.data = [];
        if (config.data && config.data.length) {
            for (var idx = 0; idx < config.data.length; idx++) {
                const { product_id, product_details, timestamp, topPx, leftPx } = config.data[idx];
                this.data.push({
                    id: 'ID-' + product_id,
                    content: product_details,
                    timestamp,
                    productId: 'ID-' + product_id,
                    positionPx: {
                        top: topPx,
                        left: leftPx
                    }
                });
            }
        }
    }

    setAdsData = (data) => {
        this.data = data; 
    }

    onReady = () => {
        console.log('A' + this);
        const adsWrapper = document.querySelector(this.selector);
        adsWrapper.setAttribute('style', 'position: relative;');
        switch (this.type.mediaType) {
            case 'YOUTUBE_VIDEO':
                if( this.type.category === 'SHOPPABLE' || this.type.category === 'ADD_TO_CART') {
                    this.showAdsOnYouTubeVideo();
                }
                break;
            case 'IMAGE':
                if( this.type.category === 'SHOPPABLE' || this.type.category === 'ADD_TO_CART') {
                    this.showAdsOnImage();
                }
                break;
            case 'NATIVE_VIDEO':
                if( this.type.category === 'SHOPPABLE' || this.type.category === 'ADD_TO_CART') {
                    this.showAdsOnNativeVideo();
                }
                break;
        }
    }

    showAdsOnNativeVideo = () => {
        this.player = this.type.cbConfig;
        console.log(this.player);
    }

    showAdsOnYouTubeVideo = () => {
        var tag = document.createElement('script');
        tag.id = 'iframe-demo';
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        ( < any > window).onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
    }

    showAdsOnImage = () => {
        for (var adsIndex = 0; adsIndex < this.data.length; adsIndex++) {
            var currentAd = this.data[adsIndex];
            this.AdsIconIns.showIcon(
                currentAd.id,
                currentAd.positionPx.left,
                currentAd.positionPx.top,
                currentAd.content
            );
        }
    }

    setTimeLookup = () => {
        var context = this;
        console.log('INTERVAL');
        this.interval = setInterval(function () {
            var currentTime = Math.floor(context.player.getCurrentTime());
            for (var adsIndex = 0; adsIndex < context.data.length; adsIndex++) {
                var currentAd = context.data[adsIndex];
                if (currentTime === currentAd.timestamp) {
                    console.log('show');
                    if (context.enablePause) {
                        context.player.pauseVideo();
                    }
                    context.AdsIconIns.showIcon(
                        currentAd.id,
                        currentAd.positionPx.left,
                        currentAd.positionPx.top,
                        currentAd.content
                    );
                } else {
                    console.log('remove');
                    context.AdsIconIns.removeIcon(currentAd.id);
                }
            }
        }, 1000);
    }

    onYouTubeIframeAPIReady = () => {
        const iframe = document.querySelector(this.selector + ' iframe');
        this.player = new (< any > window).YT.Player(iframe.id, {
            events: {
                'onReady': this.onPlayerReady,
                'onStateChange': this.onPlayerStateChange
            }
        });
    }

    onPlayerReady = () => {
        console.log('YouTube player is ready');
    }

    onPlayerStateChange = (event: any) => {
        console.log(event);
        if (event.data === 1) {
            this.setTimeLookup();
        } else if (event.data === 2) {
            clearInterval(this.interval);
        }
    }

}

export default ShoppableAds;