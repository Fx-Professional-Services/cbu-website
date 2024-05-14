
import PanelSlide from "../common/Modal/PanelSlide";
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfigurationOptions } from "../../../../redux/configurations/actions";
import { useEffect } from "react";
export const ConfiguratorsModal = ({title, open, setOpen, children}) => {
	console.log(title)
	// const configurationId = item["__id"];
	// const { configurations, loading } = useSelector((state) => state.menuReducer);
    // const dispatch = useDispatch();

	// useEffect(() => {
    //     dispatch(fetchConfigurationOptions(configurationId));
    // }, [dispatch]);

	return(
		<>
			<PanelSlide open={open} setOpen={setOpen}>
				<h2>{title}</h2>
				<div>
					{children}
				</div>
			</PanelSlide>
		</>
	)
}