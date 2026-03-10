let data = localStorage.getItem('coldCallsData') ? JSON.parse(localStorage.getItem('coldCallsData')) : [];

async function addCall() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes').value;
    const statusElements = document.getElementsByName('status');
    let status = '';

    for (let element of statusElements) {
        if (element.checked) {
            status = element.value;
            break;
        }
    }

    if (!status) {
        alert('Please select a status for the call.');
        return;
    }

    if (!name || !phone) {
        alert('Please fill in both the name and phone number fields.');
        return;
    }

    const newCall = {
        name,
        phone,
        status,
        notes
    };

    data.push(newCall);
    localStorage.setItem('coldCallsData', JSON.stringify(data));
    location.reload(); // Reload to update the table
}

function deleteCall(index) {
    data.splice(index, 1);
    localStorage.setItem('coldCallsData', JSON.stringify(data));
    location.reload();
}

function exportData() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + data.map(call => `${call.name},${call.phone},${call.status},${call.notes}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cold_calls_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


document.getElementById('submit').addEventListener('click', addCall)
document.getElementById('export').addEventListener('click', exportData)

document.getElementsByTagName('tbody')[0].innerHTML = data.map(call => `<tr>
    <td>${call.name}</td>
    <td>${call.phone}</td>
    <td>${call.status}</td>
    <td>${call.notes}</td>
    <td><button onclick="deleteCall(${data.indexOf(call)})" class="delete-btn">Delete</button></td>
</tr>`).join('');
