import EvenEmitter from "events";

const _emitter = new EvenEmitter();

_emitter.setMaxListeners(0);
const emitter = _emitter;
export default emitter;
