import { parseObject } from "../objectParser";
export const getCategoryItems = async (itemId) => {
	try {
		const response = await fetch(`/api/portal/getCategoryItems`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: itemId,
			})
		});
		const { data } = await response.json();
		const requiredFields = [
			"_item id",
			"_category id",
		]
		const parsedData = parseObject(data, requiredFields)
		return parsedData
	} catch (error) {
		console.log(error);
	}
};
