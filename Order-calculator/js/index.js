//accordion navbar
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}




// onclick function for change page
function changPage(pageId){
    document.getElementById("c-box").style.opacity = 0;
    document.getElementById("result").style.opacity = 0;
    setTimeout(() => {
    document.getElementById("c-box").style.display = "none";
    document.getElementById("result").style.display = "none";
    pageId.style.display = "block";
    pageId.style.opacity=1;
    }, 500);
}
// define default language
var mylang ={
    lang: "python3",
    version: "2" }
var Tawans= [];
var mypoints = "";
var flag = 0;
function calculate(mytextarea , num){
    if(num == 0){
        flag =0;
    }
    else{
        flag=num;
    }
    changPage(result);
    mypoints = "";
    let code1 = mytextarea.value;
    var sendcode ;
        for(var i = 1 ; i< 6 ; i++){
            sendcode = "n = "+i+";\n" +code1;
            findpoint(sendcode,i);
        }
}
function achiveMethod(points){
    var data = {
        tool : 'lagrange-interpolating-polynomial',
        points : points
    };
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    for (var name in data){
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
    var url2 = "https://www.dcode.fr/api/";
    var funcreq = new XMLHttpRequest();
    funcreq.open("POST",url2);
    funcreq.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    funcreq.send(urlEncodedData);
    funcreq.onload = () => {
        var str = JSON.parse(funcreq.response).results;
        str = str.slice(10 , -3);
        console.log(flag);
        if (flag == 0){
            show(str);
        }
        else{
            var x = str.indexOf("x");
            var t = str.indexOf("^");
            var tavan="0";
            if(x==-1){
                tavan="0";
            }
            else if(t==-1){
                tavan = "1";
            }
            else if(x!=-1 && t!=-1){
                x+=2;
                while(str[x]!="+" && str[x] != "-" && x != str.lenght &&str[x]!="}"){
                    tavan+=str[x];
                    x++;
                }
            }
            Tawans[flag-1] = tavan;
            if(Tawans[0] != -1 && Tawans[1] !=-1){
                comp();
            }
            else{
                calculate(compTwo,2);
            }
        }
    }
}
function findpoint(sendcode , i){
    var count = 0;
    var req = new XMLHttpRequest();
    var mypoint = "";
    const url = "https://api.jdoodle.com/v1/execute";
    var payloads = {clientId: "4d105355abc78f2c203c7cee47653603",
                    clientSecret: "99ba98cb0ed092daa7242014a7f7a8dd02beb181e50b7875b8ba758c6859308b",
                    script: sendcode,
                    language: mylang.lang ,
                    versionIndex: mylang.version};
    req.open("POST", url);
    req.setRequestHeader('Content-type', 'application/json');
    var jsoned = JSON.stringify(payloads)
    req.send(jsoned);
    req.onload = () => {
            var a = JSON.parse(req.response);
            console.log(a);
            for (item in a.output){
                if(a.output[item] ==="*"){
                    count++;
                }
            }
            mypoints += "("+i+","+count+")";
            if(i==5){
                return achiveMethod(mypoints);
            }
    };
}
function Compare(){
    Tawans = [-1 , 1];
    calculate(compOne,1);
}
function comp(){
    if(Tawans[0] > Tawans[1]){
        show("Your first input as your code is probably greater than the second one .");
    }
    else if(Tawans[0] < Tawans[1]){
        show("Your second input as your code is probably greater than the first one .");
    }
    else{
        show("Both are Equal .");
    }
    // document.getElementById("content").style.display = "none";
}
function show(result){
    // document.write("This is Output (Order) . . . ");
    // document.getElementById("final--result").style.display = "none";
    document.getElementById("result").innerHTML = result;
    
}