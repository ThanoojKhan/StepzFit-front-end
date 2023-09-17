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
                    <thead >
                        <tr>
                            <th>Date</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    {items !== null && items.length > 0 ? (
                        items.map((item, index) => (
                            <tbody key={index} onClick={() => { navigate(`${link}`) }} className='w-full text-white rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer'>
                                <tr >
                                    <td>
                                        {new Date(item?.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td>
                                        <div className='capitalize my-3' >{item?.task}</div>
                                    </td>
                                    <td className={item.isDone ? 'text-green-600' : 'text-red-600'}>{item.isDone ? (
                                        'Task Completed'
                                    ) : (
                                        'Task Pending'
                                    )}</td>
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
