import React, { Component } from 'react'
import userData from '../../data/userData.json';
import $ from "jquery"
import ModalUserProfile from "../build/userprofile/index"
import Button from "@material-ui/core/Button"
import RoomGame from "./roomGame"
import { P } from "../styles"

export class MainContent extends Component {
    constructor(props){
        super(props);
        this.routeChange = this.routeChange.bind(this)
        this.shareBoxShow = this.shareBoxShow.bind(this)
        this.handleModal = this.handleModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.remove_arr = this.remove_arr.bind(this)
        this.add_arr = this.add_arr.bind(this)
        this.handleShare = this.handleShare.bind(this)
        this.handleLeftSidebar = this.handleLeftSidebar.bind(this)
        this.handlecloseWindow = this.handlecloseWindow.bind(this)
        this.swichHandler = this.swichHandler.bind(this)
        this.showVideo = this.showVideo.bind(this)
        this.swichUC = this.swichUC.bind(this)
        this.modal_user_profile = this.modal_user_profile.bind(this)
        this.camaraSetting = this.camaraSetting.bind(this)
        this.selectEmoji = this.selectEmoji.bind(this)
    }

    selectEmoji(emoji) {
        console.log(emoji)
        this.setState({ selectedemoji: emoji }, () => {
            $(".selected-emoji-wrapper").toggleClass("dn")
            setTimeout(() => {
                $(".selected-emoji-wrapper").toggleClass("dn")
                this.setState({ selectedemoji: "" })
            }, 2500)
            $(".chated-emmoji").css("pointer-events", "none")
            setTimeout(() => {
                $(".chated-emmoji").css("pointer-events", "all")
            }, 2500)
        })
    }

    swichHandler(name, i) {
        if (name === "video") {
            var imgurl1 =
                this.props.data.vSt === "../../assets/icons/video.svg"
                    ? "../../assets/icons/video-off.svg"
                    : "../../assets/icons/video.svg"
            this.setState({ vSt: imgurl1 })
            var v_show =
                this.props.data.vSt === "../../assets/icons/video.svg"
                    ? "flex"
                    : "none"
            document.getElementsByClassName("own-videoStop")[
                i
            ].style.display = v_show
        } else if (name === "mute") {
            var imgurl2 =
                this.props.data.mSt === "../../assets/icons/mute.svg"
                    ? "../../assets/icons/mic-mute.svg"
                    : "../../assets/icons/mute.svg"
            var m_show =
                this.props.data.mSt === "../../assets/icons/mute.svg"
                    ? "block"
                    : "none"
            this.setState({ mSt: imgurl2 })
            document.getElementsByClassName("mic-mute-show")[
                i
            ].style.display = m_show
        } else {
            var dis =
                document.getElementsByClassName("volume-control-range")[i].style
                    .display === "block"
                    ? "none"
                    : "block"
            document.getElementsByClassName("volume-control-range")[
                i
            ].style.display = dis
        }
    }

    swichUC(name, i) {
        console.log(name, i)
        if (name === "volum") {
            var dis =
                document.getElementsByClassName("own-volum-warraperA")[i].style
                    .display === "block"
                    ? "none"
                    : "block"
            document.getElementsByClassName("own-volum-warraperA")[
                i
            ].style.display = dis
        } else if (name === "mute") {
            var umic =
                document.getElementsByClassName("users-mic-mute")[i].style
                    .display === "block"
                    ? "none"
                    : "block"
            document.getElementsByClassName("users-mic-mute")[
                i
            ].style.display = umic
        } else if (name === "video") {
            var v_show =
                document.getElementsByClassName("user-camera")[i].style
                    .display === "flex"
                    ? "none"
                    : "flex"
            document.getElementsByClassName("user-camera")[
                i
            ].style.display = v_show
        }
    }

    showVideo(i) {
        document.getElementsByClassName("own-videoStop")[i].style.display =
            "none"
        this.setState({ vSt: "../../assets/icons/video.svg" })
    }

