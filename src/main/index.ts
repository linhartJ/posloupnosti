let currentTask: number = 0;

document.addEventListener("DOMContentLoaded", onStart);

function setHint(hintText) {
    const hint = document.getElementById("hint");
    hint.innerHTML = hintText;
}

function setLevel(level: number) {
    const levelEl = document.getElementById("level");
    levelEl.innerHTML = "" + level;
}

function setTask(taskIdx) {
    const t = allTasks[taskIdx];
    getUserInput().value = "";
    if (t !== undefined) {
        setLevel(currentTask + 1);
        setHint(t.hint);
    } else {
        setHint(`Gratulujeme, jste u konce. Tajnou zprávu sdělte šéfredaktorce Monče.`);
        setErrorInfo(fm.reduce((acc, idx) => acc + c[idx], ""));
    }
}

function getCurrentTask(): Task {
    return allTasks[currentTask];
}

function onStart() {
    const body = document.getElementsByTagName("body")[0];
    body.innerHTML = '<body>\n' +
        '        <div class="w3-container w3-center"><h1 class="w3-text-white">Posloupnosti</h1></div>\n' +
        '        <div class="w3-container w3-center w3-margin"><div class="w3-text-white">Level <span id="level" class="w3-badge w3-red"></span></div></div>\n' +
        '        <div class="w3-container w3-center w3-margin"><div class="w3-text-white" >Nápověda: <span id="hint"></span></div>\n' +
        '        <div class="w3-container w3-center w3-margin"><form id="form"><input class="" id="userInput" type="text"/></form></div>\n' +
        '        <div class="w3-container w3-center w3-margin-top"><button class="w3-button w3-green" id="okButton">Odeslat</button></div>\n' +
        '        <div class="w3-container w3-center"><div id="errorInfo"></div></div>\n' +
        '    </body>';
    document.getElementById("okButton").onclick = trySubmit;
    document.getElementById("form").onsubmit = trySubmit;
    document.getElementById("errorInfo").onclick = showBeginnersHint;
    setTask(currentTask);
    showBeginnersHint();
}

const beginnersHint = "Počítej stejně jako nápověda.<br/>Nápověda = jedna.<br/>Odpověď = dva (jedna + 1)";

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

function spiderSaysTemp(randomErrorMessage) {
    const r = Math.random();
    tempHash = r;
    setErrorInfo(randomErrorMessage);
    const onClearMessage = shouldDisplayBeginnersHint() ? beginnersHint : "";
    setTimeout(() => {
        if (tempHash === r) setErrorInfo(onClearMessage)
    }, 2000);
}

function shouldDisplayBeginnersHint(): boolean {
    return currentTask < 5;
}

function inputDoesNotMatch() {
    const randomErrorMessage = em[Math.floor(Math.random() * em.length)];
    spiderSaysTemp(randomErrorMessage);
}

function inputMatches() {
    const randomSuccessMessage = sm[Math.floor(Math.random() * sm.length)];
    spiderSaysTemp(randomSuccessMessage);
    setTask(++currentTask);
}

function trySubmit(e: Event | undefined) {
    if (e !== undefined && e.preventDefault) e.preventDefault();
    if (getCurrentTask().matchesUserInput()) {
        inputMatches();
    } else {
        inputDoesNotMatch();
    }
    return false;
}

class Task {
    public hint: string;
    private value: string;
    private taskIdx: number = 0;

    constructor(hint: number[], value: number[]) {
        this.hint = hint.reduce((acc, idx) => acc + c[idx], "");
        this.value = value.reduce((acc, idx) => acc + c[idx], "");
        this.taskIdx = taskIndex++;
    }

    matchesUserInput = (): boolean => {
        return getUserInput().value.toUpperCase() === this.value.toUpperCase();
    }
}

const sm = [
    "Dobře ty!",
    "Paráda",
    "Správně!",
    "Chytrý!",
    "Už tě nemám co naučit."
];

const em = [
    "Nope, zkus to znovu",
    "Je to sice blbě, ale nevzdávej to!",
    "Říkejme tomu třeba překlep...",
    "Vedle, jak ta jedle",
    "Možná si nech od někoho poradit",
    "Nevzdávej to! To dáš! Myslím, že jsi blízko!",
    "Zkus 42. To je prej odpověď na všechno.",
    "Přihořívá",
    "Taky jsem si myslel, že to bude dobře."
];

