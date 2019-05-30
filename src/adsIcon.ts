import AdsDetail from './adsDetail';

interface AdsIconType {
    selector: string,
    AdsDetailPopUp?: any;
}

class AdsIcon {
    selector: string;
    AdsDetailPopUp?: any;

    constructor(config: AdsIconType) {
        this.selector = config.selector;
        this.AdsDetailPopUp = new AdsDetail({ selector: this.selector });
    }

    getYPosition = (y: number) => {
        var newY = y - 280;
        if (newY > 10) {
            return newY;
        }
        return 10;
    }

    getXPosition = (x: number, selector: string) => {
        var playerSelector = < HTMLCanvasElement > document.querySelector(selector);
        var playerWidth = playerSelector ? playerSelector.offsetWidth : 0;
        var newX = x + 150;
        if (newX > playerWidth - 10) {
            return x - 210;
        }
        return x + 30;
    }

    showIcon = (id: string, x: number, y: number, content: string) => {
        const context = this;
        var adsPlayer = < HTMLElement > document.querySelector(this.selector);
        var adsIcon = < HTMLElement > document.createElement('div');
        adsIcon.className = 'ads-icon';
        adsIcon.id = id;
        adsIcon.innerHTML = '+';
        adsIcon.setAttribute('style', 'position: absolute;border: 4px solid rgba(255, 255, 255, 0.5);border-radius: 20px;width: 20px;height: 20px;color: white;font-size: 20px;font-weight: bold;text-align: center;line-height: 20px;cursor: pointer;' + 'left: ' + x + 'px; top: ' + y + 'px')
        adsIcon.addEventListener('click', (e) => {
            this.AdsDetailPopUp.showDetails(id, this.getXPosition(x, context.selector) , this.getYPosition(y), content);
        });
        adsPlayer.appendChild(adsIcon);
    }

    removeIcon = (id: string) => {
        this.AdsDetailPopUp.removeAdsDetail(id);
        var adsIcon = document.querySelector(this.selector + ' #' + id);
        if (adsIcon) {
            adsIcon.parentNode.removeChild(adsIcon);
        }
    }
}

export default AdsIcon;