const c = ['n', 'k', 'ž', 'a', 'z', 'í', 'x', '5', 'u', 'm', '7', 'R', '.', 'W', 'd', 'S', 'j', 'P', 'B', '0', 'b', '8', 't', 'Š', 's', '1', '-', 'š', 'l', ',', 'I', '4', 'G', '2', 'á', 'o', 'r', 'e', 'K', ' ', '/', 'é', 'v', 'č', 'ů', 'c', 'p', 'A', 'F', 'g', 'C', 'J', 'ý', 'U', '9', 'f', 'M', 'h', 'y', 'ř', 'i', 'w', 'ň'];
const beginnersHint = "Počítej stejně jako nápověda.<br/>Nápověda = jedna.<br/>Odpověď = dva (jedna + 1)";

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

class Task {
    public hint: string;
    private value: string;

    constructor(hint: number[], value: number[]) {
        this.hint = hint.reduce((acc, idx) => acc + c[idx], "");
        this.value = value.reduce((acc, idx) => acc + c[idx], "");
    }

    matchesUserInput = (): boolean => {
        return getUserInput().value.toUpperCase() === this.value.toUpperCase();
    }
}
