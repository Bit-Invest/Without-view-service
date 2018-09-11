import React, { Component } from 'react'
import logo from '../../../assets/images/Logo_White_with_title.svg'
import video from '../../../assets/images/new_mainBlock_screen.png'
import bitcointalk_icon from '../../../assets/images/socials/bitcointalk_icon.png';
import youtube_icon from '../../../assets/images/socials/youtube_icon.png'
import instagram_icon from '../../../assets/images/socials/instagram_icon.png'
import facebook_icon from '../../../assets/images/socials/facebook_icon.png'
import reddit_icon from '../../../assets/images/socials/reddit_icon.png'
import telegram_icon from '../../../assets/images/socials/telegram_icon.png'
import twitter_icon from '../../../assets/images/socials/twitter_icon.png'
import medium_icon from '../../../assets/images/socials/medium_icon.png'
import linkedin_icon from '../../../assets/images/socials/linkedin_icon.png'
import github_icon from '../../../assets/images/socials/github_icon.png'
import weibo_icon from '../../../assets/images/socials/weibo_icon.png'

import { objectLangs, lng } from '../../../lngs/index'

const ROOT_NAME = 'mobile-stub'

class MobileStub extends Component {
    state = {
        isOpenFrame: false
    }

    render() {
        return (
            <div className={ROOT_NAME}>
                <img src={logo} className={`${ROOT_NAME}__logo`} />
                <div className={`${ROOT_NAME}__header`}>{ objectLangs[lng]['MobileStub#1'] }</div>
                <div className={`${ROOT_NAME}__block-video`}>
                    <div className={`${ROOT_NAME}__watch`}>{ objectLangs[lng]['MobileStub#2'] }</div>
                    <div className={`${ROOT_NAME}__video`}>
                        { this.state.isOpenFrame ?
                            <iframe src="https://player.vimeo.com/video/286746544?autoplay=1" frameBorder="0" allowFullScreen></iframe> :
                            <img className={`${ROOT_NAME}__video`} src={video} onClick={() => this.setState({ isOpenFrame: true })} />
                        }
                    </div>
                </div>
                <a href="https://my.cindx.io/" target="_blank" className={`${ROOT_NAME}__block-button`}>
                    <div>{ objectLangs[lng]['MobileStub#3'] }</div>
                </a>
                <div className={`${ROOT_NAME}__block-social`}>
                    <div className={`${ROOT_NAME}__follow`}>{ objectLangs[lng]['MobileStub#4'] }</div>
                    <div className={`${ROOT_NAME}__socials`}>
                        <a target="_blank" href="https://bitcointalk.org/index.php?topic=4421275.0">
                            <img className="icon" src={bitcointalk_icon} alt={"CINDEX"}/>
                        </a>
                        <a target="_blank" href="https://www.youtube.com/cindx">
                            <img className="icon" src={youtube_icon} alt={"CINDEX"}/>
                        </a>
                        <a target="_blank" href="https://www.instagram.com/cindx.io/">
                            <img className="icon" src={instagram_icon} alt={"CINDEX"}/>
                        </a>
                        <a target="_blank" href="https://www.reddit.com/r/cindx/">
                            <img className="icon" src={reddit_icon} alt={"CINDEX"}/>
                        </a>
                        <a target="_blank" href="https://t.me/cindx_official">
                            <img className="icon" src={telegram_icon} alt={"CINDEX"}/>
                        </a>
                        <a target="_blank" href="https://twitter.com/CINDXPlatform">
                            <img className="icon" src={twitter_icon} alt={"CINDEX"}/>
                        </a>
                        <a target="_blank" href="https://www.github.com/Bit-Invest/Cindx-frontend">
                            <img className="icon" src={github_icon} alt={"CINDEX"}/>
                        </a>
                        <br/>
                        <a target="_blank" href="https://www.facebook.com/cindx.io/">
                            <img className="icon" src={facebook_icon} alt={"CINDEX"}/>
                        </a>
                        <a target="_blank" href="https://medium.com/cindx">
                            <img className="icon" src={medium_icon} alt={"CINDEX"}/>
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/company/cindx/">
                            <img className="icon" src={linkedin_icon} alt={"CINDEX"}/>
                        </a>
                        <a target="_blank" href="https://m.weibo.cn/profile/6606802462">
                            <img className="icon" src={weibo_icon} alt={"CINDEX"}/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default MobileStub