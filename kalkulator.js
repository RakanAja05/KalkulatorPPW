function infixToPostfix(expr) {
  const output = [];
  const stack = [];
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const tokens = expr.match(/\d+(\.\d+)?|[+\-*/()]/g);

  if (!tokens) return [];

  for (const token of tokens) {
    if (!isNaN(token)) {
      output.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        output.push(stack.pop());
      }
      stack.pop(); // pop '('
    } else {
      while (
        stack.length &&
        precedence[token] <= precedence[stack[stack.length - 1]]
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length) {
    output.push(stack.pop());
  }

  return output;
}

function evaluatePostfix(postfix) {
  const stack = [];

  for (const token of postfix) {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(a / b); break;
      }
    }
  }

  return stack[0];
}

function hitung() {
  const input = document.getElementById('input').value;
  try {
    const postfix = infixToPostfix(input);
    const hasil = evaluatePostfix(postfix);
    document.getElementById('hasil').innerHTML =
      `Hasil: ${hasil}`;
  } catch (e) {
    document.getElementById('hasil').innerText = 'Terjadi kesalahan pada input';
  }
}