$("#btn1").on("click", function () {
    let website = $("#website").val().toLowerCase();
    let gmail = $("#gmail").val();
    let password = $("#password").val();

    $("#website").val('');
    $("#gmail").val('');
    $("#password").val('');

    if (!website || !gmail || !password) {
        return false;
    }

    let getData = JSON.parse(localStorage.getItem("website")) || {};
    let check = website in getData;
    let dd = check ? getData[website] : getData;
    //console.log("DD:", dd);

    let arr = getData;

    if (check) {
        let web = dd;
        web.unshift({ gmail: gmail, password: password });
        arr[website] = web;
    } else {
        let web = [{ gmail: gmail, password: password }];
        arr[website] = web;
    }

    localStorage.setItem("website", JSON.stringify(arr));
});


$(".backBtn").each(function(){

    $(this).on("click", function(){
        let getTemp = $("body").attr("class");
        
        if(getTemp === "temp3"){
            $("body").attr("class", "temp2");
        }
        else if(getTemp === "temp2"){
            $("body").attr("class", "temp1");
        }
    });
});

const syncTransiction = function () {
    $(".boxx, .box31").remove();

    let get = JSON.parse(localStorage.getItem("website"));

    console.log("html : ", get);
    for (let x in get) {
        $(".box2 .websites").append(`<box class="boxx">${x}</box>`);
    }

    if (get !== null) {
        $(".btn-delete").css({display: "block"});
    }
    else {
        return false;
    }
};

$("#show").on("click", function () {
    $('body').attr("class", "temp2");
    syncTransiction();
});

$("box#refrace").on("click", function () {
    $(this).find("i").toggleClass("rotate");
    syncTransiction();
});

$(".btn-delete").on("click", function(){
    localStorage.removeItem("website");
    syncTransiction();
    $("body").attr("class", "temp1");
});

$("html").on("click", "box.boxx",function () {

        let This = $(this).text();
        //console.log("This: "+ This);
        $(".mai").html('');

        $("body").attr("class", "temp3");
        
        let get = JSON.parse(localStorage.getItem("website"));
        console.log("Get: ", get);
        
                 get[This].forEach(function(data) {
                     $(".mai").append(`<box class="main"> <box class="cc main1">${data.gmail}</box> <box class="cc main2">${data.
password}</box> </box>`);

        $(".cc").each(function(){
            $(this).on("click", function(){
                let IdVal = $(this).text();
                if(IdVal){
                    navigator.clipboard.writeText(IdVal)
                    .then(()=>{
                        alert(IdVal);
                    }) .catch((error)=>{
                        alert(error + " Copied failed.");
                    })
                }
                else{
                    alert("Error!");
                }
            });
        });
    });
});



