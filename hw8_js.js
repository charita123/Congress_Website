var app=angular.module("hw8",['angularUtils.directives.dirPagination','ui.bootstrap']);
app.controller('ctrl', function($scope,$http) {
    $scope.states1 = {  "AL": "Alabama" ,  "AK" : "Alaska", "AZ":"Arizona",  "AR":"Arkansas", "CA" :  "California", "CO" :"Colorado","CT" : "Connecticut" ,  "DE"  : "Delaware", "DC" : "District Of Columbia" , "MT" : "Montana"  , "NE" : "Nebraska" , "NV" : "Nevada"  , "NH" : "New Hampshire"  , "NJ" : "New Jersey" , "NM" : "New Mexico" , "NY" : "New York" , "NC" : "North Calorina"  , "ND" : "North Dakota" , "FL":"Florida" , "GA" : "Georgia", "HI": "Hawaii" , "ID" : "Idaho" , "IL" : "Illinois" , "IN" : "Indiana" , "IA" : "Iowa" , "KS" : "Kansas" , "KY" : "Kentucky" , "LA" : "Louisiana", "ME" : "Maine", "MD" : "Maryland" , "MA" : "Massachusetts", "MI" : "Michigan", "MN" : "Minnesota", "MS" : "Mississippi", "MO" : "Missouri" ,  "OH" : "Ohio" , "OK" : "Oklahoma" , "OR" : "Oregon" , "PA" : "Pennsylvania" , "RI" : "Rhode Island" , "SC" : "South Carolina" , "SD" : "South Dakota", "TN" : "Tennessee" , "TX" : "Texas","UT" : "Utah", "VT" : "Vermont" , "VA" : "Virginia", "WA" : "Washington" , "WV" : "West Virginia" , "WI" : "Wisconsin" , "WY" : "Wyoming" ,"Ams":"American Samoa" , "Gm" : "Guam" ,"NMi" :"Northern Mariana Islands" , "Pt":"Puerto Rico" , "USV":"US Virgin Islands"};
  
    
    var val=true;
   $scope.init=function(){
      document.getElementById("navbar").style.display="block";
       document.getElementById("leg").style.display="block";
       document.getElementById("lleg").className="active";
       
       
   }
    $scope.menu=function(){
        if(val==true){
            document.getElementById("navbar").style.display="none";  
            val=false;
            document.getElementById("mc").className="col-md-12 col-xs-12";
        }
        else{
            
            document.getElementById("navbar").style.display="block";
            document.getElementById("navbar").className="col-md-2 col-xs-2";
            document.getElementById("mc").className="col-md-10 col-xs-10";
            val=true;
        }
       
   }
        
    $scope.dom=function(dom){
        document.getElementById("leg").style.display="none";
        document.getElementById("bill").style.display="none";
        document.getElementById("com").style.display="none";
        document.getElementById("fav").style.display="none";
        
        document.getElementById("lleg").className="";
        document.getElementById("lbil").className="";
        document.getElementById("lcom").className="";
        document.getElementById("lfav").className="";
        
        if(dom=="lleg"){
            document.getElementById("ret1").click();
            document.getElementById("leg").style.display="block";
            document.getElementById("lleg").className="active";
            $scope.dis('leg');
            
            
        }
        else if(dom=="lbil"){
            document.getElementById("ret").click();
            document.getElementById("bill").style.display="block";
            document.getElementById("lbil").className="active";
            $scope.dis('actbil');
            
            
        }
        else if(dom=="lcom"){
            document.getElementById("ret").click();
            document.getElementById("ret1").click();
            document.getElementById("com").style.display="block";
            document.getElementById("lcom").className="active";
            $scope.dis('chouse');
            
            
        }
        else if(dom=="lfav"){
            document.getElementById("ret").click();
            document.getElementById("ret1").click();
            document.getElementById("fav").style.display="block";
            document.getElementById("lfav").className="active";
            $scope.favdis('fleg');
            $scope.favdis('fbil');
            $scope.favdis('fcom');
            
            
            
        }
        
    }
    $scope.disdet=function(obj){
        $scope.idet=obj;
        var d = new Date();
        var end = new Date(obj.term_end);
        var start = new Date(obj.term_start);
        $scope.pb= Math.round((d-start)/(end-start)*100);
        if(!(localStorage.getItem("favleg")===null)){
        $scope.legarray = JSON.parse(localStorage.getItem("favleg"));
        }
        if($scope.legarray==undefined || $scope.legarray.indexOf(obj.bioguide_id)==-1){
        $scope.sel=false;  }
        else{
            $scope.sel=true;
        }
        
       var urlc="http://104.198.0.197:8080/committees?member_ids="+$scope.idet.bioguide_id+"&apikey=478638a5a0b643d3abcb4a8febfe2428&per_page=5";
        $http({
        method: 'GET',
        url : 'http://LowCost-env.g4sffpmg3j.us-west-2.elasticbeanstalk.com/',
            params : {'furl':urlc}
    }).then(function successCallback(response){ 
        $scope.dcom = response.data.results;
            });
        
        var urlb="http://104.198.0.197:8080/bills?sponsor_id="+$scope.idet.bioguide_id+"&apikey=478638a5a0b643d3abcb4a8febfe2428&per_page=5";
        $http({
        method: 'GET',
        url : 'http://LowCost-env.g4sffpmg3j.us-west-2.elasticbeanstalk.com/',
            params : {'furl':urlb}
    }).then(function successCallback(response){ 
        $scope.dbil = response.data.results;
            });
        $scope.dom('lleg');
       
    }
    
    $scope.disbdet=function(obj){
        $scope.ibdet=obj;
        
        if(!(localStorage.getItem("favbill")===null)){
        $scope.billarray = JSON.parse(localStorage.getItem("favbill"));
        }
        
        if($scope.billarray==undefined || $scope.billarray.indexOf(obj.bill_id)==-1){
        $scope.sel=false;  }
        else{
            $scope.sel=true;
        }
        $scope.dom('lbil');
        
    }
    
$scope.fent=function(obj,type){
    if($scope.count==undefined){
   $scope.legarray=[];
        $scope.legdet=[];
    $scope.billarray=[];
        $scope.billdet=[];
    $scope.comarray=[];
        $scope.comdet=[];
     $scope.count=1;   
    }
   
    if(type=="legislator"){
        if(localStorage.getItem("favleg")===null){
        $scope.legarray=[];
            $scope.legdet=[];
    }
    else{
        $scope.legarray=JSON.parse(localStorage.getItem("favleg"));
         $scope.legdet=localStorage.getItem("favdet");
    $scope.legdet = JSON.parse($scope.legdet);
    }
    if(!$scope.sel){
        $scope.sel=true;
        $scope.legarray.push(obj.bioguide_id);
        $scope.temp = JSON.stringify($scope.legarray);
        
        
        $scope.legdet.push(obj);
        $scope.slegdet=JSON.stringify($scope.legdet);
        
        localStorage.setItem("favleg", $scope.temp);
        localStorage.setItem("favdet", $scope.slegdet);
        
    }
    else{
        $scope.legdet.splice($scope.legarray.indexOf(obj.bioguide_id),1);
        $scope.slegdet=JSON.stringify($scope.legdet);
        
        
        $scope.legarray.splice($scope.legarray.indexOf(obj.bioguide_id),1);
        $scope.temp=JSON.stringify($scope.legarray);
        
        localStorage.setItem("favleg", $scope.temp);
        localStorage.setItem("favdet", $scope.slegdet);
       
        $scope.sel=false;
    }
    }
    else if(type=="bill"){
        if(localStorage.getItem("favbill")===null){
        $scope.billarray=[];
            $scope.billdet=[];
    }
    else{
        $scope.billarray=JSON.parse(localStorage.getItem("favbill"));
         $scope.billdet=localStorage.getItem("favbdet");
    $scope.billdet = JSON.parse($scope.billdet);
    }
    if(!$scope.sel){
        $scope.sel=true;
        $scope.billarray.push(obj.bill_id);
        $scope.tempb = JSON.stringify($scope.billarray);
        
        $scope.billdet.push(obj);
        $scope.sbildet=JSON.stringify($scope.billdet);
        
        localStorage.setItem("favbill", $scope.tempb);
        localStorage.setItem("favbdet", $scope.sbildet);
        
        
    }
    else{
        $scope.billdet.splice($scope.billarray.indexOf(obj.bioguide_id),1);
        $scope.sbildet=JSON.stringify($scope.billdet);
        
        $scope.billarray.splice($scope.billarray.indexOf(obj.bioguide_id),1);
        $scope.tempb = JSON.stringify($scope.billarray);
        
        localStorage.setItem("favbill", $scope.tempb);
        localStorage.setItem("favbdet", $scope.sbildet);
        
        $scope.sel=false;
    }
    }
    else if(type=="committee"){
        if(localStorage.getItem("favcom")===null){
        $scope.comarray=[];
            $scope.comdet=[];
    }
    else{
        $scope.comarray=JSON.parse(localStorage.getItem("favcom"));
         $scope.comdet=localStorage.getItem("favcdet");
    $scope.comdet = JSON.parse($scope.comdet);
    }
    if(!obj.sel){
        obj.sel=true;
        
        
        for(var i=0; i<$scope.cres.length;i++){
            if($scope.cres[i].committee_id==obj.committee_id){
                $scope.cres[i].sel=true;
            }
        }
        
        $scope.comarray.push(obj.committee_id);
        $scope.tempc= JSON.stringify($scope.comarray);
        
        $scope.comdet.push(obj);
        $scope.scomdet = JSON.stringify($scope.comdet);
        
        localStorage.setItem("favcdet",$scope.scomdet);
        localStorage.setItem("favcom", $scope.tempc);
        
        
        localStorage.setItem("clsdet", JSON.stringify($scope.cres));
         $scope.cres=JSON.parse(localStorage.getItem("clsdet"));
        
    }
    else{
        $scope.comdet.splice($scope.comarray.indexOf(obj.committee_id),1);
        $scope.scomdet=JSON.stringify($scope.comdet);
        
        $scope.comarray.splice($scope.comarray.indexOf(obj.committee_id),1);
        $scope.tempc = JSON.stringify($scope.comarray);
        
        localStorage.setItem("favcom", $scope.tempc);
        localStorage.setItem("favcdet", $scope.scomdet);

        
        obj.sel=false;
        for(var i=0; i<$scope.cres.length;i++){
            if($scope.cres[i].committee_id==obj.committee_id){
                $scope.cres[i].sel=false;
                break;
            }
        }
                localStorage.setItem("clsdet", JSON.stringify($scope.cres));
                $scope.cres=JSON.parse(localStorage.getItem("clsdet"));

      
    }
    }
}
$scope.del=function(obj,type){
   
    if(type=="legislator"){
         if(localStorage.getItem("favleg")===null){
        $scope.legarray=[];
            $scope.legdet=[];
    }
    else{
        $scope.legarray=JSON.parse(localStorage.getItem("favleg"));
         $scope.legdet=localStorage.getItem("favdet");
    $scope.legdet = JSON.parse($scope.legdet);
    }
   
        $scope.legdet.splice($scope.legarray.indexOf(obj.bioguide_id),1);
        $scope.slegdet=JSON.stringify($scope.legdet);
        
        
        $scope.legarray.splice($scope.legarray.indexOf(obj.bioguide_id),1);
        $scope.temp=JSON.stringify($scope.legarray);
        
        localStorage.setItem("favleg", $scope.temp);
        localStorage.setItem("favdet", $scope.slegdet);
       
        
    }
    else if(type=="bill"){ 
        if(localStorage.getItem("favbill")===null){
        $scope.billarray=[];
            $scope.billdet=[];
    }
    else{
        $scope.billarray=JSON.parse(localStorage.getItem("favbill"));
         $scope.billdet=localStorage.getItem("favbdet");
    $scope.billdet = JSON.parse($scope.billdet);
    }

        $scope.billdet.splice($scope.billarray.indexOf(obj.bioguide_id),1);
        $scope.sbildet=JSON.stringify($scope.billdet);
        
        $scope.billarray.splice($scope.billarray.indexOf(obj.bioguide_id),1);
        $scope.tempb = JSON.stringify($scope.billarray);
        
        localStorage.setItem("favbill", $scope.tempb);
        localStorage.setItem("favbdet", $scope.sbildet);
        
        $scope.sel=false;
    
    }
    else if(type=="committee"){
         if(localStorage.getItem("favcom")===null){
        $scope.comarray=[];
            $scope.comdet=[];
    }
    else{
        $scope.comarray=JSON.parse(localStorage.getItem("favcom"));
         $scope.comdet=localStorage.getItem("favcdet");
    $scope.comdet = JSON.parse($scope.comdet);
    }
    if(obj.sel){
        $scope.comdet.splice($scope.comarray.indexOf(obj.committee_id),1);
        $scope.scomdet=JSON.stringify($scope.comdet);
        
        $scope.comarray.splice($scope.comarray.indexOf(obj.committee_id),1);
        $scope.tempc = JSON.stringify($scope.comarray);
        
        localStorage.setItem("favcom", $scope.tempc);
        localStorage.setItem("favcdet", $scope.scomdet);

        
        obj.sel=false;
        for(var i=0; i<$scope.cres.length;i++){
            if($scope.cres[i].committee_id==obj.committee_id){
                $scope.cres[i].sel=false;
                break;
            }
        }
                localStorage.setItem("clsdet", JSON.stringify($scope.cres));
                $scope.cres=JSON.parse(localStorage.getItem("clsdet"));

      
    }
    }
    
}
$scope.favdis=function(type){  
    
    if($scope.flist == undefined ){
        $scope.flist=[];
        $scope.fblist=[];
        $scope.fclist=[];
    }
    if(type=="fleg" && localStorage.getItem("favdet")!="" && localStorage.getItem("favdet")!=null){
        $scope.flist=localStorage.getItem("favdet");
        $scope.flist=JSON.parse($scope.flist);
        
    }if(type=="fbil" && localStorage.getItem("favbdet")!="" && localStorage.getItem("favbdet")!=null){
        $scope.fblist=localStorage.getItem("favbdet");
        $scope.fblist=JSON.parse($scope.fblist);
       
    }
    if(type=="fcom"){
        if(!(localStorage.getItem("favcdet")===null)){
        $scope.fclist=localStorage.getItem("favcdet");
        $scope.fclist=JSON.parse($scope.fclist);  
        }
        else{
            $scope.fclist=[];
        }
    
    }
    
}

    
$scope.dis=function(opt){
        
         $http({
        method: 'GET',
        url : 'http://LowCost-env.g4sffpmg3j.us-west-2.elasticbeanstalk.com/',
            params : {'furl':"http://104.198.0.197:8080/bills?last_version.urls.pdf__exists=true&apikey=478638a5a0b643d3abcb4a8febfe2428&per_page=50&history.active=false"}
    }).then(function successCallback(response){ 
        $scope.nbres = response.data.results;
            });
     $http({
        method: 'GET',
        url : 'http://LowCost-env.g4sffpmg3j.us-west-2.elasticbeanstalk.com/',
            params : {'furl':"http://104.198.0.197:8080/legislators?per_page=all&apikey=478638a5a0b643d3abcb4a8febfe2428"}
    }).then(function successCallback(response){ 
        $scope.lres = response.data.results;
            });
     $http({
        method: 'GET',
        url : 'http://LowCost-env.g4sffpmg3j.us-west-2.elasticbeanstalk.com/',
            params : {'furl':"http://104.198.0.197:8080/bills?last_version.urls.pdf__exists=true&apikey=478638a5a0b643d3abcb4a8febfe2428&per_page=50"}
    }).then(function successCallback(response){ 
        $scope.abres = response.data.results;
            });
     $http({
        method: 'GET',
        url : 'http://LowCost-env.g4sffpmg3j.us-west-2.elasticbeanstalk.com/',
            params : {'furl':"http://104.198.0.197:8080/committees?apikey=478638a5a0b643d3abcb4a8febfe2428&per_page=all"}
    }).then(function successCallback(response){ 
         if(localStorage.getItem("clsdet")===null){
            $scope.cres = response.data.results;  
             
            for(var i=0; i<$scope.cres.length;i++){
                var it = $scope.cres[0];
                it.sel=false;
            }
             localStorage.setItem("clsdet",JSON.stringify($scope.cres));
            
        }
         else{
             
            $scope.cres=JSON.parse(localStorage.getItem("clsdet"));
         }
     });
    
}
$scope.dis('leg');

});