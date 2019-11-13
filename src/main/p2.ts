let p2Current: number = 0;
const p2LevelOffset = 7;
const p2Fm = [30, 0, 24, 22, 3, 0, 22, 0, 5, 39, 1, 34, 42, 3, 39, 45, 57, 8, 22, 0, 34, 39, 28, 41, 46, 37, 29, 39, 1, 14, 58, 2, 39, 24, 37, 39, 4, 3, 28, 60, 16, 37, 39, 42, 35, 14, 35, 8, 29, 39, 1, 22, 37, 36, 34, 39, 9, 34, 39, 54, 19, 39, 24, 22, 8, 46, 62, 44, 12];

document.addEventListener("DOMContentLoaded", p2OnStart);

function p2GetCurrentTask(): Task {
    return p2Tasks[p2Current];
}

function p2OnStart() {
    reinitDOM();
    setSubmitAction(p2TrySubmit);
    setTask(p2Current, p2LevelOffset, p2Tasks);
    showBeginnersHint();
}

function p2SetNextTask() {
    if (setTask(++p2Current, p2LevelOffset, p2Tasks)) {
        setHint(`Gratulujeme, jste u konce. Tajnou zprávu sdělte šéfredaktorce Monče.`);
        setErrorInfo(p2Fm.reduce((acc, idx) => acc + c[idx], ""));
    }
}

function p2InputMatches() {
    const randomSuccessMessage = sm[Math.floor(Math.random() * sm.length)];
    spiderSaysTemp(randomSuccessMessage, p2Current);
    p2SetNextTask();
}

function p2TrySubmit(e: Event | undefined) {
    if (e !== undefined && e.preventDefault) e.preventDefault();
    if (p2GetCurrentTask().matchesUserInput()) {
        p2InputMatches();
    } else {
        inputDoesNotMatch(p2Current);
    }
    return false;
}

const p2Tasks: Task[] = [
    new Task([24, 24, 24, 24, 24, 24, 24], [35, 35, 35, 35, 35, 35, 35, 35]),
    new Task([22, 44, 26, 22, 44, 26, 22, 44, 26, 22, 8, 26, 22, 8], [22, 44, 26, 22, 44, 26, 22, 44, 26, 22, 44, 26, 22, 8]),
    new Task([37, 55, 61, 55, 8], [37, 55, 22, 55, 8]),
    new Task([7, 7], [21, 54]),
    new Task([25, 33, 25], [25, 31, 31]),
    new Task([60, 1, 24, 5, 5], [60, 1, 24, 5, 5, 5]),
];