    remove_arr(index) {
        console.log('contact-user : ------', $(".contact-user").length)

        if ($(".contact-user").length > 2) {
            $(".connected-users").css("height", "auto")
            $(".connected-users").css("border-top", "2px solid #393d56")
            $(".connected-users").css("justify-content", "flex-end")
        } else {
            $(".connected-users").css("height", "330px")
            $(".connected-users").css("border-top", "0px solid #393d56")
            $(".connected-users").css("justify-content", "center")
        }

        if ($(".shareMediaWrapper").height() <= 0) {
            let arr = this.props.data.users
            let arr1 = arr.splice(index, 1)
            this.setState({ users: arr })
            let arr2 = this.props.data.t_users.concat(arr1)
            this.setState({ t_users: arr2 })

            if ($(".own-captuer").css("position") === "absolute") {
                $(".own-captuer").css("position", "relative")
                $(".own-captuer").css("bottom", "0")
                $(".own-captuer").css("right", "0")
                $(".content-footer").css("margin-right", "0")
                $(".join-now-btn").css("margin-left", "0")
            }
        }
    }

    add_arr(index) {
        console.log($(".contact-user").length)

        if ($(".contact-user").length === 1) {
            $(".connected-users").css("border-top", "0px solid #393d56")
            $(".own-captuer").css("position", "absolute")
            $(".own-captuer").css("bottom", "42px")
            $(".own-captuer").css("right", "36.5px")
            $(".content-footer").css("margin-right", "280px")
            $(".join-now-btn").css("margin-left", "14%")
        }

        let arr = this.props.data.t_users
        let arr1 = arr.splice(index, 1)
        let arr2 = this.props.data.users.concat(arr1)
        this.setState({ users: arr2 })
    }

    routeChange() {
        let path = `/dashboard/home`
        this.props.history.push(path)
    }

    shareBoxShow() {
        $(".sharededVideo").css("display", "none")
        $(".sharededGame").css("display", "none")
        if (this.props.data.flag1) {
            $(".share-item-wraper").slideToggle()
            $(".full-background").toggle()
        } else {
            this.setState({ flag1: true })
            $("#modal-youtubeLink").css("display", "none")
            $("#modal-youtube").css("display", "none")
            $("#modal-game").css("display", "none")
            $(".share-item-wraper").slideToggle()
        }
    }

    handleModal(name) {
        this.setState({ flag1: !this.props.data.flag1 })
        if (name === "youtubelink") {
            $("#modal-youtubeLink").slideToggle()
            $(".share-item-wraper").slideToggle()
        }
        if (name === "youtube") {
            $("#modal-youtube").slideToggle()
            $(".share-item-wraper").slideToggle()
        }
        if (name === "game") {
            $("#modal-game").slideToggle()
            $(".share-item-wraper").slideToggle()
        }
    }

    handleShare(m_type) {
        if (m_type === "y_share") {
            $("#modal-youtube").slideToggle()
            $(".sharededVideo").css("display", "block")
        }

        if (m_type === "game") {
            $("#modal-game").slideToggle()
            $(".sharededGame").css("display", "block")
        }
    }

    camaraSetting() {
        $("#modal-camera-setting").slideToggle()
        $(".full-background").toggle()
        this.setState({ ca_setting: !this.props.data.ca_setting })
        if (this.props.data.ca_setting) {
        }
    }

    closeModal() {
        this.setState({ flag1: true })
        $(".share-item-wraper").css("display", "none")
        $(".full-background").css("display", "none")
        $("#modal-youtubeLink").css("display", "none")
        $("#modal-youtube").css("display", "none")
        $("#modal-game").css("display", "none")
        $("#modal-user-profile").css("display", "none")
        $("#modal-camera-setting").css("display", "none")
    }

    handleLeftSidebar() {
        if (this.props.data.rsvState) {
            $(".users-item-body").addClass("resizeActive")
        } else {
            $(".users-item-body").removeClass("resizeActive")
            $(".exit-icon-wraper").css("transform", "translate(0px, 0px)")
        }
        this.setState({ rsvState: !this.props.data.rsvState })
    }

    handlecloseWindow() {
        if (this.props.data.rsvState) {
            $(".item-f").css("border", "2px solid #ff8300")
        } else {
            $(".item-f").css("border", "none")
            $(".exit-icon-wraper").css("transform", "translate(2px, -36px)")
        }
    }

    showProfile(index) {
        console.log(index)
        $("#modal-user-profile").slideToggle()
        $(".full-background").toggle()
        this.setState({ userId: index })
    }

    modal_user_profile(index) {
        return <ModalUserProfile userId={this.props.data.userId} />
    }

