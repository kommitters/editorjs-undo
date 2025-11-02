declare module 'vanilla-caret-js' {
  class VanillaCaret {
    getPos: () => number;
    setPos: (idx: number) => void;
    constructor(node: Node | null);
  }
  export default VanillaCaret;
}
