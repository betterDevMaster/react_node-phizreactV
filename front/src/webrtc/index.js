// require('./socket.io')
// require('./getHTMLMediaElement')
// require('./RTCMultiConnection')

class WebRTC {
    static _instance = null
    connection = null
    roomName = ""
    userName = ""
    enableCamera = true
    enableAudio = true
    owner = false
    videoQualities = [
        {
            text: "SD (360p - 1Mb/s)",
            value: { width: 480, height: 360, frameRate: 10 },
        },
        {
            text: "HD (720p - 2Mb/s)",
            value: { width: 1280, height: 720, frameRate: 10 },
        },
        {
            text: "Full HD (1080p - 4Mb/s)",
            value: { width: 1920, height: 1080, frameRate: 15 },
        },
    ]
    currentVideoQuality = this.videoQualities[0]
    audioQualities = [
        {
            text: "Narrow Band (16Kb/s)",
            value: { sampleSize: 8, channelCount: 1 },
        },
        {
            text: "Wide Band (64Kb/s)",
            value: { sampleSize: 8, channelCount: 2 },
        },
        {
            text: "Full Band (256Kb/s)",
            value: { sampleSize: 16, channelCount: 2 },
        },
    ]
    currentAudioQuality = this.audioQualities[1]
    static getInstance() {
        if (WebRTC._instance === null) {
            WebRTC._instance = new WebRTC()
        }
        return WebRTC._instance
    }
    constructor() {
        console.log("WebRTC class was initialized.")
    }
    browserDetect() {
        var nav = window.navigator,
            ua = window.navigator.userAgent.toLowerCase()
        // Detect browsers (only the ones that have some kind of quirk we need to work around)
        if (
            nav.appName.toLowerCase().indexOf("microsoft") != -1 ||
            nav.appName.toLowerCase().match(/trident/gi) !== null
        )
            return "IE"
        if (ua.match(/chrome/gi) !== null) return "Chrome"
        if (ua.match(/firefox/gi) !== null) return "Firefox"
        if (ua.match(/safari/gi) !== null) return "Safari"
        if (ua.match(/webkit/gi) !== null) return "Webkit"
        if (ua.match(/gecko/gi) !== null) return "Gecko"
        if (ua.match(/opera/gi) !== null) return "Opera"
        // If any case miss we will return null
        return null
    }
    getUserName() {
        const username = window.localStorage.getItem("userName")
        return username ? username : ""
    }
    setUserName(name) {
        window.localStorage.setItem("userName", name)
    }
    getRoomName() {
        return this.roomName
    }
    createRoom(roomName) {
        // window.localStorage.setItem('tokenName', 'phiz-meeting')
        window.localStorage.setItem("roomName", roomName)
        // window.location.href = '/#/room?username='+this.getUserName()+'&owner';
    }
    joinRoom(roomName) {
        // window.localStorage.setItem('tokenName', 'phiz-meeting')
        window.localStorage.setItem("roomName", roomName)
        // window.location.href = '/#/room?username='+this.getUserName();
    }
    toggleCamera(enable) {
        var localStream = this.connection.attachStreams[0];
        if (!enable) {
            localStream.mute('video');
        } else {
            localStream.unmute('video');
        }
    }
    toogleMute(enable, type = 0) { // 0: own, 1: friend
        if (type === 0) {
            var localStream = this.connection.attachStreams[0];
            if (!enable) {
                localStream.mute('audio');
            } else {
                localStream.unmute('audio');
            }
        }
        if (type === 1) {
            var firstRemoteStream = this.connection.streamEvents.selectFirst({ remote: true }).stream;
            if (!enable) {
                firstRemoteStream.mute('audio');
            } else {
                firstRemoteStream.unmute('audio');
            }
        }
    }
    toogleVolume(vol, type = 0) { // 0: own, 1: friend
        console.log('toogleVolume : ', vol)
        if (type === 0) {
            Object.keys(this.connection.streamEvents).forEach(function (streamid) {
                var event = WebRTC.getInstance().connection.streamEvents[streamid];
                if (event.type == "local") {
                    event.mediaElement.volume = vol / 100;
                    // var mediaElement = WebRTC.getInstance().connection.streams[streamid].mediaElement;
                    // if (mediaElement) mediaElement.volume = vol;
                }
            });
        }
        if (type === 1) {
            Object.keys(this.connection.streamEvents).forEach(function (streamid) {
                var event = WebRTC.getInstance().connection.streamEvents[streamid];
                if (event.type == "remote") {
                    event.mediaElement.volume = vol / 100;
                    // var mediaElement = WebRTC.getInstance().connection.streams[streamid].mediaElement;
                    // if (mediaElement) mediaElement.volume = vol;
                }
            });
        }
    }
    exitRoom() {
        // this.connection.streams['streamid'].stop();
        this.connection.attachStreams.forEach(function(stream) {
            stream.stop();
        });
    }
    updateStreamMode() {
        // get getUserMedia mode
        let mode = { video: false, audio: false }
        if (this.currentVideoDevice) {
            mode.video = {}
            mode.video.deviceId = this.currentVideoDevice.value
            mode.video.width = this.currentVideoQuality.value.width
            mode.video.height = this.currentVideoQuality.value.height
            mode.video.frameRate = this.currentVideoQuality.value.frameRate
        }
        if (this.currentAudioDevice) {
            mode.audio = {}
            mode.audio.deviceId = this.currentAudioDevice.value
            mode.audio.sampleSize = this.currentAudioQuality.value.sampleSize
            mode.audio.channelCount = this.currentAudioQuality.value.channelCount
        }
        this.currentContraintMode = mode
    }
    onStreamConfigurationChange() {
        this.updateStreamMode()
        const local = window.easyrtc.getLocalStream()
        // local.getTracks().forEach(track=>{track.stop()})
        navigator.mediaDevices
            .getUserMedia(this.currentContraintMode)
            .then((stream) => {
                // replace local stream
                stream.getTracks().forEach((track) => {
                    local.addTrack(track)
                })
                const video_me = document.getElementById(local.id)
                // console.log('onStreamConfigurationChange : ====== ',video_me);
                window.easyrtc.setVideoObjectSrc(video_me, stream)
                // send it to remote
                const peers = window.easyrtc.getPeerConnections()
                for (const id in peers) {
                    console.log("peers : ====== ", peers)

                    const peer = peers[id]
                    if (peer.cancelled) continue
                    peer.pc.getSenders().map((sender) => {
                        // console.log(id, sender);
                        sender.replaceTrack(
                            stream.getTracks().find((track) => {
                                return track.kind === sender.track.kind
                            })
                        )
                    })
                }
            })
    }
    async updateDevices() {
        try {
            let audio = []
            let video = []
            const devices = await navigator.mediaDevices.enumerateDevices()
            for (const dev of devices) {
                if (dev.kind === "audioinput") {
                    const found = audio.filter(
                        (ele) => ele.text.indexOf(dev.label) === 0
                    )
                    if (found.length > 0)
                        audio = [
                            ...audio,
                            {
                                text: dev.label + "-" + found.length,
                                value: dev.deviceId,
                            },
                        ]
                    else
                        audio = [
                            ...audio,
                            { text: dev.label, value: dev.deviceId },
                        ]
                }
                if (dev.kind === "videoinput") {
                    const found = video.filter(
                        (ele) => ele.text.indexOf(dev.label) === 0
                    )
                    if (found.length > 0)
                        video = [
                            ...video,
                            {
                                text: dev.label + "-" + found.length,
                                value: dev.deviceId,
                            },
                        ]
                    else
                        video = [
                            ...video,
                            { text: dev.label, value: dev.deviceId },
                        ]
                }
            }
            this.videoDevices = video
            this.audioDevices = audio
        } catch (e) {}
    }
    async startRoom(room, userName, resolutions) {
        this.connection = new window.RTCMultiConnection()

        // by default, socket.io server is assumed to be deployed on your own URL
        this.connection.socketURL = "http://localhost:9000/"

        // comment-out below line if you do not have your own socket.io server
        this.connection.socketMessageEvent = "phiz-meeting"

        this.connection.session = {
            audio: true,
            video: true,
        }

        this.connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
        }

