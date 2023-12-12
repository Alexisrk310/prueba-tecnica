'use client';
import React from 'react';
import './CardSchedule.css';

import { Card } from 'flowbite-react';

const CardSchedule = ({ Day, Duration, Hour }) => {
	return (
		<Card className="max-w-sm">
			<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Dias: {Day}
			</h5>
			<p className="font-normal text-gray-700 dark:text-gray-400">
				Duración: {Duration}
			</p>
			<p className="font-normal text-gray-700 dark:text-gray-400">
				Horas: {Hour}
			</p>
		</Card>
	);
};

export default CardSchedule;
