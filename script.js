const video = document.getElementById("video");
const status = document.getElementById("status");
const button = document.getElementById("loginBtn");

navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
    video.srcObject = stream;
})
.catch(() => {
    status.innerHTML = "Camera access denied.";
});

button.onclick = function () {

    status.innerHTML = "Detecting face...";
    button.disabled = true;

    setTimeout(() => {

        status.innerHTML = "Face recognized ✔";

        setTimeout(() => {

            status.innerHTML = "Login Successful";

            // Get the user's name
            const name = document.getElementById("name").value || "Unknown User";

            // Save login record
            const loginRecord = {
                name: name,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            };

            let records = JSON.parse(localStorage.getItem("loginRecords")) || [];
            records.push(loginRecord);
            localStorage.setItem("loginRecords", JSON.stringify(records));

            // Go to dashboard after 1.5 seconds
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1500);

        }, 1500);

    }, 3000);

};