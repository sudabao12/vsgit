let word = '';
let inputs = [];

function getWord() {
  return fetch('./ziyuan/words.json')
    .then(re => re.json())
    .then(data => {
      const words = data.words;
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    })
    .catch(error => {
      console.error('Error fetching json:', error);
    });
}

function initializeWord() {
  getWord().then(selectedWord => {
    if (!selectedWord) {
      console.error('No word found');
      return;
    }

    word = selectedWord.word;
    const meaning = selectedWord.meaning;
    const extra = selectedWord.extra;

    let letters = Array.from(word);
    console.log(letters);

    let text = document.getElementById('text');
    let meaningDiv = document.getElementById('meaning');
    text.innerHTML = ''; // Clear previous content
    meaningDiv.innerHTML = ''; // Clear previous content

    inputs = []; // Clear inputs array

    let emptyCount = Math.max(2, Math.floor(Math.random() * letters.length));
    let emptyIndices = new Set();

    while (emptyIndices.size < emptyCount) {
      let randomIndex = Math.floor(Math.random() * letters.length);
      emptyIndices.add(randomIndex);
    }

    letters.forEach((element, index) => {
      let input = document.createElement('input');
      input.maxLength = 1;
      if (emptyIndices.has(index)) {
        input.value = '';
      } else {
        input.value = element;
      }
      text.appendChild(input);

      inputs.push(input);
      input.addEventListener('input', (e) => {
        handleInput(e, index);
      });
      input.defaultValue = element;
    });

    let meaningP = document.createElement('p');
    meaningP.textContent = `中文意思: ${meaning} ${extra || ''}`;
    meaningDiv.appendChild(meaningP);
  });
}

function handleInput(event, index) {
  check();
  if (event.target.value !== '' && /^[a-zA-Z]$/.test(event.target.value)) {
    focusNextEmptyInput(index);
  }
}

function focusNextEmptyInput(currentIndex) {
  for (let i = currentIndex + 1; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      inputs[i].focus();
      return;
    }
  }
  for (let i = 0; i < currentIndex; i++) {
    if (inputs[i].value === '') {
      inputs[i].focus();
      return;
    }
  }
}

function check() {
  let allInput = true;
  inputs.forEach(input => {
    let inputValue = input.value;
    if (/^[a-zA-Z]?$/.test(inputValue)) {
      // Do nothing
    } else {
      input.value = '';
      alert('请输入英文字母或留空');
    }
    if (inputValue === '') {
      allInput = false;
    }
  });

  if (allInput) {
    let userInput = inputs.map(input => input.value).join('');
    if (userInput === word) {
      inputs.forEach(input => {
        input.classList.remove('incorrect');
        input.classList.add('correct');
      });
      console.log('成功');
      setTimeout(() => {
        initializeWord(); // Generate new word after success
      }, 1000);
    } else {
      inputs.forEach(input => {
        input.classList.remove('correct');
        input.classList.add('incorrect');
      });
      console.log('失败');
      setTimeout(() => {
        inputs.forEach(input => {
          if (input.value !== input.defaultValue) {
            input.value = '';
          }
          input.classList.remove('incorrect');
        });
        focusFirstEmptyInput(); // Focus on the first empty input
      }, 1000);
    }
  }
}

function focusFirstEmptyInput() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      inputs[i].focus();
      return;
    }
  }
}

initializeWord();
