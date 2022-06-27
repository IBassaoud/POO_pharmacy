
class client {
    constructor(id, nom,credit){
        this.id = id
        this.nom = nom;
        this.credit = credit;
    }
}

class medicament {
    constructor(id,nom,prix,stock){
        this.id = id
        this.nom = nom;
        this.prix = prix;
        this.stock = stock;
    }
}


class pharmacie{
    constructor(nom,proprietaire,client_list,medoc_list){
        this.nom = nom;
        this.proprietaire = proprietaire;
        this.client_list = client_list;
        this.medoc_list = medoc_list;
    }
    affiche(){
        //display both all elements in lists clients and meds in 1 button
        this.affiche_clients.bind(this);
        this.affiche_medocs.bind(this);
        //display the form but hide the element of the list of clients and meds
        document.getElementById('mybtn_display').addEventListener('click',this.affiche_vide.bind(this));
        // document.getElementById('mybtn_display').addEventListener('click',this.affiche_vide_medocs.bind(this));
        //display all elements in lists clients for 1 button and all meds for 2nd button
        document.getElementById('display_all_clients').addEventListener('click',this.affiche_clients.bind(this));
        document.getElementById('display_all_meds').addEventListener('click',this.affiche_medocs.bind(this));
        //look for an indivual element in my client list for my 1st event listener and in my meds lists for my 2nd event listener 
        document.getElementById('search_a_client').addEventListener("click",this.search_me_client.bind(this));
        document.getElementById('search_a_medoc').addEventListener("click",this.search_me_drug.bind(this));
        //Button search for a med in the inventory interface
        document.getElementById("mybtn_med_search").addEventListener("click",this.lireMedicament.bind(this));
        //event listener for my button add to trigger my function that adds the input value to the inventory
        document.getElementById("add_quantity").addEventListener("click",this.approvisionnement.bind(this));
        //event lister for my button edit to trigger my function that will update the price of the select med
        document.getElementById("add_new_price").addEventListener("click",this.changerprixMed.bind(this));
        //Purchase function
        document.getElementById("mybtn_purchase").addEventListener("click",this.achat.bind(this));
        //bye bye function
        document.getElementById("mybtn_leave").addEventListener("click",this.quitter.bind(this));

    }
    affiche_vide(){
        let mydisplay = document.querySelectorAll('.class_display'); //display my fieldset clients, médicaments, approvisionnement and achat
        let hideQuitter = document.getElementById('display_leave_msg');
        hideQuitter.innerHTML = "";
        let displayInv = document.getElementById('update_inventory');
        displayInv.innerHTML = ""
        let displayMEDS = document.getElementById('display_medoc_list'); //get the aream from my HTML to display the meds lists
        displayMEDS.innerHTML = "";
        let displayCLT = document.getElementById('display_clientlist'); //get the area from my HTML to display the clients list
        displayCLT.innerHTML = ""
        let displayEditPrice = document.getElementById('update_price');
        displayEditPrice.innerHTML =""
        let displayMedItem = document.getElementById('display_med_item');
        displayMedItem.innerHTML =""
        let displayPurchased = document.getElementById('display_medoc_purchased');
        displayPurchased.innerHTML = ""
        let allInputs = document.getElementsByTagName('input')
        for (let inp of allInputs) {
            inp.value = null;
        }
        for (let d = 0; d < mydisplay.length; d++) { 
            mydisplay[d].style.display = "block"; //Loop through all the fieldset classes and change their display from none to block
        }

    }

    affiche_clients(){
        // let mydisplay = document.querySelectorAll('.class_display'); //display my fieldset clients, médicaments, approvisionnement and achat
        let hideQuitter = document.getElementById('display_leave_msg');
        hideQuitter.innerHTML = "";
        // for (let d = 0; d < mydisplay.length; d++) { 
        //     mydisplay[d].style.display = "block"; //Loop through all the fieldset classes and change their display from none to block
        // }
        let displayCLT = document.getElementById('display_clientlist'); //get the area from my HTML to display the clients list
        displayCLT.innerHTML = ""
        for (let clt of this.client_list){ //for each client in my array print me his ID, his NAME, his Credit..
            clt.id += 1
            displayCLT.innerHTML += `<div class='mydiv_row'><div  class="style_div_clt1">${clt.id}.</div><div  class="style_div_clt2"><strong>${clt.nom}</strong></div><div  class="style_div_clt3">Crédit : <strong>${clt.credit} €</strong></div></div>`
            clt.id -= 1
        }
    }

