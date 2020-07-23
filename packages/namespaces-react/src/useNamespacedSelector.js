import { o } from 'ramda';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getStateByFeatureAndNamespace, DEFAULT_FEATURE } from '@redux-tools/namespaces';

import useNamespace from './useNamespace';

const useNamespacedSelector = (
	selector,
	equalityFn,
	{ feature: optionFeature, namespace: optionNamespace } = {}
) => {
	const feature = optionFeature ?? DEFAULT_FEATURE;
	const contextNamespace = useNamespace(feature);
	const namespace = optionNamespace ?? contextNamespace ?? null;

	const namespacedSelector = useMemo(
		() => o(selector, getStateByFeatureAndNamespace(feature, namespace)),
		[selector, feature, namespace]
	);

	return useSelector(namespacedSelector, equalityFn);
};

export default useNamespacedSelector;
