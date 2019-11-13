function setHint(hintText) {
    if (hintText === finalInstruction) {
        document.getElementById("h-label").innerHTML = "";
    }
    const hint = document.getElementById("hint");
    hint.innerHTML = hintText;
}

function setLevel(level: number) {
    const levelEl = document.getElementById("level");
    levelEl.innerHTML = "" + level;
}

function setTask(taskIdx: number, taskIxdOffset: number, allTasks: Task[]): boolean {
    const t = allTasks[taskIdx];
    getUserInput().value = "";
    if (t !== undefined) {
        setLevel(taskIdx + taskIxdOffset);
        setHint(t.hint);
        return false;
    } else {
        return true;
    }
}

function reinitDOM() {
    const body = document.getElementsByTagName("body")[0];
    body.innerHTML = '<body>\n' +
        '        <div class="w3-container w3-center"><h1 class="w3-text-white">Posloupnosti</h1></div>\n' +
        '        <div class="w3-container w3-center w3-margin"><div class="w3-text-white">Level <span id="level" class="w3-badge w3-red"></span></div></div>\n' +
        '        <div class="w3-container w3-center w3-margin"><div class="w3-text-white" ><span id="h-label">Nápověda: </span><span id="hint"></span></div>\n' +
        '        <div class="w3-container w3-center w3-margin"><form id="form"><input class="" id="userInput" type="text"/></form></div>\n' +
        '        <div class="w3-container w3-center w3-margin-top"><button class="w3-button w3-green" id="okButton">Odeslat</button></div>\n' +
        '        <div class="w3-container w3-center"><div id="errorInfo"></div></div>\n' +
        '    </body>';
    document.getElementById("errorInfo").onclick = showBeginnersHint;
}

function setSubmitAction(action: (e: Event | undefined) => void) {
    document.getElementById("okButton").onclick = action;
    document.getElementById("form").onsubmit = action;
}

function showBeginnersHint() {
    setErrorInfo(beginnersHint);
}

function getUserInput(): HTMLInputElement {
    return <HTMLInputElement>document.getElementById("userInput");
}

function setErrorInfo(infoMessage: string) {
    const info = document.getElementById("errorInfo");
    if (infoMessage === "") {
        info.style.backgroundImage = "url('noBubble.png')";
    } else {
        info.style.backgroundImage = "url('withBubble.png')"
    }
    info.innerHTML = infoMessage;
}

let tempHash: number = 0;

function spiderSaysTemp(randomErrorMessage, currentTaskIdx: number, onClearMsg: string = "") {
    const r = Math.random();
    tempHash = r;
    setErrorInfo(randomErrorMessage);
    const onClearMessage = shouldDisplayBeginnersHint(currentTaskIdx) ? beginnersHint : onClearMsg;
    setTimeout(() => {
        if (tempHash === r) setErrorInfo(onClearMessage)
    }, 2000);
}

function shouldDisplayBeginnersHint(currentTask: number): boolean {
    return currentTask < 1;
}


function inputDoesNotMatch(currentTaskIdx: number) {
    const randomErrorMessage = em[Math.floor(Math.random() * em.length)];
    spiderSaysTemp(randomErrorMessage, currentTaskIdx);
}