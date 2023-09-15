import React from 'react';
import { useNavigate } from 'react-router-dom';

function Tabs({ title, items, link }) {
    const navigate = useNavigate()
    return (
        <div>
            <h2 className="">{title}</h2>
            <p className="text-3xl font-extralight mt-2 border-b-2 border-zinc-500"></p>
            {items.map((item, index) => (
                <div className="my-5 hover:scale-105 transition-transform cursor-pointer" key={index} onClick={() => { navigate(`${link}`) }}>
                    <ul className="">
                        <li className="border w-full text-white border-gray-300 p-4 rounded-md shadow-md flex justify-between items-center">
                            <div className="flex-grow">
                                <p className="text-lg font-semibold">Task:{item}</p>
                                <p className="">Status:{item}</p>
                                <p className="mt-2">{`Status: ${item}`}</p>
                            </div>
                            <span className="text-green-600">{`Status: ${item}`}</span>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Tabs;
