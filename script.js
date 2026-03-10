let data = localStorage.getItem('coldCallsData') ? JSON.parse(localStorage.getItem('coldCallsData')) : [];

function addCall() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes').value;

    if (!name || !phone) {
        alert('Please fill in both the name and phone number fields.');
        return;
    }

    const newCall = {
        name,
        phone,
        notes
    };

    data.push(newCall);
    localStorage.setItem('coldCallsData', JSON.stringify(data));
}

function deleteCall(index) {
    data.splice(index, 1);
    localStorage.setItem('coldCallsData', JSON.stringify(data));
    location.reload();
}

document.getElementById('submit').addEventListener('click', addCall)

document.getElementsByTagName('tbody')[0].innerHTML = data.map(call => `<tr>
    <td>${call.name}</td>
    <td>${call.phone}</td>
    <td>${call.notes}</td>
    <td><button onclick="deleteCall(${data.indexOf(call)})" class="delete-btn">Delete</button></td>
</tr>`).join('');
