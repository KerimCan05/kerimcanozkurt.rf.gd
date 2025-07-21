document.getElementById("guestbook").addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    formData.set('date', Math.floor(Date.now() / 1000));
    const confirmationP = document.getElementById('confirmation');

    try {
        const response = await fetch('/php/guestbook.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            confirmationP.textContent = 'Thank you! Your entry was saved.';
            confirmationP.className = '';
            form.reset();
        } else {
            confirmationP.textContent = 'Error: ' + result.message;
            confirmationP.className = 'error';
        }
    } catch (error) {
        confirmationP.textContent = 'Error: Could not connect to server';
        confirmationP.className = 'error';
    }
});