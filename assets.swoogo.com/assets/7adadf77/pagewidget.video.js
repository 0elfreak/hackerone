(function($){class PageWidgetVideo{_target=$();_startInterval=null;$playButton=$();$muteButton=$();$unmuteButton=$();$ccButton=$();$controls=$();$controlsContainer=$();loaded=!1;screenWidth=screen.width;widgetId;unMutedSuccess=!1;loadTime;videoEnded=!1;playStarted=!1;$screenshotContainer=$();constructor(options){this._target=options._target;this.widgetId=this._target.attr("id");this.options=options;this.videoType=this.options.videoType;this.$screenshotContainer=this._target.find(this.options.screenshotContainer);if(this.options.lightbox){this.initModal()}else{this.load()}}
load(){(async()=>{((require,define,requirejs)=>{require([`players/${this.videoType}`],(Player)=>{const startInterval=setInterval(async()=>{const now=(new Date()).getTime();if(!this.options.startTime||now>=this.options.startTime){clearInterval(startInterval);if(!this.loaded){try{await this.initEmbedCode();this.$unmuteButton=this._target.find(this.options.unmuteButton);this.$muteButton=this._target.find(this.options.muteButton);this.$playButton=this._target.find(this.options.playButton);if(this.options.closedCaptions){this.$ccButton=this._target.find(this.options.ccButton)}
this.$controls=this._target.find(this.options.controlsSelector);this.$controlsContainer=this._target.find(this.options.controlsContainerSelector);if(this.options.startTime&&now>=this.options.startTime){this.options.startPosition=(now-this.options.startTime)/1000}
if(this.isMobile){this.$widgetContainer.addClass("is-mobile");this.$videoElement.addClass("no-default-mute")}
if(this.isMobile&&this.isSimulive){this.$mobileOverlay.addClass("active");this.$widgetContainer.addClass("broadcast");this.$videoElement.addClass("mobile-player")}
if((this.isMobile)&&(this.videoType==="wistia")){this._target.addClass("wistia-ios")}
this.player=new Player(this._target);await this.player.load();this.$controlsContainer.show();this.registerListeners();this.loaded=!0;this._target.trigger("loaded.pagewidget")}catch(err){if(typeof(newrelic)!=="undefined"){newrelic.noticeError(err,{video_type:`${this.videoType}`})}else{console.info("error",err)}}}
this.onLoad()}},1000)},()=>console.warn(`${this.videoType} is not supported`))})(__require.require,__require.define,__require.requirejs)})()}
initModal(){const $modal=$(`#${this.widgetId}-modal`);const $body=$modal.find('.modal-body');const initContent=$body.html();$modal.on('hidden.bs.modal',(e)=>{if($(e.target).closest('.modal-body').length){$('body').addClass('modal-open')}
$body.empty();this.loaded=!1;this.$screenshotContainer.show();$(e.currentTarget).attr(`tabindex`,`-1`)});$modal.on('show.bs.modal',(e)=>{if($('.arena-chat-widget--container').length){$(e.currentTarget).attr(`tabindex`,``)}
$body.html(initContent)});$modal.on('shown.bs.modal',(e)=>{this.load()});$modal.on('click',(e)=>{if(e.target.getAttribute('id')===`${this.widgetId}-modal`||$(e.target).parent().hasClass('close')){$modal.modal('hide')}})}
initEmbedCode(){return new Promise(resolve=>{const $screenshotThumb=this._target.find('.video-thumb');if($screenshotThumb.length||this.$widgetContainer.hasClass('modal-body')){if(!this.options.lightbox){$screenshotThumb.remove()}
resolve((this.$widgetContainer.html($(`${this.options.embedHtml}`))))}else{resolve(!0)}})}
registerListeners(){if(this.hasControls){this.$unmuteButton.on("click",$.proxy(this.onUnmuteClick,this))}
if(this.hasControls&&this.isSimulive){this.$playButton.on("click",$.proxy(this.onPlayToggle,this));this.$muteButton.on("click","i",$.proxy(this.onAudioToggle,this));if(this.options.closedCaptions){this.$ccButton.on("click",$.proxy(this.onClosedCaptionToggle,this))}
this._target.on("input",this.options.volumeButton,$.proxy(this.onVolumeUpdate,this));this.bindAccessibility()}
this._target.on('keypress.video',$.proxy(this.onAudioToggle,this));this._target.on('cc.video',$.proxy(this.onClosedCaptionToggle,this));this._target.on('playing.video',$.proxy(this.onPlayingVideo,this));this._target.on('paused.video',$.proxy(this.onPausedVideo,this));this._target.on('ended.video',$.proxy(this.onEndedVideo,this));this._target.on('mute.video',$.proxy(this.onMuteVideo,this));this._target.on('unmute.video',$.proxy(this.onUnmuteVideo,this))}
bindAccessibility(){const checkForClick=(e)=>{$(`#${this.widgetId}`).removeClass(`range-active`);$(`#${this.widgetId}`).removeClass(`active-container`);document.removeEventListener(`keydown`,bindKeypress,!0);document.removeEventListener(`click`,checkForClick,!0)};const bindKeypress=(e)=>{if(e.keyCode===85||e.keyCode===32){e.preventDefault();if(this.$unmuteButton.length){this.$unmuteButton.remove()}
this._target.trigger(`keypress.video`)}
if(this.options.closedCaptions&&e.keyCode===67){e.preventDefault();this._target.trigger(`cc.video`)}
if(e.keyCode===70){e.preventDefault();this.$widgetContainer.find(`.fs-toggle__icon`).click();this._target.trigger(`unmute.video`)}};const bindToTabKey=(e)=>{if(e.keyCode===9){let bindClick=!1;const active=document.activeElement;if($(active).parents(`#${this.widgetId}`).length){bindClick=!0;$(`#${this.widgetId}`).addClass(`active-container`);document.addEventListener(`keydown`,bindKeypress,!0)}else{$(`#${this.widgetId}`).removeClass(`active-container`);document.removeEventListener(`keydown`,bindKeypress,!0)}
if(active===this.$widgetContainer.find(`${this.options.volumeButton}`).get(0)){bindClick=!0;$(`#${this.widgetId}`).addClass(`range-active`)}else{$(`#${this.widgetId}`).removeClass(`range-active`)}
if(bindClick){document.addEventListener(`click`,checkForClick,!0)}else{document.removeEventListener(`click`,checkForClick,!0)}}};document.addEventListener(`keyup`,bindToTabKey,!0)}
onLoad(){(async()=>{this.$screenshotContainer.hide();this.$widgetContainer.css('opacity',1);this.loadTime=(new Date()).getTime();this._target.trigger('loaded.video');const now=(new Date()).getTime();const newStart=((now-this.loadTime)/1000)+this.options.startPosition;if(!this.isLivestream){if(this.isMobile&&this.isSimulive){const videoEnd=await this.player.isEnded(newStart).catch(e=>!1);if(videoEnd){this._target.trigger("ended.video");return}
await this.player.mute().catch(e=>!1);!videoEnd&&!this.videoEnded&&this.$videoElement.addClass('player-blur')&&this.$playButton.fadeIn();return}
if(this.options.startPosition){if(this.isSimulive&&(this.loadTime>1)){this.player.setPlayStart(newStart);await this.player.seek(newStart).catch(e=>!1)}else{if(this.options.startMuted||!this.options.autoplay){await this.player.mute().catch(e=>!1)}
await this.player.seek(this.options.startPosition).catch(e=>!1)}
setTimeout(()=>{const checkPlay=this.player.isPlaying();if(checkPlay&&(!this.options.autoplay)){this.player.pause().catch(e=>!1)}
if(!this.options.startMuted&&!this.options.autoplay){this.player.unmute().catch(e=>!1)}},1000)}
if(!this.options.autoplay){if(!this.options.startMuted){await this.player.unmute().catch(e=>!0)}
return}}
await this.player.mute().catch(e=>!1);await this.player.autoplay().catch(e=>!1);if(this.videoEnded){return}
if(!this.options.startMuted){await this.player.unmute().catch(e=>!0)}
const isPlaying=await this.player.didUnmuteWork().catch(e=>!1);if(!isPlaying){await this.player.mute().catch(e=>!1);await this.player.autoplay().catch(e=>!1);await this.player.play().catch(e=>!1);this.$unmuteButton.show()}else if(isPlaying&&!this.options.startMuted&&!this.options.isIphone&&!this.options.isAndroid){this.$unmuteButton.remove()}
const isPaused=await this.player.isPaused();if(isPaused&&$(`.pl_btn`).is(`:visible`)){this.$unmuteButton.remove()}
this.player.lockSeek()})()}
onUnmuteClick(){this.player.unmute().catch(e=>!1);this.$unmuteButton.remove();this.$muteButton.removeClass("muted")}
onAudioToggle(){(async()=>{if(await this.player.isMuted()){await this.player.unmute().catch(e=>!1)}else{await this.player.mute().catch(e=>!1)}})()}
onMuteVideo(){if(this.isSimulive){this.$unmuteButton.show()}
if(!this.unMutedSuccess){this.$controls.hide()}
this.$muteButton.addClass("muted")}
onUnmuteVideo(){(async()=>{if(!await this.player.isMuted()){this.unMutedSuccess=!0;this.$controls.show();this.$muteButton.removeClass("muted")}})()}
onClosedCaptionToggle(){(async()=>{if(await this.player.ccEnabled()){await this.player.disableCC().catch(e=>!1)}else{await this.player.enableCC().catch(e=>!1)}})()}
onVolumeUpdate(e){(async()=>this.player.volume(e.currentTarget.value))()}
onPlayToggle(){(async()=>{this.$playButton.find("i").addClass("loading");if(this.isSimulive&&(this.loadTime>1)){const now=(new Date()).getTime();const newStart=((now-this.loadTime)/1000)+this.options.startPosition;this.player.setPlayStart(newStart);await this.player.seek(newStart).catch(e=>!1)}
if(await this.player.isMuted()){await this.player.unmute().catch(e=>!1)}
await this.player.isPaused&&this.play();setTimeout(()=>{this.$playButton.find("i").removeClass("loading");this.player.lockSeek()},1500)})()}
onPlayingVideo(){(async()=>{this.playStarted=!0;this.videoEnded=!1;this.isSimulive&&this.hasControls&&this.$videoElement.removeClass('player-blur')&&this.$playButton.fadeOut();this.isSimulive&&this.hasControls&&!this.isMobile&&this.player.iframe.toggleClass('no-touch',!0);const checkMute=await this.player.isMuted();setTimeout(()=>{checkMute&&this.isMobile&&!this.options.startMuted&&!this.options.autoplay&&this.$unmuteButton.fadeIn()},1500)})()}
onPausedVideo(){this.isSimulive&&this.hasControls&&!this.videoEnded&&this.$videoElement.addClass('player-blur')&&this.$playButton.fadeIn()}
onEndedVideo(){(async()=>{this.videoEnded=!0;if(this.options.loop){return this._target.trigger('loop.player')}
await this.player.stop().catch(e=>!1);if(this.hasControls&&this.isSimulive){this.$controlsContainer.hide();this.$screenshotContainer.show();this.$widgetContainer.css('opacity',0);this.$widgetContainer.find(`#${this._target.attr('id')}_video`).remove()}
this._target.trigger("ended.pagewidget")})()}
play(){(async()=>{if(await this.player.isPlaying()){return}
this.player.play().then(()=>{this.isSimulive&&this.hasControls&&!this.videoEnded&&this.$videoElement.removeClass('player-blur')&&this.$playButton.fadeOut()}).catch(()=>{this.isSimulive&&this.hasControls&&!this.videoEnded&&this.$videoElement.addClass('player-blur')&&this.$playButton.fadeIn()})})()}
stop(){this.player&&this.player.stop()}
get isMobile(){return(this.options.isIphone||this.options.isAndroid||(window.navigator.maxTouchPoints&&window.navigator.maxTouchPoints>2&&/MacIntel/.test(window.navigator.platform)))}
get $widgetContainer(){return this._target.find('.widget-container')}
get $videoElement(){return this.$widgetContainer.find(`#${this._target.attr('id')}_video`)}
get $mobileOverlay(){return this.$widgetContainer.find(`.mobile-container-overlay`)}
get isSimulive(){return this.options.simulive}
get isLivestream(){return this.options.livestream}
get hasControls(){return this.$controlsContainer.length>0}}
$.fn.pageWidgetVideo=function(option){const args=arguments;return this.each(function(){let data=$(this).data("PageWidgetVideo");const options=typeof option==="object"?option:{};if(data===undefined){const defaultOptions=$.extend(!0,{},$.fn.pageWidgetVideo.defaults);options._target=$(this);$(this).data("PageWidgetVideo",(data=new PageWidgetVideo($.extend(defaultOptions,options))))}
if(typeof option==="string"){data[option].apply(data,Array.prototype.slice.call(args,1))}})};$.fn.pageWidgetVideo.defaults={"playButton":".pl_btn","muteButton":".volume.volume-button","unmuteButton":".click-to-unmute","volumeButton":"input.range","ccButton":".video-control-toggle.cc-toggle__icon","videoContainer":".embed-responsive","controlsContainerSelector":".video-controls-container","controlsSelector":".video-controls","embedHtml":"","videoType":"","startTime":0,"startPosition":0,"autoplay":!1,"loop":!1,"lightbox":!1,"isIphone":!0,"isAndroid":!1,"closedCaptions":!1,"startMuted":!1,"simulive":!1,"livestream":!1,"screenshotContainer":".screenshot-container"}})(jQuery)