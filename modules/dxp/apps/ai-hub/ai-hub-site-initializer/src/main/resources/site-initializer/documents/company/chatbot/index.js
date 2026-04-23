/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

(function () {
	const n = document.createElement('link').relList;
	if (n && n.supports && n.supports('modulepreload')) {
		return;
	}
	for (const i of document.querySelectorAll('link[rel="modulepreload"]')) {
		r(i);
	}
	new MutationObserver((i) => {
		for (const l of i) {
			if (l.type === 'childList') {
				for (const o of l.addedNodes) {
					o.tagName === 'LINK' && o.rel === 'modulepreload' && r(o);
				}
			}
		}
	}).observe(document, {childList: !0, subtree: !0});
	function t(i) {
		const l = {};

		return (
			i.integrity && (l.integrity = i.integrity),
			i.referrerPolicy && (l.referrerPolicy = i.referrerPolicy),
			i.crossOrigin === 'use-credentials'
				? (l.credentials = 'include')
				: i.crossOrigin === 'anonymous'
					? (l.credentials = 'omit')
					: (l.credentials = 'same-origin'),
			l
		);
	}
	function r(i) {
		if (i.ep) {
			return;
		}
		i.ep = !0;
		const l = t(i);
		fetch(i.href, l);
	}
})();
const tl =
	typeof globalThis < 'u'
		? globalThis
		: typeof window < 'u'
			? window
			: typeof global < 'u'
				? global
				: typeof self < 'u'
					? self
					: {};
function hf(e) {
	return e &&
		e.__esModule &&
		Object.prototype.hasOwnProperty.call(e, 'default')
		? e.default
		: e;
}
const mf = {exports: {}};
const zl = {};
const gf = {exports: {}};
const $ = {};

/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ const di = Symbol.for('react.element');
const wh = Symbol.for('react.portal');
const Sh = Symbol.for('react.fragment');
const Eh = Symbol.for('react.strict_mode');
const Ch = Symbol.for('react.profiler');
const _h = Symbol.for('react.provider');
const Ph = Symbol.for('react.context');
const Th = Symbol.for('react.forward_ref');
const Ih = Symbol.for('react.suspense');
const Nh = Symbol.for('react.memo');
const zh = Symbol.for('react.lazy');
const aa = Symbol.iterator;
function Lh(e) {
	return e === null || typeof e !== 'object'
		? null
		: ((e = (aa && e[aa]) || e['@@iterator']),
			typeof e === 'function' ? e : null);
}
const yf = {
	isMounted() {
		return !1;
	},
	enqueueForceUpdate() {},
	enqueueReplaceState() {},
	enqueueSetState() {},
};
const vf = Object.assign;
const kf = {};
function fr(e, n, t) {
	(this.props = e),
		(this.context = n),
		(this.refs = kf),
		(this.updater = t || yf);
}
fr.prototype.isReactComponent = {};
fr.prototype.setState = function (e, n) {
	if (typeof e !== 'object' && typeof e !== 'function' && e != null) {
		throw Error(
			'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
		);
	}
	this.updater.enqueueSetState(this, e, n, 'setState');
};
fr.prototype.forceUpdate = function (e) {
	this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function xf() {}
xf.prototype = fr.prototype;
function Yu(e, n, t) {
	(this.props = e),
		(this.context = n),
		(this.refs = kf),
		(this.updater = t || yf);
}
const Xu = (Yu.prototype = new xf());
Xu.constructor = Yu;
vf(Xu, fr.prototype);
Xu.isPureReactComponent = !0;
const ca = Array.isArray;
const wf = Object.prototype.hasOwnProperty;
const Gu = {current: null};
const Sf = {key: !0, ref: !0, __self: !0, __source: !0};
function Ef(e, n, t) {
	let r;
	const i = {};
	let l = null;
	let o = null;
	if (n != null) {
		for (r in (n.ref !== void 0 && (o = n.ref),
		n.key !== void 0 && (l = '' + n.key),
		n)) {
			wf.call(n, r) && !Sf.hasOwnProperty(r) && (i[r] = n[r]);
		}
	}
	let u = arguments.length - 2;
	if (u === 1) {
		i.children = t;
	}
	else if (1 < u) {
		for (var s = Array(u), a = 0; a < u; a++) {
			s[a] = arguments[a + 2];
		}
		i.children = s;
	}
	if (e && e.defaultProps) {
		for (r in ((u = e.defaultProps), u)) {
			i[r] === void 0 && (i[r] = u[r]);
		}
	}

	return {
		$$typeof: di,
		type: e,
		key: l,
		ref: o,
		props: i,
		_owner: Gu.current,
	};
}
function Rh(e, n) {
	return {
		$$typeof: di,
		type: e.type,
		key: n,
		ref: e.ref,
		props: e.props,
		_owner: e._owner,
	};
}
function qu(e) {
	return typeof e === 'object' && e !== null && e.$$typeof === di;
}
function Oh(e) {
	const n = {'=': '=0', ':': '=2'};

	return (
		'$' +
		e.replace(/[=:]/g, (t) => {
			return n[t];
		})
	);
}
const fa = /\/+/g;
function ql(e, n) {
	return typeof e === 'object' && e !== null && e.key != null
		? Oh('' + e.key)
		: n.toString(36);
}
function Hi(e, n, t, r, i) {
	let l = typeof e;
	(l === 'undefined' || l === 'boolean') && (e = null);
	let o = !1;
	if (e === null) {
		o = !0;
	}
	else {
		switch (l) {
			case 'string':
			case 'number':
				o = !0;
				break;
			case 'object':
				switch (e.$$typeof) {
					case di:
					case wh:
						o = !0;
				}
		}
	}
	if (o) {
		return (
			(o = e),
			(i = i(o)),
			(e = r === '' ? '.' + ql(o, 0) : r),
			ca(i)
				? ((t = ''),
					e != null && (t = e.replace(fa, '$&/') + '/'),
					Hi(i, n, t, '', (a) => {
						return a;
					}))
				: i != null &&
					(qu(i) &&
						(i = Rh(
							i,
							t +
								(!i.key || (o && o.key === i.key)
									? ''
									: ('' + i.key).replace(fa, '$&/') + '/') +
								e
						)),
					n.push(i)),
			1
		);
	}
	if (((o = 0), (r = r === '' ? '.' : r + ':'), ca(e))) {
		for (var u = 0; u < e.length; u++) {
			l = e[u];
			var s = r + ql(l, u);
			o += Hi(l, n, t, s, i);
		}
	}
	else if (((s = Lh(e)), typeof s === 'function')) {
		for (e = s.call(e), u = 0; !(l = e.next()).done; ) {
			(l = l.value), (s = r + ql(l, u++)), (o += Hi(l, n, t, s, i));
		}
	}
	else if (l === 'object') {
		throw (
			((n = String(e)),
			Error(
				'Objects are not valid as a React child (found: ' +
					(n === '[object Object]'
						? 'object with keys {' + Object.keys(e).join(', ') + '}'
						: n) +
					'). If you meant to render a collection of children, use an array instead.'
			))
		);
	}

	return o;
}
function wi(e, n, t) {
	if (e == null) {
		return e;
	}
	const r = [];
	let i = 0;

	return (
		Hi(e, r, '', '', (l) => {
			return n.call(t, l, i++);
		}),
		r
	);
}
function Mh(e) {
	if (e._status === -1) {
		let n = e._result;
		(n = n()),
			n.then(
				(t) => {
					(e._status === 0 || e._status === -1) &&
						((e._status = 1), (e._result = t));
				},
				(t) => {
					(e._status === 0 || e._status === -1) &&
						((e._status = 2), (e._result = t));
				}
			),
			e._status === -1 && ((e._status = 0), (e._result = n));
	}
	if (e._status === 1) {
		return e._result.default;
	}
	throw e._result;
}
const Me = {current: null};
const Vi = {transition: null};
const Dh = {
	ReactCurrentDispatcher: Me,
	ReactCurrentBatchConfig: Vi,
	ReactCurrentOwner: Gu,
};
function Cf() {
	throw Error('act(...) is not supported in production builds of React.');
}
$.Children = {
	map: wi,
	forEach(e, n, t) {
		wi(
			e,
			function () {
				n.apply(this, arguments);
			},
			t
		);
	},
	count(e) {
		let n = 0;

		return (
			wi(e, () => {
				n++;
			}),
			n
		);
	},
	toArray(e) {
		return (
			wi(e, (n) => {
				return n;
			}) || []
		);
	},
	only(e) {
		if (!qu(e)) {
			throw Error(
				'React.Children.only expected to receive a single React element child.'
			);
		}

		return e;
	},
};
$.Component = fr;
$.Fragment = Sh;
$.Profiler = Ch;
$.PureComponent = Yu;
$.StrictMode = Eh;
$.Suspense = Ih;
$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dh;
$.act = Cf;
$.cloneElement = function (e, n, t) {
	if (e == null) {
		throw Error(
			'React.cloneElement(...): The argument must be a React element, but you passed ' +
				e +
				'.'
		);
	}
	const r = {...e.props};
	let i = e.key;
	let l = e.ref;
	let o = e._owner;
	if (n != null) {
		if (
			(n.ref !== void 0 && ((l = n.ref), (o = Gu.current)),
			n.key !== void 0 && (i = '' + n.key),
			e.type && e.type.defaultProps)
		) {
			var u = e.type.defaultProps;
		}
		for (s in n) {
			wf.call(n, s) &&
				!Sf.hasOwnProperty(s) &&
				(r[s] = n[s] === void 0 && u !== void 0 ? u[s] : n[s]);
		}
	}
	var s = arguments.length - 2;
	if (s === 1) {
		r.children = t;
	}
	else if (1 < s) {
		u = Array(s);
		for (let a = 0; a < s; a++) {
			u[a] = arguments[a + 2];
		}
		r.children = u;
	}

	return {$$typeof: di, type: e.type, key: i, ref: l, props: r, _owner: o};
};
$.createContext = function (e) {
	return (
		(e = {
			$$typeof: Ph,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null,
			_defaultValue: null,
			_globalName: null,
		}),
		(e.Provider = {$$typeof: _h, _context: e}),
		(e.Consumer = e)
	);
};
$.createElement = Ef;
$.createFactory = function (e) {
	const n = Ef.bind(null, e);

	return (n.type = e), n;
};
$.createRef = function () {
	return {current: null};
};
$.forwardRef = function (e) {
	return {$$typeof: Th, render: e};
};
$.isValidElement = qu;
$.lazy = function (e) {
	return {$$typeof: zh, _payload: {_status: -1, _result: e}, _init: Mh};
};
$.memo = function (e, n) {
	return {$$typeof: Nh, type: e, compare: n === void 0 ? null : n};
};
$.startTransition = function (e) {
	const n = Vi.transition;
	Vi.transition = {};
	try {
		e();
	}
	finally {
		Vi.transition = n;
	}
};
$.unstable_act = Cf;
$.useCallback = function (e, n) {
	return Me.current.useCallback(e, n);
};
$.useContext = function (e) {
	return Me.current.useContext(e);
};
$.useDebugValue = function () {};
$.useDeferredValue = function (e) {
	return Me.current.useDeferredValue(e);
};
$.useEffect = function (e, n) {
	return Me.current.useEffect(e, n);
};
$.useId = function () {
	return Me.current.useId();
};
$.useImperativeHandle = function (e, n, t) {
	return Me.current.useImperativeHandle(e, n, t);
};
$.useInsertionEffect = function (e, n) {
	return Me.current.useInsertionEffect(e, n);
};
$.useLayoutEffect = function (e, n) {
	return Me.current.useLayoutEffect(e, n);
};
$.useMemo = function (e, n) {
	return Me.current.useMemo(e, n);
};
$.useReducer = function (e, n, t) {
	return Me.current.useReducer(e, n, t);
};
$.useRef = function (e) {
	return Me.current.useRef(e);
};
$.useState = function (e) {
	return Me.current.useState(e);
};
$.useSyncExternalStore = function (e, n, t) {
	return Me.current.useSyncExternalStore(e, n, t);
};
$.useTransition = function () {
	return Me.current.useTransition();
};
$.version = '18.3.1';
gf.exports = $;
const fe = gf.exports;

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ const Ah = fe;
const Fh = Symbol.for('react.element');
const jh = Symbol.for('react.fragment');
const Bh = Object.prototype.hasOwnProperty;
const Uh =
	Ah.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
const Hh = {key: !0, ref: !0, __self: !0, __source: !0};
function _f(e, n, t) {
	let r;
	const i = {};
	let l = null;
	let o = null;
	t !== void 0 && (l = '' + t),
		n.key !== void 0 && (l = '' + n.key),
		n.ref !== void 0 && (o = n.ref);
	for (r in n) {
		Bh.call(n, r) && !Hh.hasOwnProperty(r) && (i[r] = n[r]);
	}
	if (e && e.defaultProps) {
		for (r in ((n = e.defaultProps), n)) {
			i[r] === void 0 && (i[r] = n[r]);
		}
	}

	return {
		$$typeof: Fh,
		type: e,
		key: l,
		ref: o,
		props: i,
		_owner: Uh.current,
	};
}
zl.Fragment = jh;
zl.jsx = _f;
zl.jsxs = _f;
mf.exports = zl;
const R = mf.exports;
const Pf = {exports: {}};
const Je = {};
const Tf = {exports: {}};
const If = {};

/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
	function n(z, F) {
		let g = z.length;
		z.push(F);
		e: for (; 0 < g; ) {
			const Q = (g - 1) >>> 1;
			const q = z[Q];
			if (0 < i(q, F)) {
				(z[Q] = F), (z[g] = q), (g = Q);
			}
			else {
				break e;
			}
		}
	}
	function t(z) {
		return !z.length ? null : z[0];
	}
	function r(z) {
		if (!z.length) {
			return null;
		}
		const F = z[0];
		const g = z.pop();
		if (g !== F) {
			z[0] = g;
			e: for (let Q = 0, q = z.length, v = q >>> 1; Q < v; ) {
				const ve = 2 * (Q + 1) - 1;
				const sn = z[ve];
				const te = ve + 1;
				const vn = z[te];
				if (0 > i(sn, g)) {
					te < q && 0 > i(vn, sn)
						? ((z[Q] = vn), (z[te] = g), (Q = te))
						: ((z[Q] = sn), (z[ve] = g), (Q = ve));
				}
				else if (te < q && 0 > i(vn, g)) {
					(z[Q] = vn), (z[te] = g), (Q = te);
				}
				else {
					break e;
				}
			}
		}

		return F;
	}
	function i(z, F) {
		const g = z.sortIndex - F.sortIndex;

		return g !== 0 ? g : z.id - F.id;
	}
	if (
		typeof performance === 'object' &&
		typeof performance.now === 'function'
	) {
		const l = performance;
		e.unstable_now = function () {
			return l.now();
		};
	}
	else {
		const o = Date;
		const u = o.now();
		e.unstable_now = function () {
			return o.now() - u;
		};
	}
	const s = [];
	const a = [];
	let c = 1;
	let f = null;
	let d = 3;
	let p = !1;
	let x = !1;
	let k = !1;
	const C = typeof setTimeout === 'function' ? setTimeout : null;
	const h = typeof clearTimeout === 'function' ? clearTimeout : null;
	const m = typeof setImmediate < 'u' ? setImmediate : null;
	typeof navigator < 'u' &&
		navigator.scheduling !== void 0 &&
		navigator.scheduling.isInputPending !== void 0 &&
		navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function y(z) {
		for (let F = t(a); F !== null; ) {
			if (F.callback === null) {
				r(a);
			}
			else if (F.startTime <= z) {
				r(a), (F.sortIndex = F.expirationTime), n(s, F);
			}
			else {
				break;
			}
			F = t(a);
		}
	}
	function S(z) {
		if (((k = !1), y(z), !x)) {
			if (t(s) !== null) {
				(x = !0), me(T);
			}
			else {
				const F = t(a);
				F !== null && de(S, F.startTime - z);
			}
		}
	}
	function T(z, F) {
		(x = !1), k && ((k = !1), h(L), (L = -1)), (p = !0);
		const g = d;
		try {
			for (
				y(F), f = t(s);
				f !== null && (!(f.expirationTime > F) || (z && !D()));

			) {
				const Q = f.callback;
				if (typeof Q === 'function') {
					(f.callback = null), (d = f.priorityLevel);
					const q = Q(f.expirationTime <= F);
					(F = e.unstable_now()),
						typeof q === 'function'
							? (f.callback = q)
							: f === t(s) && r(s),
						y(F);
				}
				else {
					r(s);
				}
				f = t(s);
			}
			if (f !== null) {
				var v = !0;
			}
			else {
				const ve = t(a);
				ve !== null && de(S, ve.startTime - F), (v = !1);
			}

			return v;
		}
		finally {
			(f = null), (d = g), (p = !1);
		}
	}
	let w = !1;
	let I = null;
	var L = -1;
	let j = 5;
	let M = -1;
	function D() {
		return !(e.unstable_now() - M < j);
	}
	function A() {
		if (I !== null) {
			const z = e.unstable_now();
			M = z;
			let F = !0;
			try {
				F = I(!0, z);
			}
			finally {
				F ? X() : ((w = !1), (I = null));
			}
		}
		else {
			w = !1;
		}
	}
	let X;
	if (typeof m === 'function') {
		X = function () {
			m(A);
		};
	}
	else if (typeof MessageChannel < 'u') {
		const ue = new MessageChannel();
		const W = ue.port2;
		(ue.port1.onmessage = A),
			(X = function () {
				W.postMessage(null);
			});
	}
	else {
		X = function () {
			C(A, 0);
		};
	}
	function me(z) {
		(I = z), w || ((w = !0), X());
	}
	function de(z, F) {
		L = C(() => {
			z(e.unstable_now());
		}, F);
	}
	(e.unstable_IdlePriority = 5),
		(e.unstable_ImmediatePriority = 1),
		(e.unstable_LowPriority = 4),
		(e.unstable_NormalPriority = 3),
		(e.unstable_Profiling = null),
		(e.unstable_UserBlockingPriority = 2),
		(e.unstable_cancelCallback = function (z) {
			z.callback = null;
		}),
		(e.unstable_continueExecution = function () {
			x || p || ((x = !0), me(T));
		}),
		(e.unstable_forceFrameRate = function (z) {
			0 > z || 125 < z
				? console.error(
						'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
					)
				: (j = 0 < z ? Math.floor(1e3 / z) : 5);
		}),
		(e.unstable_getCurrentPriorityLevel = function () {
			return d;
		}),
		(e.unstable_getFirstCallbackNode = function () {
			return t(s);
		}),
		(e.unstable_next = function (z) {
			switch (d) {
				case 1:
				case 2:
				case 3:
					var F = 3;
					break;
				default:
					F = d;
			}
			const g = d;
			d = F;
			try {
				return z();
			}
			finally {
				d = g;
			}
		}),
		(e.unstable_pauseExecution = function () {}),
		(e.unstable_requestPaint = function () {}),
		(e.unstable_runWithPriority = function (z, F) {
			switch (z) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					break;
				default:
					z = 3;
			}
			const g = d;
			d = z;
			try {
				return F();
			}
			finally {
				d = g;
			}
		}),
		(e.unstable_scheduleCallback = function (z, F, g) {
			const Q = e.unstable_now();
			switch (
				(typeof g === 'object' && g !== null
					? ((g = g.delay),
						(g = typeof g === 'number' && 0 < g ? Q + g : Q))
					: (g = Q),
				z)
			) {
				case 1:
					var q = -1;
					break;
				case 2:
					q = 250;
					break;
				case 5:
					q = 1073741823;
					break;
				case 4:
					q = 1e4;
					break;
				default:
					q = 5e3;
			}

			return (
				(q = g + q),
				(z = {
					id: c++,
					callback: F,
					priorityLevel: z,
					startTime: g,
					expirationTime: q,
					sortIndex: -1,
				}),
				g > Q
					? ((z.sortIndex = g),
						n(a, z),
						t(s) === null &&
							z === t(a) &&
							(k ? (h(L), (L = -1)) : (k = !0), de(S, g - Q)))
					: ((z.sortIndex = q), n(s, z), x || p || ((x = !0), me(T))),
				z
			);
		}),
		(e.unstable_shouldYield = D),
		(e.unstable_wrapCallback = function (z) {
			const F = d;

			return function () {
				const g = d;
				d = F;
				try {
					return z.apply(this, arguments);
				}
				finally {
					d = g;
				}
			};
		});
})(If);
Tf.exports = If;
const Vh = Tf.exports;

/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ const $h = fe;
const qe = Vh;
function _(e) {
	for (
		var n = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
			t = 1;
		t < arguments.length;
		t++
	) {
		n += '&args[]=' + encodeURIComponent(arguments[t]);
	}

	return (
		'Minified React error #' +
		e +
		'; visit ' +
		n +
		' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
	);
}
const Nf = new Set();
const Xr = {};
function _t(e, n) {
	ir(e, n), ir(e + 'Capture', n);
}
function ir(e, n) {
	for (Xr[e] = n, e = 0; e < n.length; e++) {
		Nf.add(n[e]);
	}
}
const Dn = !(
	typeof window > 'u' ||
	typeof window.document > 'u' ||
	typeof window.document.createElement > 'u'
);
const Ao = Object.prototype.hasOwnProperty;
const Wh =
	/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
const pa = {};
const da = {};
function bh(e) {
	return Ao.call(da, e)
		? !0
		: Ao.call(pa, e)
			? !1
			: Wh.test(e)
				? (da[e] = !0)
				: ((pa[e] = !0), !1);
}
function Qh(e, n, t, r) {
	if (t !== null && t.type === 0) {
		return !1;
	}
	switch (typeof n) {
		case 'function':
		case 'symbol':
			return !0;
		case 'boolean':
			return r
				? !1
				: t !== null
					? !t.acceptsBooleans
					: ((e = e.toLowerCase().slice(0, 5)),
						e !== 'data-' && e !== 'aria-');
		default:
			return !1;
	}
}
function Kh(e, n, t, r) {
	if (n === null || typeof n > 'u' || Qh(e, n, t, r)) {
		return !0;
	}
	if (r) {
		return !1;
	}
	if (t !== null) {
		switch (t.type) {
			case 3:
				return !n;
			case 4:
				return n === !1;
			case 5:
				return isNaN(n);
			case 6:
				return isNaN(n) || 1 > n;
		}
	}

	return !1;
}
function De(e, n, t, r, i, l, o) {
	(this.acceptsBooleans = n === 2 || n === 3 || n === 4),
		(this.attributeName = r),
		(this.attributeNamespace = i),
		(this.mustUseProperty = t),
		(this.propertyName = e),
		(this.type = n),
		(this.sanitizeURL = l),
		(this.removeEmptyString = o);
}
const Pe = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
	.split(' ')
	.forEach((e) => {
		Pe[e] = new De(e, 0, !1, e, null, !1, !1);
	});
[
	['acceptCharset', 'accept-charset'],
	['className', 'class'],
	['htmlFor', 'for'],
	['httpEquiv', 'http-equiv'],
].forEach((e) => {
	const n = e[0];
	Pe[n] = new De(n, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach((e) => {
	Pe[e] = new De(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
	'autoReverse',
	'externalResourcesRequired',
	'focusable',
	'preserveAlpha',
].forEach((e) => {
	Pe[e] = new De(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
	.split(' ')
	.forEach((e) => {
		Pe[e] = new De(e, 3, !1, e.toLowerCase(), null, !1, !1);
	});
['checked', 'multiple', 'muted', 'selected'].forEach((e) => {
	Pe[e] = new De(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach((e) => {
	Pe[e] = new De(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach((e) => {
	Pe[e] = new De(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach((e) => {
	Pe[e] = new De(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
const Ju = /[\-:]([a-z])/g;
function Zu(e) {
	return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
	.split(' ')
	.forEach((e) => {
		const n = e.replace(Ju, Zu);
		Pe[n] = new De(n, 1, !1, e, null, !1, !1);
	});
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
	.split(' ')
	.forEach((e) => {
		const n = e.replace(Ju, Zu);
		Pe[n] = new De(n, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
	});
['xml:base', 'xml:lang', 'xml:space'].forEach((e) => {
	const n = e.replace(Ju, Zu);
	Pe[n] = new De(n, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach((e) => {
	Pe[e] = new De(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Pe.xlinkHref = new De(
	'xlinkHref',
	1,
	!1,
	'xlink:href',
	'http://www.w3.org/1999/xlink',
	!0,
	!1
);
['src', 'href', 'action', 'formAction'].forEach((e) => {
	Pe[e] = new De(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function es(e, n, t, r) {
	let i = Pe.hasOwnProperty(n) ? Pe[n] : null;
	(i !== null
		? i.type !== 0
		: r ||
			!(2 < n.length) ||
			(n[0] !== 'o' && n[0] !== 'O') ||
			(n[1] !== 'n' && n[1] !== 'N')) &&
		(Kh(n, t, i, r) && (t = null),
		r || i === null
			? bh(n) &&
				(t === null ? e.removeAttribute(n) : e.setAttribute(n, '' + t))
			: i.mustUseProperty
				? (e[i.propertyName] =
						t === null ? (i.type === 3 ? !1 : '') : t)
				: ((n = i.attributeName),
					(r = i.attributeNamespace),
					t === null
						? e.removeAttribute(n)
						: ((i = i.type),
							(t =
								i === 3 || (i === 4 && t === !0) ? '' : '' + t),
							r
								? e.setAttributeNS(r, n, t)
								: e.setAttribute(n, t))));
}
const Bn = $h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
const Si = Symbol.for('react.element');
const At = Symbol.for('react.portal');
const Ft = Symbol.for('react.fragment');
const ns = Symbol.for('react.strict_mode');
const Fo = Symbol.for('react.profiler');
const zf = Symbol.for('react.provider');
const Lf = Symbol.for('react.context');
const ts = Symbol.for('react.forward_ref');
const jo = Symbol.for('react.suspense');
const Bo = Symbol.for('react.suspense_list');
const rs = Symbol.for('react.memo');
const $n = Symbol.for('react.lazy');
const Rf = Symbol.for('react.offscreen');
const ha = Symbol.iterator;
function vr(e) {
	return e === null || typeof e !== 'object'
		? null
		: ((e = (ha && e[ha]) || e['@@iterator']),
			typeof e === 'function' ? e : null);
}
const ce = Object.assign;
let Jl;
function Ir(e) {
	if (Jl === void 0) {
		try {
			throw Error();
		}
		catch (t) {
			const n = t.stack.trim().match(/\n( *(at )?)/);
			Jl = (n && n[1]) || '';
		}
	}

	return (
		`
` +
		Jl +
		e
	);
}
let Zl = !1;
function eo(e, n) {
	if (!e || Zl) {
		return '';
	}
	Zl = !0;
	const t = Error.prepareStackTrace;
	Error.prepareStackTrace = void 0;
	try {
		if (n) {
			if (
				((n = function () {
					throw Error();
				}),
				Object.defineProperty(n.prototype, 'props', {
					set() {
						throw Error();
					},
				}),
				typeof Reflect === 'object' && Reflect.construct)
			) {
				try {
					Reflect.construct(n, []);
				}
				catch (a) {
					var r = a;
				}
				Reflect.construct(e, [], n);
			}
			else {
				try {
					n.call();
				}
				catch (a) {
					r = a;
				}
				e.call(n.prototype);
			}
		}
		else {
			try {
				throw Error();
			}
			catch (a) {
				r = a;
			}
			e();
		}
	}
	catch (a) {
		if (a && r && typeof a.stack === 'string') {
			for (
				var i = a.stack.split(`
`),
					l = r.stack.split(`
`),
					o = i.length - 1,
					u = l.length - 1;
				1 <= o && 0 <= u && i[o] !== l[u];

			) {
				u--;
			}
			for (; 1 <= o && 0 <= u; o--, u--) {
				if (i[o] !== l[u]) {
					if (o !== 1 || u !== 1) {
						do {
							if ((o--, u--, 0 > u || i[o] !== l[u])) {
								let s =
									`
` + i[o].replace(' at new ', ' at ');

								return (
									e.displayName &&
										s.includes('<anonymous>') &&
										(s = s.replace(
											'<anonymous>',
											e.displayName
										)),
									s
								);
							}
						} while (1 <= o && 0 <= u);
					}
					break;
				}
			}
		}
	}
	finally {
		(Zl = !1), (Error.prepareStackTrace = t);
	}

	return (e = e ? e.displayName || e.name : '') ? Ir(e) : '';
}
function Yh(e) {
	switch (e.tag) {
		case 5:
			return Ir(e.type);
		case 16:
			return Ir('Lazy');
		case 13:
			return Ir('Suspense');
		case 19:
			return Ir('SuspenseList');
		case 0:
		case 2:
		case 15:
			return (e = eo(e.type, !1)), e;
		case 11:
			return (e = eo(e.type.render, !1)), e;
		case 1:
			return (e = eo(e.type, !0)), e;
		default:
			return '';
	}
}
function Uo(e) {
	if (e == null) {
		return null;
	}
	if (typeof e === 'function') {
		return e.displayName || e.name || null;
	}
	if (typeof e === 'string') {
		return e;
	}
	switch (e) {
		case Ft:
			return 'Fragment';
		case At:
			return 'Portal';
		case Fo:
			return 'Profiler';
		case ns:
			return 'StrictMode';
		case jo:
			return 'Suspense';
		case Bo:
			return 'SuspenseList';
	}
	if (typeof e === 'object') {
		switch (e.$$typeof) {
			case Lf:
				return (e.displayName || 'Context') + '.Consumer';
			case zf:
				return (e._context.displayName || 'Context') + '.Provider';
			case ts:
				var n = e.render;

				return (
					(e = e.displayName),
					e ||
						((e = n.displayName || n.name || ''),
						(e =
							e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
					e
				);
			case rs:
				return (
					(n = e.displayName || null),
					n !== null ? n : Uo(e.type) || 'Memo'
				);
			case $n:
				(n = e._payload), (e = e._init);
				try {
					return Uo(e(n));
				}
				catch {}
		}
	}

	return null;
}
function Xh(e) {
	const n = e.type;
	switch (e.tag) {
		case 24:
			return 'Cache';
		case 9:
			return (n.displayName || 'Context') + '.Consumer';
		case 10:
			return (n._context.displayName || 'Context') + '.Provider';
		case 18:
			return 'DehydratedFragment';
		case 11:
			return (
				(e = n.render),
				(e = e.displayName || e.name || ''),
				n.displayName ||
					(e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
			);
		case 7:
			return 'Fragment';
		case 5:
			return n;
		case 4:
			return 'Portal';
		case 3:
			return 'Root';
		case 6:
			return 'Text';
		case 16:
			return Uo(n);
		case 8:
			return n === ns ? 'StrictMode' : 'Mode';
		case 22:
			return 'Offscreen';
		case 12:
			return 'Profiler';
		case 21:
			return 'Scope';
		case 13:
			return 'Suspense';
		case 19:
			return 'SuspenseList';
		case 25:
			return 'TracingMarker';
		case 1:
		case 0:
		case 17:
		case 2:
		case 14:
		case 15:
			if (typeof n === 'function') {
				return n.displayName || n.name || null;
			}
			if (typeof n === 'string') {
				return n;
			}
	}

	return null;
}
function it(e) {
	switch (typeof e) {
		case 'boolean':
		case 'number':
		case 'string':
		case 'undefined':
			return e;
		case 'object':
			return e;
		default:
			return '';
	}
}
function Of(e) {
	const n = e.type;

	return (
		(e = e.nodeName) &&
		e.toLowerCase() === 'input' &&
		(n === 'checkbox' || n === 'radio')
	);
}
function Gh(e) {
	const n = Of(e) ? 'checked' : 'value';
	const t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n);
	let r = '' + e[n];
	if (
		!e.hasOwnProperty(n) &&
		typeof t < 'u' &&
		typeof t.get === 'function' &&
		typeof t.set === 'function'
	) {
		const i = t.get;
		const l = t.set;

		return (
			Object.defineProperty(e, n, {
				configurable: !0,
				get() {
					return i.call(this);
				},
				set(o) {
					(r = '' + o), l.call(this, o);
				},
			}),
			Object.defineProperty(e, n, {enumerable: t.enumerable}),
			{
				getValue() {
					return r;
				},
				setValue(o) {
					r = '' + o;
				},
				stopTracking() {
					(e._valueTracker = null), delete e[n];
				},
			}
		);
	}
}
function Ei(e) {
	e._valueTracker || (e._valueTracker = Gh(e));
}
function Mf(e) {
	if (!e) {
		return !1;
	}
	const n = e._valueTracker;
	if (!n) {
		return !0;
	}
	const t = n.getValue();
	let r = '';

	return (
		e && (r = Of(e) ? (e.checked ? 'true' : 'false') : e.value),
		(e = r),
		e !== t ? (n.setValue(e), !0) : !1
	);
}
function rl(e) {
	if (
		((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')
	) {
		return null;
	}
	try {
		return e.activeElement || e.body;
	}
	catch {
		return e.body;
	}
}
function Ho(e, n) {
	const t = n.checked;

	return {
		...n,
		defaultChecked: void 0,
		defaultValue: void 0,
		value: void 0,
		checked: t ?? e._wrapperState.initialChecked,
	};
}
function ma(e, n) {
	let t = n.defaultValue == null ? '' : n.defaultValue;
	const r = n.checked != null ? n.checked : n.defaultChecked;
	(t = it(n.value != null ? n.value : t)),
		(e._wrapperState = {
			initialChecked: r,
			initialValue: t,
			controlled:
				n.type === 'checkbox' || n.type === 'radio'
					? n.checked != null
					: n.value != null,
		});
}
function Df(e, n) {
	(n = n.checked), n != null && es(e, 'checked', n, !1);
}
function Vo(e, n) {
	Df(e, n);
	const t = it(n.value);
	const r = n.type;
	if (t != null) {
		r === 'number'
			? ((t === 0 && e.value === '') || e.value != t) &&
				(e.value = '' + t)
			: e.value !== '' + t && (e.value = '' + t);
	}
	else if (r === 'submit' || r === 'reset') {
		e.removeAttribute('value');

		return;
	}
	n.hasOwnProperty('value')
		? $o(e, n.type, t)
		: n.hasOwnProperty('defaultValue') && $o(e, n.type, it(n.defaultValue)),
		n.checked == null &&
			n.defaultChecked != null &&
			(e.defaultChecked = !!n.defaultChecked);
}
function ga(e, n, t) {
	if (n.hasOwnProperty('value') || n.hasOwnProperty('defaultValue')) {
		const r = n.type;
		if (
			!(
				(r !== 'submit' && r !== 'reset') ||
				(n.value !== void 0 && n.value !== null)
			)
		) {
			return;
		}
		(n = '' + e._wrapperState.initialValue),
			t || n === e.value || (e.value = n),
			(e.defaultValue = n);
	}
	(t = e.name),
		t !== '' && (e.name = ''),
		(e.defaultChecked = !!e._wrapperState.initialChecked),
		t !== '' && (e.name = t);
}
function $o(e, n, t) {
	(n !== 'number' || rl(e.ownerDocument) !== e) &&
		(t == null
			? (e.defaultValue = '' + e._wrapperState.initialValue)
			: e.defaultValue !== '' + t && (e.defaultValue = '' + t));
}
const Nr = Array.isArray;
function Xt(e, n, t, r) {
	if (((e = e.options), n)) {
		n = {};
		for (var i = 0; i < t.length; i++) {
			n['$' + t[i]] = !0;
		}
		for (t = 0; t < e.length; t++) {
			(i = n.hasOwnProperty('$' + e[t].value)),
				e[t].selected !== i && (e[t].selected = i),
				i && r && (e[t].defaultSelected = !0);
		}
	}
	else {
		for (t = '' + it(t), n = null, i = 0; i < e.length; i++) {
			if (e[i].value === t) {
				(e[i].selected = !0), r && (e[i].defaultSelected = !0);

				return;
			}
			n !== null || e[i].disabled || (n = e[i]);
		}
		n !== null && (n.selected = !0);
	}
}
function Wo(e, n) {
	if (n.dangerouslySetInnerHTML != null) {
		throw Error(_(91));
	}

	return {
		...n,
		value: void 0,
		defaultValue: void 0,
		children: '' + e._wrapperState.initialValue,
	};
}
function ya(e, n) {
	let t = n.value;
	if (t == null) {
		if (((t = n.children), (n = n.defaultValue), t != null)) {
			if (n != null) {
				throw Error(_(92));
			}
			if (Nr(t)) {
				if (1 < t.length) {
					throw Error(_(93));
				}
				t = t[0];
			}
			n = t;
		}
		n == null && (n = ''), (t = n);
	}
	e._wrapperState = {initialValue: it(t)};
}
function Af(e, n) {
	let t = it(n.value);
	const r = it(n.defaultValue);
	t != null &&
		((t = '' + t),
		t !== e.value && (e.value = t),
		n.defaultValue == null && e.defaultValue !== t && (e.defaultValue = t)),
		r != null && (e.defaultValue = '' + r);
}
function va(e) {
	const n = e.textContent;
	n === e._wrapperState.initialValue &&
		n !== '' &&
		n !== null &&
		(e.value = n);
}
function Ff(e) {
	switch (e) {
		case 'svg':
			return 'http://www.w3.org/2000/svg';
		case 'math':
			return 'http://www.w3.org/1998/Math/MathML';
		default:
			return 'http://www.w3.org/1999/xhtml';
	}
}
function bo(e, n) {
	return e == null || e === 'http://www.w3.org/1999/xhtml'
		? Ff(n)
		: e === 'http://www.w3.org/2000/svg' && n === 'foreignObject'
			? 'http://www.w3.org/1999/xhtml'
			: e;
}
let Ci;
const jf = (function (e) {
	return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
		? function (n, t, r, i) {
				MSApp.execUnsafeLocalFunction(() => {
					return e(n, t, r, i);
				});
			}
		: e;
})((e, n) => {
	if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) {
		e.innerHTML = n;
	}
	else {
		for (
			Ci = Ci || document.createElement('div'),
				Ci.innerHTML = '<svg>' + n.valueOf().toString() + '</svg>',
				n = Ci.firstChild;
			e.firstChild;

		) {
			e.removeChild(e.firstChild);
		}
		for (; n.firstChild; ) {
			e.appendChild(n.firstChild);
		}
	}
});
function Gr(e, n) {
	if (n) {
		const t = e.firstChild;
		if (t && t === e.lastChild && t.nodeType === 3) {
			t.nodeValue = n;

			return;
		}
	}
	e.textContent = n;
}
const Mr = {
	animationIterationCount: !0,
	aspectRatio: !0,
	borderImageOutset: !0,
	borderImageSlice: !0,
	borderImageWidth: !0,
	boxFlex: !0,
	boxFlexGroup: !0,
	boxOrdinalGroup: !0,
	columnCount: !0,
	columns: !0,
	flex: !0,
	flexGrow: !0,
	flexPositive: !0,
	flexShrink: !0,
	flexNegative: !0,
	flexOrder: !0,
	gridArea: !0,
	gridRow: !0,
	gridRowEnd: !0,
	gridRowSpan: !0,
	gridRowStart: !0,
	gridColumn: !0,
	gridColumnEnd: !0,
	gridColumnSpan: !0,
	gridColumnStart: !0,
	fontWeight: !0,
	lineClamp: !0,
	lineHeight: !0,
	opacity: !0,
	order: !0,
	orphans: !0,
	tabSize: !0,
	widows: !0,
	zIndex: !0,
	zoom: !0,
	fillOpacity: !0,
	floodOpacity: !0,
	stopOpacity: !0,
	strokeDasharray: !0,
	strokeDashoffset: !0,
	strokeMiterlimit: !0,
	strokeOpacity: !0,
	strokeWidth: !0,
};
const qh = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(Mr).forEach((e) => {
	qh.forEach((n) => {
		(n = n + e.charAt(0).toUpperCase() + e.substring(1)), (Mr[n] = Mr[e]);
	});
});
function Bf(e, n, t) {
	return n == null || typeof n === 'boolean' || n === ''
		? ''
		: t ||
			  typeof n !== 'number' ||
			  n === 0 ||
			  (Mr.hasOwnProperty(e) && Mr[e])
			? ('' + n).trim()
			: n + 'px';
}
function Uf(e, n) {
	e = e.style;
	for (let t in n) {
		if (n.hasOwnProperty(t)) {
			const r = t.indexOf('--') === 0;
			const i = Bf(t, n[t], r);
			t === 'float' && (t = 'cssFloat'),
				r ? e.setProperty(t, i) : (e[t] = i);
		}
	}
}
const Jh = {
	menuitem: !0,
	area: !0,
	base: !0,
	br: !0,
	col: !0,
	embed: !0,
	hr: !0,
	img: !0,
	input: !0,
	keygen: !0,
	link: !0,
	meta: !0,
	param: !0,
	source: !0,
	track: !0,
	wbr: !0,
};
function Qo(e, n) {
	if (n) {
		if (
			Jh[e] &&
			(n.children != null || n.dangerouslySetInnerHTML != null)
		) {
			throw Error(_(137, e));
		}
		if (n.dangerouslySetInnerHTML != null) {
			if (n.children != null) {
				throw Error(_(60));
			}
			if (
				typeof n.dangerouslySetInnerHTML !== 'object' ||
				!('__html' in n.dangerouslySetInnerHTML)
			) {
				throw Error(_(61));
			}
		}
		if (n.style != null && typeof n.style !== 'object') {
			throw Error(_(62));
		}
	}
}
function Ko(e, n) {
	if (e.indexOf('-') === -1) {
		return typeof n.is === 'string';
	}
	switch (e) {
		case 'annotation-xml':
		case 'color-profile':
		case 'font-face':
		case 'font-face-src':
		case 'font-face-uri':
		case 'font-face-format':
		case 'font-face-name':
		case 'missing-glyph':
			return !1;
		default:
			return !0;
	}
}
let Yo = null;
function is(e) {
	return (
		(e = e.target || e.srcElement || window),
		e.correspondingUseElement && (e = e.correspondingUseElement),
		e.nodeType === 3 ? e.parentNode : e
	);
}
let Xo = null;
let Gt = null;
let qt = null;
function ka(e) {
	if ((e = gi(e))) {
		if (typeof Xo !== 'function') {
			throw Error(_(280));
		}
		let n = e.stateNode;
		n && ((n = Dl(n)), Xo(e.stateNode, e.type, n));
	}
}
function Hf(e) {
	Gt ? (qt ? qt.push(e) : (qt = [e])) : (Gt = e);
}
function Vf() {
	if (Gt) {
		let e = Gt;
		const n = qt;
		if (((qt = Gt = null), ka(e), n)) {
			for (e = 0; e < n.length; e++) {
				ka(n[e]);
			}
		}
	}
}
function $f(e, n) {
	return e(n);
}
function Wf() {}
let no = !1;
function bf(e, n, t) {
	if (no) {
		return e(n, t);
	}
	no = !0;
	try {
		return $f(e, n, t);
	}
	finally {
		(no = !1), (Gt !== null || qt !== null) && (Wf(), Vf());
	}
}
function qr(e, n) {
	let t = e.stateNode;
	if (t === null) {
		return null;
	}
	let r = Dl(t);
	if (r === null) {
		return null;
	}
	t = r[n];
	e: switch (n) {
		case 'onClick':
		case 'onClickCapture':
		case 'onDoubleClick':
		case 'onDoubleClickCapture':
		case 'onMouseDown':
		case 'onMouseDownCapture':
		case 'onMouseMove':
		case 'onMouseMoveCapture':
		case 'onMouseUp':
		case 'onMouseUpCapture':
		case 'onMouseEnter':
			(r = !r.disabled) ||
				((e = e.type),
				(r = !(
					e === 'button' ||
					e === 'input' ||
					e === 'select' ||
					e === 'textarea'
				))),
				(e = !r);
			break e;
		default:
			e = !1;
	}
	if (e) {
		return null;
	}
	if (t && typeof t !== 'function') {
		throw Error(_(231, n, typeof t));
	}

	return t;
}
let Go = !1;
if (Dn) {
	try {
		const kr = {};
		Object.defineProperty(kr, 'passive', {
			get() {
				Go = !0;
			},
		}),
			window.addEventListener('test', kr, kr),
			window.removeEventListener('test', kr, kr);
	}
	catch {
		Go = !1;
	}
}
function Zh(e, n, t, r, i, l, o, u, s) {
	const a = Array.prototype.slice.call(arguments, 3);
	try {
		n.apply(t, a);
	}
	catch (c) {
		this.onError(c);
	}
}
let Dr = !1;
let il = null;
let ll = !1;
let qo = null;
const em = {
	onError(e) {
		(Dr = !0), (il = e);
	},
};
function nm(e, n, t, r, i, l, o, u, s) {
	(Dr = !1), (il = null), Zh.apply(em, arguments);
}
function tm(e, n, t, r, i, l, o, u, s) {
	if ((nm.apply(this, arguments), Dr)) {
		if (Dr) {
			var a = il;
			(Dr = !1), (il = null);
		}
		else {
			throw Error(_(198));
		}
		ll || ((ll = !0), (qo = a));
	}
}
function Pt(e) {
	let n = e;
	let t = e;
	if (e.alternate) {
		for (; n.return; ) {
			n = n.return;
		}
	}
	else {
		e = n;
		do {
			(n = e), n.flags & 4098 && (t = n.return), (e = n.return);
		} while (e);
	}

	return n.tag === 3 ? t : null;
}
function Qf(e) {
	if (e.tag === 13) {
		let n = e.memoizedState;
		if (
			(n === null &&
				((e = e.alternate), e !== null && (n = e.memoizedState)),
			n !== null)
		) {
			return n.dehydrated;
		}
	}

	return null;
}
function xa(e) {
	if (Pt(e) !== e) {
		throw Error(_(188));
	}
}
function rm(e) {
	let n = e.alternate;
	if (!n) {
		if (((n = Pt(e)), n === null)) {
			throw Error(_(188));
		}

		return n !== e ? null : e;
	}
	for (var t = e, r = n; ; ) {
		const i = t.return;
		if (i === null) {
			break;
		}
		let l = i.alternate;
		if (l === null) {
			if (((r = i.return), r !== null)) {
				t = r;
				continue;
			}
			break;
		}
		if (i.child === l.child) {
			for (l = i.child; l; ) {
				if (l === t) {
					return xa(i), e;
				}
				if (l === r) {
					return xa(i), n;
				}
				l = l.sibling;
			}
			throw Error(_(188));
		}
		if (t.return !== r.return) {
			(t = i), (r = l);
		}
		else {
			for (var o = !1, u = i.child; u; ) {
				if (u === t) {
					(o = !0), (t = i), (r = l);
					break;
				}
				if (u === r) {
					(o = !0), (r = i), (t = l);
					break;
				}
				u = u.sibling;
			}
			if (!o) {
				for (u = l.child; u; ) {
					if (u === t) {
						(o = !0), (t = l), (r = i);
						break;
					}
					if (u === r) {
						(o = !0), (r = l), (t = i);
						break;
					}
					u = u.sibling;
				}
				if (!o) {
					throw Error(_(189));
				}
			}
		}
		if (t.alternate !== r) {
			throw Error(_(190));
		}
	}
	if (t.tag !== 3) {
		throw Error(_(188));
	}

	return t.stateNode.current === t ? e : n;
}
function Kf(e) {
	return (e = rm(e)), e !== null ? Yf(e) : null;
}
function Yf(e) {
	if (e.tag === 5 || e.tag === 6) {
		return e;
	}
	for (e = e.child; e !== null; ) {
		const n = Yf(e);
		if (n !== null) {
			return n;
		}
		e = e.sibling;
	}

	return null;
}
const Xf = qe.unstable_scheduleCallback;
const wa = qe.unstable_cancelCallback;
const im = qe.unstable_shouldYield;
const lm = qe.unstable_requestPaint;
const he = qe.unstable_now;
const om = qe.unstable_getCurrentPriorityLevel;
const ls = qe.unstable_ImmediatePriority;
const Gf = qe.unstable_UserBlockingPriority;
const ol = qe.unstable_NormalPriority;
const um = qe.unstable_LowPriority;
const qf = qe.unstable_IdlePriority;
let Ll = null;
let Cn = null;
function sm(e) {
	if (Cn && typeof Cn.onCommitFiberRoot === 'function') {
		try {
			Cn.onCommitFiberRoot(
				Ll,
				e,
				void 0,
				(e.current.flags & 128) === 128
			);
		}
		catch {}
	}
}
const mn = Math.clz32 ? Math.clz32 : fm;
const am = Math.log;
const cm = Math.LN2;
function fm(e) {
	return (e >>>= 0), e === 0 ? 32 : (31 - ((am(e) / cm) | 0)) | 0;
}
let _i = 64;
let Pi = 4194304;
function zr(e) {
	switch (e & -e) {
		case 1:
			return 1;
		case 2:
			return 2;
		case 4:
			return 4;
		case 8:
			return 8;
		case 16:
			return 16;
		case 32:
			return 32;
		case 64:
		case 128:
		case 256:
		case 512:
		case 1024:
		case 2048:
		case 4096:
		case 8192:
		case 16384:
		case 32768:
		case 65536:
		case 131072:
		case 262144:
		case 524288:
		case 1048576:
		case 2097152:
			return e & 4194240;
		case 4194304:
		case 8388608:
		case 16777216:
		case 33554432:
		case 67108864:
			return e & 130023424;
		case 134217728:
			return 134217728;
		case 268435456:
			return 268435456;
		case 536870912:
			return 536870912;
		case 1073741824:
			return 1073741824;
		default:
			return e;
	}
}
function ul(e, n) {
	let t = e.pendingLanes;
	if (t === 0) {
		return 0;
	}
	let r = 0;
	let i = e.suspendedLanes;
	let l = e.pingedLanes;
	let o = t & 268435455;
	if (o !== 0) {
		const u = o & ~i;
		u !== 0 ? (r = zr(u)) : ((l &= o), l !== 0 && (r = zr(l)));
	}
	else {
		(o = t & ~i), o !== 0 ? (r = zr(o)) : l !== 0 && (r = zr(l));
	}
	if (r === 0) {
		return 0;
	}
	if (
		n !== 0 &&
		n !== r &&
		!(n & i) &&
		((i = r & -r),
		(l = n & -n),
		i >= l || (i === 16 && (l & 4194240) !== 0))
	) {
		return n;
	}
	if ((r & 4 && (r |= t & 16), (n = e.entangledLanes), n !== 0)) {
		for (e = e.entanglements, n &= r; 0 < n; ) {
			(t = 31 - mn(n)), (i = 1 << t), (r |= e[t]), (n &= ~i);
		}
	}

	return r;
}
function pm(e, n) {
	switch (e) {
		case 1:
		case 2:
		case 4:
			return n + 250;
		case 8:
		case 16:
		case 32:
		case 64:
		case 128:
		case 256:
		case 512:
		case 1024:
		case 2048:
		case 4096:
		case 8192:
		case 16384:
		case 32768:
		case 65536:
		case 131072:
		case 262144:
		case 524288:
		case 1048576:
		case 2097152:
			return n + 5e3;
		case 4194304:
		case 8388608:
		case 16777216:
		case 33554432:
		case 67108864:
			return -1;
		case 134217728:
		case 268435456:
		case 536870912:
		case 1073741824:
			return -1;
		default:
			return -1;
	}
}
function dm(e, n) {
	for (
		let t = e.suspendedLanes,
			r = e.pingedLanes,
			i = e.expirationTimes,
			l = e.pendingLanes;
		0 < l;

	) {
		const o = 31 - mn(l);
		const u = 1 << o;
		const s = i[o];
		s === -1
			? (!(u & t) || u & r) && (i[o] = pm(u, n))
			: s <= n && (e.expiredLanes |= u),
			(l &= ~u);
	}
}
function Jo(e) {
	return (
		(e = e.pendingLanes & -1073741825),
		e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
	);
}
function Jf() {
	const e = _i;

	return (_i <<= 1), !(_i & 4194240) && (_i = 64), e;
}
function to(e) {
	for (var n = [], t = 0; 31 > t; t++) {
		n.push(e);
	}

	return n;
}
function hi(e, n, t) {
	(e.pendingLanes |= n),
		n !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
		(e = e.eventTimes),
		(n = 31 - mn(n)),
		(e[n] = t);
}
function hm(e, n) {
	let t = e.pendingLanes & ~n;
	(e.pendingLanes = n),
		(e.suspendedLanes = 0),
		(e.pingedLanes = 0),
		(e.expiredLanes &= n),
		(e.mutableReadLanes &= n),
		(e.entangledLanes &= n),
		(n = e.entanglements);
	const r = e.eventTimes;
	for (e = e.expirationTimes; 0 < t; ) {
		const i = 31 - mn(t);
		const l = 1 << i;
		(n[i] = 0), (r[i] = -1), (e[i] = -1), (t &= ~l);
	}
}
function os(e, n) {
	let t = (e.entangledLanes |= n);
	for (e = e.entanglements; t; ) {
		const r = 31 - mn(t);
		const i = 1 << r;
		(i & n) | (e[r] & n) && (e[r] |= n), (t &= ~i);
	}
}
let G = 0;
function Zf(e) {
	return (
		(e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
	);
}
let ep;
let us;
let np;
let tp;
let rp;
let Zo = !1;
const Ti = [];
let Gn = null;
let qn = null;
let Jn = null;
const Jr = new Map();
const Zr = new Map();
const bn = [];
const mm =
	'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
		' '
	);
function Sa(e, n) {
	switch (e) {
		case 'focusin':
		case 'focusout':
			Gn = null;
			break;
		case 'dragenter':
		case 'dragleave':
			qn = null;
			break;
		case 'mouseover':
		case 'mouseout':
			Jn = null;
			break;
		case 'pointerover':
		case 'pointerout':
			Jr.delete(n.pointerId);
			break;
		case 'gotpointercapture':
		case 'lostpointercapture':
			Zr.delete(n.pointerId);
	}
}
function xr(e, n, t, r, i, l) {
	return e === null || e.nativeEvent !== l
		? ((e = {
				blockedOn: n,
				domEventName: t,
				eventSystemFlags: r,
				nativeEvent: l,
				targetContainers: [i],
			}),
			n !== null && ((n = gi(n)), n !== null && us(n)),
			e)
		: ((e.eventSystemFlags |= r),
			(n = e.targetContainers),
			i !== null && n.indexOf(i) === -1 && n.push(i),
			e);
}
function gm(e, n, t, r, i) {
	switch (n) {
		case 'focusin':
			return (Gn = xr(Gn, e, n, t, r, i)), !0;
		case 'dragenter':
			return (qn = xr(qn, e, n, t, r, i)), !0;
		case 'mouseover':
			return (Jn = xr(Jn, e, n, t, r, i)), !0;
		case 'pointerover':
			var l = i.pointerId;

			return Jr.set(l, xr(Jr.get(l) || null, e, n, t, r, i)), !0;
		case 'gotpointercapture':
			return (
				(l = i.pointerId),
				Zr.set(l, xr(Zr.get(l) || null, e, n, t, r, i)),
				!0
			);
	}

	return !1;
}
function ip(e) {
	let n = mt(e.target);
	if (n !== null) {
		const t = Pt(n);
		if (t !== null) {
			if (((n = t.tag), n === 13)) {
				if (((n = Qf(t)), n !== null)) {
					(e.blockedOn = n),
						rp(e.priority, () => {
							np(t);
						});

					return;
				}
			}
			else if (
				n === 3 &&
				t.stateNode.current.memoizedState.isDehydrated
			) {
				e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;

				return;
			}
		}
	}
	e.blockedOn = null;
}
function $i(e) {
	if (e.blockedOn !== null) {
		return !1;
	}
	for (let n = e.targetContainers; n.length; ) {
		let t = eu(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
		if (t === null) {
			t = e.nativeEvent;
			const r = new t.constructor(t.type, t);
			(Yo = r), t.target.dispatchEvent(r), (Yo = null);
		}
		else {
			return (n = gi(t)), n !== null && us(n), (e.blockedOn = t), !1;
		}
		n.shift();
	}

	return !0;
}
function Ea(e, n, t) {
	$i(e) && t.delete(n);
}
function ym() {
	(Zo = !1),
		Gn !== null && $i(Gn) && (Gn = null),
		qn !== null && $i(qn) && (qn = null),
		Jn !== null && $i(Jn) && (Jn = null),
		Jr.forEach(Ea),
		Zr.forEach(Ea);
}
function wr(e, n) {
	e.blockedOn === n &&
		((e.blockedOn = null),
		Zo ||
			((Zo = !0),
			qe.unstable_scheduleCallback(qe.unstable_NormalPriority, ym)));
}
function ei(e) {
	function n(i) {
		return wr(i, e);
	}
	if (Ti.length) {
		wr(Ti[0], e);
		for (var t = 1; t < Ti.length; t++) {
			var r = Ti[t];
			r.blockedOn === e && (r.blockedOn = null);
		}
	}
	for (
		Gn !== null && wr(Gn, e),
			qn !== null && wr(qn, e),
			Jn !== null && wr(Jn, e),
			Jr.forEach(n),
			Zr.forEach(n),
			t = 0;
		t < bn.length;
		t++
	) {
		(r = bn[t]), r.blockedOn === e && (r.blockedOn = null);
	}
	for (; !!bn.length && ((t = bn[0]), t.blockedOn === null); ) {
		ip(t), t.blockedOn === null && bn.shift();
	}
}
const Jt = Bn.ReactCurrentBatchConfig;
let sl = !0;
function vm(e, n, t, r) {
	const i = G;
	const l = Jt.transition;
	Jt.transition = null;
	try {
		(G = 1), ss(e, n, t, r);
	}
	finally {
		(G = i), (Jt.transition = l);
	}
}
function km(e, n, t, r) {
	const i = G;
	const l = Jt.transition;
	Jt.transition = null;
	try {
		(G = 4), ss(e, n, t, r);
	}
	finally {
		(G = i), (Jt.transition = l);
	}
}
function ss(e, n, t, r) {
	if (sl) {
		let i = eu(e, n, t, r);
		if (i === null) {
			po(e, n, r, al, t), Sa(e, r);
		}
		else if (gm(i, e, n, t, r)) {
			r.stopPropagation();
		}
		else if ((Sa(e, r), n & 4 && -1 < mm.indexOf(e))) {
			for (; i !== null; ) {
				let l = gi(i);
				if (
					(l !== null && ep(l),
					(l = eu(e, n, t, r)),
					l === null && po(e, n, r, al, t),
					l === i)
				) {
					break;
				}
				i = l;
			}
			i !== null && r.stopPropagation();
		}
		else {
			po(e, n, r, null, t);
		}
	}
}
var al = null;
function eu(e, n, t, r) {
	if (((al = null), (e = is(r)), (e = mt(e)), e !== null)) {
		if (((n = Pt(e)), n === null)) {
			e = null;
		}
		else if (((t = n.tag), t === 13)) {
			if (((e = Qf(n)), e !== null)) {
				return e;
			}
			e = null;
		}
		else if (t === 3) {
			if (n.stateNode.current.memoizedState.isDehydrated) {
				return n.tag === 3 ? n.stateNode.containerInfo : null;
			}
			e = null;
		}
		else {
			n !== e && (e = null);
		}
	}

	return (al = e), null;
}
function lp(e) {
	switch (e) {
		case 'cancel':
		case 'click':
		case 'close':
		case 'contextmenu':
		case 'copy':
		case 'cut':
		case 'auxclick':
		case 'dblclick':
		case 'dragend':
		case 'dragstart':
		case 'drop':
		case 'focusin':
		case 'focusout':
		case 'input':
		case 'invalid':
		case 'keydown':
		case 'keypress':
		case 'keyup':
		case 'mousedown':
		case 'mouseup':
		case 'paste':
		case 'pause':
		case 'play':
		case 'pointercancel':
		case 'pointerdown':
		case 'pointerup':
		case 'ratechange':
		case 'reset':
		case 'resize':
		case 'seeked':
		case 'submit':
		case 'touchcancel':
		case 'touchend':
		case 'touchstart':
		case 'volumechange':
		case 'change':
		case 'selectionchange':
		case 'textInput':
		case 'compositionstart':
		case 'compositionend':
		case 'compositionupdate':
		case 'beforeblur':
		case 'afterblur':
		case 'beforeinput':
		case 'blur':
		case 'fullscreenchange':
		case 'focus':
		case 'hashchange':
		case 'popstate':
		case 'select':
		case 'selectstart':
			return 1;
		case 'drag':
		case 'dragenter':
		case 'dragexit':
		case 'dragleave':
		case 'dragover':
		case 'mousemove':
		case 'mouseout':
		case 'mouseover':
		case 'pointermove':
		case 'pointerout':
		case 'pointerover':
		case 'scroll':
		case 'toggle':
		case 'touchmove':
		case 'wheel':
		case 'mouseenter':
		case 'mouseleave':
		case 'pointerenter':
		case 'pointerleave':
			return 4;
		case 'message':
			switch (om()) {
				case ls:
					return 1;
				case Gf:
					return 4;
				case ol:
				case um:
					return 16;
				case qf:
					return 536870912;
				default:
					return 16;
			}
		default:
			return 16;
	}
}
let Yn = null;
let as = null;
let Wi = null;
function op() {
	if (Wi) {
		return Wi;
	}
	let e;
	const n = as;
	const t = n.length;
	let r;
	const i = 'value' in Yn ? Yn.value : Yn.textContent;
	const l = i.length;
	for (e = 0; e < t && n[e] === i[e]; e++) {}
	const o = t - e;
	for (r = 1; r <= o && n[t - r] === i[l - r]; r++) {}

	return (Wi = i.slice(e, 1 < r ? 1 - r : void 0));
}
function bi(e) {
	const n = e.keyCode;

	return (
		'charCode' in e
			? ((e = e.charCode), e === 0 && n === 13 && (e = 13))
			: (e = n),
		e === 10 && (e = 13),
		32 <= e || e === 13 ? e : 0
	);
}
function Ii() {
	return !0;
}
function Ca() {
	return !1;
}
function Ze(e) {
	function n(t, r, i, l, o) {
		(this._reactName = t),
			(this._targetInst = i),
			(this.type = r),
			(this.nativeEvent = l),
			(this.target = o),
			(this.currentTarget = null);
		for (const u in e) {
			e.hasOwnProperty(u) && ((t = e[u]), (this[u] = t ? t(l) : l[u]));
		}

		return (
			(this.isDefaultPrevented = (
				l.defaultPrevented != null
					? l.defaultPrevented
					: l.returnValue === !1
			)
				? Ii
				: Ca),
			(this.isPropagationStopped = Ca),
			this
		);
	}

	return (
		ce(n.prototype, {
			preventDefault() {
				this.defaultPrevented = !0;
				const t = this.nativeEvent;
				t &&
					(t.preventDefault
						? t.preventDefault()
						: typeof t.returnValue !== 'unknown' &&
							(t.returnValue = !1),
					(this.isDefaultPrevented = Ii));
			},
			stopPropagation() {
				const t = this.nativeEvent;
				t &&
					(t.stopPropagation
						? t.stopPropagation()
						: typeof t.cancelBubble !== 'unknown' &&
							(t.cancelBubble = !0),
					(this.isPropagationStopped = Ii));
			},
			persist() {},
			isPersistent: Ii,
		}),
		n
	);
}
const pr = {
	eventPhase: 0,
	bubbles: 0,
	cancelable: 0,
	timeStamp(e) {
		return e.timeStamp || Date.now();
	},
	defaultPrevented: 0,
	isTrusted: 0,
};
const cs = Ze(pr);
const mi = {...pr, view: 0, detail: 0};
const xm = Ze(mi);
let ro;
let io;
let Sr;
const Rl = {
	...mi,
	screenX: 0,
	screenY: 0,
	clientX: 0,
	clientY: 0,
	pageX: 0,
	pageY: 0,
	ctrlKey: 0,
	shiftKey: 0,
	altKey: 0,
	metaKey: 0,
	getModifierState: fs,
	button: 0,
	buttons: 0,
	relatedTarget(e) {
		return e.relatedTarget === void 0
			? e.fromElement === e.srcElement
				? e.toElement
				: e.fromElement
			: e.relatedTarget;
	},
	movementX(e) {
		return 'movementX' in e
			? e.movementX
			: (e !== Sr &&
					(Sr && e.type === 'mousemove'
						? ((ro = e.screenX - Sr.screenX),
							(io = e.screenY - Sr.screenY))
						: (io = ro = 0),
					(Sr = e)),
				ro);
	},
	movementY(e) {
		return 'movementY' in e ? e.movementY : io;
	},
};
const _a = Ze(Rl);
const wm = {...Rl, dataTransfer: 0};
const Sm = Ze(wm);
const Em = {...mi, relatedTarget: 0};
const lo = Ze(Em);
const Cm = {...pr, animationName: 0, elapsedTime: 0, pseudoElement: 0};
const _m = Ze(Cm);
const Pm = {
	...pr,
	clipboardData(e) {
		return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
	},
};
const Tm = Ze(Pm);
const Im = {...pr, data: 0};
const Pa = Ze(Im);
const Nm = {
	Esc: 'Escape',
	Spacebar: ' ',
	Left: 'ArrowLeft',
	Up: 'ArrowUp',
	Right: 'ArrowRight',
	Down: 'ArrowDown',
	Del: 'Delete',
	Win: 'OS',
	Menu: 'ContextMenu',
	Apps: 'ContextMenu',
	Scroll: 'ScrollLock',
	MozPrintableKey: 'Unidentified',
};
const zm = {
	8: 'Backspace',
	9: 'Tab',
	12: 'Clear',
	13: 'Enter',
	16: 'Shift',
	17: 'Control',
	18: 'Alt',
	19: 'Pause',
	20: 'CapsLock',
	27: 'Escape',
	32: ' ',
	33: 'PageUp',
	34: 'PageDown',
	35: 'End',
	36: 'Home',
	37: 'ArrowLeft',
	38: 'ArrowUp',
	39: 'ArrowRight',
	40: 'ArrowDown',
	45: 'Insert',
	46: 'Delete',
	112: 'F1',
	113: 'F2',
	114: 'F3',
	115: 'F4',
	116: 'F5',
	117: 'F6',
	118: 'F7',
	119: 'F8',
	120: 'F9',
	121: 'F10',
	122: 'F11',
	123: 'F12',
	144: 'NumLock',
	145: 'ScrollLock',
	224: 'Meta',
};
const Lm = {
	Alt: 'altKey',
	Control: 'ctrlKey',
	Meta: 'metaKey',
	Shift: 'shiftKey',
};
function Rm(e) {
	const n = this.nativeEvent;

	return n.getModifierState
		? n.getModifierState(e)
		: (e = Lm[e])
			? !!n[e]
			: !1;
}
function fs() {
	return Rm;
}
const Om = {
	...mi,
	key(e) {
		if (e.key) {
			const n = Nm[e.key] || e.key;
			if (n !== 'Unidentified') {
				return n;
			}
		}

		return e.type === 'keypress'
			? ((e = bi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
			: e.type === 'keydown' || e.type === 'keyup'
				? zm[e.keyCode] || 'Unidentified'
				: '';
	},
	code: 0,
	location: 0,
	ctrlKey: 0,
	shiftKey: 0,
	altKey: 0,
	metaKey: 0,
	repeat: 0,
	locale: 0,
	getModifierState: fs,
	charCode(e) {
		return e.type === 'keypress' ? bi(e) : 0;
	},
	keyCode(e) {
		return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
	},
	which(e) {
		return e.type === 'keypress'
			? bi(e)
			: e.type === 'keydown' || e.type === 'keyup'
				? e.keyCode
				: 0;
	},
};
const Mm = Ze(Om);
const Dm = {
	...Rl,
	pointerId: 0,
	width: 0,
	height: 0,
	pressure: 0,
	tangentialPressure: 0,
	tiltX: 0,
	tiltY: 0,
	twist: 0,
	pointerType: 0,
	isPrimary: 0,
};
const Ta = Ze(Dm);
const Am = {
	...mi,
	touches: 0,
	targetTouches: 0,
	changedTouches: 0,
	altKey: 0,
	metaKey: 0,
	ctrlKey: 0,
	shiftKey: 0,
	getModifierState: fs,
};
const Fm = Ze(Am);
const jm = {...pr, propertyName: 0, elapsedTime: 0, pseudoElement: 0};
const Bm = Ze(jm);
const Um = {
	...Rl,
	deltaX(e) {
		return 'deltaX' in e
			? e.deltaX
			: 'wheelDeltaX' in e
				? -e.wheelDeltaX
				: 0;
	},
	deltaY(e) {
		return 'deltaY' in e
			? e.deltaY
			: 'wheelDeltaY' in e
				? -e.wheelDeltaY
				: 'wheelDelta' in e
					? -e.wheelDelta
					: 0;
	},
	deltaZ: 0,
	deltaMode: 0,
};
const Hm = Ze(Um);
const Vm = [9, 13, 27, 32];
const ps = Dn && 'CompositionEvent' in window;
let Ar = null;
Dn && 'documentMode' in document && (Ar = document.documentMode);
const $m = Dn && 'TextEvent' in window && !Ar;
const up = Dn && (!ps || (Ar && 8 < Ar && 11 >= Ar));
const Ia = ' ';
let Na = !1;
function sp(e, n) {
	switch (e) {
		case 'keyup':
			return Vm.indexOf(n.keyCode) !== -1;
		case 'keydown':
			return n.keyCode !== 229;
		case 'keypress':
		case 'mousedown':
		case 'focusout':
			return !0;
		default:
			return !1;
	}
}
function ap(e) {
	return (e = e.detail), typeof e === 'object' && 'data' in e ? e.data : null;
}
let jt = !1;
function Wm(e, n) {
	switch (e) {
		case 'compositionend':
			return ap(n);
		case 'keypress':
			return n.which !== 32 ? null : ((Na = !0), Ia);
		case 'textInput':
			return (e = n.data), e === Ia && Na ? null : e;
		default:
			return null;
	}
}
function bm(e, n) {
	if (jt) {
		return e === 'compositionend' || (!ps && sp(e, n))
			? ((e = op()), (Wi = as = Yn = null), (jt = !1), e)
			: null;
	}
	switch (e) {
		case 'paste':
			return null;
		case 'keypress':
			if (
				!(n.ctrlKey || n.altKey || n.metaKey) ||
				(n.ctrlKey && n.altKey)
			) {
				if (n.char && 1 < n.char.length) {
					return n.char;
				}
				if (n.which) {
					return String.fromCharCode(n.which);
				}
			}

			return null;
		case 'compositionend':
			return up && n.locale !== 'ko' ? null : n.data;
		default:
			return null;
	}
}
const Qm = {
	'color': !0,
	'date': !0,
	'datetime': !0,
	'datetime-local': !0,
	'email': !0,
	'month': !0,
	'number': !0,
	'password': !0,
	'range': !0,
	'search': !0,
	'tel': !0,
	'text': !0,
	'time': !0,
	'url': !0,
	'week': !0,
};
function za(e) {
	const n = e && e.nodeName && e.nodeName.toLowerCase();

	return n === 'input' ? !!Qm[e.type] : n === 'textarea';
}
function cp(e, n, t, r) {
	Hf(r),
		(n = cl(n, 'onChange')),
		!!n.length &&
			((t = new cs('onChange', 'change', null, t, r)),
			e.push({event: t, listeners: n}));
}
let Fr = null;
let ni = null;
function Km(e) {
	wp(e, 0);
}
function Ol(e) {
	const n = Ht(e);
	if (Mf(n)) {
		return e;
	}
}
function Ym(e, n) {
	if (e === 'change') {
		return n;
	}
}
let fp = !1;
if (Dn) {
	let oo;
	if (Dn) {
		let uo = 'oninput' in document;
		if (!uo) {
			const La = document.createElement('div');
			La.setAttribute('oninput', 'return;'),
				(uo = typeof La.oninput === 'function');
		}
		oo = uo;
	}
	else {
		oo = !1;
	}
	fp = oo && (!document.documentMode || 9 < document.documentMode);
}
function Ra() {
	Fr && (Fr.detachEvent('onpropertychange', pp), (ni = Fr = null));
}
function pp(e) {
	if (e.propertyName === 'value' && Ol(ni)) {
		const n = [];
		cp(n, ni, e, is(e)), bf(Km, n);
	}
}
function Xm(e, n, t) {
	e === 'focusin'
		? (Ra(), (Fr = n), (ni = t), Fr.attachEvent('onpropertychange', pp))
		: e === 'focusout' && Ra();
}
function Gm(e) {
	if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') {
		return Ol(ni);
	}
}
function qm(e, n) {
	if (e === 'click') {
		return Ol(n);
	}
}
function Jm(e, n) {
	if (e === 'input' || e === 'change') {
		return Ol(n);
	}
}
function Zm(e, n) {
	return (e === n && (e !== 0 || 1 / e === 1 / n)) || (e !== e && n !== n);
}
const yn = typeof Object.is === 'function' ? Object.is : Zm;
function ti(e, n) {
	if (yn(e, n)) {
		return !0;
	}
	if (
		typeof e !== 'object' ||
		e === null ||
		typeof n !== 'object' ||
		n === null
	) {
		return !1;
	}
	const t = Object.keys(e);
	let r = Object.keys(n);
	if (t.length !== r.length) {
		return !1;
	}
	for (r = 0; r < t.length; r++) {
		const i = t[r];
		if (!Ao.call(n, i) || !yn(e[i], n[i])) {
			return !1;
		}
	}

	return !0;
}
function Oa(e) {
	for (; e && e.firstChild; ) {
		e = e.firstChild;
	}

	return e;
}
function Ma(e, n) {
	let t = Oa(e);
	e = 0;
	for (var r; t; ) {
		if (t.nodeType === 3) {
			if (((r = e + t.textContent.length), e <= n && r >= n)) {
				return {node: t, offset: n - e};
			}
			e = r;
		}
		e: {
			for (; t; ) {
				if (t.nextSibling) {
					t = t.nextSibling;
					break e;
				}
				t = t.parentNode;
			}
			t = void 0;
		}
		t = Oa(t);
	}
}
function dp(e, n) {
	return e && n
		? e === n
			? !0
			: e && e.nodeType === 3
				? !1
				: n && n.nodeType === 3
					? dp(e, n.parentNode)
					: 'contains' in e
						? e.contains(n)
						: e.compareDocumentPosition
							? !!(e.compareDocumentPosition(n) & 16)
							: !1
		: !1;
}
function hp() {
	for (var e = window, n = rl(); n instanceof e.HTMLIFrameElement; ) {
		try {
			var t = typeof n.contentWindow.location.href === 'string';
		}
		catch {
			t = !1;
		}
		if (t) {
			e = n.contentWindow;
		}
		else {
			break;
		}
		n = rl(e.document);
	}

	return n;
}
function ds(e) {
	const n = e && e.nodeName && e.nodeName.toLowerCase();

	return (
		n &&
		((n === 'input' &&
			(e.type === 'text' ||
				e.type === 'search' ||
				e.type === 'tel' ||
				e.type === 'url' ||
				e.type === 'password')) ||
			n === 'textarea' ||
			e.contentEditable === 'true')
	);
}
function eg(e) {
	let n = hp();
	let t = e.focusedElem;
	let r = e.selectionRange;
	if (
		n !== t &&
		t &&
		t.ownerDocument &&
		dp(t.ownerDocument.documentElement, t)
	) {
		if (r !== null && ds(t)) {
			if (
				((n = r.start),
				(e = r.end),
				e === void 0 && (e = n),
				'selectionStart' in t)
			) {
				(t.selectionStart = n),
					(t.selectionEnd = Math.min(e, t.value.length));
			}
			else if (
				((e =
					((n = t.ownerDocument || document) && n.defaultView) ||
					window),
				e.getSelection)
			) {
				e = e.getSelection();
				let i = t.textContent.length;
				let l = Math.min(r.start, i);
				(r = r.end === void 0 ? l : Math.min(r.end, i)),
					!e.extend && l > r && ((i = r), (r = l), (l = i)),
					(i = Ma(t, l));
				const o = Ma(t, r);
				i &&
					o &&
					(e.rangeCount !== 1 ||
						e.anchorNode !== i.node ||
						e.anchorOffset !== i.offset ||
						e.focusNode !== o.node ||
						e.focusOffset !== o.offset) &&
					((n = n.createRange()),
					n.setStart(i.node, i.offset),
					e.removeAllRanges(),
					l > r
						? (e.addRange(n), e.extend(o.node, o.offset))
						: (n.setEnd(o.node, o.offset), e.addRange(n)));
			}
		}
		for (n = [], e = t; (e = e.parentNode); ) {
			e.nodeType === 1 &&
				n.push({element: e, left: e.scrollLeft, top: e.scrollTop});
		}
		for (
			typeof t.focus === 'function' && t.focus(), t = 0;
			t < n.length;
			t++
		) {
			(e = n[t]),
				(e.element.scrollLeft = e.left),
				(e.element.scrollTop = e.top);
		}
	}
}
const ng = Dn && 'documentMode' in document && 11 >= document.documentMode;
let Bt = null;
let nu = null;
let jr = null;
let tu = !1;
function Da(e, n, t) {
	let r =
		t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
	tu ||
		Bt == null ||
		Bt !== rl(r) ||
		((r = Bt),
		'selectionStart' in r && ds(r)
			? (r = {start: r.selectionStart, end: r.selectionEnd})
			: ((r = (
					(r.ownerDocument && r.ownerDocument.defaultView) ||
					window
				).getSelection()),
				(r = {
					anchorNode: r.anchorNode,
					anchorOffset: r.anchorOffset,
					focusNode: r.focusNode,
					focusOffset: r.focusOffset,
				})),
		(jr && ti(jr, r)) ||
			((jr = r),
			(r = cl(nu, 'onSelect')),
			!!r.length &&
				((n = new cs('onSelect', 'select', null, n, t)),
				e.push({event: n, listeners: r}),
				(n.target = Bt))));
}
function Ni(e, n) {
	const t = {};

	return (
		(t[e.toLowerCase()] = n.toLowerCase()),
		(t['Webkit' + e] = 'webkit' + n),
		(t['Moz' + e] = 'moz' + n),
		t
	);
}
const Ut = {
	animationend: Ni('Animation', 'AnimationEnd'),
	animationiteration: Ni('Animation', 'AnimationIteration'),
	animationstart: Ni('Animation', 'AnimationStart'),
	transitionend: Ni('Transition', 'TransitionEnd'),
};
const so = {};
let mp = {};
Dn &&
	((mp = document.createElement('div').style),
	'AnimationEvent' in window ||
		(delete Ut.animationend.animation,
		delete Ut.animationiteration.animation,
		delete Ut.animationstart.animation),
	'TransitionEvent' in window || delete Ut.transitionend.transition);
function Ml(e) {
	if (so[e]) {
		return so[e];
	}
	if (!Ut[e]) {
		return e;
	}
	const n = Ut[e];
	let t;
	for (t in n) {
		if (n.hasOwnProperty(t) && t in mp) {
			return (so[e] = n[t]);
		}
	}

	return e;
}
const gp = Ml('animationend');
const yp = Ml('animationiteration');
const vp = Ml('animationstart');
const kp = Ml('transitionend');
const xp = new Map();
const Aa =
	'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
		' '
	);
function ot(e, n) {
	xp.set(e, n), _t(n, [e]);
}
for (let ao = 0; ao < Aa.length; ao++) {
	const co = Aa[ao];
	const tg = co.toLowerCase();
	const rg = co[0].toUpperCase() + co.slice(1);
	ot(tg, 'on' + rg);
}
ot(gp, 'onAnimationEnd');
ot(yp, 'onAnimationIteration');
ot(vp, 'onAnimationStart');
ot('dblclick', 'onDoubleClick');
ot('focusin', 'onFocus');
ot('focusout', 'onBlur');
ot(kp, 'onTransitionEnd');
ir('onMouseEnter', ['mouseout', 'mouseover']);
ir('onMouseLeave', ['mouseout', 'mouseover']);
ir('onPointerEnter', ['pointerout', 'pointerover']);
ir('onPointerLeave', ['pointerout', 'pointerover']);
_t(
	'onChange',
	'change click focusin focusout input keydown keyup selectionchange'.split(
		' '
	)
);
_t(
	'onSelect',
	'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
		' '
	)
);
_t('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
_t(
	'onCompositionEnd',
	'compositionend focusout keydown keypress keyup mousedown'.split(' ')
);
_t(
	'onCompositionStart',
	'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
);
_t(
	'onCompositionUpdate',
	'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
);
const Lr =
	'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
		' '
	);
const ig = new Set(
	'cancel close invalid load scroll toggle'.split(' ').concat(Lr)
);
function Fa(e, n, t) {
	const r = e.type || 'unknown-event';
	(e.currentTarget = t), tm(r, n, void 0, e), (e.currentTarget = null);
}
function wp(e, n) {
	n = (n & 4) !== 0;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		const i = r.event;
		r = r.listeners;
		e: {
			let l = void 0;
			if (n) {
				for (var o = r.length - 1; 0 <= o; o--) {
					var u = r[o];
					var s = u.instance;
					var a = u.currentTarget;
					if (
						((u = u.listener), s !== l && i.isPropagationStopped())
					) {
						break e;
					}
					Fa(i, u, a), (l = s);
				}
			}
			else {
				for (o = 0; o < r.length; o++) {
					if (
						((u = r[o]),
						(s = u.instance),
						(a = u.currentTarget),
						(u = u.listener),
						s !== l && i.isPropagationStopped())
					) {
						break e;
					}
					Fa(i, u, a), (l = s);
				}
			}
		}
	}
	if (ll) {
		throw ((e = qo), (ll = !1), (qo = null), e);
	}
}
function re(e, n) {
	let t = n[uu];
	t === void 0 && (t = n[uu] = new Set());
	const r = e + '__bubble';
	t.has(r) || (Sp(n, e, 2, !1), t.add(r));
}
function fo(e, n, t) {
	let r = 0;
	n && (r |= 4), Sp(t, e, r, n);
}
const zi = '_reactListening' + Math.random().toString(36).slice(2);
function ri(e) {
	if (!e[zi]) {
		(e[zi] = !0),
			Nf.forEach((t) => {
				t !== 'selectionchange' &&
					(ig.has(t) || fo(t, !1, e), fo(t, !0, e));
			});
		const n = e.nodeType === 9 ? e : e.ownerDocument;
		n === null || n[zi] || ((n[zi] = !0), fo('selectionchange', !1, n));
	}
}
function Sp(e, n, t, r) {
	switch (lp(n)) {
		case 1:
			var i = vm;
			break;
		case 4:
			i = km;
			break;
		default:
			i = ss;
	}
	(t = i.bind(null, n, t, e)),
		(i = void 0),
		!Go ||
			(n !== 'touchstart' && n !== 'touchmove' && n !== 'wheel') ||
			(i = !0),
		r
			? i !== void 0
				? e.addEventListener(n, t, {capture: !0, passive: i})
				: e.addEventListener(n, t, !0)
			: i !== void 0
				? e.addEventListener(n, t, {passive: i})
				: e.addEventListener(n, t, !1);
}
function po(e, n, t, r, i) {
	let l = r;
	if (!(n & 1) && !(n & 2) && r !== null) {
		e: for (;;) {
			if (r === null) {
				return;
			}
			let o = r.tag;
			if (o === 3 || o === 4) {
				let u = r.stateNode.containerInfo;
				if (u === i || (u.nodeType === 8 && u.parentNode === i)) {
					break;
				}
				if (o === 4) {
					for (o = r.return; o !== null; ) {
						var s = o.tag;
						if (
							(s === 3 || s === 4) &&
							((s = o.stateNode.containerInfo),
							s === i || (s.nodeType === 8 && s.parentNode === i))
						) {
							return;
						}
						o = o.return;
					}
				}
				for (; u !== null; ) {
					if (((o = mt(u)), o === null)) {
						return;
					}
					if (((s = o.tag), s === 5 || s === 6)) {
						r = l = o;
						continue e;
					}
					u = u.parentNode;
				}
			}
			r = r.return;
		}
	}
	bf(() => {
		let a = l;
		let c = is(t);
		const f = [];
		e: {
			var d = xp.get(e);
			if (d !== void 0) {
				var p = cs;
				var x = e;
				switch (e) {
					case 'keypress':
						if (bi(t) === 0) {
							break e;
						}
					case 'keydown':
					case 'keyup':
						p = Mm;
						break;
					case 'focusin':
						(x = 'focus'), (p = lo);
						break;
					case 'focusout':
						(x = 'blur'), (p = lo);
						break;
					case 'beforeblur':
					case 'afterblur':
						p = lo;
						break;
					case 'click':
						if (t.button === 2) {
							break e;
						}
					case 'auxclick':
					case 'dblclick':
					case 'mousedown':
					case 'mousemove':
					case 'mouseup':
					case 'mouseout':
					case 'mouseover':
					case 'contextmenu':
						p = _a;
						break;
					case 'drag':
					case 'dragend':
					case 'dragenter':
					case 'dragexit':
					case 'dragleave':
					case 'dragover':
					case 'dragstart':
					case 'drop':
						p = Sm;
						break;
					case 'touchcancel':
					case 'touchend':
					case 'touchmove':
					case 'touchstart':
						p = Fm;
						break;
					case gp:
					case yp:
					case vp:
						p = _m;
						break;
					case kp:
						p = Bm;
						break;
					case 'scroll':
						p = xm;
						break;
					case 'wheel':
						p = Hm;
						break;
					case 'copy':
					case 'cut':
					case 'paste':
						p = Tm;
						break;
					case 'gotpointercapture':
					case 'lostpointercapture':
					case 'pointercancel':
					case 'pointerdown':
					case 'pointermove':
					case 'pointerout':
					case 'pointerover':
					case 'pointerup':
						p = Ta;
				}
				var k = (n & 4) !== 0;
				var C = !k && e === 'scroll';
				var h = k ? (d !== null ? d + 'Capture' : null) : d;
				k = [];
				for (var m = a, y; m !== null; ) {
					y = m;
					var S = y.stateNode;
					if (
						(y.tag === 5 &&
							S !== null &&
							((y = S),
							h !== null &&
								((S = qr(m, h)),
								S != null && k.push(ii(m, S, y)))),
						C)
					) {
						break;
					}
					m = m.return;
				}
				!!k.length &&
					((d = new p(d, x, null, t, c)),
					f.push({event: d, listeners: k}));
			}
		}
		if (!(n & 7)) {
			e: {
				if (
					((d = e === 'mouseover' || e === 'pointerover'),
					(p = e === 'mouseout' || e === 'pointerout'),
					d &&
						t !== Yo &&
						(x = t.relatedTarget || t.fromElement) &&
						(mt(x) || x[An]))
				) {
					break e;
				}
				if (
					(p || d) &&
					((d =
						c.window === c
							? c
							: (d = c.ownerDocument)
								? d.defaultView || d.parentWindow
								: window),
					p
						? ((x = t.relatedTarget || t.toElement),
							(p = a),
							(x = x ? mt(x) : null),
							x !== null &&
								((C = Pt(x)),
								x !== C || (x.tag !== 5 && x.tag !== 6)) &&
								(x = null))
						: ((p = null), (x = a)),
					p !== x)
				) {
					if (
						((k = _a),
						(S = 'onMouseLeave'),
						(h = 'onMouseEnter'),
						(m = 'mouse'),
						(e === 'pointerout' || e === 'pointerover') &&
							((k = Ta),
							(S = 'onPointerLeave'),
							(h = 'onPointerEnter'),
							(m = 'pointer')),
						(C = p == null ? d : Ht(p)),
						(y = x == null ? d : Ht(x)),
						(d = new k(S, m + 'leave', p, t, c)),
						(d.target = C),
						(d.relatedTarget = y),
						(S = null),
						mt(c) === a &&
							((k = new k(h, m + 'enter', x, t, c)),
							(k.target = y),
							(k.relatedTarget = C),
							(S = k)),
						(C = S),
						p && x)
					) {
						n: {
							for (k = p, h = x, m = 0, y = k; y; y = Lt(y)) {
								m++;
							}
							for (y = 0, S = h; S; S = Lt(S)) {
								y++;
							}
							for (; 0 < m - y; ) {
								(k = Lt(k)), m--;
							}
							for (; 0 < y - m; ) {
								(h = Lt(h)), y--;
							}
							for (; m--; ) {
								if (
									k === h ||
									(h !== null && k === h.alternate)
								) {
									break n;
								}
								(k = Lt(k)), (h = Lt(h));
							}
							k = null;
						}
					}
					else {
						k = null;
					}
					p !== null && ja(f, d, p, k, !1),
						x !== null && C !== null && ja(f, C, x, k, !0);
				}
			}
			e: {
				if (
					((d = a ? Ht(a) : window),
					(p = d.nodeName && d.nodeName.toLowerCase()),
					p === 'select' || (p === 'input' && d.type === 'file'))
				) {
					var T = Ym;
				}
				else if (za(d)) {
					if (fp) {
						T = Jm;
					}
					else {
						T = Gm;
						var w = Xm;
					}
				}
				else {
					(p = d.nodeName) &&
						p.toLowerCase() === 'input' &&
						(d.type === 'checkbox' || d.type === 'radio') &&
						(T = qm);
				}
				if (T && (T = T(e, a))) {
					cp(f, T, t, c);
					break e;
				}
				w && w(e, d, a),
					e === 'focusout' &&
						(w = d._wrapperState) &&
						w.controlled &&
						d.type === 'number' &&
						$o(d, 'number', d.value);
			}
			switch (((w = a ? Ht(a) : window), e)) {
				case 'focusin':
					(za(w) || w.contentEditable === 'true') &&
						((Bt = w), (nu = a), (jr = null));
					break;
				case 'focusout':
					jr = nu = Bt = null;
					break;
				case 'mousedown':
					tu = !0;
					break;
				case 'contextmenu':
				case 'mouseup':
				case 'dragend':
					(tu = !1), Da(f, t, c);
					break;
				case 'selectionchange':
					if (ng) {
						break;
					}
				case 'keydown':
				case 'keyup':
					Da(f, t, c);
			}
			let I;
			if (ps) {
				e: {
					switch (e) {
						case 'compositionstart':
							var L = 'onCompositionStart';
							break e;
						case 'compositionend':
							L = 'onCompositionEnd';
							break e;
						case 'compositionupdate':
							L = 'onCompositionUpdate';
							break e;
					}
					L = void 0;
				}
			}
			else {
				jt
					? sp(e, t) && (L = 'onCompositionEnd')
					: e === 'keydown' &&
						t.keyCode === 229 &&
						(L = 'onCompositionStart');
			}
			L &&
				(up &&
					t.locale !== 'ko' &&
					(jt || L !== 'onCompositionStart'
						? L === 'onCompositionEnd' && jt && (I = op())
						: ((Yn = c),
							(as = 'value' in Yn ? Yn.value : Yn.textContent),
							(jt = !0))),
				(w = cl(a, L)),
				!!w.length &&
					((L = new Pa(L, e, null, t, c)),
					f.push({event: L, listeners: w}),
					I
						? (L.data = I)
						: ((I = ap(t)), I !== null && (L.data = I)))),
				(I = $m ? Wm(e, t) : bm(e, t)) &&
					((a = cl(a, 'onBeforeInput')),
					!!a.length &&
						((c = new Pa(
							'onBeforeInput',
							'beforeinput',
							null,
							t,
							c
						)),
						f.push({event: c, listeners: a}),
						(c.data = I)));
		}
		wp(f, n);
	});
}
function ii(e, n, t) {
	return {instance: e, listener: n, currentTarget: t};
}
function cl(e, n) {
	for (var t = n + 'Capture', r = []; e !== null; ) {
		let i = e;
		let l = i.stateNode;
		i.tag === 5 &&
			l !== null &&
			((i = l),
			(l = qr(e, t)),
			l != null && r.unshift(ii(e, l, i)),
			(l = qr(e, n)),
			l != null && r.push(ii(e, l, i))),
			(e = e.return);
	}

	return r;
}
function Lt(e) {
	if (e === null) {
		return null;
	}
	do {
		e = e.return;
	} while (e && e.tag !== 5);

	return e || null;
}
function ja(e, n, t, r, i) {
	for (var l = n._reactName, o = []; t !== null && t !== r; ) {
		let u = t;
		let s = u.alternate;
		const a = u.stateNode;
		if (s !== null && s === r) {
			break;
		}
		u.tag === 5 &&
			a !== null &&
			((u = a),
			i
				? ((s = qr(t, l)), s != null && o.unshift(ii(t, s, u)))
				: i || ((s = qr(t, l)), s != null && o.push(ii(t, s, u)))),
			(t = t.return);
	}
	o.length !== 0 && e.push({event: n, listeners: o});
}
const lg = /\r\n?/g;
const og = /\u0000|\uFFFD/g;
function Ba(e) {
	return (typeof e === 'string' ? e : '' + e)
		.replace(
			lg,
			`
`
		)
		.replace(og, '');
}
function Li(e, n, t) {
	if (((n = Ba(n)), Ba(e) !== n && t)) {
		throw Error(_(425));
	}
}
function fl() {}
let ru = null;
let iu = null;
function lu(e, n) {
	return (
		e === 'textarea' ||
		e === 'noscript' ||
		typeof n.children === 'string' ||
		typeof n.children === 'number' ||
		(typeof n.dangerouslySetInnerHTML === 'object' &&
			n.dangerouslySetInnerHTML !== null &&
			n.dangerouslySetInnerHTML.__html != null)
	);
}
const ou = typeof setTimeout === 'function' ? setTimeout : void 0;
const ug = typeof clearTimeout === 'function' ? clearTimeout : void 0;
const Ua = typeof Promise === 'function' ? Promise : void 0;
const sg =
	typeof queueMicrotask === 'function'
		? queueMicrotask
		: typeof Ua < 'u'
			? function (e) {
					return Ua.resolve(null).then(e).catch(ag);
				}
			: ou;
function ag(e) {
	setTimeout(() => {
		throw e;
	});
}
function ho(e, n) {
	let t = n;
	let r = 0;
	do {
		const i = t.nextSibling;
		if ((e.removeChild(t), i && i.nodeType === 8)) {
			if (((t = i.data), t === '/$')) {
				if (r === 0) {
					e.removeChild(i), ei(n);

					return;
				}
				r--;
			}
			else {
				(t !== '$' && t !== '$?' && t !== '$!') || r++;
			}
		}
		t = i;
	} while (t);
	ei(n);
}
function Zn(e) {
	for (; e != null; e = e.nextSibling) {
		let n = e.nodeType;
		if (n === 1 || n === 3) {
			break;
		}
		if (n === 8) {
			if (((n = e.data), n === '$' || n === '$!' || n === '$?')) {
				break;
			}
			if (n === '/$') {
				return null;
			}
		}
	}

	return e;
}
function Ha(e) {
	e = e.previousSibling;
	for (let n = 0; e; ) {
		if (e.nodeType === 8) {
			const t = e.data;
			if (t === '$' || t === '$!' || t === '$?') {
				if (n === 0) {
					return e;
				}
				n--;
			}
			else {
				t === '/$' && n++;
			}
		}
		e = e.previousSibling;
	}

	return null;
}
const dr = Math.random().toString(36).slice(2);
const Sn = '__reactFiber$' + dr;
const li = '__reactProps$' + dr;
var An = '__reactContainer$' + dr;
var uu = '__reactEvents$' + dr;
const cg = '__reactListeners$' + dr;
const fg = '__reactHandles$' + dr;
function mt(e) {
	let n = e[Sn];
	if (n) {
		return n;
	}
	for (let t = e.parentNode; t; ) {
		if ((n = t[An] || t[Sn])) {
			if (
				((t = n.alternate),
				n.child !== null || (t !== null && t.child !== null))
			) {
				for (e = Ha(e); e !== null; ) {
					if ((t = e[Sn])) {
						return t;
					}
					e = Ha(e);
				}
			}

			return n;
		}
		(e = t), (t = e.parentNode);
	}

	return null;
}
function gi(e) {
	return (
		(e = e[Sn] || e[An]),
		!e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
			? null
			: e
	);
}
function Ht(e) {
	if (e.tag === 5 || e.tag === 6) {
		return e.stateNode;
	}
	throw Error(_(33));
}
function Dl(e) {
	return e[li] || null;
}
const su = [];
let Vt = -1;
function ut(e) {
	return {current: e};
}
function ie(e) {
	0 > Vt || ((e.current = su[Vt]), (su[Vt] = null), Vt--);
}
function ee(e, n) {
	Vt++, (su[Vt] = e.current), (e.current = n);
}
const lt = {};
const ze = ut(lt);
const Ue = ut(!1);
let xt = lt;
function lr(e, n) {
	const t = e.type.contextTypes;
	if (!t) {
		return lt;
	}
	const r = e.stateNode;
	if (r && r.__reactInternalMemoizedUnmaskedChildContext === n) {
		return r.__reactInternalMemoizedMaskedChildContext;
	}
	const i = {};
	let l;
	for (l in t) {
		i[l] = n[l];
	}

	return (
		r &&
			((e = e.stateNode),
			(e.__reactInternalMemoizedUnmaskedChildContext = n),
			(e.__reactInternalMemoizedMaskedChildContext = i)),
		i
	);
}
function He(e) {
	return (e = e.childContextTypes), e != null;
}
function pl() {
	ie(Ue), ie(ze);
}
function Va(e, n, t) {
	if (ze.current !== lt) {
		throw Error(_(168));
	}
	ee(ze, n), ee(Ue, t);
}
function Ep(e, n, t) {
	let r = e.stateNode;
	if (((n = n.childContextTypes), typeof r.getChildContext !== 'function')) {
		return t;
	}
	r = r.getChildContext();
	for (const i in r) {
		if (!(i in n)) {
			throw Error(_(108, Xh(e) || 'Unknown', i));
		}
	}

	return {...t, ...r};
}
function dl(e) {
	return (
		(e =
			((e = e.stateNode) &&
				e.__reactInternalMemoizedMergedChildContext) ||
			lt),
		(xt = ze.current),
		ee(ze, e),
		ee(Ue, Ue.current),
		!0
	);
}
function $a(e, n, t) {
	const r = e.stateNode;
	if (!r) {
		throw Error(_(169));
	}
	t
		? ((e = Ep(e, n, xt)),
			(r.__reactInternalMemoizedMergedChildContext = e),
			ie(Ue),
			ie(ze),
			ee(ze, e))
		: ie(Ue),
		ee(Ue, t);
}
let Ln = null;
let Al = !1;
let mo = !1;
function Cp(e) {
	Ln === null ? (Ln = [e]) : Ln.push(e);
}
function pg(e) {
	(Al = !0), Cp(e);
}
function st() {
	if (!mo && Ln !== null) {
		mo = !0;
		let e = 0;
		const n = G;
		try {
			const t = Ln;
			for (G = 1; e < t.length; e++) {
				let r = t[e];
				do {
					r = r(!0);
				} while (r !== null);
			}
			(Ln = null), (Al = !1);
		}
		catch (i) {
			throw (Ln !== null && (Ln = Ln.slice(e + 1)), Xf(ls, st), i);
		}
		finally {
			(G = n), (mo = !1);
		}
	}

	return null;
}
const $t = [];
let Wt = 0;
let hl = null;
let ml = 0;
const en = [];
let nn = 0;
let wt = null;
let Rn = 1;
let On = '';
function ft(e, n) {
	($t[Wt++] = ml), ($t[Wt++] = hl), (hl = e), (ml = n);
}
function _p(e, n, t) {
	(en[nn++] = Rn), (en[nn++] = On), (en[nn++] = wt), (wt = e);
	let r = Rn;
	e = On;
	let i = 32 - mn(r) - 1;
	(r &= ~(1 << i)), (t += 1);
	let l = 32 - mn(n) + i;
	if (30 < l) {
		const o = i - (i % 5);
		(l = (r & ((1 << o) - 1)).toString(32)),
			(r >>= o),
			(i -= o),
			(Rn = (1 << (32 - mn(n) + i)) | (t << i) | r),
			(On = l + e);
	}
	else {
		(Rn = (1 << l) | (t << i) | r), (On = e);
	}
}
function hs(e) {
	e.return !== null && (ft(e, 1), _p(e, 1, 0));
}
function ms(e) {
	for (; e === hl; ) {
		(hl = $t[--Wt]), ($t[Wt] = null), (ml = $t[--Wt]), ($t[Wt] = null);
	}
	for (; e === wt; ) {
		(wt = en[--nn]),
			(en[nn] = null),
			(On = en[--nn]),
			(en[nn] = null),
			(Rn = en[--nn]),
			(en[nn] = null);
	}
}
let Ge = null;
let Ye = null;
let oe = !1;
let hn = null;
function Pp(e, n) {
	const t = rn(5, null, null, 0);
	(t.elementType = 'DELETED'),
		(t.stateNode = n),
		(t.return = e),
		(n = e.deletions),
		n === null ? ((e.deletions = [t]), (e.flags |= 16)) : n.push(t);
}
function Wa(e, n) {
	switch (e.tag) {
		case 5:
			var t = e.type;

			return (
				(n =
					n.nodeType !== 1 ||
					t.toLowerCase() !== n.nodeName.toLowerCase()
						? null
						: n),
				n !== null
					? ((e.stateNode = n), (Ge = e), (Ye = Zn(n.firstChild)), !0)
					: !1
			);
		case 6:
			return (
				(n = e.pendingProps === '' || n.nodeType !== 3 ? null : n),
				n !== null ? ((e.stateNode = n), (Ge = e), (Ye = null), !0) : !1
			);
		case 13:
			return (
				(n = n.nodeType !== 8 ? null : n),
				n !== null
					? ((t = wt !== null ? {id: Rn, overflow: On} : null),
						(e.memoizedState = {
							dehydrated: n,
							treeContext: t,
							retryLane: 1073741824,
						}),
						(t = rn(18, null, null, 0)),
						(t.stateNode = n),
						(t.return = e),
						(e.child = t),
						(Ge = e),
						(Ye = null),
						!0)
					: !1
			);
		default:
			return !1;
	}
}
function au(e) {
	return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function cu(e) {
	if (oe) {
		let n = Ye;
		if (n) {
			const t = n;
			if (!Wa(e, n)) {
				if (au(e)) {
					throw Error(_(418));
				}
				n = Zn(t.nextSibling);
				const r = Ge;
				n && Wa(e, n)
					? Pp(r, t)
					: ((e.flags = (e.flags & -4097) | 2), (oe = !1), (Ge = e));
			}
		}
		else {
			if (au(e)) {
				throw Error(_(418));
			}
			(e.flags = (e.flags & -4097) | 2), (oe = !1), (Ge = e);
		}
	}
}
function ba(e) {
	for (
		e = e.return;
		e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

	) {
		e = e.return;
	}
	Ge = e;
}
function Ri(e) {
	if (e !== Ge) {
		return !1;
	}
	if (!oe) {
		return ba(e), (oe = !0), !1;
	}
	let n;
	if (
		((n = e.tag !== 3) &&
			!(n = e.tag !== 5) &&
			((n = e.type),
			(n = n !== 'head' && n !== 'body' && !lu(e.type, e.memoizedProps))),
		n && (n = Ye))
	) {
		if (au(e)) {
			throw (Tp(), Error(_(418)));
		}
		for (; n; ) {
			Pp(e, n), (n = Zn(n.nextSibling));
		}
	}
	if ((ba(e), e.tag === 13)) {
		if (
			((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)
		) {
			throw Error(_(317));
		}
		e: {
			for (e = e.nextSibling, n = 0; e; ) {
				if (e.nodeType === 8) {
					const t = e.data;
					if (t === '/$') {
						if (n === 0) {
							Ye = Zn(e.nextSibling);
							break e;
						}
						n--;
					}
					else {
						(t !== '$' && t !== '$!' && t !== '$?') || n++;
					}
				}
				e = e.nextSibling;
			}
			Ye = null;
		}
	}
	else {
		Ye = Ge ? Zn(e.stateNode.nextSibling) : null;
	}

	return !0;
}
function Tp() {
	for (let e = Ye; e; ) {
		e = Zn(e.nextSibling);
	}
}
function or() {
	(Ye = Ge = null), (oe = !1);
}
function gs(e) {
	hn === null ? (hn = [e]) : hn.push(e);
}
const dg = Bn.ReactCurrentBatchConfig;
function Er(e, n, t) {
	if (
		((e = t.ref),
		e !== null && typeof e !== 'function' && typeof e !== 'object')
	) {
		if (t._owner) {
			if (((t = t._owner), t)) {
				if (t.tag !== 1) {
					throw Error(_(309));
				}
				var r = t.stateNode;
			}
			if (!r) {
				throw Error(_(147, e));
			}
			const i = r;
			const l = '' + e;

			return n !== null &&
				n.ref !== null &&
				typeof n.ref === 'function' &&
				n.ref._stringRef === l
				? n.ref
				: ((n = function (o) {
						const u = i.refs;
						o === null ? delete u[l] : (u[l] = o);
					}),
					(n._stringRef = l),
					n);
		}
		if (typeof e !== 'string') {
			throw Error(_(284));
		}
		if (!t._owner) {
			throw Error(_(290, e));
		}
	}

	return e;
}
function Oi(e, n) {
	throw (
		((e = Object.prototype.toString.call(n)),
		Error(
			_(
				31,
				e === '[object Object]'
					? 'object with keys {' + Object.keys(n).join(', ') + '}'
					: e
			)
		))
	);
}
function Qa(e) {
	const n = e._init;

	return n(e._payload);
}
function Ip(e) {
	function n(h, m) {
		if (e) {
			const y = h.deletions;
			y === null ? ((h.deletions = [m]), (h.flags |= 16)) : y.push(m);
		}
	}
	function t(h, m) {
		if (!e) {
			return null;
		}
		for (; m !== null; ) {
			n(h, m), (m = m.sibling);
		}

		return null;
	}
	function r(h, m) {
		for (h = new Map(); m !== null; ) {
			m.key !== null ? h.set(m.key, m) : h.set(m.index, m),
				(m = m.sibling);
		}

		return h;
	}
	function i(h, m) {
		return (h = rt(h, m)), (h.index = 0), (h.sibling = null), h;
	}
	function l(h, m, y) {
		return (
			(h.index = y),
			e
				? ((y = h.alternate),
					y !== null
						? ((y = y.index), y < m ? ((h.flags |= 2), m) : y)
						: ((h.flags |= 2), m))
				: ((h.flags |= 1048576), m)
		);
	}
	function o(h) {
		return e && h.alternate === null && (h.flags |= 2), h;
	}
	function u(h, m, y, S) {
		return m === null || m.tag !== 6
			? ((m = So(y, h.mode, S)), (m.return = h), m)
			: ((m = i(m, y)), (m.return = h), m);
	}
	function s(h, m, y, S) {
		const T = y.type;

		return T === Ft
			? c(h, m, y.props.children, S, y.key)
			: m !== null &&
				  (m.elementType === T ||
						(typeof T === 'object' &&
							T !== null &&
							T.$$typeof === $n &&
							Qa(T) === m.type))
				? ((S = i(m, y.props)),
					(S.ref = Er(h, m, y)),
					(S.return = h),
					S)
				: ((S = Ji(y.type, y.key, y.props, null, h.mode, S)),
					(S.ref = Er(h, m, y)),
					(S.return = h),
					S);
	}
	function a(h, m, y, S) {
		return m === null ||
			m.tag !== 4 ||
			m.stateNode.containerInfo !== y.containerInfo ||
			m.stateNode.implementation !== y.implementation
			? ((m = Eo(y, h.mode, S)), (m.return = h), m)
			: ((m = i(m, y.children || [])), (m.return = h), m);
	}
	function c(h, m, y, S, T) {
		return m === null || m.tag !== 7
			? ((m = kt(y, h.mode, S, T)), (m.return = h), m)
			: ((m = i(m, y)), (m.return = h), m);
	}
	function f(h, m, y) {
		if ((typeof m === 'string' && m !== '') || typeof m === 'number') {
			return (m = So('' + m, h.mode, y)), (m.return = h), m;
		}
		if (typeof m === 'object' && m !== null) {
			switch (m.$$typeof) {
				case Si:
					return (
						(y = Ji(m.type, m.key, m.props, null, h.mode, y)),
						(y.ref = Er(h, null, m)),
						(y.return = h),
						y
					);
				case At:
					return (m = Eo(m, h.mode, y)), (m.return = h), m;
				case $n:
					var S = m._init;

					return f(h, S(m._payload), y);
			}
			if (Nr(m) || vr(m)) {
				return (m = kt(m, h.mode, y, null)), (m.return = h), m;
			}
			Oi(h, m);
		}

		return null;
	}
	function d(h, m, y, S) {
		let T = m !== null ? m.key : null;
		if ((typeof y === 'string' && y !== '') || typeof y === 'number') {
			return T !== null ? null : u(h, m, '' + y, S);
		}
		if (typeof y === 'object' && y !== null) {
			switch (y.$$typeof) {
				case Si:
					return y.key === T ? s(h, m, y, S) : null;
				case At:
					return y.key === T ? a(h, m, y, S) : null;
				case $n:
					return (T = y._init), d(h, m, T(y._payload), S);
			}
			if (Nr(y) || vr(y)) {
				return T !== null ? null : c(h, m, y, S, null);
			}
			Oi(h, y);
		}

		return null;
	}
	function p(h, m, y, S, T) {
		if ((typeof S === 'string' && S !== '') || typeof S === 'number') {
			return (h = h.get(y) || null), u(m, h, '' + S, T);
		}
		if (typeof S === 'object' && S !== null) {
			switch (S.$$typeof) {
				case Si:
					return (
						(h = h.get(S.key === null ? y : S.key) || null),
						s(m, h, S, T)
					);
				case At:
					return (
						(h = h.get(S.key === null ? y : S.key) || null),
						a(m, h, S, T)
					);
				case $n:
					var w = S._init;

					return p(h, m, y, w(S._payload), T);
			}
			if (Nr(S) || vr(S)) {
				return (h = h.get(y) || null), c(m, h, S, T, null);
			}
			Oi(m, S);
		}

		return null;
	}
	function x(h, m, y, S) {
		for (
			var T = null, w = null, I = m, L = (m = 0), j = null;
			I !== null && L < y.length;
			L++
		) {
			I.index > L ? ((j = I), (I = null)) : (j = I.sibling);
			const M = d(h, I, y[L], S);
			if (M === null) {
				I === null && (I = j);
				break;
			}
			e && I && M.alternate === null && n(h, I),
				(m = l(M, m, L)),
				w === null ? (T = M) : (w.sibling = M),
				(w = M),
				(I = j);
		}
		if (L === y.length) {
			return t(h, I), oe && ft(h, L), T;
		}
		if (I === null) {
			for (; L < y.length; L++) {
				(I = f(h, y[L], S)),
					I !== null &&
						((m = l(I, m, L)),
						w === null ? (T = I) : (w.sibling = I),
						(w = I));
			}

			return oe && ft(h, L), T;
		}
		for (I = r(h, I); L < y.length; L++) {
			(j = p(I, h, L, y[L], S)),
				j !== null &&
					(e &&
						j.alternate !== null &&
						I.delete(j.key === null ? L : j.key),
					(m = l(j, m, L)),
					w === null ? (T = j) : (w.sibling = j),
					(w = j));
		}

		return (
			e &&
				I.forEach((D) => {
					return n(h, D);
				}),
			oe && ft(h, L),
			T
		);
	}
	function k(h, m, y, S) {
		let T = vr(y);
		if (typeof T !== 'function') {
			throw Error(_(150));
		}
		if (((y = T.call(y)), y == null)) {
			throw Error(_(151));
		}
		for (
			var w = (T = null), I = m, L = (m = 0), j = null, M = y.next();
			I !== null && !M.done;
			L++, M = y.next()
		) {
			I.index > L ? ((j = I), (I = null)) : (j = I.sibling);
			const D = d(h, I, M.value, S);
			if (D === null) {
				I === null && (I = j);
				break;
			}
			e && I && D.alternate === null && n(h, I),
				(m = l(D, m, L)),
				w === null ? (T = D) : (w.sibling = D),
				(w = D),
				(I = j);
		}
		if (M.done) {
			return t(h, I), oe && ft(h, L), T;
		}
		if (I === null) {
			for (; !M.done; L++, M = y.next()) {
				(M = f(h, M.value, S)),
					M !== null &&
						((m = l(M, m, L)),
						w === null ? (T = M) : (w.sibling = M),
						(w = M));
			}

			return oe && ft(h, L), T;
		}
		for (I = r(h, I); !M.done; L++, M = y.next()) {
			(M = p(I, h, L, M.value, S)),
				M !== null &&
					(e &&
						M.alternate !== null &&
						I.delete(M.key === null ? L : M.key),
					(m = l(M, m, L)),
					w === null ? (T = M) : (w.sibling = M),
					(w = M));
		}

		return (
			e &&
				I.forEach((A) => {
					return n(h, A);
				}),
			oe && ft(h, L),
			T
		);
	}
	function C(h, m, y, S) {
		if (
			(typeof y === 'object' &&
				y !== null &&
				y.type === Ft &&
				y.key === null &&
				(y = y.props.children),
			typeof y === 'object' && y !== null)
		) {
			switch (y.$$typeof) {
				case Si:
					e: {
						for (var T = y.key, w = m; w !== null; ) {
							if (w.key === T) {
								if (((T = y.type), T === Ft)) {
									if (w.tag === 7) {
										t(h, w.sibling),
											(m = i(w, y.props.children)),
											(m.return = h),
											(h = m);
										break e;
									}
								}
								else if (
									w.elementType === T ||
									(typeof T === 'object' &&
										T !== null &&
										T.$$typeof === $n &&
										Qa(T) === w.type)
								) {
									t(h, w.sibling),
										(m = i(w, y.props)),
										(m.ref = Er(h, w, y)),
										(m.return = h),
										(h = m);
									break e;
								}
								t(h, w);
								break;
							}
							else {
								n(h, w);
							}
							w = w.sibling;
						}
						y.type === Ft
							? ((m = kt(y.props.children, h.mode, S, y.key)),
								(m.return = h),
								(h = m))
							: ((S = Ji(
									y.type,
									y.key,
									y.props,
									null,
									h.mode,
									S
								)),
								(S.ref = Er(h, m, y)),
								(S.return = h),
								(h = S));
					}

					return o(h);
				case At:
					e: {
						for (w = y.key; m !== null; ) {
							if (m.key === w) {
								if (
									m.tag === 4 &&
									m.stateNode.containerInfo ===
										y.containerInfo &&
									m.stateNode.implementation ===
										y.implementation
								) {
									t(h, m.sibling),
										(m = i(m, y.children || [])),
										(m.return = h),
										(h = m);
									break e;
								}
								else {
									t(h, m);
									break;
								}
							}
							else {
								n(h, m);
							}
							m = m.sibling;
						}
						(m = Eo(y, h.mode, S)), (m.return = h), (h = m);
					}

					return o(h);
				case $n:
					return (w = y._init), C(h, m, w(y._payload), S);
			}
			if (Nr(y)) {
				return x(h, m, y, S);
			}
			if (vr(y)) {
				return k(h, m, y, S);
			}
			Oi(h, y);
		}

		return (typeof y === 'string' && y !== '') || typeof y === 'number'
			? ((y = '' + y),
				m !== null && m.tag === 6
					? (t(h, m.sibling), (m = i(m, y)), (m.return = h), (h = m))
					: (t(h, m),
						(m = So(y, h.mode, S)),
						(m.return = h),
						(h = m)),
				o(h))
			: t(h, m);
	}

	return C;
}
const ur = Ip(!0);
const Np = Ip(!1);
const gl = ut(null);
let yl = null;
let bt = null;
let ys = null;
function vs() {
	ys = bt = yl = null;
}
function ks(e) {
	const n = gl.current;
	ie(gl), (e._currentValue = n);
}
function fu(e, n, t) {
	for (; e !== null; ) {
		const r = e.alternate;
		if (
			((e.childLanes & n) !== n
				? ((e.childLanes |= n), r !== null && (r.childLanes |= n))
				: r !== null && (r.childLanes & n) !== n && (r.childLanes |= n),
			e === t)
		) {
			break;
		}
		e = e.return;
	}
}
function Zt(e, n) {
	(yl = e),
		(ys = bt = null),
		(e = e.dependencies),
		e !== null &&
			e.firstContext !== null &&
			(e.lanes & n && (Be = !0), (e.firstContext = null));
}
function on(e) {
	const n = e._currentValue;
	if (ys !== e) {
		if (((e = {context: e, memoizedValue: n, next: null}), bt === null)) {
			if (yl === null) {
				throw Error(_(308));
			}
			(bt = e), (yl.dependencies = {lanes: 0, firstContext: e});
		}
		else {
			bt = bt.next = e;
		}
	}

	return n;
}
let gt = null;
function xs(e) {
	gt === null ? (gt = [e]) : gt.push(e);
}
function zp(e, n, t, r) {
	const i = n.interleaved;

	return (
		i === null ? ((t.next = t), xs(n)) : ((t.next = i.next), (i.next = t)),
		(n.interleaved = t),
		Fn(e, r)
	);
}
function Fn(e, n) {
	e.lanes |= n;
	let t = e.alternate;
	for (t !== null && (t.lanes |= n), t = e, e = e.return; e !== null; ) {
		(e.childLanes |= n),
			(t = e.alternate),
			t !== null && (t.childLanes |= n),
			(t = e),
			(e = e.return);
	}

	return t.tag === 3 ? t.stateNode : null;
}
let Wn = !1;
function ws(e) {
	e.updateQueue = {
		baseState: e.memoizedState,
		firstBaseUpdate: null,
		lastBaseUpdate: null,
		shared: {pending: null, interleaved: null, lanes: 0},
		effects: null,
	};
}
function Lp(e, n) {
	(e = e.updateQueue),
		n.updateQueue === e &&
			(n.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				effects: e.effects,
			});
}
function Mn(e, n) {
	return {
		eventTime: e,
		lane: n,
		tag: 0,
		payload: null,
		callback: null,
		next: null,
	};
}
function et(e, n, t) {
	let r = e.updateQueue;
	if (r === null) {
		return null;
	}
	if (((r = r.shared), K & 2)) {
		var i = r.pending;

		return (
			i === null ? (n.next = n) : ((n.next = i.next), (i.next = n)),
			(r.pending = n),
			Fn(e, t)
		);
	}

	return (
		(i = r.interleaved),
		i === null ? ((n.next = n), xs(r)) : ((n.next = i.next), (i.next = n)),
		(r.interleaved = n),
		Fn(e, t)
	);
}
function Qi(e, n, t) {
	if (
		((n = n.updateQueue),
		n !== null && ((n = n.shared), (t & 4194240) !== 0))
	) {
		let r = n.lanes;
		(r &= e.pendingLanes), (t |= r), (n.lanes = t), os(e, t);
	}
}
function Ka(e, n) {
	let t = e.updateQueue;
	let r = e.alternate;
	if (r !== null && ((r = r.updateQueue), t === r)) {
		let i = null;
		let l = null;
		if (((t = t.firstBaseUpdate), t !== null)) {
			do {
				const o = {
					eventTime: t.eventTime,
					lane: t.lane,
					tag: t.tag,
					payload: t.payload,
					callback: t.callback,
					next: null,
				};
				l === null ? (i = l = o) : (l = l.next = o), (t = t.next);
			} while (t !== null);
			l === null ? (i = l = n) : (l = l.next = n);
		}
		else {
			i = l = n;
		}
		(t = {
			baseState: r.baseState,
			firstBaseUpdate: i,
			lastBaseUpdate: l,
			shared: r.shared,
			effects: r.effects,
		}),
			(e.updateQueue = t);

		return;
	}
	(e = t.lastBaseUpdate),
		e === null ? (t.firstBaseUpdate = n) : (e.next = n),
		(t.lastBaseUpdate = n);
}
function vl(e, n, t, r) {
	let i = e.updateQueue;
	Wn = !1;
	let l = i.firstBaseUpdate;
	let o = i.lastBaseUpdate;
	let u = i.shared.pending;
	if (u !== null) {
		i.shared.pending = null;
		var s = u;
		var a = s.next;
		(s.next = null), o === null ? (l = a) : (o.next = a), (o = s);
		var c = e.alternate;
		c !== null &&
			((c = c.updateQueue),
			(u = c.lastBaseUpdate),
			u !== o &&
				(u === null ? (c.firstBaseUpdate = a) : (u.next = a),
				(c.lastBaseUpdate = s)));
	}
	if (l !== null) {
		let f = i.baseState;
		(o = 0), (c = a = s = null), (u = l);
		do {
			let d = u.lane;
			let p = u.eventTime;
			if ((r & d) === d) {
				c !== null &&
					(c = c.next =
						{
							eventTime: p,
							lane: 0,
							tag: u.tag,
							payload: u.payload,
							callback: u.callback,
							next: null,
						});
				e: {
					let x = e;
					const k = u;
					switch (((d = n), (p = t), k.tag)) {
						case 1:
							if (((x = k.payload), typeof x === 'function')) {
								f = x.call(p, f, d);
								break e;
							}
							f = x;
							break e;
						case 3:
							x.flags = (x.flags & -65537) | 128;
						case 0:
							if (
								((x = k.payload),
								(d =
									typeof x === 'function'
										? x.call(p, f, d)
										: x),
								d == null)
							) {
								break e;
							}
							f = {...f, ...d};
							break e;
						case 2:
							Wn = !0;
					}
				}
				u.callback !== null &&
					u.lane !== 0 &&
					((e.flags |= 64),
					(d = i.effects),
					d === null ? (i.effects = [u]) : d.push(u));
			}
			else {
				(p = {
					eventTime: p,
					lane: d,
					tag: u.tag,
					payload: u.payload,
					callback: u.callback,
					next: null,
				}),
					c === null ? ((a = c = p), (s = f)) : (c = c.next = p),
					(o |= d);
			}
			if (((u = u.next), u === null)) {
				if (((u = i.shared.pending), u === null)) {
					break;
				}
				(d = u),
					(u = d.next),
					(d.next = null),
					(i.lastBaseUpdate = d),
					(i.shared.pending = null);
			}
		} while (!0);
		if (
			(c === null && (s = f),
			(i.baseState = s),
			(i.firstBaseUpdate = a),
			(i.lastBaseUpdate = c),
			(n = i.shared.interleaved),
			n !== null)
		) {
			i = n;
			do {
				(o |= i.lane), (i = i.next);
			} while (i !== n);
		}
		else {
			l === null && (i.shared.lanes = 0);
		}
		(Et |= o), (e.lanes = o), (e.memoizedState = f);
	}
}
function Ya(e, n, t) {
	if (((e = n.effects), (n.effects = null), e !== null)) {
		for (n = 0; n < e.length; n++) {
			let r = e[n];
			const i = r.callback;
			if (i !== null) {
				if (((r.callback = null), (r = t), typeof i !== 'function')) {
					throw Error(_(191, i));
				}
				i.call(r);
			}
		}
	}
}
const yi = {};
const _n = ut(yi);
const oi = ut(yi);
const ui = ut(yi);
function yt(e) {
	if (e === yi) {
		throw Error(_(174));
	}

	return e;
}
function Ss(e, n) {
	switch ((ee(ui, n), ee(oi, e), ee(_n, yi), (e = n.nodeType), e)) {
		case 9:
		case 11:
			n = (n = n.documentElement) ? n.namespaceURI : bo(null, '');
			break;
		default:
			(e = e === 8 ? n.parentNode : n),
				(n = e.namespaceURI || null),
				(e = e.tagName),
				(n = bo(n, e));
	}
	ie(_n), ee(_n, n);
}
function sr() {
	ie(_n), ie(oi), ie(ui);
}
function Rp(e) {
	yt(ui.current);
	const n = yt(_n.current);
	const t = bo(n, e.type);
	n !== t && (ee(oi, e), ee(_n, t));
}
function Es(e) {
	oi.current === e && (ie(_n), ie(oi));
}
const se = ut(0);
function kl(e) {
	for (let n = e; n !== null; ) {
		if (n.tag === 13) {
			let t = n.memoizedState;
			if (
				t !== null &&
				((t = t.dehydrated),
				t === null || t.data === '$?' || t.data === '$!')
			) {
				return n;
			}
		}
		else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
			if (n.flags & 128) {
				return n;
			}
		}
		else if (n.child !== null) {
			(n.child.return = n), (n = n.child);
			continue;
		}
		if (n === e) {
			break;
		}
		for (; n.sibling === null; ) {
			if (n.return === null || n.return === e) {
				return null;
			}
			n = n.return;
		}
		(n.sibling.return = n.return), (n = n.sibling);
	}

	return null;
}
const go = [];
function Cs() {
	for (let e = 0; e < go.length; e++) {
		go[e]._workInProgressVersionPrimary = null;
	}
	go.length = 0;
}
const Ki = Bn.ReactCurrentDispatcher;
const yo = Bn.ReactCurrentBatchConfig;
let St = 0;
let ae = null;
let xe = null;
let Se = null;
let xl = !1;
let Br = !1;
let si = 0;
let hg = 0;
function Te() {
	throw Error(_(321));
}
function _s(e, n) {
	if (n === null) {
		return !1;
	}
	for (let t = 0; t < n.length && t < e.length; t++) {
		if (!yn(e[t], n[t])) {
			return !1;
		}
	}

	return !0;
}
function Ps(e, n, t, r, i, l) {
	if (
		((St = l),
		(ae = n),
		(n.memoizedState = null),
		(n.updateQueue = null),
		(n.lanes = 0),
		(Ki.current = e === null || e.memoizedState === null ? vg : kg),
		(e = t(r, i)),
		Br)
	) {
		l = 0;
		do {
			if (((Br = !1), (si = 0), 25 <= l)) {
				throw Error(_(301));
			}
			(l += 1),
				(Se = xe = null),
				(n.updateQueue = null),
				(Ki.current = xg),
				(e = t(r, i));
		} while (Br);
	}
	if (
		((Ki.current = wl),
		(n = xe !== null && xe.next !== null),
		(St = 0),
		(Se = xe = ae = null),
		(xl = !1),
		n)
	) {
		throw Error(_(300));
	}

	return e;
}
function Ts() {
	const e = si !== 0;

	return (si = 0), e;
}
function xn() {
	const e = {
		memoizedState: null,
		baseState: null,
		baseQueue: null,
		queue: null,
		next: null,
	};

	return Se === null ? (ae.memoizedState = Se = e) : (Se = Se.next = e), Se;
}
function un() {
	if (xe === null) {
		var e = ae.alternate;
		e = e !== null ? e.memoizedState : null;
	}
	else {
		e = xe.next;
	}
	const n = Se === null ? ae.memoizedState : Se.next;
	if (n !== null) {
		(Se = n), (xe = e);
	}
	else {
		if (e === null) {
			throw Error(_(310));
		}
		(xe = e),
			(e = {
				memoizedState: xe.memoizedState,
				baseState: xe.baseState,
				baseQueue: xe.baseQueue,
				queue: xe.queue,
				next: null,
			}),
			Se === null ? (ae.memoizedState = Se = e) : (Se = Se.next = e);
	}

	return Se;
}
function ai(e, n) {
	return typeof n === 'function' ? n(e) : n;
}
function vo(e) {
	const n = un();
	const t = n.queue;
	if (t === null) {
		throw Error(_(311));
	}
	t.lastRenderedReducer = e;
	let r = xe;
	let i = r.baseQueue;
	let l = t.pending;
	if (l !== null) {
		if (i !== null) {
			var o = i.next;
			(i.next = l.next), (l.next = o);
		}
		(r.baseQueue = i = l), (t.pending = null);
	}
	if (i !== null) {
		(l = i.next), (r = r.baseState);
		let u = (o = null);
		let s = null;
		let a = l;
		do {
			const c = a.lane;
			if ((St & c) === c) {
				s !== null &&
					(s = s.next =
						{
							lane: 0,
							action: a.action,
							hasEagerState: a.hasEagerState,
							eagerState: a.eagerState,
							next: null,
						}),
					(r = a.hasEagerState ? a.eagerState : e(r, a.action));
			}
			else {
				const f = {
					lane: c,
					action: a.action,
					hasEagerState: a.hasEagerState,
					eagerState: a.eagerState,
					next: null,
				};
				s === null ? ((u = s = f), (o = r)) : (s = s.next = f),
					(ae.lanes |= c),
					(Et |= c);
			}
			a = a.next;
		} while (a !== null && a !== l);
		s === null ? (o = r) : (s.next = u),
			yn(r, n.memoizedState) || (Be = !0),
			(n.memoizedState = r),
			(n.baseState = o),
			(n.baseQueue = s),
			(t.lastRenderedState = r);
	}
	if (((e = t.interleaved), e !== null)) {
		i = e;
		do {
			(l = i.lane), (ae.lanes |= l), (Et |= l), (i = i.next);
		} while (i !== e);
	}
	else {
		i === null && (t.lanes = 0);
	}

	return [n.memoizedState, t.dispatch];
}
function ko(e) {
	const n = un();
	const t = n.queue;
	if (t === null) {
		throw Error(_(311));
	}
	t.lastRenderedReducer = e;
	const r = t.dispatch;
	let i = t.pending;
	let l = n.memoizedState;
	if (i !== null) {
		t.pending = null;
		let o = (i = i.next);
		do {
			(l = e(l, o.action)), (o = o.next);
		} while (o !== i);
		yn(l, n.memoizedState) || (Be = !0),
			(n.memoizedState = l),
			n.baseQueue === null && (n.baseState = l),
			(t.lastRenderedState = l);
	}

	return [l, r];
}
function Op() {}
function Mp(e, n) {
	const t = ae;
	let r = un();
	const i = n();
	const l = !yn(r.memoizedState, i);
	if (
		(l && ((r.memoizedState = i), (Be = !0)),
		(r = r.queue),
		Is(Fp.bind(null, t, r, e), [e]),
		r.getSnapshot !== n || l || (Se !== null && Se.memoizedState.tag & 1))
	) {
		if (
			((t.flags |= 2048),
			ci(9, Ap.bind(null, t, r, i, n), void 0, null),
			Ee === null)
		) {
			throw Error(_(349));
		}
		St & 30 || Dp(t, n, i);
	}

	return i;
}
function Dp(e, n, t) {
	(e.flags |= 16384),
		(e = {getSnapshot: n, value: t}),
		(n = ae.updateQueue),
		n === null
			? ((n = {lastEffect: null, stores: null}),
				(ae.updateQueue = n),
				(n.stores = [e]))
			: ((t = n.stores), t === null ? (n.stores = [e]) : t.push(e));
}
function Ap(e, n, t, r) {
	(n.value = t), (n.getSnapshot = r), jp(n) && Bp(e);
}
function Fp(e, n, t) {
	return t(() => {
		jp(n) && Bp(e);
	});
}
function jp(e) {
	const n = e.getSnapshot;
	e = e.value;
	try {
		const t = n();

		return !yn(e, t);
	}
	catch {
		return !0;
	}
}
function Bp(e) {
	const n = Fn(e, 1);
	n !== null && gn(n, e, 1, -1);
}
function Xa(e) {
	const n = xn();

	return (
		typeof e === 'function' && (e = e()),
		(n.memoizedState = n.baseState = e),
		(e = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ai,
			lastRenderedState: e,
		}),
		(n.queue = e),
		(e = e.dispatch = yg.bind(null, ae, e)),
		[n.memoizedState, e]
	);
}
function ci(e, n, t, r) {
	return (
		(e = {tag: e, create: n, destroy: t, deps: r, next: null}),
		(n = ae.updateQueue),
		n === null
			? ((n = {lastEffect: null, stores: null}),
				(ae.updateQueue = n),
				(n.lastEffect = e.next = e))
			: ((t = n.lastEffect),
				t === null
					? (n.lastEffect = e.next = e)
					: ((r = t.next),
						(t.next = e),
						(e.next = r),
						(n.lastEffect = e))),
		e
	);
}
function Up() {
	return un().memoizedState;
}
function Yi(e, n, t, r) {
	const i = xn();
	(ae.flags |= e),
		(i.memoizedState = ci(1 | n, t, void 0, r === void 0 ? null : r));
}
function Fl(e, n, t, r) {
	const i = un();
	r = r === void 0 ? null : r;
	let l = void 0;
	if (xe !== null) {
		const o = xe.memoizedState;
		if (((l = o.destroy), r !== null && _s(r, o.deps))) {
			i.memoizedState = ci(n, t, l, r);

			return;
		}
	}
	(ae.flags |= e), (i.memoizedState = ci(1 | n, t, l, r));
}
function Ga(e, n) {
	return Yi(8390656, 8, e, n);
}
function Is(e, n) {
	return Fl(2048, 8, e, n);
}
function Hp(e, n) {
	return Fl(4, 2, e, n);
}
function Vp(e, n) {
	return Fl(4, 4, e, n);
}
function $p(e, n) {
	if (typeof n === 'function') {
		return (
			(e = e()),
			n(e),
			function () {
				n(null);
			}
		);
	}
	if (n != null) {
		return (
			(e = e()),
			(n.current = e),
			function () {
				n.current = null;
			}
		);
	}
}
function Wp(e, n, t) {
	return (
		(t = t != null ? t.concat([e]) : null), Fl(4, 4, $p.bind(null, n, e), t)
	);
}
function Ns() {}
function bp(e, n) {
	const t = un();
	n = n === void 0 ? null : n;
	const r = t.memoizedState;

	return r !== null && n !== null && _s(n, r[1])
		? r[0]
		: ((t.memoizedState = [e, n]), e);
}
function Qp(e, n) {
	const t = un();
	n = n === void 0 ? null : n;
	const r = t.memoizedState;

	return r !== null && n !== null && _s(n, r[1])
		? r[0]
		: ((e = e()), (t.memoizedState = [e, n]), e);
}
function Kp(e, n, t) {
	return St & 21
		? (yn(t, n) ||
				((t = Jf()), (ae.lanes |= t), (Et |= t), (e.baseState = !0)),
			n)
		: (e.baseState && ((e.baseState = !1), (Be = !0)),
			(e.memoizedState = t));
}
function mg(e, n) {
	const t = G;
	(G = t !== 0 && 4 > t ? t : 4), e(!0);
	const r = yo.transition;
	yo.transition = {};
	try {
		e(!1), n();
	}
	finally {
		(G = t), (yo.transition = r);
	}
}
function Yp() {
	return un().memoizedState;
}
function gg(e, n, t) {
	const r = tt(e);
	if (
		((t = {
			lane: r,
			action: t,
			hasEagerState: !1,
			eagerState: null,
			next: null,
		}),
		Xp(e))
	) {
		Gp(n, t);
	}
	else if (((t = zp(e, n, t, r)), t !== null)) {
		const i = Oe();
		gn(t, e, r, i), qp(t, n, r);
	}
}
function yg(e, n, t) {
	const r = tt(e);
	let i = {
		lane: r,
		action: t,
		hasEagerState: !1,
		eagerState: null,
		next: null,
	};
	if (Xp(e)) {
		Gp(n, i);
	}
	else {
		let l = e.alternate;
		if (
			e.lanes === 0 &&
			(l === null || l.lanes === 0) &&
			((l = n.lastRenderedReducer), l !== null)
		) {
			try {
				const o = n.lastRenderedState;
				const u = l(o, t);
				if (((i.hasEagerState = !0), (i.eagerState = u), yn(u, o))) {
					const s = n.interleaved;
					s === null
						? ((i.next = i), xs(n))
						: ((i.next = s.next), (s.next = i)),
						(n.interleaved = i);

					return;
				}
			}
			catch {
			}
			finally {
			}
		}
		(t = zp(e, n, i, r)),
			t !== null && ((i = Oe()), gn(t, e, r, i), qp(t, n, r));
	}
}
function Xp(e) {
	const n = e.alternate;

	return e === ae || (n !== null && n === ae);
}
function Gp(e, n) {
	Br = xl = !0;
	const t = e.pending;
	t === null ? (n.next = n) : ((n.next = t.next), (t.next = n)),
		(e.pending = n);
}
function qp(e, n, t) {
	if (t & 4194240) {
		let r = n.lanes;
		(r &= e.pendingLanes), (t |= r), (n.lanes = t), os(e, t);
	}
}
var wl = {
	readContext: on,
	useCallback: Te,
	useContext: Te,
	useEffect: Te,
	useImperativeHandle: Te,
	useInsertionEffect: Te,
	useLayoutEffect: Te,
	useMemo: Te,
	useReducer: Te,
	useRef: Te,
	useState: Te,
	useDebugValue: Te,
	useDeferredValue: Te,
	useTransition: Te,
	useMutableSource: Te,
	useSyncExternalStore: Te,
	useId: Te,
	unstable_isNewReconciler: !1,
};
var vg = {
	readContext: on,
	useCallback(e, n) {
		return (xn().memoizedState = [e, n === void 0 ? null : n]), e;
	},
	useContext: on,
	useEffect: Ga,
	useImperativeHandle(e, n, t) {
		return (
			(t = t != null ? t.concat([e]) : null),
			Yi(4194308, 4, $p.bind(null, n, e), t)
		);
	},
	useLayoutEffect(e, n) {
		return Yi(4194308, 4, e, n);
	},
	useInsertionEffect(e, n) {
		return Yi(4, 2, e, n);
	},
	useMemo(e, n) {
		const t = xn();

		return (
			(n = n === void 0 ? null : n),
			(e = e()),
			(t.memoizedState = [e, n]),
			e
		);
	},
	useReducer(e, n, t) {
		const r = xn();

		return (
			(n = t !== void 0 ? t(n) : n),
			(r.memoizedState = r.baseState = n),
			(e = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: n,
			}),
			(r.queue = e),
			(e = e.dispatch = gg.bind(null, ae, e)),
			[r.memoizedState, e]
		);
	},
	useRef(e) {
		const n = xn();

		return (e = {current: e}), (n.memoizedState = e);
	},
	useState: Xa,
	useDebugValue: Ns,
	useDeferredValue(e) {
		return (xn().memoizedState = e);
	},
	useTransition() {
		let e = Xa(!1);
		const n = e[0];

		return (e = mg.bind(null, e[1])), (xn().memoizedState = e), [n, e];
	},
	useMutableSource() {},
	useSyncExternalStore(e, n, t) {
		const r = ae;
		const i = xn();
		if (oe) {
			if (t === void 0) {
				throw Error(_(407));
			}
			t = t();
		}
		else {
			if (((t = n()), Ee === null)) {
				throw Error(_(349));
			}
			St & 30 || Dp(r, n, t);
		}
		i.memoizedState = t;
		const l = {value: t, getSnapshot: n};

		return (
			(i.queue = l),
			Ga(Fp.bind(null, r, l, e), [e]),
			(r.flags |= 2048),
			ci(9, Ap.bind(null, r, l, t, n), void 0, null),
			t
		);
	},
	useId() {
		const e = xn();
		let n = Ee.identifierPrefix;
		if (oe) {
			var t = On;
			const r = Rn;
			(t = (r & ~(1 << (32 - mn(r) - 1))).toString(32) + t),
				(n = ':' + n + 'R' + t),
				(t = si++),
				0 < t && (n += 'H' + t.toString(32)),
				(n += ':');
		}
		else {
			(t = hg++), (n = ':' + n + 'r' + t.toString(32) + ':');
		}

		return (e.memoizedState = n);
	},
	unstable_isNewReconciler: !1,
};
var kg = {
	readContext: on,
	useCallback: bp,
	useContext: on,
	useEffect: Is,
	useImperativeHandle: Wp,
	useInsertionEffect: Hp,
	useLayoutEffect: Vp,
	useMemo: Qp,
	useReducer: vo,
	useRef: Up,
	useState() {
		return vo(ai);
	},
	useDebugValue: Ns,
	useDeferredValue(e) {
		const n = un();

		return Kp(n, xe.memoizedState, e);
	},
	useTransition() {
		const e = vo(ai)[0];
		const n = un().memoizedState;

		return [e, n];
	},
	useMutableSource: Op,
	useSyncExternalStore: Mp,
	useId: Yp,
	unstable_isNewReconciler: !1,
};
var xg = {
	readContext: on,
	useCallback: bp,
	useContext: on,
	useEffect: Is,
	useImperativeHandle: Wp,
	useInsertionEffect: Hp,
	useLayoutEffect: Vp,
	useMemo: Qp,
	useReducer: ko,
	useRef: Up,
	useState() {
		return ko(ai);
	},
	useDebugValue: Ns,
	useDeferredValue(e) {
		const n = un();

		return xe === null ? (n.memoizedState = e) : Kp(n, xe.memoizedState, e);
	},
	useTransition() {
		const e = ko(ai)[0];
		const n = un().memoizedState;

		return [e, n];
	},
	useMutableSource: Op,
	useSyncExternalStore: Mp,
	useId: Yp,
	unstable_isNewReconciler: !1,
};
function pn(e, n) {
	if (e && e.defaultProps) {
		(n = {...n}), (e = e.defaultProps);
		for (const t in e) {
			n[t] === void 0 && (n[t] = e[t]);
		}

		return n;
	}

	return n;
}
function pu(e, n, t, r) {
	(n = e.memoizedState),
		(t = t(r, n)),
		(t = t == null ? n : {...n, ...t}),
		(e.memoizedState = t),
		e.lanes === 0 && (e.updateQueue.baseState = t);
}
const jl = {
	isMounted(e) {
		return (e = e._reactInternals) ? Pt(e) === e : !1;
	},
	enqueueSetState(e, n, t) {
		e = e._reactInternals;
		const r = Oe();
		const i = tt(e);
		const l = Mn(r, i);
		(l.payload = n),
			t != null && (l.callback = t),
			(n = et(e, l, i)),
			n !== null && (gn(n, e, i, r), Qi(n, e, i));
	},
	enqueueReplaceState(e, n, t) {
		e = e._reactInternals;
		const r = Oe();
		const i = tt(e);
		const l = Mn(r, i);
		(l.tag = 1),
			(l.payload = n),
			t != null && (l.callback = t),
			(n = et(e, l, i)),
			n !== null && (gn(n, e, i, r), Qi(n, e, i));
	},
	enqueueForceUpdate(e, n) {
		e = e._reactInternals;
		const t = Oe();
		const r = tt(e);
		const i = Mn(t, r);
		(i.tag = 2),
			n != null && (i.callback = n),
			(n = et(e, i, r)),
			n !== null && (gn(n, e, r, t), Qi(n, e, r));
	},
};
function qa(e, n, t, r, i, l, o) {
	return (
		(e = e.stateNode),
		typeof e.shouldComponentUpdate === 'function'
			? e.shouldComponentUpdate(r, l, o)
			: n.prototype && n.prototype.isPureReactComponent
				? !ti(t, r) || !ti(i, l)
				: !0
	);
}
function Jp(e, n, t) {
	let r = !1;
	let i = lt;
	let l = n.contextType;

	return (
		typeof l === 'object' && l !== null
			? (l = on(l))
			: ((i = He(n) ? xt : ze.current),
				(r = n.contextTypes),
				(l = (r = r != null) ? lr(e, i) : lt)),
		(n = new n(t, l)),
		(e.memoizedState =
			n.state !== null && n.state !== void 0 ? n.state : null),
		(n.updater = jl),
		(e.stateNode = n),
		(n._reactInternals = e),
		r &&
			((e = e.stateNode),
			(e.__reactInternalMemoizedUnmaskedChildContext = i),
			(e.__reactInternalMemoizedMaskedChildContext = l)),
		n
	);
}
function Ja(e, n, t, r) {
	(e = n.state),
		typeof n.componentWillReceiveProps === 'function' &&
			n.componentWillReceiveProps(t, r),
		typeof n.UNSAFE_componentWillReceiveProps === 'function' &&
			n.UNSAFE_componentWillReceiveProps(t, r),
		n.state !== e && jl.enqueueReplaceState(n, n.state, null);
}
function du(e, n, t, r) {
	const i = e.stateNode;
	(i.props = t), (i.state = e.memoizedState), (i.refs = {}), ws(e);
	let l = n.contextType;
	typeof l === 'object' && l !== null
		? (i.context = on(l))
		: ((l = He(n) ? xt : ze.current), (i.context = lr(e, l))),
		(i.state = e.memoizedState),
		(l = n.getDerivedStateFromProps),
		typeof l === 'function' &&
			(pu(e, n, l, t), (i.state = e.memoizedState)),
		typeof n.getDerivedStateFromProps === 'function' ||
			typeof i.getSnapshotBeforeUpdate === 'function' ||
			(typeof i.UNSAFE_componentWillMount !== 'function' &&
				typeof i.componentWillMount !== 'function') ||
			((n = i.state),
			typeof i.componentWillMount === 'function' &&
				i.componentWillMount(),
			typeof i.UNSAFE_componentWillMount === 'function' &&
				i.UNSAFE_componentWillMount(),
			n !== i.state && jl.enqueueReplaceState(i, i.state, null),
			vl(e, t, i, r),
			(i.state = e.memoizedState)),
		typeof i.componentDidMount === 'function' && (e.flags |= 4194308);
}
function ar(e, n) {
	try {
		let t = '';
		let r = n;
		do {
			(t += Yh(r)), (r = r.return);
		} while (r);
		var i = t;
	}
	catch (l) {
		i =
			`
Error generating stack: ` +
			l.message +
			`
` +
			l.stack;
	}

	return {value: e, source: n, stack: i, digest: null};
}
function xo(e, n, t) {
	return {value: e, source: null, stack: t ?? null, digest: n ?? null};
}
function hu(e, n) {
	try {
		console.error(n.value);
	}
	catch (t) {
		setTimeout(() => {
			throw t;
		});
	}
}
const wg = typeof WeakMap === 'function' ? WeakMap : Map;
function Zp(e, n, t) {
	(t = Mn(-1, t)), (t.tag = 3), (t.payload = {element: null});
	const r = n.value;

	return (
		(t.callback = function () {
			El || ((El = !0), (Cu = r)), hu(e, n);
		}),
		t
	);
}
function ed(e, n, t) {
	(t = Mn(-1, t)), (t.tag = 3);
	const r = e.type.getDerivedStateFromError;
	if (typeof r === 'function') {
		const i = n.value;
		(t.payload = function () {
			return r(i);
		}),
			(t.callback = function () {
				hu(e, n);
			});
	}
	const l = e.stateNode;

	return (
		l !== null &&
			typeof l.componentDidCatch === 'function' &&
			(t.callback = function () {
				hu(e, n),
					typeof r !== 'function' &&
						(nt === null ? (nt = new Set([this])) : nt.add(this));
				const o = n.stack;
				this.componentDidCatch(n.value, {
					componentStack: o !== null ? o : '',
				});
			}),
		t
	);
}
function Za(e, n, t) {
	let r = e.pingCache;
	if (r === null) {
		r = e.pingCache = new wg();
		var i = new Set();
		r.set(n, i);
	}
	else {
		(i = r.get(n)), i === void 0 && ((i = new Set()), r.set(n, i));
	}
	i.has(t) || (i.add(t), (e = Dg.bind(null, e, n, t)), n.then(e, e));
}
function ec(e) {
	do {
		var n;
		if (
			((n = e.tag === 13) &&
				((n = e.memoizedState),
				(n = n !== null ? n.dehydrated !== null : !0)),
			n)
		) {
			return e;
		}
		e = e.return;
	} while (e !== null);

	return null;
}
function nc(e, n, t, r, i) {
	return e.mode & 1
		? ((e.flags |= 65536), (e.lanes = i), e)
		: (e === n
				? (e.flags |= 65536)
				: ((e.flags |= 128),
					(t.flags |= 131072),
					(t.flags &= -52805),
					t.tag === 1 &&
						(t.alternate === null
							? (t.tag = 17)
							: ((n = Mn(-1, 1)), (n.tag = 2), et(t, n, 1))),
					(t.lanes |= 1)),
			e);
}
const Sg = Bn.ReactCurrentOwner;
var Be = !1;
function Re(e, n, t, r) {
	n.child = e === null ? Np(n, null, t, r) : ur(n, e.child, t, r);
}
function tc(e, n, t, r, i) {
	t = t.render;
	const l = n.ref;

	return (
		Zt(n, i),
		(r = Ps(e, n, t, r, l, i)),
		(t = Ts()),
		e !== null && !Be
			? ((n.updateQueue = e.updateQueue),
				(n.flags &= -2053),
				(e.lanes &= ~i),
				jn(e, n, i))
			: (oe && t && hs(n), (n.flags |= 1), Re(e, n, r, i), n.child)
	);
}
function rc(e, n, t, r, i) {
	if (e === null) {
		var l = t.type;

		return typeof l === 'function' &&
			!Fs(l) &&
			l.defaultProps === void 0 &&
			t.compare === null &&
			t.defaultProps === void 0
			? ((n.tag = 15), (n.type = l), nd(e, n, l, r, i))
			: ((e = Ji(t.type, null, r, n, n.mode, i)),
				(e.ref = n.ref),
				(e.return = n),
				(n.child = e));
	}
	if (((l = e.child), !(e.lanes & i))) {
		const o = l.memoizedProps;
		if (
			((t = t.compare),
			(t = t !== null ? t : ti),
			t(o, r) && e.ref === n.ref)
		) {
			return jn(e, n, i);
		}
	}

	return (
		(n.flags |= 1),
		(e = rt(l, r)),
		(e.ref = n.ref),
		(e.return = n),
		(n.child = e)
	);
}
function nd(e, n, t, r, i) {
	if (e !== null) {
		const l = e.memoizedProps;
		if (ti(l, r) && e.ref === n.ref) {
			if (((Be = !1), (n.pendingProps = r = l), (e.lanes & i) !== 0)) {
				e.flags & 131072 && (Be = !0);
			}
			else {
				return (n.lanes = e.lanes), jn(e, n, i);
			}
		}
	}

	return mu(e, n, t, r, i);
}
function td(e, n, t) {
	let r = n.pendingProps;
	const i = r.children;
	const l = e !== null ? e.memoizedState : null;
	if (r.mode === 'hidden') {
		if (!(n.mode & 1)) {
			(n.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null,
			}),
				ee(Kt, Ke),
				(Ke |= t);
		}
		else {
			if (!(t & 1073741824)) {
				return (
					(e = l !== null ? l.baseLanes | t : t),
					(n.lanes = n.childLanes = 1073741824),
					(n.memoizedState = {
						baseLanes: e,
						cachePool: null,
						transitions: null,
					}),
					(n.updateQueue = null),
					ee(Kt, Ke),
					(Ke |= e),
					null
				);
			}
			(n.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null,
			}),
				(r = l !== null ? l.baseLanes : t),
				ee(Kt, Ke),
				(Ke |= r);
		}
	}
	else {
		l !== null
			? ((r = l.baseLanes | t), (n.memoizedState = null))
			: (r = t),
			ee(Kt, Ke),
			(Ke |= r);
	}

	return Re(e, n, i, t), n.child;
}
function rd(e, n) {
	const t = n.ref;
	((e === null && t !== null) || (e !== null && e.ref !== t)) &&
		((n.flags |= 512), (n.flags |= 2097152));
}
function mu(e, n, t, r, i) {
	let l = He(t) ? xt : ze.current;

	return (
		(l = lr(n, l)),
		Zt(n, i),
		(t = Ps(e, n, t, r, l, i)),
		(r = Ts()),
		e !== null && !Be
			? ((n.updateQueue = e.updateQueue),
				(n.flags &= -2053),
				(e.lanes &= ~i),
				jn(e, n, i))
			: (oe && r && hs(n), (n.flags |= 1), Re(e, n, t, i), n.child)
	);
}
function ic(e, n, t, r, i) {
	if (He(t)) {
		var l = !0;
		dl(n);
	}
	else {
		l = !1;
	}
	if ((Zt(n, i), n.stateNode === null)) {
		Xi(e, n), Jp(n, t, r), du(n, t, r, i), (r = !0);
	}
	else if (e === null) {
		var o = n.stateNode;
		var u = n.memoizedProps;
		o.props = u;
		var s = o.context;
		var a = t.contextType;
		typeof a === 'object' && a !== null
			? (a = on(a))
			: ((a = He(t) ? xt : ze.current), (a = lr(n, a)));
		var c = t.getDerivedStateFromProps;
		var f =
			typeof c === 'function' ||
			typeof o.getSnapshotBeforeUpdate === 'function';
		f ||
			(typeof o.UNSAFE_componentWillReceiveProps !== 'function' &&
				typeof o.componentWillReceiveProps !== 'function') ||
			((u !== r || s !== a) && Ja(n, o, r, a)),
			(Wn = !1);
		var d = n.memoizedState;
		(o.state = d),
			vl(n, r, o, i),
			(s = n.memoizedState),
			u !== r || d !== s || Ue.current || Wn
				? (typeof c === 'function' &&
						(pu(n, t, c, r), (s = n.memoizedState)),
					(u = Wn || qa(n, t, u, r, d, s, a))
						? (f ||
								(typeof o.UNSAFE_componentWillMount !==
									'function' &&
									typeof o.componentWillMount !==
										'function') ||
								(typeof o.componentWillMount === 'function' &&
									o.componentWillMount(),
								typeof o.UNSAFE_componentWillMount ===
									'function' &&
									o.UNSAFE_componentWillMount()),
							typeof o.componentDidMount === 'function' &&
								(n.flags |= 4194308))
						: (typeof o.componentDidMount === 'function' &&
								(n.flags |= 4194308),
							(n.memoizedProps = r),
							(n.memoizedState = s)),
					(o.props = r),
					(o.state = s),
					(o.context = a),
					(r = u))
				: (typeof o.componentDidMount === 'function' &&
						(n.flags |= 4194308),
					(r = !1));
	}
	else {
		(o = n.stateNode),
			Lp(e, n),
			(u = n.memoizedProps),
			(a = n.type === n.elementType ? u : pn(n.type, u)),
			(o.props = a),
			(f = n.pendingProps),
			(d = o.context),
			(s = t.contextType),
			typeof s === 'object' && s !== null
				? (s = on(s))
				: ((s = He(t) ? xt : ze.current), (s = lr(n, s)));
		const p = t.getDerivedStateFromProps;
		(c =
			typeof p === 'function' ||
			typeof o.getSnapshotBeforeUpdate === 'function') ||
			(typeof o.UNSAFE_componentWillReceiveProps !== 'function' &&
				typeof o.componentWillReceiveProps !== 'function') ||
			((u !== f || d !== s) && Ja(n, o, r, s)),
			(Wn = !1),
			(d = n.memoizedState),
			(o.state = d),
			vl(n, r, o, i);
		let x = n.memoizedState;
		u !== f || d !== x || Ue.current || Wn
			? (typeof p === 'function' &&
					(pu(n, t, p, r), (x = n.memoizedState)),
				(a = Wn || qa(n, t, a, r, d, x, s) || !1)
					? (c ||
							(typeof o.UNSAFE_componentWillUpdate !==
								'function' &&
								typeof o.componentWillUpdate !== 'function') ||
							(typeof o.componentWillUpdate === 'function' &&
								o.componentWillUpdate(r, x, s),
							typeof o.UNSAFE_componentWillUpdate ===
								'function' &&
								o.UNSAFE_componentWillUpdate(r, x, s)),
						typeof o.componentDidUpdate === 'function' &&
							(n.flags |= 4),
						typeof o.getSnapshotBeforeUpdate === 'function' &&
							(n.flags |= 1024))
					: (typeof o.componentDidUpdate !== 'function' ||
							(u === e.memoizedProps && d === e.memoizedState) ||
							(n.flags |= 4),
						typeof o.getSnapshotBeforeUpdate !== 'function' ||
							(u === e.memoizedProps && d === e.memoizedState) ||
							(n.flags |= 1024),
						(n.memoizedProps = r),
						(n.memoizedState = x)),
				(o.props = r),
				(o.state = x),
				(o.context = s),
				(r = a))
			: (typeof o.componentDidUpdate !== 'function' ||
					(u === e.memoizedProps && d === e.memoizedState) ||
					(n.flags |= 4),
				typeof o.getSnapshotBeforeUpdate !== 'function' ||
					(u === e.memoizedProps && d === e.memoizedState) ||
					(n.flags |= 1024),
				(r = !1));
	}

	return gu(e, n, t, r, l, i);
}
function gu(e, n, t, r, i, l) {
	rd(e, n);
	const o = (n.flags & 128) !== 0;
	if (!r && !o) {
		return i && $a(n, t, !1), jn(e, n, l);
	}
	(r = n.stateNode), (Sg.current = n);
	const u =
		o && typeof t.getDerivedStateFromError !== 'function'
			? null
			: r.render();

	return (
		(n.flags |= 1),
		e !== null && o
			? ((n.child = ur(n, e.child, null, l)),
				(n.child = ur(n, null, u, l)))
			: Re(e, n, u, l),
		(n.memoizedState = r.state),
		i && $a(n, t, !0),
		n.child
	);
}
function id(e) {
	const n = e.stateNode;
	n.pendingContext
		? Va(e, n.pendingContext, n.pendingContext !== n.context)
		: n.context && Va(e, n.context, !1),
		Ss(e, n.containerInfo);
}
function lc(e, n, t, r, i) {
	return or(), gs(i), (n.flags |= 256), Re(e, n, t, r), n.child;
}
const yu = {dehydrated: null, treeContext: null, retryLane: 0};
function vu(e) {
	return {baseLanes: e, cachePool: null, transitions: null};
}
function ld(e, n, t) {
	let r = n.pendingProps;
	let i = se.current;
	let l = !1;
	let o = (n.flags & 128) !== 0;
	let u;
	if (
		((u = o) ||
			(u = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
		u
			? ((l = !0), (n.flags &= -129))
			: (e === null || e.memoizedState !== null) && (i |= 1),
		ee(se, i & 1),
		e === null)
	) {
		return (
			cu(n),
			(e = n.memoizedState),
			e !== null && ((e = e.dehydrated), e !== null)
				? (n.mode & 1
						? e.data === '$!'
							? (n.lanes = 8)
							: (n.lanes = 1073741824)
						: (n.lanes = 1),
					null)
				: ((o = r.children),
					(e = r.fallback),
					l
						? ((r = n.mode),
							(l = n.child),
							(o = {mode: 'hidden', children: o}),
							!(r & 1) && l !== null
								? ((l.childLanes = 0), (l.pendingProps = o))
								: (l = Hl(o, r, 0, null)),
							(e = kt(e, r, t, null)),
							(l.return = n),
							(e.return = n),
							(l.sibling = e),
							(n.child = l),
							(n.child.memoizedState = vu(t)),
							(n.memoizedState = yu),
							e)
						: zs(n, o))
		);
	}
	if (
		((i = e.memoizedState), i !== null && ((u = i.dehydrated), u !== null))
	) {
		return Eg(e, n, o, r, u, i, t);
	}
	if (l) {
		(l = r.fallback), (o = n.mode), (i = e.child), (u = i.sibling);
		const s = {mode: 'hidden', children: r.children};

		return (
			!(o & 1) && n.child !== i
				? ((r = n.child),
					(r.childLanes = 0),
					(r.pendingProps = s),
					(n.deletions = null))
				: ((r = rt(i, s)),
					(r.subtreeFlags = i.subtreeFlags & 14680064)),
			u !== null
				? (l = rt(u, l))
				: ((l = kt(l, o, t, null)), (l.flags |= 2)),
			(l.return = n),
			(r.return = n),
			(r.sibling = l),
			(n.child = r),
			(r = l),
			(l = n.child),
			(o = e.child.memoizedState),
			(o =
				o === null
					? vu(t)
					: {
							baseLanes: o.baseLanes | t,
							cachePool: null,
							transitions: o.transitions,
						}),
			(l.memoizedState = o),
			(l.childLanes = e.childLanes & ~t),
			(n.memoizedState = yu),
			r
		);
	}

	return (
		(l = e.child),
		(e = l.sibling),
		(r = rt(l, {mode: 'visible', children: r.children})),
		!(n.mode & 1) && (r.lanes = t),
		(r.return = n),
		(r.sibling = null),
		e !== null &&
			((t = n.deletions),
			t === null ? ((n.deletions = [e]), (n.flags |= 16)) : t.push(e)),
		(n.child = r),
		(n.memoizedState = null),
		r
	);
}
function zs(e, n) {
	return (
		(n = Hl({mode: 'visible', children: n}, e.mode, 0, null)),
		(n.return = e),
		(e.child = n)
	);
}
function Mi(e, n, t, r) {
	return (
		r !== null && gs(r),
		ur(n, e.child, null, t),
		(e = zs(n, n.pendingProps.children)),
		(e.flags |= 2),
		(n.memoizedState = null),
		e
	);
}
function Eg(e, n, t, r, i, l, o) {
	if (t) {
		return n.flags & 256
			? ((n.flags &= -257), (r = xo(Error(_(422)))), Mi(e, n, o, r))
			: n.memoizedState !== null
				? ((n.child = e.child), (n.flags |= 128), null)
				: ((l = r.fallback),
					(i = n.mode),
					(r = Hl(
						{mode: 'visible', children: r.children},
						i,
						0,
						null
					)),
					(l = kt(l, i, o, null)),
					(l.flags |= 2),
					(r.return = n),
					(l.return = n),
					(r.sibling = l),
					(n.child = r),
					n.mode & 1 && ur(n, e.child, null, o),
					(n.child.memoizedState = vu(o)),
					(n.memoizedState = yu),
					l);
	}
	if (!(n.mode & 1)) {
		return Mi(e, n, o, null);
	}
	if (i.data === '$!') {
		if (((r = i.nextSibling && i.nextSibling.dataset), r)) {
			var u = r.dgst;
		}

		return (
			(r = u), (l = Error(_(419))), (r = xo(l, r, void 0)), Mi(e, n, o, r)
		);
	}
	if (((u = (o & e.childLanes) !== 0), Be || u)) {
		if (((r = Ee), r !== null)) {
			switch (o & -o) {
				case 4:
					i = 2;
					break;
				case 16:
					i = 8;
					break;
				case 64:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
				case 67108864:
					i = 32;
					break;
				case 536870912:
					i = 268435456;
					break;
				default:
					i = 0;
			}
			(i = i & (r.suspendedLanes | o) ? 0 : i),
				i !== 0 &&
					i !== l.retryLane &&
					((l.retryLane = i), Fn(e, i), gn(r, e, i, -1));
		}

		return As(), (r = xo(Error(_(421)))), Mi(e, n, o, r);
	}

	return i.data === '$?'
		? ((n.flags |= 128),
			(n.child = e.child),
			(n = Ag.bind(null, e)),
			(i._reactRetry = n),
			null)
		: ((e = l.treeContext),
			(Ye = Zn(i.nextSibling)),
			(Ge = n),
			(oe = !0),
			(hn = null),
			e !== null &&
				((en[nn++] = Rn),
				(en[nn++] = On),
				(en[nn++] = wt),
				(Rn = e.id),
				(On = e.overflow),
				(wt = n)),
			(n = zs(n, r.children)),
			(n.flags |= 4096),
			n);
}
function oc(e, n, t) {
	e.lanes |= n;
	const r = e.alternate;
	r !== null && (r.lanes |= n), fu(e.return, n, t);
}
function wo(e, n, t, r, i) {
	const l = e.memoizedState;
	l === null
		? (e.memoizedState = {
				isBackwards: n,
				rendering: null,
				renderingStartTime: 0,
				last: r,
				tail: t,
				tailMode: i,
			})
		: ((l.isBackwards = n),
			(l.rendering = null),
			(l.renderingStartTime = 0),
			(l.last = r),
			(l.tail = t),
			(l.tailMode = i));
}
function od(e, n, t) {
	let r = n.pendingProps;
	let i = r.revealOrder;
	const l = r.tail;
	if ((Re(e, n, r.children, t), (r = se.current), r & 2)) {
		(r = (r & 1) | 2), (n.flags |= 128);
	}
	else {
		if (e !== null && e.flags & 128) {
			e: for (e = n.child; e !== null; ) {
				if (e.tag === 13) {
					e.memoizedState !== null && oc(e, t, n);
				}
				else if (e.tag === 19) {
					oc(e, t, n);
				}
				else if (e.child !== null) {
					(e.child.return = e), (e = e.child);
					continue;
				}
				if (e === n) {
					break e;
				}
				for (; e.sibling === null; ) {
					if (e.return === null || e.return === n) {
						break e;
					}
					e = e.return;
				}
				(e.sibling.return = e.return), (e = e.sibling);
			}
		}
		r &= 1;
	}
	if ((ee(se, r), !(n.mode & 1))) {
		n.memoizedState = null;
	}
	else {
		switch (i) {
			case 'forwards':
				for (t = n.child, i = null; t !== null; ) {
					(e = t.alternate),
						e !== null && kl(e) === null && (i = t),
						(t = t.sibling);
				}
				(t = i),
					t === null
						? ((i = n.child), (n.child = null))
						: ((i = t.sibling), (t.sibling = null)),
					wo(n, !1, i, t, l);
				break;
			case 'backwards':
				for (t = null, i = n.child, n.child = null; i !== null; ) {
					if (((e = i.alternate), e !== null && kl(e) === null)) {
						n.child = i;
						break;
					}
					(e = i.sibling), (i.sibling = t), (t = i), (i = e);
				}
				wo(n, !0, t, null, l);
				break;
			case 'together':
				wo(n, !1, null, null, void 0);
				break;
			default:
				n.memoizedState = null;
		}
	}

	return n.child;
}
function Xi(e, n) {
	!(n.mode & 1) &&
		e !== null &&
		((e.alternate = null), (n.alternate = null), (n.flags |= 2));
}
function jn(e, n, t) {
	if (
		(e !== null && (n.dependencies = e.dependencies),
		(Et |= n.lanes),
		!(t & n.childLanes))
	) {
		return null;
	}
	if (e !== null && n.child !== e.child) {
		throw Error(_(153));
	}
	if (n.child !== null) {
		for (
			e = n.child, t = rt(e, e.pendingProps), n.child = t, t.return = n;
			e.sibling !== null;

		) {
			(e = e.sibling),
				(t = t.sibling = rt(e, e.pendingProps)),
				(t.return = n);
		}
		t.sibling = null;
	}

	return n.child;
}
function Cg(e, n, t) {
	switch (n.tag) {
		case 3:
			id(n), or();
			break;
		case 5:
			Rp(n);
			break;
		case 1:
			He(n.type) && dl(n);
			break;
		case 4:
			Ss(n, n.stateNode.containerInfo);
			break;
		case 10:
			var r = n.type._context;
			var i = n.memoizedProps.value;
			ee(gl, r._currentValue), (r._currentValue = i);
			break;
		case 13:
			if (((r = n.memoizedState), r !== null)) {
				return r.dehydrated !== null
					? (ee(se, se.current & 1), (n.flags |= 128), null)
					: t & n.child.childLanes
						? ld(e, n, t)
						: (ee(se, se.current & 1),
							(e = jn(e, n, t)),
							e !== null ? e.sibling : null);
			}
			ee(se, se.current & 1);
			break;
		case 19:
			if (((r = (t & n.childLanes) !== 0), e.flags & 128)) {
				if (r) {
					return od(e, n, t);
				}
				n.flags |= 128;
			}
			if (
				((i = n.memoizedState),
				i !== null &&
					((i.rendering = null),
					(i.tail = null),
					(i.lastEffect = null)),
				ee(se, se.current),
				r)
			) {
				break;
			}

			return null;
		case 22:
		case 23:
			return (n.lanes = 0), td(e, n, t);
	}

	return jn(e, n, t);
}
let ud;
let ku;
let sd;
let ad;
ud = function (e, n) {
	for (let t = n.child; t !== null; ) {
		if (t.tag === 5 || t.tag === 6) {
			e.appendChild(t.stateNode);
		}
		else if (t.tag !== 4 && t.child !== null) {
			(t.child.return = t), (t = t.child);
			continue;
		}
		if (t === n) {
			break;
		}
		for (; t.sibling === null; ) {
			if (t.return === null || t.return === n) {
				return;
			}
			t = t.return;
		}
		(t.sibling.return = t.return), (t = t.sibling);
	}
};
ku = function () {};
sd = function (e, n, t, r) {
	let i = e.memoizedProps;
	if (i !== r) {
		(e = n.stateNode), yt(_n.current);
		let l = null;
		switch (t) {
			case 'input':
				(i = Ho(e, i)), (r = Ho(e, r)), (l = []);
				break;
			case 'select':
				(i = {...i, value: void 0}),
					(r = {...r, value: void 0}),
					(l = []);
				break;
			case 'textarea':
				(i = Wo(e, i)), (r = Wo(e, r)), (l = []);
				break;
			default:
				typeof i.onClick !== 'function' &&
					typeof r.onClick === 'function' &&
					(e.onclick = fl);
		}
		Qo(t, r);
		let o;
		t = null;
		for (a in i) {
			if (!r.hasOwnProperty(a) && i.hasOwnProperty(a) && i[a] != null) {
				if (a === 'style') {
					var u = i[a];
					for (o in u) {
						u.hasOwnProperty(o) && (t || (t = {}), (t[o] = ''));
					}
				}
				else {
					a !== 'dangerouslySetInnerHTML' &&
						a !== 'children' &&
						a !== 'suppressContentEditableWarning' &&
						a !== 'suppressHydrationWarning' &&
						a !== 'autoFocus' &&
						(Xr.hasOwnProperty(a)
							? l || (l = [])
							: (l = l || []).push(a, null));
				}
			}
		}
		for (a in r) {
			let s = r[a];
			if (
				((u = i != null ? i[a] : void 0),
				r.hasOwnProperty(a) && s !== u && (s != null || u != null))
			) {
				if (a === 'style') {
					if (u) {
						for (o in u) {
							!u.hasOwnProperty(o) ||
								(s && s.hasOwnProperty(o)) ||
								(t || (t = {}), (t[o] = ''));
						}
						for (o in s) {
							s.hasOwnProperty(o) &&
								u[o] !== s[o] &&
								(t || (t = {}), (t[o] = s[o]));
						}
					}
					else {
						t || (l || (l = []), l.push(a, t)), (t = s);
					}
				}
				else {
					a === 'dangerouslySetInnerHTML'
						? ((s = s ? s.__html : void 0),
							(u = u ? u.__html : void 0),
							s != null && u !== s && (l = l || []).push(a, s))
						: a === 'children'
							? (typeof s !== 'string' &&
									typeof s !== 'number') ||
								(l = l || []).push(a, '' + s)
							: a !== 'suppressContentEditableWarning' &&
								a !== 'suppressHydrationWarning' &&
								(Xr.hasOwnProperty(a)
									? (s != null &&
											a === 'onScroll' &&
											re('scroll', e),
										l || u === s || (l = []))
									: (l = l || []).push(a, s));
				}
			}
		}
		t && (l = l || []).push('style', t);
		var a = l;
		(n.updateQueue = a) && (n.flags |= 4);
	}
};
ad = function (e, n, t, r) {
	t !== r && (n.flags |= 4);
};
function Cr(e, n) {
	if (!oe) {
		switch (e.tailMode) {
			case 'hidden':
				n = e.tail;
				for (var t = null; n !== null; ) {
					n.alternate !== null && (t = n), (n = n.sibling);
				}
				t === null ? (e.tail = null) : (t.sibling = null);
				break;
			case 'collapsed':
				t = e.tail;
				for (var r = null; t !== null; ) {
					t.alternate !== null && (r = t), (t = t.sibling);
				}
				r === null
					? n || e.tail === null
						? (e.tail = null)
						: (e.tail.sibling = null)
					: (r.sibling = null);
		}
	}
}
function Ie(e) {
	const n = e.alternate !== null && e.alternate.child === e.child;
	let t = 0;
	let r = 0;
	if (n) {
		for (var i = e.child; i !== null; ) {
			(t |= i.lanes | i.childLanes),
				(r |= i.subtreeFlags & 14680064),
				(r |= i.flags & 14680064),
				(i.return = e),
				(i = i.sibling);
		}
	}
	else {
		for (i = e.child; i !== null; ) {
			(t |= i.lanes | i.childLanes),
				(r |= i.subtreeFlags),
				(r |= i.flags),
				(i.return = e),
				(i = i.sibling);
		}
	}

	return (e.subtreeFlags |= r), (e.childLanes = t), n;
}
function _g(e, n, t) {
	let r = n.pendingProps;
	switch ((ms(n), n.tag)) {
		case 2:
		case 16:
		case 15:
		case 0:
		case 11:
		case 7:
		case 8:
		case 12:
		case 9:
		case 14:
			return Ie(n), null;
		case 1:
			return He(n.type) && pl(), Ie(n), null;
		case 3:
			return (
				(r = n.stateNode),
				sr(),
				ie(Ue),
				ie(ze),
				Cs(),
				r.pendingContext &&
					((r.context = r.pendingContext), (r.pendingContext = null)),
				(e === null || e.child === null) &&
					(Ri(n)
						? (n.flags |= 4)
						: e === null ||
							(e.memoizedState.isDehydrated &&
								!(n.flags & 256)) ||
							((n.flags |= 1024),
							hn !== null && (Tu(hn), (hn = null)))),
				ku(e, n),
				Ie(n),
				null
			);
		case 5:
			Es(n);
			var i = yt(ui.current);
			if (((t = n.type), e !== null && n.stateNode != null)) {
				sd(e, n, t, r, i),
					e.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152));
			}
			else {
				if (!r) {
					if (n.stateNode === null) {
						throw Error(_(166));
					}

					return Ie(n), null;
				}
				if (((e = yt(_n.current)), Ri(n))) {
					(r = n.stateNode), (t = n.type);
					var l = n.memoizedProps;
					switch (
						((r[Sn] = n), (r[li] = l), (e = (n.mode & 1) !== 0), t)
					) {
						case 'dialog':
							re('cancel', r), re('close', r);
							break;
						case 'iframe':
						case 'object':
						case 'embed':
							re('load', r);
							break;
						case 'video':
						case 'audio':
							for (i = 0; i < Lr.length; i++) {
								re(Lr[i], r);
							}
							break;
						case 'source':
							re('error', r);
							break;
						case 'img':
						case 'image':
						case 'link':
							re('error', r), re('load', r);
							break;
						case 'details':
							re('toggle', r);
							break;
						case 'input':
							ma(r, l), re('invalid', r);
							break;
						case 'select':
							(r._wrapperState = {wasMultiple: !!l.multiple}),
								re('invalid', r);
							break;
						case 'textarea':
							ya(r, l), re('invalid', r);
					}
					Qo(t, l), (i = null);
					for (var o in l) {
						if (l.hasOwnProperty(o)) {
							var u = l[o];
							o === 'children'
								? typeof u === 'string'
									? r.textContent !== u &&
										(l.suppressHydrationWarning !== !0 &&
											Li(r.textContent, u, e),
										(i = ['children', u]))
									: typeof u === 'number' &&
										r.textContent !== '' + u &&
										(l.suppressHydrationWarning !== !0 &&
											Li(r.textContent, u, e),
										(i = ['children', '' + u]))
								: Xr.hasOwnProperty(o) &&
									u != null &&
									o === 'onScroll' &&
									re('scroll', r);
						}
					}
					switch (t) {
						case 'input':
							Ei(r), ga(r, l, !0);
							break;
						case 'textarea':
							Ei(r), va(r);
							break;
						case 'select':
						case 'option':
							break;
						default:
							typeof l.onClick === 'function' && (r.onclick = fl);
					}
					(r = i), (n.updateQueue = r), r !== null && (n.flags |= 4);
				}
				else {
					(o = i.nodeType === 9 ? i : i.ownerDocument),
						e === 'http://www.w3.org/1999/xhtml' && (e = Ff(t)),
						e === 'http://www.w3.org/1999/xhtml'
							? t === 'script'
								? ((e = o.createElement('div')),
									(e.innerHTML = '<script></script>'),
									(e = e.removeChild(e.firstChild)))
								: typeof r.is === 'string'
									? (e = o.createElement(t, {is: r.is}))
									: ((e = o.createElement(t)),
										t === 'select' &&
											((o = e),
											r.multiple
												? (o.multiple = !0)
												: r.size && (o.size = r.size)))
							: (e = o.createElementNS(e, t)),
						(e[Sn] = n),
						(e[li] = r),
						ud(e, n, !1, !1),
						(n.stateNode = e);
					e: {
						switch (((o = Ko(t, r)), t)) {
							case 'dialog':
								re('cancel', e), re('close', e), (i = r);
								break;
							case 'iframe':
							case 'object':
							case 'embed':
								re('load', e), (i = r);
								break;
							case 'video':
							case 'audio':
								for (i = 0; i < Lr.length; i++) {
									re(Lr[i], e);
								}
								i = r;
								break;
							case 'source':
								re('error', e), (i = r);
								break;
							case 'img':
							case 'image':
							case 'link':
								re('error', e), re('load', e), (i = r);
								break;
							case 'details':
								re('toggle', e), (i = r);
								break;
							case 'input':
								ma(e, r), (i = Ho(e, r)), re('invalid', e);
								break;
							case 'option':
								i = r;
								break;
							case 'select':
								(e._wrapperState = {wasMultiple: !!r.multiple}),
									(i = {...r, value: void 0}),
									re('invalid', e);
								break;
							case 'textarea':
								ya(e, r), (i = Wo(e, r)), re('invalid', e);
								break;
							default:
								i = r;
						}
						Qo(t, i), (u = i);
						for (l in u) {
							if (u.hasOwnProperty(l)) {
								let s = u[l];
								l === 'style'
									? Uf(e, s)
									: l === 'dangerouslySetInnerHTML'
										? ((s = s ? s.__html : void 0),
											s != null && jf(e, s))
										: l === 'children'
											? typeof s === 'string'
												? (t !== 'textarea' ||
														s !== '') &&
													Gr(e, s)
												: typeof s === 'number' &&
													Gr(e, '' + s)
											: l !==
													'suppressContentEditableWarning' &&
												l !==
													'suppressHydrationWarning' &&
												l !== 'autoFocus' &&
												(Xr.hasOwnProperty(l)
													? s != null &&
														l === 'onScroll' &&
														re('scroll', e)
													: s != null &&
														es(e, l, s, o));
							}
						}
						switch (t) {
							case 'input':
								Ei(e), ga(e, r, !1);
								break;
							case 'textarea':
								Ei(e), va(e);
								break;
							case 'option':
								r.value != null &&
									e.setAttribute('value', '' + it(r.value));
								break;
							case 'select':
								(e.multiple = !!r.multiple),
									(l = r.value),
									l != null
										? Xt(e, !!r.multiple, l, !1)
										: r.defaultValue != null &&
											Xt(
												e,
												!!r.multiple,
												r.defaultValue,
												!0
											);
								break;
							default:
								typeof i.onClick === 'function' &&
									(e.onclick = fl);
						}
						switch (t) {
							case 'button':
							case 'input':
							case 'select':
							case 'textarea':
								r = !!r.autoFocus;
								break e;
							case 'img':
								r = !0;
								break e;
							default:
								r = !1;
						}
					}
					r && (n.flags |= 4);
				}
				n.ref !== null && ((n.flags |= 512), (n.flags |= 2097152));
			}

			return Ie(n), null;
		case 6:
			if (e && n.stateNode != null) {
				ad(e, n, e.memoizedProps, r);
			}
			else {
				if (typeof r !== 'string' && n.stateNode === null) {
					throw Error(_(166));
				}
				if (((t = yt(ui.current)), yt(_n.current), Ri(n))) {
					if (
						((r = n.stateNode),
						(t = n.memoizedProps),
						(r[Sn] = n),
						(l = r.nodeValue !== t) && ((e = Ge), e !== null))
					) {
						switch (e.tag) {
							case 3:
								Li(r.nodeValue, t, (e.mode & 1) !== 0);
								break;
							case 5:
								e.memoizedProps.suppressHydrationWarning !==
									!0 &&
									Li(r.nodeValue, t, (e.mode & 1) !== 0);
						}
					}
					l && (n.flags |= 4);
				}
				else {
					(r = (
						t.nodeType === 9 ? t : t.ownerDocument
					).createTextNode(r)),
						(r[Sn] = n),
						(n.stateNode = r);
				}
			}

			return Ie(n), null;
		case 13:
			if (
				(ie(se),
				(r = n.memoizedState),
				e === null ||
					(e.memoizedState !== null &&
						e.memoizedState.dehydrated !== null))
			) {
				if (oe && Ye !== null && n.mode & 1 && !(n.flags & 128)) {
					Tp(), or(), (n.flags |= 98560), (l = !1);
				}
				else if (((l = Ri(n)), r !== null && r.dehydrated !== null)) {
					if (e === null) {
						if (!l) {
							throw Error(_(318));
						}
						if (
							((l = n.memoizedState),
							(l = l !== null ? l.dehydrated : null),
							!l)
						) {
							throw Error(_(317));
						}
						l[Sn] = n;
					}
					else {
						or(),
							!(n.flags & 128) && (n.memoizedState = null),
							(n.flags |= 4);
					}
					Ie(n), (l = !1);
				}
				else {
					hn !== null && (Tu(hn), (hn = null)), (l = !0);
				}
				if (!l) {
					return n.flags & 65536 ? n : null;
				}
			}

			return n.flags & 128
				? ((n.lanes = t), n)
				: ((r = r !== null),
					r !== (e !== null && e.memoizedState !== null) &&
						r &&
						((n.child.flags |= 8192),
						n.mode & 1 &&
							(e === null || se.current & 1
								? we === 0 && (we = 3)
								: As())),
					n.updateQueue !== null && (n.flags |= 4),
					Ie(n),
					null);
		case 4:
			return (
				sr(),
				ku(e, n),
				e === null && ri(n.stateNode.containerInfo),
				Ie(n),
				null
			);
		case 10:
			return ks(n.type._context), Ie(n), null;
		case 17:
			return He(n.type) && pl(), Ie(n), null;
		case 19:
			if ((ie(se), (l = n.memoizedState), l === null)) {
				return Ie(n), null;
			}
			if (((r = (n.flags & 128) !== 0), (o = l.rendering), o === null)) {
				if (r) {
					Cr(l, !1);
				}
				else {
					if (we !== 0 || (e !== null && e.flags & 128)) {
						for (e = n.child; e !== null; ) {
							if (((o = kl(e)), o !== null)) {
								for (
									n.flags |= 128,
										Cr(l, !1),
										r = o.updateQueue,
										r !== null &&
											((n.updateQueue = r),
											(n.flags |= 4)),
										n.subtreeFlags = 0,
										r = t,
										t = n.child;
									t !== null;

								) {
									(l = t),
										(e = r),
										(l.flags &= 14680066),
										(o = l.alternate),
										o === null
											? ((l.childLanes = 0),
												(l.lanes = e),
												(l.child = null),
												(l.subtreeFlags = 0),
												(l.memoizedProps = null),
												(l.memoizedState = null),
												(l.updateQueue = null),
												(l.dependencies = null),
												(l.stateNode = null))
											: ((l.childLanes = o.childLanes),
												(l.lanes = o.lanes),
												(l.child = o.child),
												(l.subtreeFlags = 0),
												(l.deletions = null),
												(l.memoizedProps =
													o.memoizedProps),
												(l.memoizedState =
													o.memoizedState),
												(l.updateQueue = o.updateQueue),
												(l.type = o.type),
												(e = o.dependencies),
												(l.dependencies =
													e === null
														? null
														: {
																lanes: e.lanes,
																firstContext:
																	e.firstContext,
															})),
										(t = t.sibling);
								}

								return ee(se, (se.current & 1) | 2), n.child;
							}
							e = e.sibling;
						}
					}
					l.tail !== null &&
						he() > cr &&
						((n.flags |= 128),
						(r = !0),
						Cr(l, !1),
						(n.lanes = 4194304));
				}
			}
			else {
				if (!r) {
					if (((e = kl(o)), e !== null)) {
						if (
							((n.flags |= 128),
							(r = !0),
							(t = e.updateQueue),
							t !== null && ((n.updateQueue = t), (n.flags |= 4)),
							Cr(l, !0),
							l.tail === null &&
								l.tailMode === 'hidden' &&
								!o.alternate &&
								!oe)
						) {
							return Ie(n), null;
						}
					}
					else {
						2 * he() - l.renderingStartTime > cr &&
							t !== 1073741824 &&
							((n.flags |= 128),
							(r = !0),
							Cr(l, !1),
							(n.lanes = 4194304));
					}
				}
				l.isBackwards
					? ((o.sibling = n.child), (n.child = o))
					: ((t = l.last),
						t !== null ? (t.sibling = o) : (n.child = o),
						(l.last = o));
			}

			return l.tail !== null
				? ((n = l.tail),
					(l.rendering = n),
					(l.tail = n.sibling),
					(l.renderingStartTime = he()),
					(n.sibling = null),
					(t = se.current),
					ee(se, r ? (t & 1) | 2 : t & 1),
					n)
				: (Ie(n), null);
		case 22:
		case 23:
			return (
				Ds(),
				(r = n.memoizedState !== null),
				e !== null &&
					(e.memoizedState !== null) !== r &&
					(n.flags |= 8192),
				r && n.mode & 1
					? Ke & 1073741824 &&
						(Ie(n), n.subtreeFlags & 6 && (n.flags |= 8192))
					: Ie(n),
				null
			);
		case 24:
			return null;
		case 25:
			return null;
	}
	throw Error(_(156, n.tag));
}
function Pg(e, n) {
	switch ((ms(n), n.tag)) {
		case 1:
			return (
				He(n.type) && pl(),
				(e = n.flags),
				e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
			);
		case 3:
			return (
				sr(),
				ie(Ue),
				ie(ze),
				Cs(),
				(e = n.flags),
				e & 65536 && !(e & 128)
					? ((n.flags = (e & -65537) | 128), n)
					: null
			);
		case 5:
			return Es(n), null;
		case 13:
			if (
				(ie(se),
				(e = n.memoizedState),
				e !== null && e.dehydrated !== null)
			) {
				if (n.alternate === null) {
					throw Error(_(340));
				}
				or();
			}

			return (
				(e = n.flags),
				e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
			);
		case 19:
			return ie(se), null;
		case 4:
			return sr(), null;
		case 10:
			return ks(n.type._context), null;
		case 22:
		case 23:
			return Ds(), null;
		case 24:
			return null;
		default:
			return null;
	}
}
let Di = !1;
let Ne = !1;
const Tg = typeof WeakSet === 'function' ? WeakSet : Set;
let O = null;
function Qt(e, n) {
	const t = e.ref;
	if (t !== null) {
		if (typeof t === 'function') {
			try {
				t(null);
			}
			catch (r) {
				pe(e, n, r);
			}
		}
		else {
			t.current = null;
		}
	}
}
function xu(e, n, t) {
	try {
		t();
	}
	catch (r) {
		pe(e, n, r);
	}
}
let uc = !1;
function Ig(e, n) {
	if (((ru = sl), (e = hp()), ds(e))) {
		if ('selectionStart' in e) {
			var t = {start: e.selectionStart, end: e.selectionEnd};
		}
		else {
			e: {
				t = ((t = e.ownerDocument) && t.defaultView) || window;
				let r = t.getSelection && t.getSelection();
				if (r && r.rangeCount !== 0) {
					t = r.anchorNode;
					const i = r.anchorOffset;
					const l = r.focusNode;
					r = r.focusOffset;
					try {
						t.nodeType, l.nodeType;
					}
					catch {
						t = null;
						break e;
					}
					let o = 0;
					let u = -1;
					let s = -1;
					let a = 0;
					let c = 0;
					let f = e;
					let d = null;
					n: for (;;) {
						for (
							var p;
							f !== t ||
								(i !== 0 && f.nodeType !== 3) ||
								(u = o + i),
								f !== l ||
									(r !== 0 && f.nodeType !== 3) ||
									(s = o + r),
								f.nodeType === 3 && (o += f.nodeValue.length),
								(p = f.firstChild) !== null;

						) {
							(d = f), (f = p);
						}
						for (;;) {
							if (f === e) {
								break n;
							}
							if (
								(d === t && ++a === i && (u = o),
								d === l && ++c === r && (s = o),
								(p = f.nextSibling) !== null)
							) {
								break;
							}
							(f = d), (d = f.parentNode);
						}
						f = p;
					}
					t = u === -1 || s === -1 ? null : {start: u, end: s};
				}
				else {
					t = null;
				}
			}
		}
		t = t || {start: 0, end: 0};
	}
	else {
		t = null;
	}
	for (
		iu = {focusedElem: e, selectionRange: t}, sl = !1, O = n;
		O !== null;

	) {
		if (
			((n = O),
			(e = n.child),
			(n.subtreeFlags & 1028) !== 0 && e !== null)
		) {
			(e.return = n), (O = e);
		}
		else {
			for (; O !== null; ) {
				n = O;
				try {
					var x = n.alternate;
					if (n.flags & 1024) {
						switch (n.tag) {
							case 0:
							case 11:
							case 15:
								break;
							case 1:
								if (x !== null) {
									const k = x.memoizedProps;
									const C = x.memoizedState;
									const h = n.stateNode;
									const m = h.getSnapshotBeforeUpdate(
										n.elementType === n.type
											? k
											: pn(n.type, k),
										C
									);
									h.__reactInternalSnapshotBeforeUpdate = m;
								}
								break;
							case 3:
								var y = n.stateNode.containerInfo;
								y.nodeType === 1
									? (y.textContent = '')
									: y.nodeType === 9 &&
										y.documentElement &&
										y.removeChild(y.documentElement);
								break;
							case 5:
							case 6:
							case 4:
							case 17:
								break;
							default:
								throw Error(_(163));
						}
					}
				}
				catch (S) {
					pe(n, n.return, S);
				}
				if (((e = n.sibling), e !== null)) {
					(e.return = n.return), (O = e);
					break;
				}
				O = n.return;
			}
		}
	}

	return (x = uc), (uc = !1), x;
}
function Ur(e, n, t) {
	let r = n.updateQueue;
	if (((r = r !== null ? r.lastEffect : null), r !== null)) {
		let i = (r = r.next);
		do {
			if ((i.tag & e) === e) {
				const l = i.destroy;
				(i.destroy = void 0), l !== void 0 && xu(n, t, l);
			}
			i = i.next;
		} while (i !== r);
	}
}
function Bl(e, n) {
	if (
		((n = n.updateQueue),
		(n = n !== null ? n.lastEffect : null),
		n !== null)
	) {
		let t = (n = n.next);
		do {
			if ((t.tag & e) === e) {
				const r = t.create;
				t.destroy = r();
			}
			t = t.next;
		} while (t !== n);
	}
}
function wu(e) {
	const n = e.ref;
	if (n !== null) {
		const t = e.stateNode;
		switch (e.tag) {
			case 5:
				e = t;
				break;
			default:
				e = t;
		}
		typeof n === 'function' ? n(e) : (n.current = e);
	}
}
function cd(e) {
	let n = e.alternate;
	n !== null && ((e.alternate = null), cd(n)),
		(e.child = null),
		(e.deletions = null),
		(e.sibling = null),
		e.tag === 5 &&
			((n = e.stateNode),
			n !== null &&
				(delete n[Sn],
				delete n[li],
				delete n[uu],
				delete n[cg],
				delete n[fg])),
		(e.stateNode = null),
		(e.return = null),
		(e.dependencies = null),
		(e.memoizedProps = null),
		(e.memoizedState = null),
		(e.pendingProps = null),
		(e.stateNode = null),
		(e.updateQueue = null);
}
function fd(e) {
	return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function sc(e) {
	e: for (;;) {
		for (; e.sibling === null; ) {
			if (e.return === null || fd(e.return)) {
				return null;
			}
			e = e.return;
		}
		for (
			e.sibling.return = e.return, e = e.sibling;
			e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

		) {
			if (e.flags & 2 || e.child === null || e.tag === 4) {
				continue e;
			}
			(e.child.return = e), (e = e.child);
		}
		if (!(e.flags & 2)) {
			return e.stateNode;
		}
	}
}
function Su(e, n, t) {
	const r = e.tag;
	if (r === 5 || r === 6) {
		(e = e.stateNode),
			n
				? t.nodeType === 8
					? t.parentNode.insertBefore(e, n)
					: t.insertBefore(e, n)
				: (t.nodeType === 8
						? ((n = t.parentNode), n.insertBefore(e, t))
						: ((n = t), n.appendChild(e)),
					(t = t._reactRootContainer),
					t != null || n.onclick !== null || (n.onclick = fl));
	}
	else if (r !== 4 && ((e = e.child), e !== null)) {
		for (Su(e, n, t), e = e.sibling; e !== null; ) {
			Su(e, n, t), (e = e.sibling);
		}
	}
}
function Eu(e, n, t) {
	const r = e.tag;
	if (r === 5 || r === 6) {
		(e = e.stateNode), n ? t.insertBefore(e, n) : t.appendChild(e);
	}
	else if (r !== 4 && ((e = e.child), e !== null)) {
		for (Eu(e, n, t), e = e.sibling; e !== null; ) {
			Eu(e, n, t), (e = e.sibling);
		}
	}
}
let Ce = null;
let dn = !1;
function Hn(e, n, t) {
	for (t = t.child; t !== null; ) {
		pd(e, n, t), (t = t.sibling);
	}
}
function pd(e, n, t) {
	if (Cn && typeof Cn.onCommitFiberUnmount === 'function') {
		try {
			Cn.onCommitFiberUnmount(Ll, t);
		}
		catch {}
	}
	switch (t.tag) {
		case 5:
			Ne || Qt(t, n);
		case 6:
			var r = Ce;
			var i = dn;
			(Ce = null),
				Hn(e, n, t),
				(Ce = r),
				(dn = i),
				Ce !== null &&
					(dn
						? ((e = Ce),
							(t = t.stateNode),
							e.nodeType === 8
								? e.parentNode.removeChild(t)
								: e.removeChild(t))
						: Ce.removeChild(t.stateNode));
			break;
		case 18:
			Ce !== null &&
				(dn
					? ((e = Ce),
						(t = t.stateNode),
						e.nodeType === 8
							? ho(e.parentNode, t)
							: e.nodeType === 1 && ho(e, t),
						ei(e))
					: ho(Ce, t.stateNode));
			break;
		case 4:
			(r = Ce),
				(i = dn),
				(Ce = t.stateNode.containerInfo),
				(dn = !0),
				Hn(e, n, t),
				(Ce = r),
				(dn = i);
			break;
		case 0:
		case 11:
		case 14:
		case 15:
			if (
				!Ne &&
				((r = t.updateQueue),
				r !== null && ((r = r.lastEffect), r !== null))
			) {
				i = r = r.next;
				do {
					let l = i;
					const o = l.destroy;
					(l = l.tag),
						o !== void 0 && (l & 2 || l & 4) && xu(t, n, o),
						(i = i.next);
				} while (i !== r);
			}
			Hn(e, n, t);
			break;
		case 1:
			if (
				!Ne &&
				(Qt(t, n),
				(r = t.stateNode),
				typeof r.componentWillUnmount === 'function')
			) {
				try {
					(r.props = t.memoizedProps),
						(r.state = t.memoizedState),
						r.componentWillUnmount();
				}
				catch (u) {
					pe(t, n, u);
				}
			}
			Hn(e, n, t);
			break;
		case 21:
			Hn(e, n, t);
			break;
		case 22:
			t.mode & 1
				? ((Ne = (r = Ne) || t.memoizedState !== null),
					Hn(e, n, t),
					(Ne = r))
				: Hn(e, n, t);
			break;
		default:
			Hn(e, n, t);
	}
}
function ac(e) {
	const n = e.updateQueue;
	if (n !== null) {
		e.updateQueue = null;
		let t = e.stateNode;
		t === null && (t = e.stateNode = new Tg()),
			n.forEach((r) => {
				const i = Fg.bind(null, e, r);
				t.has(r) || (t.add(r), r.then(i, i));
			});
	}
}
function cn(e, n) {
	const t = n.deletions;
	if (t !== null) {
		for (let r = 0; r < t.length; r++) {
			const i = t[r];
			try {
				const l = e;
				const o = n;
				let u = o;
				e: for (; u !== null; ) {
					switch (u.tag) {
						case 5:
							(Ce = u.stateNode), (dn = !1);
							break e;
						case 3:
							(Ce = u.stateNode.containerInfo), (dn = !0);
							break e;
						case 4:
							(Ce = u.stateNode.containerInfo), (dn = !0);
							break e;
					}
					u = u.return;
				}
				if (Ce === null) {
					throw Error(_(160));
				}
				pd(l, o, i), (Ce = null), (dn = !1);
				const s = i.alternate;
				s !== null && (s.return = null), (i.return = null);
			}
			catch (a) {
				pe(i, n, a);
			}
		}
	}
	if (n.subtreeFlags & 12854) {
		for (n = n.child; n !== null; ) {
			dd(n, e), (n = n.sibling);
		}
	}
}
function dd(e, n) {
	let t = e.alternate;
	let r = e.flags;
	switch (e.tag) {
		case 0:
		case 11:
		case 14:
		case 15:
			if ((cn(n, e), kn(e), r & 4)) {
				try {
					Ur(3, e, e.return), Bl(3, e);
				}
				catch (k) {
					pe(e, e.return, k);
				}
				try {
					Ur(5, e, e.return);
				}
				catch (k) {
					pe(e, e.return, k);
				}
			}
			break;
		case 1:
			cn(n, e), kn(e), r & 512 && t !== null && Qt(t, t.return);
			break;
		case 5:
			if (
				(cn(n, e),
				kn(e),
				r & 512 && t !== null && Qt(t, t.return),
				e.flags & 32)
			) {
				var i = e.stateNode;
				try {
					Gr(i, '');
				}
				catch (k) {
					pe(e, e.return, k);
				}
			}
			if (r & 4 && ((i = e.stateNode), i != null)) {
				var l = e.memoizedProps;
				var o = t !== null ? t.memoizedProps : l;
				var u = e.type;
				var s = e.updateQueue;
				if (((e.updateQueue = null), s !== null)) {
					try {
						u === 'input' &&
							l.type === 'radio' &&
							l.name != null &&
							Df(i, l),
							Ko(u, o);
						var a = Ko(u, l);
						for (o = 0; o < s.length; o += 2) {
							var c = s[o];
							var f = s[o + 1];
							c === 'style'
								? Uf(i, f)
								: c === 'dangerouslySetInnerHTML'
									? jf(i, f)
									: c === 'children'
										? Gr(i, f)
										: es(i, c, f, a);
						}
						switch (u) {
							case 'input':
								Vo(i, l);
								break;
							case 'textarea':
								Af(i, l);
								break;
							case 'select':
								var d = i._wrapperState.wasMultiple;
								i._wrapperState.wasMultiple = !!l.multiple;
								var p = l.value;
								p != null
									? Xt(i, !!l.multiple, p, !1)
									: d !== !!l.multiple &&
										(l.defaultValue != null
											? Xt(
													i,
													!!l.multiple,
													l.defaultValue,
													!0
												)
											: Xt(
													i,
													!!l.multiple,
													l.multiple ? [] : '',
													!1
												));
						}
						i[li] = l;
					}
					catch (k) {
						pe(e, e.return, k);
					}
				}
			}
			break;
		case 6:
			if ((cn(n, e), kn(e), r & 4)) {
				if (e.stateNode === null) {
					throw Error(_(162));
				}
				(i = e.stateNode), (l = e.memoizedProps);
				try {
					i.nodeValue = l;
				}
				catch (k) {
					pe(e, e.return, k);
				}
			}
			break;
		case 3:
			if (
				(cn(n, e),
				kn(e),
				r & 4 && t !== null && t.memoizedState.isDehydrated)
			) {
				try {
					ei(n.containerInfo);
				}
				catch (k) {
					pe(e, e.return, k);
				}
			}
			break;
		case 4:
			cn(n, e), kn(e);
			break;
		case 13:
			cn(n, e),
				kn(e),
				(i = e.child),
				i.flags & 8192 &&
					((l = i.memoizedState !== null),
					(i.stateNode.isHidden = l),
					!l ||
						(i.alternate !== null &&
							i.alternate.memoizedState !== null) ||
						(Os = he())),
				r & 4 && ac(e);
			break;
		case 22:
			if (
				((c = t !== null && t.memoizedState !== null),
				e.mode & 1
					? ((Ne = (a = Ne) || c), cn(n, e), (Ne = a))
					: cn(n, e),
				kn(e),
				r & 8192)
			) {
				if (
					((a = e.memoizedState !== null),
					(e.stateNode.isHidden = a) && !c && e.mode & 1)
				) {
					for (O = e, c = e.child; c !== null; ) {
						for (f = O = c; O !== null; ) {
							switch (((d = O), (p = d.child), d.tag)) {
								case 0:
								case 11:
								case 14:
								case 15:
									Ur(4, d, d.return);
									break;
								case 1:
									Qt(d, d.return);
									var x = d.stateNode;
									if (
										typeof x.componentWillUnmount ===
										'function'
									) {
										(r = d), (t = d.return);
										try {
											(n = r),
												(x.props = n.memoizedProps),
												(x.state = n.memoizedState),
												x.componentWillUnmount();
										}
										catch (k) {
											pe(r, t, k);
										}
									}
									break;
								case 5:
									Qt(d, d.return);
									break;
								case 22:
									if (d.memoizedState !== null) {
										fc(f);
										continue;
									}
							}
							p !== null ? ((p.return = d), (O = p)) : fc(f);
						}
						c = c.sibling;
					}
				}
				e: for (c = null, f = e; ; ) {
					if (f.tag === 5) {
						if (c === null) {
							c = f;
							try {
								(i = f.stateNode),
									a
										? ((l = i.style),
											typeof l.setProperty === 'function'
												? l.setProperty(
														'display',
														'none',
														'important'
													)
												: (l.display = 'none'))
										: ((u = f.stateNode),
											(s = f.memoizedProps.style),
											(o =
												s != null &&
												s.hasOwnProperty('display')
													? s.display
													: null),
											(u.style.display = Bf(
												'display',
												o
											)));
							}
							catch (k) {
								pe(e, e.return, k);
							}
						}
					}
					else if (f.tag === 6) {
						if (c === null) {
							try {
								f.stateNode.nodeValue = a
									? ''
									: f.memoizedProps;
							}
							catch (k) {
								pe(e, e.return, k);
							}
						}
					}
					else if (
						((f.tag !== 22 && f.tag !== 23) ||
							f.memoizedState === null ||
							f === e) &&
						f.child !== null
					) {
						(f.child.return = f), (f = f.child);
						continue;
					}
					if (f === e) {
						break e;
					}
					for (; f.sibling === null; ) {
						if (f.return === null || f.return === e) {
							break e;
						}
						c === f && (c = null), (f = f.return);
					}
					c === f && (c = null),
						(f.sibling.return = f.return),
						(f = f.sibling);
				}
			}
			break;
		case 19:
			cn(n, e), kn(e), r & 4 && ac(e);
			break;
		case 21:
			break;
		default:
			cn(n, e), kn(e);
	}
}
function kn(e) {
	const n = e.flags;
	if (n & 2) {
		try {
			e: {
				for (let t = e.return; t !== null; ) {
					if (fd(t)) {
						var r = t;
						break e;
					}
					t = t.return;
				}
				throw Error(_(160));
			}
			switch (r.tag) {
				case 5:
					var i = r.stateNode;
					r.flags & 32 && (Gr(i, ''), (r.flags &= -33));
					var l = sc(e);
					Eu(e, l, i);
					break;
				case 3:
				case 4:
					var o = r.stateNode.containerInfo;
					var u = sc(e);
					Su(e, u, o);
					break;
				default:
					throw Error(_(161));
			}
		}
		catch (s) {
			pe(e, e.return, s);
		}
		e.flags &= -3;
	}
	n & 4096 && (e.flags &= -4097);
}
function Ng(e, n, t) {
	(O = e), hd(e);
}
function hd(e, n, t) {
	for (let r = (e.mode & 1) !== 0; O !== null; ) {
		const i = O;
		let l = i.child;
		if (i.tag === 22 && r) {
			let o = i.memoizedState !== null || Di;
			if (!o) {
				let u = i.alternate;
				let s = (u !== null && u.memoizedState !== null) || Ne;
				u = Di;
				const a = Ne;
				if (((Di = o), (Ne = s) && !a)) {
					for (O = i; O !== null; ) {
						(o = O),
							(s = o.child),
							o.tag === 22 && o.memoizedState !== null
								? pc(i)
								: s !== null
									? ((s.return = o), (O = s))
									: pc(i);
					}
				}
				for (; l !== null; ) {
					(O = l), hd(l), (l = l.sibling);
				}
				(O = i), (Di = u), (Ne = a);
			}
			cc(e);
		}
		else {
			i.subtreeFlags & 8772 && l !== null
				? ((l.return = i), (O = l))
				: cc(e);
		}
	}
}
function cc(e) {
	for (; O !== null; ) {
		const n = O;
		if (n.flags & 8772) {
			var t = n.alternate;
			try {
				if (n.flags & 8772) {
					switch (n.tag) {
						case 0:
						case 11:
						case 15:
							Ne || Bl(5, n);
							break;
						case 1:
							var r = n.stateNode;
							if (n.flags & 4 && !Ne) {
								if (t === null) {
									r.componentDidMount();
								}
								else {
									const i =
										n.elementType === n.type
											? t.memoizedProps
											: pn(n.type, t.memoizedProps);
									r.componentDidUpdate(
										i,
										t.memoizedState,
										r.__reactInternalSnapshotBeforeUpdate
									);
								}
							}
							var l = n.updateQueue;
							l !== null && Ya(n, l, r);
							break;
						case 3:
							var o = n.updateQueue;
							if (o !== null) {
								if (((t = null), n.child !== null)) {
									switch (n.child.tag) {
										case 5:
											t = n.child.stateNode;
											break;
										case 1:
											t = n.child.stateNode;
									}
								}
								Ya(n, o, t);
							}
							break;
						case 5:
							var u = n.stateNode;
							if (t === null && n.flags & 4) {
								t = u;
								const s = n.memoizedProps;
								switch (n.type) {
									case 'button':
									case 'input':
									case 'select':
									case 'textarea':
										s.autoFocus && t.focus();
										break;
									case 'img':
										s.src && (t.src = s.src);
								}
							}
							break;
						case 6:
							break;
						case 4:
							break;
						case 12:
							break;
						case 13:
							if (n.memoizedState === null) {
								const a = n.alternate;
								if (a !== null) {
									const c = a.memoizedState;
									if (c !== null) {
										const f = c.dehydrated;
										f !== null && ei(f);
									}
								}
							}
							break;
						case 19:
						case 17:
						case 21:
						case 22:
						case 23:
						case 25:
							break;
						default:
							throw Error(_(163));
					}
				}
				Ne || (n.flags & 512 && wu(n));
			}
			catch (d) {
				pe(n, n.return, d);
			}
		}
		if (n === e) {
			O = null;
			break;
		}
		if (((t = n.sibling), t !== null)) {
			(t.return = n.return), (O = t);
			break;
		}
		O = n.return;
	}
}
function fc(e) {
	for (; O !== null; ) {
		const n = O;
		if (n === e) {
			O = null;
			break;
		}
		const t = n.sibling;
		if (t !== null) {
			(t.return = n.return), (O = t);
			break;
		}
		O = n.return;
	}
}
function pc(e) {
	for (; O !== null; ) {
		const n = O;
		try {
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					var t = n.return;
					try {
						Bl(4, n);
					}
					catch (s) {
						pe(n, t, s);
					}
					break;
				case 1:
					var r = n.stateNode;
					if (typeof r.componentDidMount === 'function') {
						const i = n.return;
						try {
							r.componentDidMount();
						}
						catch (s) {
							pe(n, i, s);
						}
					}
					var l = n.return;
					try {
						wu(n);
					}
					catch (s) {
						pe(n, l, s);
					}
					break;
				case 5:
					var o = n.return;
					try {
						wu(n);
					}
					catch (s) {
						pe(n, o, s);
					}
			}
		}
		catch (s) {
			pe(n, n.return, s);
		}
		if (n === e) {
			O = null;
			break;
		}
		const u = n.sibling;
		if (u !== null) {
			(u.return = n.return), (O = u);
			break;
		}
		O = n.return;
	}
}
const zg = Math.ceil;
const Sl = Bn.ReactCurrentDispatcher;
const Ls = Bn.ReactCurrentOwner;
const ln = Bn.ReactCurrentBatchConfig;
var K = 0;
var Ee = null;
let ye = null;
let _e = 0;
var Ke = 0;
var Kt = ut(0);
var we = 0;
let fi = null;
var Et = 0;
let Ul = 0;
let Rs = 0;
let Hr = null;
let je = null;
var Os = 0;
var cr = 1 / 0;
let zn = null;
var El = !1;
var Cu = null;
var nt = null;
let Ai = !1;
let Xn = null;
let Cl = 0;
let Vr = 0;
let _u = null;
let Gi = -1;
let qi = 0;
function Oe() {
	return K & 6 ? he() : Gi !== -1 ? Gi : (Gi = he());
}
function tt(e) {
	return e.mode & 1
		? K & 2 && _e !== 0
			? _e & -_e
			: dg.transition !== null
				? (qi === 0 && (qi = Jf()), qi)
				: ((e = G),
					e !== 0 ||
						((e = window.event),
						(e = e === void 0 ? 16 : lp(e.type))),
					e)
		: 1;
}
function gn(e, n, t, r) {
	if (50 < Vr) {
		throw ((Vr = 0), (_u = null), Error(_(185)));
	}
	hi(e, t, r),
		(!(K & 2) || e !== Ee) &&
			(e === Ee && (!(K & 2) && (Ul |= t), we === 4 && Qn(e, _e)),
			Ve(e, r),
			t === 1 &&
				K === 0 &&
				!(n.mode & 1) &&
				((cr = he() + 500), Al && st()));
}
function Ve(e, n) {
	let t = e.callbackNode;
	dm(e, n);
	const r = ul(e, e === Ee ? _e : 0);
	if (r === 0) {
		t !== null && wa(t), (e.callbackNode = null), (e.callbackPriority = 0);
	}
	else if (((n = r & -r), e.callbackPriority !== n)) {
		if ((t != null && wa(t), n === 1)) {
			e.tag === 0 ? pg(dc.bind(null, e)) : Cp(dc.bind(null, e)),
				sg(() => {
					!(K & 6) && st();
				}),
				(t = null);
		}
		else {
			switch (Zf(r)) {
				case 1:
					t = ls;
					break;
				case 4:
					t = Gf;
					break;
				case 16:
					t = ol;
					break;
				case 536870912:
					t = qf;
					break;
				default:
					t = ol;
			}
			t = Sd(t, md.bind(null, e));
		}
		(e.callbackPriority = n), (e.callbackNode = t);
	}
}
function md(e, n) {
	if (((Gi = -1), (qi = 0), K & 6)) {
		throw Error(_(327));
	}
	let t = e.callbackNode;
	if (er() && e.callbackNode !== t) {
		return null;
	}
	let r = ul(e, e === Ee ? _e : 0);
	if (r === 0) {
		return null;
	}
	if (r & 30 || r & e.expiredLanes || n) {
		n = _l(e, r);
	}
	else {
		n = r;
		var i = K;
		K |= 2;
		var l = yd();
		(Ee !== e || _e !== n) && ((zn = null), (cr = he() + 500), vt(e, n));
		do {
			try {
				Og();
				break;
			}
			catch (u) {
				gd(e, u);
			}
		} while (!0);
		vs(),
			(Sl.current = l),
			(K = i),
			ye !== null ? (n = 0) : ((Ee = null), (_e = 0), (n = we));
	}
	if (n !== 0) {
		if (
			(n === 2 && ((i = Jo(e)), i !== 0 && ((r = i), (n = Pu(e, i)))),
			n === 1)
		) {
			throw ((t = fi), vt(e, 0), Qn(e, r), Ve(e, he()), t);
		}
		if (n === 6) {
			Qn(e, r);
		}
		else {
			if (
				((i = e.current.alternate),
				!(r & 30) &&
					!Lg(i) &&
					((n = _l(e, r)),
					n === 2 &&
						((l = Jo(e)), l !== 0 && ((r = l), (n = Pu(e, l)))),
					n === 1))
			) {
				throw ((t = fi), vt(e, 0), Qn(e, r), Ve(e, he()), t);
			}
			switch (((e.finishedWork = i), (e.finishedLanes = r), n)) {
				case 0:
				case 1:
					throw Error(_(345));
				case 2:
					pt(e, je, zn);
					break;
				case 3:
					if (
						(Qn(e, r),
						(r & 130023424) === r &&
							((n = Os + 500 - he()), 10 < n))
					) {
						if (ul(e, 0) !== 0) {
							break;
						}
						if (((i = e.suspendedLanes), (i & r) !== r)) {
							Oe(), (e.pingedLanes |= e.suspendedLanes & i);
							break;
						}
						e.timeoutHandle = ou(pt.bind(null, e, je, zn), n);
						break;
					}
					pt(e, je, zn);
					break;
				case 4:
					if ((Qn(e, r), (r & 4194240) === r)) {
						break;
					}
					for (n = e.eventTimes, i = -1; 0 < r; ) {
						let o = 31 - mn(r);
						(l = 1 << o), (o = n[o]), o > i && (i = o), (r &= ~l);
					}
					if (
						((r = i),
						(r = he() - r),
						(r =
							(120 > r
								? 120
								: 480 > r
									? 480
									: 1080 > r
										? 1080
										: 1920 > r
											? 1920
											: 3e3 > r
												? 3e3
												: 4320 > r
													? 4320
													: 1960 * zg(r / 1960)) - r),
						10 < r)
					) {
						e.timeoutHandle = ou(pt.bind(null, e, je, zn), r);
						break;
					}
					pt(e, je, zn);
					break;
				case 5:
					pt(e, je, zn);
					break;
				default:
					throw Error(_(329));
			}
		}
	}

	return Ve(e, he()), e.callbackNode === t ? md.bind(null, e) : null;
}
function Pu(e, n) {
	const t = Hr;

	return (
		e.current.memoizedState.isDehydrated && (vt(e, n).flags |= 256),
		(e = _l(e, n)),
		e !== 2 && ((n = je), (je = t), n !== null && Tu(n)),
		e
	);
}
function Tu(e) {
	je === null ? (je = e) : je.push.apply(je, e);
}
function Lg(e) {
	for (let n = e; ; ) {
		if (n.flags & 16384) {
			var t = n.updateQueue;
			if (t !== null && ((t = t.stores), t !== null)) {
				for (let r = 0; r < t.length; r++) {
					let i = t[r];
					const l = i.getSnapshot;
					i = i.value;
					try {
						if (!yn(l(), i)) {
							return !1;
						}
					}
					catch {
						return !1;
					}
				}
			}
		}
		if (((t = n.child), n.subtreeFlags & 16384 && t !== null)) {
			(t.return = n), (n = t);
		}
		else {
			if (n === e) {
				break;
			}
			for (; n.sibling === null; ) {
				if (n.return === null || n.return === e) {
					return !0;
				}
				n = n.return;
			}
			(n.sibling.return = n.return), (n = n.sibling);
		}
	}

	return !0;
}
function Qn(e, n) {
	for (
		n &= ~Rs,
			n &= ~Ul,
			e.suspendedLanes |= n,
			e.pingedLanes &= ~n,
			e = e.expirationTimes;
		0 < n;

	) {
		const t = 31 - mn(n);
		const r = 1 << t;
		(e[t] = -1), (n &= ~r);
	}
}
function dc(e) {
	if (K & 6) {
		throw Error(_(327));
	}
	er();
	let n = ul(e, 0);
	if (!(n & 1)) {
		return Ve(e, he()), null;
	}
	let t = _l(e, n);
	if (e.tag !== 0 && t === 2) {
		const r = Jo(e);
		r !== 0 && ((n = r), (t = Pu(e, r)));
	}
	if (t === 1) {
		throw ((t = fi), vt(e, 0), Qn(e, n), Ve(e, he()), t);
	}
	if (t === 6) {
		throw Error(_(345));
	}

	return (
		(e.finishedWork = e.current.alternate),
		(e.finishedLanes = n),
		pt(e, je, zn),
		Ve(e, he()),
		null
	);
}
function Ms(e, n) {
	const t = K;
	K |= 1;
	try {
		return e(n);
	}
	finally {
		(K = t), K === 0 && ((cr = he() + 500), Al && st());
	}
}
function Ct(e) {
	Xn !== null && Xn.tag === 0 && !(K & 6) && er();
	const n = K;
	K |= 1;
	const t = ln.transition;
	const r = G;
	try {
		if (((ln.transition = null), (G = 1), e)) {
			return e();
		}
	}
	finally {
		(G = r), (ln.transition = t), (K = n), !(K & 6) && st();
	}
}
function Ds() {
	(Ke = Kt.current), ie(Kt);
}
function vt(e, n) {
	(e.finishedWork = null), (e.finishedLanes = 0);
	let t = e.timeoutHandle;
	if ((t !== -1 && ((e.timeoutHandle = -1), ug(t)), ye !== null)) {
		for (t = ye.return; t !== null; ) {
			var r = t;
			switch ((ms(r), r.tag)) {
				case 1:
					(r = r.type.childContextTypes), r != null && pl();
					break;
				case 3:
					sr(), ie(Ue), ie(ze), Cs();
					break;
				case 5:
					Es(r);
					break;
				case 4:
					sr();
					break;
				case 13:
					ie(se);
					break;
				case 19:
					ie(se);
					break;
				case 10:
					ks(r.type._context);
					break;
				case 22:
				case 23:
					Ds();
			}
			t = t.return;
		}
	}
	if (
		((Ee = e),
		(ye = e = rt(e.current, null)),
		(_e = Ke = n),
		(we = 0),
		(fi = null),
		(Rs = Ul = Et = 0),
		(je = Hr = null),
		gt !== null)
	) {
		for (n = 0; n < gt.length; n++) {
			if (((t = gt[n]), (r = t.interleaved), r !== null)) {
				t.interleaved = null;
				const i = r.next;
				const l = t.pending;
				if (l !== null) {
					const o = l.next;
					(l.next = i), (r.next = o);
				}
				t.pending = r;
			}
		}
		gt = null;
	}

	return e;
}
function gd(e, n) {
	do {
		let t = ye;
		try {
			if ((vs(), (Ki.current = wl), xl)) {
				for (let r = ae.memoizedState; r !== null; ) {
					const i = r.queue;
					i !== null && (i.pending = null), (r = r.next);
				}
				xl = !1;
			}
			if (
				((St = 0),
				(Se = xe = ae = null),
				(Br = !1),
				(si = 0),
				(Ls.current = null),
				t === null || t.return === null)
			) {
				(we = 1), (fi = n), (ye = null);
				break;
			}
			e: {
				let l = e;
				const o = t.return;
				let u = t;
				let s = n;
				if (
					((n = _e),
					(u.flags |= 32768),
					s !== null &&
						typeof s === 'object' &&
						typeof s.then === 'function')
				) {
					const a = s;
					const c = u;
					const f = c.tag;
					if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
						const d = c.alternate;
						d
							? ((c.updateQueue = d.updateQueue),
								(c.memoizedState = d.memoizedState),
								(c.lanes = d.lanes))
							: ((c.updateQueue = null),
								(c.memoizedState = null));
					}
					const p = ec(o);
					if (p !== null) {
						(p.flags &= -257),
							nc(p, o, u, l, n),
							p.mode & 1 && Za(l, a, n),
							(n = p),
							(s = a);
						const x = n.updateQueue;
						if (x === null) {
							const k = new Set();
							k.add(s), (n.updateQueue = k);
						}
						else {
							x.add(s);
						}
						break e;
					}
					else {
						if (!(n & 1)) {
							Za(l, a, n), As();
							break e;
						}
						s = Error(_(426));
					}
				}
				else if (oe && u.mode & 1) {
					const C = ec(o);
					if (C !== null) {
						!(C.flags & 65536) && (C.flags |= 256),
							nc(C, o, u, l, n),
							gs(ar(s, u));
						break e;
					}
				}
				(l = s = ar(s, u)),
					we !== 4 && (we = 2),
					Hr === null ? (Hr = [l]) : Hr.push(l),
					(l = o);
				do {
					switch (l.tag) {
						case 3:
							(l.flags |= 65536), (n &= -n), (l.lanes |= n);
							var h = Zp(l, s, n);
							Ka(l, h);
							break e;
						case 1:
							u = s;
							var m = l.type;
							var y = l.stateNode;
							if (
								!(l.flags & 128) &&
								(typeof m.getDerivedStateFromError ===
									'function' ||
									(y !== null &&
										typeof y.componentDidCatch ===
											'function' &&
										(nt === null || !nt.has(y))))
							) {
								(l.flags |= 65536), (n &= -n), (l.lanes |= n);
								const S = ed(l, u, n);
								Ka(l, S);
								break e;
							}
					}
					l = l.return;
				} while (l !== null);
			}
			kd(t);
		}
		catch (T) {
			(n = T), ye === t && t !== null && (ye = t = t.return);
			continue;
		}
		break;
	} while (!0);
}
function yd() {
	const e = Sl.current;

	return (Sl.current = wl), e === null ? wl : e;
}
function As() {
	(we === 0 || we === 3 || we === 2) && (we = 4),
		Ee === null || (!(Et & 268435455) && !(Ul & 268435455)) || Qn(Ee, _e);
}
function _l(e, n) {
	const t = K;
	K |= 2;
	const r = yd();
	(Ee !== e || _e !== n) && ((zn = null), vt(e, n));
	do {
		try {
			Rg();
			break;
		}
		catch (i) {
			gd(e, i);
		}
	} while (!0);
	if ((vs(), (K = t), (Sl.current = r), ye !== null)) {
		throw Error(_(261));
	}

	return (Ee = null), (_e = 0), we;
}
function Rg() {
	for (; ye !== null; ) {
		vd(ye);
	}
}
function Og() {
	for (; ye !== null && !im(); ) {
		vd(ye);
	}
}
function vd(e) {
	const n = wd(e.alternate, e, Ke);
	(e.memoizedProps = e.pendingProps),
		n === null ? kd(e) : (ye = n),
		(Ls.current = null);
}
function kd(e) {
	let n = e;
	do {
		let t = n.alternate;
		if (((e = n.return), n.flags & 32768)) {
			if (((t = Pg(t, n)), t !== null)) {
				(t.flags &= 32767), (ye = t);

				return;
			}
			if (e !== null) {
				(e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
			}
			else {
				(we = 6), (ye = null);

				return;
			}
		}
		else if (((t = _g(t, n, Ke)), t !== null)) {
			ye = t;

			return;
		}
		if (((n = n.sibling), n !== null)) {
			ye = n;

			return;
		}
		ye = n = e;
	} while (n !== null);
	we === 0 && (we = 5);
}
function pt(e, n, t) {
	const r = G;
	const i = ln.transition;
	try {
		(ln.transition = null), (G = 1), Mg(e, n, t, r);
	}
	finally {
		(ln.transition = i), (G = r);
	}

	return null;
}
function Mg(e, n, t, r) {
	do {
		er();
	} while (Xn !== null);
	if (K & 6) {
		throw Error(_(327));
	}
	t = e.finishedWork;
	let i = e.finishedLanes;
	if (t === null) {
		return null;
	}
	if (((e.finishedWork = null), (e.finishedLanes = 0), t === e.current)) {
		throw Error(_(177));
	}
	(e.callbackNode = null), (e.callbackPriority = 0);
	let l = t.lanes | t.childLanes;
	if (
		(hm(e, l),
		e === Ee && ((ye = Ee = null), (_e = 0)),
		(!(t.subtreeFlags & 2064) && !(t.flags & 2064)) ||
			Ai ||
			((Ai = !0),
			Sd(ol, () => {
				return er(), null;
			})),
		(l = (t.flags & 15990) !== 0),
		t.subtreeFlags & 15990 || l)
	) {
		(l = ln.transition), (ln.transition = null);
		const o = G;
		G = 1;
		const u = K;
		(K |= 4),
			(Ls.current = null),
			Ig(e, t),
			dd(t, e),
			eg(iu),
			(sl = !!ru),
			(iu = ru = null),
			(e.current = t),
			Ng(t),
			lm(),
			(K = u),
			(G = o),
			(ln.transition = l);
	}
	else {
		e.current = t;
	}
	if (
		(Ai && ((Ai = !1), (Xn = e), (Cl = i)),
		(l = e.pendingLanes),
		l === 0 && (nt = null),
		sm(t.stateNode),
		Ve(e, he()),
		n !== null)
	) {
		for (r = e.onRecoverableError, t = 0; t < n.length; t++) {
			(i = n[t]), r(i.value, {componentStack: i.stack, digest: i.digest});
		}
	}
	if (El) {
		throw ((El = !1), (e = Cu), (Cu = null), e);
	}

	return (
		Cl & 1 && e.tag !== 0 && er(),
		(l = e.pendingLanes),
		l & 1 ? (e === _u ? Vr++ : ((Vr = 0), (_u = e))) : (Vr = 0),
		st(),
		null
	);
}
function er() {
	if (Xn !== null) {
		let e = Zf(Cl);
		const n = ln.transition;
		const t = G;
		try {
			if (((ln.transition = null), (G = 16 > e ? 16 : e), Xn === null)) {
				var r = !1;
			}
			else {
				if (((e = Xn), (Xn = null), (Cl = 0), K & 6)) {
					throw Error(_(331));
				}
				const i = K;
				for (K |= 4, O = e.current; O !== null; ) {
					let l = O;
					var o = l.child;
					if (O.flags & 16) {
						var u = l.deletions;
						if (u !== null) {
							for (let s = 0; s < u.length; s++) {
								const a = u[s];
								for (O = a; O !== null; ) {
									let c = O;
									switch (c.tag) {
										case 0:
										case 11:
										case 15:
											Ur(8, c, l);
									}
									const f = c.child;
									if (f !== null) {
										(f.return = c), (O = f);
									}
									else {
										for (; O !== null; ) {
											c = O;
											const d = c.sibling;
											const p = c.return;
											if ((cd(c), c === a)) {
												O = null;
												break;
											}
											if (d !== null) {
												(d.return = p), (O = d);
												break;
											}
											O = p;
										}
									}
								}
							}
							const x = l.alternate;
							if (x !== null) {
								let k = x.child;
								if (k !== null) {
									x.child = null;
									do {
										const C = k.sibling;
										(k.sibling = null), (k = C);
									} while (k !== null);
								}
							}
							O = l;
						}
					}
					if (l.subtreeFlags & 2064 && o !== null) {
						(o.return = l), (O = o);
					}
					else {
						e: for (; O !== null; ) {
							if (((l = O), l.flags & 2048)) {
								switch (l.tag) {
									case 0:
									case 11:
									case 15:
										Ur(9, l, l.return);
								}
							}
							const h = l.sibling;
							if (h !== null) {
								(h.return = l.return), (O = h);
								break e;
							}
							O = l.return;
						}
					}
				}
				const m = e.current;
				for (O = m; O !== null; ) {
					o = O;
					const y = o.child;
					if (o.subtreeFlags & 2064 && y !== null) {
						(y.return = o), (O = y);
					}
					else {
						e: for (o = m; O !== null; ) {
							if (((u = O), u.flags & 2048)) {
								try {
									switch (u.tag) {
										case 0:
										case 11:
										case 15:
											Bl(9, u);
									}
								}
								catch (T) {
									pe(u, u.return, T);
								}
							}
							if (u === o) {
								O = null;
								break e;
							}
							const S = u.sibling;
							if (S !== null) {
								(S.return = u.return), (O = S);
								break e;
							}
							O = u.return;
						}
					}
				}
				if (
					((K = i),
					st(),
					Cn && typeof Cn.onPostCommitFiberRoot === 'function')
				) {
					try {
						Cn.onPostCommitFiberRoot(Ll, e);
					}
					catch {}
				}
				r = !0;
			}

			return r;
		}
		finally {
			(G = t), (ln.transition = n);
		}
	}

	return !1;
}
function hc(e, n, t) {
	(n = ar(t, n)),
		(n = Zp(e, n, 1)),
		(e = et(e, n, 1)),
		(n = Oe()),
		e !== null && (hi(e, 1, n), Ve(e, n));
}
function pe(e, n, t) {
	if (e.tag === 3) {
		hc(e, e, t);
	}
	else {
		for (; n !== null; ) {
			if (n.tag === 3) {
				hc(n, e, t);
				break;
			}
			else if (n.tag === 1) {
				const r = n.stateNode;
				if (
					typeof n.type.getDerivedStateFromError === 'function' ||
					(typeof r.componentDidCatch === 'function' &&
						(nt === null || !nt.has(r)))
				) {
					(e = ar(t, e)),
						(e = ed(n, e, 1)),
						(n = et(n, e, 1)),
						(e = Oe()),
						n !== null && (hi(n, 1, e), Ve(n, e));
					break;
				}
			}
			n = n.return;
		}
	}
}
function Dg(e, n, t) {
	const r = e.pingCache;
	r !== null && r.delete(n),
		(n = Oe()),
		(e.pingedLanes |= e.suspendedLanes & t),
		Ee === e &&
			(_e & t) === t &&
			(we === 4 ||
			(we === 3 && (_e & 130023424) === _e && 500 > he() - Os)
				? vt(e, 0)
				: (Rs |= t)),
		Ve(e, n);
}
function xd(e, n) {
	n === 0 &&
		(e.mode & 1
			? ((n = Pi), (Pi <<= 1), !(Pi & 130023424) && (Pi = 4194304))
			: (n = 1));
	const t = Oe();
	(e = Fn(e, n)), e !== null && (hi(e, n, t), Ve(e, t));
}
function Ag(e) {
	const n = e.memoizedState;
	let t = 0;
	n !== null && (t = n.retryLane), xd(e, t);
}
function Fg(e, n) {
	let t = 0;
	switch (e.tag) {
		case 13:
			var r = e.stateNode;
			var i = e.memoizedState;
			i !== null && (t = i.retryLane);
			break;
		case 19:
			r = e.stateNode;
			break;
		default:
			throw Error(_(314));
	}
	r !== null && r.delete(n), xd(e, t);
}
let wd;
wd = function (e, n, t) {
	if (e !== null) {
		if (e.memoizedProps !== n.pendingProps || Ue.current) {
			Be = !0;
		}
		else {
			if (!(e.lanes & t) && !(n.flags & 128)) {
				return (Be = !1), Cg(e, n, t);
			}
			Be = !!(e.flags & 131072);
		}
	}
	else {
		(Be = !1), oe && n.flags & 1048576 && _p(n, ml, n.index);
	}
	switch (((n.lanes = 0), n.tag)) {
		case 2:
			var r = n.type;
			Xi(e, n), (e = n.pendingProps);
			var i = lr(n, ze.current);
			Zt(n, t), (i = Ps(null, n, r, e, i, t));
			var l = Ts();

			return (
				(n.flags |= 1),
				typeof i === 'object' &&
				i !== null &&
				typeof i.render === 'function' &&
				i.$$typeof === void 0
					? ((n.tag = 1),
						(n.memoizedState = null),
						(n.updateQueue = null),
						He(r) ? ((l = !0), dl(n)) : (l = !1),
						(n.memoizedState =
							i.state !== null && i.state !== void 0
								? i.state
								: null),
						ws(n),
						(i.updater = jl),
						(n.stateNode = i),
						(i._reactInternals = n),
						du(n, r, e, t),
						(n = gu(null, n, r, !0, l, t)))
					: ((n.tag = 0),
						oe && l && hs(n),
						Re(null, n, i, t),
						(n = n.child)),
				n
			);
		case 16:
			r = n.elementType;
			e: {
				switch (
					(Xi(e, n),
					(e = n.pendingProps),
					(i = r._init),
					(r = i(r._payload)),
					(n.type = r),
					(i = n.tag = Bg(r)),
					(e = pn(r, e)),
					i)
				) {
					case 0:
						n = mu(null, n, r, e, t);
						break e;
					case 1:
						n = ic(null, n, r, e, t);
						break e;
					case 11:
						n = tc(null, n, r, e, t);
						break e;
					case 14:
						n = rc(null, n, r, pn(r.type, e), t);
						break e;
				}
				throw Error(_(306, r, ''));
			}

			return n;
		case 0:
			return (
				(r = n.type),
				(i = n.pendingProps),
				(i = n.elementType === r ? i : pn(r, i)),
				mu(e, n, r, i, t)
			);
		case 1:
			return (
				(r = n.type),
				(i = n.pendingProps),
				(i = n.elementType === r ? i : pn(r, i)),
				ic(e, n, r, i, t)
			);
		case 3:
			e: {
				if ((id(n), e === null)) {
					throw Error(_(387));
				}
				(r = n.pendingProps),
					(l = n.memoizedState),
					(i = l.element),
					Lp(e, n),
					vl(n, r, null, t);
				var o = n.memoizedState;
				if (((r = o.element), l.isDehydrated)) {
					if (
						((l = {
							element: r,
							isDehydrated: !1,
							cache: o.cache,
							pendingSuspenseBoundaries:
								o.pendingSuspenseBoundaries,
							transitions: o.transitions,
						}),
						(n.updateQueue.baseState = l),
						(n.memoizedState = l),
						n.flags & 256)
					) {
						(i = ar(Error(_(423)), n)), (n = lc(e, n, r, t, i));
						break e;
					}
					else if (r !== i) {
						(i = ar(Error(_(424)), n)), (n = lc(e, n, r, t, i));
						break e;
					}
					else {
						for (
							Ye = Zn(n.stateNode.containerInfo.firstChild),
								Ge = n,
								oe = !0,
								hn = null,
								t = Np(n, null, r, t),
								n.child = t;
							t;

						) {
							(t.flags = (t.flags & -3) | 4096), (t = t.sibling);
						}
					}
				}
				else {
					if ((or(), r === i)) {
						n = jn(e, n, t);
						break e;
					}
					Re(e, n, r, t);
				}
				n = n.child;
			}

			return n;
		case 5:
			return (
				Rp(n),
				e === null && cu(n),
				(r = n.type),
				(i = n.pendingProps),
				(l = e !== null ? e.memoizedProps : null),
				(o = i.children),
				lu(r, i)
					? (o = null)
					: l !== null && lu(r, l) && (n.flags |= 32),
				rd(e, n),
				Re(e, n, o, t),
				n.child
			);
		case 6:
			return e === null && cu(n), null;
		case 13:
			return ld(e, n, t);
		case 4:
			return (
				Ss(n, n.stateNode.containerInfo),
				(r = n.pendingProps),
				e === null ? (n.child = ur(n, null, r, t)) : Re(e, n, r, t),
				n.child
			);
		case 11:
			return (
				(r = n.type),
				(i = n.pendingProps),
				(i = n.elementType === r ? i : pn(r, i)),
				tc(e, n, r, i, t)
			);
		case 7:
			return Re(e, n, n.pendingProps, t), n.child;
		case 8:
			return Re(e, n, n.pendingProps.children, t), n.child;
		case 12:
			return Re(e, n, n.pendingProps.children, t), n.child;
		case 10:
			e: {
				if (
					((r = n.type._context),
					(i = n.pendingProps),
					(l = n.memoizedProps),
					(o = i.value),
					ee(gl, r._currentValue),
					(r._currentValue = o),
					l !== null)
				) {
					if (yn(l.value, o)) {
						if (l.children === i.children && !Ue.current) {
							n = jn(e, n, t);
							break e;
						}
					}
					else {
						for (
							l = n.child, l !== null && (l.return = n);
							l !== null;

						) {
							let u = l.dependencies;
							if (u !== null) {
								o = l.child;
								for (let s = u.firstContext; s !== null; ) {
									if (s.context === r) {
										if (l.tag === 1) {
											(s = Mn(-1, t & -t)), (s.tag = 2);
											let a = l.updateQueue;
											if (a !== null) {
												a = a.shared;
												const c = a.pending;
												c === null
													? (s.next = s)
													: ((s.next = c.next),
														(c.next = s)),
													(a.pending = s);
											}
										}
										(l.lanes |= t),
											(s = l.alternate),
											s !== null && (s.lanes |= t),
											fu(l.return, t, n),
											(u.lanes |= t);
										break;
									}
									s = s.next;
								}
							}
							else if (l.tag === 10) {
								o = l.type === n.type ? null : l.child;
							}
							else if (l.tag === 18) {
								if (((o = l.return), o === null)) {
									throw Error(_(341));
								}
								(o.lanes |= t),
									(u = o.alternate),
									u !== null && (u.lanes |= t),
									fu(o, t, n),
									(o = l.sibling);
							}
							else {
								o = l.child;
							}
							if (o !== null) {
								o.return = l;
							}
							else {
								for (o = l; o !== null; ) {
									if (o === n) {
										o = null;
										break;
									}
									if (((l = o.sibling), l !== null)) {
										(l.return = o.return), (o = l);
										break;
									}
									o = o.return;
								}
							}
							l = o;
						}
					}
				}
				Re(e, n, i.children, t), (n = n.child);
			}

			return n;
		case 9:
			return (
				(i = n.type),
				(r = n.pendingProps.children),
				Zt(n, t),
				(i = on(i)),
				(r = r(i)),
				(n.flags |= 1),
				Re(e, n, r, t),
				n.child
			);
		case 14:
			return (
				(r = n.type),
				(i = pn(r, n.pendingProps)),
				(i = pn(r.type, i)),
				rc(e, n, r, i, t)
			);
		case 15:
			return nd(e, n, n.type, n.pendingProps, t);
		case 17:
			return (
				(r = n.type),
				(i = n.pendingProps),
				(i = n.elementType === r ? i : pn(r, i)),
				Xi(e, n),
				(n.tag = 1),
				He(r) ? ((e = !0), dl(n)) : (e = !1),
				Zt(n, t),
				Jp(n, r, i),
				du(n, r, i, t),
				gu(null, n, r, !0, e, t)
			);
		case 19:
			return od(e, n, t);
		case 22:
			return td(e, n, t);
	}
	throw Error(_(156, n.tag));
};
function Sd(e, n) {
	return Xf(e, n);
}
function jg(e, n, t, r) {
	(this.tag = e),
		(this.key = t),
		(this.sibling =
			this.child =
			this.return =
			this.stateNode =
			this.type =
			this.elementType =
				null),
		(this.index = 0),
		(this.ref = null),
		(this.pendingProps = n),
		(this.dependencies =
			this.memoizedState =
			this.updateQueue =
			this.memoizedProps =
				null),
		(this.mode = r),
		(this.subtreeFlags = this.flags = 0),
		(this.deletions = null),
		(this.childLanes = this.lanes = 0),
		(this.alternate = null);
}
function rn(e, n, t, r) {
	return new jg(e, n, t, r);
}
function Fs(e) {
	return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Bg(e) {
	if (typeof e === 'function') {
		return Fs(e) ? 1 : 0;
	}
	if (e != null) {
		if (((e = e.$$typeof), e === ts)) {
			return 11;
		}
		if (e === rs) {
			return 14;
		}
	}

	return 2;
}
function rt(e, n) {
	let t = e.alternate;

	return (
		t === null
			? ((t = rn(e.tag, n, e.key, e.mode)),
				(t.elementType = e.elementType),
				(t.type = e.type),
				(t.stateNode = e.stateNode),
				(t.alternate = e),
				(e.alternate = t))
			: ((t.pendingProps = n),
				(t.type = e.type),
				(t.flags = 0),
				(t.subtreeFlags = 0),
				(t.deletions = null)),
		(t.flags = e.flags & 14680064),
		(t.childLanes = e.childLanes),
		(t.lanes = e.lanes),
		(t.child = e.child),
		(t.memoizedProps = e.memoizedProps),
		(t.memoizedState = e.memoizedState),
		(t.updateQueue = e.updateQueue),
		(n = e.dependencies),
		(t.dependencies =
			n === null ? null : {lanes: n.lanes, firstContext: n.firstContext}),
		(t.sibling = e.sibling),
		(t.index = e.index),
		(t.ref = e.ref),
		t
	);
}
function Ji(e, n, t, r, i, l) {
	let o = 2;
	if (((r = e), typeof e === 'function')) {
		Fs(e) && (o = 1);
	}
	else if (typeof e === 'string') {
		o = 5;
	}
	else {
		e: switch (e) {
			case Ft:
				return kt(t.children, i, l, n);
			case ns:
				(o = 8), (i |= 8);
				break;
			case Fo:
				return (
					(e = rn(12, t, n, i | 2)),
					(e.elementType = Fo),
					(e.lanes = l),
					e
				);
			case jo:
				return (
					(e = rn(13, t, n, i)),
					(e.elementType = jo),
					(e.lanes = l),
					e
				);
			case Bo:
				return (
					(e = rn(19, t, n, i)),
					(e.elementType = Bo),
					(e.lanes = l),
					e
				);
			case Rf:
				return Hl(t, i, l, n);
			default:
				if (typeof e === 'object' && e !== null) {
					switch (e.$$typeof) {
						case zf:
							o = 10;
							break e;
						case Lf:
							o = 9;
							break e;
						case ts:
							o = 11;
							break e;
						case rs:
							o = 14;
							break e;
						case $n:
							(o = 16), (r = null);
							break e;
					}
				}
				throw Error(_(130, e == null ? e : typeof e, ''));
		}
	}

	return (
		(n = rn(o, t, n, i)),
		(n.elementType = e),
		(n.type = r),
		(n.lanes = l),
		n
	);
}
function kt(e, n, t, r) {
	return (e = rn(7, e, r, n)), (e.lanes = t), e;
}
function Hl(e, n, t, r) {
	return (
		(e = rn(22, e, r, n)),
		(e.elementType = Rf),
		(e.lanes = t),
		(e.stateNode = {isHidden: !1}),
		e
	);
}
function So(e, n, t) {
	return (e = rn(6, e, null, n)), (e.lanes = t), e;
}
function Eo(e, n, t) {
	return (
		(n = rn(4, e.children !== null ? e.children : [], e.key, n)),
		(n.lanes = t),
		(n.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation,
		}),
		n
	);
}
function Ug(e, n, t, r, i) {
	(this.tag = n),
		(this.containerInfo = e),
		(this.finishedWork =
			this.pingCache =
			this.current =
			this.pendingChildren =
				null),
		(this.timeoutHandle = -1),
		(this.callbackNode = this.pendingContext = this.context = null),
		(this.callbackPriority = 0),
		(this.eventTimes = to(0)),
		(this.expirationTimes = to(-1)),
		(this.entangledLanes =
			this.finishedLanes =
			this.mutableReadLanes =
			this.expiredLanes =
			this.pingedLanes =
			this.suspendedLanes =
			this.pendingLanes =
				0),
		(this.entanglements = to(0)),
		(this.identifierPrefix = r),
		(this.onRecoverableError = i),
		(this.mutableSourceEagerHydrationData = null);
}
function js(e, n, t, r, i, l, o, u, s) {
	return (
		(e = new Ug(e, n, t, u, s)),
		n === 1 ? ((n = 1), l === !0 && (n |= 8)) : (n = 0),
		(l = rn(3, null, null, n)),
		(e.current = l),
		(l.stateNode = e),
		(l.memoizedState = {
			element: r,
			isDehydrated: t,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null,
		}),
		ws(l),
		e
	);
}
function Hg(e, n, t) {
	const r =
		3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;

	return {
		$$typeof: At,
		key: r == null ? null : '' + r,
		children: e,
		containerInfo: n,
		implementation: t,
	};
}
function Ed(e) {
	if (!e) {
		return lt;
	}
	e = e._reactInternals;
	e: {
		if (Pt(e) !== e || e.tag !== 1) {
			throw Error(_(170));
		}
		var n = e;
		do {
			switch (n.tag) {
				case 3:
					n = n.stateNode.context;
					break e;
				case 1:
					if (He(n.type)) {
						n =
							n.stateNode
								.__reactInternalMemoizedMergedChildContext;
						break e;
					}
			}
			n = n.return;
		} while (n !== null);
		throw Error(_(171));
	}
	if (e.tag === 1) {
		const t = e.type;
		if (He(t)) {
			return Ep(e, t, n);
		}
	}

	return n;
}
function Cd(e, n, t, r, i, l, o, u, s) {
	return (
		(e = js(t, r, !0, e, i, l, o, u, s)),
		(e.context = Ed(null)),
		(t = e.current),
		(r = Oe()),
		(i = tt(t)),
		(l = Mn(r, i)),
		(l.callback = n ?? null),
		et(t, l, i),
		(e.current.lanes = i),
		hi(e, i, r),
		Ve(e, r),
		e
	);
}
function Vl(e, n, t, r) {
	const i = n.current;
	const l = Oe();
	const o = tt(i);

	return (
		(t = Ed(t)),
		n.context === null ? (n.context = t) : (n.pendingContext = t),
		(n = Mn(l, o)),
		(n.payload = {element: e}),
		(r = r === void 0 ? null : r),
		r !== null && (n.callback = r),
		(e = et(i, n, o)),
		e !== null && (gn(e, i, o, l), Qi(e, i, o)),
		o
	);
}
function Pl(e) {
	if (((e = e.current), !e.child)) {
		return null;
	}
	switch (e.child.tag) {
		case 5:
			return e.child.stateNode;
		default:
			return e.child.stateNode;
	}
}
function mc(e, n) {
	if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
		const t = e.retryLane;
		e.retryLane = t !== 0 && t < n ? t : n;
	}
}
function Bs(e, n) {
	mc(e, n), (e = e.alternate) && mc(e, n);
}
function Vg() {
	return null;
}
const _d =
	typeof reportError === 'function'
		? reportError
		: function (e) {
				console.error(e);
			};
function Us(e) {
	this._internalRoot = e;
}
$l.prototype.render = Us.prototype.render = function (e) {
	const n = this._internalRoot;
	if (n === null) {
		throw Error(_(409));
	}
	Vl(e, n, null, null);
};
$l.prototype.unmount = Us.prototype.unmount = function () {
	const e = this._internalRoot;
	if (e !== null) {
		this._internalRoot = null;
		const n = e.containerInfo;
		Ct(() => {
			Vl(null, e, null, null);
		}),
			(n[An] = null);
	}
};
function $l(e) {
	this._internalRoot = e;
}
$l.prototype.unstable_scheduleHydration = function (e) {
	if (e) {
		const n = tp();
		e = {blockedOn: null, target: e, priority: n};
		for (var t = 0; t < bn.length && n !== 0 && n < bn[t].priority; t++) {}
		bn.splice(t, 0, e), t === 0 && ip(e);
	}
};
function Hs(e) {
	return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Wl(e) {
	return !(
		!e ||
		(e.nodeType !== 1 &&
			e.nodeType !== 9 &&
			e.nodeType !== 11 &&
			(e.nodeType !== 8 ||
				e.nodeValue !== ' react-mount-point-unstable '))
	);
}
function gc() {}
function $g(e, n, t, r, i) {
	if (i) {
		if (typeof r === 'function') {
			const l = r;
			r = function () {
				const a = Pl(o);
				l.call(a);
			};
		}
		var o = Cd(n, r, e, 0, null, !1, !1, '', gc);

		return (
			(e._reactRootContainer = o),
			(e[An] = o.current),
			ri(e.nodeType === 8 ? e.parentNode : e),
			Ct(),
			o
		);
	}
	for (; (i = e.lastChild); ) {
		e.removeChild(i);
	}
	if (typeof r === 'function') {
		const u = r;
		r = function () {
			const a = Pl(s);
			u.call(a);
		};
	}
	var s = js(e, 0, !1, null, null, !1, !1, '', gc);

	return (
		(e._reactRootContainer = s),
		(e[An] = s.current),
		ri(e.nodeType === 8 ? e.parentNode : e),
		Ct(() => {
			Vl(n, s, t, r);
		}),
		s
	);
}
function bl(e, n, t, r, i) {
	const l = t._reactRootContainer;
	if (l) {
		var o = l;
		if (typeof i === 'function') {
			const u = i;
			i = function () {
				const s = Pl(o);
				u.call(s);
			};
		}
		Vl(n, o, e, i);
	}
	else {
		o = $g(t, n, e, i, r);
	}

	return Pl(o);
}
ep = function (e) {
	switch (e.tag) {
		case 3:
			var n = e.stateNode;
			if (n.current.memoizedState.isDehydrated) {
				const t = zr(n.pendingLanes);
				t !== 0 &&
					(os(n, t | 1),
					Ve(n, he()),
					!(K & 6) && ((cr = he() + 500), st()));
			}
			break;
		case 13:
			Ct(() => {
				const r = Fn(e, 1);
				if (r !== null) {
					const i = Oe();
					gn(r, e, 1, i);
				}
			}),
				Bs(e, 1);
	}
};
us = function (e) {
	if (e.tag === 13) {
		const n = Fn(e, 134217728);
		if (n !== null) {
			const t = Oe();
			gn(n, e, 134217728, t);
		}
		Bs(e, 134217728);
	}
};
np = function (e) {
	if (e.tag === 13) {
		const n = tt(e);
		const t = Fn(e, n);
		if (t !== null) {
			const r = Oe();
			gn(t, e, n, r);
		}
		Bs(e, n);
	}
};
tp = function () {
	return G;
};
rp = function (e, n) {
	const t = G;
	try {
		return (G = e), n();
	}
	finally {
		G = t;
	}
};
Xo = function (e, n, t) {
	switch (n) {
		case 'input':
			if ((Vo(e, t), (n = t.name), t.type === 'radio' && n != null)) {
				for (t = e; t.parentNode; ) {
					t = t.parentNode;
				}
				for (
					t = t.querySelectorAll(
						'input[name=' +
							JSON.stringify('' + n) +
							'][type="radio"]'
					),
						n = 0;
					n < t.length;
					n++
				) {
					const r = t[n];
					if (r !== e && r.form === e.form) {
						const i = Dl(r);
						if (!i) {
							throw Error(_(90));
						}
						Mf(r), Vo(r, i);
					}
				}
			}
			break;
		case 'textarea':
			Af(e, t);
			break;
		case 'select':
			(n = t.value), n != null && Xt(e, !!t.multiple, n, !1);
	}
};
$f = Ms;
Wf = Ct;
const Wg = {usingClientEntryPoint: !1, Events: [gi, Ht, Dl, Hf, Vf, Ms]};
const _r = {
	findFiberByHostInstance: mt,
	bundleType: 0,
	version: '18.3.1',
	rendererPackageName: 'react-dom',
};
const bg = {
	bundleType: _r.bundleType,
	version: _r.version,
	rendererPackageName: _r.rendererPackageName,
	rendererConfig: _r.rendererConfig,
	overrideHookState: null,
	overrideHookStateDeletePath: null,
	overrideHookStateRenamePath: null,
	overrideProps: null,
	overridePropsDeletePath: null,
	overridePropsRenamePath: null,
	setErrorHandler: null,
	setSuspenseHandler: null,
	scheduleUpdate: null,
	currentDispatcherRef: Bn.ReactCurrentDispatcher,
	findHostInstanceByFiber(e) {
		return (e = Kf(e)), e === null ? null : e.stateNode;
	},
	findFiberByHostInstance: _r.findFiberByHostInstance || Vg,
	findHostInstancesForRefresh: null,
	scheduleRefresh: null,
	scheduleRoot: null,
	setRefreshHandler: null,
	getCurrentFiber: null,
	reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
	const Fi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
	if (!Fi.isDisabled && Fi.supportsFiber) {
		try {
			(Ll = Fi.inject(bg)), (Cn = Fi);
		}
		catch {}
	}
}
Je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wg;
Je.createPortal = function (e, n) {
	const t =
		2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
	if (!Hs(n)) {
		throw Error(_(200));
	}

	return Hg(e, n, null, t);
};
Je.createRoot = function (e, n) {
	if (!Hs(e)) {
		throw Error(_(299));
	}
	let t = !1;
	let r = '';
	let i = _d;

	return (
		n != null &&
			(n.unstable_strictMode === !0 && (t = !0),
			n.identifierPrefix !== void 0 && (r = n.identifierPrefix),
			n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
		(n = js(e, 1, !1, null, null, t, !1, r, i)),
		(e[An] = n.current),
		ri(e.nodeType === 8 ? e.parentNode : e),
		new Us(n)
	);
};
Je.findDOMNode = function (e) {
	if (e == null) {
		return null;
	}
	if (e.nodeType === 1) {
		return e;
	}
	const n = e._reactInternals;
	if (n === void 0) {
		throw typeof e.render === 'function'
			? Error(_(188))
			: ((e = Object.keys(e).join(',')), Error(_(268, e)));
	}

	return (e = Kf(n)), (e = e === null ? null : e.stateNode), e;
};
Je.flushSync = function (e) {
	return Ct(e);
};
Je.hydrate = function (e, n, t) {
	if (!Wl(n)) {
		throw Error(_(200));
	}

	return bl(null, e, n, !0, t);
};
Je.hydrateRoot = function (e, n, t) {
	if (!Hs(e)) {
		throw Error(_(405));
	}
	const r = (t != null && t.hydratedSources) || null;
	let i = !1;
	let l = '';
	let o = _d;
	if (
		(t != null &&
			(t.unstable_strictMode === !0 && (i = !0),
			t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
			t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
		(n = Cd(n, null, e, 1, t ?? null, i, !1, l, o)),
		(e[An] = n.current),
		ri(e),
		r)
	) {
		for (e = 0; e < r.length; e++) {
			(t = r[e]),
				(i = t._getVersion),
				(i = i(t._source)),
				n.mutableSourceEagerHydrationData == null
					? (n.mutableSourceEagerHydrationData = [t, i])
					: n.mutableSourceEagerHydrationData.push(t, i);
		}
	}

	return new $l(n);
};
Je.render = function (e, n, t) {
	if (!Wl(n)) {
		throw Error(_(200));
	}

	return bl(null, e, n, !1, t);
};
Je.unmountComponentAtNode = function (e) {
	if (!Wl(e)) {
		throw Error(_(40));
	}

	return e._reactRootContainer
		? (Ct(() => {
				bl(null, null, e, !1, () => {
					(e._reactRootContainer = null), (e[An] = null);
				});
			}),
			!0)
		: !1;
};
Je.unstable_batchedUpdates = Ms;
Je.unstable_renderSubtreeIntoContainer = function (e, n, t, r) {
	if (!Wl(t)) {
		throw Error(_(200));
	}
	if (e == null || e._reactInternals === void 0) {
		throw Error(_(38));
	}

	return bl(e, n, t, !1, r);
};
Je.version = '18.3.1-next-f1338f8080-20240426';
function Pd() {
	if (
		!(
			typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
			typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
		)
	) {
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Pd);
		}
		catch (e) {
			console.error(e);
		}
	}
}
Pd(), (Pf.exports = Je);
const Qg = Pf.exports;
let Td;
const yc = Qg;
(Td = yc.createRoot), yc.hydrateRoot;
class vc extends Error {
	constructor(n, t) {
		super(n),
			(this.name = 'ParseError'),
			(this.type = t.type),
			(this.field = t.field),
			(this.value = t.value),
			(this.line = t.line);
	}
}
function Co(e) {}
function Kg(e) {
	if (typeof e === 'function') {
		throw new TypeError(
			'`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?'
		);
	}
	const {onEvent: n = Co, onError: t = Co, onRetry: r = Co, onComment: i} = e;
	let l = '';
	let o = !0;
	let u;
	let s = '';
	let a = '';
	function c(k) {
		const C = o ? k.replace(/^\xEF\xBB\xBF/, '') : k;
		const [h, m] = Yg(`${l}${C}`);
		for (const y of h) {
			f(y);
		}
		(l = m), (o = !1);
	}
	function f(k) {
		if (k === '') {
			p();

			return;
		}
		if (k.startsWith(':')) {
			i && i(k.slice(k.startsWith(': ') ? 2 : 1));

			return;
		}
		const C = k.indexOf(':');
		if (C !== -1) {
			const h = k.slice(0, C);
			const m = k[C + 1] === ' ' ? 2 : 1;
			const y = k.slice(C + m);
			d(h, y, k);

			return;
		}
		d(k, '', k);
	}
	function d(k, C, h) {
		switch (k) {
			case 'event':
				a = C;
				break;
			case 'data':
				s = `${s}${C}
`;
				break;
			case 'id':
				u = C.includes('\0') ? void 0 : C;
				break;
			case 'retry':
				/^\d+$/.test(C)
					? r(parseInt(C, 10))
					: t(
							new vc(`Invalid \`retry\` value: "${C}"`, {
								type: 'invalid-retry',
								value: C,
								line: h,
							})
						);
				break;
			default:
				t(
					new vc(
						`Unknown field "${k.length > 20 ? `${k.slice(0, 20)}…` : k}"`,
						{type: 'unknown-field', field: k, value: C, line: h}
					)
				);
				break;
		}
	}
	function p() {
		!!s.length &&
			n({
				id: u,
				event: a || void 0,
				data: s.endsWith(`
`)
					? s.slice(0, -1)
					: s,
			}),
			(u = void 0),
			(s = ''),
			(a = '');
	}
	function x(k = {}) {
		l && k.consume && f(l),
			(o = !0),
			(u = void 0),
			(s = ''),
			(a = ''),
			(l = '');
	}

	return {feed: c, reset: x};
}
function Yg(e) {
	const n = [];
	let t = '';
	let r = 0;
	for (; r < e.length; ) {
		const i = e.indexOf('\r', r);
		const l = e.indexOf(
			`
`,
			r
		);
		let o = -1;
		if (
			(i !== -1 && l !== -1
				? (o = Math.min(i, l))
				: i !== -1
					? i === e.length - 1
						? (o = -1)
						: (o = i)
					: l !== -1 && (o = l),
			o === -1)
		) {
			t = e.slice(r);
			break;
		}
		else {
			const u = e.slice(r, o);
			n.push(u),
				(r = o + 1),
				e[r - 1] === '\r' &&
					e[r] ===
						`
` &&
					r++;
		}
	}

	return [n, t];
}
class kc extends Event {
	constructor(n, t) {
		let r;
		let i;
		super(n),
			(this.code =
				(r = t == null ? void 0 : t.code) != null ? r : void 0),
			(this.message =
				(i = t == null ? void 0 : t.message) != null ? i : void 0);
	}
	[Symbol.for('nodejs.util.inspect.custom')](n, t, r) {
		return r(xc(this), t);
	}
	[Symbol.for('Deno.customInspect')](n, t) {
		return n(xc(this), t);
	}
}
function Xg(e) {
	const n = globalThis.DOMException;

	return typeof n === 'function'
		? new n(e, 'SyntaxError')
		: new SyntaxError(e);
}
function Iu(e) {
	return e instanceof Error
		? 'errors' in e && Array.isArray(e.errors)
			? e.errors.map(Iu).join(', ')
			: 'cause' in e && e.cause instanceof Error
				? `${e}: ${Iu(e.cause)}`
				: e.message
		: `${e}`;
}
function xc(e) {
	return {
		type: e.type,
		message: e.message,
		code: e.code,
		defaultPrevented: e.defaultPrevented,
		cancelable: e.cancelable,
		timeStamp: e.timeStamp,
	};
}
const Id = (e) => {
	throw TypeError(e);
};
const Vs = (e, n, t) => n.has(e) || Id('Cannot ' + t);
const V = (e, n, t) => (
	Vs(e, n, 'read from private field'), t ? t.call(e) : n.get(e)
);
const ke = (e, n, t) =>
	n.has(e)
		? Id('Cannot add the same private member more than once')
		: n instanceof WeakSet
			? n.add(e)
			: n.set(e, t);
const le = (e, n, t, r) => (Vs(e, n, 'write to private field'), n.set(e, t), t);
const Nn = (e, n, t) => (Vs(e, n, 'access private method'), t);
let Fe;
let dt;
let Ot;
let Zi;
let Tl;
let $r;
let Yt;
let Wr;
let Kn;
let Mt;
let nr;
let Dt;
let Rr;
let fn;
let Nu;
let zu;
let Lu;
let wc;
let Ru;
let Ou;
let Or;
let Mu;
let Du;
class br extends EventTarget {
	constructor(n, t) {
		let r;
		let i;
		super(),
			ke(this, fn),
			(this.CONNECTING = 0),
			(this.OPEN = 1),
			(this.CLOSED = 2),
			ke(this, Fe),
			ke(this, dt),
			ke(this, Ot),
			ke(this, Zi),
			ke(this, Tl),
			ke(this, $r),
			ke(this, Yt),
			ke(this, Wr, null),
			ke(this, Kn),
			ke(this, Mt),
			ke(this, nr, null),
			ke(this, Dt, null),
			ke(this, Rr, null),
			ke(this, zu, async (l) => {
				let o;
				V(this, Mt).reset();
				const {body: u, headers: c, redirected: s, status: a} = l;
				if (a === 204) {
					Nn(this, fn, Or).call(
						this,
						'Server sent HTTP 204, not reconnecting',
						204
					),
						this.close();

					return;
				}
				if (
					(s ? le(this, Ot, new URL(l.url)) : le(this, Ot, void 0),
					a !== 200)
				) {
					Nn(this, fn, Or).call(
						this,
						`Non-200 status code (${a})`,
						a
					);

					return;
				}
				if (
					!(c.get('content-type') || '').startsWith(
						'text/event-stream'
					)
				) {
					Nn(this, fn, Or).call(
						this,
						'Invalid content type, expected "text/event-stream"',
						a
					);

					return;
				}
				if (V(this, Fe) === this.CLOSED) {
					return;
				}
				le(this, Fe, this.OPEN);
				const f = new Event('open');
				if (
					((o = V(this, Rr)) == null || o.call(this, f),
					this.dispatchEvent(f),
					typeof u !== 'object' || !u || !('getReader' in u))
				) {
					Nn(this, fn, Or).call(
						this,
						'Invalid response body, expected a web ReadableStream',
						a
					),
						this.close();

					return;
				}
				const d = new TextDecoder();
				const p = u.getReader();
				let x = !0;
				do {
					const {done: k, value: C} = await p.read();
					C && V(this, Mt).feed(d.decode(C, {stream: !k})),
						k &&
							((x = !1),
							V(this, Mt).reset(),
							Nn(this, fn, Mu).call(this));
				} while (x);
			}),
			ke(this, Lu, (l) => {
				le(this, Kn, void 0),
					!(l.name === 'AbortError' || l.type === 'aborted') &&
						Nn(this, fn, Mu).call(this, Iu(l));
			}),
			ke(this, Ru, (l) => {
				typeof l.id === 'string' && le(this, Wr, l.id);
				const o = new MessageEvent(l.event || 'message', {
					data: l.data,
					origin: V(this, Ot)
						? V(this, Ot).origin
						: V(this, dt).origin,
					lastEventId: l.id || '',
				});
				V(this, Dt) &&
					(!l.event || l.event === 'message') &&
					V(this, Dt).call(this, o),
					this.dispatchEvent(o);
			}),
			ke(this, Ou, (l) => {
				le(this, $r, l);
			}),
			ke(this, Du, () => {
				le(this, Yt, void 0),
					V(this, Fe) === this.CONNECTING &&
						Nn(this, fn, Nu).call(this);
			});
		try {
			if (n instanceof URL) {
				le(this, dt, n);
			}
			else if (typeof n === 'string') {
				le(this, dt, new URL(n, Gg()));
			}
			else {
				throw new Error('Invalid URL');
			}
		}
		catch {
			throw Xg('An invalid or illegal string was specified');
		}
		le(this, Mt, Kg({onEvent: V(this, Ru), onRetry: V(this, Ou)})),
			le(this, Fe, this.CONNECTING),
			le(this, $r, 3e3),
			le(
				this,
				Tl,
				(r = t == null ? void 0 : t.fetch) != null
					? r
					: globalThis.fetch
			),
			le(
				this,
				Zi,
				(i = t == null ? void 0 : t.withCredentials) != null ? i : !1
			),
			Nn(this, fn, Nu).call(this);
	}
	get readyState() {
		return V(this, Fe);
	}
	get url() {
		return V(this, dt).href;
	}
	get withCredentials() {
		return V(this, Zi);
	}
	get onerror() {
		return V(this, nr);
	}
	set onerror(n) {
		le(this, nr, n);
	}
	get onmessage() {
		return V(this, Dt);
	}
	set onmessage(n) {
		le(this, Dt, n);
	}
	get onopen() {
		return V(this, Rr);
	}
	set onopen(n) {
		le(this, Rr, n);
	}
	addEventListener(n, t, r) {
		const i = t;
		super.addEventListener(n, i, r);
	}
	removeEventListener(n, t, r) {
		const i = t;
		super.removeEventListener(n, i, r);
	}
	close() {
		V(this, Yt) && clearTimeout(V(this, Yt)),
			V(this, Fe) !== this.CLOSED &&
				(V(this, Kn) && V(this, Kn).abort(),
				le(this, Fe, this.CLOSED),
				le(this, Kn, void 0));
	}
}
(Fe = new WeakMap()),
	(dt = new WeakMap()),
	(Ot = new WeakMap()),
	(Zi = new WeakMap()),
	(Tl = new WeakMap()),
	($r = new WeakMap()),
	(Yt = new WeakMap()),
	(Wr = new WeakMap()),
	(Kn = new WeakMap()),
	(Mt = new WeakMap()),
	(nr = new WeakMap()),
	(Dt = new WeakMap()),
	(Rr = new WeakMap()),
	(fn = new WeakSet()),
	(Nu = function () {
		le(this, Fe, this.CONNECTING),
			le(this, Kn, new AbortController()),
			V(this, Tl)(V(this, dt), Nn(this, fn, wc).call(this))
				.then(V(this, zu))
				.catch(V(this, Lu));
	}),
	(zu = new WeakMap()),
	(Lu = new WeakMap()),
	(wc = function () {
		let e;
		const n = {
			mode: 'cors',
			redirect: 'follow',
			headers: {
				Accept: 'text/event-stream',
				...(V(this, Wr) ? {'Last-Event-ID': V(this, Wr)} : void 0),
			},
			cache: 'no-store',
			signal: (e = V(this, Kn)) == null ? void 0 : e.signal,
		};

		return (
			'window' in globalThis &&
				(n.credentials = this.withCredentials
					? 'include'
					: 'same-origin'),
			n
		);
	}),
	(Ru = new WeakMap()),
	(Ou = new WeakMap()),
	(Or = function (e, n) {
		let t;
		V(this, Fe) !== this.CLOSED && le(this, Fe, this.CLOSED);
		const r = new kc('error', {code: n, message: e});
		(t = V(this, nr)) == null || t.call(this, r), this.dispatchEvent(r);
	}),
	(Mu = function (e, n) {
		let t;
		if (V(this, Fe) === this.CLOSED) {
			return;
		}
		le(this, Fe, this.CONNECTING);
		const r = new kc('error', {code: n, message: e});
		(t = V(this, nr)) == null || t.call(this, r),
			this.dispatchEvent(r),
			le(this, Yt, setTimeout(V(this, Du), V(this, $r)));
	}),
	(Du = new WeakMap()),
	(br.CONNECTING = 0),
	(br.OPEN = 1),
	(br.CLOSED = 2);
Object.defineProperty(br, Symbol.for('eventsource.supports-fetch-override'), {
	value: !0,
	writable: !1,
	configurable: !1,
	enumerable: !1,
});
function Gg() {
	const e = 'document' in globalThis ? globalThis.document : void 0;

	return e &&
		typeof e === 'object' &&
		'baseURI' in e &&
		typeof e.baseURI === 'string'
		? e.baseURI
		: void 0;
}
let Ql = '';
function qg(e) {
	Ql = e;
}
async function Jg(e) {
	const n = await fetch(
		`${Ql}/o/ai-hub/chatbots/by-external-reference-code/${e}`,
		{headers: new Headers({Accept: 'application/json'})}
	);
	if (!n.ok) {
		throw new Error(
			`Unable to fetch chatbot configuration: ${n.statusText}`
		);
	}

	return await n.json();
}
function Zg() {
	return new br(`${Ql}/o/ai-hub/v1.0/chats/subscribe`, {
		fetch: (e, n) =>
			fetch(e, {
				...n,
				headers: new Headers({Accept: 'text/event-stream'}),
			}),
		withCredentials: !0,
	});
}
function ey(e, n, t) {
	return fetch(
		`${Ql}/o/ai-hub/v1.0/chats/by-external-reference-code/${n}/messages`,
		{
			body: JSON.stringify({
				chatbotExternalReferenceCode: e,
				context: {},
				instructionDefinitionScope: 'clickToChat',
				text: t,
			}),
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}),
			method: 'POST',
		}
	);
}
function ny(e, n) {
	const t = {};

	return (e[e.length - 1] === '' ? [...e, ''] : e)
		.join((t.padRight ? ' ' : '') + ',' + (t.padLeft === !1 ? '' : ' '))
		.trim();
}
const ty = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
const ry = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
const iy = {};
function Sc(e, n) {
	return (iy.jsx ? ry : ty).test(e);
}
const ly = /[ \t\n\f\r]/g;
function oy(e) {
	return typeof e === 'object'
		? e.type === 'text'
			? Ec(e.value)
			: !1
		: Ec(e);
}
function Ec(e) {
	return e.replace(ly, '') === '';
}
class vi {
	constructor(n, t, r) {
		(this.normal = t), (this.property = n), r && (this.space = r);
	}
}
vi.prototype.normal = {};
vi.prototype.property = {};
vi.prototype.space = void 0;
function Nd(e, n) {
	const t = {};
	const r = {};
	for (const i of e) {
		Object.assign(t, i.property), Object.assign(r, i.normal);
	}

	return new vi(t, r, n);
}
function Au(e) {
	return e.toLowerCase();
}
class We {
	constructor(n, t) {
		(this.attribute = t), (this.property = n);
	}
}
We.prototype.attribute = '';
We.prototype.booleanish = !1;
We.prototype.boolean = !1;
We.prototype.commaOrSpaceSeparated = !1;
We.prototype.commaSeparated = !1;
We.prototype.defined = !1;
We.prototype.mustUseProperty = !1;
We.prototype.number = !1;
We.prototype.overloadedBoolean = !1;
We.prototype.property = '';
We.prototype.spaceSeparated = !1;
We.prototype.space = void 0;
let uy = 0;
const H = Tt();
const ge = Tt();
const Fu = Tt();
const P = Tt();
const Z = Tt();
const tr = Tt();
const Qe = Tt();
function Tt() {
	return 2 ** ++uy;
}
const ju = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			boolean: H,
			booleanish: ge,
			commaOrSpaceSeparated: Qe,
			commaSeparated: tr,
			number: P,
			overloadedBoolean: Fu,
			spaceSeparated: Z,
		},
		Symbol.toStringTag,
		{value: 'Module'}
	)
);
const _o = Object.keys(ju);
class $s extends We {
	constructor(n, t, r, i) {
		let l = -1;
		if ((super(n, t), Cc(this, 'space', i), typeof r === 'number')) {
			for (; ++l < _o.length; ) {
				const o = _o[l];
				Cc(this, _o[l], (r & ju[o]) === ju[o]);
			}
		}
	}
}
$s.prototype.defined = !0;
function Cc(e, n, t) {
	t && (e[n] = t);
}
function hr(e) {
	const n = {};
	const t = {};
	for (const [r, i] of Object.entries(e.properties)) {
		const l = new $s(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty &&
			e.mustUseProperty.includes(r) &&
			(l.mustUseProperty = !0),
			(n[r] = l),
			(t[Au(r)] = r),
			(t[Au(l.attribute)] = r);
	}

	return new vi(n, t, e.space);
}
const zd = hr({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: ge,
		ariaAutoComplete: null,
		ariaBusy: ge,
		ariaChecked: ge,
		ariaColCount: P,
		ariaColIndex: P,
		ariaColSpan: P,
		ariaControls: Z,
		ariaCurrent: null,
		ariaDescribedBy: Z,
		ariaDetails: null,
		ariaDisabled: ge,
		ariaDropEffect: Z,
		ariaErrorMessage: null,
		ariaExpanded: ge,
		ariaFlowTo: Z,
		ariaGrabbed: ge,
		ariaHasPopup: null,
		ariaHidden: ge,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: Z,
		ariaLevel: P,
		ariaLive: null,
		ariaModal: ge,
		ariaMultiLine: ge,
		ariaMultiSelectable: ge,
		ariaOrientation: null,
		ariaOwns: Z,
		ariaPlaceholder: null,
		ariaPosInSet: P,
		ariaPressed: ge,
		ariaReadOnly: ge,
		ariaRelevant: null,
		ariaRequired: ge,
		ariaRoleDescription: Z,
		ariaRowCount: P,
		ariaRowIndex: P,
		ariaRowSpan: P,
		ariaSelected: ge,
		ariaSetSize: P,
		ariaSort: null,
		ariaValueMax: P,
		ariaValueMin: P,
		ariaValueNow: P,
		ariaValueText: null,
		role: null,
	},
	transform(e, n) {
		return n === 'role' ? n : 'aria-' + n.slice(4).toLowerCase();
	},
});
function Ld(e, n) {
	return n in e ? e[n] : n;
}
function Rd(e, n) {
	return Ld(e, n.toLowerCase());
}
const sy = hr({
	attributes: {
		acceptcharset: 'accept-charset',
		classname: 'class',
		htmlfor: 'for',
		httpequiv: 'http-equiv',
	},
	mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
	properties: {
		abbr: null,
		accept: tr,
		acceptCharset: Z,
		accessKey: Z,
		action: null,
		allow: null,
		allowFullScreen: H,
		allowPaymentRequest: H,
		allowUserMedia: H,
		alt: null,
		as: null,
		async: H,
		autoCapitalize: null,
		autoComplete: Z,
		autoFocus: H,
		autoPlay: H,
		blocking: Z,
		capture: null,
		charSet: null,
		checked: H,
		cite: null,
		className: Z,
		cols: P,
		colSpan: null,
		content: null,
		contentEditable: ge,
		controls: H,
		controlsList: Z,
		coords: P | tr,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: H,
		defer: H,
		dir: null,
		dirName: null,
		disabled: H,
		download: Fu,
		draggable: ge,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: H,
		formTarget: null,
		headers: Z,
		height: P,
		hidden: Fu,
		high: P,
		href: null,
		hrefLang: null,
		htmlFor: Z,
		httpEquiv: Z,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: H,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: H,
		itemId: null,
		itemProp: Z,
		itemRef: Z,
		itemScope: H,
		itemType: Z,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: H,
		low: P,
		manifest: null,
		max: null,
		maxLength: P,
		media: null,
		method: null,
		min: null,
		minLength: P,
		multiple: H,
		muted: H,
		name: null,
		nonce: null,
		noModule: H,
		noValidate: H,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: H,
		optimum: P,
		pattern: null,
		ping: Z,
		placeholder: null,
		playsInline: H,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: H,
		referrerPolicy: null,
		rel: Z,
		required: H,
		reversed: H,
		rows: P,
		rowSpan: P,
		sandbox: Z,
		scope: null,
		scoped: H,
		seamless: H,
		selected: H,
		shadowRootClonable: H,
		shadowRootDelegatesFocus: H,
		shadowRootMode: null,
		shape: null,
		size: P,
		sizes: null,
		slot: null,
		span: P,
		spellCheck: ge,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: P,
		step: null,
		style: null,
		tabIndex: P,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: H,
		useMap: null,
		value: ge,
		width: P,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: Z,
		axis: null,
		background: null,
		bgColor: null,
		border: P,
		borderColor: null,
		bottomMargin: P,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: H,
		declare: H,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: P,
		leftMargin: P,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: P,
		marginWidth: P,
		noResize: H,
		noHref: H,
		noShade: H,
		noWrap: H,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: P,
		rules: null,
		scheme: null,
		scrolling: ge,
		standby: null,
		summary: null,
		text: null,
		topMargin: P,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: P,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		disablePictureInPicture: H,
		disableRemotePlayback: H,
		prefix: null,
		property: null,
		results: P,
		security: null,
		unselectable: null,
	},
	space: 'html',
	transform: Rd,
});
const ay = hr({
	attributes: {
		accentHeight: 'accent-height',
		alignmentBaseline: 'alignment-baseline',
		arabicForm: 'arabic-form',
		baselineShift: 'baseline-shift',
		capHeight: 'cap-height',
		className: 'class',
		clipPath: 'clip-path',
		clipRule: 'clip-rule',
		colorInterpolation: 'color-interpolation',
		colorInterpolationFilters: 'color-interpolation-filters',
		colorProfile: 'color-profile',
		colorRendering: 'color-rendering',
		crossOrigin: 'crossorigin',
		dataType: 'datatype',
		dominantBaseline: 'dominant-baseline',
		enableBackground: 'enable-background',
		fillOpacity: 'fill-opacity',
		fillRule: 'fill-rule',
		floodColor: 'flood-color',
		floodOpacity: 'flood-opacity',
		fontFamily: 'font-family',
		fontSize: 'font-size',
		fontSizeAdjust: 'font-size-adjust',
		fontStretch: 'font-stretch',
		fontStyle: 'font-style',
		fontVariant: 'font-variant',
		fontWeight: 'font-weight',
		glyphName: 'glyph-name',
		glyphOrientationHorizontal: 'glyph-orientation-horizontal',
		glyphOrientationVertical: 'glyph-orientation-vertical',
		hrefLang: 'hreflang',
		horizAdvX: 'horiz-adv-x',
		horizOriginX: 'horiz-origin-x',
		horizOriginY: 'horiz-origin-y',
		imageRendering: 'image-rendering',
		letterSpacing: 'letter-spacing',
		lightingColor: 'lighting-color',
		markerEnd: 'marker-end',
		markerMid: 'marker-mid',
		markerStart: 'marker-start',
		navDown: 'nav-down',
		navDownLeft: 'nav-down-left',
		navDownRight: 'nav-down-right',
		navLeft: 'nav-left',
		navNext: 'nav-next',
		navPrev: 'nav-prev',
		navRight: 'nav-right',
		navUp: 'nav-up',
		navUpLeft: 'nav-up-left',
		navUpRight: 'nav-up-right',
		onAbort: 'onabort',
		onActivate: 'onactivate',
		onAfterPrint: 'onafterprint',
		onBeforePrint: 'onbeforeprint',
		onBegin: 'onbegin',
		onCancel: 'oncancel',
		onCanPlay: 'oncanplay',
		onCanPlayThrough: 'oncanplaythrough',
		onChange: 'onchange',
		onClick: 'onclick',
		onClose: 'onclose',
		onCopy: 'oncopy',
		onCueChange: 'oncuechange',
		onCut: 'oncut',
		onDblClick: 'ondblclick',
		onDrag: 'ondrag',
		onDragEnd: 'ondragend',
		onDragEnter: 'ondragenter',
		onDragExit: 'ondragexit',
		onDragLeave: 'ondragleave',
		onDragOver: 'ondragover',
		onDragStart: 'ondragstart',
		onDrop: 'ondrop',
		onDurationChange: 'ondurationchange',
		onEmptied: 'onemptied',
		onEnd: 'onend',
		onEnded: 'onended',
		onError: 'onerror',
		onFocus: 'onfocus',
		onFocusIn: 'onfocusin',
		onFocusOut: 'onfocusout',
		onHashChange: 'onhashchange',
		onInput: 'oninput',
		onInvalid: 'oninvalid',
		onKeyDown: 'onkeydown',
		onKeyPress: 'onkeypress',
		onKeyUp: 'onkeyup',
		onLoad: 'onload',
		onLoadedData: 'onloadeddata',
		onLoadedMetadata: 'onloadedmetadata',
		onLoadStart: 'onloadstart',
		onMessage: 'onmessage',
		onMouseDown: 'onmousedown',
		onMouseEnter: 'onmouseenter',
		onMouseLeave: 'onmouseleave',
		onMouseMove: 'onmousemove',
		onMouseOut: 'onmouseout',
		onMouseOver: 'onmouseover',
		onMouseUp: 'onmouseup',
		onMouseWheel: 'onmousewheel',
		onOffline: 'onoffline',
		onOnline: 'ononline',
		onPageHide: 'onpagehide',
		onPageShow: 'onpageshow',
		onPaste: 'onpaste',
		onPause: 'onpause',
		onPlay: 'onplay',
		onPlaying: 'onplaying',
		onPopState: 'onpopstate',
		onProgress: 'onprogress',
		onRateChange: 'onratechange',
		onRepeat: 'onrepeat',
		onReset: 'onreset',
		onResize: 'onresize',
		onScroll: 'onscroll',
		onSeeked: 'onseeked',
		onSeeking: 'onseeking',
		onSelect: 'onselect',
		onShow: 'onshow',
		onStalled: 'onstalled',
		onStorage: 'onstorage',
		onSubmit: 'onsubmit',
		onSuspend: 'onsuspend',
		onTimeUpdate: 'ontimeupdate',
		onToggle: 'ontoggle',
		onUnload: 'onunload',
		onVolumeChange: 'onvolumechange',
		onWaiting: 'onwaiting',
		onZoom: 'onzoom',
		overlinePosition: 'overline-position',
		overlineThickness: 'overline-thickness',
		paintOrder: 'paint-order',
		panose1: 'panose-1',
		pointerEvents: 'pointer-events',
		referrerPolicy: 'referrerpolicy',
		renderingIntent: 'rendering-intent',
		shapeRendering: 'shape-rendering',
		stopColor: 'stop-color',
		stopOpacity: 'stop-opacity',
		strikethroughPosition: 'strikethrough-position',
		strikethroughThickness: 'strikethrough-thickness',
		strokeDashArray: 'stroke-dasharray',
		strokeDashOffset: 'stroke-dashoffset',
		strokeLineCap: 'stroke-linecap',
		strokeLineJoin: 'stroke-linejoin',
		strokeMiterLimit: 'stroke-miterlimit',
		strokeOpacity: 'stroke-opacity',
		strokeWidth: 'stroke-width',
		tabIndex: 'tabindex',
		textAnchor: 'text-anchor',
		textDecoration: 'text-decoration',
		textRendering: 'text-rendering',
		transformOrigin: 'transform-origin',
		typeOf: 'typeof',
		underlinePosition: 'underline-position',
		underlineThickness: 'underline-thickness',
		unicodeBidi: 'unicode-bidi',
		unicodeRange: 'unicode-range',
		unitsPerEm: 'units-per-em',
		vAlphabetic: 'v-alphabetic',
		vHanging: 'v-hanging',
		vIdeographic: 'v-ideographic',
		vMathematical: 'v-mathematical',
		vectorEffect: 'vector-effect',
		vertAdvY: 'vert-adv-y',
		vertOriginX: 'vert-origin-x',
		vertOriginY: 'vert-origin-y',
		wordSpacing: 'word-spacing',
		writingMode: 'writing-mode',
		xHeight: 'x-height',
		playbackOrder: 'playbackorder',
		timelineBegin: 'timelinebegin',
	},
	properties: {
		about: Qe,
		accentHeight: P,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: P,
		amplitude: P,
		arabicForm: null,
		ascent: P,
		attributeName: null,
		attributeType: null,
		azimuth: P,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: P,
		by: null,
		calcMode: null,
		capHeight: P,
		className: Z,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: P,
		diffuseConstant: P,
		direction: null,
		display: null,
		dur: null,
		divisor: P,
		dominantBaseline: null,
		download: H,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: P,
		enableBackground: null,
		end: null,
		event: null,
		exponent: P,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: P,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: tr,
		g2: tr,
		glyphName: tr,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: P,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: P,
		horizOriginX: P,
		horizOriginY: P,
		id: null,
		ideographic: P,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: P,
		k: P,
		k1: P,
		k2: P,
		k3: P,
		k4: P,
		kernelMatrix: Qe,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: P,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: P,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: P,
		overlineThickness: P,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: P,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: Z,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: P,
		pointsAtY: P,
		pointsAtZ: P,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: Qe,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: Qe,
		rev: Qe,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: Qe,
		requiredFeatures: Qe,
		requiredFonts: Qe,
		requiredFormats: Qe,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: P,
		specularExponent: P,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: P,
		strikethroughThickness: P,
		string: null,
		stroke: null,
		strokeDashArray: Qe,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: P,
		strokeOpacity: P,
		strokeWidth: null,
		style: null,
		surfaceScale: P,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: Qe,
		tabIndex: P,
		tableValues: null,
		target: null,
		targetX: P,
		targetY: P,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: Qe,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: P,
		underlineThickness: P,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: P,
		values: null,
		vAlphabetic: P,
		vMathematical: P,
		vectorEffect: null,
		vHanging: P,
		vIdeographic: P,
		version: null,
		vertAdvY: P,
		vertOriginX: P,
		vertOriginY: P,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: P,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null,
	},
	space: 'svg',
	transform: Ld,
});
const Od = hr({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null,
	},
	space: 'xlink',
	transform(e, n) {
		return 'xlink:' + n.slice(5).toLowerCase();
	},
});
const Md = hr({
	attributes: {xmlnsxlink: 'xmlns:xlink'},
	properties: {xmlnsXLink: null, xmlns: null},
	space: 'xmlns',
	transform: Rd,
});
const Dd = hr({
	properties: {xmlBase: null, xmlLang: null, xmlSpace: null},
	space: 'xml',
	transform(e, n) {
		return 'xml:' + n.slice(3).toLowerCase();
	},
});
const cy = {
	classId: 'classID',
	dataType: 'datatype',
	itemId: 'itemID',
	strokeDashArray: 'strokeDasharray',
	strokeDashOffset: 'strokeDashoffset',
	strokeLineCap: 'strokeLinecap',
	strokeLineJoin: 'strokeLinejoin',
	strokeMiterLimit: 'strokeMiterlimit',
	typeOf: 'typeof',
	xLinkActuate: 'xlinkActuate',
	xLinkArcRole: 'xlinkArcrole',
	xLinkHref: 'xlinkHref',
	xLinkRole: 'xlinkRole',
	xLinkShow: 'xlinkShow',
	xLinkTitle: 'xlinkTitle',
	xLinkType: 'xlinkType',
	xmlnsXLink: 'xmlnsXlink',
};
const fy = /[A-Z]/g;
const _c = /-[a-z]/g;
const py = /^data[-\w.:]+$/i;
function dy(e, n) {
	const t = Au(n);
	let r = n;
	let i = We;
	if (t in e.normal) {
		return e.property[e.normal[t]];
	}
	if (t.length > 4 && t.slice(0, 4) === 'data' && py.test(n)) {
		if (n.charAt(4) === '-') {
			const l = n.slice(5).replace(_c, my);
			r = 'data' + l.charAt(0).toUpperCase() + l.slice(1);
		}
		else {
			const l = n.slice(4);
			if (!_c.test(l)) {
				let o = l.replace(fy, hy);
				o.charAt(0) !== '-' && (o = '-' + o), (n = 'data' + o);
			}
		}
		i = $s;
	}

	return new i(r, n);
}
function hy(e) {
	return '-' + e.toLowerCase();
}
function my(e) {
	return e.charAt(1).toUpperCase();
}
const gy = Nd([zd, sy, Od, Md, Dd], 'html');
const Ws = Nd([zd, ay, Od, Md, Dd], 'svg');
function yy(e) {
	return e.join(' ').trim();
}
const bs = {};
const Pc = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
const vy = /\n/g;
const ky = /^\s*/;
const xy = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
const wy = /^:\s*/;
const Sy = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
const Ey = /^[;\s]*/;
const Cy = /^\s+|\s+$/g;
const _y = `
`;
const Tc = '/';
const Ic = '*';
const ht = '';
const Py = 'comment';
const Ty = 'declaration';
function Iy(e, n) {
	if (typeof e !== 'string') {
		throw new TypeError('First argument must be a string');
	}
	if (!e) {
		return [];
	}
	n = n || {};
	let t = 1;
	let r = 1;
	function i(x) {
		const k = x.match(vy);
		k && (t += k.length);
		const C = x.lastIndexOf(_y);
		r = ~C ? x.length - C : r + x.length;
	}
	function l() {
		const x = {line: t, column: r};

		return function (k) {
			return (k.position = new o(x)), a(), k;
		};
	}
	function o(x) {
		(this.start = x),
			(this.end = {line: t, column: r}),
			(this.source = n.source);
	}
	o.prototype.content = e;
	function u(x) {
		const k = new Error(n.source + ':' + t + ':' + r + ': ' + x);
		if (
			((k.reason = x),
			(k.filename = n.source),
			(k.line = t),
			(k.column = r),
			(k.source = e),
			!n.silent)
		) {
			throw k;
		}
	}
	function s(x) {
		const k = x.exec(e);
		if (k) {
			const C = k[0];

			return i(C), (e = e.slice(C.length)), k;
		}
	}
	function a() {
		s(ky);
	}
	function c(x) {
		let k;
		for (x = x || []; (k = f()); ) {
			k !== !1 && x.push(k);
		}

		return x;
	}
	function f() {
		const x = l();
		if (!(Tc != e.charAt(0) || Ic != e.charAt(1))) {
			for (
				var k = 2;
				ht != e.charAt(k) &&
				(Ic != e.charAt(k) || Tc != e.charAt(k + 1));

			) {
				++k;
			}
			if (((k += 2), ht === e.charAt(k - 1))) {
				return u('End of comment missing');
			}
			const C = e.slice(2, k - 2);

			return (
				(r += 2),
				i(C),
				(e = e.slice(k)),
				(r += 2),
				x({type: Py, comment: C})
			);
		}
	}
	function d() {
		const x = l();
		const k = s(xy);
		if (k) {
			if ((f(), !s(wy))) {
				return u("property missing ':'");
			}
			const C = s(Sy);
			const h = x({
				type: Ty,
				property: Nc(k[0].replace(Pc, ht)),
				value: C ? Nc(C[0].replace(Pc, ht)) : ht,
			});

			return s(Ey), h;
		}
	}
	function p() {
		const x = [];
		c(x);
		for (var k; (k = d()); ) {
			k !== !1 && (x.push(k), c(x));
		}

		return x;
	}

	return a(), p();
}
function Nc(e) {
	return e ? e.replace(Cy, ht) : ht;
}
const Ny = Iy;
const zy =
	(tl && tl.__importDefault) ||
	function (e) {
		return e && e.__esModule ? e : {default: e};
	};
Object.defineProperty(bs, '__esModule', {value: !0});
bs.default = Ry;
const Ly = zy(Ny);
function Ry(e, n) {
	let t = null;
	if (!e || typeof e !== 'string') {
		return t;
	}
	const r = (0, Ly.default)(e);
	const i = typeof n === 'function';

	return (
		r.forEach((l) => {
			if (l.type !== 'declaration') {
				return;
			}
			const {property: o, value: u} = l;
			i ? n(o, u, l) : u && ((t = t || {}), (t[o] = u));
		}),
		t
	);
}
const Kl = {};
Object.defineProperty(Kl, '__esModule', {value: !0});
Kl.camelCase = void 0;
const Oy = /^--[a-zA-Z0-9_-]+$/;
const My = /-([a-z])/g;
const Dy = /^[^-]+$/;
const Ay = /^-(webkit|moz|ms|o|khtml)-/;
const Fy = /^-(ms)-/;
const jy = function (e) {
	return !e || Dy.test(e) || Oy.test(e);
};
const By = function (e, n) {
	return n.toUpperCase();
};
const zc = function (e, n) {
	return ''.concat(n, '-');
};
const Uy = function (e, n) {
	return (
		n === void 0 && (n = {}),
		jy(e)
			? e
			: ((e = e.toLowerCase()),
				n.reactCompat
					? (e = e.replace(Fy, zc))
					: (e = e.replace(Ay, zc)),
				e.replace(My, By))
	);
};
Kl.camelCase = Uy;
const Hy =
	(tl && tl.__importDefault) ||
	function (e) {
		return e && e.__esModule ? e : {default: e};
	};
const Vy = Hy(bs);
const $y = Kl;
function Bu(e, n) {
	const t = {};

	return (
		!e ||
			typeof e !== 'string' ||
			(0, Vy.default)(e, (r, i) => {
				r && i && (t[(0, $y.camelCase)(r, n)] = i);
			}),
		t
	);
}
Bu.default = Bu;
const Wy = Bu;
const by = hf(Wy);
const Ad = Fd('end');
const Qs = Fd('start');
function Fd(e) {
	return n;
	function n(t) {
		const r = (t && t.position && t.position[e]) || {};
		if (
			typeof r.line === 'number' &&
			r.line > 0 &&
			typeof r.column === 'number' &&
			r.column > 0
		) {
			return {
				line: r.line,
				column: r.column,
				offset:
					typeof r.offset === 'number' && r.offset > -1
						? r.offset
						: void 0,
			};
		}
	}
}
function Qy(e) {
	const n = Qs(e);
	const t = Ad(e);
	if (n && t) {
		return {start: n, end: t};
	}
}
function Qr(e) {
	return !e || typeof e !== 'object'
		? ''
		: 'position' in e || 'type' in e
			? Lc(e.position)
			: 'start' in e || 'end' in e
				? Lc(e)
				: 'line' in e || 'column' in e
					? Uu(e)
					: '';
}
function Uu(e) {
	return Rc(e && e.line) + ':' + Rc(e && e.column);
}
function Lc(e) {
	return Uu(e && e.start) + '-' + Uu(e && e.end);
}
function Rc(e) {
	return e && typeof e === 'number' ? e : 1;
}
class Le extends Error {
	constructor(n, t, r) {
		super(), typeof t === 'string' && ((r = t), (t = void 0));
		let i = '';
		let l = {};
		let o = !1;
		if (
			(t &&
				('line' in t && 'column' in t
					? (l = {place: t})
					: 'start' in t && 'end' in t
						? (l = {place: t})
						: 'type' in t
							? (l = {ancestors: [t], place: t.position})
							: (l = {...t})),
			typeof n === 'string'
				? (i = n)
				: !l.cause && n && ((o = !0), (i = n.message), (l.cause = n)),
			!l.ruleId && !l.source && typeof r === 'string')
		) {
			const s = r.indexOf(':');
			s === -1
				? (l.ruleId = r)
				: ((l.source = r.slice(0, s)), (l.ruleId = r.slice(s + 1)));
		}
		if (!l.place && l.ancestors && l.ancestors) {
			const s = l.ancestors[l.ancestors.length - 1];
			s && (l.place = s.position);
		}
		const u = l.place && 'start' in l.place ? l.place.start : l.place;
		(this.ancestors = l.ancestors || void 0),
			(this.cause = l.cause || void 0),
			(this.column = u ? u.column : void 0),
			(this.fatal = void 0),
			(this.file = ''),
			(this.message = i),
			(this.line = u ? u.line : void 0),
			(this.name = Qr(l.place) || '1:1'),
			(this.place = l.place || void 0),
			(this.reason = this.message),
			(this.ruleId = l.ruleId || void 0),
			(this.source = l.source || void 0),
			(this.stack =
				o && l.cause && typeof l.cause.stack === 'string'
					? l.cause.stack
					: ''),
			(this.actual = void 0),
			(this.expected = void 0),
			(this.note = void 0),
			(this.url = void 0);
	}
}
Le.prototype.file = '';
Le.prototype.name = '';
Le.prototype.reason = '';
Le.prototype.message = '';
Le.prototype.stack = '';
Le.prototype.column = void 0;
Le.prototype.line = void 0;
Le.prototype.ancestors = void 0;
Le.prototype.cause = void 0;
Le.prototype.fatal = void 0;
Le.prototype.place = void 0;
Le.prototype.ruleId = void 0;
Le.prototype.source = void 0;
const Ks = {}.hasOwnProperty;
const Ky = new Map();
const Yy = /[A-Z]/g;
const Xy = new Set(['table', 'tbody', 'thead', 'tfoot', 'tr']);
const Gy = new Set(['td', 'th']);
const jd = 'https://github.com/syntax-tree/hast-util-to-jsx-runtime';
function qy(e, n) {
	if (!n || n.Fragment === void 0) {
		throw new TypeError('Expected `Fragment` in options');
	}
	const t = n.filePath || void 0;
	let r;
	if (n.development) {
		if (typeof n.jsxDEV !== 'function') {
			throw new TypeError(
				'Expected `jsxDEV` in options when `development: true`'
			);
		}
		r = l1(t, n.jsxDEV);
	}
	else {
		if (typeof n.jsx !== 'function') {
			throw new TypeError('Expected `jsx` in production options');
		}
		if (typeof n.jsxs !== 'function') {
			throw new TypeError('Expected `jsxs` in production options');
		}
		r = i1(t, n.jsx, n.jsxs);
	}
	const i = {
		Fragment: n.Fragment,
		ancestors: [],
		components: n.components || {},
		create: r,
		elementAttributeNameCase: n.elementAttributeNameCase || 'react',
		evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
		filePath: t,
		ignoreInvalidStyle: n.ignoreInvalidStyle || !1,
		passKeys: n.passKeys !== !1,
		passNode: n.passNode || !1,
		schema: n.space === 'svg' ? Ws : gy,
		stylePropertyNameCase: n.stylePropertyNameCase || 'dom',
		tableCellAlignToStyle: n.tableCellAlignToStyle !== !1,
	};
	const l = Bd(i, e, void 0);

	return l && typeof l !== 'string'
		? l
		: i.create(e, i.Fragment, {children: l || void 0}, void 0);
}
function Bd(e, n, t) {
	if (n.type === 'element') {
		return Jy(e, n, t);
	}
	if (n.type === 'mdxFlowExpression' || n.type === 'mdxTextExpression') {
		return Zy(e, n);
	}
	if (n.type === 'mdxJsxFlowElement' || n.type === 'mdxJsxTextElement') {
		return n1(e, n, t);
	}
	if (n.type === 'mdxjsEsm') {
		return e1(e, n);
	}
	if (n.type === 'root') {
		return t1(e, n, t);
	}
	if (n.type === 'text') {
		return r1(e, n);
	}
}
function Jy(e, n, t) {
	const r = e.schema;
	let i = r;
	n.tagName.toLowerCase() === 'svg' &&
		r.space === 'html' &&
		((i = Ws), (e.schema = i)),
		e.ancestors.push(n);
	const l = Hd(e, n.tagName, !1);
	const o = o1(e, n);
	let u = Xs(e, n);

	return (
		Xy.has(n.tagName) &&
			(u = u.filter((s) => {
				return typeof s === 'string' ? !oy(s) : !0;
			})),
		Ud(e, o, l, n),
		Ys(o, u),
		e.ancestors.pop(),
		(e.schema = r),
		e.create(n, l, o, t)
	);
}
function Zy(e, n) {
	if (n.data && n.data.estree && e.evaluater) {
		const r = n.data.estree.body[0];

		return r.type, e.evaluater.evaluateExpression(r.expression);
	}
	pi(e, n.position);
}
function e1(e, n) {
	if (n.data && n.data.estree && e.evaluater) {
		return e.evaluater.evaluateProgram(n.data.estree);
	}
	pi(e, n.position);
}
function n1(e, n, t) {
	const r = e.schema;
	let i = r;
	n.name === 'svg' && r.space === 'html' && ((i = Ws), (e.schema = i)),
		e.ancestors.push(n);
	const l = n.name === null ? e.Fragment : Hd(e, n.name, !0);
	const o = u1(e, n);
	const u = Xs(e, n);

	return (
		Ud(e, o, l, n),
		Ys(o, u),
		e.ancestors.pop(),
		(e.schema = r),
		e.create(n, l, o, t)
	);
}
function t1(e, n, t) {
	const r = {};

	return Ys(r, Xs(e, n)), e.create(n, e.Fragment, r, t);
}
function r1(e, n) {
	return n.value;
}
function Ud(e, n, t, r) {
	typeof t !== 'string' && t !== e.Fragment && e.passNode && (n.node = r);
}
function Ys(e, n) {
	if (n.length) {
		const t = n.length > 1 ? n : n[0];
		t && (e.children = t);
	}
}
function i1(e, n, t) {
	return r;
	function r(i, l, o, u) {
		const a = Array.isArray(o.children) ? t : n;

		return u ? a(l, o, u) : a(l, o);
	}
}
function l1(e, n) {
	return t;
	function t(r, i, l, o) {
		const u = Array.isArray(l.children);
		const s = Qs(r);

		return n(
			i,
			l,
			o,
			u,
			{
				columnNumber: s ? s.column - 1 : void 0,
				fileName: e,
				lineNumber: s ? s.line : void 0,
			},
			void 0
		);
	}
}
function o1(e, n) {
	const t = {};
	let r;
	let i;
	for (i in n.properties) {
		if (i !== 'children' && Ks.call(n.properties, i)) {
			const l = s1(e, i, n.properties[i]);
			if (l) {
				const [o, u] = l;
				e.tableCellAlignToStyle &&
				o === 'align' &&
				typeof u === 'string' &&
				Gy.has(n.tagName)
					? (r = u)
					: (t[o] = u);
			}
		}
	}
	if (r) {
		const l = t.style || (t.style = {});
		l[e.stylePropertyNameCase === 'css' ? 'text-align' : 'textAlign'] = r;
	}

	return t;
}
function u1(e, n) {
	const t = {};
	for (const r of n.attributes) {
		if (r.type === 'mdxJsxExpressionAttribute') {
			if (r.data && r.data.estree && e.evaluater) {
				const l = r.data.estree.body[0];
				l.type;
				const o = l.expression;
				o.type;
				const u = o.properties[0];
				u.type,
					Object.assign(
						t,
						e.evaluater.evaluateExpression(u.argument)
					);
			}
			else {
				pi(e, n.position);
			}
		}
		else {
			const i = r.name;
			let l;
			if (r.value && typeof r.value === 'object') {
				if (r.value.data && r.value.data.estree && e.evaluater) {
					const u = r.value.data.estree.body[0];
					u.type, (l = e.evaluater.evaluateExpression(u.expression));
				}
				else {
					pi(e, n.position);
				}
			}
			else {
				l = r.value === null ? !0 : r.value;
			}
			t[i] = l;
		}
	}

	return t;
}
function Xs(e, n) {
	const t = [];
	let r = -1;
	const i = e.passKeys ? new Map() : Ky;
	for (; ++r < n.children.length; ) {
		const l = n.children[r];
		let o;
		if (e.passKeys) {
			const s =
				l.type === 'element'
					? l.tagName
					: l.type === 'mdxJsxFlowElement' ||
						  l.type === 'mdxJsxTextElement'
						? l.name
						: void 0;
			if (s) {
				const a = i.get(s) || 0;
				(o = s + '-' + a), i.set(s, a + 1);
			}
		}
		const u = Bd(e, l, o);
		u !== void 0 && t.push(u);
	}

	return t;
}
function s1(e, n, t) {
	const r = dy(e.schema, n);
	if (!(t == null || (typeof t === 'number' && Number.isNaN(t)))) {
		if (
			(Array.isArray(t) && (t = r.commaSeparated ? ny(t) : yy(t)),
			r.property === 'style')
		) {
			let i = typeof t === 'object' ? t : a1(e, String(t));

			return (
				e.stylePropertyNameCase === 'css' && (i = c1(i)), ['style', i]
			);
		}

		return [
			e.elementAttributeNameCase === 'react' && r.space
				? cy[r.property] || r.property
				: r.attribute,
			t,
		];
	}
}
function a1(e, n) {
	try {
		return by(n, {reactCompat: !0});
	}
	catch (t) {
		if (e.ignoreInvalidStyle) {
			return {};
		}
		const r = t;
		const i = new Le('Cannot parse `style` attribute', {
			ancestors: e.ancestors,
			cause: r,
			ruleId: 'style',
			source: 'hast-util-to-jsx-runtime',
		});
		throw (
			((i.file = e.filePath || void 0),
			(i.url = jd + '#cannot-parse-style-attribute'),
			i)
		);
	}
}
function Hd(e, n, t) {
	let r;
	if (!t) {
		r = {type: 'Literal', value: n};
	}
	else if (n.includes('.')) {
		const i = n.split('.');
		let l = -1;
		let o;
		for (; ++l < i.length; ) {
			const u = Sc(i[l])
				? {type: 'Identifier', name: i[l]}
				: {type: 'Literal', value: i[l]};
			o = o
				? {
						type: 'MemberExpression',
						object: o,
						property: u,
						computed: !!(l && u.type === 'Literal'),
						optional: !1,
					}
				: u;
		}
		r = o;
	}
	else {
		r =
			Sc(n) && !/^[a-z]/.test(n)
				? {type: 'Identifier', name: n}
				: {type: 'Literal', value: n};
	}
	if (r.type === 'Literal') {
		const i = r.value;

		return Ks.call(e.components, i) ? e.components[i] : i;
	}
	if (e.evaluater) {
		return e.evaluater.evaluateExpression(r);
	}
	pi(e);
}
function pi(e, n) {
	const t = new Le('Cannot handle MDX estrees without `createEvaluater`', {
		ancestors: e.ancestors,
		place: n,
		ruleId: 'mdx-estree',
		source: 'hast-util-to-jsx-runtime',
	});
	throw (
		((t.file = e.filePath || void 0),
		(t.url = jd + '#cannot-handle-mdx-estrees-without-createevaluater'),
		t)
	);
}
function c1(e) {
	const n = {};
	let t;
	for (t in e) {
		Ks.call(e, t) && (n[f1(t)] = e[t]);
	}

	return n;
}
function f1(e) {
	let n = e.replace(Yy, p1);

	return n.slice(0, 3) === 'ms-' && (n = '-' + n), n;
}
function p1(e) {
	return '-' + e.toLowerCase();
}
const Po = {
	action: ['form'],
	cite: ['blockquote', 'del', 'ins', 'q'],
	data: ['object'],
	formAction: ['button', 'input'],
	href: ['a', 'area', 'base', 'link'],
	icon: ['menuitem'],
	itemId: null,
	manifest: ['html'],
	ping: ['a', 'area'],
	poster: ['video'],
	src: [
		'audio',
		'embed',
		'iframe',
		'img',
		'input',
		'script',
		'source',
		'track',
		'video',
	],
};
const d1 = {};
function h1(e, n) {
	const t = d1;
	const r = typeof t.includeImageAlt === 'boolean' ? t.includeImageAlt : !0;
	const i = typeof t.includeHtml === 'boolean' ? t.includeHtml : !0;

	return Vd(e, r, i);
}
function Vd(e, n, t) {
	if (m1(e)) {
		if ('value' in e) {
			return e.type === 'html' && !t ? '' : e.value;
		}
		if (n && 'alt' in e && e.alt) {
			return e.alt;
		}
		if ('children' in e) {
			return Oc(e.children, n, t);
		}
	}

	return Array.isArray(e) ? Oc(e, n, t) : '';
}
function Oc(e, n, t) {
	const r = [];
	let i = -1;
	for (; ++i < e.length; ) {
		r[i] = Vd(e[i], n, t);
	}

	return r.join('');
}
function m1(e) {
	return !!(e && typeof e === 'object');
}
const Mc = document.createElement('i');
function Gs(e) {
	const n = '&' + e + ';';
	Mc.innerHTML = n;
	const t = Mc.textContent;

	return (t.charCodeAt(t.length - 1) === 59 && e !== 'semi') || t === n
		? !1
		: t;
}
function Pn(e, n, t, r) {
	const i = e.length;
	let l = 0;
	let o;
	if (
		(n < 0 ? (n = -n > i ? 0 : i + n) : (n = n > i ? i : n),
		(t = t > 0 ? t : 0),
		r.length < 1e4)
	) {
		(o = Array.from(r)), o.unshift(n, t), e.splice(...o);
	}
	else {
		for (t && e.splice(n, t); l < r.length; ) {
			(o = r.slice(l, l + 1e4)),
				o.unshift(n, 0),
				e.splice(...o),
				(l += 1e4),
				(n += 1e4);
		}
	}
}
function tn(e, n) {
	return e.length ? (Pn(e, e.length, 0, n), e) : n;
}
const Dc = {}.hasOwnProperty;
function g1(e) {
	const n = {};
	let t = -1;
	for (; ++t < e.length; ) {
		y1(n, e[t]);
	}

	return n;
}
function y1(e, n) {
	let t;
	for (t in n) {
		const i = (Dc.call(e, t) ? e[t] : void 0) || (e[t] = {});
		const l = n[t];
		let o;
		if (l) {
			for (o in l) {
				Dc.call(i, o) || (i[o] = []);
				const u = l[o];
				v1(i[o], Array.isArray(u) ? u : u ? [u] : []);
			}
		}
	}
}
function v1(e, n) {
	let t = -1;
	const r = [];
	for (; ++t < n.length; ) {
		(n[t].add === 'after' ? e : r).push(n[t]);
	}
	Pn(e, 0, 0, r);
}
function $d(e, n) {
	const t = Number.parseInt(e, n);

	return t < 9 ||
		t === 11 ||
		(t > 13 && t < 32) ||
		(t > 126 && t < 160) ||
		(t > 55295 && t < 57344) ||
		(t > 64975 && t < 65008) ||
		(t & 65535) === 65535 ||
		(t & 65535) === 65534 ||
		t > 1114111
		? '�'
		: String.fromCodePoint(t);
}
function rr(e) {
	return e
		.replace(/[\t\n\r ]+/g, ' ')
		.replace(/^ | $/g, '')
		.toLowerCase()
		.toUpperCase();
}
const En = at(/[A-Za-z]/);
const Xe = at(/[\dA-Za-z]/);
const k1 = at(/[#-'*+\--9=?A-Z^-~]/);
function Hu(e) {
	return e !== null && (e < 32 || e === 127);
}
const Vu = at(/\d/);
const x1 = at(/[\dA-Fa-f]/);
const w1 = at(/[!-/:-@[-`{-~]/);
function B(e) {
	return e !== null && e < -2;
}
function $e(e) {
	return e !== null && (e < 0 || e === 32);
}
function Y(e) {
	return e === -2 || e === -1 || e === 32;
}
const S1 = at(new RegExp('\\p{P}|\\p{S}', 'u'));
const E1 = at(/\s/);
function at(e) {
	return n;
	function n(t) {
		return t !== null && t > -1 && e.test(String.fromCharCode(t));
	}
}
function mr(e) {
	const n = [];
	let t = -1;
	let r = 0;
	let i = 0;
	for (; ++t < e.length; ) {
		const l = e.charCodeAt(t);
		let o = '';
		if (l === 37 && Xe(e.charCodeAt(t + 1)) && Xe(e.charCodeAt(t + 2))) {
			i = 2;
		}
		else if (l < 128) {
			/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) ||
				(o = String.fromCharCode(l));
		}
		else if (l > 55295 && l < 57344) {
			const u = e.charCodeAt(t + 1);
			l < 56320 && u > 56319 && u < 57344
				? ((o = String.fromCharCode(l, u)), (i = 1))
				: (o = '�');
		}
		else {
			o = String.fromCharCode(l);
		}
		o &&
			(n.push(e.slice(r, t), encodeURIComponent(o)),
			(r = t + i + 1),
			(o = '')),
			i && ((t += i), (i = 0));
	}

	return n.join('') + e.slice(r);
}
function ne(e, n, t, r) {
	const i = r ? r - 1 : Number.POSITIVE_INFINITY;
	let l = 0;

	return o;
	function o(s) {
		return Y(s) ? (e.enter(t), u(s)) : n(s);
	}
	function u(s) {
		return Y(s) && l++ < i ? (e.consume(s), u) : (e.exit(t), n(s));
	}
}
const C1 = {tokenize: _1};
function _1(e) {
	const n = e.attempt(this.parser.constructs.contentInitial, r, i);
	let t;

	return n;
	function r(u) {
		if (u === null) {
			e.consume(u);

			return;
		}

		return (
			e.enter('lineEnding'),
			e.consume(u),
			e.exit('lineEnding'),
			ne(e, n, 'linePrefix')
		);
	}
	function i(u) {
		return e.enter('paragraph'), l(u);
	}
	function l(u) {
		const s = e.enter('chunkText', {contentType: 'text', previous: t});

		return t && (t.next = s), (t = s), o(u);
	}
	function o(u) {
		if (u === null) {
			e.exit('chunkText'), e.exit('paragraph'), e.consume(u);

			return;
		}

		return B(u)
			? (e.consume(u), e.exit('chunkText'), l)
			: (e.consume(u), o);
	}
}
const P1 = {tokenize: T1};
const Ac = {tokenize: I1};
function T1(e) {
	const n = this;
	const t = [];
	let r = 0;
	let i;
	let l;
	let o;

	return u;
	function u(y) {
		if (r < t.length) {
			const S = t[r];

			return (
				(n.containerState = S[1]), e.attempt(S[0].continuation, s, a)(y)
			);
		}

		return a(y);
	}
	function s(y) {
		if ((r++, n.containerState._closeFlow)) {
			(n.containerState._closeFlow = void 0), i && m();
			const S = n.events.length;
			let T = S;
			let w;
			for (; T--; ) {
				if (
					n.events[T][0] === 'exit' &&
					n.events[T][1].type === 'chunkFlow'
				) {
					w = n.events[T][1].end;
					break;
				}
			}
			h(r);
			let I = S;
			for (; I < n.events.length; ) {
				(n.events[I][1].end = {...w}), I++;
			}

			return (
				Pn(n.events, T + 1, 0, n.events.slice(S)),
				(n.events.length = I),
				a(y)
			);
		}

		return u(y);
	}
	function a(y) {
		if (r === t.length) {
			if (!i) {
				return d(y);
			}
			if (i.currentConstruct && i.currentConstruct.concrete) {
				return x(y);
			}
			n.interrupt = !!(
				i.currentConstruct && !i._gfmTableDynamicInterruptHack
			);
		}

		return (n.containerState = {}), e.check(Ac, c, f)(y);
	}
	function c(y) {
		return i && m(), h(r), d(y);
	}
	function f(y) {
		return (
			(n.parser.lazy[n.now().line] = r !== t.length),
			(o = n.now().offset),
			x(y)
		);
	}
	function d(y) {
		return (n.containerState = {}), e.attempt(Ac, p, x)(y);
	}
	function p(y) {
		return r++, t.push([n.currentConstruct, n.containerState]), d(y);
	}
	function x(y) {
		if (y === null) {
			i && m(), h(0), e.consume(y);

			return;
		}

		return (
			(i = i || n.parser.flow(n.now())),
			e.enter('chunkFlow', {
				_tokenizer: i,
				contentType: 'flow',
				previous: l,
			}),
			k(y)
		);
	}
	function k(y) {
		if (y === null) {
			C(e.exit('chunkFlow'), !0), h(0), e.consume(y);

			return;
		}

		return B(y)
			? (e.consume(y),
				C(e.exit('chunkFlow')),
				(r = 0),
				(n.interrupt = void 0),
				u)
			: (e.consume(y), k);
	}
	function C(y, S) {
		const T = n.sliceStream(y);
		if (
			(S && T.push(null),
			(y.previous = l),
			l && (l.next = y),
			(l = y),
			i.defineSkip(y.start),
			i.write(T),
			n.parser.lazy[y.start.line])
		) {
			let w = i.events.length;
			for (; w--; ) {
				if (
					i.events[w][1].start.offset < o &&
					(!i.events[w][1].end || i.events[w][1].end.offset > o)
				) {
					return;
				}
			}
			const I = n.events.length;
			let L = I;
			let j;
			let M;
			for (; L--; ) {
				if (
					n.events[L][0] === 'exit' &&
					n.events[L][1].type === 'chunkFlow'
				) {
					if (j) {
						M = n.events[L][1].end;
						break;
					}
					j = !0;
				}
			}
			for (h(r), w = I; w < n.events.length; ) {
				(n.events[w][1].end = {...M}), w++;
			}
			Pn(n.events, L + 1, 0, n.events.slice(I)), (n.events.length = w);
		}
	}
	function h(y) {
		let S = t.length;
		for (; S-- > y; ) {
			const T = t[S];
			(n.containerState = T[1]), T[0].exit.call(n, e);
		}
		t.length = y;
	}
	function m() {
		i.write([null]),
			(l = void 0),
			(i = void 0),
			(n.containerState._closeFlow = void 0);
	}
}
function I1(e, n, t) {
	return ne(
		e,
		e.attempt(this.parser.constructs.document, n, t),
		'linePrefix',
		this.parser.constructs.disable.null.includes('codeIndented')
			? void 0
			: 4
	);
}
function Fc(e) {
	if (e === null || $e(e) || E1(e)) {
		return 1;
	}
	if (S1(e)) {
		return 2;
	}
}
function qs(e, n, t) {
	const r = [];
	let i = -1;
	for (; ++i < e.length; ) {
		const l = e[i].resolveAll;
		l && !r.includes(l) && ((n = l(n, t)), r.push(l));
	}

	return n;
}
const $u = {name: 'attention', resolveAll: N1, tokenize: z1};
function N1(e, n) {
	let t = -1;
	let r;
	let i;
	let l;
	let o;
	let u;
	let s;
	let a;
	let c;
	for (; ++t < e.length; ) {
		if (
			e[t][0] === 'enter' &&
			e[t][1].type === 'attentionSequence' &&
			e[t][1]._close
		) {
			for (r = t; r--; ) {
				if (
					e[r][0] === 'exit' &&
					e[r][1].type === 'attentionSequence' &&
					e[r][1]._open &&
					n.sliceSerialize(e[r][1]).charCodeAt(0) ===
						n.sliceSerialize(e[t][1]).charCodeAt(0)
				) {
					if (
						(e[r][1]._close || e[t][1]._open) &&
						(e[t][1].end.offset - e[t][1].start.offset) % 3 &&
						!(
							(e[r][1].end.offset -
								e[r][1].start.offset +
								e[t][1].end.offset -
								e[t][1].start.offset) %
							3
						)
					) {
						continue;
					}
					s =
						e[r][1].end.offset - e[r][1].start.offset > 1 &&
						e[t][1].end.offset - e[t][1].start.offset > 1
							? 2
							: 1;
					const f = {...e[r][1].end};
					const d = {...e[t][1].start};
					jc(f, -s),
						jc(d, s),
						(o = {
							type: s > 1 ? 'strongSequence' : 'emphasisSequence',
							start: f,
							end: {...e[r][1].end},
						}),
						(u = {
							type: s > 1 ? 'strongSequence' : 'emphasisSequence',
							start: {...e[t][1].start},
							end: d,
						}),
						(l = {
							type: s > 1 ? 'strongText' : 'emphasisText',
							start: {...e[r][1].end},
							end: {...e[t][1].start},
						}),
						(i = {
							type: s > 1 ? 'strong' : 'emphasis',
							start: {...o.start},
							end: {...u.end},
						}),
						(e[r][1].end = {...o.start}),
						(e[t][1].start = {...u.end}),
						(a = []),
						e[r][1].end.offset - e[r][1].start.offset &&
							(a = tn(a, [
								['enter', e[r][1], n],
								['exit', e[r][1], n],
							])),
						(a = tn(a, [
							['enter', i, n],
							['enter', o, n],
							['exit', o, n],
							['enter', l, n],
						])),
						(a = tn(
							a,
							qs(
								n.parser.constructs.insideSpan.null,
								e.slice(r + 1, t),
								n
							)
						)),
						(a = tn(a, [
							['exit', l, n],
							['enter', u, n],
							['exit', u, n],
							['exit', i, n],
						])),
						e[t][1].end.offset - e[t][1].start.offset
							? ((c = 2),
								(a = tn(a, [
									['enter', e[t][1], n],
									['exit', e[t][1], n],
								])))
							: (c = 0),
						Pn(e, r - 1, t - r + 3, a),
						(t = r + a.length - c - 2);
					break;
				}
			}
		}
	}
	for (t = -1; ++t < e.length; ) {
		e[t][1].type === 'attentionSequence' && (e[t][1].type = 'data');
	}

	return e;
}
function z1(e, n) {
	const t = this.parser.constructs.attentionMarkers.null;
	const r = this.previous;
	const i = Fc(r);
	let l;

	return o;
	function o(s) {
		return (l = s), e.enter('attentionSequence'), u(s);
	}
	function u(s) {
		if (s === l) {
			return e.consume(s), u;
		}
		const a = e.exit('attentionSequence');
		const c = Fc(s);
		const f = !c || (c === 2 && i) || t.includes(s);
		const d = !i || (i === 2 && c) || t.includes(r);

		return (
			(a._open = !!(l === 42 ? f : f && (i || !d))),
			(a._close = !!(l === 42 ? d : d && (c || !f))),
			n(s)
		);
	}
}
function jc(e, n) {
	(e.column += n), (e.offset += n), (e._bufferIndex += n);
}
const L1 = {name: 'autolink', tokenize: R1};
function R1(e, n, t) {
	let r = 0;

	return i;
	function i(p) {
		return (
			e.enter('autolink'),
			e.enter('autolinkMarker'),
			e.consume(p),
			e.exit('autolinkMarker'),
			e.enter('autolinkProtocol'),
			l
		);
	}
	function l(p) {
		return En(p) ? (e.consume(p), o) : p === 64 ? t(p) : a(p);
	}
	function o(p) {
		return p === 43 || p === 45 || p === 46 || Xe(p)
			? ((r = 1), u(p))
			: a(p);
	}
	function u(p) {
		return p === 58
			? (e.consume(p), (r = 0), s)
			: (p === 43 || p === 45 || p === 46 || Xe(p)) && r++ < 32
				? (e.consume(p), u)
				: ((r = 0), a(p));
	}
	function s(p) {
		return p === 62
			? (e.exit('autolinkProtocol'),
				e.enter('autolinkMarker'),
				e.consume(p),
				e.exit('autolinkMarker'),
				e.exit('autolink'),
				n)
			: p === null || p === 32 || p === 60 || Hu(p)
				? t(p)
				: (e.consume(p), s);
	}
	function a(p) {
		return p === 64 ? (e.consume(p), c) : k1(p) ? (e.consume(p), a) : t(p);
	}
	function c(p) {
		return Xe(p) ? f(p) : t(p);
	}
	function f(p) {
		return p === 46
			? (e.consume(p), (r = 0), c)
			: p === 62
				? ((e.exit('autolinkProtocol').type = 'autolinkEmail'),
					e.enter('autolinkMarker'),
					e.consume(p),
					e.exit('autolinkMarker'),
					e.exit('autolink'),
					n)
				: d(p);
	}
	function d(p) {
		if ((p === 45 || Xe(p)) && r++ < 63) {
			const x = p === 45 ? d : f;

			return e.consume(p), x;
		}

		return t(p);
	}
}
const Yl = {partial: !0, tokenize: O1};
function O1(e, n, t) {
	return r;
	function r(l) {
		return Y(l) ? ne(e, i, 'linePrefix')(l) : i(l);
	}
	function i(l) {
		return l === null || B(l) ? n(l) : t(l);
	}
}
const Wd = {
	continuation: {tokenize: D1},
	exit: A1,
	name: 'blockQuote',
	tokenize: M1,
};
function M1(e, n, t) {
	const r = this;

	return i;
	function i(o) {
		if (o === 62) {
			const u = r.containerState;

			return (
				u.open ||
					(e.enter('blockQuote', {_container: !0}), (u.open = !0)),
				e.enter('blockQuotePrefix'),
				e.enter('blockQuoteMarker'),
				e.consume(o),
				e.exit('blockQuoteMarker'),
				l
			);
		}

		return t(o);
	}
	function l(o) {
		return Y(o)
			? (e.enter('blockQuotePrefixWhitespace'),
				e.consume(o),
				e.exit('blockQuotePrefixWhitespace'),
				e.exit('blockQuotePrefix'),
				n)
			: (e.exit('blockQuotePrefix'), n(o));
	}
}
function D1(e, n, t) {
	const r = this;

	return i;
	function i(o) {
		return Y(o)
			? ne(
					e,
					l,
					'linePrefix',
					r.parser.constructs.disable.null.includes('codeIndented')
						? void 0
						: 4
				)(o)
			: l(o);
	}
	function l(o) {
		return e.attempt(Wd, n, t)(o);
	}
}
function A1(e) {
	e.exit('blockQuote');
}
const bd = {name: 'characterEscape', tokenize: F1};
function F1(e, n, t) {
	return r;
	function r(l) {
		return (
			e.enter('characterEscape'),
			e.enter('escapeMarker'),
			e.consume(l),
			e.exit('escapeMarker'),
			i
		);
	}
	function i(l) {
		return w1(l)
			? (e.enter('characterEscapeValue'),
				e.consume(l),
				e.exit('characterEscapeValue'),
				e.exit('characterEscape'),
				n)
			: t(l);
	}
}
const Qd = {name: 'characterReference', tokenize: j1};
function j1(e, n, t) {
	const r = this;
	let i = 0;
	let l;
	let o;

	return u;
	function u(f) {
		return (
			e.enter('characterReference'),
			e.enter('characterReferenceMarker'),
			e.consume(f),
			e.exit('characterReferenceMarker'),
			s
		);
	}
	function s(f) {
		return f === 35
			? (e.enter('characterReferenceMarkerNumeric'),
				e.consume(f),
				e.exit('characterReferenceMarkerNumeric'),
				a)
			: (e.enter('characterReferenceValue'), (l = 31), (o = Xe), c(f));
	}
	function a(f) {
		return f === 88 || f === 120
			? (e.enter('characterReferenceMarkerHexadecimal'),
				e.consume(f),
				e.exit('characterReferenceMarkerHexadecimal'),
				e.enter('characterReferenceValue'),
				(l = 6),
				(o = x1),
				c)
			: (e.enter('characterReferenceValue'), (l = 7), (o = Vu), c(f));
	}
	function c(f) {
		if (f === 59 && i) {
			const d = e.exit('characterReferenceValue');

			return o === Xe && !Gs(r.sliceSerialize(d))
				? t(f)
				: (e.enter('characterReferenceMarker'),
					e.consume(f),
					e.exit('characterReferenceMarker'),
					e.exit('characterReference'),
					n);
		}

		return o(f) && i++ < l ? (e.consume(f), c) : t(f);
	}
}
const Bc = {partial: !0, tokenize: U1};
const Uc = {concrete: !0, name: 'codeFenced', tokenize: B1};
function B1(e, n, t) {
	const r = this;
	const i = {partial: !0, tokenize: T};
	let l = 0;
	let o = 0;
	let u;

	return s;
	function s(w) {
		return a(w);
	}
	function a(w) {
		const I = r.events[r.events.length - 1];

		return (
			(l =
				I && I[1].type === 'linePrefix'
					? I[2].sliceSerialize(I[1], !0).length
					: 0),
			(u = w),
			e.enter('codeFenced'),
			e.enter('codeFencedFence'),
			e.enter('codeFencedFenceSequence'),
			c(w)
		);
	}
	function c(w) {
		return w === u
			? (o++, e.consume(w), c)
			: o < 3
				? t(w)
				: (e.exit('codeFencedFenceSequence'),
					Y(w) ? ne(e, f, 'whitespace')(w) : f(w));
	}
	function f(w) {
		return w === null || B(w)
			? (e.exit('codeFencedFence'),
				r.interrupt ? n(w) : e.check(Bc, k, S)(w))
			: (e.enter('codeFencedFenceInfo'),
				e.enter('chunkString', {contentType: 'string'}),
				d(w));
	}
	function d(w) {
		return w === null || B(w)
			? (e.exit('chunkString'), e.exit('codeFencedFenceInfo'), f(w))
			: Y(w)
				? (e.exit('chunkString'),
					e.exit('codeFencedFenceInfo'),
					ne(e, p, 'whitespace')(w))
				: w === 96 && w === u
					? t(w)
					: (e.consume(w), d);
	}
	function p(w) {
		return w === null || B(w)
			? f(w)
			: (e.enter('codeFencedFenceMeta'),
				e.enter('chunkString', {contentType: 'string'}),
				x(w));
	}
	function x(w) {
		return w === null || B(w)
			? (e.exit('chunkString'), e.exit('codeFencedFenceMeta'), f(w))
			: w === 96 && w === u
				? t(w)
				: (e.consume(w), x);
	}
	function k(w) {
		return e.attempt(i, S, C)(w);
	}
	function C(w) {
		return e.enter('lineEnding'), e.consume(w), e.exit('lineEnding'), h;
	}
	function h(w) {
		return l > 0 && Y(w) ? ne(e, m, 'linePrefix', l + 1)(w) : m(w);
	}
	function m(w) {
		return w === null || B(w)
			? e.check(Bc, k, S)(w)
			: (e.enter('codeFlowValue'), y(w));
	}
	function y(w) {
		return w === null || B(w)
			? (e.exit('codeFlowValue'), m(w))
			: (e.consume(w), y);
	}
	function S(w) {
		return e.exit('codeFenced'), n(w);
	}
	function T(w, I, L) {
		let j = 0;

		return M;
		function M(W) {
			return w.enter('lineEnding'), w.consume(W), w.exit('lineEnding'), D;
		}
		function D(W) {
			return (
				w.enter('codeFencedFence'),
				Y(W)
					? ne(
							w,
							A,
							'linePrefix',
							r.parser.constructs.disable.null.includes(
								'codeIndented'
							)
								? void 0
								: 4
						)(W)
					: A(W)
			);
		}
		function A(W) {
			return W === u ? (w.enter('codeFencedFenceSequence'), X(W)) : L(W);
		}
		function X(W) {
			return W === u
				? (j++, w.consume(W), X)
				: j >= o
					? (w.exit('codeFencedFenceSequence'),
						Y(W) ? ne(w, ue, 'whitespace')(W) : ue(W))
					: L(W);
		}
		function ue(W) {
			return W === null || B(W)
				? (w.exit('codeFencedFence'), I(W))
				: L(W);
		}
	}
}
function U1(e, n, t) {
	const r = this;

	return i;
	function i(o) {
		return o === null
			? t(o)
			: (e.enter('lineEnding'), e.consume(o), e.exit('lineEnding'), l);
	}
	function l(o) {
		return r.parser.lazy[r.now().line] ? t(o) : n(o);
	}
}
const To = {name: 'codeIndented', tokenize: V1};
const H1 = {partial: !0, tokenize: $1};
function V1(e, n, t) {
	const r = this;

	return i;
	function i(a) {
		return e.enter('codeIndented'), ne(e, l, 'linePrefix', 5)(a);
	}
	function l(a) {
		const c = r.events[r.events.length - 1];

		return c &&
			c[1].type === 'linePrefix' &&
			c[2].sliceSerialize(c[1], !0).length >= 4
			? o(a)
			: t(a);
	}
	function o(a) {
		return a === null
			? s(a)
			: B(a)
				? e.attempt(H1, o, s)(a)
				: (e.enter('codeFlowValue'), u(a));
	}
	function u(a) {
		return a === null || B(a)
			? (e.exit('codeFlowValue'), o(a))
			: (e.consume(a), u);
	}
	function s(a) {
		return e.exit('codeIndented'), n(a);
	}
}
function $1(e, n, t) {
	const r = this;

	return i;
	function i(o) {
		return r.parser.lazy[r.now().line]
			? t(o)
			: B(o)
				? (e.enter('lineEnding'), e.consume(o), e.exit('lineEnding'), i)
				: ne(e, l, 'linePrefix', 5)(o);
	}
	function l(o) {
		const u = r.events[r.events.length - 1];

		return u &&
			u[1].type === 'linePrefix' &&
			u[2].sliceSerialize(u[1], !0).length >= 4
			? n(o)
			: B(o)
				? i(o)
				: t(o);
	}
}
const W1 = {name: 'codeText', previous: Q1, resolve: b1, tokenize: K1};
function b1(e) {
	let n = e.length - 4;
	let t = 3;
	let r;
	let i;
	if (
		(e[t][1].type === 'lineEnding' || e[t][1].type === 'space') &&
		(e[n][1].type === 'lineEnding' || e[n][1].type === 'space')
	) {
		for (r = t; ++r < n; ) {
			if (e[r][1].type === 'codeTextData') {
				(e[t][1].type = 'codeTextPadding'),
					(e[n][1].type = 'codeTextPadding'),
					(t += 2),
					(n -= 2);
				break;
			}
		}
	}
	for (r = t - 1, n++; ++r <= n; ) {
		i === void 0
			? r !== n && e[r][1].type !== 'lineEnding' && (i = r)
			: (r === n || e[r][1].type === 'lineEnding') &&
				((e[i][1].type = 'codeTextData'),
				r !== i + 2 &&
					((e[i][1].end = e[r - 1][1].end),
					e.splice(i + 2, r - i - 2),
					(n -= r - i - 2),
					(r = i + 2)),
				(i = void 0));
	}

	return e;
}
function Q1(e) {
	return (
		e !== 96 ||
		this.events[this.events.length - 1][1].type === 'characterEscape'
	);
}
function K1(e, n, t) {
	let r = 0;
	let i;
	let l;

	return o;
	function o(f) {
		return e.enter('codeText'), e.enter('codeTextSequence'), u(f);
	}
	function u(f) {
		return f === 96
			? (e.consume(f), r++, u)
			: (e.exit('codeTextSequence'), s(f));
	}
	function s(f) {
		return f === null
			? t(f)
			: f === 32
				? (e.enter('space'), e.consume(f), e.exit('space'), s)
				: f === 96
					? ((l = e.enter('codeTextSequence')), (i = 0), c(f))
					: B(f)
						? (e.enter('lineEnding'),
							e.consume(f),
							e.exit('lineEnding'),
							s)
						: (e.enter('codeTextData'), a(f));
	}
	function a(f) {
		return f === null || f === 32 || f === 96 || B(f)
			? (e.exit('codeTextData'), s(f))
			: (e.consume(f), a);
	}
	function c(f) {
		return f === 96
			? (e.consume(f), i++, c)
			: i === r
				? (e.exit('codeTextSequence'), e.exit('codeText'), n(f))
				: ((l.type = 'codeTextData'), a(f));
	}
}
class Y1 {
	constructor(n) {
		(this.left = n ? [...n] : []), (this.right = []);
	}
	get(n) {
		if (n < 0 || n >= this.left.length + this.right.length) {
			throw new RangeError(
				'Cannot access index `' +
					n +
					'` in a splice buffer of size `' +
					(this.left.length + this.right.length) +
					'`'
			);
		}

		return n < this.left.length
			? this.left[n]
			: this.right[this.right.length - n + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		return this.setCursor(0), this.right.pop();
	}
	slice(n, t) {
		const r = t ?? Number.POSITIVE_INFINITY;

		return r < this.left.length
			? this.left.slice(n, r)
			: n > this.left.length
				? this.right
						.slice(
							this.right.length - r + this.left.length,
							this.right.length - n + this.left.length
						)
						.reverse()
				: this.left
						.slice(n)
						.concat(
							this.right
								.slice(this.right.length - r + this.left.length)
								.reverse()
						);
	}
	splice(n, t, r) {
		const i = t || 0;
		this.setCursor(Math.trunc(n));
		const l = this.right.splice(
			this.right.length - i,
			Number.POSITIVE_INFINITY
		);

		return r && Pr(this.left, r), l.reverse();
	}
	pop() {
		return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
	}
	push(n) {
		this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
	}
	pushMany(n) {
		this.setCursor(Number.POSITIVE_INFINITY), Pr(this.left, n);
	}
	unshift(n) {
		this.setCursor(0), this.right.push(n);
	}
	unshiftMany(n) {
		this.setCursor(0), Pr(this.right, n.reverse());
	}
	setCursor(n) {
		if (
			!(
				n === this.left.length ||
				(n > this.left.length && !this.right.length) ||
				(n < 0 && !this.left.length)
			)
		) {
			if (n < this.left.length) {
				const t = this.left.splice(n, Number.POSITIVE_INFINITY);
				Pr(this.right, t.reverse());
			}
			else {
				const t = this.right.splice(
					this.left.length + this.right.length - n,
					Number.POSITIVE_INFINITY
				);
				Pr(this.left, t.reverse());
			}
		}
	}
}
function Pr(e, n) {
	let t = 0;
	if (n.length < 1e4) {
		e.push(...n);
	}
	else {
		for (; t < n.length; ) {
			e.push(...n.slice(t, t + 1e4)), (t += 1e4);
		}
	}
}
function Kd(e) {
	const n = {};
	let t = -1;
	let r;
	let i;
	let l;
	let o;
	let u;
	let s;
	let a;
	const c = new Y1(e);
	for (; ++t < c.length; ) {
		for (; t in n; ) {
			t = n[t];
		}
		if (
			((r = c.get(t)),
			t &&
				r[1].type === 'chunkFlow' &&
				c.get(t - 1)[1].type === 'listItemPrefix' &&
				((s = r[1]._tokenizer.events),
				(l = 0),
				l < s.length && s[l][1].type === 'lineEndingBlank' && (l += 2),
				l < s.length && s[l][1].type === 'content'))
		) {
			for (; ++l < s.length && s[l][1].type !== 'content'; ) {
				s[l][1].type === 'chunkText' &&
					((s[l][1]._isInFirstContentOfListItem = !0), l++);
			}
		}
		if (r[0] === 'enter') {
			r[1].contentType &&
				(Object.assign(n, X1(c, t)), (t = n[t]), (a = !0));
		}
		else if (r[1]._container) {
			for (l = t, i = void 0; l--; ) {
				if (
					((o = c.get(l)),
					o[1].type === 'lineEnding' ||
						o[1].type === 'lineEndingBlank')
				) {
					o[0] === 'enter' &&
						(i && (c.get(i)[1].type = 'lineEndingBlank'),
						(o[1].type = 'lineEnding'),
						(i = l));
				}
				else if (
					!(
						o[1].type === 'linePrefix' ||
						o[1].type === 'listItemIndent'
					)
				) {
					break;
				}
			}
			i &&
				((r[1].end = {...c.get(i)[1].start}),
				(u = c.slice(i, t)),
				u.unshift(r),
				c.splice(i, t - i + 1, u));
		}
	}

	return Pn(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !a;
}
function X1(e, n) {
	const t = e.get(n)[1];
	const r = e.get(n)[2];
	let i = n - 1;
	const l = [];
	let o = t._tokenizer;
	o ||
		((o = r.parser[t.contentType](t.start)),
		t._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
	const u = o.events;
	const s = [];
	const a = {};
	let c;
	let f;
	let d = -1;
	let p = t;
	let x = 0;
	let k = 0;
	const C = [k];
	for (; p; ) {
		for (; e.get(++i)[1] !== p; ) {}
		l.push(i),
			p._tokenizer ||
				((c = r.sliceStream(p)),
				p.next || c.push(null),
				f && o.defineSkip(p.start),
				p._isInFirstContentOfListItem &&
					(o._gfmTasklistFirstContentOfListItem = !0),
				o.write(c),
				p._isInFirstContentOfListItem &&
					(o._gfmTasklistFirstContentOfListItem = void 0)),
			(f = p),
			(p = p.next);
	}
	for (p = t; ++d < u.length; ) {
		u[d][0] === 'exit' &&
			u[d - 1][0] === 'enter' &&
			u[d][1].type === u[d - 1][1].type &&
			u[d][1].start.line !== u[d][1].end.line &&
			((k = d + 1),
			C.push(k),
			(p._tokenizer = void 0),
			(p.previous = void 0),
			(p = p.next));
	}
	for (
		o.events = [],
			p ? ((p._tokenizer = void 0), (p.previous = void 0)) : C.pop(),
			d = C.length;
		d--;

	) {
		const h = u.slice(C[d], C[d + 1]);
		const m = l.pop();
		s.push([m, m + h.length - 1]), e.splice(m, 2, h);
	}
	for (s.reverse(), d = -1; ++d < s.length; ) {
		(a[x + s[d][0]] = x + s[d][1]), (x += s[d][1] - s[d][0] - 1);
	}

	return a;
}
const G1 = {resolve: J1, tokenize: Z1};
const q1 = {partial: !0, tokenize: ev};
function J1(e) {
	return Kd(e), e;
}
function Z1(e, n) {
	let t;

	return r;
	function r(u) {
		return (
			e.enter('content'),
			(t = e.enter('chunkContent', {contentType: 'content'})),
			i(u)
		);
	}
	function i(u) {
		return u === null
			? l(u)
			: B(u)
				? e.check(q1, o, l)(u)
				: (e.consume(u), i);
	}
	function l(u) {
		return e.exit('chunkContent'), e.exit('content'), n(u);
	}
	function o(u) {
		return (
			e.consume(u),
			e.exit('chunkContent'),
			(t.next = e.enter('chunkContent', {
				contentType: 'content',
				previous: t,
			})),
			(t = t.next),
			i
		);
	}
}
function ev(e, n, t) {
	const r = this;

	return i;
	function i(o) {
		return (
			e.exit('chunkContent'),
			e.enter('lineEnding'),
			e.consume(o),
			e.exit('lineEnding'),
			ne(e, l, 'linePrefix')
		);
	}
	function l(o) {
		if (o === null || B(o)) {
			return t(o);
		}
		const u = r.events[r.events.length - 1];

		return !r.parser.constructs.disable.null.includes('codeIndented') &&
			u &&
			u[1].type === 'linePrefix' &&
			u[2].sliceSerialize(u[1], !0).length >= 4
			? n(o)
			: e.interrupt(r.parser.constructs.flow, t, n)(o);
	}
}
function Yd(e, n, t, r, i, l, o, u, s) {
	const a = s || Number.POSITIVE_INFINITY;
	let c = 0;

	return f;
	function f(h) {
		return h === 60
			? (e.enter(r), e.enter(i), e.enter(l), e.consume(h), e.exit(l), d)
			: h === null || h === 32 || h === 41 || Hu(h)
				? t(h)
				: (e.enter(r),
					e.enter(o),
					e.enter(u),
					e.enter('chunkString', {contentType: 'string'}),
					k(h));
	}
	function d(h) {
		return h === 62
			? (e.enter(l), e.consume(h), e.exit(l), e.exit(i), e.exit(r), n)
			: (e.enter(u),
				e.enter('chunkString', {contentType: 'string'}),
				p(h));
	}
	function p(h) {
		return h === 62
			? (e.exit('chunkString'), e.exit(u), d(h))
			: h === null || h === 60 || B(h)
				? t(h)
				: (e.consume(h), h === 92 ? x : p);
	}
	function x(h) {
		return h === 60 || h === 62 || h === 92 ? (e.consume(h), p) : p(h);
	}
	function k(h) {
		return !c && (h === null || h === 41 || $e(h))
			? (e.exit('chunkString'), e.exit(u), e.exit(o), e.exit(r), n(h))
			: c < a && h === 40
				? (e.consume(h), c++, k)
				: h === 41
					? (e.consume(h), c--, k)
					: h === null || h === 32 || h === 40 || Hu(h)
						? t(h)
						: (e.consume(h), h === 92 ? C : k);
	}
	function C(h) {
		return h === 40 || h === 41 || h === 92 ? (e.consume(h), k) : k(h);
	}
}
function Xd(e, n, t, r, i, l) {
	const o = this;
	let u = 0;
	let s;

	return a;
	function a(p) {
		return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(l), c;
	}
	function c(p) {
		return u > 999 ||
			p === null ||
			p === 91 ||
			(p === 93 && !s) ||
			(p === 94 && !u && '_hiddenFootnoteSupport' in o.parser.constructs)
			? t(p)
			: p === 93
				? (e.exit(l), e.enter(i), e.consume(p), e.exit(i), e.exit(r), n)
				: B(p)
					? (e.enter('lineEnding'),
						e.consume(p),
						e.exit('lineEnding'),
						c)
					: (e.enter('chunkString', {contentType: 'string'}), f(p));
	}
	function f(p) {
		return p === null || p === 91 || p === 93 || B(p) || u++ > 999
			? (e.exit('chunkString'), c(p))
			: (e.consume(p), s || (s = !Y(p)), p === 92 ? d : f);
	}
	function d(p) {
		return p === 91 || p === 92 || p === 93 ? (e.consume(p), u++, f) : f(p);
	}
}
function Gd(e, n, t, r, i, l) {
	let o;

	return u;
	function u(d) {
		return d === 34 || d === 39 || d === 40
			? (e.enter(r),
				e.enter(i),
				e.consume(d),
				e.exit(i),
				(o = d === 40 ? 41 : d),
				s)
			: t(d);
	}
	function s(d) {
		return d === o
			? (e.enter(i), e.consume(d), e.exit(i), e.exit(r), n)
			: (e.enter(l), a(d));
	}
	function a(d) {
		return d === o
			? (e.exit(l), s(o))
			: d === null
				? t(d)
				: B(d)
					? (e.enter('lineEnding'),
						e.consume(d),
						e.exit('lineEnding'),
						ne(e, a, 'linePrefix'))
					: (e.enter('chunkString', {contentType: 'string'}), c(d));
	}
	function c(d) {
		return d === o || d === null || B(d)
			? (e.exit('chunkString'), a(d))
			: (e.consume(d), d === 92 ? f : c);
	}
	function f(d) {
		return d === o || d === 92 ? (e.consume(d), c) : c(d);
	}
}
function Kr(e, n) {
	let t;

	return r;
	function r(i) {
		return B(i)
			? (e.enter('lineEnding'),
				e.consume(i),
				e.exit('lineEnding'),
				(t = !0),
				r)
			: Y(i)
				? ne(e, r, t ? 'linePrefix' : 'lineSuffix')(i)
				: n(i);
	}
}
const nv = {name: 'definition', tokenize: rv};
const tv = {partial: !0, tokenize: iv};
function rv(e, n, t) {
	const r = this;
	let i;

	return l;
	function l(p) {
		return e.enter('definition'), o(p);
	}
	function o(p) {
		return Xd.call(
			r,
			e,
			u,
			t,
			'definitionLabel',
			'definitionLabelMarker',
			'definitionLabelString'
		)(p);
	}
	function u(p) {
		return (
			(i = rr(
				r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
			)),
			p === 58
				? (e.enter('definitionMarker'),
					e.consume(p),
					e.exit('definitionMarker'),
					s)
				: t(p)
		);
	}
	function s(p) {
		return $e(p) ? Kr(e, a)(p) : a(p);
	}
	function a(p) {
		return Yd(
			e,
			c,
			t,
			'definitionDestination',
			'definitionDestinationLiteral',
			'definitionDestinationLiteralMarker',
			'definitionDestinationRaw',
			'definitionDestinationString'
		)(p);
	}
	function c(p) {
		return e.attempt(tv, f, f)(p);
	}
	function f(p) {
		return Y(p) ? ne(e, d, 'whitespace')(p) : d(p);
	}
	function d(p) {
		return p === null || B(p)
			? (e.exit('definition'), r.parser.defined.push(i), n(p))
			: t(p);
	}
}
function iv(e, n, t) {
	return r;
	function r(u) {
		return $e(u) ? Kr(e, i)(u) : t(u);
	}
	function i(u) {
		return Gd(
			e,
			l,
			t,
			'definitionTitle',
			'definitionTitleMarker',
			'definitionTitleString'
		)(u);
	}
	function l(u) {
		return Y(u) ? ne(e, o, 'whitespace')(u) : o(u);
	}
	function o(u) {
		return u === null || B(u) ? n(u) : t(u);
	}
}
const lv = {name: 'hardBreakEscape', tokenize: ov};
function ov(e, n, t) {
	return r;
	function r(l) {
		return e.enter('hardBreakEscape'), e.consume(l), i;
	}
	function i(l) {
		return B(l) ? (e.exit('hardBreakEscape'), n(l)) : t(l);
	}
}
const uv = {name: 'headingAtx', resolve: sv, tokenize: av};
function sv(e, n) {
	let t = e.length - 2;
	let r = 3;
	let i;
	let l;

	return (
		e[r][1].type === 'whitespace' && (r += 2),
		t - 2 > r && e[t][1].type === 'whitespace' && (t -= 2),
		e[t][1].type === 'atxHeadingSequence' &&
			(r === t - 1 || (t - 4 > r && e[t - 2][1].type === 'whitespace')) &&
			(t -= r + 1 === t ? 2 : 4),
		t > r &&
			((i = {
				type: 'atxHeadingText',
				start: e[r][1].start,
				end: e[t][1].end,
			}),
			(l = {
				type: 'chunkText',
				start: e[r][1].start,
				end: e[t][1].end,
				contentType: 'text',
			}),
			Pn(e, r, t - r + 1, [
				['enter', i, n],
				['enter', l, n],
				['exit', l, n],
				['exit', i, n],
			])),
		e
	);
}
function av(e, n, t) {
	let r = 0;

	return i;
	function i(c) {
		return e.enter('atxHeading'), l(c);
	}
	function l(c) {
		return e.enter('atxHeadingSequence'), o(c);
	}
	function o(c) {
		return c === 35 && r++ < 6
			? (e.consume(c), o)
			: c === null || $e(c)
				? (e.exit('atxHeadingSequence'), u(c))
				: t(c);
	}
	function u(c) {
		return c === 35
			? (e.enter('atxHeadingSequence'), s(c))
			: c === null || B(c)
				? (e.exit('atxHeading'), n(c))
				: Y(c)
					? ne(e, u, 'whitespace')(c)
					: (e.enter('atxHeadingText'), a(c));
	}
	function s(c) {
		return c === 35
			? (e.consume(c), s)
			: (e.exit('atxHeadingSequence'), u(c));
	}
	function a(c) {
		return c === null || c === 35 || $e(c)
			? (e.exit('atxHeadingText'), u(c))
			: (e.consume(c), a);
	}
}
const cv = [
	'address',
	'article',
	'aside',
	'base',
	'basefont',
	'blockquote',
	'body',
	'caption',
	'center',
	'col',
	'colgroup',
	'dd',
	'details',
	'dialog',
	'dir',
	'div',
	'dl',
	'dt',
	'fieldset',
	'figcaption',
	'figure',
	'footer',
	'form',
	'frame',
	'frameset',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'head',
	'header',
	'hr',
	'html',
	'iframe',
	'legend',
	'li',
	'link',
	'main',
	'menu',
	'menuitem',
	'nav',
	'noframes',
	'ol',
	'optgroup',
	'option',
	'p',
	'param',
	'search',
	'section',
	'summary',
	'table',
	'tbody',
	'td',
	'tfoot',
	'th',
	'thead',
	'title',
	'tr',
	'track',
	'ul',
];
const Hc = ['pre', 'script', 'style', 'textarea'];
const fv = {concrete: !0, name: 'htmlFlow', resolveTo: hv, tokenize: mv};
const pv = {partial: !0, tokenize: yv};
const dv = {partial: !0, tokenize: gv};
function hv(e) {
	let n = e.length;
	for (; n-- && !(e[n][0] === 'enter' && e[n][1].type === 'htmlFlow'); ) {}

	return (
		n > 1 &&
			e[n - 2][1].type === 'linePrefix' &&
			((e[n][1].start = e[n - 2][1].start),
			(e[n + 1][1].start = e[n - 2][1].start),
			e.splice(n - 2, 2)),
		e
	);
}
function mv(e, n, t) {
	const r = this;
	let i;
	let l;
	let o;
	let u;
	let s;

	return a;
	function a(v) {
		return c(v);
	}
	function c(v) {
		return e.enter('htmlFlow'), e.enter('htmlFlowData'), e.consume(v), f;
	}
	function f(v) {
		return v === 33
			? (e.consume(v), d)
			: v === 47
				? (e.consume(v), (l = !0), k)
				: v === 63
					? (e.consume(v), (i = 3), r.interrupt ? n : g)
					: En(v)
						? (e.consume(v), (o = String.fromCharCode(v)), C)
						: t(v);
	}
	function d(v) {
		return v === 45
			? (e.consume(v), (i = 2), p)
			: v === 91
				? (e.consume(v), (i = 5), (u = 0), x)
				: En(v)
					? (e.consume(v), (i = 4), r.interrupt ? n : g)
					: t(v);
	}
	function p(v) {
		return v === 45 ? (e.consume(v), r.interrupt ? n : g) : t(v);
	}
	function x(v) {
		const ve = 'CDATA[';

		return v === ve.charCodeAt(u++)
			? (e.consume(v), u === ve.length ? (r.interrupt ? n : A) : x)
			: t(v);
	}
	function k(v) {
		return En(v) ? (e.consume(v), (o = String.fromCharCode(v)), C) : t(v);
	}
	function C(v) {
		if (v === null || v === 47 || v === 62 || $e(v)) {
			const ve = v === 47;
			const sn = o.toLowerCase();

			return !ve && !l && Hc.includes(sn)
				? ((i = 1), r.interrupt ? n(v) : A(v))
				: cv.includes(o.toLowerCase())
					? ((i = 6),
						ve ? (e.consume(v), h) : r.interrupt ? n(v) : A(v))
					: ((i = 7),
						r.interrupt && !r.parser.lazy[r.now().line]
							? t(v)
							: l
								? m(v)
								: y(v));
		}

		return v === 45 || Xe(v)
			? (e.consume(v), (o += String.fromCharCode(v)), C)
			: t(v);
	}
	function h(v) {
		return v === 62 ? (e.consume(v), r.interrupt ? n : A) : t(v);
	}
	function m(v) {
		return Y(v) ? (e.consume(v), m) : M(v);
	}
	function y(v) {
		return v === 47
			? (e.consume(v), M)
			: v === 58 || v === 95 || En(v)
				? (e.consume(v), S)
				: Y(v)
					? (e.consume(v), y)
					: M(v);
	}
	function S(v) {
		return v === 45 || v === 46 || v === 58 || v === 95 || Xe(v)
			? (e.consume(v), S)
			: T(v);
	}
	function T(v) {
		return v === 61 ? (e.consume(v), w) : Y(v) ? (e.consume(v), T) : y(v);
	}
	function w(v) {
		return v === null || v === 60 || v === 61 || v === 62 || v === 96
			? t(v)
			: v === 34 || v === 39
				? (e.consume(v), (s = v), I)
				: Y(v)
					? (e.consume(v), w)
					: L(v);
	}
	function I(v) {
		return v === s
			? (e.consume(v), (s = null), j)
			: v === null || B(v)
				? t(v)
				: (e.consume(v), I);
	}
	function L(v) {
		return v === null ||
			v === 34 ||
			v === 39 ||
			v === 47 ||
			v === 60 ||
			v === 61 ||
			v === 62 ||
			v === 96 ||
			$e(v)
			? T(v)
			: (e.consume(v), L);
	}
	function j(v) {
		return v === 47 || v === 62 || Y(v) ? y(v) : t(v);
	}
	function M(v) {
		return v === 62 ? (e.consume(v), D) : t(v);
	}
	function D(v) {
		return v === null || B(v) ? A(v) : Y(v) ? (e.consume(v), D) : t(v);
	}
	function A(v) {
		return v === 45 && i === 2
			? (e.consume(v), me)
			: v === 60 && i === 1
				? (e.consume(v), de)
				: v === 62 && i === 4
					? (e.consume(v), Q)
					: v === 63 && i === 3
						? (e.consume(v), g)
						: v === 93 && i === 5
							? (e.consume(v), F)
							: B(v) && (i === 6 || i === 7)
								? (e.exit('htmlFlowData'), e.check(pv, q, X)(v))
								: v === null || B(v)
									? (e.exit('htmlFlowData'), X(v))
									: (e.consume(v), A);
	}
	function X(v) {
		return e.check(dv, ue, q)(v);
	}
	function ue(v) {
		return e.enter('lineEnding'), e.consume(v), e.exit('lineEnding'), W;
	}
	function W(v) {
		return v === null || B(v) ? X(v) : (e.enter('htmlFlowData'), A(v));
	}
	function me(v) {
		return v === 45 ? (e.consume(v), g) : A(v);
	}
	function de(v) {
		return v === 47 ? (e.consume(v), (o = ''), z) : A(v);
	}
	function z(v) {
		if (v === 62) {
			const ve = o.toLowerCase();

			return Hc.includes(ve) ? (e.consume(v), Q) : A(v);
		}

		return En(v) && o.length < 8
			? (e.consume(v), (o += String.fromCharCode(v)), z)
			: A(v);
	}
	function F(v) {
		return v === 93 ? (e.consume(v), g) : A(v);
	}
	function g(v) {
		return v === 62
			? (e.consume(v), Q)
			: v === 45 && i === 2
				? (e.consume(v), g)
				: A(v);
	}
	function Q(v) {
		return v === null || B(v)
			? (e.exit('htmlFlowData'), q(v))
			: (e.consume(v), Q);
	}
	function q(v) {
		return e.exit('htmlFlow'), n(v);
	}
}
function gv(e, n, t) {
	const r = this;

	return i;
	function i(o) {
		return B(o)
			? (e.enter('lineEnding'), e.consume(o), e.exit('lineEnding'), l)
			: t(o);
	}
	function l(o) {
		return r.parser.lazy[r.now().line] ? t(o) : n(o);
	}
}
function yv(e, n, t) {
	return r;
	function r(i) {
		return (
			e.enter('lineEnding'),
			e.consume(i),
			e.exit('lineEnding'),
			e.attempt(Yl, n, t)
		);
	}
}
const vv = {name: 'htmlText', tokenize: kv};
function kv(e, n, t) {
	const r = this;
	let i;
	let l;
	let o;

	return u;
	function u(g) {
		return e.enter('htmlText'), e.enter('htmlTextData'), e.consume(g), s;
	}
	function s(g) {
		return g === 33
			? (e.consume(g), a)
			: g === 47
				? (e.consume(g), T)
				: g === 63
					? (e.consume(g), y)
					: En(g)
						? (e.consume(g), L)
						: t(g);
	}
	function a(g) {
		return g === 45
			? (e.consume(g), c)
			: g === 91
				? (e.consume(g), (l = 0), x)
				: En(g)
					? (e.consume(g), m)
					: t(g);
	}
	function c(g) {
		return g === 45 ? (e.consume(g), p) : t(g);
	}
	function f(g) {
		return g === null
			? t(g)
			: g === 45
				? (e.consume(g), d)
				: B(g)
					? ((o = f), de(g))
					: (e.consume(g), f);
	}
	function d(g) {
		return g === 45 ? (e.consume(g), p) : f(g);
	}
	function p(g) {
		return g === 62 ? me(g) : g === 45 ? d(g) : f(g);
	}
	function x(g) {
		const Q = 'CDATA[';

		return g === Q.charCodeAt(l++)
			? (e.consume(g), l === Q.length ? k : x)
			: t(g);
	}
	function k(g) {
		return g === null
			? t(g)
			: g === 93
				? (e.consume(g), C)
				: B(g)
					? ((o = k), de(g))
					: (e.consume(g), k);
	}
	function C(g) {
		return g === 93 ? (e.consume(g), h) : k(g);
	}
	function h(g) {
		return g === 62 ? me(g) : g === 93 ? (e.consume(g), h) : k(g);
	}
	function m(g) {
		return g === null || g === 62
			? me(g)
			: B(g)
				? ((o = m), de(g))
				: (e.consume(g), m);
	}
	function y(g) {
		return g === null
			? t(g)
			: g === 63
				? (e.consume(g), S)
				: B(g)
					? ((o = y), de(g))
					: (e.consume(g), y);
	}
	function S(g) {
		return g === 62 ? me(g) : y(g);
	}
	function T(g) {
		return En(g) ? (e.consume(g), w) : t(g);
	}
	function w(g) {
		return g === 45 || Xe(g) ? (e.consume(g), w) : I(g);
	}
	function I(g) {
		return B(g) ? ((o = I), de(g)) : Y(g) ? (e.consume(g), I) : me(g);
	}
	function L(g) {
		return g === 45 || Xe(g)
			? (e.consume(g), L)
			: g === 47 || g === 62 || $e(g)
				? j(g)
				: t(g);
	}
	function j(g) {
		return g === 47
			? (e.consume(g), me)
			: g === 58 || g === 95 || En(g)
				? (e.consume(g), M)
				: B(g)
					? ((o = j), de(g))
					: Y(g)
						? (e.consume(g), j)
						: me(g);
	}
	function M(g) {
		return g === 45 || g === 46 || g === 58 || g === 95 || Xe(g)
			? (e.consume(g), M)
			: D(g);
	}
	function D(g) {
		return g === 61
			? (e.consume(g), A)
			: B(g)
				? ((o = D), de(g))
				: Y(g)
					? (e.consume(g), D)
					: j(g);
	}
	function A(g) {
		return g === null || g === 60 || g === 61 || g === 62 || g === 96
			? t(g)
			: g === 34 || g === 39
				? (e.consume(g), (i = g), X)
				: B(g)
					? ((o = A), de(g))
					: Y(g)
						? (e.consume(g), A)
						: (e.consume(g), ue);
	}
	function X(g) {
		return g === i
			? (e.consume(g), (i = void 0), W)
			: g === null
				? t(g)
				: B(g)
					? ((o = X), de(g))
					: (e.consume(g), X);
	}
	function ue(g) {
		return g === null ||
			g === 34 ||
			g === 39 ||
			g === 60 ||
			g === 61 ||
			g === 96
			? t(g)
			: g === 47 || g === 62 || $e(g)
				? j(g)
				: (e.consume(g), ue);
	}
	function W(g) {
		return g === 47 || g === 62 || $e(g) ? j(g) : t(g);
	}
	function me(g) {
		return g === 62
			? (e.consume(g), e.exit('htmlTextData'), e.exit('htmlText'), n)
			: t(g);
	}
	function de(g) {
		return (
			e.exit('htmlTextData'),
			e.enter('lineEnding'),
			e.consume(g),
			e.exit('lineEnding'),
			z
		);
	}
	function z(g) {
		return Y(g)
			? ne(
					e,
					F,
					'linePrefix',
					r.parser.constructs.disable.null.includes('codeIndented')
						? void 0
						: 4
				)(g)
			: F(g);
	}
	function F(g) {
		return e.enter('htmlTextData'), o(g);
	}
}
const Js = {name: 'labelEnd', resolveAll: Ev, resolveTo: Cv, tokenize: _v};
const xv = {tokenize: Pv};
const wv = {tokenize: Tv};
const Sv = {tokenize: Iv};
function Ev(e) {
	let n = -1;
	const t = [];
	for (; ++n < e.length; ) {
		const r = e[n][1];
		if (
			(t.push(e[n]),
			r.type === 'labelImage' ||
				r.type === 'labelLink' ||
				r.type === 'labelEnd')
		) {
			const i = r.type === 'labelImage' ? 4 : 2;
			(r.type = 'data'), (n += i);
		}
	}

	return e.length !== t.length && Pn(e, 0, e.length, t), e;
}
function Cv(e, n) {
	let t = e.length;
	let r = 0;
	let i;
	let l;
	let o;
	let u;
	for (; t--; ) {
		if (((i = e[t][1]), l)) {
			if (i.type === 'link' || (i.type === 'labelLink' && i._inactive)) {
				break;
			}
			e[t][0] === 'enter' && i.type === 'labelLink' && (i._inactive = !0);
		}
		else if (o) {
			if (
				e[t][0] === 'enter' &&
				(i.type === 'labelImage' || i.type === 'labelLink') &&
				!i._balanced &&
				((l = t), i.type !== 'labelLink')
			) {
				r = 2;
				break;
			}
		}
		else {
			i.type === 'labelEnd' && (o = t);
		}
	}
	const s = {
		type: e[l][1].type === 'labelLink' ? 'link' : 'image',
		start: {...e[l][1].start},
		end: {...e[e.length - 1][1].end},
	};
	const a = {type: 'label', start: {...e[l][1].start}, end: {...e[o][1].end}};
	const c = {
		type: 'labelText',
		start: {...e[l + r + 2][1].end},
		end: {...e[o - 2][1].start},
	};

	return (
		(u = [
			['enter', s, n],
			['enter', a, n],
		]),
		(u = tn(u, e.slice(l + 1, l + r + 3))),
		(u = tn(u, [['enter', c, n]])),
		(u = tn(
			u,
			qs(
				n.parser.constructs.insideSpan.null,
				e.slice(l + r + 4, o - 3),
				n
			)
		)),
		(u = tn(u, [['exit', c, n], e[o - 2], e[o - 1], ['exit', a, n]])),
		(u = tn(u, e.slice(o + 1))),
		(u = tn(u, [['exit', s, n]])),
		Pn(e, l, e.length, u),
		e
	);
}
function _v(e, n, t) {
	const r = this;
	let i = r.events.length;
	let l;
	let o;
	for (; i--; ) {
		if (
			(r.events[i][1].type === 'labelImage' ||
				r.events[i][1].type === 'labelLink') &&
			!r.events[i][1]._balanced
		) {
			l = r.events[i][1];
			break;
		}
	}

	return u;
	function u(d) {
		return l
			? l._inactive
				? f(d)
				: ((o = r.parser.defined.includes(
						rr(r.sliceSerialize({start: l.end, end: r.now()}))
					)),
					e.enter('labelEnd'),
					e.enter('labelMarker'),
					e.consume(d),
					e.exit('labelMarker'),
					e.exit('labelEnd'),
					s)
			: t(d);
	}
	function s(d) {
		return d === 40
			? e.attempt(xv, c, o ? c : f)(d)
			: d === 91
				? e.attempt(wv, c, o ? a : f)(d)
				: o
					? c(d)
					: f(d);
	}
	function a(d) {
		return e.attempt(Sv, c, f)(d);
	}
	function c(d) {
		return n(d);
	}
	function f(d) {
		return (l._balanced = !0), t(d);
	}
}
function Pv(e, n, t) {
	return r;
	function r(f) {
		return (
			e.enter('resource'),
			e.enter('resourceMarker'),
			e.consume(f),
			e.exit('resourceMarker'),
			i
		);
	}
	function i(f) {
		return $e(f) ? Kr(e, l)(f) : l(f);
	}
	function l(f) {
		return f === 41
			? c(f)
			: Yd(
					e,
					o,
					u,
					'resourceDestination',
					'resourceDestinationLiteral',
					'resourceDestinationLiteralMarker',
					'resourceDestinationRaw',
					'resourceDestinationString',
					32
				)(f);
	}
	function o(f) {
		return $e(f) ? Kr(e, s)(f) : c(f);
	}
	function u(f) {
		return t(f);
	}
	function s(f) {
		return f === 34 || f === 39 || f === 40
			? Gd(
					e,
					a,
					t,
					'resourceTitle',
					'resourceTitleMarker',
					'resourceTitleString'
				)(f)
			: c(f);
	}
	function a(f) {
		return $e(f) ? Kr(e, c)(f) : c(f);
	}
	function c(f) {
		return f === 41
			? (e.enter('resourceMarker'),
				e.consume(f),
				e.exit('resourceMarker'),
				e.exit('resource'),
				n)
			: t(f);
	}
}
function Tv(e, n, t) {
	const r = this;

	return i;
	function i(u) {
		return Xd.call(
			r,
			e,
			l,
			o,
			'reference',
			'referenceMarker',
			'referenceString'
		)(u);
	}
	function l(u) {
		return r.parser.defined.includes(
			rr(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))
		)
			? n(u)
			: t(u);
	}
	function o(u) {
		return t(u);
	}
}
function Iv(e, n, t) {
	return r;
	function r(l) {
		return (
			e.enter('reference'),
			e.enter('referenceMarker'),
			e.consume(l),
			e.exit('referenceMarker'),
			i
		);
	}
	function i(l) {
		return l === 93
			? (e.enter('referenceMarker'),
				e.consume(l),
				e.exit('referenceMarker'),
				e.exit('reference'),
				n)
			: t(l);
	}
}
const Nv = {name: 'labelStartImage', resolveAll: Js.resolveAll, tokenize: zv};
function zv(e, n, t) {
	const r = this;

	return i;
	function i(u) {
		return (
			e.enter('labelImage'),
			e.enter('labelImageMarker'),
			e.consume(u),
			e.exit('labelImageMarker'),
			l
		);
	}
	function l(u) {
		return u === 91
			? (e.enter('labelMarker'),
				e.consume(u),
				e.exit('labelMarker'),
				e.exit('labelImage'),
				o)
			: t(u);
	}
	function o(u) {
		return u === 94 && '_hiddenFootnoteSupport' in r.parser.constructs
			? t(u)
			: n(u);
	}
}
const Lv = {name: 'labelStartLink', resolveAll: Js.resolveAll, tokenize: Rv};
function Rv(e, n, t) {
	const r = this;

	return i;
	function i(o) {
		return (
			e.enter('labelLink'),
			e.enter('labelMarker'),
			e.consume(o),
			e.exit('labelMarker'),
			e.exit('labelLink'),
			l
		);
	}
	function l(o) {
		return o === 94 && '_hiddenFootnoteSupport' in r.parser.constructs
			? t(o)
			: n(o);
	}
}
const Io = {name: 'lineEnding', tokenize: Ov};
function Ov(e, n) {
	return t;
	function t(r) {
		return (
			e.enter('lineEnding'),
			e.consume(r),
			e.exit('lineEnding'),
			ne(e, n, 'linePrefix')
		);
	}
}
const el = {name: 'thematicBreak', tokenize: Mv};
function Mv(e, n, t) {
	let r = 0;
	let i;

	return l;
	function l(a) {
		return e.enter('thematicBreak'), o(a);
	}
	function o(a) {
		return (i = a), u(a);
	}
	function u(a) {
		return a === i
			? (e.enter('thematicBreakSequence'), s(a))
			: r >= 3 && (a === null || B(a))
				? (e.exit('thematicBreak'), n(a))
				: t(a);
	}
	function s(a) {
		return a === i
			? (e.consume(a), r++, s)
			: (e.exit('thematicBreakSequence'),
				Y(a) ? ne(e, u, 'whitespace')(a) : u(a));
	}
}
const Ae = {continuation: {tokenize: jv}, exit: Uv, name: 'list', tokenize: Fv};
const Dv = {partial: !0, tokenize: Hv};
const Av = {partial: !0, tokenize: Bv};
function Fv(e, n, t) {
	const r = this;
	const i = r.events[r.events.length - 1];
	let l =
		i && i[1].type === 'linePrefix'
			? i[2].sliceSerialize(i[1], !0).length
			: 0;
	let o = 0;

	return u;
	function u(p) {
		const x =
			r.containerState.type ||
			(p === 42 || p === 43 || p === 45
				? 'listUnordered'
				: 'listOrdered');
		if (
			x === 'listUnordered'
				? !r.containerState.marker || p === r.containerState.marker
				: Vu(p)
		) {
			if (
				(r.containerState.type ||
					((r.containerState.type = x), e.enter(x, {_container: !0})),
				x === 'listUnordered')
			) {
				return (
					e.enter('listItemPrefix'),
					p === 42 || p === 45 ? e.check(el, t, a)(p) : a(p)
				);
			}
			if (!r.interrupt || p === 49) {
				return (
					e.enter('listItemPrefix'), e.enter('listItemValue'), s(p)
				);
			}
		}

		return t(p);
	}
	function s(p) {
		return Vu(p) && ++o < 10
			? (e.consume(p), s)
			: (!r.interrupt || o < 2) &&
				  (r.containerState.marker
						? p === r.containerState.marker
						: p === 41 || p === 46)
				? (e.exit('listItemValue'), a(p))
				: t(p);
	}
	function a(p) {
		return (
			e.enter('listItemMarker'),
			e.consume(p),
			e.exit('listItemMarker'),
			(r.containerState.marker = r.containerState.marker || p),
			e.check(Yl, r.interrupt ? t : c, e.attempt(Dv, d, f))
		);
	}
	function c(p) {
		return (r.containerState.initialBlankLine = !0), l++, d(p);
	}
	function f(p) {
		return Y(p)
			? (e.enter('listItemPrefixWhitespace'),
				e.consume(p),
				e.exit('listItemPrefixWhitespace'),
				d)
			: t(p);
	}
	function d(p) {
		return (
			(r.containerState.size =
				l + r.sliceSerialize(e.exit('listItemPrefix'), !0).length),
			n(p)
		);
	}
}
function jv(e, n, t) {
	const r = this;

	return (r.containerState._closeFlow = void 0), e.check(Yl, i, l);
	function i(u) {
		return (
			(r.containerState.furtherBlankLines =
				r.containerState.furtherBlankLines ||
				r.containerState.initialBlankLine),
			ne(e, n, 'listItemIndent', r.containerState.size + 1)(u)
		);
	}
	function l(u) {
		return r.containerState.furtherBlankLines || !Y(u)
			? ((r.containerState.furtherBlankLines = void 0),
				(r.containerState.initialBlankLine = void 0),
				o(u))
			: ((r.containerState.furtherBlankLines = void 0),
				(r.containerState.initialBlankLine = void 0),
				e.attempt(Av, n, o)(u));
	}
	function o(u) {
		return (
			(r.containerState._closeFlow = !0),
			(r.interrupt = void 0),
			ne(
				e,
				e.attempt(Ae, n, t),
				'linePrefix',
				r.parser.constructs.disable.null.includes('codeIndented')
					? void 0
					: 4
			)(u)
		);
	}
}
function Bv(e, n, t) {
	const r = this;

	return ne(e, i, 'listItemIndent', r.containerState.size + 1);
	function i(l) {
		const o = r.events[r.events.length - 1];

		return o &&
			o[1].type === 'listItemIndent' &&
			o[2].sliceSerialize(o[1], !0).length === r.containerState.size
			? n(l)
			: t(l);
	}
}
function Uv(e) {
	e.exit(this.containerState.type);
}
function Hv(e, n, t) {
	const r = this;

	return ne(
		e,
		i,
		'listItemPrefixWhitespace',
		r.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 5
	);
	function i(l) {
		const o = r.events[r.events.length - 1];

		return !Y(l) && o && o[1].type === 'listItemPrefixWhitespace'
			? n(l)
			: t(l);
	}
}
const Vc = {name: 'setextUnderline', resolveTo: Vv, tokenize: $v};
function Vv(e, n) {
	let t = e.length;
	let r;
	let i;
	let l;
	for (; t--; ) {
		if (e[t][0] === 'enter') {
			if (e[t][1].type === 'content') {
				r = t;
				break;
			}
			e[t][1].type === 'paragraph' && (i = t);
		}
		else {
			e[t][1].type === 'content' && e.splice(t, 1),
				!l && e[t][1].type === 'definition' && (l = t);
		}
	}
	const o = {
		type: 'setextHeading',
		start: {...e[r][1].start},
		end: {...e[e.length - 1][1].end},
	};

	return (
		(e[i][1].type = 'setextHeadingText'),
		l
			? (e.splice(i, 0, ['enter', o, n]),
				e.splice(l + 1, 0, ['exit', e[r][1], n]),
				(e[r][1].end = {...e[l][1].end}))
			: (e[r][1] = o),
		e.push(['exit', o, n]),
		e
	);
}
function $v(e, n, t) {
	const r = this;
	let i;

	return l;
	function l(a) {
		let c = r.events.length;
		let f;
		for (; c--; ) {
			if (
				r.events[c][1].type !== 'lineEnding' &&
				r.events[c][1].type !== 'linePrefix' &&
				r.events[c][1].type !== 'content'
			) {
				f = r.events[c][1].type === 'paragraph';
				break;
			}
		}

		return !r.parser.lazy[r.now().line] && (r.interrupt || f)
			? (e.enter('setextHeadingLine'), (i = a), o(a))
			: t(a);
	}
	function o(a) {
		return e.enter('setextHeadingLineSequence'), u(a);
	}
	function u(a) {
		return a === i
			? (e.consume(a), u)
			: (e.exit('setextHeadingLineSequence'),
				Y(a) ? ne(e, s, 'lineSuffix')(a) : s(a));
	}
	function s(a) {
		return a === null || B(a) ? (e.exit('setextHeadingLine'), n(a)) : t(a);
	}
}
const Wv = {tokenize: bv};
function bv(e) {
	const n = this;
	const t = e.attempt(
		Yl,
		r,
		e.attempt(
			this.parser.constructs.flowInitial,
			i,
			ne(
				e,
				e.attempt(this.parser.constructs.flow, i, e.attempt(G1, i)),
				'linePrefix'
			)
		)
	);

	return t;
	function r(l) {
		if (l === null) {
			e.consume(l);

			return;
		}

		return (
			e.enter('lineEndingBlank'),
			e.consume(l),
			e.exit('lineEndingBlank'),
			(n.currentConstruct = void 0),
			t
		);
	}
	function i(l) {
		if (l === null) {
			e.consume(l);

			return;
		}

		return (
			e.enter('lineEnding'),
			e.consume(l),
			e.exit('lineEnding'),
			(n.currentConstruct = void 0),
			t
		);
	}
}
const Qv = {resolveAll: Jd()};
const Kv = qd('string');
const Yv = qd('text');
function qd(e) {
	return {resolveAll: Jd(e === 'text' ? Xv : void 0), tokenize: n};
	function n(t) {
		const r = this;
		const i = this.parser.constructs[e];
		const l = t.attempt(i, o, u);

		return o;
		function o(c) {
			return a(c) ? l(c) : u(c);
		}
		function u(c) {
			if (c === null) {
				t.consume(c);

				return;
			}

			return t.enter('data'), t.consume(c), s;
		}
		function s(c) {
			return a(c) ? (t.exit('data'), l(c)) : (t.consume(c), s);
		}
		function a(c) {
			if (c === null) {
				return !0;
			}
			const f = i[c];
			let d = -1;
			if (f) {
				for (; ++d < f.length; ) {
					const p = f[d];
					if (!p.previous || p.previous.call(r, r.previous)) {
						return !0;
					}
				}
			}

			return !1;
		}
	}
}
function Jd(e) {
	return n;
	function n(t, r) {
		let i = -1;
		let l;
		for (; ++i <= t.length; ) {
			l === void 0
				? t[i] && t[i][1].type === 'data' && ((l = i), i++)
				: (!t[i] || t[i][1].type !== 'data') &&
					(i !== l + 2 &&
						((t[l][1].end = t[i - 1][1].end),
						t.splice(l + 2, i - l - 2),
						(i = l + 2)),
					(l = void 0));
		}

		return e ? e(t, r) : t;
	}
}
function Xv(e, n) {
	let t = 0;
	for (; ++t <= e.length; ) {
		if (
			(t === e.length || e[t][1].type === 'lineEnding') &&
			e[t - 1][1].type === 'data'
		) {
			const r = e[t - 1][1];
			const i = n.sliceStream(r);
			let l = i.length;
			let o = -1;
			let u = 0;
			let s;
			for (; l--; ) {
				const a = i[l];
				if (typeof a === 'string') {
					for (o = a.length; a.charCodeAt(o - 1) === 32; ) {
						u++, o--;
					}
					if (o) {
						break;
					}
					o = -1;
				}
				else if (a === -2) {
					(s = !0), u++;
				}
				else if (a !== -1) {
					l++;
					break;
				}
			}
			if ((n._contentTypeTextTrailing && t === e.length && (u = 0), u)) {
				const a = {
					type:
						t === e.length || s || u < 2
							? 'lineSuffix'
							: 'hardBreakTrailing',
					start: {
						_bufferIndex: l ? o : r.start._bufferIndex + o,
						_index: r.start._index + l,
						line: r.end.line,
						column: r.end.column - u,
						offset: r.end.offset - u,
					},
					end: {...r.end},
				};
				(r.end = {...a.start}),
					r.start.offset === r.end.offset
						? Object.assign(r, a)
						: (e.splice(t, 0, ['enter', a, n], ['exit', a, n]),
							(t += 2));
			}
			t++;
		}
	}

	return e;
}
const Gv = {
	42: Ae,
	43: Ae,
	45: Ae,
	48: Ae,
	49: Ae,
	50: Ae,
	51: Ae,
	52: Ae,
	53: Ae,
	54: Ae,
	55: Ae,
	56: Ae,
	57: Ae,
	62: Wd,
};
const qv = {91: nv};
const Jv = {[-2]: To, [-1]: To, 32: To};
const Zv = {
	35: uv,
	42: el,
	45: [Vc, el],
	60: fv,
	61: Vc,
	95: el,
	96: Uc,
	126: Uc,
};
const e0 = {38: Qd, 92: bd};
const n0 = {
	[-5]: Io,
	[-4]: Io,
	[-3]: Io,
	33: Nv,
	38: Qd,
	42: $u,
	60: [L1, vv],
	91: Lv,
	92: [lv, bd],
	93: Js,
	95: $u,
	96: W1,
};
const t0 = {null: [$u, Qv]};
const r0 = {null: [42, 95]};
const i0 = {null: []};
const l0 = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			attentionMarkers: r0,
			contentInitial: qv,
			disable: i0,
			document: Gv,
			flow: Zv,
			flowInitial: Jv,
			insideSpan: t0,
			string: e0,
			text: n0,
		},
		Symbol.toStringTag,
		{value: 'Module'}
	)
);
function o0(e, n, t) {
	let r = {
		_bufferIndex: -1,
		_index: 0,
		line: (t && t.line) || 1,
		column: (t && t.column) || 1,
		offset: (t && t.offset) || 0,
	};
	const i = {};
	const l = [];
	let o = [];
	let u = [];
	const s = {
		attempt: I(T),
		check: I(w),
		consume: m,
		enter: y,
		exit: S,
		interrupt: I(w, {interrupt: !0}),
	};
	const a = {
		code: null,
		containerState: {},
		defineSkip: k,
		events: [],
		now: x,
		parser: e,
		previous: null,
		sliceSerialize: d,
		sliceStream: p,
		write: f,
	};
	let c = n.tokenize.call(a, s);

	return n.resolveAll && l.push(n), a;
	function f(D) {
		return (
			(o = tn(o, D)),
			C(),
			o[o.length - 1] !== null
				? []
				: (L(n, 0), (a.events = qs(l, a.events, a)), a.events)
		);
	}
	function d(D, A) {
		return s0(p(D), A);
	}
	function p(D) {
		return u0(o, D);
	}
	function x() {
		const {_bufferIndex: D, _index: A, column: ue, line: X, offset: W} = r;

		return {_bufferIndex: D, _index: A, line: X, column: ue, offset: W};
	}
	function k(D) {
		(i[D.line] = D.column), M();
	}
	function C() {
		let D;
		for (; r._index < o.length; ) {
			const A = o[r._index];
			if (typeof A === 'string') {
				for (
					D = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
					r._index === D && r._bufferIndex < A.length;

				) {
					h(A.charCodeAt(r._bufferIndex));
				}
			}
			else {
				h(A);
			}
		}
	}
	function h(D) {
		c = c(D);
	}
	function m(D) {
		B(D)
			? (r.line++, (r.column = 1), (r.offset += D === -3 ? 2 : 1), M())
			: D !== -1 && (r.column++, r.offset++),
			r._bufferIndex < 0
				? r._index++
				: (r._bufferIndex++,
					r._bufferIndex === o[r._index].length &&
						((r._bufferIndex = -1), r._index++)),
			(a.previous = D);
	}
	function y(D, A) {
		const X = A || {};

		return (
			(X.type = D),
			(X.start = x()),
			a.events.push(['enter', X, a]),
			u.push(X),
			X
		);
	}
	function S(D) {
		const A = u.pop();

		return (A.end = x()), a.events.push(['exit', A, a]), A;
	}
	function T(D, A) {
		L(D, A.from);
	}
	function w(D, A) {
		A.restore();
	}
	function I(D, A) {
		return X;
		function X(ue, W, me) {
			let de;
			let z;
			let F;
			let g;

			return Array.isArray(ue)
				? q(ue)
				: 'tokenize' in ue
					? q([ue])
					: Q(ue);
			function Q(te) {
				return vn;
				function vn(Un) {
					const It = Un !== null && te[Un];
					const Nt = Un !== null && te.null;
					const xi = [
						...(Array.isArray(It) ? It : It ? [It] : []),
						...(Array.isArray(Nt) ? Nt : Nt ? [Nt] : []),
					];

					return q(xi)(Un);
				}
			}
			function q(te) {
				return (de = te), (z = 0), !te.length ? me : v(te[z]);
			}
			function v(te) {
				return vn;
				function vn(Un) {
					return (
						(g = j()),
						(F = te),
						te.partial || (a.currentConstruct = te),
						te.name &&
						a.parser.constructs.disable.null.includes(te.name)
							? sn()
							: te.tokenize.call(
									A ? Object.assign(Object.create(a), A) : a,
									s,
									ve,
									sn
								)(Un)
					);
				}
			}
			function ve(te) {
				return D(F, g), W;
			}
			function sn(te) {
				return g.restore(), ++z < de.length ? v(de[z]) : me;
			}
		}
	}
	function L(D, A) {
		D.resolveAll && !l.includes(D) && l.push(D),
			D.resolve &&
				Pn(
					a.events,
					A,
					a.events.length - A,
					D.resolve(a.events.slice(A), a)
				),
			D.resolveTo && (a.events = D.resolveTo(a.events, a));
	}
	function j() {
		const D = x();
		const A = a.previous;
		const X = a.currentConstruct;
		const ue = a.events.length;
		const W = Array.from(u);

		return {from: ue, restore: me};
		function me() {
			(r = D),
				(a.previous = A),
				(a.currentConstruct = X),
				(a.events.length = ue),
				(u = W),
				M();
		}
	}
	function M() {
		r.line in i &&
			r.column < 2 &&
			((r.column = i[r.line]), (r.offset += i[r.line] - 1));
	}
}
function u0(e, n) {
	const t = n.start._index;
	const r = n.start._bufferIndex;
	const i = n.end._index;
	const l = n.end._bufferIndex;
	let o;
	if (t === i) {
		o = [e[t].slice(r, l)];
	}
	else {
		if (((o = e.slice(t, i)), r > -1)) {
			const u = o[0];
			typeof u === 'string' ? (o[0] = u.slice(r)) : o.shift();
		}
		l > 0 && o.push(e[i].slice(0, l));
	}

	return o;
}
function s0(e, n) {
	let t = -1;
	const r = [];
	let i;
	for (; ++t < e.length; ) {
		const l = e[t];
		let o;
		if (typeof l === 'string') {
			o = l;
		}
		else {
			switch (l) {
				case -5: {
					o = '\r';
					break;
				}
				case -4: {
					o = `
`;
					break;
				}
				case -3: {
					o = `\r
`;
					break;
				}
				case -2: {
					o = n ? ' ' : '	';
					break;
				}
				case -1: {
					if (!n && i) {
						continue;
					}
					o = ' ';
					break;
				}
				default:
					o = String.fromCharCode(l);
			}
		}
		(i = l === -2), r.push(o);
	}

	return r.join('');
}
function a0(e) {
	const r = {
		constructs: g1([l0, ...((e || {}).extensions || [])]),
		content: i(C1),
		defined: [],
		document: i(P1),
		flow: i(Wv),
		lazy: {},
		string: i(Kv),
		text: i(Yv),
	};

	return r;
	function i(l) {
		return o;
		function o(u) {
			return o0(r, l, u);
		}
	}
}
function c0(e) {
	for (; !Kd(e); ) {}

	return e;
}
const $c = /[\0\t\n\r]/g;
function f0() {
	let e = 1;
	let n = '';
	let t = !0;
	let r;

	return i;
	function i(l, o, u) {
		const s = [];
		let a;
		let c;
		let f;
		let d;
		let p;
		for (
			l =
				n +
				(typeof l === 'string'
					? l.toString()
					: new TextDecoder(o || void 0).decode(l)),
				f = 0,
				n = '',
				t && (l.charCodeAt(0) === 65279 && f++, (t = void 0));
			f < l.length;

		) {
			if (
				(($c.lastIndex = f),
				(a = $c.exec(l)),
				(d = a && a.index !== void 0 ? a.index : l.length),
				(p = l.charCodeAt(d)),
				!a)
			) {
				n = l.slice(f);
				break;
			}
			if (p === 10 && f === d && r) {
				s.push(-3), (r = void 0);
			}
			else {
				switch (
					(r && (s.push(-5), (r = void 0)),
					f < d && (s.push(l.slice(f, d)), (e += d - f)),
					p)
				) {
					case 0: {
						s.push(65533), e++;
						break;
					}
					case 9: {
						for (c = Math.ceil(e / 4) * 4, s.push(-2); e++ < c; ) {
							s.push(-1);
						}
						break;
					}
					case 10: {
						s.push(-4), (e = 1);
						break;
					}
					default:
						(r = !0), (e = 1);
				}
			}
			f = d + 1;
		}

		return u && (r && s.push(-5), n && s.push(n), s.push(null)), s;
	}
}
const p0 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function d0(e) {
	return e.replace(p0, h0);
}
function h0(e, n, t) {
	if (n) {
		return n;
	}
	if (t.charCodeAt(0) === 35) {
		const i = t.charCodeAt(1);
		const l = i === 120 || i === 88;

		return $d(t.slice(l ? 2 : 1), l ? 16 : 10);
	}

	return Gs(t) || e;
}
const Zd = {}.hasOwnProperty;
function m0(e, n, t) {
	return (
		n && typeof n === 'object' && ((t = n), (n = void 0)),
		g0(t)(
			c0(
				a0(t)
					.document()
					.write(f0()(e, n, !0))
			)
		)
	);
}
function g0(e) {
	const n = {
		transforms: [],
		canContainEols: [
			'emphasis',
			'fragment',
			'heading',
			'paragraph',
			'strong',
		],
		enter: {
			autolink: l(ua),
			autolinkProtocol: j,
			autolinkEmail: j,
			atxHeading: l(ia),
			blockQuote: l(Nt),
			characterEscape: j,
			characterReference: j,
			codeFenced: l(xi),
			codeFencedFenceInfo: o,
			codeFencedFenceMeta: o,
			codeIndented: l(xi, o),
			codeText: l(ph, o),
			codeTextData: j,
			data: j,
			codeFlowValue: j,
			definition: l(dh),
			definitionDestinationString: o,
			definitionLabelString: o,
			definitionTitleString: o,
			emphasis: l(hh),
			hardBreakEscape: l(la),
			hardBreakTrailing: l(la),
			htmlFlow: l(oa, o),
			htmlFlowData: j,
			htmlText: l(oa, o),
			htmlTextData: j,
			image: l(mh),
			label: o,
			link: l(ua),
			listItem: l(gh),
			listItemValue: d,
			listOrdered: l(sa, f),
			listUnordered: l(sa),
			paragraph: l(yh),
			reference: v,
			referenceString: o,
			resourceDestinationString: o,
			resourceTitleString: o,
			setextHeading: l(ia),
			strong: l(vh),
			thematicBreak: l(xh),
		},
		exit: {
			atxHeading: s(),
			atxHeadingSequence: T,
			autolink: s(),
			autolinkEmail: It,
			autolinkProtocol: Un,
			blockQuote: s(),
			characterEscapeValue: M,
			characterReferenceMarkerHexadecimal: sn,
			characterReferenceMarkerNumeric: sn,
			characterReferenceValue: te,
			characterReference: vn,
			codeFenced: s(C),
			codeFencedFence: k,
			codeFencedFenceInfo: p,
			codeFencedFenceMeta: x,
			codeFlowValue: M,
			codeIndented: s(h),
			codeText: s(W),
			codeTextData: M,
			data: M,
			definition: s(),
			definitionDestinationString: S,
			definitionLabelString: m,
			definitionTitleString: y,
			emphasis: s(),
			hardBreakEscape: s(A),
			hardBreakTrailing: s(A),
			htmlFlow: s(X),
			htmlFlowData: M,
			htmlText: s(ue),
			htmlTextData: M,
			image: s(de),
			label: F,
			labelText: z,
			lineEnding: D,
			link: s(me),
			listItem: s(),
			listOrdered: s(),
			listUnordered: s(),
			paragraph: s(),
			referenceString: ve,
			resourceDestinationString: g,
			resourceTitleString: Q,
			resource: q,
			setextHeading: s(L),
			setextHeadingLineSequence: I,
			setextHeadingText: w,
			strong: s(),
			thematicBreak: s(),
		},
	};
	eh(n, (e || {}).mdastExtensions || []);
	const t = {};

	return r;
	function r(E) {
		let N = {type: 'root', children: []};
		const U = {
			stack: [N],
			tokenStack: [],
			config: n,
			enter: u,
			exit: a,
			buffer: o,
			resume: c,
			data: t,
		};
		const b = [];
		let J = -1;
		for (; ++J < E.length; ) {
			if (
				E[J][1].type === 'listOrdered' ||
				E[J][1].type === 'listUnordered'
			) {
				if (E[J][0] === 'enter') {
					b.push(J);
				}
				else {
					const an = b.pop();
					J = i(E, an, J);
				}
			}
		}
		for (J = -1; ++J < E.length; ) {
			const an = n[E[J][0]];
			Zd.call(an, E[J][1].type) &&
				an[E[J][1].type].call(
					{sliceSerialize: E[J][2].sliceSerialize, ...U},
					E[J][1]
				);
		}
		if (U.tokenStack.length) {
			const an = U.tokenStack[U.tokenStack.length - 1];
			(an[1] || Wc).call(U, void 0, an[0]);
		}
		for (
			N.position = {
				start: Vn(
					E.length ? E[0][1].start : {line: 1, column: 1, offset: 0}
				),
				end: Vn(
					E.length
						? E[E.length - 2][1].end
						: {line: 1, column: 1, offset: 0}
				),
			},
				J = -1;
			++J < n.transforms.length;

		) {
			N = n.transforms[J](N) || N;
		}

		return N;
	}
	function i(E, N, U) {
		let b = N - 1;
		let J = -1;
		let an = !1;
		let ct;
		let Tn;
		let gr;
		let yr;
		for (; ++b <= U; ) {
			const be = E[b];
			switch (be[1].type) {
				case 'listUnordered':
				case 'listOrdered':
				case 'blockQuote': {
					be[0] === 'enter' ? J++ : J--, (yr = void 0);
					break;
				}
				case 'lineEndingBlank': {
					be[0] === 'enter' &&
						(ct && !yr && !J && !gr && (gr = b), (yr = void 0));
					break;
				}
				case 'linePrefix':
				case 'listItemValue':
				case 'listItemMarker':
				case 'listItemPrefix':
				case 'listItemPrefixWhitespace':
					break;
				default:
					yr = void 0;
			}
			if (
				(!J && be[0] === 'enter' && be[1].type === 'listItemPrefix') ||
				(J === -1 &&
					be[0] === 'exit' &&
					(be[1].type === 'listUnordered' ||
						be[1].type === 'listOrdered'))
			) {
				if (ct) {
					let zt = b;
					for (Tn = void 0; zt--; ) {
						const In = E[zt];
						if (
							In[1].type === 'lineEnding' ||
							In[1].type === 'lineEndingBlank'
						) {
							if (In[0] === 'exit') {
								continue;
							}
							Tn &&
								((E[Tn][1].type = 'lineEndingBlank'),
								(an = !0)),
								(In[1].type = 'lineEnding'),
								(Tn = zt);
						}
						else if (
							!(
								In[1].type === 'linePrefix' ||
								In[1].type === 'blockQuotePrefix' ||
								In[1].type === 'blockQuotePrefixWhitespace' ||
								In[1].type === 'blockQuoteMarker' ||
								In[1].type === 'listItemIndent'
							)
						) {
							break;
						}
					}
					gr && (!Tn || gr < Tn) && (ct._spread = !0),
						(ct.end = {
							...(Tn ? E[Tn][1].start : be[1].end),
						}),
						E.splice(Tn || b, 0, ['exit', ct, be[2]]),
						b++,
						U++;
				}
				if (be[1].type === 'listItemPrefix') {
					const zt = {
						type: 'listItem',
						_spread: !1,
						start: {...be[1].start},
						end: void 0,
					};
					(ct = zt),
						E.splice(b, 0, ['enter', zt, be[2]]),
						b++,
						U++,
						(gr = void 0),
						(yr = !0);
				}
			}
		}

		return (E[N][1]._spread = an), U;
	}
	function l(E, N) {
		return U;
		function U(b) {
			u.call(this, E(b), b), N && N.call(this, b);
		}
	}
	function o() {
		this.stack.push({type: 'fragment', children: []});
	}
	function u(E, N, U) {
		this.stack[this.stack.length - 1].children.push(E),
			this.stack.push(E),
			this.tokenStack.push([N, U || void 0]),
			(E.position = {start: Vn(N.start), end: void 0});
	}
	function s(E) {
		return N;
		function N(U) {
			E && E.call(this, U), a.call(this, U);
		}
	}
	function a(E, N) {
		const U = this.stack.pop();
		const b = this.tokenStack.pop();
		if (b) {
			b[0].type !== E.type &&
				(N ? N.call(this, E, b[0]) : (b[1] || Wc).call(this, E, b[0]));
		}
		else {
			throw new Error(
				'Cannot close `' +
					E.type +
					'` (' +
					Qr({start: E.start, end: E.end}) +
					'): it’s not open'
			);
		}
		U.position.end = Vn(E.end);
	}
	function c() {
		return h1(this.stack.pop());
	}
	function f() {
		this.data.expectingFirstListItemValue = !0;
	}
	function d(E) {
		if (this.data.expectingFirstListItemValue) {
			const N = this.stack[this.stack.length - 2];
			(N.start = Number.parseInt(this.sliceSerialize(E), 10)),
				(this.data.expectingFirstListItemValue = void 0);
		}
	}
	function p() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		N.lang = E;
	}
	function x() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		N.meta = E;
	}
	function k() {
		this.data.flowCodeInside ||
			(this.buffer(), (this.data.flowCodeInside = !0));
	}
	function C() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		(N.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')),
			(this.data.flowCodeInside = void 0);
	}
	function h() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		N.value = E.replace(/(\r?\n|\r)$/g, '');
	}
	function m(E) {
		const N = this.resume();
		const U = this.stack[this.stack.length - 1];
		(U.label = N),
			(U.identifier = rr(this.sliceSerialize(E)).toLowerCase());
	}
	function y() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		N.title = E;
	}
	function S() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		N.url = E;
	}
	function T(E) {
		const N = this.stack[this.stack.length - 1];
		if (!N.depth) {
			const U = this.sliceSerialize(E).length;
			N.depth = U;
		}
	}
	function w() {
		this.data.setextHeadingSlurpLineEnding = !0;
	}
	function I(E) {
		const N = this.stack[this.stack.length - 1];
		N.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
	}
	function L() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function j(E) {
		const U = this.stack[this.stack.length - 1].children;
		let b = U[U.length - 1];
		(!b || b.type !== 'text') &&
			((b = kh()),
			(b.position = {start: Vn(E.start), end: void 0}),
			U.push(b)),
			this.stack.push(b);
	}
	function M(E) {
		const N = this.stack.pop();
		(N.value += this.sliceSerialize(E)), (N.position.end = Vn(E.end));
	}
	function D(E) {
		const N = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			const U = N.children[N.children.length - 1];
			(U.position.end = Vn(E.end)), (this.data.atHardBreak = void 0);

			return;
		}
		!this.data.setextHeadingSlurpLineEnding &&
			n.canContainEols.includes(N.type) &&
			(j.call(this, E), M.call(this, E));
	}
	function A() {
		this.data.atHardBreak = !0;
	}
	function X() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		N.value = E;
	}
	function ue() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		N.value = E;
	}
	function W() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		N.value = E;
	}
	function me() {
		const E = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			const N = this.data.referenceType || 'shortcut';
			(E.type += 'Reference'),
				(E.referenceType = N),
				delete E.url,
				delete E.title;
		}
		else {
			delete E.identifier, delete E.label;
		}
		this.data.referenceType = void 0;
	}
	function de() {
		const E = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			const N = this.data.referenceType || 'shortcut';
			(E.type += 'Reference'),
				(E.referenceType = N),
				delete E.url,
				delete E.title;
		}
		else {
			delete E.identifier, delete E.label;
		}
		this.data.referenceType = void 0;
	}
	function z(E) {
		const N = this.sliceSerialize(E);
		const U = this.stack[this.stack.length - 2];
		(U.label = d0(N)), (U.identifier = rr(N).toLowerCase());
	}
	function F() {
		const E = this.stack[this.stack.length - 1];
		const N = this.resume();
		const U = this.stack[this.stack.length - 1];
		if (((this.data.inReference = !0), U.type === 'link')) {
			const b = E.children;
			U.children = b;
		}
		else {
			U.alt = N;
		}
	}
	function g() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		N.url = E;
	}
	function Q() {
		const E = this.resume();
		const N = this.stack[this.stack.length - 1];
		N.title = E;
	}
	function q() {
		this.data.inReference = void 0;
	}
	function v() {
		this.data.referenceType = 'collapsed';
	}
	function ve(E) {
		const N = this.resume();
		const U = this.stack[this.stack.length - 1];
		(U.label = N),
			(U.identifier = rr(this.sliceSerialize(E)).toLowerCase()),
			(this.data.referenceType = 'full');
	}
	function sn(E) {
		this.data.characterReferenceType = E.type;
	}
	function te(E) {
		const N = this.sliceSerialize(E);
		const U = this.data.characterReferenceType;
		let b;
		U
			? ((b = $d(N, U === 'characterReferenceMarkerNumeric' ? 10 : 16)),
				(this.data.characterReferenceType = void 0))
			: (b = Gs(N));
		const J = this.stack[this.stack.length - 1];
		J.value += b;
	}
	function vn(E) {
		const N = this.stack.pop();
		N.position.end = Vn(E.end);
	}
	function Un(E) {
		M.call(this, E);
		const N = this.stack[this.stack.length - 1];
		N.url = this.sliceSerialize(E);
	}
	function It(E) {
		M.call(this, E);
		const N = this.stack[this.stack.length - 1];
		N.url = 'mailto:' + this.sliceSerialize(E);
	}
	function Nt() {
		return {type: 'blockquote', children: []};
	}
	function xi() {
		return {type: 'code', lang: null, meta: null, value: ''};
	}
	function ph() {
		return {type: 'inlineCode', value: ''};
	}
	function dh() {
		return {
			type: 'definition',
			identifier: '',
			label: null,
			title: null,
			url: '',
		};
	}
	function hh() {
		return {type: 'emphasis', children: []};
	}
	function ia() {
		return {type: 'heading', depth: 0, children: []};
	}
	function la() {
		return {type: 'break'};
	}
	function oa() {
		return {type: 'html', value: ''};
	}
	function mh() {
		return {type: 'image', title: null, url: '', alt: null};
	}
	function ua() {
		return {type: 'link', title: null, url: '', children: []};
	}
	function sa(E) {
		return {
			type: 'list',
			ordered: E.type === 'listOrdered',
			start: null,
			spread: E._spread,
			children: [],
		};
	}
	function gh(E) {
		return {
			type: 'listItem',
			spread: E._spread,
			checked: null,
			children: [],
		};
	}
	function yh() {
		return {type: 'paragraph', children: []};
	}
	function vh() {
		return {type: 'strong', children: []};
	}
	function kh() {
		return {type: 'text', value: ''};
	}
	function xh() {
		return {type: 'thematicBreak'};
	}
}
function Vn(e) {
	return {line: e.line, column: e.column, offset: e.offset};
}
function eh(e, n) {
	let t = -1;
	for (; ++t < n.length; ) {
		const r = n[t];
		Array.isArray(r) ? eh(e, r) : y0(e, r);
	}
}
function y0(e, n) {
	let t;
	for (t in n) {
		if (Zd.call(n, t)) {
			switch (t) {
				case 'canContainEols': {
					const r = n[t];
					r && e[t].push(...r);
					break;
				}
				case 'transforms': {
					const r = n[t];
					r && e[t].push(...r);
					break;
				}
				case 'enter':
				case 'exit': {
					const r = n[t];
					r && Object.assign(e[t], r);
					break;
				}
			}
		}
	}
}
function Wc(e, n) {
	throw e
		? new Error(
				'Cannot close `' +
					e.type +
					'` (' +
					Qr({start: e.start, end: e.end}) +
					'): a different token (`' +
					n.type +
					'`, ' +
					Qr({start: n.start, end: n.end}) +
					') is open'
			)
		: new Error(
				'Cannot close document, a token (`' +
					n.type +
					'`, ' +
					Qr({start: n.start, end: n.end}) +
					') is still open'
			);
}
function v0(e) {
	const n = this;
	n.parser = t;
	function t(r) {
		return m0(r, {
			...n.data('settings'),
			...e,
			extensions: n.data('micromarkExtensions') || [],
			mdastExtensions: n.data('fromMarkdownExtensions') || [],
		});
	}
}
function k0(e, n) {
	const t = {
		type: 'element',
		tagName: 'blockquote',
		properties: {},
		children: e.wrap(e.all(n), !0),
	};

	return e.patch(n, t), e.applyData(n, t);
}
function x0(e, n) {
	const t = {type: 'element', tagName: 'br', properties: {}, children: []};

	return (
		e.patch(n, t),
		[
			e.applyData(n, t),
			{
				type: 'text',
				value: `
`,
			},
		]
	);
}
function w0(e, n) {
	const t = n.value
		? n.value +
			`
`
		: '';
	const r = {};
	const i = n.lang ? n.lang.split(/\s+/) : [];
	!!i.length && (r.className = ['language-' + i[0]]);
	let l = {
		type: 'element',
		tagName: 'code',
		properties: r,
		children: [{type: 'text', value: t}],
	};

	return (
		n.meta && (l.data = {meta: n.meta}),
		e.patch(n, l),
		(l = e.applyData(n, l)),
		(l = {type: 'element', tagName: 'pre', properties: {}, children: [l]}),
		e.patch(n, l),
		l
	);
}
function S0(e, n) {
	const t = {
		type: 'element',
		tagName: 'del',
		properties: {},
		children: e.all(n),
	};

	return e.patch(n, t), e.applyData(n, t);
}
function E0(e, n) {
	const t = {
		type: 'element',
		tagName: 'em',
		properties: {},
		children: e.all(n),
	};

	return e.patch(n, t), e.applyData(n, t);
}
function C0(e, n) {
	const t =
		typeof e.options.clobberPrefix === 'string'
			? e.options.clobberPrefix
			: 'user-content-';
	const r = String(n.identifier).toUpperCase();
	const i = mr(r.toLowerCase());
	const l = e.footnoteOrder.indexOf(r);
	let o;
	let u = e.footnoteCounts.get(r);
	u === void 0
		? ((u = 0), e.footnoteOrder.push(r), (o = e.footnoteOrder.length))
		: (o = l + 1),
		(u += 1),
		e.footnoteCounts.set(r, u);
	const s = {
		type: 'element',
		tagName: 'a',
		properties: {
			href: '#' + t + 'fn-' + i,
			id: t + 'fnref-' + i + (u > 1 ? '-' + u : ''),
			dataFootnoteRef: !0,
			ariaDescribedBy: ['footnote-label'],
		},
		children: [{type: 'text', value: String(o)}],
	};
	e.patch(n, s);
	const a = {type: 'element', tagName: 'sup', properties: {}, children: [s]};

	return e.patch(n, a), e.applyData(n, a);
}
function _0(e, n) {
	const t = {
		type: 'element',
		tagName: 'h' + n.depth,
		properties: {},
		children: e.all(n),
	};

	return e.patch(n, t), e.applyData(n, t);
}
function P0(e, n) {
	if (e.options.allowDangerousHtml) {
		const t = {type: 'raw', value: n.value};

		return e.patch(n, t), e.applyData(n, t);
	}
}
function nh(e, n) {
	const t = n.referenceType;
	let r = ']';
	if (
		(t === 'collapsed'
			? (r += '[]')
			: t === 'full' && (r += '[' + (n.label || n.identifier) + ']'),
		n.type === 'imageReference')
	) {
		return [{type: 'text', value: '![' + n.alt + r}];
	}
	const i = e.all(n);
	const l = i[0];
	l && l.type === 'text'
		? (l.value = '[' + l.value)
		: i.unshift({type: 'text', value: '['});
	const o = i[i.length - 1];

	return (
		o && o.type === 'text'
			? (o.value += r)
			: i.push({type: 'text', value: r}),
		i
	);
}
function T0(e, n) {
	const t = String(n.identifier).toUpperCase();
	const r = e.definitionById.get(t);
	if (!r) {
		return nh(e, n);
	}
	const i = {src: mr(r.url || ''), alt: n.alt};
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	const l = {type: 'element', tagName: 'img', properties: i, children: []};

	return e.patch(n, l), e.applyData(n, l);
}
function I0(e, n) {
	const t = {src: mr(n.url)};
	n.alt !== null && n.alt !== void 0 && (t.alt = n.alt),
		n.title !== null && n.title !== void 0 && (t.title = n.title);
	const r = {type: 'element', tagName: 'img', properties: t, children: []};

	return e.patch(n, r), e.applyData(n, r);
}
function N0(e, n) {
	const t = {type: 'text', value: n.value.replace(/\r?\n|\r/g, ' ')};
	e.patch(n, t);
	const r = {type: 'element', tagName: 'code', properties: {}, children: [t]};

	return e.patch(n, r), e.applyData(n, r);
}
function z0(e, n) {
	const t = String(n.identifier).toUpperCase();
	const r = e.definitionById.get(t);
	if (!r) {
		return nh(e, n);
	}
	const i = {href: mr(r.url || '')};
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	const l = {
		type: 'element',
		tagName: 'a',
		properties: i,
		children: e.all(n),
	};

	return e.patch(n, l), e.applyData(n, l);
}
function L0(e, n) {
	const t = {href: mr(n.url)};
	n.title !== null && n.title !== void 0 && (t.title = n.title);
	const r = {
		type: 'element',
		tagName: 'a',
		properties: t,
		children: e.all(n),
	};

	return e.patch(n, r), e.applyData(n, r);
}
function R0(e, n, t) {
	const r = e.all(n);
	const i = t ? O0(t) : th(n);
	const l = {};
	const o = [];
	if (typeof n.checked === 'boolean') {
		const c = r[0];
		let f;
		c && c.type === 'element' && c.tagName === 'p'
			? (f = c)
			: ((f = {
					type: 'element',
					tagName: 'p',
					properties: {},
					children: [],
				}),
				r.unshift(f)),
			!!f.children.length &&
				f.children.unshift({type: 'text', value: ' '}),
			f.children.unshift({
				type: 'element',
				tagName: 'input',
				properties: {
					type: 'checkbox',
					checked: n.checked,
					disabled: !0,
				},
				children: [],
			}),
			(l.className = ['task-list-item']);
	}
	let u = -1;
	for (; ++u < r.length; ) {
		const c = r[u];
		(i || u !== 0 || c.type !== 'element' || c.tagName !== 'p') &&
			o.push({
				type: 'text',
				value: `
`,
			}),
			c.type === 'element' && c.tagName === 'p' && !i
				? o.push(...c.children)
				: o.push(c);
	}
	const s = r[r.length - 1];
	s &&
		(i || s.type !== 'element' || s.tagName !== 'p') &&
		o.push({
			type: 'text',
			value: `
`,
		});
	const a = {type: 'element', tagName: 'li', properties: l, children: o};

	return e.patch(n, a), e.applyData(n, a);
}
function O0(e) {
	let n = !1;
	if (e.type === 'list') {
		n = e.spread || !1;
		const t = e.children;
		let r = -1;
		for (; !n && ++r < t.length; ) {
			n = th(t[r]);
		}
	}

	return n;
}
function th(e) {
	const n = e.spread;

	return n ?? e.children.length > 1;
}
function M0(e, n) {
	const t = {};
	const r = e.all(n);
	let i = -1;
	for (
		typeof n.start === 'number' && n.start !== 1 && (t.start = n.start);
		++i < r.length;

	) {
		const o = r[i];
		if (
			o.type === 'element' &&
			o.tagName === 'li' &&
			o.properties &&
			Array.isArray(o.properties.className) &&
			o.properties.className.includes('task-list-item')
		) {
			t.className = ['contains-task-list'];
			break;
		}
	}
	const l = {
		type: 'element',
		tagName: n.ordered ? 'ol' : 'ul',
		properties: t,
		children: e.wrap(r, !0),
	};

	return e.patch(n, l), e.applyData(n, l);
}
function D0(e, n) {
	const t = {
		type: 'element',
		tagName: 'p',
		properties: {},
		children: e.all(n),
	};

	return e.patch(n, t), e.applyData(n, t);
}
function A0(e, n) {
	const t = {type: 'root', children: e.wrap(e.all(n))};

	return e.patch(n, t), e.applyData(n, t);
}
function F0(e, n) {
	const t = {
		type: 'element',
		tagName: 'strong',
		properties: {},
		children: e.all(n),
	};

	return e.patch(n, t), e.applyData(n, t);
}
function j0(e, n) {
	const t = e.all(n);
	const r = t.shift();
	const i = [];
	if (r) {
		const o = {
			type: 'element',
			tagName: 'thead',
			properties: {},
			children: e.wrap([r], !0),
		};
		e.patch(n.children[0], o), i.push(o);
	}
	if (t.length) {
		const o = {
			type: 'element',
			tagName: 'tbody',
			properties: {},
			children: e.wrap(t, !0),
		};
		const u = Qs(n.children[1]);
		const s = Ad(n.children[n.children.length - 1]);
		u && s && (o.position = {start: u, end: s}), i.push(o);
	}
	const l = {
		type: 'element',
		tagName: 'table',
		properties: {},
		children: e.wrap(i, !0),
	};

	return e.patch(n, l), e.applyData(n, l);
}
function B0(e, n, t) {
	const r = t ? t.children : void 0;
	const l = (r ? r.indexOf(n) : 1) === 0 ? 'th' : 'td';
	const o = t && t.type === 'table' ? t.align : void 0;
	const u = o ? o.length : n.children.length;
	let s = -1;
	const a = [];
	for (; ++s < u; ) {
		const f = n.children[s];
		const d = {};
		const p = o ? o[s] : void 0;
		p && (d.align = p);
		let x = {type: 'element', tagName: l, properties: d, children: []};
		f && ((x.children = e.all(f)), e.patch(f, x), (x = e.applyData(f, x))),
			a.push(x);
	}
	const c = {
		type: 'element',
		tagName: 'tr',
		properties: {},
		children: e.wrap(a, !0),
	};

	return e.patch(n, c), e.applyData(n, c);
}
function U0(e, n) {
	const t = {
		type: 'element',
		tagName: 'td',
		properties: {},
		children: e.all(n),
	};

	return e.patch(n, t), e.applyData(n, t);
}
const bc = 9;
const Qc = 32;
function H0(e) {
	const n = String(e);
	const t = /\r?\n|\r/g;
	let r = t.exec(n);
	let i = 0;
	const l = [];
	for (; r; ) {
		l.push(Kc(n.slice(i, r.index), i > 0, !0), r[0]),
			(i = r.index + r[0].length),
			(r = t.exec(n));
	}

	return l.push(Kc(n.slice(i), i > 0, !1)), l.join('');
}
function Kc(e, n, t) {
	let r = 0;
	let i = e.length;
	if (n) {
		let l = e.codePointAt(r);
		for (; l === bc || l === Qc; ) {
			r++, (l = e.codePointAt(r));
		}
	}
	if (t) {
		let l = e.codePointAt(i - 1);
		for (; l === bc || l === Qc; ) {
			i--, (l = e.codePointAt(i - 1));
		}
	}

	return i > r ? e.slice(r, i) : '';
}
function V0(e, n) {
	const t = {type: 'text', value: H0(String(n.value))};

	return e.patch(n, t), e.applyData(n, t);
}
function $0(e, n) {
	const t = {type: 'element', tagName: 'hr', properties: {}, children: []};

	return e.patch(n, t), e.applyData(n, t);
}
const W0 = {
	blockquote: k0,
	break: x0,
	code: w0,
	delete: S0,
	emphasis: E0,
	footnoteReference: C0,
	heading: _0,
	html: P0,
	imageReference: T0,
	image: I0,
	inlineCode: N0,
	linkReference: z0,
	link: L0,
	listItem: R0,
	list: M0,
	paragraph: D0,
	root: A0,
	strong: F0,
	table: j0,
	tableCell: U0,
	tableRow: B0,
	text: V0,
	thematicBreak: $0,
	toml: ji,
	yaml: ji,
	definition: ji,
	footnoteDefinition: ji,
};
function ji() {}
const rh = -1;
const Xl = 0;
const Yr = 1;
const Il = 2;
const Zs = 3;
const ea = 4;
const na = 5;
const ta = 6;
const ih = 7;
const lh = 8;
const Yc = typeof self === 'object' ? self : globalThis;
const b0 = (e, n) => {
	const t = (i, l) => (e.set(l, i), i);
	const r = (i) => {
		if (e.has(i)) {
			return e.get(i);
		}
		const [l, o] = n[i];
		switch (l) {
			case Xl:
			case rh:
				return t(o, i);
			case Yr: {
				const u = t([], i);
				for (const s of o) {
					u.push(r(s));
				}

				return u;
			}
			case Il: {
				const u = t({}, i);
				for (const [s, a] of o) {
					u[r(s)] = r(a);
				}

				return u;
			}
			case Zs:
				return t(new Date(o), i);
			case ea: {
				const {flags: s, source: u} = o;

				return t(new RegExp(u, s), i);
			}
			case na: {
				const u = t(new Map(), i);
				for (const [s, a] of o) {
					u.set(r(s), r(a));
				}

				return u;
			}
			case ta: {
				const u = t(new Set(), i);
				for (const s of o) {
					u.add(r(s));
				}

				return u;
			}
			case ih: {
				const {message: s, name: u} = o;

				return t(new Yc[u](s), i);
			}
			case lh:
				return t(BigInt(o), i);
			case 'BigInt':
				return t(Object(BigInt(o)), i);
			case 'ArrayBuffer':
				return t(new Uint8Array(o).buffer, o);
			case 'DataView': {
				const {buffer: u} = new Uint8Array(o);

				return t(new DataView(u), o);
			}
		}

		return t(new Yc[l](o), i);
	};

	return r;
};
const Xc = (e) => b0(new Map(), e)(0);
const Rt = '';
const {toString: Q0} = {};
const {keys: K0} = Object;
const Tr = (e) => {
	const n = typeof e;
	if (n !== 'object' || !e) {
		return [Xl, n];
	}
	const t = Q0.call(e).slice(8, -1);
	switch (t) {
		case 'Array':
			return [Yr, Rt];
		case 'Object':
			return [Il, Rt];
		case 'Date':
			return [Zs, Rt];
		case 'RegExp':
			return [ea, Rt];
		case 'Map':
			return [na, Rt];
		case 'Set':
			return [ta, Rt];
		case 'DataView':
			return [Yr, t];
	}

	return t.includes('Array')
		? [Yr, t]
		: t.includes('Error')
			? [ih, t]
			: [Il, t];
};
const Bi = ([e, n]) => e === Xl && (n === 'function' || n === 'symbol');
const Y0 = (e, n, t, r) => {
	const i = (o, u) => {
		const s = r.push(o) - 1;

		return t.set(u, s), s;
	};
	const l = (o) => {
		if (t.has(o)) {
			return t.get(o);
		}
		let [u, s] = Tr(o);
		switch (u) {
			case Xl: {
				let c = o;
				switch (s) {
					case 'bigint':
						(u = lh), (c = o.toString());
						break;
					case 'function':
					case 'symbol':
						if (e) {
							throw new TypeError('unable to serialize ' + s);
						}
						c = null;
						break;
					case 'undefined':
						return i([rh], o);
				}

				return i([u, c], o);
			}
			case Yr: {
				if (s) {
					let d = o;

					return (
						s === 'DataView'
							? (d = new Uint8Array(o.buffer))
							: s === 'ArrayBuffer' && (d = new Uint8Array(o)),
						i([s, [...d]], o)
					);
				}
				const c = [];
				const f = i([u, c], o);
				for (const d of o) {
					c.push(l(d));
				}

				return f;
			}
			case Il: {
				if (s) {
					switch (s) {
						case 'BigInt':
							return i([s, o.toString()], o);
						case 'Boolean':
						case 'Number':
						case 'String':
							return i([s, o.valueOf()], o);
					}
				}
				if (n && 'toJSON' in o) {
					return l(o.toJSON());
				}
				const c = [];
				const f = i([u, c], o);
				for (const d of K0(o)) {
					(e || !Bi(Tr(o[d]))) && c.push([l(d), l(o[d])]);
				}

				return f;
			}
			case Zs:
				return i([u, o.toISOString()], o);
			case ea: {
				const {flags: f, source: c} = o;

				return i([u, {source: c, flags: f}], o);
			}
			case na: {
				const c = [];
				const f = i([u, c], o);
				for (const [d, p] of o) {
					(e || !(Bi(Tr(d)) || Bi(Tr(p)))) && c.push([l(d), l(p)]);
				}

				return f;
			}
			case ta: {
				const c = [];
				const f = i([u, c], o);
				for (const d of o) {
					(e || !Bi(Tr(d))) && c.push(l(d));
				}

				return f;
			}
		}
		const {message: a} = o;

		return i([u, {name: s, message: a}], o);
	};

	return l;
};
const Gc = (e, {json: n, lossy: t} = {}) => {
	const r = [];

	return Y0(!(n || t), !!n, new Map(), r)(e), r;
};
const Nl =
	typeof structuredClone === 'function'
		? (e, n) =>
				n && ('json' in n || 'lossy' in n)
					? Xc(Gc(e, n))
					: structuredClone(e)
		: (e, n) => Xc(Gc(e, n));
function X0(e, n) {
	const t = [{type: 'text', value: '↩'}];

	return (
		n > 1 &&
			t.push({
				type: 'element',
				tagName: 'sup',
				properties: {},
				children: [{type: 'text', value: String(n)}],
			}),
		t
	);
}
function G0(e, n) {
	return 'Back to reference ' + (e + 1) + (n > 1 ? '-' + n : '');
}
function q0(e) {
	const n =
		typeof e.options.clobberPrefix === 'string'
			? e.options.clobberPrefix
			: 'user-content-';
	const t = e.options.footnoteBackContent || X0;
	const r = e.options.footnoteBackLabel || G0;
	const i = e.options.footnoteLabel || 'Footnotes';
	const l = e.options.footnoteLabelTagName || 'h2';
	const o = e.options.footnoteLabelProperties || {className: ['sr-only']};
	const u = [];
	let s = -1;
	for (; ++s < e.footnoteOrder.length; ) {
		const a = e.footnoteById.get(e.footnoteOrder[s]);
		if (!a) {
			continue;
		}
		const c = e.all(a);
		const f = String(a.identifier).toUpperCase();
		const d = mr(f.toLowerCase());
		let p = 0;
		const x = [];
		const k = e.footnoteCounts.get(f);
		for (; k !== void 0 && ++p <= k; ) {
			!!x.length && x.push({type: 'text', value: ' '});
			let m = typeof t === 'string' ? t : t(s, p);
			typeof m === 'string' && (m = {type: 'text', value: m}),
				x.push({
					type: 'element',
					tagName: 'a',
					properties: {
						href: '#' + n + 'fnref-' + d + (p > 1 ? '-' + p : ''),
						dataFootnoteBackref: '',
						ariaLabel: typeof r === 'string' ? r : r(s, p),
						className: ['data-footnote-backref'],
					},
					children: Array.isArray(m) ? m : [m],
				});
		}
		const C = c[c.length - 1];
		if (C && C.type === 'element' && C.tagName === 'p') {
			const m = C.children[C.children.length - 1];
			m && m.type === 'text'
				? (m.value += ' ')
				: C.children.push({type: 'text', value: ' '}),
				C.children.push(...x);
		}
		else {
			c.push(...x);
		}
		const h = {
			type: 'element',
			tagName: 'li',
			properties: {id: n + 'fn-' + d},
			children: e.wrap(c, !0),
		};
		e.patch(a, h), u.push(h);
	}
	if (u.length !== 0) {
		return {
			type: 'element',
			tagName: 'section',
			properties: {dataFootnotes: !0, className: ['footnotes']},
			children: [
				{
					type: 'element',
					tagName: l,
					properties: {...Nl(o), id: 'footnote-label'},
					children: [{type: 'text', value: i}],
				},
				{
					type: 'text',
					value: `
`,
				},
				{
					type: 'element',
					tagName: 'ol',
					properties: {},
					children: e.wrap(u, !0),
				},
				{
					type: 'text',
					value: `
`,
				},
			],
		};
	}
}
const oh = function (e) {
	if (e == null) {
		return nk;
	}
	if (typeof e === 'function') {
		return Gl(e);
	}
	if (typeof e === 'object') {
		return Array.isArray(e) ? J0(e) : Z0(e);
	}
	if (typeof e === 'string') {
		return ek(e);
	}
	throw new Error('Expected function, string, or object as test');
};
function J0(e) {
	const n = [];
	let t = -1;
	for (; ++t < e.length; ) {
		n[t] = oh(e[t]);
	}

	return Gl(r);
	function r(...i) {
		let l = -1;
		for (; ++l < n.length; ) {
			if (n[l].apply(this, i)) {
				return !0;
			}
		}

		return !1;
	}
}
function Z0(e) {
	const n = e;

	return Gl(t);
	function t(r) {
		const i = r;
		let l;
		for (l in e) {
			if (i[l] !== n[l]) {
				return !1;
			}
		}

		return !0;
	}
}
function ek(e) {
	return Gl(n);
	function n(t) {
		return t && t.type === e;
	}
}
function Gl(e) {
	return n;
	function n(t, r, i) {
		return !!(
			tk(t) &&
			e.call(this, t, typeof r === 'number' ? r : void 0, i || void 0)
		);
	}
}
function nk() {
	return !0;
}
function tk(e) {
	return e !== null && typeof e === 'object' && 'type' in e;
}
const uh = [];
const rk = !0;
const qc = !1;
const ik = 'skip';
function lk(e, n, t, r) {
	let i;
	typeof n === 'function' && typeof t !== 'function'
		? ((r = t), (t = n))
		: (i = n);
	const l = oh(i);
	const o = r ? -1 : 1;
	u(e, void 0, [])();
	function u(s, a, c) {
		const f = s && typeof s === 'object' ? s : {};
		if (typeof f.type === 'string') {
			const p =
				typeof f.tagName === 'string'
					? f.tagName
					: typeof f.name === 'string'
						? f.name
						: void 0;
			Object.defineProperty(d, 'name', {
				value: 'node (' + (s.type + (p ? '<' + p + '>' : '')) + ')',
			});
		}

		return d;
		function d() {
			let p = uh;
			let x;
			let k;
			let C;
			if (
				(!n || l(s, a, c[c.length - 1] || void 0)) &&
				((p = ok(t(s, c))), p[0] === qc)
			) {
				return p;
			}
			if ('children' in s && s.children) {
				const h = s;
				if (h.children && p[0] !== ik) {
					for (
						k = (r ? h.children.length : -1) + o, C = c.concat(h);
						k > -1 && k < h.children.length;

					) {
						const m = h.children[k];
						if (((x = u(m, k, C)()), x[0] === qc)) {
							return x;
						}
						k = typeof x[1] === 'number' ? x[1] : k + o;
					}
				}
			}

			return p;
		}
	}
}
function ok(e) {
	return Array.isArray(e)
		? e
		: typeof e === 'number'
			? [rk, e]
			: e == null
				? uh
				: [e];
}
function sh(e, n, t, r) {
	let i;
	let l;
	let o;
	typeof n === 'function' && typeof t !== 'function'
		? ((l = void 0), (o = n), (i = t))
		: ((l = n), (o = t), (i = r)),
		lk(e, l, u, i);
	function u(s, a) {
		const c = a[a.length - 1];
		const f = c ? c.children.indexOf(s) : void 0;

		return o(s, f, c);
	}
}
const Wu = {}.hasOwnProperty;
const uk = {};
function sk(e, n) {
	const t = n || uk;
	const r = new Map();
	const i = new Map();
	const l = new Map();
	const o = {...W0, ...t.handlers};
	const u = {
		all: a,
		applyData: ck,
		definitionById: r,
		footnoteById: i,
		footnoteCounts: l,
		footnoteOrder: [],
		handlers: o,
		one: s,
		options: t,
		patch: ak,
		wrap: pk,
	};

	return (
		sh(e, (c) => {
			if (c.type === 'definition' || c.type === 'footnoteDefinition') {
				const f = c.type === 'definition' ? r : i;
				const d = String(c.identifier).toUpperCase();
				f.has(d) || f.set(d, c);
			}
		}),
		u
	);
	function s(c, f) {
		const d = c.type;
		const p = u.handlers[d];
		if (Wu.call(u.handlers, d) && p) {
			return p(u, c, f);
		}
		if (u.options.passThrough && u.options.passThrough.includes(d)) {
			if ('children' in c) {
				const {children: k, ...C} = c;
				const h = Nl(C);

				return (h.children = u.all(c)), h;
			}

			return Nl(c);
		}

		return (u.options.unknownHandler || fk)(u, c, f);
	}
	function a(c) {
		const f = [];
		if ('children' in c) {
			const d = c.children;
			let p = -1;
			for (; ++p < d.length; ) {
				const x = u.one(d[p], c);
				if (x) {
					if (
						p &&
						d[p - 1].type === 'break' &&
						(!Array.isArray(x) &&
							x.type === 'text' &&
							(x.value = Jc(x.value)),
						!Array.isArray(x) && x.type === 'element')
					) {
						const k = x.children[0];
						k && k.type === 'text' && (k.value = Jc(k.value));
					}
					Array.isArray(x) ? f.push(...x) : f.push(x);
				}
			}
		}

		return f;
	}
}
function ak(e, n) {
	e.position && (n.position = Qy(e));
}
function ck(e, n) {
	let t = n;
	if (e && e.data) {
		const r = e.data.hName;
		const i = e.data.hChildren;
		const l = e.data.hProperties;
		if (typeof r === 'string') {
			if (t.type === 'element') {
				t.tagName = r;
			}
			else {
				const o = 'children' in t ? t.children : [t];
				t = {type: 'element', tagName: r, properties: {}, children: o};
			}
		}
		t.type === 'element' && l && Object.assign(t.properties, Nl(l)),
			'children' in t &&
				t.children &&
				i !== null &&
				i !== void 0 &&
				(t.children = i);
	}

	return t;
}
function fk(e, n) {
	const t = n.data || {};
	const r =
		'value' in n && !(Wu.call(t, 'hProperties') || Wu.call(t, 'hChildren'))
			? {type: 'text', value: n.value}
			: {
					type: 'element',
					tagName: 'div',
					properties: {},
					children: e.all(n),
				};

	return e.patch(n, r), e.applyData(n, r);
}
function pk(e, n) {
	const t = [];
	let r = -1;
	for (
		n &&
		t.push({
			type: 'text',
			value: `
`,
		});
		++r < e.length;

	) {
		r &&
			t.push({
				type: 'text',
				value: `
`,
			}),
			t.push(e[r]);
	}

	return (
		n &&
			!!e.length &&
			t.push({
				type: 'text',
				value: `
`,
			}),
		t
	);
}
function Jc(e) {
	let n = 0;
	let t = e.charCodeAt(n);
	for (; t === 9 || t === 32; ) {
		n++, (t = e.charCodeAt(n));
	}

	return e.slice(n);
}
function Zc(e, n) {
	const t = sk(e, n);
	const r = t.one(e, void 0);
	const i = q0(t);
	const l = Array.isArray(r)
		? {type: 'root', children: r}
		: r || {type: 'root', children: []};

	return (
		i &&
			l.children.push(
				{
					type: 'text',
					value: `
`,
				},
				i
			),
		l
	);
}
function dk(e, n) {
	return e && 'run' in e
		? async function (t, r) {
				const i = Zc(t, {file: r, ...n});
				await e.run(i, r);
			}
		: function (t, r) {
				return Zc(t, {file: r, ...(e || n)});
			};
}
function ef(e) {
	if (e) {
		throw e;
	}
}
const nl = Object.prototype.hasOwnProperty;
const ah = Object.prototype.toString;
const nf = Object.defineProperty;
const tf = Object.getOwnPropertyDescriptor;
const rf = function (n) {
	return typeof Array.isArray === 'function'
		? Array.isArray(n)
		: ah.call(n) === '[object Array]';
};
const lf = function (n) {
	if (!n || ah.call(n) !== '[object Object]') {
		return !1;
	}
	const t = nl.call(n, 'constructor');
	const r =
		n.constructor &&
		n.constructor.prototype &&
		nl.call(n.constructor.prototype, 'isPrototypeOf');
	if (n.constructor && !t && !r) {
		return !1;
	}
	let i;
	for (i in n) {
	}

	return typeof i > 'u' || nl.call(n, i);
};
const of = function (n, t) {
	nf && t.name === '__proto__'
		? nf(n, t.name, {
				enumerable: !0,
				configurable: !0,
				value: t.newValue,
				writable: !0,
			})
		: (n[t.name] = t.newValue);
};
const uf = function (n, t) {
	if (t === '__proto__') {
		if (nl.call(n, t)) {
			if (tf) {
				return tf(n, t).value;
			}
		}
		else {
			return;
		}
	}

	return n[t];
};
const hk = function e() {
	let n;
	let t;
	let r;
	let i;
	let l;
	let o;
	let u = arguments[0];
	let s = 1;
	const a = arguments.length;
	let c = !1;
	for (
		typeof u === 'boolean' && ((c = u), (u = arguments[1] || {}), (s = 2)),
			(u == null || (typeof u !== 'object' && typeof u !== 'function')) &&
				(u = {});
		s < a;
		++s
	) {
		if (((n = arguments[s]), n != null)) {
			for (t in n) {
				(r = uf(u, t)),
					(i = uf(n, t)),
					u !== i &&
						(c && i && (lf(i) || (l = rf(i)))
							? (l
									? ((l = !1), (o = r && rf(r) ? r : []))
									: (o = r && lf(r) ? r : {}),
								of(u, {name: t, newValue: e(c, o, i)}))
							: typeof i < 'u' && of(u, {name: t, newValue: i}));
			}
		}
	}

	return u;
};
const No = hf(hk);
function bu(e) {
	if (typeof e !== 'object' || e === null) {
		return !1;
	}
	const n = Object.getPrototypeOf(e);

	return (
		(n === null ||
			n === Object.prototype ||
			Object.getPrototypeOf(n) === null) &&
		!(Symbol.toStringTag in e) &&
		!(Symbol.iterator in e)
	);
}
function mk() {
	const e = [];
	const n = {run: t, use: r};

	return n;
	function t(...i) {
		let l = -1;
		const o = i.pop();
		if (typeof o !== 'function') {
			throw new TypeError('Expected function as last argument, not ' + o);
		}
		u(null, ...i);
		function u(s, ...a) {
			const c = e[++l];
			let f = -1;
			if (s) {
				o(s);

				return;
			}
			for (; ++f < i.length; ) {
				(a[f] === null || a[f] === void 0) && (a[f] = i[f]);
			}
			(i = a), c ? gk(c, u)(...a) : o(null, ...a);
		}
	}
	function r(i) {
		if (typeof i !== 'function') {
			throw new TypeError(
				'Expected `middelware` to be a function, not ' + i
			);
		}

		return e.push(i), n;
	}
}
function gk(e, n) {
	let t;

	return r;
	function r(...o) {
		const u = e.length > o.length;
		let s;
		u && o.push(i);
		try {
			s = e.apply(this, o);
		}
		catch (a) {
			const c = a;
			if (u && t) {
				throw c;
			}

			return i(c);
		}
		u ||
			(s && s.then && typeof s.then === 'function'
				? s.then(l, i)
				: s instanceof Error
					? i(s)
					: l(s));
	}
	function i(o, ...u) {
		t || ((t = !0), n(o, ...u));
	}
	function l(o) {
		i(null, o);
	}
}
const wn = {basename: yk, dirname: vk, extname: kk, join: xk, sep: '/'};
function yk(e, n) {
	if (n !== void 0 && typeof n !== 'string') {
		throw new TypeError('"ext" argument must be a string');
	}
	ki(e);
	let t = 0;
	let r = -1;
	let i = e.length;
	let l;
	if (n === void 0 || !n.length || n.length > e.length) {
		for (; i--; ) {
			if (e.codePointAt(i) === 47) {
				if (l) {
					t = i + 1;
					break;
				}
			}
			else {
				r < 0 && ((l = !0), (r = i + 1));
			}
		}

		return r < 0 ? '' : e.slice(t, r);
	}
	if (n === e) {
		return '';
	}
	let o = -1;
	let u = n.length - 1;
	for (; i--; ) {
		if (e.codePointAt(i) === 47) {
			if (l) {
				t = i + 1;
				break;
			}
		}
		else {
			o < 0 && ((l = !0), (o = i + 1)),
				u > -1 &&
					(e.codePointAt(i) === n.codePointAt(u--)
						? u < 0 && (r = i)
						: ((u = -1), (r = o)));
		}
	}

	return t === r ? (r = o) : r < 0 && (r = e.length), e.slice(t, r);
}
function vk(e) {
	if ((ki(e), !e.length)) {
		return '.';
	}
	let n = -1;
	let t = e.length;
	let r;
	for (; --t; ) {
		if (e.codePointAt(t) === 47) {
			if (r) {
				n = t;
				break;
			}
		}
		else {
			r || (r = !0);
		}
	}

	return n < 0
		? e.codePointAt(0) === 47
			? '/'
			: '.'
		: n === 1 && e.codePointAt(0) === 47
			? '//'
			: e.slice(0, n);
}
function kk(e) {
	ki(e);
	let n = e.length;
	let t = -1;
	let r = 0;
	let i = -1;
	let l = 0;
	let o;
	for (; n--; ) {
		const u = e.codePointAt(n);
		if (u === 47) {
			if (o) {
				r = n + 1;
				break;
			}
			continue;
		}
		t < 0 && ((o = !0), (t = n + 1)),
			u === 46
				? i < 0
					? (i = n)
					: l !== 1 && (l = 1)
				: i > -1 && (l = -1);
	}

	return i < 0 || t < 0 || l === 0 || (l === 1 && i === t - 1 && i === r + 1)
		? ''
		: e.slice(i, t);
}
function xk(...e) {
	let n = -1;
	let t;
	for (; ++n < e.length; ) {
		ki(e[n]), e[n] && (t = t === void 0 ? e[n] : t + '/' + e[n]);
	}

	return t === void 0 ? '.' : wk(t);
}
function wk(e) {
	ki(e);
	const n = e.codePointAt(0) === 47;
	let t = Sk(e, !n);

	return (
		!t.length && !n && (t = '.'),
		!!t.length && e.codePointAt(e.length - 1) === 47 && (t += '/'),
		n ? '/' + t : t
	);
}
function Sk(e, n) {
	let t = '';
	let r = 0;
	let i = -1;
	let l = 0;
	let o = -1;
	let u;
	let s;
	for (; ++o <= e.length; ) {
		if (o < e.length) {
			u = e.codePointAt(o);
		}
		else {
			if (u === 47) {
				break;
			}
			u = 47;
		}
		if (u === 47) {
			if (!(i === o - 1 || l === 1)) {
				if (i !== o - 1 && l === 2) {
					if (
						t.length < 2 ||
						r !== 2 ||
						t.codePointAt(t.length - 1) !== 46 ||
						t.codePointAt(t.length - 2) !== 46
					) {
						if (t.length > 2) {
							if (
								((s = t.lastIndexOf('/')), s !== t.length - 1)
							) {
								s < 0
									? ((t = ''), (r = 0))
									: ((t = t.slice(0, s)),
										(r =
											t.length - 1 - t.lastIndexOf('/'))),
									(i = o),
									(l = 0);
								continue;
							}
						}
						else if (t.length) {
							(t = ''), (r = 0), (i = o), (l = 0);
							continue;
						}
					}
					n && ((t = t.length ? t + '/..' : '..'), (r = 2));
				}
				else {
					t.length
						? (t += '/' + e.slice(i + 1, o))
						: (t = e.slice(i + 1, o)),
						(r = o - i - 1);
				}
			}
			(i = o), (l = 0);
		}
		else {
			u === 46 && l > -1 ? l++ : (l = -1);
		}
	}

	return t;
}
function ki(e) {
	if (typeof e !== 'string') {
		throw new TypeError(
			'Path must be a string. Received ' + JSON.stringify(e)
		);
	}
}
const Ek = {cwd: Ck};
function Ck() {
	return '/';
}
function Qu(e) {
	return !!(
		e !== null &&
		typeof e === 'object' &&
		'href' in e &&
		e.href &&
		'protocol' in e &&
		e.protocol &&
		e.auth === void 0
	);
}
function _k(e) {
	if (typeof e === 'string') {
		e = new URL(e);
	}
	else if (!Qu(e)) {
		const n = new TypeError(
			'The "path" argument must be of type string or an instance of URL. Received `' +
				e +
				'`'
		);
		throw ((n.code = 'ERR_INVALID_ARG_TYPE'), n);
	}
	if (e.protocol !== 'file:') {
		const n = new TypeError('The URL must be of scheme file');
		throw ((n.code = 'ERR_INVALID_URL_SCHEME'), n);
	}

	return Pk(e);
}
function Pk(e) {
	if (e.hostname !== '') {
		const r = new TypeError(
			'File URL host must be "localhost" or empty on darwin'
		);
		throw ((r.code = 'ERR_INVALID_FILE_URL_HOST'), r);
	}
	const n = e.pathname;
	let t = -1;
	for (; ++t < n.length; ) {
		if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
			const r = n.codePointAt(t + 2);
			if (r === 70 || r === 102) {
				const i = new TypeError(
					'File URL path must not include encoded / characters'
				);
				throw ((i.code = 'ERR_INVALID_FILE_URL_PATH'), i);
			}
		}
	}

	return decodeURIComponent(n);
}
const zo = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];
class ch {
	constructor(n) {
		let t;
		n
			? Qu(n)
				? (t = {path: n})
				: typeof n === 'string' || Tk(n)
					? (t = {value: n})
					: (t = n)
			: (t = {}),
			(this.cwd = 'cwd' in t ? '' : Ek.cwd()),
			(this.data = {}),
			(this.history = []),
			(this.messages = []),
			this.value,
			this.map,
			this.result,
			this.stored;
		let r = -1;
		for (; ++r < zo.length; ) {
			const l = zo[r];
			l in t &&
				t[l] !== void 0 &&
				t[l] !== null &&
				(this[l] = l === 'history' ? [...t[l]] : t[l]);
		}
		let i;
		for (i in t) {
			zo.includes(i) || (this[i] = t[i]);
		}
	}
	get basename() {
		return typeof this.path === 'string' ? wn.basename(this.path) : void 0;
	}
	set basename(n) {
		Ro(n, 'basename'),
			Lo(n, 'basename'),
			(this.path = wn.join(this.dirname || '', n));
	}
	get dirname() {
		return typeof this.path === 'string' ? wn.dirname(this.path) : void 0;
	}
	set dirname(n) {
		sf(this.basename, 'dirname'),
			(this.path = wn.join(n || '', this.basename));
	}
	get extname() {
		return typeof this.path === 'string' ? wn.extname(this.path) : void 0;
	}
	set extname(n) {
		if ((Lo(n, 'extname'), sf(this.dirname, 'extname'), n)) {
			if (n.codePointAt(0) !== 46) {
				throw new Error('`extname` must start with `.`');
			}
			if (n.includes('.', 1)) {
				throw new Error('`extname` cannot contain multiple dots');
			}
		}
		this.path = wn.join(this.dirname, this.stem + (n || ''));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(n) {
		Qu(n) && (n = _k(n)),
			Ro(n, 'path'),
			this.path !== n && this.history.push(n);
	}
	get stem() {
		return typeof this.path === 'string'
			? wn.basename(this.path, this.extname)
			: void 0;
	}
	set stem(n) {
		Ro(n, 'stem'),
			Lo(n, 'stem'),
			(this.path = wn.join(this.dirname || '', n + (this.extname || '')));
	}
	fail(n, t, r) {
		const i = this.message(n, t, r);
		throw ((i.fatal = !0), i);
	}
	info(n, t, r) {
		const i = this.message(n, t, r);

		return (i.fatal = void 0), i;
	}
	message(n, t, r) {
		const i = new Le(n, t, r);

		return (
			this.path &&
				((i.name = this.path + ':' + i.name), (i.file = this.path)),
			(i.fatal = !1),
			this.messages.push(i),
			i
		);
	}
	toString(n) {
		return this.value === void 0
			? ''
			: typeof this.value === 'string'
				? this.value
				: new TextDecoder(n || void 0).decode(this.value);
	}
}
function Lo(e, n) {
	if (e && e.includes(wn.sep)) {
		throw new Error(
			'`' + n + '` cannot be a path: did not expect `' + wn.sep + '`'
		);
	}
}
function Ro(e, n) {
	if (!e) {
		throw new Error('`' + n + '` cannot be empty');
	}
}
function sf(e, n) {
	if (!e) {
		throw new Error('Setting `' + n + '` requires `path` to be set too');
	}
}
function Tk(e) {
	return !!(
		e &&
		typeof e === 'object' &&
		'byteLength' in e &&
		'byteOffset' in e
	);
}
const Ik = function (e) {
	const r = this.constructor.prototype;
	const i = r[e];
	const l = function () {
		return i.apply(l, arguments);
	};

	return Object.setPrototypeOf(l, r), l;
};
const Nk = {}.hasOwnProperty;
class ra extends Ik {
	constructor() {
		super('copy'),
			(this.Compiler = void 0),
			(this.Parser = void 0),
			(this.attachers = []),
			(this.compiler = void 0),
			(this.freezeIndex = -1),
			(this.frozen = void 0),
			(this.namespace = {}),
			(this.parser = void 0),
			(this.transformers = mk());
	}
	copy() {
		const n = new ra();
		let t = -1;
		for (; ++t < this.attachers.length; ) {
			const r = this.attachers[t];
			n.use(...r);
		}

		return n.data(No(!0, {}, this.namespace)), n;
	}
	data(n, t) {
		return typeof n === 'string'
			? arguments.length === 2
				? (Do('data', this.frozen), (this.namespace[n] = t), this)
				: (Nk.call(this.namespace, n) && this.namespace[n]) || void 0
			: n
				? (Do('data', this.frozen), (this.namespace = n), this)
				: this.namespace;
	}
	freeze() {
		if (this.frozen) {
			return this;
		}
		const n = this;
		for (; ++this.freezeIndex < this.attachers.length; ) {
			const [t, ...r] = this.attachers[this.freezeIndex];
			if (r[0] === !1) {
				continue;
			}
			r[0] === !0 && (r[0] = void 0);
			const i = t.call(n, ...r);
			typeof i === 'function' && this.transformers.use(i);
		}

		return (
			(this.frozen = !0),
			(this.freezeIndex = Number.POSITIVE_INFINITY),
			this
		);
	}
	parse(n) {
		this.freeze();
		const t = Ui(n);
		const r = this.parser || this.Parser;

		return Oo('parse', r), r(String(t), t);
	}
	process(n, t) {
		const r = this;

		return (
			this.freeze(),
			Oo('process', this.parser || this.Parser),
			Mo('process', this.compiler || this.Compiler),
			t ? i(void 0, t) : new Promise(i)
		);
		function i(l, o) {
			const u = Ui(n);
			const s = r.parse(u);
			r.run(s, u, (c, f, d) => {
				if (c || !f || !d) {
					return a(c);
				}
				const p = f;
				const x = r.stringify(p, d);
				Rk(x) ? (d.value = x) : (d.result = x), a(c, d);
			});
			function a(c, f) {
				c || !f ? o(c) : l ? l(f) : t(void 0, f);
			}
		}
	}
	processSync(n) {
		let t = !1;
		let r;

		return (
			this.freeze(),
			Oo('processSync', this.parser || this.Parser),
			Mo('processSync', this.compiler || this.Compiler),
			this.process(n, i),
			cf('processSync', 'process', t),
			r
		);
		function i(l, o) {
			(t = !0), ef(l), (r = o);
		}
	}
	run(n, t, r) {
		af(n), this.freeze();
		const i = this.transformers;

		return (
			!r && typeof t === 'function' && ((r = t), (t = void 0)),
			r ? l(void 0, r) : new Promise(l)
		);
		function l(o, u) {
			const s = Ui(t);
			i.run(n, s, a);
			function a(c, f, d) {
				const p = f || n;
				c ? u(c) : o ? o(p) : r(void 0, p, d);
			}
		}
	}
	runSync(n, t) {
		let r = !1;
		let i;

		return this.run(n, t, l), cf('runSync', 'run', r), i;
		function l(o, u) {
			ef(o), (i = u), (r = !0);
		}
	}
	stringify(n, t) {
		this.freeze();
		const r = Ui(t);
		const i = this.compiler || this.Compiler;

		return Mo('stringify', i), af(n), i(n, r);
	}
	use(n, ...t) {
		const r = this.attachers;
		const i = this.namespace;
		if ((Do('use', this.frozen), n != null)) {
			if (typeof n === 'function') {
				s(n, t);
			}
			else if (typeof n === 'object') {
				Array.isArray(n) ? u(n) : o(n);
			}
			else {
				throw new TypeError('Expected usable value, not `' + n + '`');
			}
		}

		return this;
		function l(a) {
			if (typeof a === 'function') {
				s(a, []);
			}
			else if (typeof a === 'object') {
				if (Array.isArray(a)) {
					const [c, ...f] = a;
					s(c, f);
				}
				else {
					o(a);
				}
			}
			else {
				throw new TypeError('Expected usable value, not `' + a + '`');
			}
		}
		function o(a) {
			if (!('plugins' in a) && !('settings' in a)) {
				throw new Error(
					'Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither'
				);
			}
			u(a.plugins),
				a.settings && (i.settings = No(!0, i.settings, a.settings));
		}
		function u(a) {
			let c = -1;
			if (a != null) {
				if (Array.isArray(a)) {
					for (; ++c < a.length; ) {
						const f = a[c];
						l(f);
					}
				}
				else {
					throw new TypeError(
						'Expected a list of plugins, not `' + a + '`'
					);
				}
			}
		}
		function s(a, c) {
			let f = -1;
			let d = -1;
			for (; ++f < r.length; ) {
				if (r[f][0] === a) {
					d = f;
					break;
				}
			}
			if (d === -1) {
				r.push([a, ...c]);
			}
			else if (c.length) {
				let [p, ...x] = c;
				const k = r[d][1];
				bu(k) && bu(p) && (p = No(!0, k, p)), (r[d] = [a, p, ...x]);
			}
		}
	}
}
const zk = new ra().freeze();
function Oo(e, n) {
	if (typeof n !== 'function') {
		throw new TypeError('Cannot `' + e + '` without `parser`');
	}
}
function Mo(e, n) {
	if (typeof n !== 'function') {
		throw new TypeError('Cannot `' + e + '` without `compiler`');
	}
}
function Do(e, n) {
	if (n) {
		throw new Error(
			'Cannot call `' +
				e +
				'` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
		);
	}
}
function af(e) {
	if (!bu(e) || typeof e.type !== 'string') {
		throw new TypeError('Expected node, got `' + e + '`');
	}
}
function cf(e, n, t) {
	if (!t) {
		throw new Error('`' + e + '` finished async. Use `' + n + '` instead');
	}
}
function Ui(e) {
	return Lk(e) ? e : new ch(e);
}
function Lk(e) {
	return !!(e && typeof e === 'object' && 'message' in e && 'messages' in e);
}
function Rk(e) {
	return typeof e === 'string' || Ok(e);
}
function Ok(e) {
	return !!(
		e &&
		typeof e === 'object' &&
		'byteLength' in e &&
		'byteOffset' in e
	);
}
const Mk = 'https://github.com/remarkjs/react-markdown/blob/main/changelog.md';
const ff = [];
const pf = {allowDangerousHtml: !0};
const Dk = /^(https?|ircs?|mailto|xmpp)$/i;
const Ak = [
	{from: 'astPlugins', id: 'remove-buggy-html-in-markdown-parser'},
	{
		from: 'allowDangerousHtml',
		id: 'remove-buggy-html-in-markdown-parser',
	},
	{
		from: 'allowNode',
		id: 'replace-allownode-allowedtypes-and-disallowedtypes',
		to: 'allowElement',
	},
	{
		from: 'allowedTypes',
		id: 'replace-allownode-allowedtypes-and-disallowedtypes',
		to: 'allowedElements',
	},
	{from: 'className', id: 'remove-classname'},
	{
		from: 'disallowedTypes',
		id: 'replace-allownode-allowedtypes-and-disallowedtypes',
		to: 'disallowedElements',
	},
	{from: 'escapeHtml', id: 'remove-buggy-html-in-markdown-parser'},
	{from: 'includeElementIndex', id: '#remove-includeelementindex'},
	{
		from: 'includeNodeIndex',
		id: 'change-includenodeindex-to-includeelementindex',
	},
	{from: 'linkTarget', id: 'remove-linktarget'},
	{
		from: 'plugins',
		id: 'change-plugins-to-remarkplugins',
		to: 'remarkPlugins',
	},
	{from: 'rawSourcePos', id: '#remove-rawsourcepos'},
	{
		from: 'renderers',
		id: 'change-renderers-to-components',
		to: 'components',
	},
	{from: 'source', id: 'change-source-to-children', to: 'children'},
	{from: 'sourcePos', id: '#remove-sourcepos'},
	{
		from: 'transformImageUri',
		id: '#add-urltransform',
		to: 'urlTransform',
	},
	{from: 'transformLinkUri', id: '#add-urltransform', to: 'urlTransform'},
];
function Fk(e) {
	const n = jk(e);
	const t = Bk(e);

	return Uk(n.runSync(n.parse(t), t), e);
}
function jk(e) {
	const n = e.rehypePlugins || ff;
	const t = e.remarkPlugins || ff;
	const r = e.remarkRehypeOptions ? {...e.remarkRehypeOptions, ...pf} : pf;

	return zk().use(v0).use(t).use(dk, r).use(n);
}
function Bk(e) {
	const n = e.children || '';
	const t = new ch();

	return typeof n === 'string' && (t.value = n), t;
}
function Uk(e, n) {
	const t = n.allowedElements;
	const r = n.allowElement;
	const i = n.components;
	const l = n.disallowedElements;
	const o = n.skipHtml;
	const u = n.unwrapDisallowed;
	const s = n.urlTransform || Hk;
	for (const c of Ak) {
		Object.hasOwn(n, c.from) &&
			('' +
				c.from +
				(c.to ? 'use `' + c.to + '` instead' : 'remove it') +
				Mk +
				c.id,
			void 0);
	}

	return (
		sh(e, a),
		qy(e, {
			Fragment: R.Fragment,
			components: i,
			ignoreInvalidStyle: !0,
			jsx: R.jsx,
			jsxs: R.jsxs,
			passKeys: !0,
			passNode: !0,
		})
	);
	function a(c, f, d) {
		if (c.type === 'raw' && d && typeof f === 'number') {
			return (
				o
					? d.children.splice(f, 1)
					: (d.children[f] = {type: 'text', value: c.value}),
				f
			);
		}
		if (c.type === 'element') {
			let p;
			for (p in Po) {
				if (Object.hasOwn(Po, p) && Object.hasOwn(c.properties, p)) {
					const x = c.properties[p];
					const k = Po[p];
					(k === null || k.includes(c.tagName)) &&
						(c.properties[p] = s(String(x || ''), p, c));
				}
			}
		}
		if (c.type === 'element') {
			let p = t ? !t.includes(c.tagName) : l ? l.includes(c.tagName) : !1;
			if (
				(!p && r && typeof f === 'number' && (p = !r(c, f, d)),
				p && d && typeof f === 'number')
			) {
				return (
					u && c.children
						? d.children.splice(f, 1, ...c.children)
						: d.children.splice(f, 1),
					f
				);
			}
		}
	}
}
function Hk(e) {
	const n = e.indexOf(':');
	const t = e.indexOf('?');
	const r = e.indexOf('#');
	const i = e.indexOf('/');

	return n === -1 ||
		(i !== -1 && n > i) ||
		(t !== -1 && n > t) ||
		(r !== -1 && n > r) ||
		Dk.test(e.slice(0, n))
		? e
		: '';
}
function Vk() {
	return R.jsx('svg', {
		'aria-hidden': 'true',
		'viewBox': '0 0 24 24',
		'children': R.jsx('path', {
			d: 'M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1a7 7 0 017-7h1V5.73A2 2 0 0112 2zm-4 9a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z',
		}),
	});
}
function $k() {
	return R.jsx('svg', {
		'aria-hidden': 'true',
		'viewBox': '0 0 24 24',
		'children': R.jsx('path', {
			d: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z',
		}),
	});
}
function Ku() {
	return R.jsx('svg', {
		'aria-hidden': 'true',
		'viewBox': '0 0 16 16',
		'children': R.jsx('path', {
			d: 'M9.41 8l4.3-4.29a1 1 0 10-1.42-1.42L8 6.59l-4.29-4.3a1 1 0 00-1.42 1.42L6.59 8l-4.3 4.29a1 1 0 101.42 1.42L8 9.41l4.29 4.3a1 1 0 001.42-1.42z',
		}),
	});
}
function Wk() {
	return R.jsxs('svg', {
		'aria-hidden': 'true',
		'viewBox': '0 0 16 16',
		'children': [
			R.jsx('circle', {cx: '8', cy: '8', fill: '#da1414', r: '8'}),
			R.jsx('path', {d: 'M7 4h2v5H7zm0 6h2v2H7z', fill: '#fff'}),
		],
	});
}
function bk() {
	return R.jsx('svg', {
		'aria-hidden': 'true',
		'viewBox': '0 0 24 24',
		'children': R.jsx('path', {
			d: 'M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z',
		}),
	});
}
function Qk() {
	return R.jsx('svg', {
		'aria-hidden': 'true',
		'viewBox': '0 0 16 16',
		'children': R.jsx('path', {
			d: 'M8 0l1.5 4.5L14 6l-4.5 1.5L8 12l-1.5-4.5L2 6l4.5-1.5L8 0zm5 8l.9 2.6L16 11.5l-2.1.9L13 15l-.9-2.6-2.1-.9 2.1-.9L13 8zM3 10l.6 1.7L5 12.3l-1.4.6L3 14.6l-.6-1.7L1 12.3l1.4-.6L3 10z',
		}),
	});
}
function Kk({text: e}) {
	return R.jsxs('div', {
		className: 'aihub-msg-assistant',
		children: [
			R.jsx('div', {
				className: 'aihub-msg-assistant-icon',
				children: R.jsx(Qk, {}),
			}),
			R.jsx('div', {
				className: 'aihub-msg-assistant-text',
				children: R.jsx(Fk, {children: e}),
			}),
		],
	});
}
function Yk() {
	return R.jsxs('div', {
		className: 'aihub-footer',
		children: [
			'By messaging, you agree that this chat may be monitored and recorded per our',
			' ',
			R.jsx('a', {
				href: 'https://www.liferay.com/privacy-policy',
				rel: 'noopener noreferrer',
				target: '_blank',
				children: 'Privacy Policy',
			}),
		],
	});
}
function fh({className: e}) {
	return R.jsx('div', {className: e, children: R.jsx(Vk, {})});
}
function Xk({onClose: e, title: n}) {
	return R.jsxs('div', {
		className: 'aihub-header',
		children: [
			R.jsx(fh, {className: 'aihub-header-logo'}),
			R.jsx('div', {
				className: 'aihub-header-info',
				children: R.jsx('div', {
					className: 'aihub-header-title',
					children: n,
				}),
			}),
			R.jsx('button', {
				'aria-label': 'Close',
				'className': 'aihub-header-close',
				'onClick': e,
				'children': R.jsx(Ku, {}),
			}),
		],
	});
}
function Gk({disabled: e, onSubmit: n, placeholder: t}) {
	const [r, i] = fe.useState('');
	const l = fe.useRef(null);
	const o = fe.useCallback(() => {
		const a = l.current;
		if (!a) {
			return;
		}
		const c = window.getComputedStyle(a);
		const d =
			(parseFloat(c.lineHeight) || parseFloat(c.fontSize) * 1.2) * 4;
		a.style.height = 'auto';
		const p = Math.min(a.scrollHeight, d);
		(a.style.height = p + 'px'),
			(a.style.overflowY = a.scrollHeight > d ? 'auto' : 'hidden');
	}, []);
	const u = fe.useCallback(() => {
		const a = r.trim();
		!a ||
			e ||
			(i(''), l.current && (l.current.style.height = 'auto'), n(a));
	}, [e, n, r]);
	const s = fe.useCallback(
		(a) => {
			a.key === 'Enter' && !a.shiftKey
				? (a.preventDefault(), u())
				: a.key === 'Enter' && a.shiftKey && requestAnimationFrame(o);
		},
		[o, u]
	);

	return R.jsxs('div', {
		className: 'aihub-input-area',
		children: [
			R.jsx('textarea', {
				className: 'aihub-textarea',
				disabled: e,
				onChange: (a) => {
					i(a.target.value), requestAnimationFrame(o);
				},
				onKeyDown: s,
				placeholder: t,
				ref: l,
				rows: 1,
				value: r,
			}),
			R.jsx('button', {
				'aria-label': 'Send',
				'className': 'aihub-send',
				'disabled': e || !r.trim(),
				'onClick': u,
				'children': R.jsx(bk, {}),
			}),
		],
	});
}
function qk({introMessage: e, title: n}) {
	return R.jsxs('div', {
		className: 'aihub-intro',
		children: [
			R.jsx(fh, {className: 'aihub-intro-logo'}),
			R.jsx('div', {className: 'aihub-intro-name', children: n}),
			R.jsx('p', {className: 'aihub-intro-text', children: e}),
		],
	});
}
function Jk() {
	return R.jsxs('div', {
		className: 'aihub-msg-assistant aihub-msg-error',
		children: [
			R.jsx('div', {
				className: 'aihub-msg-assistant-icon',
				children: R.jsx(Wk, {}),
			}),
			R.jsx('div', {
				className: 'aihub-msg-assistant-text',
				children: R.jsx('p', {
					children: 'Sorry, an error occurred. Please try again.',
				}),
			}),
		],
	});
}
function Zk() {
	return R.jsxs('div', {
		className: 'aihub-loading',
		children: [
			R.jsx('div', {className: 'aihub-loading-spinner'}),
			R.jsx('span', {
				className: 'aihub-loading-text',
				children: 'Generating…',
			}),
		],
	});
}
function ex({text: e}) {
	return R.jsx('div', {
		className: 'aihub-msg-user',
		children: R.jsx('span', {
			className: 'aihub-msg-user-text',
			children: e,
		}),
	});
}
function nx({widgetConfiguration: e}) {
	const [n, t] = fe.useState(null);
	const [r, i] = fe.useState(!1);
	const [l, o] = fe.useState([]);
	const [u, s] = fe.useState(!1);
	const [a, c] = fe.useState(!1);
	const f = fe.useRef(null);
	const d = fe.useRef(null);
	const p = fe.useRef(null);
	const x = fe.useRef(null);
	fe.useEffect(() => {
		Jg(e.chatbotExternalReferenceCode)
			.then(t)
			.catch((h) => {
				console.error('Error fetching chatbot configuration:', h);
			});
	}, [e.chatbotExternalReferenceCode]),
		fe.useEffect(() => {
			if (!(n != null && n.active)) {
				return;
			}
			const h = Zg();

			return (
				h.addEventListener('Chat Message Sent', (m) => {
					d.current && (clearTimeout(d.current), (d.current = null));
					try {
						const y = JSON.parse(m.data);
						o((S) => [...S, {sender: 'assistant', text: y.data}]);
					}
					catch (y) {
						console.error('Error parsing chat message:', y),
							o((S) => [...S, {sender: 'error', text: ''}]);
					}
					i(!1);
				}),
				h.addEventListener('Subscribe', (m) => {
					f.current = m.data;
				}),
				() => {
					d.current && clearTimeout(d.current), h.close();
				}
			);
		}, [n]),
		fe.useEffect(() => {
			let h;
			a && ((h = x.current) == null || h.focus());
		}, [a]),
		fe.useEffect(() => {
			let h;
			(h = p.current) == null || h.scrollIntoView({behavior: 'smooth'});
		}, [l, r]);
	const k = fe.useCallback(() => {
		c((h) => !h), s(!0);
	}, []);
	const C = fe.useCallback(
		async (h) => {
			if (f.current) {
				o((m) => [...m, {sender: 'user', text: h}]), i(!0);
				try {
					if (
						!(
							await ey(
								e.chatbotExternalReferenceCode,
								f.current,
								h
							)
						).ok
					) {
						throw new Error('Failed to post message');
					}
					d.current = setTimeout(() => {
						o((y) => [...y, {sender: 'error', text: ''}]), i(!1);
					}, 3e4);
				}
				catch (m) {
					console.error('Failed to send message:', m),
						o((y) => [...y, {sender: 'error', text: ''}]),
						i(!1);
				}
			}
		},
		[e.chatbotExternalReferenceCode]
	);

	return n != null && n.active
		? R.jsxs(R.Fragment, {
				children: [
					R.jsxs('div', {
						className: `aihub-panel${a ? ' open' : ''}`,
						ref: x,
						tabIndex: -1,
						children: [
							R.jsx(Xk, {onClose: k, title: n.title}),
							R.jsxs('div', {
								'aria-live': 'polite',
								'className': 'aihub-messages',
								'children': [
									R.jsx(qk, {
										introMessage: n.introMessage,
										title: n.title,
									}),
									l.map((h, m) =>
										h.sender === 'assistant'
											? R.jsx(Kk, {text: h.text}, m)
											: h.sender === 'error'
												? R.jsx(Jk, {}, m)
												: R.jsx(ex, {text: h.text}, m)
									),
									r && R.jsx(Zk, {}),
									R.jsx('div', {ref: p}),
								],
							}),
							R.jsx(Gk, {
								disabled: r,
								onSubmit: C,
								placeholder: n.placeholderMessage,
							}),
							R.jsx(Yk, {}),
						],
					}),
					!a &&
						!u &&
						n.notificationMessage &&
						R.jsxs('div', {
							className: 'aihub-notification',
							children: [
								R.jsx('span', {
									children: n.notificationMessage,
								}),
								R.jsx('button', {
									'aria-label': 'Dismiss',
									'className': 'aihub-notification-close',
									'onClick': () => s(!0),
									'children': R.jsx(Ku, {}),
								}),
							],
						}),
					R.jsx('button', {
						'aria-label': a
							? 'Close AI Assistant'
							: 'Open AI Assistant',
						'className': 'aihub-toggle',
						'onClick': k,
						'children': a ? R.jsx(Ku, {}) : R.jsx($k, {}),
					}),
				],
			})
		: null;
}
const df = 'aihub-chatbot-widget';
if (!document.getElementById(df)) {
	const e = document.getElementById('aihub-chatbot-widget-script');
	if (!e) {
		console.error(
			'Element with id="aihub-chatbot-widget-script" not found'
		);
	}
	else {
		const t = {
			aiHubURL:
				e.getAttribute('ai-hub-url') || 'https://ai.hub.liferay.com',
			chatbotExternalReferenceCode:
				e.getAttribute('chatbot-external-reference-code') || '',
		};
		const r = document.createElement('div');
		(r.id = df),
			document.body.appendChild(r),
			qg(t.aiHubURL),
			Td(r).render(R.jsx(nx, {widgetConfiguration: t}));
	}
}
