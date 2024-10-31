function isUppercaseLatin(str) {
  const regex = /^[A-Z]+$/;
  return regex.test(str);
}

function encodeString(str) {
  let result = "";
  let countLetters = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      countLetters++;
    } else {
      result += (countLetters > 0 ? countLetters + 1 : "") + str[i];
      countLetters = 0;
    }
  }

  return result;
}

function getStringValue(input) {
  return input.value.trim();
}

function displayEncodedString(block, str) {
  block.textContent = encodeString(str);
}

function updateButtonState(button, input) {
  button.disabled =
    getStringValue(input) === "" || !isUppercaseLatin(getStringValue(input));
}

(function () {
  const textarea = document.querySelector(".encoder__textarea");
  const encodeButton = document.querySelector(".encoder__button");
  const copyButton = document.querySelector(".encoder__copy-btn");

  updateButtonState(encodeButton, textarea);
  updateButtonState(copyButton, textarea);

  textarea.addEventListener("input", () => {
    updateButtonState(encodeButton, textarea);
  });

  encodeButton.addEventListener("click", () => {
    const out = document.querySelector(".encoder__output");
    const str = getStringValue(textarea);

    displayEncodedString(out, str);
    updateButtonState(copyButton, textarea, str);

    copyButton.addEventListener("click", () => {
      copyToClipboard(out);
    });

    function copyToClipboard(textBlock) {
      if (textBlock.innerHTML) {
        navigator.clipboard
          .writeText(textBlock.innerHTML)
          .then(() => {
            textBlock.innerHTML = "";
            if (copyButton.innerHTML !== "Готово!") {
              const originalText = copyButton.innerHTML;
              copyButton.innerHTML = "Готово!";
              setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.disabled = true;
              }, 1500);
            }
          })
          .catch((err) => {
            console.log("Что-то пошло не так", err);
          });
      }
    }
  });
})();
