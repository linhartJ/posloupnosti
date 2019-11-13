const c = [];
const beginnersHint = "Počítej stejně jako nápověda.<br/>Nápověda = jedna.<br/>Odpověď = dva (jedna + 1)";
const finalInstruction = "Gratulujeme, jste u konce. Tajné heslo zašlete na redakce@cvvz.cz.<br/>Pokud budete mezi prvními, můžete něco vyhrát.<br/>Nezapomeňte se podepsat (klidně přezdívkou) a vyhlížejte další číslo Náchodského vlákna!";

function df(d: number[]): string {
    return d.reduce((acc, idx) => acc + c[idx], "");
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

class Task {
    public hint: string;
    private value: string;

    constructor(hint: string, value: string) {
        this.hint = hint;
        this.value = value;
    }

    matchesUserInput = (): boolean => {
        return getUserInput().value.toUpperCase() === this.value.toUpperCase();
    }
}
