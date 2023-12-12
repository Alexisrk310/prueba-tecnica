import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { getSchedules } from '../../services/api/getSchedules';
import { CardSchedule, ModalCreateSchedules } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { addSchedules } from '../../features/schedules/schedulesSlice';
import { addSchedulesToday } from '../../features/schedules/schedulesTodaySlice';

const HomePage = () => {
	const dispatch = useDispatch();
	const schedules = useSelector((state) => state.schedules);
	const schedulesToday = useSelector((state) => state.schedulesToday);

	const [openModal, setOpenModal] = useState(false);
	const [selectedDay, setSelectedDay] = useState(new Date().getDay());

	const { control, setValue } = useForm({
		defaultValues: {
			Day: '',
			remember: false,
		},
	});

	const weekdays = [
		'domingo',
		'lunes',
		'martes',
		'miércoles',
		'jueves',
		'viernes',
		'sábado',
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const GetSchedules = await getSchedules(selectedDay);
				dispatch(addSchedules(GetSchedules));
			} catch (error) {
				console.error('Error fetching schedules:', error);
			}
		};

		fetchData();
	}, [dispatch, selectedDay]);

	useEffect(() => {
		const targetDay = weekdays[selectedDay];
		const daySchedule = schedules?.filter((entry) => {
			const entryHour = parseInt(entry.Hour.split(':')[0], 10);
			const entryDuration = entry.Duration || 0;
			return (
				entry.Day === targetDay &&
				entryHour >= 9 &&
				entryHour <= 17 &&
				entryDuration >= 30
			);
		});

		dispatch(addSchedulesToday(daySchedule));
	}, [dispatch, schedules, selectedDay]);

	const totalOccupiedTime = schedulesToday.reduce((accumulator, entry) => {
		const entryDuration = parseInt(entry.Duration, 10) || 0;
		return accumulator + entryDuration;
	}, 0);

	const remainingTime = 480 - totalOccupiedTime; // 480 minutos = 8 horas
	// const remainingTime = 230 - totalOccupiedTime; // 230 minutos = 3:50 hm

	const calculateAvailabilityMessage = () => {
		if (remainingTime >= 0) {
			return `Citas disponibles para el ${weekdays[selectedDay]}`;
		} else {
			return `No hay citas disponibles para el ${weekdays[selectedDay]}`;
		}
	};

	const options = weekdays.map((day, index) => ({
		label: day,
		value: index,
	}));

	return (
		<>
			<div className="flex justify-center mt-5">
				<h1 className="text-cyan-700 font-bold text-2xl">Citas abiertas</h1>
			</div>
			<div className="flex justify-center mt-5">
				<Controller
					name="Day"
					rules={{ required: true }}
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							className="w-60"
							options={options}
							value={options.find((option) => option.value === selectedDay)}
							onChange={(selectedOption) => {
								setSelectedDay(selectedOption.value);
								setValue('Day', selectedOption);
							}}
						/>
					)}
				/>
			</div>
			<div className="mt-10 flex justify-center gap-8 flex-wrap">
				{schedulesToday?.map((schedule, index) => (
					<CardSchedule
						Day={schedule.Day}
						Duration={schedule.Duration}
						Hour={schedule.Hour}
						key={index}
					/>
				))}
				<div>
					{/* Disponibles para el {weekdays[selectedDay]}:{' '} */}
					{calculateAvailabilityMessage()}
				</div>
			</div>
			<div className="flex justify-center mt-5">
				<ModalCreateSchedules
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			</div>
		</>
	);
};

export default HomePage;
