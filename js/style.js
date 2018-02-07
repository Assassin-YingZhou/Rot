;(() => {
    'use strict';

    function Get(id) {
        return document.getElementById(id);
    }
    function Tag(tag) {
        return document.getElementsByTagName(tag);
    }
    init();

    /* 初始化 */
    function init() {
        let eleHTML = `
            <div id="customer_service_robot">
                <div id="svg"></div><!-- 图标 -->
                <div id="customer_dialog">
                    <div class="customer-dialog-title">与02小姐姐聊天中</div>
                    <!-- 文本生成区域 -->
                    <div id="customer_dialog_content">

                    </div>
                    <div class="customer-dialog-choose">
                        <ul id="choose_slot">

                        </ul>
                    </div>
                </div>
            </div>`;
        document.getElementsByTagName('body')[0].innerHTML += eleHTML;
    };
    
    let customer_service_robot = Get('customer_service_robot')
      , customer_dialog = Get('customer_dialog')
      , isOn = true
      , oUl = Get('choose_slot')
      , svg = Get('svg')
      , onOff = true
      , content = Get('customer_dialog_content')
      ; 

    /* 开关对话框 */
    customer_service_robot.onclick = () => {
        if (isOn) {
            customer_dialog.style.cssText = 'width: 300px; height: 600px; opacity: 1; transform: translate(-75%,-70%);'
            svg.style.cssText = 'background: #80fff8; width: 30px; height: 10px'
            Get('customer_dialog_content').innerHTML = `
                <div>
                    <span class="msg-row-left">
                        bilibili []~(￣▽￣)~*
                    </span>
                </div>`;
            isOn = false;
        }
        else {
            customer_dialog.style.cssText = 'width: 0px; height: 0px; opacity: 0; transform: translate(0,0); z-index: -1;'
            svg.style.cssText = 'background: #fff;width: 30px; height: 30px'
            Get('customer_dialog_content').innerHTML = '';
            isOn = true;
        }
    };
    /* 阻止冒泡 */
    customer_dialog.onclick = ev => {
        window.event? window.event.cancelBubble = true : e.stopPropagation();
    }

    /* 对话交互流程封装 */
    function process( Data , reply ) {
        /* 更新下一轮的数据 */
        let Reply = reply;
        oUl.innerHTML = '';
        /* for in 数据 形成 对应关系 */
        for(let value in Data) {
            oUl.innerHTML += '<li>'+ Data[value] +'</li>';
        }
        /* slot 变量 插入这里 */
        for (let i=0; i<Tag('li').length; i++) {
            Tag('li')[i].onclick = function() {
                if (onOff) {
                    onOff = false;
                    content.innerHTML += '<div><span class="msg-row-right">'+ this.innerHTML +'</span></div>';
                    /* 传 i 这个下标给 update 函数 就可以 形成 Data <-> Reply 的对应关系 */
                    update(i,Reply);
                    onOff = true;
                }
                else {
                    return;
                }
            }
        }        
    }

    /* 93 - 100 可以调整切换逻辑 */
    /* 调用一下 */
    process( process_content.firstData , process_content.firstReply );

    /* 查看更多选项 */
    Tag('li')[2].onclick = () => {
        process( process_content.secondData , process_content.secondReply );
    }

    /* 通过上面的click事件 拿到对应的 key值 ->  */
    function update( i , data ) {
        setTimeout(()=>{
            content.innerHTML += '<div><span class="msg-row-left">'+ data[i] +'</span></div>';

            /* 使最新信息一直出现在屏幕上 */
            if (content.scrollTop + content.offsetHeight != content.scrollHeight) {
                content.scrollTop = content.scrollHeight - content.offsetHeight;
            }
        },500)
    }    
})();