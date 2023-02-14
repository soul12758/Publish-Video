const uuid4 = require('uuid4');
const fs = require('fs');
const sizeOf = require('image-size');

const log = console.log;

class UploadFile{
    
    constructor(cookie, fileConfig, proxy){
        this.cookie = cookie;
        this.fileConfig = fileConfig
        this.size = fileConfig.size ? fileConfig.size : 1024 * 1024 * 5;
        this.video_path = fileConfig.video_path;
        this.image_path = fileConfig.image_path;
        this.imagePathList = fileConfig.imagePathList;
        this.type = fileConfig.type ? fileConfig.type : 'video';
        this.config = {
            taskId: uuid4()
        };
        this.imageLink;
        this.videoLink;
        this.fileConfig.imageObjList = [];
        this.proxy = proxy;
        this.headers = {
            "origin": "https://creator.xiaohongshu.com/",
            "referer": "https://creator.xiaohongshu.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        }
        this.headers.cookie = this.cookie;
        this.session = requests.session()
        this.file;
        if (this.type != 'video' && this.type != 'imagex'){
            throw TypeError('file type is error...')
        }
        this.uploadAPI;
        this.etagList = [];
    }

    async uploadImage(){
        // ...
    }

    async upVideoLoop(){
        // ...
    }

    async upImageLoop(){
        // ...
    }

}

class PubVideo extends UploadFile{

    constructor(cookie, fileConfig, pubConfig, proxy){
        super(cookie, fileConfig, proxy);
        this.pubConfig = pubConfig;
        this.helperMmdataUrl = 'https://channels.weixin.qq.com/cgi-bin/mmfinderassistant-bin/helper/helper_mmdata';
        this.postClipVideoUrl = "https://channels.weixin.qq.com/cgi-bin/mmfinderassistant-bin/post/post_clip_video";
        this.createUrl = "https://channels.weixin.qq.com/cgi-bin/mmfinderassistant-bin/post/post_create"
    }
    
    async notePost(){
        // ...
    }

    async imagePost(){
        // ...
    }

    async pubVideoLoop(){
        await this.upVideoLoop();
        await this.notePost();
    }

    async pubImageLoop(){
        await this.upImageLoop();
        await this.imagePost();
    }

}

class XhsAPI {

    constructor(cookie, proxy){
        this.cookie = cookie;
        this.proxy = proxy;
        this.userId = cookieToDict(this.cookie)['x-user-id']
        this.session = requests.session();
        this.headers = {
            "origin": "https://creator.xiaohongshu.com/",
            "cookie": this.cookie,
            "referer": "https://creator.xiaohongshu.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        }
        this.topicAPI = 'https://www.xiaohongshu.com/fe_api/burdock/v2/note/search/topic';
    }

    updateHeaders(url, data){
        Object.assign(this.headers, encryptUrl(url, data));
        this.headers['x-sign'] = xSign(url);
    }

    async searchLoc(locName){
        // ...
    }

    async searchTopic(topicName){
        // ...
    }

    async noteUserPost(){
        // ...
    }

    async cookieStatus(){
        // ...
    }

    async registerCanvas(){
        // ...
    }

}

const cookieP = "";
const fileConfig = {
    // video_path: '/root/MediaFIles/4.mp4',
    // image_path: '/root/CoolPubSDK/NodeJS/Xiaohongshu/4.jpg',


    image_path: "C:\\Users\\admin\\Desktop\\8.jpg",
    video_path: "C:\\Users\\admin\\Desktop\\3.mp4",

    // image_path: "/root/CoolPubSDK/NodeJS/Xiaohongshu/5.jpg",
    // video_path: "/root/CoolPubSDK/NodeJS/Xiaohongshu/5.mp4",

    // imagePathList: ["/root/CoolPubSDK/NodeJS/Xiaohongshu/5.jpg", "/root/CoolPubSDK/NodeJS/Xiaohongshu/4.jpg", "/root/MediaFIles/封面+视频/封面.jpg"],

    size: 1024 * 1024 * 5, // 切片单位，网页默认是1024 * 1024 * 1
}
const pubConfig = {
    postTime: "",  // 预发布时间，给时间戳就行，置空就是即时发布
    title: "猫",  // 标题
    content: "#猫[话题]# 我得 #我的猫[话题]# #新手养猫[话题]#",  // 内容  这个自己组装吧，我没试，猜测话题名字对的上就行
    topics: [
        {
            "id": "540d5fa5b4c4d60f94ee4ec2",
            "name": "猫",
            "link": "https://www.xiaohongshu.com/page/topics/5be14f8a59ad030001b88ce0?naviHidden=yes"
        },
        {
            "id": "5df4f5f6000000000100bbaf",
            "name": "我的猫",
            "link": "https://www.xiaohongshu.com/page/topics/5df4f5f65c25d90001e7814e?naviHidden=yes&autoPlayMedioBack=yes"
        },
        {
            "id": "5bfbcfc6dbab010001ab7570",
            "name": "新手养猫",
            "link": "https://www.xiaohongshu.com/page/topics/5bfbcfc6ca1de60001ea6d49?naviHidden=yes&autoPlayMedioBack=yes"
        }
    ],  // 话题对象1
    hashTags: [
        {
            "id": "540d5fa5b4c4d60f94ee4ec2",
            "name": "猫",
            "link": "https://www.xiaohongshu.com/page/topics/5be14f8a59ad030001b88ce0?naviHidden=yes",
            "type": 1
        },
        {
            "id": "5df4f5f6000000000100bbaf",
            "name": "我的猫",
            "link": "https://www.xiaohongshu.com/page/topics/5df4f5f65c25d90001e7814e?naviHidden=yes&autoPlayMedioBack=yes",
            "type": 1
        },
        {
            "id": "5bfbcfc6dbab010001ab7570",
            "name": "新手养猫",
            "link": "https://www.xiaohongshu.com/page/topics/5bfbcfc6ca1de60001ea6d49?naviHidden=yes&autoPlayMedioBack=yes",
            "type": 1
        }
    ],  // 话题对象2
    postLoc: {
        "poiId": "5a45ea3c81413f6d9b3d4675",
        "poiType": 3,
        "subname": "城市 | 中国 上海",
        "name": "上海"
    },  // 位置对象，不要的话，给空或者不填
    privateByUser: false  // 是否不公开。注意给true是设置为私密
};
const pub = new PubVideo(cookieP, fileConfig, pubConfig);
pub.pubVideoLoop();  // 发布视频笔记
// pub.pubImageLoop();  // 发布图文笔记，注意上面的参数，如果是发布图文笔记，imagePathList必须要有。
// pub.readVideoArg();

const api = new XhsAPI(cookieP);
// api.searchLoc('上海')  // 搜索位置
// api.searchTopic('猫')  // 搜索话题  注意，这两个接口全部返回全部是列表，拿出来之后直接丢给pubConfig就行，话题有两个对象，按key丢过去就行
// api.noteUserPost();  // 当前cookie用户，作品列表
// api.cookieStatus();  // 当前cookie是否可用
// api.registerCanvas();  // 从网页拿的cookie走一下这个接口，他会返回一个cookie。

// 注意：由于用了一个处理视频的库，在windows主机上不能运行。测试去linux上吧  已解决  已删除
