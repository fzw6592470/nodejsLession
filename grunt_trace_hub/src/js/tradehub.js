var tradehub = {
    url : undefined,
    trade_id : undefined,
    init : function(){
        this.url = document.getElementById('trade_url').value; 
    },
    onBeforeSubmit : function(){
        this.trade_id = document.getElementById('trade_id').value; 
    },
    onPost : function(){
        
    }
};
