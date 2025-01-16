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

// Insertion Sort visualization
async function insertionSort() {
    const bubbles = document.getElementsByClassName("bubble");
    for (let i = 1; i < bubbles.length; i++) {
        const currentValue = parseInt(bubbles[i].dataset.value);
        let j = i - 1;

        bubbles[i].classList.add("red"); // Highlight the current bubble
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay

        while (j >= 0 && parseInt(bubbles[j].dataset.value) > currentValue) {
            // Shift the value at index j one position to the right
            bubbles[j + 1].dataset.value = bubbles[j].dataset.value;
            bubbles[j + 1].textContent = bubbles[j].dataset.value;

            bubbles[j].classList.add("red"); // Highlight the bubble being compared
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay
            bubbles[j].classList.remove("red");

            j--;
        }

        // Place the current value in its correct position
        bubbles[j + 1].dataset.value = currentValue;
        bubbles[j + 1].textContent = currentValue;

        bubbles[i].classList.remove("red");
        bubbles[j + 1].classList.add("teal"); // Mark sorted bubbles
    }
}

// Event listeners
generateArrayButton.addEventListener("click", generateArrayFromInput);
sortButton.addEventListener("click", insertionSort);
