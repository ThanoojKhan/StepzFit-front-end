import React from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../../../components/adminComponents/sideBar';
import UpdatePlanTab from '../../../components/adminComponents/plans/updatePlanTab';

function UpdatePlan() {
    const { planId } = useParams();

    return (
        <div className='flex'>
            <SideBar />
            <UpdatePlanTab planId={planId} />
        </div>
    );
}

export default UpdatePlan;
