const psForm = document.getElementById("playerSearch")
const playerInfoSection = document.getElementById("playerInfo")
const APIURL = "https://census.daybreakgames.com/s:DevonsReach/get/ps2:v2"

function parsePlayerInfo(json) {
    clearSection(playerInfoSection)

    const playerName = newElement("p", json.name.first, "player_name")
    const playerBR = newElement("p", ` BR ${json.battle_rank.value} (ASP ${json.prestige_level})`)
    const playerFaction = newElement("h4", parseFaction(json.faction_id), setFactionColor(json.faction_id))
    playerInfoSection.append(playerName)
    playerInfoSection.append(playerBR)
    playerInfoSection.append(playerFaction)
}

function clearSection(section){
    const children = Array.from(section.children)
    children.forEach(child => {
        console.log(child)
        section.removeChild(child)
    });
}

function newElement(tagID, text = "", classID) {
    const ele = document.createElement(tagID)
    ele.innerText = text
    if (classID !== undefined) {
        ele.classList.add(classID)
    }
    return ele
}

function parseFaction(id) {
    switch (id) {
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

function setFactionColor(id){
    switch (id) {
        case "1":
            return "vs"
        case "2":
            return "nc"
        case "3":
            return "tr"
        case "4":
            return "nso"
        default:
            return
    }
}

const fetchPlayer = async (e) => {
    e.preventDefault()

    const ps_input = document.getElementById("ps_input")
    const response = await fetch(APIURL + `/character/?name.first_lower=${ps_input.value.toLowerCase()}&c:resolve=outfit`)
        .then(r => r.json())
    console.log(response.character_list[0])
    parsePlayerInfo(response.character_list[0])

}

psForm.addEventListener("submit", fetchPlayer)