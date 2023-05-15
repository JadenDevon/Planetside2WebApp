const psForm = document.getElementById("playerSearch")
const autocompleteList = document.getElementById("autocomplete_list")
const ps_input = document.getElementById("ps_input")
const APIURL = "https://census.daybreakgames.com/s:DevonsReach/get/ps2:v2"

function parseWorld(id) {
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

function setFactionColor(id) {
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

function removeChildren(section) {
    const children = Array.from(section.children)
    children.forEach(child => {
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

function parsePlayerInfo(playerData) {
    removeChildren(document.getElementById("autocomplete_list"))
    ps_input.value = ""

    const playerInfo = document.getElementById("playerInfo")
    removeChildren(playerInfo)
    const playerName = newElement("div", playerData.name.first, "player_name")
    const playerBR = newElement("div", ` BR ${playerData.battle_rank.value} (ASP ${playerData.prestige_level})`)
    const playerFaction = newElement("div", parseFaction(playerData.faction_id), setFactionColor(playerData.faction_id))
    playerInfo.append(playerName)
    playerInfo.append(playerBR)
    playerInfo.append(playerFaction)
}

const fetchPlayer = async (playerName) => {
    await fetch(APIURL + `/character/?name.first_lower=${playerName.toLowerCase()}&c:resolve=outfit,stat,world`)
        .then(r => r.json())
        .then(data => {
            parsePlayerInfo(data.character_list[0])
            ps_input.value = ""
        })
}

function autoComplete(players) {
    removeChildren(document.getElementById("autocomplete_list"))
    if (ps_input.value.length > 2) {
        players.forEach(player => {
            const ele = newElement("div", `${player.name.first}, BR ${player.battle_rank.value}(${player.prestige_level})`, setFactionColor(player.faction_id))
            document.getElementById("autocomplete_list").appendChild(ele)
            ele.addEventListener("click", (e) => {
                parsePlayerInfo(player)
            })
        })
    }
}

const autoCompleteFetch = async (e) => {
    e.preventDefault()
    if (ps_input.value.length > 2) {
        await fetch(APIURL + `/character/?name.first_lower=^${ps_input.value.toLowerCase()}&c:limit=10&c:sort=name.first_lower`)
            .then(r => r.json())
            .then((data) => {
                autoComplete(data.character_list)
            })
    }
}

ps_input.addEventListener("keyup", autoCompleteFetch)
psForm.addEventListener("submit", (e) => {
    e.preventDefault()
    fetchPlayer(ps_input.value)
    removeChildren(document.getElementById("autocomplete_list"))
})