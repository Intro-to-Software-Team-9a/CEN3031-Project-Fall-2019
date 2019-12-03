import React from 'react';
import SelectPlan from '../components/SelectPlan';

import './SelectPlan.css';

export default function SelectPlanView({ onBack, onFinish }) {
  return (
    <SelectPlan onBack={onBack} onFinish={onFinish}/>
  );
}
