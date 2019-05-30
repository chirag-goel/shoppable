// var player: any;
// var interval: any;
// var enablePause = true;
// var adsContent = [{
//         "id": "64cca568-2c35-485a-9d0a-6257a38e05b1",
//         "content": "<div style='text-align: center; padding: 10px;'><div style='width: 100%; height: 180px; overflow: hidden;'><img width='130px' src='https://rukminim1.flixcart.com/image/880/1056/jql8fbk0/jacket/y/s/n/38-cotton-jacket-001-militarygreen-vtv-original-imafck2gcvfqxdz5.jpeg?q=50' /></div><p>Full Sleeve Washed Women Jacket</p><a style='width: 100%;height: 30px;background: #00adff;text-decoration: none;line-height: 30px;color: white;font-weight: bold;border-radius: 5px; display: block;' href='https://www.flipkart.com/vtv-full-sleeve-washed-women-jacket/p/itmfcs4ydghwdqzs?pid=JCKFCGG98S3WZDVV&lid=LSTJCKFCGG98S3WZDVVZGS3QJ&marketplace=FLIPKART&srno=s_1_1&otracker=search&otracker1=search&fm=SEARCH&iid=a32e4f8d-0b3b-4245-9239-d9eb29758069.JCKFCGG98S3WZDVV.SEARCH&ppt=sp&ppn=sp&ssid=ad1r1w2x000000001559130601774&qH=caca3e0b1c76f1ea' target='_blank'>Buy</a></div>",
//         "timestamp": 5,
//         "productId": "TSHFCQGZNVJBZVR7",
//         "positionPx": {
//             "top": 220,
//             "left": 120
//         }
//     },
//     {
//         "id": "64cca568-2c35-485a-9d0a-6257a38e05b2",
//         "content": "<div style='text-align: center; padding: 10px;'><div style='width: 100%; height: 180px; overflow: hidden;'><img width='130px' src='https://rukminim1.flixcart.com/image/880/1056/jc7z0y80/jacket/a/r/8/xl-nt539t1038sg-seafarer-orange-nautica-original-imafy6zzynhzthyk.jpeg?q=50' /></div><p>Full Sleeve Washed Women Jacket</p><a style='width: 100%;height: 30px;background: #00adff;text-decoration: none;line-height: 30px;color: white;font-weight: bold;border-radius: 5px;display: block;' href='https://www.flipkart.com/nautica-full-sleeve-solid-women-jacket/p/itmf3vgjybgcne3e?pid=JCKFY5ZHREVZ4TDZ&lid=LSTJCKFY5ZHREVZ4TDZM7AQFC&marketplace=FLIPKART&srno=s_1_7&otracker=search&otracker1=search&fm=organic&iid=9ac3eaec-8561-4c8f-b7f9-ada16b7db639.JCKFY5ZHREVZ4TDZ.SEARCH&ppt=sp&ppn=sp&qH=caca3e0b1c76f1ea' target='_blank'>Buy</a></div>",
//         "timestamp": 7,
//         "productId": "TSHFDYGV9HKDGBHJ",
//         "positionPx": {
//             "top": 215,
//             "left": 355
//         }
//     },
//     {
//         "id": "64cca568-2c35-485a-9d0a-6257a38e05b3",
//         "content": "<p>Buy</p>",
//         "timestamp": 39,
//         "productId": "TSHFDYGV9HKDGBHJ",
//         "positionPx": {
//             "top": 260,
//             "left": 375
//         }
//     }
// ];

// function removeAdsDetail(id: string) {
//     var adsDetail = document.getElementById(id + '-ads-detail');
//     if (adsDetail) {
//         adsDetail.parentNode.removeChild(adsDetail);
//     }
// }

// function removeAdsIcon(id: string) {
//     removeAdsDetail(id);
//     var adsIcon = document.getElementById(id);
//     if (adsIcon) {
//         adsIcon.parentNode.removeChild(adsIcon);
//     }
// }