    search_me_client(){
        let inputSearchClient = document.getElementById('name_client').value;
        let displayCLT = document.getElementById('display_clientlist');
        var myclient
        for (let i = 0; i < this.client_list.length; i++){
            if (this.client_list[i].nom == inputSearchClient){
                myclient = this.client_list[i];
                myclient.id += 1
                // displayMed.innerHTML = `<div>${mymed.id}. <strong>${mymed.nom}</strong> | Prix : <strong>${mymed.prix} €</strong> | Stock : <strong>${mymed.stock}</strong></div>`
                displayCLT.innerHTML = `<div class='mydiv_row'><div  class="style_div_clt1">${myclient.id}.</div><div  class="style_div_clt2"><strong>${myclient.nom}</strong></div><div  class="style_div_clt3">Crédit : <strong>${myclient.credit} €</strong></div></div>`
                myclient.id -= 1
                break;
            }
            else displayCLT.innerHTML = `<div>Le client <strong>${inputSearchClient}</strong> est introuvable, vérifiez si vous avez saisie le nom du client correctement.</div>`
        }
    }
    
    affiche_medocs(){
        let displayMEDS = document.getElementById('display_medoc_list'); //get the aream from my HTML to display the meds lists
        displayMEDS.innerHTML = ""
        for (let meds of this.medoc_list){ //for each meds in my array print me its ID, its NAME, its price..
            meds.id += 1
            displayMEDS.innerHTML += `<div class='mydiv_row'><div class="style_div_med1">${meds.id}.</div><div  class="style_div_med2"><strong>${meds.nom}</strong></div><div  class="style_div_med3">Prix : <strong>${meds.prix} €</strong></div><div class="style_div_med4">Stock : <strong>${meds.stock}</strong></div></div>`
            meds.id -= 1
        }
    }


    search_me_drug(){
        let inputSearchMed = document.getElementById('name_medoc').value;
        let displayDrug = document.getElementById('display_medoc_list');
        var mydrug
        for (let i = 0; i < this.medoc_list.length; i++){
            if (this.medoc_list[i].nom == inputSearchMed){
                mydrug = this.medoc_list[i];
                mydrug.id += 1
                // displayMed.innerHTML = `<div>${mymed.id}. <strong>${mymed.nom}</strong> | Prix : <strong>${mymed.prix} €</strong> | Stock : <strong>${mymed.stock}</strong></div>`
                displayDrug.innerHTML = `<div class='mydiv_row'><div class="style_div_med1">${mydrug.id}.</div><div  class="style_div_med2"><strong>${mydrug.nom}</strong></div><div  class="style_div_med3">Prix : <strong>${mydrug.prix} €</strong></div><div class="style_div_med4">Stock : <strong>${mydrug.stock}</strong></div></div>`
                mydrug.id -= 1
                break;
            }
            else displayDrug.innerHTML = `<div>Le medicament <strong>${inputSearchMed}</strong> est introuvable, vérifiez si vous avez saisie le nom du medicament correctement.</div>`
        }
    }

        lireMedicament(){
            let inputSearchMed = document.getElementById('medicament').value; //get me the value of my input from my display search meds interface
            let displayMed = document.getElementById('display_med_item'); //get me the area from my HTML to display my result content after loop 
            var mymed
            for (let i = 0; i < this.medoc_list.length; i++){
                if (this.medoc_list[i].nom == inputSearchMed){
                    mymed = this.medoc_list[i];
                    // displayMed.innerHTML = `<div>${mymed.id}. <strong>${mymed.nom}</strong> | Prix : <strong>${mymed.prix} €</strong> | Stock : <strong>${mymed.stock}</strong></div>`
                    displayMed.innerHTML = `<div class='mydiv_row'><div class="style_div_med1">${mymed.id}.</div><div  class="style_div_med2"><strong>${mymed.nom}</strong></div><div  class="style_div_med3">Prix : <strong>${mymed.prix} €</strong></div><div class="style_div_med4">Stock : <strong>${mymed.stock}</strong></div></div>`
                    break;
                }
                else displayMed.innerHTML = `<div>Le médicament <strong>${inputSearchMed}</strong> est introuvable, vérifiez si vous avez saisie le nom du médicament correctement.</div>`
            }
        }

