(function(){
    //constructor
    this.modal=function(){
        this.closeButton=null;
        this.overLay=null;
        this.modal=null;
        //Define option
        var defaults={};
        if(arguments[0]&&typeof arguments[0]=="object"){
            this.options=expendDefault(defaults,arguments[0]);
        }
    }
    modal.prototype.open=function(){
        
    }
    //Expand options
    function expendDefault(source,properties){
        var property;
        for(property in properties){
            if(properties.hasOwnProperty(property)){
                source[property]=properties[property];
            }
        }
        return source;
    }
}());