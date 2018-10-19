console.log('Background is running, Chrome Runtime Settings', chrome.runtime);

let state = false;
chrome.browserAction.setBadgeText({"text":"Off"});
chrome.browserAction.setBadgeBackgroundColor({color:"#4DA5FF"});
chrome.browserAction.onClicked.addListener(changeState);

function changeState(){
  state = !state;
  if(state){
    chrome.browserAction.setBadgeText({"text": "On"});
    chrome.browserAction.setBadgeBackgroundColor({color:"#73B52C"});
    chrome.windows.onCreated.addListener(windowWatcher);
  }else{
    chrome.browserAction.setBadgeText({"text":"Off"});
    chrome.browserAction.setBadgeBackgroundColor({color:"#4DA5FF"});
    chrome.windows.onCreated.removeListener(windowWatcher);
  }
}

var windowWatcher = function(newWindow){
    chrome.tabs.get(newWindow.id-1,function(activeTab){
      if(activeTab.url.indexOf('localhost:4240/test') > 0) {
         setTimeout(function(){
           let enableAutoFill = {"enabled": state};
           chrome.tabs.sendMessage(activeTab.id, enableAutoFill);
         },1000);
       }
    })
}
