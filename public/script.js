const apiURL = 'http://localhost:3000/sites';
const tableBody = document.querySelector('#sitesTable tbody');

async function loadSites() {
    const res = await fetch(apiURL);
    const sites = await res.json();

    tableBody.innerHTML = ''; 
    sites.forEach(site => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${site.name}</td>
            <td><img src="${site.image}" alt="${site.name}"></td>
            <td><a href="${site.url}" target="_blank">${site.url}</a></td>
            <td>${site.score}</td>
            <td>
                <button onclick="editSite('${site._id}')">Edit</button>
                <button onclick="deleteSite('${site._id}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

async function deleteSite(id) {
    if (!confirm('Are you sure you want to delete this site?')) return;
    await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
    loadSites();
}

function editSite(id) {
    window.location.href = `edit.html?id=${id}`;
}


loadSites();
