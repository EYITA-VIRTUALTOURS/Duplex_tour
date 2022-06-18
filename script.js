(function(){
    var script = {
 "start": "this.playAudioList([this.audio_516FAEAA_772F_CE38_41BB_30E3681EBF48]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.playList_67B83600_75A3_4125_418C_6994C28CFF00.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "layout": "absolute",
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "mouseWheelEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.MapViewer"
 ],
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 20,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "scripts": {
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "existsKey": function(key){  return key in window; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "registerKey": function(key, value){  window[key] = value; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "unregisterKey": function(key){  delete window[key]; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 20,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "height": "100%",
 "downloadEnabled": false,
 "paddingBottom": 0,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "class": "Player",
 "borderRadius": 0,
 "gap": 10,
 "paddingTop": 0,
 "data": {
  "name": "Player468"
 },
 "overflow": "visible",
 "shadow": false,
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_camera"
},
{
 "overlays": [
  "this.overlay_6168CA3C_7335_B618_41DB_F335B241F982",
  "this.overlay_60145E7D_7333_CE18_41DC_2DEC62C8D69E",
  "this.overlay_67E70CE5_7332_D228_41D0_CD3455EEF11F",
  "this.overlay_671C9441_733D_D268_41D4_2F8489875C89",
  "this.panorama_796B171E_7312_BE18_41DC_83DF5B223129_tcap0"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 49.28,
   "backwardYaw": -21.03,
   "distance": 1,
   "panorama": "this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -42.12,
   "backwardYaw": 99.23,
   "distance": 1,
   "panorama": "this.panorama_796A339F_7312_D618_41DC_0746EB01C19D"
  }
 ],
 "vfov": 180,
 "label": "P_L_002",
 "id": "panorama_796B171E_7312_BE18_41DC_83DF5B223129",
 "thumbnailUrl": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "mapLocations": [
  {
   "map": "this.map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345",
   "class": "PanoramaMapLocation",
   "angle": 91.21,
   "y": 670,
   "x": 437.2
  }
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 173.74,
  "pitch": 1.51
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_796A3870_7312_D228_41D3_E18DAAFD4655_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_79699D2C_7312_D239_41DA_FB741852B062_camera"
},
{
 "class": "PlayList",
 "items": [
  "this.PanoramaPlayListItem_67BF7604_75A3_412D_41A1_3917DDC5F94B",
  "this.PanoramaPlayListItem_67B3D608_75A3_4125_41D7_EBFCC6A7621E",
  "this.PanoramaPlayListItem_67B08608_75A3_4125_41CC_76148FB69D26",
  "this.PanoramaPlayListItem_67B11608_75A3_4125_419D_7C5DC8070093",
  "this.PanoramaPlayListItem_67B06609_75A3_4127_4182_F94D75EA0453",
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79699D2C_7312_D239_41DA_FB741852B062_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_79699D2C_7312_D239_41DA_FB741852B062",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79684356_7312_F668_41A7_E5AA7E6C9811_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_79684356_7312_F668_41A7_E5AA7E6C9811",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_79609481_7312_52E8_41B6_BB22EBE8A641_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_79609481_7312_52E8_41B6_BB22EBE8A641",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_67B6F609_75A3_4127_41D0_990BF79B2AD7",
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_67B7C60A_75A3_4125_41BE_1DCF52040CB0",
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 0)",
   "media": "this.panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "overlays": [
  "this.overlay_6448B109_7376_B3F8_4195_5D32BBF8A4F1",
  "this.overlay_6BA03CAD_736E_5238_41AF_A32930585A6E",
  "this.panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_tcap0"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -120.84,
   "backwardYaw": -55.43,
   "distance": 1,
   "panorama": "this.panorama_7964D23B_7312_B618_41D7_78D43983BC42"
  }
 ],
 "vfov": 180,
 "label": "P_S_001",
 "id": "panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791",
 "thumbnailUrl": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "mapLocations": [
  {
   "map": "this.map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345",
   "class": "PanoramaMapLocation",
   "angle": 180,
   "y": 1878.4,
   "x": 798.4
  }
 ],
 "hfovMax": 130
},
{
 "overlays": [
  "this.overlay_7D70109D_7312_B218_41D3_B841D39977CE",
  "this.overlay_7DAF238D_7312_76F8_41D9_67EDE848138A",
  "this.overlay_7D825E3D_7312_4E18_41C5_B5962063F0E5",
  "this.overlay_7C757A7C_7316_5618_41CE_1619100BA3CB",
  "this.overlay_7D87755E_7317_D218_41D8_267F1B6CC00E",
  "this.overlay_7C4CA33C_7315_F618_41C0_8679FE3DA0DF",
  "this.overlay_7CBDEDC1_7312_5268_41CC_BAB15ECC18C2",
  "this.overlay_7CDA5F47_7312_4E68_41C5_74206E2F3739",
  "this.overlay_63BF9761_7312_5E28_41D8_B06962BDA2AD",
  "this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_tcap0"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 76.15,
   "backwardYaw": -16.1,
   "distance": 1,
   "panorama": "this.panorama_796A339F_7312_D618_41DC_0746EB01C19D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -21.03,
   "backwardYaw": 49.28,
   "distance": 1,
   "panorama": "this.panorama_796B171E_7312_BE18_41DC_83DF5B223129"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -128.32,
   "backwardYaw": 85.03,
   "distance": 1,
   "panorama": "this.panorama_7964D23B_7312_B618_41D7_78D43983BC42"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -171.25,
   "backwardYaw": 139.68,
   "distance": 1,
   "panorama": "this.panorama_796A3870_7312_D228_41D3_E18DAAFD4655"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 171.96,
   "backwardYaw": 139.68,
   "distance": 1,
   "panorama": "this.panorama_796A3870_7312_D228_41D3_E18DAAFD4655"
  }
 ],
 "vfov": 180,
 "label": "P_L_003",
 "id": "panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA",
 "thumbnailUrl": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "mapLocations": [
  {
   "map": "this.map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345",
   "class": "PanoramaMapLocation",
   "angle": -66.05,
   "y": 1052.8,
   "x": 1212.4
  }
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -94.97,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_67D9966A_75A3_41E5_41DD_3E05BEA934F7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 59.92,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_67935625_75A3_416F_41D0_B019C1CF21E4"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -88.05,
   "backwardYaw": -94.58,
   "distance": 1,
   "panorama": "this.panorama_79609481_7312_52E8_41B6_BB22EBE8A641"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -104.26,
   "backwardYaw": 109.16,
   "distance": 1,
   "panorama": "this.panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 38.06,
   "backwardYaw": -62.69,
   "distance": 1,
   "panorama": "this.panorama_79699D2C_7312_D239_41DA_FB741852B062"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_79684356_7312_F668_41A7_E5AA7E6C9811",
 "thumbnailUrl": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_t.jpg",
 "label": "P_L_008",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_6760C80C_733E_B1F8_41D6_8721E1DCF682",
  "this.overlay_670E8141_733E_5268_41C2_E683CD69B5AD",
  "this.overlay_65DAF862_7373_D228_41B1_956C21F9D7AB",
  "this.overlay_65E5737A_7372_D618_41BB_F9F028D477C0",
  "this.overlay_643EAD82_737E_B2E8_41BD_64BF300865CC",
  "this.overlay_6592102A_737E_7238_41C8_D81B34F9D472",
  "this.panorama_79684356_7312_F668_41A7_E5AA7E6C9811_tcap0"
 ],
 "hfovMin": "150%",
 "hfovMax": 130
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "class": "MapPlayListItem",
   "media": "this.map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_67B83600_75A3_4125_418C_6994C28CFF00"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -56.52,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_670A269A_75A3_4125_41B8_5E53DD1A4CE0"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 61.05,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_66DF0783_75A3_4F2B_41DA_F1C9D371901D"
},
{
 "class": "PanoramaPlayer",
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mouseControlMode": "drag_acceleration"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -118.95,
   "backwardYaw": -120.08,
   "distance": 1,
   "panorama": "this.panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 109.16,
   "backwardYaw": -104.26,
   "distance": 1,
   "panorama": "this.panorama_79684356_7312_F668_41A7_E5AA7E6C9811"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9",
 "thumbnailUrl": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_t.jpg",
 "label": "P_B_002",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_656A3A92_7372_76E8_41B6_06F26954FCF9",
  "this.overlay_653F8E69_7372_CE38_41D0_995FB0DA4D89",
  "this.panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_tcap0",
  "this.overlay_78F21674_75A1_41EC_41D6_6E9C87AD78A0",
  "this.overlay_7ABF6960_75A7_43E5_41C8_C512AC6D9759"
 ],
 "hfovMin": "150%",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 137.88,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_66800730_75A3_4F65_41AB_26524B09173C"
},
{
 "class": "MapPlayer",
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "movementMode": "constrained"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -62.69,
   "backwardYaw": 38.06,
   "distance": 1,
   "panorama": "this.panorama_79684356_7312_F668_41A7_E5AA7E6C9811"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 37.31,
   "backwardYaw": -56.4,
   "distance": 1,
   "panorama": "this.panorama_796A339F_7312_D618_41DC_0746EB01C19D"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_79699D2C_7312_D239_41DA_FB741852B062",
 "thumbnailUrl": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_t.jpg",
 "label": "P_L_006",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_6957ED8A_7376_72F8_41DB_FC8BFFCCE2EB",
  "this.overlay_65A2B868_7376_7238_41D9_7007E2D0F380",
  "this.overlay_6482A491_7375_D2E8_41DB_4B65E5FED08F",
  "this.overlay_659A041F_7372_F218_41C8_C32619C75953",
  "this.panorama_79699D2C_7312_D239_41DA_FB741852B062_tcap0"
 ],
 "hfovMin": "150%",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -80.77,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_66CD3778_75A3_4FE5_41D1_4FD8285A56C7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.85,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_662F378F_75A3_4F3B_41D9_D6271A00ADBB"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -40.32,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_673B868A_75A3_4125_41BA_FBF038F13649"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_796B171E_7312_BE18_41DC_83DF5B223129_camera"
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "class": "MapPlayListItem",
   "media": "this.map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_67B87601_75A3_4127_41CE_9BAD5C891AE7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 91.95,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_663F6799_75A3_4F27_41D2_DFBC66DDA9A6"
},
{
 "overlays": [
  "this.overlay_7E91B0B3_731E_5228_41B9_FFBD45EF6D21",
  "this.overlay_613839E0_732D_D228_41AB_4C0627537C90",
  "this.overlay_6B136E23_736E_CE28_41DC_4E287D596E2A",
  "this.overlay_6A53FE9A_736E_4E18_41D9_4A5F3483BD37",
  "this.overlay_6B7CDBEA_7312_5638_41B5_F2498E5625DC",
  "this.overlay_692F60A2_7312_5228_41AB_5BBBC78A5F61",
  "this.panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 33.92,
   "backwardYaw": 123.48,
   "distance": 1,
   "panorama": "this.panorama_7968C914_7312_53E8_41D8_2F2288F73D77"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 85.03,
   "backwardYaw": -128.32,
   "distance": 1,
   "panorama": "this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -55.43,
   "backwardYaw": -120.84,
   "distance": 1,
   "panorama": "this.panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791"
  }
 ],
 "vfov": 180,
 "label": "P_L_001",
 "id": "panorama_7964D23B_7312_B618_41D7_78D43983BC42",
 "thumbnailUrl": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "mapLocations": [
  {
   "map": "this.map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345",
   "class": "PanoramaMapLocation",
   "angle": -91.88,
   "y": 1604.8,
   "x": 1212.4
  }
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -142.69,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_66E2A759_75A3_4F27_41D0_90600F782FAE"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 51.68,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_670586AA_75A3_4165_41CC_1EC30F18ED2C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_79684356_7312_F668_41A7_E5AA7E6C9811_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -82.15,
   "backwardYaw": -77.24,
   "distance": 1,
   "panorama": "this.panorama_79609481_7312_52E8_41B6_BB22EBE8A641"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D",
 "thumbnailUrl": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_t.jpg",
 "label": "P _ Mbath _ 001",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_6BFD5CE1_7376_7228_41BA_442AA8A074BE",
  "this.overlay_6B6F97D0_736F_DE68_41D6_EC3C833A99AC",
  "this.panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_tcap0"
 ],
 "hfovMin": "150%",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.75,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_666837BB_75A3_4F5B_41C2_47AAB1F225C4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 102.76,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_660947A4_75A3_4F6D_41AC_83426B781C94"
},
{
 "minimumZoomFactor": 0.5,
 "label": "Dup_Plan_Pers_001",
 "id": "map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345",
 "thumbnailUrl": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_t.jpg",
 "width": 2160,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345.jpeg",
    "class": "ImageResourceLevel",
    "width": 2160,
    "height": 2160
   },
   {
    "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_lq.jpeg",
    "class": "ImageResourceLevel",
    "width": 256,
    "height": 256,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayRadiusScale": 0.1,
 "maximumZoomFactor": 1.2,
 "class": "Map",
 "overlays": [
  "this.overlay_6DDE6919_732E_5218_41D6_3DF1FC332E16",
  "this.overlay_6CB9ADA8_7312_B238_4184_308CA8507C32",
  "this.overlay_6DEE400C_7312_D1F8_41C9_B431D09F6C28",
  "this.overlay_6DDA628C_7312_D6F8_41D2_DD0828E79F30",
  "this.overlay_6DC6551F_7312_D218_41D3_7C6FA9CC634F",
  "this.overlay_6DB387CC_7312_DE78_41D7_3D7F74DDD4B1",
  "this.overlay_6DBC9A57_7312_D668_41D2_198B952A0D2B"
 ],
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_inside",
 "initialZoomFactor": 1,
 "fieldOfViewOverlayInsideColor": "#99FF00",
 "height": 2160,
 "fieldOfViewOverlayOutsideOpacity": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7968C914_7312_53E8_41D8_2F2288F73D77_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.31,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_66B05720_75A3_4F65_41CB_52E44CC3A34D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 163.9,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_67FE4649_75A3_4127_41CA_BFB475AC771E"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.62,
  "pitch": -2.74
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7964D23B_7312_B618_41D7_78D43983BC42_camera"
},
{
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_516FAEAA_772F_CE38_41BB_30E3681EBF48.mp3",
  "oggUrl": "media/audio_516FAEAA_772F_CE38_41BB_30E3681EBF48.ogg"
 },
 "id": "audio_516FAEAA_772F_CE38_41BB_30E3681EBF48",
 "data": {
  "label": "&#x1F9C8; Lofi (Royalty Free Music) - &quot;BUTTER&quot; by @LuKremBo &#x1F1F0;&#x1F1F7;"
 },
 "autoplay": true
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.85,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_6692B743_75A3_4F2B_41B1_CCBABABB4A57"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -146.08,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_674676F0_75A3_4EE5_41C6_518D09717773"
},
{
 "overlays": [
  "this.overlay_6076163B_733E_5E18_41D3_215FDA87B9FA",
  "this.overlay_60E75300_733E_B7E8_41D0_BAECBABA8DF4",
  "this.overlay_673C9774_733F_DE28_41D9_7E4A397A08FB",
  "this.panorama_796A3870_7312_D228_41D3_E18DAAFD4655_tcap0"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 139.68,
   "backwardYaw": -171.25,
   "distance": 1,
   "panorama": "this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -140.06,
   "backwardYaw": -171.25,
   "distance": 1,
   "panorama": "this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA"
  }
 ],
 "vfov": 180,
 "label": "P_L_005",
 "id": "panorama_796A3870_7312_D228_41D3_E18DAAFD4655",
 "thumbnailUrl": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "mapLocations": [
  {
   "map": "this.map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345",
   "class": "PanoramaMapLocation",
   "angle": 181.69,
   "y": 1156,
   "x": 1564
  }
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 65.42,
  "pitch": 2.08
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 158.97,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_66FCE76B_75A3_4FFB_41D9_3BDCF03C9FD9"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 59.16,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_671476BB_75A3_415B_41C5_EA49A41998FA"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -70.84,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_66A06715_75A3_4F2F_418F_921F58DED70D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.75,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_667BD7C6_75A3_4F2D_41DB_991E99F94259"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -141.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_676426CD_75A3_413F_41BB_833A490BF6C3"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -120.08,
   "backwardYaw": -118.95,
   "distance": 1,
   "panorama": "this.panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430",
 "thumbnailUrl": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_t.jpg",
 "label": "BT 2",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_7AB9B1E2_75A1_C2E4_41B3_A87BC09A326F",
  "this.overlay_7A1DB5D6_75A1_432C_41DB_174B993EACF7"
 ],
 "hfovMin": "150%",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -40.32,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_672BC67C_75A3_41DD_41CE_B0B85CCC3B29"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 85.42,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_67562700_75A3_4F25_41D7_E99A2048B0A6"
},
{
 "overlays": [
  "this.overlay_6283FE2D_7332_CE38_41C2_EFCBCD184936",
  "this.overlay_613CD621_7333_DE28_4183_FF02E5E6D683",
  "this.overlay_6182ABD4_7332_B668_418A_69EFBB198D1C",
  "this.overlay_61E2032C_7335_D638_41CB_B28AC1F0D232",
  "this.overlay_62F36A7D_7336_B618_41DA_DD8CCC9BF506",
  "this.overlay_614A390B_7336_D3F8_41B0_8336736FEDF0",
  "this.panorama_796A339F_7312_D618_41DC_0746EB01C19D_tcap0"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 99.23,
   "backwardYaw": -42.12,
   "distance": 1,
   "panorama": "this.panorama_796B171E_7312_BE18_41DC_83DF5B223129"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -16.1,
   "backwardYaw": 76.15,
   "distance": 1,
   "panorama": "this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -56.4,
   "backwardYaw": 37.31,
   "distance": 1,
   "panorama": "this.panorama_79699D2C_7312_D239_41DA_FB741852B062"
  }
 ],
 "vfov": 180,
 "label": "P_L_004",
 "id": "panorama_796A339F_7312_D618_41DC_0746EB01C19D",
 "thumbnailUrl": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "mapLocations": [
  {
   "map": "this.map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345",
   "class": "PanoramaMapLocation",
   "angle": 184.75,
   "y": 366.4,
   "x": 1205.2
  }
 ],
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_79609481_7312_52E8_41B6_BB22EBE8A641_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 75.74,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_67EC4638_75A3_4165_4199_19C59F8126B6"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -77.24,
   "backwardYaw": -82.15,
   "distance": 1,
   "panorama": "this.panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -94.58,
   "backwardYaw": -88.05,
   "distance": 1,
   "panorama": "this.panorama_79684356_7312_F668_41A7_E5AA7E6C9811"
  }
 ],
 "vfov": 180,
 "partial": false,
 "id": "panorama_79609481_7312_52E8_41B6_BB22EBE8A641",
 "thumbnailUrl": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_t.jpg",
 "label": "P_ MB_01",
 "pitch": 0,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_t.jpg"
  }
 ],
 "overlays": [
  "this.overlay_65A56BAB_7332_B638_41D3_7B12C89A5741",
  "this.overlay_65AF5EA2_7372_4E28_41B1_DF52B9CBE4D2",
  "this.overlay_64EE43B1_7373_D628_419F_1EED138261F3",
  "this.overlay_6484D01B_7372_5218_41AE_9EB169A1E7ED",
  "this.panorama_79609481_7312_52E8_41B6_BB22EBE8A641_tcap0"
 ],
 "hfovMin": "150%",
 "hfovMax": 130
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 124.57,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_661977AF_75A3_4F7B_41D5_7086EDCA88DF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -130.72,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_67CE365A_75A3_4125_41D2_55CF45ABF562"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -10.71,
  "pitch": -2.83
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "panorama_796A339F_7312_D618_41DC_0746EB01C19D_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 123.6,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "id": "camera_677436DF_75A3_4EDB_41D8_39C82F6BACE3"
},
{
 "overlays": [
  "this.overlay_6B061B60_736D_D629_41A6_A7E5F148A492",
  "this.overlay_6B67D367_736E_7628_41D4_27B6AC0F0751",
  "this.panorama_7968C914_7312_53E8_41D8_2F2288F73D77_tcap0"
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 123.48,
   "backwardYaw": 33.92,
   "distance": 1,
   "panorama": "this.panorama_7964D23B_7312_B618_41D7_78D43983BC42"
  }
 ],
 "vfov": 180,
 "label": "P_B_001",
 "id": "panorama_7968C914_7312_53E8_41D8_2F2288F73D77",
 "thumbnailUrl": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfov": 360,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_t.jpg"
  }
 ],
 "hfovMin": "150%",
 "mapLocations": [
  {
   "map": "this.map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345",
   "class": "PanoramaMapLocation",
   "angle": -83.66,
   "y": 1397.2,
   "x": 690.4
  }
 ],
 "hfovMax": 130
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "toolTipFontSize": 13,
 "toolTipOpacity": 0.5,
 "toolTipShadowBlurRadius": 3,
 "minHeight": 50,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 6,
 "paddingBottom": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "shadow": false,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "paddingRight": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 55,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "borderSize": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 10,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 7,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "width": 115.05,
 "scrollBarColor": "#000000",
 "right": "0%",
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "minHeight": 1,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 641,
 "horizontalAlign": "left",
 "borderSize": 0,
 "top": "0%",
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "gap": 10,
 "paddingTop": 0,
 "data": {
  "name": "--SETTINGS"
 },
 "overflow": "scroll",
 "shadow": false,
 "layout": "absolute"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "minHeight": 1,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 118,
 "horizontalAlign": "left",
 "bottom": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "backgroundOpacity": 0.64,
 "class": "Container",
 "borderRadius": 0,
 "gap": 10,
 "paddingTop": 0,
 "data": {
  "name": "--MENU"
 },
 "overflow": "visible",
 "shadow": false,
 "layout": "absolute"
},
{
 "transitionDuration": 500,
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "left": "0.06%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "24.125%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "minHeight": 1,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "37.622%",
 "progressBarBorderSize": 6,
 "paddingBottom": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "class": "ViewerArea",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "shadow": false,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "paddingRight": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "borderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "bottom": "7.14%",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "visible": false,
 "paddingTop": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "data": {
  "name": "Floor Plan"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "verticalAlign": "middle",
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "width": 58,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "borderSize": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "verticalAlign": "middle",
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "width": 58,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "borderSize": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton MUTE"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA, this.camera_66FCE76B_75A3_4FFB_41D9_3BDCF03C9FD9); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6168CA3C_7335_B618_41DB_F335B241F982",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 49.28,
   "hfov": 95.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 172
     }
    ]
   },
   "pitch": -1.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6270FC_7315_D218_41CB_57272841C458",
   "pitch": -3.29,
   "yaw": 29.64,
   "hfov": 3.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_60145E7D_7333_CE18_41DC_2DEC62C8D69E",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 29.64,
   "hfov": 3.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796A339F_7312_D618_41DC_0746EB01C19D, this.camera_66CD3778_75A3_4FE5_41D1_4FD8285A56C7); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_67E70CE5_7332_D228_41D0_CD3455EEF11F",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -42.12,
   "hfov": 70.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 164,
      "height": 200
     }
    ]
   },
   "pitch": -2.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6280FD_7315_D218_41CF_F61327255C30",
   "pitch": -2.6,
   "yaw": -25.46,
   "hfov": 3.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_671C9441_733D_D268_41D4_2F8489875C89",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -25.46,
   "hfov": 3.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.6
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_796B171E_7312_BE18_41DC_83DF5B223129_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7964D23B_7312_B618_41D7_78D43983BC42_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_67BF7604_75A3_412D_41A1_3917DDC5F94B, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "media": "this.panorama_7964D23B_7312_B618_41D7_78D43983BC42",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_67BF7604_75A3_412D_41A1_3917DDC5F94B"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_67B3D608_75A3_4125_41D7_EBFCC6A7621E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "media": "this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_67B3D608_75A3_4125_41D7_EBFCC6A7621E"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_796A339F_7312_D618_41DC_0746EB01C19D_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_67B08608_75A3_4125_41CC_76148FB69D26, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "media": "this.panorama_796A339F_7312_D618_41DC_0746EB01C19D",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_67B08608_75A3_4125_41CC_76148FB69D26"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_796B171E_7312_BE18_41DC_83DF5B223129_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_67B11608_75A3_4125_419D_7C5DC8070093, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "media": "this.panorama_796B171E_7312_BE18_41DC_83DF5B223129",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_67B11608_75A3_4125_419D_7C5DC8070093"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_796A3870_7312_D228_41D3_E18DAAFD4655_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_67B06609_75A3_4127_4182_F94D75EA0453, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "media": "this.panorama_796A3870_7312_D228_41D3_E18DAAFD4655",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_67B06609_75A3_4127_4182_F94D75EA0453"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7968C914_7312_53E8_41D8_2F2288F73D77_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_67B6F609_75A3_4127_41D0_990BF79B2AD7, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
 "media": "this.panorama_7968C914_7312_53E8_41D8_2F2288F73D77",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_67B6F609_75A3_4127_41D0_990BF79B2AD7"
},
{
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_67B7C60A_75A3_4125_41BE_1DCF52040CB0, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "media": "this.panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_67B7C60A_75A3_4125_41BE_1DCF52040CB0"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7964D23B_7312_B618_41D7_78D43983BC42, this.camera_661977AF_75A3_4F7B_41D5_7086EDCA88DF); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6448B109_7376_B3F8_4195_5D32BBF8A4F1",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0_HS_0_1_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0_HS_0_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0_HS_0_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0_HS_0_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 93,
      "height": 161
     }
    ]
   },
   "pitch": 21.74,
   "yaw": -113.75,
   "hfov": 9.67
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6BA03CAD_736E_5238_41AF_A32930585A6E",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -113.75,
   "hfov": 9.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_0_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 27
     }
    ]
   },
   "pitch": 21.74
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7964D23B_7312_B618_41D7_78D43983BC42, this.camera_67D9966A_75A3_41E5_41DD_3E05BEA934F7); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_7D70109D_7312_B218_41D3_B841D39977CE",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -128.32,
   "hfov": 69.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 81,
      "height": 200
     }
    ]
   },
   "pitch": 5.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796A3870_7312_D228_41D3_E18DAAFD4655, this.camera_672BC67C_75A3_41DD_41CE_B0B85CCC3B29); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_7DAF238D_7312_76F8_41D9_67EDE848138A",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.25,
   "hfov": 18.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_1_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 200
     }
    ]
   },
   "pitch": 4.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796A3870_7312_D228_41D3_E18DAAFD4655, this.camera_673B868A_75A3_4125_41BA_FBF038F13649); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_7D825E3D_7312_4E18_41C5_B5962063F0E5",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 171.96,
   "hfov": 15.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_1_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 36,
      "height": 199
     }
    ]
   },
   "pitch": 5.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796A339F_7312_D618_41DC_0746EB01C19D, this.camera_67FE4649_75A3_4127_41CA_BFB475AC771E); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_7C757A7C_7316_5618_41CE_1619100BA3CB",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.15,
   "hfov": 93.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_3_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 117,
      "height": 200
     }
    ]
   },
   "pitch": 9.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796B171E_7312_BE18_41DC_83DF5B223129, this.camera_67CE365A_75A3_4125_41D2_55CF45ABF562); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_7D87755E_7317_D218_41D8_267F1B6CC00E",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -21.03,
   "hfov": 79.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_4_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 159,
      "height": 200
     }
    ]
   },
   "pitch": 3.08
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 02"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6550FB_7315_D218_41CF_0076F2B535DC",
   "pitch": -7.04,
   "yaw": -10.92,
   "hfov": 3.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7C4CA33C_7315_F618_41C0_8679FE3DA0DF",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -10.92,
   "hfov": 3.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6560FB_7315_D218_41C2_384B3CDAC4AC",
   "pitch": -3.57,
   "yaw": 61.34,
   "hfov": 3.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7CBDEDC1_7312_5268_41CC_BAB15ECC18C2",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 61.34,
   "hfov": 3.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_696A444C_7332_7278_41D8_66530D3BC35E",
   "pitch": -5.25,
   "yaw": -122.33,
   "hfov": 4.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7CDA5F47_7312_4E68_41C5_74206E2F3739",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -122.33,
   "hfov": 4.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_696A344C_7332_7279_417E_9A5286173E5A",
   "pitch": -6.5,
   "yaw": -174.64,
   "hfov": 5.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_63BF9761_7312_5E28_41D8_B06962BDA2AD",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -174.64,
   "hfov": 5.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_8_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.5
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_79699D2C_7312_D239_41DA_FB741852B062, this.camera_66B05720_75A3_4F65_41CB_52E44CC3A34D); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6760C80C_733E_B1F8_41D6_8721E1DCF682",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_0_2_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_0_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_0_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6390FE_7315_D218_41CB_3C1A18B85080",
   "pitch": -6.19,
   "yaw": 49.88,
   "hfov": 5.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_670E8141_733E_5268_41C2_E683CD69B5AD",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 49.88,
   "hfov": 5.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_79609481_7312_52E8_41B6_BB22EBE8A641, this.camera_67562700_75A3_4F25_41D7_E99A2048B0A6); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_65DAF862_7373_D228_41B1_956C21F9D7AB",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.05,
   "hfov": 12.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 35,
      "height": 200
     }
    ]
   },
   "pitch": -8.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B63D0FE_7315_D218_41D2_D7D1C0CC1D8B",
   "pitch": 3.67,
   "yaw": -88.81,
   "hfov": 4.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_65E5737A_7372_D618_41BB_F9F028D477C0",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.81,
   "hfov": 4.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_3_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 3.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9, this.camera_66A06715_75A3_4F2F_418F_921F58DED70D); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_643EAD82_737E_B2E8_41BD_64BF300865CC",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.26,
   "hfov": 21.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_4_1_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 74,
      "height": 200
     }
    ]
   },
   "pitch": -7.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6010FE_7315_D218_41DC_58D58D5C6200",
   "pitch": 4.04,
   "yaw": -103.75,
   "hfov": 4.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6592102A_737E_7238_41C8_D81B34F9D472",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -103.75,
   "hfov": 4.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_5_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.04
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_79684356_7312_F668_41A7_E5AA7E6C9811_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "verticalAlign": "middle",
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "width": 58,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "borderSize": 0,
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "visible": false,
 "paddingTop": 0,
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 37,
 "maxWidth": 49,
 "verticalAlign": "middle",
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "width": 100,
 "right": 30,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "borderSize": 0,
 "minWidth": 1,
 "mode": "push",
 "height": 75,
 "horizontalAlign": "center",
 "bottom": 8,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "verticalAlign": "middle",
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "width": 58,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "borderSize": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton HS "
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "verticalAlign": "middle",
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "width": 58,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "borderSize": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "horizontalAlign": "center",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton GYRO"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_79684356_7312_F668_41A7_E5AA7E6C9811, this.camera_67EC4638_75A3_4165_4199_19C59F8126B6); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_656A3A92_7372_76E8_41B6_06F26954FCF9",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 109.16,
   "hfov": 24.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 199
     }
    ]
   },
   "pitch": -3.2
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B60B0FF_7315_D218_41C9_157453C9A101",
   "pitch": 18.47,
   "yaw": 109.09,
   "hfov": 8.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_653F8E69_7372_CE38_41D0_995FB0DA4D89",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 109.09,
   "hfov": 8.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 18.47
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430, this.camera_67935625_75A3_416F_41D0_B019C1CF21E4); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_78F21674_75A1_41EC_41D6_6E9C87AD78A0",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -118.95,
   "hfov": 24.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 63,
      "height": 200
     }
    ]
   },
   "pitch": -2.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 42,
      "height": 98
     }
    ]
   },
   "pitch": 9.65,
   "yaw": -119.3,
   "hfov": 4.69
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7ABF6960_75A7_43E5_41C8_C512AC6D9759",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -119.3,
   "hfov": 4.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 37
     }
    ]
   },
   "pitch": 9.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796A339F_7312_D618_41DC_0746EB01C19D, this.camera_677436DF_75A3_4EDB_41D8_39C82F6BACE3); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6957ED8A_7376_72F8_41DB_FC8BFFCCE2EB",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 37.31,
   "hfov": 78.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 97,
      "height": 200
     }
    ]
   },
   "pitch": -4.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6300FD_7315_D218_41D3_2F690AA9E412",
   "pitch": -26.09,
   "yaw": 17.17,
   "hfov": 3.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_65A2B868_7376_7238_41D9_7007E2D0F380",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 17.17,
   "hfov": 3.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -26.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_79684356_7312_F668_41A7_E5AA7E6C9811, this.camera_676426CD_75A3_413F_41BB_833A490BF6C3); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6482A491_7375_D2E8_41DB_4B65E5FED08F",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.69,
   "hfov": 67.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 174,
      "height": 200
     }
    ]
   },
   "pitch": -3.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6350FD_7315_D218_41C0_05A1F2F41CF4",
   "pitch": -5.44,
   "yaw": -49.78,
   "hfov": 5.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_659A041F_7372_F218_41C8_C32619C75953",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -49.78,
   "hfov": 5.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.44
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_79699D2C_7312_D239_41DA_FB741852B062_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA, this.camera_670586AA_75A3_4165_41CC_1EC30F18ED2C); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_7E91B0B3_731E_5228_41B9_FFBD45EF6D21",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 85.03,
   "hfov": 92.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 132,
      "height": 200
     }
    ]
   },
   "pitch": 8.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6490FA_7315_D218_41D9_6641ED84280C",
   "pitch": -0.07,
   "yaw": 90.45,
   "hfov": 4.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_613839E0_732D_D228_41AB_4C0627537C90",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90.45,
   "hfov": 4.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 63,
      "height": 104
     }
    ]
   },
   "pitch": 12.01,
   "yaw": -57.44,
   "hfov": 6.89
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6B136E23_736E_CE28_41DC_4E287D596E2A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -57.44,
   "hfov": 6.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 26
     }
    ]
   },
   "pitch": 12.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B64A0FB_7315_D218_4194_82C69D253619",
   "pitch": 12.86,
   "yaw": 35.37,
   "hfov": 5.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6A53FE9A_736E_4E18_41D9_4A5F3483BD37",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.37,
   "hfov": 5.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 12.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7968C914_7312_53E8_41D8_2F2288F73D77, this.camera_670A269A_75A3_4125_41B8_5E53DD1A4CE0); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6B7CDBEA_7312_5638_41B5_F2498E5625DC",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 33.92,
   "hfov": 27.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0_HS_5_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 68,
      "height": 200
     }
    ]
   },
   "pitch": -1.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796AC8B9_7312_F218_41BE_7EBFBF1CB791, this.camera_671476BB_75A3_415B_41C5_EA49A41998FA); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_692F60A2_7312_5228_41AB_5BBBC78A5F61",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -55.43,
   "hfov": 22.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0_HS_6_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 57,
      "height": 200
     }
    ]
   },
   "pitch": -1.77
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_79609481_7312_52E8_41B6_BB22EBE8A641, this.camera_660947A4_75A3_4F6D_41AC_83426B781C94); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6BFD5CE1_7376_7228_41BA_442AA8A074BE",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -82.15,
   "hfov": 38.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 82,
      "height": 200
     }
    ]
   },
   "pitch": -5.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 58,
      "height": 109
     }
    ]
   },
   "pitch": 9.33,
   "yaw": -81.86,
   "hfov": 7.66
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6B6F97D0_736F_DE68_41D6_EC3C833A99AC",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.86,
   "hfov": 7.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 30
     }
    ]
   },
   "pitch": 9.33
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "map": {
  "width": 92,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_0_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 24
    }
   ]
  },
  "y": 1533.6,
  "x": 1166.4,
  "offsetY": 0,
  "height": 142.4,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 142.4,
  "y": 1533.6,
  "width": 92,
  "x": 1166.4,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_0.png",
     "class": "ImageResourceLevel",
     "width": 92,
     "height": 142
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "id": "overlay_6DDE6919_732E_5218_41D6_3DF1FC332E16"
},
{
 "map": {
  "width": 84.8,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_1_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 1087.2,
  "x": 1521.6,
  "offsetY": 0,
  "height": 137.6,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 137.6,
  "y": 1087.2,
  "width": 84.8,
  "x": 1521.6,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_1.png",
     "class": "ImageResourceLevel",
     "width": 84,
     "height": 137
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "id": "overlay_6CB9ADA8_7312_B238_4184_308CA8507C32"
},
{
 "map": {
  "width": 82.4,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_2_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 30
    }
   ]
  },
  "y": 592.8,
  "x": 396,
  "offsetY": 0,
  "height": 154.4,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 154.4,
  "y": 592.8,
  "width": 82.4,
  "x": 396,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_2.png",
     "class": "ImageResourceLevel",
     "width": 82,
     "height": 154
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "id": "overlay_6DEE400C_7312_D1F8_41C9_B431D09F6C28"
},
{
 "map": {
  "width": 87.2,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_3_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 26
    }
   ]
  },
  "y": 295.2,
  "x": 1161.6,
  "offsetY": 0,
  "height": 142.4,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 142.4,
  "y": 295.2,
  "width": 87.2,
  "x": 1161.6,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_3.png",
     "class": "ImageResourceLevel",
     "width": 87,
     "height": 142
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "id": "overlay_6DDA628C_7312_D6F8_41D2_DD0828E79F30"
},
{
 "map": {
  "width": 89.6,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_4_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 28
    }
   ]
  },
  "y": 1800,
  "x": 753.6,
  "offsetY": 0,
  "height": 156.8,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 156.8,
  "y": 1800,
  "width": 89.6,
  "x": 753.6,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_4.png",
     "class": "ImageResourceLevel",
     "width": 89,
     "height": 156
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "id": "overlay_6DC6551F_7312_D218_41D3_7C6FA9CC634F"
},
{
 "map": {
  "width": 87.2,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_5_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 27
    }
   ]
  },
  "y": 979.2,
  "x": 1168.8,
  "offsetY": 0,
  "height": 147.2,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 147.2,
  "y": 979.2,
  "width": 87.2,
  "x": 1168.8,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_5.png",
     "class": "ImageResourceLevel",
     "width": 87,
     "height": 147
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "id": "overlay_6DB387CC_7312_DE78_41D7_3D7F74DDD4B1"
},
{
 "map": {
  "width": 80,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_6_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 30
    }
   ]
  },
  "y": 1320,
  "x": 650.4,
  "offsetY": 0,
  "height": 154.4,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "image": {
  "class": "HotspotMapOverlayImage",
  "height": 154.4,
  "y": 1320,
  "width": 80,
  "x": 650.4,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_6CE68EB0_732E_4E28_41CC_FAE8FFECB345_HS_6.png",
     "class": "ImageResourceLevel",
     "width": 80,
     "height": 154
    }
   ]
  }
 },
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "id": "overlay_6DBC9A57_7312_D668_41D2_198B952A0D2B"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA, this.camera_666837BB_75A3_4F5B_41C2_47AAB1F225C4); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6076163B_733E_5E18_41D3_215FDA87B9FA",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0_HS_0_1_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0_HS_0_2_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0_HS_0_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0_HS_0_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6969044E_7332_7278_41D9_86D4FCDF3E5D",
   "pitch": -9.69,
   "yaw": 126.63,
   "hfov": 5.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_60E75300_733E_B7E8_41D0_BAECBABA8DF4",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 126.63,
   "hfov": 5.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -9.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA, this.camera_667BD7C6_75A3_4F2D_41DB_991E99F94259); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_673C9774_733F_DE28_41D9_7E4A397A08FB",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0_HS_2_1_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0_HS_2_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0_HS_2_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0_HS_2_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_796A3870_7312_D228_41D3_E18DAAFD4655_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9, this.camera_66DF0783_75A3_4F2B_41DA_F1C9D371901D); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_1_HS_0_00002.png",
      "class": "ImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ]
   },
   "pitch": 0,
   "yaw": -180,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_1_HS_0_00003.png",
      "class": "ImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ]
   },
   "pitch": 0,
   "yaw": -90,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_1_HS_0_00004.png",
      "class": "ImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ]
   },
   "pitch": 90,
   "yaw": 0,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_1_HS_0_00005.png",
      "class": "ImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ]
   },
   "pitch": -90,
   "yaw": 0,
   "hfov": 90
  }
 ],
 "id": "overlay_7AB9B1E2_75A1_C2E4_41B3_A87BC09A326F",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_1_HS_0_1_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_1_HS_0_2_3_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_1_HS_0_3_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_1_HS_0_4_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 80,
      "height": 200
     }
    ]
   },
   "pitch": 27.51,
   "yaw": -115.58,
   "hfov": 7.97
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A1DB5D6_75A1_432C_41DB_174B993EACF7",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -115.58,
   "hfov": 7.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7A06F688_75A0_C125_41BB_E7ABBE5B9430_1_HS_1_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 40
     }
    ]
   },
   "pitch": 27.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_79699D2C_7312_D239_41DA_FB741852B062, this.camera_66E2A759_75A3_4F27_41D0_90600F782FAE); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6283FE2D_7332_CE38_41C2_EFCBCD184936",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -56.4,
   "hfov": 142.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 131
     }
    ]
   },
   "pitch": 21.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_696BB44D_7332_7278_41D9_A27B439F66A5",
   "pitch": 26.02,
   "yaw": -39.55,
   "hfov": 4.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_613CD621_7333_DE28_4183_FF02E5E6D683",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -39.55,
   "hfov": 4.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 26.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796B171E_7312_BE18_41DC_83DF5B223129, this.camera_66800730_75A3_4F65_41AB_26524B09173C); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6182ABD4_7332_B668_418A_69EFBB198D1C",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_2_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_2_2_1_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -180,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_2_3_2_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 0
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_2_4_4_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": 90
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "hfov": 90,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_2_5_5_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 200
     }
    ]
   },
   "pitch": -90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_696B044D_7332_7278_41D6_5E3C18C4BD6B",
   "pitch": -7.29,
   "yaw": 76.44,
   "hfov": 4.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_61E2032C_7335_D638_41CB_B28AC1F0D232",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.44,
   "hfov": 4.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_3_0_6_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA, this.camera_6692B743_75A3_4F2B_41B1_CCBABABB4A57); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_62F36A7D_7336_B618_41DA_DD8CCC9BF506",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -16.1,
   "hfov": 92.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_4_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 200,
      "height": 170
     }
    ]
   },
   "pitch": -15.83
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6230FC_7315_D218_41D0_64F37EA5AA53",
   "pitch": -0.55,
   "yaw": 0.35,
   "hfov": 3.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_614A390B_7336_D3F8_41B0_8336736FEDF0",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.35,
   "hfov": 3.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -0.55
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_796A339F_7312_D618_41DC_0746EB01C19D_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_79684356_7312_F668_41A7_E5AA7E6C9811, this.camera_663F6799_75A3_4F27_41D2_DFBC66DDA9A6); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_65A56BAB_7332_B638_41D3_7B12C89A5741",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -94.58,
   "hfov": 14.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 66,
      "height": 180
     }
    ]
   },
   "pitch": -1.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_796C7734_7312_7E28_41C6_F1E22C5AD88D, this.camera_662F378F_75A3_4F3B_41D9_D6271A00ADBB); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_65AF5EA2_7372_4E28_41B1_DF52B9CBE4D2",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -77.24,
   "hfov": 23.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0_HS_1_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 62,
      "height": 200
     }
    ]
   },
   "pitch": -2.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 59,
      "height": 81
     }
    ]
   },
   "pitch": 9.43,
   "yaw": -79.65,
   "hfov": 6.5
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_64EE43B1_7373_D628_419F_1EED138261F3",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -79.65,
   "hfov": 6.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": 9.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B6070FF_7315_D218_41CC_E6F74D59A555",
   "pitch": 7.97,
   "yaw": -93.49,
   "hfov": 5.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6484D01B_7372_5218_41AE_9EB169A1E7ED",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -93.49,
   "hfov": 5.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 7.97
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_79609481_7312_52E8_41B6_BB22EBE8A641_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7964D23B_7312_B618_41D7_78D43983BC42, this.camera_674676F0_75A3_4EE5_41C6_518D09717773); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_6B061B60_736D_D629_41A6_A7E5F148A492",
 "data": {
  "label": "Polygon"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 123.48,
   "hfov": 24.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0_HS_0_1_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 200
     }
    ]
   },
   "pitch": -5.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "items": [
  {
   "image": "this.AnimatedImageResource_6B60C0FF_7315_D218_41DA_E61F50EC2B1C",
   "pitch": 9.05,
   "yaw": 128.93,
   "hfov": 8.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6B67D367_736E_7628_41D4_27B6AC0F0751",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 128.93,
   "hfov": 8.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 9.05
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "distance": 50,
 "rotate": false,
 "id": "panorama_7968C914_7312_53E8_41D8_2F2288F73D77_tcap0",
 "hfov": 30,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 500,
    "height": 500
   }
  ]
 },
 "inertia": false
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "width": 110,
 "scrollBarColor": "#000000",
 "right": "0%",
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 110,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "top": "0%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "gap": 10,
 "paddingTop": 0,
 "data": {
  "name": "button menu sup"
 },
 "overflow": "visible",
 "shadow": false,
 "layout": "horizontal"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC"
 ],
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "91.304%",
 "borderSize": 0,
 "contentOpaque": false,
 "minWidth": 1,
 "height": "85.959%",
 "bottom": "0%",
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "gap": 3,
 "paddingTop": 0,
 "data": {
  "name": "-button set"
 },
 "overflow": "scroll",
 "shadow": false,
 "visible": false,
 "layout": "vertical"
},
{
 "propagateClick": true,
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "width": 1199,
 "scrollBarColor": "#000000",
 "children": [
  "this.Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0"
 ],
 "paddingRight": 0,
 "paddingLeft": 30,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "minHeight": 1,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 51,
 "horizontalAlign": "left",
 "borderSize": 0,
 "bottom": "0%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "gap": 3,
 "paddingTop": 0,
 "data": {
  "name": "-button set container"
 },
 "overflow": "scroll",
 "shadow": false,
 "layout": "horizontal"
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6270FC_7315_D218_41CB_57272841C458",
 "levels": [
  {
   "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6280FD_7315_D218_41CF_F61327255C30",
 "levels": [
  {
   "url": "media/panorama_796B171E_7312_BE18_41DC_83DF5B223129_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6550FB_7315_D218_41CF_0076F2B535DC",
 "levels": [
  {
   "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6560FB_7315_D218_41C2_384B3CDAC4AC",
 "levels": [
  {
   "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_696A444C_7332_7278_41D8_66530D3BC35E",
 "levels": [
  {
   "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_696A344C_7332_7279_417E_9A5286173E5A",
 "levels": [
  {
   "url": "media/panorama_796CEBE3_7312_B628_41AD_8391C3DED8DA_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6390FE_7315_D218_41CB_3C1A18B85080",
 "levels": [
  {
   "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B63D0FE_7315_D218_41D2_D7D1C0CC1D8B",
 "levels": [
  {
   "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6010FE_7315_D218_41DC_58D58D5C6200",
 "levels": [
  {
   "url": "media/panorama_79684356_7312_F668_41A7_E5AA7E6C9811_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B60B0FF_7315_D218_41C9_157453C9A101",
 "levels": [
  {
   "url": "media/panorama_796AFD9B_7312_5218_41D7_9EA2FD7601F9_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6300FD_7315_D218_41D3_2F690AA9E412",
 "levels": [
  {
   "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6350FD_7315_D218_41C0_05A1F2F41CF4",
 "levels": [
  {
   "url": "media/panorama_79699D2C_7312_D239_41DA_FB741852B062_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6490FA_7315_D218_41D9_6641ED84280C",
 "levels": [
  {
   "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B64A0FB_7315_D218_4194_82C69D253619",
 "levels": [
  {
   "url": "media/panorama_7964D23B_7312_B618_41D7_78D43983BC42_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6969044E_7332_7278_41D9_86D4FCDF3E5D",
 "levels": [
  {
   "url": "media/panorama_796A3870_7312_D228_41D3_E18DAAFD4655_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_696BB44D_7332_7278_41D9_A27B439F66A5",
 "levels": [
  {
   "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_696B044D_7332_7278_41D6_5E3C18C4BD6B",
 "levels": [
  {
   "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 22,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6230FC_7315_D218_41D0_64F37EA5AA53",
 "levels": [
  {
   "url": "media/panorama_796A339F_7312_D618_41DC_0746EB01C19D_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 1000,
   "height": 1500
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B6070FF_7315_D218_41CC_E6F74D59A555",
 "levels": [
  {
   "url": "media/panorama_79609481_7312_52E8_41B6_BB22EBE8A641_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_6B60C0FF_7315_D218_41DA_E61F50EC2B1C",
 "levels": [
  {
   "url": "media/panorama_7968C914_7312_53E8_41D8_2F2288F73D77_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "verticalAlign": "middle",
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "width": 60,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "borderSize": 0,
 "minWidth": 1,
 "mode": "toggle",
 "height": 60,
 "horizontalAlign": "center",
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "paddingTop": 0,
 "data": {
  "name": "image button menu"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "verticalAlign": "middle",
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "width": 58,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "borderSize": 0,
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "horizontalAlign": "center",
 "click": "this.openLink('https://www.instagram.com/nani_construction_realestate/', '_blank')",
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "paddingTop": 0,
 "data": {
  "name": "IconButton TWITTER"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "id": "Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "width": 113,
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "iconWidth": 32,
 "paddingRight": 0,
 "layout": "horizontal",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "minHeight": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "textDecoration": "none",
 "minWidth": 1,
 "mode": "push",
 "height": 49,
 "horizontalAlign": "center",
 "label": "FLOORPLAN",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "paddingBottom": 0,
 "fontSize": 12,
 "click": "if(!this.MapViewer.get('visible')){ this.setComponentVisibility(this.MapViewer, true, 0, null, null, false) } else { this.setComponentVisibility(this.MapViewer, false, 0, null, null, false) }",
 "iconHeight": 32,
 "backgroundOpacity": 0,
 "fontStyle": "normal",
 "class": "Button",
 "borderRadius": 0,
 "gap": 5,
 "paddingTop": 0,
 "rollOverBackgroundOpacity": 0.8,
 "fontWeight": "bold",
 "shadow": false,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "data": {
  "name": "Button floorplan"
 }
}],
 "width": "100%"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
