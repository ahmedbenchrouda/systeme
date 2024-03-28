let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total')
let count =document.getElementById('count');
let category =document.getElementById('category')
let  submit =document.getElementById('submit');
let mood='creat';
let tmp;
function getTotale(){
   if(price.value!=''){

    let result=(+price.value + +taxes.value + +ads.value)-+discount.value
   total.innerHTML=result;
   total.style.background='#040';
   }else{
    total.style.background='#a00d02';
    total.innerHTML='';
   }
}
let datapro;
if(localStorage.product!=null){
datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}

//clear data
function clearData(){
title.value='';
price.value='';
taxes.value='';
ads.value ='';
discount.value='';
count.value ='';
total.innerHTML=''

}

submit.onclick=function(){
    let newpro={
        title: title.value.toLowerCase(),
        price:price.value,
        ads:ads.value,
        taxes: taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mood==='creat'){
if(newpro.count >1){
   for(let i =0;i<newpro.count;i++){
    datapro.push(newpro)
    
   }
}else{
    datapro.push(newpro)
}
}else{
    datapro[tmp] = newpro 
    mood='creat' ;
    submit.innerHTML='creat';
    count.style.display='block'
}
    
    localStorage.setItem('product',JSON.stringify(datapro))
    showdata()
    clearData()
 

}


//read
function showdata(){
    getTotale()
    let table='';
for(let i= 0;i<datapro.length;i++){
table+=`
<tr>
<td>${[i]}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].category}</td>
<td><button onclick="updateData(  ${i}  )" id="update">update</button></td>
<td><button onclick="deleteData(  ${i}  )" id="delete">delete </button></td>
</tr>`
}
document.getElementById('tbody').innerHTML =table;
let btnd=document.getElementById('deleteAll')
if(datapro.length>0){
btnd.innerHTML=`
<button onclick ="deleteAllData()">delete All(${datapro.length})</button>
`

}else{
    btnd.innerHTML=''    
}

}

showdata()



function deleteData (i){
   datapro.splice(i,1)
   localStorage.product =JSON.stringify(datapro)
   showdata()
}



function deleteAllData(){
localStorage.clear()
datapro.splice(0)
showdata()
}
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
getTotale()
    category.value = datapro[i].category;
    count.style.display='none'
   submit.innerHTML='update';
  mood="update"
tmp =i;   
scroll({
    top :0,
    behavior:'smooth'
})


}
let searchMood='title';
function getsearchMood(id){
    let search=document.getElementById('Search');
   if(id==='searchTitle'){
    searchMood='title';
  
   }else{
    searchMood='category'
   
   }
   search.placeholder ='search by '+searchMood;
search.focus()
search.value=''
 showdata()
}
function searchData(value ){
    let table='' ;
    for(let i=0;i<datapro.length;i++){
 if(searchMood==='title'){
    if(datapro[i].title.includes(value.toLowerCase())){  
        table+=   `
<tr>
<td>${[i]}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].category}</td>
<td><button onclick="updateData(  ${i}  )" id="update">update</button></td>
<td><button onclick="deleteData(  ${i}  )" id="delete">delete </button></td>
</tr>`
    }

 } else{
  
         if(datapro[i].category.includes(value.toLowerCase())){  
             table+=   `
     <tr>
     <td>${[i]}</td>
     <td>${datapro[i].title}</td>
     <td>${datapro[i].price}</td>
     <td>${datapro[i].taxes}</td>
     <td>${datapro[i].ads}</td>
     <td>${datapro[i].discount}</td>
     <td>${datapro[i].total}</td>
     <td>${datapro[i].category}</td>
     <td><button onclick="updateData(  ${i}  )" id="update">update</button></td>
     <td><button onclick="deleteData(  ${i}  )" id="delete">delete </button></td>
     </tr>`
         }
        
        
 }
}
document.getElementById('tbody').innerHTML =table;
}

 
 
