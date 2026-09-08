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


/*
    SETTINGS
*/

const CARD_WIDTH = 115;
const GAP = 8;
const STEP = CARD_WIDTH + GAP;


/*
    Creates one agent card
*/

function createCard(agent) {

    const card = document.createElement("div");

    card.classList.add("agent-card");

    const image = document.createElement("img");

    image.src = `images/${agent}.jpg`;

    image.alt = agent;

    const name = document.createElement("div");

    name.classList.add("agent-name");

    name.textContent = agent;

    card.appendChild(image);

    card.appendChild(name);

    return card;
}


/*
    Create the roulette
*/

function createRoulette() {

    roulette.innerHTML = "";

    /*
        Create many copies of the agents.

        This makes the roulette look like
        it's continuously cycling through agents.
    */

    for (let i = 0; i < 10; i++) {

        agents.forEach(agent => {

            roulette.appendChild(
                createCard(agent)
            );

        });

    }
}


/*
    SPIN
*/

function spin() {

    /*
        Disable button while spinning
    */

    spinButton.disabled = true;

    result.textContent = "SPINNING...";


    /*
        Create the agents only NOW.
    */

    createRoulette();


    /*
        Pick the winning agent
    */

    const winnerIndex =
        Math.floor(Math.random() * agents.length);


    /*
        Pick a location far into the roulette.

        This makes the animation travel
        through many agents.
    */

    const rounds = 7;

    const winningPosition =
        (rounds * agents.length) +
        winnerIndex;


    /*
        Width of the roulette window
    */

    const containerWidth =
        document.querySelector(
            ".roulette-container"
        ).offsetWidth;


    /*
        Calculate where the winner needs
        to stop so that it is in the center.
    */

    const centerPosition =
        (containerWidth / 2) -
        (CARD_WIDTH / 2);


    const targetPosition =
        -(winningPosition * STEP) +
        centerPosition;


    /*
        Start from the beginning
    */

    roulette.style.transition = "none";

    roulette.style.transform =
        "translateX(0px)";


    /*
        Force browser to apply the reset
    */

    roulette.offsetHeight;


    /*
        Spin!

        The cubic-bezier makes it start
        quickly and slowly come to a stop.
    */

    roulette.style.transition =
        "transform 6s cubic-bezier(0.08, 0.8, 0.15, 1)";


    roulette.style.transform =
        `translateX(${targetPosition}px)`;


    /*
        Wait until the animation finishes
    */

    setTimeout(() => {

        result.textContent =
            agents[winnerIndex].toUpperCase();

        spinButton.disabled = false;

    }, 6000);
}