        approvisionnement(){
            let inputSearchMed = document.getElementById('medicament').value; //get me the value of the input of my searched meds
            let displayMed = document.getElementById('update_inventory'); //get me the area from my HTML where to display the response to the user (display the searched meds, update meds)
            let inputQuantityMed = parseInt(document.getElementById('med_quantite').value) //get me the value of the input quantity to add to the inventory of the meds, parseInt to retrieve a nnumber
            let alreadydisplayedMed = document.getElementById('display_med_item');
            let mymed
            for (let j = 0; j < this.medoc_list.length; j++){ //loop throught the array to find the value of my input 
                if (this.medoc_list[j].nom == inputSearchMed){  //which is the meds the user is looking for to display & update
                    mymed = this.medoc_list[j];
                    this.medoc_list[j].stock += inputQuantityMed; //when the meds is found add to it the quantity input value I collected earlier
                    displayMed.innerHTML = `- ${inputQuantityMed} médicaments ont été ajoutés au stock de <strong>${this.medoc_list[j].nom}</strong> <br>` //display all the informartions about what happend i.e that X quantity was added to the meds selected
                    alreadydisplayedMed.innerHTML = `<div class='mydiv_row'><div class="style_div_med1">${mymed.id}.</div><div  class="style_div_med2"><strong>${mymed.nom}</strong></div><div  class="style_div_med3">Prix : <strong>${mymed.prix} €</strong></div><div class="style_div_med4">Stock : <strong>${mymed.stock}</strong></div></div>`
                    break; //break to make the function stop
                }
                else displayMed.innerHTML = `- Saisie incorrect, veuillez d'abord vérifier ou entrer le nom d'un médicament avant de mettre à jour le stock` //if the conditions of the loop aren't met display a message that inform the user to double check
            }
            this.affiche_medocs()
            this.affiche_clients()
        }

        changerprixMed(){
            let inputSearchMed = document.getElementById('medicament').value; //get me the value of the input of my searched meds
            let display = document.getElementById('update_price'); //get me the area from my HTML where to display the response to the user (display the searched meds, update meds)
            let inputNewPrice = parseInt(document.getElementById('med_prix').value) //get me the value of the input quantity to add to the inventory of the meds, parseInt to retrieve a nnumber
            let alreadydisplayedMed = document.getElementById('display_med_item');
            let mymed
            if ( inputNewPrice > 0 ){
                for (let j = 0; j < this.medoc_list.length; j++){ //loop throught the array to find the value of my input 
                if (this.medoc_list[j].nom == inputSearchMed ){  //which is the meds the user is looking for to display & update
                    mymed = this.medoc_list[j];
                    this.medoc_list[j].prix = inputNewPrice; //when the meds is found add to it the quantity input value I collected earlier
                    display.innerHTML = `Vous venez d'assigner un nouveau prix <strong>${inputNewPrice} €</strong> au médicament <strong>${this.medoc_list[j].nom}</strong>` 
                    alreadydisplayedMed.innerHTML = `<div class='mydiv_row'><div class="style_div_med1">${mymed.id}.</div><div  class="style_div_med2"><strong>${mymed.nom}</strong></div><div  class="style_div_med3">Prix : <strong>${mymed.prix} €</strong></div><div class="style_div_med4">Stock : <strong>${mymed.stock}</strong></div></div>`
                    break; //break to make the function stop
                }
                else display.innerHTML = `Veuillez d'abord vérifier ou entrer le nom d'un médicament avant de mettre à jour le prix du médicament` //if the conditions of the loop aren't met display a message that inform the user to double check
            }
            }
            this.affiche_medocs()
            this.affiche_clients()
        }

