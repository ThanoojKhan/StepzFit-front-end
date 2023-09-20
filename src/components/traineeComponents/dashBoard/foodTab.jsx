import React from 'react';
import { useNavigate } from 'react-router-dom';

function Tabs({ title, items, link }) {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="">{title}</h2>
            <p className="text-3xl font-extralight mt-2 border-b-2 border-zinc-500"></p>
            <div className="my-5 " >
                <table className="table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Food</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    {items !== null && items.length > 0 ? (
                        items.map((item, index) => (
                            <tbody key={index} onClick={() => { navigate(`${link}`) }} className='w-full text-white p-4 rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer'>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{item?.time}</div>
                                                <div className="text-sm opacity-50">{new Date(item?.date).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}</div>
                                            </div>
                                        </div></td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{item?.food?.name}</div>
                                                <div className="text-sm opacity-50">Calories per {item?.food?.serving} gm: {(item?.food?.calories) * 100} cal </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item?.quantity} gms
                                        <br />
                                        <span className="text-sm opacity-50">Total Calories: {Math.floor(((item?.food?.calories) / (item?.food?.serving)) * (item?.quantity) * 100)}</span>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    ) : (
                        <tbody className='w-full text-white rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer'>
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>
                                    <div className='flex items-center justify-center'>
                                        <span>No Data</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Tabs;
