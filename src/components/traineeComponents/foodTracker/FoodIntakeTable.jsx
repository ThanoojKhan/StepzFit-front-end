import React from 'react'

function FoodIntakeTable(filteredFoodIntake, totalCaloriesSum, handleShowDetails, handleDeleteEntry ) {
    return (
        <div>
            <table className="table ">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Food</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                {filteredFoodIntake?.length === 0 ? (
                    <tbody>
                        <tr>
                            <td colSpan="4" >
                                <div className="flex w3-animate-zoom justify-center items-center space-x-3">
                                    No Data
                                </div>
                            </td>

                        </tr>
                    </tbody>
                ) : (
                    filteredFoodIntake?.map((entry, index) => (

                        <tbody key={index} className='hover:text-green-400 cursor-default '>
                            <tr>
                                <td className='w3-animate-zoom '>{entry?.time}</td>
                                <td>
                                    <div className="flex items-center space-x-3 ">
                                        <div className='w3-animate-zoom '>
                                            <div className="font-bold">{entry?.food?.name}</div>
                                            <div className="text-sm opacity-50">Calories per {entry?.food?.serving} gm: {(entry?.food?.calories) * 100} cal </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='w3-animate-zoom '>
                                    {entry?.quantity} gms
                                    <br />
                                    <span className="text-sm opacity-50">Total Calories: {Math.floor(((entry?.food?.calories) / (entry?.food?.serving)) * (entry?.quantity) * 100)}</span>
                                </td>
                                <th className='w3-animate-zoom '>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleShowDetails(entry)}>Details</button>
                                    {new Date(entry.date).toDateString() === new Date().toDateString() && (
                                        <button
                                            className="btn btn-ghost btn-xs text-red-500"
                                            onClick={() => {
                                                setEntryToDelete(entry);
                                                setIsDeleteModalOpen(true);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </th>
                            </tr>
                        </tbody>
                    ))
                )}
                {filteredFoodIntake?.length !== 0 && (

                    <tfoot className='w3-animate-zoom'>
                        <tr className='text-transparent'>f</tr>
                        <tr className='text-transparent'>f</tr>
                        <tr>
                            <td></td>
                            <th colSpan="" className='text-lg text-white' >Total Day Intake </th>
                            <td className='text-lg text-white'>{totalCaloriesSum} Calories</td>

                            <td></td>
                        </tr>
                    </tfoot>)
                }
            </table>
        </div>
    )
}

export default FoodIntakeTable
