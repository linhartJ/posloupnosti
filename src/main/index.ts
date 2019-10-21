let currentTask: number = 0;

document.addEventListener("DOMContentLoaded", onStart);

function setHint(hintText) {
    const hint = document.getElementById("hint");
    hint.innerHTML = hintText;
}

function setTask(taskIdx) {
    const t = allTasks[taskIdx];
    getUserInput().value = "";
    setHint(`(${currentTask + 1}) - ${t.hint}`);
}

function getCurrentTask(): Task {
    return allTasks[currentTask];
}

function onStart() {
    document.getElementById("okButton").onclick = trySubmit;
    document.getElementById("userInput")
        .addEventListener("keyup", (event) => {
            event.preventDefault();
            if (event.code === "Enter") {
                document.getElementById("okButton").click();
            }
        });
    setTask(currentTask);
}

function getUserInput(): HTMLInputElement {
    return <HTMLInputElement>document.getElementById("userInput");
}

function setErrorInfo(infoMessage: string) {
    const info = document.getElementById("errorInfo");
    info.innerHTML = infoMessage;
}

function inputDoesNotMatch() {
    setErrorInfo("Nope, zkus to znovu");
    setTimeout(() => setErrorInfo(""), 2000);
}

function trySubmit() {
    if (getCurrentTask().matchesUserInput()) {
        setTask(++currentTask);
    } else {
        inputDoesNotMatch()
    }
}

class Task {
    public hint: string;
    private value: string;
    private taskIdx: number = 0;

    constructor(hint: string, value: string) {
        this.hint = hint;
        this.value = value;
        this.taskIdx = taskIndex++;
    }

    matchesUserInput = (): boolean => {
        return getUserInput().value === this.value;
    }
}

let taskIndex = 0;
const allTasks: Task[] = [
    new Task("jedna", "dva"),
    new Task("two", "three"),
    new Task("iřt", "iřytč"),
    new Task("kvarta", "kvinta"),
    new Task("ečný/ičný", "ový"),
    new Task("Saturn", "Uran"),
    new Task("Sssssss", "Oooooooo"),
    new Task("tů-tů-tů-tu-tu", "tů-tů-tů-tů-tu"),
    new Task("efwfu", "eftfu"),
    new Task("55", "89"),
    new Task("121", "144"),
    new Task("iksíí", "iksííí"),
    new Task("Millard Fillmore", "Franklin Pierce"),
    new Task("Šiša Pangma", "Gyachung Kang"),
    new Task("Jules Bordet", "August Krogh"),
    new Task("Casablanca", "Going My Way"),
    new Task("10001", "10010"),
    new Task("Ar", "K"),
    new Task("exa", "zetta"),
    new Task("Barbarská sublimace", "Griffinova ekvivalence"),
    new Task("7. března 1871", "7. března 1872"),
    new Task("Roman", "Stanislav"),
    new Task("Indonésie", "Libye")
];