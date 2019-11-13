let p1Current: number = 0;
const p1LevelOffset = 1;
const p1Fm = "Tajné heslo: ARMSTRONG";

document.addEventListener("DOMContentLoaded", p1OnStart);

function p1GetCurrentTask(): Task {
    return p1Tasks[p1Current];
}

function p1OnStart() {
    reinitDOM();
    setSubmitAction(p1TrySubmit);
    setTask(p1Current, p1LevelOffset, p1Tasks);
    showBeginnersHint();
}

function p1SetNextTask() {
    if (setTask(++p1Current, p1LevelOffset, p1Tasks)) {
        setHint(finalInstruction);
        spiderSaysTemp(p1Fm, p1Current, p1Fm);
    }
}

function p1InputMatches() {
    const randomSuccessMessage = sm[Math.floor(Math.random() * sm.length)];
    spiderSaysTemp(randomSuccessMessage, p1Current);
    p1SetNextTask();
}

function p1TrySubmit(e: Event | undefined) {
    if (e !== undefined && e.preventDefault) e.preventDefault();
    if (p1GetCurrentTask().matchesUserInput()) {
        p1InputMatches();
    } else {
        inputDoesNotMatch(p1Current);
    }
    return false;
}

const p1Tasks: Task[] = [
    new Task("jedna", "dva"),
    new Task("two", "three"),
    new Task("iřt", "iřytč"),
    new Task("kvarta", "kvinta"),
    new Task("ečný/ičný", "ový"),
    new Task("Saturn", "Uran")
];
