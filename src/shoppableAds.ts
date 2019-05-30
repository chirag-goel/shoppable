
import AdsIcon from './adsIcon';

type ShoppableAdsConfigType = {
    type: {
        mediaType: string,
        playerType?: string,
        cbConfig?: {},
    };
    data: Array<{
        id: string;
        content: string;
        timestamp: number;
        productId: string;
        positionPx: {
            top: number;
            left: number;
        }
    }>;
    selector?: string;
    enablePause?: boolean;
}

class ShoppableAds {
    type: {
        mediaType: string,
        playerType?: string,
        cbConfig?: {},
    };
    data: Array<{
        id: string;
        content: string;
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
        this.type = {
            mediaType: config.type.mediaType,
            playerType: config.type.playerType,
            cbConfig: config.type.cbConfig
        };
        this.player = null;
        this.selector = config.selector;
        this.interval = null;
        this.enablePause = config.enablePause;
        this.AdsIconIns = new AdsIcon({ selector: this.selector});
        this.data = config.data;
    }

    setAdsData = (data) => {
        this.data = data; 
    }

    onReady = () => {
        const adsWrapper = document.querySelector(this.selector);
        adsWrapper.setAttribute('style', 'position: relative;');
        switch (this.type.mediaType) {
            case 'VIDEO':
                this.showAdsOnVideo();
                break;
            case 'IMAGE':
                this.showAdsOnImage();
                break;
        }
    }

    showAdsOnVideo = () => {
        switch (this.type.playerType) {
            case 'YOUTUBE':
                ( < any > window).onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
                break;
        }
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
        this.interval = setInterval(function () {
            var currentTime = Math.floor(context.player.getCurrentTime());
            for (var adsIndex = 0; adsIndex < context.data.length; adsIndex++) {
                var currentAd = context.data[adsIndex];
                if (currentTime === currentAd.timestamp) {
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
                    context.AdsIconIns.removeIcon(currentAd.id);
                }
            }
        }, 1000);
    }

    onYouTubeIframeAPIReady = () => {
        this.player = new( < any > window).YT.Player('existing-iframe-example', {
            events: {
                'onReady': this.onPlayerReady,
                'onStateChange': this.onPlayerStateChange
            }
        });
    }

    onPlayerReady = () => {
        document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
    }

    onPlayerStateChange = (event: any) => {
        if (event.data === 1) {
            this.setTimeLookup();
        } else if (event.data === 2) {
            clearInterval(this.interval);
        }
    }

}

export default ShoppableAds;