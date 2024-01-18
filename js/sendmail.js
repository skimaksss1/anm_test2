document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', form.action, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('Form submitted successfully');
            form.reset();
        } else {
            alert('An error occurred while submitting the form.');
        }
    };
    xhr.send(formData);
});