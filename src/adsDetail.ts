interface AdsDetailType {
    selector: string,
}

class AdsDetail {
    selector: string;
    
    constructor(config: AdsDetailType) {
        this.selector = config.selector;
        document.addEventListener('click', (e) => {
            console.log(e.target);
            if((e.target as any).className === 'ads_add_to_cart') {
                this.handleAddToCart((e.target as any).id);
            }
        });
    }

    async handleAddToCart (fsn) {
		const response = await fetch("/v1/creative/addToCart", {
			"credentials": "omit",
			"headers": {
				"content-type": "application/json",
			},
			"body": JSON.stringify({
				listingId: fsn
			}),
			"method": "POST",
			"mode": "cors"
		});

		if (response.ok) {
			window.open('https://www.flipkart.com/viewcart', '_blank');
		}
	}

    getDetailHtml = (details) => {
        return "<div style='text-align: center; padding: 10px;'>"
            + "<div style='width: 100%; height: 180px; overflow: hidden;'>"
            +   "<img style='max-width: 130px; width: auto;' src=' "+ details.img + "' /></div><div style='max-height: 60px; margin: 5px; overflow: hidden;'><p style='height: 70px;"
            +       "display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;"
            +       "overflow: hidden !important;text-overflow: ellipsis;overflow-y: hidden;'>" + details.title + "</p></div>"
            +   "<div><a style='width: 48%; font-size: 12px; display: inline-block;height: 30px;background: #00adff;text-decoration: none;"
            +       "line-height: 30px;color: white;border-radius: 5px;'"
            +       " href='https://www.flipkart.com" + details.url + "' target='_blank'>Buy</a><button style='display:inline-block;height: 30px;"
            +       "background: #ff9f00; width: 49%; margin-left: 5px; line-height: 30px;color: white;font-weight: bold;border-radius: 5px;' class='ads_add_to_cart' id='"+details.listingId+"' onClick=" + 
                    this.handleAddToCart+">Add To Cart</button></div></div>";
    }

    showDetails = (id: string, x: number, y: number, content: string) => {
        this.removeAllAdsDetail();
        var adsPlayer = < HTMLElement > document.querySelector(this.selector);
        var adsDetail = < HTMLElement > document.createElement('div');
        var adsContent = < HTMLElement > document.createElement('div');
        var adsClose = < HTMLElement > document.createElement('div');
        adsClose.className = 'ads-detail-close';
        adsClose.innerHTML = 'X';
        adsClose.setAttribute('style', 'width: 20px;height: 20px;right: 5px;top: 5px;line-height: 12px;text-align: center;'
            +   'color: #616161;border: 1px solid #6f6f6f;position: absolute;font-size: 12px;font-weight: bold;padding: 3px;'
            +   'cursor: pointer;')
        adsDetail.className = 'ads-detail';
        adsDetail.id = id + '-ads-detail';
        adsContent.innerHTML = this.getDetailHtml(content);
        adsDetail.setAttribute('style', 'left: ' + x + 'px; top: ' + y + 'px;position: absolute;width: 200px;height: 310px;'
            +   'background: rgba(255, 255, 255, 0.8);padding: 5px;border-radius: 2px;overflow: hidden;'
            +   'box-shadow: 3px 0px 10px rgba(0,0,0,0.3);');
        adsDetail.addEventListener('click', (e) => {
            if (( < HTMLElement > e.target).className === 'ads-detail-close') {
                this.removeAdsDetail(id);
            }
        });
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