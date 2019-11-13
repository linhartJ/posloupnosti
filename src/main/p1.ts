let p1Current: number = 0;
const p1LevelOffset = 1;
const p1Fm = [30, 0, 24, 22, 3, 0, 22, 0, 5, 39, 1, 34, 42, 3, 39, 45, 57, 8, 22, 0, 34, 39, 28, 41, 46, 37, 29, 39, 1, 14, 58, 2, 39, 24, 37, 39, 4, 3, 28, 60, 16, 37, 39, 42, 35, 14, 35, 8, 29, 39, 1, 22, 37, 36, 34, 39, 9, 34, 39, 54, 19, 39, 24, 22, 8, 46, 62, 44, 12];

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
        setHint(`Gratulujeme, jste u konce. Tajnou zprávu sdělte šéfredaktorce Monče.`);
        setErrorInfo(p1Fm.reduce((acc, idx) => acc + c[idx], ""));
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
    new Task([16, 37, 14, 0, 3], [14, 42, 3]),
    new Task([22, 61, 35], [22, 57, 36, 37, 37]),
    new Task([60, 59, 22], [60, 59, 58, 22, 43]),
    new Task([1, 42, 3, 36, 22, 3], [1, 42, 60, 0, 22, 3]),
    new Task([37, 43, 0, 52, 40, 60, 43, 0, 52], [35, 42, 52]),
    new Task([15, 3, 22, 8, 36, 0], [53, 36, 3, 0])
];
