
import PanelSlide from "../common/Modal/PanelSlide";
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfigurationOptions } from "../../../../redux/configurations/actions";
import { useEffect } from "react";

export const ConfiguratorsModal = ({ open, setOpen, children}) => {

	return(
		<>
			<PanelSlide open={open} setOpen={setOpen}>
				<div>
					{children}
				</div>
			</PanelSlide>
		</>
	)
}