export const parseObject = async (data, fields = null) => {

	try {
		let dataArray = Array.isArray(data) ? data : [data];
		const required = [
			"__id",
			"created",
			"creator",
			"modified",
			"modifier",
			"record id",
			"serial"
		]

		let parsedObj = dataArray.map((el)=>{
			let newObj = {
				"__id": el["__id"],
				"created": el["created"],
				"creator": el["creator"],
				"modified": el["modified"],
				"modifier": el["modifier"],
				"record id": el["record id"],
				"serial": el["serial"],
			}

			if(fields != null){
				fields.forEach(field => {
					newObj[field] = el[field];
				});
			}
	
			return newObj;
			
		})

		return Array.isArray(data) ? parsedObj : parsedObj[0];
	} catch (error) {
		console.error(error)
		// console.log(data)
	}

}
