
const uuid4 = require('uuid4');
const fs = require('fs');
const sizeOf = require('image-size');
const requests = require('@esbiya/requests');
const CryptoJsHash = require('crypto');


class UploadFile{
    
    constructor(cookie, fileConfig, proxy){
        this.cookie = cookie;
        this.fileConfig = fileConfig
        this.size = fileConfig.size ? fileConfig.size : 1024 * 1024 * 8;
        this.video_path = fileConfig.video_path;
        this.image_path = fileConfig.image_path;
        this.type = fileConfig.type ? fileConfig.type : 'vod';
        this.config = {
            taskId: uuid4()
        };
        this.cookieMap = {};
        Object.assign(this.cookieMap, cookieToDict(cookie))
        this.proxy = proxy;
        // this.proxy = 'http://127.0.0.1:8866'
        this.sessionHeaders = {
            "origin": "https://channels.weixin.qq.com",
            "referer": "https://channels.weixin.qq.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        }
        this.headers = this.sessionHeaders;
        this.headers.cookie = dictToCookie(this.cookieMap)
        this.session = requests.session()
        this.file;
        this.readImageArg();
        if (this.type != 'vod' && this.type != 'imagex'){
            throw TypeError('file type is error...')
        }
        this.after_upload_url = 'https://finder-assistant.mp.video.tencent-cloud.com/applyuploaddfs';
        this.upload_url = 'https://finder-assistant.mp.video.tencent-cloud.com/uploadpartdfs';  // 要拼接参数
        this.completUploadUrl = 'https://finder-assistant.mp.video.tencent-cloud.com/completepartuploaddfs'; // 要拼接参数
    }
    // ...  代码删除

}

class PubVideo extends UploadFile{

    constructor(cookie, fileConfig, pubConfig, proxy){
        super(cookie, fileConfig, proxy);
        this.pubConfig = pubConfig;
        this.sliceTopicTitle();
        this.helperMmdataUrl = 'https://channels.weixin.qq.com/cgi-bin/mmfinderassistant-bin/helper/helper_mmdata';
        this.postClipVideoUrl = "https://channels.weixin.qq.com/cgi-bin/mmfinderassistant-bin/post/post_clip_video";
        this.createUrl = "https://channels.weixin.qq.com/cgi-bin/mmfinderassistant-bin/post/post_create"
    }

    async postCreate(){
        // ...
    }

    sliceTopicTitle(){
        // 处理标题里的标签，话题等
        // 
    }

    async getImage(){
        log('getImage');
        const res = await this.request(this.config.imageUrl2, 'GET');
        log((await res.content).length);
    }

    async pubLoop(){
        // ...
    }

    async loop(){
        await this.upLoop();
        await this.pubLoop();
        
    }
}

const cookieP = 'sessionid=AATVfYAEAAABAAAAAABnwwUfsxXZO6eSEF%2FgYyAAAADzrBEppsryM1QLZ%2BdDmBLm9XwcA0exd%2BeEMM5e%2BlsrR%2Bo%2FKuLzRaVakYy8gHPG7jPAc4BmZ92mqRfey8Rh5XU%2FPg6Tk9ZdOKjsKuydeQRE1Xb9KWxJaRSdL8M0p4g4;wxuin=3218573797'
const fileConfig = {
    video_path: '/root/CoolPubSDK/NodeJS/Wechat/4.mp4',
    image_path: '/root/CoolPubSDK/NodeJS/Wechat/9.jpg'
}
const pubConfig = {
    // 位置，经纬度   全部不给，就是不显示位置
    latitude: 31.221139907836914,
    longitude: 121.5440902709961,
    city: "上海市",

    // 两个标题，description是显示的，下面那个不知道干啥用的。
    description: '是他的 #小猫猫 #大佬  是我的  #我的大佬  是吗妈妈们',   // 直接给就行，里面处理好了话题
    shortTitle: 'gogogogogoggo',

    // effectiveTime: 1677081600   // 不给就是即时发布
};
const pub = new PubVideo(cookieP, fileConfig, pubConfig);
// log(pub.cookie)
pub.loop();
// pub.sliceTopicTitle();
// log(pub.pubConfig)
