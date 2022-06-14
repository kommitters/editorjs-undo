import ToggleBlock from '../../src/index';
import data from './toolData';
import editor from './editor';
/**
 * Creates an instance of ToggleBlock
 */
const createToggleBlock = () => new ToggleBlock({ data, api: editor });

export default createToggleBlock;
