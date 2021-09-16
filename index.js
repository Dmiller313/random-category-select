var categories = ["Any%", "All Instruments", "Octavo's Ode", "Symphony of the Mask", "Shortcut", "AB&C", "Dungeon", "Puzzle", "Arena", "Daily Challenge"]
var characters = ["Link", "Zelda", "Cadence", "Yves", "Octavo", "Aria", "Frederick", "Impa", "Shadow Link", "Shadow Zelda", "Skull Kid"]
var modifiers = ["No modifier", "Fixed-Beat Mode", "Double-Time Mode", "Permadeath Mode", "Mystery Mode"]


function areCompatible(item1, item2){
    if(item2 == "Yves" && item1 == "Puzzle"){
        return false;
    }
    if(item1 == "Fixed-Beat Mode" && item2 == "Double-Time Mode"){
        return false;
    }
    return true;
}

function updateResults(){
    var modes = document.getElementById("mode-select").children;
    var modesText = [];
    var characters = document.getElementById("character-select").children;
    var charactersText = [];
    var modifiers = document.getElementById("modifier-select").children;
    var modifiersText = [];
    var numModifiers = document.getElementById("num-modifiers");

    var found;
    for(var i = 0; i < numModifiers.options.length; i++){
        found = numModifiers.options[i]
        if(found.selected === true){
            break;
        }
    }

    for(mode in modes){
        if(modes[mode].selected == true){
            modesText.push(modes[mode].value);
        }
    }

    for(character in characters){
        if(characters[character].selected == true){
            charactersText.push(characters[character].value);
        }
    }

    for(modifier in modifiers){
        if(modifiers[modifier].selected == true){
            modifiersText.push(modifiers[modifier].value);
        }
    }

    var valid = false;
    var counter = 0;
    while(!valid && counter < 30){
        var selectedMode = modesText[Math.floor(Math.random() * modesText.length)];
        var selectedCharacter = charactersText[Math.floor(Math.random() * charactersText.length)];
        var selectedModifiers = "";
        if(found.value > 1){
            counter = 0;
            while(counter < found.value){
                var modifierId = Math.floor(Math.random() * modifiersText.length);
                if(counter == found.value - 1){
                    selectedModifiers += modifiersText[modifierId];
                }
                else{
                    selectedModifiers += modifiersText[modifierId] + ", ";
                }
                modifiersText.splice(modifierId, 1);
                counter++;
            }
        }
        else{
            selectedModifiers = modifiersText[Math.floor(Math.random() * modifiersText.length)];
        }
        valid = areCompatible(selectedMode, selectedCharacter);
        counter++;
    }

    if(!areCompatible(selectedMode, selectedCharacter)){
        document.getElementById("invalid-selection").innerHTML = "Invalid selection, please try again";
    }
    else{
        document.getElementById("invalid-selection").innerHTML = "";
        document.getElementById("mode-result").innerHTML = selectedMode;
        document.getElementById("character-result").innerHTML = selectedCharacter;
        document.getElementById("modifier-result").innerHTML = selectedModifiers;
    }
}

window.onload = function(){
    var modeSelect = document.getElementById("mode-select");
    var characterSelect = document.getElementById("character-select");
    var modifierSelect = document.getElementById("modifier-select");

    for(category in categories){
        var item = document.createElement("option");
        item.textContent = categories[category];
        item.value = categories[category];
        item.selected = true;
        modeSelect.appendChild(item);
    }

    for(character in characters){
        var item = document.createElement("option");
        item.textContent = characters[character];
        item.value = characters[character];
        item.selected = true;
        characterSelect.appendChild(item);
    }

    for(modifier in modifiers){
        var item = document.createElement("option");
        item.textContent = modifiers[modifier];
        item.value = modifiers[modifier];
        item.selected = true;
        modifierSelect.appendChild(item);
    }
}