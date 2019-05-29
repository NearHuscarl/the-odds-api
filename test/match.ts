import sinon from 'sinon';

export const String = sinon.match.string;
export const Number = sinon.match.number;
export const Undefined = sinon.match.typeOf('undefined');
export const Null = sinon.match.typeOf('null');
export const Falsy = sinon.match.falsy;
export const StringOrNumber = String.or(Number);
export const StringOptional = String.or(Falsy);
