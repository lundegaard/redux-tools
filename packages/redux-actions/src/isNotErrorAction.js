import { complement } from 'ramda';
import isErrorAction from './isErrorAction';

export default complement(isErrorAction);