// function getYPosition(y: number) {
//     var newY = y - 300;
//     if (newY > 10) {
//         return newY;
//     }
//     return 10;
// }

// function getXPosition(x: number) {
//     var playerSelector = < HTMLCanvasElement > document.querySelector('#video-player iframe');
//     var playerWidth = playerSelector ? playerSelector.width : 0;
//     var newX = x + 150;
//     if (newX > playerWidth - 10) {
//         return x - 190;
//     }
//     return x + 30;
// }

// function showAdsDetail(id: string, x: number, y: number, content: string) {
//     var adsPlayer = < HTMLElement > document.getElementById('video-player');
//     var adsDetail = < HTMLElement > document.createElement('div');
//     var adsContent = < HTMLElement > document.createElement('div');
//     var adsClose = < HTMLElement > document.createElement('div');
//     adsClose.className = 'ads-detail-close';
//     adsClose.innerHTML = 'X';
//     adsDetail.className = 'ads-detail';
//     adsDetail.id = id + '-ads-detail';
//     adsContent.innerHTML = content;
//     adsDetail.setAttribute('style', 'left: ' + getXPosition(x) + 'px; top: ' + getYPosition(y) + 'px');
//     adsDetail.addEventListener('click', function (e) {
//         if (( < HTMLElement > e.target).className === 'ads-detail-close') {
//             removeAdsDetail(id);
//         }
//     });
//     adsContent.className = 'ads-content';
//     adsContent.append(adsClose);
//     adsDetail.appendChild(adsContent);
//     adsPlayer.appendChild(adsDetail);
// }

// function showAdsIcon(id: string, x: number, y: number, content: string) {
//     var adsPlayer = < HTMLElement > document.getElementById('video-player');
//     var adsIcon = < HTMLElement > document.createElement('div');
//     adsIcon.className = 'ads-icon';
//     adsIcon.id = id;
//     adsIcon.innerHTML = '+';
//     adsIcon.setAttribute('style', 'left: ' + x + 'px; top: ' + y + 'px');
//     adsIcon.addEventListener('click', function (e) {
//         showAdsDetail(id, x, y, content);
//     });
//     adsPlayer.appendChild(adsIcon);
// }

// function setTimeLookup() {
//     interval = setInterval(function () {
//         var currentTime = Math.floor(player.getCurrentTime());
//         for (var adsIndex = 0; adsIndex < adsContent.length; adsIndex++) {
//             var currentAd = adsContent[adsIndex];
//             if (currentTime === currentAd.timestamp) {
//                 if (enablePause) {
//                     player.pauseVideo();
//                 }
//                 showAdsIcon(
//                     currentAd.id,
//                     currentAd.positionPx.left,
//                     currentAd.positionPx.top,
//                     currentAd.content
//                 );
//             } else {
//                 removeAdsIcon(currentAd.id);
//             }
//         }
//     }, 1000);
// }

// function onYouTubeIframeAPIReady() {
//     player = new( < any > window).YT.Player('existing-iframe-example', {
//         events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//         }
//     });
// }

// function onPlayerReady(event: any) {
//     document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
// }

// function changeBorderColor(playerStatus: number) {
//     var color;
//     if (playerStatus == -1) {
//         color = "#37474F"; // unstarted = gray
//     } else if (playerStatus == 0) {
//         color = "#FFFF00"; // ended = yellow
//     } else if (playerStatus == 1) {
//         color = "#33691E"; // playing = green
//     } else if (playerStatus == 2) {
//         color = "#DD2C00"; // paused = red
//     } else if (playerStatus == 3) {
//         color = "#AA00FF"; // buffering = purple
//     } else if (playerStatus == 5) {
//         color = "#FF6DOO"; // video cued = orange
//     }
//     if (color) {
//         document.getElementById('existing-iframe-example').style.borderColor = color;
//     }
// }

// function onPlayerStateChange(event: any) {
//     console.log(event);
//     changeBorderColor(event.data);
//     if (event.data === 1) {
//         setTimeLookup();
//     } else if (event.data === 2) {
//         clearInterval(interval);
//     }
// }