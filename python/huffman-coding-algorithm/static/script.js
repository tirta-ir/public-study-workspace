// static/script.js

function encodeText() {
    const text = document.getElementById("encodeInput").value;
    fetch('/encode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById("encodedOutput").value = data.encoded_text;
            document.getElementById("codebookOutput").value = JSON.stringify(data.codebook, null, 2);
        }
    });
}

function decodeText() {
    const encodedText = document.getElementById("decodeInput").value;
    const codebook = document.getElementById("decodeCodebook").value;
    fetch('/decode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ encoded_text: encodedText, codebook: JSON.parse(codebook) }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById("decodedOutput").value = data.decoded_text;
        }
    });
}
