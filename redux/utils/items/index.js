import { parseObject } from "../objectParser";
export const getItems = async (itemId) => {

    try {
        const response = await fetch(`/api/portal/getItem`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                itemId:itemId,
            })
        });

        const { data } = await response.json()
        const requiredFields = [
            "name",
            "type",
            "is product",
            "is service",
            "is discount",
            "is fee",
            "is configuration",
            "is sales item",
            "is equipment",
            "is consumable",
            "is current item"
        ];
        const parsedData = await parseObject(data, requiredFields)
        return parsedData

    } catch (error) {
        console.log(error)
    }
}