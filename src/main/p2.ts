let p2Current: number = 0;
const p2LevelOffset = 7;
const p2Fm = "Tajné heslo: GAGARIN";

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
        setHint(finalInstruction);
        spiderSaysTemp(p2Fm, p2Current, p2Fm);
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
    new Task("sssssss", "oooooooo"),
    new Task("tů-tů-tů-tu-tu", "tů-tů-tů-tů-tu"),
    new Task("efwfu", "eftfu"),
    new Task("55", "89"),
    new Task("121", "144"),
    new Task("iksíí", "iksííí")
];