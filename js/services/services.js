// PostData
const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});

	return await res.json();
};

// Resources
const getResource = async url => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, stauts ${res.status}`);
	}

	return await res.json();
};

export {postData};
export {getResource};