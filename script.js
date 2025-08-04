async function fetchNutritionData() {
    const apiKey = "cd6a9fd04fmshf1843b464c73365p1a4ad1jsn7b8f1c3d9a46"; // Replace with your real API key
    const gender = "female"; // Hardcoded gender
    const age = document.getElementById("age").value;
    const heightFt = document.getElementById("height-ft").value;
    const heightIn = document.getElementById("height-in").value;
    const weight = document.getElementById("weight").value;
    const activity = document.getElementById("activity").value;

    if (!age || !heightFt || !heightIn || !weight) {
        alert("Please fill all the fields!");
        return;
    }

    const url = `https://nutrition-calculator.p.rapidapi.com/api/nutrition-info?measurement_units=std&sex=${gender}&age_value=${age}&age_type=yrs&feet=${heightFt}&inches=${heightIn}&lbs=${weight}&activity_level=${activity}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-Rapidapi-Key": apiKey,
                "X-Rapidapi-Host": "nutrition-calculator.p.rapidapi.com"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Nutrition Data:", data);

        // Check if the expected data exists to prevent errors
        if (data.BMI_EER && data.macronutrients_table) {
            document.getElementById("bmi").textContent = data.BMI_EER.BMI || "N/A";
            document.getElementById("calories").textContent = data.BMI_EER["Estimated Daily Caloric Needs"] || "N/A";
            document.getElementById("protein").textContent = data.macronutrients_table["macronutrients-table"]?.[2]?.[1] || "N/A";
            document.getElementById("fat").textContent = data.macronutrients_table["macronutrients-table"]?.[3]?.[1] || "N/A";
        } else {
            alert("Unexpected data format received from API.");
        }

        document.getElementById("nutrition-card").classList.remove("hidden");

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please check your API key and try again.");
    }
}

document.getElementById("fetch-nutrition").addEventListener("click", fetchNutritionData);
