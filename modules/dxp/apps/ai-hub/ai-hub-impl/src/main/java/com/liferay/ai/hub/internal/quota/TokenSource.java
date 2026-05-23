/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.quota;

/**
 * @author Guilherme Camacho
 */
public enum TokenSource {

	EMBEDDING(62500L), MODEL_ARMOR(62500L), VERTEX_INPUT(1560L),
	VERTEX_OUTPUT(350L);

	public long getTokensPerLRT() {
		return _tokensPerLRT;
	}

	private TokenSource(long tokensPerLRT) {
		_tokensPerLRT = tokensPerLRT;
	}

	private final long _tokensPerLRT;

}