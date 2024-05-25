import heapq
from collections import Counter

# Define a class for the nodes in the Huffman Tree
class HuffmanNode:
    def __init__(self, char, freq):
        self.char = char  # Character or symbol
        self.freq = freq  # Frequency of the character
        self.left = None  # Left child
        self.right = None  # Right child

    # Define a less-than operator to make the node comparable based on frequency
    def __lt__(self, other):
        return self.freq < other.freq

# Function to build the Huffman Tree
def build_huffman_tree(text):
    # Calculate the frequency of each character in the text
    freq = Counter(text)
    # Create a priority queue (min-heap) from the frequency count
    heap = [HuffmanNode(char, freq) for char, freq in freq.items()]
    heapq.heapify(heap)

    # Iterate until there is only one node left in the heap
    while len(heap) > 1:
        # Pop the two nodes with the smallest frequency
        node1 = heapq.heappop(heap)
        node2 = heapq.heappop(heap)
        # Merge these nodes into a new node with their combined frequency
        merged = HuffmanNode(None, node1.freq + node2.freq)
        merged.left = node1
        merged.right = node2
        # Push the merged node back into the heap
        heapq.heappush(heap, merged)

    # The remaining node is the root of the Huffman Tree
    return heap[0]

# Function to build the Huffman codes from the Huffman Tree
def build_codes(node, prefix="", codebook=None):
    if codebook is None:
        codebook = {}

    # Recursively build the codebook
    if node is not None:
        if node.char is not None:
            # Leaf node: store the current prefix as the code for this character
            codebook[node.char] = prefix
        # Traverse the left child with "0" added to the prefix
        build_codes(node.left, prefix + "0", codebook)
        # Traverse the right child with "1" added to the prefix
        build_codes(node.right, prefix + "1", codebook)

    return codebook

# Function to encode a given text using Huffman coding
def huffman_encode(text):
    # Build the Huffman Tree from the input text
    root = build_huffman_tree(text)
    # Generate the Huffman codes from the Huffman Tree
    huffman_code = build_codes(root)
    # Encode the text by replacing each character with its Huffman code
    encoded_text = ''.join(huffman_code[char] for char in text)
    return encoded_text, huffman_code

# Function to decode an encoded text using Huffman coding
def huffman_decode(encoded_text, huffman_code):
    # Reverse the codebook to get the mapping from code to character
    reverse_codebook = {v: k for k, v in huffman_code.items()}
    current_code = ""
    decoded_text = ""

    # Iterate through each bit in the encoded text
    for bit in encoded_text:
        current_code += bit
        # If the current code matches a character in the reverse codebook, append the character to the decoded text
        if current_code in reverse_codebook:
            decoded_text += reverse_codebook[current_code]
            current_code = ""

    return decoded_text