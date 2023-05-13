const psForm = document.getElementById("playerSearch")
const playerInfoSection = document.getElementById("playerInfo")
const APIURL = "https://census.daybreakgames.com/s:DevonsReach/get/ps2:v2"

function parsePlayerInfo(json){
    const children = [...playerInfoSection.children]
    children.forEach(child => {
        console.log(child)
        playerInfoSection.removeChild(child)
    });
    
    const playerName = newElement("p", json.name.first, "player_name")
    const playerBR = newElement("span", `BR ${json.battle_rank.value}`)
    const playerFaction = newElement("h4", parseFaction(json.faction_id))
    playerInfoSection.append(playerName)
    playerName.append(playerBR)
    playerInfoSection.append(playerFaction)
    // playerName.innerText = json.name.first
    // playerBR.innerText = `BR ${json.battle_rank.value}`
    // playerFaction.innerText = parseFaction(json.faction_id)
}

function newElement(tagID, text="", classID=null){
    const ele = document.createElement(tagID)
    ele.innerText = text
    if (classID !== null){
        ele.classList.add(classID)
    }
    return ele
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