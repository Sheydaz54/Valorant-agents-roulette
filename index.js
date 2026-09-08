const agents = [
    "Astra",
    "Breach",
    "Brimstone",
    "Chamber",
    "Clove",
    "Cypher",
    "Deadlock",
    "Fade",
    "Gekko",
    "Harbor",
    "Iso",
    "Jett",
    "KAYO",
    "Killjoy",
    "Miks",
    "Neon",
    "Omen",
    "Phoenix",
    "Raze",
    "Reyna",
    "Sage",
    "Skye",
    "Sova",
    "Tejo",
    "Veto",
    "Viper",
    "Vyse",
    "Waylay",
    "Yoru"
];

const roulette = document.getElementById("roulette");
const result = document.getElementById("result");
const spinButton = document.getElementById("spinButton");

const CARD_WIDTH = 115;
const GAP = 8;
const STEP = CARD_WIDTH + GAP;

function createCard(agent) {
    const card = document.createElement("div");
    card.className = "agent-card";

    const image = document.createElement("img");

    // Your GitHub files use names like Astra.jpg
    image.src = `images/${agent}.jpg`;
    image.alt = agent;

    const name = document.createElement("div");
    name.className = "agent-name";
    name.textContent = agent;

    card.appendChild(image);
    card.appendChild(name);

    return card;
}

function createRoulette() {
    roulette.innerHTML = "";

    // Create 10 copies of all agents
    for (let round = 0; round < 10; round++) {
        for (const agent of agents) {
            roulette.appendChild(createCard(agent));
        }
    }
}

function spin() {
    spinButton.disabled = true;
    result.textContent = "SPINNING...";

    createRoulette();

    const winnerIndex = Math.floor(Math.random() * agents.length);

    // Pick an agent far into the roulette
    const winningIndex = (agents.length * 7) + winnerIndex;

    const container = document.querySelector(".roulette-container");

    const center = container.offsetWidth / 2;
    const target = (winningIndex * STEP) + (CARD_WIDTH / 2);

    const finalPosition = center - target;

    // Reset
    roulette.style.transition = "none";
    roulette.style.transform = "translateX(0px)";

    // Force browser to apply reset
    roulette.offsetHeight;

    // Spin
    roulette.style.transition =
        "transform 6s cubic-bezier(0.08, 0.8, 0.15, 1)";

    roulette.style.transform =
        `translateX(${finalPosition}px)`;

    // Show winner
    setTimeout(() => {
        result.textContent = agents[winnerIndex].toUpperCase();
        spinButton.disabled = false;
    }, 6000);
}