import React, { useState } from "react";
import Button from "../atoms/Button";
import InputField from "../atoms/InputField";
import Text from "../atoms/Text";

const Form = () => {
    const [heightValue, setHeightValue] = useState('');
    const [weightValue, setWeightValue] = useState('');
    const [bmiValue, setBmiValue] = useState('');
    const [bmiMessage, setBmiMessage] = useState('');

    const calculateBmi = (event) => {
        event.preventDefault();
        if (heightValue && weightValue) {
            const heightInMeters = Number(heightValue) / 100;
            const bmi = (Number(weightValue) / (heightInMeters * heightInMeters)).toFixed(2);
            setBmiValue(bmi);

            let message = '';
            if (Number(bmi) < 18.5) {
                message = 'You are Underweight';
            } else if (Number(bmi) >= 18.5 && Number(bmi) < 25) {
                message = 'You are Normal weight';
            } else if (Number(bmi) >= 25 && Number(bmi) < 30) {
                message = 'You are Overweight';
            } else {
                message = 'You are Obese';
            }
            setBmiMessage(message);
        } else {
            setBmiValue('');
            setBmiMessage('');
        }
    };

    return (
        <main className="w-full grid gap-6 pb-10 md:pb-0">

            <InputField className="w-full flex flex-col gap-2">
                <label htmlFor="height" className="text-md text-zinc-200 font-light">Height</label>
                <div className="w-full relative">
                    <input
                        type="number"
                        placeholder="Enter your height"
                        className="w-full h-12 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border border-zinc-400 bg-transparent"
                        value={heightValue}
                        onChange={(event) => setHeightValue(event.target.value)}
                    />
                    <Text as="span" className="absolute text-zinc-200 font-bold top-3 right-4">cm</Text>
                </div>
            </InputField>

            <InputField className="w-full flex flex-col gap-2">
                <label htmlFor="weight" className="text-md text-zinc-200 font-light">Weight</label>
                <div className="w-full relative">
                    <input
                        type="number"
                        placeholder="Enter your weight"
                        className="w-full h-12 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border border-zinc-400 bg-transparent"
                        value={weightValue}
                        onChange={(event) => setWeightValue(event.target.value)}
                    />
                    <Text as="span" className="absolute text-zinc-200 font-bold top-3 right-4">kg</Text>
                </div>
            </InputField>

            <div className="w-full mt-4">
                <Button
                    onClick={calculateBmi}
                    type="button"
                    className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-950 rounded-full text-zinc-200 text-sm uppercase font-semibold"
                >
                    Calculate Now
                </Button>
            </div>

            {bmiValue && (
                <div className="w-full flex flex-col p-4 bg-zinc-700">
                    <Text as="h2" className="text-zinc-200 text-lg">Your BMI is <span className="font-extrabold">{bmiValue}</span></Text>
                    <Text as="p" className="text-amber-500">{bmiMessage}</Text>
                </div>
            )}

        </main>
    );
}

export default Form;
