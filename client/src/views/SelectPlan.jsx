import React from 'react';
import SelectPlan from '../components/SelectPlan';

import './SelectPlan.css';

export default function SelectPlanView({ onFinish }) {
  return (
    <SelectPlan onFinish={onFinish}/>
  );
}
