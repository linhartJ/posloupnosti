let p3Current: number = 0;
const p3LevelOffset = 13;
const p3Fm = "Tajné heslo: HUS";

document.addEventListener("DOMContentLoaded", p3OnStart);

function p3GetCurrentTask(): Task {
    return p3Tasks[p3Current];
}

function p3OnStart() {
    reinitDOM();
    setSubmitAction(p3TrySubmit);
    setTask(p3Current, p3LevelOffset, p3Tasks);
    showBeginnersHint();
}

function p3SetNextTask() {
    if (setTask(++p3Current, p3LevelOffset, p3Tasks)) {
        setHint(finalInstruction);
        spiderSaysTemp(p3Fm, p3Current, p3Fm);
    }
}

function p3InputMatches() {
    const randomSuccessMessage = sm[Math.floor(Math.random() * sm.length)];
    spiderSaysTemp(randomSuccessMessage, p3Current);
    p3SetNextTask();
}

function p3TrySubmit(e: Event | undefined) {
    if (e !== undefined && e.preventDefault) e.preventDefault();
    if (p3GetCurrentTask().matchesUserInput()) {
        p3InputMatches();
    } else {
        inputDoesNotMatch(p3Current);
    }
    return false;
}

const p3Tasks: Task[] = [
    new Task("Millard Fillmore", "Franklin Pierce"),
    new Task("Šiša Pangma", "Gyachung Kang"),
    new Task("Jules Bordet", "August Krogh"),
    new Task("Casablanca", "Going My Way"),
    new Task("10001", "10010"),
    new Task("Ar", "K")
];