    render() {
      console.log('this.props : ', this.props.data, this.props.data.t_users, this.props.data.roomGame)

        return (
            <>
            <div className="promote-content">
            <div className="content-header">              
              <div className="row">
                <div className="headeer-top-left col-6 horizontal-center">
                  <div className="header-img-body">
                    <img src={"../../assets/roomImg/room-party.jpg"} alt='' width={"98"}></img>
                  </div>
                  <div className="header-left-content ml-3">
                    <h6 className="mb-1"> Gaming Room</h6>
                    <p className="">We are a group of gamers, we'd like to talk about games and other things related to the gaming world, if you are a gamer join now!</p>
                    <div style={{display:"flex"}}>
                      <Button className="g-back p-0 bunHover" variant="contained">FOLLOW</Button>
                      <Button className="g-back p-0 ml-3 bunHover" variant="contained" id="share">SHARE</Button>
                    </div>
                  </div>
                </div>
                <div className="header-top-right col-6">
                  <div className="w-h-fitcontent shareFriendProfile mb-2">
                    <img src={"../../assets/profile/avata3.png"} alt='' width={"40"}></img>
                    <img src={"../../assets/profile/avata4.png"} alt='' width={"40"}></img>
                    <img src={"../../assets/profile/avata5.png"} alt='' width={"40"}></img>
                    <img src={"../../assets/profile/avata6.png"} alt='' width={"40"}></img> 
                    <div className="assShareBtn ml-2"><img src={"../../assets/popula/Ellipse 34.svg"} width={"40"} height={"40"} alt=''></img> </div>                  
                  </div>
                  <div className="horizontal-center w-h-fitcontent mr-4">
                    <div className="statue-display-panel">24<span>/</span>30</div>
                    <div className="statue-display-panel ml-3">
                      <span>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"/>
                          <path fillRule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                      </span>67
                    </div>
                  </div>
                </div>
              </div>              
            </div>
            
            <div className={(this.props.data.roomGame)?"dn":"content-middle"}>
              <div className="horizontal-top user-photo-items">
                { 
                  this.props.data.users.map((user,i)=>{
                    return (
                    <div className="user-face-item pos-re" key={i} onMouseLeave={()=>{
                      document.getElementsByClassName('volume-control-range')[i].style.display='none';
                    }}> 
                      <div className="own-img-wrapper" onClick={()=>this.remove_arr(i)}>                     
                        <img src={user.profile} alt="userface" style={{width:"129px", height:"129px", }}/>
                      </div>
                      <div className="chat-control pos-ab hidden-toggle" style={{ display:"none", bottom:"8px", justifyContent:"space-around", padding:"0 15px" }}>
                        <img  src={this.props.data.vSt} alt="" style={{width:"20px"}} onClick={()=>this.swichHandler('video',i)}/>                                                     
                        <img  src={this.props.data.mSt} alt="" style={{width:"20px"}} onClick={()=>this.swichHandler('mute',i)}/>
                        <img  src={this.props.data.voSt} alt="" style={{width:"20px"}} onClick={()=>this.swichHandler('volum',i)}/>
                      </div>
                      <div className="mic-mute-show pos-ab" style={{top:'10px', left:'10px', width:'27px', height:'30px', display:'none'}} >
                        <img src={'../../assets/icons/captuer-mute-shawdow.png'} style={{width:"100%", height:"100%"}} alt=''></img>
                      </div>
                      <div className="own-videoStop pos-ab" style={{top:'0',left:'0', cursor:'pointer'}} onClick={()=>this.showVideo(i)}>
                        <div className="own-videoStop-icon" style={{width:'40px'}}></div>
                      </div>
                      <div className="volume-control-range pos-ab" style={{display:'none'}}>
                        <div className="slidecontainer">
                          <input type="range" min="1" max="100" className="sliderA" id="myRange"/> 
                          <img src={'../../assets/icons/range-back.png'} className="range-back" alt=''></img>
                        </div>
                      </div>
                    </div>
                    )
                  })
                }   
              </div>  
              <div className="mediaShare">
                <div className="shareMediaWrapper">
                  <div className="sharededVideo m-shared pos-re" style={{display:"none"}}>
                    { 
                      this.props.data.shardedvideo.map((s_video,j)=>{
                        return (
                            <iframe title="youtube1" key={j} width="500px" height="288px" src={s_video.url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        )
                      })
                    }
                    <div className="close-shared-window g-back bunHover pos-ab">
                      <div className="close-icon"></div>
                    </div>
                  </div>
                  <div className="sharededGame m-shared pos-re" style={{display:"none"}}>
                    {
                      this.props.data.shardedgame.map((s_game,k)=>{
                        return(
                          <img key={k} src={s_game.url} alt="game" width={"500px"} />
                        )
                      })
                    }
                    <div className="close-shared-window g-back bunHover pos-ab">
                      <div className="close-icon"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="connected-users">
                {
                  this.props.data.t_users.map((user,i)=>{
                    return(
                      <div className="contact-user" key={i}>
                        <div className="own-img-wrapper" onClick={()=>this.add_arr(i)}>
                          <img  src={user.profile} alt=""/>  
                          <div className="own-videoStop pos-ab user-camera" style={{top:'0',left:'0', cursor:'pointer', borderRadius:"10px"}} onClick={()=>this.swichUC("own",i)}>
                            <div className="own-videoStop-icon" style={{width:'80px'}}></div>
                          </div>  
                        </div>
                        
                        <div className="chat-control pos-ab user-control" style={{zIndex:""}}>
                          <div className="control-icon g-back" onClick={()=>this.swichUC('volum',i)}>
                            <img  src={"../../assets/icons/volum.png"} alt="" style={{width:"28px", height:"28px"}}/>
                          </div>
                          <div className="control-icon g-back" onClick={()=>this.swichUC('mute',i)}>
                            <img  src={"../../assets/icons/mute.png"} alt="" style={{width:"28px", height:"28px"}}/>
                          </div>
                          <div className="control-icon g-back" onClick={()=>this.swichUC('video',i)}>
                            <img  src={"../../assets/icons/video.png"} alt="" style={{width:"25px", height:"15px"}}/>
                          </div>
                          <div className="own-volum-warraperA pos-ab" style={{display:'none'}}>
                            <div className="own-volum own-control">
                              <div className="slidecontainer">
                                <input type="range" min="1" max="100" className="sliderA" id="myRange"/> 
                                <img src={'../../assets/icons/range-back.png'} className="range-back" style={{height:"20px",top:"28px" }} alt=""></img>
                              </div>
                            </div>
                          </div>                   
                        </div>
                        <div className="users-mic-mute pos-ab" style={{top:'10px', left:'2px', width:'56px', height:'53px', display:'none'}} >
                              <img src={'../../assets/icons/captuer-mute-shawdow.png'} style={{width:"100%", height:"100%"}} alt=""></img>
                        </div>                  
                      </div>
                    )
                  })
                } 
                <div className="own-captuer" style={{display:"none"}}>
                  <div className="own-control-wraper">
                    <div className="own-img-wrapper">
                      <video className="webcam-view-large" autoPlay={true} id="videoElement" controls></video>
                      <div className="own-videoStop pos-ab own-camera" style={{top:'0',left:'0', cursor:'pointer', borderRadius:"10px"}}>
                        <div className="own-videoStop-icon" style={{width:'80px'}}></div>
                      </div> 
                      <div className="selected-emoji-wrapper dn" >                        
                        <p className="wave">{String.fromCodePoint(this.props.data.selectedemoji)}</p>
                      </div>
                    </div>
                    <div className="own-mic-mute pos-ab" style={{top:'10px', left:'2px', width:'56px', height:'53px', display:'none'}} >
                        <img src={'../../assets/icons/captuer-mute-shawdow.png'} style={{width:"100%", height:"100%"}} alt=""></img>
                    </div>           
                  </div>
                </div> 
              </div>
              
              <div className="emmoji-show pos-ab" style={{bottom:"111px", left:"32%"}}>                        
                        <div className="emmoji-wraper">
                            <div className="getmore-wrapper">
                                <div className="getmorebtn g-back bunHover">Get More</div>
                            </div>
                            <div className="pt-0 emmojis-items">
                            { 
                                this.props.data.emmojis.map((emmoji,i)=>{
                                    return (
                                    <p className="chated-emmoji" key={i} onClick={()=>this.selectEmoji(emmoji)}>{String.fromCodePoint(emmoji)}</p>
                                    )
                                })
                            }
                            </div>
                        </div>
                </div>
            </div>

            {(this.props.data.roomGame)&&<RoomGame />}

            <div className={(this.props.data.roomGame)?"dn":"content-footer p-2"}>              
              <div className="share-btn content-footer-btn" onClick={this.shareBoxShow}>
                <div className="share-icon"></div>
                Share
              </div> 
              <div className="g-back join-now-btn bunHover" onClick={this.camaraSetting}> Join Now</div>
              <div className="own-controll" style={{display:"none"}}>
                      <div className="instant-room-button-container" 
                        onClick={()=>{
                          var omic = (document.getElementsByClassName('own-mic-mute')[0].style.display === 'block')?'none':'block';
                          document.getElementsByClassName('own-mic-mute')[0].style.display=omic;
                          if(this.props.data.own){
                              $('.mic-icon').css('background-color', '#ff8300');
                              $('.mic-text').css('color', '#ff8300'); 
                              this.setState({own:!this.props.data.own});
                          }else{
                              $('.mic-icon').css('background-color', '#4E5165');
                              $('.mic-text').css('color', '#4e5165');
                              this.setState({own:true});
                          }
                        }}> 
                            <div className="mic-icon"/>
                            <P fontSize="17px" className='mic-text'>Mute</P>                            
                      </div>

                      <div className="instant-room-button-container" 
                      onClick={()=>{
                          var v_show = (document.getElementsByClassName('own-camera')[0].style.display === 'flex')?'none':'flex';
                          document.getElementsByClassName('own-camera')[0].style.display=v_show;
                          if(this.props.data.own){
                            $('.camera-icon').addClass('uncamera');
                            $(".stop-video-text").css('color','#ff8300');
                            this.setState({own:!this.props.data.own});
                          }else{
                            $('.camera-icon').removeClass('uncamera');
                            $(".stop-video-text").css('color','#4e5165');
                            this.setState({own:true});
                          }
                        }}>
                            <div className="camera-icon"/>
                            <P fontSize="17px" className="stop-video-text">Stop video</P>
                      </div>

                      <div className="instant-room-button-container" 
                          onClick={()=>{
                            if(this.props.data.own){
                              $('.emmoji-show').slideToggle();
                              $('.emoji-icon').css('background-color', '#ff8300');
                              $('.emmoji-text').css('color', '#ff8300'); 
                              this.setState({own:!this.props.data.own}); 
                            }else{
                              $('.emmoji-show').slideToggle();
                              $('.emoji-icon').css('background-color', '#4E5165');
                              $('.emmoji-text').css('color', '#4E5165'); 
                              this.setState({own:!this.props.data.own}); 
                            }
                          }}>
                            <div className="emoji-icon"/>
                            <P fontSize="17px" className="emmoji-text">Emojis</P>
                        </div> 

              </div>
              <div className="excute-show excute-big"></div>
            </div>

            <div className="share-item-wraper">
                <h4>Live Sharing </h4>
                <div className="sh-items">
                  <div className="sh-item" onClick={()=>this.handleModal("youtubelink")} >
                    <div className="s-icon s-youtube-link-icon"></div>
                    <div className="s-text">Youtube Link</div>
                  </div>
                  <div className="sh-item" onClick={()=>this.handleModal("youtube")}>
                    <div className="s-icon s-youtube-icon"></div>
                    <div className="s-text">Youtube</div>
                  </div>
                  <div className="sh-item" onClick={()=>this.handleModal("game")}>
                    <div className="s-icon s-gameplay-icon"></div>
                    <div className="s-text">Gameplay</div>
                  </div>
                  <div className="sh-item">
                    <div className="s-icon s-music-icon"></div>
                    <div className="s-text">Music</div>
                  </div>
                  <div className="sh-item">
                    <div className="s-icon s-shopping-icon"></div>
                    <div className="s-text">Shopping</div>
                  </div>
                  <div className="sh-item">
                    <div className="s-icon s-browse-icon"></div>
                    <div className="s-text">Browse</div>
                  </div>
                  <div className="sh-item">
                    <div className="s-icon s-image-icon"></div>
                    <div className="s-text">Images</div>
                  </div>                  
                  <div className="sh-item">
                    <div className="s-icon s-screen-icon"></div>
                    <div className="s-text">Share Screen</div>
                  </div>
                </div>
            </div>
        </div>
            </>
        )
    }
}

export default MainContent
