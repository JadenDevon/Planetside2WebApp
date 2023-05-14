const psForm = document.getElementById("playerSearch")
const playerInfoSection = document.getElementById("playerInfo")
const ps_input = document.getElementById("ps_input")
const APIURL = "https://census.daybreakgames.com/s:DevonsReach/get/ps2:v2"

function parsePlayerInfo(playerData) {
    clearSection(playerInfoSection)

    const playerName = newElement("p", playerData.name.first, "player_name")
    const playerBR = newElement("p", ` BR ${playerData.battle_rank.value} (ASP ${playerData.prestige_level})`)
    const playerFaction = newElement("h4", parseFaction(playerData.faction_id), setFactionColor(playerData.faction_id))
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

function parseWorld(id){
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

const fetchPlayer = async (playerName) => {
    const response = await fetch(APIURL + `/character/?name.first_lower=${playerName}&c:resolve=outfit,stat,world`)
        .then(r => r.json())
    console.log(response.character_list[0])
    parsePlayerInfo(response.character_list[0])
}

const autoCompleteFetch = async (e) => {
    e.preventDefault()

    await fetch(APIURL + `/character/?name.first_lower=^${ps_input.value.toLowerCase()}&c:limit=10&c:show=name.first,battle_rank,prestige_level,faction_id&c:sort=name.first_lower`)
        .then(r => r.json())
        .then((data) => {
            // console.log(data)
            autoComplete(data.character_list)
        })
}

function autoComplete(players){
    removeAutoCompleteItems()
    players.forEach(player => {
        ele = newElement("div", `${player.name.first}, BR ${player.battle_rank.value}(${player.prestige_level})`, setFactionColor(player.faction_id))
        ele.classList.add("autocomplete-item")
        document.getElementById("autocomplete").append(ele)
        ele.addEventListener("click", fetchPlayer(player.name.first))
    })
}

function removeAutoCompleteItems(){
    items = [...document.getElementsByClassName("autocomplete-item")]
    items.forEach(element => {
        document.getElementById("autocomplete").removeChild(element)
    });
}

ps_input.addEventListener("keyup", autoCompleteFetch)
psForm.addEventListener("submit", (e) => {
    e.preventDefault()
    fetchPlayer(ps_input.value)
})