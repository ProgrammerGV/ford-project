let carArr = [];

class Car {
    constructor(nome, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image) {
        this.nome = nome;
        this.preco = preco;
        this.alturaCacamba = alturaCacamba;
        this.alturaVeiculo = alturaVeiculo;
        this.alturaSolo = alturaSolo;
        this.capacidadeCarga = capacidadeCarga;
        this.motor = motor;
        this.potencia = potencia;
        this.volumeCacamba = volumeCacamba;
        this.roda = roda;
        this.image = image;
    }
}

function GetCarArrPosition(arr, carClass) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].nome === carClass.nome)
            return i;
    }
    return -1;
}

function SetCarToCompare(el, carClass) {
    if (carClass instanceof Car) {
        if (el.checked) {
            carArr.push(carClass);
        } else {
            const index = GetCarArrPosition(carArr, carClass);
            if (index !== -1) {
                carArr.splice(index, 1);
            }
        }
    } else {
        throw "You need set a Car Class";
    }
}

function ShowCompare() {
    if (carArr.length !== 2 ) {
        alert("Por favor, selecione exatamente 2 carros para comparar");
        return;
    }
    
    const carsToCompare = carArr.slice(0, 2);
    
    UpdateCompareTable(carsToCompare);
    document.getElementById("compare-popup").style.display = "flex";
}

function HideCompare() {
    document.getElementById("compare-popup").style.display = "none";
}

function UpdateCompareTable(cars) {
    const container = document.getElementById("compare-cars-container");
    container.innerHTML = "";
    
    cars.forEach(car => {
        const carDiv = document.createElement("div");
        carDiv.className = "car-comparison";
        
        carDiv.innerHTML = `
            <h3>${car.nome}</h3>
            <img src="${car.image}" alt="${car.nome}">
            <div class="car-spec"><strong>Preço:</strong> R$ ${car.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
            <div class="car-spec"><strong>Altura da Caçamba:</strong> ${car.alturaCacamba} mm</div>
            <div class="car-spec"><strong>Altura do Veículo:</strong> ${car.alturaVeiculo} mm</div>
            <div class="car-spec"><strong>Altura do Solo:</strong> ${car.alturaSolo} mm</div>
            <div class="car-spec"><strong>Capacidade de Carga:</strong> ${car.capacidadeCarga} kg</div>
            <div class="car-spec"><strong>Motor:</strong> ${car.motor}L</div>
            <div class="car-spec"><strong>Potência:</strong> ${car.potencia} cv</div>
            <div class="car-spec"><strong>Volume da Caçamba:</strong> ${car.volumeCacamba} L</div>
            <div class="car-spec"><strong>Rodas:</strong> ${car.roda}</div>
        `;
        
        container.appendChild(carDiv);
    });
}

window.onclick = function(event) {
    const popup = document.getElementById("compare-popup");
    if (event.target === popup) {
        HideCompare();
    }
}