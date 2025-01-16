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

// Merge Sort visualization
async function mergeSort(start = 0, end = null) {
    if (end === null) end = document.getElementsByClassName("bubble").length - 1;
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    await mergeSort(start, mid); // Sort the left half
    await mergeSort(mid + 1, end); // Sort the right half
    await merge(start, mid, end); // Merge the halves
}

async function merge(start, mid, end) {
    const bubbles = document.getElementsByClassName("bubble");
    const temp = [];

    let i = start,
        j = mid + 1;

    while (i <= mid && j <= end) {
        bubbles[i].classList.add("red");
        bubbles[j].classList.add("red");
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay

        if (parseInt(bubbles[i].dataset.value) <= parseInt(bubbles[j].dataset.value)) {
            temp.push(bubbles[i].dataset.value);
            bubbles[i].classList.remove("red");
            i++;
        } else {
            temp.push(bubbles[j].dataset.value);
            bubbles[j].classList.remove("red");
            j++;
        }
    }

    while (i <= mid) {
        bubbles[i].classList.add("red");
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay
        temp.push(bubbles[i].dataset.value);
        bubbles[i].classList.remove("red");
        i++;
    }

    while (j <= end) {
        bubbles[j].classList.add("red");
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay
        temp.push(bubbles[j].dataset.value);
        bubbles[j].classList.remove("red");
        j++;
    }

    for (let k = start; k <= end; k++) {
        bubbles[k].dataset.value = temp[k - start];
        bubbles[k].textContent = temp[k - start];
        bubbles[k].classList.add("teal");
        await new Promise(resolve => setTimeout(resolve, 300)); // Delay
    }
}

// Event listeners
generateArrayButton.addEventListener("click", generateArrayFromInput);
sortButton.addEventListener("click", () => mergeSort());
