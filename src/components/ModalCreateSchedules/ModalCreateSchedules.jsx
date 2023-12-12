import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import './ModalCreateSchedules.css';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { newSchedules } from '../../features/schedules/schedulesSlice';
import {
	addSchedulesToday,
	newSchedulesToday,
} from '../../features/schedules/schedulesTodaySlice';

const options = [
	{ value: 'Lunes', label: 'Lunes' },
	{ value: 'Martes', label: 'Martes' },
	{ value: 'Miercoles', label: 'Miércoles' },
	{ value: 'Jueves', label: 'Jueves' },
	{ value: 'Viernes', label: 'Viernes' },
];

const ModalCreateSchedules = ({ openModal, setOpenModal }) => {
	const dispatch = useDispatch();
	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			Day: '',
			Duration: '',
			Hour: '',
			remember: false,
		},
	});

	const onSubmit = (data) => {
		const daySchedule = {
			Day: data.Day.value,
			Duration: data.Duration,
			Hour: data.Hour,
		};
		dispatch(newSchedules(daySchedule));
		console.log(daySchedule);
		setOpenModal(false);
	};

	const onCloseModal = () => {
		setOpenModal(false);
	};

	return (
		<>
			<Button onClick={() => setOpenModal(true)}>Crear una agenda</Button>
			<Modal show={openModal} size="md" onClose={onCloseModal} popup>
				<Modal.Header />
				<Modal.Body>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-6">
							<h3 className="text-xl font-medium text-gray-900 dark:text-white">
								Crea una agenda
							</h3>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="day" value="Selecciona el día" />
								</div>
								<Controller
									name="Day"
									rules={{ required: true }}
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											options={options}
											value={field.value}
											onChange={(selectedOption) =>
												setValue('Day', selectedOption)
											}
										/>
									)}
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="duration" value="Duración" />
								</div>
								<Controller
									name="Duration"
									rules={{ required: true }}
									control={control}
									render={({ field }) => (
										<>
											<TextInput
												{...field}
												id="duration"
												type="number"
												min="30"
												max="90"
												onChange={(e) => {
													setValue('Duration', e.target.value);
												}}
												required
											/>
											{errors.Duration && (
												<span className="text-red-500">
													Duración debe estar entre 30 y 90 minutos.
												</span>
											)}
										</>
									)}
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="hour" value="Escribe la hora" />
								</div>
								<Controller
									name="Hour"
									rules={{ required: true }}
									control={control}
									render={({ field }) => (
										<TextInput
											{...field}
											id="hour"
											type="text"
											onChange={(e) => {
												setValue('Hour', e.target.value);
											}}
											required
										/>
									)}
								/>
								{errors.Hour && (
									<span className="text-red-500">
										Hora es un campo requerido y debe ser un número positivo.
									</span>
								)}
							</div>

							<div className="flex justify-between text-sm font-medium text-gray-500">
								<button
									className="font-bold py-2 px-4 rounded text-cyan-700 hover:underline dark:text-cyan-500"
									type="submit"
									disabled={!!errors.Duration}>
									Crear Agenda
								</button>
							</div>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ModalCreateSchedules;
