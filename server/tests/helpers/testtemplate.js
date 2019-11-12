const render = require('../../render/templateRenderer');
const template = require('./livingWillTemplate');

const data = {
    currentDate: '12',
    currentMonth: 'November',
    currentYear: '2019',
    terminalCondition: true,
    endStageCondition: false,
    vegetativeState: true,
    surrogateName: 'Barack Obama',
    surrogateAddress: '1600 Pennsylvania Ave NW',
    surrogateCity: 'Washington, DC',
    surrogateState: 'Washington, DC',
    surrogateZip: '20500',
    additionalInstructions: 'No additional instructions',
}

console.log(render.render(template, data));
