import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { getSchedules } from '../../services/api/getSchedules';
import { CardSchedule, ModalCreateSchedules } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { addSchedules } from '../../features/schedules/schedulesSlice';
import { addSchedulesToday } from '../../features/schedules/schedulesTodaySlice';

const HomePage = ({}) => {
	const dispatch = useDispatch();
	const schedules = useSelector((state) => state.schedules);

	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		const init = async () => {
			try {
				const GetSchedules = await getSchedules();
				dispatch(addSchedules(GetSchedules));
			} catch (error) {
				console.error('Error fetching schedules:', error);
			}
		};
		init();
	}, []);

	function calculateAvailableSlots(daySchedule) {
		// Configuración del horario de atención
		const startTime = new Date('1970-01-01T09:00:00');
		const endTime = new Date('1970-01-01T17:00:00');
		const minDuration = 30 * 60 * 1000; // 30 minutos en milisegundos

		// Crear un conjunto para almacenar los horarios ocupados
		const occupiedSlots = new Set();

		// Procesar la programación de citas y marcar los horarios ocupados
		daySchedule?.forEach((entry) => {
			const entryTime = new Date(`1970-01-01T${entry.Hour}`);
			const duration = entry?.Duration * 60 * 1000; // Duración en milisegundos

			while (entryTime < endTime) {
				if (entryTime >= startTime && entryTime + duration <= endTime) {
					// Marcar horario como ocupado
					occupiedSlots?.add(entryTime?.getTime());
					entryTime?.setTime(entryTime?.getTime() + minDuration); // Mover al siguiente horario disponible
				} else {
					break;
				}
			}
		});

		// Calcular el total de espacios disponibles
		let currentTime = new Date(startTime);
		let availableSlots = 0;

		while (currentTime < endTime) {
			if (!occupiedSlots.has(currentTime?.getTime())) {
				availableSlots++;
			}
			currentTime?.setTime(currentTime?.getTime() + minDuration);
		}

		return availableSlots;
	}

	// Obtener el día de la semana actual
	const currentDay = new Date().getDay();
	const weekdays = [
		'domingo',
		'lunes',
		'martes',
		'miércoles',
		'jueves',
		'viernes',
		'sábado',
	];
	const targetDay = weekdays[currentDay];
	const daySchedule = schedules?.filter((entry) => entry.Day === targetDay);
	useEffect(() => {
		dispatch(addSchedulesToday(daySchedule));
	}, [dispatch, schedules, targetDay]);
	console.log(daySchedule, 'dias filtrados');
	const schedulesToday = useSelector((state) => state.schedulesToday);
	// Calcular el total de espacios disponibles
	const totalAvailableSlots = calculateAvailableSlots(daySchedule);
	console.log(schedulesToday, 'redux filter');
	console.log(
		`Total de espacios disponibles para ${targetDay}: ${totalAvailableSlots}`
	);
	console.log(schedules, 'state old');
	return (
		<>
			<div className="flex justify-center mt-5">
				<ModalCreateSchedules
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			</div>
			<div className="mt-10 flex justify-center gap-8 flex-wrap">
				{schedulesToday?.map((schedule, index) => {
					return (
						<CardSchedule
							Day={schedule.Day}
							Duration={schedule.Duration}
							Hour={schedule.Hour}
							key={index}
						/>
					);
				})}
				<div>
					Disponibles para el {targetDay}: {totalAvailableSlots}
				</div>
			</div>
		</>
	);
};

export default HomePage;
