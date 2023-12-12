import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Asegúrate de importar el componente Select
import { useForm, Controller } from 'react-hook-form';
import { getSchedules } from '../../services/api/getSchedules';
import { CardSchedule, ModalCreateSchedules } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { addSchedules } from '../../features/schedules/schedulesSlice';
import { addSchedulesToday } from '../../features/schedules/schedulesTodaySlice';

const HomePage = () => {
	const dispatch = useDispatch();
	const schedules = useSelector((state) => state.schedules);

	const [openModal, setOpenModal] = useState(false);
	const [selectedDay, setSelectedDay] = useState(new Date().getDay());

	const { control, setValue } = useForm({
		defaultValues: {
			Day: '',
			remember: false,
		},
	});

	useEffect(() => {
		const init = async () => {
			try {
				const GetSchedules = await getSchedules(selectedDay);
				dispatch(addSchedules(GetSchedules));
			} catch (error) {
				console.error('Error fetching schedules:', error);
			}
		};
		init();
	}, [dispatch, selectedDay]);

	const calculateAvailableSlots = (daySchedule) => {
		const startTime = new Date('1970-01-01T09:00:00');
		const endTime = new Date('1970-01-01T17:00:00');
		const minDuration = 30 * 60 * 1000;
		const occupiedSlots = new Set();

		daySchedule?.forEach((entry) => {
			const entryTime = new Date(`1970-01-01T${entry.Hour}`);
			const duration = entry?.Duration * 60 * 1000;

			while (entryTime < endTime) {
				if (entryTime >= startTime && entryTime + duration <= endTime) {
					occupiedSlots?.add(entryTime?.getTime());
					entryTime?.setTime(entryTime?.getTime() + minDuration);
				} else {
					break;
				}
			}
		});

		let currentTime = new Date(startTime);
		let availableSlots = 0;

		while (currentTime < endTime) {
			if (!occupiedSlots.has(currentTime?.getTime())) {
				availableSlots++;
			}
			currentTime?.setTime(currentTime?.getTime() + minDuration);
		}

		return availableSlots;
	};

	const weekdays = [
		'domingo',
		'lunes',
		'martes',
		'miércoles',
		'jueves',
		'viernes',
		'sábado',
	];
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

	useEffect(() => {
		dispatch(addSchedulesToday(daySchedule));
	}, [dispatch, schedules, targetDay]);

	const schedulesToday = useSelector((state) => state.schedulesToday);
	const totalAvailableSlots = calculateAvailableSlots(daySchedule);

	const options = weekdays.map((day, index) => ({
		label: day,
		value: index,
	}));

	return (
		<>
			<div className="flex justify-center mt-5">
				<h1 className="text-cyan-700 font-bold text-2xl">Citas disponibles</h1>
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
					Disponibles para el {targetDay}: {totalAvailableSlots}
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
