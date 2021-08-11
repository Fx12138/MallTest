import { Divider } from "element-ui";

// 打开一个 web socket  这里端口号和上面监听的需一致
var ws = new WebSocket("ws://localhost:3000/");

// Web Socket 已连接上，使用 send() 方法发送数据
ws.onopen = function () {
    // 这里用一个延时器模拟事件
    // setInterval(function () {
    //   ws.send("客户端消息");
    // }, 2000);
    //   setTimeout(() => {
    //     console.log(that.chartInput);
    //     ws.send(that.chartInput);
    //   }, 0);
    console.log("已连接");
};
// 这里接受服务器端发过来的消息
ws.onmessage = function (e) {
    console.log(e.data);
    var mesDiv = document.getElementById('mesDiv')
    var dv = document.createElement('div')
    dv.innerText = e.data
    mesDiv.append(dv)
};

export default ws