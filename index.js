const psForm = document.getElementById("playerSearch")
const sidebar = document.getElementById("sidebar")
const cards = document.getElementById("cards")
const sortby = document.getElementById("sortby")
const APIURL = "https://census.daybreakgames.com/get/ps2:v2"

function parsePlayerInfo(json){
    const playerName = document.getElementById("playerName")
    const playerBR = document.getElementById("playerBR")
    const playerFaction = document.getElementById("playerFaction")
    playerName.innerText = json.name.first
    playerBR.innerText = `BR ${json.battle_rank.value}`
    playerFaction.innerText = parseFaction(json.faction_id)
}

function parseFaction(id){
    switch(id){
        case "1": 
            return "Vanu Sovereignty"
        case "2": 
            return "New Conglomerate"
        case "3": 
            return "Terran Republic"
        case "4":
            return "Nanite Systems Operative"
        default: 
            return "Faction Not Found"
    }
    
}

const fetchPlayer = async (e)=> {
    e.preventDefault()

    const ps_input = document.getElementById("ps_input")
    const response = await fetch(APIURL + `/character/?name.first_lower=${ps_input.value.toLowerCase()}`)
        .then(r=>r.json())
    console.log(response.character_list[0])
    parsePlayerInfo(response.character_list[0])
    
}   

psForm.addEventListener("submit", fetchPlayer)