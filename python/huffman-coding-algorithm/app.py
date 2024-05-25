from flask import Flask, render_template, request, jsonify
from huffman import huffman_encode, huffman_decode

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/encode', methods=['POST'])
def encode():
    text = request.json.get('text')
    if text:
        encoded_text, codebook = huffman_encode(text)
        return jsonify({
            'encoded_text': encoded_text,
            'codebook': codebook
        })
    return jsonify({'error': 'No text provided'}), 400

@app.route('/decode', methods=['POST'])
def decode():
    encoded_text = request.json.get('encoded_text')
    codebook = request.json.get('codebook')
    if encoded_text and codebook:
        decoded_text = huffman_decode(encoded_text, codebook)
        return jsonify({'decoded_text': decoded_text})
    return jsonify({'error': 'Encoded text or codebook missing'}), 400

if __name__ == '__main__':
    app.run(debug=True)
