import { ROOT_KEY } from './constants';

describe('constants', () => {
	it('should not be changed', () => {
		expect(ROOT_KEY).toMatchSnapshot();
	});
});
