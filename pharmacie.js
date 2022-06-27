var myBTN = document.getElementById('mybtn_client');
var inputClient = document.getElementById('name');
var bodyClientList = document.getElementById('display_clientlist');
var inputName = document.getElementById("name_client")
var BTNsearch = document.getElementById('search_client')
var medsInfos = document.getElementById('item_1_4')


let main_client_list = [];
let main_medoc_list = [];
let first_names = ["Elie", "Eric", "Eva", "Fidèle", "Zidane", "Henri","Nordine", "Sam", "Alain", "Alphonse", "Bill", "Édith", "Edmond"];
let last_names = ["Coptère", "Hochet", "Porée", "Hamoimème", "Gol","Ateur", "Suffy", "Térrieur","Danlmur","Hattérahl", "Orial", "Edmond"];
let medoc_names = ["Doliprane", "Temesta", "Prozac","Viagra", "Bétadine", "Smecta","Vogalene", "Lamaline", "Orelox", "Lasilix","Ventoline"];
let medoc_condition = ["500mg","1000mg","2g","20g", "250g", "3000", "5G"];
//generate client.list
for (i=0;i<20;i++){
    let myname = first_names[Math.floor(Math.random()*first_names.length)] + " " + last_names[Math.floor(Math.random()*last_names.length)].toUpperCase();
    main_client_list[i] = new client(i,myname,100)
}

//generate medoc list
for (i=0;i<20;i++){
    let mymedoc = medoc_names[Math.floor(Math.random()*medoc_names.length)] + " " + medoc_condition[Math.floor(Math.random()*medoc_condition.length)];
    main_medoc_list[i] = new medicament(i,mymedoc,Math.floor((Math.random()*100)*100)/100,100)
}

let mypharma = new pharmacie("Pharmacie de Toolose", "Dr Robert Pasteur", main_client_list, main_medoc_list)
mypharma.affiche();

