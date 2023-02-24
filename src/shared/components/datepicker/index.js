import { createRef, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import DatePicker, { registerLocale } from 'react-datepicker';
import TextField from '@material-ui/core/TextField';
import { getDateString, getFormattedDate } from 'utils';
import Tooltip from '@material-ui/core/Tooltip';
import DateRangeIcon from '@material-ui/icons/DateRange';
import useStyles from './style';
import { AppContext } from 'shared/contexts'; 
import DateKO from "date-fns/locale/ko";
import DateEN from "date-fns/locale/en-US";
registerLocale("DateKO", DateKO);
registerLocale("DateEN", DateEN);

export default function Datepicker(props) {
	const classes = useStyles();
	const { lang } = useContext(AppContext);
	const selectedDate = props.selected ? new Date(props.selected) : null;
	const [datepickerState, setDatepickerState] = useState({
		selected: selectedDate,
		isInViewMode: !!selectedDate,
		ref: createRef(),
		isInSuccess: false,
		focused: false,
	});

	const showSuccessState = () => {
		setDatepickerState(prevState => {
			return {
				...prevState,
				isInSuccess: true,
			};
		});

		// setTimeout(() => {
		//   setDatepickerState(prevState => {
		//     return {
		//       ...prevState,
		//       isInSucces: false
		//     };
		//   });
		// }, 5000);
	};

	const handleDateChange = selectedDate => {
		setDatepickerState(prevState => {
			return {
				...prevState,
				selected: selectedDate,
				isInViewMode: !!selectedDate,
			};
		});

		if (props.onChange) {
			props.onChange(selectedDate, showSuccessState);
		}

		if (!selectedDate) {
			datepickerState.ref.current.setOpen(false);
		}
	};

	const openCalendar = (() => {
		let timeout = null;
		return () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				if (datepickerState.ref.current) {
					datepickerState.ref.current.setOpen(true);
					return;
				} else {
					openCalendar();
				}
			}, 100);
		};
	})();

	useEffect(() => {
		let newState = {
			selected: null,
			isInViewMode: false,
			ref: datepickerState.ref,
			isInSuccess: datepickerState.isInSuccess,
		};

		if (props.selected) {
			newState = {
				...newState,
				selected: new Date(props.selected),
				isInViewMode: true,
			};
		}

		setDatepickerState(newState);
		//eslint-disable-next-line
	}, [props.selected]);

	let isDatepickerVisible = true;
	if (props.hasViewMode) {
		isDatepickerVisible = !datepickerState.isInViewMode;
	}

	if (props.onReady) {
		props.onReady({
			setDate: date => {
				setDatepickerState(prevState => ({
					...prevState,
					selected: date ? new Date(date) : null,
					isInViewMode: !!date,
				}));
			},
		});
	}

	const fullWidth =
		props.fullWidth !== undefined && props.fullWidth !== null
			? props.fullWidth
			: true;
	return (
		<div className={clsx('d-flex', props.classes?.mainWrapper)}>
			<div
				className={clsx(props.classes?.wrapper, {
					'w-100': fullWidth,
				})}
			>
				{isDatepickerVisible && (
					<DatePicker
						{...props}
						locale={lang === 'ko' ? "DateKO" : "DateEN"}
						classes={{
							input: {
								root: 'grid-datepicker',
							},
						}}
						popperClassName={clsx(classes.popper, props.classes?.popper)}
						wrapperClassName={clsx(props.classes?.datepickerWrapper, 'w-100')}
						customInput={
							<TextField
								variant='outlined'
								size={props.size || 'large'}
								classes={props.classes?.input}
								InputProps={{
									endAdornment: <DateRangeIcon />,
								}}
								fullWidth={fullWidth}
								type='text'
								label={props.label}
								placeholder={props.placeholder || props.label}
								value={
									datepickerState.selected
										? getDateString(datepickerState.selected)
										: ''
								}
								onChange={event => {}}
							/>
						}
						ref={datepickerState.ref}
						onFocus={() => {
							setDatepickerState(prevState => {
								return {
									...prevState,
									isInSuccess: false,
									focused: true,
								};
							});
						}}
						onClickOutside={() => {
							setDatepickerState(prevState => {
								return {
									...prevState,
									isInViewMode: !!prevState.selected,
									focused: false,
								};
							});
						}}
						onBlur={() => {
							setDatepickerState(prevState => {
								return {
									...prevState,
									isInViewMode: !!prevState.selected,
								};
							});
						}}
						selected={datepickerState.selected}
						onChangeRaw={event => event.preventDefault()}
						onKeyDown={event => {
							if (
								parseInt(event.keyCode) === 8 ||
								parseInt(event.keyCode) === 46
							) {
								if (datepickerState.selected) {
									handleDateChange(null);
								}
							}

							if (parseInt(event.keyCode) !== 9) {
								event.preventDefault();
							}
						}}
						onChange={handleDateChange}
						popperPlacement={props.placement || 'bottom'}
						popperModifiers={{
							flip: {
								behavior: ['bottom'],
							},
							preventOverflow: {
								enabled: true,
								escapeWithReference: false,
								boundariesElement: 'viewport',
							},
							hide: {
								enabled: false,
							},
						}}
					/>
				)}
				{!isDatepickerVisible && datepickerState.selected && (
					<p
						className={clsx(props.viewClassName, 'p-0 m-0')}
						onClick={event => {
							event.preventDefault();
							event.stopPropagation();
							setDatepickerState(prevState => {
								return {
									...prevState,
									isInViewMode: false,
								};
							});
							openCalendar();
						}}
					>
						{getFormattedDate(datepickerState.selected)}
					</p>
				)}
				<span className='display-error' />
			</div>
			{props.tooltip && (
				<Tooltip
					className='ml-2'
					title={props.tooltip}
					placement={props.tooltipPlacement || 'top'}
				>
					{/* <img src={InfoLightIcon} alt='info icon' className='info-icon' /> */}
				</Tooltip>
			)}
		</div>
	);
}
