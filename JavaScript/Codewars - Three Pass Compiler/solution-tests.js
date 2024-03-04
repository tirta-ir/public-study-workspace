const Test = require('./solution.js');

describe("Tests", () => {
  it("test", () => {
var prog = '[ x y z ] ( 2*3*x + 5*y - 3*z ) / (1 + 3 + 2*2)';
var t1 = JSON.stringify({"op":"/","a":{"op":"-","a":{"op":"+","a":{"op":"*","a":{"op":"*","a":{"op":"imm","n":2},"b":{"op":"imm","n":3}},"b":{"op":"arg","n":0}},"b":{"op":"*","a":{"op":"imm","n":5},"b":{"op":"arg","n":1}}},"b":{"op":"*","a":{"op":"imm","n":3},"b":{"op":"arg","n":2}}},"b":{"op":"+","a":{"op":"+","a":{"op":"imm","n":1},"b":{"op":"imm","n":3}},"b":{"op":"*","a":{"op":"imm","n":2},"b":{"op":"imm","n":2}}}});
var t2 = JSON.stringify({"op":"/","a":{"op":"-","a":{"op":"+","a":{"op":"*","a":{"op":"imm","n":6},"b":{"op":"arg","n":0}},"b":{"op":"*","a":{"op":"imm","n":5},"b":{"op":"arg","n":1}}},"b":{"op":"*","a":{"op":"imm","n":3},"b":{"op":"arg","n":2}}},"b":{"op":"imm","n":8}});

var c = new Compiler();
Test.expect(c,"Able to construct compiler");

var p1 = c.pass1(prog);
Test.expect(JSON.stringify(p1) === t1,"Pass1");

var p2 = c.pass2(p1);
Test.expect(JSON.stringify(p2) === t2,"Pass2");

var p3 = c.pass3(p2);
Test.expect(simulate(p3,[4,0,0]) === 3,"prog(4,0,0) == 3");
Test.expect(simulate(p3,[4,8,0]) === 8,"prog(4,8,0) == 8");
Test.expect(simulate(p3,[4,8,16]) === 2,"prog(4,8,6) == 2");

var orderOfOpsProg = "[ x y z ] x - y - z + 10 / 5 / 2 - 7 / 1 / 7";
var orderOfOps = c.pass3(c.pass2(c.pass1(orderOfOpsProg)));
Test.expect(simulate(orderOfOps,[5,4,1]) === 0, orderOfOpsProg + " @ [5,4,1]");

  });
});
