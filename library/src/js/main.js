import '/styles/style.scss';
import '/js/blocks.js';

for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log("Hello");  
  }, i * 2000);
}

