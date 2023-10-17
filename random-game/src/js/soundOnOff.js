document.addEventListener('DOMContentLoaded', () => {
  const soundOffButton = document.querySelector(
    '.header__sound[style="display: block;"]'
  );
  const soundOnButton = document.querySelector(
    '.header__sound[style="display: none;"]'
  );
  let tracks = ['audio/Daniel Deluxe - Infiltrator.mp3'];
  let audio = new Audio(tracks[0]); // загрузите первый трек

  audio.loop = true; // зациклите аудио

  const switchSound = () => {
    if (audio.paused) {
      audio.play();
      soundOffButton.style.display = 'none';
      soundOnButton.style.display = 'block';
    } else {
      audio.pause();
      soundOffButton.style.display = 'block';
      soundOnButton.style.display = 'none';
    }
  };

  soundOffButton.addEventListener('click', switchSound);
  soundOnButton.addEventListener('click', switchSound);
});
