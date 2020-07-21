import { o } from 'ramda';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { defaultNamespace, DEFAULT_FEATURE } from '@redux-tools/namespaces';

import useNamespace from './useNamespace';

const useNamespacedDispatch = ({ feature: optionFeature, namespace: optionNamespace } = {}) => {
	const dispatch = useDispatch();
	const feature = optionFeature ?? DEFAULT_FEATURE;
	const contextNamespace = useNamespace(feature);
	const namespace = optionNamespace ?? contextNamespace ?? null;

	return useMemo(() => o(dispatch, defaultNamespace(namespace)), [dispatch, namespace]);
};

export default useNamespacedDispatch;
