"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

function _interopDefault(ex) {
	return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var React = require("react");
var React__default = _interopDefault(React);
var ReactDOM = require("react-dom");
var ReactDOM__default = _interopDefault(ReactDOM);

function _extends() {
	_extends =
		Object.assign ||
		function(target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];

				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}

			return target;
		};

	return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;

	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}

	return target;
}

function _inheritsLoose(subClass, superClass) {
	subClass.prototype = Object.create(superClass.prototype);
	subClass.prototype.constructor = subClass;
	subClass.__proto__ = superClass;
}

function unwrapExports(x) {
	return x &&
		x.__esModule &&
		Object.prototype.hasOwnProperty.call(x, "default")
		? x.default
		: x;
}

function createCommonjsModule(fn, module) {
	return (
		(module = { exports: {} }), fn(module, module.exports), module.exports
	);
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError(
			"Object.assign cannot be called with null or undefined"
		);
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		} // Detect buggy property enumeration order in older V8 versions.
		// https://bugs.chromium.org/p/v8/issues/detail?id=4118

		var test1 = new String("abc"); // eslint-disable-line no-new-wrappers

		test1[5] = "de";

		if (Object.getOwnPropertyNames(test1)[0] === "5") {
			return false;
		} // https://bugs.chromium.org/p/v8/issues/detail?id=3056

		var test2 = {};

		for (var i = 0; i < 10; i++) {
			test2["_" + String.fromCharCode(i)] = i;
		}

		var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
			return test2[n];
		});

		if (order2.join("") !== "0123456789") {
			return false;
		} // https://bugs.chromium.org/p/v8/issues/detail?id=3056

		var test3 = {};
		"abcdefghijklmnopqrst".split("").forEach(function(letter) {
			test3[letter] = letter;
		});

		if (
			Object.keys(Object.assign({}, test3)).join("") !==
			"abcdefghijklmnopqrst"
		) {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative()
	? Object.assign
	: function(target, source) {
			var from;
			var to = toObject(target);
			var symbols;

			for (var s = 1; s < arguments.length; s++) {
				from = Object(arguments[s]);

				for (var key in from) {
					if (hasOwnProperty.call(from, key)) {
						to[key] = from[key];
					}
				}

				if (getOwnPropertySymbols) {
					symbols = getOwnPropertySymbols(from);

					for (var i = 0; i < symbols.length; i++) {
						if (propIsEnumerable.call(from, symbols[i])) {
							to[symbols[i]] = from[symbols[i]];
						}
					}
				}
			}

			return to;
	  };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function printWarning() {};

if (process.env.NODE_ENV !== "production") {
	var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;

	var loggedTypeFailures = {};

	printWarning = function printWarning(text) {
		var message = "Warning: " + text;

		if (typeof console !== "undefined") {
			console.error(message);
		}

		try {
			// --- Welcome to debugging React ---
			// This error was thrown as a convenience so that you can use this stack
			// to find the callsite that caused this warning to fire.
			throw new Error(message);
		} catch (x) {}
	};
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */

function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	if (process.env.NODE_ENV !== "production") {
		for (var typeSpecName in typeSpecs) {
			if (typeSpecs.hasOwnProperty(typeSpecName)) {
				var error; // Prop type validation may throw. In case they do, we don't want to
				// fail the render phase where it didn't fail before. So we log it.
				// After these have been cleaned up, we'll let them throw.

				try {
					// This is intentionally an invariant that gets caught. It's the same
					// behavior as without this statement except with a better message.
					if (typeof typeSpecs[typeSpecName] !== "function") {
						var err = Error(
							(componentName || "React class") +
								": " +
								location +
								" type `" +
								typeSpecName +
								"` is invalid; " +
								"it must be a function, usually from the `prop-types` package, but received `" +
								typeof typeSpecs[typeSpecName] +
								"`."
						);
						err.name = "Invariant Violation";
						throw err;
					}

					error = typeSpecs[typeSpecName](
						values,
						typeSpecName,
						componentName,
						location,
						null,
						ReactPropTypesSecret$1
					);
				} catch (ex) {
					error = ex;
				}

				if (error && !(error instanceof Error)) {
					printWarning(
						(componentName || "React class") +
							": type specification of " +
							location +
							" `" +
							typeSpecName +
							"` is invalid; the type checker " +
							"function must return `null` or an `Error` but returned a " +
							typeof error +
							". " +
							"You may have forgotten to pass an argument to the type checker " +
							"creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
							"shape all require an argument)."
					);
				}

				if (
					error instanceof Error &&
					!(error.message in loggedTypeFailures)
				) {
					// Only monitor this failure once because there tends to be a lot of the
					// same error.
					loggedTypeFailures[error.message] = true;
					var stack = getStack ? getStack() : "";
					printWarning(
						"Failed " +
							location +
							" type: " +
							error.message +
							(stack != null ? stack : "")
					);
				}
			}
		}
	}
}

var checkPropTypes_1 = checkPropTypes;

var printWarning$1 = function printWarning() {};

if (process.env.NODE_ENV !== "production") {
	printWarning$1 = function printWarning(text) {
		var message = "Warning: " + text;

		if (typeof console !== "undefined") {
			console.error(message);
		}

		try {
			// --- Welcome to debugging React ---
			// This error was thrown as a convenience so that you can use this stack
			// to find the callsite that caused this warning to fire.
			throw new Error(message);
		} catch (x) {}
	};
}

function emptyFunctionThatReturnsNull() {
	return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
	/* global Symbol */
	var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = "@@iterator"; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */

	function getIteratorFn(maybeIterable) {
		var iteratorFn =
			maybeIterable &&
			((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) ||
				maybeIterable[FAUX_ITERATOR_SYMBOL]);

		if (typeof iteratorFn === "function") {
			return iteratorFn;
		}
	}
	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = "<<anonymous>>"; // Important!
	// Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

	var ReactPropTypes = {
		array: createPrimitiveTypeChecker("array"),
		bool: createPrimitiveTypeChecker("boolean"),
		func: createPrimitiveTypeChecker("function"),
		number: createPrimitiveTypeChecker("number"),
		object: createPrimitiveTypeChecker("object"),
		string: createPrimitiveTypeChecker("string"),
		symbol: createPrimitiveTypeChecker("symbol"),
		any: createAnyTypeChecker(),
		arrayOf: createArrayOfTypeChecker,
		element: createElementTypeChecker(),
		instanceOf: createInstanceTypeChecker,
		node: createNodeChecker(),
		objectOf: createObjectOfTypeChecker,
		oneOf: createEnumTypeChecker,
		oneOfType: createUnionTypeChecker,
		shape: createShapeTypeChecker,
		exact: createStrictShapeTypeChecker
	};
	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */

	/*eslint-disable no-self-compare*/

	function is(x, y) {
		// SameValue algorithm
		if (x === y) {
			// Steps 1-5, 7-10
			// Steps 6.b-6.e: +0 != -0
			return x !== 0 || 1 / x === 1 / y;
		} else {
			// Step 6.a: NaN == NaN
			return x !== x && y !== y;
		}
	}
	/*eslint-enable no-self-compare*/

	/**
	 * We use an Error-like object for backward compatibility as people may call
	 * PropTypes directly and inspect their output. However, we don't use real
	 * Errors anymore. We don't inspect their stack anyway, and creating them
	 * is prohibitively expensive if they are created too often, such as what
	 * happens in oneOfType() for any type before the one that matched.
	 */

	function PropTypeError(message) {
		this.message = message;
		this.stack = "";
	} // Make `instanceof Error` still work for returned errors.

	PropTypeError.prototype = Error.prototype;

	function createChainableTypeChecker(validate) {
		if (process.env.NODE_ENV !== "production") {
			var manualPropTypeCallCache = {};
			var manualPropTypeWarningCount = 0;
		}

		function checkType(
			isRequired,
			props,
			propName,
			componentName,
			location,
			propFullName,
			secret
		) {
			componentName = componentName || ANONYMOUS;
			propFullName = propFullName || propName;

			if (secret !== ReactPropTypesSecret_1) {
				if (throwOnDirectAccess) {
					// New behavior only for users of `prop-types` package
					var err = new Error(
						"Calling PropTypes validators directly is not supported by the `prop-types` package. " +
							"Use `PropTypes.checkPropTypes()` to call them. " +
							"Read more at http://fb.me/use-check-prop-types"
					);
					err.name = "Invariant Violation";
					throw err;
				} else if (
					process.env.NODE_ENV !== "production" &&
					typeof console !== "undefined"
				) {
					// Old behavior for people using React.PropTypes
					var cacheKey = componentName + ":" + propName;

					if (
						!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
						manualPropTypeWarningCount < 3
					) {
						printWarning$1(
							"You are manually calling a React.PropTypes validation " +
								"function for the `" +
								propFullName +
								"` prop on `" +
								componentName +
								"`. This is deprecated " +
								"and will throw in the standalone `prop-types` package. " +
								"You may be seeing this warning due to a third-party PropTypes " +
								"library. See https://fb.me/react-warning-dont-call-proptypes " +
								"for details."
						);
						manualPropTypeCallCache[cacheKey] = true;
						manualPropTypeWarningCount++;
					}
				}
			}

			if (props[propName] == null) {
				if (isRequired) {
					if (props[propName] === null) {
						return new PropTypeError(
							"The " +
								location +
								" `" +
								propFullName +
								"` is marked as required " +
								("in `" +
									componentName +
									"`, but its value is `null`.")
						);
					}

					return new PropTypeError(
						"The " +
							location +
							" `" +
							propFullName +
							"` is marked as required in " +
							("`" +
								componentName +
								"`, but its value is `undefined`.")
					);
				}

				return null;
			} else {
				return validate(
					props,
					propName,
					componentName,
					location,
					propFullName
				);
			}
		}

		var chainedCheckType = checkType.bind(null, false);
		chainedCheckType.isRequired = checkType.bind(null, true);
		return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName,
			secret
		) {
			var propValue = props[propName];
			var propType = getPropType(propValue);

			if (propType !== expectedType) {
				// `propValue` being instance of, say, date/regexp, pass the 'object'
				// check, but we can offer a more precise error message here rather than
				// 'of type `object`'.
				var preciseType = getPreciseType(propValue);
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type " +
						("`" +
							preciseType +
							"` supplied to `" +
							componentName +
							"`, expected ") +
						("`" + expectedType + "`.")
				);
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
		return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	}

	function createArrayOfTypeChecker(typeChecker) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			if (typeof typeChecker !== "function") {
				return new PropTypeError(
					"Property `" +
						propFullName +
						"` of component `" +
						componentName +
						"` has invalid PropType notation inside arrayOf."
				);
			}

			var propValue = props[propName];

			if (!Array.isArray(propValue)) {
				var propType = getPropType(propValue);
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type " +
						("`" +
							propType +
							"` supplied to `" +
							componentName +
							"`, expected an array.")
				);
			}

			for (var i = 0; i < propValue.length; i++) {
				var error = typeChecker(
					propValue,
					i,
					componentName,
					location,
					propFullName + "[" + i + "]",
					ReactPropTypesSecret_1
				);

				if (error instanceof Error) {
					return error;
				}
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			var propValue = props[propName];

			if (!isValidElement(propValue)) {
				var propType = getPropType(propValue);
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type " +
						("`" +
							propType +
							"` supplied to `" +
							componentName +
							"`, expected a single ReactElement.")
				);
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			if (!(props[propName] instanceof expectedClass)) {
				var expectedClassName = expectedClass.name || ANONYMOUS;
				var actualClassName = getClassName(props[propName]);
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type " +
						("`" +
							actualClassName +
							"` supplied to `" +
							componentName +
							"`, expected ") +
						("instance of `" + expectedClassName + "`.")
				);
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
		if (!Array.isArray(expectedValues)) {
			process.env.NODE_ENV !== "production"
				? printWarning$1(
						"Invalid argument supplied to oneOf, expected an instance of array."
				  )
				: void 0;
			return emptyFunctionThatReturnsNull;
		}

		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			var propValue = props[propName];

			for (var i = 0; i < expectedValues.length; i++) {
				if (is(propValue, expectedValues[i])) {
					return null;
				}
			}

			var valuesString = JSON.stringify(expectedValues);
			return new PropTypeError(
				"Invalid " +
					location +
					" `" +
					propFullName +
					"` of value `" +
					propValue +
					"` " +
					("supplied to `" +
						componentName +
						"`, expected one of " +
						valuesString +
						".")
			);
		}

		return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			if (typeof typeChecker !== "function") {
				return new PropTypeError(
					"Property `" +
						propFullName +
						"` of component `" +
						componentName +
						"` has invalid PropType notation inside objectOf."
				);
			}

			var propValue = props[propName];
			var propType = getPropType(propValue);

			if (propType !== "object") {
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type " +
						("`" +
							propType +
							"` supplied to `" +
							componentName +
							"`, expected an object.")
				);
			}

			for (var key in propValue) {
				if (propValue.hasOwnProperty(key)) {
					var error = typeChecker(
						propValue,
						key,
						componentName,
						location,
						propFullName + "." + key,
						ReactPropTypesSecret_1
					);

					if (error instanceof Error) {
						return error;
					}
				}
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
		if (!Array.isArray(arrayOfTypeCheckers)) {
			process.env.NODE_ENV !== "production"
				? printWarning$1(
						"Invalid argument supplied to oneOfType, expected an instance of array."
				  )
				: void 0;
			return emptyFunctionThatReturnsNull;
		}

		for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
			var checker = arrayOfTypeCheckers[i];

			if (typeof checker !== "function") {
				printWarning$1(
					"Invalid argument supplied to oneOfType. Expected an array of check functions, but " +
						"received " +
						getPostfixForTypeWarning(checker) +
						" at index " +
						i +
						"."
				);
				return emptyFunctionThatReturnsNull;
			}
		}

		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
				var checker = arrayOfTypeCheckers[i];

				if (
					checker(
						props,
						propName,
						componentName,
						location,
						propFullName,
						ReactPropTypesSecret_1
					) == null
				) {
					return null;
				}
			}

			return new PropTypeError(
				"Invalid " +
					location +
					" `" +
					propFullName +
					"` supplied to " +
					("`" + componentName + "`.")
			);
		}

		return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			if (!isNode(props[propName])) {
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` supplied to " +
						("`" + componentName + "`, expected a ReactNode.")
				);
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			var propValue = props[propName];
			var propType = getPropType(propValue);

			if (propType !== "object") {
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type `" +
						propType +
						"` " +
						("supplied to `" +
							componentName +
							"`, expected `object`.")
				);
			}

			for (var key in shapeTypes) {
				var checker = shapeTypes[key];

				if (!checker) {
					continue;
				}

				var error = checker(
					propValue,
					key,
					componentName,
					location,
					propFullName + "." + key,
					ReactPropTypesSecret_1
				);

				if (error) {
					return error;
				}
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createStrictShapeTypeChecker(shapeTypes) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			var propValue = props[propName];
			var propType = getPropType(propValue);

			if (propType !== "object") {
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type `" +
						propType +
						"` " +
						("supplied to `" +
							componentName +
							"`, expected `object`.")
				);
			} // We need to check all keys in case some are required but missing from
			// props.

			var allKeys = objectAssign({}, props[propName], shapeTypes);

			for (var key in allKeys) {
				var checker = shapeTypes[key];

				if (!checker) {
					return new PropTypeError(
						"Invalid " +
							location +
							" `" +
							propFullName +
							"` key `" +
							key +
							"` supplied to `" +
							componentName +
							"`." +
							"\nBad object: " +
							JSON.stringify(props[propName], null, "  ") +
							"\nValid keys: " +
							JSON.stringify(Object.keys(shapeTypes), null, "  ")
					);
				}

				var error = checker(
					propValue,
					key,
					componentName,
					location,
					propFullName + "." + key,
					ReactPropTypesSecret_1
				);

				if (error) {
					return error;
				}
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
		switch (typeof propValue) {
			case "number":
			case "string":
			case "undefined":
				return true;

			case "boolean":
				return !propValue;

			case "object":
				if (Array.isArray(propValue)) {
					return propValue.every(isNode);
				}

				if (propValue === null || isValidElement(propValue)) {
					return true;
				}

				var iteratorFn = getIteratorFn(propValue);

				if (iteratorFn) {
					var iterator = iteratorFn.call(propValue);
					var step;

					if (iteratorFn !== propValue.entries) {
						while (!(step = iterator.next()).done) {
							if (!isNode(step.value)) {
								return false;
							}
						}
					} else {
						// Iterator will provide entry [k,v] tuples rather than values.
						while (!(step = iterator.next()).done) {
							var entry = step.value;

							if (entry) {
								if (!isNode(entry[1])) {
									return false;
								}
							}
						}
					}
				} else {
					return false;
				}

				return true;

			default:
				return false;
		}
	}

	function isSymbol(propType, propValue) {
		// Native Symbol.
		if (propType === "symbol") {
			return true;
		} // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'

		if (propValue["@@toStringTag"] === "Symbol") {
			return true;
		} // Fallback for non-spec compliant Symbols which are polyfilled.

		if (typeof Symbol === "function" && propValue instanceof Symbol) {
			return true;
		}

		return false;
	} // Equivalent of `typeof` but with special handling for array and regexp.

	function getPropType(propValue) {
		var propType = typeof propValue;

		if (Array.isArray(propValue)) {
			return "array";
		}

		if (propValue instanceof RegExp) {
			// Old webkits (at least until Android 4.0) return 'function' rather than
			// 'object' for typeof a RegExp. We'll normalize this here so that /bla/
			// passes PropTypes.object.
			return "object";
		}

		if (isSymbol(propType, propValue)) {
			return "symbol";
		}

		return propType;
	} // This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.

	function getPreciseType(propValue) {
		if (typeof propValue === "undefined" || propValue === null) {
			return "" + propValue;
		}

		var propType = getPropType(propValue);

		if (propType === "object") {
			if (propValue instanceof Date) {
				return "date";
			} else if (propValue instanceof RegExp) {
				return "regexp";
			}
		}

		return propType;
	} // Returns a string that is postfixed to a warning about an invalid type.
	// For example, "undefined" or "of type array"

	function getPostfixForTypeWarning(value) {
		var type = getPreciseType(value);

		switch (type) {
			case "array":
			case "object":
				return "an " + type;

			case "boolean":
			case "date":
			case "regexp":
				return "a " + type;

			default:
				return type;
		}
	} // Returns class name of the object, if any.

	function getClassName(propValue) {
		if (!propValue.constructor || !propValue.constructor.name) {
			return ANONYMOUS;
		}

		return propValue.constructor.name;
	}

	ReactPropTypes.checkPropTypes = checkPropTypes_1;
	ReactPropTypes.PropTypes = ReactPropTypes;
	return ReactPropTypes;
};

function emptyFunction() {}

var factoryWithThrowingShims = function() {
	function shim(
		props,
		propName,
		componentName,
		location,
		propFullName,
		secret
	) {
		if (secret === ReactPropTypesSecret_1) {
			// It is still safe when called from React.
			return;
		}

		var err = new Error(
			"Calling PropTypes validators directly is not supported by the `prop-types` package. " +
				"Use PropTypes.checkPropTypes() to call them. " +
				"Read more at http://fb.me/use-check-prop-types"
		);
		err.name = "Invariant Violation";
		throw err;
	}
	shim.isRequired = shim;

	function getShim() {
		return shim;
	}
	// Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

	var ReactPropTypes = {
		array: shim,
		bool: shim,
		func: shim,
		number: shim,
		object: shim,
		string: shim,
		symbol: shim,
		any: shim,
		arrayOf: getShim,
		element: shim,
		instanceOf: getShim,
		node: shim,
		objectOf: getShim,
		oneOf: getShim,
		oneOfType: getShim,
		shape: getShim,
		exact: getShim
	};
	ReactPropTypes.checkPropTypes = emptyFunction;
	ReactPropTypes.PropTypes = ReactPropTypes;
	return ReactPropTypes;
};

var propTypes = createCommonjsModule(function(module) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	if (process.env.NODE_ENV !== "production") {
		var REACT_ELEMENT_TYPE =
			(typeof Symbol === "function" &&
				Symbol.for &&
				Symbol.for("react.element")) ||
			0xeac7;

		var isValidElement = function isValidElement(object) {
			return (
				typeof object === "object" &&
				object !== null &&
				object.$$typeof === REACT_ELEMENT_TYPE
			);
		}; // By explicitly using `prop-types` you are opting into new development behavior.
		// http://fb.me/prop-types-in-prod

		var throwOnDirectAccess = true;
		module.exports = factoryWithTypeCheckers(
			isValidElement,
			throwOnDirectAccess
		);
	} else {
		// By explicitly using `prop-types` you are opting into new production behavior.
		// http://fb.me/prop-types-in-prod
		module.exports = factoryWithThrowingShims();
	}
});

var subscriptionShape = propTypes.shape({
	trySubscribe: propTypes.func.isRequired,
	tryUnsubscribe: propTypes.func.isRequired,
	notifyNestedSubs: propTypes.func.isRequired,
	isSubscribed: propTypes.func.isRequired
});
var storeShape = propTypes.shape({
	subscribe: propTypes.func.isRequired,
	dispatch: propTypes.func.isRequired,
	getState: propTypes.func.isRequired
});

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
	/* eslint-disable no-console */
	if (typeof console !== "undefined" && typeof console.error === "function") {
		console.error(message);
	}
	/* eslint-enable no-console */

	try {
		// This error was thrown as a convenience so that if you enable
		// "break on all exceptions" in your console,
		// it would pause the execution at this line.
		throw new Error(message);
		/* eslint-disable no-empty */
	} catch (e) {}
	/* eslint-enable no-empty */
}

var didWarnAboutReceivingStore = false;

function warnAboutReceivingStore() {
	if (didWarnAboutReceivingStore) {
		return;
	}

	didWarnAboutReceivingStore = true;
	warning(
		"<Provider> does not support changing `store` on the fly. " +
			"It is most likely that you see this error because you updated to " +
			"Redux 2.x and React Redux 2.x which no longer hot reload reducers " +
			"automatically. See https://github.com/reduxjs/react-redux/releases/" +
			"tag/v2.0.0 for the migration instructions."
	);
}

function createProvider(storeKey) {
	var _Provider$childContex;

	if (storeKey === void 0) {
		storeKey = "store";
	}

	var subscriptionKey = storeKey + "Subscription";

	var Provider =
		/*#__PURE__*/
		(function(_Component) {
			_inheritsLoose(Provider, _Component);

			var _proto = Provider.prototype;

			_proto.getChildContext = function getChildContext() {
				var _ref;

				return (
					(_ref = {}),
					(_ref[storeKey] = this[storeKey]),
					(_ref[subscriptionKey] = null),
					_ref
				);
			};

			function Provider(props, context) {
				var _this;

				_this = _Component.call(this, props, context) || this;
				_this[storeKey] = props.store;
				return _this;
			}

			_proto.render = function render() {
				return React.Children.only(this.props.children);
			};

			return Provider;
		})(React.Component);

	if (process.env.NODE_ENV !== "production") {
		Provider.prototype.componentWillReceiveProps = function(nextProps) {
			if (this[storeKey] !== nextProps.store) {
				warnAboutReceivingStore();
			}
		};
	}

	Provider.propTypes = {
		store: storeShape.isRequired,
		children: propTypes.element.isRequired
	};
	Provider.childContextTypes = ((_Provider$childContex = {}),
	(_Provider$childContex[storeKey] = storeShape.isRequired),
	(_Provider$childContex[subscriptionKey] = subscriptionShape),
	_Provider$childContex);
	return Provider;
}
var ReduxProvider = createProvider();

function _assertThisInitialized(self) {
	if (self === void 0) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}

	return self;
}

var reactIs_production_min = createCommonjsModule(function(module, exports) {
	Object.defineProperty(exports, "__esModule", {
		value: !0
	});
	var b = "function" === typeof Symbol && Symbol.for,
		c = b ? Symbol.for("react.element") : 60103,
		d = b ? Symbol.for("react.portal") : 60106,
		e = b ? Symbol.for("react.fragment") : 60107,
		f = b ? Symbol.for("react.strict_mode") : 60108,
		g = b ? Symbol.for("react.profiler") : 60114,
		h = b ? Symbol.for("react.provider") : 60109,
		k = b ? Symbol.for("react.context") : 60110,
		l = b ? Symbol.for("react.concurrent_mode") : 60111,
		m = b ? Symbol.for("react.forward_ref") : 60112,
		n = b ? Symbol.for("react.suspense") : 60113,
		q = b ? Symbol.for("react.memo") : 60115,
		r = b ? Symbol.for("react.lazy") : 60116;

	function t(a) {
		if ("object" === typeof a && null !== a) {
			var p = a.$$typeof;

			switch (p) {
				case c:
					switch (((a = a.type), a)) {
						case l:
						case e:
						case g:
						case f:
							return a;

						default:
							switch (((a = a && a.$$typeof), a)) {
								case k:
								case m:
								case h:
									return a;

								default:
									return p;
							}
					}

				case d:
					return p;
			}
		}
	}

	function u(a) {
		return t(a) === l;
	}

	exports.typeOf = t;
	exports.AsyncMode = l;
	exports.ConcurrentMode = l;
	exports.ContextConsumer = k;
	exports.ContextProvider = h;
	exports.Element = c;
	exports.ForwardRef = m;
	exports.Fragment = e;
	exports.Profiler = g;
	exports.Portal = d;
	exports.StrictMode = f;

	exports.isValidElementType = function(a) {
		return (
			"string" === typeof a ||
			"function" === typeof a ||
			a === e ||
			a === l ||
			a === g ||
			a === f ||
			a === n ||
			("object" === typeof a &&
				null !== a &&
				(a.$$typeof === r ||
					a.$$typeof === q ||
					a.$$typeof === h ||
					a.$$typeof === k ||
					a.$$typeof === m))
		);
	};

	exports.isAsyncMode = function(a) {
		return u(a);
	};

	exports.isConcurrentMode = u;

	exports.isContextConsumer = function(a) {
		return t(a) === k;
	};

	exports.isContextProvider = function(a) {
		return t(a) === h;
	};

	exports.isElement = function(a) {
		return "object" === typeof a && null !== a && a.$$typeof === c;
	};

	exports.isForwardRef = function(a) {
		return t(a) === m;
	};

	exports.isFragment = function(a) {
		return t(a) === e;
	};

	exports.isProfiler = function(a) {
		return t(a) === g;
	};

	exports.isPortal = function(a) {
		return t(a) === d;
	};

	exports.isStrictMode = function(a) {
		return t(a) === f;
	};
});

unwrapExports(reactIs_production_min);
var reactIs_production_min_1 = reactIs_production_min.typeOf;
var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
var reactIs_production_min_3 = reactIs_production_min.ConcurrentMode;
var reactIs_production_min_4 = reactIs_production_min.ContextConsumer;
var reactIs_production_min_5 = reactIs_production_min.ContextProvider;
var reactIs_production_min_6 = reactIs_production_min.Element;
var reactIs_production_min_7 = reactIs_production_min.ForwardRef;
var reactIs_production_min_8 = reactIs_production_min.Fragment;
var reactIs_production_min_9 = reactIs_production_min.Profiler;
var reactIs_production_min_10 = reactIs_production_min.Portal;
var reactIs_production_min_11 = reactIs_production_min.StrictMode;
var reactIs_production_min_12 = reactIs_production_min.isValidElementType;
var reactIs_production_min_13 = reactIs_production_min.isAsyncMode;
var reactIs_production_min_14 = reactIs_production_min.isConcurrentMode;
var reactIs_production_min_15 = reactIs_production_min.isContextConsumer;
var reactIs_production_min_16 = reactIs_production_min.isContextProvider;
var reactIs_production_min_17 = reactIs_production_min.isElement;
var reactIs_production_min_18 = reactIs_production_min.isForwardRef;
var reactIs_production_min_19 = reactIs_production_min.isFragment;
var reactIs_production_min_20 = reactIs_production_min.isProfiler;
var reactIs_production_min_21 = reactIs_production_min.isPortal;
var reactIs_production_min_22 = reactIs_production_min.isStrictMode;

var reactIs_development = createCommonjsModule(function(module, exports) {
	if (process.env.NODE_ENV !== "production") {
		(function() {
			Object.defineProperty(exports, "__esModule", {
				value: true
			}); // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
			// nor polyfill, then a plain number is used for performance.

			var hasSymbol = typeof Symbol === "function" && Symbol.for;
			var REACT_ELEMENT_TYPE = hasSymbol
				? Symbol.for("react.element")
				: 0xeac7;
			var REACT_PORTAL_TYPE = hasSymbol
				? Symbol.for("react.portal")
				: 0xeaca;
			var REACT_FRAGMENT_TYPE = hasSymbol
				? Symbol.for("react.fragment")
				: 0xeacb;
			var REACT_STRICT_MODE_TYPE = hasSymbol
				? Symbol.for("react.strict_mode")
				: 0xeacc;
			var REACT_PROFILER_TYPE = hasSymbol
				? Symbol.for("react.profiler")
				: 0xead2;
			var REACT_PROVIDER_TYPE = hasSymbol
				? Symbol.for("react.provider")
				: 0xeacd;
			var REACT_CONTEXT_TYPE = hasSymbol
				? Symbol.for("react.context")
				: 0xeace;
			var REACT_CONCURRENT_MODE_TYPE = hasSymbol
				? Symbol.for("react.concurrent_mode")
				: 0xeacf;
			var REACT_FORWARD_REF_TYPE = hasSymbol
				? Symbol.for("react.forward_ref")
				: 0xead0;
			var REACT_SUSPENSE_TYPE = hasSymbol
				? Symbol.for("react.suspense")
				: 0xead1;
			var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 0xead3;
			var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 0xead4;

			function isValidElementType(type) {
				return (
					typeof type === "string" ||
					typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
					type === REACT_FRAGMENT_TYPE ||
					type === REACT_CONCURRENT_MODE_TYPE ||
					type === REACT_PROFILER_TYPE ||
					type === REACT_STRICT_MODE_TYPE ||
					type === REACT_SUSPENSE_TYPE ||
					(typeof type === "object" &&
						type !== null &&
						(type.$$typeof === REACT_LAZY_TYPE ||
							type.$$typeof === REACT_MEMO_TYPE ||
							type.$$typeof === REACT_PROVIDER_TYPE ||
							type.$$typeof === REACT_CONTEXT_TYPE ||
							type.$$typeof === REACT_FORWARD_REF_TYPE))
				);
			}
			/**
			 * Forked from fbjs/warning:
			 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
			 *
			 * Only change is we use console.warn instead of console.error,
			 * and do nothing when 'console' is not supported.
			 * This really simplifies the code.
			 * ---
			 * Similar to invariant but only logs a warning if the condition is not met.
			 * This can be used to log issues in development environments in critical
			 * paths. Removing the logging code for production environments will keep the
			 * same logic and follow the same code paths.
			 */

			var lowPriorityWarning = function lowPriorityWarning() {};

			{
				var printWarning = function printWarning(format) {
					for (
						var _len = arguments.length,
							args = Array(_len > 1 ? _len - 1 : 0),
							_key = 1;
						_key < _len;
						_key++
					) {
						args[_key - 1] = arguments[_key];
					}

					var argIndex = 0;
					var message =
						"Warning: " +
						format.replace(/%s/g, function() {
							return args[argIndex++];
						});

					if (typeof console !== "undefined") {
						console.warn(message);
					}

					try {
						// --- Welcome to debugging React ---
						// This error was thrown as a convenience so that you can use this stack
						// to find the callsite that caused this warning to fire.
						throw new Error(message);
					} catch (x) {}
				};

				lowPriorityWarning = function lowPriorityWarning(
					condition,
					format
				) {
					if (format === undefined) {
						throw new Error(
							"`lowPriorityWarning(condition, format, ...args)` requires a warning " +
								"message argument"
						);
					}

					if (!condition) {
						for (
							var _len2 = arguments.length,
								args = Array(_len2 > 2 ? _len2 - 2 : 0),
								_key2 = 2;
							_key2 < _len2;
							_key2++
						) {
							args[_key2 - 2] = arguments[_key2];
						}

						printWarning.apply(undefined, [format].concat(args));
					}
				};
			}
			var lowPriorityWarning$1 = lowPriorityWarning;

			function typeOf(object) {
				if (typeof object === "object" && object !== null) {
					var $$typeof = object.$$typeof;

					switch ($$typeof) {
						case REACT_ELEMENT_TYPE:
							var type = object.type;

							switch (type) {
								case REACT_CONCURRENT_MODE_TYPE:
								case REACT_FRAGMENT_TYPE:
								case REACT_PROFILER_TYPE:
								case REACT_STRICT_MODE_TYPE:
									return type;

								default:
									var $$typeofType = type && type.$$typeof;

									switch ($$typeofType) {
										case REACT_CONTEXT_TYPE:
										case REACT_FORWARD_REF_TYPE:
										case REACT_PROVIDER_TYPE:
											return $$typeofType;

										default:
											return $$typeof;
									}
							}

						case REACT_PORTAL_TYPE:
							return $$typeof;
					}
				}

				return undefined;
			} // AsyncMode alias is deprecated along with isAsyncMode

			var AsyncMode = REACT_CONCURRENT_MODE_TYPE;
			var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
			var ContextConsumer = REACT_CONTEXT_TYPE;
			var ContextProvider = REACT_PROVIDER_TYPE;
			var Element = REACT_ELEMENT_TYPE;
			var ForwardRef = REACT_FORWARD_REF_TYPE;
			var Fragment = REACT_FRAGMENT_TYPE;
			var Profiler = REACT_PROFILER_TYPE;
			var Portal = REACT_PORTAL_TYPE;
			var StrictMode = REACT_STRICT_MODE_TYPE;
			var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

			function isAsyncMode(object) {
				{
					if (!hasWarnedAboutDeprecatedIsAsyncMode) {
						hasWarnedAboutDeprecatedIsAsyncMode = true;
						lowPriorityWarning$1(
							false,
							"The ReactIs.isAsyncMode() alias has been deprecated, " +
								"and will be removed in React 17+. Update your code to use " +
								"ReactIs.isConcurrentMode() instead. It has the exact same API."
						);
					}
				}
				return isConcurrentMode(object);
			}

			function isConcurrentMode(object) {
				return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
			}

			function isContextConsumer(object) {
				return typeOf(object) === REACT_CONTEXT_TYPE;
			}

			function isContextProvider(object) {
				return typeOf(object) === REACT_PROVIDER_TYPE;
			}

			function isElement(object) {
				return (
					typeof object === "object" &&
					object !== null &&
					object.$$typeof === REACT_ELEMENT_TYPE
				);
			}

			function isForwardRef(object) {
				return typeOf(object) === REACT_FORWARD_REF_TYPE;
			}

			function isFragment(object) {
				return typeOf(object) === REACT_FRAGMENT_TYPE;
			}

			function isProfiler(object) {
				return typeOf(object) === REACT_PROFILER_TYPE;
			}

			function isPortal(object) {
				return typeOf(object) === REACT_PORTAL_TYPE;
			}

			function isStrictMode(object) {
				return typeOf(object) === REACT_STRICT_MODE_TYPE;
			}

			exports.typeOf = typeOf;
			exports.AsyncMode = AsyncMode;
			exports.ConcurrentMode = ConcurrentMode;
			exports.ContextConsumer = ContextConsumer;
			exports.ContextProvider = ContextProvider;
			exports.Element = Element;
			exports.ForwardRef = ForwardRef;
			exports.Fragment = Fragment;
			exports.Profiler = Profiler;
			exports.Portal = Portal;
			exports.StrictMode = StrictMode;
			exports.isValidElementType = isValidElementType;
			exports.isAsyncMode = isAsyncMode;
			exports.isConcurrentMode = isConcurrentMode;
			exports.isContextConsumer = isContextConsumer;
			exports.isContextProvider = isContextProvider;
			exports.isElement = isElement;
			exports.isForwardRef = isForwardRef;
			exports.isFragment = isFragment;
			exports.isProfiler = isProfiler;
			exports.isPortal = isPortal;
			exports.isStrictMode = isStrictMode;
		})();
	}
});

unwrapExports(reactIs_development);
var reactIs_development_1 = reactIs_development.typeOf;
var reactIs_development_2 = reactIs_development.AsyncMode;
var reactIs_development_3 = reactIs_development.ConcurrentMode;
var reactIs_development_4 = reactIs_development.ContextConsumer;
var reactIs_development_5 = reactIs_development.ContextProvider;
var reactIs_development_6 = reactIs_development.Element;
var reactIs_development_7 = reactIs_development.ForwardRef;
var reactIs_development_8 = reactIs_development.Fragment;
var reactIs_development_9 = reactIs_development.Profiler;
var reactIs_development_10 = reactIs_development.Portal;
var reactIs_development_11 = reactIs_development.StrictMode;
var reactIs_development_12 = reactIs_development.isValidElementType;
var reactIs_development_13 = reactIs_development.isAsyncMode;
var reactIs_development_14 = reactIs_development.isConcurrentMode;
var reactIs_development_15 = reactIs_development.isContextConsumer;
var reactIs_development_16 = reactIs_development.isContextProvider;
var reactIs_development_17 = reactIs_development.isElement;
var reactIs_development_18 = reactIs_development.isForwardRef;
var reactIs_development_19 = reactIs_development.isFragment;
var reactIs_development_20 = reactIs_development.isProfiler;
var reactIs_development_21 = reactIs_development.isPortal;
var reactIs_development_22 = reactIs_development.isStrictMode;

var reactIs = createCommonjsModule(function(module) {
	if (process.env.NODE_ENV === "production") {
		module.exports = reactIs_production_min;
	} else {
		module.exports = reactIs_development;
	}
});
var reactIs_1 = reactIs.isValidElementType;

var _ReactIs$ForwardRef;

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		});
	} else {
		obj[key] = value;
	}

	return obj;
}
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var REACT_STATICS = {
	childContextTypes: true,
	contextTypes: true,
	defaultProps: true,
	displayName: true,
	getDefaultProps: true,
	getDerivedStateFromProps: true,
	mixins: true,
	propTypes: true,
	type: true
};
var KNOWN_STATICS = {
	name: true,
	length: true,
	prototype: true,
	caller: true,
	callee: true,
	arguments: true,
	arity: true
};

var TYPE_STATICS = _defineProperty(
	{},
	reactIs.ForwardRef,
	((_ReactIs$ForwardRef = {}),
	_defineProperty(_ReactIs$ForwardRef, "$$typeof", true),
	_defineProperty(_ReactIs$ForwardRef, "render", true),
	_ReactIs$ForwardRef)
);

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
	if (typeof sourceComponent !== "string") {
		// don't hoist over string (html) components
		if (objectPrototype) {
			var inheritedComponent = getPrototypeOf(sourceComponent);

			if (inheritedComponent && inheritedComponent !== objectPrototype) {
				hoistNonReactStatics(
					targetComponent,
					inheritedComponent,
					blacklist
				);
			}
		}

		var keys = getOwnPropertyNames(sourceComponent);

		if (getOwnPropertySymbols$1) {
			keys = keys.concat(getOwnPropertySymbols$1(sourceComponent));
		}

		var targetStatics =
			TYPE_STATICS[targetComponent["$$typeof"]] || REACT_STATICS;
		var sourceStatics =
			TYPE_STATICS[sourceComponent["$$typeof"]] || REACT_STATICS;

		for (var i = 0; i < keys.length; ++i) {
			var key = keys[i];

			if (
				!KNOWN_STATICS[key] &&
				!(blacklist && blacklist[key]) &&
				!(sourceStatics && sourceStatics[key]) &&
				!(targetStatics && targetStatics[key])
			) {
				var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

				try {
					// Avoid failures from read-only properties
					defineProperty(targetComponent, key, descriptor);
				} catch (e) {}
			}
		}

		return targetComponent;
	}

	return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = process.env.NODE_ENV;

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	if (NODE_ENV !== "production") {
		if (format === undefined) {
			throw new Error("invariant requires an error message argument");
		}
	}

	if (!condition) {
		var error;

		if (format === undefined) {
			error = new Error(
				"Minified exception occurred; use the non-minified dev environment " +
					"for the full error message and additional helpful warnings."
			);
		} else {
			var args = [a, b, c, d, e, f];
			var argIndex = 0;
			error = new Error(
				format.replace(/%s/g, function() {
					return args[argIndex++];
				})
			);
			error.name = "Invariant Violation";
		}

		error.framesToPop = 1; // we don't care about invariant's own frame

		throw error;
	}
};

var invariant_1 = invariant;

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants
var CLEARED = null;
var nullListeners = {
	notify: function notify() {}
};

function createListenerCollection() {
	// the current/next pattern is copied from redux's createStore code.
	// TODO: refactor+expose that code to be reusable here?
	var current = [];
	var next = [];
	return {
		clear: function clear() {
			next = CLEARED;
			current = CLEARED;
		},
		notify: function notify() {
			var listeners = (current = next);

			for (var i = 0; i < listeners.length; i++) {
				listeners[i]();
			}
		},
		get: function get() {
			return next;
		},
		subscribe: function subscribe(listener) {
			var isSubscribed = true;
			if (next === current) next = current.slice();
			next.push(listener);
			return function unsubscribe() {
				if (!isSubscribed || current === CLEARED) return;
				isSubscribed = false;
				if (next === current) next = current.slice();
				next.splice(next.indexOf(listener), 1);
			};
		}
	};
}

var Subscription =
	/*#__PURE__*/
	(function() {
		function Subscription(store, parentSub, onStateChange) {
			this.store = store;
			this.parentSub = parentSub;
			this.onStateChange = onStateChange;
			this.unsubscribe = null;
			this.listeners = nullListeners;
		}

		var _proto = Subscription.prototype;

		_proto.addNestedSub = function addNestedSub(listener) {
			this.trySubscribe();
			return this.listeners.subscribe(listener);
		};

		_proto.notifyNestedSubs = function notifyNestedSubs() {
			this.listeners.notify();
		};

		_proto.isSubscribed = function isSubscribed() {
			return Boolean(this.unsubscribe);
		};

		_proto.trySubscribe = function trySubscribe() {
			if (!this.unsubscribe) {
				this.unsubscribe = this.parentSub
					? this.parentSub.addNestedSub(this.onStateChange)
					: this.store.subscribe(this.onStateChange);
				this.listeners = createListenerCollection();
			}
		};

		_proto.tryUnsubscribe = function tryUnsubscribe() {
			if (this.unsubscribe) {
				this.unsubscribe();
				this.unsubscribe = null;
				this.listeners.clear();
				this.listeners = nullListeners;
			}
		};

		return Subscription;
	})();

var hotReloadingVersion = 0;
var dummyState = {};

function noop() {}

function makeSelectorStateful(sourceSelector, store) {
	// wrap the selector in an object that tracks its results between runs.
	var selector = {
		run: function runComponentSelector(props) {
			try {
				var nextProps = sourceSelector(store.getState(), props);

				if (nextProps !== selector.props || selector.error) {
					selector.shouldComponentUpdate = true;
					selector.props = nextProps;
					selector.error = null;
				}
			} catch (error) {
				selector.shouldComponentUpdate = true;
				selector.error = error;
			}
		}
	};
	return selector;
}

function connectAdvanced(
	/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
	selectorFactory, // options object:
	_ref
) {
	var _contextTypes, _childContextTypes;

	if (_ref === void 0) {
		_ref = {};
	}

	var _ref2 = _ref,
		_ref2$getDisplayName = _ref2.getDisplayName,
		getDisplayName =
			_ref2$getDisplayName === void 0
				? function(name) {
						return "ConnectAdvanced(" + name + ")";
				  }
				: _ref2$getDisplayName,
		_ref2$methodName = _ref2.methodName,
		methodName =
			_ref2$methodName === void 0 ? "connectAdvanced" : _ref2$methodName,
		_ref2$renderCountProp = _ref2.renderCountProp,
		renderCountProp =
			_ref2$renderCountProp === void 0
				? undefined
				: _ref2$renderCountProp,
		_ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
		shouldHandleStateChanges =
			_ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
		_ref2$storeKey = _ref2.storeKey,
		storeKey = _ref2$storeKey === void 0 ? "store" : _ref2$storeKey,
		_ref2$withRef = _ref2.withRef,
		withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
		connectOptions = _objectWithoutPropertiesLoose(_ref2, [
			"getDisplayName",
			"methodName",
			"renderCountProp",
			"shouldHandleStateChanges",
			"storeKey",
			"withRef"
		]);

	var subscriptionKey = storeKey + "Subscription";
	var version = hotReloadingVersion++;
	var contextTypes = ((_contextTypes = {}),
	(_contextTypes[storeKey] = storeShape),
	(_contextTypes[subscriptionKey] = subscriptionShape),
	_contextTypes);
	var childContextTypes = ((_childContextTypes = {}),
	(_childContextTypes[subscriptionKey] = subscriptionShape),
	_childContextTypes);
	return function wrapWithConnect(WrappedComponent) {
		invariant_1(
			reactIs_1(WrappedComponent),
			"You must pass a component to the function returned by " +
				(methodName +
					". Instead received " +
					JSON.stringify(WrappedComponent))
		);
		var wrappedComponentName =
			WrappedComponent.displayName ||
			WrappedComponent.name ||
			"Component";
		var displayName = getDisplayName(wrappedComponentName);

		var selectorFactoryOptions = _extends({}, connectOptions, {
			getDisplayName: getDisplayName,
			methodName: methodName,
			renderCountProp: renderCountProp,
			shouldHandleStateChanges: shouldHandleStateChanges,
			storeKey: storeKey,
			withRef: withRef,
			displayName: displayName,
			wrappedComponentName: wrappedComponentName,
			WrappedComponent: WrappedComponent // TODO Actually fix our use of componentWillReceiveProps

			/* eslint-disable react/no-deprecated */
		});

		var Connect =
			/*#__PURE__*/
			(function(_Component) {
				_inheritsLoose(Connect, _Component);

				function Connect(props, context) {
					var _this;

					_this = _Component.call(this, props, context) || this;
					_this.version = version;
					_this.state = {};
					_this.renderCount = 0;
					_this.store = props[storeKey] || context[storeKey];
					_this.propsMode = Boolean(props[storeKey]);
					_this.setWrappedInstance = _this.setWrappedInstance.bind(
						_assertThisInitialized(_assertThisInitialized(_this))
					);
					invariant_1(
						_this.store,
						'Could not find "' +
							storeKey +
							'" in either the context or props of ' +
							('"' +
								displayName +
								'". Either wrap the root component in a <Provider>, ') +
							('or explicitly pass "' +
								storeKey +
								'" as a prop to "' +
								displayName +
								'".')
					);

					_this.initSelector();

					_this.initSubscription();

					return _this;
				}

				var _proto = Connect.prototype;

				_proto.getChildContext = function getChildContext() {
					var _ref3; // If this component received store from props, its subscription should be transparent
					// to any descendants receiving store+subscription from context; it passes along
					// subscription passed to it. Otherwise, it shadows the parent subscription, which allows
					// Connect to control ordering of notifications to flow top-down.

					var subscription = this.propsMode
						? null
						: this.subscription;
					return (
						(_ref3 = {}),
						(_ref3[subscriptionKey] =
							subscription || this.context[subscriptionKey]),
						_ref3
					);
				};

				_proto.componentDidMount = function componentDidMount() {
					if (!shouldHandleStateChanges) return; // componentWillMount fires during server side rendering, but componentDidMount and
					// componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
					// Otherwise, unsubscription would never take place during SSR, causing a memory leak.
					// To handle the case where a child component may have triggered a state change by
					// dispatching an action in its componentWillMount, we have to re-run the select and maybe
					// re-render.

					this.subscription.trySubscribe();
					this.selector.run(this.props);
					if (this.selector.shouldComponentUpdate) this.forceUpdate();
				};

				_proto.componentWillReceiveProps = function componentWillReceiveProps(
					nextProps
				) {
					this.selector.run(nextProps);
				};

				_proto.shouldComponentUpdate = function shouldComponentUpdate() {
					return this.selector.shouldComponentUpdate;
				};

				_proto.componentWillUnmount = function componentWillUnmount() {
					if (this.subscription) this.subscription.tryUnsubscribe();
					this.subscription = null;
					this.notifyNestedSubs = noop;
					this.store = null;
					this.selector.run = noop;
					this.selector.shouldComponentUpdate = false;
				};

				_proto.getWrappedInstance = function getWrappedInstance() {
					invariant_1(
						withRef,
						"To access the wrapped instance, you need to specify " +
							("{ withRef: true } in the options argument of the " +
								methodName +
								"() call.")
					);
					return this.wrappedInstance;
				};

				_proto.setWrappedInstance = function setWrappedInstance(ref) {
					this.wrappedInstance = ref;
				};

				_proto.initSelector = function initSelector() {
					var sourceSelector = selectorFactory(
						this.store.dispatch,
						selectorFactoryOptions
					);
					this.selector = makeSelectorStateful(
						sourceSelector,
						this.store
					);
					this.selector.run(this.props);
				};

				_proto.initSubscription = function initSubscription() {
					if (!shouldHandleStateChanges) return; // parentSub's source should match where store came from: props vs. context. A component
					// connected to the store via props shouldn't use subscription from context, or vice versa.

					var parentSub = (this.propsMode
						? this.props
						: this.context)[subscriptionKey];
					this.subscription = new Subscription(
						this.store,
						parentSub,
						this.onStateChange.bind(this)
					); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
					// the middle of the notification loop, where `this.subscription` will then be null. An
					// extra null check every change can be avoided by copying the method onto `this` and then
					// replacing it with a no-op on unmount. This can probably be avoided if Subscription's
					// listeners logic is changed to not call listeners that have been unsubscribed in the
					// middle of the notification loop.

					this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(
						this.subscription
					);
				};

				_proto.onStateChange = function onStateChange() {
					this.selector.run(this.props);

					if (!this.selector.shouldComponentUpdate) {
						this.notifyNestedSubs();
					} else {
						this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
						this.setState(dummyState);
					}
				};

				_proto.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
					// `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
					// needs to notify nested subs. Once called, it unimplements itself until further state
					// changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
					// a boolean check every time avoids an extra method call most of the time, resulting
					// in some perf boost.
					this.componentDidUpdate = undefined;
					this.notifyNestedSubs();
				};

				_proto.isSubscribed = function isSubscribed() {
					return (
						Boolean(this.subscription) &&
						this.subscription.isSubscribed()
					);
				};

				_proto.addExtraProps = function addExtraProps(props) {
					if (
						!withRef &&
						!renderCountProp &&
						!(this.propsMode && this.subscription)
					)
						return props; // make a shallow copy so that fields added don't leak to the original selector.
					// this is especially important for 'ref' since that's a reference back to the component
					// instance. a singleton memoized selector would then be holding a reference to the
					// instance, preventing the instance from being garbage collected, and that would be bad

					var withExtras = _extends({}, props);

					if (withRef) withExtras.ref = this.setWrappedInstance;
					if (renderCountProp)
						withExtras[renderCountProp] = this.renderCount++;
					if (this.propsMode && this.subscription)
						withExtras[subscriptionKey] = this.subscription;
					return withExtras;
				};

				_proto.render = function render() {
					var selector = this.selector;
					selector.shouldComponentUpdate = false;

					if (selector.error) {
						throw selector.error;
					} else {
						return React.createElement(
							WrappedComponent,
							this.addExtraProps(selector.props)
						);
					}
				};

				return Connect;
			})(React.Component);
		/* eslint-enable react/no-deprecated */

		Connect.WrappedComponent = WrappedComponent;
		Connect.displayName = displayName;
		Connect.childContextTypes = childContextTypes;
		Connect.contextTypes = contextTypes;
		Connect.propTypes = contextTypes;

		if (process.env.NODE_ENV !== "production") {
			Connect.prototype.componentWillUpdate = function componentWillUpdate() {
				var _this2 = this; // We are hot reloading!

				if (this.version !== version) {
					this.version = version;
					this.initSelector(); // If any connected descendants don't hot reload (and resubscribe in the process), their
					// listeners will be lost when we unsubscribe. Unfortunately, by copying over all
					// listeners, this does mean that the old versions of connected descendants will still be
					// notified of state changes; however, their onStateChange function is a no-op so this
					// isn't a huge deal.

					var oldListeners = [];

					if (this.subscription) {
						oldListeners = this.subscription.listeners.get();
						this.subscription.tryUnsubscribe();
					}

					this.initSubscription();

					if (shouldHandleStateChanges) {
						this.subscription.trySubscribe();
						oldListeners.forEach(function(listener) {
							return _this2.subscription.listeners.subscribe(
								listener
							);
						});
					}
				}
			};
		}

		return hoistNonReactStatics_cjs(Connect, WrappedComponent);
	};
}

var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
	if (x === y) {
		return x !== 0 || y !== 0 || 1 / x === 1 / y;
	} else {
		return x !== x && y !== y;
	}
}

function shallowEqual(objA, objB) {
	if (is(objA, objB)) return true;

	if (
		typeof objA !== "object" ||
		objA === null ||
		typeof objB !== "object" ||
		objB === null
	) {
		return false;
	}

	var keysA = Object.keys(objA);
	var keysB = Object.keys(objB);
	if (keysA.length !== keysB.length) return false;

	for (var i = 0; i < keysA.length; i++) {
		if (
			!hasOwn.call(objB, keysA[i]) ||
			!is(objA[keysA[i]], objB[keysA[i]])
		) {
			return false;
		}
	}

	return true;
}

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === "function") {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol("observable");
			Symbol.observable = result;
		}
	} else {
		result = "@@observable";
	}

	return result;
}

/* global window */
var root;

if (typeof self !== "undefined") {
	root = self;
} else if (typeof window !== "undefined") {
	root = window;
} else if (typeof global !== "undefined") {
	root = global;
} else if (typeof module !== "undefined") {
	root = module;
} else {
	root = Function("return this")();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */

var randomString = function randomString() {
	return Math.random()
		.toString(36)
		.substring(7)
		.split("")
		.join(".");
};

var ActionTypes = {
	INIT: "@@redux/INIT" + randomString(),
	REPLACE: "@@redux/REPLACE" + randomString(),
	PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
		return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
	}
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

function isPlainObject(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	var proto = obj;

	while (Object.getPrototypeOf(proto) !== null) {
		proto = Object.getPrototypeOf(proto);
	}

	return Object.getPrototypeOf(obj) === proto;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */

function warning$1(message) {
	/* eslint-disable no-console */
	if (typeof console !== "undefined" && typeof console.error === "function") {
		console.error(message);
	}
	/* eslint-enable no-console */

	try {
		// This error was thrown as a convenience so that if you enable
		// "break on all exceptions" in your console,
		// it would pause the execution at this line.
		throw new Error(message);
	} catch (e) {} // eslint-disable-line no-empty
}

function getUndefinedStateErrorMessage(key, action) {
	var actionType = action && action.type;
	var actionDescription =
		(actionType && 'action "' + String(actionType) + '"') || "an action";
	return (
		"Given " +
		actionDescription +
		', reducer "' +
		key +
		'" returned undefined. ' +
		"To ignore an action, you must explicitly return the previous state. " +
		"If you want this reducer to hold no value, you can return null instead of undefined."
	);
}

function getUnexpectedStateShapeWarningMessage(
	inputState,
	reducers,
	action,
	unexpectedKeyCache
) {
	var reducerKeys = Object.keys(reducers);
	var argumentName =
		action && action.type === ActionTypes.INIT
			? "preloadedState argument passed to createStore"
			: "previous state received by the reducer";

	if (reducerKeys.length === 0) {
		return (
			"Store does not have a valid reducer. Make sure the argument passed " +
			"to combineReducers is an object whose values are reducers."
		);
	}

	if (!isPlainObject(inputState)) {
		return (
			"The " +
			argumentName +
			' has unexpected type of "' +
			{}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
			'". Expected argument to be an object with the following ' +
			('keys: "' + reducerKeys.join('", "') + '"')
		);
	}

	var unexpectedKeys = Object.keys(inputState).filter(function(key) {
		return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	});
	unexpectedKeys.forEach(function(key) {
		unexpectedKeyCache[key] = true;
	});
	if (action && action.type === ActionTypes.REPLACE) return;

	if (unexpectedKeys.length > 0) {
		return (
			"Unexpected " +
			(unexpectedKeys.length > 1 ? "keys" : "key") +
			" " +
			('"' +
				unexpectedKeys.join('", "') +
				'" found in ' +
				argumentName +
				". ") +
			"Expected to find one of the known reducer keys instead: " +
			('"' +
				reducerKeys.join('", "') +
				'". Unexpected keys will be ignored.')
		);
	}
}

function assertReducerShape(reducers) {
	Object.keys(reducers).forEach(function(key) {
		var reducer = reducers[key];
		var initialState = reducer(undefined, {
			type: ActionTypes.INIT
		});

		if (typeof initialState === "undefined") {
			throw new Error(
				'Reducer "' +
					key +
					'" returned undefined during initialization. ' +
					"If the state passed to the reducer is undefined, you must " +
					"explicitly return the initial state. The initial state may " +
					"not be undefined. If you don't want to set a value for this reducer, " +
					"you can use null instead of undefined."
			);
		}

		if (
			typeof reducer(undefined, {
				type: ActionTypes.PROBE_UNKNOWN_ACTION()
			}) === "undefined"
		) {
			throw new Error(
				'Reducer "' +
					key +
					'" returned undefined when probed with a random type. ' +
					("Don't try to handle " +
						ActionTypes.INIT +
						' or other actions in "redux/*" ') +
					"namespace. They are considered private. Instead, you must return the " +
					"current state for any unknown actions, unless it is undefined, " +
					"in which case you must return the initial state, regardless of the " +
					"action type. The initial state may not be undefined, but can be null."
			);
		}
	});
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

function combineReducers(reducers) {
	var reducerKeys = Object.keys(reducers);
	var finalReducers = {};

	for (var i = 0; i < reducerKeys.length; i++) {
		var key = reducerKeys[i];

		if (process.env.NODE_ENV !== "production") {
			if (typeof reducers[key] === "undefined") {
				warning$1('No reducer provided for key "' + key + '"');
			}
		}

		if (typeof reducers[key] === "function") {
			finalReducers[key] = reducers[key];
		}
	}

	var finalReducerKeys = Object.keys(finalReducers);
	var unexpectedKeyCache;

	if (process.env.NODE_ENV !== "production") {
		unexpectedKeyCache = {};
	}

	var shapeAssertionError;

	try {
		assertReducerShape(finalReducers);
	} catch (e) {
		shapeAssertionError = e;
	}

	return function combination(state, action) {
		if (state === void 0) {
			state = {};
		}

		if (shapeAssertionError) {
			throw shapeAssertionError;
		}

		if (process.env.NODE_ENV !== "production") {
			var warningMessage = getUnexpectedStateShapeWarningMessage(
				state,
				finalReducers,
				action,
				unexpectedKeyCache
			);

			if (warningMessage) {
				warning$1(warningMessage);
			}
		}

		var hasChanged = false;
		var nextState = {};

		for (var _i = 0; _i < finalReducerKeys.length; _i++) {
			var _key = finalReducerKeys[_i];
			var reducer = finalReducers[_key];
			var previousStateForKey = state[_key];
			var nextStateForKey = reducer(previousStateForKey, action);

			if (typeof nextStateForKey === "undefined") {
				var errorMessage = getUndefinedStateErrorMessage(_key, action);
				throw new Error(errorMessage);
			}

			nextState[_key] = nextStateForKey;
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		}

		return hasChanged ? nextState : state;
	};
}

function bindActionCreator(actionCreator, dispatch) {
	return function() {
		return dispatch(actionCreator.apply(this, arguments));
	};
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */

function bindActionCreators(actionCreators, dispatch) {
	if (typeof actionCreators === "function") {
		return bindActionCreator(actionCreators, dispatch);
	}

	if (typeof actionCreators !== "object" || actionCreators === null) {
		throw new Error(
			"bindActionCreators expected an object or a function, instead received " +
				(actionCreators === null ? "null" : typeof actionCreators) +
				". " +
				'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
		);
	}

	var keys = Object.keys(actionCreators);
	var boundActionCreators = {};

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var actionCreator = actionCreators[key];

		if (typeof actionCreator === "function") {
			boundActionCreators[key] = bindActionCreator(
				actionCreator,
				dispatch
			);
		}
	}

	return boundActionCreators;
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (
	process.env.NODE_ENV !== "production" &&
	typeof isCrushed.name === "string" &&
	isCrushed.name !== "isCrushed"
) {
	warning$1(
		'You are currently using minified code outside of NODE_ENV === "production". ' +
			"This means that you are running a slower development build of Redux. " +
			"You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify " +
			"or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) " +
			"to ensure you have the correct code for your production build."
	);
}

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject$1(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	var proto = obj;

	while (Object.getPrototypeOf(proto) !== null) {
		proto = Object.getPrototypeOf(proto);
	}

	return Object.getPrototypeOf(obj) === proto;
}

function verifyPlainObject(value, displayName, methodName) {
	if (!isPlainObject$1(value)) {
		warning(
			methodName +
				"() in " +
				displayName +
				" must return a plain object. Instead received " +
				value +
				"."
		);
	}
}

function wrapMapToPropsConstant(getConstant) {
	return function initConstantSelector(dispatch, options) {
		var constant = getConstant(dispatch, options);

		function constantSelector() {
			return constant;
		}

		constantSelector.dependsOnOwnProps = false;
		return constantSelector;
	};
} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..

function getDependsOnOwnProps(mapToProps) {
	return mapToProps.dependsOnOwnProps !== null &&
		mapToProps.dependsOnOwnProps !== undefined
		? Boolean(mapToProps.dependsOnOwnProps)
		: mapToProps.length !== 1;
} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
//
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//

function wrapMapToPropsFunc(mapToProps, methodName) {
	return function initProxySelector(dispatch, _ref) {
		var displayName = _ref.displayName;

		var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
			return proxy.dependsOnOwnProps
				? proxy.mapToProps(stateOrDispatch, ownProps)
				: proxy.mapToProps(stateOrDispatch);
		}; // allow detectFactoryAndVerify to get ownProps

		proxy.dependsOnOwnProps = true;

		proxy.mapToProps = function detectFactoryAndVerify(
			stateOrDispatch,
			ownProps
		) {
			proxy.mapToProps = mapToProps;
			proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
			var props = proxy(stateOrDispatch, ownProps);

			if (typeof props === "function") {
				proxy.mapToProps = props;
				proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
				props = proxy(stateOrDispatch, ownProps);
			}

			if (process.env.NODE_ENV !== "production")
				verifyPlainObject(props, displayName, methodName);
			return props;
		};

		return proxy;
	};
}

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
	return typeof mapDispatchToProps === "function"
		? wrapMapToPropsFunc(mapDispatchToProps, "mapDispatchToProps")
		: undefined;
}
function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
	return !mapDispatchToProps
		? wrapMapToPropsConstant(function(dispatch) {
				return {
					dispatch: dispatch
				};
		  })
		: undefined;
}
function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
	return mapDispatchToProps && typeof mapDispatchToProps === "object"
		? wrapMapToPropsConstant(function(dispatch) {
				return bindActionCreators(mapDispatchToProps, dispatch);
		  })
		: undefined;
}
var defaultMapDispatchToPropsFactories = [
	whenMapDispatchToPropsIsFunction,
	whenMapDispatchToPropsIsMissing,
	whenMapDispatchToPropsIsObject
];

function whenMapStateToPropsIsFunction(mapStateToProps) {
	return typeof mapStateToProps === "function"
		? wrapMapToPropsFunc(mapStateToProps, "mapStateToProps")
		: undefined;
}
function whenMapStateToPropsIsMissing(mapStateToProps) {
	return !mapStateToProps
		? wrapMapToPropsConstant(function() {
				return {};
		  })
		: undefined;
}
var defaultMapStateToPropsFactories = [
	whenMapStateToPropsIsFunction,
	whenMapStateToPropsIsMissing
];

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
	return _extends({}, ownProps, stateProps, dispatchProps);
}
function wrapMergePropsFunc(mergeProps) {
	return function initMergePropsProxy(dispatch, _ref) {
		var displayName = _ref.displayName,
			pure = _ref.pure,
			areMergedPropsEqual = _ref.areMergedPropsEqual;
		var hasRunOnce = false;
		var mergedProps;
		return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
			var nextMergedProps = mergeProps(
				stateProps,
				dispatchProps,
				ownProps
			);

			if (hasRunOnce) {
				if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps))
					mergedProps = nextMergedProps;
			} else {
				hasRunOnce = true;
				mergedProps = nextMergedProps;
				if (process.env.NODE_ENV !== "production")
					verifyPlainObject(mergedProps, displayName, "mergeProps");
			}

			return mergedProps;
		};
	};
}
function whenMergePropsIsFunction(mergeProps) {
	return typeof mergeProps === "function"
		? wrapMergePropsFunc(mergeProps)
		: undefined;
}
function whenMergePropsIsOmitted(mergeProps) {
	return !mergeProps
		? function() {
				return defaultMergeProps;
		  }
		: undefined;
}
var defaultMergePropsFactories = [
	whenMergePropsIsFunction,
	whenMergePropsIsOmitted
];

function verify(selector, methodName, displayName) {
	if (!selector) {
		throw new Error(
			"Unexpected value for " + methodName + " in " + displayName + "."
		);
	} else if (
		methodName === "mapStateToProps" ||
		methodName === "mapDispatchToProps"
	) {
		if (!selector.hasOwnProperty("dependsOnOwnProps")) {
			warning(
				"The selector for " +
					methodName +
					" of " +
					displayName +
					" did not specify a value for dependsOnOwnProps."
			);
		}
	}
}

function verifySubselectors(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	displayName
) {
	verify(mapStateToProps, "mapStateToProps", displayName);
	verify(mapDispatchToProps, "mapDispatchToProps", displayName);
	verify(mergeProps, "mergeProps", displayName);
}

function impureFinalPropsSelectorFactory(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	dispatch
) {
	return function impureFinalPropsSelector(state, ownProps) {
		return mergeProps(
			mapStateToProps(state, ownProps),
			mapDispatchToProps(dispatch, ownProps),
			ownProps
		);
	};
}
function pureFinalPropsSelectorFactory(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	dispatch,
	_ref
) {
	var areStatesEqual = _ref.areStatesEqual,
		areOwnPropsEqual = _ref.areOwnPropsEqual,
		areStatePropsEqual = _ref.areStatePropsEqual;
	var hasRunAtLeastOnce = false;
	var state;
	var ownProps;
	var stateProps;
	var dispatchProps;
	var mergedProps;

	function handleFirstCall(firstState, firstOwnProps) {
		state = firstState;
		ownProps = firstOwnProps;
		stateProps = mapStateToProps(state, ownProps);
		dispatchProps = mapDispatchToProps(dispatch, ownProps);
		mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
		hasRunAtLeastOnce = true;
		return mergedProps;
	}

	function handleNewPropsAndNewState() {
		stateProps = mapStateToProps(state, ownProps);
		if (mapDispatchToProps.dependsOnOwnProps)
			dispatchProps = mapDispatchToProps(dispatch, ownProps);
		mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
		return mergedProps;
	}

	function handleNewProps() {
		if (mapStateToProps.dependsOnOwnProps)
			stateProps = mapStateToProps(state, ownProps);
		if (mapDispatchToProps.dependsOnOwnProps)
			dispatchProps = mapDispatchToProps(dispatch, ownProps);
		mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
		return mergedProps;
	}

	function handleNewState() {
		var nextStateProps = mapStateToProps(state, ownProps);
		var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
		stateProps = nextStateProps;
		if (statePropsChanged)
			mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
		return mergedProps;
	}

	function handleSubsequentCalls(nextState, nextOwnProps) {
		var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
		var stateChanged = !areStatesEqual(nextState, state);
		state = nextState;
		ownProps = nextOwnProps;
		if (propsChanged && stateChanged) return handleNewPropsAndNewState();
		if (propsChanged) return handleNewProps();
		if (stateChanged) return handleNewState();
		return mergedProps;
	}

	return function pureFinalPropsSelector(nextState, nextOwnProps) {
		return hasRunAtLeastOnce
			? handleSubsequentCalls(nextState, nextOwnProps)
			: handleFirstCall(nextState, nextOwnProps);
	};
} // TODO: Add more comments
// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
	var initMapStateToProps = _ref2.initMapStateToProps,
		initMapDispatchToProps = _ref2.initMapDispatchToProps,
		initMergeProps = _ref2.initMergeProps,
		options = _objectWithoutPropertiesLoose(_ref2, [
			"initMapStateToProps",
			"initMapDispatchToProps",
			"initMergeProps"
		]);

	var mapStateToProps = initMapStateToProps(dispatch, options);
	var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
	var mergeProps = initMergeProps(dispatch, options);

	if (process.env.NODE_ENV !== "production") {
		verifySubselectors(
			mapStateToProps,
			mapDispatchToProps,
			mergeProps,
			options.displayName
		);
	}

	var selectorFactory = options.pure
		? pureFinalPropsSelectorFactory
		: impureFinalPropsSelectorFactory;
	return selectorFactory(
		mapStateToProps,
		mapDispatchToProps,
		mergeProps,
		dispatch,
		options
	);
}

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
	for (var i = factories.length - 1; i >= 0; i--) {
		var result = factories[i](arg);
		if (result) return result;
	}

	return function(dispatch, options) {
		throw new Error(
			"Invalid value of type " +
				typeof arg +
				" for " +
				name +
				" argument when connecting component " +
				options.wrappedComponentName +
				"."
		);
	};
}

function strictEqual(a, b) {
	return a === b;
} // createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios

function createConnect(_temp) {
	var _ref = _temp === void 0 ? {} : _temp,
		_ref$connectHOC = _ref.connectHOC,
		connectHOC =
			_ref$connectHOC === void 0 ? connectAdvanced : _ref$connectHOC,
		_ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
		mapStateToPropsFactories =
			_ref$mapStateToPropsF === void 0
				? defaultMapStateToPropsFactories
				: _ref$mapStateToPropsF,
		_ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
		mapDispatchToPropsFactories =
			_ref$mapDispatchToPro === void 0
				? defaultMapDispatchToPropsFactories
				: _ref$mapDispatchToPro,
		_ref$mergePropsFactor = _ref.mergePropsFactories,
		mergePropsFactories =
			_ref$mergePropsFactor === void 0
				? defaultMergePropsFactories
				: _ref$mergePropsFactor,
		_ref$selectorFactory = _ref.selectorFactory,
		selectorFactory =
			_ref$selectorFactory === void 0
				? finalPropsSelectorFactory
				: _ref$selectorFactory;

	return function connect(
		mapStateToProps,
		mapDispatchToProps,
		mergeProps,
		_ref2
	) {
		if (_ref2 === void 0) {
			_ref2 = {};
		}

		var _ref3 = _ref2,
			_ref3$pure = _ref3.pure,
			pure = _ref3$pure === void 0 ? true : _ref3$pure,
			_ref3$areStatesEqual = _ref3.areStatesEqual,
			areStatesEqual =
				_ref3$areStatesEqual === void 0
					? strictEqual
					: _ref3$areStatesEqual,
			_ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
			areOwnPropsEqual =
				_ref3$areOwnPropsEqua === void 0
					? shallowEqual
					: _ref3$areOwnPropsEqua,
			_ref3$areStatePropsEq = _ref3.areStatePropsEqual,
			areStatePropsEqual =
				_ref3$areStatePropsEq === void 0
					? shallowEqual
					: _ref3$areStatePropsEq,
			_ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
			areMergedPropsEqual =
				_ref3$areMergedPropsE === void 0
					? shallowEqual
					: _ref3$areMergedPropsE,
			extraOptions = _objectWithoutPropertiesLoose(_ref3, [
				"pure",
				"areStatesEqual",
				"areOwnPropsEqual",
				"areStatePropsEqual",
				"areMergedPropsEqual"
			]);

		var initMapStateToProps = match(
			mapStateToProps,
			mapStateToPropsFactories,
			"mapStateToProps"
		);
		var initMapDispatchToProps = match(
			mapDispatchToProps,
			mapDispatchToPropsFactories,
			"mapDispatchToProps"
		);
		var initMergeProps = match(
			mergeProps,
			mergePropsFactories,
			"mergeProps"
		);
		return connectHOC(
			selectorFactory,
			_extends(
				{
					// used in error messages
					methodName: "connect",
					// used to compute Connect's displayName from the wrapped component's displayName.
					getDisplayName: function getDisplayName(name) {
						return "Connect(" + name + ")";
					},
					// if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
					shouldHandleStateChanges: Boolean(mapStateToProps),
					// passed through to selectorFactory
					initMapStateToProps: initMapStateToProps,
					initMapDispatchToProps: initMapDispatchToProps,
					initMergeProps: initMergeProps,
					pure: pure,
					areStatesEqual: areStatesEqual,
					areOwnPropsEqual: areOwnPropsEqual,
					areStatePropsEqual: areStatePropsEqual,
					areMergedPropsEqual: areMergedPropsEqual
				},
				extraOptions
			)
		);
	};
}
var connect = createConnect();

var StoreContext = React__default.createContext();

var Provider$$1 = function Provider$$1(_ref) {
	var store = _ref.store,
		otherProps = _objectWithoutPropertiesLoose(_ref, ["store"]);

	return React__default.createElement(
		StoreContext.Provider,
		{
			value: store
		},
		React__default.createElement(
			ReduxProvider,
			_extends(
				{
					store: store
				},
				otherProps
			)
		)
	);
};

Provider$$1.propTypes = {
	store: propTypes.object.isRequired
};

function _isPlaceholder(a) {
	return (
		a != null &&
		typeof a === "object" &&
		a["@@functional/placeholder"] === true
	);
}

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry1(fn) {
	return function f1(a) {
		if (arguments.length === 0 || _isPlaceholder(a)) {
			return f1;
		} else {
			return fn.apply(this, arguments);
		}
	};
}

/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      var t = R.always('Tee');
 *      t(); //=> 'Tee'
 */

var always =
	/*#__PURE__*/
	_curry1(function always(val) {
		return function() {
			return val;
		};
	});

/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.T
 * @example
 *
 *      R.F(); //=> false
 */

var F =
	/*#__PURE__*/
	always(false);

/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.F
 * @example
 *
 *      R.T(); //=> true
 */

var T =
	/*#__PURE__*/
	always(true);

/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
var __ = {
	"@@functional/placeholder": true
};

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry2(fn) {
	return function f2(a, b) {
		switch (arguments.length) {
			case 0:
				return f2;

			case 1:
				return _isPlaceholder(a)
					? f2
					: _curry1(function(_b) {
							return fn(a, _b);
					  });

			default:
				return _isPlaceholder(a) && _isPlaceholder(b)
					? f2
					: _isPlaceholder(a)
						? _curry1(function(_a) {
								return fn(_a, b);
						  })
						: _isPlaceholder(b)
							? _curry1(function(_b) {
									return fn(a, _b);
							  })
							: fn(a, b);
		}
	};
}

/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */

var add =
	/*#__PURE__*/
	_curry2(function add(a, b) {
		return Number(a) + Number(b);
	});

/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
	set1 = set1 || [];
	set2 = set2 || [];
	var idx;
	var len1 = set1.length;
	var len2 = set2.length;
	var result = [];
	idx = 0;

	while (idx < len1) {
		result[result.length] = set1[idx];
		idx += 1;
	}

	idx = 0;

	while (idx < len2) {
		result[result.length] = set2[idx];
		idx += 1;
	}

	return result;
}

function _arity(n, fn) {
	/* eslint-disable no-unused-vars */
	switch (n) {
		case 0:
			return function() {
				return fn.apply(this, arguments);
			};

		case 1:
			return function(a0) {
				return fn.apply(this, arguments);
			};

		case 2:
			return function(a0, a1) {
				return fn.apply(this, arguments);
			};

		case 3:
			return function(a0, a1, a2) {
				return fn.apply(this, arguments);
			};

		case 4:
			return function(a0, a1, a2, a3) {
				return fn.apply(this, arguments);
			};

		case 5:
			return function(a0, a1, a2, a3, a4) {
				return fn.apply(this, arguments);
			};

		case 6:
			return function(a0, a1, a2, a3, a4, a5) {
				return fn.apply(this, arguments);
			};

		case 7:
			return function(a0, a1, a2, a3, a4, a5, a6) {
				return fn.apply(this, arguments);
			};

		case 8:
			return function(a0, a1, a2, a3, a4, a5, a6, a7) {
				return fn.apply(this, arguments);
			};

		case 9:
			return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
				return fn.apply(this, arguments);
			};

		case 10:
			return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
				return fn.apply(this, arguments);
			};

		default:
			throw new Error(
				"First argument to _arity must be a non-negative integer no greater than ten"
			);
	}
}

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curryN(length, received, fn) {
	return function() {
		var combined = [];
		var argsIdx = 0;
		var left = length;
		var combinedIdx = 0;

		while (combinedIdx < received.length || argsIdx < arguments.length) {
			var result;

			if (
				combinedIdx < received.length &&
				(!_isPlaceholder(received[combinedIdx]) ||
					argsIdx >= arguments.length)
			) {
				result = received[combinedIdx];
			} else {
				result = arguments[argsIdx];
				argsIdx += 1;
			}

			combined[combinedIdx] = result;

			if (!_isPlaceholder(result)) {
				left -= 1;
			}

			combinedIdx += 1;
		}

		return left <= 0
			? fn.apply(this, combined)
			: _arity(left, _curryN(length, combined, fn));
	};
}

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */

var curryN =
	/*#__PURE__*/
	_curry2(function curryN(length, fn) {
		if (length === 1) {
			return _curry1(fn);
		}

		return _arity(length, _curryN(length, [], fn));
	});

/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      var mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */

var addIndex =
	/*#__PURE__*/
	_curry1(function addIndex(fn) {
		return curryN(fn.length, function() {
			var idx = 0;
			var origFn = arguments[0];
			var list = arguments[arguments.length - 1];
			var args = Array.prototype.slice.call(arguments, 0);

			args[0] = function() {
				var result = origFn.apply(
					this,
					_concat(arguments, [idx, list])
				);
				idx += 1;
				return result;
			};

			return fn.apply(this, args);
		});
	});

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry3(fn) {
	return function f3(a, b, c) {
		switch (arguments.length) {
			case 0:
				return f3;

			case 1:
				return _isPlaceholder(a)
					? f3
					: _curry2(function(_b, _c) {
							return fn(a, _b, _c);
					  });

			case 2:
				return _isPlaceholder(a) && _isPlaceholder(b)
					? f3
					: _isPlaceholder(a)
						? _curry2(function(_a, _c) {
								return fn(_a, b, _c);
						  })
						: _isPlaceholder(b)
							? _curry2(function(_b, _c) {
									return fn(a, _b, _c);
							  })
							: _curry1(function(_c) {
									return fn(a, b, _c);
							  });

			default:
				return _isPlaceholder(a) &&
					_isPlaceholder(b) &&
					_isPlaceholder(c)
					? f3
					: _isPlaceholder(a) && _isPlaceholder(b)
						? _curry2(function(_a, _b) {
								return fn(_a, _b, c);
						  })
						: _isPlaceholder(a) && _isPlaceholder(c)
							? _curry2(function(_a, _c) {
									return fn(_a, b, _c);
							  })
							: _isPlaceholder(b) && _isPlaceholder(c)
								? _curry2(function(_b, _c) {
										return fn(a, _b, _c);
								  })
								: _isPlaceholder(a)
									? _curry1(function(_a) {
											return fn(_a, b, c);
									  })
									: _isPlaceholder(b)
										? _curry1(function(_b) {
												return fn(a, _b, c);
										  })
										: _isPlaceholder(c)
											? _curry1(function(_c) {
													return fn(a, b, _c);
											  })
											: fn(a, b, c);
		}
	};
}

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig (a -> a) -> Number -> [a] -> [a]
 * @param {Function} fn The function to apply.
 * @param {Number} idx The index.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(R.add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]
 *      R.adjust(R.add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]
 * @symb R.adjust(f, -1, [a, b]) = [a, f(b)]
 * @symb R.adjust(f, 0, [a, b]) = [f(a), b]
 */

var adjust =
	/*#__PURE__*/
	_curry3(function adjust(fn, idx, list) {
		if (idx >= list.length || idx < -list.length) {
			return list;
		}

		var start = idx < 0 ? list.length : 0;

		var _idx = start + idx;

		var _list = _concat(list);

		_list[_idx] = fn(list[_idx]);
		return _list;
	});

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray =
	Array.isArray ||
	function _isArray(val) {
		return (
			val != null &&
			val.length >= 0 &&
			Object.prototype.toString.call(val) === "[object Array]"
		);
	};

function _isTransformer(obj) {
	return typeof obj["@@transducer/step"] === "function";
}

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */

function _dispatchable(methodNames, xf, fn) {
	return function() {
		if (arguments.length === 0) {
			return fn();
		}

		var args = Array.prototype.slice.call(arguments, 0);
		var obj = args.pop();

		if (!_isArray(obj)) {
			var idx = 0;

			while (idx < methodNames.length) {
				if (typeof obj[methodNames[idx]] === "function") {
					return obj[methodNames[idx]].apply(obj, args);
				}

				idx += 1;
			}

			if (_isTransformer(obj)) {
				var transducer = xf.apply(null, args);
				return transducer(obj);
			}
		}

		return fn.apply(this, arguments);
	};
}

function _reduced(x) {
	return x && x["@@transducer/reduced"]
		? x
		: {
				"@@transducer/value": x,
				"@@transducer/reduced": true
		  };
}

var _xfBase = {
	init: function init() {
		return this.xf["@@transducer/init"]();
	},
	result: function result(_result) {
		return this.xf["@@transducer/result"](_result);
	}
};

/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */

var max =
	/*#__PURE__*/
	_curry2(function max(a, b) {
		return b > a ? b : a;
	});

function _map(fn, functor) {
	var idx = 0;
	var len = functor.length;
	var result = Array(len);

	while (idx < len) {
		result[idx] = fn(functor[idx]);
		idx += 1;
	}

	return result;
}

function _isString(x) {
	return Object.prototype.toString.call(x) === "[object String]";
}

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */

var _isArrayLike =
	/*#__PURE__*/
	_curry1(function isArrayLike(x) {
		if (_isArray(x)) {
			return true;
		}

		if (!x) {
			return false;
		}

		if (typeof x !== "object") {
			return false;
		}

		if (_isString(x)) {
			return false;
		}

		if (x.nodeType === 1) {
			return !!x.length;
		}

		if (x.length === 0) {
			return true;
		}

		if (x.length > 0) {
			return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
		}

		return false;
	});

var XWrap =
	/*#__PURE__*/
	(function() {
		function XWrap(fn) {
			this.f = fn;
		}

		XWrap.prototype["@@transducer/init"] = function() {
			throw new Error("init not implemented on XWrap");
		};

		XWrap.prototype["@@transducer/result"] = function(acc) {
			return acc;
		};

		XWrap.prototype["@@transducer/step"] = function(acc, x) {
			return this.f(acc, x);
		};

		return XWrap;
	})();

function _xwrap(fn) {
	return new XWrap(fn);
}

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */

var bind =
	/*#__PURE__*/
	_curry2(function bind(fn, thisObj) {
		return _arity(fn.length, function() {
			return fn.apply(thisObj, arguments);
		});
	});

function _arrayReduce(xf, acc, list) {
	var idx = 0;
	var len = list.length;

	while (idx < len) {
		acc = xf["@@transducer/step"](acc, list[idx]);

		if (acc && acc["@@transducer/reduced"]) {
			acc = acc["@@transducer/value"];
			break;
		}

		idx += 1;
	}

	return xf["@@transducer/result"](acc);
}

function _iterableReduce(xf, acc, iter) {
	var step = iter.next();

	while (!step.done) {
		acc = xf["@@transducer/step"](acc, step.value);

		if (acc && acc["@@transducer/reduced"]) {
			acc = acc["@@transducer/value"];
			break;
		}

		step = iter.next();
	}

	return xf["@@transducer/result"](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
	return xf["@@transducer/result"](
		obj[methodName](bind(xf["@@transducer/step"], xf), acc)
	);
}

var symIterator =
	typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
function _reduce(fn, acc, list) {
	if (typeof fn === "function") {
		fn = _xwrap(fn);
	}

	if (_isArrayLike(list)) {
		return _arrayReduce(fn, acc, list);
	}

	if (typeof list["fantasy-land/reduce"] === "function") {
		return _methodReduce(fn, acc, list, "fantasy-land/reduce");
	}

	if (list[symIterator] != null) {
		return _iterableReduce(fn, acc, list[symIterator]());
	}

	if (typeof list.next === "function") {
		return _iterableReduce(fn, acc, list);
	}

	if (typeof list.reduce === "function") {
		return _methodReduce(fn, acc, list, "reduce");
	}

	throw new TypeError("reduce: list must be array or iterable");
}

var XMap =
	/*#__PURE__*/
	(function() {
		function XMap(f, xf) {
			this.xf = xf;
			this.f = f;
		}

		XMap.prototype["@@transducer/init"] = _xfBase.init;
		XMap.prototype["@@transducer/result"] = _xfBase.result;

		XMap.prototype["@@transducer/step"] = function(result, input) {
			return this.xf["@@transducer/step"](result, this.f(input));
		};

		return XMap;
	})();

var _xmap =
	/*#__PURE__*/
	_curry2(function _xmap(f, xf) {
		return new XMap(f, xf);
	});

function _has(prop, obj) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}

var toString = Object.prototype.toString;

var _isArguments = function _isArguments() {
	return toString.call(arguments) === "[object Arguments]"
		? function _isArguments(x) {
				return toString.call(x) === "[object Arguments]";
		  }
		: function _isArguments(x) {
				return _has("callee", x);
		  };
};

var hasEnumBug = !/*#__PURE__*/
{
	toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = [
	"constructor",
	"valueOf",
	"isPrototypeOf",
	"toString",
	"propertyIsEnumerable",
	"hasOwnProperty",
	"toLocaleString"
]; // Safari bug

var hasArgsEnumBug =
	/*#__PURE__*/
	(function() {
		return arguments.propertyIsEnumerable("length");
	})();

var contains = function contains(list, item) {
	var idx = 0;

	while (idx < list.length) {
		if (list[idx] === item) {
			return true;
		}

		idx += 1;
	}

	return false;
};
/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */

var _keys =
	typeof Object.keys === "function" && !hasArgsEnumBug
		? function keys(obj) {
				return Object(obj) !== obj ? [] : Object.keys(obj);
		  }
		: function keys(obj) {
				if (Object(obj) !== obj) {
					return [];
				}

				var prop, nIdx;
				var ks = [];

				var checkArgsLength = hasArgsEnumBug && _isArguments(obj);

				for (prop in obj) {
					if (
						_has(prop, obj) &&
						(!checkArgsLength || prop !== "length")
					) {
						ks[ks.length] = prop;
					}
				}

				if (hasEnumBug) {
					nIdx = nonEnumerableProps.length - 1;

					while (nIdx >= 0) {
						prop = nonEnumerableProps[nIdx];

						if (_has(prop, obj) && !contains(ks, prop)) {
							ks[ks.length] = prop;
						}

						nIdx -= 1;
					}
				}

				return ks;
		  };

var keys =
	/*#__PURE__*/
	_curry1(_keys);

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */

var map =
	/*#__PURE__*/
	_curry2(
		/*#__PURE__*/
		_dispatchable(["fantasy-land/map", "map"], _xmap, function map(
			fn,
			functor
		) {
			switch (Object.prototype.toString.call(functor)) {
				case "[object Function]":
					return curryN(functor.length, function() {
						return fn.call(this, functor.apply(this, arguments));
					});

				case "[object Object]":
					return _reduce(
						function(acc, key) {
							acc[key] = fn(functor[key]);
							return acc;
						},
						{},
						keys(functor)
					);

				default:
					return _map(fn, functor);
			}
		})
	);

/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */

var path =
	/*#__PURE__*/
	_curry2(function path(paths, obj) {
		var val = obj;
		var idx = 0;

		while (idx < paths.length) {
			if (val == null) {
				return;
			}

			val = val[paths[idx]];
			idx += 1;
		}

		return val;
	});

/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */

var prop =
	/*#__PURE__*/
	_curry2(function prop(p, obj) {
		return path([p], obj);
	});

/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
 *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */

var pluck =
	/*#__PURE__*/
	_curry2(function pluck(p, list) {
		return map(prop(p), list);
	});

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */

var reduce =
	/*#__PURE__*/
	_curry3(_reduce);

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      var isQueen = R.propEq('rank', 'Q');
 *      var isSpade = R.propEq('suit', '♠︎');
 *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */

var allPass =
	/*#__PURE__*/
	_curry1(function allPass(preds) {
		return curryN(reduce(max, 0, pluck("length", preds)), function() {
			var idx = 0;
			var len = preds.length;

			while (idx < len) {
				if (!preds[idx].apply(this, arguments)) {
					return false;
				}

				idx += 1;
			}

			return true;
		});
	});

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      var isClub = R.propEq('suit', '♣');
 *      var isSpade = R.propEq('suit', '♠');
 *      var isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */

var anyPass =
	/*#__PURE__*/
	_curry1(function anyPass(preds) {
		return curryN(reduce(max, 0, pluck("length", preds)), function() {
			var idx = 0;
			var len = preds.length;

			while (idx < len) {
				if (preds[idx].apply(this, arguments)) {
					return true;
				}

				idx += 1;
			}

			return false;
		});
	});

/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (a -> b -> c) -> (a -> b) -> (a -> c)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */

var ap =
	/*#__PURE__*/
	_curry2(function ap(applyF, applyX) {
		return typeof applyX["fantasy-land/ap"] === "function"
			? applyX["fantasy-land/ap"](applyF)
			: typeof applyF.ap === "function"
				? applyF.ap(applyX)
				: typeof applyF === "function"
					? function(x) {
							return applyF(x)(applyX(x));
					  } // else
					: _reduce(
							function(acc, f) {
								return _concat(acc, map(f, applyX));
							},
							[],
							applyF
					  );
	});

/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      var nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */

var apply =
	/*#__PURE__*/
	_curry2(function apply(fn, args) {
		return fn.apply(this, args);
	});

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */

var values =
	/*#__PURE__*/
	_curry1(function values(obj) {
		var props = keys(obj);
		var len = props.length;
		var vals = [];
		var idx = 0;

		while (idx < len) {
			vals[idx] = obj[props[idx]];
			idx += 1;
		}

		return vals;
	});

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      var getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */

var applySpec =
	/*#__PURE__*/
	_curry1(function applySpec(spec) {
		spec = map(function(v) {
			return typeof v == "function" ? v : applySpec(v);
		}, spec);
		return curryN(
			reduce(max, 0, pluck("length", values(spec))),
			function() {
				var args = arguments;
				return map(function(f) {
					return apply(f, args);
				}, spec);
			}
		);
	});

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */

var assoc =
	/*#__PURE__*/
	_curry3(function assoc(prop, val, obj) {
		var result = {};

		for (var p in obj) {
			result[p] = obj[p];
		}

		result[prop] = val;
		return result;
	});

/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
var _isInteger =
	Number.isInteger ||
	function _isInteger(n) {
		return n << 0 === n;
	};

/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */

var isNil =
	/*#__PURE__*/
	_curry1(function isNil(x) {
		return x == null;
	});

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */

var assocPath =
	/*#__PURE__*/
	_curry3(function assocPath(path, val, obj) {
		if (path.length === 0) {
			return val;
		}

		var idx = path[0];

		if (path.length > 1) {
			var nextObj =
				!isNil(obj) && _has(idx, obj)
					? obj[idx]
					: _isInteger(path[1])
						? []
						: {};
			val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
		}

		if (_isInteger(idx) && _isArray(obj)) {
			var arr = [].concat(obj);
			arr[idx] = val;
			return arr;
		} else {
			return assoc(idx, val, obj);
		}
	});

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      var takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */

var nAry =
	/*#__PURE__*/
	_curry2(function nAry(n, fn) {
		switch (n) {
			case 0:
				return function() {
					return fn.call(this);
				};

			case 1:
				return function(a0) {
					return fn.call(this, a0);
				};

			case 2:
				return function(a0, a1) {
					return fn.call(this, a0, a1);
				};

			case 3:
				return function(a0, a1, a2) {
					return fn.call(this, a0, a1, a2);
				};

			case 4:
				return function(a0, a1, a2, a3) {
					return fn.call(this, a0, a1, a2, a3);
				};

			case 5:
				return function(a0, a1, a2, a3, a4) {
					return fn.call(this, a0, a1, a2, a3, a4);
				};

			case 6:
				return function(a0, a1, a2, a3, a4, a5) {
					return fn.call(this, a0, a1, a2, a3, a4, a5);
				};

			case 7:
				return function(a0, a1, a2, a3, a4, a5, a6) {
					return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
				};

			case 8:
				return function(a0, a1, a2, a3, a4, a5, a6, a7) {
					return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
				};

			case 9:
				return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
					return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
				};

			case 10:
				return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
					return fn.call(
						this,
						a0,
						a1,
						a2,
						a3,
						a4,
						a5,
						a6,
						a7,
						a8,
						a9
					);
				};

			default:
				throw new Error(
					"First argument to nAry must be a non-negative integer no greater than ten"
				);
		}
	});

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> c) -> (a, b -> c)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @see R.nAry, R.unary
 * @example
 *
 *      var takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      var takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */

var binary =
	/*#__PURE__*/
	_curry1(function binary(fn) {
		return nAry(2, fn);
	});

function _isFunction(x) {
	return Object.prototype.toString.call(x) === "[object Function]";
}

/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      var madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */

var liftN =
	/*#__PURE__*/
	_curry2(function liftN(arity, fn) {
		var lifted = curryN(arity, fn);
		return curryN(arity, function() {
			return _reduce(
				ap,
				map(lifted, arguments[0]),
				Array.prototype.slice.call(arguments, 1)
			);
		});
	});

/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      var madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */

var lift =
	/*#__PURE__*/
	_curry1(function lift(fn) {
		return liftN(fn.length, fn);
	});

/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */

var curry =
	/*#__PURE__*/
	_curry1(function curry(fn) {
		return curryN(fn.length, fn);
	});

/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      var indentN = R.pipe(R.repeat(' '),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      var format = R.converge(R.call, [
 *                                  R.pipe(R.prop('indent'), indentN),
 *                                  R.prop('value')
 *                              ]);
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */

var call =
	/*#__PURE__*/
	curry(function call(fn) {
		return fn.apply(this, Array.prototype.slice.call(arguments, 1));
	});

/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */

function _makeFlat(recursive) {
	return function flatt(list) {
		var value, jlen, j;
		var result = [];
		var idx = 0;
		var ilen = list.length;

		while (idx < ilen) {
			if (_isArrayLike(list[idx])) {
				value = recursive ? flatt(list[idx]) : list[idx];
				j = 0;
				jlen = value.length;

				while (j < jlen) {
					result[result.length] = value[j];
					j += 1;
				}
			} else {
				result[result.length] = list[idx];
			}

			idx += 1;
		}

		return result;
	};
}

function _forceReduced(x) {
	return {
		"@@transducer/value": x,
		"@@transducer/reduced": true
	};
}

var preservingReduced = function preservingReduced(xf) {
	return {
		"@@transducer/init": _xfBase.init,
		"@@transducer/result": function transducerResult(result) {
			return xf["@@transducer/result"](result);
		},
		"@@transducer/step": function transducerStep(result, input) {
			var ret = xf["@@transducer/step"](result, input);
			return ret["@@transducer/reduced"] ? _forceReduced(ret) : ret;
		}
	};
};

var _flatCat = function _xcat(xf) {
	var rxf = preservingReduced(xf);
	return {
		"@@transducer/init": _xfBase.init,
		"@@transducer/result": function transducerResult(result) {
			return rxf["@@transducer/result"](result);
		},
		"@@transducer/step": function transducerStep(result, input) {
			return !_isArrayLike(input)
				? _reduce(rxf, result, [input])
				: _reduce(rxf, result, input);
		}
	};
};

var _xchain =
	/*#__PURE__*/
	_curry2(function _xchain(f, xf) {
		return map(f, _flatCat(xf));
	});

/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      var duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */

var chain =
	/*#__PURE__*/
	_curry2(
		/*#__PURE__*/
		_dispatchable(["fantasy-land/chain", "chain"], _xchain, function chain(
			fn,
			monad
		) {
			if (typeof monad === "function") {
				return function(x) {
					return fn(monad(x))(x);
				};
			}

			return _makeFlat(false)(map(fn, monad));
		})
	);

function _cloneRegExp(pattern) {
	return new RegExp(
		pattern.source,
		(pattern.global ? "g" : "") +
			(pattern.ignoreCase ? "i" : "") +
			(pattern.multiline ? "m" : "") +
			(pattern.sticky ? "y" : "") +
			(pattern.unicode ? "u" : "")
	);
}

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */

var type =
	/*#__PURE__*/
	_curry1(function type(val) {
		return val === null
			? "Null"
			: val === undefined
				? "Undefined"
				: Object.prototype.toString.call(val).slice(8, -1);
	});

/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */

function _clone(value, refFrom, refTo, deep) {
	var copy = function copy(copiedValue) {
		var len = refFrom.length;
		var idx = 0;

		while (idx < len) {
			if (value === refFrom[idx]) {
				return refTo[idx];
			}

			idx += 1;
		}

		refFrom[idx + 1] = value;
		refTo[idx + 1] = copiedValue;

		for (var key in value) {
			copiedValue[key] = deep
				? _clone(value[key], refFrom, refTo, true)
				: value[key];
		}

		return copiedValue;
	};

	switch (type(value)) {
		case "Object":
			return copy({});

		case "Array":
			return copy([]);

		case "Date":
			return new Date(value.valueOf());

		case "RegExp":
			return _cloneRegExp(value);

		default:
			return value;
	}
}

/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      var objects = [{}, {}, {}];
 *      var objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */

var clone =
	/*#__PURE__*/
	_curry1(function clone(value) {
		return value != null && typeof value.clone === "function"
			? value.clone()
			: _clone(value, [], [], true);
	});

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */

var not =
	/*#__PURE__*/
	_curry1(function not(a) {
		return !a;
	});

/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      var isNotNil = R.complement(R.isNil);
 *      isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      isNil(7); //=> false
 *      isNotNil(7); //=> true
 */

var complement =
	/*#__PURE__*/
	lift(not);

function _pipe(f, g) {
	return function() {
		return g.call(this, f.apply(this, arguments));
	};
}

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */

function _checkForMethod(methodname, fn) {
	return function() {
		var length = arguments.length;

		if (length === 0) {
			return fn();
		}

		var obj = arguments[length - 1];
		return _isArray(obj) || typeof obj[methodname] !== "function"
			? fn.apply(this, arguments)
			: obj[methodname].apply(
					obj,
					Array.prototype.slice.call(arguments, 0, length - 1)
			  );
	};
}

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */

var slice =
	/*#__PURE__*/
	_curry3(
		/*#__PURE__*/
		_checkForMethod("slice", function slice(fromIndex, toIndex, list) {
			return Array.prototype.slice.call(list, fromIndex, toIndex);
		})
	);

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */

var tail =
	/*#__PURE__*/
	_curry1(
		/*#__PURE__*/
		_checkForMethod(
			"tail",
			/*#__PURE__*/
			slice(1, Infinity)
		)
	);

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */

function pipe() {
	if (arguments.length === 0) {
		throw new Error("pipe requires at least one argument");
	}

	return _arity(
		arguments[0].length,
		reduce(_pipe, arguments[0], tail(arguments))
	);
}

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */

var reverse =
	/*#__PURE__*/
	_curry1(function reverse(list) {
		return _isString(list)
			? list
					.split("")
					.reverse()
					.join("")
			: Array.prototype.slice.call(list, 0).reverse();
	});

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */

function compose$1() {
	if (arguments.length === 0) {
		throw new Error("compose requires at least one argument");
	}

	return pipe.apply(this, reverse(arguments));
}

function _arrayFromIterator(iter) {
	var list = [];
	var next;

	while (!(next = iter.next()).done) {
		list.push(next.value);
	}

	return list;
}

function _containsWith(pred, x, list) {
	var idx = 0;
	var len = list.length;

	while (idx < len) {
		if (pred(x, list[idx])) {
			return true;
		}

		idx += 1;
	}

	return false;
}

function _functionName(f) {
	// String(x => x) evaluates to "x => x", so the pattern may not match.
	var match = String(f).match(/^function (\w*)/);
	return match == null ? "" : match[1];
}

/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */

var identical =
	/*#__PURE__*/
	_curry2(function identical(a, b) {
		// SameValue algorithm
		if (a === b) {
			// Steps 1-5, 7-10
			// Steps 6.b-6.e: +0 != -0
			return a !== 0 || 1 / a === 1 / b;
		} else {
			// Step 6.a: NaN == NaN
			return a !== a && b !== b;
		}
	});

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
	var a = _arrayFromIterator(aIterator);

	var b = _arrayFromIterator(bIterator);

	function eq(_a, _b) {
		return _equals(_a, _b, stackA.slice(), stackB.slice());
	} // if *a* array contains any element that is not included in *b*

	return !_containsWith(
		function(b, aItem) {
			return !_containsWith(eq, aItem, b);
		},
		b,
		a
	);
}

function _equals(a, b, stackA, stackB) {
	if (identical(a, b)) {
		return true;
	}

	var typeA = type(a);

	if (typeA !== type(b)) {
		return false;
	}

	if (a == null || b == null) {
		return false;
	}

	if (
		typeof a["fantasy-land/equals"] === "function" ||
		typeof b["fantasy-land/equals"] === "function"
	) {
		return (
			typeof a["fantasy-land/equals"] === "function" &&
			a["fantasy-land/equals"](b) &&
			typeof b["fantasy-land/equals"] === "function" &&
			b["fantasy-land/equals"](a)
		);
	}

	if (typeof a.equals === "function" || typeof b.equals === "function") {
		return (
			typeof a.equals === "function" &&
			a.equals(b) &&
			typeof b.equals === "function" &&
			b.equals(a)
		);
	}

	switch (typeA) {
		case "Arguments":
		case "Array":
		case "Object":
			if (
				typeof a.constructor === "function" &&
				_functionName(a.constructor) === "Promise"
			) {
				return a === b;
			}

			break;

		case "Boolean":
		case "Number":
		case "String":
			if (
				!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))
			) {
				return false;
			}

			break;

		case "Date":
			if (!identical(a.valueOf(), b.valueOf())) {
				return false;
			}

			break;

		case "Error":
			return a.name === b.name && a.message === b.message;

		case "RegExp":
			if (
				!(
					a.source === b.source &&
					a.global === b.global &&
					a.ignoreCase === b.ignoreCase &&
					a.multiline === b.multiline &&
					a.sticky === b.sticky &&
					a.unicode === b.unicode
				)
			) {
				return false;
			}

			break;
	}

	var idx = stackA.length - 1;

	while (idx >= 0) {
		if (stackA[idx] === a) {
			return stackB[idx] === b;
		}

		idx -= 1;
	}

	switch (typeA) {
		case "Map":
			if (a.size !== b.size) {
				return false;
			}

			return _uniqContentEquals(
				a.entries(),
				b.entries(),
				stackA.concat([a]),
				stackB.concat([b])
			);

		case "Set":
			if (a.size !== b.size) {
				return false;
			}

			return _uniqContentEquals(
				a.values(),
				b.values(),
				stackA.concat([a]),
				stackB.concat([b])
			);

		case "Arguments":
		case "Array":
		case "Object":
		case "Boolean":
		case "Number":
		case "String":
		case "Date":
		case "Error":
		case "RegExp":
		case "Int8Array":
		case "Uint8Array":
		case "Uint8ClampedArray":
		case "Int16Array":
		case "Uint16Array":
		case "Int32Array":
		case "Uint32Array":
		case "Float32Array":
		case "Float64Array":
		case "ArrayBuffer":
			break;

		default:
			// Values of other types are only equal if identical.
			return false;
	}

	var keysA = keys(a);

	if (keysA.length !== keys(b).length) {
		return false;
	}

	var extendedStackA = stackA.concat([a]);
	var extendedStackB = stackB.concat([b]);
	idx = keysA.length - 1;

	while (idx >= 0) {
		var key = keysA[idx];

		if (
			!(
				_has(key, b) &&
				_equals(b[key], a[key], extendedStackA, extendedStackB)
			)
		) {
			return false;
		}

		idx -= 1;
	}

	return true;
}

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */

var equals =
	/*#__PURE__*/
	_curry2(function equals(a, b) {
		return _equals(a, b, [], []);
	});

function _indexOf(list, a, idx) {
	var inf, item; // Array.prototype.indexOf doesn't exist below IE9

	if (typeof list.indexOf === "function") {
		switch (typeof a) {
			case "number":
				if (a === 0) {
					// manually crawl the list to distinguish between +0 and -0
					inf = 1 / a;

					while (idx < list.length) {
						item = list[idx];

						if (item === 0 && 1 / item === inf) {
							return idx;
						}

						idx += 1;
					}

					return -1;
				} else if (a !== a) {
					// NaN
					while (idx < list.length) {
						item = list[idx];

						if (typeof item === "number" && item !== item) {
							return idx;
						}

						idx += 1;
					}

					return -1;
				} // non-zero numbers can utilise Set

				return list.indexOf(a, idx);
			// all these types can utilise Set

			case "string":
			case "boolean":
			case "function":
			case "undefined":
				return list.indexOf(a, idx);

			case "object":
				if (a === null) {
					// null can utilise Set
					return list.indexOf(a, idx);
				}
		}
	} // anything else not covered above, defer to R.equals

	while (idx < list.length) {
		if (equals(list[idx], a)) {
			return idx;
		}

		idx += 1;
	}

	return -1;
}

function _contains(a, list) {
	return _indexOf(list, a, 0) >= 0;
}

function _quote(s) {
	var escaped = s
		.replace(/\\/g, "\\\\")
		.replace(/[\b]/g, "\\b") // \b matches word boundary; [\b] matches backspace
		.replace(/\f/g, "\\f")
		.replace(/\n/g, "\\n")
		.replace(/\r/g, "\\r")
		.replace(/\t/g, "\\t")
		.replace(/\v/g, "\\v")
		.replace(/\0/g, "\\0");
	return '"' + escaped.replace(/"/g, '\\"') + '"';
}

/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
	return (n < 10 ? "0" : "") + n;
};

var _toISOString =
	typeof Date.prototype.toISOString === "function"
		? function _toISOString(d) {
				return d.toISOString();
		  }
		: function _toISOString(d) {
				return (
					d.getUTCFullYear() +
					"-" +
					pad(d.getUTCMonth() + 1) +
					"-" +
					pad(d.getUTCDate()) +
					"T" +
					pad(d.getUTCHours()) +
					":" +
					pad(d.getUTCMinutes()) +
					":" +
					pad(d.getUTCSeconds()) +
					"." +
					(d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
					"Z"
				);
		  };

function _complement(f) {
	return function() {
		return !f.apply(this, arguments);
	};
}

function _filter(fn, list) {
	var idx = 0;
	var len = list.length;
	var result = [];

	while (idx < len) {
		if (fn(list[idx])) {
			result[result.length] = list[idx];
		}

		idx += 1;
	}

	return result;
}

function _isObject(x) {
	return Object.prototype.toString.call(x) === "[object Object]";
}

var XFilter =
	/*#__PURE__*/
	(function() {
		function XFilter(f, xf) {
			this.xf = xf;
			this.f = f;
		}

		XFilter.prototype["@@transducer/init"] = _xfBase.init;
		XFilter.prototype["@@transducer/result"] = _xfBase.result;

		XFilter.prototype["@@transducer/step"] = function(result, input) {
			return this.f(input)
				? this.xf["@@transducer/step"](result, input)
				: result;
		};

		return XFilter;
	})();

var _xfilter =
	/*#__PURE__*/
	_curry2(function _xfilter(f, xf) {
		return new XFilter(f, xf);
	});

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */

var filter =
	/*#__PURE__*/
	_curry2(
		/*#__PURE__*/
		_dispatchable(["filter"], _xfilter, function(pred, filterable) {
			return _isObject(filterable)
				? _reduce(
						function(acc, key) {
							if (pred(filterable[key])) {
								acc[key] = filterable[key];
							}

							return acc;
						},
						{},
						keys(filterable)
				  ) // else
				: _filter(pred, filterable);
		})
	);

/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */

var reject =
	/*#__PURE__*/
	_curry2(function reject(pred, filterable) {
		return filter(_complement(pred), filterable);
	});

function _toString(x, seen) {
	var recur = function recur(y) {
		var xs = seen.concat([x]);
		return _contains(y, xs) ? "<Circular>" : _toString(y, xs);
	}; //  mapPairs :: (Object, [String]) -> [String]

	var mapPairs = function mapPairs(obj, keys$$1) {
		return _map(function(k) {
			return _quote(k) + ": " + recur(obj[k]);
		}, keys$$1.slice().sort());
	};

	switch (Object.prototype.toString.call(x)) {
		case "[object Arguments]":
			return (
				"(function() { return arguments; }(" +
				_map(recur, x).join(", ") +
				"))"
			);

		case "[object Array]":
			return (
				"[" +
				_map(recur, x)
					.concat(
						mapPairs(
							x,
							reject(function(k) {
								return /^\d+$/.test(k);
							}, keys(x))
						)
					)
					.join(", ") +
				"]"
			);

		case "[object Boolean]":
			return typeof x === "object"
				? "new Boolean(" + recur(x.valueOf()) + ")"
				: x.toString();

		case "[object Date]":
			return (
				"new Date(" +
				(isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) +
				")"
			);

		case "[object Null]":
			return "null";

		case "[object Number]":
			return typeof x === "object"
				? "new Number(" + recur(x.valueOf()) + ")"
				: 1 / x === -Infinity
					? "-0"
					: x.toString(10);

		case "[object String]":
			return typeof x === "object"
				? "new String(" + recur(x.valueOf()) + ")"
				: _quote(x);

		case "[object Undefined]":
			return "undefined";

		default:
			if (typeof x.toString === "function") {
				var repr = x.toString();

				if (repr !== "[object Object]") {
					return repr;
				}
			}

			return "{" + mapPairs(x, keys(x)).join(", ") + "}";
	}
}

/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */

var toString$1 =
	/*#__PURE__*/
	_curry1(function toString(val) {
		return _toString(val, []);
	});

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */

var concat =
	/*#__PURE__*/
	_curry2(function concat(a, b) {
		if (_isArray(a)) {
			if (_isArray(b)) {
				return a.concat(b);
			}

			throw new TypeError(toString$1(b) + " is not an array");
		}

		if (_isString(a)) {
			if (_isString(b)) {
				return a + b;
			}

			throw new TypeError(toString$1(b) + " is not a string");
		}

		if (a != null && _isFunction(a["fantasy-land/concat"])) {
			return a["fantasy-land/concat"](b);
		}

		if (a != null && _isFunction(a.concat)) {
			return a.concat(b);
		}

		throw new TypeError(
			toString$1(a) +
				' does not have a method named "concat" or "fantasy-land/concat"'
		);
	});

/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @example
 *
 *      var fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */

var cond =
	/*#__PURE__*/
	_curry1(function cond(pairs) {
		var arity = reduce(
			max,
			0,
			map(function(pair) {
				return pair[0].length;
			}, pairs)
		);
		return _arity(arity, function() {
			var idx = 0;

			while (idx < pairs.length) {
				if (pairs[idx][0].apply(this, arguments)) {
					return pairs[idx][1].apply(this, arguments);
				}

				idx += 1;
			}
		});
	});

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      }
 *
 *      Salad.prototype.recipe = function() {
 *        var instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *        return R.join('\n', instructions);
 *      };
 *
 *      var ThreeLayerSalad = R.constructN(3, Salad);
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      var salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 *      console.log(salad.recipe());
 *      // Add a dollop of Mayonnaise
 *      // Add a dollop of Potato Chips
 *      // Add a dollop of Ketchup
 */

var constructN =
	/*#__PURE__*/
	_curry2(function constructN(n, Fn) {
		if (n > 10) {
			throw new Error("Constructor with greater than ten arguments");
		}

		if (n === 0) {
			return function() {
				return new Fn();
			};
		}

		return curry(
			nAry(n, function($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
				switch (arguments.length) {
					case 1:
						return new Fn($0);

					case 2:
						return new Fn($0, $1);

					case 3:
						return new Fn($0, $1, $2);

					case 4:
						return new Fn($0, $1, $2, $3);

					case 5:
						return new Fn($0, $1, $2, $3, $4);

					case 6:
						return new Fn($0, $1, $2, $3, $4, $5);

					case 7:
						return new Fn($0, $1, $2, $3, $4, $5, $6);

					case 8:
						return new Fn($0, $1, $2, $3, $4, $5, $6, $7);

					case 9:
						return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);

					case 10:
						return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
				}
			})
		);
	});

/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 */

var contains$1 =
	/*#__PURE__*/
	_curry2(_contains);

/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. When invoked, this new function is applied to some
 * arguments, each branching function is applied to those same arguments. The
 * results of each branching function are passed as arguments to the converging
 * function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      var average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */

var converge =
	/*#__PURE__*/
	_curry2(function converge(after, fns) {
		return curryN(reduce(max, 0, pluck("length", fns)), function() {
			var args = arguments;
			var context = this;
			return after.apply(
				context,
				_map(function(fn) {
					return fn.apply(context, args);
				}, fns)
			);
		});
	});

var XReduceBy =
	/*#__PURE__*/
	(function() {
		function XReduceBy(valueFn, valueAcc, keyFn, xf) {
			this.valueFn = valueFn;
			this.valueAcc = valueAcc;
			this.keyFn = keyFn;
			this.xf = xf;
			this.inputs = {};
		}

		XReduceBy.prototype["@@transducer/init"] = _xfBase.init;

		XReduceBy.prototype["@@transducer/result"] = function(result) {
			var key;

			for (key in this.inputs) {
				if (_has(key, this.inputs)) {
					result = this.xf["@@transducer/step"](
						result,
						this.inputs[key]
					);

					if (result["@@transducer/reduced"]) {
						result = result["@@transducer/value"];
						break;
					}
				}
			}

			this.inputs = null;
			return this.xf["@@transducer/result"](result);
		};

		XReduceBy.prototype["@@transducer/step"] = function(result, input) {
			var key = this.keyFn(input);
			this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
			this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
			return result;
		};

		return XReduceBy;
	})();

var _xreduceBy =
	/*#__PURE__*/
	_curryN(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
		return new XReduceBy(valueFn, valueAcc, keyFn, xf);
	});

/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce
 * @example
 *
 *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
 *      var namesByGrade = reduceToNamesBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Lucy', score: 92},
 *                      {name: 'Drew', score: 85},
 *                      // ...
 *                      {name: 'Bart', score: 62}];
 *      namesByGrade(students);
 *      // {
 *      //   'A': ['Lucy'],
 *      //   'B': ['Drew']
 *      //   // ...,
 *      //   'F': ['Bart']
 *      // }
 */

var reduceBy =
	/*#__PURE__*/
	_curryN(
		4,
		[],
		/*#__PURE__*/
		_dispatchable([], _xreduceBy, function reduceBy(
			valueFn,
			valueAcc,
			keyFn,
			list
		) {
			return _reduce(
				function(acc, elt) {
					var key = keyFn(elt);
					acc[key] = valueFn(
						_has(key, acc) ? acc[key] : valueAcc,
						elt
					);
					return acc;
				},
				{},
				list
			);
		})
	);

/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */

var countBy =
	/*#__PURE__*/
	reduceBy(function(acc, elem) {
		return acc + 1;
	}, 0);

/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */

var dec =
	/*#__PURE__*/
	add(-1);

/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      var defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */

var defaultTo =
	/*#__PURE__*/
	_curry2(function defaultTo(d, v) {
		return v == null || v !== v ? d : v;
	});

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */

var difference =
	/*#__PURE__*/
	_curry2(function difference(first, second) {
		var out = [];
		var idx = 0;
		var firstLen = first.length;

		while (idx < firstLen) {
			if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
				out[out.length] = first[idx];
			}

			idx += 1;
		}

		return out;
	});

/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */

var dissoc =
	/*#__PURE__*/
	_curry2(function dissoc(prop, obj) {
		var result = {};

		for (var p in obj) {
			result[p] = obj[p];
		}

		delete result[prop];
		return result;
	});

/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */

var remove =
	/*#__PURE__*/
	_curry3(function remove(start, count, list) {
		var result = Array.prototype.slice.call(list, 0);
		result.splice(start, count);
		return result;
	});

/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
 *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */

var update =
	/*#__PURE__*/
	_curry3(function update(idx, x, list) {
		return adjust(always(x), idx, list);
	});

/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */

var dissocPath =
	/*#__PURE__*/
	_curry2(function dissocPath(path, obj) {
		switch (path.length) {
			case 0:
				return obj;

			case 1:
				return _isInteger(path[0])
					? remove(path[0], 1, obj)
					: dissoc(path[0], obj);

			default:
				var head = path[0];
				var tail = Array.prototype.slice.call(path, 1);

				if (obj[head] == null) {
					return obj;
				} else if (_isInteger(path[0])) {
					return update(head, dissocPath(tail, obj[head]), obj);
				} else {
					return assoc(head, dissocPath(tail, obj[head]), obj);
				}
		}
	});

var XDrop =
	/*#__PURE__*/
	(function() {
		function XDrop(n, xf) {
			this.xf = xf;
			this.n = n;
		}

		XDrop.prototype["@@transducer/init"] = _xfBase.init;
		XDrop.prototype["@@transducer/result"] = _xfBase.result;

		XDrop.prototype["@@transducer/step"] = function(result, input) {
			if (this.n > 0) {
				this.n -= 1;
				return result;
			}

			return this.xf["@@transducer/step"](result, input);
		};

		return XDrop;
	})();

var _xdrop =
	/*#__PURE__*/
	_curry2(function _xdrop(n, xf) {
		return new XDrop(n, xf);
	});

/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */

var drop =
	/*#__PURE__*/
	_curry2(
		/*#__PURE__*/
		_dispatchable(["drop"], _xdrop, function drop(n, xs) {
			return slice(Math.max(0, n), Infinity, xs);
		})
	);

var XTake =
	/*#__PURE__*/
	(function() {
		function XTake(n, xf) {
			this.xf = xf;
			this.n = n;
			this.i = 0;
		}

		XTake.prototype["@@transducer/init"] = _xfBase.init;
		XTake.prototype["@@transducer/result"] = _xfBase.result;

		XTake.prototype["@@transducer/step"] = function(result, input) {
			this.i += 1;
			var ret =
				this.n === 0
					? result
					: this.xf["@@transducer/step"](result, input);
			return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
		};

		return XTake;
	})();

var _xtake =
	/*#__PURE__*/
	_curry2(function _xtake(n, xf) {
		return new XTake(n, xf);
	});

/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      var personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      var takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */

var take =
	/*#__PURE__*/
	_curry2(
		/*#__PURE__*/
		_dispatchable(["take"], _xtake, function take(n, xs) {
			return slice(0, n < 0 ? Infinity : n, xs);
		})
	);

var XDropRepeatsWith =
	/*#__PURE__*/
	(function() {
		function XDropRepeatsWith(pred, xf) {
			this.xf = xf;
			this.pred = pred;
			this.lastValue = undefined;
			this.seenFirstValue = false;
		}

		XDropRepeatsWith.prototype["@@transducer/init"] = _xfBase.init;
		XDropRepeatsWith.prototype["@@transducer/result"] = _xfBase.result;

		XDropRepeatsWith.prototype["@@transducer/step"] = function(
			result,
			input
		) {
			var sameAsLast = false;

			if (!this.seenFirstValue) {
				this.seenFirstValue = true;
			} else if (this.pred(this.lastValue, input)) {
				sameAsLast = true;
			}

			this.lastValue = input;
			return sameAsLast
				? result
				: this.xf["@@transducer/step"](result, input);
		};

		return XDropRepeatsWith;
	})();

var _xdropRepeatsWith =
	/*#__PURE__*/
	_curry2(function _xdropRepeatsWith(pred, xf) {
		return new XDropRepeatsWith(pred, xf);
	});

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */

var nth =
	/*#__PURE__*/
	_curry2(function nth(offset, list) {
		var idx = offset < 0 ? list.length + offset : offset;
		return _isString(list) ? list.charAt(idx) : list[idx];
	});

/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */

var last =
	/*#__PURE__*/
	nth(-1);

/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */

var dropRepeatsWith =
	/*#__PURE__*/
	_curry2(
		/*#__PURE__*/
		_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(
			pred,
			list
		) {
			var result = [];
			var idx = 1;
			var len = list.length;

			if (len !== 0) {
				result[0] = list[0];

				while (idx < len) {
					if (!pred(last(result), list[idx])) {
						result[result.length] = list[idx];
					}

					idx += 1;
				}
			}

			return result;
		})
	);

/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */

var dropRepeats =
	/*#__PURE__*/
	_curry1(
		/*#__PURE__*/
		_dispatchable(
			[],
			/*#__PURE__*/
			_xdropRepeatsWith(equals),
			/*#__PURE__*/
			dropRepeatsWith(equals)
		)
	);

/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */

var or =
	/*#__PURE__*/
	_curry2(function or(a, b) {
		return a || b;
	});

/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      var gt10 = x => x > 10;
 *      var even = x => x % 2 === 0;
 *      var f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 */

var either =
	/*#__PURE__*/
	_curry2(function either(f, g) {
		return _isFunction(f)
			? function _either() {
					return f.apply(this, arguments) || g.apply(this, arguments);
			  }
			: lift(or)(f, g);
	});

/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */

var empty =
	/*#__PURE__*/
	_curry1(function empty(x) {
		return x != null && typeof x["fantasy-land/empty"] === "function"
			? x["fantasy-land/empty"]()
			: x != null &&
			  x.constructor != null &&
			  typeof x.constructor["fantasy-land/empty"] === "function"
				? x.constructor["fantasy-land/empty"]()
				: x != null && typeof x.empty === "function"
					? x.empty()
					: x != null &&
					  x.constructor != null &&
					  typeof x.constructor.empty === "function"
						? x.constructor.empty()
						: _isArray(x)
							? []
							: _isString(x)
								? ""
								: _isObject(x)
									? {}
									: _isArguments(x)
										? (function() {
												return arguments;
										  })() // else
										: void 0;
	});

/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */

var takeLast =
	/*#__PURE__*/
	_curry2(function takeLast(n, xs) {
		return drop(n >= 0 ? xs.length - n : 0, xs);
	});

/**
 * Checks if a list ends with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */

var endsWith =
	/*#__PURE__*/
	_curry2(function(suffix, list) {
		return equals(takeLast(suffix.length, list), suffix);
	});

var XFind =
	/*#__PURE__*/
	(function() {
		function XFind(f, xf) {
			this.xf = xf;
			this.f = f;
			this.found = false;
		}

		XFind.prototype["@@transducer/init"] = _xfBase.init;

		XFind.prototype["@@transducer/result"] = function(result) {
			if (!this.found) {
				result = this.xf["@@transducer/step"](result, void 0);
			}

			return this.xf["@@transducer/result"](result);
		};

		XFind.prototype["@@transducer/step"] = function(result, input) {
			if (this.f(input)) {
				this.found = true;
				result = _reduced(this.xf["@@transducer/step"](result, input));
			}

			return result;
		};

		return XFind;
	})();

var _xfind =
	/*#__PURE__*/
	_curry2(function _xfind(f, xf) {
		return new XFind(f, xf);
	});

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */

var find =
	/*#__PURE__*/
	_curry2(
		/*#__PURE__*/
		_dispatchable(["find"], _xfind, function find(fn, list) {
			var idx = 0;
			var len = list.length;

			while (idx < len) {
				if (fn(list[idx])) {
					return list[idx];
				}

				idx += 1;
			}
		})
	);

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */

var flatten =
	/*#__PURE__*/
	_curry1(
		/*#__PURE__*/
		_makeFlat(true)
	);

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      var mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */

var flip =
	/*#__PURE__*/
	_curry1(function flip(fn) {
		return curryN(fn.length, function(a, b) {
			var args = Array.prototype.slice.call(arguments, 0);
			args[0] = b;
			args[1] = a;
			return fn.apply(this, args);
		});
	});

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */

var fromPairs =
	/*#__PURE__*/
	_curry1(function fromPairs(pairs) {
		var result = {};
		var idx = 0;

		while (idx < pairs.length) {
			result[pairs[idx][0]] = pairs[idx][1];
			idx += 1;
		}

		return result;
	});

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> String) -> [a] -> {String: [a]}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.transduce
 * @example
 *
 *      var byGrade = R.groupBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */

var groupBy =
	/*#__PURE__*/
	_curry2(
		/*#__PURE__*/
		_checkForMethod(
			"groupBy",
			/*#__PURE__*/
			reduceBy(function(acc, item) {
				if (acc == null) {
					acc = [];
				}

				acc.push(item);
				return acc;
			}, null)
		)
	);

/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */

var gt =
	/*#__PURE__*/
	_curry2(function gt(a, b) {
		return a > b;
	});

/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */

var gte =
	/*#__PURE__*/
	_curry2(function gte(a, b) {
		return a >= b;
	});

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */

var head =
	/*#__PURE__*/
	nth(0);

function _identity(x) {
	return x;
}

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      var obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */

var identity =
	/*#__PURE__*/
	_curry1(_identity);

/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when
 * @example
 *
 *      var incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */

var ifElse =
	/*#__PURE__*/
	_curry3(function ifElse(condition, onTrue, onFalse) {
		return curryN(
			Math.max(condition.length, onTrue.length, onFalse.length),
			function _ifElse() {
				return condition.apply(this, arguments)
					? onTrue.apply(this, arguments)
					: onFalse.apply(this, arguments);
			}
		);
	});

/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */

var inc =
	/*#__PURE__*/
	add(1);

/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
 * @param {Function} fn Function :: a -> String
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */

var indexBy =
	/*#__PURE__*/
	reduceBy(function(acc, elem) {
		return elem;
	}, null);

/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */

var init =
	/*#__PURE__*/
	slice(0, -1);

var _Set =
	/*#__PURE__*/
	(function() {
		function _Set() {
			/* globals Set */
			this._nativeSet = typeof Set === "function" ? new Set() : null;
			this._items = {};
		} // until we figure out why jsdoc chokes on this
		// @param item The item to add to the Set
		// @returns {boolean} true if the item did not exist prior, otherwise false
		//

		_Set.prototype.add = function(item) {
			return !hasOrAdd(item, true, this);
		}; //
		// @param item The item to check for existence in the Set
		// @returns {boolean} true if the item exists in the Set, otherwise false
		//

		_Set.prototype.has = function(item) {
			return hasOrAdd(item, false, this);
		}; //
		// Combines the logic for checking whether an item is a member of the set and
		// for adding a new item to the set.
		//
		// @param item       The item to check or add to the Set instance.
		// @param shouldAdd  If true, the item will be added to the set if it doesn't
		//                   already exist.
		// @param set        The set instance to check or add to.
		// @return {boolean} true if the item already existed, otherwise false.
		//

		return _Set;
	})();

function hasOrAdd(item, shouldAdd, set) {
	var type = typeof item;
	var prevSize, newSize;

	switch (type) {
		case "string":
		case "number":
			// distinguish between +0 and -0
			if (item === 0 && 1 / item === -Infinity) {
				if (set._items["-0"]) {
					return true;
				} else {
					if (shouldAdd) {
						set._items["-0"] = true;
					}

					return false;
				}
			} // these types can all utilise the native Set

			if (set._nativeSet !== null) {
				if (shouldAdd) {
					prevSize = set._nativeSet.size;

					set._nativeSet.add(item);

					newSize = set._nativeSet.size;
					return newSize === prevSize;
				} else {
					return set._nativeSet.has(item);
				}
			} else {
				if (!(type in set._items)) {
					if (shouldAdd) {
						set._items[type] = {};
						set._items[type][item] = true;
					}

					return false;
				} else if (item in set._items[type]) {
					return true;
				} else {
					if (shouldAdd) {
						set._items[type][item] = true;
					}

					return false;
				}
			}

		case "boolean":
			// set._items['boolean'] holds a two element array
			// representing [ falseExists, trueExists ]
			if (type in set._items) {
				var bIdx = item ? 1 : 0;

				if (set._items[type][bIdx]) {
					return true;
				} else {
					if (shouldAdd) {
						set._items[type][bIdx] = true;
					}

					return false;
				}
			} else {
				if (shouldAdd) {
					set._items[type] = item ? [false, true] : [true, false];
				}

				return false;
			}

		case "function":
			// compare functions for reference equality
			if (set._nativeSet !== null) {
				if (shouldAdd) {
					prevSize = set._nativeSet.size;

					set._nativeSet.add(item);

					newSize = set._nativeSet.size;
					return newSize === prevSize;
				} else {
					return set._nativeSet.has(item);
				}
			} else {
				if (!(type in set._items)) {
					if (shouldAdd) {
						set._items[type] = [item];
					}

					return false;
				}

				if (!_contains(item, set._items[type])) {
					if (shouldAdd) {
						set._items[type].push(item);
					}

					return false;
				}

				return true;
			}

		case "undefined":
			if (set._items[type]) {
				return true;
			} else {
				if (shouldAdd) {
					set._items[type] = true;
				}

				return false;
			}

		case "object":
			if (item === null) {
				if (!set._items["null"]) {
					if (shouldAdd) {
						set._items["null"] = true;
					}

					return false;
				}

				return true;
			}

		/* falls through */

		default:
			// reduce the search size of heterogeneous sets by creating buckets
			// for each type.
			type = Object.prototype.toString.call(item);

			if (!(type in set._items)) {
				if (shouldAdd) {
					set._items[type] = [item];
				}

				return false;
			} // scan through all previously applied items

			if (!_contains(item, set._items[type])) {
				if (shouldAdd) {
					set._items[type].push(item);
				}

				return false;
			}

			return true;
	}
} // A simple Set type that honours R.equals semantics

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */

var uniqBy =
	/*#__PURE__*/
	_curry2(function uniqBy(fn, list) {
		var set = new _Set();
		var result = [];
		var idx = 0;
		var appliedItem, item;

		while (idx < list.length) {
			item = list[idx];
			appliedItem = fn(item);

			if (set.add(appliedItem)) {
				result.push(item);
			}

			idx += 1;
		}

		return result;
	});

/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */

var uniq =
	/*#__PURE__*/
	uniqBy(identity);

/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */

var intersection =
	/*#__PURE__*/
	_curry2(function intersection(list1, list2) {
		var lookupList, filteredList;

		if (list1.length > list2.length) {
			lookupList = list1;
			filteredList = list2;
		} else {
			lookupList = list2;
			filteredList = list1;
		}

		return uniq(_filter(flip(_contains)(lookupList), filteredList));
	});

function _objectAssign(target) {
	if (target == null) {
		throw new TypeError("Cannot convert undefined or null to object");
	}

	var output = Object(target);
	var idx = 1;
	var length = arguments.length;

	while (idx < length) {
		var source = arguments[idx];

		if (source != null) {
			for (var nextKey in source) {
				if (_has(nextKey, source)) {
					output[nextKey] = source[nextKey];
				}
			}
		}

		idx += 1;
	}

	return output;
}

var _assign =
	typeof Object.assign === "function" ? Object.assign : _objectAssign;

/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      var matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */

var objOf =
	/*#__PURE__*/
	_curry2(function objOf(key, val) {
		var obj = {};
		obj[key] = val;
		return obj;
	});

var _stepCatArray = {
	"@@transducer/init": Array,
	"@@transducer/step": function transducerStep(xs, x) {
		xs.push(x);
		return xs;
	},
	"@@transducer/result": _identity
};
var _stepCatString = {
	"@@transducer/init": String,
	"@@transducer/step": function transducerStep(a, b) {
		return a + b;
	},
	"@@transducer/result": _identity
};
var _stepCatObject = {
	"@@transducer/init": Object,
	"@@transducer/step": function transducerStep(result, input) {
		return _assign(
			result,
			_isArrayLike(input) ? objOf(input[0], input[1]) : input
		);
	},
	"@@transducer/result": _identity
};
function _stepCat(obj) {
	if (_isTransformer(obj)) {
		return obj;
	}

	if (_isArrayLike(obj)) {
		return _stepCatArray;
	}

	if (typeof obj === "string") {
		return _stepCatString;
	}

	if (typeof obj === "object") {
		return _stepCatObject;
	}

	throw new Error("Cannot create transformer for " + obj);
}

/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      var intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */

var into =
	/*#__PURE__*/
	_curry3(function into(acc, xf, list) {
		return _isTransformer(acc)
			? _reduce(xf(acc), acc["@@transducer/init"](), list)
			: _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
	});

/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of the method to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      var sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      var sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */

var invoker =
	/*#__PURE__*/
	_curry2(function invoker(arity, method) {
		return curryN(arity + 1, function() {
			var target = arguments[arity];

			if (target != null && _isFunction(target[method])) {
				return target[method].apply(
					target,
					Array.prototype.slice.call(arguments, 0, arity)
				);
			}

			throw new TypeError(
				toString$1(target) +
					' does not have a method named "' +
					method +
					'"'
			);
		});
	});

/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */

var is$1 =
	/*#__PURE__*/
	_curry2(function is(Ctor, val) {
		return (val != null && val.constructor === Ctor) || val instanceof Ctor;
	});

/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */

var isEmpty =
	/*#__PURE__*/
	_curry1(function isEmpty(x) {
		return x != null && equals(x, empty(x));
	});

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      var spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */

var join =
	/*#__PURE__*/
	invoker(1, "join");

/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      var getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */

var juxt =
	/*#__PURE__*/
	_curry1(function juxt(fns) {
		return converge(function() {
			return Array.prototype.slice.call(arguments, 0);
		}, fns);
	});

function _isNumber(x) {
	return Object.prototype.toString.call(x) === "[object Number]";
}

/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */

var length =
	/*#__PURE__*/
	_curry1(function length(list) {
		return list != null && _isNumber(list.length) ? list.length : NaN;
	});

/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */

var lens =
	/*#__PURE__*/
	_curry2(function lens(getter, setter) {
		return function(toFunctorFn) {
			return function(target) {
				return map(function(focus) {
					return setter(focus, target);
				}, toFunctorFn(getter(target)));
			};
		};
	});

/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */

var lensIndex =
	/*#__PURE__*/
	_curry1(function lensIndex(n) {
		return lens(nth(n), update(n));
	});

/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */

var lt =
	/*#__PURE__*/
	_curry2(function lt(a, b) {
		return a < b;
	});

/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */

var lte =
	/*#__PURE__*/
	_curry2(function lte(a, b) {
		return a <= b;
	});

/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      var values = { x: 1, y: 2, z: 3 };
 *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */

var mapObjIndexed =
	/*#__PURE__*/
	_curry2(function mapObjIndexed(fn, obj) {
		return _reduce(
			function(acc, key) {
				acc[key] = fn(obj[key], key, obj);
				return acc;
			},
			{},
			keys(obj)
		);
	});

/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */

var sum =
	/*#__PURE__*/
	reduce(add, 0);

/**
 * A customisable version of [`R.memoize`](#memoize). `memoizeWith` takes an
 * additional function that will be applied to a given argument set and used to
 * create the cache key under which the results of the function to be memoized
 * will be stored. Care must be taken when implementing key generation to avoid
 * clashes that may overwrite previous entries erroneously.
 *
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @see R.memoize
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoizeWith(R.identity, n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */

var memoizeWith =
	/*#__PURE__*/
	_curry2(function memoizeWith(mFn, fn) {
		var cache = {};
		return _arity(fn.length, function() {
			var key = mFn.apply(this, arguments);

			if (!_has(key, cache)) {
				cache[key] = fn.apply(this, arguments);
			}

			return cache[key];
		});
	});

/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @see R.memoizeWith
 * @deprecated since v0.25.0
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoize(n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */

var memoize =
	/*#__PURE__*/
	memoizeWith(function() {
		return toString$1(arguments);
	});

/**
 * Merges a list of objects together into one object.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */

var mergeAll =
	/*#__PURE__*/
	_curry1(function mergeAll(list) {
		return _assign.apply(null, [{}].concat(list));
	});

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */

var mergeWithKey =
	/*#__PURE__*/
	_curry3(function mergeWithKey(fn, l, r) {
		var result = {};
		var k;

		for (k in l) {
			if (_has(k, l)) {
				result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
			}
		}

		for (k in r) {
			if (_has(k, r) && !_has(k, result)) {
				result[k] = r[k];
			}
		}

		return result;
	});

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeep, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */

var mergeDeepWithKey =
	/*#__PURE__*/
	_curry3(function mergeDeepWithKey(fn, lObj, rObj) {
		return mergeWithKey(
			function(k, lVal, rVal) {
				if (_isObject(lVal) && _isObject(rVal)) {
					return mergeDeepWithKey(fn, lVal, rVal);
				} else {
					return fn(k, lVal, rVal);
				}
			},
			lObj,
			rObj
		);
	});

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                      { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */

var mergeDeepLeft =
	/*#__PURE__*/
	_curry2(function mergeDeepLeft(lObj, rObj) {
		return mergeDeepWithKey(
			function(k, lVal, rVal) {
				return lVal;
			},
			lObj,
			rObj
		);
	});

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */

var mergeDeepRight =
	/*#__PURE__*/
	_curry2(function mergeDeepRight(lObj, rObj) {
		return mergeDeepWithKey(
			function(k, lVal, rVal) {
				return rVal;
			},
			lObj,
			rObj
		);
	});

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWith, R.mergeDeep, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepWith(R.concat,
 *                      { a: true, c: { values: [10, 20] }},
 *                      { b: true, c: { values: [15, 35] }});
 *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */

var mergeDeepWith =
	/*#__PURE__*/
	_curry3(function mergeDeepWith(fn, lObj, rObj) {
		return mergeDeepWithKey(
			function(k, lVal, rVal) {
				return fn(lVal, rVal);
			},
			lObj,
			rObj
		);
	});

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      var double = R.multiply(2);
 *      var triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */

var multiply =
	/*#__PURE__*/
	_curry2(function multiply(a, b) {
		return a * b;
	});

/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */

var nthArg =
	/*#__PURE__*/
	_curry1(function nthArg(n) {
		var arity = n < 0 ? 1 : n + 1;
		return curryN(arity, function() {
			return nth(n, arguments);
		});
	});

/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      var classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      var yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */

var o =
	/*#__PURE__*/
	_curry3(function o(f, g, x) {
		return f(g(x));
	});

function _of(x) {
	return [x];
}

/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */

var of =
	/*#__PURE__*/
	_curry1(_of);

// transforms the held value with the provided function.

var Identity = function Identity(x) {
	return {
		value: x,
		map: function map(f) {
			return Identity(f(x));
		}
	};
};
/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */

var over =
	/*#__PURE__*/
	_curry3(function over(lens, f, x) {
		// The value returned by the getter function is first transformed with `f`,
		// then set as the value of an `Identity`. This is then mapped over with the
		// setter function of the lens.
		return lens(function(y) {
			return Identity(f(y));
		})(x).value;
	});

function _createPartialApplicator(concat) {
	return _curry2(function(fn, args) {
		return _arity(Math.max(0, fn.length - args.length), function() {
			return fn.apply(this, concat(args, arguments));
		});
	});
}

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */

var partialRight =
	/*#__PURE__*/
	_createPartialApplicator(
		/*#__PURE__*/
		flip(_concat)
	);

/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */

var partition =
	/*#__PURE__*/
	juxt([filter, reject]);

/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      var user1 = { address: { zipCode: 90210 } };
 *      var user2 = { address: { zipCode: 55555 } };
 *      var user3 = { name: 'Bob' };
 *      var users = [ user1, user2, user3 ];
 *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */

var pathEq =
	/*#__PURE__*/
	_curry3(function pathEq(_path, val, obj) {
		return equals(path(_path, obj), val);
	});

/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */

var pathOr =
	/*#__PURE__*/
	_curry3(function pathOr(d, p, obj) {
		return defaultTo(d, path(p, obj));
	});

/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 */

var pathSatisfies =
	/*#__PURE__*/
	_curry3(function pathSatisfies(pred, propPath, obj) {
		return propPath.length > 0 && pred(path(propPath, obj));
	});

/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */

var pickAll =
	/*#__PURE__*/
	_curry2(function pickAll(names, obj) {
		var result = {};
		var idx = 0;
		var len = names.length;

		while (idx < len) {
			var name = names[idx];
			result[name] = obj[name];
			idx += 1;
		}

		return result;
	});

/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */

var prepend =
	/*#__PURE__*/
	_curry2(function prepend(el, list) {
		return _concat([el], list);
	});

/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */

var product =
	/*#__PURE__*/
	reduce(multiply, 1);

/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */

var useWith =
	/*#__PURE__*/
	_curry2(function useWith(fn, transformers) {
		return curryN(transformers.length, function() {
			var args = [];
			var idx = 0;

			while (idx < transformers.length) {
				args.push(transformers[idx].call(this, arguments[idx]));
				idx += 1;
			}

			return fn.apply(
				this,
				args.concat(
					Array.prototype.slice.call(arguments, transformers.length)
				)
			);
		});
	});

/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      var kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */

var project =
	/*#__PURE__*/
	useWith(_map, [pickAll, identity]); // passing `identity` gives correct arity

/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.whereEq, R.propSatisfies, R.equals
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      var kids = [abby, fred, rusty, alois];
 *      var hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */

var propEq =
	/*#__PURE__*/
	_curry3(function propEq(name, val, obj) {
		return equals(val, obj[name]);
	});

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.where, R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */

var propSatisfies =
	/*#__PURE__*/
	_curry3(function propSatisfies(pred, name, obj) {
		return pred(obj[name]);
	});

/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */

var times =
	/*#__PURE__*/
	_curry2(function times(fn, n) {
		var len = Number(n);
		var idx = 0;
		var list;

		if (len < 0 || isNaN(len)) {
			throw new RangeError("n must be a non-negative number");
		}

		list = new Array(len);

		while (idx < len) {
			list[idx] = fn(idx);
			idx += 1;
		}

		return list;
	});

/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @see R.times
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      var obj = {};
 *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */

var repeat =
	/*#__PURE__*/
	_curry2(function repeat(value, n) {
		return times(always(value), n);
	});

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */

var set =
	/*#__PURE__*/
	_curry3(function set(lens, v, x) {
		return over(lens, always(v), x);
	});

/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `str`.
 * @see R.join
 * @example
 *
 *      var pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */

var split =
	/*#__PURE__*/
	invoker(1, "split");

/**
 * Checks if a list starts with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */

var startsWith =
	/*#__PURE__*/
	_curry2(function(prefix, list) {
		return equals(take(prefix.length, list), prefix);
	});

var XTap =
	/*#__PURE__*/
	(function() {
		function XTap(f, xf) {
			this.xf = xf;
			this.f = f;
		}

		XTap.prototype["@@transducer/init"] = _xfBase.init;
		XTap.prototype["@@transducer/result"] = _xfBase.result;

		XTap.prototype["@@transducer/step"] = function(result, input) {
			this.f(input);
			return this.xf["@@transducer/step"](result, input);
		};

		return XTap;
	})();

var _xtap =
	/*#__PURE__*/
	_curry2(function _xtap(f, xf) {
		return new XTap(f, xf);
	});

/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      var sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */

var tap =
	/*#__PURE__*/
	_curry2(
		/*#__PURE__*/
		_dispatchable([], _xtap, function tap(fn, x) {
			fn(x);
			return x;
		})
	);

function _isRegExp(x) {
	return Object.prototype.toString.call(x) === "[object RegExp]";
}

/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */

var test =
	/*#__PURE__*/
	_curry2(function test(pattern, str) {
		if (!_isRegExp(pattern)) {
			throw new TypeError(
				"‘test’ requires a value of type RegExp as its first argument; received " +
					toString$1(pattern)
			);
		}

		return _cloneRegExp(pattern).test(str);
	});

/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */

var toLower =
	/*#__PURE__*/
	invoker(0, "toLowerCase");

/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */

var toPairs =
	/*#__PURE__*/
	_curry1(function toPairs(obj) {
		var pairs = [];

		for (var prop in obj) {
			if (_has(prop, obj)) {
				pairs[pairs.length] = [prop, obj[prop]];
			}
		}

		return pairs;
	});

/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */

var toUpper =
	/*#__PURE__*/
	invoker(0, "toUpperCase");

/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      var isOdd = (x) => x % 2 === 1;
 *      var firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 */

var transduce =
	/*#__PURE__*/
	curryN(4, function transduce(xf, fn, acc, list) {
		return _reduce(
			xf(typeof fn === "function" ? _xwrap(fn) : fn),
			acc,
			list
		);
	});

var ws =
	"\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
	"\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
	"\u2029\uFEFF";
var zeroWidth = "\u200B";
var hasProtoTrim = typeof String.prototype.trim === "function";
/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */

var _trim =
	!hasProtoTrim ||
	/*#__PURE__*/
	ws.trim() ||
	!/*#__PURE__*/
	zeroWidth.trim()
		? function trim(str) {
				var beginRx = new RegExp("^[" + ws + "][" + ws + "]*");
				var endRx = new RegExp("[" + ws + "][" + ws + "]*$");
				return str.replace(beginRx, "").replace(endRx, "");
		  }
		: function trim(str) {
				return str.trim();
		  };

/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */

var unapply =
	/*#__PURE__*/
	_curry1(function unapply(fn) {
		return function() {
			return fn(Array.prototype.slice.call(arguments, 0));
		};
	});

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */

var union =
	/*#__PURE__*/
	_curry2(
		/*#__PURE__*/
		compose$1(uniq, _concat)
	);

/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */

var unnest =
	/*#__PURE__*/
	chain(_identity);

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */

var until =
	/*#__PURE__*/
	_curry3(function until(pred, fn, init) {
		var val = init;

		while (!pred(val)) {
			val = fn(val);
		}

		return val;
	});

var Const = function Const(x) {
	return {
		value: x,
		"fantasy-land/map": function fantasyLandMap() {
			return this;
		}
	};
};
/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */

var view =
	/*#__PURE__*/
	_curry2(function view(lens, x) {
		// Using `Const` effectively ignores the setter function of the `lens`,
		// leaving the value returned by the getter function unmodified.
		return lens(Const)(x).value;
	});

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless
 * @example
 *
 *      // truncate :: String -> String
 *      var truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */

var when =
	/*#__PURE__*/
	_curry3(function when(pred, whenTrueFn, x) {
		return pred(x) ? whenTrueFn(x) : x;
	});

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */

var xprod =
	/*#__PURE__*/
	_curry2(function xprod(a, b) {
		// = xprodWith(prepend); (takes about 3 times as long...)
		var idx = 0;
		var ilen = a.length;
		var j;
		var jlen = b.length;
		var result = [];

		while (idx < ilen) {
			j = 0;

			while (j < jlen) {
				result[result.length] = [a[idx], b[j]];
				j += 1;
			}

			idx += 1;
		}

		return result;
	});

function createCommonjsModule$1(fn, module) {
	return (
		(module = {
			exports: {}
		}),
		fn(module, module.exports),
		module.exports
	);
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols$2 = Object.getOwnPropertySymbols;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var propIsEnumerable$1 = Object.prototype.propertyIsEnumerable;

function toObject$1(val) {
	if (val === null || val === undefined) {
		throw new TypeError(
			"Object.assign cannot be called with null or undefined"
		);
	}

	return Object(val);
}

function shouldUseNative$1() {
	try {
		if (!Object.assign) {
			return false;
		} // Detect buggy property enumeration order in older V8 versions.
		// https://bugs.chromium.org/p/v8/issues/detail?id=4118

		var test1 = new String("abc"); // eslint-disable-line no-new-wrappers

		test1[5] = "de";

		if (Object.getOwnPropertyNames(test1)[0] === "5") {
			return false;
		} // https://bugs.chromium.org/p/v8/issues/detail?id=3056

		var test2 = {};

		for (var i = 0; i < 10; i++) {
			test2["_" + String.fromCharCode(i)] = i;
		}

		var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
			return test2[n];
		});

		if (order2.join("") !== "0123456789") {
			return false;
		} // https://bugs.chromium.org/p/v8/issues/detail?id=3056

		var test3 = {};
		"abcdefghijklmnopqrst".split("").forEach(function(letter) {
			test3[letter] = letter;
		});

		if (
			Object.keys(Object.assign({}, test3)).join("") !==
			"abcdefghijklmnopqrst"
		) {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign$1 = shouldUseNative$1()
	? Object.assign
	: function(target, source) {
			var from;
			var to = toObject$1(target);
			var symbols;

			for (var s = 1; s < arguments.length; s++) {
				from = Object(arguments[s]);

				for (var key in from) {
					if (hasOwnProperty$1.call(from, key)) {
						to[key] = from[key];
					}
				}

				if (getOwnPropertySymbols$2) {
					symbols = getOwnPropertySymbols$2(from);

					for (var i = 0; i < symbols.length; i++) {
						if (propIsEnumerable$1.call(from, symbols[i])) {
							to[symbols[i]] = from[symbols[i]];
						}
					}
				}
			}

			return to;
	  };
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1$1 = ReactPropTypesSecret$2;

var printWarning$2 = function printWarning() {};

if (process.env.NODE_ENV !== "production") {
	var ReactPropTypesSecret$1$1 = ReactPropTypesSecret_1$1;
	var loggedTypeFailures$1 = {};

	printWarning$2 = function printWarning(text) {
		var message = "Warning: " + text;

		if (typeof console !== "undefined") {
			console.error(message);
		}

		try {
			// --- Welcome to debugging React ---
			// This error was thrown as a convenience so that you can use this stack
			// to find the callsite that caused this warning to fire.
			throw new Error(message);
		} catch (x) {}
	};
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */

function checkPropTypes$1(
	typeSpecs,
	values,
	location,
	componentName,
	getStack
) {
	if (process.env.NODE_ENV !== "production") {
		for (var typeSpecName in typeSpecs) {
			if (typeSpecs.hasOwnProperty(typeSpecName)) {
				var error; // Prop type validation may throw. In case they do, we don't want to
				// fail the render phase where it didn't fail before. So we log it.
				// After these have been cleaned up, we'll let them throw.

				try {
					// This is intentionally an invariant that gets caught. It's the same
					// behavior as without this statement except with a better message.
					if (typeof typeSpecs[typeSpecName] !== "function") {
						var err = Error(
							(componentName || "React class") +
								": " +
								location +
								" type `" +
								typeSpecName +
								"` is invalid; " +
								"it must be a function, usually from the `prop-types` package, but received `" +
								typeof typeSpecs[typeSpecName] +
								"`."
						);
						err.name = "Invariant Violation";
						throw err;
					}

					error = typeSpecs[typeSpecName](
						values,
						typeSpecName,
						componentName,
						location,
						null,
						ReactPropTypesSecret$1$1
					);
				} catch (ex) {
					error = ex;
				}

				if (error && !(error instanceof Error)) {
					printWarning$2(
						(componentName || "React class") +
							": type specification of " +
							location +
							" `" +
							typeSpecName +
							"` is invalid; the type checker " +
							"function must return `null` or an `Error` but returned a " +
							typeof error +
							". " +
							"You may have forgotten to pass an argument to the type checker " +
							"creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
							"shape all require an argument)."
					);
				}

				if (
					error instanceof Error &&
					!(error.message in loggedTypeFailures$1)
				) {
					// Only monitor this failure once because there tends to be a lot of the
					// same error.
					loggedTypeFailures$1[error.message] = true;
					var stack = getStack ? getStack() : "";
					printWarning$2(
						"Failed " +
							location +
							" type: " +
							error.message +
							(stack != null ? stack : "")
					);
				}
			}
		}
	}
}

var checkPropTypes_1$1 = checkPropTypes$1;

var printWarning$1$1 = function printWarning$1() {};

if (process.env.NODE_ENV !== "production") {
	printWarning$1$1 = function printWarning$1(text) {
		var message = "Warning: " + text;

		if (typeof console !== "undefined") {
			console.error(message);
		}

		try {
			// --- Welcome to debugging React ---
			// This error was thrown as a convenience so that you can use this stack
			// to find the callsite that caused this warning to fire.
			throw new Error(message);
		} catch (x) {}
	};
}

function emptyFunctionThatReturnsNull$1() {
	return null;
}

var factoryWithTypeCheckers$1 = function factoryWithTypeCheckers(
	isValidElement,
	throwOnDirectAccess
) {
	/* global Symbol */
	var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = "@@iterator"; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */

	function getIteratorFn(maybeIterable) {
		var iteratorFn =
			maybeIterable &&
			((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) ||
				maybeIterable[FAUX_ITERATOR_SYMBOL]);

		if (typeof iteratorFn === "function") {
			return iteratorFn;
		}
	}
	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = "<<anonymous>>"; // Important!
	// Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

	var ReactPropTypes = {
		array: createPrimitiveTypeChecker("array"),
		bool: createPrimitiveTypeChecker("boolean"),
		func: createPrimitiveTypeChecker("function"),
		number: createPrimitiveTypeChecker("number"),
		object: createPrimitiveTypeChecker("object"),
		string: createPrimitiveTypeChecker("string"),
		symbol: createPrimitiveTypeChecker("symbol"),
		any: createAnyTypeChecker(),
		arrayOf: createArrayOfTypeChecker,
		element: createElementTypeChecker(),
		instanceOf: createInstanceTypeChecker,
		node: createNodeChecker(),
		objectOf: createObjectOfTypeChecker,
		oneOf: createEnumTypeChecker,
		oneOfType: createUnionTypeChecker,
		shape: createShapeTypeChecker,
		exact: createStrictShapeTypeChecker
	};
	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */

	/*eslint-disable no-self-compare*/

	function is(x, y) {
		// SameValue algorithm
		if (x === y) {
			// Steps 1-5, 7-10
			// Steps 6.b-6.e: +0 != -0
			return x !== 0 || 1 / x === 1 / y;
		} else {
			// Step 6.a: NaN == NaN
			return x !== x && y !== y;
		}
	}
	/*eslint-enable no-self-compare*/

	/**
	 * We use an Error-like object for backward compatibility as people may call
	 * PropTypes directly and inspect their output. However, we don't use real
	 * Errors anymore. We don't inspect their stack anyway, and creating them
	 * is prohibitively expensive if they are created too often, such as what
	 * happens in oneOfType() for any type before the one that matched.
	 */

	function PropTypeError(message) {
		this.message = message;
		this.stack = "";
	} // Make `instanceof Error` still work for returned errors.

	PropTypeError.prototype = Error.prototype;

	function createChainableTypeChecker(validate) {
		if (process.env.NODE_ENV !== "production") {
			var manualPropTypeCallCache = {};
			var manualPropTypeWarningCount = 0;
		}

		function checkType(
			isRequired,
			props,
			propName,
			componentName,
			location,
			propFullName,
			secret
		) {
			componentName = componentName || ANONYMOUS;
			propFullName = propFullName || propName;

			if (secret !== ReactPropTypesSecret_1$1) {
				if (throwOnDirectAccess) {
					// New behavior only for users of `prop-types` package
					var err = new Error(
						"Calling PropTypes validators directly is not supported by the `prop-types` package. " +
							"Use `PropTypes.checkPropTypes()` to call them. " +
							"Read more at http://fb.me/use-check-prop-types"
					);
					err.name = "Invariant Violation";
					throw err;
				} else if (
					process.env.NODE_ENV !== "production" &&
					typeof console !== "undefined"
				) {
					// Old behavior for people using React.PropTypes
					var cacheKey = componentName + ":" + propName;

					if (
						!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
						manualPropTypeWarningCount < 3
					) {
						printWarning$1$1(
							"You are manually calling a React.PropTypes validation " +
								"function for the `" +
								propFullName +
								"` prop on `" +
								componentName +
								"`. This is deprecated " +
								"and will throw in the standalone `prop-types` package. " +
								"You may be seeing this warning due to a third-party PropTypes " +
								"library. See https://fb.me/react-warning-dont-call-proptypes " +
								"for details."
						);
						manualPropTypeCallCache[cacheKey] = true;
						manualPropTypeWarningCount++;
					}
				}
			}

			if (props[propName] == null) {
				if (isRequired) {
					if (props[propName] === null) {
						return new PropTypeError(
							"The " +
								location +
								" `" +
								propFullName +
								"` is marked as required " +
								("in `" +
									componentName +
									"`, but its value is `null`.")
						);
					}

					return new PropTypeError(
						"The " +
							location +
							" `" +
							propFullName +
							"` is marked as required in " +
							("`" +
								componentName +
								"`, but its value is `undefined`.")
					);
				}

				return null;
			} else {
				return validate(
					props,
					propName,
					componentName,
					location,
					propFullName
				);
			}
		}

		var chainedCheckType = checkType.bind(null, false);
		chainedCheckType.isRequired = checkType.bind(null, true);
		return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName,
			secret
		) {
			var propValue = props[propName];
			var propType = getPropType(propValue);

			if (propType !== expectedType) {
				// `propValue` being instance of, say, date/regexp, pass the 'object'
				// check, but we can offer a more precise error message here rather than
				// 'of type `object`'.
				var preciseType = getPreciseType(propValue);
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type " +
						("`" +
							preciseType +
							"` supplied to `" +
							componentName +
							"`, expected ") +
						("`" + expectedType + "`.")
				);
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
		return createChainableTypeChecker(emptyFunctionThatReturnsNull$1);
	}

	function createArrayOfTypeChecker(typeChecker) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			if (typeof typeChecker !== "function") {
				return new PropTypeError(
					"Property `" +
						propFullName +
						"` of component `" +
						componentName +
						"` has invalid PropType notation inside arrayOf."
				);
			}

			var propValue = props[propName];

			if (!Array.isArray(propValue)) {
				var propType = getPropType(propValue);
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type " +
						("`" +
							propType +
							"` supplied to `" +
							componentName +
							"`, expected an array.")
				);
			}

			for (var i = 0; i < propValue.length; i++) {
				var error = typeChecker(
					propValue,
					i,
					componentName,
					location,
					propFullName + "[" + i + "]",
					ReactPropTypesSecret_1$1
				);

				if (error instanceof Error) {
					return error;
				}
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			var propValue = props[propName];

			if (!isValidElement(propValue)) {
				var propType = getPropType(propValue);
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type " +
						("`" +
							propType +
							"` supplied to `" +
							componentName +
							"`, expected a single ReactElement.")
				);
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			if (!(props[propName] instanceof expectedClass)) {
				var expectedClassName = expectedClass.name || ANONYMOUS;
				var actualClassName = getClassName(props[propName]);
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type " +
						("`" +
							actualClassName +
							"` supplied to `" +
							componentName +
							"`, expected ") +
						("instance of `" + expectedClassName + "`.")
				);
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
		if (!Array.isArray(expectedValues)) {
			process.env.NODE_ENV !== "production"
				? printWarning$1$1(
						"Invalid argument supplied to oneOf, expected an instance of array."
				  )
				: void 0;
			return emptyFunctionThatReturnsNull$1;
		}

		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			var propValue = props[propName];

			for (var i = 0; i < expectedValues.length; i++) {
				if (is(propValue, expectedValues[i])) {
					return null;
				}
			}

			var valuesString = JSON.stringify(expectedValues);
			return new PropTypeError(
				"Invalid " +
					location +
					" `" +
					propFullName +
					"` of value `" +
					propValue +
					"` " +
					("supplied to `" +
						componentName +
						"`, expected one of " +
						valuesString +
						".")
			);
		}

		return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			if (typeof typeChecker !== "function") {
				return new PropTypeError(
					"Property `" +
						propFullName +
						"` of component `" +
						componentName +
						"` has invalid PropType notation inside objectOf."
				);
			}

			var propValue = props[propName];
			var propType = getPropType(propValue);

			if (propType !== "object") {
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type " +
						("`" +
							propType +
							"` supplied to `" +
							componentName +
							"`, expected an object.")
				);
			}

			for (var key in propValue) {
				if (propValue.hasOwnProperty(key)) {
					var error = typeChecker(
						propValue,
						key,
						componentName,
						location,
						propFullName + "." + key,
						ReactPropTypesSecret_1$1
					);

					if (error instanceof Error) {
						return error;
					}
				}
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
		if (!Array.isArray(arrayOfTypeCheckers)) {
			process.env.NODE_ENV !== "production"
				? printWarning$1$1(
						"Invalid argument supplied to oneOfType, expected an instance of array."
				  )
				: void 0;
			return emptyFunctionThatReturnsNull$1;
		}

		for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
			var checker = arrayOfTypeCheckers[i];

			if (typeof checker !== "function") {
				printWarning$1$1(
					"Invalid argument supplied to oneOfType. Expected an array of check functions, but " +
						"received " +
						getPostfixForTypeWarning(checker) +
						" at index " +
						i +
						"."
				);
				return emptyFunctionThatReturnsNull$1;
			}
		}

		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
				var checker = arrayOfTypeCheckers[i];

				if (
					checker(
						props,
						propName,
						componentName,
						location,
						propFullName,
						ReactPropTypesSecret_1$1
					) == null
				) {
					return null;
				}
			}

			return new PropTypeError(
				"Invalid " +
					location +
					" `" +
					propFullName +
					"` supplied to " +
					("`" + componentName + "`.")
			);
		}

		return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			if (!isNode(props[propName])) {
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` supplied to " +
						("`" + componentName + "`, expected a ReactNode.")
				);
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			var propValue = props[propName];
			var propType = getPropType(propValue);

			if (propType !== "object") {
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type `" +
						propType +
						"` " +
						("supplied to `" +
							componentName +
							"`, expected `object`.")
				);
			}

			for (var key in shapeTypes) {
				var checker = shapeTypes[key];

				if (!checker) {
					continue;
				}

				var error = checker(
					propValue,
					key,
					componentName,
					location,
					propFullName + "." + key,
					ReactPropTypesSecret_1$1
				);

				if (error) {
					return error;
				}
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function createStrictShapeTypeChecker(shapeTypes) {
		function validate(
			props,
			propName,
			componentName,
			location,
			propFullName
		) {
			var propValue = props[propName];
			var propType = getPropType(propValue);

			if (propType !== "object") {
				return new PropTypeError(
					"Invalid " +
						location +
						" `" +
						propFullName +
						"` of type `" +
						propType +
						"` " +
						("supplied to `" +
							componentName +
							"`, expected `object`.")
				);
			} // We need to check all keys in case some are required but missing from
			// props.

			var allKeys = objectAssign$1({}, props[propName], shapeTypes);

			for (var key in allKeys) {
				var checker = shapeTypes[key];

				if (!checker) {
					return new PropTypeError(
						"Invalid " +
							location +
							" `" +
							propFullName +
							"` key `" +
							key +
							"` supplied to `" +
							componentName +
							"`." +
							"\nBad object: " +
							JSON.stringify(props[propName], null, "  ") +
							"\nValid keys: " +
							JSON.stringify(Object.keys(shapeTypes), null, "  ")
					);
				}

				var error = checker(
					propValue,
					key,
					componentName,
					location,
					propFullName + "." + key,
					ReactPropTypesSecret_1$1
				);

				if (error) {
					return error;
				}
			}

			return null;
		}

		return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
		switch (typeof propValue) {
			case "number":
			case "string":
			case "undefined":
				return true;

			case "boolean":
				return !propValue;

			case "object":
				if (Array.isArray(propValue)) {
					return propValue.every(isNode);
				}

				if (propValue === null || isValidElement(propValue)) {
					return true;
				}

				var iteratorFn = getIteratorFn(propValue);

				if (iteratorFn) {
					var iterator = iteratorFn.call(propValue);
					var step;

					if (iteratorFn !== propValue.entries) {
						while (!(step = iterator.next()).done) {
							if (!isNode(step.value)) {
								return false;
							}
						}
					} else {
						// Iterator will provide entry [k,v] tuples rather than values.
						while (!(step = iterator.next()).done) {
							var entry = step.value;

							if (entry) {
								if (!isNode(entry[1])) {
									return false;
								}
							}
						}
					}
				} else {
					return false;
				}

				return true;

			default:
				return false;
		}
	}

	function isSymbol(propType, propValue) {
		// Native Symbol.
		if (propType === "symbol") {
			return true;
		} // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'

		if (propValue["@@toStringTag"] === "Symbol") {
			return true;
		} // Fallback for non-spec compliant Symbols which are polyfilled.

		if (typeof Symbol === "function" && propValue instanceof Symbol) {
			return true;
		}

		return false;
	} // Equivalent of `typeof` but with special handling for array and regexp.

	function getPropType(propValue) {
		var propType = typeof propValue;

		if (Array.isArray(propValue)) {
			return "array";
		}

		if (propValue instanceof RegExp) {
			// Old webkits (at least until Android 4.0) return 'function' rather than
			// 'object' for typeof a RegExp. We'll normalize this here so that /bla/
			// passes PropTypes.object.
			return "object";
		}

		if (isSymbol(propType, propValue)) {
			return "symbol";
		}

		return propType;
	} // This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.

	function getPreciseType(propValue) {
		if (typeof propValue === "undefined" || propValue === null) {
			return "" + propValue;
		}

		var propType = getPropType(propValue);

		if (propType === "object") {
			if (propValue instanceof Date) {
				return "date";
			} else if (propValue instanceof RegExp) {
				return "regexp";
			}
		}

		return propType;
	} // Returns a string that is postfixed to a warning about an invalid type.
	// For example, "undefined" or "of type array"

	function getPostfixForTypeWarning(value) {
		var type = getPreciseType(value);

		switch (type) {
			case "array":
			case "object":
				return "an " + type;

			case "boolean":
			case "date":
			case "regexp":
				return "a " + type;

			default:
				return type;
		}
	} // Returns class name of the object, if any.

	function getClassName(propValue) {
		if (!propValue.constructor || !propValue.constructor.name) {
			return ANONYMOUS;
		}

		return propValue.constructor.name;
	}

	ReactPropTypes.checkPropTypes = checkPropTypes_1$1;
	ReactPropTypes.PropTypes = ReactPropTypes;
	return ReactPropTypes;
};

function emptyFunction$1() {}

var factoryWithThrowingShims$1 = function factoryWithThrowingShims() {
	function shim(
		props,
		propName,
		componentName,
		location,
		propFullName,
		secret
	) {
		if (secret === ReactPropTypesSecret_1$1) {
			// It is still safe when called from React.
			return;
		}

		var err = new Error(
			"Calling PropTypes validators directly is not supported by the `prop-types` package. " +
				"Use PropTypes.checkPropTypes() to call them. " +
				"Read more at http://fb.me/use-check-prop-types"
		);
		err.name = "Invariant Violation";
		throw err;
	}

	shim.isRequired = shim;

	function getShim() {
		return shim;
	} // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

	var ReactPropTypes = {
		array: shim,
		bool: shim,
		func: shim,
		number: shim,
		object: shim,
		string: shim,
		symbol: shim,
		any: shim,
		arrayOf: getShim,
		element: shim,
		instanceOf: getShim,
		node: shim,
		objectOf: getShim,
		oneOf: getShim,
		oneOfType: getShim,
		shape: getShim,
		exact: getShim
	};
	ReactPropTypes.checkPropTypes = emptyFunction$1;
	ReactPropTypes.PropTypes = ReactPropTypes;
	return ReactPropTypes;
};

var propTypes$1 = createCommonjsModule$1(function(module) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	if (process.env.NODE_ENV !== "production") {
		var REACT_ELEMENT_TYPE =
			(typeof Symbol === "function" &&
				Symbol.for &&
				Symbol.for("react.element")) ||
			0xeac7;

		var isValidElement = function isValidElement(object) {
			return (
				typeof object === "object" &&
				object !== null &&
				object.$$typeof === REACT_ELEMENT_TYPE
			);
		}; // By explicitly using `prop-types` you are opting into new development behavior.
		// http://fb.me/prop-types-in-prod

		var throwOnDirectAccess = true;
		module.exports = factoryWithTypeCheckers$1(
			isValidElement,
			throwOnDirectAccess
		);
	} else {
		// By explicitly using `prop-types` you are opting into new production behavior.
		// http://fb.me/prop-types-in-prod
		module.exports = factoryWithThrowingShims$1();
	}
});
var RouteShape = {
	getComponent: propTypes$1.func.isRequired,
	path: propTypes$1.string.isRequired
};
var ConfigShape = {
	descriptor: propTypes$1.shape({
		container: propTypes$1.string,
		data: propTypes$1.object,
		namespace: propTypes$1.string,
		widget: propTypes$1.string.isRequired
	}).isRequired,
	// covers both class and functional components
	component: propTypes$1.func.isRequired
};

function _isPlaceholder$1(a) {
	return (
		a != null &&
		typeof a === "object" &&
		a["@@functional/placeholder"] === true
	);
}

var _isPlaceholder_1 = _isPlaceholder$1;
/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry1$1(fn) {
	return function f1(a) {
		if (arguments.length === 0 || _isPlaceholder_1(a)) {
			return f1;
		} else {
			return fn.apply(this, arguments);
		}
	};
}

var _curry1_1 = _curry1$1;
/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      var t = R.always('Tee');
 *      t(); //=> 'Tee'
 */

var always$1 =
	/*#__PURE__*/
	_curry1_1(function always(val) {
		return function() {
			return val;
		};
	});

var always_1 = always$1;

var warning$2 = function warning(pred, msg) {
	if (pred) {
		return;
	}

	if (process.env.NODE_ENV === "production") {
		return;
	}

	console.log(msg);
};

var invariant$1 = function invariant(pred, msg) {
	if (pred) {
		return;
	}

	if (process.env.NODE_ENV === "production") {
		throw new Error(
			"There was an error. Use non-production build to see details."
		);
	}

	throw new Error(msg);
};

var noop$1 = always_1(null);

var getDisplayName = function getDisplayName(Component$$1) {
	return Component$$1.displayName || Component$$1.name || "Component";
};

var WidgetContext = React.createContext({
	data: undefined,
	namespace: undefined
});

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}

function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	return Constructor;
}

function _defineProperty$2(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		});
	} else {
		obj[key] = value;
	}

	return obj;
}

function _extends$1() {
	_extends$1 =
		Object.assign ||
		function(target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];

				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}

			return target;
		};

	return _extends$1.apply(this, arguments);
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError(
			"Super expression must either be null or a function"
		);
	}

	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			writable: true,
			configurable: true
		}
	});
	if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf
		? Object.getPrototypeOf
		: function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
		  };
	return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
	_setPrototypeOf =
		Object.setPrototypeOf ||
		function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};

	return _setPrototypeOf(o, p);
}

function _assertThisInitialized$1(self) {
	if (self === void 0) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}

	return self;
}

function _possibleConstructorReturn(self, call) {
	if (call && (typeof call === "object" || typeof call === "function")) {
		return call;
	}

	return _assertThisInitialized$1(self);
}
/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry2$1(fn) {
	return function f2(a, b) {
		switch (arguments.length) {
			case 0:
				return f2;

			case 1:
				return _isPlaceholder_1(a)
					? f2
					: _curry1_1(function(_b) {
							return fn(a, _b);
					  });

			default:
				return _isPlaceholder_1(a) && _isPlaceholder_1(b)
					? f2
					: _isPlaceholder_1(a)
						? _curry1_1(function(_a) {
								return fn(_a, b);
						  })
						: _isPlaceholder_1(b)
							? _curry1_1(function(_b) {
									return fn(a, _b);
							  })
							: fn(a, b);
		}
	};
}

var _curry2_1 = _curry2$1;
/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry3$1(fn) {
	return function f3(a, b, c) {
		switch (arguments.length) {
			case 0:
				return f3;

			case 1:
				return _isPlaceholder_1(a)
					? f3
					: _curry2_1(function(_b, _c) {
							return fn(a, _b, _c);
					  });

			case 2:
				return _isPlaceholder_1(a) && _isPlaceholder_1(b)
					? f3
					: _isPlaceholder_1(a)
						? _curry2_1(function(_a, _c) {
								return fn(_a, b, _c);
						  })
						: _isPlaceholder_1(b)
							? _curry2_1(function(_b, _c) {
									return fn(a, _b, _c);
							  })
							: _curry1_1(function(_c) {
									return fn(a, b, _c);
							  });

			default:
				return _isPlaceholder_1(a) &&
					_isPlaceholder_1(b) &&
					_isPlaceholder_1(c)
					? f3
					: _isPlaceholder_1(a) && _isPlaceholder_1(b)
						? _curry2_1(function(_a, _b) {
								return fn(_a, _b, c);
						  })
						: _isPlaceholder_1(a) && _isPlaceholder_1(c)
							? _curry2_1(function(_a, _c) {
									return fn(_a, b, _c);
							  })
							: _isPlaceholder_1(b) && _isPlaceholder_1(c)
								? _curry2_1(function(_b, _c) {
										return fn(a, _b, _c);
								  })
								: _isPlaceholder_1(a)
									? _curry1_1(function(_a) {
											return fn(_a, b, c);
									  })
									: _isPlaceholder_1(b)
										? _curry1_1(function(_b) {
												return fn(a, _b, c);
										  })
										: _isPlaceholder_1(c)
											? _curry1_1(function(_c) {
													return fn(a, b, _c);
											  })
											: fn(a, b, c);
		}
	};
}

var _curry3_1 = _curry3$1;
/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      var classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      var yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */

var o$1 =
	/*#__PURE__*/
	_curry3_1(function o(f, g, x) {
		return f(g(x));
	});

var o_1 = o$1;
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      var takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */

var nAry$1 =
	/*#__PURE__*/
	_curry2_1(function nAry(n, fn) {
		switch (n) {
			case 0:
				return function() {
					return fn.call(this);
				};

			case 1:
				return function(a0) {
					return fn.call(this, a0);
				};

			case 2:
				return function(a0, a1) {
					return fn.call(this, a0, a1);
				};

			case 3:
				return function(a0, a1, a2) {
					return fn.call(this, a0, a1, a2);
				};

			case 4:
				return function(a0, a1, a2, a3) {
					return fn.call(this, a0, a1, a2, a3);
				};

			case 5:
				return function(a0, a1, a2, a3, a4) {
					return fn.call(this, a0, a1, a2, a3, a4);
				};

			case 6:
				return function(a0, a1, a2, a3, a4, a5) {
					return fn.call(this, a0, a1, a2, a3, a4, a5);
				};

			case 7:
				return function(a0, a1, a2, a3, a4, a5, a6) {
					return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
				};

			case 8:
				return function(a0, a1, a2, a3, a4, a5, a6, a7) {
					return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
				};

			case 9:
				return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
					return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
				};

			case 10:
				return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
					return fn.call(
						this,
						a0,
						a1,
						a2,
						a3,
						a4,
						a5,
						a6,
						a7,
						a8,
						a9
					);
				};

			default:
				throw new Error(
					"First argument to nAry must be a non-negative integer no greater than ten"
				);
		}
	});

var nAry_1 = nAry$1;
/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> b) -> (a -> b)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @see R.binary, R.nAry
 * @example
 *
 *      var takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */

var unary$1 =
	/*#__PURE__*/
	_curry1_1(function unary(fn) {
		return nAry_1(1, fn);
	});

var unary_1 = unary$1;
/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */

var path$1 =
	/*#__PURE__*/
	_curry2_1(function path(paths, obj) {
		var val = obj;
		var idx = 0;

		while (idx < paths.length) {
			if (val == null) {
				return;
			}

			val = val[paths[idx]];
			idx += 1;
		}

		return val;
	});

var path_1 = path$1;
/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */

var prop$1 =
	/*#__PURE__*/
	_curry2_1(function prop(p, obj) {
		return path_1([p], obj);
	});

var prop_1 = prop$1;
/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */

var _isArray$1 =
	Array.isArray ||
	function _isArray(val) {
		return (
			val != null &&
			val.length >= 0 &&
			Object.prototype.toString.call(val) === "[object Array]"
		);
	};

function _isTransformer$1(obj) {
	return typeof obj["@@transducer/step"] === "function";
}

var _isTransformer_1 = _isTransformer$1;
/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */

function _dispatchable$1(methodNames, xf, fn) {
	return function() {
		if (arguments.length === 0) {
			return fn();
		}

		var args = Array.prototype.slice.call(arguments, 0);
		var obj = args.pop();

		if (!_isArray$1(obj)) {
			var idx = 0;

			while (idx < methodNames.length) {
				if (typeof obj[methodNames[idx]] === "function") {
					return obj[methodNames[idx]].apply(obj, args);
				}

				idx += 1;
			}

			if (_isTransformer_1(obj)) {
				var transducer = xf.apply(null, args);
				return transducer(obj);
			}
		}

		return fn.apply(this, arguments);
	};
}

var _dispatchable_1 = _dispatchable$1;

function _map$1(fn, functor) {
	var idx = 0;
	var len = functor.length;
	var result = Array(len);

	while (idx < len) {
		result[idx] = fn(functor[idx]);
		idx += 1;
	}

	return result;
}

var _map_1 = _map$1;

function _isString$1(x) {
	return Object.prototype.toString.call(x) === "[object String]";
}

var _isString_1 = _isString$1;
/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */

var _isArrayLike$1 =
	/*#__PURE__*/
	_curry1_1(function isArrayLike(x) {
		if (_isArray$1(x)) {
			return true;
		}

		if (!x) {
			return false;
		}

		if (typeof x !== "object") {
			return false;
		}

		if (_isString_1(x)) {
			return false;
		}

		if (x.nodeType === 1) {
			return !!x.length;
		}

		if (x.length === 0) {
			return true;
		}

		if (x.length > 0) {
			return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
		}

		return false;
	});

var _isArrayLike_1 = _isArrayLike$1;

var XWrap$1 =
	/*#__PURE__*/
	(function() {
		function XWrap(fn) {
			this.f = fn;
		}

		XWrap.prototype["@@transducer/init"] = function() {
			throw new Error("init not implemented on XWrap");
		};

		XWrap.prototype["@@transducer/result"] = function(acc) {
			return acc;
		};

		XWrap.prototype["@@transducer/step"] = function(acc, x) {
			return this.f(acc, x);
		};

		return XWrap;
	})();

function _xwrap$1(fn) {
	return new XWrap$1(fn);
}

var _xwrap_1 = _xwrap$1;

function _arity$1(n, fn) {
	/* eslint-disable no-unused-vars */
	switch (n) {
		case 0:
			return function() {
				return fn.apply(this, arguments);
			};

		case 1:
			return function(a0) {
				return fn.apply(this, arguments);
			};

		case 2:
			return function(a0, a1) {
				return fn.apply(this, arguments);
			};

		case 3:
			return function(a0, a1, a2) {
				return fn.apply(this, arguments);
			};

		case 4:
			return function(a0, a1, a2, a3) {
				return fn.apply(this, arguments);
			};

		case 5:
			return function(a0, a1, a2, a3, a4) {
				return fn.apply(this, arguments);
			};

		case 6:
			return function(a0, a1, a2, a3, a4, a5) {
				return fn.apply(this, arguments);
			};

		case 7:
			return function(a0, a1, a2, a3, a4, a5, a6) {
				return fn.apply(this, arguments);
			};

		case 8:
			return function(a0, a1, a2, a3, a4, a5, a6, a7) {
				return fn.apply(this, arguments);
			};

		case 9:
			return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
				return fn.apply(this, arguments);
			};

		case 10:
			return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
				return fn.apply(this, arguments);
			};

		default:
			throw new Error(
				"First argument to _arity must be a non-negative integer no greater than ten"
			);
	}
}

var _arity_1 = _arity$1;
/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */

var bind$1 =
	/*#__PURE__*/
	_curry2_1(function bind(fn, thisObj) {
		return _arity_1(fn.length, function() {
			return fn.apply(thisObj, arguments);
		});
	});

var bind_1 = bind$1;

function _arrayReduce$1(xf, acc, list) {
	var idx = 0;
	var len = list.length;

	while (idx < len) {
		acc = xf["@@transducer/step"](acc, list[idx]);

		if (acc && acc["@@transducer/reduced"]) {
			acc = acc["@@transducer/value"];
			break;
		}

		idx += 1;
	}

	return xf["@@transducer/result"](acc);
}

function _iterableReduce$1(xf, acc, iter) {
	var step = iter.next();

	while (!step.done) {
		acc = xf["@@transducer/step"](acc, step.value);

		if (acc && acc["@@transducer/reduced"]) {
			acc = acc["@@transducer/value"];
			break;
		}

		step = iter.next();
	}

	return xf["@@transducer/result"](acc);
}

function _methodReduce$1(xf, acc, obj, methodName) {
	return xf["@@transducer/result"](
		obj[methodName](bind_1(xf["@@transducer/step"], xf), acc)
	);
}

var symIterator$1 =
	typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";

function _reduce$1(fn, acc, list) {
	if (typeof fn === "function") {
		fn = _xwrap_1(fn);
	}

	if (_isArrayLike_1(list)) {
		return _arrayReduce$1(fn, acc, list);
	}

	if (typeof list["fantasy-land/reduce"] === "function") {
		return _methodReduce$1(fn, acc, list, "fantasy-land/reduce");
	}

	if (list[symIterator$1] != null) {
		return _iterableReduce$1(fn, acc, list[symIterator$1]());
	}

	if (typeof list.next === "function") {
		return _iterableReduce$1(fn, acc, list);
	}

	if (typeof list.reduce === "function") {
		return _methodReduce$1(fn, acc, list, "reduce");
	}

	throw new TypeError("reduce: list must be array or iterable");
}

var _reduce_1 = _reduce$1;
var _xfBase$1 = {
	init: function init() {
		return this.xf["@@transducer/init"]();
	},
	result: function result(_result) {
		return this.xf["@@transducer/result"](_result);
	}
};

var XMap$1 =
	/*#__PURE__*/
	(function() {
		function XMap(f, xf) {
			this.xf = xf;
			this.f = f;
		}

		XMap.prototype["@@transducer/init"] = _xfBase$1.init;
		XMap.prototype["@@transducer/result"] = _xfBase$1.result;

		XMap.prototype["@@transducer/step"] = function(result, input) {
			return this.xf["@@transducer/step"](result, this.f(input));
		};

		return XMap;
	})();

var _xmap$1 =
	/*#__PURE__*/
	_curry2_1(function _xmap(f, xf) {
		return new XMap$1(f, xf);
	});

var _xmap_1 = _xmap$1;
/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curryN$1(length, received, fn) {
	return function() {
		var combined = [];
		var argsIdx = 0;
		var left = length;
		var combinedIdx = 0;

		while (combinedIdx < received.length || argsIdx < arguments.length) {
			var result;

			if (
				combinedIdx < received.length &&
				(!_isPlaceholder_1(received[combinedIdx]) ||
					argsIdx >= arguments.length)
			) {
				result = received[combinedIdx];
			} else {
				result = arguments[argsIdx];
				argsIdx += 1;
			}

			combined[combinedIdx] = result;

			if (!_isPlaceholder_1(result)) {
				left -= 1;
			}

			combinedIdx += 1;
		}

		return left <= 0
			? fn.apply(this, combined)
			: _arity_1(left, _curryN$1(length, combined, fn));
	};
}

var _curryN_1 = _curryN$1;
/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */

var curryN$1 =
	/*#__PURE__*/
	_curry2_1(function curryN(length, fn) {
		if (length === 1) {
			return _curry1_1(fn);
		}

		return _arity_1(length, _curryN_1(length, [], fn));
	});

var curryN_1 = curryN$1;

function _has$1(prop, obj) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}

var _has_1 = _has$1;
var toString$2 = Object.prototype.toString;

var _isArguments$1 = function _isArguments() {
	return toString$2.call(arguments) === "[object Arguments]"
		? function _isArguments(x) {
				return toString$2.call(x) === "[object Arguments]";
		  }
		: function _isArguments(x) {
				return _has_1("callee", x);
		  };
};

var _isArguments_1 = _isArguments$1; // cover IE < 9 keys issues

var hasEnumBug$1 = !/*#__PURE__*/
{
	toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps$1 = [
	"constructor",
	"valueOf",
	"isPrototypeOf",
	"toString",
	"propertyIsEnumerable",
	"hasOwnProperty",
	"toLocaleString"
]; // Safari bug

var hasArgsEnumBug$1 =
	/*#__PURE__*/
	(function() {
		return arguments.propertyIsEnumerable("length");
	})();

var contains$2 = function contains(list, item) {
	var idx = 0;

	while (idx < list.length) {
		if (list[idx] === item) {
			return true;
		}

		idx += 1;
	}

	return false;
};
/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */

var _keys$1 =
	typeof Object.keys === "function" && !hasArgsEnumBug$1
		? function keys(obj) {
				return Object(obj) !== obj ? [] : Object.keys(obj);
		  }
		: function keys(obj) {
				if (Object(obj) !== obj) {
					return [];
				}

				var prop, nIdx;
				var ks = [];

				var checkArgsLength = hasArgsEnumBug$1 && _isArguments_1(obj);

				for (prop in obj) {
					if (
						_has_1(prop, obj) &&
						(!checkArgsLength || prop !== "length")
					) {
						ks[ks.length] = prop;
					}
				}

				if (hasEnumBug$1) {
					nIdx = nonEnumerableProps$1.length - 1;

					while (nIdx >= 0) {
						prop = nonEnumerableProps$1[nIdx];

						if (_has_1(prop, obj) && !contains$2(ks, prop)) {
							ks[ks.length] = prop;
						}

						nIdx -= 1;
					}
				}

				return ks;
		  };

var keys$1 =
	/*#__PURE__*/
	_curry1_1(_keys$1);

var keys_1 = keys$1;
/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */

var map$1 =
	/*#__PURE__*/
	_curry2_1(
		/*#__PURE__*/
		_dispatchable_1(["fantasy-land/map", "map"], _xmap_1, function map(
			fn,
			functor
		) {
			switch (Object.prototype.toString.call(functor)) {
				case "[object Function]":
					return curryN_1(functor.length, function() {
						return fn.call(this, functor.apply(this, arguments));
					});

				case "[object Object]":
					return _reduce_1(
						function(acc, key) {
							acc[key] = fn(functor[key]);
							return acc;
						},
						{},
						keys_1(functor)
					);

				default:
					return _map_1(fn, functor);
			}
		})
	);

var map_1 = map$1;

function _reduced$1(x) {
	return x && x["@@transducer/reduced"]
		? x
		: {
				"@@transducer/value": x,
				"@@transducer/reduced": true
		  };
}

var _reduced_1 = _reduced$1;

var XFind$1 =
	/*#__PURE__*/
	(function() {
		function XFind(f, xf) {
			this.xf = xf;
			this.f = f;
			this.found = false;
		}

		XFind.prototype["@@transducer/init"] = _xfBase$1.init;

		XFind.prototype["@@transducer/result"] = function(result) {
			if (!this.found) {
				result = this.xf["@@transducer/step"](result, void 0);
			}

			return this.xf["@@transducer/result"](result);
		};

		XFind.prototype["@@transducer/step"] = function(result, input) {
			if (this.f(input)) {
				this.found = true;
				result = _reduced_1(
					this.xf["@@transducer/step"](result, input)
				);
			}

			return result;
		};

		return XFind;
	})();

var _xfind$1 =
	/*#__PURE__*/
	_curry2_1(function _xfind(f, xf) {
		return new XFind$1(f, xf);
	});

var _xfind_1 = _xfind$1;
/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */

var find$1 =
	/*#__PURE__*/
	_curry2_1(
		/*#__PURE__*/
		_dispatchable_1(["find"], _xfind_1, function find(fn, list) {
			var idx = 0;
			var len = list.length;

			while (idx < len) {
				if (fn(list[idx])) {
					return list[idx];
				}

				idx += 1;
			}
		})
	);

var find_1 = find$1;

function _arrayFromIterator$1(iter) {
	var list = [];
	var next;

	while (!(next = iter.next()).done) {
		list.push(next.value);
	}

	return list;
}

var _arrayFromIterator_1 = _arrayFromIterator$1;

function _containsWith$1(pred, x, list) {
	var idx = 0;
	var len = list.length;

	while (idx < len) {
		if (pred(x, list[idx])) {
			return true;
		}

		idx += 1;
	}

	return false;
}

var _containsWith_1 = _containsWith$1;

function _functionName$1(f) {
	// String(x => x) evaluates to "x => x", so the pattern may not match.
	var match = String(f).match(/^function (\w*)/);
	return match == null ? "" : match[1];
}

var _functionName_1 = _functionName$1;
/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */

var identical$1 =
	/*#__PURE__*/
	_curry2_1(function identical(a, b) {
		// SameValue algorithm
		if (a === b) {
			// Steps 1-5, 7-10
			// Steps 6.b-6.e: +0 != -0
			return a !== 0 || 1 / a === 1 / b;
		} else {
			// Step 6.a: NaN == NaN
			return a !== a && b !== b;
		}
	});

var identical_1 = identical$1;
/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */

var type$1 =
	/*#__PURE__*/
	_curry1_1(function type(val) {
		return val === null
			? "Null"
			: val === undefined
				? "Undefined"
				: Object.prototype.toString.call(val).slice(8, -1);
	});

var type_1 = type$1;
/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals$1(aIterator, bIterator, stackA, stackB) {
	var a = _arrayFromIterator_1(aIterator);

	var b = _arrayFromIterator_1(bIterator);

	function eq(_a, _b) {
		return _equals$1(_a, _b, stackA.slice(), stackB.slice());
	} // if *a* array contains any element that is not included in *b*

	return !_containsWith_1(
		function(b, aItem) {
			return !_containsWith_1(eq, aItem, b);
		},
		b,
		a
	);
}

function _equals$1(a, b, stackA, stackB) {
	if (identical_1(a, b)) {
		return true;
	}

	var typeA = type_1(a);

	if (typeA !== type_1(b)) {
		return false;
	}

	if (a == null || b == null) {
		return false;
	}

	if (
		typeof a["fantasy-land/equals"] === "function" ||
		typeof b["fantasy-land/equals"] === "function"
	) {
		return (
			typeof a["fantasy-land/equals"] === "function" &&
			a["fantasy-land/equals"](b) &&
			typeof b["fantasy-land/equals"] === "function" &&
			b["fantasy-land/equals"](a)
		);
	}

	if (typeof a.equals === "function" || typeof b.equals === "function") {
		return (
			typeof a.equals === "function" &&
			a.equals(b) &&
			typeof b.equals === "function" &&
			b.equals(a)
		);
	}

	switch (typeA) {
		case "Arguments":
		case "Array":
		case "Object":
			if (
				typeof a.constructor === "function" &&
				_functionName_1(a.constructor) === "Promise"
			) {
				return a === b;
			}

			break;

		case "Boolean":
		case "Number":
		case "String":
			if (
				!(
					typeof a === typeof b &&
					identical_1(a.valueOf(), b.valueOf())
				)
			) {
				return false;
			}

			break;

		case "Date":
			if (!identical_1(a.valueOf(), b.valueOf())) {
				return false;
			}

			break;

		case "Error":
			return a.name === b.name && a.message === b.message;

		case "RegExp":
			if (
				!(
					a.source === b.source &&
					a.global === b.global &&
					a.ignoreCase === b.ignoreCase &&
					a.multiline === b.multiline &&
					a.sticky === b.sticky &&
					a.unicode === b.unicode
				)
			) {
				return false;
			}

			break;
	}

	var idx = stackA.length - 1;

	while (idx >= 0) {
		if (stackA[idx] === a) {
			return stackB[idx] === b;
		}

		idx -= 1;
	}

	switch (typeA) {
		case "Map":
			if (a.size !== b.size) {
				return false;
			}

			return _uniqContentEquals$1(
				a.entries(),
				b.entries(),
				stackA.concat([a]),
				stackB.concat([b])
			);

		case "Set":
			if (a.size !== b.size) {
				return false;
			}

			return _uniqContentEquals$1(
				a.values(),
				b.values(),
				stackA.concat([a]),
				stackB.concat([b])
			);

		case "Arguments":
		case "Array":
		case "Object":
		case "Boolean":
		case "Number":
		case "String":
		case "Date":
		case "Error":
		case "RegExp":
		case "Int8Array":
		case "Uint8Array":
		case "Uint8ClampedArray":
		case "Int16Array":
		case "Uint16Array":
		case "Int32Array":
		case "Uint32Array":
		case "Float32Array":
		case "Float64Array":
		case "ArrayBuffer":
			break;

		default:
			// Values of other types are only equal if identical.
			return false;
	}

	var keysA = keys_1(a);

	if (keysA.length !== keys_1(b).length) {
		return false;
	}

	var extendedStackA = stackA.concat([a]);
	var extendedStackB = stackB.concat([b]);
	idx = keysA.length - 1;

	while (idx >= 0) {
		var key = keysA[idx];

		if (
			!(
				_has_1(key, b) &&
				_equals$1(b[key], a[key], extendedStackA, extendedStackB)
			)
		) {
			return false;
		}

		idx -= 1;
	}

	return true;
}

var _equals_1 = _equals$1;
/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */

var equals$1 =
	/*#__PURE__*/
	_curry2_1(function equals(a, b) {
		return _equals_1(a, b, [], []);
	});

var equals_1 = equals$1;
/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */

var where$1 =
	/*#__PURE__*/
	_curry2_1(function where(spec, testObj) {
		for (var prop in spec) {
			if (_has_1(prop, spec) && !spec[prop](testObj[prop])) {
				return false;
			}
		}

		return true;
	});

var where_1 = where$1;
/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propEq, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */

var whereEq$1 =
	/*#__PURE__*/
	_curry2_1(function whereEq(spec, testObj) {
		return where_1(map_1(equals_1, spec), testObj);
	});

var whereEq_1 = whereEq$1;
/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */

var zipObj$1 =
	/*#__PURE__*/
	_curry2_1(function zipObj(keys, values) {
		var idx = 0;
		var len = Math.min(keys.length, values.length);
		var out = {};

		while (idx < len) {
			out[keys[idx]] = values[idx];
			idx += 1;
		}

		return out;
	});

var zipObj_1 = zipObj$1;
/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */

var max$1 =
	/*#__PURE__*/
	_curry2_1(function max(a, b) {
		return b > a ? b : a;
	});

var max_1 = max$1;
/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
 *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */

var pluck$1 =
	/*#__PURE__*/
	_curry2_1(function pluck(p, list) {
		return map_1(prop_1(p), list);
	});

var pluck_1 = pluck$1;
/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */

var reduce$1 =
	/*#__PURE__*/
	_curry3_1(_reduce_1);

var reduce_1 = reduce$1;
/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. When invoked, this new function is applied to some
 * arguments, each branching function is applied to those same arguments. The
 * results of each branching function are passed as arguments to the converging
 * function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      var average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */

var converge$1 =
	/*#__PURE__*/
	_curry2_1(function converge(after, fns) {
		return curryN_1(reduce_1(max_1, 0, pluck_1("length", fns)), function() {
			var args = arguments;
			var context = this;
			return after.apply(
				context,
				_map_1(function(fn) {
					return fn.apply(context, args);
				}, fns)
			);
		});
	});

var converge_1 = converge$1;
/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */

var unapply$1 =
	/*#__PURE__*/
	_curry1_1(function unapply(fn) {
		return function() {
			return fn(Array.prototype.slice.call(arguments, 0));
		};
	});

var unapply_1 = unapply$1;
/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */

function _concat$1(set1, set2) {
	set1 = set1 || [];
	set2 = set2 || [];
	var idx;
	var len1 = set1.length;
	var len2 = set2.length;
	var result = [];
	idx = 0;

	while (idx < len1) {
		result[result.length] = set1[idx];
		idx += 1;
	}

	idx = 0;

	while (idx < len2) {
		result[result.length] = set2[idx];
		idx += 1;
	}

	return result;
}

var _concat_1 = _concat$1;
/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send then to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false
 */

var tryCatch$1 =
	/*#__PURE__*/
	_curry2_1(function _tryCatch(tryer, catcher) {
		return _arity_1(tryer.length, function() {
			try {
				return tryer.apply(this, arguments);
			} catch (e) {
				return catcher.apply(this, _concat_1([e], arguments));
			}
		});
	});

var tryCatch_1 = tryCatch$1;
/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */

var values$1 =
	/*#__PURE__*/
	_curry1_1(function values(obj) {
		var props = keys_1(obj);
		var len = props.length;
		var vals = [];
		var idx = 0;

		while (idx < len) {
			vals[idx] = obj[props[idx]];
			idx += 1;
		}

		return vals;
	});

var values_1 = values$1;

function _pipe$1(f, g) {
	return function() {
		return g.call(this, f.apply(this, arguments));
	};
}

var _pipe_1 = _pipe$1;
/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */

function _checkForMethod$1(methodname, fn) {
	return function() {
		var length = arguments.length;

		if (length === 0) {
			return fn();
		}

		var obj = arguments[length - 1];
		return _isArray$1(obj) || typeof obj[methodname] !== "function"
			? fn.apply(this, arguments)
			: obj[methodname].apply(
					obj,
					Array.prototype.slice.call(arguments, 0, length - 1)
			  );
	};
}

var _checkForMethod_1 = _checkForMethod$1;
/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */

var slice$1 =
	/*#__PURE__*/
	_curry3_1(
		/*#__PURE__*/
		_checkForMethod_1("slice", function slice(fromIndex, toIndex, list) {
			return Array.prototype.slice.call(list, fromIndex, toIndex);
		})
	);

var slice_1 = slice$1;
/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */

var tail$1 =
	/*#__PURE__*/
	_curry1_1(
		/*#__PURE__*/
		_checkForMethod_1(
			"tail",
			/*#__PURE__*/
			slice_1(1, Infinity)
		)
	);

var tail_1 = tail$1;
/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */

function pipe$1() {
	if (arguments.length === 0) {
		throw new Error("pipe requires at least one argument");
	}

	return _arity_1(
		arguments[0].length,
		reduce_1(_pipe_1, arguments[0], tail_1(arguments))
	);
}

var pipe_1 = pipe$1;
/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */

var reverse$1 =
	/*#__PURE__*/
	_curry1_1(function reverse(list) {
		return _isString_1(list)
			? list
					.split("")
					.reverse()
					.join("")
			: Array.prototype.slice.call(list, 0).reverse();
	});

var reverse_1 = reverse$1;
/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */

function compose$2() {
	if (arguments.length === 0) {
		throw new Error("compose requires at least one argument");
	}

	return pipe_1.apply(this, reverse_1(arguments));
}

var compose_1 = compose$2;

function _isObject$1(x) {
	return Object.prototype.toString.call(x) === "[object Object]";
}

var _isObject_1 = _isObject$1;
/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */

var mergeWithKey$1 =
	/*#__PURE__*/
	_curry3_1(function mergeWithKey(fn, l, r) {
		var result = {};
		var k;

		for (k in l) {
			if (_has_1(k, l)) {
				result[k] = _has_1(k, r) ? fn(k, l[k], r[k]) : l[k];
			}
		}

		for (k in r) {
			if (_has_1(k, r) && !_has_1(k, result)) {
				result[k] = r[k];
			}
		}

		return result;
	});

var mergeWithKey_1 = mergeWithKey$1;
/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeep, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */

var mergeDeepWithKey$1 =
	/*#__PURE__*/
	_curry3_1(function mergeDeepWithKey(fn, lObj, rObj) {
		return mergeWithKey_1(
			function(k, lVal, rVal) {
				if (_isObject_1(lVal) && _isObject_1(rVal)) {
					return mergeDeepWithKey(fn, lVal, rVal);
				} else {
					return fn(k, lVal, rVal);
				}
			},
			lObj,
			rObj
		);
	});

var mergeDeepWithKey_1 = mergeDeepWithKey$1;
/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */

var mergeDeepRight$1 =
	/*#__PURE__*/
	_curry2_1(function mergeDeepRight(lObj, rObj) {
		return mergeDeepWithKey_1(
			function(k, lVal, rVal) {
				return rVal;
			},
			lObj,
			rObj
		);
	});

var mergeDeepRight_1 = mergeDeepRight$1;
/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      var printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */

var forEach$1 =
	/*#__PURE__*/
	_curry2_1(
		/*#__PURE__*/
		_checkForMethod_1("forEach", function forEach(fn, list) {
			var len = list.length;
			var idx = 0;

			while (idx < len) {
				fn(list[idx]);
				idx += 1;
			}

			return list;
		})
	);

var forEach_1 = forEach$1;

function _indexOf$1(list, a, idx) {
	var inf, item; // Array.prototype.indexOf doesn't exist below IE9

	if (typeof list.indexOf === "function") {
		switch (typeof a) {
			case "number":
				if (a === 0) {
					// manually crawl the list to distinguish between +0 and -0
					inf = 1 / a;

					while (idx < list.length) {
						item = list[idx];

						if (item === 0 && 1 / item === inf) {
							return idx;
						}

						idx += 1;
					}

					return -1;
				} else if (a !== a) {
					// NaN
					while (idx < list.length) {
						item = list[idx];

						if (typeof item === "number" && item !== item) {
							return idx;
						}

						idx += 1;
					}

					return -1;
				} // non-zero numbers can utilise Set

				return list.indexOf(a, idx);
			// all these types can utilise Set

			case "string":
			case "boolean":
			case "function":
			case "undefined":
				return list.indexOf(a, idx);

			case "object":
				if (a === null) {
					// null can utilise Set
					return list.indexOf(a, idx);
				}
		}
	} // anything else not covered above, defer to R.equals

	while (idx < list.length) {
		if (equals_1(list[idx], a)) {
			return idx;
		}

		idx += 1;
	}

	return -1;
}

var _indexOf_1 = _indexOf$1;

function _contains$1(a, list) {
	return _indexOf_1(list, a, 0) >= 0;
}

var _contains_1 = _contains$1;
/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 */

var contains$1$1 =
	/*#__PURE__*/
	_curry2_1(_contains_1);

var contains_1 = contains$1$1;
var validateDescriptorStructures = forEach_1(function(_ref) {
	var widget = _ref.widget,
		namespace = _ref.namespace,
		container = _ref.container;
	invariant$1(
		widget,
		"Missing data-union-widget value in the widget descriptor."
	);
	invariant$1(
		namespace || container,
		'Missing required attributes for the widget "'.concat(widget, '". ') +
			"Fill in the 'data-union-namespace' or 'data-union-container' in the widget descriptors."
	);
});

var validateRoutesWithDescriptors = function validateRoutesWithDescriptors(
	routes,
	descriptors
) {
	var routePaths = map_1(prop_1("path"), routes);
	var widgetNames = map_1(prop_1("widget"), descriptors);
	forEach_1(function(widgetName) {
		return invariant$1(
			contains_1(widgetName, routePaths),
			'Could not find a matching route for widget descriptor of widget "'.concat(
				widgetName,
				'".'
			)
		);
	}, widgetNames);
};

var loadRouteComponent = function loadRouteComponent(route) {
	return new Promise(function(resolve) {
		return route.getComponent(resolve);
	});
};

var selectWidgetDescriptors = function selectWidgetDescriptors(parent) {
	return parent.querySelectorAll("[data-union-widget]");
};

var selectCommonDescriptors = function selectCommonDescriptors(parent) {
	return parent.querySelectorAll("[data-union-common]");
};

var parseJsonContent = o_1(unary_1(JSON.parse), prop_1("innerHTML"));
var safelyParseJsonContent = tryCatch_1(parseJsonContent, always_1({}));
/**
 * Describes the structure of a descriptor that we work with in JS (as opposed to the DOM structure).
 * Each record represents a key and a transformation function expecting a DOM element - the widget descriptor.
 * The results of calling the functions with the DOM element are set at the appropriate keys.
 *
 * @type {Object.<string, Function>}
 */

var elementTransformationsByKey = {
	widget: path_1(["dataset", "unionWidget"]),
	container: path_1(["dataset", "unionContainer"]),
	namespace: path_1(["dataset", "unionNamespace"]),
	data: safelyParseJsonContent
};
var pairArrayWithDescriptorKeys = zipObj_1(keys_1(elementTransformationsByKey)); // zipObj is a binary function but converge expects a variadic function

var pairArgsWithDescriptorKeys = unapply_1(pairArrayWithDescriptorKeys);
var parseDescriptor = converge_1(
	pairArgsWithDescriptorKeys,
	values_1(elementTransformationsByKey)
);
var getWidgetDescriptors = o_1(map_1(parseDescriptor), selectWidgetDescriptors);
var getCommonData = compose_1(
	reduce_1(mergeDeepRight_1, {}),
	map_1(safelyParseJsonContent),
	selectCommonDescriptors
);

var mergeCommonDataToConfigs = function mergeCommonDataToConfigs(commonData) {
	return map_1(
		mergeDeepRight_1({
			descriptor: {
				data: commonData
			}
		})
	);
};

var loadConfigs = function loadConfigs(routes, descriptors) {
	var findRouteByDescriptor = function findRouteByDescriptor(_ref) {
		var widget = _ref.widget;
		return find_1(
			whereEq_1({
				path: widget
			}),
			routes
		);
	};

	var pairDescriptorWithComponent = function pairDescriptorWithComponent(
		descriptor
	) {
		return function(component) {
			return {
				component: component,
				descriptor: descriptor
			};
		};
	};

	var loadRouteComponentByDescriptor = o_1(
		loadRouteComponent,
		findRouteByDescriptor
	);

	var loadDescriptorConfig = function loadDescriptorConfig(descriptor) {
		return loadRouteComponentByDescriptor(descriptor)
			.then(pairDescriptorWithComponent(descriptor))
			.catch(console.error);
	};

	return map_1(loadDescriptorConfig, descriptors);
};

var addCommonDataProperty = function addCommonDataProperty(commonData) {
	return function(configs) {
		return {
			commonData: commonData,
			configs: configs
		};
	};
};
/**
 * Finds widget descriptors in `parent` and pairs them with components returned by correspoding `routes`.
 *
 * @param  {Array} routes Route configurations.
 * @param  {Element} parent The root DOM element where to find the widget descriptors.
 * @return {Object} The object has two properties: `configs` and `commonData`.
 * 									`configs` is an array of object with `component` and `descriptor` properties.
 *									`commonData` is the merged JSON content of common widget descriptors.
 */

var scan$1 = function scan(routes, parent) {
	var descriptors = getWidgetDescriptors(parent);
	var commonData = getCommonData(parent);
	validateDescriptorStructures(descriptors);
	validateRoutesWithDescriptors(routes, descriptors);
	var configPromises = loadConfigs(routes, descriptors);
	return Promise.all(configPromises)
		.then(mergeCommonDataToConfigs(commonData))
		.then(addCommonDataProperty(commonData));
};

var getWidgetName = path_1(["props", "descriptor", "widget"]);

var withErrorBoundary = function withErrorBoundary(NextComponent) {
	var WithErrorBoundary =
		/*#__PURE__*/
		(function(_Component) {
			_inherits(WithErrorBoundary, _Component);

			function WithErrorBoundary() {
				var _getPrototypeOf2;

				var _this;

				_classCallCheck(this, WithErrorBoundary);

				for (
					var _len = arguments.length,
						args = new Array(_len),
						_key = 0;
					_key < _len;
					_key++
				) {
					args[_key] = arguments[_key];
				}

				_this = _possibleConstructorReturn(
					this,
					(_getPrototypeOf2 = _getPrototypeOf(
						WithErrorBoundary
					)).call.apply(_getPrototypeOf2, [this].concat(args))
				);

				_defineProperty$2(
					_assertThisInitialized$1(_assertThisInitialized$1(_this)),
					"state",
					{
						hasError: false
					}
				);

				return _this;
			}

			_createClass(WithErrorBoundary, [
				{
					key: "componentDidCatch",
					value: function componentDidCatch() {
						this.setState({
							hasError: true
						});
					}
				},
				{
					key: "render",
					value: function render() {
						var widgetName = getWidgetName(this);

						if (this.state.hasError) {
							// TODO: perhaps show some tips for common mistakes?
							return 'An error has occurred in widget "'.concat(
								widgetName,
								'". See the console output for more details.'
							);
						}

						return React__default.createElement(
							NextComponent,
							this.props
						);
					}
				}
			]);

			return WithErrorBoundary;
		})(React.Component);

	_defineProperty$2(WithErrorBoundary, "propTypes", ConfigShape);

	_defineProperty$2(
		WithErrorBoundary,
		"displayName",
		"WithErrorBoundary(".concat(getDisplayName(NextComponent), ")")
	);

	return WithErrorBoundary;
};
/**
 * HOC which spreads the surrounding WidgetContext's value to passed component.
 *
 * @param {React.Component} NextComponent component to bind the props to
 */

var withWidgetContext = function withWidgetContext(NextComponent) {
	var WithWidgetContext = function WithWidgetContext(props) {
		return React__default.createElement(
			WidgetContext.Consumer,
			null,
			function(value) {
				return React__default.createElement(
					NextComponent,
					_extends$1({}, props, value)
				);
			}
		);
	};

	WithWidgetContext.displayName = "WithWidgetContext(".concat(
		getDisplayName(NextComponent),
		")"
	);
	return WithWidgetContext;
};
/**
 * An internal component of `Union`.
 *
 * It renders a widget based on `descriptor` and `component` using React portals.
 * Provides context to the `component` with widget descriptor information.
 *
 */

var Widget = function Widget(_ref) {
	var WidgetComponent = _ref.component,
		descriptor = _ref.descriptor;
	var widget = descriptor.widget,
		container = descriptor.container,
		namespace = descriptor.namespace,
		data = descriptor.data;
	var resolvedNamespace = namespace || container;
	invariant$1(
		!WidgetComponent || container,
		'Missing attribute "container" for the widget "'.concat(
			widget,
			'" to be rendered.'
		)
	);
	var widgetProps = {
		data: data,
		namespace: resolvedNamespace
	};
	var element = document.getElementById(container);
	warning$2(
		element,
		'HTML element with ID "'
			.concat(container, '" not found for widget "')
			.concat(widget, '"')
	);
	return WidgetComponent && element
		? ReactDOM.createPortal(
				React__default.createElement(
					WidgetContext.Provider,
					{
						value: widgetProps
					},
					React__default.createElement(WidgetComponent, widgetProps)
				),
				element
		  )
		: null;
};

Widget.propTypes = ConfigShape;
var Widget$1 = withErrorBoundary(Widget);
/**
 * Renders your widgets according to found widget descriptors and passed `routes`.
 * Widgets are encapsulated in a single virtual DOM even though they may be spread out
 * in the actual mark-up.
 */

var Union =
	/*#__PURE__*/
	(function(_Component) {
		_inherits(Union, _Component);

		function Union() {
			var _getPrototypeOf2;

			var _this;

			_classCallCheck(this, Union);

			for (
				var _len = arguments.length, args = new Array(_len), _key = 0;
				_key < _len;
				_key++
			) {
				args[_key] = arguments[_key];
			}

			_this = _possibleConstructorReturn(
				this,
				(_getPrototypeOf2 = _getPrototypeOf(Union)).call.apply(
					_getPrototypeOf2,
					[this].concat(args)
				)
			);

			_defineProperty$2(
				_assertThisInitialized$1(_assertThisInitialized$1(_this)),
				"state",
				{
					configs: [],
					commonData: null
				}
			);

			_defineProperty$2(
				_assertThisInitialized$1(_assertThisInitialized$1(_this)),
				"scan",
				function(props) {
					var onScanStart = props.onScanStart,
						onScanEnd = props.onScanEnd,
						onScanError = props.onScanError,
						parent = props.parent,
						routes = props.routes;
					onScanStart();
					var domParent = parent || document;
					scan$1(routes, domParent).then(
						function(result) {
							onScanEnd(result);

							_this.setState(result);
						},
						function(error) {
							return onScanError(error);
						}
					);
				}
			);

			_defineProperty$2(
				_assertThisInitialized$1(_assertThisInitialized$1(_this)),
				"renderWidget",
				function(config) {
					return React__default.createElement(
						Widget$1,
						_extends$1(
							{
								key:
									config.descriptor.namespace ||
									config.descriptor.container
							},
							config
						)
					);
				}
			);

			_defineProperty$2(
				_assertThisInitialized$1(_assertThisInitialized$1(_this)),
				"resolveStrictMode",
				function(union) {
					return _this.props.strictMode
						? React__default.createElement(
								React.StrictMode,
								null,
								union
						  )
						: union;
				}
			);

			return _this;
		}

		_createClass(Union, [
			{
				key: "componentDidMount",
				value: function componentDidMount() {
					this.scan(this.props);
				}
			},
			{
				key: "componentDidUpdate",
				value: function componentDidUpdate(prevProps) {
					if (prevProps.routes !== this.props.routes) {
						this.scan(prevProps);
					}
				}
			},
			{
				key: "render",
				value: function render() {
					return this.resolveStrictMode(
						React__default.createElement(
							React.Fragment,
							null,
							this.props.children,
							this.state.configs.map(this.renderWidget)
						)
					);
				}
			}
		]);

		return Union;
	})(React.Component);

_defineProperty$2(Union, "propTypes", {
	/**
	 * Children of the `Union` component.
	 */
	children: propTypes$1.node,

	/**
	 * Called after the scan of the HTML is done.
	 */
	onScanEnd: propTypes$1.func,

	/**
	 *  Called when there is an error while scanning of the HTML.
	 */
	onScanError: propTypes$1.func,

	/**
	 * Called before the scan of the HTML
	 */
	onScanStart: propTypes$1.func,

	/**
	 * Element in which the scan is running. By default `document`.
	 */
	parent: propTypes$1.object,

	/**
	 *  Array of routes that are supported by your application.
	 */
	routes: propTypes$1.arrayOf(propTypes$1.shape(RouteShape)).isRequired,

	/**
	 * Enable React.Strict mode. By default `true`
	 */
	strictMode: propTypes$1.bool
});

_defineProperty$2(Union, "defaultProps", {
	onScanEnd: noop$1,
	onScanError: noop$1,
	onScanStart: noop$1,
	strictMode: true
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
	_extendStatics =
		Object.setPrototypeOf ||
		({
			__proto__: []
		} instanceof Array &&
			function(d, b) {
				d.__proto__ = b;
			}) ||
		function(d, b) {
			for (var p in b) {
				if (b.hasOwnProperty(p)) d[p] = b[p];
			}
		};

	return _extendStatics(d, b);
};

function __extends(d, b) {
	_extendStatics(d, b);

	function __() {
		this.constructor = d;
	}

	d.prototype =
		b === null
			? Object.create(b)
			: ((__.prototype = b.prototype), new __());
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
	return typeof x === "function";
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config = {
	Promise: undefined,

	set useDeprecatedSynchronousErrorHandling(value) {
		if (value) {
			var error =
				/*@__PURE__*/
				new Error();
			/*@__PURE__*/

			console.warn(
				"DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
					error.stack
			);
		} else if (_enable_super_gross_mode_that_will_cause_bad_things) {
			/*@__PURE__*/
			console.log("RxJS: Back to a better error behavior. Thank you. <3");
		}

		_enable_super_gross_mode_that_will_cause_bad_things = value;
	},

	get useDeprecatedSynchronousErrorHandling() {
		return _enable_super_gross_mode_that_will_cause_bad_things;
	}
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
	setTimeout(function() {
		throw err;
	});
}

/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
var empty$1 = {
	closed: true,
	next: function next(value) {},
	error: function error(err) {
		if (config.useDeprecatedSynchronousErrorHandling) {
			throw err;
		} else {
			hostReportError(err);
		}
	},
	complete: function complete() {}
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray =
	Array.isArray ||
	function(x) {
		return x && typeof x.length === "number";
	};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
	return x != null && typeof x === "object";
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var errorObject = {
	e: {}
};

/** PURE_IMPORTS_START _errorObject PURE_IMPORTS_END */
var tryCatchTarget;

function tryCatcher() {
	try {
		return tryCatchTarget.apply(this, arguments);
	} catch (e) {
		errorObject.e = e;
		return errorObject;
	}
}

function tryCatch$2(fn) {
	tryCatchTarget = fn;
	return tryCatcher;
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function UnsubscriptionErrorImpl(errors) {
	Error.call(this);
	this.message = errors
		? errors.length +
		  " errors occurred during unsubscription:\n" +
		  errors
				.map(function(err, i) {
					return i + 1 + ") " + err.toString();
				})
				.join("\n  ")
		: "";
	this.name = "UnsubscriptionError";
	this.errors = errors;
	return this;
}

UnsubscriptionErrorImpl.prototype =
	/*@__PURE__*/
	Object.create(Error.prototype);
var UnsubscriptionError = UnsubscriptionErrorImpl;

/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_tryCatch,_util_errorObject,_util_UnsubscriptionError PURE_IMPORTS_END */

var Subscription$1 =
	/*@__PURE__*/
	(function() {
		function Subscription(unsubscribe) {
			this.closed = false;
			this._parent = null;
			this._parents = null;
			this._subscriptions = null;

			if (unsubscribe) {
				this._unsubscribe = unsubscribe;
			}
		}

		Subscription.prototype.unsubscribe = function() {
			var hasErrors = false;
			var errors;

			if (this.closed) {
				return;
			}

			var _a = this,
				_parent = _a._parent,
				_parents = _a._parents,
				_unsubscribe = _a._unsubscribe,
				_subscriptions = _a._subscriptions;

			this.closed = true;
			this._parent = null;
			this._parents = null;
			this._subscriptions = null;
			var index = -1;
			var len = _parents ? _parents.length : 0;

			while (_parent) {
				_parent.remove(this);

				_parent = (++index < len && _parents[index]) || null;
			}

			if (isFunction(_unsubscribe)) {
				var trial = tryCatch$2(_unsubscribe).call(this);

				if (trial === errorObject) {
					hasErrors = true;
					errors =
						errors ||
						(errorObject.e instanceof UnsubscriptionError
							? flattenUnsubscriptionErrors(errorObject.e.errors)
							: [errorObject.e]);
				}
			}

			if (isArray(_subscriptions)) {
				index = -1;
				len = _subscriptions.length;

				while (++index < len) {
					var sub = _subscriptions[index];

					if (isObject(sub)) {
						var trial = tryCatch$2(sub.unsubscribe).call(sub);

						if (trial === errorObject) {
							hasErrors = true;
							errors = errors || [];
							var err = errorObject.e;

							if (err instanceof UnsubscriptionError) {
								errors = errors.concat(
									flattenUnsubscriptionErrors(err.errors)
								);
							} else {
								errors.push(err);
							}
						}
					}
				}
			}

			if (hasErrors) {
				throw new UnsubscriptionError(errors);
			}
		};

		Subscription.prototype.add = function(teardown) {
			if (!teardown || teardown === Subscription.EMPTY) {
				return Subscription.EMPTY;
			}

			if (teardown === this) {
				return this;
			}

			var subscription = teardown;

			switch (typeof teardown) {
				case "function":
					subscription = new Subscription(teardown);

				case "object":
					if (
						subscription.closed ||
						typeof subscription.unsubscribe !== "function"
					) {
						return subscription;
					} else if (this.closed) {
						subscription.unsubscribe();
						return subscription;
					} else if (typeof subscription._addParent !== "function") {
						var tmp = subscription;
						subscription = new Subscription();
						subscription._subscriptions = [tmp];
					}

					break;

				default:
					throw new Error(
						"unrecognized teardown " +
							teardown +
							" added to Subscription."
					);
			}

			var subscriptions =
				this._subscriptions || (this._subscriptions = []);
			subscriptions.push(subscription);

			subscription._addParent(this);

			return subscription;
		};

		Subscription.prototype.remove = function(subscription) {
			var subscriptions = this._subscriptions;

			if (subscriptions) {
				var subscriptionIndex = subscriptions.indexOf(subscription);

				if (subscriptionIndex !== -1) {
					subscriptions.splice(subscriptionIndex, 1);
				}
			}
		};

		Subscription.prototype._addParent = function(parent) {
			var _a = this,
				_parent = _a._parent,
				_parents = _a._parents;

			if (!_parent || _parent === parent) {
				this._parent = parent;
			} else if (!_parents) {
				this._parents = [parent];
			} else if (_parents.indexOf(parent) === -1) {
				_parents.push(parent);
			}
		};

		Subscription.EMPTY = (function(empty) {
			empty.closed = true;
			return empty;
		})(new Subscription());

		return Subscription;
	})();

function flattenUnsubscriptionErrors(errors) {
	return errors.reduce(function(errs, err) {
		return errs.concat(
			err instanceof UnsubscriptionError ? err.errors : err
		);
	}, []);
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var rxSubscriber =
	typeof Symbol === "function"
		? /*@__PURE__*/
		  Symbol("rxSubscriber")
		: "@@rxSubscriber_" +
		  /*@__PURE__*/
		  Math.random();

/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */

var Subscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(Subscriber, _super);

		function Subscriber(destinationOrNext, error, complete) {
			var _this = _super.call(this) || this;

			_this.syncErrorValue = null;
			_this.syncErrorThrown = false;
			_this.syncErrorThrowable = false;
			_this.isStopped = false;
			_this._parentSubscription = null;

			switch (arguments.length) {
				case 0:
					_this.destination = empty$1;
					break;

				case 1:
					if (!destinationOrNext) {
						_this.destination = empty$1;
						break;
					}

					if (typeof destinationOrNext === "object") {
						if (destinationOrNext instanceof Subscriber) {
							_this.syncErrorThrowable =
								destinationOrNext.syncErrorThrowable;
							_this.destination = destinationOrNext;
							destinationOrNext.add(_this);
						} else {
							_this.syncErrorThrowable = true;
							_this.destination = new SafeSubscriber(
								_this,
								destinationOrNext
							);
						}

						break;
					}

				default:
					_this.syncErrorThrowable = true;
					_this.destination = new SafeSubscriber(
						_this,
						destinationOrNext,
						error,
						complete
					);
					break;
			}

			return _this;
		}

		Subscriber.prototype[rxSubscriber] = function() {
			return this;
		};

		Subscriber.create = function(next, error, complete) {
			var subscriber = new Subscriber(next, error, complete);
			subscriber.syncErrorThrowable = false;
			return subscriber;
		};

		Subscriber.prototype.next = function(value) {
			if (!this.isStopped) {
				this._next(value);
			}
		};

		Subscriber.prototype.error = function(err) {
			if (!this.isStopped) {
				this.isStopped = true;

				this._error(err);
			}
		};

		Subscriber.prototype.complete = function() {
			if (!this.isStopped) {
				this.isStopped = true;

				this._complete();
			}
		};

		Subscriber.prototype.unsubscribe = function() {
			if (this.closed) {
				return;
			}

			this.isStopped = true;

			_super.prototype.unsubscribe.call(this);
		};

		Subscriber.prototype._next = function(value) {
			this.destination.next(value);
		};

		Subscriber.prototype._error = function(err) {
			this.destination.error(err);
			this.unsubscribe();
		};

		Subscriber.prototype._complete = function() {
			this.destination.complete();
			this.unsubscribe();
		};

		Subscriber.prototype._unsubscribeAndRecycle = function() {
			var _a = this,
				_parent = _a._parent,
				_parents = _a._parents;

			this._parent = null;
			this._parents = null;
			this.unsubscribe();
			this.closed = false;
			this.isStopped = false;
			this._parent = _parent;
			this._parents = _parents;
			this._parentSubscription = null;
			return this;
		};

		return Subscriber;
	})(Subscription$1);

var SafeSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SafeSubscriber, _super);

		function SafeSubscriber(
			_parentSubscriber,
			observerOrNext,
			error,
			complete
		) {
			var _this = _super.call(this) || this;

			_this._parentSubscriber = _parentSubscriber;
			var next;
			var context = _this;

			if (isFunction(observerOrNext)) {
				next = observerOrNext;
			} else if (observerOrNext) {
				next = observerOrNext.next;
				error = observerOrNext.error;
				complete = observerOrNext.complete;

				if (observerOrNext !== empty$1) {
					context = Object.create(observerOrNext);

					if (isFunction(context.unsubscribe)) {
						_this.add(context.unsubscribe.bind(context));
					}

					context.unsubscribe = _this.unsubscribe.bind(_this);
				}
			}

			_this._context = context;
			_this._next = next;
			_this._error = error;
			_this._complete = complete;
			return _this;
		}

		SafeSubscriber.prototype.next = function(value) {
			if (!this.isStopped && this._next) {
				var _parentSubscriber = this._parentSubscriber;

				if (
					!config.useDeprecatedSynchronousErrorHandling ||
					!_parentSubscriber.syncErrorThrowable
				) {
					this.__tryOrUnsub(this._next, value);
				} else if (
					this.__tryOrSetError(_parentSubscriber, this._next, value)
				) {
					this.unsubscribe();
				}
			}
		};

		SafeSubscriber.prototype.error = function(err) {
			if (!this.isStopped) {
				var _parentSubscriber = this._parentSubscriber;
				var useDeprecatedSynchronousErrorHandling =
					config.useDeprecatedSynchronousErrorHandling;

				if (this._error) {
					if (
						!useDeprecatedSynchronousErrorHandling ||
						!_parentSubscriber.syncErrorThrowable
					) {
						this.__tryOrUnsub(this._error, err);

						this.unsubscribe();
					} else {
						this.__tryOrSetError(
							_parentSubscriber,
							this._error,
							err
						);

						this.unsubscribe();
					}
				} else if (!_parentSubscriber.syncErrorThrowable) {
					this.unsubscribe();

					if (useDeprecatedSynchronousErrorHandling) {
						throw err;
					}

					hostReportError(err);
				} else {
					if (useDeprecatedSynchronousErrorHandling) {
						_parentSubscriber.syncErrorValue = err;
						_parentSubscriber.syncErrorThrown = true;
					} else {
						hostReportError(err);
					}

					this.unsubscribe();
				}
			}
		};

		SafeSubscriber.prototype.complete = function() {
			var _this = this;

			if (!this.isStopped) {
				var _parentSubscriber = this._parentSubscriber;

				if (this._complete) {
					var wrappedComplete = function wrappedComplete() {
						return _this._complete.call(_this._context);
					};

					if (
						!config.useDeprecatedSynchronousErrorHandling ||
						!_parentSubscriber.syncErrorThrowable
					) {
						this.__tryOrUnsub(wrappedComplete);

						this.unsubscribe();
					} else {
						this.__tryOrSetError(
							_parentSubscriber,
							wrappedComplete
						);

						this.unsubscribe();
					}
				} else {
					this.unsubscribe();
				}
			}
		};

		SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
			try {
				fn.call(this._context, value);
			} catch (err) {
				this.unsubscribe();

				if (config.useDeprecatedSynchronousErrorHandling) {
					throw err;
				} else {
					hostReportError(err);
				}
			}
		};

		SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
			if (!config.useDeprecatedSynchronousErrorHandling) {
				throw new Error("bad call");
			}

			try {
				fn.call(this._context, value);
			} catch (err) {
				if (config.useDeprecatedSynchronousErrorHandling) {
					parent.syncErrorValue = err;
					parent.syncErrorThrown = true;
					return true;
				} else {
					hostReportError(err);
					return true;
				}
			}

			return false;
		};

		SafeSubscriber.prototype._unsubscribe = function() {
			var _parentSubscriber = this._parentSubscriber;
			this._context = null;
			this._parentSubscriber = null;

			_parentSubscriber.unsubscribe();
		};

		return SafeSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
function canReportError(observer) {
	while (observer) {
		var _a = observer,
			closed_1 = _a.closed,
			destination = _a.destination,
			isStopped = _a.isStopped;

		if (closed_1 || isStopped) {
			return false;
		} else if (destination && destination instanceof Subscriber) {
			observer = destination;
		} else {
			observer = null;
		}
	}

	return true;
}

/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
function toSubscriber(nextOrObserver, error, complete) {
	if (nextOrObserver) {
		if (nextOrObserver instanceof Subscriber) {
			return nextOrObserver;
		}

		if (nextOrObserver[rxSubscriber]) {
			return nextOrObserver[rxSubscriber]();
		}
	}

	if (!nextOrObserver && !error && !complete) {
		return new Subscriber(empty$1);
	}

	return new Subscriber(nextOrObserver, error, complete);
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var observable =
	(typeof Symbol === "function" && Symbol.observable) || "@@observable";

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop$2() {}

/** PURE_IMPORTS_START _noop PURE_IMPORTS_END */
function pipeFromArray(fns) {
	if (!fns) {
		return noop$2;
	}

	if (fns.length === 1) {
		return fns[0];
	}

	return function piped(input) {
		return fns.reduce(function(prev, fn) {
			return fn(prev);
		}, input);
	};
}

/** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_internal_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */

var Observable =
	/*@__PURE__*/
	(function() {
		function Observable(subscribe) {
			this._isScalar = false;

			if (subscribe) {
				this._subscribe = subscribe;
			}
		}

		Observable.prototype.lift = function(operator) {
			var observable$$1 = new Observable();
			observable$$1.source = this;
			observable$$1.operator = operator;
			return observable$$1;
		};

		Observable.prototype.subscribe = function(
			observerOrNext,
			error,
			complete
		) {
			var operator = this.operator;
			var sink = toSubscriber(observerOrNext, error, complete);

			if (operator) {
				operator.call(sink, this.source);
			} else {
				sink.add(
					this.source ||
					(config.useDeprecatedSynchronousErrorHandling &&
						!sink.syncErrorThrowable)
						? this._subscribe(sink)
						: this._trySubscribe(sink)
				);
			}

			if (config.useDeprecatedSynchronousErrorHandling) {
				if (sink.syncErrorThrowable) {
					sink.syncErrorThrowable = false;

					if (sink.syncErrorThrown) {
						throw sink.syncErrorValue;
					}
				}
			}

			return sink;
		};

		Observable.prototype._trySubscribe = function(sink) {
			try {
				return this._subscribe(sink);
			} catch (err) {
				if (config.useDeprecatedSynchronousErrorHandling) {
					sink.syncErrorThrown = true;
					sink.syncErrorValue = err;
				}

				if (canReportError(sink)) {
					sink.error(err);
				} else {
					console.warn(err);
				}
			}
		};

		Observable.prototype.forEach = function(next, promiseCtor) {
			var _this = this;

			promiseCtor = getPromiseCtor(promiseCtor);
			return new promiseCtor(function(resolve, reject) {
				var subscription;
				subscription = _this.subscribe(
					function(value) {
						try {
							next(value);
						} catch (err) {
							reject(err);

							if (subscription) {
								subscription.unsubscribe();
							}
						}
					},
					reject,
					resolve
				);
			});
		};

		Observable.prototype._subscribe = function(subscriber) {
			var source = this.source;
			return source && source.subscribe(subscriber);
		};

		Observable.prototype[observable] = function() {
			return this;
		};

		Observable.prototype.pipe = function() {
			var operations = [];

			for (var _i = 0; _i < arguments.length; _i++) {
				operations[_i] = arguments[_i];
			}

			if (operations.length === 0) {
				return this;
			}

			return pipeFromArray(operations)(this);
		};

		Observable.prototype.toPromise = function(promiseCtor) {
			var _this = this;

			promiseCtor = getPromiseCtor(promiseCtor);
			return new promiseCtor(function(resolve, reject) {
				var value;

				_this.subscribe(
					function(x) {
						return (value = x);
					},
					function(err) {
						return reject(err);
					},
					function() {
						return resolve(value);
					}
				);
			});
		};

		Observable.create = function(subscribe) {
			return new Observable(subscribe);
		};

		return Observable;
	})();

function getPromiseCtor(promiseCtor) {
	if (!promiseCtor) {
		promiseCtor = config.Promise || Promise;
	}

	if (!promiseCtor) {
		throw new Error("no Promise impl found");
	}

	return promiseCtor;
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function ObjectUnsubscribedErrorImpl() {
	Error.call(this);
	this.message = "object unsubscribed";
	this.name = "ObjectUnsubscribedError";
	return this;
}

ObjectUnsubscribedErrorImpl.prototype =
	/*@__PURE__*/
	Object.create(Error.prototype);
var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */

var SubjectSubscription =
	/*@__PURE__*/
	(function(_super) {
		__extends(SubjectSubscription, _super);

		function SubjectSubscription(subject, subscriber) {
			var _this = _super.call(this) || this;

			_this.subject = subject;
			_this.subscriber = subscriber;
			_this.closed = false;
			return _this;
		}

		SubjectSubscription.prototype.unsubscribe = function() {
			if (this.closed) {
				return;
			}

			this.closed = true;
			var subject = this.subject;
			var observers = subject.observers;
			this.subject = null;

			if (
				!observers ||
				observers.length === 0 ||
				subject.isStopped ||
				subject.closed
			) {
				return;
			}

			var subscriberIndex = observers.indexOf(this.subscriber);

			if (subscriberIndex !== -1) {
				observers.splice(subscriberIndex, 1);
			}
		};

		return SubjectSubscription;
	})(Subscription$1);

/** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */

var SubjectSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SubjectSubscriber, _super);

		function SubjectSubscriber(destination) {
			var _this = _super.call(this, destination) || this;

			_this.destination = destination;
			return _this;
		}

		return SubjectSubscriber;
	})(Subscriber);

var Subject =
	/*@__PURE__*/
	(function(_super) {
		__extends(Subject, _super);

		function Subject() {
			var _this = _super.call(this) || this;

			_this.observers = [];
			_this.closed = false;
			_this.isStopped = false;
			_this.hasError = false;
			_this.thrownError = null;
			return _this;
		}

		Subject.prototype[rxSubscriber] = function() {
			return new SubjectSubscriber(this);
		};

		Subject.prototype.lift = function(operator) {
			var subject = new AnonymousSubject(this, this);
			subject.operator = operator;
			return subject;
		};

		Subject.prototype.next = function(value) {
			if (this.closed) {
				throw new ObjectUnsubscribedError();
			}

			if (!this.isStopped) {
				var observers = this.observers;
				var len = observers.length;
				var copy = observers.slice();

				for (var i = 0; i < len; i++) {
					copy[i].next(value);
				}
			}
		};

		Subject.prototype.error = function(err) {
			if (this.closed) {
				throw new ObjectUnsubscribedError();
			}

			this.hasError = true;
			this.thrownError = err;
			this.isStopped = true;
			var observers = this.observers;
			var len = observers.length;
			var copy = observers.slice();

			for (var i = 0; i < len; i++) {
				copy[i].error(err);
			}

			this.observers.length = 0;
		};

		Subject.prototype.complete = function() {
			if (this.closed) {
				throw new ObjectUnsubscribedError();
			}

			this.isStopped = true;
			var observers = this.observers;
			var len = observers.length;
			var copy = observers.slice();

			for (var i = 0; i < len; i++) {
				copy[i].complete();
			}

			this.observers.length = 0;
		};

		Subject.prototype.unsubscribe = function() {
			this.isStopped = true;
			this.closed = true;
			this.observers = null;
		};

		Subject.prototype._trySubscribe = function(subscriber) {
			if (this.closed) {
				throw new ObjectUnsubscribedError();
			} else {
				return _super.prototype._trySubscribe.call(this, subscriber);
			}
		};

		Subject.prototype._subscribe = function(subscriber) {
			if (this.closed) {
				throw new ObjectUnsubscribedError();
			} else if (this.hasError) {
				subscriber.error(this.thrownError);
				return Subscription$1.EMPTY;
			} else if (this.isStopped) {
				subscriber.complete();
				return Subscription$1.EMPTY;
			} else {
				this.observers.push(subscriber);
				return new SubjectSubscription(this, subscriber);
			}
		};

		Subject.prototype.asObservable = function() {
			var observable = new Observable();
			observable.source = this;
			return observable;
		};

		Subject.create = function(destination, source) {
			return new AnonymousSubject(destination, source);
		};

		return Subject;
	})(Observable);

var AnonymousSubject =
	/*@__PURE__*/
	(function(_super) {
		__extends(AnonymousSubject, _super);

		function AnonymousSubject(destination, source) {
			var _this = _super.call(this) || this;

			_this.destination = destination;
			_this.source = source;
			return _this;
		}

		AnonymousSubject.prototype.next = function(value) {
			var destination = this.destination;

			if (destination && destination.next) {
				destination.next(value);
			}
		};

		AnonymousSubject.prototype.error = function(err) {
			var destination = this.destination;

			if (destination && destination.error) {
				this.destination.error(err);
			}
		};

		AnonymousSubject.prototype.complete = function() {
			var destination = this.destination;

			if (destination && destination.complete) {
				this.destination.complete();
			}
		};

		AnonymousSubject.prototype._subscribe = function(subscriber) {
			var source = this.source;

			if (source) {
				return this.source.subscribe(subscriber);
			} else {
				return Subscription$1.EMPTY;
			}
		};

		return AnonymousSubject;
	})(Subject);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
function refCount() {
	return function refCountOperatorFunction(source) {
		return source.lift(new RefCountOperator(source));
	};
}

var RefCountOperator =
	/*@__PURE__*/
	(function() {
		function RefCountOperator(connectable) {
			this.connectable = connectable;
		}

		RefCountOperator.prototype.call = function(subscriber, source) {
			var connectable = this.connectable;
			connectable._refCount++;
			var refCounter = new RefCountSubscriber(subscriber, connectable);
			var subscription = source.subscribe(refCounter);

			if (!refCounter.closed) {
				refCounter.connection = connectable.connect();
			}

			return subscription;
		};

		return RefCountOperator;
	})();

var RefCountSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(RefCountSubscriber, _super);

		function RefCountSubscriber(destination, connectable) {
			var _this = _super.call(this, destination) || this;

			_this.connectable = connectable;
			return _this;
		}

		RefCountSubscriber.prototype._unsubscribe = function() {
			var connectable = this.connectable;

			if (!connectable) {
				this.connection = null;
				return;
			}

			this.connectable = null;
			var refCount = connectable._refCount;

			if (refCount <= 0) {
				this.connection = null;
				return;
			}

			connectable._refCount = refCount - 1;

			if (refCount > 1) {
				this.connection = null;
				return;
			}

			var connection = this.connection;
			var sharedConnection = connectable._connection;
			this.connection = null;

			if (
				sharedConnection &&
				(!connection || sharedConnection === connection)
			) {
				sharedConnection.unsubscribe();
			}
		};

		return RefCountSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */

var ConnectableObservable =
	/*@__PURE__*/
	(function(_super) {
		__extends(ConnectableObservable, _super);

		function ConnectableObservable(source, subjectFactory) {
			var _this = _super.call(this) || this;

			_this.source = source;
			_this.subjectFactory = subjectFactory;
			_this._refCount = 0;
			_this._isComplete = false;
			return _this;
		}

		ConnectableObservable.prototype._subscribe = function(subscriber) {
			return this.getSubject().subscribe(subscriber);
		};

		ConnectableObservable.prototype.getSubject = function() {
			var subject = this._subject;

			if (!subject || subject.isStopped) {
				this._subject = this.subjectFactory();
			}

			return this._subject;
		};

		ConnectableObservable.prototype.connect = function() {
			var connection = this._connection;

			if (!connection) {
				this._isComplete = false;
				connection = this._connection = new Subscription$1();
				connection.add(
					this.source.subscribe(
						new ConnectableSubscriber(this.getSubject(), this)
					)
				);

				if (connection.closed) {
					this._connection = null;
					connection = Subscription$1.EMPTY;
				} else {
					this._connection = connection;
				}
			}

			return connection;
		};

		ConnectableObservable.prototype.refCount = function() {
			return refCount()(this);
		};

		return ConnectableObservable;
	})(Observable);
var connectableProto = ConnectableObservable.prototype;
var connectableObservableDescriptor = {
	operator: {
		value: null
	},
	_refCount: {
		value: 0,
		writable: true
	},
	_subject: {
		value: null,
		writable: true
	},
	_connection: {
		value: null,
		writable: true
	},
	_subscribe: {
		value: connectableProto._subscribe
	},
	_isComplete: {
		value: connectableProto._isComplete,
		writable: true
	},
	getSubject: {
		value: connectableProto.getSubject
	},
	connect: {
		value: connectableProto.connect
	},
	refCount: {
		value: connectableProto.refCount
	}
};

var ConnectableSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(ConnectableSubscriber, _super);

		function ConnectableSubscriber(destination, connectable) {
			var _this = _super.call(this, destination) || this;

			_this.connectable = connectable;
			return _this;
		}

		ConnectableSubscriber.prototype._error = function(err) {
			this._unsubscribe();

			_super.prototype._error.call(this, err);
		};

		ConnectableSubscriber.prototype._complete = function() {
			this.connectable._isComplete = true;

			this._unsubscribe();

			_super.prototype._complete.call(this);
		};

		ConnectableSubscriber.prototype._unsubscribe = function() {
			var connectable = this.connectable;

			if (connectable) {
				this.connectable = null;
				var connection = connectable._connection;
				connectable._refCount = 0;
				connectable._subject = null;
				connectable._connection = null;

				if (connection) {
					connection.unsubscribe();
				}
			}
		};

		return ConnectableSubscriber;
	})(SubjectSubscriber);

var RefCountSubscriber$1 =
	/*@__PURE__*/
	(function(_super) {
		__extends(RefCountSubscriber, _super);

		function RefCountSubscriber(destination, connectable) {
			var _this = _super.call(this, destination) || this;

			_this.connectable = connectable;
			return _this;
		}

		RefCountSubscriber.prototype._unsubscribe = function() {
			var connectable = this.connectable;

			if (!connectable) {
				this.connection = null;
				return;
			}

			this.connectable = null;
			var refCount$$1 = connectable._refCount;

			if (refCount$$1 <= 0) {
				this.connection = null;
				return;
			}

			connectable._refCount = refCount$$1 - 1;

			if (refCount$$1 > 1) {
				this.connection = null;
				return;
			}

			var connection = this.connection;
			var sharedConnection = connectable._connection;
			this.connection = null;

			if (
				sharedConnection &&
				(!connection || sharedConnection === connection)
			) {
				sharedConnection.unsubscribe();
			}
		};

		return RefCountSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */

var GroupBySubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(GroupBySubscriber, _super);

		function GroupBySubscriber(
			destination,
			keySelector,
			elementSelector,
			durationSelector,
			subjectSelector
		) {
			var _this = _super.call(this, destination) || this;

			_this.keySelector = keySelector;
			_this.elementSelector = elementSelector;
			_this.durationSelector = durationSelector;
			_this.subjectSelector = subjectSelector;
			_this.groups = null;
			_this.attemptedToUnsubscribe = false;
			_this.count = 0;
			return _this;
		}

		GroupBySubscriber.prototype._next = function(value) {
			var key;

			try {
				key = this.keySelector(value);
			} catch (err) {
				this.error(err);
				return;
			}

			this._group(value, key);
		};

		GroupBySubscriber.prototype._group = function(value, key) {
			var groups = this.groups;

			if (!groups) {
				groups = this.groups = new Map();
			}

			var group = groups.get(key);
			var element;

			if (this.elementSelector) {
				try {
					element = this.elementSelector(value);
				} catch (err) {
					this.error(err);
				}
			} else {
				element = value;
			}

			if (!group) {
				group = this.subjectSelector
					? this.subjectSelector()
					: new Subject();
				groups.set(key, group);
				var groupedObservable = new GroupedObservable(key, group, this);
				this.destination.next(groupedObservable);

				if (this.durationSelector) {
					var duration = void 0;

					try {
						duration = this.durationSelector(
							new GroupedObservable(key, group)
						);
					} catch (err) {
						this.error(err);
						return;
					}

					this.add(
						duration.subscribe(
							new GroupDurationSubscriber(key, group, this)
						)
					);
				}
			}

			if (!group.closed) {
				group.next(element);
			}
		};

		GroupBySubscriber.prototype._error = function(err) {
			var groups = this.groups;

			if (groups) {
				groups.forEach(function(group, key) {
					group.error(err);
				});
				groups.clear();
			}

			this.destination.error(err);
		};

		GroupBySubscriber.prototype._complete = function() {
			var groups = this.groups;

			if (groups) {
				groups.forEach(function(group, key) {
					group.complete();
				});
				groups.clear();
			}

			this.destination.complete();
		};

		GroupBySubscriber.prototype.removeGroup = function(key) {
			this.groups.delete(key);
		};

		GroupBySubscriber.prototype.unsubscribe = function() {
			if (!this.closed) {
				this.attemptedToUnsubscribe = true;

				if (this.count === 0) {
					_super.prototype.unsubscribe.call(this);
				}
			}
		};

		return GroupBySubscriber;
	})(Subscriber);

var GroupDurationSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(GroupDurationSubscriber, _super);

		function GroupDurationSubscriber(key, group, parent) {
			var _this = _super.call(this, group) || this;

			_this.key = key;
			_this.group = group;
			_this.parent = parent;
			return _this;
		}

		GroupDurationSubscriber.prototype._next = function(value) {
			this.complete();
		};

		GroupDurationSubscriber.prototype._unsubscribe = function() {
			var _a = this,
				parent = _a.parent,
				key = _a.key;

			this.key = this.parent = null;

			if (parent) {
				parent.removeGroup(key);
			}
		};

		return GroupDurationSubscriber;
	})(Subscriber);

var GroupedObservable =
	/*@__PURE__*/
	(function(_super) {
		__extends(GroupedObservable, _super);

		function GroupedObservable(key, groupSubject, refCountSubscription) {
			var _this = _super.call(this) || this;

			_this.key = key;
			_this.groupSubject = groupSubject;
			_this.refCountSubscription = refCountSubscription;
			return _this;
		}

		GroupedObservable.prototype._subscribe = function(subscriber) {
			var subscription = new Subscription$1();

			var _a = this,
				refCountSubscription = _a.refCountSubscription,
				groupSubject = _a.groupSubject;

			if (refCountSubscription && !refCountSubscription.closed) {
				subscription.add(
					new InnerRefCountSubscription(refCountSubscription)
				);
			}

			subscription.add(groupSubject.subscribe(subscriber));
			return subscription;
		};

		return GroupedObservable;
	})(Observable);

var InnerRefCountSubscription =
	/*@__PURE__*/
	(function(_super) {
		__extends(InnerRefCountSubscription, _super);

		function InnerRefCountSubscription(parent) {
			var _this = _super.call(this) || this;

			_this.parent = parent;
			parent.count++;
			return _this;
		}

		InnerRefCountSubscription.prototype.unsubscribe = function() {
			var parent = this.parent;

			if (!parent.closed && !this.closed) {
				_super.prototype.unsubscribe.call(this);

				parent.count -= 1;

				if (parent.count === 0 && parent.attemptedToUnsubscribe) {
					parent.unsubscribe();
				}
			}
		};

		return InnerRefCountSubscription;
	})(Subscription$1);

/** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */

var BehaviorSubject =
	/*@__PURE__*/
	(function(_super) {
		__extends(BehaviorSubject, _super);

		function BehaviorSubject(_value) {
			var _this = _super.call(this) || this;

			_this._value = _value;
			return _this;
		}

		Object.defineProperty(BehaviorSubject.prototype, "value", {
			get: function get() {
				return this.getValue();
			},
			enumerable: true,
			configurable: true
		});

		BehaviorSubject.prototype._subscribe = function(subscriber) {
			var subscription = _super.prototype._subscribe.call(
				this,
				subscriber
			);

			if (subscription && !subscription.closed) {
				subscriber.next(this._value);
			}

			return subscription;
		};

		BehaviorSubject.prototype.getValue = function() {
			if (this.hasError) {
				throw this.thrownError;
			} else if (this.closed) {
				throw new ObjectUnsubscribedError();
			} else {
				return this._value;
			}
		};

		BehaviorSubject.prototype.next = function(value) {
			_super.prototype.next.call(this, (this._value = value));
		};

		return BehaviorSubject;
	})(Subject);

/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */

var Action =
	/*@__PURE__*/
	(function(_super) {
		__extends(Action, _super);

		function Action(scheduler, work) {
			return _super.call(this) || this;
		}

		Action.prototype.schedule = function(state, delay) {
			if (delay === void 0) {
				delay = 0;
			}

			return this;
		};

		return Action;
	})(Subscription$1);

/** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */

var AsyncAction =
	/*@__PURE__*/
	(function(_super) {
		__extends(AsyncAction, _super);

		function AsyncAction(scheduler, work) {
			var _this = _super.call(this, scheduler, work) || this;

			_this.scheduler = scheduler;
			_this.work = work;
			_this.pending = false;
			return _this;
		}

		AsyncAction.prototype.schedule = function(state, delay) {
			if (delay === void 0) {
				delay = 0;
			}

			if (this.closed) {
				return this;
			}

			this.state = state;
			var id = this.id;
			var scheduler = this.scheduler;

			if (id != null) {
				this.id = this.recycleAsyncId(scheduler, id, delay);
			}

			this.pending = true;
			this.delay = delay;
			this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
			return this;
		};

		AsyncAction.prototype.requestAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) {
				delay = 0;
			}

			return setInterval(scheduler.flush.bind(scheduler, this), delay);
		};

		AsyncAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) {
				delay = 0;
			}

			if (
				delay !== null &&
				this.delay === delay &&
				this.pending === false
			) {
				return id;
			}

			clearInterval(id);
		};

		AsyncAction.prototype.execute = function(state, delay) {
			if (this.closed) {
				return new Error("executing a cancelled action");
			}

			this.pending = false;

			var error = this._execute(state, delay);

			if (error) {
				return error;
			} else if (this.pending === false && this.id != null) {
				this.id = this.recycleAsyncId(this.scheduler, this.id, null);
			}
		};

		AsyncAction.prototype._execute = function(state, delay) {
			var errored = false;
			var errorValue = undefined;

			try {
				this.work(state);
			} catch (e) {
				errored = true;
				errorValue = (!!e && e) || new Error(e);
			}

			if (errored) {
				this.unsubscribe();
				return errorValue;
			}
		};

		AsyncAction.prototype._unsubscribe = function() {
			var id = this.id;
			var scheduler = this.scheduler;
			var actions = scheduler.actions;
			var index = actions.indexOf(this);
			this.work = null;
			this.state = null;
			this.pending = false;
			this.scheduler = null;

			if (index !== -1) {
				actions.splice(index, 1);
			}

			if (id != null) {
				this.id = this.recycleAsyncId(scheduler, id, null);
			}

			this.delay = null;
		};

		return AsyncAction;
	})(Action);

/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */

var QueueAction =
	/*@__PURE__*/
	(function(_super) {
		__extends(QueueAction, _super);

		function QueueAction(scheduler, work) {
			var _this = _super.call(this, scheduler, work) || this;

			_this.scheduler = scheduler;
			_this.work = work;
			return _this;
		}

		QueueAction.prototype.schedule = function(state, delay) {
			if (delay === void 0) {
				delay = 0;
			}

			if (delay > 0) {
				return _super.prototype.schedule.call(this, state, delay);
			}

			this.delay = delay;
			this.state = state;
			this.scheduler.flush(this);
			return this;
		};

		QueueAction.prototype.execute = function(state, delay) {
			return delay > 0 || this.closed
				? _super.prototype.execute.call(this, state, delay)
				: this._execute(state, delay);
		};

		QueueAction.prototype.requestAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) {
				delay = 0;
			}

			if (
				(delay !== null && delay > 0) ||
				(delay === null && this.delay > 0)
			) {
				return _super.prototype.requestAsyncId.call(
					this,
					scheduler,
					id,
					delay
				);
			}

			return scheduler.flush(this);
		};

		return QueueAction;
	})(AsyncAction);

var Scheduler =
	/*@__PURE__*/
	(function() {
		function Scheduler(SchedulerAction, now) {
			if (now === void 0) {
				now = Scheduler.now;
			}

			this.SchedulerAction = SchedulerAction;
			this.now = now;
		}

		Scheduler.prototype.schedule = function(work, delay, state) {
			if (delay === void 0) {
				delay = 0;
			}

			return new this.SchedulerAction(this, work).schedule(state, delay);
		};

		Scheduler.now = function() {
			return Date.now();
		};

		return Scheduler;
	})();

/** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */

var AsyncScheduler =
	/*@__PURE__*/
	(function(_super) {
		__extends(AsyncScheduler, _super);

		function AsyncScheduler(SchedulerAction, now) {
			if (now === void 0) {
				now = Scheduler.now;
			}

			var _this =
				_super.call(this, SchedulerAction, function() {
					if (
						AsyncScheduler.delegate &&
						AsyncScheduler.delegate !== _this
					) {
						return AsyncScheduler.delegate.now();
					} else {
						return now();
					}
				}) || this;

			_this.actions = [];
			_this.active = false;
			_this.scheduled = undefined;
			return _this;
		}

		AsyncScheduler.prototype.schedule = function(work, delay, state) {
			if (delay === void 0) {
				delay = 0;
			}

			if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
				return AsyncScheduler.delegate.schedule(work, delay, state);
			} else {
				return _super.prototype.schedule.call(this, work, delay, state);
			}
		};

		AsyncScheduler.prototype.flush = function(action) {
			var actions = this.actions;

			if (this.active) {
				actions.push(action);
				return;
			}

			var error;
			this.active = true;

			do {
				if ((error = action.execute(action.state, action.delay))) {
					break;
				}
			} while ((action = actions.shift()));

			this.active = false;

			if (error) {
				while ((action = actions.shift())) {
					action.unsubscribe();
				}

				throw error;
			}
		};

		return AsyncScheduler;
	})(Scheduler);

/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */

var QueueScheduler =
	/*@__PURE__*/
	(function(_super) {
		__extends(QueueScheduler, _super);

		function QueueScheduler() {
			return (_super !== null && _super.apply(this, arguments)) || this;
		}

		return QueueScheduler;
	})(AsyncScheduler);

/** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */
var queue =
	/*@__PURE__*/
	new QueueScheduler(QueueAction);

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
var EMPTY =
	/*@__PURE__*/
	new Observable(function(subscriber) {
		return subscriber.complete();
	});
function empty$2(scheduler) {
	return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
	return new Observable(function(subscriber) {
		return scheduler.schedule(function() {
			return subscriber.complete();
		});
	});
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
	return value && typeof value.schedule === "function";
}

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var subscribeToArray = function subscribeToArray(array) {
	return function(subscriber) {
		for (
			var i = 0, len = array.length;
			i < len && !subscriber.closed;
			i++
		) {
			subscriber.next(array[i]);
		}

		if (!subscriber.closed) {
			subscriber.complete();
		}
	};
};

/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToArray PURE_IMPORTS_END */
function fromArray(input, scheduler) {
	if (!scheduler) {
		return new Observable(subscribeToArray(input));
	} else {
		return new Observable(function(subscriber) {
			var sub = new Subscription$1();
			var i = 0;
			sub.add(
				scheduler.schedule(function() {
					if (i === input.length) {
						subscriber.complete();
						return;
					}

					subscriber.next(input[i++]);

					if (!subscriber.closed) {
						sub.add(this.schedule());
					}
				})
			);
			return sub;
		});
	}
}

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
function scalar(value) {
	var result = new Observable(function(subscriber) {
		subscriber.next(value);
		subscriber.complete();
	});
	result._isScalar = true;
	result.value = value;
	return result;
}

/** PURE_IMPORTS_START _util_isScheduler,_fromArray,_empty,_scalar PURE_IMPORTS_END */
function of$1() {
	var args = [];

	for (var _i = 0; _i < arguments.length; _i++) {
		args[_i] = arguments[_i];
	}

	var scheduler = args[args.length - 1];

	if (isScheduler(scheduler)) {
		args.pop();
	} else {
		scheduler = undefined;
	}

	switch (args.length) {
		case 0:
			return empty$2(scheduler);

		case 1:
			return scheduler ? fromArray(args, scheduler) : scalar(args[0]);

		default:
			return fromArray(args, scheduler);
	}
}

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
function throwError(error, scheduler) {
	if (!scheduler) {
		return new Observable(function(subscriber) {
			return subscriber.error(error);
		});
	} else {
		return new Observable(function(subscriber) {
			return scheduler.schedule(dispatch, 0, {
				error: error,
				subscriber: subscriber
			});
		});
	}
}

function dispatch(_a) {
	var error = _a.error,
		subscriber = _a.subscriber;
	subscriber.error(error);
}

/** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */

var Notification =
	/*@__PURE__*/
	(function() {
		function Notification(kind, value, error) {
			this.kind = kind;
			this.value = value;
			this.error = error;
			this.hasValue = kind === "N";
		}

		Notification.prototype.observe = function(observer) {
			switch (this.kind) {
				case "N":
					return observer.next && observer.next(this.value);

				case "E":
					return observer.error && observer.error(this.error);

				case "C":
					return observer.complete && observer.complete();
			}
		};

		Notification.prototype.do = function(next, error, complete) {
			var kind = this.kind;

			switch (kind) {
				case "N":
					return next && next(this.value);

				case "E":
					return error && error(this.error);

				case "C":
					return complete && complete();
			}
		};

		Notification.prototype.accept = function(
			nextOrObserver,
			error,
			complete
		) {
			if (nextOrObserver && typeof nextOrObserver.next === "function") {
				return this.observe(nextOrObserver);
			} else {
				return this.do(nextOrObserver, error, complete);
			}
		};

		Notification.prototype.toObservable = function() {
			var kind = this.kind;

			switch (kind) {
				case "N":
					return of$1(this.value);

				case "E":
					return throwError(this.error);

				case "C":
					return empty$2();
			}

			throw new Error("unexpected notification kind value");
		};

		Notification.createNext = function(value) {
			if (typeof value !== "undefined") {
				return new Notification("N", value);
			}

			return Notification.undefinedValueNotification;
		};

		Notification.createError = function(err) {
			return new Notification("E", undefined, err);
		};

		Notification.createComplete = function() {
			return Notification.completeNotification;
		};

		Notification.completeNotification = new Notification("C");
		Notification.undefinedValueNotification = new Notification(
			"N",
			undefined
		);
		return Notification;
	})();

/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */

var ObserveOnSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(ObserveOnSubscriber, _super);

		function ObserveOnSubscriber(destination, scheduler, delay) {
			if (delay === void 0) {
				delay = 0;
			}

			var _this = _super.call(this, destination) || this;

			_this.scheduler = scheduler;
			_this.delay = delay;
			return _this;
		}

		ObserveOnSubscriber.dispatch = function(arg) {
			var notification = arg.notification,
				destination = arg.destination;
			notification.observe(destination);
			this.unsubscribe();
		};

		ObserveOnSubscriber.prototype.scheduleMessage = function(notification) {
			var destination = this.destination;
			destination.add(
				this.scheduler.schedule(
					ObserveOnSubscriber.dispatch,
					this.delay,
					new ObserveOnMessage(notification, this.destination)
				)
			);
		};

		ObserveOnSubscriber.prototype._next = function(value) {
			this.scheduleMessage(Notification.createNext(value));
		};

		ObserveOnSubscriber.prototype._error = function(err) {
			this.scheduleMessage(Notification.createError(err));
			this.unsubscribe();
		};

		ObserveOnSubscriber.prototype._complete = function() {
			this.scheduleMessage(Notification.createComplete());
			this.unsubscribe();
		};

		return ObserveOnSubscriber;
	})(Subscriber);

var ObserveOnMessage =
	/*@__PURE__*/
	(function() {
		function ObserveOnMessage(notification, destination) {
			this.notification = notification;
			this.destination = destination;
		}

		return ObserveOnMessage;
	})();

/** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */

var ReplaySubject =
	/*@__PURE__*/
	(function(_super) {
		__extends(ReplaySubject, _super);

		function ReplaySubject(bufferSize, windowTime, scheduler) {
			if (bufferSize === void 0) {
				bufferSize = Number.POSITIVE_INFINITY;
			}

			if (windowTime === void 0) {
				windowTime = Number.POSITIVE_INFINITY;
			}

			var _this = _super.call(this) || this;

			_this.scheduler = scheduler;
			_this._events = [];
			_this._infiniteTimeWindow = false;
			_this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
			_this._windowTime = windowTime < 1 ? 1 : windowTime;

			if (windowTime === Number.POSITIVE_INFINITY) {
				_this._infiniteTimeWindow = true;
				_this.next = _this.nextInfiniteTimeWindow;
			} else {
				_this.next = _this.nextTimeWindow;
			}

			return _this;
		}

		ReplaySubject.prototype.nextInfiniteTimeWindow = function(value) {
			var _events = this._events;

			_events.push(value);

			if (_events.length > this._bufferSize) {
				_events.shift();
			}

			_super.prototype.next.call(this, value);
		};

		ReplaySubject.prototype.nextTimeWindow = function(value) {
			this._events.push(new ReplayEvent(this._getNow(), value));

			this._trimBufferThenGetEvents();

			_super.prototype.next.call(this, value);
		};

		ReplaySubject.prototype._subscribe = function(subscriber) {
			var _infiniteTimeWindow = this._infiniteTimeWindow;

			var _events = _infiniteTimeWindow
				? this._events
				: this._trimBufferThenGetEvents();

			var scheduler = this.scheduler;
			var len = _events.length;
			var subscription;

			if (this.closed) {
				throw new ObjectUnsubscribedError();
			} else if (this.isStopped || this.hasError) {
				subscription = Subscription$1.EMPTY;
			} else {
				this.observers.push(subscriber);
				subscription = new SubjectSubscription(this, subscriber);
			}

			if (scheduler) {
				subscriber.add(
					(subscriber = new ObserveOnSubscriber(
						subscriber,
						scheduler
					))
				);
			}

			if (_infiniteTimeWindow) {
				for (var i = 0; i < len && !subscriber.closed; i++) {
					subscriber.next(_events[i]);
				}
			} else {
				for (var i = 0; i < len && !subscriber.closed; i++) {
					subscriber.next(_events[i].value);
				}
			}

			if (this.hasError) {
				subscriber.error(this.thrownError);
			} else if (this.isStopped) {
				subscriber.complete();
			}

			return subscription;
		};

		ReplaySubject.prototype._getNow = function() {
			return (this.scheduler || queue).now();
		};

		ReplaySubject.prototype._trimBufferThenGetEvents = function() {
			var now = this._getNow();

			var _bufferSize = this._bufferSize;
			var _windowTime = this._windowTime;
			var _events = this._events;
			var eventsCount = _events.length;
			var spliceCount = 0;

			while (spliceCount < eventsCount) {
				if (now - _events[spliceCount].time < _windowTime) {
					break;
				}

				spliceCount++;
			}

			if (eventsCount > _bufferSize) {
				spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
			}

			if (spliceCount > 0) {
				_events.splice(0, spliceCount);
			}

			return _events;
		};

		return ReplaySubject;
	})(Subject);

var ReplayEvent =
	/*@__PURE__*/
	(function() {
		function ReplayEvent(time, value) {
			this.time = time;
			this.value = value;
		}

		return ReplayEvent;
	})();

/** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */

var AsyncSubject =
	/*@__PURE__*/
	(function(_super) {
		__extends(AsyncSubject, _super);

		function AsyncSubject() {
			var _this =
				(_super !== null && _super.apply(this, arguments)) || this;

			_this.value = null;
			_this.hasNext = false;
			_this.hasCompleted = false;
			return _this;
		}

		AsyncSubject.prototype._subscribe = function(subscriber) {
			if (this.hasError) {
				subscriber.error(this.thrownError);
				return Subscription$1.EMPTY;
			} else if (this.hasCompleted && this.hasNext) {
				subscriber.next(this.value);
				subscriber.complete();
				return Subscription$1.EMPTY;
			}

			return _super.prototype._subscribe.call(this, subscriber);
		};

		AsyncSubject.prototype.next = function(value) {
			if (!this.hasCompleted) {
				this.value = value;
				this.hasNext = true;
			}
		};

		AsyncSubject.prototype.error = function(error) {
			if (!this.hasCompleted) {
				_super.prototype.error.call(this, error);
			}
		};

		AsyncSubject.prototype.complete = function() {
			this.hasCompleted = true;

			if (this.hasNext) {
				_super.prototype.next.call(this, this.value);
			}

			_super.prototype.complete.call(this);
		};

		return AsyncSubject;
	})(Subject);

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var nextHandle = 1;
var tasksByHandle = {};

function runIfPresent(handle) {
	var cb = tasksByHandle[handle];

	if (cb) {
		cb();
	}
}

var Immediate = {
	setImmediate: function setImmediate(cb) {
		var handle = nextHandle++;
		tasksByHandle[handle] = cb;
		Promise.resolve().then(function() {
			return runIfPresent(handle);
		});
		return handle;
	},
	clearImmediate: function clearImmediate(handle) {
		delete tasksByHandle[handle];
	}
};

/** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */

var AsapAction =
	/*@__PURE__*/
	(function(_super) {
		__extends(AsapAction, _super);

		function AsapAction(scheduler, work) {
			var _this = _super.call(this, scheduler, work) || this;

			_this.scheduler = scheduler;
			_this.work = work;
			return _this;
		}

		AsapAction.prototype.requestAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) {
				delay = 0;
			}

			if (delay !== null && delay > 0) {
				return _super.prototype.requestAsyncId.call(
					this,
					scheduler,
					id,
					delay
				);
			}

			scheduler.actions.push(this);
			return (
				scheduler.scheduled ||
				(scheduler.scheduled = Immediate.setImmediate(
					scheduler.flush.bind(scheduler, null)
				))
			);
		};

		AsapAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
			if (delay === void 0) {
				delay = 0;
			}

			if (
				(delay !== null && delay > 0) ||
				(delay === null && this.delay > 0)
			) {
				return _super.prototype.recycleAsyncId.call(
					this,
					scheduler,
					id,
					delay
				);
			}

			if (scheduler.actions.length === 0) {
				Immediate.clearImmediate(id);
				scheduler.scheduled = undefined;
			}

			return undefined;
		};

		return AsapAction;
	})(AsyncAction);

/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */

var AsapScheduler =
	/*@__PURE__*/
	(function(_super) {
		__extends(AsapScheduler, _super);

		function AsapScheduler() {
			return (_super !== null && _super.apply(this, arguments)) || this;
		}

		AsapScheduler.prototype.flush = function(action) {
			this.active = true;
			this.scheduled = undefined;
			var actions = this.actions;
			var error;
			var index = -1;
			var count = actions.length;
			action = action || actions.shift();

			do {
				if ((error = action.execute(action.state, action.delay))) {
					break;
				}
			} while (++index < count && (action = actions.shift()));

			this.active = false;

			if (error) {
				while (++index < count && (action = actions.shift())) {
					action.unsubscribe();
				}

				throw error;
			}
		};

		return AsapScheduler;
	})(AsyncScheduler);

/** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */
var asap =
	/*@__PURE__*/
	new AsapScheduler(AsapAction);

/** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
var async =
	/*@__PURE__*/
	new AsyncScheduler(AsyncAction);

/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */

var AnimationFrameAction =
	/*@__PURE__*/
	(function(_super) {
		__extends(AnimationFrameAction, _super);

		function AnimationFrameAction(scheduler, work) {
			var _this = _super.call(this, scheduler, work) || this;

			_this.scheduler = scheduler;
			_this.work = work;
			return _this;
		}

		AnimationFrameAction.prototype.requestAsyncId = function(
			scheduler,
			id,
			delay
		) {
			if (delay === void 0) {
				delay = 0;
			}

			if (delay !== null && delay > 0) {
				return _super.prototype.requestAsyncId.call(
					this,
					scheduler,
					id,
					delay
				);
			}

			scheduler.actions.push(this);
			return (
				scheduler.scheduled ||
				(scheduler.scheduled = requestAnimationFrame(function() {
					return scheduler.flush(null);
				}))
			);
		};

		AnimationFrameAction.prototype.recycleAsyncId = function(
			scheduler,
			id,
			delay
		) {
			if (delay === void 0) {
				delay = 0;
			}

			if (
				(delay !== null && delay > 0) ||
				(delay === null && this.delay > 0)
			) {
				return _super.prototype.recycleAsyncId.call(
					this,
					scheduler,
					id,
					delay
				);
			}

			if (scheduler.actions.length === 0) {
				cancelAnimationFrame(id);
				scheduler.scheduled = undefined;
			}

			return undefined;
		};

		return AnimationFrameAction;
	})(AsyncAction);

/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */

var AnimationFrameScheduler =
	/*@__PURE__*/
	(function(_super) {
		__extends(AnimationFrameScheduler, _super);

		function AnimationFrameScheduler() {
			return (_super !== null && _super.apply(this, arguments)) || this;
		}

		AnimationFrameScheduler.prototype.flush = function(action) {
			this.active = true;
			this.scheduled = undefined;
			var actions = this.actions;
			var error;
			var index = -1;
			var count = actions.length;
			action = action || actions.shift();

			do {
				if ((error = action.execute(action.state, action.delay))) {
					break;
				}
			} while (++index < count && (action = actions.shift()));

			this.active = false;

			if (error) {
				while (++index < count && (action = actions.shift())) {
					action.unsubscribe();
				}

				throw error;
			}
		};

		return AnimationFrameScheduler;
	})(AsyncScheduler);

/** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */
var animationFrame =
	/*@__PURE__*/
	new AnimationFrameScheduler(AnimationFrameAction);

/** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */

var VirtualTimeScheduler =
	/*@__PURE__*/
	(function(_super) {
		__extends(VirtualTimeScheduler, _super);

		function VirtualTimeScheduler(SchedulerAction, maxFrames) {
			if (SchedulerAction === void 0) {
				SchedulerAction = VirtualAction;
			}

			if (maxFrames === void 0) {
				maxFrames = Number.POSITIVE_INFINITY;
			}

			var _this =
				_super.call(this, SchedulerAction, function() {
					return _this.frame;
				}) || this;

			_this.maxFrames = maxFrames;
			_this.frame = 0;
			_this.index = -1;
			return _this;
		}

		VirtualTimeScheduler.prototype.flush = function() {
			var _a = this,
				actions = _a.actions,
				maxFrames = _a.maxFrames;

			var error, action;

			while (
				(action = actions.shift()) &&
				(this.frame = action.delay) <= maxFrames
			) {
				if ((error = action.execute(action.state, action.delay))) {
					break;
				}
			}

			if (error) {
				while ((action = actions.shift())) {
					action.unsubscribe();
				}

				throw error;
			}
		};

		VirtualTimeScheduler.frameTimeFactor = 10;
		return VirtualTimeScheduler;
	})(AsyncScheduler);

var VirtualAction =
	/*@__PURE__*/
	(function(_super) {
		__extends(VirtualAction, _super);

		function VirtualAction(scheduler, work, index) {
			if (index === void 0) {
				index = scheduler.index += 1;
			}

			var _this = _super.call(this, scheduler, work) || this;

			_this.scheduler = scheduler;
			_this.work = work;
			_this.index = index;
			_this.active = true;
			_this.index = scheduler.index = index;
			return _this;
		}

		VirtualAction.prototype.schedule = function(state, delay) {
			if (delay === void 0) {
				delay = 0;
			}

			if (!this.id) {
				return _super.prototype.schedule.call(this, state, delay);
			}

			this.active = false;
			var action = new VirtualAction(this.scheduler, this.work);
			this.add(action);
			return action.schedule(state, delay);
		};

		VirtualAction.prototype.requestAsyncId = function(
			scheduler,
			id,
			delay
		) {
			if (delay === void 0) {
				delay = 0;
			}

			this.delay = scheduler.frame + delay;
			var actions = scheduler.actions;
			actions.push(this);
			actions.sort(VirtualAction.sortActions);
			return true;
		};

		VirtualAction.prototype.recycleAsyncId = function(
			scheduler,
			id,
			delay
		) {
			if (delay === void 0) {
				delay = 0;
			}

			return undefined;
		};

		VirtualAction.prototype._execute = function(state, delay) {
			if (this.active === true) {
				return _super.prototype._execute.call(this, state, delay);
			}
		};

		VirtualAction.sortActions = function(a, b) {
			if (a.delay === b.delay) {
				if (a.index === b.index) {
					return 0;
				} else if (a.index > b.index) {
					return 1;
				} else {
					return -1;
				}
			} else if (a.delay > b.delay) {
				return 1;
			} else {
				return -1;
			}
		};

		return VirtualAction;
	})(AsyncAction);

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function EmptyErrorImpl() {
	Error.call(this);
	this.message = "no elements in sequence";
	this.name = "EmptyError";
	return this;
}

EmptyErrorImpl.prototype =
	/*@__PURE__*/
	Object.create(Error.prototype);
var EmptyError = EmptyErrorImpl;

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var MapSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(MapSubscriber, _super);

		function MapSubscriber(destination, project, thisArg) {
			var _this = _super.call(this, destination) || this;

			_this.project = project;
			_this.count = 0;
			_this.thisArg = thisArg || _this;
			return _this;
		}

		MapSubscriber.prototype._next = function(value) {
			var result;

			try {
				result = this.project.call(this.thisArg, value, this.count++);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			this.destination.next(result);
		};

		return MapSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isArray,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isScheduler,_util_isArray PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var OuterSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(OuterSubscriber, _super);

		function OuterSubscriber() {
			return (_super !== null && _super.apply(this, arguments)) || this;
		}

		OuterSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.destination.next(innerValue);
		};

		OuterSubscriber.prototype.notifyError = function(error, innerSub) {
			this.destination.error(error);
		};

		OuterSubscriber.prototype.notifyComplete = function(innerSub) {
			this.destination.complete();
		};

		return OuterSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var InnerSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(InnerSubscriber, _super);

		function InnerSubscriber(parent, outerValue, outerIndex) {
			var _this = _super.call(this) || this;

			_this.parent = parent;
			_this.outerValue = outerValue;
			_this.outerIndex = outerIndex;
			_this.index = 0;
			return _this;
		}

		InnerSubscriber.prototype._next = function(value) {
			this.parent.notifyNext(
				this.outerValue,
				value,
				this.outerIndex,
				this.index++,
				this
			);
		};

		InnerSubscriber.prototype._error = function(error) {
			this.parent.notifyError(error, this);
			this.unsubscribe();
		};

		InnerSubscriber.prototype._complete = function() {
			this.parent.notifyComplete(this);
			this.unsubscribe();
		};

		return InnerSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */
var subscribeToPromise = function subscribeToPromise(promise) {
	return function(subscriber) {
		promise
			.then(
				function(value) {
					if (!subscriber.closed) {
						subscriber.next(value);
						subscriber.complete();
					}
				},
				function(err) {
					return subscriber.error(err);
				}
			)
			.then(null, hostReportError);
		return subscriber;
	};
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
	if (typeof Symbol !== "function" || !Symbol.iterator) {
		return "@@iterator";
	}

	return Symbol.iterator;
}
var iterator =
	/*@__PURE__*/
	getSymbolIterator();

/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
var subscribeToIterable = function subscribeToIterable(iterable) {
	return function(subscriber) {
		var iterator$$1 = iterable[iterator]();

		do {
			var item = iterator$$1.next();

			if (item.done) {
				subscriber.complete();
				break;
			}

			subscriber.next(item.value);

			if (subscriber.closed) {
				break;
			}
		} while (true);

		if (typeof iterator$$1.return === "function") {
			subscriber.add(function() {
				if (iterator$$1.return) {
					iterator$$1.return();
				}
			});
		}

		return subscriber;
	};
};

/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
var subscribeToObservable = function subscribeToObservable(obj) {
	return function(subscriber) {
		var obs = obj[observable]();

		if (typeof obs.subscribe !== "function") {
			throw new TypeError(
				"Provided object does not correctly implement Symbol.observable"
			);
		} else {
			return obs.subscribe(subscriber);
		}
	};
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = function isArrayLike(x) {
	return x && typeof x.length === "number" && typeof x !== "function";
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
	return (
		value &&
		typeof value.subscribe !== "function" &&
		typeof value.then === "function"
	);
}

/** PURE_IMPORTS_START _Observable,_subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */
var subscribeTo = function subscribeTo(result) {
	if (result instanceof Observable) {
		return function(subscriber) {
			if (result._isScalar) {
				subscriber.next(result.value);
				subscriber.complete();
				return undefined;
			} else {
				return result.subscribe(subscriber);
			}
		};
	} else if (result && typeof result[observable] === "function") {
		return subscribeToObservable(result);
	} else if (isArrayLike(result)) {
		return subscribeToArray(result);
	} else if (isPromise(result)) {
		return subscribeToPromise(result);
	} else if (result && typeof result[iterator] === "function") {
		return subscribeToIterable(result);
	} else {
		var value = isObject(result) ? "an invalid object" : "'" + result + "'";
		var msg =
			"You provided " +
			value +
			" where a stream was expected." +
			" You can provide an Observable, Promise, Array, or Iterable.";
		throw new TypeError(msg);
	}
};

/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo PURE_IMPORTS_END */
function subscribeToResult(
	outerSubscriber,
	result,
	outerValue,
	outerIndex,
	destination
) {
	if (destination === void 0) {
		destination = new InnerSubscriber(
			outerSubscriber,
			outerValue,
			outerIndex
		);
	}

	if (destination.closed) {
		return;
	}

	return subscribeTo(result)(destination);
}

/** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */
var NONE = {};

var CombineLatestSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(CombineLatestSubscriber, _super);

		function CombineLatestSubscriber(destination, resultSelector) {
			var _this = _super.call(this, destination) || this;

			_this.resultSelector = resultSelector;
			_this.active = 0;
			_this.values = [];
			_this.observables = [];
			return _this;
		}

		CombineLatestSubscriber.prototype._next = function(observable) {
			this.values.push(NONE);
			this.observables.push(observable);
		};

		CombineLatestSubscriber.prototype._complete = function() {
			var observables = this.observables;
			var len = observables.length;

			if (len === 0) {
				this.destination.complete();
			} else {
				this.active = len;
				this.toRespond = len;

				for (var i = 0; i < len; i++) {
					var observable = observables[i];
					this.add(
						subscribeToResult(this, observable, observable, i)
					);
				}
			}
		};

		CombineLatestSubscriber.prototype.notifyComplete = function(unused) {
			if ((this.active -= 1) === 0) {
				this.destination.complete();
			}
		};

		CombineLatestSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			var values = this.values;
			var oldVal = values[outerIndex];
			var toRespond = !this.toRespond
				? 0
				: oldVal === NONE
					? --this.toRespond
					: this.toRespond;
			values[outerIndex] = innerValue;

			if (toRespond === 0) {
				if (this.resultSelector) {
					this._tryResultSelector(values);
				} else {
					this.destination.next(values.slice());
				}
			}
		};

		CombineLatestSubscriber.prototype._tryResultSelector = function(
			values
		) {
			var result;

			try {
				result = this.resultSelector.apply(this, values);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			this.destination.next(result);
		};

		return CombineLatestSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
function isInteropObservable(input) {
	return input && typeof input[observable] === "function";
}

/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
function isIterable(input) {
	return input && typeof input[iterator] === "function";
}

/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToPromise PURE_IMPORTS_END */
function fromPromise(input, scheduler) {
	if (!scheduler) {
		return new Observable(subscribeToPromise(input));
	} else {
		return new Observable(function(subscriber) {
			var sub = new Subscription$1();
			sub.add(
				scheduler.schedule(function() {
					return input.then(
						function(value) {
							sub.add(
								scheduler.schedule(function() {
									subscriber.next(value);
									sub.add(
										scheduler.schedule(function() {
											return subscriber.complete();
										})
									);
								})
							);
						},
						function(err) {
							sub.add(
								scheduler.schedule(function() {
									return subscriber.error(err);
								})
							);
						}
					);
				})
			);
			return sub;
		});
	}
}

/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator,_util_subscribeToIterable PURE_IMPORTS_END */
function fromIterable(input, scheduler) {
	if (!input) {
		throw new Error("Iterable cannot be null");
	}

	if (!scheduler) {
		return new Observable(subscribeToIterable(input));
	} else {
		return new Observable(function(subscriber) {
			var sub = new Subscription$1();
			var iterator$$1;
			sub.add(function() {
				if (iterator$$1 && typeof iterator$$1.return === "function") {
					iterator$$1.return();
				}
			});
			sub.add(
				scheduler.schedule(function() {
					iterator$$1 = input[iterator]();
					sub.add(
						scheduler.schedule(function() {
							if (subscriber.closed) {
								return;
							}

							var value;
							var done;

							try {
								var result = iterator$$1.next();
								value = result.value;
								done = result.done;
							} catch (err) {
								subscriber.error(err);
								return;
							}

							if (done) {
								subscriber.complete();
							} else {
								subscriber.next(value);
								this.schedule();
							}
						})
					);
				})
			);
			return sub;
		});
	}
}

/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable,_util_subscribeToObservable PURE_IMPORTS_END */
function fromObservable(input, scheduler) {
	if (!scheduler) {
		return new Observable(subscribeToObservable(input));
	} else {
		return new Observable(function(subscriber) {
			var sub = new Subscription$1();
			sub.add(
				scheduler.schedule(function() {
					var observable$$1 = input[observable]();
					sub.add(
						observable$$1.subscribe({
							next: function next(value) {
								sub.add(
									scheduler.schedule(function() {
										return subscriber.next(value);
									})
								);
							},
							error: function error(err) {
								sub.add(
									scheduler.schedule(function() {
										return subscriber.error(err);
									})
								);
							},
							complete: function complete() {
								sub.add(
									scheduler.schedule(function() {
										return subscriber.complete();
									})
								);
							}
						})
					);
				})
			);
			return sub;
		});
	}
}

/** PURE_IMPORTS_START _Observable,_util_isPromise,_util_isArrayLike,_util_isInteropObservable,_util_isIterable,_fromArray,_fromPromise,_fromIterable,_fromObservable,_util_subscribeTo PURE_IMPORTS_END */
function from(input, scheduler) {
	if (!scheduler) {
		if (input instanceof Observable) {
			return input;
		}

		return new Observable(subscribeTo(input));
	}

	if (input != null) {
		if (isInteropObservable(input)) {
			return fromObservable(input, scheduler);
		} else if (isPromise(input)) {
			return fromPromise(input, scheduler);
		} else if (isArrayLike(input)) {
			return fromArray(input, scheduler);
		} else if (isIterable(input) || typeof input === "string") {
			return fromIterable(input, scheduler);
		}
	}

	throw new TypeError(
		((input !== null && typeof input) || input) + " is not observable"
	);
}

/** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber,_map,_observable_from PURE_IMPORTS_END */

var MergeMapSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(MergeMapSubscriber, _super);

		function MergeMapSubscriber(destination, project, concurrent) {
			if (concurrent === void 0) {
				concurrent = Number.POSITIVE_INFINITY;
			}

			var _this = _super.call(this, destination) || this;

			_this.project = project;
			_this.concurrent = concurrent;
			_this.hasCompleted = false;
			_this.buffer = [];
			_this.active = 0;
			_this.index = 0;
			return _this;
		}

		MergeMapSubscriber.prototype._next = function(value) {
			if (this.active < this.concurrent) {
				this._tryNext(value);
			} else {
				this.buffer.push(value);
			}
		};

		MergeMapSubscriber.prototype._tryNext = function(value) {
			var result;
			var index = this.index++;

			try {
				result = this.project(value, index);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			this.active++;

			this._innerSub(result, value, index);
		};

		MergeMapSubscriber.prototype._innerSub = function(ish, value, index) {
			var innerSubscriber = new InnerSubscriber(
				this,
				undefined,
				undefined
			);
			var destination = this.destination;
			destination.add(innerSubscriber);
			subscribeToResult(this, ish, value, index, innerSubscriber);
		};

		MergeMapSubscriber.prototype._complete = function() {
			this.hasCompleted = true;

			if (this.active === 0 && this.buffer.length === 0) {
				this.destination.complete();
			}

			this.unsubscribe();
		};

		MergeMapSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.destination.next(innerValue);
		};

		MergeMapSubscriber.prototype.notifyComplete = function(innerSub) {
			var buffer = this.buffer;
			this.remove(innerSub);
			this.active--;

			if (buffer.length > 0) {
				this._next(buffer.shift());
			} else if (this.active === 0 && this.hasCompleted) {
				this.destination.complete();
			}
		};

		return MergeMapSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */

/** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

/** PURE_IMPORTS_START _util_isScheduler,_of,_from,_operators_concatAll PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Observable,_util_isArray,_empty,_util_subscribeToResult,_OuterSubscriber,_operators_map PURE_IMPORTS_END */

var ForkJoinSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(ForkJoinSubscriber, _super);

		function ForkJoinSubscriber(destination, sources) {
			var _this = _super.call(this, destination) || this;

			_this.sources = sources;
			_this.completed = 0;
			_this.haveValues = 0;
			var len = sources.length;
			_this.values = new Array(len);

			for (var i = 0; i < len; i++) {
				var source = sources[i];
				var innerSubscription = subscribeToResult(
					_this,
					source,
					null,
					i
				);

				if (innerSubscription) {
					_this.add(innerSubscription);
				}
			}

			return _this;
		}

		ForkJoinSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.values[outerIndex] = innerValue;

			if (!innerSub._hasValue) {
				innerSub._hasValue = true;
				this.haveValues++;
			}
		};

		ForkJoinSubscriber.prototype.notifyComplete = function(innerSub) {
			var _a = this,
				destination = _a.destination,
				haveValues = _a.haveValues,
				values = _a.values;

			var len = values.length;

			if (!innerSub._hasValue) {
				destination.complete();
				return;
			}

			this.completed++;

			if (this.completed !== len) {
				return;
			}

			if (haveValues === len) {
				destination.next(values);
			}

			destination.complete();
		};

		return ForkJoinSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */
function isNumeric(val) {
	return !isArray(val) && val - parseFloat(val) + 1 >= 0;
}

/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */
var NEVER =
	/*@__PURE__*/
	new Observable(noop$2);

/** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var RaceSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(RaceSubscriber, _super);

		function RaceSubscriber(destination) {
			var _this = _super.call(this, destination) || this;

			_this.hasFirst = false;
			_this.observables = [];
			_this.subscriptions = [];
			return _this;
		}

		RaceSubscriber.prototype._next = function(observable) {
			this.observables.push(observable);
		};

		RaceSubscriber.prototype._complete = function() {
			var observables = this.observables;
			var len = observables.length;

			if (len === 0) {
				this.destination.complete();
			} else {
				for (var i = 0; i < len && !this.hasFirst; i++) {
					var observable = observables[i];
					var subscription = subscribeToResult(
						this,
						observable,
						observable,
						i
					);

					if (this.subscriptions) {
						this.subscriptions.push(subscription);
					}

					this.add(subscription);
				}

				this.observables = null;
			}
		};

		RaceSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			if (!this.hasFirst) {
				this.hasFirst = true;

				for (var i = 0; i < this.subscriptions.length; i++) {
					if (i !== outerIndex) {
						var subscription = this.subscriptions[i];
						subscription.unsubscribe();
						this.remove(subscription);
					}
				}

				this.subscriptions = null;
			}

			this.destination.next(innerValue);
		};

		return RaceSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_OuterSubscriber,_util_subscribeToResult,_.._internal_symbol_iterator PURE_IMPORTS_END */

var ZipSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(ZipSubscriber, _super);

		function ZipSubscriber(destination, resultSelector, values) {
			if (values === void 0) {
				values = Object.create(null);
			}

			var _this = _super.call(this, destination) || this;

			_this.iterators = [];
			_this.active = 0;
			_this.resultSelector =
				typeof resultSelector === "function" ? resultSelector : null;
			_this.values = values;
			return _this;
		}

		ZipSubscriber.prototype._next = function(value) {
			var iterators = this.iterators;

			if (isArray(value)) {
				iterators.push(new StaticArrayIterator(value));
			} else if (typeof value[iterator] === "function") {
				iterators.push(new StaticIterator(value[iterator]()));
			} else {
				iterators.push(
					new ZipBufferIterator(this.destination, this, value)
				);
			}
		};

		ZipSubscriber.prototype._complete = function() {
			var iterators = this.iterators;
			var len = iterators.length;
			this.unsubscribe();

			if (len === 0) {
				this.destination.complete();
				return;
			}

			this.active = len;

			for (var i = 0; i < len; i++) {
				var iterator$$1 = iterators[i];

				if (iterator$$1.stillUnsubscribed) {
					var destination = this.destination;
					destination.add(iterator$$1.subscribe(iterator$$1, i));
				} else {
					this.active--;
				}
			}
		};

		ZipSubscriber.prototype.notifyInactive = function() {
			this.active--;

			if (this.active === 0) {
				this.destination.complete();
			}
		};

		ZipSubscriber.prototype.checkIterators = function() {
			var iterators = this.iterators;
			var len = iterators.length;
			var destination = this.destination;

			for (var i = 0; i < len; i++) {
				var iterator$$1 = iterators[i];

				if (
					typeof iterator$$1.hasValue === "function" &&
					!iterator$$1.hasValue()
				) {
					return;
				}
			}

			var shouldComplete = false;
			var args = [];

			for (var i = 0; i < len; i++) {
				var iterator$$1 = iterators[i];
				var result = iterator$$1.next();

				if (iterator$$1.hasCompleted()) {
					shouldComplete = true;
				}

				if (result.done) {
					destination.complete();
					return;
				}

				args.push(result.value);
			}

			if (this.resultSelector) {
				this._tryresultSelector(args);
			} else {
				destination.next(args);
			}

			if (shouldComplete) {
				destination.complete();
			}
		};

		ZipSubscriber.prototype._tryresultSelector = function(args) {
			var result;

			try {
				result = this.resultSelector.apply(this, args);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			this.destination.next(result);
		};

		return ZipSubscriber;
	})(Subscriber);

var StaticIterator =
	/*@__PURE__*/
	(function() {
		function StaticIterator(iterator$$1) {
			this.iterator = iterator$$1;
			this.nextResult = iterator$$1.next();
		}

		StaticIterator.prototype.hasValue = function() {
			return true;
		};

		StaticIterator.prototype.next = function() {
			var result = this.nextResult;
			this.nextResult = this.iterator.next();
			return result;
		};

		StaticIterator.prototype.hasCompleted = function() {
			var nextResult = this.nextResult;
			return nextResult && nextResult.done;
		};

		return StaticIterator;
	})();

var StaticArrayIterator =
	/*@__PURE__*/
	(function() {
		function StaticArrayIterator(array) {
			this.array = array;
			this.index = 0;
			this.length = 0;
			this.length = array.length;
		}

		StaticArrayIterator.prototype[iterator] = function() {
			return this;
		};

		StaticArrayIterator.prototype.next = function(value) {
			var i = this.index++;
			var array = this.array;
			return i < this.length
				? {
						value: array[i],
						done: false
				  }
				: {
						value: null,
						done: true
				  };
		};

		StaticArrayIterator.prototype.hasValue = function() {
			return this.array.length > this.index;
		};

		StaticArrayIterator.prototype.hasCompleted = function() {
			return this.array.length === this.index;
		};

		return StaticArrayIterator;
	})();

var ZipBufferIterator =
	/*@__PURE__*/
	(function(_super) {
		__extends(ZipBufferIterator, _super);

		function ZipBufferIterator(destination, parent, observable) {
			var _this = _super.call(this, destination) || this;

			_this.parent = parent;
			_this.observable = observable;
			_this.stillUnsubscribed = true;
			_this.buffer = [];
			_this.isComplete = false;
			return _this;
		}

		ZipBufferIterator.prototype[iterator] = function() {
			return this;
		};

		ZipBufferIterator.prototype.next = function() {
			var buffer = this.buffer;

			if (buffer.length === 0 && this.isComplete) {
				return {
					value: null,
					done: true
				};
			} else {
				return {
					value: buffer.shift(),
					done: false
				};
			}
		};

		ZipBufferIterator.prototype.hasValue = function() {
			return this.buffer.length > 0;
		};

		ZipBufferIterator.prototype.hasCompleted = function() {
			return this.buffer.length === 0 && this.isComplete;
		};

		ZipBufferIterator.prototype.notifyComplete = function() {
			if (this.buffer.length > 0) {
				this.isComplete = true;
				this.parent.notifyInactive();
			} else {
				this.destination.complete();
			}
		};

		ZipBufferIterator.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.buffer.push(innerValue);
			this.parent.checkIterators();
		};

		ZipBufferIterator.prototype.subscribe = function(value, index) {
			return subscribeToResult(this, this.observable, this, index);
		};

		return ZipBufferIterator;
	})(OuterSubscriber);

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var AuditSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(AuditSubscriber, _super);

		function AuditSubscriber(destination, durationSelector) {
			var _this = _super.call(this, destination) || this;

			_this.durationSelector = durationSelector;
			_this.hasValue = false;
			return _this;
		}

		AuditSubscriber.prototype._next = function(value) {
			this.value = value;
			this.hasValue = true;

			if (!this.throttled) {
				var duration = tryCatch$2(this.durationSelector)(value);

				if (duration === errorObject) {
					this.destination.error(errorObject.e);
				} else {
					var innerSubscription = subscribeToResult(this, duration);

					if (!innerSubscription || innerSubscription.closed) {
						this.clearThrottle();
					} else {
						this.add((this.throttled = innerSubscription));
					}
				}
			}
		};

		AuditSubscriber.prototype.clearThrottle = function() {
			var _a = this,
				value = _a.value,
				hasValue = _a.hasValue,
				throttled = _a.throttled;

			if (throttled) {
				this.remove(throttled);
				this.throttled = null;
				throttled.unsubscribe();
			}

			if (hasValue) {
				this.value = null;
				this.hasValue = false;
				this.destination.next(value);
			}
		};

		AuditSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex
		) {
			this.clearThrottle();
		};

		AuditSubscriber.prototype.notifyComplete = function() {
			this.clearThrottle();
		};

		return AuditSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START _scheduler_async,_audit,_observable_timer PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var BufferSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(BufferSubscriber, _super);

		function BufferSubscriber(destination, closingNotifier) {
			var _this = _super.call(this, destination) || this;

			_this.buffer = [];

			_this.add(subscribeToResult(_this, closingNotifier));

			return _this;
		}

		BufferSubscriber.prototype._next = function(value) {
			this.buffer.push(value);
		};

		BufferSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			var buffer = this.buffer;
			this.buffer = [];
			this.destination.next(buffer);
		};

		return BufferSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var BufferCountSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(BufferCountSubscriber, _super);

		function BufferCountSubscriber(destination, bufferSize) {
			var _this = _super.call(this, destination) || this;

			_this.bufferSize = bufferSize;
			_this.buffer = [];
			return _this;
		}

		BufferCountSubscriber.prototype._next = function(value) {
			var buffer = this.buffer;
			buffer.push(value);

			if (buffer.length == this.bufferSize) {
				this.destination.next(buffer);
				this.buffer = [];
			}
		};

		BufferCountSubscriber.prototype._complete = function() {
			var buffer = this.buffer;

			if (buffer.length > 0) {
				this.destination.next(buffer);
			}

			_super.prototype._complete.call(this);
		};

		return BufferCountSubscriber;
	})(Subscriber);

var BufferSkipCountSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(BufferSkipCountSubscriber, _super);

		function BufferSkipCountSubscriber(
			destination,
			bufferSize,
			startBufferEvery
		) {
			var _this = _super.call(this, destination) || this;

			_this.bufferSize = bufferSize;
			_this.startBufferEvery = startBufferEvery;
			_this.buffers = [];
			_this.count = 0;
			return _this;
		}

		BufferSkipCountSubscriber.prototype._next = function(value) {
			var _a = this,
				bufferSize = _a.bufferSize,
				startBufferEvery = _a.startBufferEvery,
				buffers = _a.buffers,
				count = _a.count;

			this.count++;

			if (count % startBufferEvery === 0) {
				buffers.push([]);
			}

			for (var i = buffers.length; i--; ) {
				var buffer = buffers[i];
				buffer.push(value);

				if (buffer.length === bufferSize) {
					buffers.splice(i, 1);
					this.destination.next(buffer);
				}
			}
		};

		BufferSkipCountSubscriber.prototype._complete = function() {
			var _a = this,
				buffers = _a.buffers,
				destination = _a.destination;

			while (buffers.length > 0) {
				var buffer = buffers.shift();

				if (buffer.length > 0) {
					destination.next(buffer);
				}
			}

			_super.prototype._complete.call(this);
		};

		return BufferSkipCountSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_scheduler_async,_Subscriber,_util_isScheduler PURE_IMPORTS_END */

var Context =
	/*@__PURE__*/
	(function() {
		function Context() {
			this.buffer = [];
		}

		return Context;
	})();

var BufferTimeSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(BufferTimeSubscriber, _super);

		function BufferTimeSubscriber(
			destination,
			bufferTimeSpan,
			bufferCreationInterval,
			maxBufferSize,
			scheduler
		) {
			var _this = _super.call(this, destination) || this;

			_this.bufferTimeSpan = bufferTimeSpan;
			_this.bufferCreationInterval = bufferCreationInterval;
			_this.maxBufferSize = maxBufferSize;
			_this.scheduler = scheduler;
			_this.contexts = [];

			var context = _this.openContext();

			_this.timespanOnly =
				bufferCreationInterval == null || bufferCreationInterval < 0;

			if (_this.timespanOnly) {
				var timeSpanOnlyState = {
					subscriber: _this,
					context: context,
					bufferTimeSpan: bufferTimeSpan
				};

				_this.add(
					(context.closeAction = scheduler.schedule(
						dispatchBufferTimeSpanOnly,
						bufferTimeSpan,
						timeSpanOnlyState
					))
				);
			} else {
				var closeState = {
					subscriber: _this,
					context: context
				};
				var creationState = {
					bufferTimeSpan: bufferTimeSpan,
					bufferCreationInterval: bufferCreationInterval,
					subscriber: _this,
					scheduler: scheduler
				};

				_this.add(
					(context.closeAction = scheduler.schedule(
						dispatchBufferClose,
						bufferTimeSpan,
						closeState
					))
				);

				_this.add(
					scheduler.schedule(
						dispatchBufferCreation,
						bufferCreationInterval,
						creationState
					)
				);
			}

			return _this;
		}

		BufferTimeSubscriber.prototype._next = function(value) {
			var contexts = this.contexts;
			var len = contexts.length;
			var filledBufferContext;

			for (var i = 0; i < len; i++) {
				var context_1 = contexts[i];
				var buffer = context_1.buffer;
				buffer.push(value);

				if (buffer.length == this.maxBufferSize) {
					filledBufferContext = context_1;
				}
			}

			if (filledBufferContext) {
				this.onBufferFull(filledBufferContext);
			}
		};

		BufferTimeSubscriber.prototype._error = function(err) {
			this.contexts.length = 0;

			_super.prototype._error.call(this, err);
		};

		BufferTimeSubscriber.prototype._complete = function() {
			var _a = this,
				contexts = _a.contexts,
				destination = _a.destination;

			while (contexts.length > 0) {
				var context_2 = contexts.shift();
				destination.next(context_2.buffer);
			}

			_super.prototype._complete.call(this);
		};

		BufferTimeSubscriber.prototype._unsubscribe = function() {
			this.contexts = null;
		};

		BufferTimeSubscriber.prototype.onBufferFull = function(context) {
			this.closeContext(context);
			var closeAction = context.closeAction;
			closeAction.unsubscribe();
			this.remove(closeAction);

			if (!this.closed && this.timespanOnly) {
				context = this.openContext();
				var bufferTimeSpan = this.bufferTimeSpan;
				var timeSpanOnlyState = {
					subscriber: this,
					context: context,
					bufferTimeSpan: bufferTimeSpan
				};
				this.add(
					(context.closeAction = this.scheduler.schedule(
						dispatchBufferTimeSpanOnly,
						bufferTimeSpan,
						timeSpanOnlyState
					))
				);
			}
		};

		BufferTimeSubscriber.prototype.openContext = function() {
			var context = new Context();
			this.contexts.push(context);
			return context;
		};

		BufferTimeSubscriber.prototype.closeContext = function(context) {
			this.destination.next(context.buffer);
			var contexts = this.contexts;
			var spliceIndex = contexts ? contexts.indexOf(context) : -1;

			if (spliceIndex >= 0) {
				contexts.splice(contexts.indexOf(context), 1);
			}
		};

		return BufferTimeSubscriber;
	})(Subscriber);

function dispatchBufferTimeSpanOnly(state) {
	var subscriber = state.subscriber;
	var prevContext = state.context;

	if (prevContext) {
		subscriber.closeContext(prevContext);
	}

	if (!subscriber.closed) {
		state.context = subscriber.openContext();
		state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
	}
}

function dispatchBufferCreation(state) {
	var bufferCreationInterval = state.bufferCreationInterval,
		bufferTimeSpan = state.bufferTimeSpan,
		subscriber = state.subscriber,
		scheduler = state.scheduler;
	var context = subscriber.openContext();
	var action = this;

	if (!subscriber.closed) {
		subscriber.add(
			(context.closeAction = scheduler.schedule(
				dispatchBufferClose,
				bufferTimeSpan,
				{
					subscriber: subscriber,
					context: context
				}
			))
		);
		action.schedule(state, bufferCreationInterval);
	}
}

function dispatchBufferClose(arg) {
	var subscriber = arg.subscriber,
		context = arg.context;
	subscriber.closeContext(context);
}

/** PURE_IMPORTS_START tslib,_Subscription,_util_subscribeToResult,_OuterSubscriber PURE_IMPORTS_END */

var BufferToggleSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(BufferToggleSubscriber, _super);

		function BufferToggleSubscriber(
			destination,
			openings,
			closingSelector
		) {
			var _this = _super.call(this, destination) || this;

			_this.openings = openings;
			_this.closingSelector = closingSelector;
			_this.contexts = [];

			_this.add(subscribeToResult(_this, openings));

			return _this;
		}

		BufferToggleSubscriber.prototype._next = function(value) {
			var contexts = this.contexts;
			var len = contexts.length;

			for (var i = 0; i < len; i++) {
				contexts[i].buffer.push(value);
			}
		};

		BufferToggleSubscriber.prototype._error = function(err) {
			var contexts = this.contexts;

			while (contexts.length > 0) {
				var context_1 = contexts.shift();
				context_1.subscription.unsubscribe();
				context_1.buffer = null;
				context_1.subscription = null;
			}

			this.contexts = null;

			_super.prototype._error.call(this, err);
		};

		BufferToggleSubscriber.prototype._complete = function() {
			var contexts = this.contexts;

			while (contexts.length > 0) {
				var context_2 = contexts.shift();
				this.destination.next(context_2.buffer);
				context_2.subscription.unsubscribe();
				context_2.buffer = null;
				context_2.subscription = null;
			}

			this.contexts = null;

			_super.prototype._complete.call(this);
		};

		BufferToggleSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			outerValue
				? this.closeBuffer(outerValue)
				: this.openBuffer(innerValue);
		};

		BufferToggleSubscriber.prototype.notifyComplete = function(innerSub) {
			this.closeBuffer(innerSub.context);
		};

		BufferToggleSubscriber.prototype.openBuffer = function(value) {
			try {
				var closingSelector = this.closingSelector;
				var closingNotifier = closingSelector.call(this, value);

				if (closingNotifier) {
					this.trySubscribe(closingNotifier);
				}
			} catch (err) {
				this._error(err);
			}
		};

		BufferToggleSubscriber.prototype.closeBuffer = function(context) {
			var contexts = this.contexts;

			if (contexts && context) {
				var buffer = context.buffer,
					subscription = context.subscription;
				this.destination.next(buffer);
				contexts.splice(contexts.indexOf(context), 1);
				this.remove(subscription);
				subscription.unsubscribe();
			}
		};

		BufferToggleSubscriber.prototype.trySubscribe = function(
			closingNotifier
		) {
			var contexts = this.contexts;
			var buffer = [];
			var subscription = new Subscription$1();
			var context = {
				buffer: buffer,
				subscription: subscription
			};
			contexts.push(context);
			var innerSubscription = subscribeToResult(
				this,
				closingNotifier,
				context
			);

			if (!innerSubscription || innerSubscription.closed) {
				this.closeBuffer(context);
			} else {
				innerSubscription.context = context;
				this.add(innerSubscription);
				subscription.add(innerSubscription);
			}
		};

		return BufferToggleSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscription,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var BufferWhenSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(BufferWhenSubscriber, _super);

		function BufferWhenSubscriber(destination, closingSelector) {
			var _this = _super.call(this, destination) || this;

			_this.closingSelector = closingSelector;
			_this.subscribing = false;

			_this.openBuffer();

			return _this;
		}

		BufferWhenSubscriber.prototype._next = function(value) {
			this.buffer.push(value);
		};

		BufferWhenSubscriber.prototype._complete = function() {
			var buffer = this.buffer;

			if (buffer) {
				this.destination.next(buffer);
			}

			_super.prototype._complete.call(this);
		};

		BufferWhenSubscriber.prototype._unsubscribe = function() {
			this.buffer = null;
			this.subscribing = false;
		};

		BufferWhenSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.openBuffer();
		};

		BufferWhenSubscriber.prototype.notifyComplete = function() {
			if (this.subscribing) {
				this.complete();
			} else {
				this.openBuffer();
			}
		};

		BufferWhenSubscriber.prototype.openBuffer = function() {
			var closingSubscription = this.closingSubscription;

			if (closingSubscription) {
				this.remove(closingSubscription);
				closingSubscription.unsubscribe();
			}

			var buffer = this.buffer;

			if (this.buffer) {
				this.destination.next(buffer);
			}

			this.buffer = [];
			var closingNotifier = tryCatch$2(this.closingSelector)();

			if (closingNotifier === errorObject) {
				this.error(errorObject.e);
			} else {
				closingSubscription = new Subscription$1();
				this.closingSubscription = closingSubscription;
				this.add(closingSubscription);
				this.subscribing = true;
				closingSubscription.add(
					subscribeToResult(this, closingNotifier)
				);
				this.subscribing = false;
			}
		};

		return BufferWhenSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var CatchSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(CatchSubscriber, _super);

		function CatchSubscriber(destination, selector, caught) {
			var _this = _super.call(this, destination) || this;

			_this.selector = selector;
			_this.caught = caught;
			return _this;
		}

		CatchSubscriber.prototype.error = function(err) {
			if (!this.isStopped) {
				var result = void 0;

				try {
					result = this.selector(err, this.caught);
				} catch (err2) {
					_super.prototype.error.call(this, err2);

					return;
				}

				this._unsubscribeAndRecycle();

				var innerSubscriber = new InnerSubscriber(
					this,
					undefined,
					undefined
				);
				this.add(innerSubscriber);
				subscribeToResult(
					this,
					result,
					undefined,
					undefined,
					innerSubscriber
				);
			}
		};

		return CatchSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START _observable_combineLatest PURE_IMPORTS_END */

/** PURE_IMPORTS_START _util_isArray,_observable_combineLatest,_observable_from PURE_IMPORTS_END */

/** PURE_IMPORTS_START _observable_concat PURE_IMPORTS_END */

/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

/** PURE_IMPORTS_START _concatMap PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var CountSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(CountSubscriber, _super);

		function CountSubscriber(destination, predicate, source) {
			var _this = _super.call(this, destination) || this;

			_this.predicate = predicate;
			_this.source = source;
			_this.count = 0;
			_this.index = 0;
			return _this;
		}

		CountSubscriber.prototype._next = function(value) {
			if (this.predicate) {
				this._tryPredicate(value);
			} else {
				this.count++;
			}
		};

		CountSubscriber.prototype._tryPredicate = function(value) {
			var result;

			try {
				result = this.predicate(value, this.index++, this.source);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			if (result) {
				this.count++;
			}
		};

		CountSubscriber.prototype._complete = function() {
			this.destination.next(this.count);
			this.destination.complete();
		};

		return CountSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var DebounceSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(DebounceSubscriber, _super);

		function DebounceSubscriber(destination, durationSelector) {
			var _this = _super.call(this, destination) || this;

			_this.durationSelector = durationSelector;
			_this.hasValue = false;
			_this.durationSubscription = null;
			return _this;
		}

		DebounceSubscriber.prototype._next = function(value) {
			try {
				var result = this.durationSelector.call(this, value);

				if (result) {
					this._tryNext(value, result);
				}
			} catch (err) {
				this.destination.error(err);
			}
		};

		DebounceSubscriber.prototype._complete = function() {
			this.emitValue();
			this.destination.complete();
		};

		DebounceSubscriber.prototype._tryNext = function(value, duration) {
			var subscription = this.durationSubscription;
			this.value = value;
			this.hasValue = true;

			if (subscription) {
				subscription.unsubscribe();
				this.remove(subscription);
			}

			subscription = subscribeToResult(this, duration);

			if (subscription && !subscription.closed) {
				this.add((this.durationSubscription = subscription));
			}
		};

		DebounceSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.emitValue();
		};

		DebounceSubscriber.prototype.notifyComplete = function() {
			this.emitValue();
		};

		DebounceSubscriber.prototype.emitValue = function() {
			if (this.hasValue) {
				var value = this.value;
				var subscription = this.durationSubscription;

				if (subscription) {
					this.durationSubscription = null;
					subscription.unsubscribe();
					this.remove(subscription);
				}

				this.value = null;
				this.hasValue = false;

				_super.prototype._next.call(this, value);
			}
		};

		return DebounceSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */

var DebounceTimeSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(DebounceTimeSubscriber, _super);

		function DebounceTimeSubscriber(destination, dueTime, scheduler) {
			var _this = _super.call(this, destination) || this;

			_this.dueTime = dueTime;
			_this.scheduler = scheduler;
			_this.debouncedSubscription = null;
			_this.lastValue = null;
			_this.hasValue = false;
			return _this;
		}

		DebounceTimeSubscriber.prototype._next = function(value) {
			this.clearDebounce();
			this.lastValue = value;
			this.hasValue = true;
			this.add(
				(this.debouncedSubscription = this.scheduler.schedule(
					dispatchNext$2,
					this.dueTime,
					this
				))
			);
		};

		DebounceTimeSubscriber.prototype._complete = function() {
			this.debouncedNext();
			this.destination.complete();
		};

		DebounceTimeSubscriber.prototype.debouncedNext = function() {
			this.clearDebounce();

			if (this.hasValue) {
				var lastValue = this.lastValue;
				this.lastValue = null;
				this.hasValue = false;
				this.destination.next(lastValue);
			}
		};

		DebounceTimeSubscriber.prototype.clearDebounce = function() {
			var debouncedSubscription = this.debouncedSubscription;

			if (debouncedSubscription !== null) {
				this.remove(debouncedSubscription);
				debouncedSubscription.unsubscribe();
				this.debouncedSubscription = null;
			}
		};

		return DebounceTimeSubscriber;
	})(Subscriber);

function dispatchNext$2(subscriber) {
	subscriber.debouncedNext();
}

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var DefaultIfEmptySubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(DefaultIfEmptySubscriber, _super);

		function DefaultIfEmptySubscriber(destination, defaultValue) {
			var _this = _super.call(this, destination) || this;

			_this.defaultValue = defaultValue;
			_this.isEmpty = true;
			return _this;
		}

		DefaultIfEmptySubscriber.prototype._next = function(value) {
			this.isEmpty = false;
			this.destination.next(value);
		};

		DefaultIfEmptySubscriber.prototype._complete = function() {
			if (this.isEmpty) {
				this.destination.next(this.defaultValue);
			}

			this.destination.complete();
		};

		return DefaultIfEmptySubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_Subscriber,_Notification PURE_IMPORTS_END */

var DelaySubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(DelaySubscriber, _super);

		function DelaySubscriber(destination, delay, scheduler) {
			var _this = _super.call(this, destination) || this;

			_this.delay = delay;
			_this.scheduler = scheduler;
			_this.queue = [];
			_this.active = false;
			_this.errored = false;
			return _this;
		}

		DelaySubscriber.dispatch = function(state) {
			var source = state.source;
			var queue = source.queue;
			var scheduler = state.scheduler;
			var destination = state.destination;

			while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
				queue.shift().notification.observe(destination);
			}

			if (queue.length > 0) {
				var delay_1 = Math.max(0, queue[0].time - scheduler.now());
				this.schedule(state, delay_1);
			} else {
				this.unsubscribe();
				source.active = false;
			}
		};

		DelaySubscriber.prototype._schedule = function(scheduler) {
			this.active = true;
			var destination = this.destination;
			destination.add(
				scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
					source: this,
					destination: this.destination,
					scheduler: scheduler
				})
			);
		};

		DelaySubscriber.prototype.scheduleNotification = function(
			notification
		) {
			if (this.errored === true) {
				return;
			}

			var scheduler = this.scheduler;
			var message = new DelayMessage(
				scheduler.now() + this.delay,
				notification
			);
			this.queue.push(message);

			if (this.active === false) {
				this._schedule(scheduler);
			}
		};

		DelaySubscriber.prototype._next = function(value) {
			this.scheduleNotification(Notification.createNext(value));
		};

		DelaySubscriber.prototype._error = function(err) {
			this.errored = true;
			this.queue = [];
			this.destination.error(err);
			this.unsubscribe();
		};

		DelaySubscriber.prototype._complete = function() {
			this.scheduleNotification(Notification.createComplete());
			this.unsubscribe();
		};

		return DelaySubscriber;
	})(Subscriber);

var DelayMessage =
	/*@__PURE__*/
	(function() {
		function DelayMessage(time, notification) {
			this.time = time;
			this.notification = notification;
		}

		return DelayMessage;
	})();

/** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var DelayWhenSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(DelayWhenSubscriber, _super);

		function DelayWhenSubscriber(destination, delayDurationSelector) {
			var _this = _super.call(this, destination) || this;

			_this.delayDurationSelector = delayDurationSelector;
			_this.completed = false;
			_this.delayNotifierSubscriptions = [];
			_this.index = 0;
			return _this;
		}

		DelayWhenSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.destination.next(outerValue);
			this.removeSubscription(innerSub);
			this.tryComplete();
		};

		DelayWhenSubscriber.prototype.notifyError = function(error, innerSub) {
			this._error(error);
		};

		DelayWhenSubscriber.prototype.notifyComplete = function(innerSub) {
			var value = this.removeSubscription(innerSub);

			if (value) {
				this.destination.next(value);
			}

			this.tryComplete();
		};

		DelayWhenSubscriber.prototype._next = function(value) {
			var index = this.index++;

			try {
				var delayNotifier = this.delayDurationSelector(value, index);

				if (delayNotifier) {
					this.tryDelay(delayNotifier, value);
				}
			} catch (err) {
				this.destination.error(err);
			}
		};

		DelayWhenSubscriber.prototype._complete = function() {
			this.completed = true;
			this.tryComplete();
			this.unsubscribe();
		};

		DelayWhenSubscriber.prototype.removeSubscription = function(
			subscription
		) {
			subscription.unsubscribe();
			var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(
				subscription
			);

			if (subscriptionIdx !== -1) {
				this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
			}

			return subscription.outerValue;
		};

		DelayWhenSubscriber.prototype.tryDelay = function(
			delayNotifier,
			value
		) {
			var notifierSubscription = subscribeToResult(
				this,
				delayNotifier,
				value
			);

			if (notifierSubscription && !notifierSubscription.closed) {
				var destination = this.destination;
				destination.add(notifierSubscription);
				this.delayNotifierSubscriptions.push(notifierSubscription);
			}
		};

		DelayWhenSubscriber.prototype.tryComplete = function() {
			if (
				this.completed &&
				this.delayNotifierSubscriptions.length === 0
			) {
				this.destination.complete();
			}
		};

		return DelayWhenSubscriber;
	})(OuterSubscriber);

var SubscriptionDelayObservable =
	/*@__PURE__*/
	(function(_super) {
		__extends(SubscriptionDelayObservable, _super);

		function SubscriptionDelayObservable(source, subscriptionDelay) {
			var _this = _super.call(this) || this;

			_this.source = source;
			_this.subscriptionDelay = subscriptionDelay;
			return _this;
		}

		SubscriptionDelayObservable.prototype._subscribe = function(
			subscriber
		) {
			this.subscriptionDelay.subscribe(
				new SubscriptionDelaySubscriber(subscriber, this.source)
			);
		};

		return SubscriptionDelayObservable;
	})(Observable);

var SubscriptionDelaySubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SubscriptionDelaySubscriber, _super);

		function SubscriptionDelaySubscriber(parent, source) {
			var _this = _super.call(this) || this;

			_this.parent = parent;
			_this.source = source;
			_this.sourceSubscribed = false;
			return _this;
		}

		SubscriptionDelaySubscriber.prototype._next = function(unused) {
			this.subscribeToSource();
		};

		SubscriptionDelaySubscriber.prototype._error = function(err) {
			this.unsubscribe();
			this.parent.error(err);
		};

		SubscriptionDelaySubscriber.prototype._complete = function() {
			this.unsubscribe();
			this.subscribeToSource();
		};

		SubscriptionDelaySubscriber.prototype.subscribeToSource = function() {
			if (!this.sourceSubscribed) {
				this.sourceSubscribed = true;
				this.unsubscribe();
				this.source.subscribe(this.parent);
			}
		};

		return SubscriptionDelaySubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var DeMaterializeSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(DeMaterializeSubscriber, _super);

		function DeMaterializeSubscriber(destination) {
			return _super.call(this, destination) || this;
		}

		DeMaterializeSubscriber.prototype._next = function(value) {
			value.observe(this.destination);
		};

		return DeMaterializeSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var DistinctSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(DistinctSubscriber, _super);

		function DistinctSubscriber(destination, keySelector, flushes) {
			var _this = _super.call(this, destination) || this;

			_this.keySelector = keySelector;
			_this.values = new Set();

			if (flushes) {
				_this.add(subscribeToResult(_this, flushes));
			}

			return _this;
		}

		DistinctSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.values.clear();
		};

		DistinctSubscriber.prototype.notifyError = function(error, innerSub) {
			this._error(error);
		};

		DistinctSubscriber.prototype._next = function(value) {
			if (this.keySelector) {
				this._useKeySelector(value);
			} else {
				this._finalizeNext(value, value);
			}
		};

		DistinctSubscriber.prototype._useKeySelector = function(value) {
			var key;
			var destination = this.destination;

			try {
				key = this.keySelector(value);
			} catch (err) {
				destination.error(err);
				return;
			}

			this._finalizeNext(key, value);
		};

		DistinctSubscriber.prototype._finalizeNext = function(key, value) {
			var values = this.values;

			if (!values.has(key)) {
				values.add(key);
				this.destination.next(value);
			}
		};

		return DistinctSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_util_tryCatch,_util_errorObject PURE_IMPORTS_END */

var DistinctUntilChangedSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(DistinctUntilChangedSubscriber, _super);

		function DistinctUntilChangedSubscriber(
			destination,
			compare,
			keySelector
		) {
			var _this = _super.call(this, destination) || this;

			_this.keySelector = keySelector;
			_this.hasKey = false;

			if (typeof compare === "function") {
				_this.compare = compare;
			}

			return _this;
		}

		DistinctUntilChangedSubscriber.prototype.compare = function(x, y) {
			return x === y;
		};

		DistinctUntilChangedSubscriber.prototype._next = function(value) {
			var keySelector = this.keySelector;
			var key = value;

			if (keySelector) {
				key = tryCatch$2(this.keySelector)(value);

				if (key === errorObject) {
					return this.destination.error(errorObject.e);
				}
			}

			var result = false;

			if (this.hasKey) {
				result = tryCatch$2(this.compare)(this.key, key);

				if (result === errorObject) {
					return this.destination.error(errorObject.e);
				}
			} else {
				this.hasKey = true;
			}

			if (Boolean(result) === false) {
				this.key = key;
				this.destination.next(value);
			}
		};

		return DistinctUntilChangedSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _distinctUntilChanged PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
function filter$1(predicate, thisArg) {
	return function filterOperatorFunction(source) {
		return source.lift(new FilterOperator(predicate, thisArg));
	};
}

var FilterOperator =
	/*@__PURE__*/
	(function() {
		function FilterOperator(predicate, thisArg) {
			this.predicate = predicate;
			this.thisArg = thisArg;
		}

		FilterOperator.prototype.call = function(subscriber, source) {
			return source.subscribe(
				new FilterSubscriber(subscriber, this.predicate, this.thisArg)
			);
		};

		return FilterOperator;
	})();

var FilterSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(FilterSubscriber, _super);

		function FilterSubscriber(destination, predicate, thisArg) {
			var _this = _super.call(this, destination) || this;

			_this.predicate = predicate;
			_this.thisArg = thisArg;
			_this.count = 0;
			return _this;
		}

		FilterSubscriber.prototype._next = function(value) {
			var result;

			try {
				result = this.predicate.call(this.thisArg, value, this.count++);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			if (result) {
				this.destination.next(value);
			}
		};

		return FilterSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_util_noop,_util_isFunction PURE_IMPORTS_END */

var TapSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(TapSubscriber, _super);

		function TapSubscriber(destination, observerOrNext, error, complete) {
			var _this = _super.call(this, destination) || this;

			_this._tapNext = noop$2;
			_this._tapError = noop$2;
			_this._tapComplete = noop$2;
			_this._tapError = error || noop$2;
			_this._tapComplete = complete || noop$2;

			if (isFunction(observerOrNext)) {
				_this._context = _this;
				_this._tapNext = observerOrNext;
			} else if (observerOrNext) {
				_this._context = observerOrNext;
				_this._tapNext = observerOrNext.next || noop$2;
				_this._tapError = observerOrNext.error || noop$2;
				_this._tapComplete = observerOrNext.complete || noop$2;
			}

			return _this;
		}

		TapSubscriber.prototype._next = function(value) {
			try {
				this._tapNext.call(this._context, value);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			this.destination.next(value);
		};

		TapSubscriber.prototype._error = function(err) {
			try {
				this._tapError.call(this._context, err);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			this.destination.error(err);
		};

		TapSubscriber.prototype._complete = function() {
			try {
				this._tapComplete.call(this._context);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			return this.destination.complete();
		};

		return TapSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _tap,_util_EmptyError PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */

var TakeSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(TakeSubscriber, _super);

		function TakeSubscriber(destination, total) {
			var _this = _super.call(this, destination) || this;

			_this.total = total;
			_this.count = 0;
			return _this;
		}

		TakeSubscriber.prototype._next = function(value) {
			var total = this.total;
			var count = ++this.count;

			if (count <= total) {
				this.destination.next(value);

				if (count === total) {
					this.destination.complete();
					this.unsubscribe();
				}
			}
		};

		return TakeSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _util_ArgumentOutOfRangeError,_filter,_throwIfEmpty,_defaultIfEmpty,_take PURE_IMPORTS_END */

/** PURE_IMPORTS_START _observable_fromArray,_observable_scalar,_observable_empty,_observable_concat,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var EverySubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(EverySubscriber, _super);

		function EverySubscriber(destination, predicate, thisArg, source) {
			var _this = _super.call(this, destination) || this;

			_this.predicate = predicate;
			_this.thisArg = thisArg;
			_this.source = source;
			_this.index = 0;
			_this.thisArg = thisArg || _this;
			return _this;
		}

		EverySubscriber.prototype.notifyComplete = function(everyValueMatch) {
			this.destination.next(everyValueMatch);
			this.destination.complete();
		};

		EverySubscriber.prototype._next = function(value) {
			var result = false;

			try {
				result = this.predicate.call(
					this.thisArg,
					value,
					this.index++,
					this.source
				);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			if (!result) {
				this.notifyComplete(false);
			}
		};

		EverySubscriber.prototype._complete = function() {
			this.notifyComplete(true);
		};

		return EverySubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var SwitchFirstSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SwitchFirstSubscriber, _super);

		function SwitchFirstSubscriber(destination) {
			var _this = _super.call(this, destination) || this;

			_this.hasCompleted = false;
			_this.hasSubscription = false;
			return _this;
		}

		SwitchFirstSubscriber.prototype._next = function(value) {
			if (!this.hasSubscription) {
				this.hasSubscription = true;
				this.add(subscribeToResult(this, value));
			}
		};

		SwitchFirstSubscriber.prototype._complete = function() {
			this.hasCompleted = true;

			if (!this.hasSubscription) {
				this.destination.complete();
			}
		};

		SwitchFirstSubscriber.prototype.notifyComplete = function(innerSub) {
			this.remove(innerSub);
			this.hasSubscription = false;

			if (this.hasCompleted) {
				this.destination.complete();
			}
		};

		return SwitchFirstSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult,_map,_observable_from PURE_IMPORTS_END */

var ExhaustMapSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(ExhaustMapSubscriber, _super);

		function ExhaustMapSubscriber(destination, project) {
			var _this = _super.call(this, destination) || this;

			_this.project = project;
			_this.hasSubscription = false;
			_this.hasCompleted = false;
			_this.index = 0;
			return _this;
		}

		ExhaustMapSubscriber.prototype._next = function(value) {
			if (!this.hasSubscription) {
				this.tryNext(value);
			}
		};

		ExhaustMapSubscriber.prototype.tryNext = function(value) {
			var result;
			var index = this.index++;

			try {
				result = this.project(value, index);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			this.hasSubscription = true;

			this._innerSub(result, value, index);
		};

		ExhaustMapSubscriber.prototype._innerSub = function(
			result,
			value,
			index
		) {
			var innerSubscriber = new InnerSubscriber(
				this,
				undefined,
				undefined
			);
			var destination = this.destination;
			destination.add(innerSubscriber);
			subscribeToResult(this, result, value, index, innerSubscriber);
		};

		ExhaustMapSubscriber.prototype._complete = function() {
			this.hasCompleted = true;

			if (!this.hasSubscription) {
				this.destination.complete();
			}

			this.unsubscribe();
		};

		ExhaustMapSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.destination.next(innerValue);
		};

		ExhaustMapSubscriber.prototype.notifyError = function(err) {
			this.destination.error(err);
		};

		ExhaustMapSubscriber.prototype.notifyComplete = function(innerSub) {
			var destination = this.destination;
			destination.remove(innerSub);
			this.hasSubscription = false;

			if (this.hasCompleted) {
				this.destination.complete();
			}
		};

		return ExhaustMapSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var ExpandSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(ExpandSubscriber, _super);

		function ExpandSubscriber(destination, project, concurrent, scheduler) {
			var _this = _super.call(this, destination) || this;

			_this.project = project;
			_this.concurrent = concurrent;
			_this.scheduler = scheduler;
			_this.index = 0;
			_this.active = 0;
			_this.hasCompleted = false;

			if (concurrent < Number.POSITIVE_INFINITY) {
				_this.buffer = [];
			}

			return _this;
		}

		ExpandSubscriber.dispatch = function(arg) {
			var subscriber = arg.subscriber,
				result = arg.result,
				value = arg.value,
				index = arg.index;
			subscriber.subscribeToProjection(result, value, index);
		};

		ExpandSubscriber.prototype._next = function(value) {
			var destination = this.destination;

			if (destination.closed) {
				this._complete();

				return;
			}

			var index = this.index++;

			if (this.active < this.concurrent) {
				destination.next(value);
				var result = tryCatch$2(this.project)(value, index);

				if (result === errorObject) {
					destination.error(errorObject.e);
				} else if (!this.scheduler) {
					this.subscribeToProjection(result, value, index);
				} else {
					var state = {
						subscriber: this,
						result: result,
						value: value,
						index: index
					};
					var destination_1 = this.destination;
					destination_1.add(
						this.scheduler.schedule(
							ExpandSubscriber.dispatch,
							0,
							state
						)
					);
				}
			} else {
				this.buffer.push(value);
			}
		};

		ExpandSubscriber.prototype.subscribeToProjection = function(
			result,
			value,
			index
		) {
			this.active++;
			var destination = this.destination;
			destination.add(subscribeToResult(this, result, value, index));
		};

		ExpandSubscriber.prototype._complete = function() {
			this.hasCompleted = true;

			if (this.hasCompleted && this.active === 0) {
				this.destination.complete();
			}

			this.unsubscribe();
		};

		ExpandSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this._next(innerValue);
		};

		ExpandSubscriber.prototype.notifyComplete = function(innerSub) {
			var buffer = this.buffer;
			var destination = this.destination;
			destination.remove(innerSub);
			this.active--;

			if (buffer && buffer.length > 0) {
				this._next(buffer.shift());
			}

			if (this.hasCompleted && this.active === 0) {
				this.destination.complete();
			}
		};

		return ExpandSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription PURE_IMPORTS_END */

var FinallySubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(FinallySubscriber, _super);

		function FinallySubscriber(destination, callback) {
			var _this = _super.call(this, destination) || this;

			_this.add(new Subscription$1(callback));

			return _this;
		}

		return FinallySubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var FindValueSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(FindValueSubscriber, _super);

		function FindValueSubscriber(
			destination,
			predicate,
			source,
			yieldIndex,
			thisArg
		) {
			var _this = _super.call(this, destination) || this;

			_this.predicate = predicate;
			_this.source = source;
			_this.yieldIndex = yieldIndex;
			_this.thisArg = thisArg;
			_this.index = 0;
			return _this;
		}

		FindValueSubscriber.prototype.notifyComplete = function(value) {
			var destination = this.destination;
			destination.next(value);
			destination.complete();
			this.unsubscribe();
		};

		FindValueSubscriber.prototype._next = function(value) {
			var _a = this,
				predicate = _a.predicate,
				thisArg = _a.thisArg;

			var index = this.index++;

			try {
				var result = predicate.call(
					thisArg || this,
					value,
					index,
					this.source
				);

				if (result) {
					this.notifyComplete(this.yieldIndex ? index : value);
				}
			} catch (err) {
				this.destination.error(err);
			}
		};

		FindValueSubscriber.prototype._complete = function() {
			this.notifyComplete(this.yieldIndex ? -1 : undefined);
		};

		return FindValueSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _operators_find PURE_IMPORTS_END */

/** PURE_IMPORTS_START _util_EmptyError,_filter,_take,_defaultIfEmpty,_throwIfEmpty,_util_identity PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var IgnoreElementsSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(IgnoreElementsSubscriber, _super);

		function IgnoreElementsSubscriber() {
			return (_super !== null && _super.apply(this, arguments)) || this;
		}

		IgnoreElementsSubscriber.prototype._next = function(unused) {};

		return IgnoreElementsSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var IsEmptySubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(IsEmptySubscriber, _super);

		function IsEmptySubscriber(destination) {
			return _super.call(this, destination) || this;
		}

		IsEmptySubscriber.prototype.notifyComplete = function(isEmpty) {
			var destination = this.destination;
			destination.next(isEmpty);
			destination.complete();
		};

		IsEmptySubscriber.prototype._next = function(value) {
			this.notifyComplete(false);
		};

		IsEmptySubscriber.prototype._complete = function() {
			this.notifyComplete(true);
		};

		return IsEmptySubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */

var TakeLastSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(TakeLastSubscriber, _super);

		function TakeLastSubscriber(destination, total) {
			var _this = _super.call(this, destination) || this;

			_this.total = total;
			_this.ring = new Array();
			_this.count = 0;
			return _this;
		}

		TakeLastSubscriber.prototype._next = function(value) {
			var ring = this.ring;
			var total = this.total;
			var count = this.count++;

			if (ring.length < total) {
				ring.push(value);
			} else {
				var index = count % total;
				ring[index] = value;
			}
		};

		TakeLastSubscriber.prototype._complete = function() {
			var destination = this.destination;
			var count = this.count;

			if (count > 0) {
				var total = this.count >= this.total ? this.total : this.count;
				var ring = this.ring;

				for (var i = 0; i < total; i++) {
					var idx = count++ % total;
					destination.next(ring[idx]);
				}
			}

			destination.complete();
		};

		return TakeLastSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _util_EmptyError,_filter,_takeLast,_throwIfEmpty,_defaultIfEmpty,_util_identity PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var MapToSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(MapToSubscriber, _super);

		function MapToSubscriber(destination, value) {
			var _this = _super.call(this, destination) || this;

			_this.value = value;
			return _this;
		}

		MapToSubscriber.prototype._next = function(x) {
			this.destination.next(this.value);
		};

		return MapToSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */

var MaterializeSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(MaterializeSubscriber, _super);

		function MaterializeSubscriber(destination) {
			return _super.call(this, destination) || this;
		}

		MaterializeSubscriber.prototype._next = function(value) {
			this.destination.next(Notification.createNext(value));
		};

		MaterializeSubscriber.prototype._error = function(err) {
			var destination = this.destination;
			destination.next(Notification.createError(err));
			destination.complete();
		};

		MaterializeSubscriber.prototype._complete = function() {
			var destination = this.destination;
			destination.next(Notification.createComplete());
			destination.complete();
		};

		return MaterializeSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var ScanSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(ScanSubscriber, _super);

		function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
			var _this = _super.call(this, destination) || this;

			_this.accumulator = accumulator;
			_this._seed = _seed;
			_this.hasSeed = hasSeed;
			_this.index = 0;
			return _this;
		}

		Object.defineProperty(ScanSubscriber.prototype, "seed", {
			get: function get() {
				return this._seed;
			},
			set: function set(value) {
				this.hasSeed = true;
				this._seed = value;
			},
			enumerable: true,
			configurable: true
		});

		ScanSubscriber.prototype._next = function(value) {
			if (!this.hasSeed) {
				this.seed = value;
				this.destination.next(value);
			} else {
				return this._tryNext(value);
			}
		};

		ScanSubscriber.prototype._tryNext = function(value) {
			var index = this.index++;
			var result;

			try {
				result = this.accumulator(this.seed, value, index);
			} catch (err) {
				this.destination.error(err);
			}

			this.seed = result;
			this.destination.next(result);
		};

		return ScanSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _scan,_takeLast,_defaultIfEmpty,_util_pipe PURE_IMPORTS_END */

/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

/** PURE_IMPORTS_START _observable_merge PURE_IMPORTS_END */

/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_util_tryCatch,_util_errorObject,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber PURE_IMPORTS_END */

var MergeScanSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(MergeScanSubscriber, _super);

		function MergeScanSubscriber(
			destination,
			accumulator,
			acc,
			concurrent
		) {
			var _this = _super.call(this, destination) || this;

			_this.accumulator = accumulator;
			_this.acc = acc;
			_this.concurrent = concurrent;
			_this.hasValue = false;
			_this.hasCompleted = false;
			_this.buffer = [];
			_this.active = 0;
			_this.index = 0;
			return _this;
		}

		MergeScanSubscriber.prototype._next = function(value) {
			if (this.active < this.concurrent) {
				var index = this.index++;
				var ish = tryCatch$2(this.accumulator)(this.acc, value);
				var destination = this.destination;

				if (ish === errorObject) {
					destination.error(errorObject.e);
				} else {
					this.active++;

					this._innerSub(ish, value, index);
				}
			} else {
				this.buffer.push(value);
			}
		};

		MergeScanSubscriber.prototype._innerSub = function(ish, value, index) {
			var innerSubscriber = new InnerSubscriber(
				this,
				undefined,
				undefined
			);
			var destination = this.destination;
			destination.add(innerSubscriber);
			subscribeToResult(this, ish, value, index, innerSubscriber);
		};

		MergeScanSubscriber.prototype._complete = function() {
			this.hasCompleted = true;

			if (this.active === 0 && this.buffer.length === 0) {
				if (this.hasValue === false) {
					this.destination.next(this.acc);
				}

				this.destination.complete();
			}

			this.unsubscribe();
		};

		MergeScanSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			var destination = this.destination;
			this.acc = innerValue;
			this.hasValue = true;
			destination.next(innerValue);
		};

		MergeScanSubscriber.prototype.notifyComplete = function(innerSub) {
			var buffer = this.buffer;
			var destination = this.destination;
			destination.remove(innerSub);
			this.active--;

			if (buffer.length > 0) {
				this._next(buffer.shift());
			} else if (this.active === 0 && this.hasCompleted) {
				if (this.hasValue === false) {
					this.destination.next(this.acc);
				}

				this.destination.complete();
			}
		};

		return MergeScanSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

/** PURE_IMPORTS_START _observable_ConnectableObservable PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_observable_from,_util_isArray,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var OnErrorResumeNextSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(OnErrorResumeNextSubscriber, _super);

		function OnErrorResumeNextSubscriber(destination, nextSources) {
			var _this = _super.call(this, destination) || this;

			_this.destination = destination;
			_this.nextSources = nextSources;
			return _this;
		}

		OnErrorResumeNextSubscriber.prototype.notifyError = function(
			error,
			innerSub
		) {
			this.subscribeToNextSource();
		};

		OnErrorResumeNextSubscriber.prototype.notifyComplete = function(
			innerSub
		) {
			this.subscribeToNextSource();
		};

		OnErrorResumeNextSubscriber.prototype._error = function(err) {
			this.subscribeToNextSource();
			this.unsubscribe();
		};

		OnErrorResumeNextSubscriber.prototype._complete = function() {
			this.subscribeToNextSource();
			this.unsubscribe();
		};

		OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function() {
			var next = this.nextSources.shift();

			if (next) {
				var innerSubscriber = new InnerSubscriber(
					this,
					undefined,
					undefined
				);
				var destination = this.destination;
				destination.add(innerSubscriber);
				subscribeToResult(
					this,
					next,
					undefined,
					undefined,
					innerSubscriber
				);
			} else {
				this.destination.complete();
			}
		};

		return OnErrorResumeNextSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var PairwiseSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(PairwiseSubscriber, _super);

		function PairwiseSubscriber(destination) {
			var _this = _super.call(this, destination) || this;

			_this.hasPrev = false;
			return _this;
		}

		PairwiseSubscriber.prototype._next = function(value) {
			if (this.hasPrev) {
				this.destination.next([this.prev, value]);
			} else {
				this.hasPrev = true;
			}

			this.prev = value;
		};

		return PairwiseSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

/** PURE_IMPORTS_START _util_not,_filter PURE_IMPORTS_END */

/** PURE_IMPORTS_START _map PURE_IMPORTS_END */

/** PURE_IMPORTS_START _Subject,_multicast PURE_IMPORTS_END */

/** PURE_IMPORTS_START _BehaviorSubject,_multicast PURE_IMPORTS_END */

/** PURE_IMPORTS_START _AsyncSubject,_multicast PURE_IMPORTS_END */

/** PURE_IMPORTS_START _ReplaySubject,_multicast PURE_IMPORTS_END */

/** PURE_IMPORTS_START _util_isArray,_observable_race PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber,_observable_empty PURE_IMPORTS_END */

var RepeatSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(RepeatSubscriber, _super);

		function RepeatSubscriber(destination, count, source) {
			var _this = _super.call(this, destination) || this;

			_this.count = count;
			_this.source = source;
			return _this;
		}

		RepeatSubscriber.prototype.complete = function() {
			if (!this.isStopped) {
				var _a = this,
					source = _a.source,
					count = _a.count;

				if (count === 0) {
					return _super.prototype.complete.call(this);
				} else if (count > -1) {
					this.count = count - 1;
				}

				source.subscribe(this._unsubscribeAndRecycle());
			}
		};

		return RepeatSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subject,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var RepeatWhenSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(RepeatWhenSubscriber, _super);

		function RepeatWhenSubscriber(destination, notifier, source) {
			var _this = _super.call(this, destination) || this;

			_this.notifier = notifier;
			_this.source = source;
			_this.sourceIsBeingSubscribedTo = true;
			return _this;
		}

		RepeatWhenSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.sourceIsBeingSubscribedTo = true;
			this.source.subscribe(this);
		};

		RepeatWhenSubscriber.prototype.notifyComplete = function(innerSub) {
			if (this.sourceIsBeingSubscribedTo === false) {
				return _super.prototype.complete.call(this);
			}
		};

		RepeatWhenSubscriber.prototype.complete = function() {
			this.sourceIsBeingSubscribedTo = false;

			if (!this.isStopped) {
				if (!this.retries) {
					this.subscribeToRetries();
				}

				if (
					!this.retriesSubscription ||
					this.retriesSubscription.closed
				) {
					return _super.prototype.complete.call(this);
				}

				this._unsubscribeAndRecycle();

				this.notifications.next();
			}
		};

		RepeatWhenSubscriber.prototype._unsubscribe = function() {
			var _a = this,
				notifications = _a.notifications,
				retriesSubscription = _a.retriesSubscription;

			if (notifications) {
				notifications.unsubscribe();
				this.notifications = null;
			}

			if (retriesSubscription) {
				retriesSubscription.unsubscribe();
				this.retriesSubscription = null;
			}

			this.retries = null;
		};

		RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function() {
			var _unsubscribe = this._unsubscribe;
			this._unsubscribe = null;

			_super.prototype._unsubscribeAndRecycle.call(this);

			this._unsubscribe = _unsubscribe;
			return this;
		};

		RepeatWhenSubscriber.prototype.subscribeToRetries = function() {
			this.notifications = new Subject();
			var retries = tryCatch$2(this.notifier)(this.notifications);

			if (retries === errorObject) {
				return _super.prototype.complete.call(this);
			}

			this.retries = retries;
			this.retriesSubscription = subscribeToResult(this, retries);
		};

		return RepeatWhenSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var RetrySubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(RetrySubscriber, _super);

		function RetrySubscriber(destination, count, source) {
			var _this = _super.call(this, destination) || this;

			_this.count = count;
			_this.source = source;
			return _this;
		}

		RetrySubscriber.prototype.error = function(err) {
			if (!this.isStopped) {
				var _a = this,
					source = _a.source,
					count = _a.count;

				if (count === 0) {
					return _super.prototype.error.call(this, err);
				} else if (count > -1) {
					this.count = count - 1;
				}

				source.subscribe(this._unsubscribeAndRecycle());
			}
		};

		return RetrySubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subject,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var RetryWhenSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(RetryWhenSubscriber, _super);

		function RetryWhenSubscriber(destination, notifier, source) {
			var _this = _super.call(this, destination) || this;

			_this.notifier = notifier;
			_this.source = source;
			return _this;
		}

		RetryWhenSubscriber.prototype.error = function(err) {
			if (!this.isStopped) {
				var errors = this.errors;
				var retries = this.retries;
				var retriesSubscription = this.retriesSubscription;

				if (!retries) {
					errors = new Subject();
					retries = tryCatch$2(this.notifier)(errors);

					if (retries === errorObject) {
						return _super.prototype.error.call(this, errorObject.e);
					}

					retriesSubscription = subscribeToResult(this, retries);
				} else {
					this.errors = null;
					this.retriesSubscription = null;
				}

				this._unsubscribeAndRecycle();

				this.errors = errors;
				this.retries = retries;
				this.retriesSubscription = retriesSubscription;
				errors.next(err);
			}
		};

		RetryWhenSubscriber.prototype._unsubscribe = function() {
			var _a = this,
				errors = _a.errors,
				retriesSubscription = _a.retriesSubscription;

			if (errors) {
				errors.unsubscribe();
				this.errors = null;
			}

			if (retriesSubscription) {
				retriesSubscription.unsubscribe();
				this.retriesSubscription = null;
			}

			this.retries = null;
		};

		RetryWhenSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			var _unsubscribe = this._unsubscribe;
			this._unsubscribe = null;

			this._unsubscribeAndRecycle();

			this._unsubscribe = _unsubscribe;
			this.source.subscribe(this);
		};

		return RetryWhenSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var SampleSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SampleSubscriber, _super);

		function SampleSubscriber() {
			var _this =
				(_super !== null && _super.apply(this, arguments)) || this;

			_this.hasValue = false;
			return _this;
		}

		SampleSubscriber.prototype._next = function(value) {
			this.value = value;
			this.hasValue = true;
		};

		SampleSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.emitValue();
		};

		SampleSubscriber.prototype.notifyComplete = function() {
			this.emitValue();
		};

		SampleSubscriber.prototype.emitValue = function() {
			if (this.hasValue) {
				this.hasValue = false;
				this.destination.next(this.value);
			}
		};

		return SampleSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */

var SampleTimeSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SampleTimeSubscriber, _super);

		function SampleTimeSubscriber(destination, period, scheduler) {
			var _this = _super.call(this, destination) || this;

			_this.period = period;
			_this.scheduler = scheduler;
			_this.hasValue = false;

			_this.add(
				scheduler.schedule(dispatchNotification, period, {
					subscriber: _this,
					period: period
				})
			);

			return _this;
		}

		SampleTimeSubscriber.prototype._next = function(value) {
			this.lastValue = value;
			this.hasValue = true;
		};

		SampleTimeSubscriber.prototype.notifyNext = function() {
			if (this.hasValue) {
				this.hasValue = false;
				this.destination.next(this.lastValue);
			}
		};

		return SampleTimeSubscriber;
	})(Subscriber);

function dispatchNotification(state) {
	var subscriber = state.subscriber,
		period = state.period;
	subscriber.notifyNext();
	this.schedule(state, period);
}

/** PURE_IMPORTS_START tslib,_Subscriber,_util_tryCatch,_util_errorObject PURE_IMPORTS_END */

var SequenceEqualSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SequenceEqualSubscriber, _super);

		function SequenceEqualSubscriber(destination, compareTo, comparor) {
			var _this = _super.call(this, destination) || this;

			_this.compareTo = compareTo;
			_this.comparor = comparor;
			_this._a = [];
			_this._b = [];
			_this._oneComplete = false;

			_this.destination.add(
				compareTo.subscribe(
					new SequenceEqualCompareToSubscriber(destination, _this)
				)
			);

			return _this;
		}

		SequenceEqualSubscriber.prototype._next = function(value) {
			if (this._oneComplete && this._b.length === 0) {
				this.emit(false);
			} else {
				this._a.push(value);

				this.checkValues();
			}
		};

		SequenceEqualSubscriber.prototype._complete = function() {
			if (this._oneComplete) {
				this.emit(this._a.length === 0 && this._b.length === 0);
			} else {
				this._oneComplete = true;
			}

			this.unsubscribe();
		};

		SequenceEqualSubscriber.prototype.checkValues = function() {
			var _c = this,
				_a = _c._a,
				_b = _c._b,
				comparor = _c.comparor;

			while (_a.length > 0 && _b.length > 0) {
				var a = _a.shift();

				var b = _b.shift();

				var areEqual = false;

				if (comparor) {
					areEqual = tryCatch$2(comparor)(a, b);

					if (areEqual === errorObject) {
						this.destination.error(errorObject.e);
					}
				} else {
					areEqual = a === b;
				}

				if (!areEqual) {
					this.emit(false);
				}
			}
		};

		SequenceEqualSubscriber.prototype.emit = function(value) {
			var destination = this.destination;
			destination.next(value);
			destination.complete();
		};

		SequenceEqualSubscriber.prototype.nextB = function(value) {
			if (this._oneComplete && this._a.length === 0) {
				this.emit(false);
			} else {
				this._b.push(value);

				this.checkValues();
			}
		};

		SequenceEqualSubscriber.prototype.completeB = function() {
			if (this._oneComplete) {
				this.emit(this._a.length === 0 && this._b.length === 0);
			} else {
				this._oneComplete = true;
			}
		};

		return SequenceEqualSubscriber;
	})(Subscriber);

var SequenceEqualCompareToSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SequenceEqualCompareToSubscriber, _super);

		function SequenceEqualCompareToSubscriber(destination, parent) {
			var _this = _super.call(this, destination) || this;

			_this.parent = parent;
			return _this;
		}

		SequenceEqualCompareToSubscriber.prototype._next = function(value) {
			this.parent.nextB(value);
		};

		SequenceEqualCompareToSubscriber.prototype._error = function(err) {
			this.parent.error(err);
			this.unsubscribe();
		};

		SequenceEqualCompareToSubscriber.prototype._complete = function() {
			this.parent.completeB();
			this.unsubscribe();
		};

		return SequenceEqualCompareToSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _multicast,_refCount,_Subject PURE_IMPORTS_END */

/** PURE_IMPORTS_START _ReplaySubject PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subscriber,_util_EmptyError PURE_IMPORTS_END */

var SingleSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SingleSubscriber, _super);

		function SingleSubscriber(destination, predicate, source) {
			var _this = _super.call(this, destination) || this;

			_this.predicate = predicate;
			_this.source = source;
			_this.seenValue = false;
			_this.index = 0;
			return _this;
		}

		SingleSubscriber.prototype.applySingleValue = function(value) {
			if (this.seenValue) {
				this.destination.error(
					"Sequence contains more than one element"
				);
			} else {
				this.seenValue = true;
				this.singleValue = value;
			}
		};

		SingleSubscriber.prototype._next = function(value) {
			var index = this.index++;

			if (this.predicate) {
				this.tryNext(value, index);
			} else {
				this.applySingleValue(value);
			}
		};

		SingleSubscriber.prototype.tryNext = function(value, index) {
			try {
				if (this.predicate(value, index, this.source)) {
					this.applySingleValue(value);
				}
			} catch (err) {
				this.destination.error(err);
			}
		};

		SingleSubscriber.prototype._complete = function() {
			var destination = this.destination;

			if (this.index > 0) {
				destination.next(this.seenValue ? this.singleValue : undefined);
				destination.complete();
			} else {
				destination.error(new EmptyError());
			}
		};

		return SingleSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var SkipSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SkipSubscriber, _super);

		function SkipSubscriber(destination, total) {
			var _this = _super.call(this, destination) || this;

			_this.total = total;
			_this.count = 0;
			return _this;
		}

		SkipSubscriber.prototype._next = function(x) {
			if (++this.count > this.total) {
				this.destination.next(x);
			}
		};

		return SkipSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError PURE_IMPORTS_END */

var SkipLastSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SkipLastSubscriber, _super);

		function SkipLastSubscriber(destination, _skipCount) {
			var _this = _super.call(this, destination) || this;

			_this._skipCount = _skipCount;
			_this._count = 0;
			_this._ring = new Array(_skipCount);
			return _this;
		}

		SkipLastSubscriber.prototype._next = function(value) {
			var skipCount = this._skipCount;
			var count = this._count++;

			if (count < skipCount) {
				this._ring[count] = value;
			} else {
				var currentIndex = count % skipCount;
				var ring = this._ring;
				var oldValue = ring[currentIndex];
				ring[currentIndex] = value;
				this.destination.next(oldValue);
			}
		};

		return SkipLastSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var SkipUntilSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SkipUntilSubscriber, _super);

		function SkipUntilSubscriber(destination, notifier) {
			var _this = _super.call(this, destination) || this;

			_this.hasValue = false;
			var innerSubscriber = new InnerSubscriber(
				_this,
				undefined,
				undefined
			);

			_this.add(innerSubscriber);

			_this.innerSubscription = innerSubscriber;
			subscribeToResult(
				_this,
				notifier,
				undefined,
				undefined,
				innerSubscriber
			);
			return _this;
		}

		SkipUntilSubscriber.prototype._next = function(value) {
			if (this.hasValue) {
				_super.prototype._next.call(this, value);
			}
		};

		SkipUntilSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.hasValue = true;

			if (this.innerSubscription) {
				this.innerSubscription.unsubscribe();
			}
		};

		SkipUntilSubscriber.prototype.notifyComplete = function() {};

		return SkipUntilSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var SkipWhileSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SkipWhileSubscriber, _super);

		function SkipWhileSubscriber(destination, predicate) {
			var _this = _super.call(this, destination) || this;

			_this.predicate = predicate;
			_this.skipping = true;
			_this.index = 0;
			return _this;
		}

		SkipWhileSubscriber.prototype._next = function(value) {
			var destination = this.destination;

			if (this.skipping) {
				this.tryCallPredicate(value);
			}

			if (!this.skipping) {
				destination.next(value);
			}
		};

		SkipWhileSubscriber.prototype.tryCallPredicate = function(value) {
			try {
				var result = this.predicate(value, this.index++);
				this.skipping = Boolean(result);
			} catch (err) {
				this.destination.error(err);
			}
		};

		return SkipWhileSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START _observable_fromArray,_observable_scalar,_observable_empty,_observable_concat,_util_isScheduler PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Observable,_scheduler_asap,_util_isNumeric PURE_IMPORTS_END */

var SubscribeOnObservable =
	/*@__PURE__*/
	(function(_super) {
		__extends(SubscribeOnObservable, _super);

		function SubscribeOnObservable(source, delayTime, scheduler) {
			if (delayTime === void 0) {
				delayTime = 0;
			}

			if (scheduler === void 0) {
				scheduler = asap;
			}

			var _this = _super.call(this) || this;

			_this.source = source;
			_this.delayTime = delayTime;
			_this.scheduler = scheduler;

			if (!isNumeric(delayTime) || delayTime < 0) {
				_this.delayTime = 0;
			}

			if (!scheduler || typeof scheduler.schedule !== "function") {
				_this.scheduler = asap;
			}

			return _this;
		}

		SubscribeOnObservable.create = function(source, delay, scheduler) {
			if (delay === void 0) {
				delay = 0;
			}

			if (scheduler === void 0) {
				scheduler = asap;
			}

			return new SubscribeOnObservable(source, delay, scheduler);
		};

		SubscribeOnObservable.dispatch = function(arg) {
			var source = arg.source,
				subscriber = arg.subscriber;
			return this.add(source.subscribe(subscriber));
		};

		SubscribeOnObservable.prototype._subscribe = function(subscriber) {
			var delay = this.delayTime;
			var source = this.source;
			var scheduler = this.scheduler;
			return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
				source: source,
				subscriber: subscriber
			});
		};

		return SubscribeOnObservable;
	})(Observable);

/** PURE_IMPORTS_START _observable_SubscribeOnObservable PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_InnerSubscriber,_util_subscribeToResult,_map,_observable_from PURE_IMPORTS_END */

var SwitchMapSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(SwitchMapSubscriber, _super);

		function SwitchMapSubscriber(destination, project) {
			var _this = _super.call(this, destination) || this;

			_this.project = project;
			_this.index = 0;
			return _this;
		}

		SwitchMapSubscriber.prototype._next = function(value) {
			var result;
			var index = this.index++;

			try {
				result = this.project(value, index);
			} catch (error) {
				this.destination.error(error);
				return;
			}

			this._innerSub(result, value, index);
		};

		SwitchMapSubscriber.prototype._innerSub = function(
			result,
			value,
			index
		) {
			var innerSubscription = this.innerSubscription;

			if (innerSubscription) {
				innerSubscription.unsubscribe();
			}

			var innerSubscriber = new InnerSubscriber(
				this,
				undefined,
				undefined
			);
			var destination = this.destination;
			destination.add(innerSubscriber);
			this.innerSubscription = subscribeToResult(
				this,
				result,
				value,
				index,
				innerSubscriber
			);
		};

		SwitchMapSubscriber.prototype._complete = function() {
			var innerSubscription = this.innerSubscription;

			if (!innerSubscription || innerSubscription.closed) {
				_super.prototype._complete.call(this);
			}

			this.unsubscribe();
		};

		SwitchMapSubscriber.prototype._unsubscribe = function() {
			this.innerSubscription = null;
		};

		SwitchMapSubscriber.prototype.notifyComplete = function(innerSub) {
			var destination = this.destination;
			destination.remove(innerSub);
			this.innerSubscription = null;

			if (this.isStopped) {
				_super.prototype._complete.call(this);
			}
		};

		SwitchMapSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.destination.next(innerValue);
		};

		return SwitchMapSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START _switchMap,_util_identity PURE_IMPORTS_END */

/** PURE_IMPORTS_START _switchMap PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var TakeUntilSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(TakeUntilSubscriber, _super);

		function TakeUntilSubscriber(destination) {
			var _this = _super.call(this, destination) || this;

			_this.seenValue = false;
			return _this;
		}

		TakeUntilSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.seenValue = true;
			this.complete();
		};

		TakeUntilSubscriber.prototype.notifyComplete = function() {};

		return TakeUntilSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

var TakeWhileSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(TakeWhileSubscriber, _super);

		function TakeWhileSubscriber(destination, predicate) {
			var _this = _super.call(this, destination) || this;

			_this.predicate = predicate;
			_this.index = 0;
			return _this;
		}

		TakeWhileSubscriber.prototype._next = function(value) {
			var destination = this.destination;
			var result;

			try {
				result = this.predicate(value, this.index++);
			} catch (err) {
				destination.error(err);
				return;
			}

			this.nextOrComplete(value, result);
		};

		TakeWhileSubscriber.prototype.nextOrComplete = function(
			value,
			predicateResult
		) {
			var destination = this.destination;

			if (Boolean(predicateResult)) {
				destination.next(value);
			} else {
				destination.complete();
			}
		};

		return TakeWhileSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var ThrottleSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(ThrottleSubscriber, _super);

		function ThrottleSubscriber(
			destination,
			durationSelector,
			_leading,
			_trailing
		) {
			var _this = _super.call(this, destination) || this;

			_this.destination = destination;
			_this.durationSelector = durationSelector;
			_this._leading = _leading;
			_this._trailing = _trailing;
			_this._hasValue = false;
			return _this;
		}

		ThrottleSubscriber.prototype._next = function(value) {
			this._hasValue = true;
			this._sendValue = value;

			if (!this._throttled) {
				if (this._leading) {
					this.send();
				} else {
					this.throttle(value);
				}
			}
		};

		ThrottleSubscriber.prototype.send = function() {
			var _a = this,
				_hasValue = _a._hasValue,
				_sendValue = _a._sendValue;

			if (_hasValue) {
				this.destination.next(_sendValue);
				this.throttle(_sendValue);
			}

			this._hasValue = false;
			this._sendValue = null;
		};

		ThrottleSubscriber.prototype.throttle = function(value) {
			var duration = this.tryDurationSelector(value);

			if (duration) {
				this.add((this._throttled = subscribeToResult(this, duration)));
			}
		};

		ThrottleSubscriber.prototype.tryDurationSelector = function(value) {
			try {
				return this.durationSelector(value);
			} catch (err) {
				this.destination.error(err);
				return null;
			}
		};

		ThrottleSubscriber.prototype.throttlingDone = function() {
			var _a = this,
				_throttled = _a._throttled,
				_trailing = _a._trailing;

			if (_throttled) {
				_throttled.unsubscribe();
			}

			this._throttled = null;

			if (_trailing) {
				this.send();
			}
		};

		ThrottleSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.throttlingDone();
		};

		ThrottleSubscriber.prototype.notifyComplete = function() {
			this.throttlingDone();
		};

		return ThrottleSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async,_throttle PURE_IMPORTS_END */

var ThrottleTimeSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(ThrottleTimeSubscriber, _super);

		function ThrottleTimeSubscriber(
			destination,
			duration,
			scheduler,
			leading,
			trailing
		) {
			var _this = _super.call(this, destination) || this;

			_this.duration = duration;
			_this.scheduler = scheduler;
			_this.leading = leading;
			_this.trailing = trailing;
			_this._hasTrailingValue = false;
			_this._trailingValue = null;
			return _this;
		}

		ThrottleTimeSubscriber.prototype._next = function(value) {
			if (this.throttled) {
				if (this.trailing) {
					this._trailingValue = value;
					this._hasTrailingValue = true;
				}
			} else {
				this.add(
					(this.throttled = this.scheduler.schedule(
						dispatchNext$3,
						this.duration,
						{
							subscriber: this
						}
					))
				);

				if (this.leading) {
					this.destination.next(value);
				}
			}
		};

		ThrottleTimeSubscriber.prototype._complete = function() {
			if (this._hasTrailingValue) {
				this.destination.next(this._trailingValue);
				this.destination.complete();
			} else {
				this.destination.complete();
			}
		};

		ThrottleTimeSubscriber.prototype.clearThrottle = function() {
			var throttled = this.throttled;

			if (throttled) {
				if (this.trailing && this._hasTrailingValue) {
					this.destination.next(this._trailingValue);
					this._trailingValue = null;
					this._hasTrailingValue = false;
				}

				throttled.unsubscribe();
				this.remove(throttled);
				this.throttled = null;
			}
		};

		return ThrottleTimeSubscriber;
	})(Subscriber);

function dispatchNext$3(arg) {
	var subscriber = arg.subscriber;
	subscriber.clearThrottle();
}

/** PURE_IMPORTS_START _scheduler_async,_scan,_observable_defer,_map PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var TimeoutWithSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(TimeoutWithSubscriber, _super);

		function TimeoutWithSubscriber(
			destination,
			absoluteTimeout,
			waitFor,
			withObservable,
			scheduler
		) {
			var _this = _super.call(this, destination) || this;

			_this.absoluteTimeout = absoluteTimeout;
			_this.waitFor = waitFor;
			_this.withObservable = withObservable;
			_this.scheduler = scheduler;
			_this.action = null;

			_this.scheduleTimeout();

			return _this;
		}

		TimeoutWithSubscriber.dispatchTimeout = function(subscriber) {
			var withObservable = subscriber.withObservable;

			subscriber._unsubscribeAndRecycle();

			subscriber.add(subscribeToResult(subscriber, withObservable));
		};

		TimeoutWithSubscriber.prototype.scheduleTimeout = function() {
			var action = this.action;

			if (action) {
				this.action = action.schedule(this, this.waitFor);
			} else {
				this.add(
					(this.action = this.scheduler.schedule(
						TimeoutWithSubscriber.dispatchTimeout,
						this.waitFor,
						this
					))
				);
			}
		};

		TimeoutWithSubscriber.prototype._next = function(value) {
			if (!this.absoluteTimeout) {
				this.scheduleTimeout();
			}

			_super.prototype._next.call(this, value);
		};

		TimeoutWithSubscriber.prototype._unsubscribe = function() {
			this.action = null;
			this.scheduler = null;
			this.withObservable = null;
		};

		return TimeoutWithSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START _scheduler_async,_util_TimeoutError,_timeoutWith,_observable_throwError PURE_IMPORTS_END */

/** PURE_IMPORTS_START _scheduler_async,_map PURE_IMPORTS_END */

/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

/** PURE_IMPORTS_START tslib,_Subject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var WindowSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(WindowSubscriber, _super);

		function WindowSubscriber(destination) {
			var _this = _super.call(this, destination) || this;

			_this.window = new Subject();
			destination.next(_this.window);
			return _this;
		}

		WindowSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.openWindow();
		};

		WindowSubscriber.prototype.notifyError = function(error, innerSub) {
			this._error(error);
		};

		WindowSubscriber.prototype.notifyComplete = function(innerSub) {
			this._complete();
		};

		WindowSubscriber.prototype._next = function(value) {
			this.window.next(value);
		};

		WindowSubscriber.prototype._error = function(err) {
			this.window.error(err);
			this.destination.error(err);
		};

		WindowSubscriber.prototype._complete = function() {
			this.window.complete();
			this.destination.complete();
		};

		WindowSubscriber.prototype._unsubscribe = function() {
			this.window = null;
		};

		WindowSubscriber.prototype.openWindow = function() {
			var prevWindow = this.window;

			if (prevWindow) {
				prevWindow.complete();
			}

			var destination = this.destination;
			var newWindow = (this.window = new Subject());
			destination.next(newWindow);
		};

		return WindowSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subscriber,_Subject PURE_IMPORTS_END */

var WindowCountSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(WindowCountSubscriber, _super);

		function WindowCountSubscriber(
			destination,
			windowSize,
			startWindowEvery
		) {
			var _this = _super.call(this, destination) || this;

			_this.destination = destination;
			_this.windowSize = windowSize;
			_this.startWindowEvery = startWindowEvery;
			_this.windows = [new Subject()];
			_this.count = 0;
			destination.next(_this.windows[0]);
			return _this;
		}

		WindowCountSubscriber.prototype._next = function(value) {
			var startWindowEvery =
				this.startWindowEvery > 0
					? this.startWindowEvery
					: this.windowSize;
			var destination = this.destination;
			var windowSize = this.windowSize;
			var windows = this.windows;
			var len = windows.length;

			for (var i = 0; i < len && !this.closed; i++) {
				windows[i].next(value);
			}

			var c = this.count - windowSize + 1;

			if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
				windows.shift().complete();
			}

			if (++this.count % startWindowEvery === 0 && !this.closed) {
				var window_1 = new Subject();
				windows.push(window_1);
				destination.next(window_1);
			}
		};

		WindowCountSubscriber.prototype._error = function(err) {
			var windows = this.windows;

			if (windows) {
				while (windows.length > 0 && !this.closed) {
					windows.shift().error(err);
				}
			}

			this.destination.error(err);
		};

		WindowCountSubscriber.prototype._complete = function() {
			var windows = this.windows;

			if (windows) {
				while (windows.length > 0 && !this.closed) {
					windows.shift().complete();
				}
			}

			this.destination.complete();
		};

		WindowCountSubscriber.prototype._unsubscribe = function() {
			this.count = 0;
			this.windows = null;
		};

		return WindowCountSubscriber;
	})(Subscriber);

/** PURE_IMPORTS_START tslib,_Subject,_scheduler_async,_Subscriber,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */

var CountedSubject =
	/*@__PURE__*/
	(function(_super) {
		__extends(CountedSubject, _super);

		function CountedSubject() {
			var _this =
				(_super !== null && _super.apply(this, arguments)) || this;

			_this._numberOfNextedValues = 0;
			return _this;
		}

		CountedSubject.prototype.next = function(value) {
			this._numberOfNextedValues++;

			_super.prototype.next.call(this, value);
		};

		Object.defineProperty(
			CountedSubject.prototype,
			"numberOfNextedValues",
			{
				get: function get() {
					return this._numberOfNextedValues;
				},
				enumerable: true,
				configurable: true
			}
		);
		return CountedSubject;
	})(Subject);

var WindowTimeSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(WindowTimeSubscriber, _super);

		function WindowTimeSubscriber(
			destination,
			windowTimeSpan,
			windowCreationInterval,
			maxWindowSize,
			scheduler
		) {
			var _this = _super.call(this, destination) || this;

			_this.destination = destination;
			_this.windowTimeSpan = windowTimeSpan;
			_this.windowCreationInterval = windowCreationInterval;
			_this.maxWindowSize = maxWindowSize;
			_this.scheduler = scheduler;
			_this.windows = [];

			var window = _this.openWindow();

			if (
				windowCreationInterval !== null &&
				windowCreationInterval >= 0
			) {
				var closeState = {
					subscriber: _this,
					window: window,
					context: null
				};
				var creationState = {
					windowTimeSpan: windowTimeSpan,
					windowCreationInterval: windowCreationInterval,
					subscriber: _this,
					scheduler: scheduler
				};

				_this.add(
					scheduler.schedule(
						dispatchWindowClose,
						windowTimeSpan,
						closeState
					)
				);

				_this.add(
					scheduler.schedule(
						dispatchWindowCreation,
						windowCreationInterval,
						creationState
					)
				);
			} else {
				var timeSpanOnlyState = {
					subscriber: _this,
					window: window,
					windowTimeSpan: windowTimeSpan
				};

				_this.add(
					scheduler.schedule(
						dispatchWindowTimeSpanOnly,
						windowTimeSpan,
						timeSpanOnlyState
					)
				);
			}

			return _this;
		}

		WindowTimeSubscriber.prototype._next = function(value) {
			var windows = this.windows;
			var len = windows.length;

			for (var i = 0; i < len; i++) {
				var window_1 = windows[i];

				if (!window_1.closed) {
					window_1.next(value);

					if (window_1.numberOfNextedValues >= this.maxWindowSize) {
						this.closeWindow(window_1);
					}
				}
			}
		};

		WindowTimeSubscriber.prototype._error = function(err) {
			var windows = this.windows;

			while (windows.length > 0) {
				windows.shift().error(err);
			}

			this.destination.error(err);
		};

		WindowTimeSubscriber.prototype._complete = function() {
			var windows = this.windows;

			while (windows.length > 0) {
				var window_2 = windows.shift();

				if (!window_2.closed) {
					window_2.complete();
				}
			}

			this.destination.complete();
		};

		WindowTimeSubscriber.prototype.openWindow = function() {
			var window = new CountedSubject();
			this.windows.push(window);
			var destination = this.destination;
			destination.next(window);
			return window;
		};

		WindowTimeSubscriber.prototype.closeWindow = function(window) {
			window.complete();
			var windows = this.windows;
			windows.splice(windows.indexOf(window), 1);
		};

		return WindowTimeSubscriber;
	})(Subscriber);

function dispatchWindowTimeSpanOnly(state) {
	var subscriber = state.subscriber,
		windowTimeSpan = state.windowTimeSpan,
		window = state.window;

	if (window) {
		subscriber.closeWindow(window);
	}

	state.window = subscriber.openWindow();
	this.schedule(state, windowTimeSpan);
}

function dispatchWindowCreation(state) {
	var windowTimeSpan = state.windowTimeSpan,
		subscriber = state.subscriber,
		scheduler = state.scheduler,
		windowCreationInterval = state.windowCreationInterval;
	var window = subscriber.openWindow();
	var action = this;
	var context = {
		action: action,
		subscription: null
	};
	var timeSpanState = {
		subscriber: subscriber,
		window: window,
		context: context
	};
	context.subscription = scheduler.schedule(
		dispatchWindowClose,
		windowTimeSpan,
		timeSpanState
	);
	action.add(context.subscription);
	action.schedule(state, windowCreationInterval);
}

function dispatchWindowClose(state) {
	var subscriber = state.subscriber,
		window = state.window,
		context = state.context;

	if (context && context.action && context.subscription) {
		context.action.remove(context.subscription);
	}

	subscriber.closeWindow(window);
}

/** PURE_IMPORTS_START tslib,_Subject,_Subscription,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var WindowToggleSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(WindowToggleSubscriber, _super);

		function WindowToggleSubscriber(
			destination,
			openings,
			closingSelector
		) {
			var _this = _super.call(this, destination) || this;

			_this.openings = openings;
			_this.closingSelector = closingSelector;
			_this.contexts = [];

			_this.add(
				(_this.openSubscription = subscribeToResult(
					_this,
					openings,
					openings
				))
			);

			return _this;
		}

		WindowToggleSubscriber.prototype._next = function(value) {
			var contexts = this.contexts;

			if (contexts) {
				var len = contexts.length;

				for (var i = 0; i < len; i++) {
					contexts[i].window.next(value);
				}
			}
		};

		WindowToggleSubscriber.prototype._error = function(err) {
			var contexts = this.contexts;
			this.contexts = null;

			if (contexts) {
				var len = contexts.length;
				var index = -1;

				while (++index < len) {
					var context_1 = contexts[index];
					context_1.window.error(err);
					context_1.subscription.unsubscribe();
				}
			}

			_super.prototype._error.call(this, err);
		};

		WindowToggleSubscriber.prototype._complete = function() {
			var contexts = this.contexts;
			this.contexts = null;

			if (contexts) {
				var len = contexts.length;
				var index = -1;

				while (++index < len) {
					var context_2 = contexts[index];
					context_2.window.complete();
					context_2.subscription.unsubscribe();
				}
			}

			_super.prototype._complete.call(this);
		};

		WindowToggleSubscriber.prototype._unsubscribe = function() {
			var contexts = this.contexts;
			this.contexts = null;

			if (contexts) {
				var len = contexts.length;
				var index = -1;

				while (++index < len) {
					var context_3 = contexts[index];
					context_3.window.unsubscribe();
					context_3.subscription.unsubscribe();
				}
			}
		};

		WindowToggleSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			if (outerValue === this.openings) {
				var closingSelector = this.closingSelector;
				var closingNotifier = tryCatch$2(closingSelector)(innerValue);

				if (closingNotifier === errorObject) {
					return this.error(errorObject.e);
				} else {
					var window_1 = new Subject();
					var subscription = new Subscription$1();
					var context_4 = {
						window: window_1,
						subscription: subscription
					};
					this.contexts.push(context_4);
					var innerSubscription = subscribeToResult(
						this,
						closingNotifier,
						context_4
					);

					if (innerSubscription.closed) {
						this.closeWindow(this.contexts.length - 1);
					} else {
						innerSubscription.context = context_4;
						subscription.add(innerSubscription);
					}

					this.destination.next(window_1);
				}
			} else {
				this.closeWindow(this.contexts.indexOf(outerValue));
			}
		};

		WindowToggleSubscriber.prototype.notifyError = function(err) {
			this.error(err);
		};

		WindowToggleSubscriber.prototype.notifyComplete = function(inner) {
			if (inner !== this.openSubscription) {
				this.closeWindow(this.contexts.indexOf(inner.context));
			}
		};

		WindowToggleSubscriber.prototype.closeWindow = function(index) {
			if (index === -1) {
				return;
			}

			var contexts = this.contexts;
			var context = contexts[index];
			var window = context.window,
				subscription = context.subscription;
			contexts.splice(index, 1);
			window.complete();
			subscription.unsubscribe();
		};

		return WindowToggleSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_Subject,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var WindowSubscriber$1 =
	/*@__PURE__*/
	(function(_super) {
		__extends(WindowSubscriber, _super);

		function WindowSubscriber(destination, closingSelector) {
			var _this = _super.call(this, destination) || this;

			_this.destination = destination;
			_this.closingSelector = closingSelector;

			_this.openWindow();

			return _this;
		}

		WindowSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.openWindow(innerSub);
		};

		WindowSubscriber.prototype.notifyError = function(error, innerSub) {
			this._error(error);
		};

		WindowSubscriber.prototype.notifyComplete = function(innerSub) {
			this.openWindow(innerSub);
		};

		WindowSubscriber.prototype._next = function(value) {
			this.window.next(value);
		};

		WindowSubscriber.prototype._error = function(err) {
			this.window.error(err);
			this.destination.error(err);
			this.unsubscribeClosingNotification();
		};

		WindowSubscriber.prototype._complete = function() {
			this.window.complete();
			this.destination.complete();
			this.unsubscribeClosingNotification();
		};

		WindowSubscriber.prototype.unsubscribeClosingNotification = function() {
			if (this.closingNotification) {
				this.closingNotification.unsubscribe();
			}
		};

		WindowSubscriber.prototype.openWindow = function(innerSub) {
			if (innerSub === void 0) {
				innerSub = null;
			}

			if (innerSub) {
				this.remove(innerSub);
				innerSub.unsubscribe();
			}

			var prevWindow = this.window;

			if (prevWindow) {
				prevWindow.complete();
			}

			var window = (this.window = new Subject());
			this.destination.next(window);
			var closingNotifier = tryCatch$2(this.closingSelector)();

			if (closingNotifier === errorObject) {
				var err = errorObject.e;
				this.destination.error(err);
				this.window.error(err);
			} else {
				this.add(
					(this.closingNotification = subscribeToResult(
						this,
						closingNotifier
					))
				);
			}
		};

		return WindowSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

var WithLatestFromSubscriber =
	/*@__PURE__*/
	(function(_super) {
		__extends(WithLatestFromSubscriber, _super);

		function WithLatestFromSubscriber(destination, observables, project) {
			var _this = _super.call(this, destination) || this;

			_this.observables = observables;
			_this.project = project;
			_this.toRespond = [];
			var len = observables.length;
			_this.values = new Array(len);

			for (var i = 0; i < len; i++) {
				_this.toRespond.push(i);
			}

			for (var i = 0; i < len; i++) {
				var observable = observables[i];

				_this.add(subscribeToResult(_this, observable, observable, i));
			}

			return _this;
		}

		WithLatestFromSubscriber.prototype.notifyNext = function(
			outerValue,
			innerValue,
			outerIndex,
			innerIndex,
			innerSub
		) {
			this.values[outerIndex] = innerValue;
			var toRespond = this.toRespond;

			if (toRespond.length > 0) {
				var found = toRespond.indexOf(outerIndex);

				if (found !== -1) {
					toRespond.splice(found, 1);
				}
			}
		};

		WithLatestFromSubscriber.prototype.notifyComplete = function() {};

		WithLatestFromSubscriber.prototype._next = function(value) {
			if (this.toRespond.length === 0) {
				var args = [value].concat(this.values);

				if (this.project) {
					this._tryProject(args);
				} else {
					this.destination.next(args);
				}
			}
		};

		WithLatestFromSubscriber.prototype._tryProject = function(args) {
			var result;

			try {
				result = this.project.apply(this, args);
			} catch (err) {
				this.destination.error(err);
				return;
			}

			this.destination.next(result);
		};

		return WithLatestFromSubscriber;
	})(OuterSubscriber);

/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

/** PURE_IMPORTS_START  PURE_IMPORTS_END */

var keyHasType = function keyHasType(type, key) {
	return (
		type === key || (typeof key === "function" && type === key.toString())
	);
};

var ofType = function ofType() {
	for (
		var _len = arguments.length, keys = Array(_len), _key = 0;
		_key < _len;
		_key++
	) {
		keys[_key] = arguments[_key];
	}

	return function(source) {
		return source.pipe(
			filter$1(function(_ref) {
				var type = _ref.type;
				var len = keys.length;

				if (len === 1) {
					return keyHasType(type, keys[0]);
				} else {
					for (var i = 0; i < len; i++) {
						if (keyHasType(type, keys[i])) {
							return true;
						}
					}
				}

				return false;
			})
		);
	};
};

var _createClass$1 = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}

	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();

function _classCallCheck$1(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn$1(self, call) {
	if (!self) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}

	return call && (typeof call === "object" || typeof call === "function")
		? call
		: self;
}

function _inherits$1(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError(
			"Super expression must either be null or a function, not " +
				typeof superClass
		);
	}

	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	if (superClass)
		Object.setPrototypeOf
			? Object.setPrototypeOf(subClass, superClass)
			: (subClass.__proto__ = superClass);
}
var ActionsObservable = (function(_Observable) {
	_inherits$1(ActionsObservable, _Observable);

	_createClass$1(ActionsObservable, null, [
		{
			key: "of",
			value: function of$$1() {
				return new this(of$1.apply(undefined, arguments));
			}
		},
		{
			key: "from",
			value: function from$$1(actions, scheduler) {
				return new this(from(actions, scheduler));
			}
		}
	]);

	function ActionsObservable(actionsSubject) {
		_classCallCheck$1(this, ActionsObservable);

		var _this = _possibleConstructorReturn$1(
			this,
			(
				ActionsObservable.__proto__ ||
				Object.getPrototypeOf(ActionsObservable)
			).call(this)
		);

		_this.source = actionsSubject;
		return _this;
	}

	_createClass$1(ActionsObservable, [
		{
			key: "lift",
			value: function lift(operator) {
				var observable$$1 = new ActionsObservable(this);
				observable$$1.operator = operator;
				return observable$$1;
			}
		},
		{
			key: "ofType",
			value: function ofType$$1() {
				return ofType.apply(undefined, arguments)(this);
			}
		}
	]);

	return ActionsObservable;
})(Observable);

function _classCallCheck$2(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn$2(self, call) {
	if (!self) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}

	return call && (typeof call === "object" || typeof call === "function")
		? call
		: self;
}

function _inherits$2(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError(
			"Super expression must either be null or a function, not " +
				typeof superClass
		);
	}

	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	if (superClass)
		Object.setPrototypeOf
			? Object.setPrototypeOf(subClass, superClass)
			: (subClass.__proto__ = superClass);
}
var StateObservable = (function(_Observable) {
	_inherits$2(StateObservable, _Observable);

	function StateObservable(stateSubject, initialState) {
		_classCallCheck$2(this, StateObservable);

		var _this = _possibleConstructorReturn$2(
			this,
			(
				StateObservable.__proto__ ||
				Object.getPrototypeOf(StateObservable)
			).call(this, function(subscriber) {
				var subscription = _this.__notifier.subscribe(subscriber);

				if (subscription && !subscription.closed) {
					subscriber.next(_this.value);
				}

				return subscription;
			})
		);

		_this.value = initialState;
		_this.__notifier = new Subject();
		_this.__subscription = stateSubject.subscribe(function(value) {
			// We only want to update state$ if it has actually changed since
			// redux requires reducers use immutability patterns.
			// This is basically what distinctUntilChanged() does but it's so simple
			// we don't need to pull that code in
			if (value !== _this.value) {
				_this.value = value;

				_this.__notifier.next(value);
			}
		});
		return _this;
	}

	return StateObservable;
})(Observable);

//  Ramda-extension v0.6.0
/**
 * Returns true if argument equals to 1.
 *
 * @func
 * @category Relation
 *
 * @param  {any} value
 * @return {boolean} True if `value` is 0
 *
 * @example
 *
 *        R_.equalsToZero(3)	// false
 *        R_.equalsToZero(1)	// true
 *        R_.equalsToZero(-3)	// false
 *
 * @sig a -> Boolean
 */

var equalsToZero = equals(0);
var emptyString = "";
var emptyArray = [];
var emptyObject = {};
/**
 * Testing if argument equals to ''
 *
 * @func
 * @category Relation
 *
 * @param  {any} value
 * @return {boolean} True if `value` is empty string
 *
 * @example
 *
 *        R_.equalsToEmptyString('')	// true
 *        R_.equalsToEmptyString('hi')	// false
 *
 * @sig a -> Boolean
 */

var equalsToEmptyString = equals(emptyString);
/**
 * Returns true if argument is neither null or undefined.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.isNotNil(null)		// false
 *        R_.isNotNil(undefined)	// false
 *        R_.isNotNil('')		// true
 *        R_.isNotNil(false)	// true
 *        R_.isNotNil(0)		// true
 *        R_.isNotNil([])		// true
 *        R_.isNotNil({})		// true
 *
 * @sig a -> Boolean
 */

var isNotNil = complement(isNil);
/**
 * Alias for `isNotNil`
 *
 * @deprecated
 * @func
 * @category Logic
 * @see isNotNil
 *
 * @example
 *
 *        R_.notNil(null)		// false
 *        R_.notNil(undefined)	// false
 *        R_.notNil('')		// true
 *        R_.notNil(false)	// true
 *        R_.notNil(0)		// true
 *        R_.notNil([])		// true
 *        R_.notNil({})		// true
 *
 * @sig a -> Boolean
 */

var notNil = isNotNil;
/**
 * Returns true if the given value is not its type's empty value
 *
 * @func
 * @category Logic
 *
 * @sig a -> Boolean
 *
 * @example
 *
 *        R_.isNotEmpty([1, 2, 3]);   // true
 *        R_.isNotEmpty([]);          // false
 *        R_.isNotEmpty('');          // false
 *        R_.isNotEmpty(null);        // true
 *        R_.isNotEmpty({});          // false
 *        R_.isNotEmpty({length: 0}); // true
 *
 */

var isNotEmpty = complement(isEmpty);
/* eslint-disable max-len */

/**
 * Return negation of native isNaN function.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.isNotNaN(0)            // true
 *        R_.isNotNaN('')           // true
 *        R_.isNotNaN([])           // true
 *        R_.isNotNaN(null)         // true
 *        R_.isNotNaN({})           // false
 *        R_.isNotNaN(NaN)          // false
 *        R_.isNotNaN(undefined)    // false
 *
 * @see http://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
 *
 * @sig a -> Boolean
 */

var isNotNaN = complement(isNaN);
/* eslint-enable max-len */

/**
 * Alias for `isNotNaN`.
 *
 * @deprecated [description]
 * @func
 * @category Logic
 * @see isNotNaN
 *
 * @example
 *
 *        R_.notNaN(0)            // true
 *        R_.notNaN('')           // true
 *        R_.notNaN([])           // true
 *        R_.notNaN(null)         // true
 *        R_.notNaN({})           // false
 *        R_.notNaN(NaN)          // false
 *        R_.notNaN(undefined)    // false
 *
 * @sig a -> Boolean
 */

var notNaN = isNotNaN;
/**
 * Returns true if argument is finite numeric value.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.isNumeric(-1)	// true
 *    R_.isNumeric(0)		// true
 *        R_.isNumeric(1)		// true
 *        R_.isNumeric(1.1)	// true
 *        R_.isNumeric(Infinity)	// false
 *        R_.isNumeric(NaN)	// false
 *        R_.isNumeric('')	// false
 *        R_.isNumeric(() => {})	// false
 *        R_.isNumeric(false)	// false
 *        R_.isNumeric(null)	// false
 *        R_.isNumeric(undefined)	// false
 *        R_.isNumeric({})	// false
 *        R_.isNumeric([])	// false
 *
 * @sig a -> Boolean
 *
 */

var isNumeric$1 = allPass([o(notNaN, parseFloat), isFinite]);
/**
 * Returns true if argument is not finite numeric value.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.isNotNumeric(-1)	// false
 *        R_.isNotNumeric(0)	// false
 *        R_.isNotNumeric(1)	// false
 *        R_.isNotNumeric(1.1)	// false
 *        R_.isNotNumeric(Infinity)	// true
 *        R_.isNotNumeric(NaN)	// true
 *        R_.isNotNumeric('')	// true
 *        R_.isNotNumeric(() => {})	// true
 *        R_.isNotNumeric(false)	// true
 *        R_.isNotNumeric(null)	// true
 *        R_.isNotNumeric(undefined)// true
 *        R_.isNotNumeric({})	// true
 *        R_.isNotNumeric([])	// true
 *
 * @sig a -> Boolean
 *
 */

var isNotNumeric = complement(isNumeric$1);
/**
 * Always returns null.
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R_.alwaysNull() // null
 *
 * @sig a -> Object
 */

var alwaysNull = always(null);
/**
 * Always returns empty string.
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R_.alwaysEmptyString() // ''
 *
 * @sig a -> String
 */

var alwaysEmptyString = always(emptyString);
var alwaysApply = curry(function(fn, args) {
	return function() {
		return apply(fn, args);
	};
});
/**
 * Creates a thunk out of a function. A thunk delays a calculation until
 * its result is needed, providing lazy evaluation of arguments.
 *
 * @func
 * @private
 * @example
 *
 *      R_.thunkify(R.identity)(42)(); //=> 42
 *      R_.thunkify((a, b) => a + b)(25, 17)(); //=> 42
 *
 * @sig ((a, b, ..., j) -> k) -> (a, b, ..., j) -> (() -> k)
 */

var thunkify = useWith(unapply, [alwaysApply]); // NOTE (23/06/18): `thunkify` was added to Ramda core but it's

/**
 * Returns a function that creates new instances of whatever argument
 * is passed in each time it's called.
 *
 * @func
 * @private
 * @example
 *
 *  const alwaysNewArray = alwaysNew([]);
 *  const a = alwaysNewArray();
 *  const b = alwaysNewArray();
 *  // a !== b
 *
 */

var alwaysNew = thunkify(clone);
/**
 * Always returns a new empty array.
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R_.alwaysEmptyArray() // []
 *
 * @sig a -> Array
 */

var alwaysEmptyArray = alwaysNew(emptyArray);
/**
 * Always returns zero.
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R_.alwaysZero() // 0
 *
 * @sig * -> Number
 */

var alwaysZero = always(0);
/**
 * Always returns number one.
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R_.alwaysOne() // 1
 *
 * @sig * -> Number
 */

var alwaysOne = always(1);
/**
 * Always returns a new empty object.
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R_.alwaysEmptyObject() // {}
 *
 * @sig a -> Object
 */

var alwaysEmptyObject = alwaysNew(emptyObject);
/**
 * Applies composition by a list of functions.
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R_.applyCompose([multiply(2), add(1)])(3) // 8
 *
 * @sig [(a -> b)] -> a -> b
 */

var applyCompose = apply(compose$1);
/**
 * Applies pipe by to a list of functions.
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R_.applyPipe([multiply(2), add(1)])(3) // 7
 *
 * @sig [(a -> b)] -> a -> b
 */

var applyPipe = apply(pipe);
/**
 * See if an number (`val`) is within an array of two numbers ('list').
 *
 * @func
 * @category Type
 * @param {Number} a Starting value
 * @param {Number} b Ending value
 * @param {Number} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R_.between(1, 5, 4); //=> true
 *      R_.between(3, 8, 2.1); //=> false
 *      R_.between(100.1, 102, 100.1); //=> true


 */

var between = curry(function(min$$1, max$$1, val) {
	if (val >= min$$1 && val <= max$$1) {
		return true;
	}

	return false;
});
/**
 * Returns true if argument is type of Array.
 *
 * @func
 * @category Type
 *
 * @example
 *
 *        R_.isArray([]) // true
 *        R_.isArray('') // false

 * @sig a -> Boolean
 */

var isArray$1 = is$1(Array);
/**
 * Returns true if argument is type of Function.
 *
 * @func
 * @category Type
 *
 * @example
 *
 *        R_.isFunction(() => {})	// true
 *        R_.isFunction({})	// false
 *        R_.isFunction([])	// false
 *        R_.isFunction('')	// false
 *        R_.isFunction(0)	// false
 *
 * @sig a -> Boolean
 *
 */

var isFunction$1 = is$1(Function);
/**
 * Returns true if argument is type of Object.
 *
 * @func
 * @category Type
 *
 * @example
 *
 *        R_.isObject({}) // true
 *        R_.isObject([]) // true
 *        R_.isObject('') // false

 * @sig a -> Boolean
 */

var isObject$1 = is$1(Object);
/**
 * Returns true if argument is lower than 0.
 *
 * @func
 * @category Math
 *
 * @example
 *
 *        R_.isNegative(3)	// false
 *        R_.isNegative(0)	// false
 *        R_.isNegative(-3)	// true
 *
 * @sig Number -> Boolean
 */

var isNegative = gt(0);
/**
 * Alias for `equalsToEmptyString`.
 *
 * @deprecated
 * @func
 * @category String
 * @example
 *
 *        R_.equalsEmptyString('')	// true
 *        R_.equalsEmptyString('hi')	// false
 *
 * @see equalsToEmptyString
 * @sig a -> Boolean
 */

var equalsEmptyString = equalsToEmptyString;
/**
 * Returns true if argument is null, undefined or ''.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.isNilOrEmptyString(null)	// true
 *        R_.isNilOrEmptyString(undefined)// true
 *        R_.isNilOrEmptyString('')	// true
 *        R_.isNilOrEmptyString(false)	// false
 *        R_.isNilOrEmptyString(0)	// false
 *        R_.isNilOrEmptyString([])	// false
 *        R_.isNilOrEmptyString({})	// false
 *
 * @sig a -> Boolean
 */

var isNilOrEmptyString = anyPass([isNil, equalsEmptyString]);
/**
 * Returns true if argument is not nil object.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.isNotNilObject({})		// true
 *        R_.isNotNilObject([])		// true
 *        R_.isNotNilObject(() => {})	// true
 *        R_.isNotNilObject(null)		// false
 *        R_.isNotNilObject()		// false
 *        R_.isNotNilObject(1)		// false
 *        R_.isNotNilObject("")		// false
 *
 * @sig a -> Boolean
 *
 */

var isNotNilObject = allPass([notNil, isObject$1]);
/**
 * Returns true if argument is RegExp.
 *
 * @func
 * @category Type
 *
 * @example
 *
 *     R_.isRegExp(/foo/) // true
 *     R_.isRegExp(0) // false
 *
 * @sig a -> Boolean
 *
 */

var isRegExp = is$1(RegExp);
/**
 * Returns true if argument is not RegExp.
 *
 * @func
 * @category Type
 *
 * @example
 *
 *     R_.isNotRegExp(/foo/) // false
 *     R_.isNotRegExp(0) // true
 *
 * @sig a -> Boolean
 *
 */

var isNotRegExp = complement(isRegExp);
/**
 * Returns true if argument is greater than 0.
 *
 * @func
 * @category Math
 *
 * @example
 *
 *        R_.isPositive(3)	// true
 *        R_.isPositive(0)	// false
 *        R_.isPositive(-3)	// false
 *
 * @sig Number -> Boolean
 */

var isPositive = lt(0);
/**
 * Returns true if argument is Promise.
 *
 * @func
 * @category Type
 *
 * @example
 *
 *        R_.isPromise(Promise.resolve()) // true
 *    R_.isPromise(0) // false
 *
 * @sig a -> Boolean
 *
 */

var isPromise$1 = allPass([isObject$1, o(isFunction$1, prop("then"))]);
/**
 * Returns true if argument is type of String.
 *
 * @func
 * @category Type
 *
 * @example
 *
 *        R_.isString({}) // false
 *        R_.isString([]) // false
 *        R_.isString('') // true
 *
 * @sig a -> Boolean
 */

var isString = is$1(String);
/**
 * Alias for Boolean constructor. Returns 'true' for truthy values.
 *
 * @func
 * @category Logic
 *
 * @param {any} input
 * @return {Boolean} `true` if `input` is truthy
 *
 * @example
 *
 *        R_.isTruthy(true) // true
 *        R_.isTruthy({}) // true
 *        R_.isTruthy([]) // true
 *        R_.isTruthy(1) // true
 *        R_.isTruthy("hello") // true
 *        R_.isTruthy(false) // false
 *        R_.isTruthy(0) // false
 *        R_.isTruthy("") // false
 *
 * @sig a -> Boolean
 */

var isTruthy = Boolean;
/**
 * Returns `true` for falsy values. Complement of `R_.falsy`.
 *
 * @func
 * @category Logic
 *
 * @param {any} input
 * @return {Boolean} `true` if `input` is falsy
 *
 * @example
 *
 *        R_.isFalsy(true) // false
 *        R_.isFalsy({}) // false
 *        R_.isFalsy([]) // false
 *        R_.isFalsy(1) // false
 *        R_.isFalsy("hello") // false
 *        R_.isFalsy(false) // true
 *        R_.isFalsy(0) // true
 *        R_.isFalsy("") // true
 *
 * @sig a -> Boolean
 */

var isFalsy = complement(isTruthy);
/**
 * Returns true if the argument is an instance of Error.
 *
 * @func
 * @category Type
 *
 * @example
 *
 *        R_.isError(new Error())	// true
 *        R_.isError(null)	// false
 *
 * @sig a -> Boolean
 *
 */

var isError = is$1(Error);
/**
 * Function with side-effect. Logs input to console and returns that input. Should be used only in development.
 *
 * @func
 * @category Debugging
 *
 * @example
 *
 *        R_.log('hello') // logs 'hello'
 *        compose(R_.log, R.sum)([1, 3]) // logs 4
 *
 * @sig a -> a
 *
 */

var log = tap(function(x) {
	return console.log(x);
});
/**
 * Function with side-effect. Logs input to console and returns that input.
 * Similar to "log" but allows to label logged value. Should be used only in development.
 *
 * @func
 * @category Debugging
 *
 * @sig a -> b -> b
 *
 * @example
 *
 *        compose(calculation2, R_.trace('Page A'), calculation1); // logs "Page A" and result of calculation1
 *
 */

var trace = useWith(tap, [curryN(2, console.log), identity]);
/**
 * Call function passed as first argument with arguments determined by second parameter in order.
 *
 * @func
 * @category Function
 *
 * @sig (a → ... → b) → [a, ..., b] → c
 *
 * @example
 *
 *        const f = (a) => (b) => a + b
 *
 *        R_.reduceCallable(f, [1, 2]) // 3
 *
 */

var reduceCallable = reduce(call);
/**
 * Takes first argument from the arguments
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R_.headArg('a', 'b', 'c') // a
 *
 *
 */

var headArg = nthArg(0);
/**
 * Extends the reduce functionality by adding the original accumulator value
 * as a third argument and the original list as a fourth argument to the
 * iterator function.
 *
 * @func
 * @category List
 *
 * @param {Function} fn The iterator function. Receives four arguments, the
 *        accumulator, the current element, the source accumulator and the
 *        source list.
 * @param {*} acc The initial accumulator value and value passed as the source
 *        accumulator value in the iterator function.
 * @param {Array} list The list to iterator over and value passed as the source
 *        list in the iterator function.
 * @return {*} The reduced result.
 *
 * @example
 *        R_.reduceSource((acc, v, sAcc) => v + acc + sAcc, 1, [1, 2, 3]); // 10
 *        R_.reduceSource(R.pipe(R.unapply(R.flatten), R.sum), 0, [1, 2]); // 9
 *
 * @sig ((a, b, a, [b]) -> a) -> a -> [b] -> a
 */

var reduceSource = converge(reduce, [
	converge(partialRight, [
		headArg, // iteratorFn
		unapply(tail)
	]),
	nthArg(1), // accumulator
	nthArg(2)
]);
/**
 * Returns first not nil value
 *
 * @func
 * @category List
 *
 * @example
 *
 *        R_.findNotNil([null, undefined, 0, true]) // 0
 *
 * @sig [a] -> a
 *
 */

var findNotNil = find(notNil);
/**
 * Creates pairs from value and list of values.
 * Value is always prepended to the pair.
 *
 * @func
 * @category List
 * @see xPairsRight
 *
 * @example
 *
 *        R_.xPairs(1, [2, 3]) // [[1, 2], [1, 3]]
 *
 * @sig a -> [b] -> [[a, b]]
 */

var xPairs = useWith(xprod, [of, identity]);
var getPredicates = compose$1(map(juxt([applyCompose, last])), xPairs);
/**
 * Returns first result from evaluation of functions in the list, that satisfies predicate.
 * Returns `undefined` otherwise.
 *
 * @func
 * @category Function
 * @see dispatch
 *
 * @param {function} predicate Predicate that is applied to result of calling fn from `listFns` with `values`
 * @param {array} listFns List of functions
 * @param {*} values Values applied to functions from `listFns`
 * @return {any} Returns first result of calling fn from `listFns` with `values` that satisfies `predicate`.
 *
 * @example
 *
 *        const firstTruthy = R_.dispatchWith(Boolean)([
 *           prop("foo"),
 *           prop("bar"),
 *        ])
 *
 *        firstTruthy({foo: "foo", bar: false}) // "foo"
 *        firstTruthy({foo: false, bar: "bar" }) // "bar"
 *
 * @sig [a] -> b|undefined
 */

var dispatchWith = converge(call(cond), [getPredicates]);
/**
 * Returns first not nil result from evaluation of functions in the list.
 * Returns `undefined` otherwise.
 *
 * @func
 * @category Function
 * @see dispatchWith
 *
 * @param {array} listFns List of functions
 * @param {*} values Values applied to functions from `listFns`
 * @return {any} Returns first not nil result of calling fn from `listFns` with `values`.
 *
 * @example
 *
 *        const validateName = R_.dispatch([
 *           ifElse(Boolean, R_.noop, always('Name is required.')),
 *           ifElse(R_.isString, R_.noop, always('Name must be valid.')),
 *        ]);
 *
 *        validateName("") // 'Name is required.'
 *        validateName(111) // 'Name must be valid.'
 *        validateName("Valid name") // undefined
 *
 * @sig [a] -> b|undefined
 */

var dispatch$8 = dispatchWith(notNil);
/**
 * Constructs RegExp.
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        test(R_.constructRegExp('end$', 'gi'), 'in the end') // true
 *
 */

var constructRegExp = constructN(2, RegExp);
var getRegExp_ = useWith(flip(constructRegExp)("gi"), [concat("^")]);
/**
 * Testing string if starts with some prefix.
 *
 * @func
 * @category String
 *
 * @param  {string} prefix
 * @param  {string} x
 * @return {boolean} True if `x` starts with `prefix`
 *
 * @example
 *
 *        R_.startsWithPrefix('h', 'hello')	// true
 *        R_.startsWithPrefix('hell', 'hello')	// true
 *        R_.startsWithPrefix('h', 'good bye')	// false
 *
 * @sig a -> b -> Boolean
 */

var startsWithPrefix = useWith(test, [getRegExp_, identity]);
/**
 * Testing string if starts with some prefix ignoring case.
 *
 * @func
 * @category String
 *
 * @param  {string} prefix
 * @param  {string} x
 * @return {boolean} True if `x` starts with `prefix` ignore case
 *
 * @example
 *
 *        R_.startsWithPrefixIgnoreCase('h', 'HELLO')	// true
 *        R_.startsWithPrefixIgnoreCase('HELL', 'hello')	// true
 *        R_.startsWithPrefixIgnoreCase('hello', 'hello')	// true
 *        R_.startsWithPrefixIgnoreCase('h', 'good bye')	// false
 *
 * @sig a -> b -> Boolean
 */

var startsWithPrefixIgnoreCase = useWith(startsWith, [toUpper, toUpper]);
var getRegExp_$1 = useWith(flip(constructRegExp)("gi"), [flip(concat)("$")]);
/**
 * Testing string if ends with some suffix.
 *
 * @func
 * @category String
 *
 * @param  {string} suffix
 * @param  {string} x
 * @return {boolean}          True if `x` ends with `suffix`
 *
 * @example
 *
 *        R_.endsWithSuffix('o', 'hello')		// true
 *        R_.endsWithSuffix('ello', 'hello')	// true
 *        R_.endsWithSuffix('y', 'good bye')	// false
 *
 * @sig a -> b -> Boolean
 */

var endsWithSuffix = useWith(test, [getRegExp_$1, identity]);
/**
 * Testing string if ends with some suffix ignoring case.
 *
 * @func
 * @category String
 *
 * @param  {string} suffix
 * @param  {string} x
 * @return {boolean} True if `x` ends with `suffix` ignore case
 *
 * @example
 *
 *        R_.endsWithSuffixIgnoreCase('o', 'HELLO')	// true
 *        R_.endsWithSuffixIgnoreCase('ELLO', 'hello')	// true
 *        R_.endsWithSuffixIgnoreCase('hello', 'hello')	// true
 *        R_.endsWithSuffixIgnoreCase('o', 'good bye')	// false
 *
 * @sig a -> b -> Boolean
 */

var endsWithSuffixIgnoreCase = useWith(endsWith, [toUpper, toUpper]);
/**
 * Converts arguments to list.
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R.compose(R.sum, R_.argumentsToList)(1, 2, 3) // 6
 *
 * @sig (a, b, c, ...) → ([a, b, c, ...])
 */

var argumentsToList = unapply(identity);
/**
 * Resolves to true if all elements in first list are found within the second list
 *
 * @func
 * @category List
 *
 *
 * @param {Array} List
 * @param {Array} List
 * @return {Boolean} If all items from first array are in the second array.
 *
 * @example
 *
 *    R_.containsAll(['a', 'b'], ['a', 'b', 'c']) // true
 *    R_.containsAll(['a', 'b', 'd'], ['a', 'b', 'c']) // false
 *
 * @sig [a] -> [a] -> Boolean
 *
 */

var containsAll = curry(compose$1(isEmpty, difference));
/**
 * Returns `true` if any of the items from first array are in the second array.
 *
 * @func
 * @category List
 *
 * @param {Array} List
 * @param {Array} List
 * @return {Boolean} If any of the items from first array are in the second array.
 *
 * @example
 *
 *    R_.containsAny(['a', 'e'], ['a', 'b', 'c']) // true
 *    R_.containsAny(['e', 'f'], ['a', 'b', 'c']) // false
 *
 * @sig [a] -> [a] -> Boolean
 *
 */

var containsAny = curry(compose$1(not, isEmpty, intersection));
/**
 * Returns `true` if any of the items from first array is not the second array.
 *
 * @func
 * @category List
 *
 * @param {Array} List
 * @param {Array} List
 * @return {Boolean} If any of the items from first array is not in the second array.
 *
 * @example
 *
 *    R_.containsNone(['e', 'f'], ['a', 'b', 'c']) // true
 *    R_.containsNone(['a', 'f'], ['a', 'b', 'c']) // false
 *
 * @sig [a] -> [a] -> Boolean
 */

var containsNone = curry(compose$1(isEmpty, intersection));
/**
 * Splits string by dot into list.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.splitByDot('a.b.c') // ['a', 'b', 'c']
 *
 * @sig String -> [String]
 */

var splitByDot = split(".");
/**
 * Unfolds input object by dot delimetered path inside its keys.
 *
 * @func
 * @category Object
 *
 * @example
 *
 *        R_.unfoldObjectDots({'a.b.c': 1, 'd.e.f': 2, 'g': 3})
 *        // {a: {b: {c: 1}}, d: {e: {f: 2}}, g: 3}
 *
 * @sig Object -> Object
 */

var unfoldObjectDots = o(
	o(mergeAll, values),
	mapObjIndexed(
		useWith(flip(call), [
			identity,
			compose$1(applyCompose, map(objOf), splitByDot)
		])
	)
);
/**
 * Capitalize first letter.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.toUpperFirst('hello world') // 'Hello world'
 *
 * @sig String -> String
 */

var toUpperFirst = o(join(""), adjust(toUpper, 0));
/**
 * Decapitalize first letter.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.toLowerFirst('HELLO WORLD') // 'hELLO WORLD'
 *
 * @sig String -> String
 */

var toLowerFirst = o(join(""), adjust(toLower, 0));
/**
 * @private
 */

var nonAlphaNumericRegExp = constructRegExp("[^a-zA-Z0-9]+", "g");
/**
 * Splits string into list. Delimiter is every sequence of non-alphanumerical values.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.splitByNonAlphaNumeric('Hello    world/1'); // ['Hello', 'world', '1']
 *
 * @sig String -> [String]
 *
 */

var splitByNonAlphaNumeric = o(
	reject(equals(emptyString)),
	split(nonAlphaNumericRegExp)
);
/**
 * Converts list of strings to string.
 *
 * @func
 * @category List
 *
 * @example
 *
 *        R_.listToString(['h', 'e', 'l', 'l', 'o']) // 'hello'
 *
 * @sig [String] -> String
 *
 */

var listToString = join(emptyString);
/**
 * Converts string into PascalCase.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.toPascalCase('hello-world')		// 'HelloWorld'
 *        R_.toPascalCase('hello- world')		// 'HelloWorld'
 *        R_.toPascalCase('  hello-/ world/ ')	// 'HelloWorld'
 *
 * @sig String -> String
 */

var toPascalCase = o(
	listToString,
	o(map(toUpperFirst), splitByNonAlphaNumeric)
);
/**
 * Converts string into camelCase.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.toCamelCase('hello-world')		// 'helloWorld'
 *        R_.toCamelCase('hello- world')		// 'helloWorld'
 *        R_.toCamelCase('  hello-/ world/ ')	// 'helloWorld'
 *
 * @sig String -> String
 *
 */

var toCamelCase = o(toLowerFirst, toPascalCase);
/**
 * Joins array of string with underscore determiner.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.joinWithUnderscore(['a', 'b', 'c']) // 'a_b_c'
 *
 * @sig [String] -> String
 */

var joinWithUnderscore = join("_");
/**
 * Converts string into snake_case.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.toSnakeCase('hello-world')		// 'hello_world'
 *        R_.toSnakeCase('hello- world')		// 'hello_world'
 *        R_.toSnakeCase('  hello-/ world/ ')	// 'hello_world'
 *
 * @sig String -> String
 */

var toSnakeCase = o(
	joinWithUnderscore,
	o(map(toLower), splitByNonAlphaNumeric)
);
/**
 * Joins array of string with dash (hyphen) determiner.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.joinWithDash(['a', 'b', 'c']) // 'a-b-c'
 *
 * @sig [String] -> String
 */

var joinWithDash = join("-");
/**
 * Converts string into kebab-case.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.toKebabCase('hello-world')		// 'hello-world'
 *        R_.toKebabCase('hello- world')		// 'hello-world'
 *        R_.toKebabCase('  hello-/ world/ ')	// 'hello-world'
 *
 * @sig String -> String
 */

var toKebabCase = o(joinWithDash, o(map(toLower), splitByNonAlphaNumeric));
/**
 * Joins array of string with dot determiner.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.joinWithDot(['a', 'b', 'c']) // 'a.b.c'
 *
 * @sig [String] -> String
 */

var joinWithDot = join(".");
/**
 * Converts string into dot.case.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.toDotCase('hello-world')		// 'hello.world'
 *        R_.toDotCase('hello/*? world')		// 'hello.world'
 *        R_.toDotCase('  hello -/ world/ ')	// 'hello.world'
 *
 * @sig String -> String
 */

var toDotCase = o(joinWithDot, o(map(toLower), splitByNonAlphaNumeric));
/**
 * Converts string into SCREAMING_SNAKE_CASE.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.toScreamingSnakeCase('hello-world')		// 'HELLO_WORLD'
 *        R_.toScreamingSnakeCase('hello- world')		// 'HELLO_WORLD'
 *        R_.toScreamingSnakeCase('  hello-/ world/ ')	// 'HELLO_WORLD'
 *
 * @sig String -> String
 */

var toScreamingSnakeCase = o(
	joinWithUnderscore,
	o(map(toUpper), splitByNonAlphaNumeric)
);
/**
 * Filters out every nil value in a list.
 *
 * @func
 * @category List
 *
 * @example
 *
 *        R_.rejectNil([null, undefined, '']); // ['']
 *
 * @sig [a] -> [a]
 *
 */

var rejectNil = reject(isNil);
/**
 * Filters out every value in a list that equals to first argument.
 *
 * @func
 * @category List
 *
 * @example
 *
 * 		R_.rejectEq('foo', ['foo', 'bar', 'foo', 'bar']); // ['bar', 'bar']
 *
 * @sig a -> [b] -> [c]
 *
 */

var rejectEq = useWith(reject, [equals, identity]);
/**
 * Joins array of string with space determiner.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.joinWithSpace(['a', 'b', 'c']) // 'a b c'
 *
 * @sig [String] -> String
 */

var joinWithSpace = join(" ");
/**
 * Returns an over lens to the first index of list.
 *
 * @func
 * @category List
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R_.overHead(R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 *
 */

var overHead = over(lensIndex(0));
/**
 * Makes a shallow clone of an object, omitting the property at the given dot path.
 * Note that this copies and flattens
 * prototype properties onto the new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @category Object
 *
 * @param {String} path The dot path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @example
 *
 *      R_.dissocDotPath('a.b.c', {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */

var dissocDotPath = curryN(
	2,
	compose$1(apply(dissocPath), overHead(splitByDot), argumentsToList)
);
/**
 * Retrieve the value at a given dot path.
 *
 * @func
 * @category Object
 * @param {String} path The dot path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 *
 * @example
 *
 *      R_.dotPath('a.b', {a: {b: 2}}); //=> 2
 *      R_.dotPath('a.b', {c: {b: 2}}); //=> undefined
 *
 */

var dotPath = useWith(path, [splitByDot, identity]);
/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path.
 *
 * @func
 * @category Object
 * @param {String} path the dot path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @example
 *
 *      R_.assocDotPath('a.b.c', 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R_.assocDotPath('a.b.c', 42, {a: 5}); //=> {a: {b: {c: 42}}}
 *
 * @sig String -> a -> b
 */

var assocDotPath = curryN(
	2,
	compose$1(apply(assocPath), overHead(splitByDot), argumentsToList)
);
/**
 * Takes first argument from the arguments
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        R_.lastArg('a', 'b', 'c') // c
 *
 *
 */

var lastArg = nthArg(-1);
/**
 * Merge data in object using custom merge fn.
 *
 * @func
 * @category Object
 *
 * @param {String} path The dot path to the value
 * @param {Function} mergeFn The merging function
 * @param {*} value Value to merge
 * @param {Object} obj The object to clone
 * @return {Object} A new object with merge data
 * @example
 *
 *      R_.mergeWithDotPath('a.b', R.merge, { d: 30 }, {a: {b: { c: 20 }}}); //=> {a: {b: { c: 20, d: 30 }}}
 */

var resolveDotPath = converge(dotPath, [headArg, lastArg]);
var performMerge = converge(call, [nthArg(1), resolveDotPath, nthArg(2)]);
var mergeWithDotPath = converge(assocDotPath, [headArg, performMerge, lastArg]);
/**
 * Always returns null.
 *
 * @func
 * @category Object
 *
 * @example
 *
 *        R_.mapKeysAndValues(([a, b]) => [b, a], { foo: "bar", baz: "boo" })
 *        // { bar: "foo", boo: "baz" }
 *
 * @sig ([a] -> [b]) -> Object -> Object
 */

var mapKeysAndValues = useWith(compose$1(fromPairs, map), [identity, toPairs]);
/**
 * Use map function over the keys of the given object
 *
 * @func
 * @category Object
 * @param {Function} fn The function to be called on every key of the input object.
 * @param {Array} obj The object to be iterated over.
 * @return {Array} The new object with mapped keys.
 *
 * @example
 *
 *      R_.mapKeys(R_.toUpperFirst, {x: 1, y: 2, z: 3}); //=> {X: 2, Y: 4, Z: 6}
 *
 */

var mapKeys = useWith(mapKeysAndValues, [overHead, identity]);
/**
 * Call apply on function if the function is defined. Otherwise do nothing and return null.
 *
 * @func
 * @category Function
 *
 * @param {Function} fn The function which will be called with `args` when defined
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)` or null
 * @example
 *
 *        const nums = [1, 2, 3];
 *        R_.applyIfNotNil(R.sum, nums) // 6
 *        R_.applyIfNotNil(undefined, nums) // null
 *
 * @sig (*... -> a) -> [*] -> a
 */

var applyIfNotNil = ifElse(notNil, apply, alwaysNull);
/**
 * @private
 */

var compareLength = useWith(__, [identity, length]);
/**
 * Returns true if length of array equals first argument
 *
 * @func
 * @category List
 *
 * @example
 *
 *        const lengthEqualsOne = R_.equalsLength(1)
 *        lengthEqualsOne([{}])	// true
 *        lengthEqualsOne([])	// false
 *
 * @sig Number -> [a] -> Boolean
 */

var equalsLength = compareLength(equals);
/**
 * Testing string if equals ignoring case.
 *
 * @func
 * @category String
 *
 * @param  {string} x
 * @param  {string} y
 * @return {boolean} True if `x` equals `y` ignore case
 *
 * @example
 *
 *        R_.equalsStringIgnoreCase('hello', 'HELLO')	// true
 *        R_.equalsStringIgnoreCase('HELLO', 'hello')	// true
 *        R_.equalsStringIgnoreCase('hello', 'hello')	// true
 *        R_.equalsStringIgnoreCase('hello', 'good bye')	// false
 *
 * @sig a -> b -> Boolean
 */

var equalsStringIgnoreCase = useWith(equals, [toLower, toLower]);
/**
 * Returns true if length of array is smaller or equals than first argument
 *
 * @func
 * @category List
 *
 * @example
 *
 *        const lengthSmallerThanEqualsOne = R_.gteThanLength(1)
 *        lengthSmallerThanEqualsTwo([{},{}])	// false
 *        lengthSmallerThanEqualsTwo([{}])	// true
 *        lengthSmallerThanEqualsTwo([])		// true
 *
 * @sig Number -> [a] -> Boolean
 */

var gteThanLength = compareLength(gte);
/**
 * Returns true if length of array is smaller than first argument
 *
 * @func
 * @category List
 *
 * @example
 *
 *        const lengthSmallerThanTwo = R_.gtThanLength(2)
 *        lengthSmallerThanTwo([{}])	// true
 *        lengthSmallerThanTwo([{},{}])	// false
 *
 * @sig Number -> [a] -> Boolean
 */

var gtThanLength = compareLength(gt);
/**
 * Returns true if length of array is bigger or equals than first argument
 *
 * @func
 * @category List
 *
 * @example
 *
 *        const lengthBiggerThanEqualsOne = R_.lteThanLength(1)
 *        lengthBiggerThanEqualsOne([{},{}])	// true
 *        lengthBiggerThanEqualsOne([{}])		// true
 *        lengthBiggerThanEqualsOne([])		// false
 *
 * @sig Number -> [a] -> Boolean
 */

var lteThanLength = compareLength(lte);
/**
 * Returns true if length of array is bigger than first argument
 *
 * @func
 * @category List
 *
 * @example
 *
 *        const lengthBiggerThanZero = R_.ltThanLength(0)
 *        lengthBiggerThanZero([{}])	// true
 *        lengthBiggerThanZero([])	// false
 *
 * @sig Number -> [a] -> Boolean
 */

var ltThanLength = compareLength(lt);
/**
 * Applies custom view function on the given lens
 *
 * @func
 * @category Object
 * @param {Lens} lens
 * @param {*} v view function
 * @param {*} x
 * @return {*}
 * @example
 *
 * 		R_.viewWith(R.lensIndex(0), R.pathEq(['foo'], 'boo'), [{ foo: 'boo' }]); //=> true
 *   	R_.viewWith(R.lensIndex(0), R.divide(R.__, 2), [4]) //=> 2
 *
 */

var viewWith = useWith(flip(o), [view, identity, identity]);
/**
 * Returns true if the given lens equals to given value
 *
 * @func
 * @category Object
 * @param {Lens} lens
 * @param {*} v value to equal
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R_.viewEq(R.lensIndex(0), 'foo', ['foo', 'bar', 'baz']); //=> true
 */

var viewEq = useWith(viewWith, [identity, equals, identity]);
/**
 * Applies flatten on array of arguments
 *
 * @func
 * @category List
 *
 * @return {Array} flatten array
 *
 * @example
 *
 *    R_.flattenArgs('e', 'f', 'a')		// ['e', 'f', 'a']
 *        R_.flattenArgs('e', ['f', 'a'])		// ['e', 'f', 'a']
 *        R_.flattenArgs('e', ['f', ['a']])	// ['e', 'f', 'a']
 *
 * @sig (a, [b, c]...) -> [a, b, c]
 */

var flattenArgs = compose$1(flatten, argumentsToList);
/**
 * Returns true if value is type of Number.
 *
 * @func
 * @category Type
 *
 * @param {any} x Value to test
 * @return {any} True, if value is type of Number
 *
 * @example
 *
 *        R_.isNumber(NaN) // true
 *        R_.isNumber(Infinite) // true
 *        R_.isNumber(1) // true
 *        R_.isNumber(false) // false
 *        R_.isNumber({}) // false
 *        R_.isNumber("1") // false
 *
 * @sig a -> Boolean
 */

var isNumber = is$1(Number);
var filterFalsy = filter(identity);
var keepObjectStringNumber = filter(anyPass([isObject$1, isString, isNumber]));
var keepKeyIfValueIsTruthy = mapObjIndexed(function(v, k) {
	return v && k;
});
var destructObject = compose$1(filterFalsy, values, keepKeyIfValueIsTruthy);
var transduceArgs = into(
	[],
	compose$1(
		map(when(isObject$1, destructObject)),
		keepObjectStringNumber,
		filterFalsy
	)
);
/**
 * Conditionally joining classNames together.
 *
 * The cx function takes any number of arguments which can be a string, object
 * even nested arrays of strings and objects.
 *
 * The argument 'foo' is short for { foo: true }.
 *
 * If the value associated with a given key is falsy, that key won't be included in the output.
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.cx('Table', ['MagicTable'], {'Table--active': true })	// 'Table MagicTable Table--active'
 *        R_.cx('Table', ['MagicTable'], {'Table--active': false })	// 'Table MagicTable'
 *        R_.cx(['Table', ['MagicTable']])				// 'Table MagicTable'
 *
 * @sig String | [String] | Object -> String
 */

var cx = compose$1(joinWithSpace, flatten, transduceArgs, flattenArgs);
/**
 * Returns true if property of object literal does not equals the given value.
 *
 * @func
 * @category Relation
 *
 * @example
 *
 *        R_.propNotEq('a', 1, { a: 1 })	// false
 *        R_.propNotEq('a', 1, { a: 2 })	// true
 *        R_.propNotEq('a', 1, {})	// true
 *
 * @sig String → a → Object → Boolean
 */

var propNotEq = complement(propEq);
/**
 * Returns true if nested path of object literal does not contains given value.
 *
 * @func
 * @category Relation
 *
 * @example
 *
 *        R_.pathNotEq(['a', 'b'], 1, { a: { b: 1 } })	// false
 *        R_.pathNotEq(['a', 'b'], 1, { a: { b: 2 } })	// true
 *        R_.pathNotEq(['a', 'b'], 1, {}) 		// true
 *        R_.pathNotEq(['a', 'b'], 1, { a: {} }) 		// true
 *
 * @sig [String | Int] → a → {a} → Boolean
 */

var pathNotEq = complement(pathEq);
/**
 * Creates list of length `n`. Every item in list equals to `input` parameter.
 *
 * @param {Number} n How many times replicate `input`
 * @param {a} input Value for replication
 *
 * @return List List of length `n`. Every item in list equals to `input` parameter
 *
 * @func
 * @category List
 *
 * @example
 *
 *        R_.replicate(1, 6) // [6]
 *        R_.replicate(2, 6) // [6, 6]
 *        R_.replicate(3, 6) // [6, 6, 6]
 *
 * @sig Number -> a -> [a]
 */

var replicate = flip(repeat);
/**
 * Creates pair. Every item of pair equals to input parameter.
 *
 * @param {a} input Value for duplication
 *
 * @return List Pair in which every item equals to `input` parameter
 *
 * @func
 * @category List
 *
 * @example
 *
 *        R_.duplicate(1) // [1, 1]
 *
 * @sig a -> [a]
 */

var duplicate = replicate(2);
/**
 * Copies keys of object to appropriate values.
 *
 * @func
 * @category Object
 *
 *
 * @param {Object} Object where should be keys copied as values.
 *
 * @return {Object}
 *
 * @example
 *
 *    const actionTypes = R_.keyMirror({
 *        ITEM_REQUEST: null,
 *        ITEM_SUCCESS: null,
 *        ITEM_ERROR: null,
 *    });
 *
 *    const action = { type: actionTypes.ITEM_REQUEST };
 *
 *    action.type === actionTypes.ITEM_REQUEST // true
 *
 *
 * @sig Object -> Object
 *
 */

var keyMirror = mapObjIndexed(nthArg(1));
/**
 * Creates object mirror from list of keys.
 *
 * @func
 * @category Object
 *
 *
 * @param {Array} keyList List of values representing the keys and values of resulting object.
 *
 * @return {Object} Object, where keys and appropriate values equals to value in `keyList`.
 *
 * @example
 *
 *    const actionTypes = R_.valueMirror([
 *        'ITEM_REQUEST',
 *        'ITEM_SUCCESS',
 *        'ITEM_ERROR',
 *    ]);
 *
 *        const action = { type: actionTypes.ITEM_REQUEST };
 *
 *        action.type === actionTypes.ITEM_REQUEST // true
 *        actionTypes.ITEM_SUCCESS // "ITEM_SUCCESS"
 *
 * @sig [String] -> Object
 *
 */

var valueMirror = o(fromPairs, map(duplicate));
var wrapMapping = compose$1(juxt, flip(prepend)([last]), apply);
/**
 * Map object keys. Mapping functions have both key and value as arguments.
 *
 * @func
 * @category Object
 *
 * @example
 *
 *      R_.mapKeysWithValue((key, value) => value)({ foo: "bar" }) // { bar: "bar" }
 *
 * @sig ((String, a) -> b) -> Object -> Object
 */

var mapKeysWithValue = useWith(mapKeysAndValues, [wrapMapping, identity]); // prettier-ignore

var camelizeObj = mapKeysAndValues(
	juxt([
		o(toCamelCase, head),
		o(function(x) {
			return camelizeKeys(x);
		}, last)
	])
);
var camelizeArray = map(function(x) {
	return camelizeKeys(x);
});
/**
 * Recursively camelize all keys within an object or array
 *
 * @func
 * @category Object
 *
 * @param {any} x Object to transform
 * @return {any}
 * @example
 *
 *      camelizeKeys({
 *          'co-obj': { co_string: 'foo' },
 *          'co-array': [0, null, { 'f-f': 'ff' }],
 *          'co-number': 1,
 *          'co-string': '1',
 *          'co-fn': head,
 *      });
 *
 *      // {
 *      //     coArray: [
 *      //         0,
 *      //         null,
 *      //         {
 *      //             fF: 'ff'
 *      //         }
 *      //     ],
 *      //     coFn: [Function],
 *      //     coNumber: 1,
 *      //     coObj: {
 *      //         coString: 'foo'
 *      //     },
 *      //     coString: '1'
 *      // }
 *
 */
// prettier-ignore

var camelizeKeys = cond([[isArray$1, camelizeArray], [isFunction$1, identity], [isNotNilObject, camelizeObj], [T, identity]]);
/**
 * Returns `true` if if `list` includes `item`.
 *
 * @func
 * @category List
 *
 * @param {Array} list
 * @param {any} item
 * @return {Boolean} Returns `true` if `list` includes `item`.
 *
 * @example
 *
 *    R_.includes(['e', 'f'], 'e') // true
 *    R_.includes(['a', 'f'], 'a') // false
 *
 * @sig [a] -> b -> Boolean
 */

var includes = flip(contains$1);
/**
 * Returns `false` if any of the items from `list` includes `item`.
 *
 * @func
 * @category List
 *
 * @param {Array} list
 * @param {any} item
 * @return {Boolean} Returns `false` if `list` includes `item`.
 *
 * @example
 *
 *    R_.notInclude(['e', 'f'], 'e') // false
 *    R_.notInclude(['a', 'f'], 'a') // true
 *
 * @sig [a] -> b -> Boolean
 */

var notInclude = complement(includes);
/**
 * Creates curried pipe. The leftmost function determines the arity of curry.
 *
 * @func
 * @category Function
 *
 * @example
 *
 * const appendAndRejectNil = R_.pipeC(R.append, R.rejectNil);
 * const appendCAndRejectNil = appendAndRejectNil('c');
 * appendCAndRejectNil(['a', null]) // ['a', 'c'];
 *
 */

var pipeC = converge(curry, [pipe]);
/**
 * Creates curried compose. The rightmost function determines the arity of curry.
 *
 * @func
 * @category Function
 *
 * @example
 *
 * const appendAndRejectNil = R_.composeC(R.rejectNil, R.append);
 * const appendCAndRejectNil = appendAndRejectNil('c');
 * appendCAndRejectNil(['a', null]) // ['a', 'c'];
 *
 */

var composeC = converge(curry, [compose$1]);
/**
 * Takes a predicate, string `padString` and initial value. `padString` is contacted to the output string
 * everytime `pred` returns falsy value.
 *
 * @param {fn} pred Called after every contactation of `padString`
 * @param {string} padString String that is added everytime the `pred` returns falsy value
 * @param {string} init Intitial value
 *
 * @return String
 * @see padLeft, padRight, padRightUntil
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.padLeftUntil((x) => x.length === 10, '0')('1') // '0000000001'
 *
 * @sig (a -> Boolean) -> a -> a
 */

var padLeftUntil = useWith(until, [identity, concat, identity]);
/**
 * Length of the output string, `padString` and initial value.
 * `padString` is repeatedly concated to `init` until the length of the string is equal to `lengthString`.
 *
 * @param {number} lengthString Length of the output string.
 * @param {string} padString
 * @param {string} init Intitial value
 * @see padRight, padLeftUntil, padRightUntil
 *
 * @return String
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.padLeft(10, '0')('1') // '00000000001'
 *        R_.padLeft(-9, '0')('1') // '1'
 *        R_.padLeft(1, '0')('1') // '1'
 *
 * @sig Number -> a -> a
 */

var padLeft = useWith(padLeftUntil, [lteThanLength, identity, identity]);
/**
 * Takes a predicate, string `padString` and initial value. `padString` is append to the output string
 * everytime `pred` returns falsy value.
 *
 * @param {fn} pred Called after every append of `padString`.
 * @param {string} padString String that is added everytime the `pred` returns falsy value
 * @param {string} init Intitial value
 *
 * @return String
 * @see padLeft, padRight, padLeftUntil
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.padRightUntil((x) => x.length === 10, '0')('1') // '1000000000'
 *
 * @sig (a -> Boolean) -> a -> a
 */

var padRightUntil = useWith(until, [identity, flip(concat), identity]);
/**
 * Length of the output string, `padString` and initial value.
 * `padString` is repeatedly appended to the `init` until the length of the string is equal to `lengthString`.
 *
 * @param {number} lengthString Length of the output string.
 * @param {string} padString
 * @param {string} init Intitial value
 * @see padLeft, padRightUntil, padRightUntil
 *
 * @return String
 *
 * @func
 * @category String
 *
 * @example
 *
 *        R_.padRight(10, '0')('1') // '10000000000'
 *        R_.padRight(-9, '0')('1') // '1'
 *        R_.padRight(1, '0')('1') // '1'
 *
 * @sig Number -> a -> a
 */

var padRight = useWith(padRightUntil, [lteThanLength, identity, identity]);
/**
 * Creates pairs from value and list of values.
 * Value is always appended as the last item to the pair.
 *
 * @func
 * @category List
 * @see xPairs
 *
 * @example
 *
 *        R_.xPairsRight(1, [2, 3]) // [[2, 1], [3, 1]]
 *
 * @sig a -> [b] -> [[b, a]]
 */

var xPairsRight = useWith(flip(xprod), [of, identity]);
/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument will not result in an additional
 * call to `fn`; instead, the cached result for that argument will be returned
 *
 * @func
 * @category Function
 *
 * @example
 *
 *        let count = 0;
 *        const factorial = R_.memoizeWithIdentity(n => {
 *          count += 1;
 *          return R.product(R.range(1, n + 1));
 *        });
 *        factorial(5); // 120
 *        factorial(5); // 120
 *        factorial(5); // 120
 *        count; // 1
 *
 */

var memoizeWithIdentity = memoizeWith(identity);
/**
 * Firstly applies transformation on input data structure according to provided "lens".
 * Returning value is made by the "setting" the portion
 * of the result focused by the given `lens`.
 *
 * @func
 * @category Object
 *
 *
 * @param {Object} lens Lens
 * @param {function} tranformation Transformation function
 * @param {any} input
 * @returns {Object} Firstly applies transformation on `input` according to `lens` (`R.over`)
 * and than returning value is made by the "setting" (`R.set`) the portion
 * of previous result focused by the given `lens`.
 *
 * @example
 *
 *        R_.objOfOver(
 *          R.lensPath(['a', 'b']),
 *          (x) => "Hello " + x,
 *          {
 *            a: { b: 'foo' },
 *            c: 'bar',
 *          }
 *        )
 *        // { a: { b: "Hello foo" } }
 *
 */

var objOfOver = converge(set, [headArg, viewWith, alwaysEmptyObject]);
/**
 * Returns deeply merged object by merging all objects in a passed list. Merging is applied from the left.
 * See mergeDeepLeft from Ramda.
 *
 * @func
 * @category Object
 * @see mergeDeepLeftAll, mergeDeepAllWith, mergeDeepAllWithKey
 *
 * @param {array} list Array of objects
 * @returns {object} Merged object
 *
 * @example
 *
 * 		const a = { fooA: { bar: 'a' }, shared: { baz: 1 } };
 * 		const b = { fooB: { bar: 'b' }, shared: { baz: 2 } };
 * 		const c = { fooC: { bar: 'c' }, shared: { baz: 3 } };
 *
 * 		R_.mergeDeepLeftAll([a, b, c])
 * 		// {
 * 	 	// 	fooA: { bar: 'a' },
 * 		// 	fooB: { bar: 'b' },
 * 		// 	fooC: { bar: 'c' },
 * 		// 	shared: { baz: 1 },
 * 		// }
 *
 * @sig [{a}] -> {a}
 */

var mergeDeepLeftAll = reduce(mergeDeepLeft, {});
/**
 * Returns deeply merged object by merging all objects in a passed list. Merging is applied from the right.
 * See mergeDeepRight from Ramda.
 *
 * @func
 * @category Object
 *
 * @see mergeDeepLeftAll, mergeDeepAllWith, mergeDeepAllWithKey
 * @param {array} list Array of objects
 * @returns {object} Merged object
 *
 * @example
 *
 * 		const a = { fooA: { bar: 'a' }, shared: { baz: 1 } };
 * 		const b = { fooB: { bar: 'b' }, shared: { baz: 2 } };
 * 		const c = { fooC: { bar: 'c' }, shared: { baz: 3 } };
 *
 * 		R_.mergeDeepRightAll([a, b, c])
 * 		// {
 * 	 	// 	fooA: { bar: 'a' },
 * 		// 	fooB: { bar: 'b' },
 * 		// 	fooC: { bar: 'c' },
 * 		// 	shared: { baz: 3 },
 * 		// }
 *
 * @sig [{a}] -> {a}
 */

var mergeDeepRightAll = reduce(mergeDeepRight, {});
/**
 * Creates a new object with the own properties of the list of provided objects.
 * List of objects is reduced from first object to the last.
 * If a key exists in both compared objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @category Object
 *
 * @see mergeDeepLeftAll, mergeDeepRightAll, mergeDeepAllWithKey
 *
 * @param {Function} reducer - Function that resolves merging between two same keys
 * @param {Array} objects - Array of objects to be merged with
 * @return {Object} Returns merged object
 *
 * @example
 * 		R_.mergeDeepAllWith(R.concat, [
 * 			{ a: { b: [1] } },
 * 			{ a: { b: [2] } },
 * 			{ a: { b: [3] } },
 * 		])
 * 		// { a: { b: [1, 2, 3] } }
 *
 * @sig ((a, a) -> a) -> [{a}] -> {a}
 */

var mergeDeepAllWith = useWith(reduce(__, {}), [mergeDeepWith, identity]);
/**
 * Creates a new object with the own properties of the list of provided objects.
 * List of objects is reduced from first object to the last.
 * If a key exists in both compared objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 * using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key of the resulting object.
 *
 * @func
 * @category Object
 *
 * @see mergeDeepLeftAll, mergeDeepRightAll, mergeDeepAllWith
 *
 * @param {Function} reducer - Function that resolves merging between two same keys
 * @param {Array} objects - Array of objects to be merged with
 * @return {Object} Returns merged object
 *
 * @example
 * 		R_.mergeDeepAllWith((key, l, r) => key === "b" ? R.concat(l, r) : r, [
 * 			{ a: { b: [1], c: [1] } },
 * 			{ a: { b: [2], c: [2] } },
 * 			{ a: { b: [3], c: [3] } },
 * 		])
 * 		// { a: { b: [1, 2, 3], c: [3] } }
 *
 * @sig ((String, a, a) -> a) -> [{a}] -> {a}
 */

var mergeDeepAllWithKey = useWith(reduce(__, {}), [mergeDeepWithKey, identity]);
/**
 * Returns the argument if it is not null, undefined or NaN; otherwise the empty array is returned.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.defaultToEmptyArray(null);  //=> []
 *        R_.defaultToEmptyArray(undefined);  //=> []
 *        R_.defaultToEmptyArray('Ramda');  //=> 'Ramda'
 *        // parseInt('string') results in NaN
 *        R_.defaultToEmptyArray(parseInt('string')); //=> []
 *
 * @sig a -> a | Array
 */

var defaultToEmptyArray = defaultTo(emptyArray);
/**
 * Returns the argument if it is not null, undefined or NaN; otherwise the empty object is returned.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.defaultToEmptyObject(null);  //=> {}
 *        R_.defaultToEmptyObject(undefined);  //=> {}
 *        R_.defaultToEmptyObject('Ramda');  //=> 'Ramda'
 *        // parseInt('string') results in NaN
 *        R_.defaultToEmptyObject(parseInt('string')); //=> {}
 *
 * @sig a -> a | Object
 */

var defaultToEmptyObject = defaultTo(emptyObject);
/**
 * Returns the argument if it is not null, undefined or NaN; otherwise the empty string is returned.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.defaultToEmptyString(null);  //=> ""
 *        R_.defaultToEmptyString(undefined);  //=> ""
 *        R_.defaultToEmptyString('Ramda');  //=> 'Ramda'
 *        // parseInt('string') results in NaN
 *        R_.defaultToEmptyString(parseInt('string')); //=> ""
 *
 * @sig a -> a | String
 */

var defaultToEmptyString = defaultTo(emptyString);
/**
 * Returns the argument if it is not null, undefined or NaN; otherwise the false is returned.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.defaultToFalse(null);  //=> false
 *        R_.defaultToFalse(undefined);  //=> false
 *        R_.defaultToFalse('Ramda');  //=> 'Ramda'
 *        // parseInt('string') results in NaN
 *        R_.defaultToFalse(parseInt('string')); //=> false
 *
 * @sig a -> a | Boolean
 */

var defaultToFalse = defaultTo(false);
/**
 * Returns the argument if it is not null, undefined or NaN; otherwise number one is returned.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.defaultToOne(null);  //=> 1
 *        R_.defaultToOne(undefined);  //=> 1
 *        R_.defaultToOne('Ramda');  //=> 'Ramda'
 *        // parseInt('string') results in NaN
 *        R_.defaultToOne(parseInt('string')); //=> 1
 *
 * @sig a -> a | Number
 */

var defaultToOne = defaultTo(1);
/**
 * Returns the argument if it is not null, undefined or NaN; otherwise true is returned.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.defaultToTrue(null);  //=> true
 *        R_.defaultToTrue(undefined);  //=> true
 *        R_.defaultToTrue('Ramda');  //=> 'Ramda'
 *        // parseInt('string') results in NaN
 *        R_.defaultToTrue(parseInt('string')); //=> true
 *
 * @sig a -> a | Boolean
 */

var defaultToTrue = defaultTo(true);
/**
 * Returns the argument if it is not null, undefined or NaN; otherwise zero is returned.
 *
 * @func
 * @category Logic
 *
 * @example
 *
 *        R_.defaultToZero(null);  //=> 0
 *        R_.defaultToZero(undefined);  //=> 0
 *        R_.defaultToZero('Ramda');  //=> 'Ramda'
 *        // parseInt('string') results in NaN
 *        R_.defaultToZero(parseInt('string')); //=> 0
 *
 * @sig a -> a | Number
 */

var defaultToZero = defaultTo(0);
/**
 * Testing if argument equals to empty array.
 *
 * @func
 * @category Relation
 *
 * @param  {any} value
 * @return {boolean} True if `value` is empty array.
 *
 * @example
 *
 *        R_.equalsToEmptyArray([])	// true
 *        R_.equalsToEmptyArray([''])	// false
 *
 * @sig a -> Boolean
 */

var equalsToEmptyArray = equals(emptyArray);
/**
 * Testing if argument equals to empty object.
 *
 * @func
 * @category Relation
 *
 * @param  {any} value
 * @return {boolean} True if `value` is empty object.
 *
 * @example
 *
 *        R_.equalsToEmptyObject({})	// true
 *        R_.equalsToEmptyObject('')	// false
 *
 * @sig a -> Boolean
 */

var equalsToEmptyObject = equals(emptyObject);
/**
 * Testing if argument equals to false
 *
 * @func
 * @category Relation
 *
 * @param  {any} value
 * @return {boolean} True if `value` is false
 *
 * @example
 *
 *        R_.equalsToFalse(false)	// true
 *        R_.equalsToFalse(null)	// false
 *
 * @sig a -> Boolean
 */

var equalsToFalse = equals(false);
/**
 * Returns true if argument equals to 0.
 *
 * @func
 * @category Relation
 *
 * @param  {any} value
 * @return {boolean} True if `value` is 1
 *
 * @example
 *
 *        R_.equalsToOne(3)	// false
 *        R_.equalsToOne(0)	// true
 *        R_.equalsToOne(-3)	// false
 *
 * @sig a -> Boolean
 */

var equalsToOne = equals(1);
/**
 * Testing if argument equals to null
 *
 * @func
 * @category Relation
 *
 * @param  {any} value
 * @return {boolean} True if `value` is null
 *
 * @example
 *
 *        R_.equalsToNull(null)	// true
 *        R_.equalsToNull(undefined)	// false
 *
 * @sig a -> Boolean
 */

var equalsToNull = equals(null);
/**
 * Testing if argument equals to true
 *
 * @func
 * @category Relation
 *
 * @param  {any} value
 * @return {boolean} True if `value` is true
 *
 * @example
 *
 *        R_.equalsToTrue(true)	// true
 *        R_.equalsToTrue(false)	// false
 *
 * @sig a -> Boolean
 */

var equalsToTrue = equals(true);
/**
 * Returns true if the arguments are not equal
 *
 * @func
 * @category Logic
 *
 * @sig a -> b -> Boolean
 *
 * @example
 *
 *        R_.notEqual(1, 2);   // true
 *        R_.notEqual(1, 1);   // false
 *
 *
 */

var notEqual = complement(equals);
/**
 * Returns true if value is not equal to empty array.
 *
 * @func
 * @category Relation
 * @param {any} value
 * @returns {Boolean} Returns `true` if `value` is not an empty array.
 *
 * @sig a -> Boolean
 *
 * @example
 *
 *        R_.notEqualToEmptyArray([]);   // false
 *        R_.notEqualToEmptyArray([{ ramda: true }]);   // true
 *
 */

var notEqualToEmptyArray = complement(equalsToEmptyArray);
/**
 * Returns true if value is not equal to empty object.
 *
 * @func
 * @category Relation
 * @param {any} value
 * @returns {Boolean} Returns `true` if `value` is not an empty object.
 *
 * @sig a -> Boolean
 *
 * @example
 *
 *        R_.notEqualToEmptyObject({});   // false
 *        R_.notEqualToEmptyObject({ ramda: true });   // true
 *
 */

var notEqualToEmptyObject = complement(equalsToEmptyObject);
/**
 * Returns true if value is not equal to empty string.
 *
 * @func
 * @category Relation
 * @param {any} value
 * @returns {Boolean} Returns `true` if `value` is not an empty string.
 *
 * @sig a -> Boolean
 *
 * @example
 *
 *        R_.notEqualToEmptyString("");   // false
 *        R_.notEqualToEmptyString("Ramda");   // true
 *
 */

var notEqualToEmptyString = complement(equalsToEmptyString);
/**
 * Returns true if value is not equal to false.
 *
 * @func
 * @category Relation
 * @param {any} value
 * @returns {Boolean} Returns `true` if `value` is not false.
 *
 * @sig a -> Boolean
 *
 * @example
 *
 *        R_.notEqualToFalse(false);   // false
 *        R_.notEqualToFalse(true);   // true
 *
 */

var notEqualToFalse = complement(equalsToFalse);
/**
 * Returns true if value is not equal to null.
 *
 * @func
 * @category Relation
 * @param {any} value
 * @returns {Boolean} Returns `true` if `value` is not null.
 *
 * @sig a -> Boolean
 *
 * @example
 *
 *        R_.notEqualToNull(null);   // false
 *        R_.notEqualToNull(false);   // true
 *
 */

var notEqualToNull = complement(equalsToNull);
/**
 * Returns true if value is not equal to number one.
 *
 * @func
 * @category Relation
 * @param {any} value
 * @returns {Boolean} Returns `true` if `value` is not number one.
 *
 * @sig a -> Boolean
 *
 * @example
 *
 *        R_.notEqualToOne(1);   // false
 *        R_.notEqualToOne(0);   // true
 *
 */

var notEqualToOne = complement(equalsToOne);
/**
 * Returns true if value is not equal to true.
 *
 * @func
 * @category Relation
 * @param {any} value
 * @returns {Boolean} Returns `true` if `value` is not true.
 *
 * @sig a -> Boolean
 *
 * @example
 *
 *        R_.notEqualToTrue(true);   // false
 *        R_.notEqualToTrue(false);   // true
 *
 */

var notEqualToTrue = complement(equalsToTrue);
/**
 * Returns true if value is not equal to zero.
 *
 * @func
 * @category Relation
 * @param {any} value
 * @returns {Boolean} Returns `true` if `value` is not zero.
 *
 * @sig a -> Boolean
 *
 * @example
 *
 *        R_.notEqualToZero(0);   // false
 *        R_.notEqualToZero(1);   // true
 *
 */

var notEqualToZero = complement(equalsToZero);
var equalsAndAlways = useWith(argumentsToList, [equals, always]);
/**
 * Returns the opposite value comparing against a given set of two values.
 *
 * @func
 * @category Function
 *
 * @param {Array} options - must be array of two items
 * @param {*} val
 * @return {*} opposite of options
 * @example
 *
 *      R_.toggle('on', 'off')('on'); //  'off'
 *      R_.toggle('active', 'inactive')('inactive'); // 'active'
 *      R_.toggle(10, 100)(10); // 100
 *      R_.toggle('on', 'off')('other'); // 'other'
 */

var toggle = compose$1(
	cond,
	juxt([equalsAndAlways, flip(equalsAndAlways), always([T, identity])])
);
/**
 * Determines whether a dot path on an object has a specific value
 * in `R.equals` terms.
 *
 * @func
 * @category Object
 * @param {String} path The dot path to use.
 * @param {any} eq Value for `R.equals`.
 * @param {Object} obj The object to retrieve the nested property from and compare with `eq`.
 * @return {*} True if value on dot path equals to `eq`.
 *
 * @example
 *
 *      R_.dotPathEq('a.b', 2, {a: {b: 2}}); //=> true
 *      R_.dotPathEq('a.b', 2, {c: {b: 2}}); //=> false
 *
 * @sig String -> a -> {a} -> Boolean
 *
 */

var dotPathEq = useWith(pathEq, [splitByDot, identity, identity]);
/**
 * Determines whether a dot path on an object has a specific value
 * in `R_.notEqual` terms.
 *
 * @func
 * @category Object
 * @param {String} path The dot path to use.
 * @param {any} eq Value for `R_.notEqual`.
 * @param {Object} obj The object to retrieve the nested property from and compare with `eq`.
 * @return {*} True if value on dot path equals to `eq`.
 *
 * @example
 *
 *      R_.dotPathNotEq('a.b', 2, {a: {b: 2}}); //=> false
 *      R_.dotPathNotEq('a.b', 2, {c: {b: 2}}); //=> true
 *
 * @sig String -> a -> {a} -> Boolean
 *
 */

var dotPathNotEq = complement(dotPathEq);
/**
 * If the given, non-null object has a value at the given dot path,
 * returns the value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @category Object
 *
 * @param {any} default Default value if `path` does not exist.
 * @param {String} path The dot path to use.
 * @param {Object} obj
 *
 * @return {*}  The data at `path` of the supplied object or the default value.
 *
 * @example
 *
 *		R_.dotPathOr('N/A', 'a.b', { a: { b: 1 } }); // 1
 *		R_.dotPathOr('N/A', 'a.b', { a: { c: 1 } }); // "N/A"
 *
 * @sig a → String → {a} → a
 *
 */

var dotPathOr = useWith(pathOr, [identity, splitByDot, identity]);
/**
 * Returns `true` if the specified object property at given dot path satisfies the given predicate; false otherwise.
 *
 * @func
 * @category Object
 *
 * @param {Function} predicate
 * @param {String} path The dot path to use.
 * @param {Object} obj
 *
 * @return {Boolean}
 *
 * @example
 *
 *		R_.dotPathSatisfies((y) => y > 0, 'a.b', { a: { b: 1 } }); // true
 *		R_.dotPathSatisfies((y) => y > 0, 'a.b', { a: { b: -1 } }); // false
 *		R_.dotPathSatisfies((y) => y > 0, 'a.b', { a: { c: 1 } }); // false
 *
 * @sig (a -> Boolean) → String → {a} → Boolean
 *
 */

var dotPathSatisfies = useWith(pathSatisfies, [identity, splitByDot, identity]);
/**
 * Returns `true` if the specified object property at given dot path not satisfies the given predicate; false otherwise.
 *
 * @func
 * @category Object
 *
 * @param {Function} predicate
 * @param {String} path The dot path to use.
 * @param {Object} obj
 *
 * @return {Boolean}
 *
 * @example
 *
 *		R_.dotPathNotSatisfies((y) => y > 0, 'a.b', { a: { b: 1 } }); // false
 *		R_.dotPathNotSatisfies((y) => y > 0, 'a.b', { a: { b: -1 } }); // true
 *		R_.dotPathNotSatisfies((y) => y > 0, 'a.b', { a: { c: 1 } }); // true
 *
 * @sig (a -> Boolean) → String → {a} → Boolean
 *
 */

var dotPathNotSatisfies = complement(dotPathSatisfies);
/**
 * Returns `true` if the specified object property at given prop not satisfies the given predicate; false otherwise.
 *
 * @func
 * @category Object
 *
 * @param {Function} predicate
 * @param {String} prop The prop to use.
 * @param {Object} obj
 *
 * @return {Boolean}
 *
 * @example
 *
 * 		const positive = x => x > 0;
 *
 *		R_.propNotSatisfies(positive, 'a', { }); // true
 *		R_.propNotSatisfies(positive, 'a', { a: -1 }); // true
 *		R_.propNotSatisfies(positive, 'a', { a: 3 }); // false
 *
 * @sig (a -> Boolean) → String → {a} → Boolean
 *
 */

var propNotSatisfies = complement(propSatisfies);
/**
 * Returns `true` if the specified object property at given path not satisfies the given predicate; false otherwise.
 *
 * @func
 * @category Object
 *
 * @param {Function} predicate
 * @param {String} path The path to use.
 * @param {Object} obj
 *
 * @return {Boolean}
 *
 * @example
 *
 * 		const positive = x => x > 0;
 *
 *		R_.pathNotSatisfies(positive, ['a', 'b'], { }); // true
 *		R_.pathNotSatisfies(positive, ['a', 'b'], { a: { b: -1 } }); // true
 *		R_.pathNotSatisfies(positive, ['a', 'b'], { a: { b: 3 } }); // false
 *
 * @sig (a -> Boolean) → String → {a} → Boolean
 *
 */

var pathNotSatisfies = complement(pathSatisfies);
/**
 * Map using function that is provided with each value of the list and its index in the list.
 *
 * @func
 * @category Object
 *
 * @param {Function} fn The function to be called on every element of the `list` and its index.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 *
 * @example
 *
 *        R_.mapIndexed((value, index) => `${value}-${index}`)([1, 2, 3])
 *        // ['1-0', '2-1', '3-2']
 *
 * @sig (a -> Number -> a) -> [a] -> a
 */

var mapIndexed = addIndex(map);
/**
 * Returns true if input is empty or nil.
 *
 * @func
 * @category Logic
 *
 * @param {any} input
 * @return {Boolean}
 *
 * @example
 *
 *        R_.isNilOrEmpty(null) // true
 *        R_.isNilOrEmpty({}) // true
 *        R_.isNilOrEmpty(false) // false
 *        R_.isNilOrEmpty(0) // false
 *
 * @sig a -> Boolean
 */

var isNilOrEmpty = anyPass([isNil, isEmpty]);
/**
 * Returns true if the argument is a plain object.
 *
 * @func
 * @category Type
 *
 * @param {any} x value to test
 * @return {boolean} whether the argument is a plain object
 *
 * @example
 *
 *        R_.isPlainObject({}) // true
 *        R_.isPlainObject([]) // false
 *        R_.isPlainObject(null) // false
 *
 * @sig a -> Boolean
 */

var isPlainObject$2 = allPass([
	o(equals("Object"), type),
	isNotNil,
	either(
		o(equals(Object.prototype), Object.getPrototypeOf), // NOTE: prototype is null if created using Object.create(null)
		o(isNil, Object.getPrototypeOf)
	)
]);

/**
 * Creates an action creator with supplied type and payload & meta getters.
 *
 * @sig String -> (a -> b) -> (a -> c) -> a -> {type: String, payload: b, meta: c}
 *
 * @example
 *
 *    const reset = makeConstantActionCreator("RESET")
 *    const increment = makeSimpleActionCreator("INCREMENT");
 *    const fetchItems = makeActionCreator("FETCH_ITEMS", R.prop("items"), R.always({ page: 0 }))
 */

var makeActionCreator = curry(function(type$$1, getPayload, getMeta) {
	return o(
		rejectNil,
		applySpec({
			type: always(type$$1),
			payload: getPayload,
			meta: getMeta,
			error: o(ifElse(is$1(Error), T, alwaysNull), getPayload)
		})
	);
});

/**
 * Creates an action creator with supplied type, no payload and no meta.
 *
 * @sig String -> () -> {type: String}
 */

var makeConstantActionCreator = o(function(actionCreator) {
	return function() {
		return actionCreator(null);
	};
}, makeActionCreator(__, alwaysNull, alwaysNull));

/**
 * Creates an action creator with supplied type. The resulting action payload is the first arg.
 *
 * @sig String -> a -> {type: String, payload: a}
 */

var makeSimpleActionCreator = makeActionCreator(__, identity, alwaysNull);

var isErrorAction = propEq("error", true);

complement(isErrorAction);

var addPrefix = function addPrefix(prefix) {
	return map(function(x) {
		return prefix + "/" + x;
	});
};
/**
 * @example
 *
 * 	 prefixedValueMirror("ns", ["ACTION", "REACTION"])
 *   // { ACTION: "ns/ACTION", REACTION: "ns/REACTION" }
 *
 */

var prefixedValueMirror = curry(function(prefix, xs) {
	return o(addPrefix(prefix), valueMirror)(xs);
});

var getDisplayName$1 = function(Component) {
	return Component.displayName || Component.name || "Component";
};

var ActionTypes$1 = prefixedValueMirror("@@lnd-cardif-extensible-store")([
	"STOP_EPICS",
	"REDUCERS_INJECTED",
	"REDUCERS_REMOVED"
]);
var stopEpics = makeSimpleActionCreator(ActionTypes$1.STOP_EPICS);
var reducersInjected = makeSimpleActionCreator(ActionTypes$1.REDUCERS_INJECTED);
var reducersRemoved = makeSimpleActionCreator(ActionTypes$1.REDUCERS_REMOVED);

var getNamespaceByAction = path(["meta", "namespace"]);
/**
 * Returns Redux state by namespace. Returns undefined if namespace is undefined.
 * Throws if invalid namespace is passed.
 *
 * @param {?String} namespace optional namespace
 * @param {Object} state redux state
 * @returns {?Object} namespaced redux state
 */

var getStateByNamespace = curry(function(namespace, state) {
	if (!namespace) {
		return undefined;
	}

	var namespacedState = path(["namespaces", namespace], state);
	invariant_1(
		namespacedState,
		"No local Redux state found for namespace " + namespace + "."
	);
	return namespacedState;
});
/**
 * @see getStateByNamespace
 */

var getStateByAction = useWith(getStateByNamespace, [
	getNamespaceByAction,
	identity
]);
/**
 * An action is from a namespace if the passed namespace is nil (it's a global reducer/epic),
 * or if the action's namespace is nil (it's a global action) or if the namespaces match.
 *
 * @param {?String} namespace namespace to match the action with
 * @param {Object} action action with an optionally defined meta.namespace property
 * @returns {Boolean} whether the action is from the namespace or not
 */

var isActionFromNamespace = curry(function(namespace, action) {
	var actionNamespace = getNamespaceByAction(action);

	if (!namespace || !actionNamespace) {
		return true;
	}

	return namespace === actionNamespace;
});

var SUFFIX_DELIMITER = "__id:";

var suffix = curry(function(id, value) {
	return "" + value + SUFFIX_DELIMITER + String(id);
});
/**
 * Recursively suffixes all keys of an object with a delimiter and an ID.
 *
 * @param {String} id id to suffix the keys with
 * @param {Object} object object to suffix
 * @returns {Object} suffixed object
 */

var suffixKeys = curry(function(id, object) {
	return o(
		// Prettier <3
		map(
			when(isPlainObject$2, function(innerObject) {
				return suffixKeys(id, innerObject);
			})
		),
		mapKeys(suffix(id))
	)(object);
});
var removeSuffix = o(head, split(SUFFIX_DELIMITER));
/**
 * Attempts to recursively remove suffixes from all keys of an object.
 * If no suffix is present, the key will be skipped.
 *
 * @param {Object} object object to remove the suffixes from
 * @returns {Object} object with suffixes removed
 */

var removeSuffixFromKeys = o(
	map(
		when(isPlainObject$2, function(object) {
			return removeSuffixFromKeys(object);
		})
	),
	mapKeys(removeSuffix)
);

var combineAsyncReducers = ifElse(
	isEmpty, // NOTE: using `alwaysNull` throws an exception on Liferay, but not in the isolated environment.
	always(alwaysEmptyObject),
	o(
		combineReducers,
		map(
			when(isPlainObject$2, function(object) {
				return combineAsyncReducers(object);
			})
		)
	)
);
/**
 * Combines the async reducers to create a new reducer. Uses `combineReducers` under the hood
 * and removes all suffixes.
 *
 * @param {Object} asyncReducers recursively nested object with async reducers
 * @returns {Function} root reducer
 */

var makeRootReducer = o(combineAsyncReducers, removeSuffixFromKeys);

function withStoreContext(Component) {
	function WithStoreContext(props$$1) {
		return React__default.createElement(
			StoreContext.Consumer,
			null,
			function(store) {
				return React__default.createElement(
					Component,
					_extends({}, props$$1, {
						store: store
					})
				);
			}
		);
	}

	WithStoreContext.displayName =
		"WithStoreContext(" + getDisplayName$1(Component) + ")";
	return WithStoreContext;
}

function withRedux(_ref) {
	var epics = _ref.epics,
		reducers = _ref.reducers,
		persistReducers = _ref.persistReducers,
		isGlobal = _ref.global;
	return function(NextComponent) {
		var WithRedux =
			/*#__PURE__*/
			(function(_Component) {
				_inheritsLoose(WithRedux, _Component);

				function WithRedux(props$$1) {
					var _this;

					_this = _Component.call(this, props$$1) || this; // NOTE: This is necessary because if a container is remounted for any reason,
					// the `componentWillUnmount` lifecycle hook is invoked AFTER the constructor of the new
					// element. This would cause the reducers to be removed and not injected back.
					//
					// `->` is constructor of the second instance and `=>` is CWU of the first one
					// BEFORE: [reducer] -> [reducer] => [], no reducer survives the remounting process
					// AFTER: [reducer1] -> [reducer1, reducer2] => [reducer2], the second reducer survives

					_this.getReducers = function() {
						return _this.suffixDependencies(reducers);
					};

					_this.getEpics = function() {
						return _this.suffixDependencies(epics);
					};

					_this.id = withRedux.counter++;
					_this.suffixDependencies = suffixKeys(_this.id);
					_this.namespace = isGlobal ? undefined : props$$1.namespace;

					_this.props.store.injectReducers(
						_this.getReducers(),
						_this.namespace
					);

					_this.props.store.injectEpics(
						_this.getEpics(),
						_this.namespace
					);

					return _this;
				}

				var _proto = WithRedux.prototype;

				_proto.componentWillUnmount = function componentWillUnmount() {
					if (!persistReducers) {
						this.props.store.removeReducers(
							keys(this.getReducers()),
							this.namespace
						);
					}

					this.props.store.removeEpics(keys(this.getEpics()));
				};

				_proto.render = function render() {
					return React__default.createElement(
						NextComponent,
						this.props
					);
				};

				return WithRedux;
			})(React.Component);

		WithRedux.propTypes = {
			namespace: propTypes.string,
			store: propTypes.object.isRequired
		};
		WithRedux.displayName =
			"WithRedux(" + getDisplayName$1(NextComponent) + ")";
		return isGlobal
			? withStoreContext(WithRedux)
			: o(withStoreContext, withWidgetContext)(WithRedux);
	};
}
withRedux.counter = 0;

var makeMapStateToProps = function makeMapStateToProps(mapStateToProps) {
	return function(state, ownProps) {
		if (!mapStateToProps) {
			return {};
		}

		return mapStateToProps(
			getStateByNamespace(ownProps.namespace, state),
			ownProps,
			state
		);
	};
};
var makeMapDispatchToProps = function makeMapDispatchToProps(
	mapDispatchToProps
) {
	return function(dispatch, ownProps) {
		if (!mapDispatchToProps) {
			return {};
		}

		var wrappedDispatch = o(
			dispatch,
			mergeDeepRight({
				meta: {
					namespace: ownProps.namespace
				}
			})
		);

		if (isFunction$1(mapDispatchToProps)) {
			return mapDispatchToProps(wrappedDispatch, ownProps);
		}

		if (isObject$1(mapDispatchToProps)) {
			var wrapActionCreator = function wrapActionCreator(actionCreator) {
				return compose$1(wrappedDispatch, actionCreator);
			};

			return map(wrapActionCreator, mapDispatchToProps);
		}

		throw new TypeError(
			"mapDispatchToProps is not an object or a function"
		);
	};
};
var rawNamespacedConnect = binary(
	useWith(connect, [makeMapStateToProps, makeMapDispatchToProps])
);
var namespacedConnect = function namespacedConnect() {
	return o(withWidgetContext, rawNamespacedConnect.apply(void 0, arguments));
};

exports.Provider = Provider$$1;
exports.withRedux = withRedux;
exports.namespacedConnect = namespacedConnect;
