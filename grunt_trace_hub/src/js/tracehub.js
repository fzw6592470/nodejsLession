/**
 *  author: MartinCui
 *  name: TraceHub
 *  used: TraceHub
 */

var TraceHub = {
    url: "http://10.1.3.120:18031/tracehub",
    trace_id: undefined,
    timeBegin: undefined,
    timeEnd: undefined,
    callee_server_name: undefined,
    setting: {
        view: {
            showLine: true,
            selectedMulti: false,
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onNodeCreated: this.onNodeCreated,
            beforeClick: undefined,
            onClick: undefined
        }
    },
    zNodes: undefined,
    curMenu: undefined,
    zTree_Menu: undefined,
    beforeClick: function (treeId, node) {
        var _that = TraceHub;
        if (node.isParent) {
            if (node.level === 0) {
                var pNode = _that.curMenu;
                while (pNode && pNode.level !==0) {
                    pNode = pNode.getParentNode();
                }
                if (pNode !== node) {
                    var a = $("#" + pNode.tId + "_a");
                    a.removeClass("cur");
                    _that.zTree_Menu.expandNode(pNode, false);
                }
                a = $("#" + node.tId + "_a");
                a.addClass("cur");

                var isOpen = false;
                for (var i=0,l=node.children.length; i<l; i++) {
                    if(node.children[i].open) {
                        isOpen = true;
                        break;
                    }
                }
                if (isOpen) {
                    _that.zTree_Menu.expandNode(node, true);
                    _that.curMenu = node;
                } else {
                    _that.zTree_Menu.expandNode(node.children[0].isParent?node.children[0]:node, true);
                    _that.curMenu = node.children[0];
                }
            } else {
                _that.zTree_Menu.expandNode(node);
            }
        }
        return !node.isParent;
    },
    onClick: function(e, treeId, node){
        var data = node.data;
        var _that = TraceHub;
        _that.showData(data);
    },
    showData: function(data){
        $('#trade_container').find('li').eq(0).children('span').eq(1).text(data.trace_id);
        $('#trade_container').find('li').eq(1).children('span').eq(1).text(data.trace_layer);
        $('#trade_container').find('li').eq(2).children('span').eq(1).text(data.trace_mode);
        $('#trade_container').find('li').eq(3).children('span').eq(1).text(data.callee_mode);
        $('#trade_container').find('li').eq(4).children('span').eq(1).text(data.callee_server_name);
        $('#trade_container').find('li').eq(5).children('span').eq(1).text(data.call_method);
        $('#trade_container').find('li').eq(6).children('span').eq(1).text(data.caller_host);
        $('#trade_container').find('li').eq(7).children('span').eq(1).text(data.caller_port);
        $('#trade_container').find('li').eq(8).children('span').eq(1).text(data.callee_host);
        $('#trade_container').find('li').eq(9).children('span').eq(1).text(data.callee_port);
        $('#trade_container').find('li').eq(10).children('span').eq(1).text(data.callee_endpoint);
        $('#trade_container').find('li').eq(11).children('span').eq(1).text(data.anchor_entry);
        $('#trade_container').find('li').eq(12).children('span').eq(1).text(data.timespan_begin);
        $('#trade_container').find('li').eq(13).children('span').eq(1).text(data.anchor_exit);
        $('#trade_container').find('li').eq(14).children('span').eq(1).text(data.timespan_end);
        $('#trade_container').find('li').eq(15).children('span').eq(1).text(data.timespan);
    },
    init: function(){
        var _that = this;
        _that.setting.callback.beforeClick = _that.beforeClick;
        _that.setting.callback.onClick = _that.onClick;

        document.querySelector('#search_submit').onclick = _that.onBeforeSubmit;
    },
    onBeforeSubmit: function(){
        var _that = TraceHub;
        _that.trace_id = document.querySelector('#trace_id').value;
        _that.timeBegin = document.querySelector('#timeBegin').value;
        _that.timeEnd = document.querySelector('#timeEnd').value;
        if( _that.trace_id == undefined ){
            _that.trace_id = '';
        }

        if(_that.trace_id == ''){
            if(_that.timeBegin == ''){
                _that.timeBegin = _that.nowDate('start');
                document.querySelector('#timeBegin').value = _that.timeBegin.slice(0,10);
            }else{
                _that.timeBegin += ' 00:00:00';
            }
            if(_that.timeEnd == ''){
                _that.timeEnd = _that.nowDate('end');
                document.querySelector('#timeEnd').value = _that.timeEnd.slice(0,10);
            }else{
                _that.timeEnd += ' 23:59:59';
            }
            var boolean = _that.dateCompare(_that.timeBegin,_that.timeEnd);
            if(boolean){
                //弹出提示框
                return false;
            }else {
                var data = {
                    "timeBegin" : _that.timeBegin,
                    "timeEnd" : _that.timeEnd,
                };
            }
        }else{
            var data = {
                "trace_id" : _that.trace_id,
            };
        }
        _that.getData(data);
    },
    nowDate: function(m){
        var a = new Date();
        var n = a.getFullYear();
        var y = a.getMonth() + 1;
        var d = a.getDate();
        if(m == 'start'){
            return n +'-'+ (y>=10?y:'0'+y)+'-' + (d>=10?d:'0'+d) + ' 00:00:00';
        }else{
            return n+'-'+ (y>=10?y:'0'+y)+'-' + (d>=10?d:'0'+d) + ' 23:59:59';
        }
    },
    dateCompare: function(start,end){
        var a = new Date(start).getTime();
        var b = new Date(end).getTime();
        if(a > b){
            return true;
        }else{
            return false;
        }
    },
    getData: function(data){
        var _that = this;

        $.ajax({
            url : _that.url,
            type: "post",
            dataType: "json",
            data: data
        }).done(function( res ){
            if(res == null || res == []){
                //alert('无数据返回');
                return false;
            }
            console.log(JSON.stringify(res));
            var trace_detail=[];
            var trace_id=null;
            for (var item of res){
                var trace;
                if(trace_id != null && trace_id == item.trace_id){
                    trace = {
                        id : Number(trace_id)+1,
                        pId : trace_id,
                        name: "trace_layer "+item.trace_layer,
                        data: item
                    };
                    trace_detail.push(trace);
                }else if(trace_id == null){
                    trace_id = item.trace_id;
                    trace = {
                        id : trace_id,
                        pId : 0,
                        name: "trace_id "+trace_id,
                        open: true
                    };
                    trace_detail.push(trace);
                    trace = {
                        id : Number(trace_id)+1,
                        pId : trace_id,
                        name: "trace_layer "+item.trace_layer,
                        data: item
                    };
                    trace_detail.push(trace);
                }else{
                    trace_id = item.trace_id;
                    trace = {
                        id : trace_id,
                        pId : 0,
                        name: "trace_id "+trace_id,
                    };
                    trace_detail.push(trace);
                    trace = {
                        id : Number(trace_id)+1,
                        pId : trace_id,
                        name: "trace_layer "+item.trace_layer,
                        data: item
                    };
                    trace_detail.push(trace);
                }
            }
            _that.zNodes = trace_detail;
            _that.initZTree();
        }).fail(function(xhr, textStatus, errorThrown){
            console.log(xhr.responseText);
            console.log(textStatus);
        });
    },
    initZTree : function(){
        var _that = this;
        $.fn.zTree.init($("#trade_menu"), _that.setting, _that.zNodes);
        _that.zTree_Menu = $.fn.zTree.getZTreeObj("trade_menu");
        _that.curMenu = _that.zTree_Menu.getNodes()[0].children[0];
        _that.zTree_Menu.selectNode(_that.curMenu);
        var a = $("#" + _that.zTree_Menu.getNodes()[0].tId + "_a");
        a.addClass("cur");
        _that.showData(_that.zTree_Menu.getNodes()[0].children[0].data);
        $('#trade_container').addClass('show');
    }
};

TraceHub.init();