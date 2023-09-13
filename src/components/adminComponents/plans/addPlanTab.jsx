import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from '../../../api/axios'
import errorFunction from '../../../services/errorHandling'

function AddPlanTab() {
    const [plans, setPlans] = useState([]);
    const [newPlan, setNewPlan] = useState({
        name: '',
        description: [],
        imageSrc: '',
        price: '',
        features: [],
    });

    const { token } = useSelector((state) => state.Admin)
    const navigate = useNavigate()


    function isValidImage(logo) {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();

        return validExtensions.includes(extension);
    }

    const handleImageChange = (img) => {
        if (isValidImage(img.target.files[0].name)) {
            let reader = new FileReader()
            reader.readAsDataURL(img.target.files[0])
            reader.onload = () => {
                setNewPlan({ ...newPlan, imageSrc: reader.result });
            }
            reader.onerror = (err) => {
                console.log(err);
            }
        } else {
            toast.error('Add valid image')
        }
    };

    const handleAddPlan = () => {
        if (newPlan.name && newPlan.description && newPlan.imageSrc && newPlan.price) {
            axiosInstance.post('/admin/addPlan', newPlan, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res.data.message) {
                        toast.success(res.data.message);
                        navigate('/admin/plans');
                        setPlans([...plans, newPlan]);
                        setNewPlan({
                            name: '',
                            description: [],
                            imageSrc: '',
                            price: '',
                            features: [],
                        });
                    }
                })
                .catch((err) => {
                    errorFunction(err, navigate)
                });
        } else {
            toast.error('Add All Details');
        }
    };



    const handleNameChange = (event) => {
        setNewPlan({ ...newPlan, name: event.target.value });
    };
    const handlePriceChange = (event) => {
        setNewPlan({ ...newPlan, price: event.target.value });
    };
    const handleDescriptionChange = (event) => {
        const description = event.target.value.split('\n');
        setNewPlan({ ...newPlan, description });
    };
    const handleFeaturesChange = (event) => {
        const features = event.target.value.split('\n');
        setNewPlan({ ...newPlan, features });
    };

    return (

        <>
            <div className="flex lg:w-3/4 p-10 mx-auto">
                <div className="mt-4 card bg-base-100 shadow-xl m-auto">
                    <figure>
                        <img
                            src={newPlan.imageSrc || '/src/assets/images/images/plan-1.jpg'}
                            alt="Plan"
                        />
                    </figure>
                    <input
                        type="file"
                        name="photo"
                        className="file-input file-input-ghost justify-center w-full max-w-xs"
                        acceptedfiles=".jpg,.jpeg,.png"
                        onChange={handleImageChange}
                    />
                    <div className="card-body">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            <div className="grid">
                                <label>Plan Name</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="input input-error w-full max-w-xl"
                                    value={newPlan.name}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className="grid">
                                <label>Price</label>
                                <input
                                    type="number"
                                    placeholder=""
                                    className="input input-error w-full max-w-xl"
                                    value={newPlan.price}
                                    onChange={handlePriceChange}
                                />
                            </div>

                        </div>
                        <label>Description</label>
                        <textarea
                            className="textarea textarea-error"
                            placeholder=""
                            value={newPlan.description.join('\n')}
                            onChange={handleDescriptionChange}
                        ></textarea>
                        <label>Features (One per line)</label>
                        <textarea
                            className="textarea textarea-error"
                            placeholder=""
                            value={newPlan.features.join('\n')}
                            onChange={handleFeaturesChange}
                        ></textarea>
                    </div>
                    <button
                        className="btn btn-primary mt-4"
                        onClick={handleAddPlan}
                    >
                        Add Plan
                    </button>
                </div>
            </div>
        </>

    );
}

export default AddPlanTab;
