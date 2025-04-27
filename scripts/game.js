function roll(){
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;
    const dice4 = Math.floor(Math.random() * 6) + 1;
    const dice5 = Math.floor(Math.random() * 6) + 1;
    const dice6 = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice-1").innerHTML = dice1;
    document.getElementById("dice-2").innerHTML = dice2;
    document.getElementById("dice-3").innerHTML = dice3;
    document.getElementById("dice-4").innerHTML = dice4;
    document.getElementById("dice-5").innerHTML = dice5;
    document.getElementById("dice-6").innerHTML = dice6;
}

// Přidání listenerů pro klikání na kostky
for (let i = 1; i <= 6; i++) {
    const diceEl = document.getElementById(`dice-${i}`);
    diceEl.addEventListener("click", () => {
        diceEl.classList.toggle("selected");
        updateSelectedScore();
    });
}

// Funkce, která přepočítá aktuální skóre vybraných kostek
function updateSelectedScore() {
    const selectedDice = document.querySelectorAll(".dice.selected");
    const values = Array.from(selectedDice).map(el => parseInt(el.textContent, 10));
    document.getElementById("selected").textContent = calculateScore(values);
}

// Výpočet skóre: trojice i jednotlivé 1 a 5
function calculateScore(values) {
    const counts = [0, 0, 0, 0, 0, 0]; // počty výskytů pro [1,2,3,4,5,6]
    let total = 0;

    values.forEach(val => { counts[val - 1]++; });

    // Trojice 1..6
    if (counts[0] >= 3) { total += 1000; counts[0] -= 3; }
    if (counts[1] >= 3) { total += 200;  counts[1] -= 3; }
    if (counts[2] >= 3) { total += 300;  counts[2] -= 3; }
    if (counts[3] >= 3) { total += 400;  counts[3] -= 3; }
    if (counts[4] >= 3) { total += 500;  counts[4] -= 3; }
    if (counts[5] >= 3) { total += 600;  counts[5] -= 3; }

    // Zbývající jednotlivé 1 a 5
    total += counts[0] * 100; // každá 1
    total += counts[4] * 50;  // každá 5

    return total;
}

// Potvrzení skóre: „přelití“ z #selected do #total a zrušení označení
document.getElementById("confirm-btn").addEventListener("click", () => {
    const selectedScore = parseInt(document.getElementById("selected").textContent, 10);
    const totalScore = parseInt(document.getElementById("total").textContent, 10);
    document.getElementById("total").textContent = totalScore + selectedScore;

    // Odebrání označení kostek
    document.querySelectorAll(".dice.selected").forEach(el => el.classList.remove("selected"));
    document.querySelectorAll(".dice.selected").forEach(el => el.classList.add("used"));

    // Vynulování zobrazeného skóre vybraných kostek
    // document.getElementById("selected").textContent = 0;

   
});



