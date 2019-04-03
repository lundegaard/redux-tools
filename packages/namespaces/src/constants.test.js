import * as Constants from './constants';

describe('constants', () => {
	it('should not be changed', () => {
		expect(Constants).toMatchSnapshot();
	});
});
