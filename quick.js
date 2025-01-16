const container = document.getElementById("array-container");
const generateArrayButton = document.getElementById("generate-array");
const sortButton = document.getElementById("sort-button");
const arrayInput = document.getElementById("array-input");

// Generate array based on user input
function generateArrayFromInput() {
    const input = arrayInput.value.trim();
    if (!input) {
        alert("Please enter numbers separated by commas.");
        return;
    }

    const numbers = input.split(",").map(num => parseInt(num.trim()));
    if (numbers.some(isNaN)) {
        alert("Invalid input. Ensure all values are numbers separated by commas.");
        return;
    }

    container.innerHTML = ""; // Clear the container
    numbers.forEach(value => {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.textContent = value; // Display number inside the bubble
        bubble.setAttribute("data-value", value); // Store the original value
        container.appendChild(bubble);
    });
}

// Quick Sort visualization
async function quickSort(start, end) {
    const bubbles = document.getElementsByClassName("bubble");
    if (start >= end) return;

    const pivotIndex = await partition(bubbles, start, end);
    await Promise.all([
        quickSort(start, pivotIndex - 1),
        quickSort(pivotIndex + 1, end)
    ]);
}

// Partition function for Quick Sort
async function partition(bubbles, start, end) {
    const pivotValue = parseInt(bubbles[end].dataset.value);
    bubbles[end].classList.add("red"); // Mark pivot as red
    let i = start - 1;

    for (let j = start; j < end; j++) {
        bubbles[j].classList.add("aqua"); // Mark high pointer as aqua

        if (parseInt(bubbles[j].dataset.value) <= pivotValue) {
            i++;
            bubbles[i].classList.add("yellow"); // Mark low pointer as yellow

            // Swap values
            const tempValue = bubbles[i].dataset.value;
            bubbles[i].dataset.value = bubbles[j].dataset.value;
            bubbles[i].textContent = bubbles[j].dataset.value;

            bubbles[j].dataset.value = tempValue;
            bubbles[j].textContent = tempValue;

            await new Promise(resolve => setTimeout(resolve, 500)); // Delay
            bubbles[i].classList.remove("yellow");
        }

        bubbles[j].classList.remove("aqua");
    }

    // Swap pivot to the correct position
    const tempValue = bubbles[i + 1].dataset.value;
    bubbles[i + 1].dataset.value = bubbles[end].dataset.value;
    bubbles[i + 1].textContent = bubbles[end].dataset.value;

    bubbles[end].dataset.value = tempValue;
    bubbles[end].textContent = tempValue;
    bubbles[end].classList.remove("red"); // Unmark pivot

    return i + 1;
}

// Event listeners
generateArrayButton.addEventListener("click", generateArrayFromInput);
sortButton.addEventListener("click", async () => {
    const bubbles = document.getElementsByClassName("bubble");
    if (bubbles.length === 0) {
        alert("Please generate an array first!");
        return;
    }
    await quickSort(0, bubbles.length - 1);
    alert("Array is sorted!");
});