let taskIndex = 0;
const c = ['n', 'k', 'ž', 'a', 'z', 'í', 'x', '5', 'u', 'm', '7', 'R', '.', 'W', 'd', 'S', 'j', 'P', 'B', '0', 'b', '8', 't', 'Š', 's', '1', '-', 'š', 'l', ',', 'I', '4', 'G', '2', 'á', 'o', 'r', 'e', 'K', ' ', '/', 'é', 'v', 'č', 'ů', 'c', 'p', 'A', 'F', 'g', 'C', 'J', 'ý', 'U', '9', 'f', 'M', 'h', 'y', 'ř', 'i', 'w', 'ň'];
const fm = [30, 0, 24, 22, 3, 0, 22, 0, 5, 39, 1, 34, 42, 3, 39, 45, 57, 8, 22, 0, 34, 39, 28, 41, 46, 37, 29, 39, 1, 14, 58, 2, 39, 24, 37, 39, 4, 3, 28, 60, 16, 37, 39, 42, 35, 14, 35, 8, 29, 39, 1, 22, 37, 36, 34, 39, 9, 34, 39, 54, 19, 39, 24, 22, 8, 46, 62, 44, 12];
const allTasks: Task[] = [
    new Task([16, 37, 14, 0, 3], [14, 42, 3]),
    new Task([22, 61, 35], [22, 57, 36, 37, 37]),
    new Task([60, 59, 22], [60, 59, 58, 22, 43]),
    new Task([1, 42, 3, 36, 22, 3], [1, 42, 60, 0, 22, 3]),
    new Task([37, 43, 0, 52, 40, 60, 43, 0, 52], [35, 42, 52]),
    new Task([15, 3, 22, 8, 36, 0], [53, 36, 3, 0]),
    new Task([24, 24, 24, 24, 24, 24, 24], [35, 35, 35, 35, 35, 35, 35, 35]),
    new Task([22, 44, 26, 22, 44, 26, 22, 44, 26, 22, 8, 26, 22, 8], [22, 44, 26, 22, 44, 26, 22, 44, 26, 22, 44, 26, 22, 8]),
    new Task([37, 55, 61, 55, 8], [37, 55, 22, 55, 8]),
    new Task([7, 7], [21, 54]),
    new Task([25, 33, 25], [25, 31, 31]),
    new Task([60, 1, 24, 5, 5], [60, 1, 24, 5, 5, 5]),
    new Task([56, 60, 28, 28, 3, 36, 14, 39, 48, 60, 28, 28, 9, 35, 36, 37], [48, 36, 3, 0, 1, 28, 60, 0, 39, 17, 60, 37, 36, 45, 37]),
    new Task([23, 60, 27, 3, 39, 17, 3, 0, 49, 9, 3], [32, 58, 3, 45, 57, 8, 0, 49, 39, 38, 3, 0, 49]),
    new Task([51, 8, 28, 37, 24, 39, 18, 35, 36, 14, 37, 22], [47, 8, 49, 8, 24, 22, 39, 38, 36, 35, 49, 57]),
    new Task([50, 3, 24, 3, 20, 28, 3, 0, 45, 3], [32, 35, 60, 0, 49, 39, 56, 58, 39, 13, 3, 58]),
    new Task([25, 19, 19, 19, 25], [25, 19, 19, 25, 19]),
    new Task([47, 36], [38]),
    new Task([37, 6, 3], [4, 37, 22, 22, 3]),
    new Task([18, 3, 36, 20, 3, 36, 24, 1, 34, 39, 24, 8, 20, 28, 60, 9, 3, 45, 37], [32, 36, 60, 55, 55, 60, 0, 35, 42, 3, 39, 37, 1, 42, 60, 42, 3, 28, 37, 0, 45, 37]),
    new Task([10, 12, 39, 20, 59, 37, 4, 0, 3, 39, 25, 21, 10, 25], [10, 12, 39, 20, 59, 37, 4, 0, 3, 39, 25, 21, 10, 33]),
    new Task([11, 35, 9, 3, 0], [15, 22, 3, 0, 60, 24, 28, 3, 42])
];