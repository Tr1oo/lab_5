const morseTable = {
  'A': '.-',     'B': '-...',   'C': '-.-.',   'D': '-..',
  'E': '.',      'F': '..-.',   'G': '--.',    'H': '....',
  'I': '..',     'J': '.---',   'K': '-.-',    'L': '.-..',
  'M': '--',     'N': '-.',     'O': '---',    'P': '.--.',
  'Q': '--.-',   'R': '.-.',    'S': '...',    'T': '-',
  'U': '..-',    'V': '...-',   'W': '.--',    'X': '-..-',
  'Y': '-.--',   'Z': '--..',
  '0': '-----',  '1': '.----',  '2': '..---',  '3': '...--',
  '4': '....-',  '5': '.....',  '6': '-....',  '7': '--...',
  '8': '---..',  '9': '----.',
  ' ': '/',      '.': '.-.-.-', ',': '--..--'
};

function caesarCipher(str, shift) {
  return str.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      return String.fromCharCode((code - 65 + shift + 26) % 26 + 65);
    } else if (code >= 97 && code <= 122) {
      return String.fromCharCode((code - 97 + shift + 26) % 26 + 97);
    } else {
      return char;
    }
  }).join('');
}

function toMorse(text) {
  return text.toUpperCase().split('').map(char =>
    morseTable[char] || '?'
  ).join(' ');
}

function fromMorse(morseCode) {
  const reverseMorse = Object.fromEntries(
    Object.entries(morseTable).map(([k, v]) => [v, k])
  );
  return morseCode.split(' ').map(symbol =>
    reverseMorse[symbol] || '?'
  ).join('');
}

function encrypt() {
  const method = document.getElementById("method").value;
  const text = document.getElementById("inputText").value;
  const shift = parseInt(document.getElementById("shift").value);
  let result = "";

  if (method === "caesar") {
    result = caesarCipher(text, shift);
  } else if (method === "morse") {
    result = toMorse(text);
  } else if (method === "base64") {
    result = btoa(text);
  }

  document.getElementById("resultText").value = result;
}

function decrypt() {
  const method = document.getElementById("method").value;
  const text = document.getElementById("inputText").value;
  const shift = parseInt(document.getElementById("shift").value);
  let result = "";

  if (method === "caesar") {
    result = caesarCipher(text, -shift);
  } else if (method === "morse") {
    result = fromMorse(text);
  } else if (method === "base64") {
    try {
      result = atob(text);
    } catch {
      result = "⛔ Неправильний Base64";
    }
  }

  document.getElementById("resultText").value = result;
}

function toggleShiftInput() {
  const method = document.getElementById("method").value;
  const shiftContainer = document.getElementById("shiftContainer");
  shiftContainer.style.display = method === "caesar" ? "block" : "none";
}