        // STAR_FIX_VIDEO_AUTO_PAUSE_ISSUES
        var bitrates = 512
        var videoConstraints = {}

        if (resolutions == "HD") {
            videoConstraints = {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                frameRate: 30,
            }
        }

        if (resolutions == "Ultra-HD") {
            videoConstraints = {
                width: { ideal: 1920 },
                height: { ideal: 1080 },
                frameRate: 30,
            }
        }
        this.connection.mediaConstraints = { video: videoConstraints, audio: true }
        var CodecsHandler = this.connection.CodecsHandler

        this.connection.processSdp = function (sdp) {
            var codecs = "vp8"

            if (codecs.length) {
                sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase())
            }

            if (resolutions == "HD") {
                sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
                    audio: 128,
                    video: bitrates,
                    screen: bitrates,
                })

                sdp = CodecsHandler.setVideoBitrates(sdp, {
                    min: bitrates * 8 * 1024,
                    max: bitrates * 8 * 1024,
                })
            }

            if (resolutions == "Ultra-HD") {
                sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
                    audio: 128,
                    video: bitrates,
                    screen: bitrates,
                })

                sdp = CodecsHandler.setVideoBitrates(sdp, {
                    min: bitrates * 8 * 1024,
                    max: bitrates * 8 * 1024,
                })
            }

            return sdp
        }
        // END_FIX_VIDEO_AUTO_PAUSE_ISSUES

        // https://www.rtcmulticonnection.org/docs/iceServers/
        // use your own TURN-server here!
        this.connection.iceServers = [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun.l.google.com:19302?transport=udp",
                ],
            },
        ]

        this.connection.onstream = function (event) {
            var existing = document.getElementById(event.streamid)
            if (existing && existing.parentNode) {
                existing.parentNode.removeChild(existing)
            }

            var numberOfUsers = WebRTC.getInstance().connection.getAllParticipants().length;

            // WebRTC.getInstance().connection.getAllParticipants().forEach(function(participantId) {
            //     var user = WebRTC.getInstance().connection.peers[participantId];
            //     var hisFullName = user.extra.fullName;
            //     var hisUID = user.userid;
            //     var hisNativePeer = user.peer;
            //     var hisIncomingStreams = user.peer.getRemoteStreams();
            //     var hisDataChannels = user.channels;
            //     console.log('getAllParticipants : participantId: ', user, hisFullName, hisUID, hisNativePeer, hisIncomingStreams, hisDataChannels)

            // });

            var video = null
            if (numberOfUsers === 0)
                video = document.getElementsByClassName("o-c-video")[0]
            else if (numberOfUsers === 1)
                video = document.getElementsByClassName("f-c-video")[0]

            if (event.type === "local") {
                video.volume = 0
                try {
                    video.setAttributeNode(document.createAttribute("muted"))
                } catch (e) {
                    video.setAttribute("muted", true)
                }
            }
            video.srcObject = event.stream

            if (event.type === "local") {
                WebRTC.getInstance().connection.socket.on("disconnect", function () {
                    
                    if (!WebRTC.getInstance().connection.getAllParticipants().length) {
                        window.location.reload()
                    }
                })
            }
        }

        this.connection.onstreamended = function (event) {
            var mediaElement = document.getElementById(event.streamid)
            console.log('onStreamEnded ---------------- : ', mediaElement)
            if (mediaElement) {
                mediaElement.parentNode.removeChild(mediaElement)
            }
        }

        this.connection.onMediaError = function (e) {
            if (e.message === "Concurrent mic process limit.") {
                if (window.DetectRTC.audioInputDevices.length <= 1) {
                    alert(
                        "Please select external microphone. Check github issue number 483."
                    )
                    return
                }

                var secondaryMic = window.DetectRTC.audioInputDevices[1].deviceId
                WebRTC.getInstance().connection.mediaConstraints.audio = {
                    deviceId: secondaryMic,
                }

                WebRTC.getInstance().connection.join(WebRTC.getInstance().connection.sessionid)
            }
        }
    }
}
export default WebRTC
