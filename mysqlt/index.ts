
const fetchData = async () => {
	try {
		const response = await fetch("http://localhost:3000/userWorkspaces", {
			method: 'GET',
			headers: {}
		});
	
		if (response.ok) {
			const result = await response.json();
			console.log(result);
		}
	} catch (err) {
		console.error(err);
	}
}

fetchData();