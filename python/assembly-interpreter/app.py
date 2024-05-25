import tkinter as tk
from tkinter import scrolledtext
from main import AssemblerInterpreter  # Import the interpreter from main.py

class AssemblerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Assembler Interpreter")
        
        self.input_label = tk.Label(root, text="Input Assembler Code:")
        self.input_label.pack()
        
        self.input_text = scrolledtext.ScrolledText(root, wrap=tk.WORD, width=50, height=15)
        self.input_text.pack()
        
        self.run_button = tk.Button(root, text="Run", command=self.run_code)
        self.run_button.pack()
        
        self.output_label = tk.Label(root, text="Output:")
        self.output_label.pack()
        
        self.output_text = scrolledtext.ScrolledText(root, wrap=tk.WORD, width=50, height=5, state='disabled')
        self.output_text.pack()
    
    def run_code(self):
        code = self.input_text.get("1.0", tk.END)
        interpreter = AssemblerInterpreter()
        result = interpreter.run(code)
        
        self.output_text.config(state='normal')
        self.output_text.delete("1.0", tk.END)
        self.output_text.insert(tk.END, result)
        self.output_text.config(state='disabled')

if __name__ == "__main__":
    root = tk.Tk()
    app = AssemblerApp(root)
    root.mainloop()
