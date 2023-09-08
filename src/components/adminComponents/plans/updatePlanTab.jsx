import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/axios';
import errorFunction from '../../../services/errorHandling';

function UpdatePlanTab(props) {
    const { planId } = props;
    const { token } = useSelector((state) => state.Admin);
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState('Update Plan');

    const [plan, setPlan] = useState({
        name: '',
        price: 0,
        description: [],
        imageSrc: '',
        features: [],
    });

    useEffect(() => {
        axiosInstance
            .get(`/admin/planDetails/${planId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const existingPlan = res?.data?.plan; 
                if (existingPlan) {
                    setPlan(existingPlan);
                }
            })
            .catch((err) => {
                errorFunction(err,navigate)
            });
    }, [token, planId]);

    const isValidImage = (logo) => {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();
        return validExtensions.includes(extension);
    };

    const handleImageChange = (img) => {
        if (isValidImage(img.target.files[0].name)) {
            let reader = new FileReader();
            reader.readAsDataURL(img.target.files[0]);
            reader.onload = () => {
                setPlan({ ...plan, imageSrc: reader.result });
            };
            reader.onerror = (err) => {
                console.log(err);
            };
        } else {
            toast.error('Add a valid image');
        }
    };

    const handleUpdatePlan = () => {
        if (plan.name && plan.price && plan.description && plan.imageSrc) {
            setButtonText('Updating...'); 

            axiosInstance
                .patch(`/admin/updatePlan/${planId}`, plan, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.data.message) {
                        setButtonText('Updated');

                        setTimeout(() => {
                            navigate('/admin/plans');
                        }, 1500);
                    }
                })
                .catch((err) => {
                        setButtonText('Update Plan'); 
                        errorFunction(err,navigate)
                });
        } else {
            toast.error('Add all details');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlan((prevPlan) => ({
            ...prevPlan,
            [name]: value,
        }));
    };

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setPlan((prevPlan) => ({
            ...prevPlan,
            description: value.split('\n'),
        }));
    };

    const handleFeaturesChange = (event) => {
        const value = event.target.value;
        setPlan((prevPlan) => ({
            ...prevPlan,
            features: value.split('\n'),
        }));
    };

    return (
        <div className="flex lg:w-3/4 p-10 mx-auto">
            <Toaster toastOptions={3000} />
            <div className="mt-4 card bg-base-100 shadow-xl m-auto">
                <figure>
                    <img src={plan.imageSrc || '/src/assets/images/images/plan-1.jpg'} alt="Plan" />
                </figure>
                <input
                    type="file"
                    name="photo"
                    className="file-input file-input-ghost justify-center w-full max-w-xs"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageChange}
                />
                <div className="card-body">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="grid">
                            <label>Plan Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input input-error w-full max-w-xl"
                                value={plan.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid">
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                className="input input-error w-full max-w-xl"
                                value={plan.price}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="textarea textarea-error"
                        value={plan.description.join('\n')}
                        onChange={handleDescriptionChange}
                    ></textarea>
                    <label>Features (One per line)</label>
                    <textarea
                        className="textarea textarea-error"
                        placeholder=""
                        value={plan.features.join('\n')}
                        onChange={handleFeaturesChange}
                    ></textarea>
                </div>
                <button className="btn btn-primary mt-4" onClick={handleUpdatePlan}>
                    {buttonText}
                </button>
                
                <p className="justify-center flex my-4 cursor-pointer" onClick={() => navigate('/admin/plans')}>
                    Close
                </p>
            </div>
        </div>
    );
}

export default UpdatePlanTab;
