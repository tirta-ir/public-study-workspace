class InterpreterError(Exception):
    pass

class AssemblerInterpreter:
    def __init__(self):
        self.registers = {}
        self.labels = {}
        self.commands = []
        self.output = ""
        self.instruction_pointer = 0
        self.stack = []
        self.cmp_result = None

    def run(self, program):
        self.parse_program(program)
        
        while self.instruction_pointer < len(self.commands):
            command = self.commands[self.instruction_pointer]
            self.execute_command(command)
        
        return self.output or "-1"

    def parse_program(self, program):
        lines = program.strip().split("\n")
        for i, line in enumerate(lines):
            line = line.strip()
            if not line:
                continue
            # Ignore anything after a semicolon
            line = line.split(';')[0].strip()
            if line.endswith(":"):
                self.labels[line[:-1]] = len(self.commands)
            elif line:  # add this line to avoid adding empty commands
                self.commands.append(line)

    def execute_command(self, command):
        print(f"Executing command: {command}")
        parts = command.split(maxsplit=2)
        cmd = parts[0]
        if cmd == "mov":
            self.mov(parts[1], parts[2])
        elif cmd == "inc":
            self.inc(parts[1])
        elif cmd == "dec":
            self.dec(parts[1])
        elif cmd == "add":
            self.add(parts[1], parts[2])
        elif cmd == "sub":
            self.sub(parts[1], parts[2])
        elif cmd == "mul":
            self.mul(parts[1], parts[2])
        elif cmd == "div":
            self.div(parts[1], parts[2])
        elif cmd == "cmp":
            self.cmp(parts[1], parts[2])
        elif cmd == "jmp":
            self.jmp(parts[1])
        elif cmd == "jne":
            self.jne(parts[1])
        elif cmd == "je":
            self.je(parts[1])
        elif cmd == "jge":
            self.jge(parts[1])
        elif cmd == "jg":
            self.jg(parts[1])
        elif cmd == "jle":
            self.jle(parts[1])
        elif cmd == "jl":
            self.jl(parts[1])
        elif cmd == "call":
            self.call(parts[1])
        elif cmd == "ret":
            self.ret()
        elif cmd == "msg":
            self.msg(parts[1:])
        elif cmd == "end":
            self.end()
        else:
            raise InterpreterError(f"Unknown command: {cmd}")

    def get_value(self, operand):
        try:
            return int(operand)
        except ValueError:
            return self.registers.get(operand, 0)

    def mov(self, x, y):
        self.registers[x] = self.get_value(y)
        self.instruction_pointer += 1

    def inc(self, x):
        self.registers[x] = self.registers.get(x, 0) + 1
        self.instruction_pointer += 1

    def dec(self, x):
        self.registers[x] = self.registers.get(x, 0) - 1
        self.instruction_pointer += 1

    def add(self, x, y):
        self.registers[x] = self.registers.get(x, 0) + self.get_value(y)
        self.instruction_pointer += 1

    def sub(self, x, y):
        self.registers[x] = self.registers.get(x, 0) - self.get_value(y)
        self.instruction_pointer += 1

    def mul(self, x, y):
        self.registers[x] = self.registers.get(x, 0) * self.get_value(y)
        self.instruction_pointer += 1

    def div(self, x, y):
        x_val = self.registers.get(x, 0)
        y_val = self.get_value(y)
        if y_val == 0:
            raise InterpreterError("Division by zero")
        self.registers[x] = x_val / y_val
        self.instruction_pointer += 1

    def cmp(self, x, y):
        self.cmp_result = self.get_value(x) - self.get_value(y)
        self.instruction_pointer += 1

    def jmp(self, label):
        if label not in self.labels:
            raise InterpreterError(f"Label not found: {label}")
        self.instruction_pointer = self.labels[label]

    def jne(self, label):
        if self.cmp_result != 0:
            self.jmp(label)
        else:
            self.instruction_pointer += 1

    def je(self, label):
        if self.cmp_result == 0:
            self.jmp(label)
        else:
            self.instruction_pointer += 1

    def jge(self, label):
        if self.cmp_result >= 0:
            self.jmp(label)
        else:
            self.instruction_pointer += 1

    def jg(self, label):
        if self.cmp_result > 0:
            self.jmp(label)
        else:
            self.instruction_pointer += 1

    def jle(self, label):
        if self.cmp_result <= 0:
            self.jmp(label)
        else:
            self.instruction_pointer += 1

    def jl(self, label):
        if self.cmp_result < 0:
            self.jmp(label)
        else:
            self.instruction_pointer += 1

    def call(self, label):
        self.instruction_pointer += 1
        self.stack.append(self.instruction_pointer)
        self.jmp(label)

    def ret(self):
        if not self.stack:
            raise InterpreterError("Return stack underflow")
        self.instruction_pointer = self.stack.pop()

    def msg(self, parts):
        message = " ".join(parts)
        parts = message.split(',')
        formatted_parts = [str(self.registers[part.strip()]) if part.strip() in self.registers else part for part in parts]
        self.output += ''.join(formatted_parts).replace("'", "")
        self.instruction_pointer += 1

    def end(self):
        self.instruction_pointer = len(self.commands)
