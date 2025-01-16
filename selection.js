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

// Selection Sort visualization
async function selectionSort() {
    const bubbles = document.getElementsByClassName("bubble");
    for (let i = 0; i < bubbles.length; i++) {
        let minIndex = i;
        bubbles[minIndex].classList.add("red");

        for (let j = i + 1; j < bubbles.length; j++) {
            bubbles[j].classList.add("red");
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay

            if (parseInt(bubbles[j].dataset.value) < parseInt(bubbles[minIndex].dataset.value)) {
                bubbles[minIndex].classList.remove("red");
                minIndex = j;
                bubbles[minIndex].classList.add("red");
            }

            bubbles[j].classList.remove("red");
        }

        if (minIndex !== i) {
            // Swap values
            const tempValue = bubbles[i].dataset.value;
            bubbles[i].dataset.value = bubbles[minIndex].dataset.value;
            bubbles[i].textContent = bubbles[minIndex].dataset.value;

            bubbles[minIndex].dataset.value = tempValue;
            bubbles[minIndex].textContent = tempValue;
        }

        bubbles[minIndex].classList.remove("red");
        bubbles[i].classList.add("teal");
    }
}

// Event listeners
generateArrayButton.addEventListener("click", generateArrayFromInput);
sortButton.addEventListener("click", selectionSort);
