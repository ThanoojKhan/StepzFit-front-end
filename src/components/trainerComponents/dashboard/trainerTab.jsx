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
                            <th>Trainee</th>
                            <th>Task</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    {items !== null && items.length > 0 ? (
                        items.map((item, index) => (
                            <tbody key={index} onClick={() => { navigate(`${link}`) }} className='w-full text-white p-4 rounded-md shadow-md hover:scale-105 transition-transform cursor-pointer'>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 rounded-full overflow-hidden">
                                                <img
                                                    src={item?.traineeId?.profileImage ? item?.traineeId?.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                                    alt="Avatar"
                                                    className="h-full w-full"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold">{item?.traineeId?.name}</div>
                                                <div className="text-sm opacity-50">{item?.traineeId?.age}</div>
                                            </div>
                                        </div></td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold overflow-hidden">{item?.task}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item?.email}
                                        <br />
                                        <span className="text-sm opacity-50">
                                            {item?.date ? new Date(item.date).toLocaleDateString() : ''}
                                        </span>
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
