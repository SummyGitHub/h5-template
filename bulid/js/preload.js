// 预加载文件
$(function(){
  const mainfest = [
    {"src": "js/main.js", id: "js"},
    {"src": "assets/circle.png"},
    {"src": "assets/circle.png"},
  ]
  const queue = new createjs.LoadQueue()
  let count = 0;
  let total = mainfest.length;
  queue.loadManifest(mainfest)
  
  //单个文件加载完毕
  queue.on('fileload', function(e){
    if(count < mainfest.length) {
      count++;
      console.log(Math.ceil(100 * count / total)  + '%')
    }
  })
  //单个文件加载过程中
  queue.on('fileprogress', function(e){
    console.log(e)
  })

  //文件组加载过程中
  queue.on('progress', function(data){
    console.log(data)
  })

  //文件出现加载错误时
  queue.on('error', function(e){
    console.log(e)
  })

  //监听是否所有文件加载完毕
  queue.on('complete', handleComplete)

  //全部加载完毕处理事件
  function handleComplete() {
    var mainJs = document.createElement('script');
    mainJs.src = mainfest[0].src;
    document.body.appendChild(mainJs);
  }
  
})

