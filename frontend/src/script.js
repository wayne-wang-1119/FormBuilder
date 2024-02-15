document
  .getElementById("generateReportBtn")
  .addEventListener("click", function () {
    var formId = document.getElementById("formIdInput").value;
    if (!formId) {
      alert("Please enter a form ID.");
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `/process/forms/${formId}`, true);
    xhr.onload = function () {
      if (this.status == 200) {
        var response = JSON.parse(this.responseText);
        // Assuming the response contains the field 'response' with the data to display
        document.getElementById(
          "reportContainer"
        ).innerHTML = `<pre>${JSON.stringify(
          response.response,
          null,
          2
        )}</pre>`;
      } else {
        alert("Form not found or an error occurred.");
      }
    };
    xhr.onerror = function () {
      alert("An error occurred during the request.");
    };
    xhr.send();
  });
