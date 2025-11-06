/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {useEffect, useState} from 'react';

import {getUserInfo} from '../services/getUserInfo';
import Avatar from './Avatar';

const UserChatItem: React.FC<{message: string}> = ({message}) => {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		async function fetchUser() {
			try {
				const userInfo = await getUserInfo(
					Liferay.ThemeDisplay.getUserId().toString()
				);
				setUser(userInfo);
			}
			catch (error) {
				console.error('Error fetching user info:', error);
			}
		}

		fetchUser();
	}, []);

	return (
		<div className="align-items-center d-flex justify-content-end mb-2">
			<span className="ml-2">{message}</span>

			<Avatar image={user?.image} name={user?.name} />
		</div>
	);
};

export default UserChatItem;