        achat(){
            let inputSearchClient = document.getElementById('HA_client').value; //get me the value of my input search client from my interface achat
            let inputSearchMed = document.getElementById('HA_med').value; //get me the value of my input search meds 
            let display = document.getElementById('display_medoc_purchased'); //get me the area where to display the total price and new income of the client
            let inputQuantityPurchased = parseInt(document.getElementById('med_quantity_purchased')); //get me the input quantity of the purchased item
            let montant = 0
            let monnewstock 
            let monnewcredit
            let total = 0
            for (let a = 0; a < this.medoc_list.length; a++){ 
                if (this.medoc_list[a].nom == inputSearchMed){ //first loop to get me the right meds which has been submitted
                    for (let b = 0; b < this.client_list.length; b++) { 
                        if (this.client_list[b].nom == inputSearchClient && inputQuantityPurchased > 0){ //Second loop to get the right client which has been submitted
                    montant = inputQuantityPurchased * this.medoc_list[a].prix //when it did found the right mds & client multiply the quantity submitted by the price of the meds selected
                    total = Math.round(montant * 100) / 100 //Math.round (total * 100 ) / 100 to make it limit to 2 decimals in order to prevent infinity decimals
                    let mypreviousstock = this.medoc_list[a].stock 
                    monnewstock = this.medoc_list[a].stock - inputQuantityPurchased; //my new inventory quantity stored into a placeholder variable
                    monnewcredit = this.client_list[b].credit - total //update the income of my client by reducing to his income the total price of the purchased items
                    this.client_list[b].credit = Math.round(monnewcredit * 100) / 100 //limit to 22 decimals in order to prevent infinityyyyyyyyyyyyyyy decimals. Yeah it's ugly
                    this.medoc_list[a].stock = monnewstock //update the inventory quantity stored in the inventory by reducing the amount purchased by the client
                    this.medoc_list[a].id += 1
                    display.innerHTML = `Médicament selectionné :<br><div class='mydiv_row'><div class="style_div_HA1">ID : ${this.medoc_list[a].id}.</div><div  class="style_div_HA2"><strong>${this.medoc_list[a].nom}</strong></div><div  class="style_div_HA3">Prix : <strong>${this.medoc_list[a].prix} €</strong></div><div class="style_div_HA4">Stock : <strong>${mypreviousstock}</strong></div></div> <br><br>
                    Cher client <strong>${this.client_list[b].nom}</strong> votre achat de <strong>${inputQuantityPurchased}</strong> médicaments <strong>${this.medoc_list[a].nom}</strong> au prix total de <strong>${total} €</strong> s'est déroulé avec succès.<br><br>
                    Votre nouveau crédit est de <strong>${this.client_list[b].credit} €</strong><br>
                    Merci pour votre achat.` //display all infos about what happend well it's pretty simple, read the output to lazy to explain.
                    this.medoc_list[a].id -= 1;
                    break; //break... well you need an explanation for this?
                    }
                
                else { display.innerHTML = `Le nom de client <strong>${inputSearchClient}</strong> et/ou le médicament <strong>${inputSearchMed}</strong> n'est pas reconnu.`}
                //else tell the client that something is wrong with the way he used his keyboard to communicate an ¿¿¿"information"???? TO my wonderfull programm, those fat fingers users, wow they make developpers look bad...Unbelieviable! This message is long right? Well I could keep writing but you would break your screen and blame me so I would feel to bad for it... You're a great developper even better than me look you made it even to here, take this big champ :trophy: :trophy:!        
            }
                } else {;} //Literraly? do nothing effective like your life READER.
                }
                this.affiche_clients()
                this.affiche_medocs()
            }

            quitter(){ //this does magic, it makes thing disapear.
                let mydisplay = document.querySelectorAll('.class_display'); //hide my fieldset clients, médicaments, approvisionnement and achat
                for (let d = 0; d < mydisplay.length; d++) { 
                    mydisplay[d].style.display = "none"; //Loop through all the fieldset classes and change their display from block to NONE (like your skills at coding)
                }
                let display = document.getElementById('display_leave_msg');
                display.innerHTML = "<h2>Le programme est terminé, vous pouvez rentrez chez vous.<br>A bientôt</h2>";
            }
        
    }   

    
        


    
