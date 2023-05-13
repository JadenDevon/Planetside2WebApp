const psForm = document.getElementById("playerSearch")
const sidebar = document.getElementById("sidebar")
const cards = document.getElementById("cards")
const sortby = document.getElementById("sortby")
const APIURL = "https://census.daybreakgames.com/get/ps2:v2"

function parsePlayerInfo(json){
    const playerName = document.getElementById("playerName")
    const playerBR = document.getElementById("playerBR")
    playerName.innerText = json.name.first
    playerBR.innerText = json.battle_rank.value
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