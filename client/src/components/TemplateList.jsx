import React from 'react';

import Template from './Template';

/**
 * @param templates A list of Templates.
 * @param onClick A single callback for all the templates. On click, performs onClick(template).
 */
export default function TemplateList({ templates, onClick }) {
  return (
    <div>
      {templates.map(template => (
        <Template onClick={onClick ? () => onClick(template) : () => {}} template={template} />
      ))}
    </div>
  )
}
