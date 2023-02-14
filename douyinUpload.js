/*
 * @Descripttion: 
 * @Author: Cool
 * @Date: 2022-12-14 00:19:08
 * @LastEditTime: 2022-12-14 00:23:53
 */
const readline = require('readline-sync');
const uuid4 = require('uuid4');
const fs = require('fs');
const requests = require('@esbiya/requests');
const tools = require('../Cool/douyin_upload_tools')

const log = console.log;
const sleep = (s) => new Promise((res, rej) => setTimeout(res, s * 1000));

class UploadFile{
    
    constructor(cookie, file_path, size=1024 * 1024 * 5, type='vod', proxy){
        this.cookie = cookie;
        this.size = size;
        this.file_path = file_path;
        this.type = type;
        this.proxy = proxy;
        // this.proxy = 'http://127.0.0.1:8866'
    }


    async upload(UploadHost, StoreUri, new_auth, uploadID){
        // 。。。
    }

    async after_upload(UploadHost, StoreUri, uploadID, partBody){
        // ...
    }

    async apply_after_upload(SessionKey, auth, x_amz_date, x_amz_security_token){
        // ...
    }

    async final_upload(video_id){
        // ...
    }

    async loop(){
        this.read_file();
        log(`${this.type} read file sync success...`)
        const s = tools.get_s();
        const x_amz_date = tools.get_date();
        const auth = await this.init_upload();
        log('init upload, get accessKeyId, secretAccessKey, sessionToken success...')
        const x_amz_security_token = auth.sessionToken;
        const cfg = await this.apply_upload(s, auth, x_amz_date, x_amz_security_token);
        log(`new auth: ${cfg.new_auth}`);
        log(`uploadUrl: https://${cfg.UploadHost}/${cfg.StoreUri}`);
        const uploadID = await this.pre_upload(cfg.UploadHost, cfg.StoreUri, cfg.new_auth);
        log(`get uploadID: ${uploadID}`);
        const partBody = await this.upload(cfg.UploadHost, cfg.StoreUri, cfg.new_auth, uploadID);
        log(`upload file success: ${partBody}`);
        await this.after_upload(cfg.UploadHost, cfg.StoreUri, uploadID, partBody);
        const file_id = await this.apply_after_upload(cfg.SessionKey, auth, x_amz_date, x_amz_security_token);
        var poster_uri;
        if (this.type == 'vod'){
            poster_uri = await this.final_upload(file_id);
        }
        const res = {
            file_id: file_id,
            poster_uri: poster_uri,
            type: this.type
        }
        log(`complate: ${JSON.stringify(res)}`);
        return res;
    }

}

class PubVideo{

    constructor(cookie, config, proxy){
        this.cookie = cookie;
        this.session = requests.session({
            cookie: cookie
        })
        this.config = config;
        this.proxy = proxy;
        this.params = {
            text_extra: [],
            text: '',
            ifLongTitle: true,
            record: 'null',
            source_info: '{}',
            mentions: '[]',
            hashtag_source: '"recommend"',
            visibility_type: 0,
            upload_source: 1,
            is_preview: 0,
            hot_sentence: '',
            knowl_id: '',
            knowl_order: 0,
            cover_text_uri: '',
            cover_text: '',
            music_source: 0,
            music_id: '',
            poster_param: '{}'
        };
        this.head_url = "https://creator.douyin.com/web/api/media/aweme/create/"
        this.create_url = "https://creator.douyin.com/web/api/media/aweme/create/?cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=zh-CN&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F95.0.4638.69+Safari%2F537.36&browser_online=true&timezone_name=Asia%2FShanghai&aid=1128";
        this.send_code_url = `https://creator.douyin.com/passport/web/send_code/?ttwid=&aid=10006&type=22&timestamp=${(new Date()).getTime()}`;
        this.sumbit_code_url = `https://creator.douyin.com/passport/web/validate_code/?ttwid=&aid=10006&type=22&timestamp=${(new Date()).getTime()}&code=`;
        this.sessionHeaders = {
            "Host": "creator.douyin.com",
            "Accept-Encoding": "identity",
            "authority": "creator.douyin.com",
            "accept": "application/json, text/plain, */*",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            "referer": "https://creator.douyin.com/creator-micro/content/publish",
            "accept-language": "zh-CN,zh;q=0.9",
            "x-secsdk-csrf-request": "1",
            "x-secsdk-csrf-version": "1.2.7",
            // "Content-Type": "application/x-www-form-urlencoded",
            "Connection": "keep-alive"
        }
    }

    async setLableObj(){
        // ...
    }

    async setParams(){
        // ...
    }

    async sendCode(){
        // ...
    }

    async sumbitCode(){
        const code = readline.question('input phone code...');
        this.sumbit_code_url = this.sumbit_code_url + code;
        const response = await this.session.get(this.send_code_url, {
            headers: this.sessionHeaders,
            proxy: this.proxy
        })
        const jsonObj = response.json();
        log(jsonObj);
    }

    async pubVideo(){
        // ...
    }

    async loop(){
        await this.setParams();
        await this.setLableObj();
        log(this.params);
        await this.pubVideo();
    }
}

// const proxy = 'http://127.0.0.1:8888';
const proxy = '';
const ck = "";
const upImageObj = new UploadFile(ck, '6.jpg', 1024 * 1024 * 5, 'imagex', proxy);
const upVideoObj = new UploadFile(ck, '4.mp4', 1024 * 1024 * 5, 'vod', proxy);
const videoMap = upVideoObj.loop();
const imageMap = upImageObj.loop();

// const videoMap = {};
// const imageMap = {};

const postConfig = {
    video_id: videoMap.file_id,
    upload_poster: videoMap.poster_uri,
    cover_optimized_uri: imageMap.file_id,
    lableList: ['test1', 'test2', 'test3'],
    lableIdList: ['', '', ''],
    // timing: '16782918827',
    area: '上海市',
    area_id: '6601124707964028931',
    download: 1,
    // mix_id: '7155725219028535332',
    // mix_order: '0',
    text: '我的小猫咪啊'
}
const pubObj = new PubVideo(ck, postConfig, proxy);
pubObj.loop()
