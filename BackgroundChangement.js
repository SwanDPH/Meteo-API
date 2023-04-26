let backgroundOk = document.querySelector(".background")
let buttonVille = document.querySelector(".buttonVille")
let ville = "Paris"
let boutonPlusDetail = document.querySelector("#plusDeDetail")
let zonePlusDetail = document.querySelector(".zonePlusDinfo")
let plusDeDetail = false
let dateAujourdhui = new Date()
let jourAujourdui = dateAujourdhui.getDate()
let moisAujourdui = dateAujourdhui.getMonth()+1
let yearAujourdui = dateAujourdhui.getFullYear()


function changementCouleurBackground(temperature) {
    if (temperature < 10) {
        backgroundOk.classList.remove("temperatureChaude")
        backgroundOk.classList.remove("temperatureMedium")
        backgroundOk.classList.add("temperatureFraiche")
    } else if (temperature < 24) {
        backgroundOk.classList.remove("temperatureFraiche")
        backgroundOk.classList.remove("temperatureChaude")
        backgroundOk.classList.add("temperatureMedium")
    } else{
        backgroundOk.classList.remove("temperatureFraiche")
        backgroundOk.classList.remove("temperatureMedium")
        backgroundOk.classList.add("temperatureChaude")
    }
}

function recuperationTemperature(villeSelectionee) {
        let APIKey = "882b65fd7aa1963755106d91651a5482"
        let urlAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + villeSelectionee + "&appid=" + APIKey
        let requete = new XMLHttpRequest()
        requete.open('GET', urlAPI)
        // Le Json est une liste d'objet (c'est un format très utilisé dans les API)
        requete.responseType = 'json'
        requete.send()
        requete.onload = function () {
        // le log ci-dessous permets de voir toutes les choses que nous pouvons faire avec notre variable requete.
        // Genre, pour retrouver la température MAX, il faut aller dans "requete.response.main.temp_max"
        console.log(requete)
        if (requete.readyState == XMLHttpRequest.DONE) {
            if (requete.status === 200) {

                let ville = requete.response.name

                let degres = requete.response.main.temp - 273.15
                let degresConvert = degres.toFixed(2) + "°"

                let country = requete.response.sys.country

                // plus de détails sur la ville
                let degresMax = requete.response.main.temp_max - 273.15
                let degresMaxConvert = degresMax.toFixed(2)+ "°"

                let degresMin = requete.response.main.temp_min - 273.15
                let degresMinConvert = degresMin.toFixed(2)+ "°"

                // Afficher la temperature
                let affichageTemperature = document.getElementById('degres')
                affichageTemperature.textContent = degresConvert
                
                // Changement de couleur du background en fonction de la température
                changementCouleurBackground(degres)

                // Afficher la ville
                let affichageVille = document.querySelector('#ville')
                affichageVille.textContent = ville

                // Afficher le pays
                let affichagePays = document.getElementById('pays')
                affichagePays.textContent = country


                let affichageDegresMin = document.getElementById('tempMin')
                let affichageDegresMax = document.getElementById('tempMax')
                affichageDegresMin.textContent = degresMinConvert
                affichageDegresMax.textContent = degresMaxConvert

                
            } else {
                alert("Bon gadé, baiguay ou'a paka fonctionner ! Viré talè !")
            }
        }
    }
}

function boutonPlusDeDetailCache() {
    if (plusDeDetail == false) {
        boutonPlusDetail.style.display = "block"
    } else {
        boutonPlusDetail.style.display = "none"
    }
}
function zonePlusDeDetailCache() {
        zonePlusDetail.style.display = "none"
}




buttonVille.addEventListener("click", function () {
    zonePlusDeDetailCache()
    let villeSelectionee = ville
    villeSelectionee = prompt("Note le nom de la ville souhaitée :")
    plusDeDetail = false
    boutonPlusDeDetailCache()
    recuperationTemperature(villeSelectionee)
})

boutonPlusDetail.addEventListener("click", function () {
    let dateDuJour = document.querySelector(".dateDuJour")
    dateDuJour.innerHTML = `${jourAujourdui}/${moisAujourdui}/${yearAujourdui}`
    console.log(`la date du jour c'est ${jourAujourdui}/${moisAujourdui}/${yearAujourdui}`);
    plusDeDetail = true
    boutonPlusDeDetailCache()
    zonePlusDetail.style.display = "block"
})


document.getElementById('ville').innerHTML = ville
























// if (degres<=5) {
//     console.log("Prends ta veste, ton bonnet, tes gants !");
//     backgroundOk.style.backgroundColor="#1aa9fc";
// }
// if (degres<=10) {
//     console.log("Prends ta veste à capuche ... oublie tes gants !");
//     backgroundOk.style.backgroundColor="#113dba";
// }
// if (degres<=18) {
//     console.log("Ca va prends tu peux sortir les sandales et le marcel !");
//     backgroundOk.style.backgroundColor="#ba112d";
// }

// else{
//     console.log("Wesh, sors en slip !");
//     backgroundOk.style.backgroundColor="#f6ef37";
// }