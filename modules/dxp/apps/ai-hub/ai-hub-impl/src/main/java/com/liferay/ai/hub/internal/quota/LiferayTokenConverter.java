/**
 * SPDX-FileCopyrightText: (c) 2026 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.ai.hub.internal.quota;

import java.util.Map;

/**
 * @author Guilherme Camacho
 */
public class LiferayTokenConverter {

	public static final long MILLI_LRT_SCALE = 1000L;

	public static long convert(Map<TokenSource, Long> tokensMap) {
		long total = 0L;

		for (Map.Entry<TokenSource, Long> entry : tokensMap.entrySet()) {
			total += convert(entry.getKey(), entry.getValue());
		}

		return total;
	}

	public static long convert(TokenSource tokenSource, long tokens) {
		if (tokens <= 0L) {
			return 0L;
		}

		return (tokens * MILLI_LRT_SCALE) / tokenSource.getTokensPerLRT();
	}

}