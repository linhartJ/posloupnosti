let p3Current: number = 0;
const p3LevelOffset = 13;
const p3Fm = [30, 0, 24, 22, 3, 0, 22, 0, 5, 39, 1, 34, 42, 3, 39, 45, 57, 8, 22, 0, 34, 39, 28, 41, 46, 37, 29, 39, 1, 14, 58, 2, 39, 24, 37, 39, 4, 3, 28, 60, 16, 37, 39, 42, 35, 14, 35, 8, 29, 39, 1, 22, 37, 36, 34, 39, 9, 34, 39, 54, 19, 39, 24, 22, 8, 46, 62, 44, 12];

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
        setHint(`Gratulujeme, jste u konce. Tajnou zprávu sdělte šéfredaktorce Monče.`);
        setErrorInfo(p3Fm.reduce((acc, idx) => acc + c[idx], ""));
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
    new Task([56, 60, 28, 28, 3, 36, 14, 39, 48, 60, 28, 28, 9, 35, 36, 37], [48, 36, 3, 0, 1, 28, 60, 0, 39, 17, 60, 37, 36, 45, 37]),
    new Task([23, 60, 27, 3, 39, 17, 3, 0, 49, 9, 3], [32, 58, 3, 45, 57, 8, 0, 49, 39, 38, 3, 0, 49]),
    new Task([51, 8, 28, 37, 24, 39, 18, 35, 36, 14, 37, 22], [47, 8, 49, 8, 24, 22, 39, 38, 36, 35, 49, 57]),
    new Task([50, 3, 24, 3, 20, 28, 3, 0, 45, 3], [32, 35, 60, 0, 49, 39, 56, 58, 39, 13, 3, 58]),
    new Task([25, 19, 19, 19, 25], [25, 19, 19, 25, 19]),
    new Task([47, 36], [38]),
];