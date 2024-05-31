const capitalize = (str) =>
  str.split(' ')
    .map(([first, ...rest]) => [first.toUpperCase(), ...rest].join(''))
    .join(' ');

export default capitalizeEachWord = (text) => {
  const words = text.split(" ");
  const wordsCapitalized = words.map(word => capitalize(word));
  return wordsCapitalized.join(" ");
}