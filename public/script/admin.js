
document.addEventListener("DOMContentLoaded",()=>{
 const ids = ["new_category","new_image"];
 let currentForm = "new_category";
const update  = (()=>{
    ids.forEach((identifier)=>{
        if(identifier!=currentForm) document.getElementById(identifier).style.display = "none";
        else document.getElementById.display = "initial";
    });
})();

 document.addEventListener("click", (event)=>{
   if(event.target.tagname=="button"){
   currentForm = event.target.textContent.replace(" ","_").toLowerCase();
   console.log(currentForm);
   update();
   }
 });




});