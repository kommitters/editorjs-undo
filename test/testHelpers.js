function getHiddenAttribute(children) {
  try {
    let counter = 0;
    for (let i = 2; i < children.length; i += 1) {
      if (
        children[i].attributes[2].name === 'hidden'
        && children[i].attributes[2].value === 'true'
      ) {
        counter += 1;
      }
    }
    return counter;
  } catch (e) {
    return 0;
  }
}

export default getHiddenAttribute;
