interface AdsDetailType {
    selector: string,
}

class AdsDetail {
    selector: string;
    
    constructor(config: AdsDetailType) {
        this.selector = config.selector;
    }

    showDetails = (id: string, x: number, y: number, content: string) => {
        this.removeAllAdsDetail();
        var adsPlayer = < HTMLElement > document.querySelector(this.selector);
        var adsDetail = < HTMLElement > document.createElement('div');
        var adsContent = < HTMLElement > document.createElement('div');
        var adsClose = < HTMLElement > document.createElement('div');
        adsClose.className = 'ads-detail-close';
        adsClose.innerHTML = 'X';
        adsClose.setAttribute('style', 'width: 10px;height: 10px;right: 5px;top: 5px;line-height: 10px;text-align: center;color: #000;border: 1px solid #000;position: absolute;font-size: 12px;font-weight: bold;padding: 3px;cursor: pointer;')
        adsDetail.className = 'ads-detail';
        adsDetail.id = id + '-ads-detail';
        adsContent.innerHTML = content;
        adsDetail.setAttribute('style', 'left: ' + x + 'px; top: ' + y + 'px;' +
            'position: absolute;width: 200px;height: 300px;background: rgba(255, 255, 255, 0.8);padding: 5px;border-radius: 2px;overflow: hidden;');
        adsDetail.addEventListener('click', (e) => {
            if (( < HTMLElement > e.target).className === 'ads-detail-close') {
                this.removeAdsDetail(id);
            }
        });
        adsContent.className = 'ads-content';
        adsContent.setAttribute('style', 'position: relative;background: white;')
        adsContent.append(adsClose);
        adsDetail.appendChild(adsContent);
        adsPlayer.appendChild(adsDetail);
    }

    removeAllAdsDetail = () => {
        const adsDetails: NodeListOf<Element> = document.querySelectorAll(this.selector + ' .ads-detail');
        for (var detailIdx = 0; detailIdx < adsDetails.length; detailIdx++) {
            if (adsDetails[detailIdx]) {
                adsDetails[detailIdx].parentNode.removeChild(adsDetails[detailIdx]);
            }
        }
    }

    removeAdsDetail = (id: string) => {
        const adsDetail =  document.querySelector(this.selector + ' #' + id + '-ads-detail');
        if (adsDetail) {
            adsDetail.parentNode.removeChild(adsDetail);
        }
    }
}

export default AdsDetail;