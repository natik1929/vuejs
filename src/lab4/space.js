// Функция для загрузки данных из файла JSON
async function fetchSpaceData() {
    const response = await fetch('space.json');
    const data = await response.json();
    return data;
}

// Функция для отображения данных в таблице
function displayData(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';

    data.forEach(item => {
        container.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>${item.distance}</td>
            </tr>
        `;
    });
}

// Функция для сортировки данных
async function sortData() {
    const data = await fetchSpaceData();
    const sortByName = document.getElementById('name').checked;
    const sortByDistance = document.getElementById('distance').checked;

    if (sortByName) {
        data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortByDistance) {
        data.sort((a, b) => a.distance - b.distance);
    }

    displayData(data);
}

// Инициализация отображения данных при загрузке страницы
window.onload = sortData;
