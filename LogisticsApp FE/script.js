// COURIERS
// SHOW ALL COURIERS
const couriersContainer = document.querySelector(".courier_container");
const showAllCouriers = document.querySelector(".show_all_couriers");

function displayCouriers(couriers) {
    let allCouriers = '';

    couriers.forEach(courier => {
        const courierElement = `
        <div class="item">
            <h3>${courier.courierName}</h3>
            <br>
            <h5>Courier ID: ${courier.id}</h5>
        </div>
        `
        allCouriers += courierElement;
    })
    
    couriersContainer.innerHTML = allCouriers;
}

function getAllCouriers() {
    fetch('http://localhost:5017/api/Couriers')
    .then(data => data.json())
    .then(response => displayCouriers(response));
}

showAllCouriers.addEventListener('click', function() {
    getAllCouriers();
})

// VALIDATIONS BY COURIER ID - "Check Couriers' capacity"
const showOptionsButton = document.querySelector(".show_options");

function displayOptions(options) {
    let allOptions = '';

    options.forEach(option => {
        let range;
        let rangeWeight = `Weight range: ${option.from}kg - ${option.to}kg`;
        let rangeDimensions = `Dimensions range: ${option.from}cm³ - ${option.to}cm³`;
        if (option.validationType == 0) {
            range = rangeWeight;
        } else {
            range = rangeDimensions;
        }
        const optionElement = `
        <div class="item">
            <h2>Capacities:</h2>
            <br>
            <h4>Courier ID: ${option.courierId}</h4>
            <h4>${range}</h4>
        </div>
        `
        allOptions += optionElement;
    })
    
    couriersContainer.innerHTML = allOptions;
}

function getOptionsByCourierId(id) {
    fetch(`http://localhost:5017/api/Couriers/validationsByCourier/${id}`)
    .then(data => data.json())
    .then(response => displayOptions(response));
}

showOptionsButton.addEventListener('click', function() {
    var optionsByCourierId = document.querySelector("#options_by_courier_id").value;
    getOptionsByCourierId(optionsByCourierId);
})

// ADD COURIER
const addCourierButton = document.querySelector(".add_courier_button");
const courierName = document.querySelector("#courierName");

function addCourier(courierName) {
    const body = {
        courierName: courierName
    }
    fetch('http://localhost:5017/api/Couriers/addCourier', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(response => console.log(response));
}

addCourierButton.addEventListener('click', function() {
    addCourier(courierName.value);
    couriersContainer.innerHTML += "Courier successfully added!";
})

// REMOVE COURIER
const deleteCourierButton = document.querySelector(".delete_courier_button");

function deleteCourier(id) {
    fetch(`http://localhost:5017/api/Couriers/deleteCourier/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => {
        console.log(response)
    });
}

deleteCourierButton.addEventListener('click', function() {
    var courierId = document.querySelector("#courier_id_remove").value;
    deleteCourier(courierId);
    couriersContainer.innerHTML += `Courier with ID ${courierId} successfully removed!`;
})

// CALCULATIONS
// CALCULATIONS BY COURIER ID - "Pricing by Courier"
const pricingContainer = document.querySelector(".pricing_container");

const showCalculationsButton = document.querySelector(".show_calculations");

function displayCalculations(calculations) {
    let allCalculations = '';

    calculations.forEach(calculation => {
        let range;
        let rangeWeight = `Weight range: ${calculation.from}kg - ${calculation.to}kg`;
        let rangeDimensions = `Dimensions range: ${calculation.from}cm³ - ${calculation.to}cm³`;
        if (calculation.calculationType == 0) {
            range = rangeWeight;
        } else {
            range = rangeDimensions;
        }

        const calculationElement = `
        <div class="item">
            <h2>Pricing by Courier:</h2>
            <br>
            <h4>Courier ID: ${calculation.courierId}</h4>
            <h4>${range}</h4>
            <h4>Cost: ${calculation.cost}$</h4>
        </div>
        `
        allCalculations += calculationElement;
    })
    
    pricingContainer.innerHTML = allCalculations;
}

function getCalculationsByCourierId(id) {
    fetch(`http://localhost:5017/api/Calculations/calculationsByCourier/${id}`)
    .then(data => data.json())
    .then(response => displayCalculations(response));
}

showCalculationsButton.addEventListener('click', function() {
    getCalculationsByCourierId(document.querySelector("#calculations_by_courier_id").value);
})

// CALCULATIONS BY TYPE - "See offers"
const showCalculationsByTypeButton = document.querySelector(".show_calculations_by_type");

function displayCalculationsByType(calculations) {
    let AllCalcsByType = '';

    calculations.forEach(calculation => {
        let calcType;
        let calcFrom;
        let calcTo;

        let weightFrom = `Amount from: ${calculation.from}kg`;
        let weightTo = `Amount to: ${calculation.to}kg`;
        let dimensionsFrom = `Amount from: ${calculation.from}cm³`;
        let dimensionsTo = `Amount to: ${calculation.to}cm³`;

        if (calculation.calculationType == 0) {
            calcType = 'Weight';
            calcFrom = weightFrom;
            calcTo = weightTo;
        } else if (calculation.calculationType == 1) {
            calcType = 'Dimensions';
            calcFrom = dimensionsFrom;
            calcTo = dimensionsTo;
        }

        const calculationElement = `
        <div class="item">
            <h2>Pricing details:</h2>
            <br>
            <h4>Courier ID: ${calculation.courierId}</h4>
            <h4>Calculation by: ${calcType}</h4>
            <h4>${calcFrom}</h4>
            <h4>${calcTo}</h4>
            <h4>Cost: ${calculation.cost}$</h4>
        </div>
        `

        AllCalcsByType += calculationElement;
    })
    
    pricingContainer.innerHTML = AllCalcsByType;
}

function getCalculationsByType(calculationType) {
    fetch(`http://localhost:5017/api/Calculations/calculationsByType/${calculationType}`)
    .then(data => data.json())
    .then(response => displayCalculationsByType(response));
}

showCalculationsByTypeButton.addEventListener('click', function() {
    getCalculationsByType(document.querySelector("#calculations_by_type").value);
})

// CALCULATIONS BY INPUTS - "Get offer"
const showSpecificCalculation = document.querySelector(".show_specific_calculation");
const calcWeight = document.querySelector("#input_weight");
const calcHeight = document.querySelector("#input_height");
const calcWidth = document.querySelector("#input_width");
const calcDepth = document.querySelector("#input_depth");

function showCalculation(calculation) {
    let allCalculations = '';

    const calculationElement = `
            <div class="item">
                <h2>Price:</h2>
                <br>
                <h4>Courier ID: ${calculation.courierId}</h4>
                <h4>Cost: ${calculation.cost}$</h4>
                <br>
                <button>Make an order!</button>
            </div>
            `
            allCalculations += calculationElement;       
   
    pricingContainer.innerHTML = allCalculations;
}

function getSpecificCalculation(weight, height, width, depth) {
    fetch(`http://localhost:5017/api/Calculations/costByInputs/${weight}/${height}/${width}/${depth}`)
    .then(data => data.json())
    .then(response => showCalculation(response));
}

showSpecificCalculation.addEventListener('click', function() {
    getSpecificCalculation(calcWeight.value, calcHeight.value, calcWidth.value, calcDepth.value);
})