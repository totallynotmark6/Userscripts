// ==UserScript==
// @name        Cornell Moodle Class Sort
// @description This is your new file, start writing code
// @match       https://moodle.cornellcollege.edu/*
// @version     0.1.0
// @updateURL   https://raw.githubusercontent.com/totallynotmark6/Userscripts/main/moodle-cornell-sort.js
// ==/UserScript==

function messWithSidebar() {
    const sidebar = document.getElementById("nav-drawer").children[1] || document.getElementById("nav-drawer").children[0];
    let startClassesIndex = sidebar.children[0].children.length - 1;
    let endClassesIndex = sidebar.children[0].children.length - 1;
    while (true) {
        if (sidebar.children[0].children[startClassesIndex].textContent.trim() === "My courses") {
            startClassesIndex++;
            break;
        }
        startClassesIndex--;
    }
    let savedButtons = [];
    for (let i = endClassesIndex; i >= startClassesIndex; i--) {
        savedButtons.push(sidebar.children[0].children[i])
        sidebar.children[0].children[i].remove()
    }
    savedButtons.sort((a, b) => {
        const aText = a.textContent.trim()
        const bText = b.textContent.trim()
        const aBlock = Number(aText[7])
        const bBlock = Number(bText[7])
        return aBlock > bBlock;
    })
    for (let i = 0; i < savedButtons.length; i++) {
        const elem = savedButtons[i]
        sidebar.children[0].appendChild(elem)
    }
    console.log(savedButtons)
}

messWithSidebar()