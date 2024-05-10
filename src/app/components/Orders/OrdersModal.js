import { useState } from "react";
import PanelSlide from "../common/Modal/PanelSlide";
export const OrdersModal = ({item, open, setOpen}) => {
	

	return(
		<>
			<PanelSlide open={open} setOpen={setOpen}>
				<h2>{item.item_name}</h2>
				<div>
					<span></span>
				</div>
			</PanelSlide>
		</>
	)
}