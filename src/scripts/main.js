document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#cta');
  if (!button) {
    console.log('Portfolio scaffold ready for content.');
    return;
  }

  button.addEventListener('click', () => {
    alert('You just proved the JS pipeline works!');
  });

  console.log('Future portfolio script initialized.');
});
