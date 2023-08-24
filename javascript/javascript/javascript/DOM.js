/*let elemclass=document.getElementsByClassName("container")
console.log(elemclass);
let elemid=document.getElementById("button");
 //elem[0]=elem[0].innerHTML;
 //elem[0].style.backgroundColor="yellow";
 //elem[1].innerHTML;
 //elem[0].classList.add("bg-primary");
 //console.log(elem.innerHTML);
 //console.log(elem.innerText);
 console.log(document.getElementById("button"));
 console.log(elem.innerText);
 console.log(elemid.innerHTML);
 console.log(elemid.innerText);
 console.log(elemclass[0].innerHTML);
 elemid.idList.add("bg-primary");
elemclass[0]=elemclass[0].inner;    
var e=[1,2,3,4,5,6,7,8,9];
console.log(typeof e);*/
tn=document.getElementsByTagName("div");
console.log(tn);
createdElement=document.createElement("P");
createdElement.innerText="this is nitin";
tn[0].appendChild(createdElement) ;
//tn[0].style.color="green",style.display="inline" ;
createdElement2=document.createElement("b");
createdElement2.innerText="this is bold";
tn[0].replaceChild(createdElement2,createdElement);
 tn[0].removeChild(createdElement2);
sel =document.querySelector(".container");
console.log(sel);
sel=document.querySelectorAll(".container");
console.log(sel);

//events in javascript

//id.addEventListener("clicked",function() {
 //    console.log(alert("page is loading"))   }   );

/* function clicked(){
    console.log(alert("page is loading"));
    //console.log("alert");
 }*/

 clicked = ()=>
 {
    console.log(alert("page is loading"));
    console.log("alert");
 }
 //setTimeout(clicked,2000);
  //clr=setInterval(clicked,10000);


  var a=[,2,3,4,5];
  var b=a.map((item) =>{
   return (item >=2);
  })
console.log(b)
document.getElemen