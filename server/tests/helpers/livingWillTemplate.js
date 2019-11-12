const template = `
## Living Will
    
Declaration made this {{ currentDay }} day of {{ currentMonth }} {{ currentYear }}, I willfully and voluntarily make known my desire that my dying not be artificially prolonged under the circumstances set forth below, and I do hereby declare that, if at any time I am incapacitated and 

{{# if terminalCondition }}
- I have a terminal condition,
{{/if }}

{{# if endStageCondition}}
- or I have an end stage condition,
{{/if }}

{{# if vegetativeState }}
- or I am in a persistent vegetative state,
{{/if}}
    
and if my attending or treating physician and another consulting physician have determined that there is no reasonable medical probability of my recovery from such condition, I direct that life-prolonging procedures be withheld or withdrawn when the application of such procedures would serve only to prolong artificially the process of dying, and that I be permitted to die naturally with only the administration of medication or the performance of any medical procedure deemed necessary to provide me with comfort care or to alleviate pain.

It is my intention that this declaration be honored by my family and physician as the final expression of my legal right to refuse medical or surgical treatment and to accept the consequences for such refusal.

In the event that I have been determined to be unable to provide express and informed consent regarding the withholding, withdrawal, or continuation of life-prolonging procedures, I wish to designate, as my surrogate to carry out the provisions of this declaration:

Name: {{surrogateName}}
Address: {{surrogateAddress}}

I understand the full import of this declaration, and I am emotionally and mentally competent to make this declaration.

#### Additional Instructions:

{{ additionalInstructions }}

(Signed): ____________________________________
The principal’s failure to designate a surrogate shall not invalidate the living will.
`;

module.exports = template;
